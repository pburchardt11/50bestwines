#!/usr/bin/env python3
"""
Vivino label image scraper.
Queries Vivino's explore API across countries and wine types to collect label image URLs,
then matches results to wines in the database and updates label_url.

Resilient against dropped DB connections — opens a fresh connection per page batch.
"""

import re
import time
import json
import urllib.request
import urllib.parse
import psycopg2
import psycopg2.extras

import os; DB_URL = os.environ.get("DATABASE_URL", "")

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
# Commit every N pages to keep transactions short
COMMIT_EVERY = 5


def normalize(text: str) -> str:
    """Lowercase, strip punctuation/extra spaces for fuzzy matching."""
    if not text:
        return ""
    text = text.lower()
    text = re.sub(r"[^a-z0-9 ]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def fetch_page(country: str, wine_type: int, page: int, retries: int = 2):
    """Fetch one page from Vivino explore API. Returns list of match dicts or None on error."""
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
    for attempt in range(retries + 1):
        try:
            with urllib.request.urlopen(req, timeout=15) as resp:
                data = json.loads(resp.read().decode("utf-8"))
            return data.get("explore_vintage", {}).get("matches", [])
        except Exception as e:
            msg = str(e)
            if attempt < retries:
                # Back off and retry
                wait = 10 * (attempt + 1)
                print(f"    Vivino error on page {page} (attempt {attempt+1}): {msg[:80]} — retrying in {wait}s", flush=True)
                time.sleep(wait)
            else:
                print(f"    ERROR fetching page {page} ({country}/{wine_type}) after {retries+1} attempts: {msg[:100]}", flush=True)
                return None  # Stop paginating this combo


def extract_image_url(match: dict):
    """Pull the best label image URL from a Vivino match dict."""
    vintage = match.get("vintage", {})
    image = vintage.get("image", {})
    variations = image.get("variations", {})
    url = (
        variations.get("label_large")
        or variations.get("label")
        or image.get("location")
    )
    if url:
        return "https:" + url if url.startswith("//") else url
    return None


def extract_wine_info(match: dict):
    """Return (vintage_name, wine_name, winery_name) for matching."""
    vintage = match.get("vintage", {})
    wine = vintage.get("wine", {})
    winery = wine.get("winery", {})
    return vintage.get("name", ""), wine.get("name", ""), winery.get("name", "")


def load_db_wines():
    """Load wines that need labels. Returns (by_name_producer, by_name) dicts."""
    conn = psycopg2.connect(DB_URL)
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
    conn.close()

    by_name_producer = {}
    by_name = {}
    for row in rows:
        name = normalize(row["name"])
        producer = normalize(row["producer"])
        key_np = (name, producer)
        by_name_producer.setdefault(key_np, []).append(dict(row))
        by_name.setdefault(name, []).append(dict(row))

    print(f"Loaded {len(rows)} wines from DB that need labels.", flush=True)
    return by_name_producer, by_name


def match_wine(vintage_name, wine_name, winery_name, by_name_producer, by_name):
    """Match Vivino result to DB wine IDs."""
    vn = normalize(vintage_name)
    wn = normalize(wine_name)
    wr = normalize(winery_name)

    candidates = by_name_producer.get((vn, wr), [])
    if candidates:
        return [r["id"] for r in candidates]

    candidates = by_name_producer.get((wn, wr), [])
    if candidates:
        return [r["id"] for r in candidates]

    if len(vn) > 10:
        candidates = by_name.get(vn, [])
        if candidates:
            return [r["id"] for r in candidates]

    if len(wn) > 10:
        candidates = by_name.get(wn, [])
        if candidates:
            return [r["id"] for r in candidates]

    return []


def flush_updates(pending: list):
    """Write pending (image_url, wine_id) updates to DB. Opens fresh connection per call."""
    if not pending:
        return 0

    retry_delays = [5, 15, 30]
    for attempt in range(4):
        try:
            conn = psycopg2.connect(DB_URL, connect_timeout=30)
            cur = conn.cursor()
            for image_url, wid in pending:
                cur.execute(
                    "UPDATE wines SET label_url = %s WHERE id = %s",
                    (image_url, wid)
                )
            conn.commit()
            cur.close()
            conn.close()
            return len(pending)
        except Exception as e:
            print(f"  DB write error (attempt {attempt+1}/4): {type(e).__name__}: {e}", flush=True)
            if attempt < 3:
                delay = retry_delays[min(attempt, len(retry_delays)-1)]
                print(f"  Retrying in {delay}s...", flush=True)
                time.sleep(delay)
            else:
                print(f"  Giving up on {len(pending)} updates for this batch.", flush=True)
                return 0
    return 0


def main():
    print("Loading wines from database...", flush=True)
    by_name_producer, by_name = load_db_wines()

    total_api_calls = 0
    total_updates = 0
    updated_ids = set()

    pending_updates = []  # accumulate (image_url, wine_id) pairs

    for country in COUNTRIES:
        for wine_type in WINE_TYPES:
            type_name = WINE_TYPE_NAMES.get(wine_type, str(wine_type))
            print(f"\n--- Country: {country.upper()}  Type: {type_name} ---", flush=True)
            combo_updates = 0

            for page in range(1, MAX_PAGES + 1):
                matches = fetch_page(country, wine_type, page)
                total_api_calls += 1

                if matches is None:
                    break  # API error, skip rest of combo

                if len(matches) == 0:
                    break  # No more results

                for match in matches:
                    image_url = extract_image_url(match)
                    if not image_url:
                        continue

                    vintage_name, wine_name, winery_name = extract_wine_info(match)
                    wine_ids = match_wine(vintage_name, wine_name, winery_name, by_name_producer, by_name)

                    for wid in wine_ids:
                        if wid not in updated_ids:
                            pending_updates.append((image_url, wid))
                            updated_ids.add(wid)

                # Flush to DB every COMMIT_EVERY pages
                if page % COMMIT_EVERY == 0 and pending_updates:
                    saved = flush_updates(pending_updates)
                    combo_updates += saved
                    total_updates += saved
                    pending_updates = []
                    print(f"  Page {page}: {combo_updates} updates this combo (total {total_updates})", flush=True)

                if len(matches) < PER_PAGE:
                    break  # Last page for this combo

                time.sleep(DELAY)

            # Flush remaining for this combo
            if pending_updates:
                saved = flush_updates(pending_updates)
                combo_updates += saved
                total_updates += saved
                pending_updates = []

            print(f"  Done {country.upper()}/{type_name}: {combo_updates} updates", flush=True)

    # Final flush (shouldn't be needed but safety net)
    if pending_updates:
        saved = flush_updates(pending_updates)
        total_updates += saved

    print("\n" + "="*60, flush=True)
    print("FINISHED", flush=True)
    print(f"  Total API calls:      {total_api_calls}", flush=True)
    print(f"  Unique wines updated: {total_updates}", flush=True)
    print("="*60, flush=True)


if __name__ == "__main__":
    main()
