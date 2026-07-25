#!/usr/bin/env python3
"""
Add ALL ranking badges from published wine lists to our database.
Comprehensive script covering 500+ wines from major publications.
"""
import psycopg2
import psycopg2.extras
import json
import re
import unicodedata
import sys

DB_URL = "postgresql://neondb_owner:npg_PL8RkghoMxG6@ep-fancy-forest-awmd0h5i-pooler.c-12.us-east-1.aws.neon.tech/neondb?sslmode=require"

def normalize(s):
    """Normalize a string for fuzzy matching."""
    s = unicodedata.normalize("NFD", s)
    s = re.sub(r"[\u0300-\u036f]", "", s)  # strip accents
    s = s.lower().strip()
    s = re.sub(r"[^a-z0-9\s]", " ", s)
    s = re.sub(r"\s+", " ", s)
    return s.strip()

# ============================================================================
# ALL published ranking data
# ============================================================================
RANKINGS = [
    # =========================================================================
    # WINE SPECTATOR TOP 100 2025 — additional wines
    # =========================================================================
    {"list": "Wine Spectator Top 100", "year": 2025, "wines": [
        {"rank": 4, "name": "Pinot Noir Russian River Valley Eastside Road", "producer": "Williams Selyem", "country": "United States"},
        {"rank": 8, "name": "Pinot Noir Fort Ross-Seaview", "producer": "Wayfarer", "country": "United States"},
        {"rank": 9, "name": "Chianti Classico San Lorenzo Gran Selezione", "producer": "Castello di Ama", "country": "Italy"},
        {"rank": 10, "name": "Chateauneuf-du-Pape", "producer": "Famille Isabel Ferrando", "country": "France"},
        {"rank": 16, "name": "AVNI Pinot Noir Willamette Valley", "producer": "Lingua Franca", "country": "United States"},
        {"rank": 19, "name": "Pinot Noir Willamette Valley", "producer": "Penner-Ash", "country": "United States"},
        {"rank": 20, "name": "Sauvignon Blanc Marlborough", "producer": "Rimapere", "country": "New Zealand"},
        {"rank": 22, "name": "Chardonnay Sonoma Coast", "producer": "Patz & Hall", "country": "United States"},
        {"rank": 25, "name": "Chianti Classico Riserva", "producer": "Carpineto", "country": "Italy"},
        {"rank": 27, "name": "Chenin Blanc Viognier", "producer": "Pine Ridge", "country": "United States"},
        {"rank": 28, "name": "Centine Toscana", "producer": "Castello Banfi", "country": "Italy"},
        {"rank": 31, "name": "Chianti Rufina Riserva", "producer": "Marchesi de Frescobaldi", "country": "Italy"},
        {"rank": 35, "name": "The Blend Apalta", "producer": "Primus", "country": "Chile"},
        {"rank": 36, "name": "Dry Riesling Finger Lakes", "producer": "Ravines Wine Cellars", "country": "United States"},
        {"rank": 37, "name": "Shea Vineyard Pinot Noir Willamette Valley", "producer": "Ken Wright", "country": "United States"},
        {"rank": 38, "name": "Extra Quality Brut Champagne", "producer": "Ployez-Jacquemart", "country": "France"},
        {"rank": 48, "name": "Altano Douro", "producer": "Symington", "country": "Portugal"},
        {"rank": 49, "name": "Old Vine Reserve Chenin Blanc Stellenbosch", "producer": "Ken Forrester", "country": "South Africa"},
        {"rank": 51, "name": "Cabernet Sauvignon Napa Valley", "producer": "Caterwaul", "country": "United States"},
        {"rank": 62, "name": "Sauvignon Blanc Marlborough", "producer": "Te Pa", "country": "New Zealand"},
        {"rank": 75, "name": "Etna Rosato", "producer": "Graci", "country": "Italy"},
        {"rank": 96, "name": "Blanco Rioja", "producer": "Bodegas Bhilar", "country": "Spain"},
        {"rank": 99, "name": "La Jalousie Savennieres", "producer": "Domaine du Closel", "country": "France"},
    ]},

    # =========================================================================
    # WINE ENTHUSIAST TOP 100 2025 — additional Italian wines + others
    # =========================================================================
    {"list": "Wine Enthusiast Top 100", "year": 2025, "wines": [
        {"rank": 2, "name": "51N Traditional Method Sparkling", "producer": "Gusbourne", "country": "United Kingdom"},
        {"rank": 3, "name": "Heart Stone Vineyard Red Blend Paso Robles", "producer": "Saxum", "country": "United States"},
        {"rank": 16, "name": "Redigaffi", "producer": "Tua Rita", "country": "Italy"},
        {"rank": 18, "name": "Brunello di Montalcino Vigna del Suolo", "producer": "Argiano", "country": "Italy"},
        {"rank": 26, "name": "Brunello di Montalcino Capriolo Riserva", "producer": "Terre Nere", "country": "Italy"},
        {"rank": 30, "name": "Chianti Classico Riserva", "producer": "Banfi", "country": "Italy"},
        {"rank": 34, "name": "Verduno Pelaverga", "producer": "Diego Morra", "country": "Italy"},
        {"rank": 36, "name": "Brunello di Montalcino", "producer": "Salvioni", "country": "Italy"},
        {"rank": 40, "name": "Barolo Monvigliero", "producer": "Fratelli Alessandria", "country": "Italy"},
        {"rank": 41, "name": "Bolgheri Rosso", "producer": "Grattamacco", "country": "Italy"},
        {"rank": 53, "name": "Vigorello IGT Toscana", "producer": "San Felice", "country": "Italy"},
        {"rank": 54, "name": "Brunello di Montalcino Vigna Montosoli", "producer": "Altesino", "country": "Italy"},
        {"rank": 71, "name": "Trentodoc Rose Extra Brut", "producer": "Moser", "country": "Italy"},
        {"rank": 74, "name": "Il Blu IGT Toscana", "producer": "Brancaia", "country": "Italy"},
        {"rank": 85, "name": "Chianti Classico Gran Selezione Campolungo", "producer": "Lamole di Lamole", "country": "Italy"},
        {"rank": 90, "name": "Schweizer Alto Adige", "producer": "Franz Haas", "country": "Italy"},
        {"rank": 94, "name": "Trentodoc Brut Nature", "producer": "Rotari", "country": "Italy"},
    ]},

    # =========================================================================
    # WINE ENTHUSIAST TOP 100 2024
    # =========================================================================
    {"list": "Wine Enthusiast Top 100", "year": 2024, "wines": [
        {"rank": 1, "name": "RMS Brut 10-Year Delayed Disgorgement", "producer": "ROCO Winery", "country": "United States"},
        {"rank": 2, "name": "Poggio al Vento Brunello di Montalcino Riserva", "producer": "Col d'Orcia", "country": "Italy"},
    ]},

    # =========================================================================
    # JAMES SUCKLING TOP 100 FRANCE 2025 — all remaining wines
    # =========================================================================
    {"list": "James Suckling Top 100 France", "year": 2025, "wines": [
        {"rank": 1, "name": "Morgon Cote du Py", "producer": "Jean-Marc Burgaud", "country": "France"},
        {"rank": 2, "name": "Margaux", "producer": "Chateau d'Issan", "country": "France"},
        {"rank": 3, "name": "Sauternes", "producer": "Chateau Suduiraut", "country": "France"},
        {"rank": 4, "name": "Riesling Alsace Grand Cru Hengst", "producer": "Domaine Barmes-Buecher", "country": "France"},
        {"rank": 12, "name": "Moulin-a-Vent Coeur de Vigneronne", "producer": "Domaine Anita", "country": "France"},
        {"rank": 16, "name": "Cornas La Geynale", "producer": "Domaine Vincent Paris", "country": "France"},
        {"rank": 17, "name": "Pinot Gris Alsace Grand Cru Rangen", "producer": "Domaine Zind Humbrecht", "country": "France"},
        {"rank": 18, "name": "Riesling Alsace Grand Cru Schlossberg", "producer": "Domaine Weinbach", "country": "France"},
        {"rank": 21, "name": "Pinot Noir Alsace Les Saintes Claires", "producer": "Albert Mann", "country": "France"},
        {"rank": 26, "name": "Alsace Grand Cru Schoenenbourg", "producer": "Domaine Marcel Deiss", "country": "France"},
        {"rank": 27, "name": "Pessac-Leognan", "producer": "Domaine de Chevalier", "country": "France"},
        {"rank": 29, "name": "Gigondas Les Racines", "producer": "Les Pallieres", "country": "France"},
        {"rank": 34, "name": "Margaux", "producer": "Chateau Rauzan-Segla", "country": "France"},
        {"rank": 35, "name": "Pauillac", "producer": "Chateau Pedesclaux", "country": "France"},
        {"rank": 39, "name": "Margaux", "producer": "Chateau Brane-Cantenac", "country": "France"},
        {"rank": 40, "name": "Pauillac", "producer": "Chateau Grand-Puy-Lacoste", "country": "France"},
        {"rank": 42, "name": "Pessac-Leognan", "producer": "Chateau Pape Clement", "country": "France"},
        {"rank": 43, "name": "Riesling Alsace Cuvee Frederic Emile", "producer": "Trimbach", "country": "France"},
        {"rank": 45, "name": "Riesling Alsace Grand Cru Sommerberg", "producer": "Albert Boxler", "country": "France"},
        {"rank": 48, "name": "Chateauneuf-du-Pape La Crau Ouest", "producer": "Domaine Santa Duc", "country": "France"},
        {"rank": 52, "name": "Blanc de Blancs Cuvee de Reserve Vinotheque", "producer": "Pol Roger", "country": "France"},
        {"rank": 53, "name": "Blanc de Blancs Champagne", "producer": "Deutz", "country": "France"},
        {"rank": 54, "name": "Hermitage Lieu Dit Ligne de Crete", "producer": "Delas", "country": "France"},
        {"rank": 55, "name": "Beaune 1er Cru Clos des Mouches", "producer": "Joseph Drouhin", "country": "France"},
        {"rank": 56, "name": "Meursault 1er Cru Perrieres", "producer": "Bouchard Pere et Fils", "country": "France"},
        {"rank": 57, "name": "Volnay 1er Cru Clos des Santenots", "producer": "Domaine Jacques Prieur", "country": "France"},
        {"rank": 60, "name": "Ermitage Blanc De L Oree", "producer": "M. Chapoutier", "country": "France"},
        {"rank": 67, "name": "Saint-Emilion", "producer": "La Mondotte", "country": "France"},
        {"rank": 68, "name": "Saint-Emilion", "producer": "Chateau Figeac", "country": "France"},
        {"rank": 71, "name": "Chateauneuf-du-Pape Hommage a Jacques Perrin", "producer": "Chateau de Beaucastel", "country": "France"},
        {"rank": 73, "name": "Grand Siecle Grande Cuvee", "producer": "Laurent-Perrier", "country": "France"},
        {"rank": 74, "name": "R.D. Extra Brut", "producer": "Bollinger", "country": "France"},
        {"rank": 75, "name": "Blanc des Millenaires", "producer": "Charles Heidsieck", "country": "France"},
        {"rank": 76, "name": "Hermitage La Chapelle", "producer": "Domaine de la Chapelle Jaboulet", "country": "France"},
        {"rank": 77, "name": "Cornas", "producer": "Domaine A. Clape", "country": "France"},
        {"rank": 81, "name": "Pomerol", "producer": "Chateau La Conseillante", "country": "France"},
        {"rank": 83, "name": "Cote-Rotie La Belle Helene", "producer": "Stephane Ogier", "country": "France"},
        {"rank": 84, "name": "Cote-Rotie La Landonne", "producer": "E. Guigal", "country": "France"},
        {"rank": 85, "name": "Puligny-Montrachet 1er Cru Folatieres", "producer": "Olivier Leflaive", "country": "France"},
        {"rank": 87, "name": "Corton-Charlemagne Grand Cru", "producer": "Domaine des Heritiers Louis Jadot", "country": "France"},
        {"rank": 89, "name": "VP Vieillissement Prolonge", "producer": "Egly-Ouriet", "country": "France"},
        {"rank": 92, "name": "Ay Grand Cru MV20", "producer": "Henri Giraud", "country": "France"},
        {"rank": 94, "name": "Comtes de Champagne Blanc de Blancs", "producer": "Taittinger", "country": "France"},
        {"rank": 95, "name": "Cuvee Nicolas Francois", "producer": "Billecart-Salmon", "country": "France"},
        {"rank": 98, "name": "Clos des Goisses Extra Brut", "producer": "Philipponnat", "country": "France"},
    ]},

    # =========================================================================
    # JAMES SUCKLING GERMANY 2024
    # =========================================================================
    {"list": "James Suckling Top 100 Germany", "year": 2024, "wines": [
        {"rank": 0, "name": "Riesling Nahe Hermannshohle GG", "producer": "Donnhoff", "country": "Germany"},
        {"rank": 0, "name": "Riesling Rheinhessen Morstein GG", "producer": "Wittmann", "country": "Germany"},
        {"rank": 0, "name": "Spatburgunder Baden Wildenstein GG", "producer": "Bernhard Huber", "country": "Germany"},
    ]},

    # =========================================================================
    # JAMES SUCKLING AUSTRIA 2024
    # =========================================================================
    {"list": "James Suckling Top 100 Austria", "year": 2024, "wines": [
        {"rank": 0, "name": "Gruner Veltliner Traisental Berg EL", "producer": "Markus Huber", "country": "Austria"},
    ]},

    # =========================================================================
    # JAMES SUCKLING PORTUGAL 2024
    # =========================================================================
    {"list": "James Suckling Top 100 Portugal", "year": 2024, "wines": [
        {"rank": 1, "name": "Dao Vinhas Velhas Branco", "producer": "Antonio Madeira", "country": "Portugal"},
    ]},

    # =========================================================================
    # JAMES SUCKLING NEW ZEALAND 2025
    # =========================================================================
    {"list": "James Suckling Top 100 New Zealand", "year": 2025, "wines": [
        {"rank": 1, "name": "Pinot Noir Bannockburn Mysterious Diggings", "producer": "Terra Sancta", "country": "New Zealand"},
        {"rank": 2, "name": "Pinot Noir Central Otago Cornish Point", "producer": "Felton Road", "country": "New Zealand"},
        {"rank": 3, "name": "Chardonnay Kumeu Mates Vineyard", "producer": "Kumeu River", "country": "New Zealand"},
        {"rank": 4, "name": "Syrah Hawkes Bay La Collina", "producer": "Bilancia", "country": "New Zealand"},
        {"rank": 5, "name": "Syrah Martinborough", "producer": "Kusuda", "country": "New Zealand"},
    ]},

    # =========================================================================
    # TIM ATKIN SOUTH AFRICA 2024 — additional wines
    # =========================================================================
    {"list": "Tim Atkin South Africa Report", "year": 2024, "wines": [
        {"rank": 0, "name": "Nautical Dawn Chenin Blanc", "producer": "Alheit Vineyards", "country": "South Africa"},
        {"rank": 0, "name": "Rubicon", "producer": "Meerlust", "country": "South Africa"},
        {"rank": 0, "name": "Syrah", "producer": "Porseleinberg", "country": "South Africa"},
        {"rank": 0, "name": "Raaigras Grenache", "producer": "AA Badenhorst", "country": "South Africa"},
        {"rank": 0, "name": "Pinotage", "producer": "Beeslaar", "country": "South Africa"},
        {"rank": 0, "name": "Laurence Graff Reserve", "producer": "Delaire Graff", "country": "South Africa"},
        {"rank": 0, "name": "Ignis Pinot Noir", "producer": "Storm Wines", "country": "South Africa"},
        {"rank": 0, "name": "Ridge Pinot Noir", "producer": "Storm Wines", "country": "South Africa"},
        {"rank": 0, "name": "Vrede Pinot Noir", "producer": "Storm Wines", "country": "South Africa"},
        {"rank": 0, "name": "Never Been Asked to Dance", "producer": "Savage", "country": "South Africa"},
    ]},

    # =========================================================================
    # GAMBERO ROSSO TRE BICCHIERI 2025/2026 — more wines
    # =========================================================================
    {"list": "Gambero Rosso Tre Bicchieri", "year": 2025, "wines": [
        {"rank": 0, "name": "Barolo Arborina", "producer": "Elio Altare", "country": "Italy"},
        {"rank": 0, "name": "Barolo Mosconi", "producer": "Pio Cesare", "country": "Italy"},
        {"rank": 0, "name": "Barolo Vigna Rionda", "producer": "Giovanni Rosso", "country": "Italy"},
        {"rank": 0, "name": "Barolo Runcot Riserva", "producer": "Elio Grasso", "country": "Italy"},
        {"rank": 0, "name": "Barbaresco Rabaja", "producer": "Bruno Giacosa", "country": "Italy"},
        {"rank": 0, "name": "Barbaresco Pajore", "producer": "Sottimano", "country": "Italy"},
        {"rank": 0, "name": "Rosazzo Terre Alte", "producer": "Livio Felluga", "country": "Italy"},
        {"rank": 0, "name": "Capo Martino", "producer": "Jermann", "country": "Italy"},
        {"rank": 0, "name": "Montepulciano d'Abruzzo", "producer": "Emidio Pepe", "country": "Italy"},
        {"rank": 0, "name": "Munjebel Rosso MC", "producer": "Frank Cornelissen", "country": "Italy"},
        {"rank": 0, "name": "Etna Rosso Vigna Barbagalli", "producer": "Pietradolce", "country": "Italy"},
        {"rank": 0, "name": "Cerasuolo di Vittoria", "producer": "Planeta", "country": "Italy"},
        {"rank": 0, "name": "Duca Enrico", "producer": "Duca di Salaparuta", "country": "Italy"},
        {"rank": 0, "name": "Tignanello", "producer": "Marchesi Antinori", "country": "Italy"},
        {"rank": 0, "name": "Solaia", "producer": "Marchesi Antinori", "country": "Italy"},
        {"rank": 0, "name": "Bolgheri Bianco", "producer": "Ornellaia", "country": "Italy"},
        {"rank": 0, "name": "Flaccianello della Pieve", "producer": "Fontodi", "country": "Italy"},
        {"rank": 0, "name": "Montevertine", "producer": "Montevertine", "country": "Italy"},
        {"rank": 0, "name": "Brunello di Montalcino Riserva", "producer": "Biondi-Santi", "country": "Italy"},
        {"rank": 0, "name": "Brunello di Montalcino Tenuta Nuova", "producer": "Casanova di Neri", "country": "Italy"},
        {"rank": 0, "name": "Nobile di Montepulciano Asinone", "producer": "Poliziano", "country": "Italy"},
        {"rank": 0, "name": "Chianti Classico Gran Selezione Colledila", "producer": "Barone Ricasoli", "country": "Italy"},
        {"rank": 0, "name": "Chianti Classico", "producer": "Isole e Olena", "country": "Italy"},
        {"rank": 0, "name": "Paleo Rosso", "producer": "Le Macchiole", "country": "Italy"},
    ]},

    # =========================================================================
    # GUIA PENIN 100 POINTS SPAIN — additional
    # =========================================================================
    {"list": "Guia Penin 100 Points", "year": 2025, "wines": [
        {"rank": 0, "name": "Enoteca Brut Nature Cava", "producer": "Gramona", "country": "Spain"},
        {"rank": 0, "name": "Les Parcelles Verdejo", "producer": "Belondrade", "country": "Spain"},
        {"rank": 0, "name": "Albillo Vinas Viejas", "producer": "Dominio del Aguila", "country": "Spain"},
        {"rank": 0, "name": "1898 Albarino", "producer": "La Fillaboa", "country": "Spain"},
        {"rank": 0, "name": "Les Manyes Garnacha Priorat", "producer": "Terroir al Limit", "country": "Spain"},
        {"rank": 0, "name": "La Roza Ribera del Duero", "producer": "Dominio de Atauta", "country": "Spain"},
    ]},
    {"list": "Guia Penin 100 Points", "year": 2026, "wines": [
        {"rank": 0, "name": "Castillo Ygay", "producer": "Marques de Murrieta", "country": "Spain"},
        {"rank": 0, "name": "La Condenada Rioja", "producer": "Artuke", "country": "Spain"},
        {"rank": 0, "name": "Amontillado VORS Jerez", "producer": "Tradicion", "country": "Spain"},
        {"rank": 0, "name": "Tio Pepe Cuatro Palmas", "producer": "Gonzalez Byass", "country": "Spain"},
    ]},

    # =========================================================================
    # DECANTER DWWA 2025 BEST IN SHOW — additional
    # =========================================================================
    {"list": "Decanter Best in Show", "year": 2025, "wines": [
        {"rank": 0, "name": "Bougros Chablis Grand Cru", "producer": "Jean-Marc Brocard", "country": "France"},
        {"rank": 0, "name": "Hospices de Beaune Clos de la Roche Grand Cru", "producer": "Albert Bichot", "country": "France"},
        {"rank": 0, "name": "Rare Collection Blanc de Blancs Champagne", "producer": "Barons de Rothschild", "country": "France"},
        {"rank": 0, "name": "Noble Brut Champagne", "producer": "Lanson", "country": "France"},
        {"rank": 0, "name": "Rare Champagne Brut 2012", "producer": "Rare Champagne", "country": "France"},
        {"rank": 0, "name": "Sauternes", "producer": "Chateau Bastor-Lamontagne", "country": "France"},
        {"rank": 0, "name": "Barolo Del Comune Di Verduno", "producer": "Diego Morra", "country": "Italy"},
        {"rank": 0, "name": "Cannubi Barolo Riserva", "producer": "Fratelli Serio Battista Borgogno", "country": "Italy"},
        {"rank": 0, "name": "Taurasi", "producer": "Donnachiara", "country": "Italy"},
        {"rank": 0, "name": "Lunare Gewurztraminer", "producer": "Cantina Terlano", "country": "Italy"},
        {"rank": 0, "name": "La Capona Amandi Ribeira Sacra", "producer": "Don Bernardino", "country": "Spain"},
        {"rank": 0, "name": "Mas de la Rosa Priorat", "producer": "Vall Llach", "country": "Spain"},
        {"rank": 0, "name": "Doroteo Ribera del Duero", "producer": "Pago de los Capellanes", "country": "Spain"},
        {"rank": 0, "name": "Cortes Douro", "producer": "Quinta Do Reguengo", "country": "Portugal"},
        {"rank": 0, "name": "Da Casa Grande Reserva Douro", "producer": "Santos Seixo", "country": "Portugal"},
        {"rank": 0, "name": "Alvarinho Vinho Verde", "producer": "Soalheiro", "country": "Portugal"},
        {"rank": 0, "name": "Quinta Dos Malvedos Port", "producer": "Graham's", "country": "Portugal"},
        {"rank": 0, "name": "50 Year Old Tawny Port", "producer": "Menin", "country": "Portugal"},
        {"rank": 0, "name": "The 12th Man Chardonnay Adelaide Hills", "producer": "Wirra Wirra", "country": "Australia"},
        {"rank": 0, "name": "Shiraz", "producer": "Barossa Old Vine Company", "country": "Australia"},
        {"rank": 0, "name": "Reserve Shiraz Heathcote", "producer": "Trentham Estate", "country": "Australia"},
        {"rank": 0, "name": "Single Vineyard Malbec Gualtallary", "producer": "Rutini", "country": "Argentina"},
    ]},

    # =========================================================================
    # DECANTER DWWA 2024 BEST IN SHOW — additional
    # =========================================================================
    {"list": "Decanter Best in Show", "year": 2024, "wines": [
        {"rank": 0, "name": "Barolo Bricco San Pietro", "producer": "Broccardo", "country": "Italy"},
        {"rank": 0, "name": "Barolo Montanello", "producer": "Fratelli Monchiero", "country": "Italy"},
        {"rank": 0, "name": "Juvelo Passito Gewurztraminer", "producer": "Cantina Andriano", "country": "Italy"},
        {"rank": 0, "name": "Anthium Bellone", "producer": "Casale del Giglio", "country": "Italy"},
        {"rank": 0, "name": "Yettalil Napa Valley", "producer": "Clos du Val", "country": "United States"},
        {"rank": 0, "name": "Microterroir Malbec Tupungato", "producer": "Finca Flichman", "country": "Argentina"},
        {"rank": 0, "name": "Altaluvia Cabernet Franc Tupungato", "producer": "Vina Dona Paula", "country": "Argentina"},
    ]},

    # =========================================================================
    # GREEK WINES — Botilia.gr 2024
    # =========================================================================
    {"list": "Botilia.gr Top Wines Greece", "year": 2024, "wines": [
        {"rank": 0, "name": "Santorini Cuvee Monsignori", "producer": "Estate Argyros", "country": "Greece"},
        {"rank": 0, "name": "Earth and Sky Naoussa", "producer": "Thymiopoulos", "country": "Greece"},
        {"rank": 0, "name": "Alpha One", "producer": "Alpha Estate", "country": "Greece"},
        {"rank": 0, "name": "Pyritis Santorini", "producer": "Artemis Karamolegos", "country": "Greece"},
        {"rank": 0, "name": "Diaporos Naoussa", "producer": "Ktima Kir-Yianni", "country": "Greece"},
        {"rank": 0, "name": "Idylle d'Achinos", "producer": "La Tour Melas", "country": "Greece"},
        {"rank": 0, "name": "Nostos Mourvedre Crete", "producer": "Manousakis", "country": "Greece"},
        {"rank": 0, "name": "Naoussa Grande Reserve", "producer": "Boutaris", "country": "Greece"},
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

    # Strategy 2: Just producer + partial name (key word)
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

    # Strategy 3: Just producer name match (for famous producers with one flagship)
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

    total_matched = 0
    total_not_found = 0
    total_badges_added = 0
    total_score_boosts = 0
    list_stats = {}

    for ranking in RANKINGS:
        list_name = ranking["list"]
        year = ranking["year"]
        list_key = f"{list_name} {year}"
        print(f"\n{'='*60}")
        print(f"  {list_key}")
        print(f"{'='*60}")

        list_matched = 0
        list_missed = 0

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

                    # Score boost: +1.0 for top 10, +0.5 for others
                    boost = 1.0 if rank > 0 and rank <= 10 else 0.5
                    new_score = min(99.0, float(score) + boost)

                    cur.execute("""
                        UPDATE wines
                        SET badges = %s, aggregate_score = %s
                        WHERE id = %s
                    """, (new_badges, new_score, wine_id))

                    total_badges_added += 1
                    if new_score > float(score):
                        total_score_boosts += 1

                    print(f"  + Matched: {db_producer} - {db_name} (score: {score} -> {new_score}) [{badge}]")
                else:
                    print(f"  = Already has badge: {db_producer} - {db_name}")

                total_matched += 1
                list_matched += 1
            else:
                print(f"  x Not found: {producer} - {name}")
                total_not_found += 1
                list_missed += 1

        list_stats[list_key] = {"matched": list_matched, "missed": list_missed}

    conn.commit()

    # Per-list summary
    print(f"\n{'='*60}")
    print(f"  MATCH/MISS STATS PER LIST")
    print(f"{'='*60}")
    for list_key, stats in list_stats.items():
        total = stats["matched"] + stats["missed"]
        pct = (stats["matched"] / total * 100) if total > 0 else 0
        print(f"  {list_key}: {stats['matched']}/{total} matched ({pct:.0f}%) | {stats['missed']} missed")

    # Final summary
    print(f"\n{'='*60}")
    print(f"  FINAL SUMMARY")
    print(f"{'='*60}")
    print(f"  Total wines in rankings:  {total_matched + total_not_found}")
    print(f"  Matched in database:      {total_matched}")
    print(f"  Not found:                {total_not_found}")
    print(f"  New badges added:         {total_badges_added}")
    print(f"  Score boosts applied:     {total_score_boosts}")

    # Show top wines with most badges
    cur.execute("""
        SELECT name, producer, aggregate_score, badges, array_length(badges, 1) as badge_count
        FROM wines
        WHERE array_length(badges, 1) >= 1
        ORDER BY array_length(badges, 1) DESC, aggregate_score DESC
        LIMIT 30
    """)
    print(f"\n{'='*60}")
    print(f"  TOP WINES BY BADGE COUNT")
    print(f"{'='*60}")
    for row in cur.fetchall():
        name, producer, score, badges, count = row
        print(f"  [{count} badges] {producer} - {name} (score: {score})")
        for b in badges:
            print(f"           - {b}")

    conn.close()
    print(f"\nDone.")


if __name__ == "__main__":
    main()
