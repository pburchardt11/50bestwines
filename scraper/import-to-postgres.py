#!/usr/bin/env python3
"""
Import pipeline: merged-wines-v2.json (2.3M wines) -> Neon Postgres

Groups wines by (normalized name + producer + country) so the same wine
with different vintages becomes one `wines` row + multiple `wine_vintages` rows.

Usage:
  python3 import-to-postgres.py                # full import
  python3 import-to-postgres.py --drop         # drop & recreate tables first
  python3 import-to-postgres.py --limit 1000   # only import first 1000 unique wines
"""

import json
import re
import os
import sys
import math
import argparse
import unicodedata
from collections import defaultdict
from pathlib import Path
from urllib.parse import quote

try:
    import psycopg2
    import psycopg2.extras
except ImportError:
    print("ERROR: psycopg2-binary not installed. Run:")
    print("  pip3 install psycopg2-binary --break-system-packages")
    sys.exit(1)

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
SCRIPT_DIR = Path(__file__).parent
PROJECT_DIR = SCRIPT_DIR.parent
MERGED_FILE = SCRIPT_DIR / "raw-data" / "merged-wines-v2.json"

# ---------------------------------------------------------------------------
# Constants (reused from import-to-site.py)
# ---------------------------------------------------------------------------
BATCH_SIZE = 1000
MIN_RATING_COUNT = 25  # lower than site import; we want fuller DB coverage

SCORE_SOURCE_MAP = {
    "xwines_community": {"source": "Community Rating", "maxScore": 5},
    "vivino": {"source": "Vivino", "maxScore": 5},
}

TYPE_MAP = {
    "Red": "Red",
    "Red_wine": "Red",
    "White": "White",
    "White_wine": "White",
    "Rosé": "Rosé",
    "Sparkling": "Sparkling",
    "Dessert": "Dessert",
    "Dessert/Port": "Fortified",
    "Fortified": "Fortified",
    "Other": "Red",
    "": "Red",
}

COUNTRY_EMOJI = {
    "AD": "🇦🇩", "AE": "🇦🇪", "AF": "🇦🇫", "AG": "🇦🇬", "AL": "🇦🇱", "AM": "🇦🇲",
    "AO": "🇦🇴", "AR": "🇦🇷", "AT": "🇦🇹", "AU": "🇦🇺", "AZ": "🇦🇿", "BA": "🇧🇦",
    "BB": "🇧🇧", "BD": "🇧🇩", "BE": "🇧🇪", "BG": "🇧🇬", "BH": "🇧🇭", "BI": "🇧🇮",
    "BJ": "🇧🇯", "BN": "🇧🇳", "BO": "🇧🇴", "BR": "🇧🇷", "BS": "🇧🇸", "BT": "🇧🇹",
    "BW": "🇧🇼", "BY": "🇧🇾", "BZ": "🇧🇿", "CA": "🇨🇦", "CD": "🇨🇩", "CF": "🇨🇫",
    "CG": "🇨🇬", "CH": "🇨🇭", "CI": "🇨🇮", "CL": "🇨🇱", "CM": "🇨🇲", "CN": "🇨🇳",
    "CO": "🇨🇴", "CR": "🇨🇷", "CU": "🇨🇺", "CV": "🇨🇻", "CY": "🇨🇾", "CZ": "🇨🇿",
    "DE": "🇩🇪", "DJ": "🇩🇯", "DK": "🇩🇰", "DM": "🇩🇲", "DO": "🇩🇴", "DZ": "🇩🇿",
    "EC": "🇪🇨", "EE": "🇪🇪", "EG": "🇪🇬", "ER": "🇪🇷", "ES": "🇪🇸", "ET": "🇪🇹",
    "FI": "🇫🇮", "FJ": "🇫🇯", "FR": "🇫🇷", "GA": "🇬🇦", "GB": "🇬🇧", "GD": "🇬🇩",
    "GE": "🇬🇪", "GH": "🇬🇭", "GM": "🇬🇲", "GN": "🇬🇳", "GR": "🇬🇷", "GT": "🇬🇹",
    "GW": "🇬🇼", "GY": "🇬🇾", "HN": "🇭🇳", "HR": "🇭🇷", "HT": "🇭🇹", "HU": "🇭🇺",
    "ID": "🇮🇩", "IE": "🇮🇪", "IL": "🇮🇱", "IN": "🇮🇳", "IQ": "🇮🇶", "IR": "🇮🇷",
    "IS": "🇮🇸", "IT": "🇮🇹", "JM": "🇯🇲", "JO": "🇯🇴", "JP": "🇯🇵", "KE": "🇰🇪",
    "KG": "🇰🇬", "KH": "🇰🇭", "KR": "🇰🇷", "KW": "🇰🇼", "KZ": "🇰🇿", "LA": "🇱🇦",
    "LB": "🇱🇧", "LI": "🇱🇮", "LK": "🇱🇰", "LR": "🇱🇷", "LS": "🇱🇸", "LT": "🇱🇹",
    "LU": "🇱🇺", "LV": "🇱🇻", "LY": "🇱🇾", "MA": "🇲🇦", "MC": "🇲🇨", "MD": "🇲🇩",
    "ME": "🇲🇪", "MG": "🇲🇬", "MK": "🇲🇰", "ML": "🇲🇱", "MM": "🇲🇲", "MN": "🇲🇳",
    "MT": "🇲🇹", "MU": "🇲🇺", "MV": "🇲🇻", "MW": "🇲🇼", "MX": "🇲🇽", "MY": "🇲🇾",
    "MZ": "🇲🇿", "NA": "🇳🇦", "NE": "🇳🇪", "NG": "🇳🇬", "NI": "🇳🇮", "NL": "🇳🇱",
    "NO": "🇳🇴", "NP": "🇳🇵", "NZ": "🇳🇿", "OM": "🇴🇲", "PA": "🇵🇦", "PE": "🇵🇪",
    "PG": "🇵🇬", "PH": "🇵🇭", "PK": "🇵🇰", "PL": "🇵🇱", "PT": "🇵🇹", "PY": "🇵🇾",
    "QA": "🇶🇦", "RO": "🇷🇴", "RS": "🇷🇸", "RU": "🇷🇺", "RW": "🇷🇼", "SA": "🇸🇦",
    "SB": "🇸🇧", "SC": "🇸🇨", "SD": "🇸🇩", "SE": "🇸🇪", "SG": "🇸🇬", "SI": "🇸🇮",
    "SK": "🇸🇰", "SL": "🇸🇱", "SN": "🇸🇳", "SO": "🇸🇴", "SR": "🇸🇷", "SS": "🇸🇸",
    "SV": "🇸🇻", "SY": "🇸🇾", "SZ": "🇸🇿", "TD": "🇹🇩", "TG": "🇹🇬", "TH": "🇹🇭",
    "TJ": "🇹🇯", "TL": "🇹🇱", "TM": "🇹🇲", "TN": "🇹🇳", "TO": "🇹🇴", "TR": "🇹🇷",
    "TT": "🇹🇹", "TW": "🇹🇼", "TZ": "🇹🇿", "UA": "🇺🇦", "UG": "🇺🇬", "US": "🇺🇸",
    "UY": "🇺🇾", "UZ": "🇺🇿", "VE": "🇻🇪", "VN": "🇻🇳", "YE": "🇾🇪", "ZA": "🇿🇦",
    "ZM": "🇿🇲", "ZW": "🇿🇼",
}

# ---------------------------------------------------------------------------
# SQL DDL
# ---------------------------------------------------------------------------
DDL_DROP = """
DROP TABLE IF EXISTS wine_vintages CASCADE;
DROP TABLE IF EXISTS wines CASCADE;
DROP TABLE IF EXISTS countries CASCADE;
DROP TABLE IF EXISTS regions CASCADE;
DROP TABLE IF EXISTS grapes CASCADE;
"""

DDL_CREATE = """
CREATE EXTENSION IF NOT EXISTS unaccent;

CREATE TABLE IF NOT EXISTS wines (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  producer TEXT DEFAULT '',
  type TEXT DEFAULT 'Red',
  grape TEXT DEFAULT 'Blend',
  grapes TEXT[] DEFAULT '{}',
  region TEXT DEFAULT '',
  sub_region TEXT DEFAULT '',
  country TEXT DEFAULT '',
  country_code TEXT DEFAULT '',
  appellation TEXT DEFAULT '',
  alcohol_content TEXT DEFAULT '',
  price NUMERIC(10,2) DEFAULT 0,
  price_range TEXT DEFAULT 'Mid-Range',
  buy_url TEXT DEFAULT '',
  label_url TEXT DEFAULT '',
  aggregate_score NUMERIC(5,1) DEFAULT 0,
  badges TEXT[] DEFAULT '{}',
  tasting_notes TEXT DEFAULT '',
  editorial TEXT DEFAULT '',
  pairings TEXT[] DEFAULT '{}',
  serving_temp TEXT DEFAULT '',
  aging TEXT DEFAULT '',
  pros TEXT[] DEFAULT '{}',
  cons TEXT[] DEFAULT '{}',
  body TEXT DEFAULT '',
  acidity TEXT DEFAULT '',
  description TEXT DEFAULT '',
  vivino_url TEXT DEFAULT '',
  search_vector TSVECTOR,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS wine_vintages (
  id SERIAL PRIMARY KEY,
  wine_id INTEGER REFERENCES wines(id) ON DELETE CASCADE,
  vintage INTEGER,
  scores JSONB DEFAULT '[]',
  rating_count INTEGER DEFAULT 0,
  UNIQUE(wine_id, vintage)
);

CREATE TABLE IF NOT EXISTS countries (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  emoji TEXT DEFAULT '',
  regions TEXT[] DEFAULT '{}',
  top_wines TEXT[] DEFAULT '{}',
  description TEXT DEFAULT '',
  wine_history TEXT DEFAULT ''
);

CREATE TABLE IF NOT EXISTS regions (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  country TEXT DEFAULT '',
  country_code TEXT DEFAULT '',
  grapes TEXT[] DEFAULT '{}',
  top_wines TEXT[] DEFAULT '{}',
  description TEXT DEFAULT ''
);

CREATE TABLE IF NOT EXISTS grapes (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT DEFAULT ''
);

-- Indexes (use IF NOT EXISTS for idempotency)
CREATE INDEX IF NOT EXISTS idx_wines_slug ON wines(slug);
CREATE INDEX IF NOT EXISTS idx_wines_country ON wines(country);
CREATE INDEX IF NOT EXISTS idx_wines_region ON wines(region);
CREATE INDEX IF NOT EXISTS idx_wines_type ON wines(type);
CREATE INDEX IF NOT EXISTS idx_wines_grape ON wines(grape);
CREATE INDEX IF NOT EXISTS idx_wines_score ON wines(aggregate_score DESC);
CREATE INDEX IF NOT EXISTS idx_wines_search ON wines USING GIN(search_vector);
CREATE INDEX IF NOT EXISTS idx_vintages_wine ON wine_vintages(wine_id);
CREATE INDEX IF NOT EXISTS idx_vintages_vintage ON wine_vintages(vintage);
"""


# ---------------------------------------------------------------------------
# Utility functions (reused from import-to-site.py)
# ---------------------------------------------------------------------------

def to_slug(s: str) -> str:
    """Generate URL slug matching the site's toSlug function."""
    s = unicodedata.normalize("NFD", s)
    s = re.sub(r"[\u0300-\u036f]", "", s)
    s = s.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = s.strip("-")
    return s


def compute_aggregate_score(scores_dict: dict) -> float:
    """
    Compute a 0-100 aggregate score using Bayesian average.
    Identical to import-to-site.py.
    """
    if not scores_dict:
        return 0.0

    PRIOR_COUNT = 50
    PRIOR_MEAN_5 = 3.6
    PRIOR_MEAN_100 = 85

    best_score = 0.0
    for key, info in scores_dict.items():
        score = info.get("score", 0)
        max_score = info.get("max_score", 100)
        count = info.get("count", 0)

        if max_score <= 0 or score <= 0:
            continue

        if max_score == 5:
            bayesian = (PRIOR_COUNT * PRIOR_MEAN_5 + count * score) / (PRIOR_COUNT + count)
            norm = max(0, min(100, (bayesian - 1) / 4 * 100))
        elif max_score == 20:
            bayesian = (PRIOR_COUNT * (PRIOR_MEAN_100 / 5) + count * score) / (PRIOR_COUNT + count)
            norm = (bayesian / 20) * 100
        else:
            bayesian = (PRIOR_COUNT * PRIOR_MEAN_100 + count * score) / (PRIOR_COUNT + count)
            norm = (bayesian / max_score) * 100

        norm = max(0, min(100, norm))
        if norm > best_score:
            best_score = norm

    return best_score


def get_price_range(price):
    if price is None or price <= 0:
        return "Mid-Range"
    if price < 15:
        return "Budget"
    if price < 30:
        return "Mid-Range"
    if price < 75:
        return "Premium"
    if price < 200:
        return "Luxury"
    return "Ultra-Premium"


def determine_wine_type(raw_type: str) -> str:
    return TYPE_MAP.get(raw_type, "Red")


def get_primary_grape(grapes: list) -> str:
    if grapes and grapes[0]:
        return grapes[0]
    return "Blend"


def generate_tasting_notes(wine_type: str, grapes: list, body: str, acidity: str) -> str:
    body_s = body or ""
    notes = {
        "Red": f"{body_s + '. ' if body_s else ''}Dark fruit, spice, structured tannins.",
        "White": f"{body_s + '. ' if body_s else ''}Citrus, stone fruit, {acidity.lower() if acidity else 'balanced'} acidity.",
        "Rosé": "Strawberry, watermelon, bright acidity.",
        "Sparkling": "Green apple, toast, fine bubbles.",
        "Dessert": "Honey, dried fruit, balanced sweetness.",
        "Fortified": "Dried fruit, nuts, layered finish.",
    }
    return notes.get(wine_type, notes["Red"])


def generate_editorial(wine_type: str, region: str, producer: str) -> str:
    parts = [f"A {wine_type.lower()}"]
    if region:
        parts.append(f"from {region}")
    if producer:
        parts.append(f"by {producer}")
    return " ".join(parts) + "."


def get_serving_temp(wine_type: str) -> str:
    temps = {
        "Red": "16-18°C", "White": "8-12°C", "Rosé": "8-10°C",
        "Sparkling": "6-8°C", "Dessert": "8-12°C", "Fortified": "12-16°C",
    }
    return temps.get(wine_type, "16-18°C")


def get_aging(wine_type: str, agg_score: float) -> str:
    if agg_score >= 90:
        return "5-15 years"
    if agg_score >= 80:
        return "3-8 years"
    if wine_type in ("Sparkling", "Rosé"):
        return "1-3 years"
    return "2-5 years"


def get_default_pairings(wine_type: str) -> list:
    pairings = {
        "Red": ["Grilled meats", "Hard cheeses", "Pasta"],
        "White": ["Seafood", "Salads", "Light poultry"],
        "Rosé": ["Mediterranean dishes", "Light salads", "Seafood"],
        "Sparkling": ["Appetizers", "Shellfish", "Celebrations"],
        "Dessert": ["Fruit desserts", "Blue cheese", "Foie gras"],
        "Fortified": ["Chocolate", "Nuts", "Aged cheeses"],
    }
    return pairings.get(wine_type, ["Versatile pairing"])


def make_vivino_search_url(name: str, producer: str) -> str:
    q = f"{producer} {name}".strip()
    return f"https://www.vivino.com/search/wines?q={quote(q)}"


def make_buy_url(name: str, producer: str) -> str:
    q = f"{producer} {name}".strip()
    return f"https://www.wine.com/search?q={quote(q)}"


# ---------------------------------------------------------------------------
# Database connection
# ---------------------------------------------------------------------------

def get_database_url() -> str:
    """Read DATABASE_URL from env or .env.local file."""
    url = os.environ.get("DATABASE_URL")
    if url:
        # Strip channel_binding param (not supported by psycopg2)
        url = url.replace("?channel_binding=require&", "?").replace("&channel_binding=require", "").replace("?channel_binding=require", "")
        return url

    # Try .env.local in project root
    env_file = PROJECT_DIR / ".env.local"
    if env_file.exists():
        with open(env_file) as f:
            for line in f:
                line = line.strip()
                if line.startswith("#") or "=" not in line:
                    continue
                key, _, val = line.partition("=")
                key = key.strip()
                val = val.strip().strip('"').strip("'")
                if key == "DATABASE_URL":
                    val = val.replace("?channel_binding=require&", "?").replace("&channel_binding=require", "").replace("?channel_binding=require", "")
                    return val

    # Try .env in project root
    env_file = PROJECT_DIR / ".env"
    if env_file.exists():
        with open(env_file) as f:
            for line in f:
                line = line.strip()
                if line.startswith("#") or "=" not in line:
                    continue
                key, _, val = line.partition("=")
                key = key.strip()
                val = val.strip().strip('"').strip("'")
                if key == "DATABASE_URL":
                    return val

    print("ERROR: DATABASE_URL not found.")
    print("Set it via environment variable or in .env.local / .env file.")
    print("Example: export DATABASE_URL='postgresql://user:pass@host/dbname?sslmode=require'")
    sys.exit(1)


# ---------------------------------------------------------------------------
# Grouping & transformation
# ---------------------------------------------------------------------------

def parse_vintage(raw):
    """Parse vintage from raw data, return int or None."""
    v = raw.get("vintage", "")
    if v:
        try:
            vi = int(str(v).strip())
            if 1900 <= vi <= 2030:
                return vi
        except (ValueError, TypeError):
            pass
    return None


def group_key(raw: dict) -> tuple:
    """Generate grouping key: (normalized name, producer, country)."""
    name = (raw.get("name") or "").strip().lower()
    producer = (raw.get("winery_name") or "").strip().lower()
    country = (raw.get("country") or "").strip().lower()
    return (name, producer, country)


def build_scores_list(raw_scores: dict, vintage) -> list:
    """Build the scores JSON array for a vintage."""
    scores_list = []
    for key, info in raw_scores.items():
        mapping = SCORE_SOURCE_MAP.get(key, {"source": key, "maxScore": info.get("max_score", 100)})
        score_val = info.get("score", 0)
        if score_val > 0:
            entry = {
                "source": mapping["source"],
                "score": round(score_val, 2),
                "maxScore": mapping["maxScore"],
            }
            if vintage:
                entry["vintage"] = vintage
            scores_list.append(entry)
    return scores_list


def total_rating_count(raw_scores: dict) -> int:
    """Sum of all rating counts across score sources."""
    return sum(info.get("count", 0) for info in raw_scores.values())


def max_rating_count(raw_scores: dict) -> int:
    """Max rating count across score sources."""
    return max((info.get("count", 0) for info in raw_scores.values()), default=0)


def transform_group(entries: list, seen_slugs: set) -> tuple:
    """
    Transform a group of same-wine entries (different vintages) into:
      - one wine dict (for wines table)
      - list of vintage dicts (for wine_vintages table)
    Returns (wine_dict, vintages_list) or (None, []).
    """
    if not entries:
        return None, []

    # Pick the best entry (highest aggregate score) for the main record
    best_entry = None
    best_score = -1
    for raw in entries:
        scores = raw.get("scores", {})
        agg = compute_aggregate_score(scores)
        if agg > best_score:
            best_score = agg
            best_entry = raw

    raw = best_entry
    name = (raw.get("name") or "").strip()
    producer = (raw.get("winery_name") or "").strip()
    if not name:
        return None, []

    # Wine type
    wine_type = determine_wine_type(raw.get("wine_type", ""))

    # Grapes
    raw_grapes = raw.get("grapes", [])
    if isinstance(raw_grapes, str):
        raw_grapes = [raw_grapes] if raw_grapes else []
    grapes = [g.strip() for g in raw_grapes if g and g.strip()]
    grape = get_primary_grape(grapes)

    # Location
    country = (raw.get("country") or "").strip()
    country_code = (raw.get("country_code") or "").strip().upper()
    region = (raw.get("region") or "").strip()

    # Generate slug (no vintage in slug for the grouped wine)
    slug_parts = []
    if producer:
        slug_parts.append(producer)
    slug_parts.append(name)
    base_slug = to_slug(" ".join(slug_parts))
    if not base_slug:
        return None, []

    # Deduplicate slugs
    slug = base_slug
    counter = 1
    while slug in seen_slugs:
        slug = f"{base_slug}-{counter}"
        counter += 1
    seen_slugs.add(slug)

    # Aggregate score from best entry
    agg_score = round(best_score, 1)

    # Price
    price = 0
    price_raw = raw.get("price")
    if price_raw:
        try:
            price = round(float(price_raw), 2)
        except (ValueError, TypeError):
            pass

    # Label URL
    label_url = raw.get("label_image_url", "") or ""

    # ABV
    abv = raw.get("abv", "")
    abv_str = ""
    if abv:
        abv_str = str(abv).strip()
        if abv_str and not abv_str.endswith("%"):
            abv_str += "%"

    # Pairings
    pairings = raw.get("food_pairings", [])
    if not pairings or not isinstance(pairings, list):
        pairings = get_default_pairings(wine_type)

    # Body/acidity
    body = raw.get("body", "") or ""
    acidity = raw.get("acidity", "") or ""

    # Badges
    badges = []
    if agg_score >= 95:
        badges.append("Exceptional")
    elif agg_score >= 90:
        badges.append("Outstanding")
    elif agg_score >= 85:
        badges.append("Highly Rated")

    # Compute max count across ALL vintages for popularity badge
    all_max_count = 0
    for e in entries:
        mc = max_rating_count(e.get("scores", {}))
        if mc > all_max_count:
            all_max_count = mc

    if all_max_count >= 10000:
        badges.append("Popular Choice")
    elif all_max_count >= 1000:
        badges.append("Well Known")

    # Pros/cons
    pros = ["Well-rated by the community"] if all_max_count >= 100 else ["Interesting find"]
    cons = []

    wine_dict = {
        "slug": slug,
        "name": name,
        "producer": producer,
        "type": wine_type,
        "grape": grape,
        "grapes": grapes,
        "region": region,
        "sub_region": "",
        "country": country,
        "country_code": country_code,
        "appellation": "",
        "alcohol_content": abv_str,
        "price": price,
        "price_range": get_price_range(price if price > 0 else None),
        "buy_url": make_buy_url(name, producer),
        "label_url": label_url,
        "aggregate_score": agg_score,
        "badges": badges,
        "tasting_notes": generate_tasting_notes(wine_type, grapes, body, acidity),
        "editorial": generate_editorial(wine_type, region, producer),
        "pairings": pairings,
        "serving_temp": get_serving_temp(wine_type),
        "aging": get_aging(wine_type, agg_score),
        "pros": pros,
        "cons": cons,
        "body": body,
        "acidity": acidity,
        "description": "",
        "vivino_url": make_vivino_search_url(name, producer),
    }

    # Build vintages list
    vintages_list = []
    seen_vintages = set()
    for e in entries:
        vintage = parse_vintage(e)
        scores = e.get("scores", {})
        scores_json = build_scores_list(scores, vintage)
        rc = total_rating_count(scores)

        # Use vintage or 0 for NV
        v_key = vintage or 0
        if v_key in seen_vintages:
            continue
        seen_vintages.add(v_key)

        vintages_list.append({
            "vintage": vintage,
            "scores": scores_json,
            "rating_count": rc,
        })

    # Limit to top 5 vintages by rating count (saves DB space)
    vintages_list.sort(key=lambda v: -v["rating_count"])
    vintages_list = vintages_list[:5]

    return wine_dict, vintages_list


# ---------------------------------------------------------------------------
# Database operations
# ---------------------------------------------------------------------------

def create_tables(cur, drop: bool):
    """Create (or drop+create) all tables."""
    if drop:
        print("Dropping existing tables...")
        cur.execute(DDL_DROP)
    print("Creating tables and indexes...")
    cur.execute(DDL_CREATE)


def insert_wines_batch(cur, wines_batch: list) -> list:
    """Insert a batch of wines using execute_batch for speed, return list of (wine_id, slug)."""
    if not wines_batch:
        return []

    cols = [
        "slug", "name", "producer", "type", "grape", "grapes",
        "region", "sub_region", "country", "country_code", "appellation",
        "alcohol_content", "price", "price_range", "buy_url", "label_url",
        "aggregate_score", "badges", "tasting_notes", "editorial",
        "pairings", "serving_temp", "aging", "pros", "cons",
        "body", "acidity", "description", "vivino_url",
    ]

    placeholders = ", ".join(["%s"] * len(cols))
    query = f"""
        INSERT INTO wines ({', '.join(cols)})
        VALUES ({placeholders})
        ON CONFLICT (slug) DO NOTHING
    """

    params_list = []
    for w in wines_batch:
        params_list.append((
            w["slug"], w["name"], w["producer"], w["type"], w["grape"], w["grapes"],
            w["region"], w["sub_region"], w["country"], w["country_code"], w["appellation"],
            w["alcohol_content"], w["price"], w["price_range"], w["buy_url"], w["label_url"],
            w["aggregate_score"], w["badges"], w["tasting_notes"], w["editorial"],
            w["pairings"], w["serving_temp"], w["aging"], w["pros"], w["cons"],
            w["body"], w["acidity"], w["description"], w["vivino_url"],
        ))

    psycopg2.extras.execute_batch(cur, query, params_list, page_size=BATCH_SIZE)

    # Fetch back the IDs for the inserted slugs
    slugs = [w["slug"] for w in wines_batch]
    cur.execute("SELECT id, slug FROM wines WHERE slug = ANY(%s)", (slugs,))
    return cur.fetchall()


def insert_vintages_batch(cur, vintages_batch: list):
    """Insert a batch of vintage records."""
    if not vintages_batch:
        return

    query = """
        INSERT INTO wine_vintages (wine_id, vintage, scores, rating_count)
        VALUES (%s, %s, %s, %s)
        ON CONFLICT (wine_id, vintage) DO NOTHING
    """

    psycopg2.extras.execute_batch(cur, query, [
        (v["wine_id"], v["vintage"], json.dumps(v["scores"]), v["rating_count"])
        for v in vintages_batch
    ], page_size=BATCH_SIZE)


def insert_countries(cur, wines_data: list):
    """Build and insert countries from wine data."""
    print("Building and inserting countries...")
    country_data = defaultdict(lambda: {"regions": set(), "wines": [], "code": ""})

    for w in wines_data:
        c = w["country"]
        if not c:
            continue
        info = country_data[c]
        info["code"] = w["country_code"]
        if w["region"]:
            info["regions"].add(w["region"])
        info["wines"].append((w["aggregate_score"], w["slug"]))

    query = """
        INSERT INTO countries (slug, name, emoji, regions, top_wines, description, wine_history)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        ON CONFLICT (slug) DO NOTHING
    """

    count = 0
    for name, info in sorted(country_data.items()):
        slug = to_slug(name)
        code = info["code"]
        emoji = COUNTRY_EMOJI.get(code, "")
        top_wines = sorted(info["wines"], key=lambda x: -x[0])[:15]
        top_wine_slugs = [s for _, s in top_wines]
        regions_list = sorted(info["regions"])[:20]
        desc = f"{name} is a notable wine-producing country with a growing reputation for quality wines."
        history = f"{name} has a rich winemaking tradition spanning centuries."

        cur.execute(query, (slug, name, emoji, regions_list, top_wine_slugs, desc, history))
        count += 1

    print(f"  Inserted {count} countries")
    return count


def insert_regions(cur, wines_data: list):
    """Build and insert regions from wine data."""
    print("Building and inserting regions...")
    region_data = defaultdict(lambda: {"country": "", "code": "", "grapes": set(), "wines": []})

    for w in wines_data:
        r = w["region"]
        if not r:
            continue
        info = region_data[r]
        info["country"] = w["country"]
        info["code"] = w["country_code"]
        for g in w["grapes"]:
            if g:
                info["grapes"].add(g)
        info["wines"].append((w["aggregate_score"], w["slug"]))

    query = """
        INSERT INTO regions (slug, name, country, country_code, grapes, top_wines, description)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        ON CONFLICT (slug) DO NOTHING
    """

    count = 0
    for name, info in sorted(region_data.items()):
        slug = to_slug(name)
        top_wines = sorted(info["wines"], key=lambda x: -x[0])[:10]
        top_wine_slugs = [s for _, s in top_wines]
        grapes_list = sorted(info["grapes"])[:8]
        desc = f"{name} is a wine region in {info['country']} known for quality wine production."

        cur.execute(query, (slug, name, info["country"], info["code"], grapes_list, top_wine_slugs, desc))
        count += 1

    print(f"  Inserted {count} regions")
    return count


def insert_grapes(cur, wines_data: list):
    """Build and insert grapes from wine data."""
    print("Building and inserting grapes...")
    grape_names = set()
    for w in wines_data:
        for g in w["grapes"]:
            if g and g.strip():
                grape_names.add(g.strip())

    query = """
        INSERT INTO grapes (slug, name, description)
        VALUES (%s, %s, %s)
        ON CONFLICT (slug) DO NOTHING
    """

    count = 0
    for name in sorted(grape_names):
        slug = to_slug(name)
        desc = f"{name} is a grape variety used in winemaking."
        cur.execute(query, (slug, name, desc))
        count += 1

    print(f"  Inserted {count} grape varieties")
    return count


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="Import wines to Neon Postgres")
    parser.add_argument("--drop", action="store_true", help="Drop and recreate all tables")
    parser.add_argument("--limit", type=int, default=0, help="Only import N unique wines (0 = all)")
    args = parser.parse_args()

    # Connect
    db_url = get_database_url()
    print(f"Connecting to database...")
    conn = psycopg2.connect(db_url)
    conn.autocommit = False
    cur = conn.cursor()

    # Create tables
    create_tables(cur, drop=args.drop)
    conn.commit()

    # Load data
    print(f"Loading {MERGED_FILE}...")
    with open(MERGED_FILE, "r", encoding="utf-8") as f:
        raw_data = json.load(f)
    total_entries = len(raw_data)
    print(f"  Loaded {total_entries:,} entries")

    # Group by (name, producer, country)
    print("Grouping wines by name + producer + country...")
    groups = defaultdict(list)
    for i, raw in enumerate(raw_data):
        key = group_key(raw)
        groups[key].append(raw)
        if (i + 1) % 500_000 == 0:
            print(f"  Processed {i + 1:,} / {total_entries:,} entries...")

    total_groups = len(groups)
    print(f"  {total_groups:,} unique wines (from {total_entries:,} vintage entries)")

    # Free raw_data memory
    del raw_data

    # Sort groups by best aggregate score (descending) for consistent import
    print("Scoring and sorting groups...")
    scored_groups = []
    for key, entries in groups.items():
        best_agg = 0
        best_count = 0
        for e in entries:
            scores = e.get("scores", {})
            agg = compute_aggregate_score(scores)
            mc = max_rating_count(scores)
            if agg > best_agg:
                best_agg = agg
                best_count = mc
            elif agg == best_agg and mc > best_count:
                best_count = mc
        scored_groups.append((best_agg, best_count, key))
    scored_groups.sort(key=lambda x: (-x[0], -x[1]))

    # Apply limit
    if args.limit > 0:
        scored_groups = scored_groups[:args.limit]
        print(f"  Limited to top {args.limit:,} wines")

    # Transform and insert
    total_to_import = len(scored_groups)
    print(f"Importing {total_to_import:,} wines...")

    seen_slugs = set()
    wines_batch = []
    vintages_pending = []  # list of (slug, vintages_list)
    wines_inserted = 0
    vintages_inserted = 0
    wines_skipped = 0

    # Collect all wine dicts for countries/regions/grapes building
    all_wine_dicts = []

    for idx, (_, _, key) in enumerate(scored_groups):
        entries = groups[key]
        wine_dict, vintages_list = transform_group(entries, seen_slugs)

        if wine_dict is None:
            wines_skipped += 1
            continue

        wines_batch.append(wine_dict)
        vintages_pending.append((wine_dict["slug"], vintages_list))
        all_wine_dicts.append(wine_dict)

        # Flush batch
        if len(wines_batch) >= BATCH_SIZE:
            results = insert_wines_batch(cur, wines_batch)
            slug_to_id = {slug: wid for wid, slug in results}
            wines_inserted += len(results)

            # Insert vintages for this batch
            vint_batch = []
            for slug, vlist in vintages_pending:
                wine_id = slug_to_id.get(slug)
                if wine_id is None:
                    continue
                for v in vlist:
                    vint_batch.append({
                        "wine_id": wine_id,
                        "vintage": v["vintage"],
                        "scores": v["scores"],
                        "rating_count": v["rating_count"],
                    })
            if vint_batch:
                insert_vintages_batch(cur, vint_batch)
                vintages_inserted += len(vint_batch)

            conn.commit()
            wines_batch = []
            vintages_pending = []

        if (idx + 1) % 10_000 == 0:
            print(f"  Progress: {idx + 1:,} / {total_to_import:,} wines ({wines_inserted:,} inserted, {vintages_inserted:,} vintages)")

    # Flush remaining
    if wines_batch:
        results = insert_wines_batch(cur, wines_batch)
        slug_to_id = {slug: wid for wid, slug in results}
        wines_inserted += len(results)

        vint_batch = []
        for slug, vlist in vintages_pending:
            wine_id = slug_to_id.get(slug)
            if wine_id is None:
                continue
            for v in vlist:
                vint_batch.append({
                    "wine_id": wine_id,
                    "vintage": v["vintage"],
                    "scores": v["scores"],
                    "rating_count": v["rating_count"],
                })
        if vint_batch:
            insert_vintages_batch(cur, vint_batch)
            vintages_inserted += len(vint_batch)

        conn.commit()

    # Insert countries, regions, grapes
    n_countries = insert_countries(cur, all_wine_dicts)
    n_regions = insert_regions(cur, all_wine_dicts)
    n_grapes = insert_grapes(cur, all_wine_dicts)
    conn.commit()

    # Build search vectors in bulk (much faster than per-row)
    print("Building search vectors...")
    cur.execute("""
        UPDATE wines SET search_vector = to_tsvector('simple',
            unaccent(COALESCE(name, '') || ' ' || COALESCE(producer, '') || ' ' ||
                     COALESCE(region, '') || ' ' || COALESCE(country, '') || ' ' ||
                     COALESCE(grape, '')))
        WHERE search_vector IS NULL
    """)
    conn.commit()
    print(f"  Search vectors built for {cur.rowcount:,} wines")

    # Final counts from DB
    cur.execute("SELECT COUNT(*) FROM wines")
    db_wines = cur.fetchone()[0]
    cur.execute("SELECT COUNT(*) FROM wine_vintages")
    db_vintages = cur.fetchone()[0]
    cur.execute("SELECT COUNT(*) FROM countries")
    db_countries = cur.fetchone()[0]
    cur.execute("SELECT COUNT(*) FROM regions")
    db_regions = cur.fetchone()[0]
    cur.execute("SELECT COUNT(*) FROM grapes")
    db_grapes = cur.fetchone()[0]

    cur.close()
    conn.close()

    # Summary
    print("\n" + "=" * 50)
    print("IMPORT COMPLETE")
    print("=" * 50)
    print(f"Source entries:       {total_entries:,}")
    print(f"Unique wines found:  {total_groups:,}")
    print(f"Wines imported:      {wines_inserted:,} (skipped: {wines_skipped:,})")
    print(f"Vintages imported:   {vintages_inserted:,}")
    print(f"Countries:           {db_countries}")
    print(f"Regions:             {db_regions}")
    print(f"Grapes:              {db_grapes}")
    print(f"")
    print(f"Database totals:")
    print(f"  wines:             {db_wines:,}")
    print(f"  wine_vintages:     {db_vintages:,}")
    print(f"  countries:         {db_countries}")
    print(f"  regions:           {db_regions}")
    print(f"  grapes:            {db_grapes}")


if __name__ == "__main__":
    main()
