#!/usr/bin/env python3
"""
Compute average ratings per wine from X-Wines 21M ratings dataset.
"""
import csv
import json
import sys
from collections import defaultdict

RATINGS_FILE = "/Users/mac/50bestwines/scraper/raw-data/xwines/X-Wines_Official_Repository/last/XWines_Full_21M_ratings.csv"
WINES_FILE = "/Users/mac/50bestwines/scraper/raw-data/xwines/X-Wines_Official_Repository/last/XWines_Full_100K_wines.csv"
OUTPUT_FILE = "/Users/mac/50bestwines/scraper/raw-data/xwines-processed.json"

print("Computing average ratings from 21M ratings...")

# Aggregate ratings per wine
wine_ratings = defaultdict(lambda: {"sum": 0.0, "count": 0, "vintages": set()})
line_count = 0

with open(RATINGS_FILE) as f:
    reader = csv.DictReader(f)
    for row in reader:
        wine_id = row["WineID"]
        rating = float(row["Rating"])
        vintage = row.get("Vintage", "")
        wine_ratings[wine_id]["sum"] += rating
        wine_ratings[wine_id]["count"] += 1
        if vintage and vintage != "N.V." and vintage != "1950":
            wine_ratings[wine_id]["vintages"].add(vintage)
        line_count += 1
        if line_count % 1_000_000 == 0:
            print(f"  Processed {line_count/1_000_000:.0f}M ratings...")

print(f"  Total ratings processed: {line_count:,}")
print(f"  Wines with ratings: {len(wine_ratings):,}")

# Now load wines and merge
print("\nLoading wine data...")
wines = []
with open(WINES_FILE) as f:
    reader = csv.DictReader(f)
    for row in reader:
        wine_id = row["WineID"]
        ratings = wine_ratings.get(wine_id, {"sum": 0, "count": 0, "vintages": set()})
        avg_rating = round(ratings["sum"] / ratings["count"], 2) if ratings["count"] > 0 else None

        # Parse grapes list
        grapes_raw = row.get("Grapes", "[]")
        try:
            grapes = eval(grapes_raw) if grapes_raw.startswith("[") else [grapes_raw]
        except:
            grapes = []

        # Parse food pairings
        harmonize_raw = row.get("Harmonize", "[]")
        try:
            harmonize = eval(harmonize_raw) if harmonize_raw.startswith("[") else []
        except:
            harmonize = []

        # Parse vintages
        vintages_raw = row.get("Vintages", "[]")
        try:
            vintages = eval(vintages_raw) if vintages_raw.startswith("[") else []
        except:
            vintages = []

        wines.append({
            "source": "xwines",
            "xwines_id": wine_id,
            "name": row["WineName"],
            "wine_type": row["Type"],
            "elaborate": row.get("Elaborate", ""),
            "grapes": grapes,
            "food_pairings": harmonize,
            "abv": row.get("ABV", ""),
            "body": row.get("Body", ""),
            "acidity": row.get("Acidity", ""),
            "country_code": row.get("Code", ""),
            "country": row.get("Country", ""),
            "region": row.get("RegionName", ""),
            "region_id": row.get("RegionID", ""),
            "winery_name": row.get("WineryName", ""),
            "winery_id": row.get("WineryID", ""),
            "website": row.get("Website", ""),
            "vintages": vintages,
            "xwines_avg_rating": avg_rating,
            "xwines_ratings_count": ratings["count"],
            "rated_vintages": sorted(list(ratings["vintages"]))[:20],
        })

print(f"Total wines with data: {len(wines)}")

# Stats
rated = sum(1 for w in wines if w["xwines_avg_rating"] is not None)
print(f"Wines with ratings: {rated}")
avg_ratings_count = sum(w["xwines_ratings_count"] for w in wines) / len(wines)
print(f"Avg ratings per wine: {avg_ratings_count:.0f}")

# Save
with open(OUTPUT_FILE, "w") as f:
    json.dump(wines, f, ensure_ascii=False)
size_mb = len(json.dumps(wines, ensure_ascii=False)) / 1024 / 1024
print(f"\nSaved to {OUTPUT_FILE} ({size_mb:.1f} MB)")
