#!/usr/bin/env python3
"""
Merge v2 — relaxed dedup: keep vintage variants as separate entries.
"Chateau Margaux 2015" and "Chateau Margaux 2018" are different wines.
"""

import json
import os
import sys
import re
from collections import defaultdict

RAW_DIR = "/Users/mac/50bestwines/scraper/raw-data"
OUTPUT_FILE = os.path.join(RAW_DIR, "merged-wines-v2.json")

def normalize_name(name):
    if not name:
        return ""
    return re.sub(r'\s+', ' ', name.lower().strip())

def dedup_key(wine):
    """Dedup key includes vintage — different vintages = different wines."""
    name = normalize_name(wine.get("name", ""))
    winery = normalize_name(wine.get("winery_name", "") or "")
    country = (wine.get("country", "") or "").lower().strip()
    vintage = str(wine.get("vintage", "") or wine.get("year", "") or "").strip()
    return f"{winery}|{name}|{country}|{vintage}"

all_wines = {}
stats = defaultdict(int)

# ---- 1. X-Wines ----
path = os.path.join(RAW_DIR, "xwines-processed.json")
if os.path.exists(path):
    print("Loading X-Wines...", flush=True)
    with open(path) as f:
        data = json.load(f)
    for w in data:
        # X-Wines has a vintages list — expand each wine into per-vintage entries
        vintages = w.get("vintages", [])
        if not vintages:
            vintages = [""]
        for v in vintages:
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
                "vintage": str(v) if v else "",
                "website": w.get("website", ""),
                "label_image_url": "",
                "scores": {},
                "sources": ["xwines"],
            }
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
    print(f"  X-Wines: {stats['xwines']:,}", flush=True)

# ---- 2. WineSensed ----
path = os.path.join(RAW_DIR, "winesensed-wines.json")
if os.path.exists(path):
    print("Loading WineSensed...", flush=True)
    with open(path) as f:
        data = json.load(f)
    for w in data:
        name = w.get("name", "") or w.get("wine", "") or ""
        if not name:
            continue
        record = {
            "name": name,
            "winery_name": "",
            "wine_type": "",
            "grapes": [w["grapes"]] if isinstance(w.get("grapes"), str) and w.get("grapes") else [],
            "country": w.get("country", ""),
            "region": w.get("region", ""),
            "abv": str(w.get("abv", "")) if w.get("abv") else "",
            "vintage": str(w.get("year", "")) if w.get("year") else "",
            "label_image_url": "",
            "description": w.get("review", ""),
            "scores": {},
            "sources": ["winesensed"],
        }
        if w.get("vintage_page_url"):
            record["vivino_url"] = w["vintage_page_url"]
        rating = w.get("rating")
        if rating:
            try:
                record["scores"]["vivino"] = {"score": float(rating), "max_score": 5, "count": 0}
            except (ValueError, TypeError):
                pass
        price = w.get("price")
        if price:
            try:
                record["price"] = float(price)
            except (ValueError, TypeError):
                pass

        key = dedup_key(record)
        if key and key not in all_wines:
            all_wines[key] = record
            stats["winesensed"] += 1
        elif key in all_wines:
            existing = all_wines[key]
            # Merge scores/description
            for sk, sv in record.get("scores", {}).items():
                if sk not in existing.get("scores", {}):
                    existing.setdefault("scores", {})[sk] = sv
            if record.get("description") and not existing.get("description"):
                existing["description"] = record["description"]
            if "winesensed" not in existing.get("sources", []):
                existing["sources"].append("winesensed")
            stats["winesensed_merged"] += 1
    print(f"  WineSensed: {stats['winesensed']:,} new + {stats['winesensed_merged']:,} merged", flush=True)

# ---- 3. cipher982 ----
path = os.path.join(RAW_DIR, "cipher982-wine-text-126k.json")
if os.path.exists(path):
    print("Loading cipher982...", flush=True)
    with open(path) as f:
        data = json.load(f)
    for w in data:
        name = w.get("name", "") or ""
        if not name:
            continue
        category = (w.get("category", "") or "").capitalize()
        region = (w.get("region", "") or "").title()
        record = {
            "name": name,
            "winery_name": "",
            "wine_type": category,
            "description": w.get("description", ""),
            "country": region,
            "region": "",
            "price": w.get("price"),
            "vintage": "",
            "label_image_url": "",
            "scores": {},
            "sources": ["cipher982"],
        }
        if w.get("image_id"):
            record["cipher982_image_id"] = w["image_id"]

        key = dedup_key(record)
        if key and key not in all_wines:
            all_wines[key] = record
            stats["cipher982"] += 1
        elif key in all_wines:
            existing = all_wines[key]
            if w.get("description") and not existing.get("description"):
                existing["description"] = w["description"]
            if w.get("price") and not existing.get("price"):
                existing["price"] = w["price"]
            if "cipher982" not in existing.get("sources", []):
                existing["sources"].append("cipher982")
            stats["cipher982_merged"] += 1
    print(f"  cipher982: {stats['cipher982']:,} new + {stats['cipher982_merged']:,} merged", flush=True)

# ---- 4. Vivino scrape ----
vivino_dir = os.path.join(RAW_DIR, "vivino")
if os.path.isdir(vivino_dir):
    print("Loading Vivino scrape...", flush=True)
    for vf in sorted(os.listdir(vivino_dir)):
        if not vf.endswith(".json"):
            continue
        with open(os.path.join(vivino_dir, vf)) as f:
            vdata = json.load(f)
        for w in vdata:
            record = {
                "name": w.get("name", ""),
                "winery_name": w.get("winery_name", ""),
                "wine_type": w.get("wine_type", ""),
                "grapes": w.get("grapes", []),
                "country": w.get("country", ""),
                "country_code": w.get("country_code", ""),
                "region": w.get("region", ""),
                "vintage": "",
                "label_image_url": w.get("label_image_url", ""),
                "scores": {},
                "sources": ["vivino_scrape"],
            }
            if w.get("vivino_rating"):
                record["scores"]["vivino"] = {"score": w["vivino_rating"], "max_score": 5, "count": w.get("vivino_ratings_count", 0)}
            key = dedup_key(record)
            if key and key not in all_wines:
                all_wines[key] = record
                stats["vivino_scrape"] += 1
            elif key in all_wines:
                existing = all_wines[key]
                if w.get("label_image_url") and not existing.get("label_image_url"):
                    existing["label_image_url"] = w["label_image_url"]
                if w.get("vivino_rating") and "vivino" not in existing.get("scores", {}):
                    existing["scores"]["vivino"] = {"score": w["vivino_rating"], "max_score": 5, "count": w.get("vivino_ratings_count", 0)}
                stats["vivino_merged"] += 1
    print(f"  Vivino: {stats.get('vivino_scrape',0):,} new + {stats.get('vivino_merged',0):,} merged", flush=True)

# ---- 5. Open Food Facts ----
path = os.path.join(RAW_DIR, "openfoodfacts-wines.json")
if os.path.exists(path):
    print("Loading Open Food Facts...", flush=True)
    with open(path) as f:
        data = json.load(f)
    for w in data:
        name = w.get("product_name", "")
        if not name:
            continue
        countries = w.get("countries_tags", [])
        country = countries[0].replace("en:", "").replace("-", " ").title() if countries else ""
        record = {
            "name": name,
            "winery_name": w.get("brands", ""),
            "country": country,
            "vintage": "",
            "label_image_url": w.get("image_front_url", ""),
            "abv": str(w.get("alcohol_100g", "")) if w.get("alcohol_100g") else "",
            "scores": {},
            "sources": ["openfoodfacts"],
        }
        key = dedup_key(record)
        if key and key not in all_wines:
            all_wines[key] = record
            stats["openfoodfacts"] += 1
        elif key in all_wines:
            existing = all_wines[key]
            if w.get("image_front_url") and not existing.get("label_image_url"):
                existing["label_image_url"] = w["image_front_url"]
            stats["off_merged"] += 1
    print(f"  OFF: {stats['openfoodfacts']:,} new + {stats.get('off_merged',0):,} merged", flush=True)

# ============================
# Summary
# ============================
wines_list = list(all_wines.values())
with_images = sum(1 for w in wines_list if w.get("label_image_url"))
with_scores = sum(1 for w in wines_list if w.get("scores"))
countries = set(w.get("country", "") for w in wines_list if w.get("country"))
wineries = set(w.get("winery_name", "") for w in wines_list if w.get("winery_name"))

wine_types = defaultdict(int)
for w in wines_list:
    t = w.get("wine_type", "Unknown") or "Unknown"
    wine_types[t] += 1

print(f"\n{'='*60}")
print(f"MERGE v2 COMPLETE (vintage-aware dedup)")
print(f"{'='*60}")
print(f"Total unique wines:  {len(wines_list):,}")
print(f"With label images:   {with_images:,}")
print(f"With scores:         {with_scores:,}")
print(f"Unique countries:    {len(countries)}")
print(f"Unique wineries:     {len(wineries):,}")
print(f"\nWine types:")
for t, n in sorted(wine_types.items(), key=lambda x: -x[1])[:10]:
    print(f"  {t}: {n:,}")
print(f"\nSources breakdown:")
for src, count in sorted(stats.items(), key=lambda x: -x[1]):
    print(f"  {src}: {count:,}")

with open(OUTPUT_FILE, "w") as f:
    json.dump(wines_list, f, ensure_ascii=False)
size_mb = os.path.getsize(OUTPUT_FILE) / 1024 / 1024
print(f"\nSaved to {OUTPUT_FILE} ({size_mb:.1f} MB)")
