#!/usr/bin/env python3
"""Add badges from 18 newly discovered ranking sources."""
import psycopg2
import psycopg2.extras
import unicodedata
import re

import os; DB_URL = os.environ.get("DATABASE_URL", "")

def normalize(s):
    s = unicodedata.normalize("NFD", s)
    s = re.sub(r"[\u0300-\u036f]", "", s)
    s = s.lower().strip()
    s = re.sub(r"[^a-z0-9\s]", " ", s)
    s = re.sub(r"\s+", " ", s)
    return s.strip()

RANKINGS = [
    # Vinous Top 100 2024
    {"list": "Vinous Top 100", "year": 2024, "wines": [
        {"rank": 1, "name": "Cabernet Sauvignon", "producer": "Philip Togni", "country": "United States"},
        {"rank": 3, "name": "Pauillac", "producer": "Chateau Pichon Longueville Comtesse de Lalande", "country": "France"},
        {"rank": 0, "name": "Brunello di Montalcino", "producer": "Biondi-Santi", "country": "Italy"},
        {"rank": 0, "name": "Barolo", "producer": "Giacomo Conterno", "country": "Italy"},
        {"rank": 0, "name": "Chambertin Grand Cru", "producer": "Domaine Armand Rousseau", "country": "France"},
        {"rank": 100, "name": "Crianza", "producer": "Pago de Carraovejas", "country": "Spain"},
    ]},
    # Vinous Top 100 2025
    {"list": "Vinous Top 100", "year": 2025, "wines": [
        {"rank": 1, "name": "Chianti Classico", "producer": "Castello di Monsanto", "country": "Italy"},
        {"rank": 3, "name": "Margaux", "producer": "Chateau Brane-Cantenac", "country": "France"},
    ]},
    # James Suckling World Top 100 2025
    {"list": "James Suckling Top 100", "year": 2025, "wines": [
        {"rank": 1, "name": "Margaux", "producer": "Chateau d'Issan", "country": "France"},
    ]},
    # IWC 2025
    {"list": "IWC Champion", "year": 2025, "wines": [
        {"rank": 0, "name": "Blanc de Blancs", "producer": "Nyetimber", "country": "United Kingdom"},
        {"rank": 0, "name": "Chardonnay", "producer": "Tolpuddle", "country": "Australia"},
    ]},
    # IWC 2024
    {"list": "IWC Trophy", "year": 2024, "wines": [
        {"rank": 0, "name": "Riesling", "producer": "Trimbach", "country": "France"},
    ]},
    # Concours Mondial de Bruxelles 2024
    {"list": "Concours Mondial Grand Gold", "year": 2024, "wines": [
        {"rank": 0, "name": "Amarone della Valpolicella", "producer": "Ca' Rugate", "country": "Italy"},
    ]},
    # VinePair 50 Best 2024
    {"list": "VinePair 50 Best", "year": 2024, "wines": [
        {"rank": 1, "name": "Syrah Sonoma Coast", "producer": "Arnot-Roberts", "country": "United States"},
        {"rank": 0, "name": "Riesling Mosel", "producer": "Joh. Jos. Prum", "country": "Germany"},
    ]},
    # Descorchados 2025
    {"list": "Descorchados", "year": 2025, "wines": [
        {"rank": 0, "name": "Malbec Adrianna", "producer": "Catena Zapata", "country": "Argentina"},
        {"rank": 0, "name": "VIK", "producer": "VIK", "country": "Chile"},
        {"rank": 0, "name": "Cabernet Sauvignon Puente Alto", "producer": "Don Melchor", "country": "Chile"},
    ]},
    # Robert Parker 100 Points
    {"list": "Robert Parker 100 Points", "year": 2023, "wines": [
        {"rank": 0, "name": "Pomerol", "producer": "Petrus", "country": "France"},
        {"rank": 0, "name": "Pauillac", "producer": "Chateau Lafite Rothschild", "country": "France"},
        {"rank": 0, "name": "Pauillac", "producer": "Chateau Mouton Rothschild", "country": "France"},
        {"rank": 0, "name": "Sassicaia", "producer": "Tenuta San Guido", "country": "Italy"},
        {"rank": 0, "name": "Barolo Monfortino Riserva", "producer": "Giacomo Conterno", "country": "Italy"},
        {"rank": 0, "name": "Hermitage", "producer": "M. Chapoutier", "country": "France"},
        {"rank": 0, "name": "Syrah Colgin IX Estate", "producer": "Colgin", "country": "United States"},
        {"rank": 0, "name": "Monte Bello Cabernet Sauvignon", "producer": "Ridge", "country": "United States"},
    ]},
    # Platter's South Africa 2026
    {"list": "Platter's 5 Stars", "year": 2026, "wines": [
        {"rank": 0, "name": "Columella", "producer": "Sadie Family", "country": "South Africa"},
        {"rank": 0, "name": "Palladius", "producer": "Sadie Family", "country": "South Africa"},
        {"rank": 0, "name": "Pinotage", "producer": "Beeslaar", "country": "South Africa"},
    ]},
    # Falstaff Austria
    {"list": "Falstaff Top Rated", "year": 2025, "wines": [
        {"rank": 0, "name": "Riesling Kellerberg", "producer": "F.X. Pichler", "country": "Austria"},
        {"rank": 0, "name": "Gruner Veltliner", "producer": "Nikolaihof", "country": "Austria"},
    ]},
    # National Wine Show Australia 2024
    {"list": "National Wine Show Champion", "year": 2024, "wines": [
        {"rank": 0, "name": "Chardonnay", "producer": "Murdoch Hill", "country": "Australia"},
        {"rank": 0, "name": "Cabernet Sauvignon", "producer": "Devil's Lair", "country": "Australia"},
    ]},
    # Tyson Stelzer Top 250 Australia 2024
    {"list": "Tyson Stelzer Top 250", "year": 2024, "wines": [
        {"rank": 0, "name": "Grange", "producer": "Penfolds", "country": "Australia"},
        {"rank": 0, "name": "Shiraz", "producer": "Henschke", "country": "Australia"},
        {"rank": 0, "name": "Chardonnay", "producer": "Leeuwin Estate", "country": "Australia"},
    ]},
    # The Real Review Australia 2024
    {"list": "The Real Review Winery of Year", "year": 2024, "wines": [
        {"rank": 0, "name": "Cabernet Sauvignon", "producer": "Yarra Yering", "country": "Australia"},
    ]},
    # The Real Review NZ 2024
    {"list": "The Real Review NZ Winery of Year", "year": 2024, "wines": [
        {"rank": 0, "name": "Pinot Noir Block 5", "producer": "Felton Road", "country": "New Zealand"},
    ]},
]

def match_wine(cur, name, producer, country):
    norm_name = normalize(name)
    norm_producer = normalize(producer)

    # Strategy 1: name + producer
    cur.execute("""
        SELECT id, slug, name, producer, aggregate_score, badges
        FROM wines
        WHERE unaccent(LOWER(name)) ILIKE unaccent(%s)
          AND unaccent(LOWER(producer)) ILIKE unaccent(%s)
        ORDER BY aggregate_score DESC LIMIT 1
    """, (f"%{norm_name}%", f"%{norm_producer}%"))
    row = cur.fetchone()
    if row:
        return row

    # Strategy 2: just producer + country
    cur.execute("""
        SELECT id, slug, name, producer, aggregate_score, badges
        FROM wines
        WHERE unaccent(LOWER(producer)) ILIKE unaccent(%s)
          AND LOWER(country) = LOWER(%s)
        ORDER BY aggregate_score DESC LIMIT 1
    """, (f"%{norm_producer}%", country))
    row = cur.fetchone()
    if row:
        return row

    return None

def main():
    conn = psycopg2.connect(DB_URL)
    cur = conn.cursor()
    matched = 0
    not_found = 0
    badges_added = 0

    for ranking in RANKINGS:
        list_name = ranking["list"]
        year = ranking["year"]
        print(f"\n--- {list_name} {year} ---")
        for w in ranking["wines"]:
            row = match_wine(cur, w["name"], w["producer"], w["country"])
            if row:
                wine_id, slug, db_name, db_producer, score, current_badges = row
                current_badges = current_badges or []
                badge = f"{list_name} #{w['rank']} ({year})" if w.get("rank", 0) > 0 else f"{list_name} ({year})"
                if badge not in current_badges:
                    new_badges = current_badges + [badge]
                    boost = 1.0 if w.get("rank", 0) > 0 and w["rank"] <= 10 else 0.5
                    new_score = min(99.0, float(score) + boost)
                    cur.execute("UPDATE wines SET badges = %s, aggregate_score = %s WHERE id = %s",
                               (new_badges, new_score, wine_id))
                    badges_added += 1
                    print(f"  ✓ {db_producer} - {db_name} [{badge}]")
                matched += 1
            else:
                print(f"  ✗ Not found: {w['producer']} - {w['name']}")
                not_found += 1

    conn.commit()
    print(f"\n{'='*50}")
    print(f"Matched: {matched}, Not found: {not_found}, Badges added: {badges_added}")

    # Final stats
    cur.execute("SELECT COUNT(*) FROM wines WHERE array_length(badges, 1) > 2")
    print(f"Total wines with ranking badges: {cur.fetchone()[0]}")

    # Count unique publications
    cur.execute("""
        SELECT COUNT(DISTINCT badge) FROM (
            SELECT unnest(badges) as badge FROM wines
        ) t WHERE badge NOT IN ('Exceptional','Outstanding','Highly Rated','Popular Choice','Well Known','Best Value')
    """)
    print(f"Unique ranking badges: {cur.fetchone()[0]}")

    # Top badged wines
    cur.execute("""
        SELECT name, producer, aggregate_score, array_length(badges, 1) as badge_count
        FROM wines WHERE array_length(badges, 1) > 3
        ORDER BY badge_count DESC, aggregate_score DESC LIMIT 15
    """)
    print(f"\nTop wines by badge count:")
    for row in cur.fetchall():
        print(f"  {row[1]} - {row[0]} (score: {row[2]}, badges: {row[3]})")

    conn.close()

if __name__ == "__main__":
    main()
