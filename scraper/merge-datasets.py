#!/usr/bin/env python3
"""
Merge all wine datasets into a unified format for 50bestwines.com.

Sources:
1. X-Wines (100K wines + 21M ratings)
2. WineSensed (350K+ vintages from Vivino)
3. cipher982/wine-text-126k (126K wines with descriptions)
4. Vivino scrape (2.5K+ wines with label images)
5. Open Food Facts (16K wines with label images)

Output: unified JSON with standardized fields
"""

import json
import os
import sys
import hashlib
import re
from collections import defaultdict

RAW_DIR = "/Users/mac/50bestwines/scraper/raw-data"
OUTPUT_FILE = os.path.join(RAW_DIR, "merged-wines.json")

def normalize_name(name):
    """Normalize wine name for deduplication."""
    if not name:
        return ""
    # Remove vintage year
    name = re.sub(r'\b(19|20)\d{2}\b', '', name)
    # Lowercase, strip, collapse whitespace
    name = re.sub(r'\s+', ' ', name.lower().strip())
    # Remove common suffixes
    name = re.sub(r'\b(n\.v\.|nv|n/v)\b', '', name)
    return name.strip()

def dedup_key(wine):
    """Create a dedup key from wine name + winery."""
    name = normalize_name(wine.get("name", ""))
    winery = normalize_name(wine.get("winery_name", "") or wine.get("producer", ""))
    country = (wine.get("country", "") or "").lower().strip()
    return f"{winery}|{name}|{country}"

# ============================
# Load datasets
# ============================
all_wines = {}  # dedup_key -> wine record
stats = defaultdict(int)

# ---- 1. X-Wines (already processed with ratings) ----
xwines_path = os.path.join(RAW_DIR, "xwines-processed.json")
if os.path.exists(xwines_path):
    print("Loading X-Wines (100K)...")
    with open(xwines_path) as f:
        xwines = json.load(f)
    for w in xwines:
        record = {
            "name": w["name"],
            "winery_name": w.get("winery_name", ""),
            "wine_type": w.get("wine_type", ""),
            "grapes": w.get("grapes", []),
            "country": w.get("country", ""),
            "country_code": w.get("country_code", ""),
            "region": w.get("region", ""),
            "abv": w.get("abv", ""),
            "body": w.get("body", ""),
            "acidity": w.get("acidity", ""),
            "food_pairings": w.get("food_pairings", []),
            "vintages": w.get("vintages", []),
            "website": w.get("website", ""),
            "label_image_url": "",
            "scores": {},
            "sources": ["xwines"],
        }
        # Add X-Wines community rating
        if w.get("xwines_avg_rating"):
            record["scores"]["xwines_community"] = {
                "score": w["xwines_avg_rating"],
                "max_score": 5,
                "count": w.get("xwines_ratings_count", 0),
            }
        key = dedup_key(record)
        if key and key not in all_wines:
            all_wines[key] = record
            stats["xwines"] += 1
    print(f"  X-Wines: {stats['xwines']} wines loaded")
else:
    print("  X-Wines not found, skipping")

# ---- 2. WineSensed ----
winesensed_path = os.path.join(RAW_DIR, "winesensed-wines.json")
if os.path.exists(winesensed_path):
    print("Loading WineSensed (350K)...")
    with open(winesensed_path) as f:
        winesensed = json.load(f)
    for w in winesensed:
        # WineSensed fields: wine, year, country, region, rating, price, wine_alcohol, grape, review, vintage_id, winery_id, vintage_page_url
        name = w.get("wine", "") or w.get("name", "") or ""
        record = {
            "name": name,
            "winery_name": "",  # Not directly available — embedded in wine name
            "wine_type": "",
            "grapes": [w["grapes"]] if isinstance(w.get("grapes"), str) and w.get("grapes") else w.get("grapes", []) if isinstance(w.get("grapes"), list) else [],
            "country": w.get("country", ""),
            "country_code": "",
            "region": w.get("region", ""),
            "abv": str(w.get("abv", "")) or "",
            "vintage": str(w.get("year", "")) or "",
            "label_image_url": "",  # Images are in the dataset but not extracted here
            "description": w.get("review", ""),
            "scores": {},
            "sources": ["winesensed"],
        }
        # Construct label image URL from vintage_page_url if available
        if w.get("vintage_page_url"):
            record["vivino_url"] = w["vintage_page_url"]

        # Add Vivino rating
        rating = w.get("rating", None)
        if rating:
            try:
                record["scores"]["vivino"] = {
                    "score": float(rating),
                    "max_score": 5,
                    "count": 0,
                }
            except (ValueError, TypeError):
                pass

        # Add price
        price = w.get("price", None)
        if price:
            try:
                record["price"] = float(price)
            except (ValueError, TypeError):
                pass

        key = dedup_key(record)
        if key and key not in all_wines:
            all_wines[key] = record
            stats["winesensed"] += 1
        elif key and key in all_wines:
            # Merge: add image and scores
            existing = all_wines[key]
            if record.get("label_image_url") and not existing.get("label_image_url"):
                existing["label_image_url"] = record["label_image_url"]
            for score_key, score_val in record.get("scores", {}).items():
                if score_key not in existing.get("scores", {}):
                    existing.setdefault("scores", {})[score_key] = score_val
            if "winesensed" not in existing.get("sources", []):
                existing.setdefault("sources", []).append("winesensed")
            stats["winesensed_merged"] += 1

    print(f"  WineSensed: {stats['winesensed']} new + {stats['winesensed_merged']} merged")
else:
    print("  WineSensed not found, skipping")

# ---- 3. cipher982/wine-text-126k ----
cipher_path = os.path.join(RAW_DIR, "cipher982-wine-text-126k.json")
if os.path.exists(cipher_path):
    print("Loading cipher982 wine-text-126k...")
    with open(cipher_path) as f:
        cipher_wines = json.load(f)
    for w in cipher_wines:
        # cipher982 fields: id, name, description, price, category, region, image_id
        name = w.get("name", "") or ""
        # Category is wine type (e.g., "sparkling", "red", "white")
        category = (w.get("category", "") or "").capitalize()
        # Region is country-level (e.g., "france")
        region = (w.get("region", "") or "").title()
        record = {
            "name": name,
            "winery_name": "",
            "wine_type": category,
            "description": w.get("description", ""),
            "country": region,  # Region in this dataset is actually country
            "region": "",
            "price": w.get("price", None),
            "label_image_url": "",  # Images are in separate dataset
            "scores": {},
            "sources": ["cipher982"],
        }
        if w.get("image_id"):
            record["cipher982_image_id"] = w["image_id"]

        key = dedup_key(record)
        if key and key not in all_wines:
            all_wines[key] = record
            stats["cipher982"] += 1
        elif key and key in all_wines:
            existing = all_wines[key]
            if w.get("description") and not existing.get("description"):
                existing["description"] = w["description"]
            if w.get("price") and not existing.get("price"):
                existing["price"] = w["price"]
            if "cipher982" not in existing.get("sources", []):
                existing.setdefault("sources", []).append("cipher982")
            stats["cipher982_merged"] += 1

    print(f"  cipher982: {stats['cipher982']} new + {stats['cipher982_merged']} merged")
else:
    print("  cipher982 not found, skipping")

# ---- 4. Vivino scrape ----
vivino_dir = os.path.join(RAW_DIR, "vivino")
vivino_files = sorted(f for f in os.listdir(vivino_dir) if f.endswith(".json")) if os.path.isdir(vivino_dir) else []
if vivino_files:
    print(f"Loading Vivino scrape ({len(vivino_files)} files)...")
    for vf in vivino_files:
        with open(os.path.join(vivino_dir, vf)) as f:
            vivino_wines = json.load(f)
        for w in vivino_wines:
            record = {
                "name": w.get("name", ""),
                "winery_name": w.get("winery_name", ""),
                "wine_type": w.get("wine_type", ""),
                "grapes": w.get("grapes", []),
                "country": w.get("country", ""),
                "country_code": w.get("country_code", ""),
                "region": w.get("region", ""),
                "label_image_url": w.get("label_image_url", ""),
                "style_name": w.get("style_name", ""),
                "scores": {},
                "sources": ["vivino_scrape"],
            }
            if w.get("vivino_rating"):
                record["scores"]["vivino"] = {
                    "score": w["vivino_rating"],
                    "max_score": 5,
                    "count": w.get("vivino_ratings_count", 0),
                }

            key = dedup_key(record)
            if key and key not in all_wines:
                all_wines[key] = record
                stats["vivino_scrape"] += 1
            elif key and key in all_wines:
                existing = all_wines[key]
                if w.get("label_image_url") and not existing.get("label_image_url"):
                    existing["label_image_url"] = w["label_image_url"]
                if w.get("vivino_rating") and "vivino" not in existing.get("scores", {}):
                    existing.setdefault("scores", {})["vivino"] = {
                        "score": w["vivino_rating"],
                        "max_score": 5,
                        "count": w.get("vivino_ratings_count", 0),
                    }
                stats["vivino_merged"] += 1

    print(f"  Vivino: {stats['vivino_scrape']} new + {stats.get('vivino_merged', 0)} merged")

# ---- 5. Open Food Facts ----
off_path = os.path.join(RAW_DIR, "openfoodfacts-wines.json")
if os.path.exists(off_path):
    print("Loading Open Food Facts wines...")
    with open(off_path) as f:
        off_wines = json.load(f)
    for w in off_wines:
        name = w.get("product_name", "")
        if not name:
            continue
        countries = w.get("countries_tags", [])
        country = countries[0].replace("en:", "").replace("-", " ").title() if countries else ""

        record = {
            "name": name,
            "winery_name": w.get("brands", ""),
            "country": country,
            "label_image_url": w.get("image_front_url", ""),
            "abv": w.get("alcohol_100g", ""),
            "scores": {},
            "sources": ["openfoodfacts"],
        }

        key = dedup_key(record)
        if key and key not in all_wines:
            all_wines[key] = record
            stats["openfoodfacts"] += 1
        elif key and key in all_wines:
            existing = all_wines[key]
            if w.get("image_front_url") and not existing.get("label_image_url"):
                existing["label_image_url"] = w["image_front_url"]
            stats["off_merged"] += 1
    print(f"  Open Food Facts: {stats['openfoodfacts']} new + {stats.get('off_merged', 0)} merged")
else:
    print("  Open Food Facts not found, skipping")

# ============================
# Summary & Save
# ============================
wines_list = list(all_wines.values())

# Stats
with_images = sum(1 for w in wines_list if w.get("label_image_url"))
with_scores = sum(1 for w in wines_list if w.get("scores"))
countries = set(w.get("country", "") for w in wines_list if w.get("country"))
wineries = set(w.get("winery_name", "") for w in wines_list if w.get("winery_name"))
wine_types = defaultdict(int)
for w in wines_list:
    t = w.get("wine_type", "Unknown") or "Unknown"
    wine_types[t] += 1

print(f"\n{'='*60}")
print(f"MERGE COMPLETE")
print(f"{'='*60}")
print(f"Total unique wines: {len(wines_list):,}")
print(f"With label images:  {with_images:,}")
print(f"With scores:        {with_scores:,}")
print(f"Unique countries:   {len(countries)}")
print(f"Unique wineries:    {len(wineries):,}")
print(f"\nWine types:")
for t, n in sorted(wine_types.items(), key=lambda x: -x[1])[:10]:
    print(f"  {t}: {n:,}")

print(f"\nSources:")
for src, count in sorted(stats.items(), key=lambda x: -x[1]):
    print(f"  {src}: {count:,}")

# Save
with open(OUTPUT_FILE, "w") as f:
    json.dump(wines_list, f, ensure_ascii=False)
size_mb = os.path.getsize(OUTPUT_FILE) / 1024 / 1024
print(f"\nSaved to {OUTPUT_FILE} ({size_mb:.1f} MB)")
