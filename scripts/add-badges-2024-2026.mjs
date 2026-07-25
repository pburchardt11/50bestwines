#!/usr/bin/env node
// Add badges for wines from 2024-2026 ranking lists
// Sources: VinePair 50 Best 2024, Vinous Top 100 2024, James Suckling Italy 2025,
//          Gambero Rosso Tre Bicchieri 2026, IWC Trophy 2025, Platter's 5 Stars 2026,
//          Guia Penin 2026, Tim Atkin SA 2024, Concours Mondial 2025, DWWA 2025

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

function toSlug(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// ── WINE LISTS ──────────────────────────────────────────────────────────────

// VinePair 50 Best Wines 2024
const VINEPAIR_50_2024 = [
  { name: "Columbia Valley Cabernet Sauvignon 2021", producer: "Januik", country: "USA" },
  { name: "Crémant d'Alsace Brut Rosé NV", producer: "Pierre Sparr", country: "France" },
  { name: "Blanc 1r 2023", producer: "Celler 9+", country: "Spain" },
  { name: "Grenache Rosé 2023", producer: "Madrona", country: "USA" },
  { name: "Tre Leoni Red Blend 2023", producer: "Whitehall Lane", country: "USA" },
  { name: "Dry Riesling Limestone Springs 2019", producer: "Ravines Wine Cellars", country: "USA" },
  { name: "Rancho Réal Vineyard Syrah 2022", producer: "The Language of Yes", country: "USA" },
  { name: "Heringer Vineyard Chenin Blanc 2022", producer: "BloodRoot", country: "USA" },
  { name: "Dry Rosé 2023", producer: "Lamoreaux Landing", country: "USA" },
  { name: "Armand Riesling Kabinett 2022", producer: "Reichsrat von Buhl", country: "Germany" },
  { name: "Sankt Laurent 2022", producer: "Rosi Schuster", country: "Austria" },
  { name: "Monte Rosso Vineyard Cabernet Sauvignon 2020", producer: "Louis M. Martini", country: "USA" },
  { name: "Lahoma Vineyards Grüner Veltliner 2023", producer: "Apollo's Praise", country: "USA" },
  { name: "West Sonoma Coast Pinot Noir 2021", producer: "Red Car", country: "USA" },
  { name: "Imaginador Cinsault 2021", producer: "Pedro Parra", country: "Chile" },
  { name: "Railroad Cabernet Franc 2023", producer: "Forge Cellars", country: "USA" },
  { name: "Chianti Classico Riserva 2016", producer: "Carobbio", country: "Italy" },
  { name: "Schioppettino di Prepotto 2020", producer: "Vigna Lenuzza", country: "Italy" },
  { name: "ODE Syrah 2023", producer: "Dunites Wine Co.", country: "USA" },
  { name: "Chinon Les Barnabes 2021", producer: "Olga Raffault", country: "France" },
  { name: "Nightshade Nebbiolo 2022", producer: "Division Winemaking Company", country: "USA" },
  { name: "Ladies Who Shoot Their Lunch Shiraz 2020", producer: "Fowles", country: "Australia" },
  { name: "Langhe Nebbiolo 2022", producer: "Stefano Occhetti", country: "Italy" },
  { name: "Brézé Saumur Blanc Clos David 2021", producer: "Arnaud Lambert", country: "France" },
  { name: "Sonoma Hillsides Syrah 2022", producer: "Pax", country: "USA" },
  { name: "Lyra Pinot Noir 2021", producer: "Marine Layer", country: "USA" },
  { name: "Vigneti delle Dolomiti 2019", producer: "Tenuta San Leonardo", country: "Italy" },
  { name: "Mirama Sonoma Coast Pinot Noir 2022", producer: "Reeve", country: "USA" },
  { name: "Amarone della Valpolicella Carlo Santi 1843 2017", producer: "Santi", country: "Italy" },
  { name: "Couvent des Thorins 2021", producer: "Château du Moulin-à-Vent", country: "France" },
  { name: "Sonoma Coast Chardonnay 2022", producer: "Failla", country: "USA" },
  { name: "Azaya Vineyard Pinot Noir 2022", producer: "Darling Wines", country: "USA" },
  { name: "HJW Vineyard Riesling 2022", producer: "Hermann J. Wiemer", country: "USA" },
  { name: "Vieilles Vignes Eparses 2020", producer: "Domaine de Bellivière", country: "France" },
  { name: "Sorenson's Reserve Cabernet Sauvignon 2019", producer: "Burgess", country: "USA" },
  { name: "Annia 2023", producer: "Massican", country: "USA" },
  { name: "Pomerol 2020", producer: "Château Lafleur-Gazin", country: "France" },
  { name: "Saumur Rouge 2021", producer: "Brendan Stater-West", country: "France" },
  { name: "Santa Ynez Valley Syrah 2023", producer: "Outward Wines", country: "USA" },
  { name: "Verdicchio di Matelica 2023", producer: "Stefano Zoli", country: "Italy" },
  { name: "Willamette Valley Gamay Noir 2023", producer: "Hundred Suns", country: "USA" },
  { name: "Alder Springs Chardonnay 2021", producer: "Las Jaras Wines", country: "USA" },
  { name: "Sonoma Coast Syrah 2023", producer: "Arnot-Roberts", country: "USA" },
  { name: "Napa Valley Merlot 2019", producer: "Long Meadow Ranch", country: "USA" },
];

// Vinous Top 100 Wines 2024 (ranks 100-1)
const VINOUS_TOP100_2024 = [
  { rank: 100, name: "Ribera del Duero 2020", producer: "Pago de Carraovejas", country: "Spain" },
  { rank: 99, name: "Verdicchio dei Castelli di Jesi Classico Superiore Balciana 2020", producer: "Sartarelli", country: "Italy" },
  { rank: 98, name: "Riesling Great Western 2023", producer: "Best's Wines", country: "Australia" },
  { rank: 97, name: "Morgon Côte du Py 2022", producer: "Jean-Marc Burgaud", country: "France" },
  { rank: 96, name: "Sorella 2019", producer: "Andrew Will Winery", country: "USA" },
  { rank: 95, name: "Pinot Bianco Riserva Vorberg 2021", producer: "Cantina Terlano", country: "Italy" },
  { rank: 94, name: "Saint-Joseph 2019", producer: "Domaine Pierre Gonon", country: "France" },
  { rank: 93, name: "Chardonnay Tiratore La Collina Vineyard 2021", producer: "Bilancia", country: "New Zealand" },
  { rank: 92, name: "Terra di Lavoro 2021", producer: "Galardi", country: "Italy" },
  { rank: 91, name: "Chardonnay 2023", producer: "Diatom", country: "USA" },
  { rank: 90, name: "Señorío de San Vicente 2020", producer: "Señorío de San Vicente", country: "Spain" },
  { rank: 89, name: "Uno 2021", producer: "Tenuta di Carleone", country: "Italy" },
  { rank: 88, name: "Pinot Noir Maresh Vineyard 2022", producer: "Arterberry Maresh", country: "USA" },
  { rank: 87, name: "Etna Rosso Prephylloxera La Vigna di Don Peppino Calderara Sottana 2022", producer: "Tenuta delle Terre Nere", country: "Italy" },
  { rank: 86, name: "Gran Reserva Prado Enea 2016", producer: "Muga", country: "Spain" },
  { rank: 85, name: "Barbaresco Currà 2021", producer: "Sottimano", country: "Italy" },
  { rank: 84, name: "Riesling Eckberg Sommerberg Grand Cru 2022", producer: "Albert Boxler", country: "France" },
  { rank: 83, name: "Estate Cuvée 2021", producer: "L'Aventure Winery", country: "USA" },
  { rank: 82, name: "L'Esprit de 2019", producer: "Pierre Peters", country: "France" },
  { rank: 81, name: "Tokaji Mézes Mály 6-Puttonyos 2018", producer: "Royal Tokaji Company", country: "Hungary" },
  { rank: 80, name: "Brunello di Montalcino 2019", producer: "Il Poggione", country: "Italy" },
  { rank: 79, name: "Amarone della Valpolicella Classico Sant'Urbano 2019", producer: "Speri", country: "Italy" },
  { rank: 78, name: "Bramaterra 2019", producer: "Le Pianelle", country: "Italy" },
  { rank: 77, name: "Riesling Nackenheimer Rothenberg Grosses Gewächs 2023", producer: "Gunderloch", country: "Germany" },
  { rank: 76, name: "Riesling Achleiten Smaragd 2023", producer: "Rudi Pichler", country: "Austria" },
  { rank: 75, name: "Carmignano Riserva 2020", producer: "Piaggia", country: "Italy" },
  { rank: 74, name: "Château Belgrave 2021", producer: "Château Belgrave", country: "France" },
  { rank: 73, name: "Savennières Clos de la Hutte 2022", producer: "Thibaud Boudignon", country: "France" },
  { rank: 72, name: "DOM 2019", producer: "Viña Tabalí", country: "Chile" },
  { rank: 71, name: "The Octavius 2019", producer: "Yalumba", country: "Australia" },
  { rank: 70, name: "Pinot Noir Assmannshausen Höllenberg Grosses Gewächs 2022", producer: "August Kesseler", country: "Germany" },
  { rank: 69, name: "Meursault Perrières 1er Cru 2020", producer: "Domaine Michel Bouzereau", country: "France" },
  { rank: 68, name: "Coyam 2021", producer: "Emiliana", country: "Chile" },
  { rank: 67, name: "San Leonardo 2019", producer: "Tenuta San Leonardo", country: "Italy" },
  { rank: 66, name: "Grenache Annexus 2022", producer: "John Duval", country: "Australia" },
  { rank: 65, name: "Syrah The Hidden 2019", producer: "K Vintners", country: "USA" },
  { rank: 64, name: "Brut Blanc de Blancs Vintage 2016", producer: "Roederer", country: "France" },
  { rank: 63, name: "Blaufränkisch Lutzmannsburg Alte Reben 2021", producer: "Moric", country: "Austria" },
  { rank: 62, name: "Chardonnay Viñedos de Montaña 2019", producer: "Riccitelli", country: "Argentina" },
  { rank: 61, name: "Blanco Reserva Viña Tondonia 2013", producer: "López de Heredia", country: "Spain" },
  { rank: 40, name: "Carignan VIGNO 2021", producer: "Garage Wine Co.", country: "Chile" },
  { rank: 39, name: "Château Calon Ségur 2021", producer: "Calon Ségur", country: "France" },
  { rank: 38, name: "Cornas 2020", producer: "Domaine A. Clape", country: "France" },
  { rank: 37, name: "Cabernet Franc Gran Enemigo Gualtallary 2021", producer: "El Enemigo", country: "Argentina" },
  { rank: 36, name: "Grüner Veltliner Loibenberg Smaragd 2023", producer: "Alzinger", country: "Austria" },
  { rank: 35, name: "The Bard 2021", producer: "Realm Cellars", country: "USA" },
  { rank: 34, name: "Pinot Noir Estate Bottled 2021", producer: "Mount Eden Vineyards", country: "USA" },
  { rank: 33, name: "Cabernet Sauvignon 2021", producer: "Cornell Vineyards", country: "USA" },
  { rank: 32, name: "Trebbiano d'Abruzzo Fonte Canale 2021", producer: "Tiberio", country: "Italy" },
  { rank: 31, name: "Brunello di Montalcino 2019", producer: "Le Potazzine", country: "Italy" },
  { rank: 30, name: "Unico 2014", producer: "Bodegas Vega Sicilia", country: "Spain" },
  { rank: 29, name: "Barolo Berri 2020", producer: "Trediberri", country: "Italy" },
  { rank: 28, name: "Château L'Eglise-Clinet 2020", producer: "L'Eglise-Clinet", country: "France" },
  { rank: 27, name: "Gigondas Le Poste 2021", producer: "Château de Saint Cosme", country: "France" },
  { rank: 26, name: "Wild Sauvignon 2021", producer: "Greywacke", country: "New Zealand" },
  { rank: 25, name: "Viñedo Chadwick 2021", producer: "Viñedo Chadwick", country: "Chile" },
  { rank: 24, name: "Chardonnay CIX Estate 2022", producer: "Aubert", country: "USA" },
  { rank: 23, name: "Château Canon 2021", producer: "Canon", country: "France" },
  { rank: 22, name: "Palladius 2022", producer: "The Sadie Family Wines", country: "South Africa" },
  { rank: 21, name: "Cabernet Sauvignon John Riddoch 2021", producer: "Wynns", country: "Australia" },
  { rank: 20, name: "Lytton Springs 2021", producer: "Ridge Vineyards", country: "USA" },
  { rank: 19, name: "Chianti Classico Gran Selezione Vigna del Sorbo 2021", producer: "Fontodi", country: "Italy" },
  { rank: 18, name: "Esprit de Tablas 2021", producer: "Tablas Creek Vineyard", country: "USA" },
  { rank: 17, name: "Château Les Carmes Haut-Brion 2021", producer: "Les Carmes Haut-Brion", country: "France" },
  { rank: 16, name: "Vine Hill Ranch Cabernet Sauvignon 2021", producer: "Vine Hill Ranch", country: "USA" },
  { rank: 15, name: "Chablis Vaudésir Grand Cru 2022", producer: "Domaine Samuel Billaud", country: "France" },
  { rank: 14, name: "Cabernet Sauvignon Gala Vineyard 2021", producer: "Maître de Chai", country: "USA" },
  { rank: 13, name: "Pinot Noir MacIntyre 2021", producer: "DuMOL", country: "USA" },
  { rank: 12, name: "Noemia 2021", producer: "Bodega Noemia", country: "Argentina" },
  { rank: 11, name: "Le Trame 2021", producer: "Le Boncie", country: "Italy" },
  { rank: 10, name: "Lismore Estate Vineyards Chardonnay Reserve", producer: "Lismore Estate Vineyards", country: "Australia" },
  { rank: 9, name: "Château Smith Haut Lafitte Blanc 2021", producer: "Château Smith Haut Lafitte", country: "France" },
  { rank: 8, name: "Tignanello 2021", producer: "Antinori - Tenuta Tignanello", country: "Italy" },
  { rank: 7, name: "PSI 2021", producer: "Dominio de Pingus", country: "Spain" },
  { rank: 6, name: "Cheval des Andes 2021", producer: "Cheval des Andes", country: "Argentina" },
  { rank: 5, name: "Pinot Noir Raschen Ridge 2021", producer: "Hirsch", country: "USA" },
  { rank: 4, name: "La Ca' Nova Barbaresco Montefico Vigna Bric Mentina 2021", producer: "La Ca' Nova", country: "Italy" },
  { rank: 3, name: "Château Pichon-Longueville Comtesse de Lalande 2020", producer: "Château Pichon Longueville Comtesse de Lalande", country: "France" },
  { rank: 2, name: "Chardonnay Estate Vineyard 2022", producer: "Giaconda", country: "Australia" },
  { rank: 1, name: "Cabernet Sauvignon Estate 2021", producer: "Philip Togni Vineyards", country: "USA" },
];

// James Suckling Top 100 Italy 2025
const JS_ITALY_TOP100_2025 = [
  { rank: 1, name: "Etna Rosso San Lorenzo 2023", producer: "Tenuta delle Terre Nere", country: "Italy" },
  { rank: 2, name: "Soave Classico La Rocca 2023", producer: "Pieropan", country: "Italy" },
  { rank: 3, name: "Brunello di Montalcino Pianrosso 2020", producer: "Ciacci Piccolomini d'Aragona", country: "Italy" },
  { rank: 4, name: "Barolo Brunate 2021", producer: "Marcarini", country: "Italy" },
  { rank: 5, name: "Trebbiano Toscana Bòggina B 2023", producer: "Petrolo", country: "Italy" },
  { rank: 6, name: "Chianti Classico Gran Selezione San Lorenzo 2022", producer: "Castello di Ama", country: "Italy" },
  { rank: 7, name: "Pinot Grigio Fuoripista 2023", producer: "Foradori", country: "Italy" },
  { rank: 8, name: "Etna Bianco Superiore Contrada Praino Frontemare 2023", producer: "Maugeri", country: "Italy" },
  { rank: 9, name: "Vino Nobile di Montepulciano Costa Grande 2021", producer: "Boscarelli", country: "Italy" },
  { rank: 10, name: "Pinot Nero Revei 2022", producer: "Les Crêtes", country: "Italy" },
  { rank: 11, name: "Toscana Testamatta 2023", producer: "Bibi Graetz", country: "Italy" },
  { rank: 12, name: "Barolo Bussia Vigna Fantini 2021", producer: "Paolo Scavino", country: "Italy" },
  { rank: 13, name: "Vin Santo di Carmignano Riserva 2017", producer: "Capezzana", country: "Italy" },
  { rank: 14, name: "Sauvignon Alto Adige Oberkerschbaum Riserva 2022", producer: "J. Hofstätter", country: "Italy" },
  { rank: 15, name: "Brunello di Montalcino Riserva 2019", producer: "Livio Sassetti", country: "Italy" },
  { rank: 16, name: "Toscana Oreno 2023", producer: "Tenuta Sette Ponti", country: "Italy" },
  { rank: 17, name: "Barolo Mosconi 2021", producer: "Pira (Chiara Boschis)", country: "Italy" },
  { rank: 18, name: "Barolo Bricco delle Viole 2021", producer: "M. Marengo", country: "Italy" },
  { rank: 19, name: "Sopraquota 900 2023", producer: "Rosset", country: "Italy" },
  { rank: 20, name: "Vermentino di Gallura Superiore Vign'Angena 2024", producer: "Capichera", country: "Italy" },
  { rank: 21, name: "Nerello Mascalese Alberelli 2022", producer: "Giodo", country: "Italy" },
  { rank: 22, name: "Gattinara 2021", producer: "Travaglini", country: "Italy" },
  { rank: 23, name: "Chianti Classico Gran Selezione Colledilà 2022", producer: "Barone Ricasoli", country: "Italy" },
  { rank: 24, name: "Sauvignon Blanc Collio Cicinis 2024", producer: "Attems", country: "Italy" },
  { rank: 25, name: "Taurasi Radici 2020", producer: "Mastroberardino", country: "Italy" },
  { rank: 26, name: "Pinot Grigio Collio 2024", producer: "Schiopetto", country: "Italy" },
  { rank: 27, name: "Isola dei Nuraghi Vigneti Centenari 2022", producer: "Blue Zone", country: "Italy" },
  { rank: 28, name: "Verdicchio dei Castelli di Jesi Classico San Paolo Riserva 2021", producer: "Pievalta", country: "Italy" },
  { rank: 29, name: "Toscana DiMarco 2022", producer: "Castello di Bossi", country: "Italy" },
  { rank: 30, name: "Barbaresco Asili Riserva 2021", producer: "Bruno Giacosa", country: "Italy" },
  { rank: 31, name: "Barbaresco Montefico 2022", producer: "Carlo Giacosa", country: "Italy" },
  { rank: 32, name: "Brunello di Montalcino Madonna del Piano Riserva 2019", producer: "Valdicava", country: "Italy" },
  { rank: 33, name: "Barolo Parafada 2021", producer: "Palladino", country: "Italy" },
  { rank: 34, name: "Pinot Nero Les Frères 2022", producer: "Grosjean", country: "Italy" },
  { rank: 35, name: "Brunello di Montalcino Millecento Riserva 2019", producer: "Castiglion del Bosco", country: "Italy" },
  { rank: 36, name: "Etna Rosso Contrada Rampante 2022", producer: "Pietradolce", country: "Italy" },
  { rank: 37, name: "Brunello di Montalcino Riserva 2019", producer: "San Polino", country: "Italy" },
  { rank: 38, name: "Venezia Giulia dove i sogni non hanno fine 2023", producer: "Jermann", country: "Italy" },
  { rank: 39, name: "Brunello di Montalcino Madonna delle Grazie 2020", producer: "Il Marroneto", country: "Italy" },
  { rank: 40, name: "Chardonnay Mains et Coeur 2023", producer: "Anselmet", country: "Italy" },
  { rank: 41, name: "Chardonnay Vigna Castel Ringberg Riserva 2022", producer: "Elena Walch", country: "Italy" },
  { rank: 42, name: "Toscana Saffredi 2023", producer: "Fattoria Le Pupille", country: "Italy" },
  { rank: 43, name: "Toscana Caiarossa 2022", producer: "Caiarossa", country: "Italy" },
  { rank: 44, name: "Barolo Ginestra Vigna del Gris 2021", producer: "Conterno - Fantino", country: "Italy" },
  { rank: 45, name: "Chianti Classico Gran Selezione Vigneto Il Poggio 2020", producer: "Castello di Monsanto", country: "Italy" },
  { rank: 46, name: "Barolo Tortoniano Riserva 2019", producer: "Michele Chiarlo", country: "Italy" },
  { rank: 47, name: "Barolo Brunate 2021", producer: "Francesco Rinaldi & Figli", country: "Italy" },
  { rank: 48, name: "Barolo Parafada 2021", producer: "Massolino", country: "Italy" },
  { rank: 49, name: "Brunello di Montalcino Riserva 2019", producer: "Renieri", country: "Italy" },
  { rank: 50, name: "Barolo Baudana 2021", producer: "G.D. Vajra", country: "Italy" },
  { rank: 51, name: "Toscana Il Borro 2021", producer: "Il Borro", country: "Italy" },
  { rank: 52, name: "Barolo Vignarionda 2020", producer: "Ettore Germano", country: "Italy" },
  { rank: 53, name: "Brunello di Montalcino Riserva 2019", producer: "Gianni Brunelli", country: "Italy" },
  { rank: 54, name: "Barolo Riserva 2016", producer: "Marchesi di Barolo", country: "Italy" },
  { rank: 55, name: "Valpolicella Superiore Monte Lodoletta 2019", producer: "Romano Dal Forno", country: "Italy" },
  { rank: 56, name: "Soave Classico Foscarino I Palchi Grande Cuvée 2022", producer: "Inama", country: "Italy" },
  { rank: 57, name: "Brunello di Montalcino Vecchie Vigne 2020", producer: "Siro Pacenti", country: "Italy" },
  { rank: 58, name: "Chianti Classico Gran Selezione Ipsus 2021", producer: "Ipsus", country: "Italy" },
  { rank: 59, name: "Trebbiano d'Abruzzo 2021", producer: "Valentini", country: "Italy" },
  { rank: 60, name: "Sauvignon Alto Adige Gran Lafóa Riserva 2022", producer: "Colterenzio", country: "Italy" },
  { rank: 61, name: "Barolo Colonnello 2021", producer: "Poderi Aldo Conterno", country: "Italy" },
  { rank: 62, name: "Etna Rosso San Lorenzo Piano delle Colombe 2022", producer: "Girolamo Russo", country: "Italy" },
  { rank: 63, name: "Barolo Monvigliero 2021", producer: "G.B. Burlotto", country: "Italy" },
  { rank: 64, name: "Brunello di Montalcino Giovanni Neri 2020", producer: "Casanova di Neri", country: "Italy" },
  { rank: 65, name: "Barolo Marcenasco 2021", producer: "Renato Ratti", country: "Italy" },
  { rank: 66, name: "Barolo Gattera Riserva 2019", producer: "Bovio", country: "Italy" },
  { rank: 67, name: "Toscana Redigaffi 2023", producer: "Tua Rita", country: "Italy" },
  { rank: 68, name: "Vigneti delle Dolomiti San Leonardo 2020", producer: "San Leonardo", country: "Italy" },
  { rank: 69, name: "Barolo Monvigliero 2021", producer: "Vietti", country: "Italy" },
  { rank: 70, name: "Barolo Villero 2021", producer: "Giacomo Fenocchio", country: "Italy" },
  { rank: 71, name: "Brunello di Montalcino Vigna La Casa 2020", producer: "Caparzo", country: "Italy" },
  { rank: 72, name: "Brunello di Montalcino Franci Riserva 2019", producer: "Tassi", country: "Italy" },
  { rank: 73, name: "Toscana Cepparello 2022", producer: "Isole e Olena", country: "Italy" },
  { rank: 74, name: "Barolo Rocche dell'Annunziata Riserva 2019", producer: "Mauro Veglio", country: "Italy" },
  { rank: 75, name: "Barolo Le Vigne 2021", producer: "Sandrone", country: "Italy" },
  { rank: 76, name: "Nero d'Avola Terre Siciliane Vigna Guarnaschelli 2023", producer: "Feudo Maccari", country: "Italy" },
  { rank: 77, name: "Barolo Brunate 2021", producer: "Ceretto", country: "Italy" },
  { rank: 78, name: "Barolo Cerequio 2021", producer: "Roberto Voerzio", country: "Italy" },
  { rank: 79, name: "Amarone della Valpolicella Classico 2016", producer: "Bertani", country: "Italy" },
  { rank: 80, name: "Brunello di Montalcino Montosoli 2020", producer: "Altesino", country: "Italy" },
  { rank: 81, name: "Bolgheri Superiore Ornellaia 2022", producer: "Ornellaia", country: "Italy" },
  { rank: 82, name: "Alto Adige Terlaner I Grande Cuvée 2022", producer: "Cantina Terlan", country: "Italy" },
  { rank: 83, name: "Bolgheri Superiore Piastraia 2022", producer: "Michele Satta", country: "Italy" },
  { rank: 84, name: "Toscana Rosso Trinoro 2022", producer: "Tenuta di Trinoro", country: "Italy" },
  { rank: 85, name: "Bolgheri Sassicaia 2022", producer: "Tenuta San Guido", country: "Italy" },
  { rank: 86, name: "Toscana Giramonte 2023", producer: "Frescobaldi", country: "Italy" },
  { rank: 87, name: "Toscana Le Pergole Torte 2022", producer: "Montevertine", country: "Italy" },
  { rank: 88, name: "Brunello di Montalcino Riserva 2019", producer: "Poggio di Sotto", country: "Italy" },
  { rank: 89, name: "Toscana Solaia 2022", producer: "Marchesi Antinori", country: "Italy" },
  { rank: 90, name: "Terre Siciliane Contrada R 2023", producer: "Passopisciaro", country: "Italy" },
  { rank: 91, name: "Brunello di Montalcino Riserva 2019", producer: "Eredi Fuligni", country: "Italy" },
  { rank: 92, name: "Bolgheri Superiore Grattamacco 2022", producer: "Grattamacco", country: "Italy" },
  { rank: 93, name: "Brunello di Montalcino 2020", producer: "Giodo", country: "Italy" },
  { rank: 94, name: "Merlot Toscana La Ricolma 2022", producer: "San Giusto a Rentennano", country: "Italy" },
  { rank: 95, name: "Brunello di Montalcino Poggio All'Oro Riserva 2019", producer: "Castello Banfi", country: "Italy" },
  { rank: 96, name: "Franciacorta Cuvée Annamaria Clementi Riserva 2016", producer: "Ca' del Bosco", country: "Italy" },
  { rank: 97, name: "Chianti Classico Riserva 2016", producer: "Castell'in Villa", country: "Italy" },
  { rank: 98, name: "Brunello di Montalcino Vigna Schiena d'Asino 2019", producer: "Mastrojanni", country: "Italy" },
  { rank: 99, name: "Toscana Biserno 2022", producer: "Tenuta di Biserno", country: "Italy" },
  { rank: 100, name: "Barbaresco Rabajà Riserva 2019", producer: "Bruno Rocca", country: "Italy" },
];

// IWC 2025 Trophy Winners
const IWC_TROPHY_2025 = [
  { name: "Le Clos Lanson Blanc de Blanc 2010", producer: "Champagne Lanson", country: "France" },
  { name: "Cuvée 38 La Réserve Perpétuelle Blanc de Blancs Edition 6 NV", producer: "Champagne Henriot", country: "France" },
  { name: "Essentiel Blanc de Noirs NV", producer: "Champagne Piper-Heidsieck", country: "France" },
  { name: "Rare Millésime 2013", producer: "Rare Champagne", country: "France" },
  { name: "Blanc de Blancs 2016", producer: "Nyetimber", country: "England" },
  { name: "1086 By Nyetimber 2013", producer: "Nyetimber", country: "England" },
  { name: "Rosé Reserve 2019", producer: "Roebuck Estates", country: "England" },
  { name: "Museum Release Blanc de Blancs 2006", producer: "House of Arras", country: "Australia" },
  { name: "Crede Brut Valdobbiadene Prosecco Superiore 2024", producer: "Bisol1542", country: "Italy" },
  { name: "Jean Le Long Prestige Cuvee 2012", producer: "Boschendal", country: "South Africa" },
  { name: "Phebus Gran Reserva Malbec 2023", producer: "Bodegas Fabre", country: "Argentina" },
  { name: "La Isabel Estate Co-fermented Blend 2023", producer: "Huentala", country: "Argentina" },
  { name: "Gran Corte 2023", producer: "Bodega Alta Yarí", country: "Argentina" },
  { name: "Pinot Noir 2023", producer: "Tolpuddle Vineyard", country: "Australia" },
  { name: "Bethlehem Block Barossa Cabernet Sauvignon 2022", producer: "Sister's Run", country: "Australia" },
  { name: "The Kirche 2021", producer: "Charles Melton Wines", country: "Australia" },
  { name: "127 Milestone 2022", producer: "Ponting Wines", country: "Australia" },
  { name: "Baudinet Grenache Shiraz Mataro 2021", producer: "Kilikanoon Wines", country: "Australia" },
  { name: "Bin 169 Cabernet Sauvignon 2022", producer: "Penfolds", country: "Australia" },
  { name: "D Block Shingleback Reserve McLaren Vale Shiraz 2022", producer: "Paragon Wine Estates", country: "Australia" },
  { name: "Altazor 2022", producer: "Viña Undurraga", country: "Chile" },
  { name: "Clos de la Roche Grand Cru Hospices de Beaune Cuvée Cyrot Chaudron 2023", producer: "Maison Albert Bichot", country: "France" },
  { name: "Savigny les Beaune 1er Cru Aux Guettes 2023", producer: "Jean-Claude Boisset", country: "France" },
  { name: "Beaune 1er Cru Epenotes 2022", producer: "Edouard Delaunay", country: "France" },
  { name: "Echezeaux Grand Cru Domaine du Clos Frantin 2023", producer: "Maison Albert Bichot", country: "France" },
  { name: "Gevrey Chambertin 2022", producer: "Morin Père & Fils", country: "France" },
  { name: "Prieuré de Cénac 2023", producer: "Les Vignobles Saint Didier Parnac", country: "France" },
  { name: "Crozes-Hermitage Les Moniers Rouge 2022", producer: "M Chapoutier", country: "France" },
  { name: "Château Arnauld 2022", producer: "Vignobles de Larose", country: "France" },
  { name: "Château Fonplegade Fleur de Fonplégade 2022", producer: "Château Fonplegade", country: "France" },
  { name: "Marani Kondoli Vineyards Saperavi 2020", producer: "JSC Telavi Wine Cellar", country: "Georgia" },
  { name: "Barolo Ravera 2021", producer: "GD Vajra", country: "Italy" },
  { name: "Schioppettino di Prepotto 2019", producer: "Vigna Traverso", country: "Italy" },
  { name: "1 Merlot 2021", producer: "Church Road", country: "New Zealand" },
  { name: "Emma Marris Pinot Noir 2023", producer: "Marisco Vineyards", country: "New Zealand" },
  { name: "Mora Wines Pinot Noir 2023", producer: "Mora Wines", country: "New Zealand" },
  { name: "Caroline's Pinot Noir 2021", producer: "Clos Ostler", country: "New Zealand" },
  { name: "Glenora Estate Syrah 2024", producer: "Glenora Estate", country: "New Zealand" },
  { name: "Fuga Doc Dão Vinho Tinto 2023", producer: "Passarela Sociedade De Vinhos", country: "Portugal" },
  { name: "Grande Reserva Red 2020", producer: "Quinta Vale d'Aldeia", country: "Portugal" },
  { name: "Batrachella Pinotage 2022", producer: "Hasher Family Wines", country: "South Africa" },
  { name: "Stella 2022", producer: "Beau Constantia", country: "South Africa" },
  { name: "Grand Vin Selection Cabernet Sauvignon 2022", producer: "Le Grand Domaine", country: "South Africa" },
  { name: "Mencía 2022", producer: "Pazo de La Cuesta", country: "Spain" },
  { name: "Cepas Centenarias 2021", producer: "Bodegas Tarón", country: "Spain" },
  { name: "Con Gracia de Rioja Vega 2020", producer: "Rioja Vega", country: "Spain" },
  { name: "I Gran Reserva 2016", producer: "Bodegas Faustino", country: "Spain" },
  { name: "Balcón de Pilatos Maturana 2022", producer: "Bodegas Valdemar", country: "Spain" },
  { name: "Georges de Latour Private Reserve Cabernet Sauvignon 2021", producer: "Beaulieu Vineyard", country: "USA" },
  // White trophies
  { name: "Chardonnay 2023", producer: "Tolpuddle Vineyard", country: "Australia" },
  { name: "M3 Chardonnay 2023", producer: "Shaw + Smith", country: "Australia" },
  { name: "Finisterre Margaret River Chardonnay 2022", producer: "Robert Oatley", country: "Australia" },
  { name: "McGuigan Bin 9000 Semillon 2017", producer: "Australian Vintage", country: "Australia" },
  { name: "Riesling Ried Heiligenstein 1öTw Kamptal DAC 2023", producer: "Weingut Birgit Eichinger", country: "Austria" },
  { name: "Le Clos Jordanne Le Grand Clos Chardonnay 2022", producer: "Arterra Wines Canada", country: "Canada" },
  { name: "Criots-Bâtard-Montrachet Grand Cru Les Criots 2022", producer: "Prosper Maufoux", country: "France" },
  { name: "Arbois Vin Jaune 2018", producer: "Domaine Maire & Fils", country: "France" },
  { name: "Meursault 1er Cru Les Charmes 2023", producer: "Maison Albert Bichot", country: "France" },
  { name: "Chablis 1er Cru Les Lys 2022", producer: "La Chablisienne", country: "France" },
  { name: "Chablis Grand Cru Les Vaudésirs 2023", producer: "Maison Albert Bichot", country: "France" },
  { name: "Meursault 1er Cru Perrières 2023", producer: "Domaine du Château de Meursault", country: "France" },
  { name: "Puligny Montrachet 2023", producer: "Morin Père & Fils", country: "France" },
  { name: "Chablis 1er Cru Vaillons 2023", producer: "Simonnet-Febvre", country: "France" },
  { name: "Iphöfer Kammer Riesling Grosses Gewächs trocken 2022", producer: "Weingut Hans Wirsching", country: "Germany" },
  { name: "Hochheimer Domdechaney VDP Erste Lage 2023", producer: "Domdechant Werner'sches Weingut", country: "Germany" },
  { name: "Santorini Aa 2023", producer: "Domaine Sigalas", country: "Greece" },
  { name: "Grand Reserve Chardonnay 2022", producer: "Church Road", country: "New Zealand" },
  { name: "Emma Marris Chardonnay 2023", producer: "Marisco Vineyards", country: "New Zealand" },
  { name: "Stoneleigh Riesling 2024", producer: "Stoneleigh", country: "New Zealand" },
  { name: "Reserve Coastal Awatere Sauvignon Blanc 2024", producer: "Villa Maria", country: "New Zealand" },
  { name: "Bico Amarelo 2024", producer: "Esporão", country: "Portugal" },
  { name: "Groot Constantia Chardonnay 2024", producer: "Groot Constantia", country: "South Africa" },
  { name: "Vergelegen White 2023", producer: "Vergelegen Estate", country: "South Africa" },
  { name: "Ramon do Casar Varietal 2022", producer: "Javier Gonzalez", country: "Spain" },
  // Fortified & Sweet trophies
  { name: "Trius Showcase Riesling Icewine 2023", producer: "Trius Winery", country: "Canada" },
  { name: "Vinsanto Capezzana Riserva 2017", producer: "Tenuta Di Capezzana", country: "Italy" },
  { name: "Letter Series B Late Harvest Sauvignon Blanc 2023", producer: "Brancott Estate", country: "New Zealand" },
  { name: "Amontillado Botaina Edicion Limitada En Rama NV", producer: "Emilio Lustau", country: "Spain" },
  { name: "Manzanilla Papirusa NV", producer: "Emilio Lustau", country: "Spain" },
  { name: "Manzanilla La Especial 2016", producer: "Valdespino", country: "Spain" },
  { name: "Añada 1995", producer: "Emilio Lustau", country: "Spain" },
  { name: "Oloroso Don Gonzalo VOS NV", producer: "Valdespino", country: "Spain" },
  { name: "Venerable VORS NV", producer: "Bodegas Osborne", country: "Spain" },
];

// Platter's 5 Stars 2026 (South Africa)
const PLATTERS_5STAR_2026 = [
  { name: "Mary Delany Chenin Blanc 2024", producer: "Botanica", country: "South Africa" },
  { name: "Heritage Syrah 2022", producer: "Leeuwenkuil", country: "South Africa" },
  { name: "Magnetic North 2024", producer: "Alheit", country: "South Africa" },
  { name: "Tesame 2023", producer: "Anysbos", country: "South Africa" },
  { name: "Mabalel Pinot Noir 2024", producer: "Crystallum", country: "South Africa" },
  { name: "Pepper Wind Syrah 2024", producer: "Old Road", country: "South Africa" },
  { name: "Koffieklip OVC 2023", producer: "Ahrens Family", country: "South Africa" },
  { name: "Epilogue 2023", producer: "Boschkloof", country: "South Africa" },
  { name: "Rooidraai Chenin Blanc 2024", producer: "Carinus", country: "South Africa" },
  { name: "Five 2022", producer: "Constantia Glen", country: "South Africa" },
  { name: "Clay Shales Chardonnay 2024", producer: "Crystallum", country: "South Africa" },
  { name: "Signature 2022", producer: "Ernie Els", country: "South Africa" },
  { name: "Family Reserve Chardonnay 2024", producer: "Kleine Zalze", country: "South Africa" },
  { name: "Rondekop Per Se Cabernet Sauvignon 2022", producer: "Oldenburg", country: "South Africa" },
  { name: "Vlag Cabernet Franc 2023", producer: "Raats", country: "South Africa" },
  { name: "Mev Kirsten 2024", producer: "Sadie Family", country: "South Africa" },
  { name: "Jewel Box 2019", producer: "Silverthorn", country: "South Africa" },
  { name: "Pofadderbos Sauvignon Blanc 2024", producer: "Strandveld", country: "South Africa" },
  { name: "White 2023", producer: "Wildeberg", country: "South Africa" },
  { name: "Chenin Blanc 2024", producer: "Wolf & Woman", country: "South Africa" },
  { name: "Crystallum The Agnes Chardonnay 2024", producer: "Crystallum", country: "South Africa" },
  { name: "Laurence Graff Reserve 2021", producer: "Delaire Graff", country: "South Africa" },
  { name: "Vin de Constance 2022", producer: "Klein Constantia", country: "South Africa" },
  { name: "Staanspoor Syrah 2023", producer: "Staanspoor", country: "South Africa" },
];

// Guia Peñín 2026 - 100 point wines
const GUIA_PENIN_2026_100PTS = [
  { name: "Homenatge a Josep Mata Capellades 2004", producer: "Recaredo", country: "Spain" },
  { name: "Amontillado Tradición VORS NV", producer: "Bodegas Tradición", country: "Spain" },
  { name: "Tío Pepe Cuatro Palmas NV", producer: "González Byass", country: "Spain" },
  { name: "Castillo Ygay 2012", producer: "Marqués de Murrieta", country: "Spain" },
  { name: "La Condenada 2023", producer: "Artuke Bodegas y Viñedos", country: "Spain" },
  { name: "Alabaster 2022", producer: "Teso la Monja", country: "Spain" },
  { name: "O Raio da Vella Albariño 2023", producer: "Bodegas Forjas del Salnés", country: "Spain" },
  { name: "Sorte O Soro 2023", producer: "Rafael Palacios", country: "Spain" },
];

// Tim Atkin South Africa 2024 - high point wines
const TIM_ATKIN_SA_2024 = [
  { name: "Nautical Dawn 2023", producer: "Alheit Vineyards", country: "South Africa", score: 100 },
  { name: "Porseleinberg Syrah 2022", producer: "Porseleinberg", country: "South Africa", score: 99 },
  { name: "Columella 2022", producer: "Sadie Family", country: "South Africa", score: 99 },
  { name: "Mev Kirsten 2023", producer: "Sadie Family", country: "South Africa", score: 99 },
];

// Wine Spectator Top 100 2024 (partial - what we could extract)
const WS_TOP100_2024_PARTIAL = [
  { rank: 1, name: "Don Melchor Cabernet Sauvignon Puente Alto 2021", producer: "Concha y Toro", country: "Chile" },
  { rank: 2, name: "Georges de Latour Private Reserve Cabernet Sauvignon 2021", producer: "Beaulieu Vineyard", country: "USA" },
  { rank: 3, name: "Tignanello 2021", producer: "Marchesi Antinori", country: "Italy" },
  { rank: 4, name: "Faust Cabernet Sauvignon 2021", producer: "Faust", country: "USA" },
  { rank: 5, name: "Châteauneuf-du-Pape La Crau 2020", producer: "Domaine du Vieux Télégraphe", country: "France" },
  { rank: 6, name: "Barolo Albe 2020", producer: "G.D. Vajra", country: "Italy" },
  { rank: 7, name: "Chardonnay Russian River Valley 2022", producer: "Ramey", country: "USA" },
  { rank: 8, name: "Brunello di Montalcino 2019", producer: "La Fiorita", country: "Italy" },
  { rank: 10, name: "Estate Red Blend 2020", producer: "Figgins Estate", country: "USA" },
  { rank: 11, name: "Sauvignon Blanc Martinborough Te Muna", producer: "Craggy Range", country: "New Zealand" },
];

// Wine Spectator Top 100 2025 (partial)
const WS_TOP100_2025_PARTIAL = [
  { rank: 1, name: "Margaux 2022", producer: "Chateau Giscours", country: "France" },
  { rank: 3, name: "Lytton Springs Zinfandel Blend 2023", producer: "Ridge Vineyards", country: "USA" },
  { rank: 6, name: "Clos Apalta 2021", producer: "Clos Apalta", country: "Chile" },
  { rank: 7, name: "Barbaresco 2021", producer: "Produttori del Barbaresco", country: "Italy" },
  { rank: 13, name: "Saint-Julien Grand Cru 2022", producer: "Chateau Talbot", country: "France" },
  { rank: 30, name: "Margaux 2022", producer: "Chateau Marquis de Terme", country: "France" },
];

// Concours Mondial de Bruxelles 2025 - Grand Gold winners
const CMB_GRAND_GOLD_2025 = [
  { name: "Champagne Bernard Remy Rosé NV", producer: "Champagne Bernard Remy", country: "France" },
  { name: "Centinari Brut NV", producer: "Centinari S.r.l.", country: "Italy" },
  { name: "Estate Argyros Vinsanto Late Release 2004", producer: "Estate I. & M. Argyros SA", country: "Greece" },
  { name: "Champagne Tribaut-Schloesser Cuvée Authentique 2012", producer: "Champagne Tribaut-Schloesser", country: "France" },
  { name: "Vinyes de Can Sala 2015", producer: "Ferrer Wines Group", country: "Spain" },
  { name: "Les Sorts Vinyes Velles 2020", producer: "Celler Masroig", country: "Spain" },
  { name: "Norton Privada 2022", producer: "Vinos Y Mas", country: "Argentina" },
  { name: "Tarapaca Gran Reserva Cabernet Sauvignon 2023", producer: "Unique Wines", country: "Chile" },
  { name: "Château Franc La Rose 2022", producer: "Vignobles JL Trocard", country: "France" },
  { name: "Cima Caponiera Riserva 2018", producer: "Ca' Rugate", country: "Italy" },
  { name: "Fluxus 2017", producer: "Weingut Bergdolt Klostergut St.Lamprecht", country: "Germany" },
  { name: "Guelbenzu EVO 2020", producer: "Guelbenzu", country: "Spain" },
];

// VinePair badge
const BADGE_VINEPAIR = "VinePair 50 Best Wines (2024)";
const BADGE_VINOUS_2024 = (rank) => `Vinous Top 100 #${rank} (2024)`;
const BADGE_JS_ITALY_2025 = (rank) => `James Suckling Top 100 Italy #${rank} (2025)`;
const BADGE_IWC_TROPHY_2025 = "IWC Trophy (2025)";
const BADGE_PLATTERS_2026 = "Platter's 5 Stars (2026)";
const BADGE_PENIN_100_2026 = "Guia Penin 100 Points (2026)";
const BADGE_TIM_ATKIN_100_2024 = "Tim Atkin SA 100 Points (2024)";
const BADGE_TIM_ATKIN_99_2024 = "Tim Atkin SA 99 Points (2024)";
const BADGE_GR_2026 = "Gambero Rosso Tre Bicchieri (2026)";
const BADGE_CMB_GRAND_GOLD_2025 = "Concours Mondial Grand Gold (2025)";
const BADGE_WS_2024 = (rank) => `Wine Spectator Top 100 #${rank} (2024)`;
const BADGE_WS_2025 = (rank) => `Wine Spectator Top 100 #${rank} (2025)`;

// Gambero Rosso Tre Bicchieri 2026 (subset of the massive list we extracted)
const GR_TRE_BICCHIERI_2026 = [
  // Tuscany (93 wines)
  { name: "Ornellaia Bolgheri Bianco 2022", producer: "Ornellaia", country: "Italy" },
  { name: "Bolgheri Rosso Felciaino 2023", producer: "Giovanni Chiappini", country: "Italy" },
  { name: "Bolgheri Rosso Superiore Argentiera 2022", producer: "Argentiera", country: "Italy" },
  { name: "Bolgheri Rosso Superiore Dedicato a Walter 2021", producer: "Poggio al Tesoro", country: "Italy" },
  { name: "Bolgheri Rosso Superiore Grattamacco 2022", producer: "Grattamacco", country: "Italy" },
  { name: "Bolgheri Rosso Volpolo 2023", producer: "Podere Sapaio", country: "Italy" },
  { name: "Bolgheri Sassicaia 2022", producer: "Tenuta San Guido", country: "Italy" },
  { name: "Bolgheri Superiore Castello di Bolgheri 2022", producer: "Castello di Bolgheri", country: "Italy" },
  { name: "Brunello di Montalcino 2020", producer: "Carpineto", country: "Italy" },
  { name: "Brunello di Montalcino Giodo 2020", producer: "Giodo", country: "Italy" },
  { name: "Brunello di Montalcino Montosoli 2020", producer: "Altesino", country: "Italy" },
  { name: "Brunello di Montalcino Paesaggio Inatteso 2020", producer: "Camigliano", country: "Italy" },
  { name: "Brunello di Montalcino Riserva 2018", producer: "Biondi-Santi Tenuta Greppo", country: "Italy" },
  { name: "Brunello di Montalcino Riserva 2019", producer: "Poggio di Sotto", country: "Italy" },
  { name: "Brunello di Montalcino Riserva 2019", producer: "Fuligni", country: "Italy" },
  { name: "Brunello di Montalcino Sasso di Luna 2020", producer: "SassodiSole", country: "Italy" },
  { name: "Brunello di Montalcino Tenuta Nuova 2020", producer: "Casanova di Neri", country: "Italy" },
  { name: "Brunello di Montalcino Vigneto Montosoli 2020", producer: "Canalicchio di Sopra", country: "Italy" },
  { name: "Brunello di Montalcino Vigneto Nastagio 2020", producer: "Tenuta Col d'Orcia", country: "Italy" },
  { name: "Brunello di Montalcino Vigneto Pianrosso Santa Caterina D'Oro Riserva 2019", producer: "Ciacci Piccolomini D'Aragona", country: "Italy" },
  { name: "Carmignano Grumarello Riserva 2021", producer: "Tenuta di Artimino", country: "Italy" },
  { name: "Carmignano Trefiano Riserva 2021", producer: "Tenuta di Capezzana", country: "Italy" },
  { name: "Chianti Classico 2022", producer: "Isole e Olena", country: "Italy" },
  { name: "Chianti Classico Gran Selezione Colledilà 2022", producer: "Barone Ricasoli", country: "Italy" },
  { name: "Chianti Classico Gran Selezione Coltassala 2022", producer: "Castello di Volpaia", country: "Italy" },
  { name: "Chianti Classico Gran Selezione La Corte 2022", producer: "Castello di Querceto", country: "Italy" },
  { name: "Chianti Classico Gran Selezione Vigneto Il Poggio 2020", producer: "Castello di Monsanto", country: "Italy" },
  { name: "Chianti Classico Riserva 2019", producer: "Castell'in Villa", country: "Italy" },
  { name: "Flaccianello della Pieve 2022", producer: "Fontodi", country: "Italy" },
  { name: "I Sodi di San Niccolò 2021", producer: "Castellare di Castellina", country: "Italy" },
  { name: "Il Caberlot 2022", producer: "Il Carnasciale", country: "Italy" },
  { name: "La Gioia 2021", producer: "Riecine", country: "Italy" },
  { name: "Lupicaia 2020", producer: "Castello del Terriccio", country: "Italy" },
  { name: "Maremma Toscana Merlot Baffonero 2022", producer: "Rocca di Frassinello", country: "Italy" },
  { name: "Montecucco Sangiovese Poggio Lombrone Riserva 2021", producer: "ColleMassari", country: "Italy" },
  { name: "Monteti 2021", producer: "Tenuta Monteti", country: "Italy" },
  { name: "Montevertine 2022", producer: "Montevertine", country: "Italy" },
  { name: "Nobile di Montepulciano Asinone 2022", producer: "Poliziano", country: "Italy" },
  { name: "Nobile di Montepulciano Costa Grande 2021", producer: "Boscarelli", country: "Italy" },
  { name: "Oreno 2023", producer: "Tenuta Sette Ponti", country: "Italy" },
  { name: "Paleo Rosso 2022", producer: "Le Macchiole", country: "Italy" },
  { name: "Petra 2022", producer: "Petra", country: "Italy" },
  { name: "Poggio de' Colli 2022", producer: "Piaggia", country: "Italy" },
  { name: "Poggio Valente 2022", producer: "Fattoria Le Pupille", country: "Italy" },
  { name: "Solaia 2022", producer: "Marchesi Antinori", country: "Italy" },
  { name: "Suisassi 2022", producer: "Duemani", country: "Italy" },
  { name: "Uno 2022", producer: "Tenuta di Carleone", country: "Italy" },
  // Piedmont (selection)
  { name: "Alta Langa Extra Brut Bera Blanc 2021", producer: "Bera", country: "Italy" },
  { name: "Barbaresco Asili Riserva 2020", producer: "Ca' del Baio", country: "Italy" },
  { name: "Barbaresco Asili Riserva 2020", producer: "Bruno Giacosa", country: "Italy" },
  { name: "Barbaresco Bricco di Treiso Il Bricco 2021", producer: "Pio Cesare", country: "Italy" },
  { name: "Barbaresco Currà 2020", producer: "Sottimano", country: "Italy" },
  { name: "Barbaresco Sorì Tildin 2022", producer: "Gaja", country: "Italy" },
  { name: "Barolo Arborina 2021", producer: "Elio Altare", country: "Italy" },
  { name: "Barolo Brunate 2021", producer: "Vietti", country: "Italy" },
  { name: "Barolo Bussia 2021", producer: "Giacomo Fenocchio", country: "Italy" },
  { name: "Barolo Castelletto 2021", producer: "G. B. Burlotto", country: "Italy" },
  { name: "Barolo Cerequio 2021", producer: "Michele Chiarlo", country: "Italy" },
  { name: "Barolo Coste di Rose 2021", producer: "G. D. Vajra", country: "Italy" },
  { name: "Barolo Francia 2021", producer: "Giacomo Conterno", country: "Italy" },
  { name: "Barolo Monvigliero 2021", producer: "Poderi Luigi Einaudi", country: "Italy" },
  { name: "Barbera d'Asti La Bigia 2023", producer: "Luigi Spertino", country: "Italy" },
  { name: "Gattinara 2020", producer: "Torraccia del Piantavigna", country: "Italy" },
  { name: "Gattinara Vigna Ronchi Riserva 2019", producer: "Giancarlo Travaglini", country: "Italy" },
  { name: "Nizza Pomorosso 2022", producer: "Coppo", country: "Italy" },
  { name: "Colli Tortonesi Timorasso Derthona 2023", producer: "Mandirola", country: "Italy" },
  { name: "Gavi del Comune di Gavi Rovereto Minaia 2024", producer: "Nicola Bergaglio", country: "Italy" },
  // Veneto (selection)
  { name: "Amarone della Valpolicella Classico 2018", producer: "Giuseppe Quintarelli", country: "Italy" },
  { name: "Amarone della Valpolicella Classico 2020", producer: "Brigaldara", country: "Italy" },
  { name: "Amarone della Valpolicella Classico De Buris Riserva 2013", producer: "Tommasi Viticoltori", country: "Italy" },
  { name: "Soave Classico Calvarino 2023", producer: "Pieropan", country: "Italy" },
  { name: "Soave Classico Monte Carbonare 2023", producer: "Suavia", country: "Italy" },
  { name: "Valpolicella Classico Superiore Grola 2022", producer: "Allegrini", country: "Italy" },
  { name: "Valpolicella Classico Superiore Sant'Urbano 2022", producer: "Speri", country: "Italy" },
  { name: "Valdobbiadene Rive di Ogliano Extra Brut 2024", producer: "BiancaVigna", country: "Italy" },
  { name: "Valdobbiadene Rive di Farrò Extra Brut Particella 232 2024", producer: "Sorelle Bronca", country: "Italy" },
  // Alto Adige
  { name: "Cabernet Sauvignon Freienfeld Riserva 2022", producer: "Cantina Kurtatsch", country: "Italy" },
  { name: "Gewürztraminer Vigna Castel Rechtenthal Riserva 2022", producer: "Tenuta J. Hofstätter", country: "Italy" },
  { name: "Gewürztraminer Vigna Kastelaz 2023", producer: "Elena Walch", country: "Italy" },
  { name: "Pinot Bianco Sirmian 2023", producer: "Nals Margreid", country: "Italy" },
  { name: "Pinot Nero Sanct Valentin Riserva 2022", producer: "Cantina Produttori San Michele Appiano", country: "Italy" },
  { name: "Sauvignon Gran Lafóa Riserva 2022", producer: "Cantina Colterenzio", country: "Italy" },
  { name: "Terlano Nova Domus Riserva 2022", producer: "Cantina Terlano", country: "Italy" },
  { name: "Valle Isarco Riesling Praepositus 2023", producer: "Abbazia di Novacella", country: "Italy" },
  // Friuli
  { name: "Collio Bianco Fosarin 2023", producer: "Ronco dei Tassi", country: "Italy" },
  { name: "Collio Friulano 2024", producer: "Russiz Superiore", country: "Italy" },
  { name: "Collio Ribolla Gialla Riserva 2020", producer: "Primosic", country: "Italy" },
  { name: "Friuli Isonzo Chardonnay Vie di Romans 2023", producer: "Vie di Romans", country: "Italy" },
  { name: "Friuli Isonzo Pinot Grigio Gris 2023", producer: "Lis Neris", country: "Italy" },
  { name: "Rosazzo Terre Alte 2022", producer: "Livio Felluga", country: "Italy" },
  { name: "FCO Schioppettino di Prepotto 2020", producer: "Vigna Traverso", country: "Italy" },
  // Lombardy
  { name: "Franciacorta Dosage Zéro Annamaria Clementi Riserva 2016", producer: "Ca' del Bosco", country: "Italy" },
  { name: "Franciacorta Extra Brut EBB 2019", producer: "Mosnel", country: "Italy" },
  { name: "Franciacorta Nature 61 2018", producer: "Guido Berlucchi", country: "Italy" },
  { name: "Valtellina Superiore Sassella Stella Retica 2022", producer: "AR.PE.PE", country: "Italy" },
  { name: "Valtellina Sfursat 5 Stelle 2022", producer: "Nino Negri", country: "Italy" },
  // Campania
  { name: "Costa d'Amalfi Furore Bianco Fiorduva 2024", producer: "Marisa Cuomo", country: "Italy" },
  { name: "Fiano di Avellino 2024", producer: "Colli di Lapio", country: "Italy" },
  { name: "Fiano di Avellino Pietramara Et. Bianca Riserva 2022", producer: "I Favati", country: "Italy" },
  { name: "Greco di Tufo L'Ariella 2024", producer: "Vinosia", country: "Italy" },
  { name: "Taurasi Piano di Montevergine 2019", producer: "Feudi di San Gregorio", country: "Italy" },
  // Sicily
  { name: "Etna Bianco Anthemis 2023", producer: "Monteleone", country: "Italy" },
  { name: "Etna Bianco San Lorenzo 2024", producer: "Girolamo Russo", country: "Italy" },
  { name: "Etna Rosso Alta Mora 2022", producer: "Alta Mora", country: "Italy" },
  { name: "Etna Rosso Contrada Arcuria 2023", producer: "Restivo", country: "Italy" },
  { name: "Etna Rosso Vigna Barbagalli 2022", producer: "Pietradolce", country: "Italy" },
  { name: "Faro Palari 2020", producer: "Palari", country: "Italy" },
  { name: "Passito di Pantelleria Ben Ryè 2022", producer: "Donnafugata", country: "Italy" },
  { name: "Cerasuolo di Vittoria Classico Dorilli 2023", producer: "Planeta", country: "Italy" },
  { name: "Nero d'Avola Saia 2023", producer: "Feudo Maccari", country: "Italy" },
  // Puglia
  { name: "Jo Negroamaro 2022", producer: "Gianfranco Fino", country: "Italy" },
  { name: "Gioia del Colle Primitivo 16 San Benedetto 2022", producer: "Polvanera", country: "Italy" },
  { name: "Primitivo di Manduria Piano Chiuso Riserva 2022", producer: "Masca del Tacco", country: "Italy" },
  { name: "Salice Salentino Rosso Selvarossa Riserva 2022", producer: "Cantine Due Palme", country: "Italy" },
  { name: "Askos Verdeca 2024", producer: "Masseria Li Veli", country: "Italy" },
  { name: "Lamarossa Primitivo 2021", producer: "Amastuola", country: "Italy" },
  // Sardinia
  { name: "Turriga 2021", producer: "Argiolas", country: "Italy" },
  { name: "Alghero Cabernet Marchese di Villamarina Riserva 2021", producer: "Tenute Sella & Mosca", country: "Italy" },
  { name: "Cannonau di Sardegna Classico Arbòre 2022", producer: "Giuseppe Gabbas", country: "Italy" },
  { name: "Vermentino di Gallura Superiore Sciala 2024", producer: "Surrau", country: "Italy" },
  // Umbria
  { name: "Montefalco Sagrantino 25 Anni 2021", producer: "Arnaldo Caprai", country: "Italy" },
  { name: "Montefalco Sagrantino Chiusa di Pannone 2020", producer: "Antonelli San Marco", country: "Italy" },
  { name: "Torgiano Rosso Rubesco Vigneto Monticchio Riserva 2020", producer: "Lungarotti", country: "Italy" },
  // Abruzzo
  { name: "Trebbiano d'Abruzzo 2023", producer: "Emidio Pepe", country: "Italy" },
  { name: "Montepulciano d'Abruzzo Vigneto di Popoli 2016", producer: "Valle Reale", country: "Italy" },
  // Lazio
  { name: "Fiorano Rosso 2020", producer: "Tenuta di Fiorano", country: "Italy" },
  { name: "Montiano 2022", producer: "Famiglia Cotarella", country: "Italy" },
  // Trentino
  { name: "San Leonardo 2020", producer: "San Leonardo", country: "Italy" },
  { name: "Trento Extra Brut Perlé Nero Riserva 2018", producer: "Ferrari", country: "Italy" },
  // Valle d'Aosta
  { name: "Chardonnay Cuvée Bois 2023", producer: "Les Crêtes", country: "Italy" },
  // Basilicata
  { name: "Aglianico del Vulture Titolo 2023", producer: "Elena Fucci", country: "Italy" },
  // Marche
  { name: "Castelli di Jesi Verdicchio Classico Villa Bucci Riserva 2022", producer: "Tenuta Villa Bucci", country: "Italy" },
  { name: "Verdicchio dei Castelli di Jesi Classico Superiore VV Historical 2020", producer: "Umani Ronchi", country: "Italy" },
  { name: "Rosso Piceno Superiore Roggio del Filare 2022", producer: "Velenosi", country: "Italy" },
];

// ── Helper functions ─────────────────────────────────────────────────────────

function normalizeForSearch(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[''']/g, "'")
    .replace(/[–—]/g, '-')
    .trim();
}

function extractKeyTerms(name) {
  // Remove vintage years, common wine terms to get core name
  return name
    .replace(/\b(20\d{2}|19\d{2})\b/g, '') // Remove years
    .replace(/\b(riserva|reserve|superiore|classico|docg|doc|igt|nv|gran|grande|cru|premier|premier|rés|ris\.|ris|v\.v\.|vv|v\. v\.)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

async function findWineInDB(name, producer, country) {
  const nameNorm = normalizeForSearch(name);
  const producerNorm = normalizeForSearch(producer);
  const countryLower = country.toLowerCase();

  // Extract core search terms
  const coreTerms = extractKeyTerms(nameNorm).split(/\s+/).filter(t => t.length > 3);

  // Strategy 1: Try exact producer match + partial name
  if (producerNorm.length > 2) {
    const results = await sql`
      SELECT id, name, producer, country, badges
      FROM wines
      WHERE lower(country) = ${countryLower}
        AND lower(producer) ILIKE ${`%${producerNorm.slice(0, 20)}%`}
        AND lower(name) ILIKE ${`%${coreTerms[0] || nameNorm.split(' ')[0]}%`}
      LIMIT 5
    `;
    if (results.length === 1) return results[0];
    if (results.length > 1) {
      // Return best match
      return results[0];
    }
  }

  // Strategy 2: Name-only search
  const firstWord = coreTerms[0] || nameNorm.split(' ')[0];
  if (firstWord && firstWord.length > 3) {
    const results = await sql`
      SELECT id, name, producer, country, badges
      FROM wines
      WHERE lower(country) = ${countryLower}
        AND lower(name) ILIKE ${`%${firstWord}%`}
        AND lower(name) ILIKE ${`%${coreTerms[1] || firstWord}%`}
      LIMIT 3
    `;
    if (results.length >= 1) return results[0];
  }

  return null;
}

async function addBadge(wineId, badge, existingBadges) {
  if (existingBadges.includes(badge)) return false; // Already has badge

  const newBadges = [...existingBadges, badge];
  await sql`UPDATE wines SET badges = ${newBadges} WHERE id = ${wineId}`;
  return true;
}

async function processList(wines, getBadge, listName) {
  let found = 0, updated = 0, notFound = 0;
  const notFoundList = [];

  for (const wine of wines) {
    const badge = typeof getBadge === 'function' ? getBadge(wine.rank || 0) : getBadge;
    const dbWine = await findWineInDB(wine.name, wine.producer, wine.country);

    if (dbWine) {
      found++;
      const wasUpdated = await addBadge(dbWine.id, badge, dbWine.badges || []);
      if (wasUpdated) updated++;
    } else {
      notFound++;
      notFoundList.push(`${wine.producer} - ${wine.name} (${wine.country})`);
    }
  }

  console.log(`\n[${listName}] Found: ${found}/${wines.length} | Updated: ${updated} | Not found: ${notFound}`);
  if (notFoundList.length > 0 && notFoundList.length <= 20) {
    console.log('  Not found:', notFoundList.slice(0, 10).join('\n    '));
  }

  return { found, updated, notFound };
}

// ── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('Starting badge assignment for 2024-2026 wine lists...\n');

  const results = {};

  // 1. VinePair 50 Best 2024
  results.vinepair = await processList(VINEPAIR_50_2024, BADGE_VINEPAIR, 'VinePair 50 Best 2024');

  // 2. Vinous Top 100 2024
  results.vinous = await processList(
    VINOUS_TOP100_2024,
    (rank) => rank > 0 ? `Vinous Top 100 #${rank} (2024)` : 'Vinous Top 100 (2024)',
    'Vinous Top 100 2024'
  );

  // 3. James Suckling Italy Top 100 2025
  results.jsItaly = await processList(
    JS_ITALY_TOP100_2025,
    (rank) => `James Suckling Top 100 Italy #${rank} (2025)`,
    'James Suckling Italy 2025'
  );

  // 4. IWC Trophy 2025
  results.iwc = await processList(IWC_TROPHY_2025, BADGE_IWC_TROPHY_2025, 'IWC Trophy 2025');

  // 5. Platter's 5 Stars 2026
  results.platters = await processList(PLATTERS_5STAR_2026, BADGE_PLATTERS_2026, "Platter's 5 Stars 2026");

  // 6. Guia Penin 100 Points 2026
  results.penin = await processList(GUIA_PENIN_2026_100PTS, BADGE_PENIN_100_2026, 'Guia Penin 100pts 2026');

  // 7. Tim Atkin SA 2024
  const timAtkin100 = TIM_ATKIN_SA_2024.filter(w => w.score === 100);
  const timAtkin99 = TIM_ATKIN_SA_2024.filter(w => w.score === 99);
  results.timAtkin100 = await processList(timAtkin100, BADGE_TIM_ATKIN_100_2024, 'Tim Atkin SA 100pts 2024');
  results.timAtkin99 = await processList(timAtkin99, BADGE_TIM_ATKIN_99_2024, 'Tim Atkin SA 99pts 2024');

  // 8. Gambero Rosso Tre Bicchieri 2026
  results.gr2026 = await processList(GR_TRE_BICCHIERI_2026, BADGE_GR_2026, 'Gambero Rosso Tre Bicchieri 2026');

  // 9. Concours Mondial Grand Gold 2025
  results.cmb = await processList(CMB_GRAND_GOLD_2025, BADGE_CMB_GRAND_GOLD_2025, 'Concours Mondial Grand Gold 2025');

  // 10. Wine Spectator Top 100 2024 (partial)
  results.ws2024 = await processList(
    WS_TOP100_2024_PARTIAL,
    (rank) => rank > 0 ? `Wine Spectator Top 100 #${rank} (2024)` : 'Wine Spectator Top 100 (2024)',
    'Wine Spectator Top 100 2024'
  );

  // 11. Wine Spectator Top 100 2025 (partial)
  results.ws2025 = await processList(
    WS_TOP100_2025_PARTIAL,
    (rank) => rank > 0 ? `Wine Spectator Top 100 #${rank} (2025)` : 'Wine Spectator Top 100 (2025)',
    'Wine Spectator Top 100 2025'
  );

  // Summary
  console.log('\n═══════════════════════════════════════');
  console.log('SUMMARY');
  console.log('═══════════════════════════════════════');
  let totalUpdated = 0;
  for (const [key, r] of Object.entries(results)) {
    console.log(`${key}: found=${r.found} updated=${r.updated}`);
    totalUpdated += r.updated;
  }
  console.log(`\nTotal badges added: ${totalUpdated}`);

  // Check new total of badged wines
  const badgedCount = await sql`SELECT COUNT(*) FROM wines WHERE array_length(badges, 1) > 0`;
  console.log(`Total wines with badges: ${badgedCount[0].count}`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
