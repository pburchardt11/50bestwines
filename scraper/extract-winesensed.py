#!/usr/bin/env python3
"""
Extract WineSensed metadata (no images) and save as JSON.
1M+ records with wine names, ratings, regions, grapes, prices.
"""
import json
import os
import sys

OUTPUT = "/Users/mac/50bestwines/scraper/raw-data/winesensed-wines.json"

print("Loading WineSensed dataset (metadata only, no images)...")
sys.stdout.flush()

from datasets import load_dataset

ds = load_dataset("christopher/winesensed", "wines")
train = ds["train"]

print(f"Total rows: {len(train)}")
print(f"Columns: {train.column_names}")
sys.stdout.flush()

# Extract metadata without image bytes
wines = []
seen_vintages = set()
batch_size = 10000

for i in range(0, len(train), batch_size):
    batch = train[i:i+batch_size]
    for j in range(len(batch["wine"])):
        vintage_id = batch["vintage_id"][j] if "vintage_id" in batch else None

        # Dedup by vintage_id
        if vintage_id and vintage_id in seen_vintages:
            continue
        if vintage_id:
            seen_vintages.add(vintage_id)

        wine_name = batch["wine"][j] or ""
        record = {
            "name": wine_name,
            "year": batch["year"][j] if "year" in batch else "",
            "country": batch["country"][j] if "country" in batch else "",
            "region": batch["region"][j] if "region" in batch else "",
            "rating": batch["rating"][j] if "rating" in batch else None,
            "price": batch["price"][j] if "price" in batch else None,
            "abv": batch["wine_alcohol"][j] if "wine_alcohol" in batch else "",
            "grapes": batch["grape"][j] if "grape" in batch else "",
            "review": batch["review"][j] if "review" in batch else "",
            "vintage_id": vintage_id,
            "winery_id": batch["winery_id"][j] if "winery_id" in batch else None,
            "vintage_page_url": batch["vintage_page_url"][j] if "vintage_page_url" in batch else "",
        }
        wines.append(record)

    if (i // batch_size) % 10 == 0:
        print(f"  Processed {i+batch_size}/{len(train)} rows, {len(wines)} unique wines...")
        sys.stdout.flush()

print(f"\nTotal unique wines (by vintage_id): {len(wines)}")
print(f"Deduped from {len(train)} rows")

# Extract winery names from wine names (format is usually "Winery Wine Name")
# Also count countries
countries = set(w["country"] for w in wines if w.get("country"))
print(f"Countries: {len(countries)}")

# Save
with open(OUTPUT, "w") as f:
    json.dump(wines, f, ensure_ascii=False)
size_mb = os.path.getsize(OUTPUT) / 1024 / 1024
print(f"Saved to {OUTPUT} ({size_mb:.1f} MB)")
