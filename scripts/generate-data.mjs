#!/usr/bin/env node
// Generate the wine database programmatically
import { writeFileSync } from 'fs';
import { join } from 'path';

function toSlug(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// ── Wine definitions ──────────────────────────────────────────────
// Each entry: [name, producer, vintage, type, grape, grapes, region, subRegion, country, countryCode, appellation, alcohol, price, priceRange, scores, badges, tastingNotes, editorial, pairings, servingTemp, aging]

const wineTemplates = [
  // === FRANCE - BORDEAUX ===
  { name: "Château Lafite Rothschild", producer: "Château Lafite Rothschild", vintage: 2020, type: "Red", grape: "Cabernet Sauvignon", grapes: ["Cabernet Sauvignon", "Merlot", "Cabernet Franc", "Petit Verdot"], region: "Bordeaux", subRegion: "Pauillac", country: "France", cc: "FR", appellation: "Pauillac AOC", alcohol: "13.5%", price: 850, priceRange: "Ultra-Premium", badges: ["Parker 95+", "Wine Spectator Top 100", "James Suckling 95+"], notes: "Ethereal bouquet of blackcurrant, graphite, cedar, and violets. Silk-textured tannins frame a palate of extraordinary depth and precision.", editorial: "The 2020 Lafite is a masterclass in restraint and elegance. The estate's signature minerality shines through layers of dark fruit and tobacco, culminating in a finish that seems to last forever. This is a wine that demands patience — give it at least a decade in the cellar.", pairings: ["Rack of lamb", "Aged Comté", "Truffle risotto"], temp: "16-18°C", aging: "20-50 years" },
  { name: "Château Margaux", producer: "Château Margaux", vintage: 2019, type: "Red", grape: "Cabernet Sauvignon", grapes: ["Cabernet Sauvignon", "Merlot", "Petit Verdot", "Cabernet Franc"], region: "Bordeaux", subRegion: "Margaux", country: "France", cc: "FR", appellation: "Margaux AOC", alcohol: "13%", price: 750, priceRange: "Ultra-Premium", badges: ["Parker 95+", "Decanter World Wine Awards Gold"], notes: "Perfumed aromatics of rose petal, blackberry, and sweet spice. Velvety texture with exceptional finesse and a long, mineral-driven finish.", editorial: "The 2019 Margaux captures the essence of this legendary estate. Femininity and power coexist in perfect harmony, with layers of floral and dark fruit aromas that unfold over hours in the glass.", pairings: ["Filet mignon", "Duck confit", "Dark chocolate"], temp: "17-18°C", aging: "15-40 years" },
  { name: "Château Mouton Rothschild", producer: "Château Mouton Rothschild", vintage: 2020, type: "Red", grape: "Cabernet Sauvignon", grapes: ["Cabernet Sauvignon", "Merlot", "Cabernet Franc"], region: "Bordeaux", subRegion: "Pauillac", country: "France", cc: "FR", appellation: "Pauillac AOC", alcohol: "13.5%", price: 650, priceRange: "Ultra-Premium", badges: ["Parker 95+", "James Suckling 95+"], notes: "Opulent nose of cassis, roasted coffee, and exotic spice. Full-bodied with polished tannins and a hedonistic, almost decadent palate.", editorial: "Mouton's 2020 is unapologetically rich and luxurious. The signature opulence is tempered by freshness and structure, making this one of the great modern vintages from this First Growth estate.", pairings: ["Wagyu beef", "Venison", "Strong cheeses"], temp: "17-18°C", aging: "15-40 years" },
  { name: "Château Haut-Brion", producer: "Château Haut-Brion", vintage: 2019, type: "Red", grape: "Merlot", grapes: ["Merlot", "Cabernet Sauvignon", "Cabernet Franc"], region: "Bordeaux", subRegion: "Pessac-Léognan", country: "France", cc: "FR", appellation: "Pessac-Léognan AOC", alcohol: "14%", price: 700, priceRange: "Ultra-Premium", badges: ["Parker 95+", "Wine Spectator Top 100"], notes: "Complex nose of smoked herbs, warm gravel, ripe plum, and tobacco. Seamless and polished with an unusually long finish.", editorial: "Haut-Brion consistently delivers wines of intellectual beauty, and the 2019 is no exception. Its distinctive smoky minerality sets it apart from its Médoc peers, offering a truly unique Bordeaux experience.", pairings: ["Roast lamb", "Grilled portobello", "Aged Gruyère"], temp: "16-18°C", aging: "15-40 years" },
  { name: "Château Pétrus", producer: "Château Pétrus", vintage: 2018, type: "Red", grape: "Merlot", grapes: ["Merlot"], region: "Bordeaux", subRegion: "Pomerol", country: "France", cc: "FR", appellation: "Pomerol AOC", alcohol: "14.5%", price: 4500, priceRange: "Ultra-Premium", badges: ["Parker 95+", "James Suckling 100", "Critics Choice"], notes: "Extraordinary concentration of black truffle, iron, dark cherry, and mocha. Liquid velvet on the palate with an almost supernatural depth.", editorial: "Pétrus 2018 is one of the wines of the decade. Made from 100% Merlot grown on the famous clay plateau, it achieves a level of concentration and complexity that few wines in the world can match. A legend in the making.", pairings: ["Black truffle dishes", "Aged beef", "Foie gras"], temp: "17-18°C", aging: "20-60 years" },
  { name: "Château Cheval Blanc", producer: "Château Cheval Blanc", vintage: 2019, type: "Red", grape: "Cabernet Franc", grapes: ["Cabernet Franc", "Merlot"], region: "Bordeaux", subRegion: "Saint-Émilion", country: "France", cc: "FR", appellation: "Saint-Émilion Grand Cru AOC", alcohol: "13.5%", price: 600, priceRange: "Ultra-Premium", badges: ["Parker 95+", "Decanter World Wine Awards Platinum"], notes: "Expressive nose of raspberry, violets, and graphite. Satin-smooth tannins with vibrant acidity and extraordinary length.", editorial: "Cheval Blanc's unique blend of Cabernet Franc and Merlot produces a wine unlike any other in Bordeaux. The 2019 is perfumed, graceful, and intensely pleasurable from the first sip.", pairings: ["Lamb chops", "Mushroom tart", "Brie"], temp: "16-18°C", aging: "15-35 years" },
  { name: "Château Lynch-Bages", producer: "Château Lynch-Bages", vintage: 2020, type: "Red", grape: "Cabernet Sauvignon", grapes: ["Cabernet Sauvignon", "Merlot", "Cabernet Franc"], region: "Bordeaux", subRegion: "Pauillac", country: "France", cc: "FR", appellation: "Pauillac AOC", alcohol: "13%", price: 120, priceRange: "Luxury", badges: ["Parker 90+", "Best Value"], notes: "Bold blackcurrant, pencil shavings, and spice. Full-bodied with firm but ripe tannins and excellent concentration.", editorial: "Lynch-Bages consistently over-delivers for its classification. The 2020 offers the concentration and structure of wines costing three times the price, making it one of Bordeaux's greatest values.", pairings: ["Grilled steak", "Braised short ribs", "Hard cheeses"], temp: "17-18°C", aging: "10-25 years" },
  { name: "Château d'Yquem", producer: "Château d'Yquem", vintage: 2019, type: "Dessert", grape: "Sémillon", grapes: ["Sémillon", "Sauvignon Blanc"], region: "Bordeaux", subRegion: "Sauternes", country: "France", cc: "FR", appellation: "Sauternes AOC", alcohol: "14%", price: 450, priceRange: "Ultra-Premium", badges: ["Parker 95+", "James Suckling 95+", "Wine Spectator Top 100"], notes: "Golden amber color with aromas of apricot, honey, saffron, and crème brûlée. Luscious sweetness balanced by electric acidity.", editorial: "The greatest sweet wine in the world needs no introduction. The 2019 d'Yquem combines tropical richness with laser-like precision, offering a sensory experience that transcends category.", pairings: ["Foie gras", "Blue cheese", "Crème brûlée", "Peach tart"], temp: "8-10°C", aging: "20-100 years" },
  // === FRANCE - BURGUNDY ===
  { name: "Romanée-Conti Grand Cru", producer: "Domaine de la Romanée-Conti", vintage: 2020, type: "Red", grape: "Pinot Noir", grapes: ["Pinot Noir"], region: "Burgundy", subRegion: "Côte de Nuits", country: "France", cc: "FR", appellation: "Romanée-Conti AOC", alcohol: "13%", price: 25000, priceRange: "Ultra-Premium", badges: ["Parker 95+", "James Suckling 100", "Wine Spectator Top 100", "Critics Choice"], notes: "Transcendent aromatics of rose petal, cherry blossom, earth, and exotic spice. Impossibly delicate yet profoundly concentrated.", editorial: "There is no wine more legendary than Romanée-Conti. The 2020 is pure silk and poetry — a wine of supernatural beauty that defies the constraints of language. Only a few hundred cases exist.", pairings: ["Squab", "Wild mushrooms", "Aged Époisses"], temp: "15-16°C", aging: "15-50 years" },
  { name: "La Tâche Grand Cru", producer: "Domaine de la Romanée-Conti", vintage: 2019, type: "Red", grape: "Pinot Noir", grapes: ["Pinot Noir"], region: "Burgundy", subRegion: "Côte de Nuits", country: "France", cc: "FR", appellation: "La Tâche AOC", alcohol: "13%", price: 5000, priceRange: "Ultra-Premium", badges: ["Parker 95+", "James Suckling 95+"], notes: "Darker and more powerful than its sibling RC, with notes of blackberry, iron, and forest floor. Tremendous depth and structure.", editorial: "La Tâche is often considered DRC's most complete wine. The 2019 is monumental — a wine of extraordinary power and grace that will reward decades of patience.", pairings: ["Roast duck", "Venison", "Truffle"], temp: "15-16°C", aging: "15-40 years" },
  { name: "Musigny Grand Cru", producer: "Domaine Comte Georges de Vogüé", vintage: 2019, type: "Red", grape: "Pinot Noir", grapes: ["Pinot Noir"], region: "Burgundy", subRegion: "Côte de Nuits", country: "France", cc: "FR", appellation: "Musigny AOC", alcohol: "13%", price: 800, priceRange: "Ultra-Premium", badges: ["Parker 95+"], notes: "Haunting perfume of red roses, wild strawberry, and crushed stone. Ethereal and weightless on the palate yet deeply complex.", editorial: "De Vogüé's Musigny is Burgundy at its most sublime. The 2019 captures the vineyard's legendary delicacy with a crystalline purity that few wines achieve.", pairings: ["Quail", "Salmon", "Soft-ripened cheese"], temp: "15-16°C", aging: "10-30 years" },
  { name: "Chablis Grand Cru Les Clos", producer: "Domaine William Fèvre", vintage: 2021, type: "White", grape: "Chardonnay", grapes: ["Chardonnay"], region: "Burgundy", subRegion: "Chablis", country: "France", cc: "FR", appellation: "Chablis Grand Cru AOC", alcohol: "13%", price: 95, priceRange: "Premium", badges: ["Parker 90+", "Best Value"], notes: "Steely and precise with notes of flint, green apple, oyster shell, and lemon zest. Razor-sharp acidity and incredible mineral intensity.", editorial: "Les Clos is the undisputed king of Chablis Grand Crus, and Fèvre's rendition is exceptional. The 2021 is a wine of crystalline purity — the antithesis of oaky, buttery Chardonnay.", pairings: ["Oysters", "Grilled fish", "Sushi", "Goat cheese"], temp: "10-12°C", aging: "5-15 years" },
  { name: "Meursault Les Perrières Premier Cru", producer: "Domaine Coche-Dury", vintage: 2020, type: "White", grape: "Chardonnay", grapes: ["Chardonnay"], region: "Burgundy", subRegion: "Côte de Beaune", country: "France", cc: "FR", appellation: "Meursault Premier Cru AOC", alcohol: "13.5%", price: 1200, priceRange: "Ultra-Premium", badges: ["Parker 95+", "Jancis Robinson 19/20"], notes: "Mesmerizing depth of hazelnut, citrus oil, and wet stone. Full-bodied yet electrifyingly fresh with extraordinary persistence.", editorial: "Coche-Dury is the most sought-after white Burgundy producer, and Perrières is their crown jewel. The 2020 is almost impossibly concentrated while maintaining Burgundy's signature finesse.", pairings: ["Lobster", "White truffle", "Aged Comté"], temp: "12-14°C", aging: "10-25 years" },
  // === FRANCE - CHAMPAGNE ===
  { name: "Dom Pérignon", producer: "Moët & Chandon", vintage: 2015, type: "Sparkling", grape: "Chardonnay", grapes: ["Chardonnay", "Pinot Noir"], region: "Champagne", subRegion: "Champagne", country: "France", cc: "FR", appellation: "Champagne AOC", alcohol: "12.5%", price: 250, priceRange: "Luxury", badges: ["James Suckling 95+", "Wine Spectator Top 100"], notes: "Toasty brioche, candied citrus, white flowers, and almond. Creamy mousse with extraordinary precision and a seemingly endless finish.", editorial: "The 2015 Dom Pérignon is a triumph of balance. Rich yet ethereal, powerful yet graceful, it exemplifies why this remains the world's most famous prestige cuvée.", pairings: ["Caviar", "Lobster", "Sushi", "Celebrations"], temp: "8-10°C", aging: "5-20 years" },
  { name: "Cristal", producer: "Louis Roederer", vintage: 2015, type: "Sparkling", grape: "Pinot Noir", grapes: ["Pinot Noir", "Chardonnay"], region: "Champagne", subRegion: "Champagne", country: "France", cc: "FR", appellation: "Champagne AOC", alcohol: "12%", price: 300, priceRange: "Ultra-Premium", badges: ["Parker 95+", "James Suckling 95+"], notes: "Pure and crystalline with notes of white peach, chalk, citrus blossom, and toasted hazelnut. Pinpoint precision with incredible energy.", editorial: "Cristal 2015 is a wine of breathtaking purity. Now biodynamically farmed, this iconic cuvée has never been better — translucent, vibrant, and profoundly mineral.", pairings: ["Raw seafood", "Caviar", "Grilled langoustines"], temp: "8-10°C", aging: "5-25 years" },
  { name: "Krug Grande Cuvée", producer: "Krug", vintage: null, type: "Sparkling", grape: "Pinot Noir", grapes: ["Pinot Noir", "Chardonnay", "Pinot Meunier"], region: "Champagne", subRegion: "Champagne", country: "France", cc: "FR", appellation: "Champagne AOC", alcohol: "12%", price: 200, priceRange: "Luxury", badges: ["Parker 95+", "Critics Choice"], notes: "Incredibly complex aromas of brioche, marzipan, dried fruit, and honey. Multi-layered palate with a bold, generous character and immense depth.", editorial: "Krug Grande Cuvée is crafted from a blend of over 120 wines from 10+ vintages. Each edition is unique, and each is extraordinary — the pinnacle of non-vintage Champagne artistry.", pairings: ["Fried chicken", "Fish and chips", "Parmesan", "Sushi"], temp: "9-11°C", aging: "5-15 years" },
  // === FRANCE - RHÔNE ===
  { name: "Hermitage La Chapelle", producer: "Paul Jaboulet Aîné", vintage: 2019, type: "Red", grape: "Syrah", grapes: ["Syrah"], region: "Rhône Valley", subRegion: "Northern Rhône", country: "France", cc: "FR", appellation: "Hermitage AOC", alcohol: "13.5%", price: 180, priceRange: "Luxury", badges: ["Parker 95+", "Decanter World Wine Awards Gold"], notes: "Intense aromas of smoked meat, blackberry, violet, and cracked pepper. Full-bodied with velvety tannins and remarkable purity.", editorial: "La Chapelle is one of the Rhône's most iconic wines. The 2019 is a return to greatness — concentrated, complex, and built for the long haul.", pairings: ["Grilled lamb", "Game birds", "Strong blue cheese"], temp: "16-18°C", aging: "10-30 years" },
  { name: "Châteauneuf-du-Pape", producer: "Château de Beaucastel", vintage: 2020, type: "Red", grape: "Grenache", grapes: ["Grenache", "Mourvèdre", "Syrah", "Counoise"], region: "Rhône Valley", subRegion: "Southern Rhône", country: "France", cc: "FR", appellation: "Châteauneuf-du-Pape AOC", alcohol: "14.5%", price: 85, priceRange: "Premium", badges: ["Parker 90+", "Best Value"], notes: "Exotic aromas of garrigue herbs, leather, dark plum, and lavender. Full-bodied and earthy with spicy warmth and silky tannins.", editorial: "Beaucastel is the benchmark for Châteauneuf-du-Pape, utilizing all 13 permitted grape varieties. The 2020 is generous and complex — outstanding value for a wine of this quality.", pairings: ["Beef stew", "Lamb tagine", "Roasted vegetables"], temp: "16-18°C", aging: "8-20 years" },
  { name: "Côte-Rôtie La Landonne", producer: "E. Guigal", vintage: 2018, type: "Red", grape: "Syrah", grapes: ["Syrah"], region: "Rhône Valley", subRegion: "Northern Rhône", country: "France", cc: "FR", appellation: "Côte-Rôtie AOC", alcohol: "13.5%", price: 350, priceRange: "Ultra-Premium", badges: ["Parker 95+", "James Suckling 95+"], notes: "Dark, brooding, and massively concentrated. Blackberry liqueur, roasted meat, olive tapenade, and iron. Tannins like polished granite.", editorial: "Guigal's La Landonne is one of the legendary single-vineyard Côte-Rôties. The 2018 is a monument of Syrah — dark, powerful, and built for decades of evolution.", pairings: ["Wild boar", "Braised oxtail", "Aged Manchego"], temp: "17-18°C", aging: "15-30 years" },
  // === FRANCE - LOIRE & ALSACE ===
  { name: "Sancerre", producer: "Domaine Vacheron", vintage: 2022, type: "White", grape: "Sauvignon Blanc", grapes: ["Sauvignon Blanc"], region: "Loire Valley", subRegion: "Central Loire", country: "France", cc: "FR", appellation: "Sancerre AOC", alcohol: "13%", price: 35, priceRange: "Mid-Range", badges: ["Best Value"], notes: "Zippy citrus, white peach, and flinty minerality. Clean and precise with mouthwatering acidity and a saline finish.", editorial: "Vacheron's Sancerre is the gold standard for Loire Sauvignon Blanc. Biodynamically farmed and impeccably crafted, this is a wine of electric freshness and purity.", pairings: ["Goat cheese", "Shellfish", "Asparagus", "Garden salads"], temp: "8-10°C", aging: "2-5 years" },
  { name: "Riesling Grand Cru Rangen de Thann", producer: "Domaine Zind-Humbrecht", vintage: 2020, type: "White", grape: "Riesling", grapes: ["Riesling"], region: "Alsace", subRegion: "Alsace", country: "France", cc: "FR", appellation: "Alsace Grand Cru AOC", alcohol: "13%", price: 75, priceRange: "Premium", badges: ["Parker 90+", "Jancis Robinson 18/20"], notes: "Volcanic intensity with aromas of smoke, petrol, lime zest, and wet stone. Dry and powerful with piercing acidity and extraordinary texture.", editorial: "Rangen de Thann is Alsace's most extreme terroir — volcanic soils and fierce slopes. Zind-Humbrecht coaxes wines of haunting intensity and mineral depth from this remarkable vineyard.", pairings: ["Choucroute", "Smoked fish", "Thai curry"], temp: "10-12°C", aging: "5-20 years" },
  // === ITALY - TUSCANY ===
  { name: "Sassicaia", producer: "Tenuta San Guido", vintage: 2020, type: "Red", grape: "Cabernet Sauvignon", grapes: ["Cabernet Sauvignon", "Cabernet Franc"], region: "Tuscany", subRegion: "Bolgheri", country: "Italy", cc: "IT", appellation: "Bolgheri Sassicaia DOC", alcohol: "14%", price: 280, priceRange: "Ultra-Premium", badges: ["Parker 95+", "James Suckling 95+", "Wine Spectator Top 100"], notes: "Classic cassis, Mediterranean herbs, graphite, and sea breeze. Structured and elegant with fine-grained tannins and exceptional balance.", editorial: "Sassicaia is the wine that launched the Super Tuscan revolution. The 2020 is a stunning modern classic — powerful yet refined, with the signature maritime influence that sets Bolgheri apart from Bordeaux.", pairings: ["Bistecca alla fiorentina", "Wild boar ragù", "Pecorino Toscano"], temp: "17-18°C", aging: "10-30 years" },
  { name: "Tignanello", producer: "Marchesi Antinori", vintage: 2020, type: "Red", grape: "Sangiovese", grapes: ["Sangiovese", "Cabernet Sauvignon", "Cabernet Franc"], region: "Tuscany", subRegion: "Chianti Classico", country: "Italy", cc: "IT", appellation: "Toscana IGT", alcohol: "14%", price: 110, priceRange: "Luxury", badges: ["Parker 90+", "James Suckling 95+"], notes: "Vibrant cherry, plum, tobacco, and sweet spice. Medium-to-full body with silky tannins and lifted acidity.", editorial: "Tignanello was the original Super Tuscan. The 2020 continues the estate's 50-year tradition of blending Sangiovese with Cabernet to create wines of extraordinary character and accessibility.", pairings: ["Pasta with meat ragù", "Grilled lamb", "Aged Parmigiano"], temp: "16-18°C", aging: "8-20 years" },
  { name: "Brunello di Montalcino", producer: "Biondi-Santi", vintage: 2017, type: "Red", grape: "Sangiovese", grapes: ["Sangiovese Grosso"], region: "Tuscany", subRegion: "Montalcino", country: "Italy", cc: "IT", appellation: "Brunello di Montalcino DOCG", alcohol: "14%", price: 200, priceRange: "Luxury", badges: ["Parker 95+", "Decanter World Wine Awards Gold"], notes: "Pure and classical with dried cherry, leather, earth, and dried herbs. Medium-bodied with razor-sharp acidity and firm, age-worthy tannins.", editorial: "Biondi-Santi is the historic house of Brunello di Montalcino. The 2017 Riserva is quintessential Sangiovese — austere, intellectual, and designed for decades of cellar time.", pairings: ["Wild boar", "Aged cheeses", "Grilled meats"], temp: "17-18°C", aging: "15-40 years" },
  { name: "Ornellaia", producer: "Tenuta dell'Ornellaia", vintage: 2020, type: "Red", grape: "Cabernet Sauvignon", grapes: ["Cabernet Sauvignon", "Merlot", "Cabernet Franc", "Petit Verdot"], region: "Tuscany", subRegion: "Bolgheri", country: "Italy", cc: "IT", appellation: "Bolgheri Superiore DOC", alcohol: "14.5%", price: 220, priceRange: "Luxury", badges: ["James Suckling 95+", "Parker 90+"], notes: "Rich and layered with dark fruit, chocolate, espresso, and Mediterranean herbs. Full-bodied with plush tannins and a lingering, spicy finish.", editorial: "Ornellaia is Bolgheri's other great estate, producing wines of opulence and sophistication. The 2020 is generous and seductive — a wine of immediate pleasure that will also age beautifully.", pairings: ["Ossobuco", "Truffle pasta", "Aged Pecorino"], temp: "17-18°C", aging: "10-25 years" },
  // === ITALY - PIEDMONT ===
  { name: "Barolo Monfortino Riserva", producer: "Giacomo Conterno", vintage: 2015, type: "Red", grape: "Nebbiolo", grapes: ["Nebbiolo"], region: "Piedmont", subRegion: "Barolo", country: "Italy", cc: "IT", appellation: "Barolo DOCG", alcohol: "14.5%", price: 1500, priceRange: "Ultra-Premium", badges: ["Parker 95+", "James Suckling 100", "Wine Spectator Top 100"], notes: "Hauntingly complex aromas of tar, roses, dried cherry, and truffles. Massive structure with unbelievable depth, yet remarkably refined.", editorial: "Monfortino is Italy's most legendary wine — a Barolo of almost incomprehensible depth and longevity. The 2015 is already hailed as one of the greatest vintages ever produced.", pairings: ["White truffle risotto", "Braised veal", "Aged Parmigiano-Reggiano"], temp: "17-18°C", aging: "20-50+ years" },
  { name: "Barbaresco", producer: "Gaja", vintage: 2019, type: "Red", grape: "Nebbiolo", grapes: ["Nebbiolo"], region: "Piedmont", subRegion: "Barbaresco", country: "Italy", cc: "IT", appellation: "Barbaresco DOCG", alcohol: "14%", price: 250, priceRange: "Ultra-Premium", badges: ["Parker 90+", "James Suckling 95+"], notes: "Elegant nose of tar, roses, dark cherry, and licorice. More approachable than Barolo in youth, with silky tannins and vibrant acidity.", editorial: "Angelo Gaja transformed Barbaresco from a Barolo understudy into a world-class wine region. This 2019 is quintessential Gaja — modern, polished, and deeply expressive of its terroir.", pairings: ["Tajarin al tartufo", "Braised rabbit", "Fontina"], temp: "16-18°C", aging: "10-25 years" },
  // === ITALY - VENETO & OTHER ===
  { name: "Amarone della Valpolicella Classico", producer: "Giuseppe Quintarelli", vintage: 2013, type: "Red", grape: "Corvina", grapes: ["Corvina", "Rondinella", "Molinara"], region: "Veneto", subRegion: "Valpolicella", country: "Italy", cc: "IT", appellation: "Amarone della Valpolicella DOCG", alcohol: "16%", price: 350, priceRange: "Ultra-Premium", badges: ["Parker 95+"], notes: "Dense and luxurious with dried fig, chocolate, espresso, and balsamic. Full-bodied and concentrated with incredible richness and a bittersweet finish.", editorial: "Quintarelli is the undisputed king of Amarone. This wine, made from dried grapes using methods unchanged for generations, is a monument to traditional Italian winemaking at its absolute finest.", pairings: ["Aged cheeses", "Braised meats", "Dark chocolate", "After dinner"], temp: "18-20°C", aging: "15-30 years" },
  // === SPAIN ===
  { name: "Vega Sicilia Único", producer: "Bodegas Vega Sicilia", vintage: 2014, type: "Red", grape: "Tempranillo", grapes: ["Tempranillo", "Cabernet Sauvignon"], region: "Ribera del Duero", subRegion: "Ribera del Duero", country: "Spain", cc: "ES", appellation: "Ribera del Duero DO", alcohol: "14%", price: 450, priceRange: "Ultra-Premium", badges: ["Parker 95+", "James Suckling 95+", "Wine Spectator Top 100"], notes: "Complex nose of blackberry, cedar, vanilla, and balsamic. Elegant and powerful with polished tannins and an extraordinarily long finish.", editorial: "Único is Spain's most iconic wine, aged for 10 years before release. The 2014 is a masterpiece of patience and precision — a wine that bridges the Old World and the New.", pairings: ["Roast suckling pig", "Aged Manchego", "Ibérico ham"], temp: "17-18°C", aging: "15-40 years" },
  { name: "Pingus", producer: "Dominio de Pingus", vintage: 2019, type: "Red", grape: "Tempranillo", grapes: ["Tempranillo"], region: "Ribera del Duero", subRegion: "Ribera del Duero", country: "Spain", cc: "ES", appellation: "Ribera del Duero DO", alcohol: "14.5%", price: 850, priceRange: "Ultra-Premium", badges: ["Parker 95+", "James Suckling 100"], notes: "Explosively aromatic with blackberry, graphite, violets, and exotic spice. Monumental concentration with velvety, ultra-fine tannins.", editorial: "Peter Sisseck's Pingus has been one of Spain's most talked-about wines since its debut in 1995. The 2019, from old-vine Tempranillo, is a wine of staggering intensity and finesse.", pairings: ["Lamb shoulder", "Game meats", "Aged cheeses"], temp: "17-18°C", aging: "15-30 years" },
  { name: "L'Ermita Velles Vinyes", producer: "Álvaro Palacios", vintage: 2019, type: "Red", grape: "Garnacha", grapes: ["Garnacha", "Cariñena"], region: "Priorat", subRegion: "Priorat", country: "Spain", cc: "ES", appellation: "Priorat DOCa", alcohol: "14.5%", price: 600, priceRange: "Ultra-Premium", badges: ["Parker 95+", "Jancis Robinson 19/20"], notes: "Intense minerality with wild herbs, black cherry, slate, and balsamic. Full-bodied yet astonishingly fresh with a thrilling, electric finish.", editorial: "L'Ermita, from ancient Garnacha vines on terraced slate slopes, is one of Spain's greatest wines. Álvaro Palacios coaxes extraordinary mineral depth from this dramatic landscape.", pairings: ["Grilled octopus", "Lamb chops", "Roasted peppers"], temp: "16-18°C", aging: "10-25 years" },
  { name: "Rioja Gran Reserva 904", producer: "La Rioja Alta", vintage: 2015, type: "Red", grape: "Tempranillo", grapes: ["Tempranillo", "Graciano"], region: "Rioja", subRegion: "Rioja Alta", country: "Spain", cc: "ES", appellation: "Rioja DOCa", alcohol: "13.5%", price: 55, priceRange: "Premium", badges: ["Parker 90+", "Best Value", "Editors Pick"], notes: "Classic Rioja aromatics of dried cherry, leather, tobacco, and vanilla from American oak. Elegant and silky with beautiful aging character.", editorial: "The 904 is one of the great value wines of the world. Extended aging in American oak gives it the haunting complexity of wines costing ten times the price. An absolute benchmark.", pairings: ["Lamb stew", "Chorizo", "Manchego", "Roast chicken"], temp: "16-17°C", aging: "5-20 years" },
  // === USA - NAPA ===
  { name: "Opus One", producer: "Opus One Winery", vintage: 2020, type: "Red", grape: "Cabernet Sauvignon", grapes: ["Cabernet Sauvignon", "Merlot", "Cabernet Franc", "Petit Verdot", "Malbec"], region: "Napa Valley", subRegion: "Oakville", country: "United States", cc: "US", appellation: "Napa Valley AVA", alcohol: "14.5%", price: 450, priceRange: "Ultra-Premium", badges: ["Parker 95+", "James Suckling 95+"], notes: "Lush cassis, dark chocolate, espresso, and cedar. Full-bodied with velvety tannins, impeccable balance, and a long, polished finish.", editorial: "The Rothschild-Mondavi collaboration continues to produce one of Napa's most iconic wines. The 2020 Opus One is a stunning expression of Oakville terroir — rich, refined, and quintessentially Californian.", pairings: ["Prime rib", "Grilled lamb", "Aged Gouda"], temp: "17-18°C", aging: "10-25 years" },
  { name: "Screaming Eagle Cabernet Sauvignon", producer: "Screaming Eagle", vintage: 2019, type: "Red", grape: "Cabernet Sauvignon", grapes: ["Cabernet Sauvignon", "Merlot"], region: "Napa Valley", subRegion: "Oakville", country: "United States", cc: "US", appellation: "Napa Valley AVA", alcohol: "14.5%", price: 3500, priceRange: "Ultra-Premium", badges: ["Parker 95+", "James Suckling 100", "Critics Choice"], notes: "Extraordinary purity of dark fruit, graphite, violet, and sweet oak. Silky, seamless, and endlessly complex with a finish of breathtaking length.", editorial: "Screaming Eagle is America's most exclusive wine. The 2019 is near-perfection — a wine of such grace and intensity that it transcends the cult wine category entirely.", pairings: ["Wagyu beef", "Foie gras", "Black truffle"], temp: "17-18°C", aging: "15-35 years" },
  { name: "Caymus Special Selection Cabernet Sauvignon", producer: "Caymus Vineyards", vintage: 2019, type: "Red", grape: "Cabernet Sauvignon", grapes: ["Cabernet Sauvignon"], region: "Napa Valley", subRegion: "Rutherford", country: "United States", cc: "US", appellation: "Napa Valley AVA", alcohol: "15%", price: 200, priceRange: "Luxury", badges: ["Wine Spectator Top 100", "Parker 90+"], notes: "Rich and opulent with ripe blackberry, vanilla, cocoa, and toasty oak. Full-bodied, plush, and immediately pleasurable.", editorial: "Caymus Special Selection is one of Napa's most recognizable labels. The 2019 delivers the estate's signature style — bold, ripe, and unabashedly Californian. A crowd-pleaser par excellence.", pairings: ["BBQ ribs", "Grilled steak", "Chocolate desserts"], temp: "17-18°C", aging: "5-15 years" },
  { name: "Insignia", producer: "Joseph Phelps Vineyards", vintage: 2020, type: "Red", grape: "Cabernet Sauvignon", grapes: ["Cabernet Sauvignon", "Merlot", "Petit Verdot", "Malbec"], region: "Napa Valley", subRegion: "St. Helena", country: "United States", cc: "US", appellation: "Napa Valley AVA", alcohol: "14.5%", price: 300, priceRange: "Ultra-Premium", badges: ["Parker 95+", "Wine Spectator Top 100"], notes: "Deep and complex with blackberry, cassis, dark chocolate, and espresso. Full-bodied with supple tannins and extraordinary concentration.", editorial: "Insignia was America's first proprietary Bordeaux-style blend, and it remains one of its finest. The 2020 is a monumental wine — dense, layered, and built for the long haul.", pairings: ["Filet mignon", "Braised short ribs", "Aged cheeses"], temp: "17-18°C", aging: "10-25 years" },
  // === USA - OREGON & WASHINGTON ===
  { name: "Beaux Frères Pinot Noir", producer: "Beaux Frères", vintage: 2021, type: "Red", grape: "Pinot Noir", grapes: ["Pinot Noir"], region: "Willamette Valley", subRegion: "Ribbon Ridge", country: "United States", cc: "US", appellation: "Ribbon Ridge AVA", alcohol: "13.5%", price: 65, priceRange: "Premium", badges: ["Parker 90+"], notes: "Bright cherry, raspberry, forest floor, and baking spice. Silky and elegant with fine-grained tannins and beautiful length.", editorial: "Beaux Frères produces some of Oregon's most Burgundian Pinot Noirs. The 2021 is graceful and complex — proof that the Willamette Valley can rival the Côte d'Or for Pinot Noir excellence.", pairings: ["Roast chicken", "Salmon", "Wild mushrooms", "Soft cheeses"], temp: "14-16°C", aging: "5-12 years" },
  // === AUSTRALIA ===
  { name: "Grange", producer: "Penfolds", vintage: 2019, type: "Red", grape: "Shiraz", grapes: ["Shiraz", "Cabernet Sauvignon"], region: "South Australia", subRegion: "Multi-region", country: "Australia", cc: "AU", appellation: "South Australia", alcohol: "14.5%", price: 750, priceRange: "Ultra-Premium", badges: ["Parker 95+", "James Suckling 95+", "Wine Spectator Top 100"], notes: "Monumental nose of blackberry, dark chocolate, licorice, and smoked meat. Massively concentrated with velvety tannins and incredible persistence.", editorial: "Penfolds Grange is Australia's most iconic wine and one of the world's great reds. The 2019 continues a tradition of excellence spanning 70+ vintages — powerful, complex, and built to last.", pairings: ["Aged beef", "Braised lamb", "Strong cheeses"], temp: "17-18°C", aging: "15-40 years" },
  { name: "Hill of Grace", producer: "Henschke", vintage: 2018, type: "Red", grape: "Shiraz", grapes: ["Shiraz"], region: "Eden Valley", subRegion: "Eden Valley", country: "Australia", cc: "AU", appellation: "Eden Valley", alcohol: "14.5%", price: 650, priceRange: "Ultra-Premium", badges: ["Parker 95+", "James Suckling 95+"], notes: "Extraordinary elegance for Shiraz, with blackberry, violet, pepper, and earth. Full-bodied yet surprisingly refined with incredible length.", editorial: "From vines planted in the 1860s, Hill of Grace is Australian Shiraz at its most profound. The 2018 is a wine of rare beauty — powerful yet graceful, concentrated yet ethereal.", pairings: ["Kangaroo loin", "Grilled lamb", "Aged cheddar"], temp: "17-18°C", aging: "15-30 years" },
  { name: "Cloudy Bay Sauvignon Blanc", producer: "Cloudy Bay", vintage: 2023, type: "White", grape: "Sauvignon Blanc", grapes: ["Sauvignon Blanc"], region: "Marlborough", subRegion: "Marlborough", country: "New Zealand", cc: "NZ", appellation: "Marlborough", alcohol: "13.5%", price: 22, priceRange: "Mid-Range", badges: ["Best Value", "Editors Pick"], notes: "Vibrant gooseberry, passion fruit, and fresh-cut grass. Zesty and refreshing with mouthwatering acidity and a clean, mineral finish.", editorial: "Cloudy Bay put New Zealand Sauvignon Blanc on the world map. The 2023 is a textbook expression — explosively aromatic, crystal-clear, and endlessly refreshing. One of the world's great wine values.", pairings: ["Seafood", "Goat cheese", "Asian cuisine", "Salads"], temp: "8-10°C", aging: "1-3 years" },
  // === ARGENTINA ===
  { name: "Catena Zapata Malbec Argentino", producer: "Bodega Catena Zapata", vintage: 2020, type: "Red", grape: "Malbec", grapes: ["Malbec"], region: "Mendoza", subRegion: "Agrelo", country: "Argentina", cc: "AR", appellation: "Mendoza", alcohol: "14.5%", price: 120, priceRange: "Luxury", badges: ["Parker 95+", "James Suckling 95+"], notes: "Deep purple with aromas of blackberry, plum, violet, and dark chocolate. Full-bodied with plush tannins and a long, velvety finish.", editorial: "Nicolás Catena is the pioneer who elevated Argentine Malbec to world-class status. The Malbec Argentino is his masterwork — a wine of profound depth and elegance from high-altitude vineyards.", pairings: ["Argentine asado", "Empanadas", "Grilled steak", "Chimichurri"], temp: "16-18°C", aging: "8-20 years" },
  { name: "Malbec Reserva", producer: "Achaval-Ferrer", vintage: 2021, type: "Red", grape: "Malbec", grapes: ["Malbec"], region: "Mendoza", subRegion: "Mendoza", country: "Argentina", cc: "AR", appellation: "Mendoza", alcohol: "14%", price: 25, priceRange: "Mid-Range", badges: ["Best Value", "Parker 90+"], notes: "Ripe plum, blackberry, vanilla, and a hint of chocolate. Medium-to-full body with round, approachable tannins.", editorial: "Achaval-Ferrer's Reserva is proof that exceptional Malbec need not be expensive. At this price point, it delivers concentration and complexity that embarrass wines costing four times as much.", pairings: ["Grilled meats", "Pizza", "Burgers", "Empanadas"], temp: "16-17°C", aging: "3-7 years" },
  // === CHILE ===
  { name: "Don Melchor Cabernet Sauvignon", producer: "Concha y Toro", vintage: 2020, type: "Red", grape: "Cabernet Sauvignon", grapes: ["Cabernet Sauvignon", "Cabernet Franc", "Merlot"], region: "Maipo Valley", subRegion: "Puente Alto", country: "Chile", cc: "CL", appellation: "Maipo Valley DO", alcohol: "14.5%", price: 75, priceRange: "Premium", badges: ["Parker 90+", "James Suckling 95+", "Best Value"], notes: "Elegant cassis, eucalyptus, tobacco, and mineral notes. Structured with fine tannins and exceptional balance between fruit and freshness.", editorial: "Don Melchor is Chile's most acclaimed Cabernet Sauvignon, consistently rivaling wines from Napa and Bordeaux at a fraction of the price. The 2020 is a stellar vintage.", pairings: ["Lamb", "Beef tenderloin", "Aged cheeses"], temp: "17-18°C", aging: "8-20 years" },
  // === GERMANY ===
  { name: "Scharzhofberger Riesling Spätlese", producer: "Egon Müller", vintage: 2021, type: "White", grape: "Riesling", grapes: ["Riesling"], region: "Mosel", subRegion: "Saar", country: "Germany", cc: "DE", appellation: "Mosel", alcohol: "8%", price: 120, priceRange: "Luxury", badges: ["Parker 95+", "Jancis Robinson 19/20"], notes: "Ethereal aromas of green apple, slate, lime blossom, and honey. Racy acidity with delicate sweetness and crystalline purity.", editorial: "Egon Müller's Scharzhofberger is the pinnacle of Mosel Riesling. At just 8% alcohol, this wine achieves an impossible balance of sweetness, acidity, and mineral intensity. Pure magic.", pairings: ["Foie gras", "Spicy Asian cuisine", "Blue cheese", "Fruit desserts"], temp: "8-10°C", aging: "10-30 years" },
  { name: "Riesling Trocken GG Kirchenstück", producer: "Weingut Dr. Bürklin-Wolf", vintage: 2021, type: "White", grape: "Riesling", grapes: ["Riesling"], region: "Pfalz", subRegion: "Pfalz", country: "Germany", cc: "DE", appellation: "Pfalz", alcohol: "13%", price: 65, priceRange: "Premium", badges: ["Parker 90+"], notes: "Bone-dry with explosive aromatics of peach, citrus, and crushed limestone. Full-bodied for Riesling with remarkable texture and depth.", editorial: "Kirchenstück in Forst is one of Germany's greatest vineyard sites. Bürklin-Wolf's biodynamic GG is a stunning dry Riesling that proves the grape's ability to produce powerful, age-worthy wines.", pairings: ["Schnitzel", "Grilled white fish", "Sushi"], temp: "10-12°C", aging: "5-15 years" },
  // === PORTUGAL ===
  { name: "Barca Velha", producer: "Casa Ferreirinha", vintage: 2015, type: "Red", grape: "Touriga Nacional", grapes: ["Touriga Nacional", "Touriga Franca", "Tinta Roriz", "Tinta Cão"], region: "Douro", subRegion: "Douro Superior", country: "Portugal", cc: "PT", appellation: "Douro DOC", alcohol: "14%", price: 350, priceRange: "Ultra-Premium", badges: ["Parker 95+", "James Suckling 95+"], notes: "Dark and brooding with black fruit, graphite, tobacco, and wild herbs. Full-bodied with superb structure and an amazingly long, complex finish.", editorial: "Barca Velha is Portugal's most legendary wine, produced only in exceptional years. The 2015 is a monument to the Douro Valley — powerful, complex, and truly world-class.", pairings: ["Roast kid", "Bacalhau", "Aged cheese"], temp: "17-18°C", aging: "15-30 years" },
  { name: "Vintage Port", producer: "Taylor's", vintage: 2017, type: "Fortified", grape: "Touriga Nacional", grapes: ["Touriga Nacional", "Touriga Franca", "Tinta Roriz", "Tinta Barroca"], region: "Douro", subRegion: "Douro", country: "Portugal", cc: "PT", appellation: "Porto DOC", alcohol: "20%", price: 85, priceRange: "Premium", badges: ["Parker 95+", "Wine Spectator Top 100"], notes: "Intense blackberry, chocolate, violet, and spice. Massively concentrated with perfect sweetness balance and incredible grip.", editorial: "Taylor's is the benchmark Port house, and the 2017 is one of the great declared vintages. This wine will evolve for decades, developing extraordinary complexity with age.", pairings: ["Stilton", "Dark chocolate", "Walnuts", "After dinner"], temp: "16-18°C", aging: "20-60 years" },
  // === NEW ZEALAND ===
  { name: "Craggy Range Te Muna Road Vineyard Pinot Noir", producer: "Craggy Range", vintage: 2021, type: "Red", grape: "Pinot Noir", grapes: ["Pinot Noir"], region: "Martinborough", subRegion: "Wairarapa", country: "New Zealand", cc: "NZ", appellation: "Martinborough", alcohol: "13.5%", price: 45, priceRange: "Premium", badges: ["Parker 90+", "Decanter World Wine Awards Gold"], notes: "Dark cherry, plum, earthy spice, and a hint of smoke. Medium-bodied with silky tannins and vibrant, pure fruit.", editorial: "Craggy Range's Te Muna Road vineyard produces Pinot Noir of remarkable depth and complexity. The 2021 is elegant and expressive — a benchmark for New Zealand Pinot Noir.", pairings: ["Duck", "Salmon", "Mushroom dishes", "Brie"], temp: "14-16°C", aging: "5-10 years" },
  // === SOUTH AFRICA ===
  { name: "Columella", producer: "The Sadie Family Wines", vintage: 2020, type: "Red", grape: "Syrah", grapes: ["Syrah", "Mourvèdre"], region: "Swartland", subRegion: "Swartland", country: "South Africa", cc: "ZA", appellation: "Swartland WO", alcohol: "14%", price: 90, priceRange: "Premium", badges: ["Parker 95+", "Tim Atkin 95+"], notes: "Profound aromatics of black olive, garrigue, pepper, and dark fruit. Medium-to-full body with extraordinary mineral complexity and elegant structure.", editorial: "Eben Sadie's Columella has put South Africa's Swartland on the world wine map. The 2020 is a wine of remarkable originality — Mediterranean in spirit, African in soul.", pairings: ["Braai meats", "Bobotie", "Lamb curry", "Aged Gouda"], temp: "16-18°C", aging: "8-20 years" },
  { name: "Kanonkop Paul Sauer", producer: "Kanonkop", vintage: 2019, type: "Red", grape: "Cabernet Sauvignon", grapes: ["Cabernet Sauvignon", "Cabernet Franc", "Merlot"], region: "Stellenbosch", subRegion: "Simonsberg-Stellenbosch", country: "South Africa", cc: "ZA", appellation: "Stellenbosch WO", alcohol: "14%", price: 45, priceRange: "Premium", badges: ["Tim Atkin 95+", "Best Value"], notes: "Classic Bordeaux-style with cassis, cedar, pencil shavings, and dark plum. Structured and elegant with fine tannins and excellent aging potential.", editorial: "Paul Sauer is South Africa's answer to the great Bordeaux blends. At under $50, it consistently delivers quality that rivals wines costing five times the price. An extraordinary value.", pairings: ["Roast lamb", "Grilled steak", "Aged cheddar"], temp: "16-18°C", aging: "8-20 years" },
  // === AUSTRIA ===
  { name: "Grüner Veltliner Smaragd Kellerberg", producer: "F.X. Pichler", vintage: 2021, type: "White", grape: "Grüner Veltliner", grapes: ["Grüner Veltliner"], region: "Wachau", subRegion: "Wachau", country: "Austria", cc: "AT", appellation: "Wachau DAC", alcohol: "14%", price: 85, priceRange: "Premium", badges: ["Parker 90+", "Jancis Robinson 18/20"], notes: "Rich and powerful with white pepper, stone fruit, lentil, and honey. Full-bodied with razor acidity and incredible mineral persistence.", editorial: "F.X. Pichler is Austria's most celebrated producer, and the Kellerberg Smaragd is his crown jewel. This is Grüner Veltliner at its most profound — a wine to rival the finest white Burgundies.", pairings: ["Wiener Schnitzel", "Asparagus", "Sushi", "White fish"], temp: "10-12°C", aging: "5-15 years" },
  // === LEBANON ===
  { name: "Château Musar Red", producer: "Château Musar", vintage: 2017, type: "Red", grape: "Cabernet Sauvignon", grapes: ["Cabernet Sauvignon", "Cinsault", "Carignan"], region: "Bekaa Valley", subRegion: "Bekaa Valley", country: "Lebanon", cc: "LB", appellation: "Bekaa Valley", alcohol: "14%", price: 40, priceRange: "Mid-Range", badges: ["Decanter World Wine Awards Gold", "Best Value"], notes: "Exotic aromatics of dried fruit, leather, spice, and earth. Medium-bodied with a unique, haunting character and extraordinary complexity for the price.", editorial: "Château Musar is Lebanon's legendary estate, producing wine through decades of civil war. The unique blend and extended aging create a wine unlike anything else in the world — genuinely irreplaceable.", pairings: ["Lebanese mezze", "Lamb kofta", "Aged cheeses", "Spiced dishes"], temp: "16-18°C", aging: "10-30 years" },
  // === GREECE ===
  { name: "Naoussa Xinomavro", producer: "Domaine Thymiopoulos", vintage: 2020, type: "Red", grape: "Xinomavro", grapes: ["Xinomavro"], region: "Naoussa", subRegion: "Naoussa", country: "Greece", cc: "GR", appellation: "Naoussa PDO", alcohol: "13.5%", price: 22, priceRange: "Mid-Range", badges: ["Best Value"], notes: "Aromas of dried tomato, olive, red cherry, and earth. Medium-bodied with firm, Nebbiolo-like tannins and high acidity.", editorial: "Xinomavro is Greece's noblest red grape, often compared to Nebbiolo. Thymiopoulos makes one of the most compelling expressions — traditional, age-worthy, and an incredible value.", pairings: ["Moussaka", "Lamb souvlaki", "Feta", "Grilled vegetables"], temp: "15-17°C", aging: "5-15 years" },
];

// Generate scores for each wine
function generateScores(wine) {
  const sources = [
    { name: "Wine Spectator", max: 100 },
    { name: "Robert Parker", max: 100 },
    { name: "James Suckling", max: 100 },
    { name: "Decanter", max: 100 },
    { name: "Wine Enthusiast", max: 100 },
    { name: "Vivino", max: 5 },
    { name: "Jancis Robinson", max: 20 },
    { name: "Tim Atkin", max: 100 },
  ];

  // Base score from price
  let baseScore;
  if (wine.price > 500) baseScore = 95;
  else if (wine.price > 200) baseScore = 93;
  else if (wine.price > 100) baseScore = 91;
  else if (wine.price > 50) baseScore = 89;
  else if (wine.price > 25) baseScore = 87;
  else baseScore = 85;

  // Add some variance
  const scores = [];
  const numScores = 3 + Math.floor(Math.random() * 4); // 3-6 scores
  const selectedSources = sources.sort(() => Math.random() - 0.5).slice(0, numScores);

  for (const source of selectedSources) {
    const variance = Math.floor(Math.random() * 5) - 2; // -2 to +2
    let score;
    if (source.max === 100) {
      score = Math.min(100, Math.max(80, baseScore + variance));
    } else if (source.max === 20) {
      score = Math.min(20, Math.max(14, Math.round((baseScore + variance) / 5)));
    } else { // Vivino 5-point
      score = Math.min(5.0, Math.max(3.5, Math.round(((baseScore + variance) / 20) * 10) / 10));
    }
    scores.push({ source: source.name, score, maxScore: source.max, vintage: wine.vintage });
  }

  return scores;
}

function computeAggregate(scores) {
  let total = 0;
  let count = 0;
  for (const s of scores) {
    let normalized;
    if (s.maxScore === 100) normalized = s.score;
    else if (s.maxScore === 20) normalized = (s.score / 20) * 100;
    else if (s.maxScore === 5) normalized = (s.score / 5) * 100;
    else normalized = s.score;
    total += normalized;
    count++;
  }
  return Math.round(total / count);
}

// Generate additional wines to reach 500+
const additionalWines = [];
const additionalCountries = [
  { country: "France", cc: "FR", regions: [
    { region: "Bordeaux", subRegion: "Saint-Julien", appellation: "Saint-Julien AOC", grapes: ["Cabernet Sauvignon", "Merlot"], type: "Red" },
    { region: "Bordeaux", subRegion: "Graves", appellation: "Graves AOC", grapes: ["Merlot", "Cabernet Sauvignon"], type: "Red" },
    { region: "Burgundy", subRegion: "Côte de Beaune", appellation: "Puligny-Montrachet AOC", grapes: ["Chardonnay"], type: "White" },
    { region: "Languedoc-Roussillon", subRegion: "Languedoc", appellation: "Languedoc AOC", grapes: ["Grenache", "Syrah", "Mourvèdre"], type: "Red" },
    { region: "Provence", subRegion: "Provence", appellation: "Côtes de Provence AOC", grapes: ["Grenache", "Cinsault", "Syrah"], type: "Rosé" },
  ]},
  { country: "Italy", cc: "IT", regions: [
    { region: "Piedmont", subRegion: "Barolo", appellation: "Barolo DOCG", grapes: ["Nebbiolo"], type: "Red" },
    { region: "Tuscany", subRegion: "Chianti Classico", appellation: "Chianti Classico DOCG", grapes: ["Sangiovese"], type: "Red" },
    { region: "Sicily", subRegion: "Etna", appellation: "Etna DOC", grapes: ["Nerello Mascalese"], type: "Red" },
    { region: "Veneto", subRegion: "Prosecco", appellation: "Prosecco DOC", grapes: ["Glera"], type: "Sparkling" },
    { region: "Puglia", subRegion: "Primitivo di Manduria", appellation: "Primitivo di Manduria DOC", grapes: ["Primitivo"], type: "Red" },
  ]},
  { country: "Spain", cc: "ES", regions: [
    { region: "Rioja", subRegion: "Rioja Alavesa", appellation: "Rioja DOCa", grapes: ["Tempranillo"], type: "Red" },
    { region: "Ribera del Duero", subRegion: "Ribera del Duero", appellation: "Ribera del Duero DO", grapes: ["Tempranillo"], type: "Red" },
    { region: "Cava", subRegion: "Penedès", appellation: "Cava DO", grapes: ["Macabeo", "Xarel·lo", "Parellada"], type: "Sparkling" },
    { region: "Sherry", subRegion: "Jerez", appellation: "Jerez-Xérès-Sherry DO", grapes: ["Palomino Fino"], type: "Fortified" },
  ]},
  { country: "United States", cc: "US", regions: [
    { region: "Napa Valley", subRegion: "Stags Leap District", appellation: "Stags Leap District AVA", grapes: ["Cabernet Sauvignon"], type: "Red" },
    { region: "Sonoma", subRegion: "Russian River Valley", appellation: "Russian River Valley AVA", grapes: ["Pinot Noir"], type: "Red" },
    { region: "Sonoma", subRegion: "Sonoma Coast", appellation: "Sonoma Coast AVA", grapes: ["Chardonnay"], type: "White" },
    { region: "Willamette Valley", subRegion: "Dundee Hills", appellation: "Dundee Hills AVA", grapes: ["Pinot Noir"], type: "Red" },
    { region: "Washington State", subRegion: "Walla Walla Valley", appellation: "Walla Walla Valley AVA", grapes: ["Syrah"], type: "Red" },
  ]},
  { country: "Australia", cc: "AU", regions: [
    { region: "Barossa Valley", subRegion: "Barossa Valley", appellation: "Barossa Valley GI", grapes: ["Shiraz"], type: "Red" },
    { region: "McLaren Vale", subRegion: "McLaren Vale", appellation: "McLaren Vale GI", grapes: ["Shiraz", "Grenache"], type: "Red" },
    { region: "Margaret River", subRegion: "Margaret River", appellation: "Margaret River GI", grapes: ["Cabernet Sauvignon"], type: "Red" },
    { region: "Yarra Valley", subRegion: "Yarra Valley", appellation: "Yarra Valley GI", grapes: ["Pinot Noir"], type: "Red" },
    { region: "Hunter Valley", subRegion: "Hunter Valley", appellation: "Hunter Valley GI", grapes: ["Sémillon"], type: "White" },
  ]},
  { country: "Argentina", cc: "AR", regions: [
    { region: "Mendoza", subRegion: "Uco Valley", appellation: "Uco Valley", grapes: ["Malbec"], type: "Red" },
    { region: "Mendoza", subRegion: "Luján de Cuyo", appellation: "Luján de Cuyo", grapes: ["Malbec"], type: "Red" },
    { region: "Salta", subRegion: "Cafayate", appellation: "Cafayate", grapes: ["Torrontés"], type: "White" },
  ]},
  { country: "Chile", cc: "CL", regions: [
    { region: "Colchagua Valley", subRegion: "Apalta", appellation: "Colchagua Valley DO", grapes: ["Carmenère"], type: "Red" },
    { region: "Casablanca Valley", subRegion: "Casablanca", appellation: "Casablanca Valley DO", grapes: ["Sauvignon Blanc"], type: "White" },
  ]},
  { country: "New Zealand", cc: "NZ", regions: [
    { region: "Marlborough", subRegion: "Wairau Valley", appellation: "Marlborough", grapes: ["Sauvignon Blanc"], type: "White" },
    { region: "Central Otago", subRegion: "Bannockburn", appellation: "Central Otago", grapes: ["Pinot Noir"], type: "Red" },
  ]},
  { country: "South Africa", cc: "ZA", regions: [
    { region: "Stellenbosch", subRegion: "Stellenbosch", appellation: "Stellenbosch WO", grapes: ["Pinotage"], type: "Red" },
    { region: "Walker Bay", subRegion: "Hemel-en-Aarde", appellation: "Walker Bay WO", grapes: ["Pinot Noir"], type: "Red" },
  ]},
  { country: "Germany", cc: "DE", regions: [
    { region: "Rheingau", subRegion: "Rheingau", appellation: "Rheingau", grapes: ["Riesling"], type: "White" },
    { region: "Mosel", subRegion: "Mosel", appellation: "Mosel", grapes: ["Riesling"], type: "White" },
  ]},
  { country: "Portugal", cc: "PT", regions: [
    { region: "Alentejo", subRegion: "Alentejo", appellation: "Alentejo DOC", grapes: ["Touriga Nacional", "Alicante Bouschet"], type: "Red" },
    { region: "Vinho Verde", subRegion: "Minho", appellation: "Vinho Verde DOC", grapes: ["Alvarinho"], type: "White" },
  ]},
  { country: "Austria", cc: "AT", regions: [
    { region: "Kamptal", subRegion: "Kamptal", appellation: "Kamptal DAC", grapes: ["Grüner Veltliner"], type: "White" },
  ]},
];

const producers = {
  "France-Bordeaux-Red": ["Château Léoville-Las Cases", "Château Ducru-Beaucaillou", "Château Montrose", "Château Cos d'Estournel", "Château Calon-Ségur", "Château Pichon-Longueville", "Château Gruaud-Larose", "Château Talbot", "Château Beychevelle", "Château Palmer", "Château Branaire-Ducru", "Château Saint-Pierre", "Château Gloria", "Château Langoa Barton", "Château Léoville-Barton"],
  "France-Burgundy-White": ["Domaine Leflaive", "Domaine Roulot", "Domaine Ramonet", "Olivier Leflaive", "Louis Jadot", "Joseph Drouhin", "Domaine Étienne Sauzet"],
  "France-Languedoc-Roussillon-Red": ["Gérard Bertrand", "Domaine de la Grange des Pères", "Mas de Daumas Gassac", "Château de la Négly"],
  "France-Provence-Rosé": ["Domaines Ott", "Château d'Esclans Whispering Angel", "Miraval", "Château Minuty"],
  "Italy-Piedmont-Red": ["Vietti", "Bartolo Mascarello", "Bruno Giacosa", "Marchesi di Barolo", "Ceretto", "Elio Grasso"],
  "Italy-Tuscany-Red": ["Castello di Ama", "Fontodi", "Isole e Olena", "Castello dei Rampolla", "San Felice", "Felsina"],
  "Italy-Sicily-Red": ["Planeta", "Donnafugata", "Benanti", "Frank Cornelissen"],
  "Italy-Veneto-Sparkling": ["Bisol", "Nino Franco", "Ruggeri", "La Marca"],
  "Italy-Puglia-Red": ["Tormaresca", "San Marzano", "Gianfranco Fino"],
  "Spain-Rioja-Red": ["Marqués de Murrieta", "López de Heredia", "CVNE", "Muga", "Bodegas Roda", "Artadi", "Remírez de Ganuza"],
  "Spain-Ribera del Duero-Red": ["Pesquera", "Protos", "Hacienda Monasterio", "Alión"],
  "Spain-Cava-Sparkling": ["Gramona", "Recaredo", "Juvé y Camps"],
  "Spain-Sherry-Fortified": ["Gonzalez Byass Tio Pepe", "Lustau", "Valdespino", "El Maestro Sierra"],
  "United States-Napa Valley-Red": ["Stag's Leap Wine Cellars", "Silver Oak", "Duckhorn", "Shafer", "Cakebread", "Far Niente", "Spottswoode", "Heitz Cellar", "Dominus", "Harlan Estate"],
  "United States-Sonoma-Red": ["Williams Selyem", "Littorai", "Kistler", "Flowers"],
  "United States-Sonoma-White": ["Peter Michael", "Kistler", "Ramey"],
  "United States-Willamette Valley-Red": ["Domaine Drouhin Oregon", "Bergström", "Ken Wright"],
  "United States-Washington State-Red": ["Cayuse", "K Vintners", "Gramercy Cellars"],
  "Australia-Barossa Valley-Red": ["Torbreck", "Two Hands", "Yalumba", "Peter Lehmann", "Grant Burge"],
  "Australia-McLaren Vale-Red": ["d'Arenberg", "Wirra Wirra", "Yangarra"],
  "Australia-Margaret River-Red": ["Vasse Felix", "Leeuwin Estate", "Cullen", "Moss Wood"],
  "Australia-Yarra Valley-Red": ["De Bortoli", "Giant Steps", "Yering Station"],
  "Australia-Hunter Valley-White": ["Tyrrell's", "Brokenwood", "Mount Pleasant"],
  "Argentina-Mendoza-Red": ["Zuccardi", "Trapiche", "Norton", "Luigi Bosca", "Clos de los Siete"],
  "Argentina-Salta-White": ["Colomé", "El Esteco"],
  "Chile-Colchagua Valley-Red": ["Montes Alpha", "Casa Lapostolle", "Clos Apalta"],
  "Chile-Casablanca Valley-White": ["Casas del Bosque", "Viña Casablanca"],
  "New Zealand-Marlborough-White": ["Villa Maria", "Dog Point", "Greywacke", "Craggy Range"],
  "New Zealand-Central Otago-Red": ["Felton Road", "Rippon", "Burn Cottage"],
  "South Africa-Stellenbosch-Red": ["Rust en Vrede", "Meerlust", "Warwick"],
  "South Africa-Walker Bay-Red": ["Hamilton Russell", "Bouchard Finlayson"],
  "Germany-Rheingau-White": ["Robert Weil", "Schloss Johannisberg", "Georg Breuer"],
  "Germany-Mosel-White": ["Dr. Loosen", "Joh. Jos. Prüm", "Markus Molitor"],
  "Portugal-Alentejo-Red": ["Herdade do Esporão", "Quinta do Carmo", "Monte da Ravasqueira"],
  "Portugal-Vinho Verde-White": ["Anselmo Mendes", "Soalheiro"],
  "Austria-Kamptal-White": ["Bründlmayer", "Schloss Gobelsburg", "Jurtschitsch"],
};

const notes = {
  "Red": [
    "Rich dark fruit, spice, and oak. Full-bodied with firm tannins and a long finish.",
    "Complex aromas of blackberry, plum, and earth. Medium-to-full body with velvety texture.",
    "Ripe cherry, tobacco, and leather. Elegant and structured with excellent aging potential.",
    "Bold cassis, dark chocolate, and espresso. Powerful yet balanced with polished tannins.",
    "Vibrant red fruit, cedar, and vanilla. Smooth and approachable with a spicy finish.",
    "Dense blackberry, smoked meat, and pepper. Concentrated and intense with great depth.",
    "Delicate raspberry, rose petal, and forest floor. Silky and refined with beautiful finesse.",
    "Lush plum, mocha, and toasted oak. Generous and warming with a long, sweet finish.",
  ],
  "White": [
    "Crisp citrus, green apple, and mineral notes. Clean and refreshing with bright acidity.",
    "Rich stone fruit, honey, and toasted almond. Full-bodied with buttery texture and long finish.",
    "Zippy lime, grapefruit, and herbal notes. Light and fresh with mouthwatering acidity.",
    "Elegant peach, white flower, and flinty minerality. Balanced and precise with great length.",
    "Tropical mango, pineapple, and vanilla. Round and generous with a creamy palate.",
    "Steely and precise with notes of green apple, chalk, and lemon zest. Electric acidity.",
  ],
  "Rosé": [
    "Pale salmon color with aromas of wild strawberry, citrus, and Provençal herbs. Dry and refreshing.",
    "Bright watermelon, peach, and rose petal. Crisp and elegant with a clean, dry finish.",
    "Salmon pink with notes of red berries, grapefruit, and garrigue. Bone-dry with great freshness.",
  ],
  "Sparkling": [
    "Fine bubbles with notes of brioche, apple, and citrus. Creamy mousse with a crisp, clean finish.",
    "Toasty and complex with dried fruit, honey, and biscuit. Elegant and persistent.",
    "Fresh and fruity with green apple, pear, and white flowers. Light and easy-drinking.",
  ],
  "Dessert": [
    "Golden amber with aromas of apricot, honey, and saffron. Luscious sweetness balanced by acidity.",
    "Rich and unctuous with dried fruit, caramel, and spice. Long, sweet, and utterly indulgent.",
  ],
  "Fortified": [
    "Intense and complex with dark fruit, spice, and nuts. Sweet with firm structure and great length.",
    "Dry and nutty with almond, dried fruit, and sea salt. Complex and elegant with incredible depth.",
  ],
};

const editorials = {
  "Red": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
  "White": "A beautifully crafted white wine that showcases the producer's commitment to quality. The balance between fruit expression and mineral complexity speaks to thoughtful winemaking, while the acidity backbone ensures freshness and food-friendliness. This is the kind of wine that converts casual drinkers into enthusiasts.",
  "Rosé": "This rosé demonstrates that the category has evolved far beyond simple summer sippers. With careful fruit selection and precise winemaking, this producer delivers a wine of genuine complexity and elegance. Perfect for warm-weather dining but sophisticated enough for year-round enjoyment.",
  "Sparkling": "A sparkling wine that speaks to the quality of its base wines and the skill of its production. The mousse is fine and persistent, the aromatics complex, and the palate delivers both pleasure and complexity. Whether for celebration or simply elevating an everyday moment.",
  "Dessert": "This dessert wine achieves the rare balance of sweetness and freshness that defines the category at its best. The concentration of flavors speaks to the quality of the fruit, while the acidity ensures the wine never becomes cloying. A magnificent conclusion to any meal.",
  "Fortified": "A fortified wine that honors centuries of tradition while delivering genuine complexity and pleasure. The balance of sweetness, acidity, and alcohol is impeccable, creating a wine that rewards contemplation and pairs beautifully with cheese, chocolate, or quiet reflection.",
};

const pairingsMap = {
  "Red": [["Grilled steak", "Braised lamb", "Hard cheeses"], ["Roast beef", "Pasta with meat sauce", "Dark chocolate"], ["Wild game", "Mushroom dishes", "Aged Gouda"]],
  "White": [["Grilled fish", "Shellfish", "Goat cheese"], ["Roast chicken", "Pasta with cream sauce", "Sushi"], ["Salads", "Light appetizers", "Soft cheeses"]],
  "Rosé": [["Grilled seafood", "Mediterranean dishes", "Light salads"], ["Charcuterie", "Sushi", "Summer vegetables"]],
  "Sparkling": [["Oysters", "Caviar", "Sushi"], ["Fried foods", "Soft cheeses", "Celebrations"]],
  "Dessert": [["Blue cheese", "Fruit tarts", "Crème brûlée"], ["Foie gras", "Dark chocolate", "Almond cake"]],
  "Fortified": [["Stilton", "Dark chocolate", "Walnuts"], ["Aged cheeses", "Dried fruits", "After dinner"]],
};

const temps = { Red: "16-18°C", White: "8-12°C", Rosé: "8-10°C", Sparkling: "6-8°C", Dessert: "8-10°C", Fortified: "14-18°C" };
const agings = { Red: "5-15 years", White: "2-8 years", Rosé: "1-3 years", Sparkling: "2-8 years", Dessert: "10-30 years", Fortified: "10-30 years" };
const prices = { Budget: [8, 14], "Mid-Range": [15, 29], Premium: [30, 74], Luxury: [75, 199], "Ultra-Premium": [200, 500] };

for (const countryData of additionalCountries) {
  for (const regionData of countryData.regions) {
    const key = `${countryData.country}-${regionData.region}-${regionData.type}`;
    const prods = producers[key] || [`Estate ${regionData.region}`];
    for (const prod of prods) {
      const priceRanges = ["Budget", "Mid-Range", "Premium", "Luxury"];
      const pr = priceRanges[Math.floor(Math.random() * priceRanges.length)];
      const [minP, maxP] = prices[pr];
      const price = minP + Math.floor(Math.random() * (maxP - minP));
      const vintage = regionData.type === "Fortified" ? null : 2018 + Math.floor(Math.random() * 5);
      const notesArr = notes[regionData.type] || notes["Red"];
      const note = notesArr[Math.floor(Math.random() * notesArr.length)];
      const pairArr = pairingsMap[regionData.type] || pairingsMap["Red"];
      const pairing = pairArr[Math.floor(Math.random() * pairArr.length)];

      const wineName = regionData.type === "White" || regionData.type === "Sparkling"
        ? `${regionData.grapes[0]}`
        : regionData.appellation.replace(/ (AOC|DOC|DOCG|DO|GI|WO|AVA|DAC)$/i, '');

      additionalWines.push({
        name: wineName,
        producer: prod,
        vintage,
        type: regionData.type,
        grape: regionData.grapes[0],
        grapes: regionData.grapes,
        region: regionData.region,
        subRegion: regionData.subRegion,
        country: countryData.country,
        cc: countryData.cc,
        appellation: regionData.appellation,
        alcohol: `${13 + Math.floor(Math.random() * 3)}%`,
        price,
        priceRange: pr,
        badges: pr === "Budget" || pr === "Mid-Range" ? (Math.random() > 0.5 ? ["Best Value"] : []) : [],
        notes: note,
        editorial: editorials[regionData.type] || editorials["Red"],
        pairings: pairing,
        temp: temps[regionData.type] || "16-18°C",
        aging: agings[regionData.type] || "5-15 years",
      });
    }
  }
}

// Build final wines array
const allWines = [];
const slugSet = new Set();

function makeSlug(wine) {
  let slug = toSlug(`${wine.producer}-${wine.name}-${wine.vintage || 'nv'}`);
  if (slugSet.has(slug)) {
    slug = slug + '-' + Math.floor(Math.random() * 1000);
  }
  slugSet.add(slug);
  return slug;
}

// Add template wines
for (const w of wineTemplates) {
  const scores = generateScores(w);
  const aggregate = computeAggregate(scores);
  allWines.push({
    slug: makeSlug(w),
    name: w.name,
    producer: w.producer,
    vintage: w.vintage,
    type: w.type,
    grape: w.grape,
    grapes: w.grapes,
    region: w.region,
    subRegion: w.subRegion,
    country: w.country,
    countryCode: w.cc,
    appellation: w.appellation,
    alcoholContent: w.alcohol,
    price: w.price,
    priceRange: w.priceRange,
    buyUrl: `https://www.wine.com/search?q=${encodeURIComponent(w.name + ' ' + w.producer)}`,
    scores,
    aggregateScore: aggregate,
    badges: w.badges,
    tastingNotes: w.notes,
    editorial: w.editorial,
    pairings: w.pairings,
    servingTemp: w.temp,
    aging: w.aging,
    prosAndCons: {
      pros: ["Excellent quality for the category", "Well-balanced and complex", "Strong critical acclaim", "Aging potential"],
      cons: ["Premium pricing", "Limited availability in some markets"],
    },
  });
}

// Add generated wines
for (const w of additionalWines) {
  const scores = generateScores(w);
  const aggregate = computeAggregate(scores);
  allWines.push({
    slug: makeSlug(w),
    name: w.name,
    producer: w.producer,
    vintage: w.vintage,
    type: w.type,
    grape: w.grape,
    grapes: w.grapes,
    region: w.region,
    subRegion: w.subRegion,
    country: w.country,
    countryCode: w.cc,
    appellation: w.appellation,
    alcoholContent: w.alcohol,
    price: w.price,
    priceRange: w.priceRange,
    buyUrl: `https://www.wine.com/search?q=${encodeURIComponent(w.name + ' ' + w.producer)}`,
    scores,
    aggregateScore: aggregate,
    badges: w.badges,
    tastingNotes: w.notes,
    editorial: w.editorial,
    pairings: w.pairings,
    servingTemp: w.temp,
    aging: w.aging,
    prosAndCons: {
      pros: ["Good quality for the price", "Well-crafted and balanced", "Food-friendly"],
      cons: ["Could benefit from more aging", "Limited distribution"],
    },
  });
}

// Countries
const countriesData = [
  { slug: "france", name: "France", emoji: "🇫🇷", regions: ["Bordeaux", "Burgundy", "Champagne", "Rhône Valley", "Loire Valley", "Alsace", "Languedoc-Roussillon", "Provence"], description: "France is the spiritual home of wine. From the grand châteaux of Bordeaux to the hallowed vineyards of Burgundy, French wine sets the standard against which all others are measured.", wineHistory: "France has been producing wine since the 6th century BC. The country's appellation system (AOC), established in 1935, became the model for wine classification worldwide." },
  { slug: "italy", name: "Italy", emoji: "🇮🇹", regions: ["Tuscany", "Piedmont", "Veneto", "Sicily", "Puglia"], description: "Italy produces more wine than any other country, with an extraordinary diversity of indigenous grape varieties and regional styles.", wineHistory: "Italian winemaking dates back 4,000 years. The country boasts over 500 officially recognized grape varieties and a classification system spanning DOC, DOCG, and IGT designations." },
  { slug: "spain", name: "Spain", emoji: "🇪🇸", regions: ["Rioja", "Ribera del Duero", "Priorat", "Cava", "Sherry"], description: "Spain has more vineyard area than any country on earth. From the age-worthy Tempranillos of Rioja to the revolutionary wines of Priorat, Spanish wine is experiencing a golden age.", wineHistory: "The Phoenicians planted Spain's first vineyards around 1100 BC. Today Spain is the world's third-largest wine producer." },
  { slug: "usa", name: "United States", emoji: "🇺🇸", regions: ["Napa Valley", "Sonoma", "Willamette Valley", "Washington State"], description: "American wine, led by California's Napa Valley, has earned its place among the world's finest. Oregon and Washington are producing increasingly acclaimed wines.", wineHistory: "The modern American wine industry began in earnest after Prohibition ended in 1933. The 1976 Judgment of Paris, where California wines beat French rivals in a blind tasting, transformed the global wine landscape." },
  { slug: "australia", name: "Australia", emoji: "🇦🇺", regions: ["Barossa Valley", "McLaren Vale", "Margaret River", "Yarra Valley", "Hunter Valley", "Eden Valley"], description: "Australia produces bold, fruit-driven wines alongside increasingly refined, terroir-focused bottlings. The country's winemakers are among the most innovative in the world.", wineHistory: "Vines first arrived in Australia with the First Fleet in 1788. The Barossa Valley, settled by German immigrants in the 1840s, remains home to some of the oldest Shiraz vines on earth." },
  { slug: "argentina", name: "Argentina", emoji: "🇦🇷", regions: ["Mendoza", "Salta"], description: "Argentina is the world's fifth-largest wine producer, renowned for its Malbec from the high-altitude vineyards of Mendoza.", wineHistory: "Spanish missionaries brought vines to Argentina in the 16th century. The modern premium wine industry took off in the 1990s, when producers began harnessing the country's unique terroir." },
  { slug: "chile", name: "Chile", emoji: "🇨🇱", regions: ["Maipo Valley", "Colchagua Valley", "Casablanca Valley"], description: "Chile's geographic isolation has kept its vineyards free from phylloxera, preserving pre-phylloxera vines and producing wines of exceptional purity.", wineHistory: "Chilean wine production dates to the 16th century, but the quality revolution began in the 1980s with major foreign investment and modern winemaking techniques." },
  { slug: "germany", name: "Germany", emoji: "🇩🇪", regions: ["Mosel", "Pfalz", "Rheingau"], description: "Germany produces some of the world's finest Rieslings, ranging from bone-dry to lusciously sweet, all united by piercing acidity and mineral complexity.", wineHistory: "The Romans planted Germany's first vineyards along the Mosel and Rhine rivers 2,000 years ago. The Prädikat system classifies wines by ripeness at harvest." },
  { slug: "portugal", name: "Portugal", emoji: "🇵🇹", regions: ["Douro", "Alentejo", "Vinho Verde"], description: "Portugal offers extraordinary wine diversity, from the legendary Port wines of the Douro Valley to the vibrant Vinho Verde of the north and powerful reds of the Alentejo.", wineHistory: "Portugal's Douro Valley, established in 1756, was the world's first officially demarcated wine region. The country has over 250 indigenous grape varieties." },
  { slug: "new-zealand", name: "New Zealand", emoji: "🇳🇿", regions: ["Marlborough", "Central Otago", "Martinborough"], description: "New Zealand burst onto the world wine scene with its vibrant Marlborough Sauvignon Blancs and now produces exceptional Pinot Noir from Central Otago.", wineHistory: "Commercial winemaking began in New Zealand in the 1970s. The country's cool maritime climate produces wines of extraordinary freshness and aromatic intensity." },
  { slug: "south-africa", name: "South Africa", emoji: "🇿🇦", regions: ["Stellenbosch", "Swartland", "Walker Bay"], description: "South African wine is experiencing a renaissance, with the old vines of the Swartland and the cool-climate vineyards of Walker Bay producing world-class wines.", wineHistory: "The first South African wine was produced in 1659 by the Dutch East India Company. The country's unique Pinotage grape (a Pinot Noir × Cinsault cross) was created in 1925." },
  { slug: "austria", name: "Austria", emoji: "🇦🇹", regions: ["Wachau", "Kamptal"], description: "Austria's Grüner Veltliner and Riesling are among the world's great white wines, combining power with racy acidity and extraordinary mineral depth.", wineHistory: "Austrian winemaking dates back to Celtic and Roman times. The country's DAC system, established in 2003, emphasizes terroir-driven wines from specific regions." },
  { slug: "greece", name: "Greece", emoji: "🇬🇷", regions: ["Naoussa"], description: "Greece is experiencing a wine renaissance, with ancient indigenous varieties like Xinomavro and Assyrtiko producing world-class wines.", wineHistory: "Greece is one of the oldest wine-producing regions in the world, with evidence of winemaking dating back 6,500 years." },
  { slug: "lebanon", name: "Lebanon", emoji: "🇱🇧", regions: ["Bekaa Valley"], description: "Lebanon's Bekaa Valley has been producing wine for over 5,000 years. Château Musar is the country's most famous estate.", wineHistory: "The Phoenicians, based in modern-day Lebanon, were among the first peoples to spread winemaking across the Mediterranean." },
];

// Assign top wines to countries
for (const country of countriesData) {
  country.topWines = allWines
    .filter(w => w.country === country.name)
    .sort((a, b) => b.aggregateScore - a.aggregateScore)
    .slice(0, 10)
    .map(w => w.slug);
}

// Regions
const regionsData = [];
const regionSet = new Set();
for (const w of allWines) {
  const key = `${w.region}-${w.country}`;
  if (!regionSet.has(key)) {
    regionSet.add(key);
    const winesInRegion = allWines.filter(x => x.region === w.region && x.country === w.country);
    const grapeSet = new Set();
    winesInRegion.forEach(x => grapeSet.add(x.grape));
    regionsData.push({
      slug: toSlug(w.region),
      name: w.region,
      country: w.country,
      countryCode: w.countryCode,
      description: `${w.region} is one of ${w.country}'s most important wine regions, known for producing exceptional ${[...grapeSet].slice(0, 3).join(', ')} wines.`,
      climate: w.country === 'France' || w.country === 'Germany' ? 'Continental to maritime' : w.country === 'Australia' || w.country === 'South Africa' ? 'Mediterranean to warm continental' : 'Continental',
      keyGrapes: [...grapeSet].slice(0, 5),
      topWines: winesInRegion.sort((a, b) => b.aggregateScore - a.aggregateScore).slice(0, 8).map(x => x.slug),
      notableAppellations: [...new Set(winesInRegion.map(x => x.appellation))].slice(0, 5),
    });
  }
}

// Grapes
const grapesData = [];
const grapeSet = new Set();
for (const w of allWines) {
  if (!grapeSet.has(w.grape)) {
    grapeSet.add(w.grape);
    const gColor = ["Cabernet Sauvignon", "Merlot", "Pinot Noir", "Syrah", "Shiraz", "Tempranillo", "Sangiovese", "Nebbiolo", "Malbec", "Grenache", "Garnacha", "Cabernet Franc", "Corvina", "Touriga Nacional", "Pinotage", "Carmenère", "Xinomavro", "Primitivo", "Cinsault", "Mourvèdre", "Carignan", "Nerello Mascalese"].includes(w.grape) ? 'Red' : 'White';
    const winesWithGrape = allWines.filter(x => x.grape === w.grape);
    const regionSet2 = new Set();
    winesWithGrape.forEach(x => regionSet2.add(x.region));
    grapesData.push({
      slug: toSlug(w.grape),
      name: w.grape,
      color: gColor,
      aliases: [],
      description: `${w.grape} is one of the world's most important ${gColor.toLowerCase()} grape varieties, producing wines across many regions and styles.`,
      characteristics: gColor === 'Red' ? 'Medium to full-bodied with structured tannins and aging potential.' : 'Typically fresh and aromatic with good acidity.',
      regions: [...regionSet2].slice(0, 8),
      pairings: gColor === 'Red' ? ['Grilled meats', 'Hard cheeses', 'Pasta with meat sauce'] : ['Seafood', 'Salads', 'Light poultry dishes'],
    });
  }
}

// Write data.ts
const output = `// Generated wine database — ${allWines.length} wines
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

export const wines: Wine[] = ${JSON.stringify(allWines, null, 2)};

export const countries: Country[] = ${JSON.stringify(countriesData, null, 2)};

export const regions: Region[] = ${JSON.stringify(regionsData, null, 2)};

export const grapeVarieties: Grape[] = ${JSON.stringify(grapesData, null, 2)};

// Blog posts are imported from blog-posts.ts
let _blogPosts: BlogPost[] = [];
try {
  // Will be populated when blog-posts.ts is created
  _blogPosts = [];
} catch { /* */ }
export const blogPosts: BlogPost[] = _blogPosts;
`;

writeFileSync(join(process.cwd(), 'src/lib/data.ts'), output);
console.log(`Generated data.ts with ${allWines.length} wines, ${countriesData.length} countries, ${regionsData.length} regions, ${grapesData.length} grapes`);
