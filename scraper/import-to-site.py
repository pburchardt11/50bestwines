#!/usr/bin/env python3
"""
Import pipeline: merged-wines-v2.json (2.3M wines) -> 50bestwines.com site data

Strategy (Option A): Keep top 100K most-rated wines in JSON for static rendering.
The rest can be served via API / search in a future iteration.

Output files:
  - src/lib/wines.json          (top 100K wines, sorted by aggregate score)
  - src/lib/countries.json      (updated with all countries)
  - src/lib/regions.json        (updated with all regions)
  - src/lib/grapes.json         (updated with all grape varieties)
"""

import json
import re
import unicodedata
import sys
import os
from collections import defaultdict
from pathlib import Path

# Paths
SCRIPT_DIR = Path(__file__).parent
PROJECT_DIR = SCRIPT_DIR.parent
MERGED_FILE = SCRIPT_DIR / "raw-data" / "merged-wines-v2.json"
WINES_OUT = PROJECT_DIR / "src" / "lib" / "wines.json"
COUNTRIES_OUT = PROJECT_DIR / "src" / "lib" / "countries.json"
REGIONS_OUT = PROJECT_DIR / "src" / "lib" / "regions.json"
GRAPES_OUT = PROJECT_DIR / "src" / "lib" / "grapes.json"

# How many wines to keep (10K ~= 9MB, fast Vercel builds)
TOP_N = 10_000

# Minimum rating count to be included (filters out noise)
MIN_RATING_COUNT = 50

# --- Score source mapping ---
# The merged dataset uses these keys in the scores dict:
#   xwines_community -> 5-point scale community ratings
#   vivino           -> 5-point scale Vivino ratings
# The site expects an array of { source, score, maxScore, vintage }

SCORE_SOURCE_MAP = {
    "xwines_community": {"source": "Community Rating", "maxScore": 5},
    "vivino": {"source": "Vivino", "maxScore": 5},
}

# Wine type mapping
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
    "Other": "Red",     # default for unclassified
    "": "Red",          # default for unknown
}

# Country code mapping (ensure uppercase)
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

# --- Utility functions ---

def to_slug(s: str) -> str:
    """Generate URL slug matching the site's toSlug function."""
    # NFD normalize and strip combining marks (accents)
    s = unicodedata.normalize("NFD", s)
    s = re.sub(r"[\u0300-\u036f]", "", s)
    s = s.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = s.strip("-")
    return s


def compute_aggregate_score(scores_dict: dict) -> float:
    """
    Compute a 0-100 aggregate score using Bayesian average.
    This prevents wines with very few ratings and a perfect 5.0
    from ranking above genuinely top-rated wines.

    For a 5-point scale:
      Bayesian avg = (C * m + count * score) / (C + count)
      where C = prior strength (e.g. 50 ratings) and m = global mean (~3.6)
    Then map to 0-100 scale.
    """
    if not scores_dict:
        return 0.0

    # Global prior for Bayesian averaging
    PRIOR_COUNT = 50      # How many "phantom" ratings to mix in
    PRIOR_MEAN_5 = 3.6    # Assumed global average on 5-point scale
    PRIOR_MEAN_100 = 85   # Assumed global average on 100-point scale

    import math

    best_score = 0.0
    for key, info in scores_dict.items():
        score = info.get("score", 0)
        max_score = info.get("max_score", 100)
        count = info.get("count", 0)

        if max_score <= 0 or score <= 0:
            continue

        # Apply Bayesian average
        if max_score == 5:
            bayesian = (PRIOR_COUNT * PRIOR_MEAN_5 + count * score) / (PRIOR_COUNT + count)
            # Map 1-5 to 0-100: (bayesian - 1) / 4 * 100
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


def get_price_range(price: float | None) -> str:
    """Map a numeric price to the site's price range categories."""
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


def make_vivino_search_url(name: str, producer: str) -> str:
    """Construct a Vivino search URL for label image fallback."""
    q = f"{producer} {name}".strip()
    from urllib.parse import quote
    return f"https://www.vivino.com/search/wines?q={quote(q)}"


def make_buy_url(name: str, producer: str) -> str:
    """Construct a wine.com search URL."""
    q = f"{producer} {name}".strip()
    from urllib.parse import quote
    return f"https://www.wine.com/search?q={quote(q)}"


def determine_wine_type(raw_type: str) -> str:
    """Map merged dataset wine_type to site's type system."""
    return TYPE_MAP.get(raw_type, "Red")


def get_primary_grape(grapes: list[str]) -> str:
    """Return the first grape or 'Blend'."""
    if grapes and grapes[0]:
        return grapes[0]
    return "Blend"


def generate_tasting_notes(wine_type: str, grapes: list[str], body: str, acidity: str) -> str:
    """Generate concise tasting notes based on wine properties."""
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
    """Generate a brief editorial comment."""
    parts = [f"A {wine_type.lower()}"]
    if region:
        parts.append(f"from {region}")
    if producer:
        parts.append(f"by {producer}")
    return " ".join(parts) + "."


def get_serving_temp(wine_type: str) -> str:
    """Return serving temperature based on wine type."""
    temps = {
        "Red": "16-18°C",
        "White": "8-12°C",
        "Rosé": "8-10°C",
        "Sparkling": "6-8°C",
        "Dessert": "8-12°C",
        "Fortified": "12-16°C",
    }
    return temps.get(wine_type, "16-18°C")


def get_aging(wine_type: str, agg_score: float) -> str:
    """Suggest aging based on type and quality."""
    if agg_score >= 90:
        return "5-15 years"
    if agg_score >= 80:
        return "3-8 years"
    if wine_type in ("Sparkling", "Rosé"):
        return "1-3 years"
    return "2-5 years"


def get_default_pairings(wine_type: str) -> list[str]:
    """Return default food pairings based on wine type."""
    pairings = {
        "Red": ["Grilled meats", "Hard cheeses", "Pasta"],
        "White": ["Seafood", "Salads", "Light poultry"],
        "Rosé": ["Mediterranean dishes", "Light salads", "Seafood"],
        "Sparkling": ["Appetizers", "Shellfish", "Celebrations"],
        "Dessert": ["Fruit desserts", "Blue cheese", "Foie gras"],
        "Fortified": ["Chocolate", "Nuts", "Aged cheeses"],
    }
    return pairings.get(wine_type, ["Versatile pairing"])


# --- Main transform ---

def transform_wine(raw: dict, seen_slugs: set) -> dict | None:
    """Transform a merged-dataset wine into the site's Wine schema."""

    name = (raw.get("name") or "").strip()
    producer = (raw.get("winery_name") or "").strip()
    if not name:
        return None

    # Parse vintage
    vintage_raw = raw.get("vintage", "")
    vintage = None
    if vintage_raw:
        try:
            v = int(str(vintage_raw).strip())
            if 1900 <= v <= 2030:
                vintage = v
        except (ValueError, TypeError):
            pass

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

    # Generate slug
    slug_parts = []
    if producer:
        slug_parts.append(producer)
    slug_parts.append(name)
    if vintage:
        slug_parts.append(str(vintage))
    base_slug = to_slug(" ".join(slug_parts))
    if not base_slug:
        return None

    # Deduplicate slugs
    slug = base_slug
    counter = 1
    while slug in seen_slugs:
        slug = f"{base_slug}-{counter}"
        counter += 1
    seen_slugs.add(slug)

    # Scores
    raw_scores = raw.get("scores", {})
    scores_list = []
    for key, info in raw_scores.items():
        mapping = SCORE_SOURCE_MAP.get(key, {"source": key, "maxScore": info.get("max_score", 100)})
        score_val = info.get("score", 0)
        if score_val > 0:
            scores_list.append({
                "source": mapping["source"],
                "score": round(score_val, 2),
                "maxScore": mapping["maxScore"],
                "vintage": vintage,
            })

    agg_score = round(compute_aggregate_score(raw_scores), 1)

    # Price
    price_raw = raw.get("price")
    price = 0
    if price_raw:
        try:
            price = round(float(price_raw), 2)
        except (ValueError, TypeError):
            pass

    # Label URL
    label_url = raw.get("label_image_url", "")
    if not label_url:
        label_url = make_vivino_search_url(name, producer)

    # ABV
    abv = raw.get("abv", "")
    if abv:
        abv_str = str(abv).strip()
        if abv_str and not abv_str.endswith("%"):
            abv_str += "%"
    else:
        abv_str = ""

    # Food pairings from data or defaults
    pairings = raw.get("food_pairings", [])
    if not pairings or not isinstance(pairings, list):
        pairings = get_default_pairings(wine_type)

    # Body/acidity for tasting notes
    body = raw.get("body", "")
    acidity = raw.get("acidity", "")

    # Badges
    badges = []
    if agg_score >= 95:
        badges.append("Exceptional")
    elif agg_score >= 90:
        badges.append("Outstanding")
    elif agg_score >= 85:
        badges.append("Highly Rated")

    max_count = max((s.get("count", 0) for s in raw_scores.values()), default=0)
    if max_count >= 10000:
        badges.append("Popular Choice")
    elif max_count >= 1000:
        badges.append("Well Known")

    return {
        "slug": slug,
        "name": name,
        "producer": producer,
        "vintage": vintage,
        "type": wine_type,
        "grape": grape,
        "grapes": grapes,
        "region": region,
        "subRegion": "",
        "country": country,
        "countryCode": country_code,
        "appellation": "",
        "alcoholContent": abv_str,
        "price": price,
        "priceRange": get_price_range(price if price > 0 else None),
        "buyUrl": make_buy_url(name, producer),
        "labelUrl": label_url,
        "scores": scores_list,
        "aggregateScore": agg_score,
        "badges": badges,
        "tastingNotes": generate_tasting_notes(wine_type, grapes, body, acidity),
        "editorial": generate_editorial(wine_type, region, producer),
        "pairings": pairings,
        "servingTemp": get_serving_temp(wine_type),
        "aging": get_aging(wine_type, agg_score),
        "prosAndCons": {
            "pros": ["Well-rated by the community"] if max_count >= 100 else ["Interesting find"],
            "cons": [],
        },
    }


def build_countries(wines: list[dict]) -> list[dict]:
    """Build countries.json from the wine list."""
    country_data = defaultdict(lambda: {
        "regions": set(),
        "wines": [],
        "code": "",
    })

    for w in wines:
        c = w["country"]
        if not c:
            continue
        info = country_data[c]
        info["code"] = w["countryCode"]
        if w["region"]:
            info["regions"].add(w["region"])
        info["wines"].append((w["aggregateScore"], w["slug"]))

    countries = []
    for name, info in sorted(country_data.items()):
        slug = to_slug(name)
        code = info["code"]
        emoji = COUNTRY_EMOJI.get(code, "")

        # Top 15 wines by score
        top_wines = sorted(info["wines"], key=lambda x: -x[0])[:15]
        top_wine_slugs = [s for _, s in top_wines]

        countries.append({
            "slug": slug,
            "name": name,
            "emoji": emoji,
            "regions": sorted(info["regions"])[:20],
            "topWines": top_wine_slugs,
            "description": f"{name} is a notable wine-producing country with a growing reputation for quality wines.",
            "wineHistory": f"{name} has a rich winemaking tradition spanning centuries.",
        })

    return countries


def build_regions(wines: list[dict]) -> list[dict]:
    """Build regions.json from the wine list."""
    region_data = defaultdict(lambda: {
        "country": "",
        "code": "",
        "grapes": set(),
        "wines": [],
    })

    for w in wines:
        r = w["region"]
        if not r:
            continue
        info = region_data[r]
        info["country"] = w["country"]
        info["code"] = w["countryCode"]
        for g in w["grapes"]:
            info["grapes"].add(g)
        info["wines"].append((w["aggregateScore"], w["slug"]))

    regions = []
    for name, info in sorted(region_data.items()):
        slug = to_slug(name)
        top_wines = sorted(info["wines"], key=lambda x: -x[0])[:10]

        regions.append({
            "slug": slug,
            "name": name,
            "country": info["country"],
            "countryCode": info["code"],
            "description": f"{name} is a wine region in {info['country']} known for quality wine production.",
            "climate": "Varies",
            "keyGrapes": sorted(info["grapes"])[:8],
            "topWines": [s for _, s in top_wines],
            "notableAppellations": [name],
        })

    return regions


def build_grapes(wines: list[dict]) -> list[dict]:
    """Build grapes.json from the wine list."""
    grape_data = defaultdict(lambda: {
        "colors": defaultdict(int),
        "regions": set(),
    })

    for w in wines:
        for g in w["grapes"]:
            if not g:
                continue
            info = grape_data[g]
            color = "Red" if w["type"] in ("Red", "Fortified") else "White"
            info["colors"][color] += 1
            if w["region"]:
                info["regions"].add(w["region"])

    grapes = []
    for name, info in sorted(grape_data.items()):
        slug = to_slug(name)
        # Determine color by majority
        color = max(info["colors"], key=info["colors"].get) if info["colors"] else "Red"
        region_list = sorted(info["regions"])[:10]

        pairings = (
            ["Grilled meats", "Hard cheeses", "Pasta"]
            if color == "Red"
            else ["Seafood", "Salads", "Light poultry"]
        )

        grapes.append({
            "slug": slug,
            "name": name,
            "color": color,
            "aliases": [],
            "description": f"{name} is a {color.lower()} grape variety grown in {', '.join(region_list[:3]) if region_list else 'various regions'}.",
            "characteristics": (
                "Medium to full-bodied with structured tannins."
                if color == "Red"
                else "Typically fresh and aromatic with good acidity."
            ),
            "regions": region_list,
            "pairings": pairings,
        })

    return grapes


def main():
    print(f"Loading merged dataset from {MERGED_FILE}...")
    with open(MERGED_FILE, "r", encoding="utf-8") as f:
        raw_data = json.load(f)
    print(f"  Loaded {len(raw_data):,} wines")

    # Step 1: Score and rank all wines to pick top N
    print("Computing aggregate scores and ranking...")

    scored = []
    filtered_out = 0
    for i, raw in enumerate(raw_data):
        scores = raw.get("scores", {})
        max_count = max((s.get("count", 0) for s in scores.values()), default=0)

        # Filter out wines with too few ratings (noise)
        if max_count < MIN_RATING_COUNT:
            filtered_out += 1
            if (i + 1) % 500_000 == 0:
                print(f"  Processed {i + 1:,} wines...")
            continue

        agg = compute_aggregate_score(scores)
        # Composite ranking: Bayesian score first, then popularity
        scored.append((agg, max_count, i))

        if (i + 1) % 500_000 == 0:
            print(f"  Processed {i + 1:,} wines...")

    print(f"  {len(scored):,} wines passed filter (>={MIN_RATING_COUNT} ratings), {filtered_out:,} filtered out")

    # Sort by aggregate score (desc), then by rating count (desc)
    scored.sort(key=lambda x: (-x[0], -x[1]))

    # Take top N
    top_indices = [idx for _, _, idx in scored[:TOP_N]]
    print(f"  Selected top {min(TOP_N, len(scored)):,} wines")

    # Step 2: Transform
    print("Transforming wines to site schema...")
    seen_slugs = set()
    wines = []
    skipped = 0

    for rank, orig_idx in enumerate(top_indices):
        raw = raw_data[orig_idx]
        wine = transform_wine(raw, seen_slugs)
        if wine:
            wines.append(wine)
        else:
            skipped += 1

        if (rank + 1) % 25_000 == 0:
            print(f"  Transformed {rank + 1:,} wines...")

    print(f"  Transformed {len(wines):,} wines ({skipped} skipped)")

    # Sort by aggregate score descending for the output
    wines.sort(key=lambda w: -w["aggregateScore"])

    # Step 3: Build metadata files
    print("Building countries, regions, and grapes...")
    countries = build_countries(wines)
    regions = build_regions(wines)
    grapes = build_grapes(wines)
    print(f"  {len(countries)} countries, {len(regions)} regions, {len(grapes)} grape varieties")

    # Step 4: Write output files
    print(f"Writing {WINES_OUT}...")
    with open(WINES_OUT, "w", encoding="utf-8") as f:
        json.dump(wines, f, ensure_ascii=False, separators=(",", ":"))
    wine_size = os.path.getsize(WINES_OUT)
    print(f"  {wine_size / 1024 / 1024:.1f} MB")

    print(f"Writing {COUNTRIES_OUT}...")
    with open(COUNTRIES_OUT, "w", encoding="utf-8") as f:
        json.dump(countries, f, ensure_ascii=False, indent=2)

    print(f"Writing {REGIONS_OUT}...")
    with open(REGIONS_OUT, "w", encoding="utf-8") as f:
        json.dump(regions, f, ensure_ascii=False, indent=2)

    print(f"Writing {GRAPES_OUT}...")
    with open(GRAPES_OUT, "w", encoding="utf-8") as f:
        json.dump(grapes, f, ensure_ascii=False, indent=2)

    # Summary
    print("\n--- Import Summary ---")
    print(f"Total wines in merged dataset: {len(raw_data):,}")
    print(f"Wines imported to site:        {len(wines):,}")
    print(f"Countries:                     {len(countries)}")
    print(f"Regions:                       {len(regions)}")
    print(f"Grape varieties:               {len(grapes)}")
    print(f"wines.json size:               {wine_size / 1024 / 1024:.1f} MB")

    # Top 5 wines as sanity check
    print("\nTop 5 wines by aggregate score:")
    for w in wines[:5]:
        score_strs = ", ".join(f"{s['source']}:{s['score']}" for s in w["scores"])
        print(f"  {w['aggregateScore']:.1f} | {w['producer']} - {w['name']} ({w['country']}) [{score_strs}]")

    print("\nDone! Files written to src/lib/")


if __name__ == "__main__":
    main()
