#!/usr/bin/env python3
"""Fix grapes table and build search vectors after interrupted import."""
import psycopg2

DB_URL = "postgresql://neondb_owner:npg_PL8RkghoMxG6@ep-fancy-forest-awmd0h5i-pooler.c-12.us-east-1.aws.neon.tech/neondb?sslmode=require"

conn = psycopg2.connect(DB_URL)
cur = conn.cursor()

# Check current state
cur.execute("SELECT COUNT(*) FROM wines")
print(f"Wines: {cur.fetchone()[0]:,}")
cur.execute("SELECT COUNT(*) FROM wine_vintages")
print(f"Vintages: {cur.fetchone()[0]:,}")
cur.execute("SELECT COUNT(*) FROM countries")
print(f"Countries: {cur.fetchone()[0]}")
cur.execute("SELECT COUNT(*) FROM regions")
print(f"Regions: {cur.fetchone()[0]}")
cur.execute("SELECT COUNT(*) FROM grapes")
print(f"Grapes: {cur.fetchone()[0]}")

# Insert grapes
print("\nInserting grapes...")
cur.execute("""
    INSERT INTO grapes (slug, name, description)
    SELECT DISTINCT
        LOWER(REGEXP_REPLACE(grape, '[^a-zA-Z0-9]+', '-', 'g')),
        grape,
        grape || ' is a notable grape variety used in winemaking.'
    FROM wines
    WHERE grape IS NOT NULL AND grape != '' AND grape != 'Blend'
    ON CONFLICT (slug) DO NOTHING
""")
conn.commit()
cur.execute("SELECT COUNT(*) FROM grapes")
print(f"Grapes now: {cur.fetchone()[0]}")

# Build search vectors
print("\nBuilding search vectors...")
cur.execute("""
    UPDATE wines SET search_vector = to_tsvector('simple',
        unaccent(COALESCE(name, '') || ' ' || COALESCE(producer, '') || ' ' ||
                 COALESCE(region, '') || ' ' || COALESCE(country, '') || ' ' ||
                 COALESCE(grape, '')))
    WHERE search_vector IS NULL
""")
conn.commit()
print(f"Search vectors built for {cur.rowcount:,} wines")

cur.execute("SELECT pg_size_pretty(pg_database_size('neondb'))")
print(f"\nDB size: {cur.fetchone()[0]}")

# Quick test search
print("\nTest search for 'chateau margaux':")
cur.execute("""
    SELECT name, producer, country, aggregate_score
    FROM wines
    WHERE search_vector @@ plainto_tsquery('simple', unaccent('chateau margaux'))
    ORDER BY aggregate_score DESC
    LIMIT 5
""")
for row in cur.fetchall():
    print(f"  {row[0]} | {row[1]} | {row[2]} | {row[3]}")

conn.close()
print("\nDone!")
