#!/usr/bin/env python3
"""
Download wine datasets from Hugging Face:
1. WineSensed - 350K vintages with 897K label images
2. cipher982/wine-text-126k - 126K wines with descriptions
"""
import json
import os
import sys

OUTPUT_DIR = "/Users/mac/50bestwines/scraper/raw-data"

# ---- 1. WineSensed ----
print("=" * 60)
print("Downloading WineSensed (350K vintages, 897K images)...")
print("=" * 60)
sys.stdout.flush()

try:
    from datasets import load_dataset

    # Load only the wines subset (not the full 897K images)
    ds = load_dataset("christopher/winesensed", "wines", trust_remote_code=True)
    print(f"WineSensed loaded: {ds}")
    sys.stdout.flush()

    # Convert to list of dicts
    wines_data = ds["train"].to_list()
    print(f"WineSensed wines: {len(wines_data)}")

    # Check fields
    if wines_data:
        print(f"Fields: {list(wines_data[0].keys())}")
        print(f"Sample: {json.dumps(wines_data[0], default=str)[:500]}")

    # Save
    outpath = os.path.join(OUTPUT_DIR, "winesensed-wines.json")
    with open(outpath, "w") as f:
        json.dump(wines_data, f, default=str, ensure_ascii=False)
    size_mb = os.path.getsize(outpath) / 1024 / 1024
    print(f"Saved to {outpath} ({size_mb:.1f} MB)")
except Exception as e:
    print(f"WineSensed error: {e}")
    import traceback
    traceback.print_exc()

sys.stdout.flush()

# ---- 2. cipher982/wine-text-126k ----
print("\n" + "=" * 60)
print("Downloading cipher982/wine-text-126k (126K wines)...")
print("=" * 60)
sys.stdout.flush()

try:
    ds2 = load_dataset("cipher982/wine-text-126k", trust_remote_code=True)
    print(f"wine-text-126k loaded: {ds2}")
    sys.stdout.flush()

    wines_data2 = ds2["train"].to_list()
    print(f"wine-text-126k wines: {len(wines_data2)}")

    if wines_data2:
        print(f"Fields: {list(wines_data2[0].keys())}")
        print(f"Sample: {json.dumps(wines_data2[0], default=str)[:500]}")

    outpath2 = os.path.join(OUTPUT_DIR, "cipher982-wine-text-126k.json")
    with open(outpath2, "w") as f:
        json.dump(wines_data2, f, default=str, ensure_ascii=False)
    size_mb2 = os.path.getsize(outpath2) / 1024 / 1024
    print(f"Saved to {outpath2} ({size_mb2:.1f} MB)")
except Exception as e:
    print(f"wine-text-126k error: {e}")
    import traceback
    traceback.print_exc()

print("\nDone!")
