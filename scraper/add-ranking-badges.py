#!/usr/bin/env python3
"""
Match published wine ranking lists against our Postgres database.
Add ranking badges and boost scores for wines that appear on major lists.
"""
import psycopg2
import psycopg2.extras
import json
import re
import unicodedata
import sys

import os; DB_URL = os.environ.get("DATABASE_URL", "")

def normalize(s):
    """Normalize a string for fuzzy matching."""
    s = unicodedata.normalize("NFD", s)
    s = re.sub(r"[\u0300-\u036f]", "", s)  # strip accents
    s = s.lower().strip()
    s = re.sub(r"[^a-z0-9\s]", " ", s)
    s = re.sub(r"\s+", " ", s)
    return s.strip()

# ============================================================================
# Published ranking data — real wines from real lists
# ============================================================================
RANKINGS = [
    # Wine Spectator Top 100 2024
    {"list": "Wine Spectator Top 100", "year": 2024, "wines": [
        {"rank": 1, "name": "Cabernet Sauvignon Puente Alto", "producer": "Don Melchor", "country": "Chile"},
        {"rank": 2, "name": "Cabernet Sauvignon Georges de Latour", "producer": "Beaulieu Vineyard", "country": "United States"},
        {"rank": 3, "name": "Tignanello", "producer": "Marchesi Antinori", "country": "Italy"},
        {"rank": 4, "name": "Cabernet Sauvignon Napa Valley", "producer": "Faust", "country": "United States"},
        {"rank": 7, "name": "Chateauneuf-du-Pape La Crau", "producer": "Vieux Telegraphe", "country": "France"},
        {"rank": 9, "name": "Barolo Albe", "producer": "G.D. Vajra", "country": "Italy"},
    ]},
    # Wine Spectator Top 100 2025
    {"list": "Wine Spectator Top 100", "year": 2025, "wines": [
        {"rank": 1, "name": "Margaux", "producer": "Chateau Giscours", "country": "France"},
        {"rank": 5, "name": "Saint-Emilion", "producer": "Chateau Beau-Sejour Becot", "country": "France"},
        {"rank": 6, "name": "Apalta", "producer": "Clos Apalta", "country": "Chile"},
        {"rank": 7, "name": "Barbaresco", "producer": "Produttori del Barbaresco", "country": "Italy"},
        {"rank": 13, "name": "Saint-Julien", "producer": "Chateau Talbot", "country": "France"},
        {"rank": 57, "name": "20 Year Old Tawny Porto", "producer": "Graham's", "country": "Portugal"},
        {"rank": 100, "name": "Cabernet Bosché", "producer": "Freemark Abbey", "country": "United States"},
    ]},
    # Wine Enthusiast Top 100 2025
    {"list": "Wine Enthusiast Top 100", "year": 2025, "wines": [
        {"rank": 1, "name": "Stilema Taurasi Riserva", "producer": "Mastroberardino", "country": "Italy"},
        {"rank": 4, "name": "Sassicaia", "producer": "Tenuta San Guido", "country": "Italy"},
        {"rank": 10, "name": "Brunello di Montalcino", "producer": "Poggio di Sotto", "country": "Italy"},
        {"rank": 32, "name": "Barolo Albe", "producer": "G.D. Vajra", "country": "Italy"},
        {"rank": 38, "name": "Barolo Monvigliero", "producer": "Vietti", "country": "Italy"},
        {"rank": 58, "name": "Amarone della Valpolicella", "producer": "Pasqua", "country": "Italy"},
    ]},
    # James Suckling World Top 100 2024
    {"list": "James Suckling Top 100", "year": 2024, "wines": [
        {"rank": 1, "name": "Amarone della Valpolicella Classico", "producer": "Bertani", "country": "Italy"},
        {"rank": 2, "name": "Riesling Holle GG", "producer": "Kunstler", "country": "Germany"},
        {"rank": 3, "name": "Riesling Kellerberg", "producer": "F.X. Pichler", "country": "Austria"},
    ]},
    # James Suckling France 2025
    {"list": "James Suckling Top 100 France", "year": 2025, "wines": [
        {"rank": 5, "name": "Margaux", "producer": "Chateau Giscours", "country": "France"},
        {"rank": 23, "name": "Saint-Estephe", "producer": "Chateau Cos d'Estournel", "country": "France"},
        {"rank": 32, "name": "Saint-Julien", "producer": "Chateau Leoville Barton", "country": "France"},
        {"rank": 46, "name": "Chateauneuf-du-Pape", "producer": "Domaine Charvin", "country": "France"},
        {"rank": 50, "name": "Chateauneuf-du-Pape La Crau", "producer": "Vieux Telegraphe", "country": "France"},
        {"rank": 51, "name": "Dom Perignon", "producer": "Dom Perignon", "country": "France"},
        {"rank": 62, "name": "Pessac-Leognan", "producer": "Chateau Les Carmes-Haut-Brion", "country": "France"},
        {"rank": 63, "name": "Saint-Emilion", "producer": "Chateau Canon", "country": "France"},
        {"rank": 65, "name": "Saint-Estephe", "producer": "Chateau Montrose", "country": "France"},
        {"rank": 66, "name": "Pauillac", "producer": "Chateau Pichon Longueville Lalande", "country": "France"},
        {"rank": 69, "name": "Sauternes", "producer": "Chateau d'Yquem", "country": "France"},
        {"rank": 88, "name": "Cristal", "producer": "Louis Roederer", "country": "France"},
        {"rank": 97, "name": "Grande Cuvee", "producer": "Krug", "country": "France"},
    ]},
    # James Suckling Spain 2024
    {"list": "James Suckling Top 100 Spain", "year": 2024, "wines": [
        {"rank": 58, "name": "Unico Reserva Especial", "producer": "Vega Sicilia", "country": "Spain"},
    ]},
    # James Suckling South Africa 2024
    {"list": "James Suckling Top 100 South Africa", "year": 2024, "wines": [
        {"rank": 1, "name": "Columella", "producer": "Sadie Family", "country": "South Africa"},
    ]},
    # James Suckling Argentina 2024
    {"list": "James Suckling Top 100 Argentina", "year": 2024, "wines": [
        {"rank": 1, "name": "Malbec Los Amantes", "producer": "Altos Las Hormigas", "country": "Argentina"},
    ]},
    # James Suckling USA 2024
    {"list": "James Suckling Top 100 USA", "year": 2024, "wines": [
        {"rank": 1, "name": "Merlot Stagecoach Vineyard", "producer": "Pahlmeyer", "country": "United States"},
    ]},
    # James Suckling New Zealand 2024
    {"list": "James Suckling Top 100 New Zealand", "year": 2024, "wines": [
        {"rank": 1, "name": "Chardonnay Limeworks", "producer": "Bell Hill", "country": "New Zealand"},
    ]},
    # Gambero Rosso Tre Bicchieri 2025-2026 (Italy - selected top wines)
    {"list": "Gambero Rosso Tre Bicchieri", "year": 2025, "wines": [
        {"rank": 0, "name": "Sassicaia", "producer": "Tenuta San Guido", "country": "Italy"},
        {"rank": 0, "name": "Tignanello", "producer": "Marchesi Antinori", "country": "Italy"},
        {"rank": 0, "name": "Solaia", "producer": "Marchesi Antinori", "country": "Italy"},
        {"rank": 0, "name": "Barolo Francia", "producer": "Giacomo Conterno", "country": "Italy"},
        {"rank": 0, "name": "Barbaresco Sori Tildin", "producer": "Gaja", "country": "Italy"},
        {"rank": 0, "name": "Amarone della Valpolicella Classico", "producer": "Bertani", "country": "Italy"},
        {"rank": 0, "name": "Amarone della Valpolicella Classico", "producer": "Giuseppe Quintarelli", "country": "Italy"},
        {"rank": 0, "name": "Brunello di Montalcino", "producer": "Biondi-Santi", "country": "Italy"},
        {"rank": 0, "name": "Brunello di Montalcino", "producer": "Poggio di Sotto", "country": "Italy"},
        {"rank": 0, "name": "Barolo Monvigliero", "producer": "Vietti", "country": "Italy"},
        {"rank": 0, "name": "Barolo Monprivato", "producer": "Giuseppe Mascarello", "country": "Italy"},
    ]},
    # Guia Penin 100-point wines Spain 2025-2026
    {"list": "Guia Penin 100 Points", "year": 2025, "wines": [
        {"rank": 0, "name": "Vina El Pison", "producer": "Artadi", "country": "Spain"},
        {"rank": 0, "name": "Contador Las Paulejas", "producer": "Contador", "country": "Spain"},
    ]},
    # Tim Atkin South Africa 2024
    {"list": "Tim Atkin South Africa Report", "year": 2024, "wines": [
        {"rank": 0, "name": "Columella", "producer": "Sadie Family", "country": "South Africa"},
        {"rank": 0, "name": "Rubicon", "producer": "Meerlust", "country": "South Africa"},
        {"rank": 0, "name": "Palladius", "producer": "Sadie Family", "country": "South Africa"},
    ]},
    # Decanter DWWA 2025 Best in Show (selected)
    {"list": "Decanter Best in Show", "year": 2025, "wines": [
        {"rank": 0, "name": "Tio Pepe Cuatro Palmas Amontillado", "producer": "Gonzalez Byass", "country": "Spain"},
        {"rank": 0, "name": "Passito di Pantelleria Ben Rye", "producer": "Donnafugata", "country": "Italy"},
        {"rank": 0, "name": "Reserve Cabernet Sauvignon", "producer": "Xanadu", "country": "Australia"},
        {"rank": 0, "name": "Pinot Noir Martinborough", "producer": "Craggy Range", "country": "New Zealand"},
    ]},
    # Decanter DWWA 2024 Best in Show
    {"list": "Decanter Best in Show", "year": 2024, "wines": [
        {"rank": 0, "name": "Brunello di Montalcino Riserva", "producer": "Carpineto", "country": "Italy"},
        {"rank": 0, "name": "Amarone della Valpolicella Classico Riserva Bosan", "producer": "Cesari", "country": "Italy"},
    ]},
    # Halliday Top Wineries Australia 2025
    {"list": "Halliday Wine Companion", "year": 2025, "wines": [
        {"rank": 1, "name": "Wines by Vasse Felix", "producer": "Vasse Felix", "country": "Australia"},
        {"rank": 2, "name": "Wines by Brokenwood", "producer": "Brokenwood", "country": "Australia"},
    ]},
]

def match_wine_in_db(cur, name, producer, country):
    """Try to find a wine in the database using fuzzy matching."""
    norm_name = normalize(name)
    norm_producer = normalize(producer)

    # Strategy 1: Exact ILIKE match on name + producer
    cur.execute("""
        SELECT id, slug, name, producer, aggregate_score, badges
        FROM wines
        WHERE unaccent(LOWER(name)) ILIKE unaccent(%s)
          AND unaccent(LOWER(producer)) ILIKE unaccent(%s)
        ORDER BY aggregate_score DESC
        LIMIT 1
    """, (f"%{norm_name}%", f"%{norm_producer}%"))
    row = cur.fetchone()
    if row:
        return row

    # Strategy 2: Just producer + partial name
    words = norm_name.split()
    if len(words) >= 2:
        key_word = words[0] if len(words[0]) > 3 else words[1] if len(words) > 1 else words[0]
        cur.execute("""
            SELECT id, slug, name, producer, aggregate_score, badges
            FROM wines
            WHERE unaccent(LOWER(producer)) ILIKE unaccent(%s)
              AND unaccent(LOWER(name)) ILIKE unaccent(%s)
            ORDER BY aggregate_score DESC
            LIMIT 1
        """, (f"%{norm_producer}%", f"%{key_word}%"))
        row = cur.fetchone()
        if row:
            return row

    # Strategy 3: Just producer name match (for famous producers)
    cur.execute("""
        SELECT id, slug, name, producer, aggregate_score, badges
        FROM wines
        WHERE unaccent(LOWER(producer)) ILIKE unaccent(%s)
          AND LOWER(country) = LOWER(%s)
        ORDER BY aggregate_score DESC
        LIMIT 1
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
    score_boosts = 0

    for ranking in RANKINGS:
        list_name = ranking["list"]
        year = ranking["year"]
        print(f"\n--- {list_name} {year} ---")

        for wine_entry in ranking["wines"]:
            name = wine_entry["name"]
            producer = wine_entry["producer"]
            country = wine_entry["country"]
            rank = wine_entry.get("rank", 0)

            row = match_wine_in_db(cur, name, producer, country)

            if row:
                wine_id, slug, db_name, db_producer, score, current_badges = row
                current_badges = current_badges or []

                # Build badge text
                if rank > 0:
                    badge = f"{list_name} #{rank} ({year})"
                else:
                    badge = f"{list_name} ({year})"

                # Add badge if not already present
                if badge not in current_badges:
                    new_badges = current_badges + [badge]

                    # Score boost: +0.5 for each major list appearance, +1.0 for top 10
                    boost = 1.0 if rank > 0 and rank <= 10 else 0.5
                    new_score = min(99.0, float(score) + boost)

                    cur.execute("""
                        UPDATE wines
                        SET badges = %s, aggregate_score = %s
                        WHERE id = %s
                    """, (new_badges, new_score, wine_id))

                    badges_added += 1
                    if new_score > float(score):
                        score_boosts += 1

                    print(f"  ✓ Matched: {db_producer} - {db_name} (score: {score} → {new_score}) [{badge}]")
                else:
                    print(f"  = Already has badge: {db_producer} - {db_name}")

                matched += 1
            else:
                print(f"  ✗ Not found: {producer} - {name}")
                not_found += 1

    conn.commit()

    # Summary
    print(f"\n{'='*60}")
    print(f"RANKING BADGES COMPLETE")
    print(f"{'='*60}")
    print(f"Total wines in rankings: {matched + not_found}")
    print(f"Matched in database:     {matched}")
    print(f"Not found:               {not_found}")
    print(f"Badges added:            {badges_added}")
    print(f"Score boosts applied:    {score_boosts}")

    # Show top wines with most badges
    cur.execute("""
        SELECT name, producer, aggregate_score, badges
        FROM wines
        WHERE array_length(badges, 1) > 2
        ORDER BY array_length(badges, 1) DESC, aggregate_score DESC
        LIMIT 20
    """)
    print(f"\nTop wines by badge count:")
    for row in cur.fetchall():
        print(f"  {row[1]} - {row[0]} (score: {row[2]}, badges: {row[3]})")

    conn.close()


if __name__ == "__main__":
    main()
