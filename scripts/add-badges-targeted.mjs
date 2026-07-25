#!/usr/bin/env node
// Targeted badge assignment using producer-name based SQL queries
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

function norm(str) {
  if (!str) return '';
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/['']/g, "'").trim();
}

// All badge assignments: [badge, producer_search, country, name_hint, name_hint2?]
// producer_search: used in ILIKE '%producer_search%'
// name_hint: first key word in wine name
// name_hint2: second key word (optional, for disambiguation)
const ASSIGNMENTS = [
  // ── VinePair 50 Best 2024 ────────────────────────────────────────────────
  ["VinePair 50 Best Wines (2024)", "von buhl", "Germany", "armand", "kabinett"],
  ["VinePair 50 Best Wines (2024)", "rosi schuster", "Austria", "sankt laurent", null],
  ["VinePair 50 Best Wines (2024)", "pedro parra", "Chile", "cinsault", null],
  ["VinePair 50 Best Wines (2024)", "carobbio", "Italy", "chianti classico", "riserva"],
  ["VinePair 50 Best Wines (2024)", "vigna lenuzza", "Italy", "schioppettino", null],
  ["VinePair 50 Best Wines (2024)", "stefano occhetti", "Italy", "langhe nebbiolo", null],
  ["VinePair 50 Best Wines (2024)", "arnaud lambert", "France", "breze", "saumur"],
  ["VinePair 50 Best Wines (2024)", "raffault", "France", "chinon", null],
  ["VinePair 50 Best Wines (2024)", "belliviere", "France", "vieilles vignes", null],
  ["VinePair 50 Best Wines (2024)", "lafleur-gazin", "France", "pomerol", null],
  ["VinePair 50 Best Wines (2024)", "moulin-a-vent", "France", "couvent", null],
  ["VinePair 50 Best Wines (2024)", "fowles", "Australia", "ladies who shoot", null],
  ["VinePair 50 Best Wines (2024)", "louis m. martini", "USA", "monte rosso", null],
  ["VinePair 50 Best Wines (2024)", "failla", "USA", "sonoma coast chardonnay", null],
  ["VinePair 50 Best Wines (2024)", "arnot-roberts", "USA", "syrah", "sonoma coast"],
  ["VinePair 50 Best Wines (2024)", "santi", "Italy", "amarone", "carlo"],

  // ── Vinous Top 100 2024 ──────────────────────────────────────────────────
  ["Vinous Top 100 #1 (2024)", "philip togni", "USA", "cabernet sauvignon", null],
  ["Vinous Top 100 #2 (2024)", "giaconda", "Australia", "chardonnay", "estate"],
  ["Vinous Top 100 #3 (2024)", "pichon longueville comtesse", "France", "pichon", null],
  ["Vinous Top 100 #4 (2024)", "la ca' nova", "Italy", "barbaresco montefico", null],
  ["Vinous Top 100 #5 (2024)", "hirsch", "USA", "raschen ridge", null],
  ["Vinous Top 100 #6 (2024)", "cheval des andes", "Argentina", "cheval des andes", null],
  ["Vinous Top 100 #7 (2024)", "dominio de pingus", "Spain", "psi", null],
  ["Vinous Top 100 #8 (2024)", "tignanello", "Italy", "tignanello", null],
  ["Vinous Top 100 #9 (2024)", "smith haut lafitte", "France", "blanc", null],
  ["Vinous Top 100 #10 (2024)", "lismore estate", "Australia", "chardonnay reserve", null],
  ["Vinous Top 100 #11 (2024)", "le boncie", "Italy", "le trame", null],
  ["Vinous Top 100 #12 (2024)", "noemia", "Argentina", "noemia", null],
  ["Vinous Top 100 #13 (2024)", "dumol", "USA", "macintyre", null],
  ["Vinous Top 100 #14 (2024)", "maitre de chai", "USA", "gala vineyard", null],
  ["Vinous Top 100 #15 (2024)", "samuel billaud", "France", "vaudesir", null],
  ["Vinous Top 100 #16 (2024)", "vine hill ranch", "USA", "vine hill ranch", null],
  ["Vinous Top 100 #17 (2024)", "les carmes haut-brion", "France", "les carmes", null],
  ["Vinous Top 100 #18 (2024)", "tablas creek", "USA", "esprit de tablas", null],
  ["Vinous Top 100 #19 (2024)", "fontodi", "Italy", "vigna del sorbo", null],
  ["Vinous Top 100 #20 (2024)", "ridge vineyards", "USA", "lytton springs", null],
  ["Vinous Top 100 #21 (2024)", "wynns", "Australia", "john riddoch", null],
  ["Vinous Top 100 #22 (2024)", "sadie family", "South Africa", "palladius", null],
  ["Vinous Top 100 #23 (2024)", "chateau canon", "France", "canon", null],
  ["Vinous Top 100 #24 (2024)", "aubert", "USA", "cix estate", null],
  ["Vinous Top 100 #25 (2024)", "vinedo chadwick", "Chile", "chadwick", null],
  ["Vinous Top 100 #26 (2024)", "greywacke", "New Zealand", "wild sauvignon", null],
  ["Vinous Top 100 #27 (2024)", "saint cosme", "France", "gigondas", null],
  ["Vinous Top 100 #28 (2024)", "eglise-clinet", "France", "eglise-clinet", null],
  ["Vinous Top 100 #29 (2024)", "trediberri", "Italy", "barolo berri", null],
  ["Vinous Top 100 #30 (2024)", "vega sicilia", "Spain", "unico", null],
  ["Vinous Top 100 #31 (2024)", "le potazzine", "Italy", "brunello di montalcino", null],
  ["Vinous Top 100 #32 (2024)", "tiberio", "Italy", "trebbiano", "fonte canale"],
  ["Vinous Top 100 #33 (2024)", "cornell vineyards", "USA", "cabernet sauvignon", null],
  ["Vinous Top 100 #34 (2024)", "mount eden", "USA", "pinot noir estate", null],
  ["Vinous Top 100 #35 (2024)", "realm cellars", "USA", "the bard", null],
  ["Vinous Top 100 #36 (2024)", "alzinger", "Austria", "grüner veltliner loibenberg", null],
  ["Vinous Top 100 #37 (2024)", "el enemigo", "Argentina", "gran enemigo", "cabernet franc"],
  ["Vinous Top 100 #38 (2024)", "clape", "France", "cornas", null],
  ["Vinous Top 100 #39 (2024)", "calon segur", "France", "calon segur", null],
  ["Vinous Top 100 #40 (2024)", "garage wine", "Chile", "carignan", null],
  ["Vinous Top 100 #61 (2024)", "lopez de heredia", "Spain", "tondonia blanco", null],
  ["Vinous Top 100 #62 (2024)", "riccitelli", "Argentina", "vinedos de montana", null],
  ["Vinous Top 100 #63 (2024)", "moric", "Austria", "blaufrankisch", "lutzmannsburg"],
  ["Vinous Top 100 #64 (2024)", "pierre peters", "France", "blanc de blancs", null],
  ["Vinous Top 100 #65 (2024)", "k vintners", "USA", "syrah", "hidden"],
  ["Vinous Top 100 #66 (2024)", "john duval", "Australia", "annexus", null],
  ["Vinous Top 100 #67 (2024)", "tenuta san leonardo", "Italy", "san leonardo", null],
  ["Vinous Top 100 #68 (2024)", "emiliana", "Chile", "coyam", null],
  ["Vinous Top 100 #69 (2024)", "bouzereau", "France", "meursault perrieres", null],
  ["Vinous Top 100 #70 (2024)", "kesseler", "Germany", "assmannshausen", null],
  ["Vinous Top 100 #71 (2024)", "yalumba", "Australia", "octavius", null],
  ["Vinous Top 100 #72 (2024)", "tabali", "Chile", "dom", null],
  ["Vinous Top 100 #73 (2024)", "boudignon", "France", "savennieres", null],
  ["Vinous Top 100 #74 (2024)", "belgrave", "France", "belgrave", null],
  ["Vinous Top 100 #75 (2024)", "piaggia", "Italy", "carmignano riserva", null],
  ["Vinous Top 100 #76 (2024)", "rudi pichler", "Austria", "achleiten", null],
  ["Vinous Top 100 #77 (2024)", "gunderloch", "Germany", "nackenheimer rothenberg", null],
  ["Vinous Top 100 #78 (2024)", "le pianelle", "Italy", "bramaterra", null],
  ["Vinous Top 100 #79 (2024)", "speri", "Italy", "amarone", "sant'urbano"],
  ["Vinous Top 100 #80 (2024)", "il poggione", "Italy", "brunello di montalcino", null],
  ["Vinous Top 100 #81 (2024)", "royal tokaji", "Hungary", "mezes maly", null],
  ["Vinous Top 100 #82 (2024)", "pierre peters", "France", "l'esprit", null],
  ["Vinous Top 100 #83 (2024)", "l'aventure", "USA", "estate cuvee", null],
  ["Vinous Top 100 #84 (2024)", "albert boxler", "France", "eckberg sommerberg", null],
  ["Vinous Top 100 #85 (2024)", "sottimano", "Italy", "barbaresco curra", null],
  ["Vinous Top 100 #86 (2024)", "muga", "Spain", "prado enea", null],
  ["Vinous Top 100 #87 (2024)", "terre nere", "Italy", "la vigna di don peppino", null],
  ["Vinous Top 100 #88 (2024)", "arterberry maresh", "USA", "maresh vineyard", null],
  ["Vinous Top 100 #89 (2024)", "tenuta di carleone", "Italy", "uno", null],
  ["Vinous Top 100 #90 (2024)", "senorio de san vicente", "Spain", "senorio", null],
  ["Vinous Top 100 #91 (2024)", "diatom", "USA", "chardonnay", null],
  ["Vinous Top 100 #92 (2024)", "galardi", "Italy", "terra di lavoro", null],
  ["Vinous Top 100 #93 (2024)", "bilancia", "New Zealand", "tiratore", null],
  ["Vinous Top 100 #94 (2024)", "pierre gonon", "France", "saint-joseph", null],
  ["Vinous Top 100 #95 (2024)", "terlano", "Italy", "pinot bianco vorberg", null],
  ["Vinous Top 100 #96 (2024)", "andrew will", "USA", "sorella", null],
  ["Vinous Top 100 #97 (2024)", "burgaud", "France", "morgon", null],
  ["Vinous Top 100 #98 (2024)", "best's wines", "Australia", "riesling great western", null],
  ["Vinous Top 100 #99 (2024)", "sartarelli", "Italy", "verdicchio balciana", null],
  ["Vinous Top 100 #100 (2024)", "pago de carraovejas", "Spain", "ribera del duero", null],

  // ── James Suckling Italy 2025 ─────────────────────────────────────────────
  ["James Suckling Top 100 Italy #1 (2025)", "terre nere", "Italy", "etna rosso san lorenzo", null],
  ["James Suckling Top 100 Italy #2 (2025)", "pieropan", "Italy", "soave classico la rocca", null],
  ["James Suckling Top 100 Italy #3 (2025)", "ciacci piccolomini", "Italy", "brunello pianrosso", null],
  ["James Suckling Top 100 Italy #4 (2025)", "marcarini", "Italy", "barolo brunate", null],
  ["James Suckling Top 100 Italy #5 (2025)", "petrolo", "Italy", "boggina", null],
  ["James Suckling Top 100 Italy #6 (2025)", "castello di ama", "Italy", "chianti classico gran selezione san lorenzo", null],
  ["James Suckling Top 100 Italy #7 (2025)", "foradori", "Italy", "pinot grigio fuoripista", null],
  ["James Suckling Top 100 Italy #8 (2025)", "maugeri", "Italy", "etna bianco contrada praino", null],
  ["James Suckling Top 100 Italy #9 (2025)", "boscarelli", "Italy", "vino nobile costa grande", null],
  ["James Suckling Top 100 Italy #10 (2025)", "les cretes", "Italy", "pinot nero revei", null],
  ["James Suckling Top 100 Italy #11 (2025)", "bibi graetz", "Italy", "testamatta", null],
  ["James Suckling Top 100 Italy #12 (2025)", "paolo scavino", "Italy", "barolo bussia vigna fantini", null],
  ["James Suckling Top 100 Italy #13 (2025)", "capezzana", "Italy", "vin santo", null],
  ["James Suckling Top 100 Italy #14 (2025)", "hofstatter", "Italy", "sauvignon oberkerschbaum", null],
  ["James Suckling Top 100 Italy #15 (2025)", "livio sassetti", "Italy", "brunello riserva", null],
  ["James Suckling Top 100 Italy #16 (2025)", "tenuta sette ponti", "Italy", "oreno", null],
  ["James Suckling Top 100 Italy #17 (2025)", "pira", "Italy", "barolo mosconi", null],
  ["James Suckling Top 100 Italy #18 (2025)", "marengo", "Italy", "barolo bricco delle viole", null],
  ["James Suckling Top 100 Italy #19 (2025)", "rosset", "Italy", "sopraquota", null],
  ["James Suckling Top 100 Italy #20 (2025)", "capichera", "Italy", "vermentino", "vigna'ngena"],
  ["James Suckling Top 100 Italy #21 (2025)", "giodo", "Italy", "nerello mascalese alberelli", null],
  ["James Suckling Top 100 Italy #22 (2025)", "travaglini", "Italy", "gattinara", null],
  ["James Suckling Top 100 Italy #23 (2025)", "barone ricasoli", "Italy", "chianti classico colledila", null],
  ["James Suckling Top 100 Italy #24 (2025)", "attems", "Italy", "sauvignon cicinis collio", null],
  ["James Suckling Top 100 Italy #25 (2025)", "mastroberardino", "Italy", "taurasi radici", null],
  ["James Suckling Top 100 Italy #26 (2025)", "schiopetto", "Italy", "pinot grigio collio", null],
  ["James Suckling Top 100 Italy #28 (2025)", "pievalta", "Italy", "verdicchio san paolo", null],
  ["James Suckling Top 100 Italy #30 (2025)", "bruno giacosa", "Italy", "barbaresco asili", null],
  ["James Suckling Top 100 Italy #31 (2025)", "carlo giacosa", "Italy", "barbaresco montefico", null],
  ["James Suckling Top 100 Italy #32 (2025)", "valdicava", "Italy", "brunello madonna del piano", null],
  ["James Suckling Top 100 Italy #33 (2025)", "palladino", "Italy", "barolo parafada", null],
  ["James Suckling Top 100 Italy #35 (2025)", "castiglion del bosco", "Italy", "brunello millecento", null],
  ["James Suckling Top 100 Italy #36 (2025)", "pietradolce", "Italy", "etna rosso rampante", null],
  ["James Suckling Top 100 Italy #38 (2025)", "jermann", "Italy", "dove i sogni", null],
  ["James Suckling Top 100 Italy #39 (2025)", "il marroneto", "Italy", "brunello madonna delle grazie", null],
  ["James Suckling Top 100 Italy #41 (2025)", "elena walch", "Italy", "chardonnay castel ringberg", null],
  ["James Suckling Top 100 Italy #42 (2025)", "le pupille", "Italy", "saffredi", null],
  ["James Suckling Top 100 Italy #44 (2025)", "conterno fantino", "Italy", "barolo ginestra vigna del gris", null],
  ["James Suckling Top 100 Italy #45 (2025)", "castello di monsanto", "Italy", "chianti classico vigneto il poggio", null],
  ["James Suckling Top 100 Italy #46 (2025)", "michele chiarlo", "Italy", "barolo tortoniano", null],
  ["James Suckling Top 100 Italy #48 (2025)", "massolino", "Italy", "barolo parafada", null],
  ["James Suckling Top 100 Italy #50 (2025)", "g.d. vajra", "Italy", "barolo baudana", null],
  ["James Suckling Top 100 Italy #52 (2025)", "ettore germano", "Italy", "barolo vignarionda", null],
  ["James Suckling Top 100 Italy #54 (2025)", "marchesi di barolo", "Italy", "barolo riserva", null],
  ["James Suckling Top 100 Italy #55 (2025)", "dal forno", "Italy", "valpolicella monte lodoletta", null],
  ["James Suckling Top 100 Italy #56 (2025)", "inama", "Italy", "soave foscarino", null],
  ["James Suckling Top 100 Italy #57 (2025)", "siro pacenti", "Italy", "brunello vecchie vigne", null],
  ["James Suckling Top 100 Italy #59 (2025)", "valentini", "Italy", "trebbiano d'abruzzo", null],
  ["James Suckling Top 100 Italy #60 (2025)", "colterenzio", "Italy", "sauvignon gran lafoa", null],
  ["James Suckling Top 100 Italy #61 (2025)", "aldo conterno", "Italy", "barolo colonnello", null],
  ["James Suckling Top 100 Italy #62 (2025)", "girolamo russo", "Italy", "etna rosso san lorenzo", null],
  ["James Suckling Top 100 Italy #63 (2025)", "g.b. burlotto", "Italy", "barolo monvigliero", null],
  ["James Suckling Top 100 Italy #64 (2025)", "casanova di neri", "Italy", "brunello giovanni neri", null],
  ["James Suckling Top 100 Italy #65 (2025)", "renato ratti", "Italy", "barolo marcenasco", null],
  ["James Suckling Top 100 Italy #67 (2025)", "tua rita", "Italy", "redigaffi", null],
  ["James Suckling Top 100 Italy #68 (2025)", "san leonardo", "Italy", "vigneti delle dolomiti", null],
  ["James Suckling Top 100 Italy #69 (2025)", "vietti", "Italy", "barolo monvigliero", null],
  ["James Suckling Top 100 Italy #70 (2025)", "giacomo fenocchio", "Italy", "barolo villero", null],
  ["James Suckling Top 100 Italy #71 (2025)", "caparzo", "Italy", "brunello vigna la casa", null],
  ["James Suckling Top 100 Italy #73 (2025)", "isole e olena", "Italy", "cepparello", null],
  ["James Suckling Top 100 Italy #75 (2025)", "sandrone", "Italy", "barolo le vigne", null],
  ["James Suckling Top 100 Italy #76 (2025)", "feudo maccari", "Italy", "nero d'avola vigna guarnaschelli", null],
  ["James Suckling Top 100 Italy #77 (2025)", "ceretto", "Italy", "barolo brunate", null],
  ["James Suckling Top 100 Italy #78 (2025)", "roberto voerzio", "Italy", "barolo cerequio", null],
  ["James Suckling Top 100 Italy #79 (2025)", "bertani", "Italy", "amarone classico", null],
  ["James Suckling Top 100 Italy #80 (2025)", "altesino", "Italy", "brunello montosoli", null],
  ["James Suckling Top 100 Italy #81 (2025)", "ornellaia", "Italy", "bolgheri superiore ornellaia", null],
  ["James Suckling Top 100 Italy #82 (2025)", "cantina terlan", "Italy", "terlaner grande cuvee", null],
  ["James Suckling Top 100 Italy #83 (2025)", "michele satta", "Italy", "bolgheri superiore piastraia", null],
  ["James Suckling Top 100 Italy #85 (2025)", "tenuta san guido", "Italy", "sassicaia", null],
  ["James Suckling Top 100 Italy #86 (2025)", "frescobaldi", "Italy", "giramonte", null],
  ["James Suckling Top 100 Italy #87 (2025)", "montevertine", "Italy", "le pergole torte", null],
  ["James Suckling Top 100 Italy #88 (2025)", "poggio di sotto", "Italy", "brunello riserva", null],
  ["James Suckling Top 100 Italy #89 (2025)", "marchesi antinori", "Italy", "solaia", null],
  ["James Suckling Top 100 Italy #90 (2025)", "passopisciaro", "Italy", "terre siciliane contrada", null],
  ["James Suckling Top 100 Italy #91 (2025)", "fuligni", "Italy", "brunello riserva", null],
  ["James Suckling Top 100 Italy #92 (2025)", "grattamacco", "Italy", "bolgheri superiore", null],
  ["James Suckling Top 100 Italy #93 (2025)", "giodo", "Italy", "brunello di montalcino", null],
  ["James Suckling Top 100 Italy #94 (2025)", "san giusto a rentennano", "Italy", "merlot la ricolma", null],
  ["James Suckling Top 100 Italy #95 (2025)", "castello banfi", "Italy", "brunello poggio all'oro", null],
  ["James Suckling Top 100 Italy #96 (2025)", "ca' del bosco", "Italy", "franciacorta annamaria clementi", null],
  ["James Suckling Top 100 Italy #97 (2025)", "castell'in villa", "Italy", "chianti classico riserva", null],
  ["James Suckling Top 100 Italy #98 (2025)", "mastrojanni", "Italy", "brunello schiena d'asino", null],
  ["James Suckling Top 100 Italy #99 (2025)", "tenuta di biserno", "Italy", "biserno", null],
  ["James Suckling Top 100 Italy #100 (2025)", "bruno rocca", "Italy", "barbaresco rabaja", null],

  // ── IWC Trophy 2025 ───────────────────────────────────────────────────────
  ["IWC Trophy (2025)", "lanson", "France", "le clos lanson", "blanc de blanc"],
  ["IWC Trophy (2025)", "henriot", "France", "cuvee 38", "blanc de blancs"],
  ["IWC Trophy (2025)", "piper-heidsieck", "France", "essentiel blanc de noirs", null],
  ["IWC Trophy (2025)", "rare champagne", "France", "rare millesime", null],
  ["IWC Trophy (2025)", "nyetimber", "England", "blanc de blancs", null],
  ["IWC Trophy (2025)", "nyetimber", "England", "1086", null],
  ["IWC Trophy (2025)", "roebuck estates", "England", "rose reserve", null],
  ["IWC Trophy (2025)", "house of arras", "Australia", "museum release", "blanc de blancs"],
  ["IWC Trophy (2025)", "bisol", "Italy", "crede brut", null],
  ["IWC Trophy (2025)", "boschendal", "South Africa", "jean le long", null],
  ["IWC Trophy (2025)", "bodegas fabre", "Argentina", "phebus gran reserva malbec", null],
  ["IWC Trophy (2025)", "huentala", "Argentina", "la isabel estate", null],
  ["IWC Trophy (2025)", "tolpuddle", "Australia", "pinot noir", null],
  ["IWC Trophy (2025)", "sister's run", "Australia", "bethlehem block", null],
  ["IWC Trophy (2025)", "charles melton", "Australia", "the kirche", null],
  ["IWC Trophy (2025)", "penfolds", "Australia", "bin 169", null],
  ["IWC Trophy (2025)", "undurraga", "Chile", "altazor", null],
  ["IWC Trophy (2025)", "albert bichot", "France", "clos de la roche", "hospices de beaune"],
  ["IWC Trophy (2025)", "albert bichot", "France", "echezeaux", "clos frantin"],
  ["IWC Trophy (2025)", "albert bichot", "France", "meursault", "les charmes"],
  ["IWC Trophy (2025)", "albert bichot", "France", "chablis grand cru vaudesirs", null],
  ["IWC Trophy (2025)", "chapoutier", "France", "crozes-hermitage les moniers", null],
  ["IWC Trophy (2025)", "fonplegade", "France", "fleur de fonplegade", null],
  ["IWC Trophy (2025)", "telavi wine cellar", "Georgia", "saperavi", null],
  ["IWC Trophy (2025)", "gd vajra", "Italy", "barolo ravera", null],
  ["IWC Trophy (2025)", "vigna traverso", "Italy", "schioppettino di prepotto", null],
  ["IWC Trophy (2025)", "church road", "New Zealand", "1 merlot", null],
  ["IWC Trophy (2025)", "church road", "New Zealand", "grand reserve chardonnay", null],
  ["IWC Trophy (2025)", "villa maria", "New Zealand", "reserve coastal awatere sauvignon", null],
  ["IWC Trophy (2025)", "birgit eichinger", "Austria", "riesling heiligenstein", null],
  ["IWC Trophy (2025)", "beau constantia", "South Africa", "stella", null],
  ["IWC Trophy (2025)", "domaine sigalas", "Greece", "santorini", null],
  ["IWC Trophy (2025)", "esporao", "Portugal", "bico amarelo", null],
  ["IWC Trophy (2025)", "emilio lustau", "Spain", "amontillado botaina", null],
  ["IWC Trophy (2025)", "emilio lustau", "Spain", "manzanilla papirusa", null],
  ["IWC Trophy (2025)", "valdespino", "Spain", "oloroso don gonzalo", null],
  ["IWC Trophy (2025)", "osborne", "Spain", "pedro ximenez venerable", null],
  ["IWC Trophy (2025)", "bodegas faustino", "Spain", "gran reserva", null],
  ["IWC Trophy (2025)", "bodegas taron", "Spain", "cepas centenarias", null],
  ["IWC Trophy (2025)", "beaulieu vineyard", "USA", "georges de latour", null],
  ["IWC Trophy (2025)", "tolpuddle", "Australia", "chardonnay", null],
  ["IWC Trophy (2025)", "shaw + smith", "Australia", "m3 chardonnay", null],
  ["IWC Trophy (2025)", "capezzana", "Italy", "vinsanto", null],

  // ── Platter's 5 Stars 2026 ────────────────────────────────────────────────
  ["Platter's 5 Stars (2026)", "botanica", "South Africa", "mary delany chenin blanc", null],
  ["Platter's 5 Stars (2026)", "leeuwenkuil", "South Africa", "heritage syrah", null],
  ["Platter's 5 Stars (2026)", "alheit", "South Africa", "magnetic north", null],
  ["Platter's 5 Stars (2026)", "anysbos", "South Africa", "tesame", null],
  ["Platter's 5 Stars (2026)", "crystallum", "South Africa", "mabalel pinot noir", null],
  ["Platter's 5 Stars (2026)", "old road wine", "South Africa", "pepper wind syrah", null],
  ["Platter's 5 Stars (2026)", "boschkloof", "South Africa", "epilogue", null],
  ["Platter's 5 Stars (2026)", "constantia glen", "South Africa", "five", null],
  ["Platter's 5 Stars (2026)", "crystallum", "South Africa", "clay shales chardonnay", null],
  ["Platter's 5 Stars (2026)", "ernie els", "South Africa", "signature", null],
  ["Platter's 5 Stars (2026)", "kleine zalze", "South Africa", "family reserve chardonnay", null],
  ["Platter's 5 Stars (2026)", "oldenburg", "South Africa", "rondekop", null],
  ["Platter's 5 Stars (2026)", "raats", "South Africa", "vlag cabernet franc", null],
  ["Platter's 5 Stars (2026)", "sadie family", "South Africa", "mev kirsten", null],
  ["Platter's 5 Stars (2026)", "silverthorn", "South Africa", "jewel box", null],
  ["Platter's 5 Stars (2026)", "strandveld", "South Africa", "pofadderbos", null],
  ["Platter's 5 Stars (2026)", "klein constantia", "South Africa", "vin de constance", null],
  ["Platter's 5 Stars (2026)", "delaire graff", "South Africa", "laurence graff reserve", null],
  ["Platter's 5 Stars (2026)", "staanspoor", "South Africa", "syrah", null],

  // ── Guia Penin 2026 100pts ────────────────────────────────────────────────
  ["Guia Penin 100 Points (2026)", "recaredo", "Spain", "homenatge a josep mata", null],
  ["Guia Penin 100 Points (2026)", "tradicion", "Spain", "amontillado tradicion vors", null],
  ["Guia Penin 100 Points (2026)", "gonzalez byass", "Spain", "tio pepe cuatro palmas", null],
  ["Guia Penin 100 Points (2026)", "marques de murrieta", "Spain", "castillo ygay", null],
  ["Guia Penin 100 Points (2026)", "artuke", "Spain", "la condenada", null],
  ["Guia Penin 100 Points (2026)", "teso la monja", "Spain", "alabaster", null],
  ["Guia Penin 100 Points (2026)", "forjas del salnes", "Spain", "o raio da vella", null],
  ["Guia Penin 100 Points (2026)", "rafael palacios", "Spain", "sorte o soro", null],

  // ── Tim Atkin SA 2024 ─────────────────────────────────────────────────────
  ["Tim Atkin SA 100 Points (2024)", "alheit", "South Africa", "nautical dawn", null],
  ["Tim Atkin SA 99 Points (2024)", "porseleinberg", "South Africa", "syrah", null],
  ["Tim Atkin SA 99 Points (2024)", "sadie family", "South Africa", "columella", null],
  ["Tim Atkin SA 99 Points (2024)", "sadie family", "South Africa", "mev kirsten", null],

  // ── Wine Spectator 2024 ───────────────────────────────────────────────────
  ["Wine Spectator Top 100 #1 (2024)", "concha y toro", "Chile", "don melchor", null],
  ["Wine Spectator Top 100 #2 (2024)", "beaulieu vineyard", "USA", "georges de latour", null],
  ["Wine Spectator Top 100 #3 (2024)", "antinori", "Italy", "tignanello", null],
  ["Wine Spectator Top 100 #4 (2024)", "faust", "USA", "faust cabernet", null],
  ["Wine Spectator Top 100 #5 (2024)", "vieux telegraphe", "France", "chateauneuf", "la crau"],
  ["Wine Spectator Top 100 #6 (2024)", "g.d. vajra", "Italy", "barolo albe", null],
  ["Wine Spectator Top 100 #7 (2024)", "ramey", "USA", "chardonnay russian river", null],
  ["Wine Spectator Top 100 #8 (2024)", "la fiorita", "Italy", "brunello di montalcino", null],
  ["Wine Spectator Top 100 #10 (2024)", "figgins estate", "USA", "estate red blend", null],
  ["Wine Spectator Top 100 #11 (2024)", "craggy range", "New Zealand", "sauvignon blanc te muna", null],

  // ── Wine Spectator 2025 ───────────────────────────────────────────────────
  ["Wine Spectator Top 100 #1 (2025)", "giscours", "France", "margaux", null],
  ["Wine Spectator Top 100 #3 (2025)", "ridge vineyards", "USA", "lytton springs", null],
  ["Wine Spectator Top 100 #6 (2025)", "clos apalta", "Chile", "clos apalta", null],
  ["Wine Spectator Top 100 #7 (2025)", "produttori del barbaresco", "Italy", "barbaresco", null],
  ["Wine Spectator Top 100 #13 (2025)", "chateau talbot", "France", "saint-julien", null],
  ["Wine Spectator Top 100 #30 (2025)", "marquis de terme", "France", "margaux", null],

  // ── Gambero Rosso 2026 ────────────────────────────────────────────────────
  ["Gambero Rosso Tre Bicchieri (2026)", "tenuta san guido", "Italy", "sassicaia", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "ornellaia", "Italy", "ornellaia bianco", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "grattamacco", "Italy", "bolgheri superiore", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "isole e olena", "Italy", "chianti classico", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "barone ricasoli", "Italy", "chianti classico colledila", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "castello di volpaia", "Italy", "coltassala", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "castello di monsanto", "Italy", "vigneto il poggio", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "castell'in villa", "Italy", "chianti classico riserva", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "fontodi", "Italy", "flaccianello", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "castellare di castellina", "Italy", "i sodi di san niccolo", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "il carnasciale", "Italy", "il caberlot", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "riecine", "Italy", "la gioia", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "castello del terriccio", "Italy", "lupicaia", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "montevertine", "Italy", "montevertine", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "poliziano", "Italy", "asinone", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "boscarelli", "Italy", "vino nobile costa grande", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "tenuta sette ponti", "Italy", "oreno", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "le macchiole", "Italy", "paleo", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "petra", "Italy", "petra", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "piaggia", "Italy", "poggio de colli", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "fattoria le pupille", "Italy", "poggio valente", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "marchesi antinori", "Italy", "solaia", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "duemani", "Italy", "suisassi", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "tenuta di carleone", "Italy", "uno", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "camigliano", "Italy", "brunello paesaggio inatteso", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "biondi-santi", "Italy", "brunello riserva", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "poggio di sotto", "Italy", "brunello riserva", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "casanova di neri", "Italy", "brunello tenuta nuova", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "canalicchio di sopra", "Italy", "brunello montosoli", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "tenuta col d'orcia", "Italy", "brunello nastagio", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "ciacci piccolomini", "Italy", "brunello pianrosso", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "giodo", "Italy", "brunello giodo", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "altesino", "Italy", "brunello montosoli", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "tenuta di capezzana", "Italy", "carmignano trefiano", null],
  // Piedmont
  ["Gambero Rosso Tre Bicchieri (2026)", "gaja", "Italy", "barbaresco sori tildin", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "bruno giacosa", "Italy", "barbaresco asili", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "ca' del baio", "Italy", "barbaresco asili", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "sottimano", "Italy", "barbaresco curra", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "pio cesare", "Italy", "barbaresco bricco di treiso", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "elio altare", "Italy", "barolo arborina", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "vietti", "Italy", "barolo brunate", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "giacomo fenocchio", "Italy", "barolo bussia", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "g. b. burlotto", "Italy", "barolo castelletto", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "michele chiarlo", "Italy", "barolo cerequio", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "g. d. vajra", "Italy", "barolo coste di rose", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "giacomo conterno", "Italy", "barolo francia", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "poderi luigi einaudi", "Italy", "barolo monvigliero", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "coppo", "Italy", "nizza pomorosso", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "travaglini", "Italy", "gattinara", null],
  // Veneto
  ["Gambero Rosso Tre Bicchieri (2026)", "giuseppe quintarelli", "Italy", "amarone classico", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "tommasi", "Italy", "amarone de buris", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "brigaldara", "Italy", "amarone classico", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "allegrini", "Italy", "valpolicella grola", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "speri", "Italy", "valpolicella sant'urbano", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "pieropan", "Italy", "soave classico calvarino", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "suavia", "Italy", "soave monte carbonare", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "sorelle bronca", "Italy", "valdobbiadene particella 232", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "bisol", "Italy", "valdobbiadene rive di campea", null],
  // Alto Adige
  ["Gambero Rosso Tre Bicchieri (2026)", "elena walch", "Italy", "gewurztraminer kastelaz", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "hofstatter", "Italy", "gewurztraminer castel rechtenthal", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "cantina terlano", "Italy", "terlano nova domus", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "cantina colterenzio", "Italy", "sauvignon gran lafoa", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "nals margreid", "Italy", "pinot bianco sirmian", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "san michele appiano", "Italy", "pinot nero sanct valentin", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "abbazia di novacella", "Italy", "riesling praepositus", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "cantina kurtatsch", "Italy", "cabernet freienfeld", null],
  // Friuli
  ["Gambero Rosso Tre Bicchieri (2026)", "livio felluga", "Italy", "rosazzo terre alte", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "russiz superiore", "Italy", "collio friulano", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "lis neris", "Italy", "pinot grigio gris", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "vie di romans", "Italy", "chardonnay", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "primosic", "Italy", "collio ribolla gialla", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "vigna traverso", "Italy", "schioppettino di prepotto", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "ronco dei tassi", "Italy", "collio bianco fosarin", null],
  // Lombardy
  ["Gambero Rosso Tre Bicchieri (2026)", "ca' del bosco", "Italy", "franciacorta annamaria clementi", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "berlucchi", "Italy", "franciacorta nature 61", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "mosnel", "Italy", "franciacorta ebb", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "ar.pe.pe", "Italy", "valtellina sassella stella retica", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "nino negri", "Italy", "sfursat 5 stelle", null],
  // Campania
  ["Gambero Rosso Tre Bicchieri (2026)", "marisa cuomo", "Italy", "furore bianco fiorduva", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "colli di lapio", "Italy", "fiano di avellino", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "i favati", "Italy", "fiano pietramara", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "vinosia", "Italy", "greco di tufo l'ariella", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "feudi di san gregorio", "Italy", "taurasi piano di montevergine", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "pietracupa", "Italy", "taurasi", null],
  // Sicily
  ["Gambero Rosso Tre Bicchieri (2026)", "monteleone", "Italy", "etna bianco anthemis", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "girolamo russo", "Italy", "etna bianco san lorenzo", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "alta mora", "Italy", "etna rosso alta mora", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "restivo", "Italy", "etna rosso contrada arcuria", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "pietradolce", "Italy", "etna rosso vigna barbagalli", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "palari", "Italy", "faro palari", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "donnafugata", "Italy", "passito di pantelleria ben rye", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "planeta", "Italy", "cerasuolo di vittoria classico dorilli", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "feudo maccari", "Italy", "nero d'avola saia", null],
  // Puglia
  ["Gambero Rosso Tre Bicchieri (2026)", "gianfranco fino", "Italy", "jo negroamaro", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "polvanera", "Italy", "gioia del colle primitivo", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "masca del tacco", "Italy", "primitivo di manduria piano chiuso", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "cantine due palme", "Italy", "salice salentino selvarossa", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "masseria li veli", "Italy", "askos verdeca", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "amastuola", "Italy", "lamarossa primitivo", null],
  // Sardinia
  ["Gambero Rosso Tre Bicchieri (2026)", "argiolas", "Italy", "turriga", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "sella & mosca", "Italy", "marchese di villamarina", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "giuseppe gabbas", "Italy", "cannonau arbore", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "surrau", "Italy", "vermentino sciala", null],
  // Umbria
  ["Gambero Rosso Tre Bicchieri (2026)", "arnaldo caprai", "Italy", "montefalco sagrantino 25 anni", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "antonelli", "Italy", "montefalco sagrantino chiusa di pannone", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "lungarotti", "Italy", "torgiano rubesco monticchio", null],
  // Abruzzo
  ["Gambero Rosso Tre Bicchieri (2026)", "emidio pepe", "Italy", "trebbiano d'abruzzo", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "valle reale", "Italy", "montepulciano", null],
  // Lazio
  ["Gambero Rosso Tre Bicchieri (2026)", "tenuta di fiorano", "Italy", "fiorano rosso", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "cotarella", "Italy", "montiano", null],
  // Trentino
  ["Gambero Rosso Tre Bicchieri (2026)", "san leonardo", "Italy", "san leonardo", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "ferrari", "Italy", "trento perle nero", null],
  // Valle d'Aosta
  ["Gambero Rosso Tre Bicchieri (2026)", "les cretes", "Italy", "chardonnay cuvee bois", null],
  // Basilicata
  ["Gambero Rosso Tre Bicchieri (2026)", "elena fucci", "Italy", "aglianico titolo", null],
  // Marche
  ["Gambero Rosso Tre Bicchieri (2026)", "tenuta villa bucci", "Italy", "verdicchio villa bucci", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "umani ronchi", "Italy", "verdicchio historical", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "velenosi", "Italy", "rosso piceno roggio del filare", null],
  // Emilia-Romagna
  ["Gambero Rosso Tre Bicchieri (2026)", "medici ermete", "Italy", "lambrusco concerto", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "paltrinieri", "Italy", "lambrusco di sorbara piria", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "livon", "Italy", "braide alte", null],
  ["Gambero Rosso Tre Bicchieri (2026)", "cantine lunae", "Italy", "vermentino lunae", null],

  // ── Concours Mondial Grand Gold 2025 ─────────────────────────────────────
  ["Concours Mondial Grand Gold (2025)", "bernard remy", "France", "champagne rose", null],
  ["Concours Mondial Grand Gold (2025)", "centinari", "Italy", "centinari brut franciacorta", null],
  ["Concours Mondial Grand Gold (2025)", "estate argyros", "Greece", "vinsanto", null],
  ["Concours Mondial Grand Gold (2025)", "tribaut-schloesser", "France", "cuvee authentique", null],
  ["Concours Mondial Grand Gold (2025)", "celler masroig", "Spain", "les sorts vinyes velles", null],
  ["Concours Mondial Grand Gold (2025)", "norton", "Argentina", "norton privada", null],
  ["Concours Mondial Grand Gold (2025)", "guelbenzu", "Spain", "guelbenzu evo", null],
  ["Concours Mondial Grand Gold (2025)", "ca' rugate", "Italy", "cima caponiera amarone", null],
];

// ── Process assignments sequentially with short pauses ───────────────────────

async function findAndBadge(badge, producerSearch, country, hint1, hint2) {
  const pSearch = `%${norm(producerSearch)}%`;
  const countryLower = country.toLowerCase();
  const h1 = `%${norm(hint1)}%`;

  let rows;
  try {
    if (hint2) {
      const h2 = `%${norm(hint2)}%`;
      rows = await sql`
        SELECT id, badges FROM wines
        WHERE lower(country) = ${countryLower}
          AND lower(name) || ' ' || lower(coalesce(producer,'')) ILIKE ${pSearch}
          AND lower(name) ILIKE ${h1}
          AND lower(name) ILIKE ${h2}
        LIMIT 3
      `;
    } else {
      rows = await sql`
        SELECT id, badges FROM wines
        WHERE lower(country) = ${countryLower}
          AND lower(name) || ' ' || lower(coalesce(producer,'')) ILIKE ${pSearch}
          AND lower(name) ILIKE ${h1}
        LIMIT 3
      `;
    }
  } catch(e) {
    // Retry once on connection error
    await new Promise(r => setTimeout(r, 500));
    try {
      rows = await sql`
        SELECT id, badges FROM wines
        WHERE lower(country) = ${countryLower}
          AND lower(name) ILIKE ${h1}
          AND lower(name) || ' ' || lower(coalesce(producer,'')) ILIKE ${pSearch}
        LIMIT 2
      `;
    } catch(e2) {
      return false;
    }
  }

  if (!rows || rows.length === 0) return false;

  const row = rows[0];
  const existing = row.badges || [];
  if (existing.includes(badge)) return 'already';

  const newBadges = [...existing, badge];
  await sql`UPDATE wines SET badges = ${newBadges} WHERE id = ${row.id}`;
  return true;
}

async function main() {
  console.log(`Processing ${ASSIGNMENTS.length} badge assignments...\n`);

  let matched = 0, updated = 0, already = 0, notFound = 0;
  const notFoundList = [];

  for (let i = 0; i < ASSIGNMENTS.length; i++) {
    const [badge, producer, country, hint1, hint2] = ASSIGNMENTS[i];

    const result = await findAndBadge(badge, producer, country, hint1, hint2);

    if (result === true) { matched++; updated++; }
    else if (result === 'already') { matched++; already++; }
    else { notFound++; notFoundList.push(`${producer} | ${hint1} | ${country} -> ${badge}`); }

    // Progress every 50
    if ((i + 1) % 50 === 0) {
      console.log(`Progress: ${i+1}/${ASSIGNMENTS.length} | Updated: ${updated} | Not found: ${notFound}`);
    }

    // Small pause every 20 to avoid connection resets
    if (i % 20 === 19) await new Promise(r => setTimeout(r, 100));
  }

  console.log('\n═══════════════════════════════════════');
  console.log(`Total assignments: ${ASSIGNMENTS.length}`);
  console.log(`Updated: ${updated} | Already had badge: ${already} | Not found: ${notFound}`);

  if (notFoundList.length > 0) {
    console.log('\nNot found:');
    notFoundList.forEach(item => console.log('  -', item));
  }

  const badgedCount = await sql`SELECT COUNT(*) FROM wines WHERE array_length(badges, 1) > 0`;
  console.log(`\nTotal wines with badges: ${badgedCount[0].count}`);
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
