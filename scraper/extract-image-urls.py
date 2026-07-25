#!/usr/bin/env python3
"""
Task 1: Extract WineSensed image URL mapping from winesensed-wines.json.
Constructs {vintage_id: vintage_page_url} map for wines that have a URL.

Task 2: Check accessibility and structure of cipher982/wine-images-126k dataset.
"""
import json
import os
import sys

# ─────────────────────────────────────────────
# Task 1: WineSensed image URL map
# ─────────────────────────────────────────────
INPUT = "/Users/mac/50bestwines/scraper/raw-data/winesensed-wines.json"
OUTPUT = "/Users/mac/50bestwines/scraper/raw-data/winesensed-image-map.json"

print("=" * 60)
print("Task 1: WineSensed image URL extraction")
print("=" * 60)

with open(INPUT) as f:
    wines = json.load(f)

print(f"Loaded {len(wines):,} wine records from winesensed-wines.json")

image_map = {}
missing_url = 0

for w in wines:
    vid = w.get("vintage_id")
    url = w.get("vintage_page_url")

    if not vid:
        continue

    if not url:
        missing_url += 1
        continue

    # Normalise: ensure https:// prefix
    if not url.startswith("http"):
        url = "https://" + url

    image_map[str(vid)] = url

print(f"  Wines with vintage_page_url : {len(image_map):,}")
print(f"  Wines missing URL           : {missing_url:,}")
print(f"  Total records               : {len(wines):,}")

with open(OUTPUT, "w") as f:
    json.dump(image_map, f, ensure_ascii=False, indent=2)

size_kb = os.path.getsize(OUTPUT) / 1024
print(f"\nSaved mapping to {OUTPUT} ({size_kb:.1f} KB)")
print(f"Format: {{vintage_id: vintage_page_url}}")

if image_map:
    sample = list(image_map.items())[:3]
    print("\nSample entries:")
    for vid, url in sample:
        print(f"  {vid}: {url}")

# ─────────────────────────────────────────────
# Task 2: cipher982/wine-images-126k accessibility
# ─────────────────────────────────────────────
print()
print("=" * 60)
print("Task 2: cipher982/wine-images-126k dataset check")
print("=" * 60)

try:
    from huggingface_hub import HfApi
    api = HfApi()
    files = api.list_repo_files("cipher982/wine-images-126k", repo_type="dataset")
    file_list = list(files)
    print(f"Dataset is ACCESSIBLE. Found {len(file_list)} files.")
    print("\nFirst 20 files:")
    for f in file_list[:20]:
        print(f"  {f}")

    # Categorise file types
    parquet_files = [f for f in file_list if f.endswith(".parquet")]
    print(f"\nParquet files: {len(parquet_files)}")
    for pf in parquet_files[:10]:
        print(f"  {pf}")

except Exception as e:
    print(f"Dataset NOT accessible or error: {e}")
    print("\nAttempting alternate check via datasets library...")
    try:
        from datasets import load_dataset_builder
        builder = load_dataset_builder("cipher982/wine-images-126k")
        info = builder.info
        print(f"Dataset info: {info.description[:200] if info.description else 'No description'}")
        print(f"Features: {info.features}")
        print(f"Size: {info.dataset_size}")
        print(f"Num rows: {info.splits}")
    except Exception as e2:
        print(f"Also failed: {e2}")

# ─────────────────────────────────────────────
# Summary
# ─────────────────────────────────────────────
print()
print("=" * 60)
print("Summary")
print("=" * 60)
print(f"WineSensed mapping: {len(image_map):,} vintage_id → Vivino URL pairs saved to:")
print(f"  {OUTPUT}")
print()
print("Note: Only 108/421,672 WineSensed records have vintage_page_url.")
print("The HuggingFace dataset itself stores JPEG bytes (no public URLs).")
print("To get label images at scale, options are:")
print("  1. Use the 108 known Vivino URLs and resolve the rest via Vivino API")
print("  2. Download the cipher982/wine-images-126k parquet shards (embedded images)")
print("  3. Match by wine name to find Vivino image hashes via web scraping")
