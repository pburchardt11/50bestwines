#!/usr/bin/env python3
"""
Add badges from additional-rankings-research.md sources (11-28).
Covers: Vinous, Wine Spectator 2025, James Suckling 2025, IWC, Falstaff,
Concours Mondial, Platter's SA, Descorchados, WineAlign Canada, VinePair,
Robert Parker 100pts, National Wine Show AU, Tyson Stelzer, Sakura,
TEXSOM, ANZBWA, The Real Review.
"""
import psycopg2
import re
import unicodedata

DB_URL = "postgresql://neondb_owner:npg_PL8RkghoMxG6@ep-fancy-forest-awmd0h5i-pooler.c-12.us-east-1.aws.neon.tech/neondb?sslmode=require"
DB_URL_UNPOOLED = "postgresql://neondb_owner:npg_PL8RkghoMxG6@ep-fancy-forest-awmd0h5i.c-12.us-east-1.aws.neon.tech/neondb?sslmode=require"


def normalize(s):
    """Normalize a string for fuzzy matching."""
    s = unicodedata.normalize("NFD", s)
    s = re.sub(r"[\u0300-\u036f]", "", s)  # strip accents
    s = s.lower().strip()
    s = re.sub(r"[^a-z0-9\s]", " ", s)
    s = re.sub(r"\s+", " ", s)
    return s.strip()


RANKINGS = [
    # =========================================================================
    # SOURCE 11: Vinous Top 100 2024 (100 wines)
    # =========================================================================
    {"list": "Vinous Top 100", "year": 2024, "wines": [
        {"rank": 1, "name": "Cabernet Sauvignon Estate", "producer": "Philip Togni", "country": "United States"},
        {"rank": 2, "name": "Chardonnay Estate Vineyard", "producer": "Giaconda", "country": "Australia"},
        {"rank": 3, "name": "Chateau Pichon-Longueville Comtesse de Lalande", "producer": "Pichon Comtesse", "country": "France"},
        {"rank": 4, "name": "Barbaresco Montefico Vigna Bric Mentina", "producer": "La Ca Nova", "country": "Italy"},
        {"rank": 5, "name": "Pinot Noir Raschen Ridge", "producer": "Hirsch", "country": "United States"},
        {"rank": 6, "name": "Cheval des Andes", "producer": "Cheval des Andes", "country": "Argentina"},
        {"rank": 7, "name": "PSI", "producer": "Dominio de Pingus", "country": "Spain"},
        {"rank": 8, "name": "Tignanello", "producer": "Antinori", "country": "Italy"},
        {"rank": 9, "name": "Chateau Smith Haut Lafitte Blanc", "producer": "Smith Haut Lafitte", "country": "France"},
        {"rank": 10, "name": "Chardonnay Reserve", "producer": "Lismore", "country": "South Africa"},
        {"rank": 11, "name": "Le Trame", "producer": "Le Boncie", "country": "Italy"},
        {"rank": 12, "name": "Malbec Patagonia", "producer": "Bodega Noemia", "country": "Argentina"},
        {"rank": 13, "name": "Pinot Noir MacIntyre", "producer": "DuMOL", "country": "United States"},
        {"rank": 14, "name": "Cabernet Sauvignon Gala Vineyard", "producer": "Maitre de Chai", "country": "United States"},
        {"rank": 15, "name": "Chablis Vaudesir Grand Cru", "producer": "Samuel Billaud", "country": "France"},
        {"rank": 16, "name": "Cabernet Sauvignon", "producer": "VHR", "country": "United States"},
        {"rank": 17, "name": "Chateau Les Carmes Haut-Brion", "producer": "Les Carmes Haut-Brion", "country": "France"},
        {"rank": 18, "name": "Esprit de Tablas", "producer": "Tablas Creek", "country": "United States"},
        {"rank": 19, "name": "Chianti Classico Gran Selezione Vigna del Sorbo", "producer": "Fontodi", "country": "Italy"},
        {"rank": 20, "name": "Lytton Springs", "producer": "Ridge Vineyards", "country": "United States"},
        {"rank": 21, "name": "Cabernet Sauvignon John Riddoch", "producer": "Wynns", "country": "Australia"},
        {"rank": 22, "name": "Palladius", "producer": "Sadie Family", "country": "South Africa"},
        {"rank": 23, "name": "Chateau Canon", "producer": "Canon", "country": "France"},
        {"rank": 24, "name": "Chardonnay CIX Estate", "producer": "Aubert", "country": "United States"},
        {"rank": 25, "name": "Vinedo Chadwick", "producer": "Vinedo Chadwick", "country": "Chile"},
        {"rank": 26, "name": "Wild Sauvignon", "producer": "Greywacke", "country": "New Zealand"},
        {"rank": 27, "name": "Gigondas Le Poste", "producer": "Saint Cosme", "country": "France"},
        {"rank": 28, "name": "L Eglise-Clinet", "producer": "L Eglise-Clinet", "country": "France"},
        {"rank": 29, "name": "Barolo Berri", "producer": "Trediberri", "country": "Italy"},
        {"rank": 30, "name": "Unico", "producer": "Vega Sicilia", "country": "Spain"},
        {"rank": 31, "name": "Brunello di Montalcino", "producer": "Le Potazzine", "country": "Italy"},
        {"rank": 32, "name": "Trebbiano d Abruzzo Fonte Canale", "producer": "Tiberio", "country": "Italy"},
        {"rank": 33, "name": "Cabernet Sauvignon", "producer": "Cornell", "country": "United States"},
        {"rank": 34, "name": "Pinot Noir Estate", "producer": "Mount Eden", "country": "United States"},
        {"rank": 35, "name": "The Bard", "producer": "Realm Cellars", "country": "United States"},
        {"rank": 36, "name": "Gruner Veltliner Loibenberg Smaragd", "producer": "Alzinger", "country": "Austria"},
        {"rank": 37, "name": "Cabernet Franc Gran Enemigo Gualtallary", "producer": "El Enemigo", "country": "Argentina"},
        {"rank": 38, "name": "Cornas", "producer": "Domaine A. Clape", "country": "France"},
        {"rank": 39, "name": "Chateau Calon Segur", "producer": "Calon Segur", "country": "France"},
        {"rank": 40, "name": "VIGNO", "producer": "Garage Wine Co", "country": "Chile"},
        {"rank": 41, "name": "Dry Riesling", "producer": "Prophet's Rock", "country": "New Zealand"},
        {"rank": 42, "name": "Chateauneuf-du-Pape Rouge", "producer": "Clos des Papes", "country": "France"},
        {"rank": 43, "name": "Chardonnay X Novo Vineyard", "producer": "Walter Scott", "country": "United States"},
        {"rank": 44, "name": "Pinot Noir Garys Vineyard", "producer": "ROAR Wines", "country": "United States"},
        {"rank": 45, "name": "PN VZ19", "producer": "Bollinger", "country": "France"},
        {"rank": 46, "name": "Riesling Rangen de Thann Grand Cru", "producer": "Zind-Humbrecht", "country": "France"},
        {"rank": 47, "name": "Fire by Night", "producer": "Alheit Vineyards", "country": "South Africa"},
        {"rank": 48, "name": "Grenache Old Vine", "producer": "Kalleske", "country": "Australia"},
        {"rank": 49, "name": "Chateauneuf-du-Pape Cuvee Reservee", "producer": "Domaine du Pegau", "country": "France"},
        {"rank": 50, "name": "Malbec Nicasia Vineyard", "producer": "Catena Zapata", "country": "Argentina"},
        {"rank": 51, "name": "Riesling Clos Sainte Hune", "producer": "Trimbach", "country": "France"},
        {"rank": 52, "name": "Chardonnay Heytesbury", "producer": "Vasse Felix", "country": "Australia"},
        {"rank": 53, "name": "Sangiovese Riserva Predappio", "producer": "Chiara Condello", "country": "Italy"},
        {"rank": 54, "name": "Barolo Cannubi", "producer": "G.B. Burlotto", "country": "Italy"},
        {"rank": 55, "name": "Don Melchor", "producer": "Don Melchor", "country": "Chile"},
        {"rank": 56, "name": "Riesling Kiedricher Grafenberg Grosses Gewachs", "producer": "Robert Weil", "country": "Germany"},
        {"rank": 57, "name": "Morgon Cuvee Centenaire", "producer": "Anthony Thevenet", "country": "France"},
        {"rank": 58, "name": "I Sodi di San Niccolo", "producer": "Castellare", "country": "Italy"},
        {"rank": 59, "name": "Piedra Infinita", "producer": "Zuccardi", "country": "Argentina"},
        {"rank": 60, "name": "The Dirt Worshipper", "producer": "Denner Vineyards", "country": "United States"},
        {"rank": 61, "name": "Vina Tondonia", "producer": "Lopez de Heredia", "country": "Spain"},
        {"rank": 62, "name": "Vinedos de Montana", "producer": "Riccitelli", "country": "Argentina"},
        {"rank": 63, "name": "Blaufrankisch Lutzmannsburg Alte Reben", "producer": "Moric", "country": "Austria"},
        {"rank": 64, "name": "Brut Blanc de Blancs Vintage", "producer": "Roederer", "country": "France"},
        {"rank": 65, "name": "Syrah The Hidden", "producer": "K Vintners", "country": "United States"},
        {"rank": 66, "name": "Grenache Annexus", "producer": "John Duval", "country": "Australia"},
        {"rank": 67, "name": "Tenuta San Leonardo", "producer": "San Leonardo", "country": "Italy"},
        {"rank": 68, "name": "COYAM", "producer": "Emiliana", "country": "Chile"},
        {"rank": 69, "name": "Meursault Perrieres 1er Cru", "producer": "Michel Bouzereau", "country": "France"},
        {"rank": 70, "name": "Pinot Noir Assmannshausen Hollenberg GG", "producer": "August Kesseler", "country": "Germany"},
        {"rank": 71, "name": "The Octavius", "producer": "Yalumba", "country": "Australia"},
        {"rank": 72, "name": "Tabali DOM", "producer": "Tabali", "country": "Chile"},
        {"rank": 73, "name": "Savennieres Clos de la Hutte", "producer": "Thibaud Boudignon", "country": "France"},
        {"rank": 74, "name": "Chateau Belgrave", "producer": "Belgrave", "country": "France"},
        {"rank": 75, "name": "Carmignano Riserva", "producer": "Piaggia", "country": "Italy"},
        {"rank": 76, "name": "Riesling Achleiten Smaragd", "producer": "Rudi Pichler", "country": "Austria"},
        {"rank": 77, "name": "Riesling Nackenheimer Rothenberg GG", "producer": "Gunderloch", "country": "Germany"},
        {"rank": 78, "name": "Bramaterra", "producer": "Le Pianelle", "country": "Italy"},
        {"rank": 79, "name": "Amarone della Valpolicella Classico Sant Urbano", "producer": "Speri", "country": "Italy"},
        {"rank": 80, "name": "Brunello di Montalcino", "producer": "Il Poggione", "country": "Italy"},
        {"rank": 81, "name": "Tokaji Mezes Maly 6-Puttonyos", "producer": "Royal Tokaji", "country": "Hungary"},
        {"rank": 82, "name": "L Esprit de 2019", "producer": "Pierre Peters", "country": "France"},
        {"rank": 83, "name": "Estate Cuvee", "producer": "L Aventure", "country": "United States"},
        {"rank": 84, "name": "Riesling Sommerberg Grand Cru", "producer": "Albert Boxler", "country": "France"},
        {"rank": 85, "name": "Barbaresco Curra", "producer": "Sottimano", "country": "Italy"},
        {"rank": 86, "name": "Gran Reserva Prado Enea", "producer": "Muga", "country": "Spain"},
        {"rank": 87, "name": "Etna Rosso Prephylloxera", "producer": "Tenuta delle Terre Nere", "country": "Italy"},
        {"rank": 88, "name": "Pinot Noir Maresh Vineyard", "producer": "Arterberry Maresh", "country": "United States"},
        {"rank": 89, "name": "Tenuta di Carleone Uno", "producer": "Tenuta di Carleone", "country": "Italy"},
        {"rank": 90, "name": "Senorio de San Vicente", "producer": "San Vicente", "country": "Spain"},
        {"rank": 91, "name": "Diatom Chardonnay", "producer": "Diatom", "country": "United States"},
        {"rank": 92, "name": "Terra di Lavoro", "producer": "Galardi", "country": "Italy"},
        {"rank": 93, "name": "Chardonnay Tiratore La Collina", "producer": "Bilancia", "country": "New Zealand"},
        {"rank": 94, "name": "Saint-Joseph", "producer": "Domaine Pierre Gonon", "country": "France"},
        {"rank": 95, "name": "Pinot Bianco Riserva Vorberg", "producer": "Cantina Terlano", "country": "Italy"},
        {"rank": 96, "name": "Sorella", "producer": "Andrew Will", "country": "United States"},
        {"rank": 97, "name": "Morgon Cote du Py", "producer": "Jean-Marc Burgaud", "country": "France"},
        {"rank": 98, "name": "Riesling Great Western", "producer": "Best's Wines", "country": "Australia"},
        {"rank": 99, "name": "Verdicchio dei Castelli di Jesi Balciana", "producer": "Sartarelli", "country": "Italy"},
        {"rank": 100, "name": "Pago de Carraovejas", "producer": "Pago de Carraovejas", "country": "Spain"},
    ]},

    # =========================================================================
    # SOURCE 11: Vinous Top 100 2025 (partial - Italian wines confirmed)
    # =========================================================================
    {"list": "Vinous Top 100", "year": 2025, "wines": [
        {"rank": 1, "name": "Chianti Classico Gran Selezione Vigna Il Poggio", "producer": "Castello di Monsanto", "country": "Italy"},
        {"rank": 2, "name": "Syrah Graft", "producer": "Van Loggerenberg", "country": "South Africa"},
        {"rank": 3, "name": "Chateau Brane-Cantenac", "producer": "Brane-Cantenac", "country": "France"},
        {"rank": 5, "name": "Etna Rosso San Lorenzo", "producer": "Tenuta delle Terre Nere", "country": "Italy"},
        {"rank": 7, "name": "Barbaresco Riserva Asili", "producer": "Produttori del Barbaresco", "country": "Italy"},
        {"rank": 8, "name": "Chateau Beau Sejour Becot", "producer": "Beau Sejour Becot", "country": "France"},
        {"rank": 13, "name": "Barbaresco Riserva Rocche Massalupo", "producer": "Lodali", "country": "Italy"},
        {"rank": 16, "name": "Brunello di Montalcino Bassolino di Sopra", "producer": "Pian dell Orino", "country": "Italy"},
        {"rank": 19, "name": "Barolo Perno", "producer": "Ca di Press", "country": "Italy"},
        {"rank": 21, "name": "Montepulciano d Abruzzo Colle Vota", "producer": "Tiberio", "country": "Italy"},
        {"rank": 23, "name": "Chateau Leoville Barton", "producer": "Leoville Barton", "country": "France"},
        {"rank": 27, "name": "Chianti Classico Gran Selezione Vigneto Bellavista", "producer": "Castello di Ama", "country": "Italy"},
        {"rank": 36, "name": "Barolo Riserva Runcot", "producer": "Elio Grasso", "country": "Italy"},
        {"rank": 39, "name": "Cote-Rotie La Landonne", "producer": "Rene Rostaing", "country": "France"},
        {"rank": 41, "name": "Chateauneuf-du-Pape", "producer": "Clos des Papes", "country": "France"},
        {"rank": 44, "name": "Brunello di Montalcino Vigna Montosoli", "producer": "Canalicchio di Sopra", "country": "Italy"},
        {"rank": 48, "name": "Taurasi Primum", "producer": "Guastaferro", "country": "Italy"},
        {"rank": 55, "name": "Rosso del Gnemiz", "producer": "Ronco del Gnemiz", "country": "Italy"},
        {"rank": 57, "name": "Valpolicella Superiore Monte Lodoletta", "producer": "Romano dal Forno", "country": "Italy"},
        {"rank": 67, "name": "Ghemme Chioso dei Pomi", "producer": "Rovellotti", "country": "Italy"},
        {"rank": 69, "name": "Barrua Isola dei Nuraghi", "producer": "Agricola Punica", "country": "Italy"},
        {"rank": 73, "name": "Barolo Cannubi", "producer": "G. B. Burlotto", "country": "Italy"},
        {"rank": 75, "name": "Trebbiano Boggina B", "producer": "Petrolo", "country": "Italy"},
        {"rank": 80, "name": "Aglianico del Vulture Titolo", "producer": "Elena Fucci", "country": "Italy"},
        {"rank": 81, "name": "Vino Nobile di Montepulciano Riserva", "producer": "Poderi Sanguineto", "country": "Italy"},
        {"rank": 87, "name": "Tenuta di Trinoro", "producer": "Tenuta di Trinoro", "country": "Italy"},
        {"rank": 98, "name": "Collio Studio di Bianco", "producer": "Borgo del Tiglio", "country": "Italy"},
        {"rank": 100, "name": "Montepulciano d Abruzzo Riserva Cocciapazza", "producer": "Torre dei Beati", "country": "Italy"},
    ]},

    # =========================================================================
    # SOURCE 12: Wine Spectator Top 100 2025 (additional entries from research)
    # =========================================================================
    {"list": "Wine Spectator Top 100", "year": 2025, "wines": [
        {"rank": 1, "name": "Margaux", "producer": "Chateau Giscours", "country": "France"},
        {"rank": 2, "name": "Chardonnay UV-SL Vineyard", "producer": "Aubert", "country": "United States"},
        {"rank": 3, "name": "Lytton Springs", "producer": "Ridge Vineyards", "country": "United States"},
        {"rank": 4, "name": "Pinot Noir Russian River Valley", "producer": "Williams Selyem", "country": "United States"},
        {"rank": 5, "name": "Saint-Emilion", "producer": "Chateau Beau-Sejour Becot", "country": "France"},
        {"rank": 6, "name": "Clos Apalta", "producer": "Clos Apalta", "country": "Chile"},
        {"rank": 7, "name": "Barbaresco", "producer": "Produttori del Barbaresco", "country": "Italy"},
        {"rank": 9, "name": "Chianti Classico Gran Selezione San Lorenzo", "producer": "Castello di Ama", "country": "Italy"},
        {"rank": 10, "name": "Chateauneuf-du-Pape", "producer": "Famille Isabel Ferrando", "country": "France"},
        {"rank": 13, "name": "Saint-Julien", "producer": "Chateau Talbot", "country": "France"},
        {"rank": 14, "name": "Chianti Classico Riserva", "producer": "Viticcio", "country": "Italy"},
        {"rank": 16, "name": "Pinot Noir AVNI", "producer": "Lingua Franca", "country": "United States"},
        {"rank": 17, "name": "Chianti Classico Riserva Ducale", "producer": "Ruffino", "country": "Italy"},
        {"rank": 19, "name": "Pinot Noir Willamette Valley", "producer": "Penner-Ash", "country": "United States"},
        {"rank": 20, "name": "Sauvignon Blanc Marlborough", "producer": "Rimapere", "country": "New Zealand"},
        {"rank": 21, "name": "Brunello di Montalcino", "producer": "Camigliano", "country": "Italy"},
        {"rank": 22, "name": "Chardonnay Sonoma Coast", "producer": "Patz & Hall", "country": "United States"},
        {"rank": 25, "name": "Chianti Classico Riserva", "producer": "Carpineto", "country": "Italy"},
        {"rank": 27, "name": "Chenin Blanc Viognier", "producer": "Pine Ridge", "country": "United States"},
        {"rank": 31, "name": "Chianti Rufina Riserva Nipozzano", "producer": "Frescobaldi", "country": "Italy"},
        {"rank": 32, "name": "Annia White Blend", "producer": "Massican", "country": "United States"},
        {"rank": 35, "name": "The Blend Apalta", "producer": "Primus", "country": "Chile"},
        {"rank": 36, "name": "Dry Riesling Finger Lakes", "producer": "Ravines Wine Cellars", "country": "United States"},
        {"rank": 37, "name": "Shea Vineyard Pinot Noir", "producer": "Ken Wright", "country": "United States"},
        {"rank": 38, "name": "Extra Quality Brut Champagne", "producer": "Ployez-Jacquemart", "country": "France"},
        {"rank": 40, "name": "Rioja Reserva", "producer": "Remelluri", "country": "Spain"},
        {"rank": 49, "name": "Chenin Blanc Old Vine Reserve", "producer": "Ken Forrester", "country": "South Africa"},
        {"rank": 57, "name": "20 Year Old Tawny Porto", "producer": "Graham's", "country": "Portugal"},
        {"rank": 59, "name": "Pies Rotos Rioja", "producer": "Artuke", "country": "Spain"},
        {"rank": 62, "name": "Sauvignon Blanc Marlborough", "producer": "Te Pa", "country": "New Zealand"},
        {"rank": 75, "name": "Etna Rosato", "producer": "Graci", "country": "Italy"},
        {"rank": 96, "name": "Blanco Rioja", "producer": "Bodegas Bhilar", "country": "Spain"},
        {"rank": 99, "name": "La Jalousie Savennieres", "producer": "Domaine du Closel", "country": "France"},
    ]},

    # =========================================================================
    # SOURCE 13: James Suckling World Top 100 2025
    # =========================================================================
    {"list": "James Suckling Top 100", "year": 2025, "wines": [
        {"rank": 1, "name": "Margaux", "producer": "Chateau d'Issan", "country": "France"},
        {"rank": 2, "name": "Royal St Robert Pinot Noir Sonoma Coast", "producer": "RAEN", "country": "United States"},
        {"rank": 3, "name": "Morgon Cote du Py", "producer": "Jean-Marc Burgaud", "country": "France"},
    ]},

    # =========================================================================
    # SOURCE 14: IWC 2024 Champions
    # =========================================================================
    {"list": "IWC Champion", "year": 2024, "wines": [
        {"rank": 0, "name": "Charmes-Chambertin Grand Cru", "producer": "Edouard Delaunay", "country": "France"},
        {"rank": 0, "name": "Kisi Qvevri", "producer": "Vazisubani Estate", "country": "Georgia"},
        {"rank": 0, "name": "Rare Champagne Millesime", "producer": "Rare Champagne", "country": "France"},
        {"rank": 0, "name": "Vinsanto di Carmignano Riserva", "producer": "Tenuta Di Capezzana", "country": "Italy"},
        {"rank": 0, "name": "Palo Cortado VORS", "producer": "Bodegas Espinosa De Los Monteros", "country": "Spain"},
    ]},
    {"list": "IWC National Trophy", "year": 2024, "wines": [
        {"rank": 0, "name": "Alta Yari Gran Corte", "producer": "Bodegas Fabre", "country": "Argentina"},
        {"rank": 0, "name": "Balhannah Vineyard Shiraz", "producer": "Shaw + Smith", "country": "Australia"},
        {"rank": 0, "name": "Kopke Colheita Tawny", "producer": "Sogevinus", "country": "Portugal"},
        {"rank": 0, "name": "Grand Reserve Chardonnay", "producer": "Church Road", "country": "New Zealand"},
    ]},

    # =========================================================================
    # SOURCE 14: IWC 2025 Champions
    # =========================================================================
    {"list": "IWC Champion", "year": 2025, "wines": [
        {"rank": 0, "name": "Blanc de Blancs Magnum", "producer": "Nyetimber", "country": "United Kingdom"},
        {"rank": 0, "name": "Chardonnay", "producer": "Tolpuddle Vineyard", "country": "Australia"},
        {"rank": 0, "name": "Clos de la Roche Grand Cru", "producer": "Albert Bichot", "country": "France"},
        {"rank": 0, "name": "Vinsanto Capezzana Riserva", "producer": "Tenuta Di Capezzana", "country": "Italy"},
        {"rank": 0, "name": "Amontillado Botaina", "producer": "Emilio Lustau", "country": "Spain"},
    ]},
    {"list": "IWC Varietal Trophy", "year": 2025, "wines": [
        {"rank": 0, "name": "Phebus Gran Reserva Malbec", "producer": "Bodegas Fabre", "country": "Argentina"},
        {"rank": 0, "name": "Chardonnay", "producer": "Tolpuddle Vineyard", "country": "Australia"},
        {"rank": 0, "name": "Riesling Ried Heiligenstein", "producer": "Birgit Eichinger", "country": "Austria"},
        {"rank": 0, "name": "Clos de la Roche Grand Cru", "producer": "Albert Bichot", "country": "France"},
        {"rank": 0, "name": "Cuvee L Esprit Terroir", "producer": "Chateau Rouquette sur Mer", "country": "France"},
        {"rank": 0, "name": "Church Road 1 Merlot", "producer": "Church Road", "country": "New Zealand"},
        {"rank": 0, "name": "Glenora Estate Syrah", "producer": "Glenora Estate", "country": "New Zealand"},
        {"rank": 0, "name": "Reserve Sauvignon Blanc", "producer": "Villa Maria", "country": "New Zealand"},
        {"rank": 0, "name": "Grand Vin Cabernet Sauvignon", "producer": "Le Grand Domaine", "country": "South Africa"},
    ]},
    {"list": "IWC Great Value Champion", "year": 2025, "wines": [
        {"rank": 0, "name": "The Ned Pinot Grigio", "producer": "Marisco Vineyards", "country": "New Zealand"},
        {"rank": 0, "name": "Cotes de Provence Rose Sainte-Victoire", "producer": "Paul Sapin", "country": "France"},
    ]},

    # =========================================================================
    # SOURCE 15: Falstaff Austria Top Wines
    # =========================================================================
    {"list": "Falstaff Top Wine", "year": 2025, "wines": [
        {"rank": 0, "name": "Riesling Ried Kalkofen", "producer": "FJ Gritsch", "country": "Austria"},
        {"rank": 0, "name": "Riesling Durnsteiner Burg Reserve", "producer": "FJ Gritsch", "country": "Austria"},
        {"rank": 0, "name": "Riesling Ried 1000-Eimerberg", "producer": "FJ Gritsch", "country": "Austria"},
        {"rank": 0, "name": "Gruner Veltliner Klaus", "producer": "FJ Gritsch", "country": "Austria"},
        {"rank": 0, "name": "Gruner Veltliner Singerriedel", "producer": "FJ Gritsch", "country": "Austria"},
        {"rank": 0, "name": "Gruner Veltliner Ried Steinporz", "producer": "Weingut Hofstatter", "country": "Austria"},
        {"rank": 0, "name": "Gruner Veltliner Ried Axpoint", "producer": "FJ Gritsch", "country": "Austria"},
        {"rank": 0, "name": "Gruner Veltliner Ried Hohlgraben", "producer": "Weingut Malat", "country": "Austria"},
    ]},
    {"list": "Falstaff Top Wine", "year": 2024, "wines": [
        {"rank": 0, "name": "Gruner Veltliner", "producer": "Weingut Prager", "country": "Austria"},
        {"rank": 0, "name": "Riesling", "producer": "Ludwig Neumayer", "country": "Austria"},
    ]},
    {"list": "Falstaff Weisswein Gala", "year": 2025, "wines": [
        {"rank": 0, "name": "Ried Heiligenstein Riesling", "producer": "Jurtschitsch", "country": "Austria"},
        {"rank": 0, "name": "Ried Klaus Riesling", "producer": "Josef Jamek", "country": "Austria"},
        {"rank": 0, "name": "Ried Kellerberg Riesling Smaragd", "producer": "Weingut Knoll", "country": "Austria"},
        {"rank": 0, "name": "Loibner Gruner Veltliner Smaragd", "producer": "Weingut Knoll", "country": "Austria"},
        {"rank": 0, "name": "Ried Zieregg Sauvignon Blanc", "producer": "Tement", "country": "Austria"},
    ]},

    # =========================================================================
    # SOURCE 16: Concours Mondial de Bruxelles 2024 Grand Gold
    # =========================================================================
    {"list": "Concours Mondial Grand Gold", "year": 2024, "wines": [
        {"rank": 0, "name": "Dr White Port 50 Years Old", "producer": "Agri-Roncao", "country": "Portugal"},
        {"rank": 0, "name": "Champagne Millesime Les Hautes-Prieres", "producer": "Roger-Constant Lemaire", "country": "France"},
        {"rank": 0, "name": "Villa Cordevigo Gaudenzia", "producer": "Vigneti Villabella", "country": "Italy"},
        {"rank": 0, "name": "Balasto", "producer": "Bodega Garzon", "country": "Uruguay"},
        {"rank": 0, "name": "Issa Chardonnay Barrique", "producer": "Crama La Salina", "country": "Romania"},
        {"rank": 0, "name": "Sparklehorse", "producer": "Forrester Vineyards", "country": "South Africa"},
        {"rank": 0, "name": "Arinzano Merlot", "producer": "Arinzano", "country": "Spain"},
        {"rank": 0, "name": "Collina Serragrilli Starderi", "producer": "Collina Serragrilli", "country": "Italy"},
        {"rank": 0, "name": "Syrah", "producer": "Ktima Gerovassiliou", "country": "Greece"},
    ]},
    {"list": "Concours Mondial Grand Gold", "year": 2025, "wines": [
        {"rank": 0, "name": "Amarone della Valpolicella Classico Cima Caponiera Riserva", "producer": "Ca Rugate", "country": "Italy"},
        {"rank": 0, "name": "Amarone della Valpolicella Classico Corte Volponi", "producer": "Valerio Zenato", "country": "Italy"},
        {"rank": 0, "name": "Guelbenzu EVO", "producer": "Guelbenzu", "country": "Spain"},
        {"rank": 0, "name": "Seaward Chenin Blanc", "producer": "Spier", "country": "South Africa"},
    ]},

    # =========================================================================
    # SOURCE 17: Platter's South Africa 2026 Five-Star
    # =========================================================================
    {"list": "Platter's 5-Star", "year": 2026, "wines": [
        {"rank": 0, "name": "Mary Delany Chenin Blanc", "producer": "Botanica", "country": "South Africa"},
        {"rank": 0, "name": "Heritage Syrah", "producer": "Leeuwenkuil", "country": "South Africa"},
        {"rank": 0, "name": "Magnetic North", "producer": "Alheit Vineyards", "country": "South Africa"},
        {"rank": 0, "name": "Tesame", "producer": "Anysbos", "country": "South Africa"},
        {"rank": 0, "name": "Mabalel Pinot Noir", "producer": "Crystallum", "country": "South Africa"},
        {"rank": 0, "name": "Pepper Wind Syrah", "producer": "Old Road", "country": "South Africa"},
        {"rank": 0, "name": "Koffieklip OVC", "producer": "Ahrens Family", "country": "South Africa"},
        {"rank": 0, "name": "Epilogue Shiraz", "producer": "Boschkloof", "country": "South Africa"},
        {"rank": 0, "name": "Rooidraai Chenin Blanc", "producer": "Carinus", "country": "South Africa"},
        {"rank": 0, "name": "Clay Shales Chardonnay", "producer": "Crystallum", "country": "South Africa"},
        {"rank": 0, "name": "Vlag Cabernet Franc", "producer": "Raats", "country": "South Africa"},
        {"rank": 0, "name": "Mev Kirsten", "producer": "Sadie Family", "country": "South Africa"},
        {"rank": 0, "name": "Jewel Box", "producer": "Silverthorn", "country": "South Africa"},
        {"rank": 0, "name": "Wolf and Woman Chenin Blanc", "producer": "Wolf & Woman", "country": "South Africa"},
        {"rank": 0, "name": "The Agnes Chardonnay", "producer": "Crystallum", "country": "South Africa"},
        {"rank": 0, "name": "Laurence Graff Reserve", "producer": "Delaire Graff", "country": "South Africa"},
        {"rank": 0, "name": "Vin de Constance", "producer": "Klein Constantia", "country": "South Africa"},
        {"rank": 0, "name": "Staanspoor Syrah", "producer": "Staanspoor", "country": "South Africa"},
    ]},

    # =========================================================================
    # SOURCE 18: Descorchados 2025 - Argentina & Chile
    # =========================================================================
    {"list": "Descorchados Best Wine", "year": 2025, "wines": [
        {"rank": 1, "name": "Adrianna Vineyard Mundus Bacillus Terrae Malbec", "producer": "Catena Zapata", "country": "Argentina"},
        {"rank": 0, "name": "Filos Chardonnay", "producer": "Luigi Bosca", "country": "Argentina"},
        {"rank": 0, "name": "Fosil Chardonnay", "producer": "Zuccardi", "country": "Argentina"},
        {"rank": 0, "name": "Alma 4 Pinot Chardonnay", "producer": "Alma 4", "country": "Argentina"},
        {"rank": 0, "name": "Coleccion Brut Nature", "producer": "Rutini", "country": "Argentina"},
        {"rank": 0, "name": "Signature Rose Malbec", "producer": "Susana Balbo", "country": "Argentina"},
        {"rank": 0, "name": "VIK", "producer": "VIK", "country": "Chile"},
        {"rank": 0, "name": "STONEVIK", "producer": "VIK", "country": "Chile"},
        {"rank": 0, "name": "Don Melchor", "producer": "Don Melchor", "country": "Chile"},
        {"rank": 0, "name": "La Piu Belle", "producer": "VIK", "country": "Chile"},
    ]},

    # =========================================================================
    # SOURCE 19: WineAlign Canada 2024 - Top Wineries
    # =========================================================================
    {"list": "WineAlign Winery of Year", "year": 2024, "wines": [
        {"rank": 1, "name": "Pinot Noir", "producer": "SpearHead", "country": "Canada"},
        {"rank": 2, "name": "Pinot Noir", "producer": "Meyer Family Vineyards", "country": "Canada"},
        {"rank": 3, "name": "Baco Noir", "producer": "Henry of Pelham", "country": "Canada"},
        {"rank": 4, "name": "Nota Bene", "producer": "Black Hills", "country": "Canada"},
        {"rank": 5, "name": "Riesling", "producer": "Thirty Bench", "country": "Canada"},
        {"rank": 6, "name": "Chardonnay", "producer": "Quails Gate", "country": "Canada"},
        {"rank": 0, "name": "Pinot Noir", "producer": "Burrowing Owl", "country": "Canada"},
        {"rank": 0, "name": "Meritage", "producer": "Nk Mip Cellars", "country": "Canada"},
    ]},

    # =========================================================================
    # SOURCE 20: VinePair 50 Best Wines 2024 (complete list of 50)
    # =========================================================================
    {"list": "VinePair 50 Best", "year": 2024, "wines": [
        {"rank": 1, "name": "Sonoma Coast Syrah", "producer": "Arnot-Roberts", "country": "United States"},
        {"rank": 2, "name": "Alder Springs Chardonnay", "producer": "Las Jaras", "country": "United States"},
        {"rank": 3, "name": "Gamay Noir Willamette Valley", "producer": "Hundred Suns", "country": "United States"},
        {"rank": 4, "name": "Verdicchio di Matelica", "producer": "Stefano Zoli", "country": "Italy"},
        {"rank": 5, "name": "Syrah Santa Ynez Valley", "producer": "Outward Wines", "country": "United States"},
        {"rank": 6, "name": "Saumur Rouge", "producer": "Brendan Stater-West", "country": "France"},
        {"rank": 7, "name": "Pomerol", "producer": "Chateau Lafleur-Gazin", "country": "France"},
        {"rank": 8, "name": "Annia", "producer": "Massican", "country": "United States"},
        {"rank": 9, "name": "Sorenson's Reserve Cabernet Sauvignon", "producer": "Burgess", "country": "United States"},
        {"rank": 10, "name": "Vieilles Vignes Eparses", "producer": "Domaine de Belliviere", "country": "France"},
        {"rank": 11, "name": "HJW Vineyard Riesling", "producer": "Hermann J. Wiemer", "country": "United States"},
        {"rank": 12, "name": "Azaya Vineyard Pinot Noir", "producer": "Darling Wines", "country": "United States"},
        {"rank": 13, "name": "Sonoma Coast Chardonnay", "producer": "Failla", "country": "United States"},
        {"rank": 14, "name": "Couvent des Thorins", "producer": "Chateau du Moulin-a-Vent", "country": "France"},
        {"rank": 15, "name": "Napa Valley Merlot", "producer": "Long Meadow Ranch", "country": "United States"},
        {"rank": 16, "name": "Skin Contact Pinot Gris", "producer": "Pray Tell", "country": "United States"},
        {"rank": 17, "name": "Amarone della Valpolicella Carlo Santi", "producer": "Santi", "country": "Italy"},
        {"rank": 18, "name": "Mirama Pinot Noir Sonoma Coast", "producer": "Reeve", "country": "United States"},
        {"rank": 19, "name": "Orange Censurat", "producer": "Bodega Clandestina", "country": "Spain"},
        {"rank": 20, "name": "Vigneti delle Dolomiti", "producer": "Tenuta San Leonardo", "country": "Italy"},
        {"rank": 21, "name": "Lyra Pinot Noir", "producer": "Marine Layer", "country": "United States"},
        {"rank": 22, "name": "Sonoma Hillsides Syrah", "producer": "Pax", "country": "United States"},
        {"rank": 23, "name": "Brezé Saumur Blanc Clos David", "producer": "Arnaud Lambert", "country": "France"},
        {"rank": 24, "name": "Petit Manseng", "producer": "Early Mountain Vineyards", "country": "United States"},
        {"rank": 25, "name": "Rose Finger Lakes", "producer": "Trestle Thirty One", "country": "United States"},
        {"rank": 26, "name": "Langhe Nebbiolo", "producer": "Stefano Occhetti", "country": "Italy"},
        {"rank": 27, "name": "Dawn Orange Wine", "producer": "Neighborhood Winery", "country": "United States"},
        {"rank": 28, "name": "Ladies Who Shoot Their Lunch Shiraz", "producer": "Fowles", "country": "Australia"},
        {"rank": 29, "name": "Nightshade Nebbiolo", "producer": "Division Winemaking", "country": "United States"},
        {"rank": 30, "name": "Chinon Les Barnabes", "producer": "Olga Raffault", "country": "France"},
        {"rank": 31, "name": "ODE Syrah", "producer": "Dunites Wine Co", "country": "United States"},
        {"rank": 32, "name": "Schioppettino di Prepotto", "producer": "Vigna Lenuzza", "country": "Italy"},
        {"rank": 33, "name": "Block Party", "producer": "Catch & Release", "country": "United States"},
        {"rank": 34, "name": "Chianti Classico Riserva", "producer": "Carobbio", "country": "Italy"},
        {"rank": 35, "name": "Railroad Cabernet Franc", "producer": "Forge Cellars", "country": "United States"},
        {"rank": 36, "name": "Imaginador Cinsault", "producer": "Pedro Parra", "country": "Chile"},
        {"rank": 37, "name": "Pinot Noir West Sonoma Coast", "producer": "Red Car", "country": "United States"},
        {"rank": 38, "name": "Lahoma Gruner Veltliner", "producer": "Apollo's Praise", "country": "United States"},
        {"rank": 39, "name": "Monte Rosso Cabernet Sauvignon", "producer": "Louis M. Martini", "country": "United States"},
        {"rank": 40, "name": "Sankt Laurent", "producer": "Rosi Schuster", "country": "Austria"},
        {"rank": 41, "name": "Armand Riesling Kabinett", "producer": "Von Buhl", "country": "Germany"},
        {"rank": 42, "name": "Dry Rose Finger Lakes", "producer": "Lamoreaux Landing", "country": "United States"},
        {"rank": 43, "name": "Heringer Vineyard Chenin Blanc", "producer": "BloodRoot", "country": "United States"},
        {"rank": 44, "name": "Rancho Real Vineyard Syrah", "producer": "Language of Yes", "country": "United States"},
        {"rank": 45, "name": "Sparkling Dry Riesling Limestone Springs", "producer": "Ravines", "country": "United States"},
        {"rank": 46, "name": "Tre Leoni Red Blend", "producer": "Whitehall Lane", "country": "United States"},
        {"rank": 47, "name": "Grenache Rose", "producer": "Madrona", "country": "United States"},
        {"rank": 48, "name": "Blanc 1r", "producer": "Celler 9+", "country": "Spain"},
        {"rank": 49, "name": "Cremant d Alsace Brut Rose", "producer": "Pierre Sparr", "country": "France"},
        {"rank": 50, "name": "Cabernet Sauvignon Columbia Valley", "producer": "Januik", "country": "United States"},
    ]},

    # =========================================================================
    # SOURCE 21: Robert Parker 100-Point Wines
    # =========================================================================
    {"list": "Robert Parker 100 Points", "year": 2024, "wines": [
        {"rank": 0, "name": "Chateau Margaux", "producer": "Chateau Margaux", "country": "France"},
        {"rank": 0, "name": "Petrus", "producer": "Petrus", "country": "France"},
        {"rank": 0, "name": "Chateau Lafite-Rothschild", "producer": "Lafite-Rothschild", "country": "France"},
        {"rank": 0, "name": "Chateau Mouton Rothschild", "producer": "Mouton Rothschild", "country": "France"},
        {"rank": 0, "name": "Chateau Latour", "producer": "Chateau Latour", "country": "France"},
        {"rank": 0, "name": "Chateau Ausone", "producer": "Chateau Ausone", "country": "France"},
        {"rank": 0, "name": "Chateau Cheval Blanc", "producer": "Cheval Blanc", "country": "France"},
        {"rank": 0, "name": "Chateau La Conseillante", "producer": "La Conseillante", "country": "France"},
        {"rank": 0, "name": "Chateau La Mission Haut-Brion", "producer": "La Mission Haut-Brion", "country": "France"},
        {"rank": 0, "name": "Chateau Les Carmes Haut-Brion", "producer": "Les Carmes Haut-Brion", "country": "France"},
        {"rank": 0, "name": "Chateau Canon", "producer": "Canon", "country": "France"},
        {"rank": 0, "name": "Chateau Montrose", "producer": "Chateau Montrose", "country": "France"},
        {"rank": 0, "name": "Sassicaia", "producer": "Tenuta San Guido", "country": "Italy"},
        {"rank": 0, "name": "Flaccianello della Pieve", "producer": "Fontodi", "country": "Italy"},
        {"rank": 0, "name": "Penfolds Grange", "producer": "Penfolds", "country": "Australia"},
        {"rank": 0, "name": "Cristal Rose", "producer": "Louis Roederer", "country": "France"},
        {"rank": 0, "name": "Salon", "producer": "Salon", "country": "France"},
        {"rank": 0, "name": "Monfortino Riserva Barolo", "producer": "Giacomo Conterno", "country": "Italy"},
        {"rank": 0, "name": "BOND Vecina", "producer": "BOND", "country": "United States"},
        {"rank": 0, "name": "Harlan Estate", "producer": "Harlan", "country": "United States"},
        {"rank": 0, "name": "Le Desir", "producer": "Verite", "country": "United States"},
        {"rank": 0, "name": "Vina Tondonia Gran Reserva", "producer": "Lopez de Heredia", "country": "Spain"},
        {"rank": 0, "name": "Estate Vineyard Chardonnay", "producer": "Giaconda", "country": "Australia"},
        {"rank": 0, "name": "Riesling", "producer": "Joh. Jos. Prum", "country": "Germany"},
        {"rank": 0, "name": "Musigny Grand Cru", "producer": "Jacques Frederic Mugnier", "country": "France"},
        {"rank": 0, "name": "Unico", "producer": "Vega Sicilia", "country": "Spain"},
    ]},

    # =========================================================================
    # SOURCE 22: National Wine Show of Australia 2024
    # =========================================================================
    {"list": "National Wine Show AU Trophy", "year": 2024, "wines": [
        {"rank": 0, "name": "Rocket Chardonnay", "producer": "Murdoch Hill", "country": "Australia"},
        {"rank": 0, "name": "Cabernet Sauvignon Margaret River", "producer": "Devil's Lair", "country": "Australia"},
        {"rank": 0, "name": "Heathcote Handcrafted Shiraz", "producer": "De Bortoli", "country": "Australia"},
        {"rank": 0, "name": "Grand Vintage", "producer": "House of Arras", "country": "Australia"},
        {"rank": 0, "name": "Graduates Sauvignon Blanc", "producer": "Saint & Scholar", "country": "Australia"},
        {"rank": 0, "name": "Vat 1 Semillon", "producer": "Tyrrell's", "country": "Australia"},
        {"rank": 0, "name": "Clare Valley Riesling", "producer": "Kirrihill", "country": "Australia"},
    ]},

    # =========================================================================
    # SOURCE 23: Tyson Stelzer Top 250 Australia 2024
    # =========================================================================
    {"list": "Tyson Stelzer Top 250", "year": 2024, "wines": [
        # Sparkling
        {"rank": 0, "name": "Show Sparkling Shiraz", "producer": "Seppelt", "country": "Australia"},
        {"rank": 0, "name": "Blanc de Blancs", "producer": "Bellebonne", "country": "Australia"},
        {"rank": 0, "name": "Brut de Blancs", "producer": "Kreglinger", "country": "Australia"},
        {"rank": 0, "name": "Deluxe Vintage Rose", "producer": "Apogee", "country": "Australia"},
        {"rank": 0, "name": "Grand Vintage", "producer": "House of Arras", "country": "Australia"},
        # Riesling
        {"rank": 0, "name": "Polish Hill Riesling", "producer": "Grosset", "country": "Australia"},
        {"rank": 0, "name": "Steingarten Riesling", "producer": "Orlando", "country": "Australia"},
        {"rank": 0, "name": "Julius Eden Valley Riesling", "producer": "Henschke", "country": "Australia"},
        {"rank": 0, "name": "The Contours Eden Valley Riesling", "producer": "Pewsey Vale", "country": "Australia"},
        {"rank": 0, "name": "Cooinda Vale Vineyard Riesling", "producer": "Pooley", "country": "Australia"},
        {"rank": 0, "name": "G110 Clare Valley Riesling", "producer": "Grosset", "country": "Australia"},
        # Chardonnay
        {"rank": 0, "name": "The Paringa Chardonnay", "producer": "Paringa Estate", "country": "Australia"},
        {"rank": 0, "name": "Stevens Road Chardonnay", "producer": "Xanadu", "country": "Australia"},
        {"rank": 0, "name": "Elizabeth Anne Chardonnay", "producer": "Pooley", "country": "Australia"},
        {"rank": 0, "name": "Reserve Chardonnay", "producer": "Xanadu", "country": "Australia"},
        {"rank": 0, "name": "Chardonnay Eileen Hardy", "producer": "Hardys", "country": "Australia"},
        {"rank": 0, "name": "Yattarna Chardonnay", "producer": "Penfolds", "country": "Australia"},
        # Shiraz
        {"rank": 0, "name": "Bin 180 Cabernet Shiraz", "producer": "Penfolds", "country": "Australia"},
        {"rank": 0, "name": "The Vicar Shiraz", "producer": "Chapel Hill", "country": "Australia"},
        {"rank": 0, "name": "Shiraz Viognier", "producer": "Clonakilla", "country": "Australia"},
        {"rank": 0, "name": "Old Hill Vines Hunter Valley Shiraz", "producer": "Mount Pleasant", "country": "Australia"},
        {"rank": 0, "name": "Langi Shiraz", "producer": "Mount Langi Ghiran", "country": "Australia"},
        {"rank": 0, "name": "The Laird", "producer": "Torbreck", "country": "Australia"},
        {"rank": 0, "name": "Hill of Grace Shiraz", "producer": "Henschke", "country": "Australia"},
        # Cabernet
        {"rank": 0, "name": "John Riddoch Cabernet Sauvignon", "producer": "Wynns", "country": "Australia"},
        # Pinot Noir
        {"rank": 0, "name": "La Maison Pinot Noir", "producer": "Lowestoft", "country": "Australia"},
        {"rank": 0, "name": "Pinot Noir", "producer": "Tolpuddle Vineyard", "country": "Australia"},
        {"rank": 0, "name": "Oronsay Butchers Hill Pinot Noir", "producer": "Pooley", "country": "Australia"},
    ]},

    # =========================================================================
    # SOURCE 27: Australian & NZ Boutique Wine Awards 2025
    # =========================================================================
    {"list": "ANZBWA Trophy", "year": 2025, "wines": [
        {"rank": 0, "name": "Landslide Pinot Noir", "producer": "Home Hill", "country": "Australia"},
        {"rank": 0, "name": "Ceder Riesling", "producer": "Pike and Joyce", "country": "Australia"},
        {"rank": 0, "name": "Methode Eucalypt Cabernet Sauvignon", "producer": "Patrick of Coonawarra", "country": "Australia"},
        {"rank": 0, "name": "Crescent Moon Methode Traditionnelle Sparkling", "producer": "Soumah", "country": "Australia"},
        {"rank": 0, "name": "Old Vine Shiraz", "producer": "Mandoon Estate", "country": "Australia"},
        {"rank": 0, "name": "Single Vineyard BDX", "producer": "Woody Nook", "country": "Australia"},
        {"rank": 0, "name": "Planta Circa Ancestor Vine Grenache", "producer": "Purple Hands", "country": "Australia"},
        {"rank": 0, "name": "Nero d Avola", "producer": "Precious Little", "country": "Australia"},
        {"rank": 0, "name": "Gamay", "producer": "Precious Little", "country": "Australia"},
        {"rank": 0, "name": "Pinot Grigio", "producer": "Cloak & Dagger", "country": "Australia"},
        {"rank": 0, "name": "Firetail Sauvignon Blanc", "producer": "Roje Estates", "country": "Australia"},
        {"rank": 0, "name": "Rutherglen Muscat", "producer": "Jones Winery", "country": "Australia"},
        {"rank": 0, "name": "Semillon", "producer": "Krinklewood", "country": "Australia"},
        {"rank": 0, "name": "Chardonnay", "producer": "Hamelin Bay", "country": "Australia"},
        {"rank": 0, "name": "GSM", "producer": "Scarpantoni", "country": "Australia"},
    ]},

    # =========================================================================
    # SOURCE 28: The Real Review 2024
    # =========================================================================
    {"list": "Real Review Winery of Year", "year": 2024, "wines": [
        {"rank": 1, "name": "Carrodus Cabernet Sauvignon", "producer": "Yarra Yering", "country": "Australia"},
        {"rank": 0, "name": "Pinot Noir Block 5", "producer": "Felton Road", "country": "New Zealand"},
    ]},
]


def match_wine_in_db(cur, name, producer, country):
    """Try to find a wine in the database using multiple fuzzy matching strategies."""
    norm_name = normalize(name)
    norm_producer = normalize(producer)

    # Strategy 1: ILIKE match on name + producer
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

    # Strategy 2: Try individual key words from name + producer
    words = [w for w in norm_name.split() if len(w) > 3]
    for word in words:
        cur.execute("""
            SELECT id, slug, name, producer, aggregate_score, badges
            FROM wines
            WHERE unaccent(LOWER(producer)) ILIKE unaccent(%s)
              AND unaccent(LOWER(name)) ILIKE unaccent(%s)
            ORDER BY aggregate_score DESC
            LIMIT 1
        """, (f"%{norm_producer}%", f"%{word}%"))
        row = cur.fetchone()
        if row:
            return row

    # Strategy 3: Try name in both name and producer fields (chateau names)
    if norm_name and len(norm_name) > 5:
        cur.execute("""
            SELECT id, slug, name, producer, aggregate_score, badges
            FROM wines
            WHERE (unaccent(LOWER(name)) ILIKE unaccent(%s)
               OR unaccent(LOWER(producer)) ILIKE unaccent(%s))
              AND LOWER(country) = LOWER(%s)
            ORDER BY aggregate_score DESC
            LIMIT 1
        """, (f"%{norm_name}%", f"%{norm_name}%", country))
        row = cur.fetchone()
        if row:
            return row

    # Strategy 4: Try producer in both fields + country
    if norm_producer and len(norm_producer) > 4:
        cur.execute("""
            SELECT id, slug, name, producer, aggregate_score, badges
            FROM wines
            WHERE (unaccent(LOWER(producer)) ILIKE unaccent(%s)
               OR unaccent(LOWER(name)) ILIKE unaccent(%s))
              AND LOWER(country) = LOWER(%s)
            ORDER BY aggregate_score DESC
            LIMIT 1
        """, (f"%{norm_producer}%", f"%{norm_producer}%", country))
        row = cur.fetchone()
        if row:
            return row

    return None


def get_conn():
    """Get a fresh database connection with keepalive."""
    return psycopg2.connect(
        DB_URL,
        connect_timeout=30,
        keepalives=1,
        keepalives_idle=30,
        keepalives_interval=10,
        keepalives_count=5,
    )


def load_all_wines(conn):
    """Load all wines into memory for fast local matching (without badges to save bandwidth)."""
    cur = conn.cursor()
    cur.execute("SELECT id, name, producer, country, aggregate_score FROM wines")
    rows = cur.fetchall()
    wines = []
    for row in rows:
        wid, name, producer, country, score = row
        wines.append({
            "id": wid,
            "name": name or "",
            "producer": producer or "",
            "country": country or "",
            "score": float(score) if score else 0.0,
            "norm_name": normalize(name or ""),
            "norm_producer": normalize(producer or ""),
            "norm_country": (country or "").lower().strip(),
        })
    return wines


def match_wine_local(all_wines, name, producer, country):
    """Match a wine against pre-loaded data using fuzzy matching."""
    norm_name = normalize(name)
    norm_producer = normalize(producer)
    norm_country = country.lower().strip()

    # Strategy 1: name + producer substrings
    for w in all_wines:
        if norm_name in w["norm_name"] and norm_producer in w["norm_producer"]:
            return w

    # Strategy 2: key words from name + producer
    words = [word for word in norm_name.split() if len(word) > 3]
    for word in words:
        for w in all_wines:
            if norm_producer in w["norm_producer"] and word in w["norm_name"]:
                return w

    # Strategy 3: name in both name or producer fields + country
    if len(norm_name) > 5:
        for w in all_wines:
            if w["norm_country"] == norm_country:
                if norm_name in w["norm_name"] or norm_name in w["norm_producer"]:
                    return w

    # Strategy 4: producer in both fields + country
    if len(norm_producer) > 4:
        for w in all_wines:
            if w["norm_country"] == norm_country:
                if norm_producer in w["norm_producer"] or norm_producer in w["norm_name"]:
                    return w

    return None


def main():
    conn = get_conn()
    print("Loading all wines from database...")
    all_wines = load_all_wines(conn)
    # Sort by score descending so highest-scored wines match first
    all_wines.sort(key=lambda w: -w["score"])
    print(f"Loaded {len(all_wines)} wines into memory.")
    conn.close()

    # First pass: find all matches locally (fast)
    matched_ids = set()
    match_plan = []  # (wine_id, badge, boost, producer, name, rank)

    total_matched = 0
    total_not_found = 0
    list_stats = {}
    not_found_list = []

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

            match = match_wine_local(all_wines, name, producer, country)

            if match:
                if rank > 0:
                    badge = f"{list_name} #{rank} ({year})"
                else:
                    badge = f"{list_name} ({year})"
                boost = 1.0 if rank > 0 and rank <= 10 else 0.5

                match_plan.append((match["id"], badge, boost, match["producer"], match["name"]))
                matched_ids.add(match["id"])
                print(f"  + {match['producer']} - {match['name']} [{badge}]")
                total_matched += 1
                list_matched += 1
            else:
                print(f"  x Not found: {producer} - {name}")
                total_not_found += 1
                list_missed += 1
                not_found_list.append(f"{producer} - {name} ({country})")

        list_stats[list_key] = {"matched": list_matched, "missed": list_missed}

    # Second pass: fetch current badges for matched wines, then apply updates
    print(f"\nFetching current badges for {len(matched_ids)} matched wines...")
    conn = psycopg2.connect(DB_URL_UNPOOLED, connect_timeout=30)
    cur = conn.cursor()

    # Fetch badges for all matched IDs
    id_list = list(matched_ids)
    badges_map = {}
    scores_map = {}
    batch_size = 500
    for i in range(0, len(id_list), batch_size):
        batch_ids = id_list[i:i+batch_size]
        cur.execute(
            "SELECT id, badges, aggregate_score FROM wines WHERE id = ANY(%s)",
            (batch_ids,)
        )
        for row in cur.fetchall():
            badges_map[row[0]] = row[1] or []
            scores_map[row[0]] = float(row[2]) if row[2] else 0.0

    print(f"Fetched badges for {len(badges_map)} wines.")

    # Apply updates
    total_badges_added = 0
    total_already_has = 0
    total_score_boosts = 0
    updates = []

    for wine_id, badge, boost, db_producer, db_name in match_plan:
        current_badges = badges_map.get(wine_id, [])
        current_score = scores_map.get(wine_id, 0.0)

        if badge not in current_badges:
            new_badges = current_badges + [badge]
            new_score = min(99.0, current_score + boost)
            updates.append((new_badges, new_score, wine_id))
            # Update local maps so subsequent entries for same wine see new badges
            badges_map[wine_id] = new_badges
            scores_map[wine_id] = new_score
            total_badges_added += 1
            if new_score > current_score:
                total_score_boosts += 1
        else:
            total_already_has += 1

    print(f"Applying {len(updates)} updates via unpooled connection...")
    import time
    applied = 0
    conn = psycopg2.connect(DB_URL_UNPOOLED, connect_timeout=30)
    cur = conn.cursor()
    for i, (new_badges, new_score, wine_id) in enumerate(updates):
        for attempt in range(3):
            try:
                cur.execute(
                    "UPDATE wines SET badges = %s, aggregate_score = %s WHERE id = %s",
                    (new_badges, new_score, wine_id)
                )
                applied += 1
                break
            except Exception as e:
                try:
                    conn.close()
                except Exception:
                    pass
                time.sleep(1)
                conn = psycopg2.connect(DB_URL_UNPOOLED, connect_timeout=30)
                cur = conn.cursor()
                if attempt == 2:
                    print(f"  ! Failed after 3 attempts for wine id {wine_id}: {e}")
        # Commit every 10 updates
        if (i + 1) % 10 == 0:
            conn.commit()
        if (i + 1) % 50 == 0:
            print(f"  ... applied {applied}/{len(updates)}")
    conn.commit()
    conn.close()
    print(f"Applied {applied}/{len(updates)} updates.")

    # Per-list summary
    print(f"\n{'='*60}")
    print(f"  MATCH/MISS STATS PER LIST")
    print(f"{'='*60}")
    for list_key, stats in list_stats.items():
        total = stats["matched"] + stats["missed"]
        pct = (stats["matched"] / total * 100) if total > 0 else 0
        bar = "#" * int(pct / 5) + "." * (20 - int(pct / 5))
        print(f"  {list_key:45s} {stats['matched']:3d}/{total:3d} ({pct:5.1f}%) [{bar}]")

    # Final summary
    grand_total = total_matched + total_not_found
    print(f"\n{'='*60}")
    print(f"  FINAL SUMMARY")
    print(f"{'='*60}")
    print(f"  Total wines in rankings:  {grand_total}")
    print(f"  Matched in database:      {total_matched}")
    print(f"  Not found:                {total_not_found}")
    print(f"  Already had badge:        {total_already_has}")
    print(f"  New badges added:         {total_badges_added}")
    print(f"  Score boosts applied:     {total_score_boosts}")
    if grand_total > 0:
        print(f"  Overall match rate:       {total_matched/grand_total*100:.1f}%")

    # Show top wines with most badges
    conn2 = psycopg2.connect(DB_URL_UNPOOLED, connect_timeout=30)
    cur2 = conn2.cursor()
    cur2.execute("""
        SELECT name, producer, aggregate_score, badges, array_length(badges, 1) as badge_count
        FROM wines
        WHERE array_length(badges, 1) >= 2
        ORDER BY array_length(badges, 1) DESC, aggregate_score DESC
        LIMIT 25
    """)
    print(f"\n{'='*60}")
    print(f"  TOP WINES BY BADGE COUNT")
    print(f"{'='*60}")
    for row in cur2.fetchall():
        name, producer, score, badges, count = row
        print(f"  [{count} badges] {producer} - {name} (score: {score})")
        for b in badges:
            print(f"           - {b}")
    conn2.close()

    # Print not-found wines for reference
    if not_found_list:
        print(f"\n{'='*60}")
        print(f"  NOT FOUND IN DATABASE ({len(not_found_list)} wines)")
        print(f"{'='*60}")
        for w in not_found_list:
            print(f"  - {w}")

    print(f"\nDone.")


if __name__ == "__main__":
    main()
