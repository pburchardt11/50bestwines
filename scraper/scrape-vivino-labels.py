#!/usr/bin/env python3
"""
Vivino label image scraper.
Queries Vivino's explore API across countries and wine types to collect label image URLs,
then matches results to wines in the database and updates label_url.
"""

import re
import time
import json
import urllib.request
import urllib.parse
import psycopg2
import psycopg2.extras

DB_URL = "postgresql://neondb_owner:npg_PL8RkghoMxG6@ep-fancy-forest-awmd0h5i-pooler.c-12.us-east-1.aws.neon.tech/neondb?sslmode=require"

COUNTRIES = ["fr", "it", "es", "us", "ar", "au", "cl", "za", "de", "pt", "at", "nz", "hu", "gr", "br", "uy"]
WINE_TYPES = [1, 2, 3, 4, 7, 24]  # Red, White, Sparkling, Rosé, Dessert, Fortified
WINE_TYPE_NAMES = {1: "Red", 2: "White", 3: "Sparkling", 4: "Rosé", 7: "Dessert", 24: "Fortified"}

API_BASE = "https://www.vivino.com/api/explore/explore"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "application/json",
}
DELAY = 1.5
PER_PAGE = 25
MAX_PAGES = 100  # 2500 wines max per country+type combo


def normalize(text: str) -> str:
    """Lowercase, strip punctuation/extra spaces for fuzzy matching."""
    if not text:
        return ""
    text = text.lower()
    text = re.sub(r"[^a-z0-9 ]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def fetch_page(country: str, wine_type: int, page: int) -> list:
    """Fetch one page from Vivino explore API. Returns list of match dicts."""
    params = {
        "country_code": country,
        "currency_code": "USD",
        "min_rating": "1",
        "order_by": "ratings_count",
        "order": "desc",
        "page": str(page),
        "per_page": str(PER_PAGE),
        "wine_type_ids[]": str(wine_type),
    }
    url = API_BASE + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        return data.get("explore_vintage", {}).get("matches", [])
    except Exception as e:
        print(f"    ERROR fetching page {page} ({country}/{wine_type}): {e}")
        return None  # None = stop paginating


def extract_image_url(match: dict) -> str | None:
    """Pull the best label image URL from a Vivino match dict."""
    vintage = match.get("vintage", {})
    image = vintage.get("image", {})
    variations = image.get("variations", {})
    # Prefer label_large, fall back to label, then location
    url = (
        variations.get("label_large")
        or variations.get("label")
        or image.get("location")
    )
    if url:
        return "https:" + url if url.startswith("//") else url
    return None


def extract_wine_info(match: dict) -> tuple[str, str, str]:
    """Return (vintage_name, wine_name, winery_name) for matching."""
    vintage = match.get("vintage", {})
    wine = vintage.get("wine", {})
    winery = wine.get("winery", {})
    vintage_name = vintage.get("name", "")
    wine_name = wine.get("name", "")
    winery_name = winery.get("name", "")
    return vintage_name, wine_name, winery_name


def load_db_wines(conn) -> dict:
    """
    Load wines that need labels from DB.
    Returns dict keyed by normalized (name, producer) tuples and also by normalized name alone.
    Structure: {norm_key: [row_dict, ...]}
    """
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    cur.execute("""
        SELECT id, name, producer
        FROM wines
        WHERE label_url = ''
           OR label_url IS NULL
           OR label_url LIKE 'https://www.vivino.com/search/%%'
           OR (label_url NOT LIKE 'https://images.%%' AND label_url NOT LIKE 'http://images.%%')
    """)
    rows = cur.fetchall()
    cur.close()

    by_name_producer = {}
    by_name = {}

    for row in rows:
        name = normalize(row["name"])
        producer = normalize(row["producer"])

        key_np = (name, producer)
        by_name_producer.setdefault(key_np, []).append(dict(row))

        by_name.setdefault(name, []).append(dict(row))

    print(f"Loaded {len(rows)} wines from DB that need labels.")
    return by_name_producer, by_name


def needs_update(label_url: str | None) -> bool:
    if not label_url:
        return True
    if label_url.startswith("https://images.") or label_url.startswith("http://images."):
        return False
    return True


def match_wine(vintage_name, wine_name, winery_name, by_name_producer, by_name) -> list[int]:
    """
    Try to match Vivino wine to DB rows. Returns list of matching wine IDs.
    Strategy:
      1. Try (full vintage name, winery) key
      2. Try (wine name, winery) key
      3. Try vintage name alone
      4. Try wine name alone
    """
    vn = normalize(vintage_name)
    wn = normalize(wine_name)
    wr = normalize(winery_name)

    # Strategy 1: full vintage name + winery
    candidates = by_name_producer.get((vn, wr), [])
    if candidates:
        return [r["id"] for r in candidates]

    # Strategy 2: wine name + winery
    candidates = by_name_producer.get((wn, wr), [])
    if candidates:
        return [r["id"] for r in candidates]

    # Strategy 3: vintage name alone (only if unambiguous enough — name > 10 chars)
    if len(vn) > 10:
        candidates = by_name.get(vn, [])
        if candidates:
            return [r["id"] for r in candidates]

    # Strategy 4: wine name alone
    if len(wn) > 10:
        candidates = by_name.get(wn, [])
        if candidates:
            return [r["id"] for r in candidates]

    return []


def main():
    print("Connecting to database...")
    conn = psycopg2.connect(DB_URL)
    conn.autocommit = False

    by_name_producer, by_name = load_db_wines(conn)

    total_api_calls = 0
    total_matches = 0
    total_updates = 0
    updated_ids = set()

    cur = conn.cursor()

    for country in COUNTRIES:
        for wine_type in WINE_TYPES:
            type_name = WINE_TYPE_NAMES.get(wine_type, str(wine_type))
            print(f"\n--- Country: {country.upper()}  Type: {type_name} ---")
            combo_updates = 0

            for page in range(1, MAX_PAGES + 1):
                matches = fetch_page(country, wine_type, page)
                total_api_calls += 1

                if matches is None:
                    # Error — skip rest of this combo
                    break

                if len(matches) == 0:
                    # No more results
                    break

                for match in matches:
                    image_url = extract_image_url(match)
                    if not image_url:
                        continue

                    vintage_name, wine_name, winery_name = extract_wine_info(match)
                    wine_ids = match_wine(vintage_name, wine_name, winery_name, by_name_producer, by_name)

                    if wine_ids:
                        total_matches += len(wine_ids)
                        for wid in wine_ids:
                            if wid not in updated_ids:
                                cur.execute(
                                    "UPDATE wines SET label_url = %s WHERE id = %s",
                                    (image_url, wid)
                                )
                                updated_ids.add(wid)
                                total_updates += 1
                                combo_updates += 1

                if page % 10 == 0:
                    conn.commit()
                    print(f"  Page {page}: {combo_updates} updates so far (total {total_updates})")

                if len(matches) < PER_PAGE:
                    # Last page
                    break

                time.sleep(DELAY)

            conn.commit()
            print(f"  Done {country.upper()}/{type_name}: {combo_updates} updates")

    conn.commit()
    cur.close()
    conn.close()

    print("\n" + "="*60)
    print(f"FINISHED")
    print(f"  Total API calls:  {total_api_calls}")
    print(f"  Total matches:    {total_matches}")
    print(f"  Unique wines updated: {total_updates}")
    print("="*60)


if __name__ == "__main__":
    main()
