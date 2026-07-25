#!/usr/bin/env node
// Fast bulk badge assignment using producer-based batch queries
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

function norm(str) {
  if (!str) return '';
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/['']/g, "'").trim();
}

// Remove vintage years and noise words from wine name for matching
function coreName(name) {
  return norm(name)
    .replace(/\b(20\d{2}|19\d{2})\b/g, '')
    .replace(/\b(nv|ris\.|riserva|reserve|superiore|classico|docg|doc|igt|gran|grande|cru|premier|superieur|top|the|single|vineyard|estate)\b/gi, '')
    .replace(/\s+/g, ' ').trim();
}

// ── All badge data in one place ───────────────────────────────────────────────

const ALL_ASSIGNMENTS = [

  // ── VinePair 50 Best Wines 2024 ─────────────────────────────────────────
  ...[
    ["VinePair 50 Best Wines (2024)", "Reichsrat von Buhl", "Germany", "armand riesling kabinett"],
    ["VinePair 50 Best Wines (2024)", "Rosi Schuster", "Austria", "sankt laurent"],
    ["VinePair 50 Best Wines (2024)", "Pedro Parra", "Chile", "imaginador cinsault"],
    ["VinePair 50 Best Wines (2024)", "Carobbio", "Italy", "chianti classico riserva"],
    ["VinePair 50 Best Wines (2024)", "Vigna Lenuzza", "Italy", "schioppettino"],
    ["VinePair 50 Best Wines (2024)", "Stefano Occhetti", "Italy", "langhe nebbiolo"],
    ["VinePair 50 Best Wines (2024)", "Arnaud Lambert", "France", "breze saumur blanc"],
    ["VinePair 50 Best Wines (2024)", "Olga Raffault", "France", "chinon"],
    ["VinePair 50 Best Wines (2024)", "Domaine de Belliviere", "France", "vieilles vignes"],
    ["VinePair 50 Best Wines (2024)", "Château Lafleur-Gazin", "France", "pomerol"],
    ["VinePair 50 Best Wines (2024)", "Château du Moulin-à-Vent", "France", "couvent des thorins"],
    ["VinePair 50 Best Wines (2024)", "Fowles", "Australia", "ladies who shoot"],
    ["VinePair 50 Best Wines (2024)", "Louis M. Martini", "USA", "monte rosso"],
    ["VinePair 50 Best Wines (2024)", "Failla", "USA", "sonoma coast chardonnay"],
    ["VinePair 50 Best Wines (2024)", "Ridge Vineyards", "USA", "lytton springs"],
    ["VinePair 50 Best Wines (2024)", "Pax", "USA", "sonoma hillsides syrah"],
    ["VinePair 50 Best Wines (2024)", "Arnot-Roberts", "USA", "sonoma coast syrah"],
    ["VinePair 50 Best Wines (2024)", "Hermann J. Wiemer", "USA", "hjw vineyard riesling"],
    ["VinePair 50 Best Wines (2024)", "Tenuta San Leonardo", "Italy", "vigneti delle dolomiti"],
    ["VinePair 50 Best Wines (2024)", "Santi", "Italy", "amarone"],
    ["VinePair 50 Best Wines (2024)", "Stefano Zoli", "Italy", "verdicchio di matelica"],
  ].map(([badge, producer, country, nameHint]) => ({ badge, producer, country, nameHint })),

  // ── Vinous Top 100 2024 ─────────────────────────────────────────────────
  ...[
    ["Vinous Top 100 #1 (2024)", "Philip Togni Vineyards", "USA", "cabernet sauvignon"],
    ["Vinous Top 100 #2 (2024)", "Giaconda", "Australia", "chardonnay estate"],
    ["Vinous Top 100 #3 (2024)", "Château Pichon Longueville Comtesse de Lalande", "France", "pichon"],
    ["Vinous Top 100 #4 (2024)", "La Ca' Nova", "Italy", "barbaresco montefico"],
    ["Vinous Top 100 #5 (2024)", "Hirsch", "USA", "pinot noir raschen ridge"],
    ["Vinous Top 100 #6 (2024)", "Cheval des Andes", "Argentina", "cheval des andes"],
    ["Vinous Top 100 #7 (2024)", "Dominio de Pingus", "Spain", "psi"],
    ["Vinous Top 100 #8 (2024)", "Antinori", "Italy", "tignanello"],
    ["Vinous Top 100 #9 (2024)", "Château Smith Haut Lafitte", "France", "blanc"],
    ["Vinous Top 100 #10 (2024)", "Lismore Estate Vineyards", "Australia", "chardonnay reserve"],
    ["Vinous Top 100 #11 (2024)", "Le Boncie", "Italy", "le trame"],
    ["Vinous Top 100 #12 (2024)", "Bodega Noemia", "Argentina", "noemia"],
    ["Vinous Top 100 #13 (2024)", "DuMOL", "USA", "pinot noir macintyre"],
    ["Vinous Top 100 #14 (2024)", "Maître de Chai", "USA", "cabernet sauvignon gala"],
    ["Vinous Top 100 #15 (2024)", "Domaine Samuel Billaud", "France", "chablis vaudesir"],
    ["Vinous Top 100 #16 (2024)", "Vine Hill Ranch", "USA", "vine hill ranch cabernet"],
    ["Vinous Top 100 #17 (2024)", "Les Carmes Haut-Brion", "France", "les carmes haut-brion"],
    ["Vinous Top 100 #18 (2024)", "Tablas Creek Vineyard", "USA", "esprit de tablas"],
    ["Vinous Top 100 #19 (2024)", "Fontodi", "Italy", "chianti classico gran selezione vigna del sorbo"],
    ["Vinous Top 100 #20 (2024)", "Ridge Vineyards", "USA", "lytton springs"],
    ["Vinous Top 100 #21 (2024)", "Wynns", "Australia", "john riddoch"],
    ["Vinous Top 100 #22 (2024)", "The Sadie Family Wines", "South Africa", "palladius"],
    ["Vinous Top 100 #23 (2024)", "Canon", "France", "chateau canon"],
    ["Vinous Top 100 #24 (2024)", "Aubert", "USA", "chardonnay cix estate"],
    ["Vinous Top 100 #25 (2024)", "Viñedo Chadwick", "Chile", "vinedo chadwick"],
    ["Vinous Top 100 #26 (2024)", "Greywacke", "New Zealand", "wild sauvignon"],
    ["Vinous Top 100 #27 (2024)", "Château de Saint Cosme", "France", "gigondas le poste"],
    ["Vinous Top 100 #28 (2024)", "L'Eglise-Clinet", "France", "eglise-clinet"],
    ["Vinous Top 100 #29 (2024)", "Trediberri", "Italy", "barolo berri"],
    ["Vinous Top 100 #30 (2024)", "Bodegas Vega Sicilia", "Spain", "unico"],
    ["Vinous Top 100 #31 (2024)", "Le Potazzine", "Italy", "brunello di montalcino"],
    ["Vinous Top 100 #32 (2024)", "Tiberio", "Italy", "trebbiano d'abruzzo fonte canale"],
    ["Vinous Top 100 #33 (2024)", "Cornell Vineyards", "USA", "cabernet sauvignon"],
    ["Vinous Top 100 #34 (2024)", "Mount Eden Vineyards", "USA", "pinot noir estate"],
    ["Vinous Top 100 #35 (2024)", "Realm Cellars", "USA", "the bard"],
    ["Vinous Top 100 #36 (2024)", "Alzinger", "Austria", "grüner veltliner loibenberg"],
    ["Vinous Top 100 #37 (2024)", "El Enemigo", "Argentina", "cabernet franc gran enemigo"],
    ["Vinous Top 100 #38 (2024)", "Domaine A. Clape", "France", "cornas"],
    ["Vinous Top 100 #39 (2024)", "Calon Ségur", "France", "calon segur"],
    ["Vinous Top 100 #40 (2024)", "Garage Wine Co.", "Chile", "carignan vigno"],
    ["Vinous Top 100 #61 (2024)", "López de Heredia", "Spain", "vina tondonia blanco"],
    ["Vinous Top 100 #62 (2024)", "Riccitelli", "Argentina", "chardonnay vinedos de montana"],
    ["Vinous Top 100 #63 (2024)", "Moric", "Austria", "blaufrankisch lutzmannsburg"],
    ["Vinous Top 100 #64 (2024)", "Roederer", "France", "brut blanc de blancs"],
    ["Vinous Top 100 #65 (2024)", "K Vintners", "USA", "syrah the hidden"],
    ["Vinous Top 100 #66 (2024)", "John Duval", "Australia", "grenache annexus"],
    ["Vinous Top 100 #67 (2024)", "Tenuta San Leonardo", "Italy", "san leonardo"],
    ["Vinous Top 100 #68 (2024)", "Emiliana", "Chile", "coyam"],
    ["Vinous Top 100 #69 (2024)", "Domaine Michel Bouzereau", "France", "meursault perrieres"],
    ["Vinous Top 100 #70 (2024)", "August Kesseler", "Germany", "pinot noir assmannshausen"],
    ["Vinous Top 100 #71 (2024)", "Yalumba", "Australia", "octavius"],
    ["Vinous Top 100 #72 (2024)", "Viña Tabalí", "Chile", "dom"],
    ["Vinous Top 100 #73 (2024)", "Thibaud Boudignon", "France", "savennieres clos de la hutte"],
    ["Vinous Top 100 #74 (2024)", "Château Belgrave", "France", "belgrave"],
    ["Vinous Top 100 #75 (2024)", "Piaggia", "Italy", "carmignano riserva"],
    ["Vinous Top 100 #76 (2024)", "Rudi Pichler", "Austria", "riesling achleiten smaragd"],
    ["Vinous Top 100 #77 (2024)", "Gunderloch", "Germany", "riesling nackenheimer rothenberg"],
    ["Vinous Top 100 #78 (2024)", "Le Pianelle", "Italy", "bramaterra"],
    ["Vinous Top 100 #79 (2024)", "Speri", "Italy", "amarone sant'urbano"],
    ["Vinous Top 100 #80 (2024)", "Il Poggione", "Italy", "brunello di montalcino"],
    ["Vinous Top 100 #81 (2024)", "Royal Tokaji Company", "Hungary", "mezes maly"],
    ["Vinous Top 100 #82 (2024)", "Pierre Peters", "France", "l'esprit"],
    ["Vinous Top 100 #83 (2024)", "L'Aventure Winery", "USA", "estate cuvee"],
    ["Vinous Top 100 #84 (2024)", "Albert Boxler", "France", "riesling eckberg sommerberg"],
    ["Vinous Top 100 #85 (2024)", "Sottimano", "Italy", "barbaresco curra"],
    ["Vinous Top 100 #86 (2024)", "Muga", "Spain", "prado enea"],
    ["Vinous Top 100 #87 (2024)", "Tenuta delle Terre Nere", "Italy", "etna rosso la vigna di don peppino"],
    ["Vinous Top 100 #88 (2024)", "Arterberry Maresh", "USA", "pinot noir maresh"],
    ["Vinous Top 100 #89 (2024)", "Tenuta di Carleone", "Italy", "uno"],
    ["Vinous Top 100 #90 (2024)", "Señorío de San Vicente", "Spain", "senorio de san vicente"],
    ["Vinous Top 100 #91 (2024)", "Diatom", "USA", "chardonnay"],
    ["Vinous Top 100 #92 (2024)", "Galardi", "Italy", "terra di lavoro"],
    ["Vinous Top 100 #93 (2024)", "Bilancia", "New Zealand", "chardonnay tiratore"],
    ["Vinous Top 100 #94 (2024)", "Domaine Pierre Gonon", "France", "saint-joseph"],
    ["Vinous Top 100 #95 (2024)", "Cantina Terlano", "Italy", "pinot bianco vorberg"],
    ["Vinous Top 100 #96 (2024)", "Andrew Will Winery", "USA", "sorella"],
    ["Vinous Top 100 #97 (2024)", "Jean-Marc Burgaud", "France", "morgon cote du py"],
    ["Vinous Top 100 #98 (2024)", "Best's Wines", "Australia", "riesling great western"],
    ["Vinous Top 100 #99 (2024)", "Sartarelli", "Italy", "verdicchio balciana"],
    ["Vinous Top 100 #100 (2024)", "Pago de Carraovejas", "Spain", "ribera del duero"],
  ].map(([badge, producer, country, nameHint]) => ({ badge, producer, country, nameHint })),

  // ── James Suckling Italy Top 100 2025 ─────────────────────────────────────
  ...[
    ["James Suckling Top 100 Italy #1 (2025)", "Tenuta delle Terre Nere", "Italy", "etna rosso san lorenzo"],
    ["James Suckling Top 100 Italy #2 (2025)", "Pieropan", "Italy", "soave classico la rocca"],
    ["James Suckling Top 100 Italy #3 (2025)", "Ciacci Piccolomini d'Aragona", "Italy", "brunello pianrosso"],
    ["James Suckling Top 100 Italy #4 (2025)", "Marcarini", "Italy", "barolo brunate"],
    ["James Suckling Top 100 Italy #5 (2025)", "Petrolo", "Italy", "trebbiano boggina"],
    ["James Suckling Top 100 Italy #6 (2025)", "Castello di Ama", "Italy", "chianti classico gran selezione san lorenzo"],
    ["James Suckling Top 100 Italy #7 (2025)", "Foradori", "Italy", "pinot grigio fuoripista"],
    ["James Suckling Top 100 Italy #8 (2025)", "Maugeri", "Italy", "etna bianco contrada praino"],
    ["James Suckling Top 100 Italy #9 (2025)", "Boscarelli", "Italy", "vino nobile costa grande"],
    ["James Suckling Top 100 Italy #10 (2025)", "Les Crêtes", "Italy", "pinot nero revei"],
    ["James Suckling Top 100 Italy #11 (2025)", "Bibi Graetz", "Italy", "testamatta"],
    ["James Suckling Top 100 Italy #12 (2025)", "Paolo Scavino", "Italy", "barolo bussia vigna fantini"],
    ["James Suckling Top 100 Italy #13 (2025)", "Capezzana", "Italy", "vin santo carmignano"],
    ["James Suckling Top 100 Italy #14 (2025)", "J. Hofstätter", "Italy", "sauvignon oberkerschbaum"],
    ["James Suckling Top 100 Italy #15 (2025)", "Livio Sassetti", "Italy", "brunello riserva"],
    ["James Suckling Top 100 Italy #16 (2025)", "Tenuta Sette Ponti", "Italy", "oreno"],
    ["James Suckling Top 100 Italy #17 (2025)", "Pira", "Italy", "barolo mosconi"],
    ["James Suckling Top 100 Italy #18 (2025)", "M. Marengo", "Italy", "barolo bricco delle viole"],
    ["James Suckling Top 100 Italy #19 (2025)", "Rosset", "Italy", "sopraquota 900"],
    ["James Suckling Top 100 Italy #20 (2025)", "Capichera", "Italy", "vermentino di gallura vigna'ngena"],
    ["James Suckling Top 100 Italy #21 (2025)", "Giodo", "Italy", "nerello mascalese"],
    ["James Suckling Top 100 Italy #22 (2025)", "Travaglini", "Italy", "gattinara"],
    ["James Suckling Top 100 Italy #23 (2025)", "Barone Ricasoli", "Italy", "chianti classico colledila"],
    ["James Suckling Top 100 Italy #24 (2025)", "Attems", "Italy", "sauvignon collio cicinis"],
    ["James Suckling Top 100 Italy #25 (2025)", "Mastroberardino", "Italy", "taurasi radici"],
    ["James Suckling Top 100 Italy #26 (2025)", "Schiopetto", "Italy", "pinot grigio collio"],
    ["James Suckling Top 100 Italy #28 (2025)", "Pievalta", "Italy", "verdicchio san paolo"],
    ["James Suckling Top 100 Italy #30 (2025)", "Bruno Giacosa", "Italy", "barbaresco asili"],
    ["James Suckling Top 100 Italy #31 (2025)", "Carlo Giacosa", "Italy", "barbaresco montefico"],
    ["James Suckling Top 100 Italy #32 (2025)", "Valdicava", "Italy", "brunello madonna del piano"],
    ["James Suckling Top 100 Italy #33 (2025)", "Palladino", "Italy", "barolo parafada"],
    ["James Suckling Top 100 Italy #35 (2025)", "Castiglion del Bosco", "Italy", "brunello millecento"],
    ["James Suckling Top 100 Italy #36 (2025)", "Pietradolce", "Italy", "etna rosso contrada rampante"],
    ["James Suckling Top 100 Italy #38 (2025)", "Jermann", "Italy", "dove i sogni"],
    ["James Suckling Top 100 Italy #39 (2025)", "Il Marroneto", "Italy", "brunello madonna delle grazie"],
    ["James Suckling Top 100 Italy #41 (2025)", "Elena Walch", "Italy", "chardonnay castel ringberg"],
    ["James Suckling Top 100 Italy #42 (2025)", "Fattoria Le Pupille", "Italy", "saffredi"],
    ["James Suckling Top 100 Italy #44 (2025)", "Conterno - Fantino", "Italy", "barolo ginestra vigna del gris"],
    ["James Suckling Top 100 Italy #45 (2025)", "Castello di Monsanto", "Italy", "chianti classico vigneto il poggio"],
    ["James Suckling Top 100 Italy #46 (2025)", "Michele Chiarlo", "Italy", "barolo tortoniano"],
    ["James Suckling Top 100 Italy #48 (2025)", "Massolino", "Italy", "barolo parafada"],
    ["James Suckling Top 100 Italy #50 (2025)", "G.D. Vajra", "Italy", "barolo baudana"],
    ["James Suckling Top 100 Italy #52 (2025)", "Ettore Germano", "Italy", "barolo vignarionda"],
    ["James Suckling Top 100 Italy #54 (2025)", "Marchesi di Barolo", "Italy", "barolo riserva"],
    ["James Suckling Top 100 Italy #55 (2025)", "Romano Dal Forno", "Italy", "valpolicella monte lodoletta"],
    ["James Suckling Top 100 Italy #56 (2025)", "Inama", "Italy", "soave foscarino"],
    ["James Suckling Top 100 Italy #57 (2025)", "Siro Pacenti", "Italy", "brunello vecchie vigne"],
    ["James Suckling Top 100 Italy #59 (2025)", "Valentini", "Italy", "trebbiano d'abruzzo"],
    ["James Suckling Top 100 Italy #60 (2025)", "Colterenzio", "Italy", "sauvignon gran lafoa"],
    ["James Suckling Top 100 Italy #61 (2025)", "Poderi Aldo Conterno", "Italy", "barolo colonnello"],
    ["James Suckling Top 100 Italy #62 (2025)", "Girolamo Russo", "Italy", "etna rosso san lorenzo"],
    ["James Suckling Top 100 Italy #63 (2025)", "G.B. Burlotto", "Italy", "barolo monvigliero"],
    ["James Suckling Top 100 Italy #64 (2025)", "Casanova di Neri", "Italy", "brunello giovanni neri"],
    ["James Suckling Top 100 Italy #65 (2025)", "Renato Ratti", "Italy", "barolo marcenasco"],
    ["James Suckling Top 100 Italy #67 (2025)", "Tua Rita", "Italy", "redigaffi"],
    ["James Suckling Top 100 Italy #68 (2025)", "San Leonardo", "Italy", "vigneti delle dolomiti"],
    ["James Suckling Top 100 Italy #69 (2025)", "Vietti", "Italy", "barolo monvigliero"],
    ["James Suckling Top 100 Italy #70 (2025)", "Giacomo Fenocchio", "Italy", "barolo villero"],
    ["James Suckling Top 100 Italy #71 (2025)", "Caparzo", "Italy", "brunello vigna la casa"],
    ["James Suckling Top 100 Italy #73 (2025)", "Isole e Olena", "Italy", "cepparello"],
    ["James Suckling Top 100 Italy #75 (2025)", "Sandrone", "Italy", "barolo le vigne"],
    ["James Suckling Top 100 Italy #76 (2025)", "Feudo Maccari", "Italy", "nero d'avola vigna guarnaschelli"],
    ["James Suckling Top 100 Italy #77 (2025)", "Ceretto", "Italy", "barolo brunate"],
    ["James Suckling Top 100 Italy #78 (2025)", "Roberto Voerzio", "Italy", "barolo cerequio"],
    ["James Suckling Top 100 Italy #79 (2025)", "Bertani", "Italy", "amarone classico"],
    ["James Suckling Top 100 Italy #80 (2025)", "Altesino", "Italy", "brunello montosoli"],
    ["James Suckling Top 100 Italy #81 (2025)", "Ornellaia", "Italy", "bolgheri superiore ornellaia"],
    ["James Suckling Top 100 Italy #82 (2025)", "Cantina Terlan", "Italy", "terlaner grande cuvee"],
    ["James Suckling Top 100 Italy #83 (2025)", "Michele Satta", "Italy", "bolgheri piastraia"],
    ["James Suckling Top 100 Italy #85 (2025)", "Tenuta San Guido", "Italy", "sassicaia"],
    ["James Suckling Top 100 Italy #86 (2025)", "Frescobaldi", "Italy", "giramonte"],
    ["James Suckling Top 100 Italy #87 (2025)", "Montevertine", "Italy", "le pergole torte"],
    ["James Suckling Top 100 Italy #88 (2025)", "Poggio di Sotto", "Italy", "brunello riserva"],
    ["James Suckling Top 100 Italy #89 (2025)", "Marchesi Antinori", "Italy", "solaia"],
    ["James Suckling Top 100 Italy #90 (2025)", "Passopisciaro", "Italy", "terre siciliane contrada r"],
    ["James Suckling Top 100 Italy #91 (2025)", "Eredi Fuligni", "Italy", "brunello riserva"],
    ["James Suckling Top 100 Italy #92 (2025)", "Grattamacco", "Italy", "bolgheri superiore"],
    ["James Suckling Top 100 Italy #93 (2025)", "Giodo", "Italy", "brunello di montalcino"],
    ["James Suckling Top 100 Italy #94 (2025)", "San Giusto a Rentennano", "Italy", "merlot la ricolma"],
    ["James Suckling Top 100 Italy #95 (2025)", "Castello Banfi", "Italy", "brunello poggio all'oro"],
    ["James Suckling Top 100 Italy #96 (2025)", "Ca' del Bosco", "Italy", "franciacorta annamaria clementi"],
    ["James Suckling Top 100 Italy #97 (2025)", "Castell'in Villa", "Italy", "chianti classico riserva"],
    ["James Suckling Top 100 Italy #98 (2025)", "Mastrojanni", "Italy", "brunello schiena d'asino"],
    ["James Suckling Top 100 Italy #99 (2025)", "Tenuta di Biserno", "Italy", "biserno"],
    ["James Suckling Top 100 Italy #100 (2025)", "Bruno Rocca", "Italy", "barbaresco rabaja"],
  ].map(([badge, producer, country, nameHint]) => ({ badge, producer, country, nameHint })),

  // ── IWC Trophy 2025 ───────────────────────────────────────────────────────
  ...[
    ["IWC Trophy (2025)", "Champagne Lanson", "France", "le clos lanson blanc de blanc"],
    ["IWC Trophy (2025)", "Champagne Henriot", "France", "cuvee 38 blanc de blancs"],
    ["IWC Trophy (2025)", "Champagne Piper-Heidsieck", "France", "essentiel blanc de noirs"],
    ["IWC Trophy (2025)", "Rare Champagne", "France", "rare millesime"],
    ["IWC Trophy (2025)", "Nyetimber", "England", "blanc de blancs"],
    ["IWC Trophy (2025)", "Nyetimber", "England", "1086"],
    ["IWC Trophy (2025)", "Roebuck Estates", "England", "rose reserve"],
    ["IWC Trophy (2025)", "House of Arras", "Australia", "museum release blanc de blancs"],
    ["IWC Trophy (2025)", "Bisol1542", "Italy", "crede brut"],
    ["IWC Trophy (2025)", "Boschendal", "South Africa", "jean le long"],
    ["IWC Trophy (2025)", "Bodegas Fabre", "Argentina", "phebus gran reserva malbec"],
    ["IWC Trophy (2025)", "Huentala", "Argentina", "la isabel"],
    ["IWC Trophy (2025)", "Tolpuddle Vineyard", "Australia", "pinot noir"],
    ["IWC Trophy (2025)", "Sister's Run", "Australia", "bethlehem block barossa cabernet"],
    ["IWC Trophy (2025)", "Charles Melton Wines", "Australia", "the kirche"],
    ["IWC Trophy (2025)", "Penfolds", "Australia", "bin 169 cabernet"],
    ["IWC Trophy (2025)", "Viña Undurraga", "Chile", "altazor"],
    ["IWC Trophy (2025)", "Maison Albert Bichot", "France", "clos de la roche hospices de beaune"],
    ["IWC Trophy (2025)", "Maison Albert Bichot", "France", "echezeaux clos frantin"],
    ["IWC Trophy (2025)", "Maison Albert Bichot", "France", "meursault les charmes"],
    ["IWC Trophy (2025)", "Maison Albert Bichot", "France", "chablis vaudesirs long-depaquit"],
    ["IWC Trophy (2025)", "M Chapoutier", "France", "crozes-hermitage les moniers"],
    ["IWC Trophy (2025)", "Château Fonplegade", "France", "fleur de fonplegade"],
    ["IWC Trophy (2025)", "JSC Telavi Wine Cellar", "Georgia", "marani kondoli saperavi"],
    ["IWC Trophy (2025)", "GD Vajra", "Italy", "barolo ravera"],
    ["IWC Trophy (2025)", "Vigna Traverso", "Italy", "schioppettino di prepotto"],
    ["IWC Trophy (2025)", "Church Road", "New Zealand", "1 merlot"],
    ["IWC Trophy (2025)", "Church Road", "New Zealand", "grand reserve chardonnay"],
    ["IWC Trophy (2025)", "Villa Maria", "New Zealand", "reserve coastal awatere sauvignon blanc"],
    ["IWC Trophy (2025)", "Weingut Birgit Eichinger", "Austria", "riesling heiligenstein"],
    ["IWC Trophy (2025)", "Beau Constantia", "South Africa", "stella"],
    ["IWC Trophy (2025)", "Domaine Sigalas", "Greece", "santorini"],
    ["IWC Trophy (2025)", "Esporão", "Portugal", "bico amarelo"],
    ["IWC Trophy (2025)", "Emilio Lustau", "Spain", "amontillado botaina"],
    ["IWC Trophy (2025)", "Emilio Lustau", "Spain", "manzanilla papirusa"],
    ["IWC Trophy (2025)", "Valdespino", "Spain", "oloroso don gonzalo"],
    ["IWC Trophy (2025)", "Bodegas Osborne", "Spain", "pedro ximenez venerable"],
    ["IWC Trophy (2025)", "Bodegas Faustino", "Spain", "i gran reserva"],
    ["IWC Trophy (2025)", "Bodegas Taron", "Spain", "cepas centenarias"],
    ["IWC Trophy (2025)", "Beaulieu Vineyard", "USA", "georges de latour private reserve"],
    ["IWC Trophy (2025)", "Tolpuddle Vineyard", "Australia", "chardonnay"],
    ["IWC Trophy (2025)", "Shaw + Smith", "Australia", "m3 chardonnay"],
    ["IWC Trophy (2025)", "Tenuta Di Capezzana", "Italy", "vinsanto capezzana"],
  ].map(([badge, producer, country, nameHint]) => ({ badge, producer, country, nameHint })),

  // ── Platter's 5 Stars 2026 ────────────────────────────────────────────────
  ...[
    ["Platter's 5 Stars (2026)", "Botanica", "South Africa", "mary delany chenin blanc"],
    ["Platter's 5 Stars (2026)", "Leeuwenkuil", "South Africa", "heritage syrah"],
    ["Platter's 5 Stars (2026)", "Alheit", "South Africa", "magnetic north"],
    ["Platter's 5 Stars (2026)", "Anysbos", "South Africa", "tesame"],
    ["Platter's 5 Stars (2026)", "Crystallum", "South Africa", "mabalel pinot noir"],
    ["Platter's 5 Stars (2026)", "Old Road", "South Africa", "pepper wind syrah"],
    ["Platter's 5 Stars (2026)", "Boschkloof", "South Africa", "epilogue"],
    ["Platter's 5 Stars (2026)", "Constantia Glen", "South Africa", "five"],
    ["Platter's 5 Stars (2026)", "Crystallum", "South Africa", "clay shales chardonnay"],
    ["Platter's 5 Stars (2026)", "Ernie Els", "South Africa", "signature"],
    ["Platter's 5 Stars (2026)", "Kleine Zalze", "South Africa", "family reserve chardonnay"],
    ["Platter's 5 Stars (2026)", "Oldenburg", "South Africa", "rondekop cabernet"],
    ["Platter's 5 Stars (2026)", "Raats", "South Africa", "vlag cabernet franc"],
    ["Platter's 5 Stars (2026)", "Sadie Family", "South Africa", "mev kirsten"],
    ["Platter's 5 Stars (2026)", "Silverthorn", "South Africa", "jewel box"],
    ["Platter's 5 Stars (2026)", "Strandveld", "South Africa", "pofadderbos sauvignon blanc"],
    ["Platter's 5 Stars (2026)", "Klein Constantia", "South Africa", "vin de constance"],
    ["Platter's 5 Stars (2026)", "Delaire Graff", "South Africa", "laurence graff reserve"],
    ["Platter's 5 Stars (2026)", "Staanspoor", "South Africa", "syrah"],
  ].map(([badge, producer, country, nameHint]) => ({ badge, producer, country, nameHint })),

  // ── Guia Penin 2026 - 100 point wines ────────────────────────────────────
  ...[
    ["Guia Penin 100 Points (2026)", "Recaredo", "Spain", "homenatge a josep mata"],
    ["Guia Penin 100 Points (2026)", "Bodegas Tradicion", "Spain", "amontillado tradicion vors"],
    ["Guia Penin 100 Points (2026)", "González Byass", "Spain", "tio pepe cuatro palmas"],
    ["Guia Penin 100 Points (2026)", "Marqués de Murrieta", "Spain", "castillo ygay"],
    ["Guia Penin 100 Points (2026)", "Artuke Bodegas y Viñedos", "Spain", "la condenada"],
    ["Guia Penin 100 Points (2026)", "Teso la Monja", "Spain", "alabaster"],
    ["Guia Penin 100 Points (2026)", "Bodegas Forjas del Salnes", "Spain", "o raio da vella albarino"],
    ["Guia Penin 100 Points (2026)", "Rafael Palacios", "Spain", "sorte o soro"],
  ].map(([badge, producer, country, nameHint]) => ({ badge, producer, country, nameHint })),

  // ── Tim Atkin SA 2024 - top scores ───────────────────────────────────────
  ...[
    ["Tim Atkin SA 100 Points (2024)", "Alheit Vineyards", "South Africa", "nautical dawn"],
    ["Tim Atkin SA 99 Points (2024)", "Porseleinberg", "South Africa", "syrah"],
    ["Tim Atkin SA 99 Points (2024)", "Sadie Family", "South Africa", "columella"],
    ["Tim Atkin SA 99 Points (2024)", "Sadie Family", "South Africa", "mev kirsten"],
  ].map(([badge, producer, country, nameHint]) => ({ badge, producer, country, nameHint })),

  // ── Wine Spectator 2024 (partial) ─────────────────────────────────────────
  ...[
    ["Wine Spectator Top 100 #1 (2024)", "Concha y Toro", "Chile", "don melchor cabernet sauvignon"],
    ["Wine Spectator Top 100 #2 (2024)", "Beaulieu Vineyard", "USA", "georges de latour"],
    ["Wine Spectator Top 100 #3 (2024)", "Marchesi Antinori", "Italy", "tignanello"],
    ["Wine Spectator Top 100 #4 (2024)", "Faust", "USA", "faust cabernet"],
    ["Wine Spectator Top 100 #5 (2024)", "Domaine du Vieux Télégraphe", "France", "chateauneuf la crau"],
    ["Wine Spectator Top 100 #6 (2024)", "G.D. Vajra", "Italy", "barolo albe"],
    ["Wine Spectator Top 100 #7 (2024)", "Ramey", "USA", "chardonnay russian river"],
    ["Wine Spectator Top 100 #8 (2024)", "La Fiorita", "Italy", "brunello di montalcino"],
    ["Wine Spectator Top 100 #10 (2024)", "Figgins Estate", "USA", "estate red blend"],
    ["Wine Spectator Top 100 #11 (2024)", "Craggy Range", "New Zealand", "sauvignon blanc te muna"],
  ].map(([badge, producer, country, nameHint]) => ({ badge, producer, country, nameHint })),

  // ── Wine Spectator 2025 (partial) ─────────────────────────────────────────
  ...[
    ["Wine Spectator Top 100 #1 (2025)", "Chateau Giscours", "France", "margaux"],
    ["Wine Spectator Top 100 #3 (2025)", "Ridge Vineyards", "USA", "lytton springs"],
    ["Wine Spectator Top 100 #6 (2025)", "Clos Apalta", "Chile", "clos apalta"],
    ["Wine Spectator Top 100 #7 (2025)", "Produttori del Barbaresco", "Italy", "barbaresco"],
    ["Wine Spectator Top 100 #13 (2025)", "Chateau Talbot", "France", "saint-julien"],
    ["Wine Spectator Top 100 #30 (2025)", "Chateau Marquis de Terme", "France", "margaux"],
  ].map(([badge, producer, country, nameHint]) => ({ badge, producer, country, nameHint })),

  // ── Gambero Rosso Tre Bicchieri 2026 ──────────────────────────────────────
  ...[
    // Tuscany key wines
    ["Gambero Rosso Tre Bicchieri (2026)", "Tenuta San Guido", "Italy", "sassicaia"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Ornellaia", "Italy", "ornellaia bolgheri bianco"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Grattamacco", "Italy", "bolgheri superiore"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Isole e Olena", "Italy", "chianti classico"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Barone Ricasoli", "Italy", "chianti classico colledila"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Castello di Volpaia", "Italy", "coltassala"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Castello di Monsanto", "Italy", "vigneto il poggio"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Castell'in Villa", "Italy", "chianti classico riserva"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Fontodi", "Italy", "flaccianello"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Castellare di Castellina", "Italy", "i sodi di san niccolo"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Il Carnasciale", "Italy", "il caberlot"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Riecine", "Italy", "la gioia"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Castello del Terriccio", "Italy", "lupicaia"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Montevertine", "Italy", "montevertine"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Poliziano", "Italy", "asinone"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Boscarelli", "Italy", "vino nobile costa grande"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Tenuta Sette Ponti", "Italy", "oreno"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Le Macchiole", "Italy", "paleo rosso"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Petra", "Italy", "petra"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Piaggia", "Italy", "poggio de colli"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Fattoria Le Pupille", "Italy", "poggio valente"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Marchesi Antinori", "Italy", "solaia"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Duemani", "Italy", "suisassi"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Tenuta di Carleone", "Italy", "uno"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Camigliano", "Italy", "brunello paesaggio inatteso"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Biondi-Santi Tenuta Greppo", "Italy", "brunello riserva"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Poggio di Sotto", "Italy", "brunello riserva"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Casanova di Neri", "Italy", "brunello tenuta nuova"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Canalicchio di Sopra", "Italy", "brunello montosoli"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Tenuta Col d'Orcia", "Italy", "brunello nastagio"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Ciacci Piccolomini D'Aragona", "Italy", "brunello pianrosso"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Giodo", "Italy", "brunello giodo"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Altesino", "Italy", "brunello montosoli"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Tenuta di Capezzana", "Italy", "carmignano trefiano"],
    // Piedmont
    ["Gambero Rosso Tre Bicchieri (2026)", "Gaja", "Italy", "barbaresco sori tildin"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Bruno Giacosa", "Italy", "barbaresco asili"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Ca' del Baio", "Italy", "barbaresco asili"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Sottimano", "Italy", "barbaresco curra"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Pio Cesare", "Italy", "barbaresco bricco di treiso"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Elio Altare", "Italy", "barolo arborina"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Vietti", "Italy", "barolo brunate"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Giacomo Fenocchio", "Italy", "barolo bussia"],
    ["Gambero Rosso Tre Bicchieri (2026)", "G. B. Burlotto", "Italy", "barolo castelletto"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Michele Chiarlo", "Italy", "barolo cerequio"],
    ["Gambero Rosso Tre Bicchieri (2026)", "G. D. Vajra", "Italy", "barolo coste di rose"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Giacomo Conterno", "Italy", "barolo francia"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Poderi Luigi Einaudi", "Italy", "barolo monvigliero"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Coppo", "Italy", "nizza pomorosso"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Giancarlo Travaglini", "Italy", "gattinara vigna ronchi"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Torraccia del Piantavigna", "Italy", "gattinara"],
    // Veneto
    ["Gambero Rosso Tre Bicchieri (2026)", "Giuseppe Quintarelli", "Italy", "amarone classico"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Tommasi Viticoltori", "Italy", "amarone de buris"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Brigaldara", "Italy", "amarone classico"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Allegrini", "Italy", "valpolicella grola"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Speri", "Italy", "valpolicella sant'urbano"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Pieropan", "Italy", "soave classico calvarino"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Suavia", "Italy", "soave monte carbonare"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Sorelle Bronca", "Italy", "valdobbiadene particella 232"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Bisol1542", "Italy", "valdobbiadene rive di campea"],
    // Alto Adige
    ["Gambero Rosso Tre Bicchieri (2026)", "Elena Walch", "Italy", "gewurztraminer kastelaz"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Tenuta J. Hofstätter", "Italy", "gewurztraminer castel rechtenthal"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Cantina Terlano", "Italy", "terlano nova domus"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Cantina Colterenzio", "Italy", "sauvignon gran lafoa"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Nals Margreid", "Italy", "pinot bianco sirmian"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Cantina Produttori San Michele Appiano", "Italy", "pinot nero sanct valentin"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Abbazia di Novacella", "Italy", "riesling praepositus"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Cantina Kurtatsch", "Italy", "cabernet freienfeld"],
    // Friuli
    ["Gambero Rosso Tre Bicchieri (2026)", "Livio Felluga", "Italy", "rosazzo terre alte"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Russiz Superiore", "Italy", "collio friulano"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Lis Neris", "Italy", "pinot grigio gris"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Vie di Romans", "Italy", "chardonnay vie di romans"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Primosic", "Italy", "collio ribolla gialla"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Vigna Traverso", "Italy", "schioppettino di prepotto"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Ronco dei Tassi", "Italy", "collio bianco fosarin"],
    // Lombardy
    ["Gambero Rosso Tre Bicchieri (2026)", "Ca' del Bosco", "Italy", "franciacorta annamaria clementi"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Guido Berlucchi", "Italy", "franciacorta nature 61"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Mosnel", "Italy", "franciacorta ebb"],
    ["Gambero Rosso Tre Bicchieri (2026)", "AR.PE.PE", "Italy", "valtellina sassella stella retica"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Nino Negri", "Italy", "sfursat 5 stelle"],
    // Campania
    ["Gambero Rosso Tre Bicchieri (2026)", "Marisa Cuomo", "Italy", "furore bianco fiorduva"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Colli di Lapio", "Italy", "fiano di avellino"],
    ["Gambero Rosso Tre Bicchieri (2026)", "I Favati", "Italy", "fiano pietramara"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Vinosia", "Italy", "greco di tufo l'ariella"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Feudi di San Gregorio", "Italy", "taurasi piano di montevergine"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Pietracupa", "Italy", "taurasi"],
    // Sicily
    ["Gambero Rosso Tre Bicchieri (2026)", "Monteleone", "Italy", "etna bianco anthemis"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Girolamo Russo", "Italy", "etna bianco san lorenzo"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Alta Mora", "Italy", "etna rosso alta mora"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Restivo", "Italy", "etna rosso contrada arcuria"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Pietradolce", "Italy", "etna rosso vigna barbagalli"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Palari", "Italy", "faro palari"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Donnafugata", "Italy", "passito di pantelleria ben rye"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Planeta", "Italy", "cerasuolo di vittoria classico dorilli"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Feudo Maccari", "Italy", "nero d'avola saia"],
    // Puglia
    ["Gambero Rosso Tre Bicchieri (2026)", "Gianfranco Fino", "Italy", "jo negroamaro"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Polvanera", "Italy", "gioia del colle primitivo"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Masca del Tacco", "Italy", "primitivo di manduria piano chiuso"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Cantine Due Palme", "Italy", "salice salentino selvarossa"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Masseria Li Veli", "Italy", "askos verdeca"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Amastuola", "Italy", "lamarossa primitivo"],
    // Sardinia
    ["Gambero Rosso Tre Bicchieri (2026)", "Argiolas", "Italy", "turriga"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Tenute Sella & Mosca", "Italy", "marchese di villamarina"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Giuseppe Gabbas", "Italy", "cannonau arbore"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Surrau", "Italy", "vermentino di gallura sciala"],
    // Umbria
    ["Gambero Rosso Tre Bicchieri (2026)", "Arnaldo Caprai", "Italy", "montefalco sagrantino 25 anni"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Antonelli San Marco", "Italy", "montefalco sagrantino chiusa di pannone"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Lungarotti", "Italy", "torgiano rubesco monticchio"],
    // Abruzzo
    ["Gambero Rosso Tre Bicchieri (2026)", "Emidio Pepe", "Italy", "trebbiano d'abruzzo"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Valle Reale", "Italy", "montepulciano d'abruzzo popoli"],
    // Lazio
    ["Gambero Rosso Tre Bicchieri (2026)", "Tenuta di Fiorano", "Italy", "fiorano rosso"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Famiglia Cotarella", "Italy", "montiano"],
    // Trentino
    ["Gambero Rosso Tre Bicchieri (2026)", "San Leonardo", "Italy", "san leonardo"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Ferrari", "Italy", "trento perle nero"],
    // Valle d'Aosta
    ["Gambero Rosso Tre Bicchieri (2026)", "Les Crêtes", "Italy", "chardonnay cuvee bois"],
    // Basilicata
    ["Gambero Rosso Tre Bicchieri (2026)", "Elena Fucci", "Italy", "aglianico titolo"],
    // Marche
    ["Gambero Rosso Tre Bicchieri (2026)", "Tenuta Villa Bucci", "Italy", "verdicchio villa bucci"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Umani Ronchi", "Italy", "verdicchio historical"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Velenosi", "Italy", "rosso piceno roggio del filare"],
    // Emilia-Romagna
    ["Gambero Rosso Tre Bicchieri (2026)", "Medici Ermete", "Italy", "reggiano lambrusco concerto"],
    ["Gambero Rosso Tre Bicchieri (2026)", "Alberto Paltrinieri", "Italy", "lambrusco di sorbara piria"],
    // Friuli extra
    ["Gambero Rosso Tre Bicchieri (2026)", "Livon", "Italy", "braide alte"],
    // Liguria
    ["Gambero Rosso Tre Bicchieri (2026)", "Cantine Lunae Bosoni", "Italy", "vermentino lunae"],
  ].map(([badge, producer, country, nameHint]) => ({ badge, producer, country, nameHint })),

  // ── Concours Mondial Grand Gold 2025 ─────────────────────────────────────
  ...[
    ["Concours Mondial Grand Gold (2025)", "Champagne Bernard Remy", "France", "champagne bernard remy rose"],
    ["Concours Mondial Grand Gold (2025)", "Centinari S.r.l.", "Italy", "centinari brut franciacorta"],
    ["Concours Mondial Grand Gold (2025)", "Estate I. & M. Argyros SA", "Greece", "estate argyros vinsanto"],
    ["Concours Mondial Grand Gold (2025)", "Champagne Tribaut-Schloesser", "France", "cuvee authentique"],
    ["Concours Mondial Grand Gold (2025)", "Ferrer Wines Group", "Spain", "vinyes de can sala cava"],
    ["Concours Mondial Grand Gold (2025)", "Celler Masroig", "Spain", "les sorts vinyes velles"],
    ["Concours Mondial Grand Gold (2025)", "Norton", "Argentina", "norton privada"],
    ["Concours Mondial Grand Gold (2025)", "Guelbenzu", "Spain", "guelbenzu evo"],
    ["Concours Mondial Grand Gold (2025)", "Ca' Rugate", "Italy", "cima caponiera amarone"],
  ].map(([badge, producer, country, nameHint]) => ({ badge, producer, country, nameHint })),

];

// ── Fast bulk matching engine ─────────────────────────────────────────────────

async function main() {
  console.log(`\nStarting fast bulk badge assignment...`);
  console.log(`Total badge assignments to process: ${ALL_ASSIGNMENTS.length}\n`);

  // Group by country for efficient querying
  const byCountry = {};
  for (const a of ALL_ASSIGNMENTS) {
    const c = a.country.toLowerCase();
    if (!byCountry[c]) byCountry[c] = [];
    byCountry[c].push(a);
  }

  let totalMatched = 0, totalUpdated = 0, totalNotFound = 0;
  const notFoundItems = [];

  for (const [country, assignments] of Object.entries(byCountry)) {
    console.log(`\nProcessing ${country} (${assignments.length} assignments)...`);

    // Fetch ALL wines for this country into memory for fast matching
    const wines = await sql`
      SELECT id, name, producer, country, badges
      FROM wines
      WHERE lower(country) = ${country}
    `;
    console.log(`  Loaded ${wines.length} wines from DB for ${country}`);

    // Build lookup index: normalized_producer -> wines[]
    const byProducer = {};
    for (const w of wines) {
      const pKey = norm(w.producer);
      if (!byProducer[pKey]) byProducer[pKey] = [];
      byProducer[pKey].push(w);
    }

    // Also build name index for fallback
    const byNameWords = {};
    for (const w of wines) {
      const words = norm(w.name).split(/\s+/).filter(t => t.length > 4);
      for (const word of words.slice(0, 4)) {
        if (!byNameWords[word]) byNameWords[word] = [];
        byNameWords[word].push(w);
      }
    }

    // For each assignment, find best matching wine
    const updates = {}; // wineId -> Set of badges to add

    for (const a of assignments) {
      const pNorm = norm(a.producer);
      const hintWords = a.nameHint.split(/\s+/).filter(t => t.length > 3);

      let match = null;
      let score = 0;

      // Strategy 1: Find by producer, then match name hint words
      const candidates = [];

      // Exact producer match
      if (byProducer[pNorm]) {
        candidates.push(...byProducer[pNorm]);
      }

      // Partial producer match (first 10 chars)
      const pShort = pNorm.slice(0, 12);
      for (const [k, v] of Object.entries(byProducer)) {
        if (k !== pNorm && (k.includes(pShort) || pShort.length > 5 && pShort.includes(k.slice(0, 8)))) {
          candidates.push(...v);
        }
      }

      if (candidates.length > 0) {
        // Score each candidate by hint word matches
        let bestScore = -1;
        for (const c of candidates) {
          const cName = norm(c.name);
          let s = 0;
          for (const word of hintWords) {
            if (cName.includes(word)) s += 2;
          }
          if (s > bestScore) {
            bestScore = s;
            match = c;
          }
        }
        if (bestScore > 0) score = bestScore;
        else if (candidates.length === 1) match = candidates[0]; // Only one, take it
        else match = null; // Multiple candidates, no hint match - skip
      }

      // Strategy 2: Fallback - search by first name hint word
      if (!match && hintWords.length > 0) {
        const firstWord = hintWords[0];
        const nameCandidates = byNameWords[firstWord] || [];
        if (nameCandidates.length === 1) {
          match = nameCandidates[0];
        } else if (nameCandidates.length > 1 && hintWords.length > 1) {
          // Find best by second word
          const secondWord = hintWords[1];
          const refined = nameCandidates.filter(w => norm(w.name).includes(secondWord));
          if (refined.length === 1) match = refined[0];
        }
      }

      if (match) {
        totalMatched++;
        if (!updates[match.id]) updates[match.id] = { badges: [...(match.badges || [])], addedBadges: new Set() };
        if (!updates[match.id].badges.includes(a.badge)) {
          updates[match.id].badges.push(a.badge);
          updates[match.id].addedBadges.add(a.badge);
        }
      } else {
        totalNotFound++;
        notFoundItems.push(`${a.producer} / ${a.nameHint} (${a.country}) -> badge: ${a.badge}`);
      }
    }

    // Bulk update
    let countryUpdated = 0;
    for (const [id, data] of Object.entries(updates)) {
      if (data.addedBadges.size > 0) {
        await sql`UPDATE wines SET badges = ${data.badges} WHERE id = ${parseInt(id)}`;
        countryUpdated++;
        totalUpdated++;
      }
    }
    console.log(`  Matched: ${totalMatched} | Updated this country: ${countryUpdated}`);
  }

  console.log('\n═══════════════════════════════════════');
  console.log('FINAL SUMMARY');
  console.log('═══════════════════════════════════════');
  console.log(`Total assignments: ${ALL_ASSIGNMENTS.length}`);
  console.log(`Matched: ${totalMatched}`);
  console.log(`Wines updated: ${totalUpdated}`);
  console.log(`Not found: ${totalNotFound}`);

  if (notFoundItems.length > 0) {
    console.log('\nNot found (first 40):');
    notFoundItems.slice(0, 40).forEach(item => console.log('  -', item));
  }

  // Final count
  const badgedCount = await sql`SELECT COUNT(*) FROM wines WHERE array_length(badges, 1) > 0`;
  console.log(`\nTotal wines with badges in DB: ${badgedCount[0].count}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
