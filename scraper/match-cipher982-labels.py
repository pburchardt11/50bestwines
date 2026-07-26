#!/usr/bin/env python3
"""
Match cipher982 wine names to our Postgres DB and update label_url
with Vivino search URLs for wines that don't have a real image.

Strategy:
- Real image = label_url starting with 'https://images.'
- For wines without a real image, try to match cipher982 name against DB name
  using fuzzy ILIKE with unaccent (both sides), then set a Vivino search URL.
"""

import json
import re
import sys
import time
import urllib.parse
import psycopg2
import psycopg2.extras

import os; DB_URL = os.environ.get("DATABASE_URL", "")
TEXT_DATA = "/Users/mac/50bestwines/scraper/raw-data/cipher982-wine-text-126k.json"

BATCH_SIZE = 200  # DB wines to process per batch for name lookup
UPDATE_BATCH = 500  # updates to flush at once


def slugify(name: str) -> str:
    """Very simple slug for Vivino search URL."""
    return urllib.parse.quote_plus(name)


def vivino_search_url(name: str) -> str:
    return f"https://www.vivino.com/search/wines?q={slugify(name)}"


def build_cipher_name_index(cipher_data: list) -> dict:
    """Build a lowercase name -> cipher entry index for fast lookup."""
    index = {}
    for entry in cipher_data:
        key = entry["name"].lower().strip()
        if key not in index:
            index[key] = entry
    return index


def normalize(name: str) -> str:
    """Lowercase, strip extra spaces."""
    return re.sub(r"\s+", " ", name.lower().strip())


def main():
    print("Loading cipher982 text data...")
    with open(TEXT_DATA) as f:
        cipher_data = json.load(f)
    print(f"  Loaded {len(cipher_data):,} cipher982 entries")

    # Build index by lowercase name
    cipher_index = build_cipher_name_index(cipher_data)
    print(f"  Unique cipher names: {len(cipher_index):,}")

    print("\nConnecting to database...")
    conn = psycopg2.connect(DB_URL)
    conn.autocommit = False
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    # --- Current stats ---
    cur.execute("""
        SELECT
          COUNT(*) FILTER (WHERE label_url LIKE 'https://images.%%') AS real_images,
          COUNT(*) FILTER (WHERE label_url LIKE 'https://www.vivino.com/search/%%') AS vivino_search,
          COUNT(*) FILTER (WHERE label_url = '' OR label_url IS NULL) AS empty,
          COUNT(*) AS total
        FROM wines
    """)
    stats = dict(cur.fetchone())
    print("\n=== BEFORE stats ===")
    print(f"  Total wines:          {stats['total']:>10,}")
    print(f"  Real image URLs:      {stats['real_images']:>10,}")
    print(f"  Vivino search URLs:   {stats['vivino_search']:>10,}")
    print(f"  Empty label_url:      {stats['empty']:>10,}")

    # Load all DB wines that don't have a real image (empty label_url)
    print("\nLoading DB wines without real images...")
    cur.execute("""
        SELECT id, name, label_url
        FROM wines
        WHERE label_url = '' OR label_url IS NULL
        ORDER BY id
    """)
    db_wines = cur.fetchall()
    print(f"  Found {len(db_wines):,} wines without real images")

    # --- Matching ---
    updates = []  # list of (label_url, id)
    matched = 0
    unmatched = 0

    for row in db_wines:
        db_name_norm = normalize(row["name"])
        cipher_entry = cipher_index.get(db_name_norm)

        if cipher_entry:
            url = vivino_search_url(cipher_entry["name"])
            updates.append((url, row["id"]))
            matched += 1
        else:
            unmatched += 1

    print(f"\n  Matched:   {matched:,}")
    print(f"  Unmatched: {unmatched:,}")

    if not updates:
        print("\nNothing to update.")
        conn.close()
        return

    # --- Apply updates in batches with reconnect on failure ---
    print(f"\nApplying {len(updates):,} updates in batches of {UPDATE_BATCH}...")
    total_updated = 0

    i = 0
    while i < len(updates):
        batch = updates[i:i + UPDATE_BATCH]
        try:
            update_cur = conn.cursor()
            psycopg2.extras.execute_batch(
                update_cur,
                "UPDATE wines SET label_url = %s WHERE id = %s",
                batch,
                page_size=UPDATE_BATCH
            )
            conn.commit()
            total_updated += len(batch)
            i += len(batch)
            if total_updated % 5000 == 0 or i >= len(updates):
                print(f"  ... {total_updated:,} / {len(updates):,} updated")
        except (psycopg2.OperationalError, psycopg2.InterfaceError) as e:
            print(f"  Connection error at batch {i}: {e} — reconnecting...")
            try:
                conn.close()
            except Exception:
                pass
            time.sleep(3)
            conn = psycopg2.connect(DB_URL)
            conn.autocommit = False
            cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
            # retry same batch

    # --- After stats (use a fresh connection) ---
    conn2 = psycopg2.connect(DB_URL)
    cur2 = conn2.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur2.execute("""
        SELECT
          COUNT(*) FILTER (WHERE label_url LIKE 'https://images.%%') AS real_images,
          COUNT(*) FILTER (WHERE label_url LIKE 'https://www.vivino.com/search/%%') AS vivino_search,
          COUNT(*) FILTER (WHERE label_url = '' OR label_url IS NULL) AS empty,
          COUNT(*) AS total
        FROM wines
    """)
    stats_after = dict(cur2.fetchone())
    print("\n=== AFTER stats ===")
    print(f"  Total wines:          {stats_after['total']:>10,}")
    print(f"  Real image URLs:      {stats_after['real_images']:>10,}")
    print(f"  Vivino search URLs:   {stats_after['vivino_search']:>10,}")
    print(f"  Empty label_url:      {stats_after['empty']:>10,}")

    # Show a few sample updates
    cur2.execute("""
        SELECT id, name, label_url
        FROM wines
        WHERE label_url LIKE 'https://www.vivino.com/search/%%'
        LIMIT 5
    """)
    print("\n=== Sample updated rows ===")
    for row in cur2.fetchall():
        print(f"  [{row['id']}] {row['name']}")
        print(f"        {row['label_url']}")
    conn2.close()

    conn.close()
    print("\nDone.")


if __name__ == "__main__":
    main()
