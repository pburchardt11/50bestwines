#!/usr/bin/env python3
"""
Vivino Wine Scraper - Scrapes real wine data from Vivino's public explore API.
Uses country + wine type + price range combinations to maximize unique wines.
"""

import json
import time
import os
import sys
import hashlib
from urllib.request import Request, urlopen
from urllib.parse import urlencode
from urllib.error import HTTPError, URLError

OUTPUT_DIR = "/Users/mac/50bestwines/scraper/raw-data/vivino"
os.makedirs(OUTPUT_DIR, exist_ok=True)

USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

# Wine type IDs
WINE_TYPES = {
    1: "Red",
    2: "White",
    3: "Sparkling",
    4: "Rosé",
    7: "Dessert",
    24: "Fortified",
}

# Origin countries to scrape
ORIGIN_COUNTRIES = [
    "fr", "it", "es", "us", "ar", "au", "cl", "za", "de", "pt",
    "at", "nz", "hu", "ro", "ge", "md", "br", "uy", "mx", "ca",
    "il", "lb", "tr", "bg", "hr", "si", "sk", "cz", "ch", "be",
    "gb", "gr", "cy", "mt", "cn", "jp", "kr", "in", "th",
    "ma", "tn", "dz", "eg",
]

# Price ranges (USD) to multiply results
PRICE_RANGES = [
    (None, 10),
    (10, 20),
    (20, 35),
    (35, 50),
    (50, 100),
    (100, 200),
    (200, None),
]

def fetch_vivino(params, max_retries=3):
    """Fetch from Vivino explore API with retries."""
    base_url = "https://www.vivino.com/api/explore/explore?"

    # Build URL manually for array params
    parts = []
    for k, v in params.items():
        if isinstance(v, list):
            for item in v:
                parts.append(f"{k}%5B%5D={item}")  # URL-encode []
        elif v is not None:
            parts.append(f"{k}={v}")
    url = base_url + "&".join(parts)

    for attempt in range(max_retries):
        try:
            req = Request(url, headers={
                "User-Agent": USER_AGENT,
                "Accept": "application/json",
            })
            with urlopen(req, timeout=30) as resp:
                return json.loads(resp.read().decode())
        except (HTTPError, URLError, Exception) as e:
            if attempt < max_retries - 1:
                wait = (attempt + 1) * 5
                print(f"  Retry {attempt+1} after error: {e} (waiting {wait}s)", flush=True)
                time.sleep(wait)
            else:
                print(f"  FAILED after {max_retries} attempts: {e}", flush=True)
                return None

def extract_wine_data(match):
    """Extract structured wine data from a Vivino API match."""
    vintage = match.get("vintage", {})
    wine = vintage.get("wine", {})
    winery = wine.get("winery", {})
    region = wine.get("region", {})
    country = region.get("country", {})
    style = wine.get("style", {})
    taste = wine.get("taste", {})
    stats = vintage.get("statistics", {})
    image = vintage.get("image", {})

    # Get label image URL
    label_url = ""
    if image:
        variations = image.get("variations", {})
        label_url = variations.get("bottle_medium", "") or variations.get("label_large", "") or image.get("location", "")
        if label_url and not label_url.startswith("http"):
            label_url = "https:" + label_url

    # Build grape list
    grapes = []
    if style and style.get("grapes"):
        grapes = [g.get("name", "") for g in style.get("grapes", [])]

    # Taste structure
    structure = (taste.get("structure") or {}) if taste else {}

    return {
        "source": "vivino",
        "vivino_id": vintage.get("id"),
        "wine_id": wine.get("id"),
        "name": vintage.get("name", ""),
        "wine_name": wine.get("name", ""),
        "vintage": vintage.get("year", ""),
        "winery_name": winery.get("name", ""),
        "winery_id": winery.get("id"),
        "region": region.get("name", ""),
        "country": country.get("name", ""),
        "country_code": country.get("code", ""),
        "wine_type_id": wine.get("type_id"),
        "wine_type": WINE_TYPES.get(wine.get("type_id", 0), "Unknown"),
        "is_natural": wine.get("is_natural", False),
        "style_name": style.get("name", "") if style else "",
        "grapes": grapes,
        "vivino_rating": stats.get("ratings_average"),
        "vivino_ratings_count": stats.get("ratings_count", 0),
        "label_image_url": label_url,
        "seo_name": vintage.get("seo_name", ""),
        "acidity": structure.get("acidity"),
        "fizziness": structure.get("fizziness"),
        "intensity": structure.get("intensity"),
        "sweetness": structure.get("sweetness"),
        "tannin": structure.get("tannin"),
        "flavor_groups": [
            fg.get("group", "")
            for fg in (taste.get("flavor", []) or [])
        ] if taste else [],
    }

def scrape_combination(country_code, wine_type_id, price_min, price_max):
    """Scrape all pages for a specific country + type + price combo."""
    wines = []
    page = 1
    per_page = 25

    while True:
        params = {
            "country_code": "us",
            "currency_code": "USD",
            "country_codes": [country_code] if country_code else [],
            "wine_type_ids": [wine_type_id] if wine_type_id else [],
            "min_rating": 1,
            "order_by": "ratings_count",
            "order": "desc",
            "page": page,
            "per_page": per_page,
        }
        if price_min is not None:
            params["price_range_min"] = price_min
        if price_max is not None:
            params["price_range_max"] = price_max

        data = fetch_vivino(params)
        if not data:
            break

        matches = data.get("explore_vintage", {}).get("matches", [])
        if not matches:
            break

        for match in matches:
            wine_data = extract_wine_data(match)
            if wine_data["name"]:
                wines.append(wine_data)

        total = data.get("explore_vintage", {}).get("records_matched", 0)
        fetched = page * per_page

        if fetched >= total or fetched >= 2500:  # Vivino caps around 2500
            break

        page += 1
        time.sleep(1.5)  # Be polite

    return wines

def main():
    all_wines = {}  # keyed by vivino_id to deduplicate
    total_requests = 0

    # Strategy 1: Scrape by country (all types)
    print("=== Phase 1: Scraping by country (all wine types) ===")
    for i, country in enumerate(ORIGIN_COUNTRIES):
        print(f"\n[{i+1}/{len(ORIGIN_COUNTRIES)}] Scraping country: {country.upper()}")
        wines = scrape_combination(country, None, None, None)
        new = 0
        for w in wines:
            key = w["vivino_id"]
            if key and key not in all_wines:
                all_wines[key] = w
                new += 1
        print(f"  Found {len(wines)} wines, {new} new (total unique: {len(all_wines)})", flush=True)
        total_requests += 1
        time.sleep(2)

    # Save intermediate
    _save(all_wines, "vivino-phase1.json")

    # Strategy 2: Scrape by wine type + price range (no country filter)
    print("\n=== Phase 2: Scraping by wine type + price range ===")
    for type_id, type_name in WINE_TYPES.items():
        for price_min, price_max in PRICE_RANGES:
            price_label = f"${price_min or 0}-${price_max or '∞'}"
            print(f"  {type_name} {price_label}...")
            wines = scrape_combination(None, type_id, price_min, price_max)
            new = 0
            for w in wines:
                key = w["vivino_id"]
                if key and key not in all_wines:
                    all_wines[key] = w
                    new += 1
            print(f"    Found {len(wines)}, {new} new (total: {len(all_wines)})")
            time.sleep(2)

    # Save intermediate
    _save(all_wines, "vivino-phase2.json")

    # Strategy 3: Scrape by country + wine type combos for top wine countries
    print("\n=== Phase 3: Country + type combos for top countries ===")
    top_countries = ["fr", "it", "es", "us", "ar", "au", "cl", "de", "pt", "za", "nz", "at", "hu"]
    for country in top_countries:
        for type_id, type_name in WINE_TYPES.items():
            print(f"  {country.upper()} - {type_name}...")
            wines = scrape_combination(country, type_id, None, None)
            new = 0
            for w in wines:
                key = w["vivino_id"]
                if key and key not in all_wines:
                    all_wines[key] = w
                    new += 1
            if new > 0:
                print(f"    Found {len(wines)}, {new} new (total: {len(all_wines)})")
            time.sleep(1.5)

    # Save final
    _save(all_wines, "vivino-all.json")
    print(f"\n=== DONE: {len(all_wines)} unique wines scraped from Vivino ===")

def _save(wines_dict, filename):
    path = os.path.join(OUTPUT_DIR, filename)
    wines_list = list(wines_dict.values())
    with open(path, "w") as f:
        json.dump(wines_list, f, ensure_ascii=False)
    size_mb = os.path.getsize(path) / 1024 / 1024
    print(f"  Saved {len(wines_list)} wines to {path} ({size_mb:.1f} MB)")

if __name__ == "__main__":
    main()
