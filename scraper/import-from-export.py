#!/usr/bin/env python3
"""Import wine data from db-export.json into a fresh Neon Postgres database."""
import json
import os
import sys
import psycopg2
import psycopg2.extras

def get_db_url():
    """Read DATABASE_URL from .env.local."""
    env_file = os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env.local")
    with open(env_file) as f:
        for line in f:
            line = line.strip()
            if line.startswith("DATABASE_URL="):
                url = line.split("=", 1)[1].strip().strip('"').strip("'")
                url = url.replace("?channel_binding=require&", "?").replace("&channel_binding=require", "").replace("?channel_binding=require", "")
                return url
    raise RuntimeError("DATABASE_URL not found in .env.local")

EXPORT_FILE = os.path.join(os.path.dirname(__file__), "raw-data", "db-export.json")

DDL = """
CREATE EXTENSION IF NOT EXISTS unaccent;

DROP TABLE IF EXISTS wine_vintages CASCADE;
DROP TABLE IF EXISTS wines CASCADE;
DROP TABLE IF EXISTS countries CASCADE;
DROP TABLE IF EXISTS regions CASCADE;
DROP TABLE IF EXISTS grapes CASCADE;

CREATE TABLE wines (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  producer TEXT DEFAULT '',
  type TEXT DEFAULT 'Red',
  grape TEXT DEFAULT 'Blend',
  grapes TEXT[] DEFAULT '{}',
  region TEXT DEFAULT '',
  sub_region TEXT DEFAULT '',
  country TEXT DEFAULT '',
  country_code TEXT DEFAULT '',
  appellation TEXT DEFAULT '',
  alcohol_content TEXT DEFAULT '',
  price NUMERIC(10,2) DEFAULT 0,
  price_range TEXT DEFAULT 'Mid-Range',
  buy_url TEXT DEFAULT '',
  label_url TEXT DEFAULT '',
  aggregate_score NUMERIC(5,1) DEFAULT 0,
  badges TEXT[] DEFAULT '{}',
  tasting_notes TEXT DEFAULT '',
  pairings TEXT[] DEFAULT '{}',
  serving_temp TEXT DEFAULT '',
  aging TEXT DEFAULT '',
  pros TEXT[] DEFAULT '{}',
  cons TEXT[] DEFAULT '{}',
  body TEXT DEFAULT '',
  acidity TEXT DEFAULT ''
);

CREATE TABLE wine_vintages (
  id SERIAL PRIMARY KEY,
  wine_id INTEGER REFERENCES wines(id) ON DELETE CASCADE,
  vintage INTEGER,
  scores JSONB DEFAULT '[]',
  rating_count INTEGER DEFAULT 0,
  UNIQUE(wine_id, vintage)
);

CREATE TABLE countries (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  emoji TEXT DEFAULT '',
  regions TEXT[] DEFAULT '{}',
  top_wines TEXT[] DEFAULT '{}',
  description TEXT DEFAULT '',
  wine_history TEXT DEFAULT ''
);

CREATE TABLE regions (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  country TEXT DEFAULT '',
  description TEXT DEFAULT ''
);

CREATE TABLE grapes (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT DEFAULT ''
);

CREATE INDEX idx_wines_slug ON wines(slug);
CREATE INDEX idx_wines_country ON wines(country);
CREATE INDEX idx_wines_region ON wines(region);
CREATE INDEX idx_wines_type ON wines(type);
CREATE INDEX idx_wines_grape ON wines(grape);
CREATE INDEX idx_wines_score ON wines(aggregate_score DESC);
CREATE INDEX idx_vintages_wine ON wine_vintages(wine_id);
"""

def main():
    db_url = get_db_url()
    print(f"Connecting to new database...")
    conn = psycopg2.connect(db_url)
    cur = conn.cursor()

    print("Creating tables...")
    cur.execute(DDL)
    conn.commit()

    print(f"Loading {EXPORT_FILE}...")
    with open(EXPORT_FILE) as f:
        data = json.load(f)

    wines = data["wines"]
    countries = data["countries"]
    regions = data["regions"]
    grapes_data = data["grapes"]

    print(f"  {len(wines)} wines, {len(countries)} countries, {len(regions)} regions, {len(grapes_data)} grapes")

    # Insert wines in batches
    print("Inserting wines...")
    BATCH = 1000
    wine_cols = [
        "slug", "name", "producer", "type", "grape", "grapes",
        "region", "sub_region", "country", "country_code", "appellation",
        "alcohol_content", "price", "price_range", "buy_url", "label_url",
        "aggregate_score", "badges", "tasting_notes",
        "pairings", "serving_temp", "aging", "pros", "cons",
        "body", "acidity",
    ]
    placeholders = ", ".join(["%s"] * len(wine_cols))
    wine_query = f"INSERT INTO wines ({', '.join(wine_cols)}) VALUES ({placeholders}) ON CONFLICT (slug) DO NOTHING RETURNING id, slug"

    slug_to_id = {}
    for i in range(0, len(wines), BATCH):
        batch = wines[i:i+BATCH]
        for w in batch:
            params = (
                w.get("slug", ""), w.get("name", ""), w.get("producer", ""),
                w.get("type", "Red"), w.get("grape", "Blend"),
                w.get("grapes") or [],
                w.get("region", ""), w.get("sub_region", ""),
                w.get("country", ""), w.get("country_code", ""),
                w.get("appellation", ""), w.get("alcohol_content", ""),
                float(w.get("price", 0) or 0), w.get("price_range", "Mid-Range"),
                w.get("buy_url", ""), w.get("label_url", ""),
                float(w.get("aggregate_score", 0) or 0),
                w.get("badges") or [],
                w.get("tasting_notes", ""),
                w.get("pairings") or [],
                w.get("serving_temp", ""), w.get("aging", ""),
                w.get("pros") or [], w.get("cons") or [],
                w.get("body", ""), w.get("acidity", ""),
            )
            try:
                cur.execute(wine_query, params)
                row = cur.fetchone()
                if row:
                    slug_to_id[row[1]] = row[0]
            except Exception as e:
                conn.rollback()
                continue

        conn.commit()
        if (i + BATCH) % 10000 == 0 or i + BATCH >= len(wines):
            print(f"  {min(i + BATCH, len(wines))}/{len(wines)} wines...")
        sys.stdout.flush()

    print(f"  Inserted {len(slug_to_id)} wines")

    # Insert vintages
    print("Inserting vintages...")
    vint_query = "INSERT INTO wine_vintages (wine_id, vintage, scores, rating_count) VALUES (%s, %s, %s, %s) ON CONFLICT DO NOTHING"
    vint_count = 0
    vint_batch = []
    for w in wines:
        slug = w.get("slug", "")
        wine_id = slug_to_id.get(slug)
        if not wine_id:
            continue
        for v in (w.get("vintages") or []):
            scores = v.get("scores")
            if isinstance(scores, str):
                scores_json = scores
            else:
                scores_json = json.dumps(scores or [])
            vint_batch.append((wine_id, v.get("vintage"), scores_json, v.get("rating_count", 0)))
            vint_count += 1

        if len(vint_batch) >= BATCH:
            psycopg2.extras.execute_batch(cur, vint_query, vint_batch, page_size=BATCH)
            conn.commit()
            vint_batch = []
            if vint_count % 50000 == 0:
                print(f"  {vint_count} vintages...")

    if vint_batch:
        psycopg2.extras.execute_batch(cur, vint_query, vint_batch, page_size=BATCH)
        conn.commit()
    print(f"  Inserted {vint_count} vintages")

    # Insert countries
    print("Inserting countries...")
    for c in countries:
        try:
            cur.execute(
                "INSERT INTO countries (slug, name, emoji, regions, top_wines, description, wine_history) VALUES (%s,%s,%s,%s,%s,%s,%s) ON CONFLICT DO NOTHING",
                (c["slug"], c["name"], c.get("emoji", ""), c.get("regions") or [], c.get("top_wines") or [], c.get("description", ""), c.get("wine_history", ""))
            )
        except:
            conn.rollback()
    conn.commit()
    print(f"  {len(countries)} countries")

    # Insert regions
    print("Inserting regions...")
    for r in regions:
        try:
            cur.execute(
                "INSERT INTO regions (slug, name, country, description) VALUES (%s,%s,%s,%s) ON CONFLICT DO NOTHING",
                (r["slug"], r["name"], r.get("country", ""), r.get("description", ""))
            )
        except:
            conn.rollback()
    conn.commit()
    print(f"  {len(regions)} regions")

    # Insert grapes
    print("Inserting grapes...")
    for g in grapes_data:
        try:
            cur.execute(
                "INSERT INTO grapes (slug, name, description) VALUES (%s,%s,%s) ON CONFLICT DO NOTHING",
                (g["slug"], g["name"], g.get("description", ""))
            )
        except:
            conn.rollback()
    conn.commit()
    print(f"  {len(grapes_data)} grapes")

    # Final stats
    cur.execute("SELECT COUNT(*) FROM wines")
    print(f"\nFinal: {cur.fetchone()[0]} wines")
    cur.execute("SELECT COUNT(*) FROM wine_vintages")
    print(f"Final: {cur.fetchone()[0]} vintages")
    cur.execute("SELECT pg_size_pretty(pg_database_size('neondb'))")
    print(f"DB size: {cur.fetchone()[0]}")

    conn.close()
    print("Done!")

if __name__ == "__main__":
    main()
