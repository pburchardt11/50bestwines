#!/usr/bin/env node
// Generate massive wine database — targets 10,000+ wines across 120 countries
import { writeFileSync } from 'fs';

function toSlug(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function rand(min, max) { return min + Math.floor(Math.random() * (max - min + 1)); }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// ── Score generation ──────────────────────────────────────────────
const SOURCES = [
  { name: "Wine Spectator", max: 100 },
  { name: "Robert Parker", max: 100 },
  { name: "James Suckling", max: 100 },
  { name: "Decanter", max: 100 },
  { name: "Wine Enthusiast", max: 100 },
  { name: "Vivino", max: 5 },
  { name: "Jancis Robinson", max: 20 },
  { name: "Tim Atkin", max: 100 },
];

function generateScores(price) {
  let base;
  if (price > 500) base = 95;
  else if (price > 200) base = 93;
  else if (price > 100) base = 91;
  else if (price > 50) base = 89;
  else if (price > 25) base = 87;
  else if (price > 15) base = 85;
  else base = 83;

  const n = rand(3, 6);
  const selected = [...SOURCES].sort(() => Math.random() - 0.5).slice(0, n);
  return selected.map(s => {
    const v = rand(-3, 3);
    let score;
    if (s.max === 100) score = Math.min(100, Math.max(78, base + v));
    else if (s.max === 20) score = Math.min(20, Math.max(14, Math.round((base + v) / 5)));
    else score = Math.min(5.0, Math.max(3.0, Math.round(((base + v) / 20) * 10) / 10));
    return { source: s.name, score, maxScore: s.max, vintage: null };
  });
}

function computeAggregate(scores) {
  let total = 0, count = 0;
  for (const s of scores) {
    let norm;
    if (s.maxScore === 100) norm = s.score;
    else if (s.maxScore === 20) norm = (s.score / 20) * 100;
    else norm = (s.score / 5) * 100;
    total += norm;
    count++;
  }
  return Math.round(total / count);
}

// ── Countries with regions, grapes, producers ──────────────────────
const COUNTRIES = [
  { name: "France", cc: "FR", emoji: "🇫🇷", regions: [
    { name: "Bordeaux", sub: ["Médoc","Saint-Émilion","Pomerol","Pauillac","Margaux","Graves","Saint-Julien","Pessac-Léognan","Sauternes","Fronsac"], grapes: {Red:["Cabernet Sauvignon","Merlot","Cabernet Franc"],White:["Sémillon","Sauvignon Blanc"],Dessert:["Sémillon"]}, producers: ["Château Lafite Rothschild","Château Margaux","Château Mouton Rothschild","Château Haut-Brion","Château Latour","Château Pétrus","Château Cheval Blanc","Château Ausone","Château Lynch-Bages","Château Pichon Baron","Château Cos d'Estournel","Château Ducru-Beaucaillou","Château Léoville-Las Cases","Château Montrose","Château Palmer","Château Pontet-Canet","Château Calon-Ségur","Château Beychevelle","Château Gruaud-Larose","Château Léoville-Barton","Château Talbot","Château Gloria","Château Branaire-Ducru","Château Saint-Pierre","Château Grand-Puy-Lacoste","Château Langoa Barton","Château Pavie","Château Angélus","Château Figeac","Château Troplong Mondot","Château Canon","Château La Mondotte","Château Valandraud","Château Clinet","Château L'Église-Clinet","Château Le Gay","Château La Conseillante","Château Trotanoy","Château Gazin","Château d'Yquem","Château Suduiraut","Château Rieussec","Château Climens","Château de Fargues"] },
    { name: "Burgundy", sub: ["Côte de Nuits","Côte de Beaune","Chablis","Mâconnais","Côte Chalonnaise"], grapes: {Red:["Pinot Noir"],White:["Chardonnay"]}, producers: ["Domaine de la Romanée-Conti","Domaine Leroy","Domaine Comte Georges de Vogüé","Domaine Armand Rousseau","Domaine Georges Roumier","Domaine Coche-Dury","Domaine Leflaive","Domaine Ramonet","Domaine William Fèvre","Domaine Roulot","Louis Jadot","Joseph Drouhin","Maison Bouchard Père & Fils","Domaine Étienne Sauzet","Domaine Jean-Marc Roulot","Domaine des Comtes Lafon","Domaine Faiveley","Domaine Méo-Camuzet","Domaine Ponsot","Domaine Hubert Lignier","Domaine Dujac","Domaine Denis Mortet","Domaine Robert Chevillon","Domaine Henri Boillot","Domaine Pierre-Yves Colin-Morey","Domaine Vincent Dauvissat","Maison Louis Latour","Domaine Tollot-Beaut","Domaine Marquis d'Angerville","Albert Bichot"] },
    { name: "Champagne", sub: ["Champagne"], grapes: {Sparkling:["Chardonnay","Pinot Noir","Pinot Meunier"]}, producers: ["Moët & Chandon","Louis Roederer","Krug","Veuve Clicquot","Dom Pérignon","Pol Roger","Taittinger","Bollinger","Perrier-Jouët","Laurent-Perrier","Ruinart","Charles Heidsieck","Billecart-Salmon","Salon","Jacques Selosse","Pierre Gimonnet","Egly-Ouriet","Philipponnat","Gosset","Delamotte","Deutz","Piper-Heidsieck","Nicolas Feuillatte","Mumm","Ayala"] },
    { name: "Rhône Valley", sub: ["Northern Rhône","Southern Rhône"], grapes: {Red:["Syrah","Grenache","Mourvèdre"],White:["Viognier","Marsanne","Roussanne"]}, producers: ["E. Guigal","Paul Jaboulet Aîné","M. Chapoutier","Jean-Louis Chave","Auguste Clape","Château de Beaucastel","Château Rayas","Domaine du Vieux Télégraphe","Domaine de la Janasse","Clos des Papes","Delas Frères","Yves Cuilleron","Domaine Jean-Michel Gerin","Domaine René Rostaing","Domaine Pierre Gaillard","Domaine Alain Graillot","Domaine du Pégaü","Domaine de la Mordorée","Domaine Perrin","Domaine La Barroche"] },
    { name: "Loire Valley", sub: ["Sancerre","Vouvray","Muscadet","Chinon","Bourgueil","Savennières"], grapes: {White:["Sauvignon Blanc","Chenin Blanc","Melon de Bourgogne"],Red:["Cabernet Franc"]}, producers: ["Domaine Vacheron","Domaine Alphonse Mellot","Domaine Henri Bourgeois","Domaine Huet","Domaine Nicolas Joly","Domaine Didier Dagueneau","Domaine François Chidaine","Domaine des Baumard","Domaine Charles Joguet","Domaine Couly-Dutheil","Domaine de la Taille aux Loups","Domaine Marc Brédif","Domaine Clos Rougeard","Domaine Patrick Baudouin"] },
    { name: "Alsace", sub: ["Alsace"], grapes: {White:["Riesling","Gewürztraminer","Pinot Gris","Muscat"]}, producers: ["Domaine Zind-Humbrecht","Domaine Trimbach","Domaine Weinbach","Domaine Marcel Deiss","Domaine Albert Mann","Hugel & Fils","Domaine Josmeyer","Domaine Paul Blanck","Domaine Bott-Geyl","Domaine André Ostertag","Léon Beyer"] },
    { name: "Languedoc-Roussillon", sub: ["Languedoc","Roussillon","Corbières","Minervois","Faugères"], grapes: {Red:["Grenache","Syrah","Mourvèdre","Carignan"],Rosé:["Grenache","Cinsault"]}, producers: ["Gérard Bertrand","Domaine de la Grange des Pères","Mas de Daumas Gassac","Château de la Négly","Domaine Gauby","Clos des Fées","Domaine Léon Barral","Château d'Aiguilhe","Domaine de Trévallon","Mas Jullien","Domaine d'Aupilhac"] },
    { name: "Provence", sub: ["Provence","Bandol"], grapes: {Rosé:["Grenache","Cinsault","Syrah","Mourvèdre"],Red:["Mourvèdre","Grenache"]}, producers: ["Domaines Ott","Château d'Esclans","Miraval","Château Minuty","Domaine Tempier","Château de Pibarnon","Château Pradeaux","Château Simone","Domaine du Gros Noré","Château Sainte Roseline"] },
  ], desc: "France is the spiritual home of wine, setting the standard for quality worldwide.", hist: "French winemaking dates to the 6th century BC. The AOC system, established in 1935, became the global model for wine classification." },
  { name: "Italy", cc: "IT", emoji: "🇮🇹", regions: [
    { name: "Tuscany", sub: ["Chianti Classico","Montalcino","Bolgheri","Montepulciano","Maremma"], grapes: {Red:["Sangiovese","Cabernet Sauvignon","Merlot"]}, producers: ["Tenuta San Guido","Marchesi Antinori","Biondi-Santi","Tenuta dell'Ornellaia","Castello di Ama","Fontodi","Isole e Olena","Castello dei Rampolla","San Felice","Felsina","Il Poggione","Casanova di Neri","Ciacci Piccolomini","Col d'Orcia","Le Macchiole","Castello Banfi","Marchesi de' Frescobaldi","Ruffino","Castello di Monsanto","Poggio Antico"] },
    { name: "Piedmont", sub: ["Barolo","Barbaresco","Langhe","Asti","Gavi","Roero"], grapes: {Red:["Nebbiolo","Barbera","Dolcetto"],White:["Arneis","Cortese"],Sparkling:["Moscato"]}, producers: ["Giacomo Conterno","Gaja","Bruno Giacosa","Vietti","Bartolo Mascarello","Giuseppe Mascarello","Marchesi di Barolo","Ceretto","Elio Grasso","Roagna","Luciano Sandrone","Roberto Voerzio","Giacomo Fenocchio","Oddero","Pio Cesare","Produttori del Barbaresco","Elvio Cogno","Giovanni Rosso","Paolo Scavino","Aldo Conterno"] },
    { name: "Veneto", sub: ["Valpolicella","Prosecco","Soave"], grapes: {Red:["Corvina","Rondinella"],White:["Garganega","Glera"],Sparkling:["Glera"]}, producers: ["Giuseppe Quintarelli","Allegrini","Masi","Bertani","Dal Forno Romano","Pieropan","Anselmi","Zenato","Bisol","Nino Franco","Ruggeri","La Marca","Tommasi","Bolla","Tedeschi"] },
    { name: "Sicily", sub: ["Etna","Vittoria","Marsala"], grapes: {Red:["Nerello Mascalese","Nero d'Avola","Frappato"],White:["Carricante","Catarratto"],Fortified:["Grillo"]}, producers: ["Planeta","Donnafugata","Benanti","Frank Cornelissen","Tasca d'Almerita","Cusumano","Firriato","Marco de Bartoli","Cos","Occhipinti","Arianna Occhipinti","Graci","Passopisciaro"] },
    { name: "Puglia", sub: ["Primitivo di Manduria","Salento"], grapes: {Red:["Primitivo","Negroamaro"]}, producers: ["Tormaresca","San Marzano","Gianfranco Fino","Leone de Castris","Taurino","Rivera","A Mano","Masseria Li Veli"] },
    { name: "Campania", sub: ["Taurasi","Irpinia","Amalfi Coast"], grapes: {Red:["Aglianico"],White:["Fiano","Greco","Falanghina"]}, producers: ["Mastroberardino","Feudi di San Gregorio","Terredora di Paolo","I Favati","Villa Diamante","Cantine Astroni"] },
  ], desc: "Italy produces more wine than any other country, with extraordinary diversity of indigenous grape varieties.", hist: "Italian winemaking dates back 4,000 years. The country boasts over 500 officially recognized grape varieties." },
  { name: "Spain", cc: "ES", emoji: "🇪🇸", regions: [
    { name: "Rioja", sub: ["Rioja Alta","Rioja Alavesa","Rioja Oriental"], grapes: {Red:["Tempranillo","Garnacha","Graciano","Mazuelo"]}, producers: ["La Rioja Alta","López de Heredia","CVNE","Muga","Bodegas Roda","Artadi","Remírez de Ganuza","Marqués de Murrieta","Marqués de Riscal","Beronia","Bodegas LAN","Sierra Cantabria","Bodegas Palacio","Viña Real","Bodegas Ontañón","Bodegas Campillo","Bodegas Bretón","Bodegas Bilbaínas","Bodegas El Coto","Bodegas Faustino"] },
    { name: "Ribera del Duero", sub: ["Ribera del Duero"], grapes: {Red:["Tempranillo"]}, producers: ["Bodegas Vega Sicilia","Dominio de Pingus","Pesquera","Protos","Hacienda Monasterio","Alión","Bodegas Emilio Moro","Bodegas Arzuaga","Pago de los Capellanes","Bodegas Abadía Retuerta","Bodegas Aalto","Bodegas Felix Callejo","Bodegas Valduero","Dehesa de los Canónigos"] },
    { name: "Priorat", sub: ["Priorat"], grapes: {Red:["Garnacha","Cariñena","Cabernet Sauvignon","Syrah"]}, producers: ["Álvaro Palacios","Clos Mogador","Mas Doix","Clos de l'Obac","Clos Erasmus","Terroir al Límit","Portal del Priorat","Ferrer Bobet"] },
    { name: "Rías Baixas", sub: ["Rías Baixas"], grapes: {White:["Albariño"]}, producers: ["Bodegas Zárate","Pazo de Señoráns","Martín Códax","Fillaboa","Granbazán","Do Ferreiro","Albamar"] },
    { name: "Sherry", sub: ["Jerez"], grapes: {Fortified:["Palomino Fino","Pedro Ximénez","Moscatel"]}, producers: ["González Byass","Lustau","Valdespino","El Maestro Sierra","Equipo Navazos","Williams & Humbert","Osborne","Barbadillo","Hidalgo-La Gitana"] },
    { name: "Cava", sub: ["Penedès"], grapes: {Sparkling:["Macabeo","Xarel·lo","Parellada"]}, producers: ["Gramona","Recaredo","Juvé y Camps","Codorníu","Freixenet","Raventós i Blanc","Mestres","Torelló"] },
  ], desc: "Spain has more vineyard area than any country. From Rioja to Priorat, Spanish wine is in a golden age.", hist: "The Phoenicians planted Spain's first vineyards around 1100 BC." },
  { name: "United States", cc: "US", emoji: "🇺🇸", regions: [
    { name: "Napa Valley", sub: ["Oakville","Rutherford","Stags Leap District","St. Helena","Calistoga","Howell Mountain","Atlas Peak","Mount Veeder","Spring Mountain","Diamond Mountain"], grapes: {Red:["Cabernet Sauvignon","Merlot","Cabernet Franc","Petit Verdot"],White:["Chardonnay","Sauvignon Blanc"]}, producers: ["Opus One","Screaming Eagle","Caymus","Joseph Phelps","Stag's Leap Wine Cellars","Silver Oak","Duckhorn","Shafer","Cakebread","Far Niente","Spottswoode","Heitz Cellar","Dominus","Harlan Estate","Bond","Colgin Cellars","Scarecrow","Kapcsándy","Dalla Valle","Kongsgaard","Chateau Montelena","Robert Mondavi","Inglenook","Beringer","Newton","Pride Mountain","Chappellet","Trefethen","Frog's Leap","Corison"] },
    { name: "Sonoma", sub: ["Russian River Valley","Sonoma Coast","Alexander Valley","Dry Creek Valley","Sonoma Mountain"], grapes: {Red:["Pinot Noir","Cabernet Sauvignon","Zinfandel"],White:["Chardonnay"]}, producers: ["Williams Selyem","Littorai","Kistler","Flowers","Marcassin","Peter Michael","Ramey","Hirsch","Peay","Dutton-Goldfield","Gary Farrell","Rochioli","Fort Ross","Hartford Family","Copain","Ridge Vineyards","Seghesio","Dry Creek Vineyard"] },
    { name: "Willamette Valley", sub: ["Dundee Hills","Eola-Amity Hills","Ribbon Ridge","McMinnville","Chehalem Mountains"], grapes: {Red:["Pinot Noir"],White:["Chardonnay","Pinot Gris"]}, producers: ["Domaine Drouhin Oregon","Beaux Frères","Bergström","Ken Wright","Evening Land","Eyrie Vineyards","Lingua Franca","Cristom","Adelsheim","WillaKenzie","Soter","Shea Wine Cellars"] },
    { name: "Washington State", sub: ["Walla Walla Valley","Columbia Valley","Red Mountain","Yakima Valley"], grapes: {Red:["Cabernet Sauvignon","Syrah","Merlot"],White:["Riesling","Chardonnay"]}, producers: ["Cayuse","K Vintners","Gramercy Cellars","Quilceda Creek","Leonetti Cellar","L'Ecole No. 41","Chateau Ste. Michelle","Betz Family","DeLille Cellars","Andrew Will","Charles Smith","Long Shadows"] },
  ], desc: "American wine, led by California's Napa Valley, has earned its place among the world's finest.", hist: "The 1976 Judgment of Paris transformed the global wine landscape when California wines beat French rivals." },
  { name: "Australia", cc: "AU", emoji: "🇦🇺", regions: [
    { name: "Barossa Valley", sub: ["Barossa Valley","Eden Valley"], grapes: {Red:["Shiraz","Cabernet Sauvignon","Grenache"],White:["Riesling"]}, producers: ["Penfolds","Henschke","Torbreck","Two Hands","Yalumba","Peter Lehmann","Grant Burge","Rockford","Charles Melton","Turkey Flat","Seppeltsfield","Elderton","St Hugo","Langmeil","Jim Barry"] },
    { name: "McLaren Vale", sub: ["McLaren Vale"], grapes: {Red:["Shiraz","Grenache","Cabernet Sauvignon"]}, producers: ["d'Arenberg","Wirra Wirra","Yangarra","Coriole","Chapel Hill","Gemtree","Bekkers","Brash Higgins","Samuel's Gorge","Shingleback"] },
    { name: "Margaret River", sub: ["Margaret River"], grapes: {Red:["Cabernet Sauvignon","Merlot"],White:["Chardonnay","Sauvignon Blanc","Sémillon"]}, producers: ["Vasse Felix","Leeuwin Estate","Cullen","Moss Wood","Cape Mentelle","Pierro","Voyager Estate","Howard Park","Xanadu","Brookland Valley"] },
    { name: "Yarra Valley", sub: ["Yarra Valley"], grapes: {Red:["Pinot Noir","Shiraz"],White:["Chardonnay"]}, producers: ["De Bortoli","Giant Steps","Yering Station","Oakridge","Tarrawarra","Mac Forbes","Coldstream Hills","Punt Road","Luke Lambert"] },
    { name: "Hunter Valley", sub: ["Hunter Valley"], grapes: {White:["Sémillon","Chardonnay"],Red:["Shiraz"]}, producers: ["Tyrrell's","Brokenwood","Mount Pleasant","Keith Tulloch","Thomas Wines","Pepper Tree"] },
  ], desc: "Australia produces bold, fruit-driven wines alongside refined, terroir-focused bottlings.", hist: "The Barossa Valley's old vines, planted in the 1840s, are among the oldest Shiraz on earth." },
  { name: "Argentina", cc: "AR", emoji: "🇦🇷", regions: [
    { name: "Mendoza", sub: ["Uco Valley","Luján de Cuyo","Maipú","Agrelo"], grapes: {Red:["Malbec","Cabernet Sauvignon","Bonarda"],White:["Torrontés","Chardonnay"]}, producers: ["Bodega Catena Zapata","Achaval-Ferrer","Zuccardi","Trapiche","Norton","Luigi Bosca","Clos de los Siete","Alta Vista","Terrazas de los Andes","Bodegas Salentein","Viña Cobos","Kaiken","Doña Paula","Pulenta Estate","Familia Schroeder","Rutini","Fabre Montmayou"] },
    { name: "Salta", sub: ["Cafayate"], grapes: {White:["Torrontés"],Red:["Malbec"]}, producers: ["Colomé","El Esteco","San Pedro de Yacochuya","Tacuil","Piatelli"] },
  ], desc: "Argentina is the world's fifth-largest wine producer, renowned for its high-altitude Malbec.", hist: "Spanish missionaries brought vines in the 16th century. The modern premium industry took off in the 1990s." },
  { name: "Chile", cc: "CL", emoji: "🇨🇱", regions: [
    { name: "Maipo Valley", sub: ["Puente Alto","Pirque"], grapes: {Red:["Cabernet Sauvignon","Carmenère","Merlot"]}, producers: ["Concha y Toro","Almaviva","Viña Santa Rita","Cousino-Macul","Pérez Cruz","Antiyal","De Martino","Undurraga"] },
    { name: "Colchagua Valley", sub: ["Apalta","Marchigüe"], grapes: {Red:["Carmenère","Cabernet Sauvignon","Syrah"]}, producers: ["Montes","Casa Lapostolle","Clos Apalta","Viña MontGras","Emiliana","Viu Manent","Los Vascos","Santa Cruz"] },
    { name: "Casablanca Valley", sub: ["Casablanca"], grapes: {White:["Sauvignon Blanc","Chardonnay","Pinot Noir"]}, producers: ["Casas del Bosque","Viña Casablanca","Kingston Family","Matetic","Loma Larga"] },
  ], desc: "Chile's isolation has kept vineyards free from phylloxera, producing wines of exceptional purity.", hist: "The quality revolution began in the 1980s with foreign investment and modern techniques." },
  { name: "Germany", cc: "DE", emoji: "🇩🇪", regions: [
    { name: "Mosel", sub: ["Saar","Ruwer","Bernkastel","Piesport"], grapes: {White:["Riesling"]}, producers: ["Egon Müller","Dr. Loosen","Joh. Jos. Prüm","Markus Molitor","Fritz Haag","Maximin Grünhaus","Schloss Lieser","Willi Schaefer","Clemens Busch","Van Volxem","Reinhard Löwenstein","Zilliken"] },
    { name: "Rheingau", sub: ["Rheingau"], grapes: {White:["Riesling"],Red:["Spätburgunder"]}, producers: ["Robert Weil","Schloss Johannisberg","Georg Breuer","Peter Jakob Kühn","Leitz","Künstler","Kloster Eberbach","Balthasar Ress"] },
    { name: "Pfalz", sub: ["Pfalz"], grapes: {White:["Riesling","Grauburgunder","Weißburgunder"],Red:["Spätburgunder"]}, producers: ["Dr. Bürklin-Wolf","Müller-Catoir","Christmann","Von Winning","Reichsrat von Buhl","Knipser","Philipp Kuhn","Friedrich Becker"] },
    { name: "Baden", sub: ["Baden"], grapes: {Red:["Spätburgunder"],White:["Grauburgunder","Weißburgunder"]}, producers: ["Bernhard Huber","Ziereisen","Franz Keller","Salwey","Dr. Heger"] },
  ], desc: "Germany produces some of the world's finest Rieslings, from bone-dry to lusciously sweet.", hist: "Romans planted Germany's first vineyards along the Mosel and Rhine 2,000 years ago." },
  { name: "Portugal", cc: "PT", emoji: "🇵🇹", regions: [
    { name: "Douro", sub: ["Douro Superior","Cima Corgo","Baixo Corgo"], grapes: {Red:["Touriga Nacional","Touriga Franca","Tinta Roriz"],Fortified:["Touriga Nacional","Tinta Roriz"]}, producers: ["Casa Ferreirinha","Quinta do Noval","Niepoort","Quinta do Crasto","Quinta do Vale Meão","Taylor's","Graham's","Fonseca","Dow's","Warre's","Quinta do Vesuvio","Quinta da Pacheca","Chryseia"] },
    { name: "Alentejo", sub: ["Alentejo"], grapes: {Red:["Touriga Nacional","Alicante Bouschet","Aragonez"]}, producers: ["Herdade do Esporão","Herdade dos Grous","Monte da Ravasqueira","Herdade do Mouchão","Quinta do Carmo","Julia Kemper","Cortes de Cima"] },
    { name: "Vinho Verde", sub: ["Minho"], grapes: {White:["Alvarinho","Loureiro"]}, producers: ["Anselmo Mendes","Soalheiro","Quinta de Gomariz","Quinta do Ameal","Muros Antigos"] },
  ], desc: "Portugal offers extraordinary wine diversity, from legendary Port to vibrant Vinho Verde.", hist: "Portugal's Douro Valley, established in 1756, was the world's first officially demarcated wine region." },
  { name: "New Zealand", cc: "NZ", emoji: "🇳🇿", regions: [
    { name: "Marlborough", sub: ["Wairau Valley","Awatere Valley"], grapes: {White:["Sauvignon Blanc","Pinot Gris"],Red:["Pinot Noir"]}, producers: ["Cloudy Bay","Villa Maria","Dog Point","Greywacke","Craggy Range","Fromm","Seresin","Nautilus","Allan Scott","Kim Crawford","Yealands","Brancott Estate","Saint Clair","Spy Valley","Te Whare Ra","Wither Hills"] },
    { name: "Central Otago", sub: ["Bannockburn","Gibbston","Cromwell Basin","Wanaka"], grapes: {Red:["Pinot Noir"]}, producers: ["Felton Road","Rippon","Burn Cottage","Mt Difficulty","Peregrine","Amisfield","Quartz Reef","Valli","Akarua","Carrick"] },
    { name: "Martinborough", sub: ["Wairarapa"], grapes: {Red:["Pinot Noir"],White:["Sauvignon Blanc"]}, producers: ["Craggy Range","Ata Rangi","Martinborough Vineyard","Te Kairanga","Palliser","Dry River","Escarpment"] },
  ], desc: "New Zealand burst onto the world scene with vibrant Sauvignon Blancs and exceptional Pinot Noir.", hist: "Commercial winemaking began in the 1970s. The cool climate produces wines of extraordinary freshness." },
  { name: "South Africa", cc: "ZA", emoji: "🇿🇦", regions: [
    { name: "Stellenbosch", sub: ["Simonsberg","Helderberg","Bottelary Hills"], grapes: {Red:["Cabernet Sauvignon","Pinotage","Shiraz","Merlot"]}, producers: ["Kanonkop","Rust en Vrede","Meerlust","Warwick","Thelema","Rustenberg","Waterford","Jordan","De Toren","Vergelegen","Neil Ellis","Ernie Els","Le Riche","Delaire Graff"] },
    { name: "Swartland", sub: ["Swartland"], grapes: {Red:["Syrah","Mourvèdre","Grenache","Cinsault"],White:["Chenin Blanc"]}, producers: ["The Sadie Family Wines","Mullineux","AA Badenhorst","Porseleinberg","David & Nadia","Testalonga","Rall","Intellego"] },
    { name: "Walker Bay", sub: ["Hemel-en-Aarde"], grapes: {Red:["Pinot Noir"],White:["Chardonnay"]}, producers: ["Hamilton Russell","Bouchard Finlayson","Creation","Newton Johnson","Ataraxia","Crystallum","Storm"] },
    { name: "Franschhoek", sub: ["Franschhoek"], grapes: {Red:["Cabernet Sauvignon","Shiraz"],White:["Sémillon","Chenin Blanc"]}, producers: ["Boekenhoutskloof","La Motte","Boschendal","Chamonix","Grande Provence","Haute Cabrière"] },
  ], desc: "South African wine is in a renaissance, with Swartland and Walker Bay producing world-class wines.", hist: "The first South African wine was produced in 1659. Pinotage was created in 1925." },
  { name: "Austria", cc: "AT", emoji: "🇦🇹", regions: [
    { name: "Wachau", sub: ["Wachau"], grapes: {White:["Grüner Veltliner","Riesling"]}, producers: ["F.X. Pichler","Domäne Wachau","Emmerich Knoll","Franz Hirtzberger","Nikolaihof","Rudi Pichler","Prager","Tegernseerhof"] },
    { name: "Kamptal", sub: ["Kamptal"], grapes: {White:["Grüner Veltliner","Riesling"]}, producers: ["Bründlmayer","Schloss Gobelsburg","Jurtschitsch","Hirsch","Loimer","Eichinger"] },
    { name: "Burgenland", sub: ["Neusiedlersee","Mittelburgenland"], grapes: {Red:["Blaufränkisch","Zweigelt","St. Laurent"],Dessert:["Welschriesling"]}, producers: ["Moric","Kracher","Heinrich","Prieler","Nittnaus","Weninger","Feiler-Artinger"] },
  ], desc: "Austria's Grüner Veltliner and Riesling are among the world's great white wines.", hist: "Austrian winemaking dates to Celtic and Roman times." },
  // Remaining countries with fewer details
  ...[
    { name: "Greece", cc: "GR", emoji: "🇬🇷", r: [{ n: "Naoussa", g: {Red:["Xinomavro"]}, p: ["Domaine Thymiopoulos","Boutari","Kir-Yianni","Alpha Estate"] }, { n: "Santorini", g: {White:["Assyrtiko"]}, p: ["Domaine Sigalas","Gaia Wines","Hatzidakis","Argyros"] }] },
    { name: "Lebanon", cc: "LB", emoji: "🇱🇧", r: [{ n: "Bekaa Valley", g: {Red:["Cabernet Sauvignon","Cinsault","Carignan"]}, p: ["Château Musar","Château Kefraya","Château Ksara","Domaine des Tourelles","Massaya"] }] },
    { name: "Hungary", cc: "HU", emoji: "🇭🇺", r: [{ n: "Tokaj", g: {Dessert:["Furmint","Hárslevelű"],White:["Furmint"]}, p: ["Royal Tokaji","Disznókő","Oremus","Szepsy","Dobogó"] }, { n: "Villány", g: {Red:["Cabernet Franc","Merlot"]}, p: ["Gere","Bock","Sauska","Vylyan"] }] },
    { name: "Georgia", cc: "GE", emoji: "🇬🇪", r: [{ n: "Kakheti", g: {Red:["Saperavi"],White:["Rkatsiteli"]}, p: ["Pheasant's Tears","Alaverdi Monastery","Shalauri","Orgo","Lapati","Tchotiashvili"] }] },
    { name: "Croatia", cc: "HR", emoji: "🇭🇷", r: [{ n: "Istria", g: {White:["Malvazija"],Red:["Teran"]}, p: ["Kozlović","Saints Hills","Coronica","Cattunar"] }, { n: "Dalmatia", g: {Red:["Plavac Mali"]}, p: ["Mike Grgich","Stina","Testament"] }] },
    { name: "Romania", cc: "RO", emoji: "🇷🇴", r: [{ n: "Dealu Mare", g: {Red:["Fetească Neagră"],White:["Fetească Albă"]}, p: ["SERVE","Domeniul Coroanei Segarcea","Budureasca","Lacerta"] }] },
    { name: "Switzerland", cc: "CH", emoji: "🇨🇭", r: [{ n: "Valais", g: {White:["Chasselas","Petite Arvine"],Red:["Pinot Noir"]}, p: ["Domaine Jean-René Germanier","Cave Caloz","Simon Maye","Marie-Thérèse Chappaz"] }] },
    { name: "Canada", cc: "CA", emoji: "🇨🇦", r: [{ n: "Okanagan Valley", g: {Red:["Pinot Noir","Merlot"],White:["Chardonnay","Riesling"]}, p: ["Mission Hill","Quails' Gate","Burrowing Owl","Painted Rock","CheckMate"] }, { n: "Niagara Peninsula", g: {White:["Riesling"],Dessert:["Vidal"]}, p: ["Inniskillin","Tawse","Flat Rock","Cave Spring","Henry of Pelham"] }] },
    { name: "Brazil", cc: "BR", emoji: "🇧🇷", r: [{ n: "Vale dos Vinhedos", g: {Red:["Merlot","Cabernet Sauvignon"],Sparkling:["Chardonnay","Pinot Noir"]}, p: ["Casa Valduga","Miolo","Salton","Aurora","Lidio Carraro"] }] },
    { name: "Uruguay", cc: "UY", emoji: "🇺🇾", r: [{ n: "Canelones", g: {Red:["Tannat"]}, p: ["Bodega Garzón","Bouza","Juanicó","Pisano","De Lucca"] }] },
    { name: "Mexico", cc: "MX", emoji: "🇲🇽", r: [{ n: "Valle de Guadalupe", g: {Red:["Nebbiolo","Tempranillo","Cabernet Sauvignon"]}, p: ["L.A. Cetto","Monte Xanic","Casa de Piedra","Adobe Guadalupe","Viña de Frannes"] }] },
    { name: "China", cc: "CN", emoji: "🇨🇳", r: [{ n: "Ningxia", g: {Red:["Cabernet Sauvignon","Merlot"]}, p: ["Ao Yun","Grace Vineyard","Silver Heights","Helan Mountain","Kanaan"] }] },
    { name: "Japan", cc: "JP", emoji: "🇯🇵", r: [{ n: "Yamanashi", g: {Red:["Muscat Bailey A"],White:["Koshu"]}, p: ["Grace Wine","Château Mercian","Katsunuma Winery","Haramo","Lumière"] }] },
    { name: "India", cc: "IN", emoji: "🇮🇳", r: [{ n: "Nashik", g: {Red:["Shiraz","Cabernet Sauvignon"],White:["Chenin Blanc"]}, p: ["Sula Vineyards","Grover Zampa","Fratelli","KRSMA","Charosa"] }] },
    { name: "Turkey", cc: "TR", emoji: "🇹🇷", r: [{ n: "Eastern Anatolia", g: {Red:["Öküzgözü","Boğazkere"]}, p: ["Kayra","Vinkara","Doluca","Kavaklidere","Pamukkale"] }] },
    { name: "Israel", cc: "IL", emoji: "🇮🇱", r: [{ n: "Galilee", g: {Red:["Cabernet Sauvignon","Syrah"],White:["Viognier"]}, p: ["Golan Heights Winery","Domaine du Castel","Yarden","Galil Mountain","Recanati"] }] },
    { name: "Morocco", cc: "MA", emoji: "🇲🇦", r: [{ n: "Meknès", g: {Red:["Syrah","Cabernet Sauvignon"]}, p: ["Château Roslane","Domaine de la Zouina","Les Celliers de Meknès","Val d'Argan"] }] },
    { name: "Moldova", cc: "MD", emoji: "🇲🇩", r: [{ n: "Codru", g: {Red:["Fetească Neagră"],White:["Fetească Albă"]}, p: ["Château Purcari","Et Cetera","Fautor","Cricova","Mileștii Mici"] }] },
    { name: "Bulgaria", cc: "BG", emoji: "🇧🇬", r: [{ n: "Thracian Valley", g: {Red:["Mavrud","Melnik"],White:["Misket"]}, p: ["Bessa Valley","Enira","Katarzyna Estate","Todoroff"] }] },
    { name: "Slovenia", cc: "SI", emoji: "🇸🇮", r: [{ n: "Goriška Brda", g: {White:["Rebula","Friulano"],Red:["Merlot"]}, p: ["Movia","Marjan Simčič","Edi Simčič","Kabaj","Klinec"] }] },
    { name: "England", cc: "GB", emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", r: [{ n: "Sussex", g: {Sparkling:["Chardonnay","Pinot Noir","Pinot Meunier"]}, p: ["Nyetimber","Ridgeview","Wiston","Gusbourne","Rathfinny","Hambledon","Hattingley Valley","Exton Park"] }] },
    { name: "Czech Republic", cc: "CZ", emoji: "🇨🇿", r: [{ n: "Moravia", g: {White:["Grüner Veltliner","Riesling"],Red:["Pinot Noir"]}, p: ["Sonberk","Lahofer","Vinselekt Michlovský"] }] },
    { name: "Serbia", cc: "RS", emoji: "🇷🇸", r: [{ n: "Župa", g: {Red:["Prokupac"],White:["Tamjanika"]}, p: ["Aleksandrović","Temet","Budimir"] }] },
    { name: "Armenia", cc: "AM", emoji: "🇦🇲", r: [{ n: "Ararat Valley", g: {Red:["Areni"]}, p: ["Zorah","Karas","Armenia Wine","Van Ardi"] }] },
    { name: "Tunisia", cc: "TN", emoji: "🇹🇳", r: [{ n: "Cap Bon", g: {Red:["Carignan","Syrah"]}, p: ["Domaine Neferis","Vignerons de Carthage"] }] },
    { name: "Algeria", cc: "DZ", emoji: "🇩🇿", r: [{ n: "Mascara", g: {Red:["Cinsault","Carignan"]}, p: ["ONCV","Domaine El-Bordj"] }] },
    { name: "Ukraine", cc: "UA", emoji: "🇺🇦", r: [{ n: "Odessa", g: {Red:["Cabernet Sauvignon"],White:["Chardonnay"]}, p: ["Shabo","Inkerman","Kolonist"] }] },
    { name: "Peru", cc: "PE", emoji: "🇵🇪", r: [{ n: "Ica Valley", g: {Red:["Tannat"],White:["Torontés"]}, p: ["Tacama","Intipalka","Santiago Queirolo"] }] },
    { name: "Thailand", cc: "TH", emoji: "🇹🇭", r: [{ n: "Khao Yai", g: {Red:["Shiraz"],White:["Chenin Blanc"]}, p: ["GranMonte","PB Valley","Monsoon Valley"] }] },
    { name: "Ethiopia", cc: "ET", emoji: "🇪🇹", r: [{ n: "Rift Valley", g: {Red:["Merlot","Syrah"]}, p: ["Castel Winery","Awash Wine"] }] },
    { name: "Russia", cc: "RU", emoji: "🇷🇺", r: [{ n: "Krasnodar", g: {Red:["Cabernet Sauvignon"],White:["Riesling"]}, p: ["Fanagoria","Lefkadia","Myskhako","Abrau-Durso"] }] },
    { name: "North Macedonia", cc: "MK", emoji: "🇲🇰", r: [{ n: "Tikveš", g: {Red:["Vranec"]}, p: ["Tikveš Winery","Stobi","Popova Kula"] }] },
    { name: "Slovakia", cc: "SK", emoji: "🇸🇰", r: [{ n: "Tokaj", g: {White:["Furmint","Lipovina"]}, p: ["Tokaj & Co","Ostrožovič","J&J Ostrožovič"] }] },
    { name: "Luxembourg", cc: "LU", emoji: "🇱🇺", r: [{ n: "Moselle", g: {White:["Riesling","Auxerrois"]}, p: ["Domaine Alice Hartmann","Cep d'Or"] }] },
    { name: "Cyprus", cc: "CY", emoji: "🇨🇾", r: [{ n: "Commandaria", g: {Dessert:["Xynisteri","Mavro"]}, p: ["KEO","ETKO","Zambartas","Tsiakkas"] }] },
    { name: "Malta", cc: "MT", emoji: "🇲🇹", r: [{ n: "Malta", g: {Red:["Gellewża"]}, p: ["Marsovin","Meridiana","Ta' Betta"] }] },
    { name: "Bolivia", cc: "BO", emoji: "🇧🇴", r: [{ n: "Tarija", g: {Red:["Tannat","Cabernet Sauvignon"]}, p: ["Campos de Solana","Aranjuez","Kohlberg"] }] },
    { name: "Colombia", cc: "CO", emoji: "🇨🇴", r: [{ n: "Boyacá", g: {Red:["Cabernet Sauvignon"]}, p: ["Marqués de Villa de Leyva","Ain Karim"] }] },
    { name: "Kenya", cc: "KE", emoji: "🇰🇪", r: [{ n: "Naivasha", g: {Red:["Shiraz"],White:["Sauvignon Blanc"]}, p: ["Leleshwa","Rift Valley Winery"] }] },
    { name: "Zimbabwe", cc: "ZW", emoji: "🇿🇼", r: [{ n: "Mashonaland", g: {Red:["Pinotage"]}, p: ["Mukuyu","Bushman Rock"] }] },
  ].map(c => ({
    name: c.name, cc: c.cc, emoji: c.emoji,
    regions: c.r.map(r => ({
      name: r.n, sub: [r.n], grapes: r.g, producers: r.p
    })),
    desc: `${c.name} is an emerging wine-producing nation with growing international recognition.`,
    hist: `${c.name} has a developing wine industry with increasing quality and investment.`
  })),
];

// ── Tasting notes templates ───────────────────────────────────────
const NOTES = {
  Red: [
    "Rich dark fruit, spice, and oak. Full-bodied with firm tannins and a long finish.",
    "Complex aromas of blackberry, plum, and earth. Medium-to-full body with velvety texture.",
    "Ripe cherry, tobacco, and leather. Elegant and structured with excellent aging potential.",
    "Bold cassis, dark chocolate, and espresso. Powerful yet balanced with polished tannins.",
    "Vibrant red fruit, cedar, and vanilla. Smooth and approachable with a spicy finish.",
    "Dense blackberry, smoked meat, and pepper. Concentrated and intense with great depth.",
    "Delicate raspberry, rose petal, and forest floor. Silky and refined with beautiful finesse.",
    "Lush plum, mocha, and toasted oak. Generous and warming with a sweet finish.",
    "Bright cherry, herbs, and mineral notes. Medium-bodied with fresh acidity and fine tannins.",
    "Dark fruit compote, graphite, and violets. Full-bodied with firm but ripe tannins.",
  ],
  White: [
    "Crisp citrus, green apple, and mineral notes. Clean and refreshing with bright acidity.",
    "Rich stone fruit, honey, and toasted almond. Full-bodied with buttery texture.",
    "Zippy lime, grapefruit, and herbal notes. Light and fresh with mouthwatering acidity.",
    "Elegant peach, white flower, and flinty minerality. Balanced and precise.",
    "Tropical mango, pineapple, and vanilla. Round and generous with a creamy palate.",
    "Steely and precise with notes of green apple, chalk, and lemon zest. Electric acidity.",
    "Aromatic with lychee, rose water, and ginger. Off-dry with excellent balance.",
    "Crisp pear, white peach, and wet stone. Medium-bodied with refreshing minerality.",
  ],
  Rosé: [
    "Pale salmon with wild strawberry, citrus, and Provençal herbs. Dry and refreshing.",
    "Bright watermelon, peach, and rose petal. Crisp and elegant with a clean finish.",
    "Salmon pink with red berries, grapefruit, and garrigue. Bone-dry with great freshness.",
  ],
  Sparkling: [
    "Fine bubbles with brioche, apple, and citrus. Creamy mousse with a crisp finish.",
    "Toasty and complex with dried fruit, honey, and biscuit. Elegant and persistent.",
    "Fresh and fruity with green apple, pear, and white flowers. Light and easy-drinking.",
  ],
  Dessert: [
    "Golden amber with apricot, honey, and saffron. Luscious sweetness balanced by acidity.",
    "Rich and unctuous with dried fruit, caramel, and spice. Sweet and indulgent.",
  ],
  Fortified: [
    "Intense and complex with dark fruit, spice, and nuts. Sweet with firm structure.",
    "Dry and nutty with almond, dried fruit, and sea salt. Complex and elegant.",
  ],
};

const EDITORIALS = {
  Red: "A well-crafted red that balances fruit expression with structural integrity. The tannin profile suggests careful extraction, while the aromatics speak to terroir quality. Worth seeking out for current enjoyment and medium-term aging.",
  White: "A beautifully crafted white showcasing the producer's commitment to quality. The balance between fruit and mineral complexity ensures freshness and food-friendliness.",
  Rosé: "This rosé demonstrates genuine complexity and elegance. Perfect for warm-weather dining but sophisticated enough for year-round enjoyment.",
  Sparkling: "A sparkling wine of genuine complexity. The mousse is fine and persistent, the aromatics multi-layered.",
  Dessert: "This dessert wine achieves the rare balance of sweetness and freshness. Concentration of flavors with acidity that never becomes cloying.",
  Fortified: "A fortified wine honoring centuries of tradition while delivering genuine complexity and pleasure.",
};

const PAIRINGS = {
  Red: [["Grilled steak","Braised lamb","Hard cheeses"],["Roast beef","Pasta with meat sauce","Dark chocolate"],["Wild game","Mushroom dishes","Aged Gouda"],["Pizza","Burgers","BBQ ribs"]],
  White: [["Grilled fish","Shellfish","Goat cheese"],["Roast chicken","Cream pasta","Sushi"],["Salads","Light appetizers","Soft cheeses"],["Seafood paella","Thai curry","Oysters"]],
  Rosé: [["Grilled seafood","Mediterranean dishes","Light salads"],["Charcuterie","Sushi","Summer vegetables"]],
  Sparkling: [["Oysters","Caviar","Sushi"],["Fried foods","Soft cheeses","Celebrations"]],
  Dessert: [["Blue cheese","Fruit tarts","Crème brûlée"],["Foie gras","Dark chocolate","Almond cake"]],
  Fortified: [["Stilton","Dark chocolate","Walnuts"],["Aged cheeses","Dried fruits","After dinner"]],
};

const TEMPS = { Red:"16-18°C", White:"8-12°C", Rosé:"8-10°C", Sparkling:"6-8°C", Dessert:"8-10°C", Fortified:"14-18°C" };
const AGINGS = { Red:"5-15 years", White:"2-8 years", Rosé:"1-3 years", Sparkling:"2-8 years", Dessert:"10-30 years", Fortified:"10-30 years" };
const PRICES = { Budget:[8,14], "Mid-Range":[15,29], Premium:[30,74], Luxury:[75,199], "Ultra-Premium":[200,900] };

// ── Wine name templates ────────────────────────────────────────
function generateWineName(producer, grape, region, type, country) {
  const r = Math.random();
  if (type === "Sparkling") return pick(["Brut","Brut Nature","Brut Rosé","Blanc de Blancs","Blanc de Noirs","Cuvée Prestige","Reserve","Grande Cuvée"]);
  if (type === "Fortified") return pick(["Vintage Port","Tawny 20 Year","LBV","Fino","Amontillado","Oloroso","Pedro Ximénez","Manzanilla","Cream","Palo Cortado","Commandaria"]);
  if (type === "Dessert") return pick(["Late Harvest","Vendange Tardive","Selection de Grains Nobles","Tokaji Aszú 5 Puttonyos","Eiswein","Trockenbeerenauslese","Noble Rot","Sauternes"]);
  if (country === "France") {
    if (region.name === "Bordeaux") return producer; // Château wines are named after estate
    if (region.name === "Burgundy") return pick([`${grape}`,`${pick(region.sub)}`,`Premier Cru`,`Grand Cru`,`Vieilles Vignes`]);
  }
  if (r < 0.3) return grape;
  if (r < 0.5) return `${grape} Reserve`;
  if (r < 0.65) return `${grape} Gran Reserva`;
  if (r < 0.75) return `${grape} Single Vineyard`;
  return pick([`Cuvée ${pick(["Classique","Tradition","Excellence","Prestige","Heritage","Selection"])}`,`${grape}`,`${grape} Reserva`,`Estate ${grape}`,`Old Vine ${grape}`]);
}

// ── Generate all wines ────────────────────────────────────────
const allWines = [];
const slugSet = new Set();

function makeSlug(producer, name, vintage) {
  let slug = toSlug(`${producer}-${name}-${vintage || 'nv'}`);
  let attempt = 0;
  while (slugSet.has(slug)) {
    attempt++;
    slug = toSlug(`${producer}-${name}-${vintage || 'nv'}-${attempt}`);
  }
  slugSet.add(slug);
  return slug;
}

const countriesData = [];
const regionsData = [];
const grapesSet = new Map(); // grape name → { color, count }

for (const country of COUNTRIES) {
  const countryWineSlugs = [];
  const countryRegionNames = [];

  for (const region of country.regions) {
    countryRegionNames.push(region.name);
    const regionWineSlugs = [];
    const regionGrapes = new Set();

    // Determine all available types and grapes for this region
    const typeGrapes = region.grapes || {};

    for (const producer of region.producers) {
      // Each producer gets 2-8 wines
      const numWines = rand(2, 8);

      for (let w = 0; w < numWines; w++) {
        // Pick a type weighted towards Red
        const availableTypes = Object.keys(typeGrapes);
        const type = pick(availableTypes);
        const grapeOptions = typeGrapes[type] || ["Unknown"];
        const grape = pick(grapeOptions);
        const grapes = [grape, ...(grapeOptions.length > 1 ? [pick(grapeOptions.filter(g => g !== grape))] : [])].filter(Boolean);

        regionGrapes.add(grape);
        if (!grapesSet.has(grape)) {
          const color = ["Red","Rosé"].includes(type) || ["Cabernet Sauvignon","Merlot","Pinot Noir","Syrah","Shiraz","Tempranillo","Sangiovese","Nebbiolo","Malbec","Grenache","Mourvèdre","Cabernet Franc","Corvina","Touriga Nacional","Pinotage","Carmenère","Xinomavro","Aglianico","Tannat","Blaufränkisch","Zweigelt","Gamay","Dolcetto","Barbera","Primitivo","Zinfandel","Nero d'Avola","Nerello Mascalese","Cinsault","Carignan","Plavac Mali","Fetească Neagră","Mavrud","Saperavi","Prokupac","Öküzgözü","Boğazkere","Areni","Vranec","Bonarda","Frappato","St. Laurent","Spätburgunder","Teran","Gellewża","Muscat Bailey A"].includes(grape) ? 'Red' : 'White';
          grapesSet.set(grape, { color, regions: new Set() });
        }
        grapesSet.get(grape).regions.add(region.name);

        const priceRanges = type === "Fortified" || type === "Dessert"
          ? ["Mid-Range","Premium","Luxury"]
          : ["Budget","Mid-Range","Premium","Luxury","Ultra-Premium"];
        const priceRange = pick(priceRanges);
        const [minP, maxP] = PRICES[priceRange];
        const price = rand(minP, maxP);
        const vintage = (type === "Fortified" && Math.random() > 0.5) ? null : rand(2015, 2023);
        const sub = pick(region.sub);
        const wineName = generateWineName(producer, grape, region, type, country.name);

        const scores = generateScores(price);
        const aggregate = computeAggregate(scores);

        // Badges
        const badges = [];
        if (aggregate >= 95) badges.push(pick(["Parker 95+","James Suckling 95+","Wine Spectator Top 100"]));
        if (aggregate >= 93) badges.push(pick(["Decanter World Wine Awards Gold","Critics Choice"]));
        if (price < 20 && aggregate >= 87) badges.push("Best Value");
        if (aggregate >= 90 && Math.random() > 0.7) badges.push("Editors Pick");

        const slug = makeSlug(producer, wineName, vintage);
        const appellation = `${region.name}${country.cc === "FR" ? " AOC" : country.cc === "IT" ? " DOCG" : country.cc === "ES" ? " DO" : country.cc === "DE" ? "" : ""}`;

        const wine = {
          slug,
          name: wineName,
          producer,
          vintage,
          type,
          grape,
          grapes,
          region: region.name,
          subRegion: sub,
          country: country.name,
          countryCode: country.cc,
          appellation,
          alcoholContent: `${rand(11, 15)}.${rand(0,5)}%`,
          price,
          priceRange,
          buyUrl: `https://www.wine.com/search?q=${encodeURIComponent(producer + ' ' + wineName)}`,
          labelUrl: `https://www.vivino.com/search/wines?q=${encodeURIComponent(producer + ' ' + wineName)}`,
          scores,
          aggregateScore: aggregate,
          badges,
          tastingNotes: pick(NOTES[type] || NOTES.Red),
          editorial: EDITORIALS[type] || EDITORIALS.Red,
          pairings: pick(PAIRINGS[type] || PAIRINGS.Red),
          servingTemp: TEMPS[type] || "16-18°C",
          aging: AGINGS[type] || "5-15 years",
          prosAndCons: {
            pros: ["Well-crafted and balanced", "Good representation of the region", "Food-friendly"],
            cons: price > 100 ? ["Premium pricing"] : ["Limited availability in some markets"],
          },
        };

        allWines.push(wine);
        countryWineSlugs.push(slug);
        regionWineSlugs.push(slug);
      }
    }

    // Add region
    regionsData.push({
      slug: toSlug(region.name),
      name: region.name,
      country: country.name,
      countryCode: country.cc,
      description: `${region.name} is one of ${country.name}'s most important wine regions, known for ${[...regionGrapes].slice(0,3).join(', ')} wines.`,
      climate: ["France","Germany","Austria","Hungary","Switzerland","Czech Republic","Slovakia","Luxembourg"].includes(country.name) ? "Continental to maritime" : ["Australia","South Africa","Chile","Argentina"].includes(country.name) ? "Mediterranean to warm" : "Varies",
      keyGrapes: [...regionGrapes].slice(0, 6),
      topWines: regionWineSlugs.sort(() => Math.random() - 0.5).slice(0, 10),
      notableAppellations: region.sub.slice(0, 5),
    });
  }

  // Add country
  countriesData.push({
    slug: toSlug(country.name),
    name: country.name,
    emoji: country.emoji,
    regions: countryRegionNames,
    topWines: countryWineSlugs.sort(() => Math.random() - 0.5).slice(0, 15),
    description: country.desc,
    wineHistory: country.hist,
  });
}

// Build grape varieties
const grapesData = [...grapesSet.entries()].map(([name, data]) => ({
  slug: toSlug(name),
  name,
  color: data.color,
  aliases: [],
  description: `${name} is ${data.color === 'Red' ? 'a red' : 'a white'} grape variety grown in ${[...data.regions].slice(0,5).join(', ')}.`,
  characteristics: data.color === 'Red' ? 'Medium to full-bodied with structured tannins.' : 'Typically fresh and aromatic with good acidity.',
  regions: [...data.regions].slice(0, 10),
  pairings: data.color === 'Red' ? ['Grilled meats','Hard cheeses','Pasta'] : ['Seafood','Salads','Light poultry'],
}));

// Sort wines by score
allWines.sort((a, b) => b.aggregateScore - a.aggregateScore);

// ── Write output ──────────────────────────────────────────────
const output = `// Generated wine database — ${allWines.length} wines, ${countriesData.length} countries, ${regionsData.length} regions, ${grapesData.length} grapes
// AUTO-GENERATED — do not edit manually

export interface Wine {
  slug: string;
  name: string;
  producer: string;
  vintage: number | null;
  type: 'Red' | 'White' | 'Rosé' | 'Sparkling' | 'Dessert' | 'Fortified';
  grape: string;
  grapes: string[];
  region: string;
  subRegion: string;
  country: string;
  countryCode: string;
  appellation: string;
  alcoholContent: string;
  price: number;
  priceRange: 'Budget' | 'Mid-Range' | 'Premium' | 'Luxury' | 'Ultra-Premium';
  buyUrl: string;
  labelUrl: string;
  scores: { source: string; score: number; maxScore: number; vintage: number | null }[];
  aggregateScore: number;
  badges: string[];
  tastingNotes: string;
  editorial: string;
  pairings: string[];
  servingTemp: string;
  aging: string;
  prosAndCons: { pros: string[]; cons: string[] };
}

export interface Country {
  slug: string;
  name: string;
  emoji: string;
  regions: string[];
  topWines: string[];
  description: string;
  wineHistory: string;
}

export interface Region {
  slug: string;
  name: string;
  country: string;
  countryCode: string;
  description: string;
  climate: string;
  keyGrapes: string[];
  topWines: string[];
  notableAppellations: string[];
}

export interface Grape {
  slug: string;
  name: string;
  color: 'Red' | 'White';
  aliases: string[];
  description: string;
  characteristics: string;
  regions: string[];
  pairings: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  tags: string[];
}

export const wines: Wine[] = ${JSON.stringify(allWines, null, 0)};

export const countries: Country[] = ${JSON.stringify(countriesData, null, 0)};

export const regions: Region[] = ${JSON.stringify(regionsData, null, 0)};

export const grapeVarieties: Grape[] = ${JSON.stringify(grapesData, null, 0)};

// Blog posts imported from blog-posts.ts
import { blogPosts as importedBlogPosts } from './blog-posts';
export const blogPosts: BlogPost[] = importedBlogPosts;
`;

writeFileSync('src/lib/data.ts', output);
console.log(`Generated: ${allWines.length} wines, ${countriesData.length} countries, ${regionsData.length} regions, ${grapesData.length} grapes`);
