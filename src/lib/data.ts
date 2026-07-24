// Generated wine database — 223 wines
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

export const wines: Wine[] = [
  {
    "slug": "ch-teau-lafite-rothschild-ch-teau-lafite-rothschild-2020",
    "name": "Château Lafite Rothschild",
    "producer": "Château Lafite Rothschild",
    "vintage": 2020,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon",
      "Merlot",
      "Cabernet Franc",
      "Petit Verdot"
    ],
    "region": "Bordeaux",
    "subRegion": "Pauillac",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Pauillac AOC",
    "alcoholContent": "13.5%",
    "price": 850,
    "priceRange": "Ultra-Premium",
    "buyUrl": "https://www.wine.com/search?q=Ch%C3%A2teau%20Lafite%20Rothschild%20Ch%C3%A2teau%20Lafite%20Rothschild",
    "scores": [
      {
        "source": "Decanter",
        "score": 93,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "James Suckling",
        "score": 97,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Wine Enthusiast",
        "score": 93,
        "maxScore": 100,
        "vintage": 2020
      }
    ],
    "aggregateScore": 94,
    "badges": [
      "Parker 95+",
      "Wine Spectator Top 100",
      "James Suckling 95+"
    ],
    "tastingNotes": "Ethereal bouquet of blackcurrant, graphite, cedar, and violets. Silk-textured tannins frame a palate of extraordinary depth and precision.",
    "editorial": "The 2020 Lafite is a masterclass in restraint and elegance. The estate's signature minerality shines through layers of dark fruit and tobacco, culminating in a finish that seems to last forever. This is a wine that demands patience — give it at least a decade in the cellar.",
    "pairings": [
      "Rack of lamb",
      "Aged Comté",
      "Truffle risotto"
    ],
    "servingTemp": "16-18°C",
    "aging": "20-50 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "ch-teau-margaux-ch-teau-margaux-2019",
    "name": "Château Margaux",
    "producer": "Château Margaux",
    "vintage": 2019,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon",
      "Merlot",
      "Petit Verdot",
      "Cabernet Franc"
    ],
    "region": "Bordeaux",
    "subRegion": "Margaux",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Margaux AOC",
    "alcoholContent": "13%",
    "price": 750,
    "priceRange": "Ultra-Premium",
    "buyUrl": "https://www.wine.com/search?q=Ch%C3%A2teau%20Margaux%20Ch%C3%A2teau%20Margaux",
    "scores": [
      {
        "source": "Wine Enthusiast",
        "score": 95,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "James Suckling",
        "score": 94,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Robert Parker",
        "score": 93,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Jancis Robinson",
        "score": 19,
        "maxScore": 20,
        "vintage": 2019
      },
      {
        "source": "Tim Atkin",
        "score": 93,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Wine Spectator",
        "score": 97,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 95,
    "badges": [
      "Parker 95+",
      "Decanter World Wine Awards Gold"
    ],
    "tastingNotes": "Perfumed aromatics of rose petal, blackberry, and sweet spice. Velvety texture with exceptional finesse and a long, mineral-driven finish.",
    "editorial": "The 2019 Margaux captures the essence of this legendary estate. Femininity and power coexist in perfect harmony, with layers of floral and dark fruit aromas that unfold over hours in the glass.",
    "pairings": [
      "Filet mignon",
      "Duck confit",
      "Dark chocolate"
    ],
    "servingTemp": "17-18°C",
    "aging": "15-40 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "ch-teau-mouton-rothschild-ch-teau-mouton-rothschild-2020",
    "name": "Château Mouton Rothschild",
    "producer": "Château Mouton Rothschild",
    "vintage": 2020,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon",
      "Merlot",
      "Cabernet Franc"
    ],
    "region": "Bordeaux",
    "subRegion": "Pauillac",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Pauillac AOC",
    "alcoholContent": "13.5%",
    "price": 650,
    "priceRange": "Ultra-Premium",
    "buyUrl": "https://www.wine.com/search?q=Ch%C3%A2teau%20Mouton%20Rothschild%20Ch%C3%A2teau%20Mouton%20Rothschild",
    "scores": [
      {
        "source": "Vivino",
        "score": 4.7,
        "maxScore": 5,
        "vintage": 2020
      },
      {
        "source": "Robert Parker",
        "score": 97,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Decanter",
        "score": 93,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Jancis Robinson",
        "score": 19,
        "maxScore": 20,
        "vintage": 2020
      },
      {
        "source": "Wine Spectator",
        "score": 96,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "James Suckling",
        "score": 96,
        "maxScore": 100,
        "vintage": 2020
      }
    ],
    "aggregateScore": 95,
    "badges": [
      "Parker 95+",
      "James Suckling 95+"
    ],
    "tastingNotes": "Opulent nose of cassis, roasted coffee, and exotic spice. Full-bodied with polished tannins and a hedonistic, almost decadent palate.",
    "editorial": "Mouton's 2020 is unapologetically rich and luxurious. The signature opulence is tempered by freshness and structure, making this one of the great modern vintages from this First Growth estate.",
    "pairings": [
      "Wagyu beef",
      "Venison",
      "Strong cheeses"
    ],
    "servingTemp": "17-18°C",
    "aging": "15-40 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "ch-teau-haut-brion-ch-teau-haut-brion-2019",
    "name": "Château Haut-Brion",
    "producer": "Château Haut-Brion",
    "vintage": 2019,
    "type": "Red",
    "grape": "Merlot",
    "grapes": [
      "Merlot",
      "Cabernet Sauvignon",
      "Cabernet Franc"
    ],
    "region": "Bordeaux",
    "subRegion": "Pessac-Léognan",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Pessac-Léognan AOC",
    "alcoholContent": "14%",
    "price": 700,
    "priceRange": "Ultra-Premium",
    "buyUrl": "https://www.wine.com/search?q=Ch%C3%A2teau%20Haut-Brion%20Ch%C3%A2teau%20Haut-Brion",
    "scores": [
      {
        "source": "Decanter",
        "score": 97,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Wine Enthusiast",
        "score": 97,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "James Suckling",
        "score": 94,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Tim Atkin",
        "score": 97,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 96,
    "badges": [
      "Parker 95+",
      "Wine Spectator Top 100"
    ],
    "tastingNotes": "Complex nose of smoked herbs, warm gravel, ripe plum, and tobacco. Seamless and polished with an unusually long finish.",
    "editorial": "Haut-Brion consistently delivers wines of intellectual beauty, and the 2019 is no exception. Its distinctive smoky minerality sets it apart from its Médoc peers, offering a truly unique Bordeaux experience.",
    "pairings": [
      "Roast lamb",
      "Grilled portobello",
      "Aged Gruyère"
    ],
    "servingTemp": "16-18°C",
    "aging": "15-40 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "ch-teau-p-trus-ch-teau-p-trus-2018",
    "name": "Château Pétrus",
    "producer": "Château Pétrus",
    "vintage": 2018,
    "type": "Red",
    "grape": "Merlot",
    "grapes": [
      "Merlot"
    ],
    "region": "Bordeaux",
    "subRegion": "Pomerol",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Pomerol AOC",
    "alcoholContent": "14.5%",
    "price": 4500,
    "priceRange": "Ultra-Premium",
    "buyUrl": "https://www.wine.com/search?q=Ch%C3%A2teau%20P%C3%A9trus%20Ch%C3%A2teau%20P%C3%A9trus",
    "scores": [
      {
        "source": "Jancis Robinson",
        "score": 19,
        "maxScore": 20,
        "vintage": 2018
      },
      {
        "source": "Decanter",
        "score": 96,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Wine Spectator",
        "score": 95,
        "maxScore": 100,
        "vintage": 2018
      }
    ],
    "aggregateScore": 95,
    "badges": [
      "Parker 95+",
      "James Suckling 100",
      "Critics Choice"
    ],
    "tastingNotes": "Extraordinary concentration of black truffle, iron, dark cherry, and mocha. Liquid velvet on the palate with an almost supernatural depth.",
    "editorial": "Pétrus 2018 is one of the wines of the decade. Made from 100% Merlot grown on the famous clay plateau, it achieves a level of concentration and complexity that few wines in the world can match. A legend in the making.",
    "pairings": [
      "Black truffle dishes",
      "Aged beef",
      "Foie gras"
    ],
    "servingTemp": "17-18°C",
    "aging": "20-60 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "ch-teau-cheval-blanc-ch-teau-cheval-blanc-2019",
    "name": "Château Cheval Blanc",
    "producer": "Château Cheval Blanc",
    "vintage": 2019,
    "type": "Red",
    "grape": "Cabernet Franc",
    "grapes": [
      "Cabernet Franc",
      "Merlot"
    ],
    "region": "Bordeaux",
    "subRegion": "Saint-Émilion",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Saint-Émilion Grand Cru AOC",
    "alcoholContent": "13.5%",
    "price": 600,
    "priceRange": "Ultra-Premium",
    "buyUrl": "https://www.wine.com/search?q=Ch%C3%A2teau%20Cheval%20Blanc%20Ch%C3%A2teau%20Cheval%20Blanc",
    "scores": [
      {
        "source": "Decanter",
        "score": 96,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Jancis Robinson",
        "score": 19,
        "maxScore": 20,
        "vintage": 2019
      },
      {
        "source": "James Suckling",
        "score": 96,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Vivino",
        "score": 4.8,
        "maxScore": 5,
        "vintage": 2019
      },
      {
        "source": "Robert Parker",
        "score": 95,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 96,
    "badges": [
      "Parker 95+",
      "Decanter World Wine Awards Platinum"
    ],
    "tastingNotes": "Expressive nose of raspberry, violets, and graphite. Satin-smooth tannins with vibrant acidity and extraordinary length.",
    "editorial": "Cheval Blanc's unique blend of Cabernet Franc and Merlot produces a wine unlike any other in Bordeaux. The 2019 is perfumed, graceful, and intensely pleasurable from the first sip.",
    "pairings": [
      "Lamb chops",
      "Mushroom tart",
      "Brie"
    ],
    "servingTemp": "16-18°C",
    "aging": "15-35 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "ch-teau-lynch-bages-ch-teau-lynch-bages-2020",
    "name": "Château Lynch-Bages",
    "producer": "Château Lynch-Bages",
    "vintage": 2020,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon",
      "Merlot",
      "Cabernet Franc"
    ],
    "region": "Bordeaux",
    "subRegion": "Pauillac",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Pauillac AOC",
    "alcoholContent": "13%",
    "price": 120,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Ch%C3%A2teau%20Lynch-Bages%20Ch%C3%A2teau%20Lynch-Bages",
    "scores": [
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2020
      },
      {
        "source": "Decanter",
        "score": 89,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "James Suckling",
        "score": 91,
        "maxScore": 100,
        "vintage": 2020
      }
    ],
    "aggregateScore": 90,
    "badges": [
      "Parker 90+",
      "Best Value"
    ],
    "tastingNotes": "Bold blackcurrant, pencil shavings, and spice. Full-bodied with firm but ripe tannins and excellent concentration.",
    "editorial": "Lynch-Bages consistently over-delivers for its classification. The 2020 offers the concentration and structure of wines costing three times the price, making it one of Bordeaux's greatest values.",
    "pairings": [
      "Grilled steak",
      "Braised short ribs",
      "Hard cheeses"
    ],
    "servingTemp": "17-18°C",
    "aging": "10-25 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "ch-teau-d-yquem-ch-teau-d-yquem-2019",
    "name": "Château d'Yquem",
    "producer": "Château d'Yquem",
    "vintage": 2019,
    "type": "Dessert",
    "grape": "Sémillon",
    "grapes": [
      "Sémillon",
      "Sauvignon Blanc"
    ],
    "region": "Bordeaux",
    "subRegion": "Sauternes",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Sauternes AOC",
    "alcoholContent": "14%",
    "price": 450,
    "priceRange": "Ultra-Premium",
    "buyUrl": "https://www.wine.com/search?q=Ch%C3%A2teau%20d'Yquem%20Ch%C3%A2teau%20d'Yquem",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 92,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Tim Atkin",
        "score": 93,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Robert Parker",
        "score": 92,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "James Suckling",
        "score": 94,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Wine Enthusiast",
        "score": 92,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 93,
    "badges": [
      "Parker 95+",
      "James Suckling 95+",
      "Wine Spectator Top 100"
    ],
    "tastingNotes": "Golden amber color with aromas of apricot, honey, saffron, and crème brûlée. Luscious sweetness balanced by electric acidity.",
    "editorial": "The greatest sweet wine in the world needs no introduction. The 2019 d'Yquem combines tropical richness with laser-like precision, offering a sensory experience that transcends category.",
    "pairings": [
      "Foie gras",
      "Blue cheese",
      "Crème brûlée",
      "Peach tart"
    ],
    "servingTemp": "8-10°C",
    "aging": "20-100 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "domaine-de-la-roman-e-conti-roman-e-conti-grand-cru-2020",
    "name": "Romanée-Conti Grand Cru",
    "producer": "Domaine de la Romanée-Conti",
    "vintage": 2020,
    "type": "Red",
    "grape": "Pinot Noir",
    "grapes": [
      "Pinot Noir"
    ],
    "region": "Burgundy",
    "subRegion": "Côte de Nuits",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Romanée-Conti AOC",
    "alcoholContent": "13%",
    "price": 25000,
    "priceRange": "Ultra-Premium",
    "buyUrl": "https://www.wine.com/search?q=Roman%C3%A9e-Conti%20Grand%20Cru%20Domaine%20de%20la%20Roman%C3%A9e-Conti",
    "scores": [
      {
        "source": "Jancis Robinson",
        "score": 19,
        "maxScore": 20,
        "vintage": 2020
      },
      {
        "source": "Tim Atkin",
        "score": 93,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Wine Spectator",
        "score": 95,
        "maxScore": 100,
        "vintage": 2020
      }
    ],
    "aggregateScore": 94,
    "badges": [
      "Parker 95+",
      "James Suckling 100",
      "Wine Spectator Top 100",
      "Critics Choice"
    ],
    "tastingNotes": "Transcendent aromatics of rose petal, cherry blossom, earth, and exotic spice. Impossibly delicate yet profoundly concentrated.",
    "editorial": "There is no wine more legendary than Romanée-Conti. The 2020 is pure silk and poetry — a wine of supernatural beauty that defies the constraints of language. Only a few hundred cases exist.",
    "pairings": [
      "Squab",
      "Wild mushrooms",
      "Aged Époisses"
    ],
    "servingTemp": "15-16°C",
    "aging": "15-50 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "domaine-de-la-roman-e-conti-la-t-che-grand-cru-2019",
    "name": "La Tâche Grand Cru",
    "producer": "Domaine de la Romanée-Conti",
    "vintage": 2019,
    "type": "Red",
    "grape": "Pinot Noir",
    "grapes": [
      "Pinot Noir"
    ],
    "region": "Burgundy",
    "subRegion": "Côte de Nuits",
    "country": "France",
    "countryCode": "FR",
    "appellation": "La Tâche AOC",
    "alcoholContent": "13%",
    "price": 5000,
    "priceRange": "Ultra-Premium",
    "buyUrl": "https://www.wine.com/search?q=La%20T%C3%A2che%20Grand%20Cru%20Domaine%20de%20la%20Roman%C3%A9e-Conti",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 95,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Tim Atkin",
        "score": 94,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Jancis Robinson",
        "score": 19,
        "maxScore": 20,
        "vintage": 2019
      },
      {
        "source": "Vivino",
        "score": 4.8,
        "maxScore": 5,
        "vintage": 2019
      }
    ],
    "aggregateScore": 95,
    "badges": [
      "Parker 95+",
      "James Suckling 95+"
    ],
    "tastingNotes": "Darker and more powerful than its sibling RC, with notes of blackberry, iron, and forest floor. Tremendous depth and structure.",
    "editorial": "La Tâche is often considered DRC's most complete wine. The 2019 is monumental — a wine of extraordinary power and grace that will reward decades of patience.",
    "pairings": [
      "Roast duck",
      "Venison",
      "Truffle"
    ],
    "servingTemp": "15-16°C",
    "aging": "15-40 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "domaine-comte-georges-de-vog-musigny-grand-cru-2019",
    "name": "Musigny Grand Cru",
    "producer": "Domaine Comte Georges de Vogüé",
    "vintage": 2019,
    "type": "Red",
    "grape": "Pinot Noir",
    "grapes": [
      "Pinot Noir"
    ],
    "region": "Burgundy",
    "subRegion": "Côte de Nuits",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Musigny AOC",
    "alcoholContent": "13%",
    "price": 800,
    "priceRange": "Ultra-Premium",
    "buyUrl": "https://www.wine.com/search?q=Musigny%20Grand%20Cru%20Domaine%20Comte%20Georges%20de%20Vog%C3%BC%C3%A9",
    "scores": [
      {
        "source": "James Suckling",
        "score": 96,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Robert Parker",
        "score": 93,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Jancis Robinson",
        "score": 19,
        "maxScore": 20,
        "vintage": 2019
      },
      {
        "source": "Wine Spectator",
        "score": 96,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Decanter",
        "score": 95,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 95,
    "badges": [
      "Parker 95+"
    ],
    "tastingNotes": "Haunting perfume of red roses, wild strawberry, and crushed stone. Ethereal and weightless on the palate yet deeply complex.",
    "editorial": "De Vogüé's Musigny is Burgundy at its most sublime. The 2019 captures the vineyard's legendary delicacy with a crystalline purity that few wines achieve.",
    "pairings": [
      "Quail",
      "Salmon",
      "Soft-ripened cheese"
    ],
    "servingTemp": "15-16°C",
    "aging": "10-30 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "domaine-william-f-vre-chablis-grand-cru-les-clos-2021",
    "name": "Chablis Grand Cru Les Clos",
    "producer": "Domaine William Fèvre",
    "vintage": 2021,
    "type": "White",
    "grape": "Chardonnay",
    "grapes": [
      "Chardonnay"
    ],
    "region": "Burgundy",
    "subRegion": "Chablis",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Chablis Grand Cru AOC",
    "alcoholContent": "13%",
    "price": 95,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Chablis%20Grand%20Cru%20Les%20Clos%20Domaine%20William%20F%C3%A8vre",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 89,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Decanter",
        "score": 88,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2021
      },
      {
        "source": "Wine Enthusiast",
        "score": 89,
        "maxScore": 100,
        "vintage": 2021
      }
    ],
    "aggregateScore": 89,
    "badges": [
      "Parker 90+",
      "Best Value"
    ],
    "tastingNotes": "Steely and precise with notes of flint, green apple, oyster shell, and lemon zest. Razor-sharp acidity and incredible mineral intensity.",
    "editorial": "Les Clos is the undisputed king of Chablis Grand Crus, and Fèvre's rendition is exceptional. The 2021 is a wine of crystalline purity — the antithesis of oaky, buttery Chardonnay.",
    "pairings": [
      "Oysters",
      "Grilled fish",
      "Sushi",
      "Goat cheese"
    ],
    "servingTemp": "10-12°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "domaine-coche-dury-meursault-les-perri-res-premier-cru-2020",
    "name": "Meursault Les Perrières Premier Cru",
    "producer": "Domaine Coche-Dury",
    "vintage": 2020,
    "type": "White",
    "grape": "Chardonnay",
    "grapes": [
      "Chardonnay"
    ],
    "region": "Burgundy",
    "subRegion": "Côte de Beaune",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Meursault Premier Cru AOC",
    "alcoholContent": "13.5%",
    "price": 1200,
    "priceRange": "Ultra-Premium",
    "buyUrl": "https://www.wine.com/search?q=Meursault%20Les%20Perri%C3%A8res%20Premier%20Cru%20Domaine%20Coche-Dury",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 97,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Robert Parker",
        "score": 93,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Tim Atkin",
        "score": 96,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Wine Enthusiast",
        "score": 96,
        "maxScore": 100,
        "vintage": 2020
      }
    ],
    "aggregateScore": 96,
    "badges": [
      "Parker 95+",
      "Jancis Robinson 19/20"
    ],
    "tastingNotes": "Mesmerizing depth of hazelnut, citrus oil, and wet stone. Full-bodied yet electrifyingly fresh with extraordinary persistence.",
    "editorial": "Coche-Dury is the most sought-after white Burgundy producer, and Perrières is their crown jewel. The 2020 is almost impossibly concentrated while maintaining Burgundy's signature finesse.",
    "pairings": [
      "Lobster",
      "White truffle",
      "Aged Comté"
    ],
    "servingTemp": "12-14°C",
    "aging": "10-25 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "mo-t-chandon-dom-p-rignon-2015",
    "name": "Dom Pérignon",
    "producer": "Moët & Chandon",
    "vintage": 2015,
    "type": "Sparkling",
    "grape": "Chardonnay",
    "grapes": [
      "Chardonnay",
      "Pinot Noir"
    ],
    "region": "Champagne",
    "subRegion": "Champagne",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Champagne AOC",
    "alcoholContent": "12.5%",
    "price": 250,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Dom%20P%C3%A9rignon%20Mo%C3%ABt%20%26%20Chandon",
    "scores": [
      {
        "source": "Robert Parker",
        "score": 95,
        "maxScore": 100,
        "vintage": 2015
      },
      {
        "source": "Jancis Robinson",
        "score": 19,
        "maxScore": 20,
        "vintage": 2015
      },
      {
        "source": "Wine Enthusiast",
        "score": 94,
        "maxScore": 100,
        "vintage": 2015
      }
    ],
    "aggregateScore": 95,
    "badges": [
      "James Suckling 95+",
      "Wine Spectator Top 100"
    ],
    "tastingNotes": "Toasty brioche, candied citrus, white flowers, and almond. Creamy mousse with extraordinary precision and a seemingly endless finish.",
    "editorial": "The 2015 Dom Pérignon is a triumph of balance. Rich yet ethereal, powerful yet graceful, it exemplifies why this remains the world's most famous prestige cuvée.",
    "pairings": [
      "Caviar",
      "Lobster",
      "Sushi",
      "Celebrations"
    ],
    "servingTemp": "8-10°C",
    "aging": "5-20 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "louis-roederer-cristal-2015",
    "name": "Cristal",
    "producer": "Louis Roederer",
    "vintage": 2015,
    "type": "Sparkling",
    "grape": "Pinot Noir",
    "grapes": [
      "Pinot Noir",
      "Chardonnay"
    ],
    "region": "Champagne",
    "subRegion": "Champagne",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Champagne AOC",
    "alcoholContent": "12%",
    "price": 300,
    "priceRange": "Ultra-Premium",
    "buyUrl": "https://www.wine.com/search?q=Cristal%20Louis%20Roederer",
    "scores": [
      {
        "source": "Decanter",
        "score": 94,
        "maxScore": 100,
        "vintage": 2015
      },
      {
        "source": "Wine Spectator",
        "score": 93,
        "maxScore": 100,
        "vintage": 2015
      },
      {
        "source": "Robert Parker",
        "score": 94,
        "maxScore": 100,
        "vintage": 2015
      }
    ],
    "aggregateScore": 94,
    "badges": [
      "Parker 95+",
      "James Suckling 95+"
    ],
    "tastingNotes": "Pure and crystalline with notes of white peach, chalk, citrus blossom, and toasted hazelnut. Pinpoint precision with incredible energy.",
    "editorial": "Cristal 2015 is a wine of breathtaking purity. Now biodynamically farmed, this iconic cuvée has never been better — translucent, vibrant, and profoundly mineral.",
    "pairings": [
      "Raw seafood",
      "Caviar",
      "Grilled langoustines"
    ],
    "servingTemp": "8-10°C",
    "aging": "5-25 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "krug-krug-grande-cuv-e-nv",
    "name": "Krug Grande Cuvée",
    "producer": "Krug",
    "vintage": null,
    "type": "Sparkling",
    "grape": "Pinot Noir",
    "grapes": [
      "Pinot Noir",
      "Chardonnay",
      "Pinot Meunier"
    ],
    "region": "Champagne",
    "subRegion": "Champagne",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Champagne AOC",
    "alcoholContent": "12%",
    "price": 200,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Krug%20Grande%20Cuv%C3%A9e%20Krug",
    "scores": [
      {
        "source": "Decanter",
        "score": 92,
        "maxScore": 100,
        "vintage": null
      },
      {
        "source": "James Suckling",
        "score": 90,
        "maxScore": 100,
        "vintage": null
      },
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": null
      },
      {
        "source": "Vivino",
        "score": 4.6,
        "maxScore": 5,
        "vintage": null
      },
      {
        "source": "Wine Enthusiast",
        "score": 91,
        "maxScore": 100,
        "vintage": null
      },
      {
        "source": "Robert Parker",
        "score": 89,
        "maxScore": 100,
        "vintage": null
      }
    ],
    "aggregateScore": 91,
    "badges": [
      "Parker 95+",
      "Critics Choice"
    ],
    "tastingNotes": "Incredibly complex aromas of brioche, marzipan, dried fruit, and honey. Multi-layered palate with a bold, generous character and immense depth.",
    "editorial": "Krug Grande Cuvée is crafted from a blend of over 120 wines from 10+ vintages. Each edition is unique, and each is extraordinary — the pinnacle of non-vintage Champagne artistry.",
    "pairings": [
      "Fried chicken",
      "Fish and chips",
      "Parmesan",
      "Sushi"
    ],
    "servingTemp": "9-11°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "paul-jaboulet-a-n-hermitage-la-chapelle-2019",
    "name": "Hermitage La Chapelle",
    "producer": "Paul Jaboulet Aîné",
    "vintage": 2019,
    "type": "Red",
    "grape": "Syrah",
    "grapes": [
      "Syrah"
    ],
    "region": "Rhône Valley",
    "subRegion": "Northern Rhône",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Hermitage AOC",
    "alcoholContent": "13.5%",
    "price": 180,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Hermitage%20La%20Chapelle%20Paul%20Jaboulet%20A%C3%AEn%C3%A9",
    "scores": [
      {
        "source": "Vivino",
        "score": 4.6,
        "maxScore": 5,
        "vintage": 2019
      },
      {
        "source": "Tim Atkin",
        "score": 93,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Wine Spectator",
        "score": 91,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 92,
    "badges": [
      "Parker 95+",
      "Decanter World Wine Awards Gold"
    ],
    "tastingNotes": "Intense aromas of smoked meat, blackberry, violet, and cracked pepper. Full-bodied with velvety tannins and remarkable purity.",
    "editorial": "La Chapelle is one of the Rhône's most iconic wines. The 2019 is a return to greatness — concentrated, complex, and built for the long haul.",
    "pairings": [
      "Grilled lamb",
      "Game birds",
      "Strong blue cheese"
    ],
    "servingTemp": "16-18°C",
    "aging": "10-30 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "ch-teau-de-beaucastel-ch-teauneuf-du-pape-2020",
    "name": "Châteauneuf-du-Pape",
    "producer": "Château de Beaucastel",
    "vintage": 2020,
    "type": "Red",
    "grape": "Grenache",
    "grapes": [
      "Grenache",
      "Mourvèdre",
      "Syrah",
      "Counoise"
    ],
    "region": "Rhône Valley",
    "subRegion": "Southern Rhône",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Châteauneuf-du-Pape AOC",
    "alcoholContent": "14.5%",
    "price": 85,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Ch%C3%A2teauneuf-du-Pape%20Ch%C3%A2teau%20de%20Beaucastel",
    "scores": [
      {
        "source": "James Suckling",
        "score": 91,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Tim Atkin",
        "score": 89,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Decanter",
        "score": 89,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Wine Enthusiast",
        "score": 89,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Vivino",
        "score": 4.6,
        "maxScore": 5,
        "vintage": 2020
      }
    ],
    "aggregateScore": 90,
    "badges": [
      "Parker 90+",
      "Best Value"
    ],
    "tastingNotes": "Exotic aromas of garrigue herbs, leather, dark plum, and lavender. Full-bodied and earthy with spicy warmth and silky tannins.",
    "editorial": "Beaucastel is the benchmark for Châteauneuf-du-Pape, utilizing all 13 permitted grape varieties. The 2020 is generous and complex — outstanding value for a wine of this quality.",
    "pairings": [
      "Beef stew",
      "Lamb tagine",
      "Roasted vegetables"
    ],
    "servingTemp": "16-18°C",
    "aging": "8-20 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "e-guigal-c-te-r-tie-la-landonne-2018",
    "name": "Côte-Rôtie La Landonne",
    "producer": "E. Guigal",
    "vintage": 2018,
    "type": "Red",
    "grape": "Syrah",
    "grapes": [
      "Syrah"
    ],
    "region": "Rhône Valley",
    "subRegion": "Northern Rhône",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Côte-Rôtie AOC",
    "alcoholContent": "13.5%",
    "price": 350,
    "priceRange": "Ultra-Premium",
    "buyUrl": "https://www.wine.com/search?q=C%C3%B4te-R%C3%B4tie%20La%20Landonne%20E.%20Guigal",
    "scores": [
      {
        "source": "Decanter",
        "score": 93,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Wine Spectator",
        "score": 91,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Robert Parker",
        "score": 92,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Wine Enthusiast",
        "score": 94,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Vivino",
        "score": 4.7,
        "maxScore": 5,
        "vintage": 2018
      }
    ],
    "aggregateScore": 93,
    "badges": [
      "Parker 95+",
      "James Suckling 95+"
    ],
    "tastingNotes": "Dark, brooding, and massively concentrated. Blackberry liqueur, roasted meat, olive tapenade, and iron. Tannins like polished granite.",
    "editorial": "Guigal's La Landonne is one of the legendary single-vineyard Côte-Rôties. The 2018 is a monument of Syrah — dark, powerful, and built for decades of evolution.",
    "pairings": [
      "Wild boar",
      "Braised oxtail",
      "Aged Manchego"
    ],
    "servingTemp": "17-18°C",
    "aging": "15-30 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "domaine-vacheron-sancerre-2022",
    "name": "Sancerre",
    "producer": "Domaine Vacheron",
    "vintage": 2022,
    "type": "White",
    "grape": "Sauvignon Blanc",
    "grapes": [
      "Sauvignon Blanc"
    ],
    "region": "Loire Valley",
    "subRegion": "Central Loire",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Sancerre AOC",
    "alcoholContent": "13%",
    "price": 35,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Sancerre%20Domaine%20Vacheron",
    "scores": [
      {
        "source": "Decanter",
        "score": 87,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Robert Parker",
        "score": 88,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Tim Atkin",
        "score": 86,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Vivino",
        "score": 4.4,
        "maxScore": 5,
        "vintage": 2022
      }
    ],
    "aggregateScore": 87,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Zippy citrus, white peach, and flinty minerality. Clean and precise with mouthwatering acidity and a saline finish.",
    "editorial": "Vacheron's Sancerre is the gold standard for Loire Sauvignon Blanc. Biodynamically farmed and impeccably crafted, this is a wine of electric freshness and purity.",
    "pairings": [
      "Goat cheese",
      "Shellfish",
      "Asparagus",
      "Garden salads"
    ],
    "servingTemp": "8-10°C",
    "aging": "2-5 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "domaine-zind-humbrecht-riesling-grand-cru-rangen-de-thann-2020",
    "name": "Riesling Grand Cru Rangen de Thann",
    "producer": "Domaine Zind-Humbrecht",
    "vintage": 2020,
    "type": "White",
    "grape": "Riesling",
    "grapes": [
      "Riesling"
    ],
    "region": "Alsace",
    "subRegion": "Alsace",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Alsace Grand Cru AOC",
    "alcoholContent": "13%",
    "price": 75,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Riesling%20Grand%20Cru%20Rangen%20de%20Thann%20Domaine%20Zind-Humbrecht",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 88,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Robert Parker",
        "score": 91,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "James Suckling",
        "score": 90,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Decanter",
        "score": 91,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Wine Enthusiast",
        "score": 87,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Tim Atkin",
        "score": 91,
        "maxScore": 100,
        "vintage": 2020
      }
    ],
    "aggregateScore": 90,
    "badges": [
      "Parker 90+",
      "Jancis Robinson 18/20"
    ],
    "tastingNotes": "Volcanic intensity with aromas of smoke, petrol, lime zest, and wet stone. Dry and powerful with piercing acidity and extraordinary texture.",
    "editorial": "Rangen de Thann is Alsace's most extreme terroir — volcanic soils and fierce slopes. Zind-Humbrecht coaxes wines of haunting intensity and mineral depth from this remarkable vineyard.",
    "pairings": [
      "Choucroute",
      "Smoked fish",
      "Thai curry"
    ],
    "servingTemp": "10-12°C",
    "aging": "5-20 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "tenuta-san-guido-sassicaia-2020",
    "name": "Sassicaia",
    "producer": "Tenuta San Guido",
    "vintage": 2020,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon",
      "Cabernet Franc"
    ],
    "region": "Tuscany",
    "subRegion": "Bolgheri",
    "country": "Italy",
    "countryCode": "IT",
    "appellation": "Bolgheri Sassicaia DOC",
    "alcoholContent": "14%",
    "price": 280,
    "priceRange": "Ultra-Premium",
    "buyUrl": "https://www.wine.com/search?q=Sassicaia%20Tenuta%20San%20Guido",
    "scores": [
      {
        "source": "Tim Atkin",
        "score": 95,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "James Suckling",
        "score": 94,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Decanter",
        "score": 92,
        "maxScore": 100,
        "vintage": 2020
      }
    ],
    "aggregateScore": 94,
    "badges": [
      "Parker 95+",
      "James Suckling 95+",
      "Wine Spectator Top 100"
    ],
    "tastingNotes": "Classic cassis, Mediterranean herbs, graphite, and sea breeze. Structured and elegant with fine-grained tannins and exceptional balance.",
    "editorial": "Sassicaia is the wine that launched the Super Tuscan revolution. The 2020 is a stunning modern classic — powerful yet refined, with the signature maritime influence that sets Bolgheri apart from Bordeaux.",
    "pairings": [
      "Bistecca alla fiorentina",
      "Wild boar ragù",
      "Pecorino Toscano"
    ],
    "servingTemp": "17-18°C",
    "aging": "10-30 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "marchesi-antinori-tignanello-2020",
    "name": "Tignanello",
    "producer": "Marchesi Antinori",
    "vintage": 2020,
    "type": "Red",
    "grape": "Sangiovese",
    "grapes": [
      "Sangiovese",
      "Cabernet Sauvignon",
      "Cabernet Franc"
    ],
    "region": "Tuscany",
    "subRegion": "Chianti Classico",
    "country": "Italy",
    "countryCode": "IT",
    "appellation": "Toscana IGT",
    "alcoholContent": "14%",
    "price": 110,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Tignanello%20Marchesi%20Antinori",
    "scores": [
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2020
      },
      {
        "source": "Wine Enthusiast",
        "score": 93,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Decanter",
        "score": 93,
        "maxScore": 100,
        "vintage": 2020
      }
    ],
    "aggregateScore": 92,
    "badges": [
      "Parker 90+",
      "James Suckling 95+"
    ],
    "tastingNotes": "Vibrant cherry, plum, tobacco, and sweet spice. Medium-to-full body with silky tannins and lifted acidity.",
    "editorial": "Tignanello was the original Super Tuscan. The 2020 continues the estate's 50-year tradition of blending Sangiovese with Cabernet to create wines of extraordinary character and accessibility.",
    "pairings": [
      "Pasta with meat ragù",
      "Grilled lamb",
      "Aged Parmigiano"
    ],
    "servingTemp": "16-18°C",
    "aging": "8-20 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "biondi-santi-brunello-di-montalcino-2017",
    "name": "Brunello di Montalcino",
    "producer": "Biondi-Santi",
    "vintage": 2017,
    "type": "Red",
    "grape": "Sangiovese",
    "grapes": [
      "Sangiovese Grosso"
    ],
    "region": "Tuscany",
    "subRegion": "Montalcino",
    "country": "Italy",
    "countryCode": "IT",
    "appellation": "Brunello di Montalcino DOCG",
    "alcoholContent": "14%",
    "price": 200,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Brunello%20di%20Montalcino%20Biondi-Santi",
    "scores": [
      {
        "source": "Wine Enthusiast",
        "score": 89,
        "maxScore": 100,
        "vintage": 2017
      },
      {
        "source": "Decanter",
        "score": 89,
        "maxScore": 100,
        "vintage": 2017
      },
      {
        "source": "James Suckling",
        "score": 92,
        "maxScore": 100,
        "vintage": 2017
      },
      {
        "source": "Robert Parker",
        "score": 91,
        "maxScore": 100,
        "vintage": 2017
      }
    ],
    "aggregateScore": 90,
    "badges": [
      "Parker 95+",
      "Decanter World Wine Awards Gold"
    ],
    "tastingNotes": "Pure and classical with dried cherry, leather, earth, and dried herbs. Medium-bodied with razor-sharp acidity and firm, age-worthy tannins.",
    "editorial": "Biondi-Santi is the historic house of Brunello di Montalcino. The 2017 Riserva is quintessential Sangiovese — austere, intellectual, and designed for decades of cellar time.",
    "pairings": [
      "Wild boar",
      "Aged cheeses",
      "Grilled meats"
    ],
    "servingTemp": "17-18°C",
    "aging": "15-40 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "tenuta-dell-ornellaia-ornellaia-2020",
    "name": "Ornellaia",
    "producer": "Tenuta dell'Ornellaia",
    "vintage": 2020,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon",
      "Merlot",
      "Cabernet Franc",
      "Petit Verdot"
    ],
    "region": "Tuscany",
    "subRegion": "Bolgheri",
    "country": "Italy",
    "countryCode": "IT",
    "appellation": "Bolgheri Superiore DOC",
    "alcoholContent": "14.5%",
    "price": 220,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Ornellaia%20Tenuta%20dell'Ornellaia",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 92,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Jancis Robinson",
        "score": 19,
        "maxScore": 20,
        "vintage": 2020
      },
      {
        "source": "Decanter",
        "score": 95,
        "maxScore": 100,
        "vintage": 2020
      }
    ],
    "aggregateScore": 94,
    "badges": [
      "James Suckling 95+",
      "Parker 90+"
    ],
    "tastingNotes": "Rich and layered with dark fruit, chocolate, espresso, and Mediterranean herbs. Full-bodied with plush tannins and a lingering, spicy finish.",
    "editorial": "Ornellaia is Bolgheri's other great estate, producing wines of opulence and sophistication. The 2020 is generous and seductive — a wine of immediate pleasure that will also age beautifully.",
    "pairings": [
      "Ossobuco",
      "Truffle pasta",
      "Aged Pecorino"
    ],
    "servingTemp": "17-18°C",
    "aging": "10-25 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "giacomo-conterno-barolo-monfortino-riserva-2015",
    "name": "Barolo Monfortino Riserva",
    "producer": "Giacomo Conterno",
    "vintage": 2015,
    "type": "Red",
    "grape": "Nebbiolo",
    "grapes": [
      "Nebbiolo"
    ],
    "region": "Piedmont",
    "subRegion": "Barolo",
    "country": "Italy",
    "countryCode": "IT",
    "appellation": "Barolo DOCG",
    "alcoholContent": "14.5%",
    "price": 1500,
    "priceRange": "Ultra-Premium",
    "buyUrl": "https://www.wine.com/search?q=Barolo%20Monfortino%20Riserva%20Giacomo%20Conterno",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 95,
        "maxScore": 100,
        "vintage": 2015
      },
      {
        "source": "Jancis Robinson",
        "score": 19,
        "maxScore": 20,
        "vintage": 2015
      },
      {
        "source": "Robert Parker",
        "score": 93,
        "maxScore": 100,
        "vintage": 2015
      },
      {
        "source": "Tim Atkin",
        "score": 95,
        "maxScore": 100,
        "vintage": 2015
      },
      {
        "source": "James Suckling",
        "score": 95,
        "maxScore": 100,
        "vintage": 2015
      }
    ],
    "aggregateScore": 95,
    "badges": [
      "Parker 95+",
      "James Suckling 100",
      "Wine Spectator Top 100"
    ],
    "tastingNotes": "Hauntingly complex aromas of tar, roses, dried cherry, and truffles. Massive structure with unbelievable depth, yet remarkably refined.",
    "editorial": "Monfortino is Italy's most legendary wine — a Barolo of almost incomprehensible depth and longevity. The 2015 is already hailed as one of the greatest vintages ever produced.",
    "pairings": [
      "White truffle risotto",
      "Braised veal",
      "Aged Parmigiano-Reggiano"
    ],
    "servingTemp": "17-18°C",
    "aging": "20-50+ years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "gaja-barbaresco-2019",
    "name": "Barbaresco",
    "producer": "Gaja",
    "vintage": 2019,
    "type": "Red",
    "grape": "Nebbiolo",
    "grapes": [
      "Nebbiolo"
    ],
    "region": "Piedmont",
    "subRegion": "Barbaresco",
    "country": "Italy",
    "countryCode": "IT",
    "appellation": "Barbaresco DOCG",
    "alcoholContent": "14%",
    "price": 250,
    "priceRange": "Ultra-Premium",
    "buyUrl": "https://www.wine.com/search?q=Barbaresco%20Gaja",
    "scores": [
      {
        "source": "Robert Parker",
        "score": 94,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2019
      },
      {
        "source": "Wine Spectator",
        "score": 94,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "James Suckling",
        "score": 91,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Wine Enthusiast",
        "score": 91,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 92,
    "badges": [
      "Parker 90+",
      "James Suckling 95+"
    ],
    "tastingNotes": "Elegant nose of tar, roses, dark cherry, and licorice. More approachable than Barolo in youth, with silky tannins and vibrant acidity.",
    "editorial": "Angelo Gaja transformed Barbaresco from a Barolo understudy into a world-class wine region. This 2019 is quintessential Gaja — modern, polished, and deeply expressive of its terroir.",
    "pairings": [
      "Tajarin al tartufo",
      "Braised rabbit",
      "Fontina"
    ],
    "servingTemp": "16-18°C",
    "aging": "10-25 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "giuseppe-quintarelli-amarone-della-valpolicella-classico-2013",
    "name": "Amarone della Valpolicella Classico",
    "producer": "Giuseppe Quintarelli",
    "vintage": 2013,
    "type": "Red",
    "grape": "Corvina",
    "grapes": [
      "Corvina",
      "Rondinella",
      "Molinara"
    ],
    "region": "Veneto",
    "subRegion": "Valpolicella",
    "country": "Italy",
    "countryCode": "IT",
    "appellation": "Amarone della Valpolicella DOCG",
    "alcoholContent": "16%",
    "price": 350,
    "priceRange": "Ultra-Premium",
    "buyUrl": "https://www.wine.com/search?q=Amarone%20della%20Valpolicella%20Classico%20Giuseppe%20Quintarelli",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 93,
        "maxScore": 100,
        "vintage": 2013
      },
      {
        "source": "Jancis Robinson",
        "score": 19,
        "maxScore": 20,
        "vintage": 2013
      },
      {
        "source": "Robert Parker",
        "score": 93,
        "maxScore": 100,
        "vintage": 2013
      },
      {
        "source": "Wine Enthusiast",
        "score": 95,
        "maxScore": 100,
        "vintage": 2013
      },
      {
        "source": "Vivino",
        "score": 4.8,
        "maxScore": 5,
        "vintage": 2013
      },
      {
        "source": "Tim Atkin",
        "score": 94,
        "maxScore": 100,
        "vintage": 2013
      }
    ],
    "aggregateScore": 94,
    "badges": [
      "Parker 95+"
    ],
    "tastingNotes": "Dense and luxurious with dried fig, chocolate, espresso, and balsamic. Full-bodied and concentrated with incredible richness and a bittersweet finish.",
    "editorial": "Quintarelli is the undisputed king of Amarone. This wine, made from dried grapes using methods unchanged for generations, is a monument to traditional Italian winemaking at its absolute finest.",
    "pairings": [
      "Aged cheeses",
      "Braised meats",
      "Dark chocolate",
      "After dinner"
    ],
    "servingTemp": "18-20°C",
    "aging": "15-30 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "bodegas-vega-sicilia-vega-sicilia-nico-2014",
    "name": "Vega Sicilia Único",
    "producer": "Bodegas Vega Sicilia",
    "vintage": 2014,
    "type": "Red",
    "grape": "Tempranillo",
    "grapes": [
      "Tempranillo",
      "Cabernet Sauvignon"
    ],
    "region": "Ribera del Duero",
    "subRegion": "Ribera del Duero",
    "country": "Spain",
    "countryCode": "ES",
    "appellation": "Ribera del Duero DO",
    "alcoholContent": "14%",
    "price": 450,
    "priceRange": "Ultra-Premium",
    "buyUrl": "https://www.wine.com/search?q=Vega%20Sicilia%20%C3%9Anico%20Bodegas%20Vega%20Sicilia",
    "scores": [
      {
        "source": "Wine Enthusiast",
        "score": 95,
        "maxScore": 100,
        "vintage": 2014
      },
      {
        "source": "Tim Atkin",
        "score": 95,
        "maxScore": 100,
        "vintage": 2014
      },
      {
        "source": "Robert Parker",
        "score": 92,
        "maxScore": 100,
        "vintage": 2014
      },
      {
        "source": "Jancis Robinson",
        "score": 19,
        "maxScore": 20,
        "vintage": 2014
      }
    ],
    "aggregateScore": 94,
    "badges": [
      "Parker 95+",
      "James Suckling 95+",
      "Wine Spectator Top 100"
    ],
    "tastingNotes": "Complex nose of blackberry, cedar, vanilla, and balsamic. Elegant and powerful with polished tannins and an extraordinarily long finish.",
    "editorial": "Único is Spain's most iconic wine, aged for 10 years before release. The 2014 is a masterpiece of patience and precision — a wine that bridges the Old World and the New.",
    "pairings": [
      "Roast suckling pig",
      "Aged Manchego",
      "Ibérico ham"
    ],
    "servingTemp": "17-18°C",
    "aging": "15-40 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "dominio-de-pingus-pingus-2019",
    "name": "Pingus",
    "producer": "Dominio de Pingus",
    "vintage": 2019,
    "type": "Red",
    "grape": "Tempranillo",
    "grapes": [
      "Tempranillo"
    ],
    "region": "Ribera del Duero",
    "subRegion": "Ribera del Duero",
    "country": "Spain",
    "countryCode": "ES",
    "appellation": "Ribera del Duero DO",
    "alcoholContent": "14.5%",
    "price": 850,
    "priceRange": "Ultra-Premium",
    "buyUrl": "https://www.wine.com/search?q=Pingus%20Dominio%20de%20Pingus",
    "scores": [
      {
        "source": "Vivino",
        "score": 4.7,
        "maxScore": 5,
        "vintage": 2019
      },
      {
        "source": "Robert Parker",
        "score": 94,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Decanter",
        "score": 97,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Jancis Robinson",
        "score": 19,
        "maxScore": 20,
        "vintage": 2019
      },
      {
        "source": "Tim Atkin",
        "score": 93,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "James Suckling",
        "score": 97,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 95,
    "badges": [
      "Parker 95+",
      "James Suckling 100"
    ],
    "tastingNotes": "Explosively aromatic with blackberry, graphite, violets, and exotic spice. Monumental concentration with velvety, ultra-fine tannins.",
    "editorial": "Peter Sisseck's Pingus has been one of Spain's most talked-about wines since its debut in 1995. The 2019, from old-vine Tempranillo, is a wine of staggering intensity and finesse.",
    "pairings": [
      "Lamb shoulder",
      "Game meats",
      "Aged cheeses"
    ],
    "servingTemp": "17-18°C",
    "aging": "15-30 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "lvaro-palacios-l-ermita-velles-vinyes-2019",
    "name": "L'Ermita Velles Vinyes",
    "producer": "Álvaro Palacios",
    "vintage": 2019,
    "type": "Red",
    "grape": "Garnacha",
    "grapes": [
      "Garnacha",
      "Cariñena"
    ],
    "region": "Priorat",
    "subRegion": "Priorat",
    "country": "Spain",
    "countryCode": "ES",
    "appellation": "Priorat DOCa",
    "alcoholContent": "14.5%",
    "price": 600,
    "priceRange": "Ultra-Premium",
    "buyUrl": "https://www.wine.com/search?q=L'Ermita%20Velles%20Vinyes%20%C3%81lvaro%20Palacios",
    "scores": [
      {
        "source": "Wine Enthusiast",
        "score": 93,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Wine Spectator",
        "score": 95,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Decanter",
        "score": 95,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Vivino",
        "score": 4.8,
        "maxScore": 5,
        "vintage": 2019
      }
    ],
    "aggregateScore": 95,
    "badges": [
      "Parker 95+",
      "Jancis Robinson 19/20"
    ],
    "tastingNotes": "Intense minerality with wild herbs, black cherry, slate, and balsamic. Full-bodied yet astonishingly fresh with a thrilling, electric finish.",
    "editorial": "L'Ermita, from ancient Garnacha vines on terraced slate slopes, is one of Spain's greatest wines. Álvaro Palacios coaxes extraordinary mineral depth from this dramatic landscape.",
    "pairings": [
      "Grilled octopus",
      "Lamb chops",
      "Roasted peppers"
    ],
    "servingTemp": "16-18°C",
    "aging": "10-25 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "la-rioja-alta-rioja-gran-reserva-904-2015",
    "name": "Rioja Gran Reserva 904",
    "producer": "La Rioja Alta",
    "vintage": 2015,
    "type": "Red",
    "grape": "Tempranillo",
    "grapes": [
      "Tempranillo",
      "Graciano"
    ],
    "region": "Rioja",
    "subRegion": "Rioja Alta",
    "country": "Spain",
    "countryCode": "ES",
    "appellation": "Rioja DOCa",
    "alcoholContent": "13.5%",
    "price": 55,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Rioja%20Gran%20Reserva%20904%20La%20Rioja%20Alta",
    "scores": [
      {
        "source": "Decanter",
        "score": 87,
        "maxScore": 100,
        "vintage": 2015
      },
      {
        "source": "James Suckling",
        "score": 89,
        "maxScore": 100,
        "vintage": 2015
      },
      {
        "source": "Vivino",
        "score": 4.4,
        "maxScore": 5,
        "vintage": 2015
      }
    ],
    "aggregateScore": 88,
    "badges": [
      "Parker 90+",
      "Best Value",
      "Editors Pick"
    ],
    "tastingNotes": "Classic Rioja aromatics of dried cherry, leather, tobacco, and vanilla from American oak. Elegant and silky with beautiful aging character.",
    "editorial": "The 904 is one of the great value wines of the world. Extended aging in American oak gives it the haunting complexity of wines costing ten times the price. An absolute benchmark.",
    "pairings": [
      "Lamb stew",
      "Chorizo",
      "Manchego",
      "Roast chicken"
    ],
    "servingTemp": "16-17°C",
    "aging": "5-20 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "opus-one-winery-opus-one-2020",
    "name": "Opus One",
    "producer": "Opus One Winery",
    "vintage": 2020,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon",
      "Merlot",
      "Cabernet Franc",
      "Petit Verdot",
      "Malbec"
    ],
    "region": "Napa Valley",
    "subRegion": "Oakville",
    "country": "United States",
    "countryCode": "US",
    "appellation": "Napa Valley AVA",
    "alcoholContent": "14.5%",
    "price": 450,
    "priceRange": "Ultra-Premium",
    "buyUrl": "https://www.wine.com/search?q=Opus%20One%20Opus%20One%20Winery",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 95,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Vivino",
        "score": 4.8,
        "maxScore": 5,
        "vintage": 2020
      },
      {
        "source": "Tim Atkin",
        "score": 93,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Jancis Robinson",
        "score": 19,
        "maxScore": 20,
        "vintage": 2020
      }
    ],
    "aggregateScore": 95,
    "badges": [
      "Parker 95+",
      "James Suckling 95+"
    ],
    "tastingNotes": "Lush cassis, dark chocolate, espresso, and cedar. Full-bodied with velvety tannins, impeccable balance, and a long, polished finish.",
    "editorial": "The Rothschild-Mondavi collaboration continues to produce one of Napa's most iconic wines. The 2020 Opus One is a stunning expression of Oakville terroir — rich, refined, and quintessentially Californian.",
    "pairings": [
      "Prime rib",
      "Grilled lamb",
      "Aged Gouda"
    ],
    "servingTemp": "17-18°C",
    "aging": "10-25 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "screaming-eagle-screaming-eagle-cabernet-sauvignon-2019",
    "name": "Screaming Eagle Cabernet Sauvignon",
    "producer": "Screaming Eagle",
    "vintage": 2019,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon",
      "Merlot"
    ],
    "region": "Napa Valley",
    "subRegion": "Oakville",
    "country": "United States",
    "countryCode": "US",
    "appellation": "Napa Valley AVA",
    "alcoholContent": "14.5%",
    "price": 3500,
    "priceRange": "Ultra-Premium",
    "buyUrl": "https://www.wine.com/search?q=Screaming%20Eagle%20Cabernet%20Sauvignon%20Screaming%20Eagle",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 94,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Decanter",
        "score": 97,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Tim Atkin",
        "score": 97,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Jancis Robinson",
        "score": 19,
        "maxScore": 20,
        "vintage": 2019
      }
    ],
    "aggregateScore": 96,
    "badges": [
      "Parker 95+",
      "James Suckling 100",
      "Critics Choice"
    ],
    "tastingNotes": "Extraordinary purity of dark fruit, graphite, violet, and sweet oak. Silky, seamless, and endlessly complex with a finish of breathtaking length.",
    "editorial": "Screaming Eagle is America's most exclusive wine. The 2019 is near-perfection — a wine of such grace and intensity that it transcends the cult wine category entirely.",
    "pairings": [
      "Wagyu beef",
      "Foie gras",
      "Black truffle"
    ],
    "servingTemp": "17-18°C",
    "aging": "15-35 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "caymus-vineyards-caymus-special-selection-cabernet-sauvignon-2019",
    "name": "Caymus Special Selection Cabernet Sauvignon",
    "producer": "Caymus Vineyards",
    "vintage": 2019,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon"
    ],
    "region": "Napa Valley",
    "subRegion": "Rutherford",
    "country": "United States",
    "countryCode": "US",
    "appellation": "Napa Valley AVA",
    "alcoholContent": "15%",
    "price": 200,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Caymus%20Special%20Selection%20Cabernet%20Sauvignon%20Caymus%20Vineyards",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 93,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Tim Atkin",
        "score": 91,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2019
      },
      {
        "source": "Robert Parker",
        "score": 93,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "James Suckling",
        "score": 89,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Decanter",
        "score": 92,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 91,
    "badges": [
      "Wine Spectator Top 100",
      "Parker 90+"
    ],
    "tastingNotes": "Rich and opulent with ripe blackberry, vanilla, cocoa, and toasty oak. Full-bodied, plush, and immediately pleasurable.",
    "editorial": "Caymus Special Selection is one of Napa's most recognizable labels. The 2019 delivers the estate's signature style — bold, ripe, and unabashedly Californian. A crowd-pleaser par excellence.",
    "pairings": [
      "BBQ ribs",
      "Grilled steak",
      "Chocolate desserts"
    ],
    "servingTemp": "17-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "joseph-phelps-vineyards-insignia-2020",
    "name": "Insignia",
    "producer": "Joseph Phelps Vineyards",
    "vintage": 2020,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon",
      "Merlot",
      "Petit Verdot",
      "Malbec"
    ],
    "region": "Napa Valley",
    "subRegion": "St. Helena",
    "country": "United States",
    "countryCode": "US",
    "appellation": "Napa Valley AVA",
    "alcoholContent": "14.5%",
    "price": 300,
    "priceRange": "Ultra-Premium",
    "buyUrl": "https://www.wine.com/search?q=Insignia%20Joseph%20Phelps%20Vineyards",
    "scores": [
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2020
      },
      {
        "source": "Wine Spectator",
        "score": 95,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Robert Parker",
        "score": 93,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Vivino",
        "score": 4.8,
        "maxScore": 5,
        "vintage": 2020
      }
    ],
    "aggregateScore": 94,
    "badges": [
      "Parker 95+",
      "Wine Spectator Top 100"
    ],
    "tastingNotes": "Deep and complex with blackberry, cassis, dark chocolate, and espresso. Full-bodied with supple tannins and extraordinary concentration.",
    "editorial": "Insignia was America's first proprietary Bordeaux-style blend, and it remains one of its finest. The 2020 is a monumental wine — dense, layered, and built for the long haul.",
    "pairings": [
      "Filet mignon",
      "Braised short ribs",
      "Aged cheeses"
    ],
    "servingTemp": "17-18°C",
    "aging": "10-25 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "beaux-fr-res-beaux-fr-res-pinot-noir-2021",
    "name": "Beaux Frères Pinot Noir",
    "producer": "Beaux Frères",
    "vintage": 2021,
    "type": "Red",
    "grape": "Pinot Noir",
    "grapes": [
      "Pinot Noir"
    ],
    "region": "Willamette Valley",
    "subRegion": "Ribbon Ridge",
    "country": "United States",
    "countryCode": "US",
    "appellation": "Ribbon Ridge AVA",
    "alcoholContent": "13.5%",
    "price": 65,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Beaux%20Fr%C3%A8res%20Pinot%20Noir%20Beaux%20Fr%C3%A8res",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 87,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Decanter",
        "score": 88,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "James Suckling",
        "score": 90,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Vivino",
        "score": 4.6,
        "maxScore": 5,
        "vintage": 2021
      },
      {
        "source": "Robert Parker",
        "score": 87,
        "maxScore": 100,
        "vintage": 2021
      }
    ],
    "aggregateScore": 89,
    "badges": [
      "Parker 90+"
    ],
    "tastingNotes": "Bright cherry, raspberry, forest floor, and baking spice. Silky and elegant with fine-grained tannins and beautiful length.",
    "editorial": "Beaux Frères produces some of Oregon's most Burgundian Pinot Noirs. The 2021 is graceful and complex — proof that the Willamette Valley can rival the Côte d'Or for Pinot Noir excellence.",
    "pairings": [
      "Roast chicken",
      "Salmon",
      "Wild mushrooms",
      "Soft cheeses"
    ],
    "servingTemp": "14-16°C",
    "aging": "5-12 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "penfolds-grange-2019",
    "name": "Grange",
    "producer": "Penfolds",
    "vintage": 2019,
    "type": "Red",
    "grape": "Shiraz",
    "grapes": [
      "Shiraz",
      "Cabernet Sauvignon"
    ],
    "region": "South Australia",
    "subRegion": "Multi-region",
    "country": "Australia",
    "countryCode": "AU",
    "appellation": "South Australia",
    "alcoholContent": "14.5%",
    "price": 750,
    "priceRange": "Ultra-Premium",
    "buyUrl": "https://www.wine.com/search?q=Grange%20Penfolds",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 93,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Decanter",
        "score": 95,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Robert Parker",
        "score": 95,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Jancis Robinson",
        "score": 19,
        "maxScore": 20,
        "vintage": 2019
      },
      {
        "source": "Wine Enthusiast",
        "score": 94,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "James Suckling",
        "score": 95,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 95,
    "badges": [
      "Parker 95+",
      "James Suckling 95+",
      "Wine Spectator Top 100"
    ],
    "tastingNotes": "Monumental nose of blackberry, dark chocolate, licorice, and smoked meat. Massively concentrated with velvety tannins and incredible persistence.",
    "editorial": "Penfolds Grange is Australia's most iconic wine and one of the world's great reds. The 2019 continues a tradition of excellence spanning 70+ vintages — powerful, complex, and built to last.",
    "pairings": [
      "Aged beef",
      "Braised lamb",
      "Strong cheeses"
    ],
    "servingTemp": "17-18°C",
    "aging": "15-40 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "henschke-hill-of-grace-2018",
    "name": "Hill of Grace",
    "producer": "Henschke",
    "vintage": 2018,
    "type": "Red",
    "grape": "Shiraz",
    "grapes": [
      "Shiraz"
    ],
    "region": "Eden Valley",
    "subRegion": "Eden Valley",
    "country": "Australia",
    "countryCode": "AU",
    "appellation": "Eden Valley",
    "alcoholContent": "14.5%",
    "price": 650,
    "priceRange": "Ultra-Premium",
    "buyUrl": "https://www.wine.com/search?q=Hill%20of%20Grace%20Henschke",
    "scores": [
      {
        "source": "Tim Atkin",
        "score": 97,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Wine Spectator",
        "score": 93,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Decanter",
        "score": 96,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Vivino",
        "score": 4.7,
        "maxScore": 5,
        "vintage": 2018
      },
      {
        "source": "Wine Enthusiast",
        "score": 93,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Robert Parker",
        "score": 94,
        "maxScore": 100,
        "vintage": 2018
      }
    ],
    "aggregateScore": 95,
    "badges": [
      "Parker 95+",
      "James Suckling 95+"
    ],
    "tastingNotes": "Extraordinary elegance for Shiraz, with blackberry, violet, pepper, and earth. Full-bodied yet surprisingly refined with incredible length.",
    "editorial": "From vines planted in the 1860s, Hill of Grace is Australian Shiraz at its most profound. The 2018 is a wine of rare beauty — powerful yet graceful, concentrated yet ethereal.",
    "pairings": [
      "Kangaroo loin",
      "Grilled lamb",
      "Aged cheddar"
    ],
    "servingTemp": "17-18°C",
    "aging": "15-30 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "cloudy-bay-cloudy-bay-sauvignon-blanc-2023",
    "name": "Cloudy Bay Sauvignon Blanc",
    "producer": "Cloudy Bay",
    "vintage": 2023,
    "type": "White",
    "grape": "Sauvignon Blanc",
    "grapes": [
      "Sauvignon Blanc"
    ],
    "region": "Marlborough",
    "subRegion": "Marlborough",
    "country": "New Zealand",
    "countryCode": "NZ",
    "appellation": "Marlborough",
    "alcoholContent": "13.5%",
    "price": 22,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Cloudy%20Bay%20Sauvignon%20Blanc%20Cloudy%20Bay",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 83,
        "maxScore": 100,
        "vintage": 2023
      },
      {
        "source": "Decanter",
        "score": 86,
        "maxScore": 100,
        "vintage": 2023
      },
      {
        "source": "Robert Parker",
        "score": 87,
        "maxScore": 100,
        "vintage": 2023
      },
      {
        "source": "Wine Enthusiast",
        "score": 83,
        "maxScore": 100,
        "vintage": 2023
      },
      {
        "source": "Tim Atkin",
        "score": 86,
        "maxScore": 100,
        "vintage": 2023
      }
    ],
    "aggregateScore": 85,
    "badges": [
      "Best Value",
      "Editors Pick"
    ],
    "tastingNotes": "Vibrant gooseberry, passion fruit, and fresh-cut grass. Zesty and refreshing with mouthwatering acidity and a clean, mineral finish.",
    "editorial": "Cloudy Bay put New Zealand Sauvignon Blanc on the world map. The 2023 is a textbook expression — explosively aromatic, crystal-clear, and endlessly refreshing. One of the world's great wine values.",
    "pairings": [
      "Seafood",
      "Goat cheese",
      "Asian cuisine",
      "Salads"
    ],
    "servingTemp": "8-10°C",
    "aging": "1-3 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "bodega-catena-zapata-catena-zapata-malbec-argentino-2020",
    "name": "Catena Zapata Malbec Argentino",
    "producer": "Bodega Catena Zapata",
    "vintage": 2020,
    "type": "Red",
    "grape": "Malbec",
    "grapes": [
      "Malbec"
    ],
    "region": "Mendoza",
    "subRegion": "Agrelo",
    "country": "Argentina",
    "countryCode": "AR",
    "appellation": "Mendoza",
    "alcoholContent": "14.5%",
    "price": 120,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Catena%20Zapata%20Malbec%20Argentino%20Bodega%20Catena%20Zapata",
    "scores": [
      {
        "source": "Wine Enthusiast",
        "score": 91,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Tim Atkin",
        "score": 91,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Decanter",
        "score": 93,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "James Suckling",
        "score": 92,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Robert Parker",
        "score": 90,
        "maxScore": 100,
        "vintage": 2020
      }
    ],
    "aggregateScore": 91,
    "badges": [
      "Parker 95+",
      "James Suckling 95+"
    ],
    "tastingNotes": "Deep purple with aromas of blackberry, plum, violet, and dark chocolate. Full-bodied with plush tannins and a long, velvety finish.",
    "editorial": "Nicolás Catena is the pioneer who elevated Argentine Malbec to world-class status. The Malbec Argentino is his masterwork — a wine of profound depth and elegance from high-altitude vineyards.",
    "pairings": [
      "Argentine asado",
      "Empanadas",
      "Grilled steak",
      "Chimichurri"
    ],
    "servingTemp": "16-18°C",
    "aging": "8-20 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "achaval-ferrer-malbec-reserva-2021",
    "name": "Malbec Reserva",
    "producer": "Achaval-Ferrer",
    "vintage": 2021,
    "type": "Red",
    "grape": "Malbec",
    "grapes": [
      "Malbec"
    ],
    "region": "Mendoza",
    "subRegion": "Mendoza",
    "country": "Argentina",
    "countryCode": "AR",
    "appellation": "Mendoza",
    "alcoholContent": "14%",
    "price": 25,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Malbec%20Reserva%20Achaval-Ferrer",
    "scores": [
      {
        "source": "Wine Enthusiast",
        "score": 83,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Decanter",
        "score": 83,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "James Suckling",
        "score": 87,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2021
      },
      {
        "source": "Robert Parker",
        "score": 84,
        "maxScore": 100,
        "vintage": 2021
      }
    ],
    "aggregateScore": 84,
    "badges": [
      "Best Value",
      "Parker 90+"
    ],
    "tastingNotes": "Ripe plum, blackberry, vanilla, and a hint of chocolate. Medium-to-full body with round, approachable tannins.",
    "editorial": "Achaval-Ferrer's Reserva is proof that exceptional Malbec need not be expensive. At this price point, it delivers concentration and complexity that embarrass wines costing four times as much.",
    "pairings": [
      "Grilled meats",
      "Pizza",
      "Burgers",
      "Empanadas"
    ],
    "servingTemp": "16-17°C",
    "aging": "3-7 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "concha-y-toro-don-melchor-cabernet-sauvignon-2020",
    "name": "Don Melchor Cabernet Sauvignon",
    "producer": "Concha y Toro",
    "vintage": 2020,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon",
      "Cabernet Franc",
      "Merlot"
    ],
    "region": "Maipo Valley",
    "subRegion": "Puente Alto",
    "country": "Chile",
    "countryCode": "CL",
    "appellation": "Maipo Valley DO",
    "alcoholContent": "14.5%",
    "price": 75,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Don%20Melchor%20Cabernet%20Sauvignon%20Concha%20y%20Toro",
    "scores": [
      {
        "source": "Decanter",
        "score": 87,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "James Suckling",
        "score": 90,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Tim Atkin",
        "score": 90,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Vivino",
        "score": 4.4,
        "maxScore": 5,
        "vintage": 2020
      }
    ],
    "aggregateScore": 89,
    "badges": [
      "Parker 90+",
      "James Suckling 95+",
      "Best Value"
    ],
    "tastingNotes": "Elegant cassis, eucalyptus, tobacco, and mineral notes. Structured with fine tannins and exceptional balance between fruit and freshness.",
    "editorial": "Don Melchor is Chile's most acclaimed Cabernet Sauvignon, consistently rivaling wines from Napa and Bordeaux at a fraction of the price. The 2020 is a stellar vintage.",
    "pairings": [
      "Lamb",
      "Beef tenderloin",
      "Aged cheeses"
    ],
    "servingTemp": "17-18°C",
    "aging": "8-20 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "egon-m-ller-scharzhofberger-riesling-sp-tlese-2021",
    "name": "Scharzhofberger Riesling Spätlese",
    "producer": "Egon Müller",
    "vintage": 2021,
    "type": "White",
    "grape": "Riesling",
    "grapes": [
      "Riesling"
    ],
    "region": "Mosel",
    "subRegion": "Saar",
    "country": "Germany",
    "countryCode": "DE",
    "appellation": "Mosel",
    "alcoholContent": "8%",
    "price": 120,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Scharzhofberger%20Riesling%20Sp%C3%A4tlese%20Egon%20M%C3%BCller",
    "scores": [
      {
        "source": "Decanter",
        "score": 89,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Tim Atkin",
        "score": 89,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "James Suckling",
        "score": 90,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Vivino",
        "score": 4.7,
        "maxScore": 5,
        "vintage": 2021
      }
    ],
    "aggregateScore": 91,
    "badges": [
      "Parker 95+",
      "Jancis Robinson 19/20"
    ],
    "tastingNotes": "Ethereal aromas of green apple, slate, lime blossom, and honey. Racy acidity with delicate sweetness and crystalline purity.",
    "editorial": "Egon Müller's Scharzhofberger is the pinnacle of Mosel Riesling. At just 8% alcohol, this wine achieves an impossible balance of sweetness, acidity, and mineral intensity. Pure magic.",
    "pairings": [
      "Foie gras",
      "Spicy Asian cuisine",
      "Blue cheese",
      "Fruit desserts"
    ],
    "servingTemp": "8-10°C",
    "aging": "10-30 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "weingut-dr-b-rklin-wolf-riesling-trocken-gg-kirchenst-ck-2021",
    "name": "Riesling Trocken GG Kirchenstück",
    "producer": "Weingut Dr. Bürklin-Wolf",
    "vintage": 2021,
    "type": "White",
    "grape": "Riesling",
    "grapes": [
      "Riesling"
    ],
    "region": "Pfalz",
    "subRegion": "Pfalz",
    "country": "Germany",
    "countryCode": "DE",
    "appellation": "Pfalz",
    "alcoholContent": "13%",
    "price": 65,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Riesling%20Trocken%20GG%20Kirchenst%C3%BCck%20Weingut%20Dr.%20B%C3%BCrklin-Wolf",
    "scores": [
      {
        "source": "James Suckling",
        "score": 89,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Robert Parker",
        "score": 87,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2021
      },
      {
        "source": "Wine Enthusiast",
        "score": 89,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Decanter",
        "score": 90,
        "maxScore": 100,
        "vintage": 2021
      }
    ],
    "aggregateScore": 89,
    "badges": [
      "Parker 90+"
    ],
    "tastingNotes": "Bone-dry with explosive aromatics of peach, citrus, and crushed limestone. Full-bodied for Riesling with remarkable texture and depth.",
    "editorial": "Kirchenstück in Forst is one of Germany's greatest vineyard sites. Bürklin-Wolf's biodynamic GG is a stunning dry Riesling that proves the grape's ability to produce powerful, age-worthy wines.",
    "pairings": [
      "Schnitzel",
      "Grilled white fish",
      "Sushi"
    ],
    "servingTemp": "10-12°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "casa-ferreirinha-barca-velha-2015",
    "name": "Barca Velha",
    "producer": "Casa Ferreirinha",
    "vintage": 2015,
    "type": "Red",
    "grape": "Touriga Nacional",
    "grapes": [
      "Touriga Nacional",
      "Touriga Franca",
      "Tinta Roriz",
      "Tinta Cão"
    ],
    "region": "Douro",
    "subRegion": "Douro Superior",
    "country": "Portugal",
    "countryCode": "PT",
    "appellation": "Douro DOC",
    "alcoholContent": "14%",
    "price": 350,
    "priceRange": "Ultra-Premium",
    "buyUrl": "https://www.wine.com/search?q=Barca%20Velha%20Casa%20Ferreirinha",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 95,
        "maxScore": 100,
        "vintage": 2015
      },
      {
        "source": "Decanter",
        "score": 93,
        "maxScore": 100,
        "vintage": 2015
      },
      {
        "source": "Tim Atkin",
        "score": 95,
        "maxScore": 100,
        "vintage": 2015
      }
    ],
    "aggregateScore": 94,
    "badges": [
      "Parker 95+",
      "James Suckling 95+"
    ],
    "tastingNotes": "Dark and brooding with black fruit, graphite, tobacco, and wild herbs. Full-bodied with superb structure and an amazingly long, complex finish.",
    "editorial": "Barca Velha is Portugal's most legendary wine, produced only in exceptional years. The 2015 is a monument to the Douro Valley — powerful, complex, and truly world-class.",
    "pairings": [
      "Roast kid",
      "Bacalhau",
      "Aged cheese"
    ],
    "servingTemp": "17-18°C",
    "aging": "15-30 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "taylor-s-vintage-port-2017",
    "name": "Vintage Port",
    "producer": "Taylor's",
    "vintage": 2017,
    "type": "Fortified",
    "grape": "Touriga Nacional",
    "grapes": [
      "Touriga Nacional",
      "Touriga Franca",
      "Tinta Roriz",
      "Tinta Barroca"
    ],
    "region": "Douro",
    "subRegion": "Douro",
    "country": "Portugal",
    "countryCode": "PT",
    "appellation": "Porto DOC",
    "alcoholContent": "20%",
    "price": 85,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Vintage%20Port%20Taylor's",
    "scores": [
      {
        "source": "Tim Atkin",
        "score": 89,
        "maxScore": 100,
        "vintage": 2017
      },
      {
        "source": "Wine Spectator",
        "score": 87,
        "maxScore": 100,
        "vintage": 2017
      },
      {
        "source": "Robert Parker",
        "score": 87,
        "maxScore": 100,
        "vintage": 2017
      },
      {
        "source": "Vivino",
        "score": 4.5,
        "maxScore": 5,
        "vintage": 2017
      }
    ],
    "aggregateScore": 88,
    "badges": [
      "Parker 95+",
      "Wine Spectator Top 100"
    ],
    "tastingNotes": "Intense blackberry, chocolate, violet, and spice. Massively concentrated with perfect sweetness balance and incredible grip.",
    "editorial": "Taylor's is the benchmark Port house, and the 2017 is one of the great declared vintages. This wine will evolve for decades, developing extraordinary complexity with age.",
    "pairings": [
      "Stilton",
      "Dark chocolate",
      "Walnuts",
      "After dinner"
    ],
    "servingTemp": "16-18°C",
    "aging": "20-60 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "craggy-range-craggy-range-te-muna-road-vineyard-pinot-noir-2021",
    "name": "Craggy Range Te Muna Road Vineyard Pinot Noir",
    "producer": "Craggy Range",
    "vintage": 2021,
    "type": "Red",
    "grape": "Pinot Noir",
    "grapes": [
      "Pinot Noir"
    ],
    "region": "Martinborough",
    "subRegion": "Wairarapa",
    "country": "New Zealand",
    "countryCode": "NZ",
    "appellation": "Martinborough",
    "alcoholContent": "13.5%",
    "price": 45,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Craggy%20Range%20Te%20Muna%20Road%20Vineyard%20Pinot%20Noir%20Craggy%20Range",
    "scores": [
      {
        "source": "Vivino",
        "score": 4.3,
        "maxScore": 5,
        "vintage": 2021
      },
      {
        "source": "James Suckling",
        "score": 88,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Tim Atkin",
        "score": 89,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Wine Enthusiast",
        "score": 86,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Robert Parker",
        "score": 85,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2021
      }
    ],
    "aggregateScore": 87,
    "badges": [
      "Parker 90+",
      "Decanter World Wine Awards Gold"
    ],
    "tastingNotes": "Dark cherry, plum, earthy spice, and a hint of smoke. Medium-bodied with silky tannins and vibrant, pure fruit.",
    "editorial": "Craggy Range's Te Muna Road vineyard produces Pinot Noir of remarkable depth and complexity. The 2021 is elegant and expressive — a benchmark for New Zealand Pinot Noir.",
    "pairings": [
      "Duck",
      "Salmon",
      "Mushroom dishes",
      "Brie"
    ],
    "servingTemp": "14-16°C",
    "aging": "5-10 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "the-sadie-family-wines-columella-2020",
    "name": "Columella",
    "producer": "The Sadie Family Wines",
    "vintage": 2020,
    "type": "Red",
    "grape": "Syrah",
    "grapes": [
      "Syrah",
      "Mourvèdre"
    ],
    "region": "Swartland",
    "subRegion": "Swartland",
    "country": "South Africa",
    "countryCode": "ZA",
    "appellation": "Swartland WO",
    "alcoholContent": "14%",
    "price": 90,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Columella%20The%20Sadie%20Family%20Wines",
    "scores": [
      {
        "source": "Tim Atkin",
        "score": 87,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Vivino",
        "score": 4.5,
        "maxScore": 5,
        "vintage": 2020
      },
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2020
      }
    ],
    "aggregateScore": 89,
    "badges": [
      "Parker 95+",
      "Tim Atkin 95+"
    ],
    "tastingNotes": "Profound aromatics of black olive, garrigue, pepper, and dark fruit. Medium-to-full body with extraordinary mineral complexity and elegant structure.",
    "editorial": "Eben Sadie's Columella has put South Africa's Swartland on the world wine map. The 2020 is a wine of remarkable originality — Mediterranean in spirit, African in soul.",
    "pairings": [
      "Braai meats",
      "Bobotie",
      "Lamb curry",
      "Aged Gouda"
    ],
    "servingTemp": "16-18°C",
    "aging": "8-20 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "kanonkop-kanonkop-paul-sauer-2019",
    "name": "Kanonkop Paul Sauer",
    "producer": "Kanonkop",
    "vintage": 2019,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon",
      "Cabernet Franc",
      "Merlot"
    ],
    "region": "Stellenbosch",
    "subRegion": "Simonsberg-Stellenbosch",
    "country": "South Africa",
    "countryCode": "ZA",
    "appellation": "Stellenbosch WO",
    "alcoholContent": "14%",
    "price": 45,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Kanonkop%20Paul%20Sauer%20Kanonkop",
    "scores": [
      {
        "source": "Vivino",
        "score": 4.4,
        "maxScore": 5,
        "vintage": 2019
      },
      {
        "source": "Tim Atkin",
        "score": 87,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Robert Parker",
        "score": 85,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Wine Spectator",
        "score": 88,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "James Suckling",
        "score": 85,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 87,
    "badges": [
      "Tim Atkin 95+",
      "Best Value"
    ],
    "tastingNotes": "Classic Bordeaux-style with cassis, cedar, pencil shavings, and dark plum. Structured and elegant with fine tannins and excellent aging potential.",
    "editorial": "Paul Sauer is South Africa's answer to the great Bordeaux blends. At under $50, it consistently delivers quality that rivals wines costing five times the price. An extraordinary value.",
    "pairings": [
      "Roast lamb",
      "Grilled steak",
      "Aged cheddar"
    ],
    "servingTemp": "16-18°C",
    "aging": "8-20 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "f-x-pichler-gr-ner-veltliner-smaragd-kellerberg-2021",
    "name": "Grüner Veltliner Smaragd Kellerberg",
    "producer": "F.X. Pichler",
    "vintage": 2021,
    "type": "White",
    "grape": "Grüner Veltliner",
    "grapes": [
      "Grüner Veltliner"
    ],
    "region": "Wachau",
    "subRegion": "Wachau",
    "country": "Austria",
    "countryCode": "AT",
    "appellation": "Wachau DAC",
    "alcoholContent": "14%",
    "price": 85,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Gr%C3%BCner%20Veltliner%20Smaragd%20Kellerberg%20F.X.%20Pichler",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 87,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "James Suckling",
        "score": 91,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Wine Enthusiast",
        "score": 89,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Decanter",
        "score": 91,
        "maxScore": 100,
        "vintage": 2021
      }
    ],
    "aggregateScore": 90,
    "badges": [
      "Parker 90+",
      "Jancis Robinson 18/20"
    ],
    "tastingNotes": "Rich and powerful with white pepper, stone fruit, lentil, and honey. Full-bodied with razor acidity and incredible mineral persistence.",
    "editorial": "F.X. Pichler is Austria's most celebrated producer, and the Kellerberg Smaragd is his crown jewel. This is Grüner Veltliner at its most profound — a wine to rival the finest white Burgundies.",
    "pairings": [
      "Wiener Schnitzel",
      "Asparagus",
      "Sushi",
      "White fish"
    ],
    "servingTemp": "10-12°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "ch-teau-musar-ch-teau-musar-red-2017",
    "name": "Château Musar Red",
    "producer": "Château Musar",
    "vintage": 2017,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon",
      "Cinsault",
      "Carignan"
    ],
    "region": "Bekaa Valley",
    "subRegion": "Bekaa Valley",
    "country": "Lebanon",
    "countryCode": "LB",
    "appellation": "Bekaa Valley",
    "alcoholContent": "14%",
    "price": 40,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Ch%C3%A2teau%20Musar%20Red%20Ch%C3%A2teau%20Musar",
    "scores": [
      {
        "source": "Vivino",
        "score": 4.5,
        "maxScore": 5,
        "vintage": 2017
      },
      {
        "source": "James Suckling",
        "score": 85,
        "maxScore": 100,
        "vintage": 2017
      },
      {
        "source": "Robert Parker",
        "score": 87,
        "maxScore": 100,
        "vintage": 2017
      },
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2017
      },
      {
        "source": "Decanter",
        "score": 88,
        "maxScore": 100,
        "vintage": 2017
      }
    ],
    "aggregateScore": 88,
    "badges": [
      "Decanter World Wine Awards Gold",
      "Best Value"
    ],
    "tastingNotes": "Exotic aromatics of dried fruit, leather, spice, and earth. Medium-bodied with a unique, haunting character and extraordinary complexity for the price.",
    "editorial": "Château Musar is Lebanon's legendary estate, producing wine through decades of civil war. The unique blend and extended aging create a wine unlike anything else in the world — genuinely irreplaceable.",
    "pairings": [
      "Lebanese mezze",
      "Lamb kofta",
      "Aged cheeses",
      "Spiced dishes"
    ],
    "servingTemp": "16-18°C",
    "aging": "10-30 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "domaine-thymiopoulos-naoussa-xinomavro-2020",
    "name": "Naoussa Xinomavro",
    "producer": "Domaine Thymiopoulos",
    "vintage": 2020,
    "type": "Red",
    "grape": "Xinomavro",
    "grapes": [
      "Xinomavro"
    ],
    "region": "Naoussa",
    "subRegion": "Naoussa",
    "country": "Greece",
    "countryCode": "GR",
    "appellation": "Naoussa PDO",
    "alcoholContent": "13.5%",
    "price": 22,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Naoussa%20Xinomavro%20Domaine%20Thymiopoulos",
    "scores": [
      {
        "source": "James Suckling",
        "score": 87,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Robert Parker",
        "score": 84,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Wine Spectator",
        "score": 85,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Vivino",
        "score": 4.2,
        "maxScore": 5,
        "vintage": 2020
      },
      {
        "source": "Wine Enthusiast",
        "score": 87,
        "maxScore": 100,
        "vintage": 2020
      }
    ],
    "aggregateScore": 85,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Aromas of dried tomato, olive, red cherry, and earth. Medium-bodied with firm, Nebbiolo-like tannins and high acidity.",
    "editorial": "Xinomavro is Greece's noblest red grape, often compared to Nebbiolo. Thymiopoulos makes one of the most compelling expressions — traditional, age-worthy, and an incredible value.",
    "pairings": [
      "Moussaka",
      "Lamb souvlaki",
      "Feta",
      "Grilled vegetables"
    ],
    "servingTemp": "15-17°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Excellent quality for the category",
        "Well-balanced and complex",
        "Strong critical acclaim",
        "Aging potential"
      ],
      "cons": [
        "Premium pricing",
        "Limited availability in some markets"
      ]
    }
  },
  {
    "slug": "ch-teau-l-oville-las-cases-saint-julien-2021",
    "name": "Saint-Julien",
    "producer": "Château Léoville-Las Cases",
    "vintage": 2021,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon",
      "Merlot"
    ],
    "region": "Bordeaux",
    "subRegion": "Saint-Julien",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Saint-Julien AOC",
    "alcoholContent": "15%",
    "price": 192,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Saint-Julien%20Ch%C3%A2teau%20L%C3%A9oville-Las%20Cases",
    "scores": [
      {
        "source": "James Suckling",
        "score": 90,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Vivino",
        "score": 4.6,
        "maxScore": 5,
        "vintage": 2021
      },
      {
        "source": "Robert Parker",
        "score": 91,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Tim Atkin",
        "score": 90,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Wine Enthusiast",
        "score": 93,
        "maxScore": 100,
        "vintage": 2021
      }
    ],
    "aggregateScore": 91,
    "badges": [],
    "tastingNotes": "Complex aromas of blackberry, plum, and earth. Medium-to-full body with velvety texture.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "ch-teau-ducru-beaucaillou-saint-julien-2022",
    "name": "Saint-Julien",
    "producer": "Château Ducru-Beaucaillou",
    "vintage": 2022,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon",
      "Merlot"
    ],
    "region": "Bordeaux",
    "subRegion": "Saint-Julien",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Saint-Julien AOC",
    "alcoholContent": "15%",
    "price": 134,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Saint-Julien%20Ch%C3%A2teau%20Ducru-Beaucaillou",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 89,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Robert Parker",
        "score": 93,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Vivino",
        "score": 4.5,
        "maxScore": 5,
        "vintage": 2022
      },
      {
        "source": "Wine Enthusiast",
        "score": 89,
        "maxScore": 100,
        "vintage": 2022
      }
    ],
    "aggregateScore": 90,
    "badges": [],
    "tastingNotes": "Rich dark fruit, spice, and oak. Full-bodied with firm tannins and a long finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "ch-teau-montrose-saint-julien-2020",
    "name": "Saint-Julien",
    "producer": "Château Montrose",
    "vintage": 2020,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon",
      "Merlot"
    ],
    "region": "Bordeaux",
    "subRegion": "Saint-Julien",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Saint-Julien AOC",
    "alcoholContent": "13%",
    "price": 39,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Saint-Julien%20Ch%C3%A2teau%20Montrose",
    "scores": [
      {
        "source": "Vivino",
        "score": 4.5,
        "maxScore": 5,
        "vintage": 2020
      },
      {
        "source": "Wine Spectator",
        "score": 86,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Tim Atkin",
        "score": 88,
        "maxScore": 100,
        "vintage": 2020
      }
    ],
    "aggregateScore": 88,
    "badges": [],
    "tastingNotes": "Delicate raspberry, rose petal, and forest floor. Silky and refined with beautiful finesse.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "ch-teau-cos-d-estournel-saint-julien-2021",
    "name": "Saint-Julien",
    "producer": "Château Cos d'Estournel",
    "vintage": 2021,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon",
      "Merlot"
    ],
    "region": "Bordeaux",
    "subRegion": "Saint-Julien",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Saint-Julien AOC",
    "alcoholContent": "13%",
    "price": 158,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Saint-Julien%20Ch%C3%A2teau%20Cos%20d'Estournel",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 92,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Wine Enthusiast",
        "score": 89,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Jancis Robinson",
        "score": 19,
        "maxScore": 20,
        "vintage": 2021
      },
      {
        "source": "Tim Atkin",
        "score": 89,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Vivino",
        "score": 4.5,
        "maxScore": 5,
        "vintage": 2021
      },
      {
        "source": "Decanter",
        "score": 92,
        "maxScore": 100,
        "vintage": 2021
      }
    ],
    "aggregateScore": 91,
    "badges": [],
    "tastingNotes": "Delicate raspberry, rose petal, and forest floor. Silky and refined with beautiful finesse.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "ch-teau-calon-s-gur-saint-julien-2021",
    "name": "Saint-Julien",
    "producer": "Château Calon-Ségur",
    "vintage": 2021,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon",
      "Merlot"
    ],
    "region": "Bordeaux",
    "subRegion": "Saint-Julien",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Saint-Julien AOC",
    "alcoholContent": "14%",
    "price": 13,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Saint-Julien%20Ch%C3%A2teau%20Calon-S%C3%A9gur",
    "scores": [
      {
        "source": "Tim Atkin",
        "score": 83,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "James Suckling",
        "score": 86,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Vivino",
        "score": 4.2,
        "maxScore": 5,
        "vintage": 2021
      },
      {
        "source": "Robert Parker",
        "score": 86,
        "maxScore": 100,
        "vintage": 2021
      }
    ],
    "aggregateScore": 85,
    "badges": [],
    "tastingNotes": "Dense blackberry, smoked meat, and pepper. Concentrated and intense with great depth.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "ch-teau-pichon-longueville-saint-julien-2019",
    "name": "Saint-Julien",
    "producer": "Château Pichon-Longueville",
    "vintage": 2019,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon",
      "Merlot"
    ],
    "region": "Bordeaux",
    "subRegion": "Saint-Julien",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Saint-Julien AOC",
    "alcoholContent": "15%",
    "price": 12,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Saint-Julien%20Ch%C3%A2teau%20Pichon-Longueville",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 85,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2019
      },
      {
        "source": "Tim Atkin",
        "score": 86,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Wine Enthusiast",
        "score": 87,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Vivino",
        "score": 4.2,
        "maxScore": 5,
        "vintage": 2019
      }
    ],
    "aggregateScore": 85,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Lush plum, mocha, and toasted oak. Generous and warming with a long, sweet finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Wild game",
      "Mushroom dishes",
      "Aged Gouda"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "ch-teau-gruaud-larose-saint-julien-2019",
    "name": "Saint-Julien",
    "producer": "Château Gruaud-Larose",
    "vintage": 2019,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon",
      "Merlot"
    ],
    "region": "Bordeaux",
    "subRegion": "Saint-Julien",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Saint-Julien AOC",
    "alcoholContent": "15%",
    "price": 39,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Saint-Julien%20Ch%C3%A2teau%20Gruaud-Larose",
    "scores": [
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2019
      },
      {
        "source": "Wine Enthusiast",
        "score": 86,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Robert Parker",
        "score": 88,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "James Suckling",
        "score": 86,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Tim Atkin",
        "score": 88,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Wine Spectator",
        "score": 89,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 87,
    "badges": [],
    "tastingNotes": "Dense blackberry, smoked meat, and pepper. Concentrated and intense with great depth.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "ch-teau-talbot-saint-julien-2019",
    "name": "Saint-Julien",
    "producer": "Château Talbot",
    "vintage": 2019,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon",
      "Merlot"
    ],
    "region": "Bordeaux",
    "subRegion": "Saint-Julien",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Saint-Julien AOC",
    "alcoholContent": "14%",
    "price": 8,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Saint-Julien%20Ch%C3%A2teau%20Talbot",
    "scores": [
      {
        "source": "Tim Atkin",
        "score": 83,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Decanter",
        "score": 87,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Wine Spectator",
        "score": 85,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2019
      },
      {
        "source": "Wine Enthusiast",
        "score": 87,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "James Suckling",
        "score": 84,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 85,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Delicate raspberry, rose petal, and forest floor. Silky and refined with beautiful finesse.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Wild game",
      "Mushroom dishes",
      "Aged Gouda"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "ch-teau-beychevelle-saint-julien-2022",
    "name": "Saint-Julien",
    "producer": "Château Beychevelle",
    "vintage": 2022,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon",
      "Merlot"
    ],
    "region": "Bordeaux",
    "subRegion": "Saint-Julien",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Saint-Julien AOC",
    "alcoholContent": "15%",
    "price": 71,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Saint-Julien%20Ch%C3%A2teau%20Beychevelle",
    "scores": [
      {
        "source": "Wine Enthusiast",
        "score": 89,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "James Suckling",
        "score": 89,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Wine Spectator",
        "score": 88,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2022
      },
      {
        "source": "Decanter",
        "score": 89,
        "maxScore": 100,
        "vintage": 2022
      }
    ],
    "aggregateScore": 89,
    "badges": [],
    "tastingNotes": "Lush plum, mocha, and toasted oak. Generous and warming with a long, sweet finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "ch-teau-palmer-saint-julien-2019",
    "name": "Saint-Julien",
    "producer": "Château Palmer",
    "vintage": 2019,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon",
      "Merlot"
    ],
    "region": "Bordeaux",
    "subRegion": "Saint-Julien",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Saint-Julien AOC",
    "alcoholContent": "13%",
    "price": 9,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Saint-Julien%20Ch%C3%A2teau%20Palmer",
    "scores": [
      {
        "source": "Vivino",
        "score": 4.2,
        "maxScore": 5,
        "vintage": 2019
      },
      {
        "source": "Wine Spectator",
        "score": 83,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Tim Atkin",
        "score": 87,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Robert Parker",
        "score": 85,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 85,
    "badges": [],
    "tastingNotes": "Ripe cherry, tobacco, and leather. Elegant and structured with excellent aging potential.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Wild game",
      "Mushroom dishes",
      "Aged Gouda"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "ch-teau-branaire-ducru-saint-julien-2018",
    "name": "Saint-Julien",
    "producer": "Château Branaire-Ducru",
    "vintage": 2018,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon",
      "Merlot"
    ],
    "region": "Bordeaux",
    "subRegion": "Saint-Julien",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Saint-Julien AOC",
    "alcoholContent": "15%",
    "price": 22,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Saint-Julien%20Ch%C3%A2teau%20Branaire-Ducru",
    "scores": [
      {
        "source": "Decanter",
        "score": 83,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Robert Parker",
        "score": 84,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2018
      },
      {
        "source": "Wine Spectator",
        "score": 84,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Wine Enthusiast",
        "score": 84,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Tim Atkin",
        "score": 83,
        "maxScore": 100,
        "vintage": 2018
      }
    ],
    "aggregateScore": 84,
    "badges": [],
    "tastingNotes": "Vibrant red fruit, cedar, and vanilla. Smooth and approachable with a spicy finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Wild game",
      "Mushroom dishes",
      "Aged Gouda"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "ch-teau-saint-pierre-saint-julien-2020",
    "name": "Saint-Julien",
    "producer": "Château Saint-Pierre",
    "vintage": 2020,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon",
      "Merlot"
    ],
    "region": "Bordeaux",
    "subRegion": "Saint-Julien",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Saint-Julien AOC",
    "alcoholContent": "15%",
    "price": 12,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Saint-Julien%20Ch%C3%A2teau%20Saint-Pierre",
    "scores": [
      {
        "source": "James Suckling",
        "score": 87,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2020
      },
      {
        "source": "Vivino",
        "score": 4.4,
        "maxScore": 5,
        "vintage": 2020
      },
      {
        "source": "Decanter",
        "score": 84,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Robert Parker",
        "score": 86,
        "maxScore": 100,
        "vintage": 2020
      }
    ],
    "aggregateScore": 86,
    "badges": [],
    "tastingNotes": "Bold cassis, dark chocolate, and espresso. Powerful yet balanced with polished tannins.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "ch-teau-gloria-saint-julien-2018",
    "name": "Saint-Julien",
    "producer": "Château Gloria",
    "vintage": 2018,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon",
      "Merlot"
    ],
    "region": "Bordeaux",
    "subRegion": "Saint-Julien",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Saint-Julien AOC",
    "alcoholContent": "14%",
    "price": 9,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Saint-Julien%20Ch%C3%A2teau%20Gloria",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 85,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Tim Atkin",
        "score": 87,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Vivino",
        "score": 4.4,
        "maxScore": 5,
        "vintage": 2018
      },
      {
        "source": "Robert Parker",
        "score": 86,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "James Suckling",
        "score": 84,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Decanter",
        "score": 87,
        "maxScore": 100,
        "vintage": 2018
      }
    ],
    "aggregateScore": 86,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Lush plum, mocha, and toasted oak. Generous and warming with a long, sweet finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Wild game",
      "Mushroom dishes",
      "Aged Gouda"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "ch-teau-langoa-barton-saint-julien-2020",
    "name": "Saint-Julien",
    "producer": "Château Langoa Barton",
    "vintage": 2020,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon",
      "Merlot"
    ],
    "region": "Bordeaux",
    "subRegion": "Saint-Julien",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Saint-Julien AOC",
    "alcoholContent": "13%",
    "price": 9,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Saint-Julien%20Ch%C3%A2teau%20Langoa%20Barton",
    "scores": [
      {
        "source": "Tim Atkin",
        "score": 85,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Decanter",
        "score": 84,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "James Suckling",
        "score": 85,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Robert Parker",
        "score": 83,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Wine Enthusiast",
        "score": 84,
        "maxScore": 100,
        "vintage": 2020
      }
    ],
    "aggregateScore": 84,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Lush plum, mocha, and toasted oak. Generous and warming with a long, sweet finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Wild game",
      "Mushroom dishes",
      "Aged Gouda"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "ch-teau-l-oville-barton-saint-julien-2021",
    "name": "Saint-Julien",
    "producer": "Château Léoville-Barton",
    "vintage": 2021,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon",
      "Merlot"
    ],
    "region": "Bordeaux",
    "subRegion": "Saint-Julien",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Saint-Julien AOC",
    "alcoholContent": "14%",
    "price": 22,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Saint-Julien%20Ch%C3%A2teau%20L%C3%A9oville-Barton",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 86,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Decanter",
        "score": 84,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Vivino",
        "score": 4.2,
        "maxScore": 5,
        "vintage": 2021
      },
      {
        "source": "Robert Parker",
        "score": 83,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2021
      }
    ],
    "aggregateScore": 84,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Vibrant red fruit, cedar, and vanilla. Smooth and approachable with a spicy finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "ch-teau-l-oville-las-cases-graves-2020",
    "name": "Graves",
    "producer": "Château Léoville-Las Cases",
    "vintage": 2020,
    "type": "Red",
    "grape": "Merlot",
    "grapes": [
      "Merlot",
      "Cabernet Sauvignon"
    ],
    "region": "Bordeaux",
    "subRegion": "Graves",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Graves AOC",
    "alcoholContent": "15%",
    "price": 179,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Graves%20Ch%C3%A2teau%20L%C3%A9oville-Las%20Cases",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 93,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Tim Atkin",
        "score": 89,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Decanter",
        "score": 89,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "James Suckling",
        "score": 93,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Robert Parker",
        "score": 89,
        "maxScore": 100,
        "vintage": 2020
      }
    ],
    "aggregateScore": 91,
    "badges": [],
    "tastingNotes": "Rich dark fruit, spice, and oak. Full-bodied with firm tannins and a long finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Wild game",
      "Mushroom dishes",
      "Aged Gouda"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "ch-teau-ducru-beaucaillou-graves-2020",
    "name": "Graves",
    "producer": "Château Ducru-Beaucaillou",
    "vintage": 2020,
    "type": "Red",
    "grape": "Merlot",
    "grapes": [
      "Merlot",
      "Cabernet Sauvignon"
    ],
    "region": "Bordeaux",
    "subRegion": "Graves",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Graves AOC",
    "alcoholContent": "15%",
    "price": 13,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Graves%20Ch%C3%A2teau%20Ducru-Beaucaillou",
    "scores": [
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2020
      },
      {
        "source": "Robert Parker",
        "score": 84,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Wine Enthusiast",
        "score": 84,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Wine Spectator",
        "score": 86,
        "maxScore": 100,
        "vintage": 2020
      }
    ],
    "aggregateScore": 85,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Complex aromas of blackberry, plum, and earth. Medium-to-full body with velvety texture.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Wild game",
      "Mushroom dishes",
      "Aged Gouda"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "ch-teau-montrose-graves-2020",
    "name": "Graves",
    "producer": "Château Montrose",
    "vintage": 2020,
    "type": "Red",
    "grape": "Merlot",
    "grapes": [
      "Merlot",
      "Cabernet Sauvignon"
    ],
    "region": "Bordeaux",
    "subRegion": "Graves",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Graves AOC",
    "alcoholContent": "14%",
    "price": 193,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Graves%20Ch%C3%A2teau%20Montrose",
    "scores": [
      {
        "source": "Wine Enthusiast",
        "score": 89,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Vivino",
        "score": 4.6,
        "maxScore": 5,
        "vintage": 2020
      },
      {
        "source": "James Suckling",
        "score": 92,
        "maxScore": 100,
        "vintage": 2020
      }
    ],
    "aggregateScore": 91,
    "badges": [],
    "tastingNotes": "Dense blackberry, smoked meat, and pepper. Concentrated and intense with great depth.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "ch-teau-cos-d-estournel-graves-2021",
    "name": "Graves",
    "producer": "Château Cos d'Estournel",
    "vintage": 2021,
    "type": "Red",
    "grape": "Merlot",
    "grapes": [
      "Merlot",
      "Cabernet Sauvignon"
    ],
    "region": "Bordeaux",
    "subRegion": "Graves",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Graves AOC",
    "alcoholContent": "13%",
    "price": 162,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Graves%20Ch%C3%A2teau%20Cos%20d'Estournel",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 89,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Robert Parker",
        "score": 89,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Tim Atkin",
        "score": 91,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "James Suckling",
        "score": 92,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Decanter",
        "score": 90,
        "maxScore": 100,
        "vintage": 2021
      }
    ],
    "aggregateScore": 90,
    "badges": [],
    "tastingNotes": "Lush plum, mocha, and toasted oak. Generous and warming with a long, sweet finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "ch-teau-calon-s-gur-graves-2019",
    "name": "Graves",
    "producer": "Château Calon-Ségur",
    "vintage": 2019,
    "type": "Red",
    "grape": "Merlot",
    "grapes": [
      "Merlot",
      "Cabernet Sauvignon"
    ],
    "region": "Bordeaux",
    "subRegion": "Graves",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Graves AOC",
    "alcoholContent": "14%",
    "price": 110,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Graves%20Ch%C3%A2teau%20Calon-S%C3%A9gur",
    "scores": [
      {
        "source": "Robert Parker",
        "score": 89,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Vivino",
        "score": 4.6,
        "maxScore": 5,
        "vintage": 2019
      },
      {
        "source": "Wine Spectator",
        "score": 93,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 91,
    "badges": [],
    "tastingNotes": "Delicate raspberry, rose petal, and forest floor. Silky and refined with beautiful finesse.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "ch-teau-pichon-longueville-graves-2019",
    "name": "Graves",
    "producer": "Château Pichon-Longueville",
    "vintage": 2019,
    "type": "Red",
    "grape": "Merlot",
    "grapes": [
      "Merlot",
      "Cabernet Sauvignon"
    ],
    "region": "Bordeaux",
    "subRegion": "Graves",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Graves AOC",
    "alcoholContent": "13%",
    "price": 17,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Graves%20Ch%C3%A2teau%20Pichon-Longueville",
    "scores": [
      {
        "source": "Robert Parker",
        "score": 87,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Wine Enthusiast",
        "score": 87,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Decanter",
        "score": 86,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "James Suckling",
        "score": 87,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Vivino",
        "score": 4.2,
        "maxScore": 5,
        "vintage": 2019
      },
      {
        "source": "Wine Spectator",
        "score": 86,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 86,
    "badges": [],
    "tastingNotes": "Vibrant red fruit, cedar, and vanilla. Smooth and approachable with a spicy finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "ch-teau-gruaud-larose-graves-2019",
    "name": "Graves",
    "producer": "Château Gruaud-Larose",
    "vintage": 2019,
    "type": "Red",
    "grape": "Merlot",
    "grapes": [
      "Merlot",
      "Cabernet Sauvignon"
    ],
    "region": "Bordeaux",
    "subRegion": "Graves",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Graves AOC",
    "alcoholContent": "13%",
    "price": 13,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Graves%20Ch%C3%A2teau%20Gruaud-Larose",
    "scores": [
      {
        "source": "Wine Enthusiast",
        "score": 84,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Decanter",
        "score": 85,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Tim Atkin",
        "score": 87,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Vivino",
        "score": 4.3,
        "maxScore": 5,
        "vintage": 2019
      },
      {
        "source": "James Suckling",
        "score": 87,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Robert Parker",
        "score": 86,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 86,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Ripe cherry, tobacco, and leather. Elegant and structured with excellent aging potential.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "ch-teau-talbot-graves-2018",
    "name": "Graves",
    "producer": "Château Talbot",
    "vintage": 2018,
    "type": "Red",
    "grape": "Merlot",
    "grapes": [
      "Merlot",
      "Cabernet Sauvignon"
    ],
    "region": "Bordeaux",
    "subRegion": "Graves",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Graves AOC",
    "alcoholContent": "13%",
    "price": 22,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Graves%20Ch%C3%A2teau%20Talbot",
    "scores": [
      {
        "source": "Tim Atkin",
        "score": 85,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Vivino",
        "score": 4.2,
        "maxScore": 5,
        "vintage": 2018
      },
      {
        "source": "Wine Enthusiast",
        "score": 85,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Decanter",
        "score": 87,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "James Suckling",
        "score": 84,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2018
      }
    ],
    "aggregateScore": 85,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Lush plum, mocha, and toasted oak. Generous and warming with a long, sweet finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "ch-teau-beychevelle-graves-2020",
    "name": "Graves",
    "producer": "Château Beychevelle",
    "vintage": 2020,
    "type": "Red",
    "grape": "Merlot",
    "grapes": [
      "Merlot",
      "Cabernet Sauvignon"
    ],
    "region": "Bordeaux",
    "subRegion": "Graves",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Graves AOC",
    "alcoholContent": "14%",
    "price": 41,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Graves%20Ch%C3%A2teau%20Beychevelle",
    "scores": [
      {
        "source": "Vivino",
        "score": 4.3,
        "maxScore": 5,
        "vintage": 2020
      },
      {
        "source": "Tim Atkin",
        "score": 86,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2020
      },
      {
        "source": "Wine Enthusiast",
        "score": 87,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "James Suckling",
        "score": 89,
        "maxScore": 100,
        "vintage": 2020
      }
    ],
    "aggregateScore": 87,
    "badges": [],
    "tastingNotes": "Ripe cherry, tobacco, and leather. Elegant and structured with excellent aging potential.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "ch-teau-palmer-graves-2019",
    "name": "Graves",
    "producer": "Château Palmer",
    "vintage": 2019,
    "type": "Red",
    "grape": "Merlot",
    "grapes": [
      "Merlot",
      "Cabernet Sauvignon"
    ],
    "region": "Bordeaux",
    "subRegion": "Graves",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Graves AOC",
    "alcoholContent": "15%",
    "price": 13,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Graves%20Ch%C3%A2teau%20Palmer",
    "scores": [
      {
        "source": "Vivino",
        "score": 4.2,
        "maxScore": 5,
        "vintage": 2019
      },
      {
        "source": "Wine Spectator",
        "score": 85,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Decanter",
        "score": 84,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Tim Atkin",
        "score": 83,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Wine Enthusiast",
        "score": 86,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 84,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Rich dark fruit, spice, and oak. Full-bodied with firm tannins and a long finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Wild game",
      "Mushroom dishes",
      "Aged Gouda"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "ch-teau-branaire-ducru-graves-2019",
    "name": "Graves",
    "producer": "Château Branaire-Ducru",
    "vintage": 2019,
    "type": "Red",
    "grape": "Merlot",
    "grapes": [
      "Merlot",
      "Cabernet Sauvignon"
    ],
    "region": "Bordeaux",
    "subRegion": "Graves",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Graves AOC",
    "alcoholContent": "14%",
    "price": 188,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Graves%20Ch%C3%A2teau%20Branaire-Ducru",
    "scores": [
      {
        "source": "Wine Enthusiast",
        "score": 91,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "James Suckling",
        "score": 92,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Vivino",
        "score": 4.5,
        "maxScore": 5,
        "vintage": 2019
      },
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2019
      }
    ],
    "aggregateScore": 91,
    "badges": [],
    "tastingNotes": "Rich dark fruit, spice, and oak. Full-bodied with firm tannins and a long finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "ch-teau-saint-pierre-graves-2022",
    "name": "Graves",
    "producer": "Château Saint-Pierre",
    "vintage": 2022,
    "type": "Red",
    "grape": "Merlot",
    "grapes": [
      "Merlot",
      "Cabernet Sauvignon"
    ],
    "region": "Bordeaux",
    "subRegion": "Graves",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Graves AOC",
    "alcoholContent": "15%",
    "price": 73,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Graves%20Ch%C3%A2teau%20Saint-Pierre",
    "scores": [
      {
        "source": "Robert Parker",
        "score": 91,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2022
      },
      {
        "source": "Wine Enthusiast",
        "score": 89,
        "maxScore": 100,
        "vintage": 2022
      }
    ],
    "aggregateScore": 90,
    "badges": [],
    "tastingNotes": "Complex aromas of blackberry, plum, and earth. Medium-to-full body with velvety texture.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "ch-teau-gloria-graves-2019",
    "name": "Graves",
    "producer": "Château Gloria",
    "vintage": 2019,
    "type": "Red",
    "grape": "Merlot",
    "grapes": [
      "Merlot",
      "Cabernet Sauvignon"
    ],
    "region": "Bordeaux",
    "subRegion": "Graves",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Graves AOC",
    "alcoholContent": "15%",
    "price": 54,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Graves%20Ch%C3%A2teau%20Gloria",
    "scores": [
      {
        "source": "Vivino",
        "score": 4.4,
        "maxScore": 5,
        "vintage": 2019
      },
      {
        "source": "Tim Atkin",
        "score": 91,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Wine Enthusiast",
        "score": 89,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 89,
    "badges": [],
    "tastingNotes": "Vibrant red fruit, cedar, and vanilla. Smooth and approachable with a spicy finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Wild game",
      "Mushroom dishes",
      "Aged Gouda"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "ch-teau-langoa-barton-graves-2018",
    "name": "Graves",
    "producer": "Château Langoa Barton",
    "vintage": 2018,
    "type": "Red",
    "grape": "Merlot",
    "grapes": [
      "Merlot",
      "Cabernet Sauvignon"
    ],
    "region": "Bordeaux",
    "subRegion": "Graves",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Graves AOC",
    "alcoholContent": "14%",
    "price": 168,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Graves%20Ch%C3%A2teau%20Langoa%20Barton",
    "scores": [
      {
        "source": "Wine Enthusiast",
        "score": 92,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Vivino",
        "score": 4.6,
        "maxScore": 5,
        "vintage": 2018
      },
      {
        "source": "Robert Parker",
        "score": 89,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Wine Spectator",
        "score": 89,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Tim Atkin",
        "score": 93,
        "maxScore": 100,
        "vintage": 2018
      }
    ],
    "aggregateScore": 91,
    "badges": [],
    "tastingNotes": "Dense blackberry, smoked meat, and pepper. Concentrated and intense with great depth.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "ch-teau-l-oville-barton-graves-2020",
    "name": "Graves",
    "producer": "Château Léoville-Barton",
    "vintage": 2020,
    "type": "Red",
    "grape": "Merlot",
    "grapes": [
      "Merlot",
      "Cabernet Sauvignon"
    ],
    "region": "Bordeaux",
    "subRegion": "Graves",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Graves AOC",
    "alcoholContent": "13%",
    "price": 68,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Graves%20Ch%C3%A2teau%20L%C3%A9oville-Barton",
    "scores": [
      {
        "source": "Robert Parker",
        "score": 87,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Decanter",
        "score": 89,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Vivino",
        "score": 4.5,
        "maxScore": 5,
        "vintage": 2020
      },
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2020
      },
      {
        "source": "James Suckling",
        "score": 91,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Wine Spectator",
        "score": 89,
        "maxScore": 100,
        "vintage": 2020
      }
    ],
    "aggregateScore": 89,
    "badges": [],
    "tastingNotes": "Bold cassis, dark chocolate, and espresso. Powerful yet balanced with polished tannins.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Wild game",
      "Mushroom dishes",
      "Aged Gouda"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "domaine-leflaive-chardonnay-2018",
    "name": "Chardonnay",
    "producer": "Domaine Leflaive",
    "vintage": 2018,
    "type": "White",
    "grape": "Chardonnay",
    "grapes": [
      "Chardonnay"
    ],
    "region": "Burgundy",
    "subRegion": "Côte de Beaune",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Puligny-Montrachet AOC",
    "alcoholContent": "13%",
    "price": 20,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Chardonnay%20Domaine%20Leflaive",
    "scores": [
      {
        "source": "James Suckling",
        "score": 85,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2018
      },
      {
        "source": "Wine Enthusiast",
        "score": 85,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Vivino",
        "score": 4.3,
        "maxScore": 5,
        "vintage": 2018
      }
    ],
    "aggregateScore": 85,
    "badges": [],
    "tastingNotes": "Elegant peach, white flower, and flinty minerality. Balanced and precise with great length.",
    "editorial": "A beautifully crafted white wine that showcases the producer's commitment to quality. The balance between fruit expression and mineral complexity speaks to thoughtful winemaking, while the acidity backbone ensures freshness and food-friendliness. This is the kind of wine that converts casual drinkers into enthusiasts.",
    "pairings": [
      "Salads",
      "Light appetizers",
      "Soft cheeses"
    ],
    "servingTemp": "8-12°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "domaine-roulot-chardonnay-2019",
    "name": "Chardonnay",
    "producer": "Domaine Roulot",
    "vintage": 2019,
    "type": "White",
    "grape": "Chardonnay",
    "grapes": [
      "Chardonnay"
    ],
    "region": "Burgundy",
    "subRegion": "Côte de Beaune",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Puligny-Montrachet AOC",
    "alcoholContent": "15%",
    "price": 23,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Chardonnay%20Domaine%20Roulot",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 86,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Tim Atkin",
        "score": 86,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Robert Parker",
        "score": 87,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Wine Enthusiast",
        "score": 85,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "James Suckling",
        "score": 86,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 86,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Tropical mango, pineapple, and vanilla. Round and generous with a creamy palate.",
    "editorial": "A beautifully crafted white wine that showcases the producer's commitment to quality. The balance between fruit expression and mineral complexity speaks to thoughtful winemaking, while the acidity backbone ensures freshness and food-friendliness. This is the kind of wine that converts casual drinkers into enthusiasts.",
    "pairings": [
      "Roast chicken",
      "Pasta with cream sauce",
      "Sushi"
    ],
    "servingTemp": "8-12°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "domaine-ramonet-chardonnay-2019",
    "name": "Chardonnay",
    "producer": "Domaine Ramonet",
    "vintage": 2019,
    "type": "White",
    "grape": "Chardonnay",
    "grapes": [
      "Chardonnay"
    ],
    "region": "Burgundy",
    "subRegion": "Côte de Beaune",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Puligny-Montrachet AOC",
    "alcoholContent": "15%",
    "price": 10,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Chardonnay%20Domaine%20Ramonet",
    "scores": [
      {
        "source": "Vivino",
        "score": 4.2,
        "maxScore": 5,
        "vintage": 2019
      },
      {
        "source": "Wine Enthusiast",
        "score": 83,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Tim Atkin",
        "score": 86,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Decanter",
        "score": 84,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 84,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Crisp citrus, green apple, and mineral notes. Clean and refreshing with bright acidity.",
    "editorial": "A beautifully crafted white wine that showcases the producer's commitment to quality. The balance between fruit expression and mineral complexity speaks to thoughtful winemaking, while the acidity backbone ensures freshness and food-friendliness. This is the kind of wine that converts casual drinkers into enthusiasts.",
    "pairings": [
      "Salads",
      "Light appetizers",
      "Soft cheeses"
    ],
    "servingTemp": "8-12°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "olivier-leflaive-chardonnay-2019",
    "name": "Chardonnay",
    "producer": "Olivier Leflaive",
    "vintage": 2019,
    "type": "White",
    "grape": "Chardonnay",
    "grapes": [
      "Chardonnay"
    ],
    "region": "Burgundy",
    "subRegion": "Côte de Beaune",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Puligny-Montrachet AOC",
    "alcoholContent": "15%",
    "price": 109,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Chardonnay%20Olivier%20Leflaive",
    "scores": [
      {
        "source": "Tim Atkin",
        "score": 91,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Decanter",
        "score": 90,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Vivino",
        "score": 4.6,
        "maxScore": 5,
        "vintage": 2019
      },
      {
        "source": "Wine Spectator",
        "score": 92,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2019
      },
      {
        "source": "Robert Parker",
        "score": 90,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 91,
    "badges": [],
    "tastingNotes": "Steely and precise with notes of green apple, chalk, and lemon zest. Electric acidity.",
    "editorial": "A beautifully crafted white wine that showcases the producer's commitment to quality. The balance between fruit expression and mineral complexity speaks to thoughtful winemaking, while the acidity backbone ensures freshness and food-friendliness. This is the kind of wine that converts casual drinkers into enthusiasts.",
    "pairings": [
      "Grilled fish",
      "Shellfish",
      "Goat cheese"
    ],
    "servingTemp": "8-12°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "louis-jadot-chardonnay-2021",
    "name": "Chardonnay",
    "producer": "Louis Jadot",
    "vintage": 2021,
    "type": "White",
    "grape": "Chardonnay",
    "grapes": [
      "Chardonnay"
    ],
    "region": "Burgundy",
    "subRegion": "Côte de Beaune",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Puligny-Montrachet AOC",
    "alcoholContent": "15%",
    "price": 21,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Chardonnay%20Louis%20Jadot",
    "scores": [
      {
        "source": "Robert Parker",
        "score": 85,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Decanter",
        "score": 83,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Wine Spectator",
        "score": 85,
        "maxScore": 100,
        "vintage": 2021
      }
    ],
    "aggregateScore": 84,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Rich stone fruit, honey, and toasted almond. Full-bodied with buttery texture and long finish.",
    "editorial": "A beautifully crafted white wine that showcases the producer's commitment to quality. The balance between fruit expression and mineral complexity speaks to thoughtful winemaking, while the acidity backbone ensures freshness and food-friendliness. This is the kind of wine that converts casual drinkers into enthusiasts.",
    "pairings": [
      "Salads",
      "Light appetizers",
      "Soft cheeses"
    ],
    "servingTemp": "8-12°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "joseph-drouhin-chardonnay-2018",
    "name": "Chardonnay",
    "producer": "Joseph Drouhin",
    "vintage": 2018,
    "type": "White",
    "grape": "Chardonnay",
    "grapes": [
      "Chardonnay"
    ],
    "region": "Burgundy",
    "subRegion": "Côte de Beaune",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Puligny-Montrachet AOC",
    "alcoholContent": "13%",
    "price": 23,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Chardonnay%20Joseph%20Drouhin",
    "scores": [
      {
        "source": "Wine Enthusiast",
        "score": 87,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Robert Parker",
        "score": 85,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "James Suckling",
        "score": 86,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Wine Spectator",
        "score": 87,
        "maxScore": 100,
        "vintage": 2018
      }
    ],
    "aggregateScore": 86,
    "badges": [],
    "tastingNotes": "Crisp citrus, green apple, and mineral notes. Clean and refreshing with bright acidity.",
    "editorial": "A beautifully crafted white wine that showcases the producer's commitment to quality. The balance between fruit expression and mineral complexity speaks to thoughtful winemaking, while the acidity backbone ensures freshness and food-friendliness. This is the kind of wine that converts casual drinkers into enthusiasts.",
    "pairings": [
      "Grilled fish",
      "Shellfish",
      "Goat cheese"
    ],
    "servingTemp": "8-12°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "domaine-tienne-sauzet-chardonnay-2018",
    "name": "Chardonnay",
    "producer": "Domaine Étienne Sauzet",
    "vintage": 2018,
    "type": "White",
    "grape": "Chardonnay",
    "grapes": [
      "Chardonnay"
    ],
    "region": "Burgundy",
    "subRegion": "Côte de Beaune",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Puligny-Montrachet AOC",
    "alcoholContent": "15%",
    "price": 65,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Chardonnay%20Domaine%20%C3%89tienne%20Sauzet",
    "scores": [
      {
        "source": "Robert Parker",
        "score": 87,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Tim Atkin",
        "score": 91,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "James Suckling",
        "score": 87,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Decanter",
        "score": 87,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2018
      },
      {
        "source": "Wine Enthusiast",
        "score": 91,
        "maxScore": 100,
        "vintage": 2018
      }
    ],
    "aggregateScore": 89,
    "badges": [],
    "tastingNotes": "Elegant peach, white flower, and flinty minerality. Balanced and precise with great length.",
    "editorial": "A beautifully crafted white wine that showcases the producer's commitment to quality. The balance between fruit expression and mineral complexity speaks to thoughtful winemaking, while the acidity backbone ensures freshness and food-friendliness. This is the kind of wine that converts casual drinkers into enthusiasts.",
    "pairings": [
      "Roast chicken",
      "Pasta with cream sauce",
      "Sushi"
    ],
    "servingTemp": "8-12°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "g-rard-bertrand-languedoc-2021",
    "name": "Languedoc",
    "producer": "Gérard Bertrand",
    "vintage": 2021,
    "type": "Red",
    "grape": "Grenache",
    "grapes": [
      "Grenache",
      "Syrah",
      "Mourvèdre"
    ],
    "region": "Languedoc-Roussillon",
    "subRegion": "Languedoc",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Languedoc AOC",
    "alcoholContent": "13%",
    "price": 26,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Languedoc%20G%C3%A9rard%20Bertrand",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 86,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Decanter",
        "score": 88,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Robert Parker",
        "score": 88,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Wine Enthusiast",
        "score": 89,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "James Suckling",
        "score": 86,
        "maxScore": 100,
        "vintage": 2021
      }
    ],
    "aggregateScore": 87,
    "badges": [],
    "tastingNotes": "Dense blackberry, smoked meat, and pepper. Concentrated and intense with great depth.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "domaine-de-la-grange-des-p-res-languedoc-2020",
    "name": "Languedoc",
    "producer": "Domaine de la Grange des Pères",
    "vintage": 2020,
    "type": "Red",
    "grape": "Grenache",
    "grapes": [
      "Grenache",
      "Syrah",
      "Mourvèdre"
    ],
    "region": "Languedoc-Roussillon",
    "subRegion": "Languedoc",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Languedoc AOC",
    "alcoholContent": "13%",
    "price": 51,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Languedoc%20Domaine%20de%20la%20Grange%20des%20P%C3%A8res",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 87,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2020
      },
      {
        "source": "Tim Atkin",
        "score": 87,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Robert Parker",
        "score": 90,
        "maxScore": 100,
        "vintage": 2020
      }
    ],
    "aggregateScore": 87,
    "badges": [],
    "tastingNotes": "Rich dark fruit, spice, and oak. Full-bodied with firm tannins and a long finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "mas-de-daumas-gassac-languedoc-2019",
    "name": "Languedoc",
    "producer": "Mas de Daumas Gassac",
    "vintage": 2019,
    "type": "Red",
    "grape": "Grenache",
    "grapes": [
      "Grenache",
      "Syrah",
      "Mourvèdre"
    ],
    "region": "Languedoc-Roussillon",
    "subRegion": "Languedoc",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Languedoc AOC",
    "alcoholContent": "13%",
    "price": 152,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Languedoc%20Mas%20de%20Daumas%20Gassac",
    "scores": [
      {
        "source": "Robert Parker",
        "score": 91,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "James Suckling",
        "score": 90,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Decanter",
        "score": 90,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Wine Enthusiast",
        "score": 92,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Wine Spectator",
        "score": 90,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 91,
    "badges": [],
    "tastingNotes": "Lush plum, mocha, and toasted oak. Generous and warming with a long, sweet finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Wild game",
      "Mushroom dishes",
      "Aged Gouda"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "ch-teau-de-la-n-gly-languedoc-2020",
    "name": "Languedoc",
    "producer": "Château de la Négly",
    "vintage": 2020,
    "type": "Red",
    "grape": "Grenache",
    "grapes": [
      "Grenache",
      "Syrah",
      "Mourvèdre"
    ],
    "region": "Languedoc-Roussillon",
    "subRegion": "Languedoc",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Languedoc AOC",
    "alcoholContent": "15%",
    "price": 12,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Languedoc%20Ch%C3%A2teau%20de%20la%20N%C3%A9gly",
    "scores": [
      {
        "source": "Tim Atkin",
        "score": 87,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Wine Spectator",
        "score": 86,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Vivino",
        "score": 4.2,
        "maxScore": 5,
        "vintage": 2020
      },
      {
        "source": "Decanter",
        "score": 87,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Robert Parker",
        "score": 83,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2020
      }
    ],
    "aggregateScore": 85,
    "badges": [],
    "tastingNotes": "Rich dark fruit, spice, and oak. Full-bodied with firm tannins and a long finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "domaines-ott-c-tes-de-provence-2020",
    "name": "Côtes de Provence",
    "producer": "Domaines Ott",
    "vintage": 2020,
    "type": "Rosé",
    "grape": "Grenache",
    "grapes": [
      "Grenache",
      "Cinsault",
      "Syrah"
    ],
    "region": "Provence",
    "subRegion": "Provence",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Côtes de Provence AOC",
    "alcoholContent": "13%",
    "price": 9,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=C%C3%B4tes%20de%20Provence%20Domaines%20Ott",
    "scores": [
      {
        "source": "Vivino",
        "score": 4.4,
        "maxScore": 5,
        "vintage": 2020
      },
      {
        "source": "Tim Atkin",
        "score": 86,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2020
      },
      {
        "source": "James Suckling",
        "score": 83,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Robert Parker",
        "score": 87,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Wine Enthusiast",
        "score": 87,
        "maxScore": 100,
        "vintage": 2020
      }
    ],
    "aggregateScore": 86,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Salmon pink with notes of red berries, grapefruit, and garrigue. Bone-dry with great freshness.",
    "editorial": "This rosé demonstrates that the category has evolved far beyond simple summer sippers. With careful fruit selection and precise winemaking, this producer delivers a wine of genuine complexity and elegance. Perfect for warm-weather dining but sophisticated enough for year-round enjoyment.",
    "pairings": [
      "Grilled seafood",
      "Mediterranean dishes",
      "Light salads"
    ],
    "servingTemp": "8-10°C",
    "aging": "1-3 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "ch-teau-d-esclans-whispering-angel-c-tes-de-provence-2018",
    "name": "Côtes de Provence",
    "producer": "Château d'Esclans Whispering Angel",
    "vintage": 2018,
    "type": "Rosé",
    "grape": "Grenache",
    "grapes": [
      "Grenache",
      "Cinsault",
      "Syrah"
    ],
    "region": "Provence",
    "subRegion": "Provence",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Côtes de Provence AOC",
    "alcoholContent": "15%",
    "price": 151,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=C%C3%B4tes%20de%20Provence%20Ch%C3%A2teau%20d'Esclans%20Whispering%20Angel",
    "scores": [
      {
        "source": "Vivino",
        "score": 4.5,
        "maxScore": 5,
        "vintage": 2018
      },
      {
        "source": "James Suckling",
        "score": 89,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Robert Parker",
        "score": 90,
        "maxScore": 100,
        "vintage": 2018
      }
    ],
    "aggregateScore": 90,
    "badges": [],
    "tastingNotes": "Pale salmon color with aromas of wild strawberry, citrus, and Provençal herbs. Dry and refreshing.",
    "editorial": "This rosé demonstrates that the category has evolved far beyond simple summer sippers. With careful fruit selection and precise winemaking, this producer delivers a wine of genuine complexity and elegance. Perfect for warm-weather dining but sophisticated enough for year-round enjoyment.",
    "pairings": [
      "Charcuterie",
      "Sushi",
      "Summer vegetables"
    ],
    "servingTemp": "8-10°C",
    "aging": "1-3 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "miraval-c-tes-de-provence-2022",
    "name": "Côtes de Provence",
    "producer": "Miraval",
    "vintage": 2022,
    "type": "Rosé",
    "grape": "Grenache",
    "grapes": [
      "Grenache",
      "Cinsault",
      "Syrah"
    ],
    "region": "Provence",
    "subRegion": "Provence",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Côtes de Provence AOC",
    "alcoholContent": "14%",
    "price": 17,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=C%C3%B4tes%20de%20Provence%20Miraval",
    "scores": [
      {
        "source": "Wine Enthusiast",
        "score": 83,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Decanter",
        "score": 84,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2022
      },
      {
        "source": "James Suckling",
        "score": 86,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Robert Parker",
        "score": 83,
        "maxScore": 100,
        "vintage": 2022
      }
    ],
    "aggregateScore": 84,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Pale salmon color with aromas of wild strawberry, citrus, and Provençal herbs. Dry and refreshing.",
    "editorial": "This rosé demonstrates that the category has evolved far beyond simple summer sippers. With careful fruit selection and precise winemaking, this producer delivers a wine of genuine complexity and elegance. Perfect for warm-weather dining but sophisticated enough for year-round enjoyment.",
    "pairings": [
      "Grilled seafood",
      "Mediterranean dishes",
      "Light salads"
    ],
    "servingTemp": "8-10°C",
    "aging": "1-3 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "ch-teau-minuty-c-tes-de-provence-2022",
    "name": "Côtes de Provence",
    "producer": "Château Minuty",
    "vintage": 2022,
    "type": "Rosé",
    "grape": "Grenache",
    "grapes": [
      "Grenache",
      "Cinsault",
      "Syrah"
    ],
    "region": "Provence",
    "subRegion": "Provence",
    "country": "France",
    "countryCode": "FR",
    "appellation": "Côtes de Provence AOC",
    "alcoholContent": "14%",
    "price": 22,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=C%C3%B4tes%20de%20Provence%20Ch%C3%A2teau%20Minuty",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 84,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Decanter",
        "score": 85,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Robert Parker",
        "score": 86,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Tim Atkin",
        "score": 86,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "James Suckling",
        "score": 85,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Wine Enthusiast",
        "score": 84,
        "maxScore": 100,
        "vintage": 2022
      }
    ],
    "aggregateScore": 85,
    "badges": [],
    "tastingNotes": "Pale salmon color with aromas of wild strawberry, citrus, and Provençal herbs. Dry and refreshing.",
    "editorial": "This rosé demonstrates that the category has evolved far beyond simple summer sippers. With careful fruit selection and precise winemaking, this producer delivers a wine of genuine complexity and elegance. Perfect for warm-weather dining but sophisticated enough for year-round enjoyment.",
    "pairings": [
      "Grilled seafood",
      "Mediterranean dishes",
      "Light salads"
    ],
    "servingTemp": "8-10°C",
    "aging": "1-3 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "vietti-barolo-2021",
    "name": "Barolo",
    "producer": "Vietti",
    "vintage": 2021,
    "type": "Red",
    "grape": "Nebbiolo",
    "grapes": [
      "Nebbiolo"
    ],
    "region": "Piedmont",
    "subRegion": "Barolo",
    "country": "Italy",
    "countryCode": "IT",
    "appellation": "Barolo DOCG",
    "alcoholContent": "15%",
    "price": 10,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Barolo%20Vietti",
    "scores": [
      {
        "source": "James Suckling",
        "score": 87,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Vivino",
        "score": 4.3,
        "maxScore": 5,
        "vintage": 2021
      },
      {
        "source": "Decanter",
        "score": 83,
        "maxScore": 100,
        "vintage": 2021
      }
    ],
    "aggregateScore": 85,
    "badges": [],
    "tastingNotes": "Dense blackberry, smoked meat, and pepper. Concentrated and intense with great depth.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "bartolo-mascarello-barolo-2021",
    "name": "Barolo",
    "producer": "Bartolo Mascarello",
    "vintage": 2021,
    "type": "Red",
    "grape": "Nebbiolo",
    "grapes": [
      "Nebbiolo"
    ],
    "region": "Piedmont",
    "subRegion": "Barolo",
    "country": "Italy",
    "countryCode": "IT",
    "appellation": "Barolo DOCG",
    "alcoholContent": "13%",
    "price": 9,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Barolo%20Bartolo%20Mascarello",
    "scores": [
      {
        "source": "Robert Parker",
        "score": 84,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Decanter",
        "score": 84,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Wine Spectator",
        "score": 85,
        "maxScore": 100,
        "vintage": 2021
      }
    ],
    "aggregateScore": 84,
    "badges": [],
    "tastingNotes": "Ripe cherry, tobacco, and leather. Elegant and structured with excellent aging potential.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "bruno-giacosa-barolo-2018",
    "name": "Barolo",
    "producer": "Bruno Giacosa",
    "vintage": 2018,
    "type": "Red",
    "grape": "Nebbiolo",
    "grapes": [
      "Nebbiolo"
    ],
    "region": "Piedmont",
    "subRegion": "Barolo",
    "country": "Italy",
    "countryCode": "IT",
    "appellation": "Barolo DOCG",
    "alcoholContent": "13%",
    "price": 44,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Barolo%20Bruno%20Giacosa",
    "scores": [
      {
        "source": "James Suckling",
        "score": 89,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Wine Spectator",
        "score": 89,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Vivino",
        "score": 4.3,
        "maxScore": 5,
        "vintage": 2018
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2018
      },
      {
        "source": "Tim Atkin",
        "score": 85,
        "maxScore": 100,
        "vintage": 2018
      }
    ],
    "aggregateScore": 87,
    "badges": [],
    "tastingNotes": "Vibrant red fruit, cedar, and vanilla. Smooth and approachable with a spicy finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "marchesi-di-barolo-barolo-2021",
    "name": "Barolo",
    "producer": "Marchesi di Barolo",
    "vintage": 2021,
    "type": "Red",
    "grape": "Nebbiolo",
    "grapes": [
      "Nebbiolo"
    ],
    "region": "Piedmont",
    "subRegion": "Barolo",
    "country": "Italy",
    "countryCode": "IT",
    "appellation": "Barolo DOCG",
    "alcoholContent": "14%",
    "price": 93,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Barolo%20Marchesi%20di%20Barolo",
    "scores": [
      {
        "source": "Wine Enthusiast",
        "score": 88,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Tim Atkin",
        "score": 87,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Decanter",
        "score": 91,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2021
      },
      {
        "source": "James Suckling",
        "score": 90,
        "maxScore": 100,
        "vintage": 2021
      }
    ],
    "aggregateScore": 89,
    "badges": [],
    "tastingNotes": "Lush plum, mocha, and toasted oak. Generous and warming with a long, sweet finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "ceretto-barolo-2020",
    "name": "Barolo",
    "producer": "Ceretto",
    "vintage": 2020,
    "type": "Red",
    "grape": "Nebbiolo",
    "grapes": [
      "Nebbiolo"
    ],
    "region": "Piedmont",
    "subRegion": "Barolo",
    "country": "Italy",
    "countryCode": "IT",
    "appellation": "Barolo DOCG",
    "alcoholContent": "14%",
    "price": 126,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Barolo%20Ceretto",
    "scores": [
      {
        "source": "Wine Enthusiast",
        "score": 92,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "James Suckling",
        "score": 93,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2020
      },
      {
        "source": "Wine Spectator",
        "score": 89,
        "maxScore": 100,
        "vintage": 2020
      }
    ],
    "aggregateScore": 91,
    "badges": [],
    "tastingNotes": "Complex aromas of blackberry, plum, and earth. Medium-to-full body with velvety texture.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "elio-grasso-barolo-2019",
    "name": "Barolo",
    "producer": "Elio Grasso",
    "vintage": 2019,
    "type": "Red",
    "grape": "Nebbiolo",
    "grapes": [
      "Nebbiolo"
    ],
    "region": "Piedmont",
    "subRegion": "Barolo",
    "country": "Italy",
    "countryCode": "IT",
    "appellation": "Barolo DOCG",
    "alcoholContent": "15%",
    "price": 82,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Barolo%20Elio%20Grasso",
    "scores": [
      {
        "source": "Tim Atkin",
        "score": 90,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Wine Enthusiast",
        "score": 88,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2019
      },
      {
        "source": "Robert Parker",
        "score": 89,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "James Suckling",
        "score": 90,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Decanter",
        "score": 91,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 89,
    "badges": [],
    "tastingNotes": "Delicate raspberry, rose petal, and forest floor. Silky and refined with beautiful finesse.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Wild game",
      "Mushroom dishes",
      "Aged Gouda"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "castello-di-ama-chianti-classico-2019",
    "name": "Chianti Classico",
    "producer": "Castello di Ama",
    "vintage": 2019,
    "type": "Red",
    "grape": "Sangiovese",
    "grapes": [
      "Sangiovese"
    ],
    "region": "Tuscany",
    "subRegion": "Chianti Classico",
    "country": "Italy",
    "countryCode": "IT",
    "appellation": "Chianti Classico DOCG",
    "alcoholContent": "14%",
    "price": 24,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Chianti%20Classico%20Castello%20di%20Ama",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 84,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Decanter",
        "score": 87,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Robert Parker",
        "score": 86,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Vivino",
        "score": 4.3,
        "maxScore": 5,
        "vintage": 2019
      },
      {
        "source": "Wine Enthusiast",
        "score": 84,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 85,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Ripe cherry, tobacco, and leather. Elegant and structured with excellent aging potential.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "fontodi-chianti-classico-2019",
    "name": "Chianti Classico",
    "producer": "Fontodi",
    "vintage": 2019,
    "type": "Red",
    "grape": "Sangiovese",
    "grapes": [
      "Sangiovese"
    ],
    "region": "Tuscany",
    "subRegion": "Chianti Classico",
    "country": "Italy",
    "countryCode": "IT",
    "appellation": "Chianti Classico DOCG",
    "alcoholContent": "15%",
    "price": 78,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Chianti%20Classico%20Fontodi",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 88,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Robert Parker",
        "score": 87,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Tim Atkin",
        "score": 88,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "James Suckling",
        "score": 90,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Wine Enthusiast",
        "score": 88,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 88,
    "badges": [],
    "tastingNotes": "Vibrant red fruit, cedar, and vanilla. Smooth and approachable with a spicy finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "isole-e-olena-chianti-classico-2018",
    "name": "Chianti Classico",
    "producer": "Isole e Olena",
    "vintage": 2018,
    "type": "Red",
    "grape": "Sangiovese",
    "grapes": [
      "Sangiovese"
    ],
    "region": "Tuscany",
    "subRegion": "Chianti Classico",
    "country": "Italy",
    "countryCode": "IT",
    "appellation": "Chianti Classico DOCG",
    "alcoholContent": "14%",
    "price": 12,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Chianti%20Classico%20Isole%20e%20Olena",
    "scores": [
      {
        "source": "Tim Atkin",
        "score": 83,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "James Suckling",
        "score": 83,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Robert Parker",
        "score": 83,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Wine Spectator",
        "score": 86,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Wine Enthusiast",
        "score": 86,
        "maxScore": 100,
        "vintage": 2018
      }
    ],
    "aggregateScore": 84,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Dense blackberry, smoked meat, and pepper. Concentrated and intense with great depth.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "castello-dei-rampolla-chianti-classico-2021",
    "name": "Chianti Classico",
    "producer": "Castello dei Rampolla",
    "vintage": 2021,
    "type": "Red",
    "grape": "Sangiovese",
    "grapes": [
      "Sangiovese"
    ],
    "region": "Tuscany",
    "subRegion": "Chianti Classico",
    "country": "Italy",
    "countryCode": "IT",
    "appellation": "Chianti Classico DOCG",
    "alcoholContent": "15%",
    "price": 36,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Chianti%20Classico%20Castello%20dei%20Rampolla",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 88,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Robert Parker",
        "score": 85,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Tim Atkin",
        "score": 87,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Vivino",
        "score": 4.3,
        "maxScore": 5,
        "vintage": 2021
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2021
      },
      {
        "source": "Wine Enthusiast",
        "score": 89,
        "maxScore": 100,
        "vintage": 2021
      }
    ],
    "aggregateScore": 87,
    "badges": [],
    "tastingNotes": "Delicate raspberry, rose petal, and forest floor. Silky and refined with beautiful finesse.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "san-felice-chianti-classico-2020",
    "name": "Chianti Classico",
    "producer": "San Felice",
    "vintage": 2020,
    "type": "Red",
    "grape": "Sangiovese",
    "grapes": [
      "Sangiovese"
    ],
    "region": "Tuscany",
    "subRegion": "Chianti Classico",
    "country": "Italy",
    "countryCode": "IT",
    "appellation": "Chianti Classico DOCG",
    "alcoholContent": "13%",
    "price": 13,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Chianti%20Classico%20San%20Felice",
    "scores": [
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2020
      },
      {
        "source": "Tim Atkin",
        "score": 83,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Vivino",
        "score": 4.4,
        "maxScore": 5,
        "vintage": 2020
      },
      {
        "source": "Wine Enthusiast",
        "score": 85,
        "maxScore": 100,
        "vintage": 2020
      }
    ],
    "aggregateScore": 85,
    "badges": [],
    "tastingNotes": "Complex aromas of blackberry, plum, and earth. Medium-to-full body with velvety texture.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "felsina-chianti-classico-2019",
    "name": "Chianti Classico",
    "producer": "Felsina",
    "vintage": 2019,
    "type": "Red",
    "grape": "Sangiovese",
    "grapes": [
      "Sangiovese"
    ],
    "region": "Tuscany",
    "subRegion": "Chianti Classico",
    "country": "Italy",
    "countryCode": "IT",
    "appellation": "Chianti Classico DOCG",
    "alcoholContent": "14%",
    "price": 9,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Chianti%20Classico%20Felsina",
    "scores": [
      {
        "source": "Tim Atkin",
        "score": 83,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Vivino",
        "score": 4.3,
        "maxScore": 5,
        "vintage": 2019
      },
      {
        "source": "Decanter",
        "score": 87,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 85,
    "badges": [],
    "tastingNotes": "Rich dark fruit, spice, and oak. Full-bodied with firm tannins and a long finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "planeta-etna-2020",
    "name": "Etna",
    "producer": "Planeta",
    "vintage": 2020,
    "type": "Red",
    "grape": "Nerello Mascalese",
    "grapes": [
      "Nerello Mascalese"
    ],
    "region": "Sicily",
    "subRegion": "Etna",
    "country": "Italy",
    "countryCode": "IT",
    "appellation": "Etna DOC",
    "alcoholContent": "13%",
    "price": 72,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Etna%20Planeta",
    "scores": [
      {
        "source": "Wine Enthusiast",
        "score": 88,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Robert Parker",
        "score": 88,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Vivino",
        "score": 4.6,
        "maxScore": 5,
        "vintage": 2020
      },
      {
        "source": "Wine Spectator",
        "score": 89,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2020
      }
    ],
    "aggregateScore": 89,
    "badges": [],
    "tastingNotes": "Vibrant red fruit, cedar, and vanilla. Smooth and approachable with a spicy finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Wild game",
      "Mushroom dishes",
      "Aged Gouda"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "donnafugata-etna-2021",
    "name": "Etna",
    "producer": "Donnafugata",
    "vintage": 2021,
    "type": "Red",
    "grape": "Nerello Mascalese",
    "grapes": [
      "Nerello Mascalese"
    ],
    "region": "Sicily",
    "subRegion": "Etna",
    "country": "Italy",
    "countryCode": "IT",
    "appellation": "Etna DOC",
    "alcoholContent": "14%",
    "price": 35,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Etna%20Donnafugata",
    "scores": [
      {
        "source": "James Suckling",
        "score": 87,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Robert Parker",
        "score": 86,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Wine Spectator",
        "score": 86,
        "maxScore": 100,
        "vintage": 2021
      }
    ],
    "aggregateScore": 86,
    "badges": [],
    "tastingNotes": "Ripe cherry, tobacco, and leather. Elegant and structured with excellent aging potential.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "benanti-etna-2018",
    "name": "Etna",
    "producer": "Benanti",
    "vintage": 2018,
    "type": "Red",
    "grape": "Nerello Mascalese",
    "grapes": [
      "Nerello Mascalese"
    ],
    "region": "Sicily",
    "subRegion": "Etna",
    "country": "Italy",
    "countryCode": "IT",
    "appellation": "Etna DOC",
    "alcoholContent": "14%",
    "price": 39,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Etna%20Benanti",
    "scores": [
      {
        "source": "James Suckling",
        "score": 89,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Decanter",
        "score": 87,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Vivino",
        "score": 4.4,
        "maxScore": 5,
        "vintage": 2018
      },
      {
        "source": "Tim Atkin",
        "score": 88,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Robert Parker",
        "score": 89,
        "maxScore": 100,
        "vintage": 2018
      }
    ],
    "aggregateScore": 88,
    "badges": [],
    "tastingNotes": "Vibrant red fruit, cedar, and vanilla. Smooth and approachable with a spicy finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Wild game",
      "Mushroom dishes",
      "Aged Gouda"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "frank-cornelissen-etna-2021",
    "name": "Etna",
    "producer": "Frank Cornelissen",
    "vintage": 2021,
    "type": "Red",
    "grape": "Nerello Mascalese",
    "grapes": [
      "Nerello Mascalese"
    ],
    "region": "Sicily",
    "subRegion": "Etna",
    "country": "Italy",
    "countryCode": "IT",
    "appellation": "Etna DOC",
    "alcoholContent": "15%",
    "price": 25,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Etna%20Frank%20Cornelissen",
    "scores": [
      {
        "source": "Tim Atkin",
        "score": 83,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2021
      },
      {
        "source": "James Suckling",
        "score": 85,
        "maxScore": 100,
        "vintage": 2021
      }
    ],
    "aggregateScore": 84,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Bold cassis, dark chocolate, and espresso. Powerful yet balanced with polished tannins.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "bisol-glera-2018",
    "name": "Glera",
    "producer": "Bisol",
    "vintage": 2018,
    "type": "Sparkling",
    "grape": "Glera",
    "grapes": [
      "Glera"
    ],
    "region": "Veneto",
    "subRegion": "Prosecco",
    "country": "Italy",
    "countryCode": "IT",
    "appellation": "Prosecco DOC",
    "alcoholContent": "15%",
    "price": 13,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Glera%20Bisol",
    "scores": [
      {
        "source": "Tim Atkin",
        "score": 85,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Wine Spectator",
        "score": 85,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Robert Parker",
        "score": 84,
        "maxScore": 100,
        "vintage": 2018
      }
    ],
    "aggregateScore": 85,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Toasty and complex with dried fruit, honey, and biscuit. Elegant and persistent.",
    "editorial": "A sparkling wine that speaks to the quality of its base wines and the skill of its production. The mousse is fine and persistent, the aromatics complex, and the palate delivers both pleasure and complexity. Whether for celebration or simply elevating an everyday moment.",
    "pairings": [
      "Oysters",
      "Caviar",
      "Sushi"
    ],
    "servingTemp": "6-8°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "nino-franco-glera-2018",
    "name": "Glera",
    "producer": "Nino Franco",
    "vintage": 2018,
    "type": "Sparkling",
    "grape": "Glera",
    "grapes": [
      "Glera"
    ],
    "region": "Veneto",
    "subRegion": "Prosecco",
    "country": "Italy",
    "countryCode": "IT",
    "appellation": "Prosecco DOC",
    "alcoholContent": "13%",
    "price": 147,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Glera%20Nino%20Franco",
    "scores": [
      {
        "source": "Vivino",
        "score": 4.6,
        "maxScore": 5,
        "vintage": 2018
      },
      {
        "source": "Tim Atkin",
        "score": 91,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Wine Spectator",
        "score": 89,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Decanter",
        "score": 90,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Wine Enthusiast",
        "score": 93,
        "maxScore": 100,
        "vintage": 2018
      }
    ],
    "aggregateScore": 91,
    "badges": [],
    "tastingNotes": "Fine bubbles with notes of brioche, apple, and citrus. Creamy mousse with a crisp, clean finish.",
    "editorial": "A sparkling wine that speaks to the quality of its base wines and the skill of its production. The mousse is fine and persistent, the aromatics complex, and the palate delivers both pleasure and complexity. Whether for celebration or simply elevating an everyday moment.",
    "pairings": [
      "Fried foods",
      "Soft cheeses",
      "Celebrations"
    ],
    "servingTemp": "6-8°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "ruggeri-glera-2021",
    "name": "Glera",
    "producer": "Ruggeri",
    "vintage": 2021,
    "type": "Sparkling",
    "grape": "Glera",
    "grapes": [
      "Glera"
    ],
    "region": "Veneto",
    "subRegion": "Prosecco",
    "country": "Italy",
    "countryCode": "IT",
    "appellation": "Prosecco DOC",
    "alcoholContent": "15%",
    "price": 71,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Glera%20Ruggeri",
    "scores": [
      {
        "source": "Decanter",
        "score": 87,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "James Suckling",
        "score": 88,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Wine Enthusiast",
        "score": 87,
        "maxScore": 100,
        "vintage": 2021
      }
    ],
    "aggregateScore": 87,
    "badges": [],
    "tastingNotes": "Toasty and complex with dried fruit, honey, and biscuit. Elegant and persistent.",
    "editorial": "A sparkling wine that speaks to the quality of its base wines and the skill of its production. The mousse is fine and persistent, the aromatics complex, and the palate delivers both pleasure and complexity. Whether for celebration or simply elevating an everyday moment.",
    "pairings": [
      "Fried foods",
      "Soft cheeses",
      "Celebrations"
    ],
    "servingTemp": "6-8°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "la-marca-glera-2018",
    "name": "Glera",
    "producer": "La Marca",
    "vintage": 2018,
    "type": "Sparkling",
    "grape": "Glera",
    "grapes": [
      "Glera"
    ],
    "region": "Veneto",
    "subRegion": "Prosecco",
    "country": "Italy",
    "countryCode": "IT",
    "appellation": "Prosecco DOC",
    "alcoholContent": "14%",
    "price": 168,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Glera%20La%20Marca",
    "scores": [
      {
        "source": "Vivino",
        "score": 4.6,
        "maxScore": 5,
        "vintage": 2018
      },
      {
        "source": "Wine Spectator",
        "score": 92,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Robert Parker",
        "score": 89,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2018
      },
      {
        "source": "James Suckling",
        "score": 92,
        "maxScore": 100,
        "vintage": 2018
      }
    ],
    "aggregateScore": 91,
    "badges": [],
    "tastingNotes": "Fresh and fruity with green apple, pear, and white flowers. Light and easy-drinking.",
    "editorial": "A sparkling wine that speaks to the quality of its base wines and the skill of its production. The mousse is fine and persistent, the aromatics complex, and the palate delivers both pleasure and complexity. Whether for celebration or simply elevating an everyday moment.",
    "pairings": [
      "Oysters",
      "Caviar",
      "Sushi"
    ],
    "servingTemp": "6-8°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "tormaresca-primitivo-di-manduria-2020",
    "name": "Primitivo di Manduria",
    "producer": "Tormaresca",
    "vintage": 2020,
    "type": "Red",
    "grape": "Primitivo",
    "grapes": [
      "Primitivo"
    ],
    "region": "Puglia",
    "subRegion": "Primitivo di Manduria",
    "country": "Italy",
    "countryCode": "IT",
    "appellation": "Primitivo di Manduria DOC",
    "alcoholContent": "14%",
    "price": 21,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Primitivo%20di%20Manduria%20Tormaresca",
    "scores": [
      {
        "source": "Wine Enthusiast",
        "score": 83,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "James Suckling",
        "score": 84,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Decanter",
        "score": 85,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Robert Parker",
        "score": 85,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Vivino",
        "score": 4.3,
        "maxScore": 5,
        "vintage": 2020
      }
    ],
    "aggregateScore": 85,
    "badges": [],
    "tastingNotes": "Bold cassis, dark chocolate, and espresso. Powerful yet balanced with polished tannins.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Wild game",
      "Mushroom dishes",
      "Aged Gouda"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "san-marzano-primitivo-di-manduria-2022",
    "name": "Primitivo di Manduria",
    "producer": "San Marzano",
    "vintage": 2022,
    "type": "Red",
    "grape": "Primitivo",
    "grapes": [
      "Primitivo"
    ],
    "region": "Puglia",
    "subRegion": "Primitivo di Manduria",
    "country": "Italy",
    "countryCode": "IT",
    "appellation": "Primitivo di Manduria DOC",
    "alcoholContent": "14%",
    "price": 58,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Primitivo%20di%20Manduria%20San%20Marzano",
    "scores": [
      {
        "source": "Robert Parker",
        "score": 90,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Tim Atkin",
        "score": 89,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Vivino",
        "score": 4.4,
        "maxScore": 5,
        "vintage": 2022
      },
      {
        "source": "Decanter",
        "score": 89,
        "maxScore": 100,
        "vintage": 2022
      }
    ],
    "aggregateScore": 89,
    "badges": [],
    "tastingNotes": "Lush plum, mocha, and toasted oak. Generous and warming with a long, sweet finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "gianfranco-fino-primitivo-di-manduria-2022",
    "name": "Primitivo di Manduria",
    "producer": "Gianfranco Fino",
    "vintage": 2022,
    "type": "Red",
    "grape": "Primitivo",
    "grapes": [
      "Primitivo"
    ],
    "region": "Puglia",
    "subRegion": "Primitivo di Manduria",
    "country": "Italy",
    "countryCode": "IT",
    "appellation": "Primitivo di Manduria DOC",
    "alcoholContent": "15%",
    "price": 26,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Primitivo%20di%20Manduria%20Gianfranco%20Fino",
    "scores": [
      {
        "source": "James Suckling",
        "score": 86,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Decanter",
        "score": 87,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Robert Parker",
        "score": 89,
        "maxScore": 100,
        "vintage": 2022
      }
    ],
    "aggregateScore": 87,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Complex aromas of blackberry, plum, and earth. Medium-to-full body with velvety texture.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "marqu-s-de-murrieta-rioja-doca-2019",
    "name": "Rioja DOCa",
    "producer": "Marqués de Murrieta",
    "vintage": 2019,
    "type": "Red",
    "grape": "Tempranillo",
    "grapes": [
      "Tempranillo"
    ],
    "region": "Rioja",
    "subRegion": "Rioja Alavesa",
    "country": "Spain",
    "countryCode": "ES",
    "appellation": "Rioja DOCa",
    "alcoholContent": "13%",
    "price": 8,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Rioja%20DOCa%20Marqu%C3%A9s%20de%20Murrieta",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 87,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "James Suckling",
        "score": 83,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Vivino",
        "score": 4.3,
        "maxScore": 5,
        "vintage": 2019
      },
      {
        "source": "Robert Parker",
        "score": 84,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 85,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Delicate raspberry, rose petal, and forest floor. Silky and refined with beautiful finesse.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "l-pez-de-heredia-rioja-doca-2021",
    "name": "Rioja DOCa",
    "producer": "López de Heredia",
    "vintage": 2021,
    "type": "Red",
    "grape": "Tempranillo",
    "grapes": [
      "Tempranillo"
    ],
    "region": "Rioja",
    "subRegion": "Rioja Alavesa",
    "country": "Spain",
    "countryCode": "ES",
    "appellation": "Rioja DOCa",
    "alcoholContent": "15%",
    "price": 20,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Rioja%20DOCa%20L%C3%B3pez%20de%20Heredia",
    "scores": [
      {
        "source": "Vivino",
        "score": 4.4,
        "maxScore": 5,
        "vintage": 2021
      },
      {
        "source": "Robert Parker",
        "score": 84,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Tim Atkin",
        "score": 86,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Decanter",
        "score": 86,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Wine Enthusiast",
        "score": 83,
        "maxScore": 100,
        "vintage": 2021
      }
    ],
    "aggregateScore": 85,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Lush plum, mocha, and toasted oak. Generous and warming with a long, sweet finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "cvne-rioja-doca-2020",
    "name": "Rioja DOCa",
    "producer": "CVNE",
    "vintage": 2020,
    "type": "Red",
    "grape": "Tempranillo",
    "grapes": [
      "Tempranillo"
    ],
    "region": "Rioja",
    "subRegion": "Rioja Alavesa",
    "country": "Spain",
    "countryCode": "ES",
    "appellation": "Rioja DOCa",
    "alcoholContent": "14%",
    "price": 10,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Rioja%20DOCa%20CVNE",
    "scores": [
      {
        "source": "Wine Enthusiast",
        "score": 83,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Robert Parker",
        "score": 85,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2020
      }
    ],
    "aggregateScore": 84,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Delicate raspberry, rose petal, and forest floor. Silky and refined with beautiful finesse.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "muga-rioja-doca-2022",
    "name": "Rioja DOCa",
    "producer": "Muga",
    "vintage": 2022,
    "type": "Red",
    "grape": "Tempranillo",
    "grapes": [
      "Tempranillo"
    ],
    "region": "Rioja",
    "subRegion": "Rioja Alavesa",
    "country": "Spain",
    "countryCode": "ES",
    "appellation": "Rioja DOCa",
    "alcoholContent": "14%",
    "price": 12,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Rioja%20DOCa%20Muga",
    "scores": [
      {
        "source": "James Suckling",
        "score": 83,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Tim Atkin",
        "score": 86,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Robert Parker",
        "score": 86,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Vivino",
        "score": 4.3,
        "maxScore": 5,
        "vintage": 2022
      },
      {
        "source": "Wine Enthusiast",
        "score": 87,
        "maxScore": 100,
        "vintage": 2022
      }
    ],
    "aggregateScore": 86,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Delicate raspberry, rose petal, and forest floor. Silky and refined with beautiful finesse.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Wild game",
      "Mushroom dishes",
      "Aged Gouda"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "bodegas-roda-rioja-doca-2020",
    "name": "Rioja DOCa",
    "producer": "Bodegas Roda",
    "vintage": 2020,
    "type": "Red",
    "grape": "Tempranillo",
    "grapes": [
      "Tempranillo"
    ],
    "region": "Rioja",
    "subRegion": "Rioja Alavesa",
    "country": "Spain",
    "countryCode": "ES",
    "appellation": "Rioja DOCa",
    "alcoholContent": "14%",
    "price": 23,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Rioja%20DOCa%20Bodegas%20Roda",
    "scores": [
      {
        "source": "Tim Atkin",
        "score": 84,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Wine Spectator",
        "score": 87,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Robert Parker",
        "score": 87,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Wine Enthusiast",
        "score": 85,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2020
      },
      {
        "source": "James Suckling",
        "score": 86,
        "maxScore": 100,
        "vintage": 2020
      }
    ],
    "aggregateScore": 86,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Delicate raspberry, rose petal, and forest floor. Silky and refined with beautiful finesse.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "artadi-rioja-doca-2018",
    "name": "Rioja DOCa",
    "producer": "Artadi",
    "vintage": 2018,
    "type": "Red",
    "grape": "Tempranillo",
    "grapes": [
      "Tempranillo"
    ],
    "region": "Rioja",
    "subRegion": "Rioja Alavesa",
    "country": "Spain",
    "countryCode": "ES",
    "appellation": "Rioja DOCa",
    "alcoholContent": "14%",
    "price": 9,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Rioja%20DOCa%20Artadi",
    "scores": [
      {
        "source": "Decanter",
        "score": 85,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "James Suckling",
        "score": 83,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Wine Enthusiast",
        "score": 84,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Wine Spectator",
        "score": 86,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2018
      }
    ],
    "aggregateScore": 85,
    "badges": [],
    "tastingNotes": "Dense blackberry, smoked meat, and pepper. Concentrated and intense with great depth.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "rem-rez-de-ganuza-rioja-doca-2022",
    "name": "Rioja DOCa",
    "producer": "Remírez de Ganuza",
    "vintage": 2022,
    "type": "Red",
    "grape": "Tempranillo",
    "grapes": [
      "Tempranillo"
    ],
    "region": "Rioja",
    "subRegion": "Rioja Alavesa",
    "country": "Spain",
    "countryCode": "ES",
    "appellation": "Rioja DOCa",
    "alcoholContent": "15%",
    "price": 61,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Rioja%20DOCa%20Rem%C3%ADrez%20de%20Ganuza",
    "scores": [
      {
        "source": "Robert Parker",
        "score": 88,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2022
      },
      {
        "source": "Wine Spectator",
        "score": 90,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Vivino",
        "score": 4.6,
        "maxScore": 5,
        "vintage": 2022
      }
    ],
    "aggregateScore": 90,
    "badges": [],
    "tastingNotes": "Delicate raspberry, rose petal, and forest floor. Silky and refined with beautiful finesse.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "pesquera-ribera-del-duero-2022",
    "name": "Ribera del Duero",
    "producer": "Pesquera",
    "vintage": 2022,
    "type": "Red",
    "grape": "Tempranillo",
    "grapes": [
      "Tempranillo"
    ],
    "region": "Ribera del Duero",
    "subRegion": "Ribera del Duero",
    "country": "Spain",
    "countryCode": "ES",
    "appellation": "Ribera del Duero DO",
    "alcoholContent": "15%",
    "price": 41,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Ribera%20del%20Duero%20Pesquera",
    "scores": [
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2022
      },
      {
        "source": "Wine Spectator",
        "score": 87,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Robert Parker",
        "score": 89,
        "maxScore": 100,
        "vintage": 2022
      }
    ],
    "aggregateScore": 89,
    "badges": [],
    "tastingNotes": "Vibrant red fruit, cedar, and vanilla. Smooth and approachable with a spicy finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "protos-ribera-del-duero-2021",
    "name": "Ribera del Duero",
    "producer": "Protos",
    "vintage": 2021,
    "type": "Red",
    "grape": "Tempranillo",
    "grapes": [
      "Tempranillo"
    ],
    "region": "Ribera del Duero",
    "subRegion": "Ribera del Duero",
    "country": "Spain",
    "countryCode": "ES",
    "appellation": "Ribera del Duero DO",
    "alcoholContent": "14%",
    "price": 191,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Ribera%20del%20Duero%20Protos",
    "scores": [
      {
        "source": "Vivino",
        "score": 4.6,
        "maxScore": 5,
        "vintage": 2021
      },
      {
        "source": "Wine Enthusiast",
        "score": 91,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "James Suckling",
        "score": 90,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Robert Parker",
        "score": 92,
        "maxScore": 100,
        "vintage": 2021
      }
    ],
    "aggregateScore": 91,
    "badges": [],
    "tastingNotes": "Vibrant red fruit, cedar, and vanilla. Smooth and approachable with a spicy finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "hacienda-monasterio-ribera-del-duero-2020",
    "name": "Ribera del Duero",
    "producer": "Hacienda Monasterio",
    "vintage": 2020,
    "type": "Red",
    "grape": "Tempranillo",
    "grapes": [
      "Tempranillo"
    ],
    "region": "Ribera del Duero",
    "subRegion": "Ribera del Duero",
    "country": "Spain",
    "countryCode": "ES",
    "appellation": "Ribera del Duero DO",
    "alcoholContent": "15%",
    "price": 8,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Ribera%20del%20Duero%20Hacienda%20Monasterio",
    "scores": [
      {
        "source": "Tim Atkin",
        "score": 86,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Vivino",
        "score": 4.2,
        "maxScore": 5,
        "vintage": 2020
      },
      {
        "source": "Wine Spectator",
        "score": 86,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Decanter",
        "score": 86,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2020
      }
    ],
    "aggregateScore": 85,
    "badges": [],
    "tastingNotes": "Vibrant red fruit, cedar, and vanilla. Smooth and approachable with a spicy finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "ali-n-ribera-del-duero-2020",
    "name": "Ribera del Duero",
    "producer": "Alión",
    "vintage": 2020,
    "type": "Red",
    "grape": "Tempranillo",
    "grapes": [
      "Tempranillo"
    ],
    "region": "Ribera del Duero",
    "subRegion": "Ribera del Duero",
    "country": "Spain",
    "countryCode": "ES",
    "appellation": "Ribera del Duero DO",
    "alcoholContent": "13%",
    "price": 158,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Ribera%20del%20Duero%20Ali%C3%B3n",
    "scores": [
      {
        "source": "Robert Parker",
        "score": 92,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "James Suckling",
        "score": 89,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Decanter",
        "score": 89,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Vivino",
        "score": 4.5,
        "maxScore": 5,
        "vintage": 2020
      },
      {
        "source": "Tim Atkin",
        "score": 93,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2020
      }
    ],
    "aggregateScore": 91,
    "badges": [],
    "tastingNotes": "Ripe cherry, tobacco, and leather. Elegant and structured with excellent aging potential.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "gramona-macabeo-2021",
    "name": "Macabeo",
    "producer": "Gramona",
    "vintage": 2021,
    "type": "Sparkling",
    "grape": "Macabeo",
    "grapes": [
      "Macabeo",
      "Xarel·lo",
      "Parellada"
    ],
    "region": "Cava",
    "subRegion": "Penedès",
    "country": "Spain",
    "countryCode": "ES",
    "appellation": "Cava DO",
    "alcoholContent": "14%",
    "price": 28,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Macabeo%20Gramona",
    "scores": [
      {
        "source": "Decanter",
        "score": 87,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "James Suckling",
        "score": 88,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2021
      }
    ],
    "aggregateScore": 88,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Toasty and complex with dried fruit, honey, and biscuit. Elegant and persistent.",
    "editorial": "A sparkling wine that speaks to the quality of its base wines and the skill of its production. The mousse is fine and persistent, the aromatics complex, and the palate delivers both pleasure and complexity. Whether for celebration or simply elevating an everyday moment.",
    "pairings": [
      "Fried foods",
      "Soft cheeses",
      "Celebrations"
    ],
    "servingTemp": "6-8°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "recaredo-macabeo-2019",
    "name": "Macabeo",
    "producer": "Recaredo",
    "vintage": 2019,
    "type": "Sparkling",
    "grape": "Macabeo",
    "grapes": [
      "Macabeo",
      "Xarel·lo",
      "Parellada"
    ],
    "region": "Cava",
    "subRegion": "Penedès",
    "country": "Spain",
    "countryCode": "ES",
    "appellation": "Cava DO",
    "alcoholContent": "15%",
    "price": 117,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Macabeo%20Recaredo",
    "scores": [
      {
        "source": "Decanter",
        "score": 92,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Wine Enthusiast",
        "score": 91,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Wine Spectator",
        "score": 93,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Tim Atkin",
        "score": 93,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 92,
    "badges": [],
    "tastingNotes": "Fresh and fruity with green apple, pear, and white flowers. Light and easy-drinking.",
    "editorial": "A sparkling wine that speaks to the quality of its base wines and the skill of its production. The mousse is fine and persistent, the aromatics complex, and the palate delivers both pleasure and complexity. Whether for celebration or simply elevating an everyday moment.",
    "pairings": [
      "Fried foods",
      "Soft cheeses",
      "Celebrations"
    ],
    "servingTemp": "6-8°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "juv-y-camps-macabeo-2022",
    "name": "Macabeo",
    "producer": "Juvé y Camps",
    "vintage": 2022,
    "type": "Sparkling",
    "grape": "Macabeo",
    "grapes": [
      "Macabeo",
      "Xarel·lo",
      "Parellada"
    ],
    "region": "Cava",
    "subRegion": "Penedès",
    "country": "Spain",
    "countryCode": "ES",
    "appellation": "Cava DO",
    "alcoholContent": "13%",
    "price": 41,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Macabeo%20Juv%C3%A9%20y%20Camps",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 86,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Wine Enthusiast",
        "score": 88,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Vivino",
        "score": 4.4,
        "maxScore": 5,
        "vintage": 2022
      },
      {
        "source": "James Suckling",
        "score": 89,
        "maxScore": 100,
        "vintage": 2022
      }
    ],
    "aggregateScore": 88,
    "badges": [],
    "tastingNotes": "Toasty and complex with dried fruit, honey, and biscuit. Elegant and persistent.",
    "editorial": "A sparkling wine that speaks to the quality of its base wines and the skill of its production. The mousse is fine and persistent, the aromatics complex, and the palate delivers both pleasure and complexity. Whether for celebration or simply elevating an everyday moment.",
    "pairings": [
      "Fried foods",
      "Soft cheeses",
      "Celebrations"
    ],
    "servingTemp": "6-8°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "gonzalez-byass-tio-pepe-jerez-x-r-s-sherry-nv",
    "name": "Jerez-Xérès-Sherry",
    "producer": "Gonzalez Byass Tio Pepe",
    "vintage": null,
    "type": "Fortified",
    "grape": "Palomino Fino",
    "grapes": [
      "Palomino Fino"
    ],
    "region": "Sherry",
    "subRegion": "Jerez",
    "country": "Spain",
    "countryCode": "ES",
    "appellation": "Jerez-Xérès-Sherry DO",
    "alcoholContent": "13%",
    "price": 24,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Jerez-X%C3%A9r%C3%A8s-Sherry%20Gonzalez%20Byass%20Tio%20Pepe",
    "scores": [
      {
        "source": "Tim Atkin",
        "score": 85,
        "maxScore": 100,
        "vintage": null
      },
      {
        "source": "Wine Spectator",
        "score": 84,
        "maxScore": 100,
        "vintage": null
      },
      {
        "source": "Robert Parker",
        "score": 83,
        "maxScore": 100,
        "vintage": null
      },
      {
        "source": "Decanter",
        "score": 87,
        "maxScore": 100,
        "vintage": null
      },
      {
        "source": "Wine Enthusiast",
        "score": 83,
        "maxScore": 100,
        "vintage": null
      },
      {
        "source": "Vivino",
        "score": 4.2,
        "maxScore": 5,
        "vintage": null
      }
    ],
    "aggregateScore": 84,
    "badges": [],
    "tastingNotes": "Dry and nutty with almond, dried fruit, and sea salt. Complex and elegant with incredible depth.",
    "editorial": "A fortified wine that honors centuries of tradition while delivering genuine complexity and pleasure. The balance of sweetness, acidity, and alcohol is impeccable, creating a wine that rewards contemplation and pairs beautifully with cheese, chocolate, or quiet reflection.",
    "pairings": [
      "Aged cheeses",
      "Dried fruits",
      "After dinner"
    ],
    "servingTemp": "14-18°C",
    "aging": "10-30 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "lustau-jerez-x-r-s-sherry-nv",
    "name": "Jerez-Xérès-Sherry",
    "producer": "Lustau",
    "vintage": null,
    "type": "Fortified",
    "grape": "Palomino Fino",
    "grapes": [
      "Palomino Fino"
    ],
    "region": "Sherry",
    "subRegion": "Jerez",
    "country": "Spain",
    "countryCode": "ES",
    "appellation": "Jerez-Xérès-Sherry DO",
    "alcoholContent": "15%",
    "price": 18,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Jerez-X%C3%A9r%C3%A8s-Sherry%20Lustau",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 84,
        "maxScore": 100,
        "vintage": null
      },
      {
        "source": "Robert Parker",
        "score": 85,
        "maxScore": 100,
        "vintage": null
      },
      {
        "source": "James Suckling",
        "score": 83,
        "maxScore": 100,
        "vintage": null
      },
      {
        "source": "Vivino",
        "score": 4.2,
        "maxScore": 5,
        "vintage": null
      },
      {
        "source": "Decanter",
        "score": 85,
        "maxScore": 100,
        "vintage": null
      },
      {
        "source": "Wine Enthusiast",
        "score": 85,
        "maxScore": 100,
        "vintage": null
      }
    ],
    "aggregateScore": 84,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Dry and nutty with almond, dried fruit, and sea salt. Complex and elegant with incredible depth.",
    "editorial": "A fortified wine that honors centuries of tradition while delivering genuine complexity and pleasure. The balance of sweetness, acidity, and alcohol is impeccable, creating a wine that rewards contemplation and pairs beautifully with cheese, chocolate, or quiet reflection.",
    "pairings": [
      "Aged cheeses",
      "Dried fruits",
      "After dinner"
    ],
    "servingTemp": "14-18°C",
    "aging": "10-30 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "valdespino-jerez-x-r-s-sherry-nv",
    "name": "Jerez-Xérès-Sherry",
    "producer": "Valdespino",
    "vintage": null,
    "type": "Fortified",
    "grape": "Palomino Fino",
    "grapes": [
      "Palomino Fino"
    ],
    "region": "Sherry",
    "subRegion": "Jerez",
    "country": "Spain",
    "countryCode": "ES",
    "appellation": "Jerez-Xérès-Sherry DO",
    "alcoholContent": "14%",
    "price": 17,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Jerez-X%C3%A9r%C3%A8s-Sherry%20Valdespino",
    "scores": [
      {
        "source": "Vivino",
        "score": 4.3,
        "maxScore": 5,
        "vintage": null
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": null
      },
      {
        "source": "James Suckling",
        "score": 87,
        "maxScore": 100,
        "vintage": null
      },
      {
        "source": "Robert Parker",
        "score": 85,
        "maxScore": 100,
        "vintage": null
      },
      {
        "source": "Wine Spectator",
        "score": 87,
        "maxScore": 100,
        "vintage": null
      },
      {
        "source": "Wine Enthusiast",
        "score": 83,
        "maxScore": 100,
        "vintage": null
      }
    ],
    "aggregateScore": 86,
    "badges": [],
    "tastingNotes": "Dry and nutty with almond, dried fruit, and sea salt. Complex and elegant with incredible depth.",
    "editorial": "A fortified wine that honors centuries of tradition while delivering genuine complexity and pleasure. The balance of sweetness, acidity, and alcohol is impeccable, creating a wine that rewards contemplation and pairs beautifully with cheese, chocolate, or quiet reflection.",
    "pairings": [
      "Aged cheeses",
      "Dried fruits",
      "After dinner"
    ],
    "servingTemp": "14-18°C",
    "aging": "10-30 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "el-maestro-sierra-jerez-x-r-s-sherry-nv",
    "name": "Jerez-Xérès-Sherry",
    "producer": "El Maestro Sierra",
    "vintage": null,
    "type": "Fortified",
    "grape": "Palomino Fino",
    "grapes": [
      "Palomino Fino"
    ],
    "region": "Sherry",
    "subRegion": "Jerez",
    "country": "Spain",
    "countryCode": "ES",
    "appellation": "Jerez-Xérès-Sherry DO",
    "alcoholContent": "14%",
    "price": 25,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Jerez-X%C3%A9r%C3%A8s-Sherry%20El%20Maestro%20Sierra",
    "scores": [
      {
        "source": "Tim Atkin",
        "score": 84,
        "maxScore": 100,
        "vintage": null
      },
      {
        "source": "Robert Parker",
        "score": 86,
        "maxScore": 100,
        "vintage": null
      },
      {
        "source": "Wine Enthusiast",
        "score": 86,
        "maxScore": 100,
        "vintage": null
      },
      {
        "source": "Wine Spectator",
        "score": 86,
        "maxScore": 100,
        "vintage": null
      }
    ],
    "aggregateScore": 86,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Intense and complex with dark fruit, spice, and nuts. Sweet with firm structure and great length.",
    "editorial": "A fortified wine that honors centuries of tradition while delivering genuine complexity and pleasure. The balance of sweetness, acidity, and alcohol is impeccable, creating a wine that rewards contemplation and pairs beautifully with cheese, chocolate, or quiet reflection.",
    "pairings": [
      "Aged cheeses",
      "Dried fruits",
      "After dinner"
    ],
    "servingTemp": "14-18°C",
    "aging": "10-30 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "stag-s-leap-wine-cellars-stags-leap-district-2021",
    "name": "Stags Leap District",
    "producer": "Stag's Leap Wine Cellars",
    "vintage": 2021,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon"
    ],
    "region": "Napa Valley",
    "subRegion": "Stags Leap District",
    "country": "United States",
    "countryCode": "US",
    "appellation": "Stags Leap District AVA",
    "alcoholContent": "13%",
    "price": 24,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Stags%20Leap%20District%20Stag's%20Leap%20Wine%20Cellars",
    "scores": [
      {
        "source": "Wine Enthusiast",
        "score": 84,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Robert Parker",
        "score": 84,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2021
      },
      {
        "source": "Tim Atkin",
        "score": 86,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Vivino",
        "score": 4.2,
        "maxScore": 5,
        "vintage": 2021
      }
    ],
    "aggregateScore": 85,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Lush plum, mocha, and toasted oak. Generous and warming with a long, sweet finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "silver-oak-stags-leap-district-2021",
    "name": "Stags Leap District",
    "producer": "Silver Oak",
    "vintage": 2021,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon"
    ],
    "region": "Napa Valley",
    "subRegion": "Stags Leap District",
    "country": "United States",
    "countryCode": "US",
    "appellation": "Stags Leap District AVA",
    "alcoholContent": "14%",
    "price": 26,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Stags%20Leap%20District%20Silver%20Oak",
    "scores": [
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2021
      },
      {
        "source": "Robert Parker",
        "score": 85,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Vivino",
        "score": 4.4,
        "maxScore": 5,
        "vintage": 2021
      },
      {
        "source": "Tim Atkin",
        "score": 88,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Wine Enthusiast",
        "score": 85,
        "maxScore": 100,
        "vintage": 2021
      }
    ],
    "aggregateScore": 87,
    "badges": [],
    "tastingNotes": "Bold cassis, dark chocolate, and espresso. Powerful yet balanced with polished tannins.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Wild game",
      "Mushroom dishes",
      "Aged Gouda"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "duckhorn-stags-leap-district-2019",
    "name": "Stags Leap District",
    "producer": "Duckhorn",
    "vintage": 2019,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon"
    ],
    "region": "Napa Valley",
    "subRegion": "Stags Leap District",
    "country": "United States",
    "countryCode": "US",
    "appellation": "Stags Leap District AVA",
    "alcoholContent": "13%",
    "price": 79,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Stags%20Leap%20District%20Duckhorn",
    "scores": [
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2019
      },
      {
        "source": "Wine Enthusiast",
        "score": 89,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Decanter",
        "score": 89,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "James Suckling",
        "score": 88,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Vivino",
        "score": 4.4,
        "maxScore": 5,
        "vintage": 2019
      }
    ],
    "aggregateScore": 89,
    "badges": [],
    "tastingNotes": "Rich dark fruit, spice, and oak. Full-bodied with firm tannins and a long finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Wild game",
      "Mushroom dishes",
      "Aged Gouda"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "shafer-stags-leap-district-2019",
    "name": "Stags Leap District",
    "producer": "Shafer",
    "vintage": 2019,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon"
    ],
    "region": "Napa Valley",
    "subRegion": "Stags Leap District",
    "country": "United States",
    "countryCode": "US",
    "appellation": "Stags Leap District AVA",
    "alcoholContent": "13%",
    "price": 20,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Stags%20Leap%20District%20Shafer",
    "scores": [
      {
        "source": "Wine Enthusiast",
        "score": 87,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2019
      },
      {
        "source": "Decanter",
        "score": 83,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Wine Spectator",
        "score": 84,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 85,
    "badges": [],
    "tastingNotes": "Bold cassis, dark chocolate, and espresso. Powerful yet balanced with polished tannins.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "cakebread-stags-leap-district-2018",
    "name": "Stags Leap District",
    "producer": "Cakebread",
    "vintage": 2018,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon"
    ],
    "region": "Napa Valley",
    "subRegion": "Stags Leap District",
    "country": "United States",
    "countryCode": "US",
    "appellation": "Stags Leap District AVA",
    "alcoholContent": "14%",
    "price": 18,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Stags%20Leap%20District%20Cakebread",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 84,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Robert Parker",
        "score": 83,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "James Suckling",
        "score": 85,
        "maxScore": 100,
        "vintage": 2018
      }
    ],
    "aggregateScore": 84,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Bold cassis, dark chocolate, and espresso. Powerful yet balanced with polished tannins.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "far-niente-stags-leap-district-2019",
    "name": "Stags Leap District",
    "producer": "Far Niente",
    "vintage": 2019,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon"
    ],
    "region": "Napa Valley",
    "subRegion": "Stags Leap District",
    "country": "United States",
    "countryCode": "US",
    "appellation": "Stags Leap District AVA",
    "alcoholContent": "14%",
    "price": 146,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Stags%20Leap%20District%20Far%20Niente",
    "scores": [
      {
        "source": "Vivino",
        "score": 4.7,
        "maxScore": 5,
        "vintage": 2019
      },
      {
        "source": "Wine Spectator",
        "score": 91,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Tim Atkin",
        "score": 92,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "James Suckling",
        "score": 93,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Wine Enthusiast",
        "score": 93,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2019
      }
    ],
    "aggregateScore": 92,
    "badges": [],
    "tastingNotes": "Complex aromas of blackberry, plum, and earth. Medium-to-full body with velvety texture.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "spottswoode-stags-leap-district-2022",
    "name": "Stags Leap District",
    "producer": "Spottswoode",
    "vintage": 2022,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon"
    ],
    "region": "Napa Valley",
    "subRegion": "Stags Leap District",
    "country": "United States",
    "countryCode": "US",
    "appellation": "Stags Leap District AVA",
    "alcoholContent": "14%",
    "price": 38,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Stags%20Leap%20District%20Spottswoode",
    "scores": [
      {
        "source": "Vivino",
        "score": 4.3,
        "maxScore": 5,
        "vintage": 2022
      },
      {
        "source": "Wine Spectator",
        "score": 89,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Tim Atkin",
        "score": 88,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Decanter",
        "score": 89,
        "maxScore": 100,
        "vintage": 2022
      }
    ],
    "aggregateScore": 88,
    "badges": [],
    "tastingNotes": "Vibrant red fruit, cedar, and vanilla. Smooth and approachable with a spicy finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "heitz-cellar-stags-leap-district-2020",
    "name": "Stags Leap District",
    "producer": "Heitz Cellar",
    "vintage": 2020,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon"
    ],
    "region": "Napa Valley",
    "subRegion": "Stags Leap District",
    "country": "United States",
    "countryCode": "US",
    "appellation": "Stags Leap District AVA",
    "alcoholContent": "14%",
    "price": 10,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Stags%20Leap%20District%20Heitz%20Cellar",
    "scores": [
      {
        "source": "Decanter",
        "score": 86,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "James Suckling",
        "score": 84,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2020
      },
      {
        "source": "Wine Enthusiast",
        "score": 84,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Robert Parker",
        "score": 85,
        "maxScore": 100,
        "vintage": 2020
      }
    ],
    "aggregateScore": 85,
    "badges": [],
    "tastingNotes": "Vibrant red fruit, cedar, and vanilla. Smooth and approachable with a spicy finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "dominus-stags-leap-district-2020",
    "name": "Stags Leap District",
    "producer": "Dominus",
    "vintage": 2020,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon"
    ],
    "region": "Napa Valley",
    "subRegion": "Stags Leap District",
    "country": "United States",
    "countryCode": "US",
    "appellation": "Stags Leap District AVA",
    "alcoholContent": "15%",
    "price": 186,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Stags%20Leap%20District%20Dominus",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 93,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Robert Parker",
        "score": 93,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Decanter",
        "score": 93,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2020
      }
    ],
    "aggregateScore": 92,
    "badges": [],
    "tastingNotes": "Ripe cherry, tobacco, and leather. Elegant and structured with excellent aging potential.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "harlan-estate-stags-leap-district-2020",
    "name": "Stags Leap District",
    "producer": "Harlan Estate",
    "vintage": 2020,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon"
    ],
    "region": "Napa Valley",
    "subRegion": "Stags Leap District",
    "country": "United States",
    "countryCode": "US",
    "appellation": "Stags Leap District AVA",
    "alcoholContent": "15%",
    "price": 21,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Stags%20Leap%20District%20Harlan%20Estate",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 83,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Robert Parker",
        "score": 85,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "James Suckling",
        "score": 84,
        "maxScore": 100,
        "vintage": 2020
      }
    ],
    "aggregateScore": 84,
    "badges": [],
    "tastingNotes": "Bold cassis, dark chocolate, and espresso. Powerful yet balanced with polished tannins.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "williams-selyem-russian-river-valley-2021",
    "name": "Russian River Valley",
    "producer": "Williams Selyem",
    "vintage": 2021,
    "type": "Red",
    "grape": "Pinot Noir",
    "grapes": [
      "Pinot Noir"
    ],
    "region": "Sonoma",
    "subRegion": "Russian River Valley",
    "country": "United States",
    "countryCode": "US",
    "appellation": "Russian River Valley AVA",
    "alcoholContent": "14%",
    "price": 122,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Russian%20River%20Valley%20Williams%20Selyem",
    "scores": [
      {
        "source": "Robert Parker",
        "score": 92,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Wine Spectator",
        "score": 89,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2021
      },
      {
        "source": "Decanter",
        "score": 89,
        "maxScore": 100,
        "vintage": 2021
      }
    ],
    "aggregateScore": 90,
    "badges": [],
    "tastingNotes": "Dense blackberry, smoked meat, and pepper. Concentrated and intense with great depth.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "littorai-russian-river-valley-2022",
    "name": "Russian River Valley",
    "producer": "Littorai",
    "vintage": 2022,
    "type": "Red",
    "grape": "Pinot Noir",
    "grapes": [
      "Pinot Noir"
    ],
    "region": "Sonoma",
    "subRegion": "Russian River Valley",
    "country": "United States",
    "countryCode": "US",
    "appellation": "Russian River Valley AVA",
    "alcoholContent": "15%",
    "price": 13,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Russian%20River%20Valley%20Littorai",
    "scores": [
      {
        "source": "Tim Atkin",
        "score": 85,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "James Suckling",
        "score": 86,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2022
      }
    ],
    "aggregateScore": 85,
    "badges": [],
    "tastingNotes": "Dense blackberry, smoked meat, and pepper. Concentrated and intense with great depth.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "kistler-russian-river-valley-2022",
    "name": "Russian River Valley",
    "producer": "Kistler",
    "vintage": 2022,
    "type": "Red",
    "grape": "Pinot Noir",
    "grapes": [
      "Pinot Noir"
    ],
    "region": "Sonoma",
    "subRegion": "Russian River Valley",
    "country": "United States",
    "countryCode": "US",
    "appellation": "Russian River Valley AVA",
    "alcoholContent": "15%",
    "price": 25,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Russian%20River%20Valley%20Kistler",
    "scores": [
      {
        "source": "Decanter",
        "score": 83,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Wine Spectator",
        "score": 83,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Tim Atkin",
        "score": 83,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Wine Enthusiast",
        "score": 83,
        "maxScore": 100,
        "vintage": 2022
      }
    ],
    "aggregateScore": 83,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Lush plum, mocha, and toasted oak. Generous and warming with a long, sweet finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Wild game",
      "Mushroom dishes",
      "Aged Gouda"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "flowers-russian-river-valley-2022",
    "name": "Russian River Valley",
    "producer": "Flowers",
    "vintage": 2022,
    "type": "Red",
    "grape": "Pinot Noir",
    "grapes": [
      "Pinot Noir"
    ],
    "region": "Sonoma",
    "subRegion": "Russian River Valley",
    "country": "United States",
    "countryCode": "US",
    "appellation": "Russian River Valley AVA",
    "alcoholContent": "15%",
    "price": 9,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Russian%20River%20Valley%20Flowers",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 84,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Decanter",
        "score": 87,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2022
      }
    ],
    "aggregateScore": 85,
    "badges": [],
    "tastingNotes": "Vibrant red fruit, cedar, and vanilla. Smooth and approachable with a spicy finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Wild game",
      "Mushroom dishes",
      "Aged Gouda"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "peter-michael-chardonnay-2019",
    "name": "Chardonnay",
    "producer": "Peter Michael",
    "vintage": 2019,
    "type": "White",
    "grape": "Chardonnay",
    "grapes": [
      "Chardonnay"
    ],
    "region": "Sonoma",
    "subRegion": "Sonoma Coast",
    "country": "United States",
    "countryCode": "US",
    "appellation": "Sonoma Coast AVA",
    "alcoholContent": "14%",
    "price": 70,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Chardonnay%20Peter%20Michael",
    "scores": [
      {
        "source": "Decanter",
        "score": 87,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Wine Spectator",
        "score": 89,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Wine Enthusiast",
        "score": 88,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2019
      },
      {
        "source": "Vivino",
        "score": 4.4,
        "maxScore": 5,
        "vintage": 2019
      }
    ],
    "aggregateScore": 88,
    "badges": [],
    "tastingNotes": "Tropical mango, pineapple, and vanilla. Round and generous with a creamy palate.",
    "editorial": "A beautifully crafted white wine that showcases the producer's commitment to quality. The balance between fruit expression and mineral complexity speaks to thoughtful winemaking, while the acidity backbone ensures freshness and food-friendliness. This is the kind of wine that converts casual drinkers into enthusiasts.",
    "pairings": [
      "Roast chicken",
      "Pasta with cream sauce",
      "Sushi"
    ],
    "servingTemp": "8-12°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "kistler-chardonnay-2020",
    "name": "Chardonnay",
    "producer": "Kistler",
    "vintage": 2020,
    "type": "White",
    "grape": "Chardonnay",
    "grapes": [
      "Chardonnay"
    ],
    "region": "Sonoma",
    "subRegion": "Sonoma Coast",
    "country": "United States",
    "countryCode": "US",
    "appellation": "Sonoma Coast AVA",
    "alcoholContent": "14%",
    "price": 11,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Chardonnay%20Kistler",
    "scores": [
      {
        "source": "Vivino",
        "score": 4.2,
        "maxScore": 5,
        "vintage": 2020
      },
      {
        "source": "Tim Atkin",
        "score": 86,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Wine Enthusiast",
        "score": 84,
        "maxScore": 100,
        "vintage": 2020
      }
    ],
    "aggregateScore": 85,
    "badges": [],
    "tastingNotes": "Rich stone fruit, honey, and toasted almond. Full-bodied with buttery texture and long finish.",
    "editorial": "A beautifully crafted white wine that showcases the producer's commitment to quality. The balance between fruit expression and mineral complexity speaks to thoughtful winemaking, while the acidity backbone ensures freshness and food-friendliness. This is the kind of wine that converts casual drinkers into enthusiasts.",
    "pairings": [
      "Roast chicken",
      "Pasta with cream sauce",
      "Sushi"
    ],
    "servingTemp": "8-12°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "ramey-chardonnay-2018",
    "name": "Chardonnay",
    "producer": "Ramey",
    "vintage": 2018,
    "type": "White",
    "grape": "Chardonnay",
    "grapes": [
      "Chardonnay"
    ],
    "region": "Sonoma",
    "subRegion": "Sonoma Coast",
    "country": "United States",
    "countryCode": "US",
    "appellation": "Sonoma Coast AVA",
    "alcoholContent": "13%",
    "price": 18,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Chardonnay%20Ramey",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 83,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Robert Parker",
        "score": 84,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Vivino",
        "score": 4.4,
        "maxScore": 5,
        "vintage": 2018
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2018
      },
      {
        "source": "Wine Enthusiast",
        "score": 87,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "James Suckling",
        "score": 84,
        "maxScore": 100,
        "vintage": 2018
      }
    ],
    "aggregateScore": 85,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Steely and precise with notes of green apple, chalk, and lemon zest. Electric acidity.",
    "editorial": "A beautifully crafted white wine that showcases the producer's commitment to quality. The balance between fruit expression and mineral complexity speaks to thoughtful winemaking, while the acidity backbone ensures freshness and food-friendliness. This is the kind of wine that converts casual drinkers into enthusiasts.",
    "pairings": [
      "Roast chicken",
      "Pasta with cream sauce",
      "Sushi"
    ],
    "servingTemp": "8-12°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "domaine-drouhin-oregon-dundee-hills-2022",
    "name": "Dundee Hills",
    "producer": "Domaine Drouhin Oregon",
    "vintage": 2022,
    "type": "Red",
    "grape": "Pinot Noir",
    "grapes": [
      "Pinot Noir"
    ],
    "region": "Willamette Valley",
    "subRegion": "Dundee Hills",
    "country": "United States",
    "countryCode": "US",
    "appellation": "Dundee Hills AVA",
    "alcoholContent": "15%",
    "price": 174,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Dundee%20Hills%20Domaine%20Drouhin%20Oregon",
    "scores": [
      {
        "source": "Robert Parker",
        "score": 92,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Decanter",
        "score": 92,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Vivino",
        "score": 4.6,
        "maxScore": 5,
        "vintage": 2022
      },
      {
        "source": "Wine Spectator",
        "score": 93,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Tim Atkin",
        "score": 92,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Wine Enthusiast",
        "score": 90,
        "maxScore": 100,
        "vintage": 2022
      }
    ],
    "aggregateScore": 92,
    "badges": [],
    "tastingNotes": "Dense blackberry, smoked meat, and pepper. Concentrated and intense with great depth.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "bergstr-m-dundee-hills-2018",
    "name": "Dundee Hills",
    "producer": "Bergström",
    "vintage": 2018,
    "type": "Red",
    "grape": "Pinot Noir",
    "grapes": [
      "Pinot Noir"
    ],
    "region": "Willamette Valley",
    "subRegion": "Dundee Hills",
    "country": "United States",
    "countryCode": "US",
    "appellation": "Dundee Hills AVA",
    "alcoholContent": "15%",
    "price": 181,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Dundee%20Hills%20Bergstr%C3%B6m",
    "scores": [
      {
        "source": "James Suckling",
        "score": 91,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Wine Enthusiast",
        "score": 93,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Tim Atkin",
        "score": 93,
        "maxScore": 100,
        "vintage": 2018
      }
    ],
    "aggregateScore": 92,
    "badges": [],
    "tastingNotes": "Vibrant red fruit, cedar, and vanilla. Smooth and approachable with a spicy finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "ken-wright-dundee-hills-2022",
    "name": "Dundee Hills",
    "producer": "Ken Wright",
    "vintage": 2022,
    "type": "Red",
    "grape": "Pinot Noir",
    "grapes": [
      "Pinot Noir"
    ],
    "region": "Willamette Valley",
    "subRegion": "Dundee Hills",
    "country": "United States",
    "countryCode": "US",
    "appellation": "Dundee Hills AVA",
    "alcoholContent": "14%",
    "price": 61,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Dundee%20Hills%20Ken%20Wright",
    "scores": [
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2022
      },
      {
        "source": "Vivino",
        "score": 4.6,
        "maxScore": 5,
        "vintage": 2022
      },
      {
        "source": "Wine Enthusiast",
        "score": 88,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Decanter",
        "score": 91,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "James Suckling",
        "score": 88,
        "maxScore": 100,
        "vintage": 2022
      }
    ],
    "aggregateScore": 90,
    "badges": [],
    "tastingNotes": "Ripe cherry, tobacco, and leather. Elegant and structured with excellent aging potential.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "cayuse-walla-walla-valley-2021",
    "name": "Walla Walla Valley",
    "producer": "Cayuse",
    "vintage": 2021,
    "type": "Red",
    "grape": "Syrah",
    "grapes": [
      "Syrah"
    ],
    "region": "Washington State",
    "subRegion": "Walla Walla Valley",
    "country": "United States",
    "countryCode": "US",
    "appellation": "Walla Walla Valley AVA",
    "alcoholContent": "15%",
    "price": 19,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Walla%20Walla%20Valley%20Cayuse",
    "scores": [
      {
        "source": "Tim Atkin",
        "score": 83,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "James Suckling",
        "score": 85,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Decanter",
        "score": 84,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Wine Spectator",
        "score": 84,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Vivino",
        "score": 4.4,
        "maxScore": 5,
        "vintage": 2021
      }
    ],
    "aggregateScore": 85,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Lush plum, mocha, and toasted oak. Generous and warming with a long, sweet finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "k-vintners-walla-walla-valley-2018",
    "name": "Walla Walla Valley",
    "producer": "K Vintners",
    "vintage": 2018,
    "type": "Red",
    "grape": "Syrah",
    "grapes": [
      "Syrah"
    ],
    "region": "Washington State",
    "subRegion": "Walla Walla Valley",
    "country": "United States",
    "countryCode": "US",
    "appellation": "Walla Walla Valley AVA",
    "alcoholContent": "13%",
    "price": 127,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Walla%20Walla%20Valley%20K%20Vintners",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 90,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Wine Enthusiast",
        "score": 91,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Decanter",
        "score": 90,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Vivino",
        "score": 4.5,
        "maxScore": 5,
        "vintage": 2018
      }
    ],
    "aggregateScore": 90,
    "badges": [],
    "tastingNotes": "Delicate raspberry, rose petal, and forest floor. Silky and refined with beautiful finesse.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "gramercy-cellars-walla-walla-valley-2018",
    "name": "Walla Walla Valley",
    "producer": "Gramercy Cellars",
    "vintage": 2018,
    "type": "Red",
    "grape": "Syrah",
    "grapes": [
      "Syrah"
    ],
    "region": "Washington State",
    "subRegion": "Walla Walla Valley",
    "country": "United States",
    "countryCode": "US",
    "appellation": "Walla Walla Valley AVA",
    "alcoholContent": "15%",
    "price": 21,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Walla%20Walla%20Valley%20Gramercy%20Cellars",
    "scores": [
      {
        "source": "Robert Parker",
        "score": 84,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Wine Enthusiast",
        "score": 84,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "James Suckling",
        "score": 84,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Wine Spectator",
        "score": 84,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Decanter",
        "score": 87,
        "maxScore": 100,
        "vintage": 2018
      }
    ],
    "aggregateScore": 85,
    "badges": [],
    "tastingNotes": "Vibrant red fruit, cedar, and vanilla. Smooth and approachable with a spicy finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "torbreck-barossa-valley-2019",
    "name": "Barossa Valley",
    "producer": "Torbreck",
    "vintage": 2019,
    "type": "Red",
    "grape": "Shiraz",
    "grapes": [
      "Shiraz"
    ],
    "region": "Barossa Valley",
    "subRegion": "Barossa Valley",
    "country": "Australia",
    "countryCode": "AU",
    "appellation": "Barossa Valley GI",
    "alcoholContent": "14%",
    "price": 18,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Barossa%20Valley%20Torbreck",
    "scores": [
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2019
      },
      {
        "source": "Robert Parker",
        "score": 85,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Wine Spectator",
        "score": 87,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Vivino",
        "score": 4.4,
        "maxScore": 5,
        "vintage": 2019
      },
      {
        "source": "Tim Atkin",
        "score": 83,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 86,
    "badges": [],
    "tastingNotes": "Rich dark fruit, spice, and oak. Full-bodied with firm tannins and a long finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "two-hands-barossa-valley-2018",
    "name": "Barossa Valley",
    "producer": "Two Hands",
    "vintage": 2018,
    "type": "Red",
    "grape": "Shiraz",
    "grapes": [
      "Shiraz"
    ],
    "region": "Barossa Valley",
    "subRegion": "Barossa Valley",
    "country": "Australia",
    "countryCode": "AU",
    "appellation": "Barossa Valley GI",
    "alcoholContent": "14%",
    "price": 44,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Barossa%20Valley%20Two%20Hands",
    "scores": [
      {
        "source": "Tim Atkin",
        "score": 86,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2018
      },
      {
        "source": "Robert Parker",
        "score": 89,
        "maxScore": 100,
        "vintage": 2018
      }
    ],
    "aggregateScore": 87,
    "badges": [],
    "tastingNotes": "Rich dark fruit, spice, and oak. Full-bodied with firm tannins and a long finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "yalumba-barossa-valley-2018",
    "name": "Barossa Valley",
    "producer": "Yalumba",
    "vintage": 2018,
    "type": "Red",
    "grape": "Shiraz",
    "grapes": [
      "Shiraz"
    ],
    "region": "Barossa Valley",
    "subRegion": "Barossa Valley",
    "country": "Australia",
    "countryCode": "AU",
    "appellation": "Barossa Valley GI",
    "alcoholContent": "15%",
    "price": 8,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Barossa%20Valley%20Yalumba",
    "scores": [
      {
        "source": "Decanter",
        "score": 86,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Tim Atkin",
        "score": 86,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Wine Spectator",
        "score": 83,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Robert Parker",
        "score": 86,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Wine Enthusiast",
        "score": 85,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "James Suckling",
        "score": 85,
        "maxScore": 100,
        "vintage": 2018
      }
    ],
    "aggregateScore": 85,
    "badges": [],
    "tastingNotes": "Bold cassis, dark chocolate, and espresso. Powerful yet balanced with polished tannins.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "peter-lehmann-barossa-valley-2019",
    "name": "Barossa Valley",
    "producer": "Peter Lehmann",
    "vintage": 2019,
    "type": "Red",
    "grape": "Shiraz",
    "grapes": [
      "Shiraz"
    ],
    "region": "Barossa Valley",
    "subRegion": "Barossa Valley",
    "country": "Australia",
    "countryCode": "AU",
    "appellation": "Barossa Valley GI",
    "alcoholContent": "13%",
    "price": 26,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Barossa%20Valley%20Peter%20Lehmann",
    "scores": [
      {
        "source": "Robert Parker",
        "score": 86,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Vivino",
        "score": 4.4,
        "maxScore": 5,
        "vintage": 2019
      },
      {
        "source": "Wine Spectator",
        "score": 85,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "James Suckling",
        "score": 86,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Decanter",
        "score": 85,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Wine Enthusiast",
        "score": 88,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 86,
    "badges": [],
    "tastingNotes": "Complex aromas of blackberry, plum, and earth. Medium-to-full body with velvety texture.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Wild game",
      "Mushroom dishes",
      "Aged Gouda"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "grant-burge-barossa-valley-2019",
    "name": "Barossa Valley",
    "producer": "Grant Burge",
    "vintage": 2019,
    "type": "Red",
    "grape": "Shiraz",
    "grapes": [
      "Shiraz"
    ],
    "region": "Barossa Valley",
    "subRegion": "Barossa Valley",
    "country": "Australia",
    "countryCode": "AU",
    "appellation": "Barossa Valley GI",
    "alcoholContent": "15%",
    "price": 143,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Barossa%20Valley%20Grant%20Burge",
    "scores": [
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2019
      },
      {
        "source": "Decanter",
        "score": 91,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Wine Spectator",
        "score": 93,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Robert Parker",
        "score": 89,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Tim Atkin",
        "score": 89,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 90,
    "badges": [],
    "tastingNotes": "Bold cassis, dark chocolate, and espresso. Powerful yet balanced with polished tannins.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "d-arenberg-mclaren-vale-2022",
    "name": "McLaren Vale",
    "producer": "d'Arenberg",
    "vintage": 2022,
    "type": "Red",
    "grape": "Shiraz",
    "grapes": [
      "Shiraz",
      "Grenache"
    ],
    "region": "McLaren Vale",
    "subRegion": "McLaren Vale",
    "country": "Australia",
    "countryCode": "AU",
    "appellation": "McLaren Vale GI",
    "alcoholContent": "13%",
    "price": 12,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=McLaren%20Vale%20d'Arenberg",
    "scores": [
      {
        "source": "Decanter",
        "score": 84,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "James Suckling",
        "score": 83,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Wine Enthusiast",
        "score": 83,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Robert Parker",
        "score": 87,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Wine Spectator",
        "score": 85,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2022
      }
    ],
    "aggregateScore": 85,
    "badges": [],
    "tastingNotes": "Complex aromas of blackberry, plum, and earth. Medium-to-full body with velvety texture.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "wirra-wirra-mclaren-vale-2018",
    "name": "McLaren Vale",
    "producer": "Wirra Wirra",
    "vintage": 2018,
    "type": "Red",
    "grape": "Shiraz",
    "grapes": [
      "Shiraz",
      "Grenache"
    ],
    "region": "McLaren Vale",
    "subRegion": "McLaren Vale",
    "country": "Australia",
    "countryCode": "AU",
    "appellation": "McLaren Vale GI",
    "alcoholContent": "13%",
    "price": 73,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=McLaren%20Vale%20Wirra%20Wirra",
    "scores": [
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2018
      },
      {
        "source": "Wine Spectator",
        "score": 90,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Wine Enthusiast",
        "score": 88,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Decanter",
        "score": 91,
        "maxScore": 100,
        "vintage": 2018
      }
    ],
    "aggregateScore": 90,
    "badges": [],
    "tastingNotes": "Bold cassis, dark chocolate, and espresso. Powerful yet balanced with polished tannins.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "yangarra-mclaren-vale-2018",
    "name": "McLaren Vale",
    "producer": "Yangarra",
    "vintage": 2018,
    "type": "Red",
    "grape": "Shiraz",
    "grapes": [
      "Shiraz",
      "Grenache"
    ],
    "region": "McLaren Vale",
    "subRegion": "McLaren Vale",
    "country": "Australia",
    "countryCode": "AU",
    "appellation": "McLaren Vale GI",
    "alcoholContent": "13%",
    "price": 153,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=McLaren%20Vale%20Yangarra",
    "scores": [
      {
        "source": "Vivino",
        "score": 4.5,
        "maxScore": 5,
        "vintage": 2018
      },
      {
        "source": "Wine Enthusiast",
        "score": 90,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "James Suckling",
        "score": 93,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Robert Parker",
        "score": 93,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Wine Spectator",
        "score": 90,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Decanter",
        "score": 93,
        "maxScore": 100,
        "vintage": 2018
      }
    ],
    "aggregateScore": 92,
    "badges": [],
    "tastingNotes": "Rich dark fruit, spice, and oak. Full-bodied with firm tannins and a long finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "vasse-felix-margaret-river-2020",
    "name": "Margaret River",
    "producer": "Vasse Felix",
    "vintage": 2020,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon"
    ],
    "region": "Margaret River",
    "subRegion": "Margaret River",
    "country": "Australia",
    "countryCode": "AU",
    "appellation": "Margaret River GI",
    "alcoholContent": "14%",
    "price": 68,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Margaret%20River%20Vasse%20Felix",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 91,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Tim Atkin",
        "score": 87,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Robert Parker",
        "score": 89,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Vivino",
        "score": 4.5,
        "maxScore": 5,
        "vintage": 2020
      },
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2020
      }
    ],
    "aggregateScore": 89,
    "badges": [],
    "tastingNotes": "Ripe cherry, tobacco, and leather. Elegant and structured with excellent aging potential.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Wild game",
      "Mushroom dishes",
      "Aged Gouda"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "leeuwin-estate-margaret-river-2021",
    "name": "Margaret River",
    "producer": "Leeuwin Estate",
    "vintage": 2021,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon"
    ],
    "region": "Margaret River",
    "subRegion": "Margaret River",
    "country": "Australia",
    "countryCode": "AU",
    "appellation": "Margaret River GI",
    "alcoholContent": "13%",
    "price": 9,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Margaret%20River%20Leeuwin%20Estate",
    "scores": [
      {
        "source": "James Suckling",
        "score": 85,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Vivino",
        "score": 4.3,
        "maxScore": 5,
        "vintage": 2021
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2021
      },
      {
        "source": "Robert Parker",
        "score": 87,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Tim Atkin",
        "score": 84,
        "maxScore": 100,
        "vintage": 2021
      }
    ],
    "aggregateScore": 85,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Ripe cherry, tobacco, and leather. Elegant and structured with excellent aging potential.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "cullen-margaret-river-2019",
    "name": "Margaret River",
    "producer": "Cullen",
    "vintage": 2019,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon"
    ],
    "region": "Margaret River",
    "subRegion": "Margaret River",
    "country": "Australia",
    "countryCode": "AU",
    "appellation": "Margaret River GI",
    "alcoholContent": "13%",
    "price": 8,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Margaret%20River%20Cullen",
    "scores": [
      {
        "source": "Vivino",
        "score": 4.4,
        "maxScore": 5,
        "vintage": 2019
      },
      {
        "source": "Wine Enthusiast",
        "score": 85,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Tim Atkin",
        "score": 83,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 85,
    "badges": [],
    "tastingNotes": "Vibrant red fruit, cedar, and vanilla. Smooth and approachable with a spicy finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Wild game",
      "Mushroom dishes",
      "Aged Gouda"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "moss-wood-margaret-river-2021",
    "name": "Margaret River",
    "producer": "Moss Wood",
    "vintage": 2021,
    "type": "Red",
    "grape": "Cabernet Sauvignon",
    "grapes": [
      "Cabernet Sauvignon"
    ],
    "region": "Margaret River",
    "subRegion": "Margaret River",
    "country": "Australia",
    "countryCode": "AU",
    "appellation": "Margaret River GI",
    "alcoholContent": "14%",
    "price": 35,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Margaret%20River%20Moss%20Wood",
    "scores": [
      {
        "source": "Wine Enthusiast",
        "score": 86,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Wine Spectator",
        "score": 88,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Robert Parker",
        "score": 86,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Tim Atkin",
        "score": 89,
        "maxScore": 100,
        "vintage": 2021
      }
    ],
    "aggregateScore": 87,
    "badges": [],
    "tastingNotes": "Delicate raspberry, rose petal, and forest floor. Silky and refined with beautiful finesse.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "de-bortoli-yarra-valley-2019",
    "name": "Yarra Valley",
    "producer": "De Bortoli",
    "vintage": 2019,
    "type": "Red",
    "grape": "Pinot Noir",
    "grapes": [
      "Pinot Noir"
    ],
    "region": "Yarra Valley",
    "subRegion": "Yarra Valley",
    "country": "Australia",
    "countryCode": "AU",
    "appellation": "Yarra Valley GI",
    "alcoholContent": "15%",
    "price": 133,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Yarra%20Valley%20De%20Bortoli",
    "scores": [
      {
        "source": "Tim Atkin",
        "score": 91,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2019
      },
      {
        "source": "Vivino",
        "score": 4.6,
        "maxScore": 5,
        "vintage": 2019
      }
    ],
    "aggregateScore": 91,
    "badges": [],
    "tastingNotes": "Dense blackberry, smoked meat, and pepper. Concentrated and intense with great depth.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "giant-steps-yarra-valley-2021",
    "name": "Yarra Valley",
    "producer": "Giant Steps",
    "vintage": 2021,
    "type": "Red",
    "grape": "Pinot Noir",
    "grapes": [
      "Pinot Noir"
    ],
    "region": "Yarra Valley",
    "subRegion": "Yarra Valley",
    "country": "Australia",
    "countryCode": "AU",
    "appellation": "Yarra Valley GI",
    "alcoholContent": "14%",
    "price": 28,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Yarra%20Valley%20Giant%20Steps",
    "scores": [
      {
        "source": "Decanter",
        "score": 87,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Wine Spectator",
        "score": 88,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Robert Parker",
        "score": 88,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Tim Atkin",
        "score": 88,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Wine Enthusiast",
        "score": 86,
        "maxScore": 100,
        "vintage": 2021
      }
    ],
    "aggregateScore": 87,
    "badges": [],
    "tastingNotes": "Delicate raspberry, rose petal, and forest floor. Silky and refined with beautiful finesse.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Wild game",
      "Mushroom dishes",
      "Aged Gouda"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "yering-station-yarra-valley-2021",
    "name": "Yarra Valley",
    "producer": "Yering Station",
    "vintage": 2021,
    "type": "Red",
    "grape": "Pinot Noir",
    "grapes": [
      "Pinot Noir"
    ],
    "region": "Yarra Valley",
    "subRegion": "Yarra Valley",
    "country": "Australia",
    "countryCode": "AU",
    "appellation": "Yarra Valley GI",
    "alcoholContent": "15%",
    "price": 18,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Yarra%20Valley%20Yering%20Station",
    "scores": [
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2021
      },
      {
        "source": "Wine Spectator",
        "score": 85,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Vivino",
        "score": 4.2,
        "maxScore": 5,
        "vintage": 2021
      },
      {
        "source": "Tim Atkin",
        "score": 87,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Robert Parker",
        "score": 86,
        "maxScore": 100,
        "vintage": 2021
      }
    ],
    "aggregateScore": 85,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Complex aromas of blackberry, plum, and earth. Medium-to-full body with velvety texture.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "tyrrell-s-s-millon-2020",
    "name": "Sémillon",
    "producer": "Tyrrell's",
    "vintage": 2020,
    "type": "White",
    "grape": "Sémillon",
    "grapes": [
      "Sémillon"
    ],
    "region": "Hunter Valley",
    "subRegion": "Hunter Valley",
    "country": "Australia",
    "countryCode": "AU",
    "appellation": "Hunter Valley GI",
    "alcoholContent": "13%",
    "price": 146,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=S%C3%A9millon%20Tyrrell's",
    "scores": [
      {
        "source": "Robert Parker",
        "score": 91,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Decanter",
        "score": 90,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Vivino",
        "score": 4.6,
        "maxScore": 5,
        "vintage": 2020
      },
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2020
      },
      {
        "source": "Wine Spectator",
        "score": 90,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "James Suckling",
        "score": 93,
        "maxScore": 100,
        "vintage": 2020
      }
    ],
    "aggregateScore": 91,
    "badges": [],
    "tastingNotes": "Rich stone fruit, honey, and toasted almond. Full-bodied with buttery texture and long finish.",
    "editorial": "A beautifully crafted white wine that showcases the producer's commitment to quality. The balance between fruit expression and mineral complexity speaks to thoughtful winemaking, while the acidity backbone ensures freshness and food-friendliness. This is the kind of wine that converts casual drinkers into enthusiasts.",
    "pairings": [
      "Roast chicken",
      "Pasta with cream sauce",
      "Sushi"
    ],
    "servingTemp": "8-12°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "brokenwood-s-millon-2018",
    "name": "Sémillon",
    "producer": "Brokenwood",
    "vintage": 2018,
    "type": "White",
    "grape": "Sémillon",
    "grapes": [
      "Sémillon"
    ],
    "region": "Hunter Valley",
    "subRegion": "Hunter Valley",
    "country": "Australia",
    "countryCode": "AU",
    "appellation": "Hunter Valley GI",
    "alcoholContent": "13%",
    "price": 18,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=S%C3%A9millon%20Brokenwood",
    "scores": [
      {
        "source": "Decanter",
        "score": 85,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Tim Atkin",
        "score": 86,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Wine Spectator",
        "score": 83,
        "maxScore": 100,
        "vintage": 2018
      }
    ],
    "aggregateScore": 85,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Crisp citrus, green apple, and mineral notes. Clean and refreshing with bright acidity.",
    "editorial": "A beautifully crafted white wine that showcases the producer's commitment to quality. The balance between fruit expression and mineral complexity speaks to thoughtful winemaking, while the acidity backbone ensures freshness and food-friendliness. This is the kind of wine that converts casual drinkers into enthusiasts.",
    "pairings": [
      "Roast chicken",
      "Pasta with cream sauce",
      "Sushi"
    ],
    "servingTemp": "8-12°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "mount-pleasant-s-millon-2018",
    "name": "Sémillon",
    "producer": "Mount Pleasant",
    "vintage": 2018,
    "type": "White",
    "grape": "Sémillon",
    "grapes": [
      "Sémillon"
    ],
    "region": "Hunter Valley",
    "subRegion": "Hunter Valley",
    "country": "Australia",
    "countryCode": "AU",
    "appellation": "Hunter Valley GI",
    "alcoholContent": "15%",
    "price": 62,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=S%C3%A9millon%20Mount%20Pleasant",
    "scores": [
      {
        "source": "Wine Enthusiast",
        "score": 90,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Wine Spectator",
        "score": 91,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Vivino",
        "score": 4.6,
        "maxScore": 5,
        "vintage": 2018
      },
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2018
      },
      {
        "source": "Decanter",
        "score": 88,
        "maxScore": 100,
        "vintage": 2018
      }
    ],
    "aggregateScore": 90,
    "badges": [],
    "tastingNotes": "Rich stone fruit, honey, and toasted almond. Full-bodied with buttery texture and long finish.",
    "editorial": "A beautifully crafted white wine that showcases the producer's commitment to quality. The balance between fruit expression and mineral complexity speaks to thoughtful winemaking, while the acidity backbone ensures freshness and food-friendliness. This is the kind of wine that converts casual drinkers into enthusiasts.",
    "pairings": [
      "Roast chicken",
      "Pasta with cream sauce",
      "Sushi"
    ],
    "servingTemp": "8-12°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "zuccardi-uco-valley-2021",
    "name": "Uco Valley",
    "producer": "Zuccardi",
    "vintage": 2021,
    "type": "Red",
    "grape": "Malbec",
    "grapes": [
      "Malbec"
    ],
    "region": "Mendoza",
    "subRegion": "Uco Valley",
    "country": "Argentina",
    "countryCode": "AR",
    "appellation": "Uco Valley",
    "alcoholContent": "14%",
    "price": 181,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Uco%20Valley%20Zuccardi",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 90,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Robert Parker",
        "score": 91,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "James Suckling",
        "score": 90,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Tim Atkin",
        "score": 92,
        "maxScore": 100,
        "vintage": 2021
      }
    ],
    "aggregateScore": 91,
    "badges": [],
    "tastingNotes": "Ripe cherry, tobacco, and leather. Elegant and structured with excellent aging potential.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "trapiche-uco-valley-2022",
    "name": "Uco Valley",
    "producer": "Trapiche",
    "vintage": 2022,
    "type": "Red",
    "grape": "Malbec",
    "grapes": [
      "Malbec"
    ],
    "region": "Mendoza",
    "subRegion": "Uco Valley",
    "country": "Argentina",
    "countryCode": "AR",
    "appellation": "Uco Valley",
    "alcoholContent": "13%",
    "price": 71,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Uco%20Valley%20Trapiche",
    "scores": [
      {
        "source": "Tim Atkin",
        "score": 88,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "James Suckling",
        "score": 91,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Vivino",
        "score": 4.5,
        "maxScore": 5,
        "vintage": 2022
      }
    ],
    "aggregateScore": 90,
    "badges": [],
    "tastingNotes": "Delicate raspberry, rose petal, and forest floor. Silky and refined with beautiful finesse.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "norton-uco-valley-2019",
    "name": "Uco Valley",
    "producer": "Norton",
    "vintage": 2019,
    "type": "Red",
    "grape": "Malbec",
    "grapes": [
      "Malbec"
    ],
    "region": "Mendoza",
    "subRegion": "Uco Valley",
    "country": "Argentina",
    "countryCode": "AR",
    "appellation": "Uco Valley",
    "alcoholContent": "14%",
    "price": 12,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Uco%20Valley%20Norton",
    "scores": [
      {
        "source": "Wine Enthusiast",
        "score": 85,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "James Suckling",
        "score": 84,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Robert Parker",
        "score": 87,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Tim Atkin",
        "score": 85,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Wine Spectator",
        "score": 85,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2019
      }
    ],
    "aggregateScore": 85,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Vibrant red fruit, cedar, and vanilla. Smooth and approachable with a spicy finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Wild game",
      "Mushroom dishes",
      "Aged Gouda"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "luigi-bosca-uco-valley-2019",
    "name": "Uco Valley",
    "producer": "Luigi Bosca",
    "vintage": 2019,
    "type": "Red",
    "grape": "Malbec",
    "grapes": [
      "Malbec"
    ],
    "region": "Mendoza",
    "subRegion": "Uco Valley",
    "country": "Argentina",
    "countryCode": "AR",
    "appellation": "Uco Valley",
    "alcoholContent": "15%",
    "price": 103,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Uco%20Valley%20Luigi%20Bosca",
    "scores": [
      {
        "source": "Tim Atkin",
        "score": 91,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Wine Enthusiast",
        "score": 89,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "James Suckling",
        "score": 89,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 90,
    "badges": [],
    "tastingNotes": "Rich dark fruit, spice, and oak. Full-bodied with firm tannins and a long finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "clos-de-los-siete-uco-valley-2020",
    "name": "Uco Valley",
    "producer": "Clos de los Siete",
    "vintage": 2020,
    "type": "Red",
    "grape": "Malbec",
    "grapes": [
      "Malbec"
    ],
    "region": "Mendoza",
    "subRegion": "Uco Valley",
    "country": "Argentina",
    "countryCode": "AR",
    "appellation": "Uco Valley",
    "alcoholContent": "15%",
    "price": 152,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Uco%20Valley%20Clos%20de%20los%20Siete",
    "scores": [
      {
        "source": "Decanter",
        "score": 90,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Tim Atkin",
        "score": 92,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "James Suckling",
        "score": 89,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Vivino",
        "score": 4.7,
        "maxScore": 5,
        "vintage": 2020
      }
    ],
    "aggregateScore": 91,
    "badges": [],
    "tastingNotes": "Dense blackberry, smoked meat, and pepper. Concentrated and intense with great depth.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Wild game",
      "Mushroom dishes",
      "Aged Gouda"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "zuccardi-luj-n-de-cuyo-2018",
    "name": "Luján de Cuyo",
    "producer": "Zuccardi",
    "vintage": 2018,
    "type": "Red",
    "grape": "Malbec",
    "grapes": [
      "Malbec"
    ],
    "region": "Mendoza",
    "subRegion": "Luján de Cuyo",
    "country": "Argentina",
    "countryCode": "AR",
    "appellation": "Luján de Cuyo",
    "alcoholContent": "15%",
    "price": 71,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Luj%C3%A1n%20de%20Cuyo%20Zuccardi",
    "scores": [
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2018
      },
      {
        "source": "James Suckling",
        "score": 87,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Robert Parker",
        "score": 91,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Wine Enthusiast",
        "score": 89,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Decanter",
        "score": 88,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Wine Spectator",
        "score": 90,
        "maxScore": 100,
        "vintage": 2018
      }
    ],
    "aggregateScore": 89,
    "badges": [],
    "tastingNotes": "Dense blackberry, smoked meat, and pepper. Concentrated and intense with great depth.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "trapiche-luj-n-de-cuyo-2019",
    "name": "Luján de Cuyo",
    "producer": "Trapiche",
    "vintage": 2019,
    "type": "Red",
    "grape": "Malbec",
    "grapes": [
      "Malbec"
    ],
    "region": "Mendoza",
    "subRegion": "Luján de Cuyo",
    "country": "Argentina",
    "countryCode": "AR",
    "appellation": "Luján de Cuyo",
    "alcoholContent": "15%",
    "price": 49,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Luj%C3%A1n%20de%20Cuyo%20Trapiche",
    "scores": [
      {
        "source": "Wine Enthusiast",
        "score": 89,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Wine Spectator",
        "score": 86,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2019
      },
      {
        "source": "Vivino",
        "score": 4.4,
        "maxScore": 5,
        "vintage": 2019
      },
      {
        "source": "Tim Atkin",
        "score": 87,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Robert Parker",
        "score": 89,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 87,
    "badges": [],
    "tastingNotes": "Lush plum, mocha, and toasted oak. Generous and warming with a long, sweet finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "norton-luj-n-de-cuyo-2022",
    "name": "Luján de Cuyo",
    "producer": "Norton",
    "vintage": 2022,
    "type": "Red",
    "grape": "Malbec",
    "grapes": [
      "Malbec"
    ],
    "region": "Mendoza",
    "subRegion": "Luján de Cuyo",
    "country": "Argentina",
    "countryCode": "AR",
    "appellation": "Luján de Cuyo",
    "alcoholContent": "15%",
    "price": 16,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Luj%C3%A1n%20de%20Cuyo%20Norton",
    "scores": [
      {
        "source": "James Suckling",
        "score": 83,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Wine Spectator",
        "score": 87,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Vivino",
        "score": 4.2,
        "maxScore": 5,
        "vintage": 2022
      },
      {
        "source": "Tim Atkin",
        "score": 87,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Robert Parker",
        "score": 86,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Decanter",
        "score": 87,
        "maxScore": 100,
        "vintage": 2022
      }
    ],
    "aggregateScore": 86,
    "badges": [],
    "tastingNotes": "Dense blackberry, smoked meat, and pepper. Concentrated and intense with great depth.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Wild game",
      "Mushroom dishes",
      "Aged Gouda"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "luigi-bosca-luj-n-de-cuyo-2021",
    "name": "Luján de Cuyo",
    "producer": "Luigi Bosca",
    "vintage": 2021,
    "type": "Red",
    "grape": "Malbec",
    "grapes": [
      "Malbec"
    ],
    "region": "Mendoza",
    "subRegion": "Luján de Cuyo",
    "country": "Argentina",
    "countryCode": "AR",
    "appellation": "Luján de Cuyo",
    "alcoholContent": "13%",
    "price": 119,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Luj%C3%A1n%20de%20Cuyo%20Luigi%20Bosca",
    "scores": [
      {
        "source": "Jancis Robinson",
        "score": 19,
        "maxScore": 20,
        "vintage": 2021
      },
      {
        "source": "Vivino",
        "score": 4.5,
        "maxScore": 5,
        "vintage": 2021
      },
      {
        "source": "Wine Spectator",
        "score": 91,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Tim Atkin",
        "score": 90,
        "maxScore": 100,
        "vintage": 2021
      }
    ],
    "aggregateScore": 92,
    "badges": [],
    "tastingNotes": "Rich dark fruit, spice, and oak. Full-bodied with firm tannins and a long finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "clos-de-los-siete-luj-n-de-cuyo-2022",
    "name": "Luján de Cuyo",
    "producer": "Clos de los Siete",
    "vintage": 2022,
    "type": "Red",
    "grape": "Malbec",
    "grapes": [
      "Malbec"
    ],
    "region": "Mendoza",
    "subRegion": "Luján de Cuyo",
    "country": "Argentina",
    "countryCode": "AR",
    "appellation": "Luján de Cuyo",
    "alcoholContent": "14%",
    "price": 20,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Luj%C3%A1n%20de%20Cuyo%20Clos%20de%20los%20Siete",
    "scores": [
      {
        "source": "Tim Atkin",
        "score": 85,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Wine Enthusiast",
        "score": 86,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Vivino",
        "score": 4.3,
        "maxScore": 5,
        "vintage": 2022
      },
      {
        "source": "Robert Parker",
        "score": 84,
        "maxScore": 100,
        "vintage": 2022
      }
    ],
    "aggregateScore": 85,
    "badges": [],
    "tastingNotes": "Ripe cherry, tobacco, and leather. Elegant and structured with excellent aging potential.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "colom-torront-s-2021",
    "name": "Torrontés",
    "producer": "Colomé",
    "vintage": 2021,
    "type": "White",
    "grape": "Torrontés",
    "grapes": [
      "Torrontés"
    ],
    "region": "Salta",
    "subRegion": "Cafayate",
    "country": "Argentina",
    "countryCode": "AR",
    "appellation": "Cafayate",
    "alcoholContent": "13%",
    "price": 59,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Torront%C3%A9s%20Colom%C3%A9",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 87,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Wine Enthusiast",
        "score": 87,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Robert Parker",
        "score": 90,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "James Suckling",
        "score": 91,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Tim Atkin",
        "score": 87,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Decanter",
        "score": 91,
        "maxScore": 100,
        "vintage": 2021
      }
    ],
    "aggregateScore": 89,
    "badges": [],
    "tastingNotes": "Rich stone fruit, honey, and toasted almond. Full-bodied with buttery texture and long finish.",
    "editorial": "A beautifully crafted white wine that showcases the producer's commitment to quality. The balance between fruit expression and mineral complexity speaks to thoughtful winemaking, while the acidity backbone ensures freshness and food-friendliness. This is the kind of wine that converts casual drinkers into enthusiasts.",
    "pairings": [
      "Roast chicken",
      "Pasta with cream sauce",
      "Sushi"
    ],
    "servingTemp": "8-12°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "el-esteco-torront-s-2018",
    "name": "Torrontés",
    "producer": "El Esteco",
    "vintage": 2018,
    "type": "White",
    "grape": "Torrontés",
    "grapes": [
      "Torrontés"
    ],
    "region": "Salta",
    "subRegion": "Cafayate",
    "country": "Argentina",
    "countryCode": "AR",
    "appellation": "Cafayate",
    "alcoholContent": "15%",
    "price": 25,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Torront%C3%A9s%20El%20Esteco",
    "scores": [
      {
        "source": "James Suckling",
        "score": 83,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Decanter",
        "score": 86,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Tim Atkin",
        "score": 85,
        "maxScore": 100,
        "vintage": 2018
      }
    ],
    "aggregateScore": 85,
    "badges": [],
    "tastingNotes": "Steely and precise with notes of green apple, chalk, and lemon zest. Electric acidity.",
    "editorial": "A beautifully crafted white wine that showcases the producer's commitment to quality. The balance between fruit expression and mineral complexity speaks to thoughtful winemaking, while the acidity backbone ensures freshness and food-friendliness. This is the kind of wine that converts casual drinkers into enthusiasts.",
    "pairings": [
      "Grilled fish",
      "Shellfish",
      "Goat cheese"
    ],
    "servingTemp": "8-12°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "montes-alpha-colchagua-valley-2020",
    "name": "Colchagua Valley",
    "producer": "Montes Alpha",
    "vintage": 2020,
    "type": "Red",
    "grape": "Carmenère",
    "grapes": [
      "Carmenère"
    ],
    "region": "Colchagua Valley",
    "subRegion": "Apalta",
    "country": "Chile",
    "countryCode": "CL",
    "appellation": "Colchagua Valley DO",
    "alcoholContent": "14%",
    "price": 12,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Colchagua%20Valley%20Montes%20Alpha",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 83,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "James Suckling",
        "score": 84,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Tim Atkin",
        "score": 87,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Decanter",
        "score": 86,
        "maxScore": 100,
        "vintage": 2020
      }
    ],
    "aggregateScore": 85,
    "badges": [],
    "tastingNotes": "Delicate raspberry, rose petal, and forest floor. Silky and refined with beautiful finesse.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Wild game",
      "Mushroom dishes",
      "Aged Gouda"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "casa-lapostolle-colchagua-valley-2021",
    "name": "Colchagua Valley",
    "producer": "Casa Lapostolle",
    "vintage": 2021,
    "type": "Red",
    "grape": "Carmenère",
    "grapes": [
      "Carmenère"
    ],
    "region": "Colchagua Valley",
    "subRegion": "Apalta",
    "country": "Chile",
    "countryCode": "CL",
    "appellation": "Colchagua Valley DO",
    "alcoholContent": "14%",
    "price": 68,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Colchagua%20Valley%20Casa%20Lapostolle",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 89,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Robert Parker",
        "score": 89,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2021
      }
    ],
    "aggregateScore": 88,
    "badges": [],
    "tastingNotes": "Vibrant red fruit, cedar, and vanilla. Smooth and approachable with a spicy finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "clos-apalta-colchagua-valley-2019",
    "name": "Colchagua Valley",
    "producer": "Clos Apalta",
    "vintage": 2019,
    "type": "Red",
    "grape": "Carmenère",
    "grapes": [
      "Carmenère"
    ],
    "region": "Colchagua Valley",
    "subRegion": "Apalta",
    "country": "Chile",
    "countryCode": "CL",
    "appellation": "Colchagua Valley DO",
    "alcoholContent": "15%",
    "price": 100,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Colchagua%20Valley%20Clos%20Apalta",
    "scores": [
      {
        "source": "Decanter",
        "score": 91,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Tim Atkin",
        "score": 89,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Wine Enthusiast",
        "score": 90,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 90,
    "badges": [],
    "tastingNotes": "Bold cassis, dark chocolate, and espresso. Powerful yet balanced with polished tannins.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Wild game",
      "Mushroom dishes",
      "Aged Gouda"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "casas-del-bosque-sauvignon-blanc-2018",
    "name": "Sauvignon Blanc",
    "producer": "Casas del Bosque",
    "vintage": 2018,
    "type": "White",
    "grape": "Sauvignon Blanc",
    "grapes": [
      "Sauvignon Blanc"
    ],
    "region": "Casablanca Valley",
    "subRegion": "Casablanca",
    "country": "Chile",
    "countryCode": "CL",
    "appellation": "Casablanca Valley DO",
    "alcoholContent": "15%",
    "price": 38,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Sauvignon%20Blanc%20Casas%20del%20Bosque",
    "scores": [
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2018
      },
      {
        "source": "Wine Spectator",
        "score": 88,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Decanter",
        "score": 89,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Robert Parker",
        "score": 85,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Tim Atkin",
        "score": 86,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Wine Enthusiast",
        "score": 87,
        "maxScore": 100,
        "vintage": 2018
      }
    ],
    "aggregateScore": 87,
    "badges": [],
    "tastingNotes": "Crisp citrus, green apple, and mineral notes. Clean and refreshing with bright acidity.",
    "editorial": "A beautifully crafted white wine that showcases the producer's commitment to quality. The balance between fruit expression and mineral complexity speaks to thoughtful winemaking, while the acidity backbone ensures freshness and food-friendliness. This is the kind of wine that converts casual drinkers into enthusiasts.",
    "pairings": [
      "Grilled fish",
      "Shellfish",
      "Goat cheese"
    ],
    "servingTemp": "8-12°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "vi-a-casablanca-sauvignon-blanc-2018",
    "name": "Sauvignon Blanc",
    "producer": "Viña Casablanca",
    "vintage": 2018,
    "type": "White",
    "grape": "Sauvignon Blanc",
    "grapes": [
      "Sauvignon Blanc"
    ],
    "region": "Casablanca Valley",
    "subRegion": "Casablanca",
    "country": "Chile",
    "countryCode": "CL",
    "appellation": "Casablanca Valley DO",
    "alcoholContent": "15%",
    "price": 28,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Sauvignon%20Blanc%20Vi%C3%B1a%20Casablanca",
    "scores": [
      {
        "source": "Decanter",
        "score": 88,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Tim Atkin",
        "score": 86,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "James Suckling",
        "score": 87,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2018
      },
      {
        "source": "Robert Parker",
        "score": 88,
        "maxScore": 100,
        "vintage": 2018
      }
    ],
    "aggregateScore": 88,
    "badges": [],
    "tastingNotes": "Crisp citrus, green apple, and mineral notes. Clean and refreshing with bright acidity.",
    "editorial": "A beautifully crafted white wine that showcases the producer's commitment to quality. The balance between fruit expression and mineral complexity speaks to thoughtful winemaking, while the acidity backbone ensures freshness and food-friendliness. This is the kind of wine that converts casual drinkers into enthusiasts.",
    "pairings": [
      "Roast chicken",
      "Pasta with cream sauce",
      "Sushi"
    ],
    "servingTemp": "8-12°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "villa-maria-sauvignon-blanc-2022",
    "name": "Sauvignon Blanc",
    "producer": "Villa Maria",
    "vintage": 2022,
    "type": "White",
    "grape": "Sauvignon Blanc",
    "grapes": [
      "Sauvignon Blanc"
    ],
    "region": "Marlborough",
    "subRegion": "Wairau Valley",
    "country": "New Zealand",
    "countryCode": "NZ",
    "appellation": "Marlborough",
    "alcoholContent": "13%",
    "price": 56,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Sauvignon%20Blanc%20Villa%20Maria",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 91,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Decanter",
        "score": 87,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "James Suckling",
        "score": 88,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Vivino",
        "score": 4.6,
        "maxScore": 5,
        "vintage": 2022
      }
    ],
    "aggregateScore": 90,
    "badges": [],
    "tastingNotes": "Elegant peach, white flower, and flinty minerality. Balanced and precise with great length.",
    "editorial": "A beautifully crafted white wine that showcases the producer's commitment to quality. The balance between fruit expression and mineral complexity speaks to thoughtful winemaking, while the acidity backbone ensures freshness and food-friendliness. This is the kind of wine that converts casual drinkers into enthusiasts.",
    "pairings": [
      "Grilled fish",
      "Shellfish",
      "Goat cheese"
    ],
    "servingTemp": "8-12°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "dog-point-sauvignon-blanc-2018",
    "name": "Sauvignon Blanc",
    "producer": "Dog Point",
    "vintage": 2018,
    "type": "White",
    "grape": "Sauvignon Blanc",
    "grapes": [
      "Sauvignon Blanc"
    ],
    "region": "Marlborough",
    "subRegion": "Wairau Valley",
    "country": "New Zealand",
    "countryCode": "NZ",
    "appellation": "Marlborough",
    "alcoholContent": "15%",
    "price": 12,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Sauvignon%20Blanc%20Dog%20Point",
    "scores": [
      {
        "source": "Decanter",
        "score": 83,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Tim Atkin",
        "score": 87,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "James Suckling",
        "score": 84,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2018
      },
      {
        "source": "Robert Parker",
        "score": 86,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Wine Spectator",
        "score": 84,
        "maxScore": 100,
        "vintage": 2018
      }
    ],
    "aggregateScore": 85,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Steely and precise with notes of green apple, chalk, and lemon zest. Electric acidity.",
    "editorial": "A beautifully crafted white wine that showcases the producer's commitment to quality. The balance between fruit expression and mineral complexity speaks to thoughtful winemaking, while the acidity backbone ensures freshness and food-friendliness. This is the kind of wine that converts casual drinkers into enthusiasts.",
    "pairings": [
      "Roast chicken",
      "Pasta with cream sauce",
      "Sushi"
    ],
    "servingTemp": "8-12°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "greywacke-sauvignon-blanc-2019",
    "name": "Sauvignon Blanc",
    "producer": "Greywacke",
    "vintage": 2019,
    "type": "White",
    "grape": "Sauvignon Blanc",
    "grapes": [
      "Sauvignon Blanc"
    ],
    "region": "Marlborough",
    "subRegion": "Wairau Valley",
    "country": "New Zealand",
    "countryCode": "NZ",
    "appellation": "Marlborough",
    "alcoholContent": "15%",
    "price": 171,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Sauvignon%20Blanc%20Greywacke",
    "scores": [
      {
        "source": "Decanter",
        "score": 89,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "James Suckling",
        "score": 90,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2019
      },
      {
        "source": "Robert Parker",
        "score": 89,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Wine Enthusiast",
        "score": 89,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Vivino",
        "score": 4.6,
        "maxScore": 5,
        "vintage": 2019
      }
    ],
    "aggregateScore": 90,
    "badges": [],
    "tastingNotes": "Elegant peach, white flower, and flinty minerality. Balanced and precise with great length.",
    "editorial": "A beautifully crafted white wine that showcases the producer's commitment to quality. The balance between fruit expression and mineral complexity speaks to thoughtful winemaking, while the acidity backbone ensures freshness and food-friendliness. This is the kind of wine that converts casual drinkers into enthusiasts.",
    "pairings": [
      "Salads",
      "Light appetizers",
      "Soft cheeses"
    ],
    "servingTemp": "8-12°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "craggy-range-sauvignon-blanc-2019",
    "name": "Sauvignon Blanc",
    "producer": "Craggy Range",
    "vintage": 2019,
    "type": "White",
    "grape": "Sauvignon Blanc",
    "grapes": [
      "Sauvignon Blanc"
    ],
    "region": "Marlborough",
    "subRegion": "Wairau Valley",
    "country": "New Zealand",
    "countryCode": "NZ",
    "appellation": "Marlborough",
    "alcoholContent": "14%",
    "price": 58,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Sauvignon%20Blanc%20Craggy%20Range",
    "scores": [
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2019
      },
      {
        "source": "Tim Atkin",
        "score": 87,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Decanter",
        "score": 89,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "James Suckling",
        "score": 90,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 89,
    "badges": [],
    "tastingNotes": "Rich stone fruit, honey, and toasted almond. Full-bodied with buttery texture and long finish.",
    "editorial": "A beautifully crafted white wine that showcases the producer's commitment to quality. The balance between fruit expression and mineral complexity speaks to thoughtful winemaking, while the acidity backbone ensures freshness and food-friendliness. This is the kind of wine that converts casual drinkers into enthusiasts.",
    "pairings": [
      "Salads",
      "Light appetizers",
      "Soft cheeses"
    ],
    "servingTemp": "8-12°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "felton-road-central-otago-2020",
    "name": "Central Otago",
    "producer": "Felton Road",
    "vintage": 2020,
    "type": "Red",
    "grape": "Pinot Noir",
    "grapes": [
      "Pinot Noir"
    ],
    "region": "Central Otago",
    "subRegion": "Bannockburn",
    "country": "New Zealand",
    "countryCode": "NZ",
    "appellation": "Central Otago",
    "alcoholContent": "14%",
    "price": 41,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Central%20Otago%20Felton%20Road",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 86,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Vivino",
        "score": 4.3,
        "maxScore": 5,
        "vintage": 2020
      },
      {
        "source": "Robert Parker",
        "score": 89,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Decanter",
        "score": 86,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Tim Atkin",
        "score": 89,
        "maxScore": 100,
        "vintage": 2020
      }
    ],
    "aggregateScore": 87,
    "badges": [],
    "tastingNotes": "Delicate raspberry, rose petal, and forest floor. Silky and refined with beautiful finesse.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "rippon-central-otago-2019",
    "name": "Central Otago",
    "producer": "Rippon",
    "vintage": 2019,
    "type": "Red",
    "grape": "Pinot Noir",
    "grapes": [
      "Pinot Noir"
    ],
    "region": "Central Otago",
    "subRegion": "Bannockburn",
    "country": "New Zealand",
    "countryCode": "NZ",
    "appellation": "Central Otago",
    "alcoholContent": "15%",
    "price": 18,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Central%20Otago%20Rippon",
    "scores": [
      {
        "source": "James Suckling",
        "score": 84,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Tim Atkin",
        "score": 83,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Wine Spectator",
        "score": 85,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 84,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Lush plum, mocha, and toasted oak. Generous and warming with a long, sweet finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "burn-cottage-central-otago-2021",
    "name": "Central Otago",
    "producer": "Burn Cottage",
    "vintage": 2021,
    "type": "Red",
    "grape": "Pinot Noir",
    "grapes": [
      "Pinot Noir"
    ],
    "region": "Central Otago",
    "subRegion": "Bannockburn",
    "country": "New Zealand",
    "countryCode": "NZ",
    "appellation": "Central Otago",
    "alcoholContent": "14%",
    "price": 138,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Central%20Otago%20Burn%20Cottage",
    "scores": [
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2021
      },
      {
        "source": "James Suckling",
        "score": 93,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Decanter",
        "score": 89,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Vivino",
        "score": 4.5,
        "maxScore": 5,
        "vintage": 2021
      }
    ],
    "aggregateScore": 91,
    "badges": [],
    "tastingNotes": "Ripe cherry, tobacco, and leather. Elegant and structured with excellent aging potential.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Wild game",
      "Mushroom dishes",
      "Aged Gouda"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "rust-en-vrede-stellenbosch-2022",
    "name": "Stellenbosch",
    "producer": "Rust en Vrede",
    "vintage": 2022,
    "type": "Red",
    "grape": "Pinotage",
    "grapes": [
      "Pinotage"
    ],
    "region": "Stellenbosch",
    "subRegion": "Stellenbosch",
    "country": "South Africa",
    "countryCode": "ZA",
    "appellation": "Stellenbosch WO",
    "alcoholContent": "15%",
    "price": 23,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Stellenbosch%20Rust%20en%20Vrede",
    "scores": [
      {
        "source": "Decanter",
        "score": 85,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Vivino",
        "score": 4.4,
        "maxScore": 5,
        "vintage": 2022
      },
      {
        "source": "Wine Spectator",
        "score": 83,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2022
      },
      {
        "source": "James Suckling",
        "score": 83,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Tim Atkin",
        "score": 85,
        "maxScore": 100,
        "vintage": 2022
      }
    ],
    "aggregateScore": 85,
    "badges": [],
    "tastingNotes": "Delicate raspberry, rose petal, and forest floor. Silky and refined with beautiful finesse.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Wild game",
      "Mushroom dishes",
      "Aged Gouda"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "meerlust-stellenbosch-2019",
    "name": "Stellenbosch",
    "producer": "Meerlust",
    "vintage": 2019,
    "type": "Red",
    "grape": "Pinotage",
    "grapes": [
      "Pinotage"
    ],
    "region": "Stellenbosch",
    "subRegion": "Stellenbosch",
    "country": "South Africa",
    "countryCode": "ZA",
    "appellation": "Stellenbosch WO",
    "alcoholContent": "13%",
    "price": 41,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Stellenbosch%20Meerlust",
    "scores": [
      {
        "source": "Tim Atkin",
        "score": 87,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Robert Parker",
        "score": 86,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2019
      },
      {
        "source": "Decanter",
        "score": 85,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "James Suckling",
        "score": 88,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Vivino",
        "score": 4.4,
        "maxScore": 5,
        "vintage": 2019
      }
    ],
    "aggregateScore": 87,
    "badges": [],
    "tastingNotes": "Rich dark fruit, spice, and oak. Full-bodied with firm tannins and a long finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Wild game",
      "Mushroom dishes",
      "Aged Gouda"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "warwick-stellenbosch-2018",
    "name": "Stellenbosch",
    "producer": "Warwick",
    "vintage": 2018,
    "type": "Red",
    "grape": "Pinotage",
    "grapes": [
      "Pinotage"
    ],
    "region": "Stellenbosch",
    "subRegion": "Stellenbosch",
    "country": "South Africa",
    "countryCode": "ZA",
    "appellation": "Stellenbosch WO",
    "alcoholContent": "15%",
    "price": 8,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Stellenbosch%20Warwick",
    "scores": [
      {
        "source": "Wine Enthusiast",
        "score": 85,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Vivino",
        "score": 4.2,
        "maxScore": 5,
        "vintage": 2018
      },
      {
        "source": "James Suckling",
        "score": 86,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Robert Parker",
        "score": 83,
        "maxScore": 100,
        "vintage": 2018
      }
    ],
    "aggregateScore": 85,
    "badges": [],
    "tastingNotes": "Lush plum, mocha, and toasted oak. Generous and warming with a long, sweet finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "hamilton-russell-walker-bay-2018",
    "name": "Walker Bay",
    "producer": "Hamilton Russell",
    "vintage": 2018,
    "type": "Red",
    "grape": "Pinot Noir",
    "grapes": [
      "Pinot Noir"
    ],
    "region": "Walker Bay",
    "subRegion": "Hemel-en-Aarde",
    "country": "South Africa",
    "countryCode": "ZA",
    "appellation": "Walker Bay WO",
    "alcoholContent": "14%",
    "price": 21,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Walker%20Bay%20Hamilton%20Russell",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 83,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Robert Parker",
        "score": 84,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Tim Atkin",
        "score": 87,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "James Suckling",
        "score": 87,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Vivino",
        "score": 4.3,
        "maxScore": 5,
        "vintage": 2018
      }
    ],
    "aggregateScore": 85,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Dense blackberry, smoked meat, and pepper. Concentrated and intense with great depth.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "bouchard-finlayson-walker-bay-2019",
    "name": "Walker Bay",
    "producer": "Bouchard Finlayson",
    "vintage": 2019,
    "type": "Red",
    "grape": "Pinot Noir",
    "grapes": [
      "Pinot Noir"
    ],
    "region": "Walker Bay",
    "subRegion": "Hemel-en-Aarde",
    "country": "South Africa",
    "countryCode": "ZA",
    "appellation": "Walker Bay WO",
    "alcoholContent": "15%",
    "price": 17,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Walker%20Bay%20Bouchard%20Finlayson",
    "scores": [
      {
        "source": "Wine Spectator",
        "score": 85,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Decanter",
        "score": 87,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2019
      },
      {
        "source": "James Suckling",
        "score": 83,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 85,
    "badges": [],
    "tastingNotes": "Lush plum, mocha, and toasted oak. Generous and warming with a long, sweet finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Wild game",
      "Mushroom dishes",
      "Aged Gouda"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "robert-weil-riesling-2020",
    "name": "Riesling",
    "producer": "Robert Weil",
    "vintage": 2020,
    "type": "White",
    "grape": "Riesling",
    "grapes": [
      "Riesling"
    ],
    "region": "Rheingau",
    "subRegion": "Rheingau",
    "country": "Germany",
    "countryCode": "DE",
    "appellation": "Rheingau",
    "alcoholContent": "14%",
    "price": 22,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Riesling%20Robert%20Weil",
    "scores": [
      {
        "source": "Wine Enthusiast",
        "score": 84,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Decanter",
        "score": 86,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "James Suckling",
        "score": 86,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Tim Atkin",
        "score": 83,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2020
      }
    ],
    "aggregateScore": 85,
    "badges": [],
    "tastingNotes": "Rich stone fruit, honey, and toasted almond. Full-bodied with buttery texture and long finish.",
    "editorial": "A beautifully crafted white wine that showcases the producer's commitment to quality. The balance between fruit expression and mineral complexity speaks to thoughtful winemaking, while the acidity backbone ensures freshness and food-friendliness. This is the kind of wine that converts casual drinkers into enthusiasts.",
    "pairings": [
      "Grilled fish",
      "Shellfish",
      "Goat cheese"
    ],
    "servingTemp": "8-12°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "schloss-johannisberg-riesling-2020",
    "name": "Riesling",
    "producer": "Schloss Johannisberg",
    "vintage": 2020,
    "type": "White",
    "grape": "Riesling",
    "grapes": [
      "Riesling"
    ],
    "region": "Rheingau",
    "subRegion": "Rheingau",
    "country": "Germany",
    "countryCode": "DE",
    "appellation": "Rheingau",
    "alcoholContent": "13%",
    "price": 24,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Riesling%20Schloss%20Johannisberg",
    "scores": [
      {
        "source": "Decanter",
        "score": 87,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2020
      },
      {
        "source": "James Suckling",
        "score": 87,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Robert Parker",
        "score": 87,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Vivino",
        "score": 4.3,
        "maxScore": 5,
        "vintage": 2020
      }
    ],
    "aggregateScore": 86,
    "badges": [],
    "tastingNotes": "Tropical mango, pineapple, and vanilla. Round and generous with a creamy palate.",
    "editorial": "A beautifully crafted white wine that showcases the producer's commitment to quality. The balance between fruit expression and mineral complexity speaks to thoughtful winemaking, while the acidity backbone ensures freshness and food-friendliness. This is the kind of wine that converts casual drinkers into enthusiasts.",
    "pairings": [
      "Roast chicken",
      "Pasta with cream sauce",
      "Sushi"
    ],
    "servingTemp": "8-12°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "georg-breuer-riesling-2022",
    "name": "Riesling",
    "producer": "Georg Breuer",
    "vintage": 2022,
    "type": "White",
    "grape": "Riesling",
    "grapes": [
      "Riesling"
    ],
    "region": "Rheingau",
    "subRegion": "Rheingau",
    "country": "Germany",
    "countryCode": "DE",
    "appellation": "Rheingau",
    "alcoholContent": "14%",
    "price": 72,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Riesling%20Georg%20Breuer",
    "scores": [
      {
        "source": "Wine Enthusiast",
        "score": 88,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Wine Spectator",
        "score": 87,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Vivino",
        "score": 4.5,
        "maxScore": 5,
        "vintage": 2022
      }
    ],
    "aggregateScore": 88,
    "badges": [],
    "tastingNotes": "Crisp citrus, green apple, and mineral notes. Clean and refreshing with bright acidity.",
    "editorial": "A beautifully crafted white wine that showcases the producer's commitment to quality. The balance between fruit expression and mineral complexity speaks to thoughtful winemaking, while the acidity backbone ensures freshness and food-friendliness. This is the kind of wine that converts casual drinkers into enthusiasts.",
    "pairings": [
      "Salads",
      "Light appetizers",
      "Soft cheeses"
    ],
    "servingTemp": "8-12°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "dr-loosen-riesling-2018",
    "name": "Riesling",
    "producer": "Dr. Loosen",
    "vintage": 2018,
    "type": "White",
    "grape": "Riesling",
    "grapes": [
      "Riesling"
    ],
    "region": "Mosel",
    "subRegion": "Mosel",
    "country": "Germany",
    "countryCode": "DE",
    "appellation": "Mosel",
    "alcoholContent": "14%",
    "price": 27,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Riesling%20Dr.%20Loosen",
    "scores": [
      {
        "source": "Decanter",
        "score": 85,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Vivino",
        "score": 4.3,
        "maxScore": 5,
        "vintage": 2018
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2018
      },
      {
        "source": "Robert Parker",
        "score": 85,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "James Suckling",
        "score": 86,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Wine Enthusiast",
        "score": 87,
        "maxScore": 100,
        "vintage": 2018
      }
    ],
    "aggregateScore": 86,
    "badges": [],
    "tastingNotes": "Steely and precise with notes of green apple, chalk, and lemon zest. Electric acidity.",
    "editorial": "A beautifully crafted white wine that showcases the producer's commitment to quality. The balance between fruit expression and mineral complexity speaks to thoughtful winemaking, while the acidity backbone ensures freshness and food-friendliness. This is the kind of wine that converts casual drinkers into enthusiasts.",
    "pairings": [
      "Salads",
      "Light appetizers",
      "Soft cheeses"
    ],
    "servingTemp": "8-12°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "joh-jos-pr-m-riesling-2018",
    "name": "Riesling",
    "producer": "Joh. Jos. Prüm",
    "vintage": 2018,
    "type": "White",
    "grape": "Riesling",
    "grapes": [
      "Riesling"
    ],
    "region": "Mosel",
    "subRegion": "Mosel",
    "country": "Germany",
    "countryCode": "DE",
    "appellation": "Mosel",
    "alcoholContent": "13%",
    "price": 13,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Riesling%20Joh.%20Jos.%20Pr%C3%BCm",
    "scores": [
      {
        "source": "James Suckling",
        "score": 84,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Tim Atkin",
        "score": 86,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Robert Parker",
        "score": 85,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Wine Enthusiast",
        "score": 83,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Decanter",
        "score": 87,
        "maxScore": 100,
        "vintage": 2018
      }
    ],
    "aggregateScore": 85,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Tropical mango, pineapple, and vanilla. Round and generous with a creamy palate.",
    "editorial": "A beautifully crafted white wine that showcases the producer's commitment to quality. The balance between fruit expression and mineral complexity speaks to thoughtful winemaking, while the acidity backbone ensures freshness and food-friendliness. This is the kind of wine that converts casual drinkers into enthusiasts.",
    "pairings": [
      "Grilled fish",
      "Shellfish",
      "Goat cheese"
    ],
    "servingTemp": "8-12°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "markus-molitor-riesling-2018",
    "name": "Riesling",
    "producer": "Markus Molitor",
    "vintage": 2018,
    "type": "White",
    "grape": "Riesling",
    "grapes": [
      "Riesling"
    ],
    "region": "Mosel",
    "subRegion": "Mosel",
    "country": "Germany",
    "countryCode": "DE",
    "appellation": "Mosel",
    "alcoholContent": "14%",
    "price": 13,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Riesling%20Markus%20Molitor",
    "scores": [
      {
        "source": "Tim Atkin",
        "score": 85,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2018
      },
      {
        "source": "James Suckling",
        "score": 85,
        "maxScore": 100,
        "vintage": 2018
      }
    ],
    "aggregateScore": 85,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Tropical mango, pineapple, and vanilla. Round and generous with a creamy palate.",
    "editorial": "A beautifully crafted white wine that showcases the producer's commitment to quality. The balance between fruit expression and mineral complexity speaks to thoughtful winemaking, while the acidity backbone ensures freshness and food-friendliness. This is the kind of wine that converts casual drinkers into enthusiasts.",
    "pairings": [
      "Roast chicken",
      "Pasta with cream sauce",
      "Sushi"
    ],
    "servingTemp": "8-12°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "herdade-do-espor-o-alentejo-2022",
    "name": "Alentejo",
    "producer": "Herdade do Esporão",
    "vintage": 2022,
    "type": "Red",
    "grape": "Touriga Nacional",
    "grapes": [
      "Touriga Nacional",
      "Alicante Bouschet"
    ],
    "region": "Alentejo",
    "subRegion": "Alentejo",
    "country": "Portugal",
    "countryCode": "PT",
    "appellation": "Alentejo DOC",
    "alcoholContent": "15%",
    "price": 17,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Alentejo%20Herdade%20do%20Espor%C3%A3o",
    "scores": [
      {
        "source": "Decanter",
        "score": 85,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Wine Enthusiast",
        "score": 86,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2022
      },
      {
        "source": "James Suckling",
        "score": 87,
        "maxScore": 100,
        "vintage": 2022
      }
    ],
    "aggregateScore": 86,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Lush plum, mocha, and toasted oak. Generous and warming with a long, sweet finish.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "quinta-do-carmo-alentejo-2020",
    "name": "Alentejo",
    "producer": "Quinta do Carmo",
    "vintage": 2020,
    "type": "Red",
    "grape": "Touriga Nacional",
    "grapes": [
      "Touriga Nacional",
      "Alicante Bouschet"
    ],
    "region": "Alentejo",
    "subRegion": "Alentejo",
    "country": "Portugal",
    "countryCode": "PT",
    "appellation": "Alentejo DOC",
    "alcoholContent": "15%",
    "price": 76,
    "priceRange": "Luxury",
    "buyUrl": "https://www.wine.com/search?q=Alentejo%20Quinta%20do%20Carmo",
    "scores": [
      {
        "source": "Wine Enthusiast",
        "score": 89,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Jancis Robinson",
        "score": 18,
        "maxScore": 20,
        "vintage": 2020
      },
      {
        "source": "Decanter",
        "score": 87,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "James Suckling",
        "score": 90,
        "maxScore": 100,
        "vintage": 2020
      },
      {
        "source": "Robert Parker",
        "score": 87,
        "maxScore": 100,
        "vintage": 2020
      }
    ],
    "aggregateScore": 89,
    "badges": [],
    "tastingNotes": "Complex aromas of blackberry, plum, and earth. Medium-to-full body with velvety texture.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Grilled steak",
      "Braised lamb",
      "Hard cheeses"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "monte-da-ravasqueira-alentejo-2018",
    "name": "Alentejo",
    "producer": "Monte da Ravasqueira",
    "vintage": 2018,
    "type": "Red",
    "grape": "Touriga Nacional",
    "grapes": [
      "Touriga Nacional",
      "Alicante Bouschet"
    ],
    "region": "Alentejo",
    "subRegion": "Alentejo",
    "country": "Portugal",
    "countryCode": "PT",
    "appellation": "Alentejo DOC",
    "alcoholContent": "15%",
    "price": 30,
    "priceRange": "Premium",
    "buyUrl": "https://www.wine.com/search?q=Alentejo%20Monte%20da%20Ravasqueira",
    "scores": [
      {
        "source": "Robert Parker",
        "score": 85,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Wine Spectator",
        "score": 87,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Tim Atkin",
        "score": 87,
        "maxScore": 100,
        "vintage": 2018
      }
    ],
    "aggregateScore": 86,
    "badges": [],
    "tastingNotes": "Bold cassis, dark chocolate, and espresso. Powerful yet balanced with polished tannins.",
    "editorial": "This wine represents excellent winemaking from its region. With careful attention to vineyard management and cellar techniques, the producer has crafted a wine that balances fruit expression with structural integrity. The tannin profile suggests careful extraction and aging, while the aromatics speak to the quality of the fruit and the character of the terroir. A wine worth seeking out for both current enjoyment and medium-term aging.",
    "pairings": [
      "Roast beef",
      "Pasta with meat sauce",
      "Dark chocolate"
    ],
    "servingTemp": "16-18°C",
    "aging": "5-15 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "anselmo-mendes-alvarinho-2021",
    "name": "Alvarinho",
    "producer": "Anselmo Mendes",
    "vintage": 2021,
    "type": "White",
    "grape": "Alvarinho",
    "grapes": [
      "Alvarinho"
    ],
    "region": "Vinho Verde",
    "subRegion": "Minho",
    "country": "Portugal",
    "countryCode": "PT",
    "appellation": "Vinho Verde DOC",
    "alcoholContent": "15%",
    "price": 24,
    "priceRange": "Mid-Range",
    "buyUrl": "https://www.wine.com/search?q=Alvarinho%20Anselmo%20Mendes",
    "scores": [
      {
        "source": "Wine Enthusiast",
        "score": 87,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Decanter",
        "score": 86,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Vivino",
        "score": 4.2,
        "maxScore": 5,
        "vintage": 2021
      },
      {
        "source": "Wine Spectator",
        "score": 83,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Robert Parker",
        "score": 84,
        "maxScore": 100,
        "vintage": 2021
      },
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2021
      }
    ],
    "aggregateScore": 85,
    "badges": [],
    "tastingNotes": "Crisp citrus, green apple, and mineral notes. Clean and refreshing with bright acidity.",
    "editorial": "A beautifully crafted white wine that showcases the producer's commitment to quality. The balance between fruit expression and mineral complexity speaks to thoughtful winemaking, while the acidity backbone ensures freshness and food-friendliness. This is the kind of wine that converts casual drinkers into enthusiasts.",
    "pairings": [
      "Roast chicken",
      "Pasta with cream sauce",
      "Sushi"
    ],
    "servingTemp": "8-12°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "soalheiro-alvarinho-2022",
    "name": "Alvarinho",
    "producer": "Soalheiro",
    "vintage": 2022,
    "type": "White",
    "grape": "Alvarinho",
    "grapes": [
      "Alvarinho"
    ],
    "region": "Vinho Verde",
    "subRegion": "Minho",
    "country": "Portugal",
    "countryCode": "PT",
    "appellation": "Vinho Verde DOC",
    "alcoholContent": "14%",
    "price": 8,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Alvarinho%20Soalheiro",
    "scores": [
      {
        "source": "Tim Atkin",
        "score": 86,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Vivino",
        "score": 4.2,
        "maxScore": 5,
        "vintage": 2022
      },
      {
        "source": "Wine Enthusiast",
        "score": 84,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Decanter",
        "score": 84,
        "maxScore": 100,
        "vintage": 2022
      }
    ],
    "aggregateScore": 85,
    "badges": [
      "Best Value"
    ],
    "tastingNotes": "Steely and precise with notes of green apple, chalk, and lemon zest. Electric acidity.",
    "editorial": "A beautifully crafted white wine that showcases the producer's commitment to quality. The balance between fruit expression and mineral complexity speaks to thoughtful winemaking, while the acidity backbone ensures freshness and food-friendliness. This is the kind of wine that converts casual drinkers into enthusiasts.",
    "pairings": [
      "Roast chicken",
      "Pasta with cream sauce",
      "Sushi"
    ],
    "servingTemp": "8-12°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "br-ndlmayer-gr-ner-veltliner-2019",
    "name": "Grüner Veltliner",
    "producer": "Bründlmayer",
    "vintage": 2019,
    "type": "White",
    "grape": "Grüner Veltliner",
    "grapes": [
      "Grüner Veltliner"
    ],
    "region": "Kamptal",
    "subRegion": "Kamptal",
    "country": "Austria",
    "countryCode": "AT",
    "appellation": "Kamptal DAC",
    "alcoholContent": "13%",
    "price": 8,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Gr%C3%BCner%20Veltliner%20Br%C3%BCndlmayer",
    "scores": [
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2019
      },
      {
        "source": "Decanter",
        "score": 86,
        "maxScore": 100,
        "vintage": 2019
      },
      {
        "source": "Wine Enthusiast",
        "score": 83,
        "maxScore": 100,
        "vintage": 2019
      }
    ],
    "aggregateScore": 85,
    "badges": [],
    "tastingNotes": "Tropical mango, pineapple, and vanilla. Round and generous with a creamy palate.",
    "editorial": "A beautifully crafted white wine that showcases the producer's commitment to quality. The balance between fruit expression and mineral complexity speaks to thoughtful winemaking, while the acidity backbone ensures freshness and food-friendliness. This is the kind of wine that converts casual drinkers into enthusiasts.",
    "pairings": [
      "Salads",
      "Light appetizers",
      "Soft cheeses"
    ],
    "servingTemp": "8-12°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "schloss-gobelsburg-gr-ner-veltliner-2022",
    "name": "Grüner Veltliner",
    "producer": "Schloss Gobelsburg",
    "vintage": 2022,
    "type": "White",
    "grape": "Grüner Veltliner",
    "grapes": [
      "Grüner Veltliner"
    ],
    "region": "Kamptal",
    "subRegion": "Kamptal",
    "country": "Austria",
    "countryCode": "AT",
    "appellation": "Kamptal DAC",
    "alcoholContent": "15%",
    "price": 10,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Gr%C3%BCner%20Veltliner%20Schloss%20Gobelsburg",
    "scores": [
      {
        "source": "Robert Parker",
        "score": 85,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Tim Atkin",
        "score": 87,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Wine Spectator",
        "score": 87,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "Decanter",
        "score": 85,
        "maxScore": 100,
        "vintage": 2022
      },
      {
        "source": "James Suckling",
        "score": 83,
        "maxScore": 100,
        "vintage": 2022
      }
    ],
    "aggregateScore": 85,
    "badges": [],
    "tastingNotes": "Rich stone fruit, honey, and toasted almond. Full-bodied with buttery texture and long finish.",
    "editorial": "A beautifully crafted white wine that showcases the producer's commitment to quality. The balance between fruit expression and mineral complexity speaks to thoughtful winemaking, while the acidity backbone ensures freshness and food-friendliness. This is the kind of wine that converts casual drinkers into enthusiasts.",
    "pairings": [
      "Grilled fish",
      "Shellfish",
      "Goat cheese"
    ],
    "servingTemp": "8-12°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  },
  {
    "slug": "jurtschitsch-gr-ner-veltliner-2018",
    "name": "Grüner Veltliner",
    "producer": "Jurtschitsch",
    "vintage": 2018,
    "type": "White",
    "grape": "Grüner Veltliner",
    "grapes": [
      "Grüner Veltliner"
    ],
    "region": "Kamptal",
    "subRegion": "Kamptal",
    "country": "Austria",
    "countryCode": "AT",
    "appellation": "Kamptal DAC",
    "alcoholContent": "13%",
    "price": 11,
    "priceRange": "Budget",
    "buyUrl": "https://www.wine.com/search?q=Gr%C3%BCner%20Veltliner%20Jurtschitsch",
    "scores": [
      {
        "source": "Jancis Robinson",
        "score": 17,
        "maxScore": 20,
        "vintage": 2018
      },
      {
        "source": "Wine Spectator",
        "score": 86,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "Robert Parker",
        "score": 87,
        "maxScore": 100,
        "vintage": 2018
      },
      {
        "source": "James Suckling",
        "score": 85,
        "maxScore": 100,
        "vintage": 2018
      }
    ],
    "aggregateScore": 86,
    "badges": [],
    "tastingNotes": "Zippy lime, grapefruit, and herbal notes. Light and fresh with mouthwatering acidity.",
    "editorial": "A beautifully crafted white wine that showcases the producer's commitment to quality. The balance between fruit expression and mineral complexity speaks to thoughtful winemaking, while the acidity backbone ensures freshness and food-friendliness. This is the kind of wine that converts casual drinkers into enthusiasts.",
    "pairings": [
      "Grilled fish",
      "Shellfish",
      "Goat cheese"
    ],
    "servingTemp": "8-12°C",
    "aging": "2-8 years",
    "prosAndCons": {
      "pros": [
        "Good quality for the price",
        "Well-crafted and balanced",
        "Food-friendly"
      ],
      "cons": [
        "Could benefit from more aging",
        "Limited distribution"
      ]
    }
  }
];

export const countries: Country[] = [
  {
    "slug": "france",
    "name": "France",
    "emoji": "🇫🇷",
    "regions": [
      "Bordeaux",
      "Burgundy",
      "Champagne",
      "Rhône Valley",
      "Loire Valley",
      "Alsace",
      "Languedoc-Roussillon",
      "Provence"
    ],
    "description": "France is the spiritual home of wine. From the grand châteaux of Bordeaux to the hallowed vineyards of Burgundy, French wine sets the standard against which all others are measured.",
    "wineHistory": "France has been producing wine since the 6th century BC. The country's appellation system (AOC), established in 1935, became the model for wine classification worldwide.",
    "topWines": [
      "ch-teau-haut-brion-ch-teau-haut-brion-2019",
      "ch-teau-cheval-blanc-ch-teau-cheval-blanc-2019",
      "domaine-coche-dury-meursault-les-perri-res-premier-cru-2020",
      "ch-teau-margaux-ch-teau-margaux-2019",
      "ch-teau-mouton-rothschild-ch-teau-mouton-rothschild-2020",
      "ch-teau-p-trus-ch-teau-p-trus-2018",
      "domaine-de-la-roman-e-conti-la-t-che-grand-cru-2019",
      "domaine-comte-georges-de-vog-musigny-grand-cru-2019",
      "mo-t-chandon-dom-p-rignon-2015",
      "ch-teau-lafite-rothschild-ch-teau-lafite-rothschild-2020"
    ]
  },
  {
    "slug": "italy",
    "name": "Italy",
    "emoji": "🇮🇹",
    "regions": [
      "Tuscany",
      "Piedmont",
      "Veneto",
      "Sicily",
      "Puglia"
    ],
    "description": "Italy produces more wine than any other country, with an extraordinary diversity of indigenous grape varieties and regional styles.",
    "wineHistory": "Italian winemaking dates back 4,000 years. The country boasts over 500 officially recognized grape varieties and a classification system spanning DOC, DOCG, and IGT designations.",
    "topWines": [
      "giacomo-conterno-barolo-monfortino-riserva-2015",
      "tenuta-san-guido-sassicaia-2020",
      "tenuta-dell-ornellaia-ornellaia-2020",
      "giuseppe-quintarelli-amarone-della-valpolicella-classico-2013",
      "marchesi-antinori-tignanello-2020",
      "gaja-barbaresco-2019",
      "ceretto-barolo-2020",
      "nino-franco-glera-2018",
      "la-marca-glera-2018",
      "biondi-santi-brunello-di-montalcino-2017"
    ]
  },
  {
    "slug": "spain",
    "name": "Spain",
    "emoji": "🇪🇸",
    "regions": [
      "Rioja",
      "Ribera del Duero",
      "Priorat",
      "Cava",
      "Sherry"
    ],
    "description": "Spain has more vineyard area than any country on earth. From the age-worthy Tempranillos of Rioja to the revolutionary wines of Priorat, Spanish wine is experiencing a golden age.",
    "wineHistory": "The Phoenicians planted Spain's first vineyards around 1100 BC. Today Spain is the world's third-largest wine producer.",
    "topWines": [
      "dominio-de-pingus-pingus-2019",
      "lvaro-palacios-l-ermita-velles-vinyes-2019",
      "bodegas-vega-sicilia-vega-sicilia-nico-2014",
      "recaredo-macabeo-2019",
      "protos-ribera-del-duero-2021",
      "ali-n-ribera-del-duero-2020",
      "rem-rez-de-ganuza-rioja-doca-2022",
      "pesquera-ribera-del-duero-2022",
      "la-rioja-alta-rioja-gran-reserva-904-2015",
      "gramona-macabeo-2021"
    ]
  },
  {
    "slug": "usa",
    "name": "United States",
    "emoji": "🇺🇸",
    "regions": [
      "Napa Valley",
      "Sonoma",
      "Willamette Valley",
      "Washington State"
    ],
    "description": "American wine, led by California's Napa Valley, has earned its place among the world's finest. Oregon and Washington are producing increasingly acclaimed wines.",
    "wineHistory": "The modern American wine industry began in earnest after Prohibition ended in 1933. The 1976 Judgment of Paris, where California wines beat French rivals in a blind tasting, transformed the global wine landscape.",
    "topWines": [
      "screaming-eagle-screaming-eagle-cabernet-sauvignon-2019",
      "opus-one-winery-opus-one-2020",
      "joseph-phelps-vineyards-insignia-2020",
      "far-niente-stags-leap-district-2019",
      "dominus-stags-leap-district-2020",
      "domaine-drouhin-oregon-dundee-hills-2022",
      "bergstr-m-dundee-hills-2018",
      "caymus-vineyards-caymus-special-selection-cabernet-sauvignon-2019",
      "williams-selyem-russian-river-valley-2021",
      "ken-wright-dundee-hills-2022"
    ]
  },
  {
    "slug": "australia",
    "name": "Australia",
    "emoji": "🇦🇺",
    "regions": [
      "Barossa Valley",
      "McLaren Vale",
      "Margaret River",
      "Yarra Valley",
      "Hunter Valley",
      "Eden Valley"
    ],
    "description": "Australia produces bold, fruit-driven wines alongside increasingly refined, terroir-focused bottlings. The country's winemakers are among the most innovative in the world.",
    "wineHistory": "Vines first arrived in Australia with the First Fleet in 1788. The Barossa Valley, settled by German immigrants in the 1840s, remains home to some of the oldest Shiraz vines on earth.",
    "topWines": [
      "penfolds-grange-2019",
      "henschke-hill-of-grace-2018",
      "yangarra-mclaren-vale-2018",
      "de-bortoli-yarra-valley-2019",
      "tyrrell-s-s-millon-2020",
      "grant-burge-barossa-valley-2019",
      "wirra-wirra-mclaren-vale-2018",
      "mount-pleasant-s-millon-2018",
      "vasse-felix-margaret-river-2020",
      "two-hands-barossa-valley-2018"
    ]
  },
  {
    "slug": "argentina",
    "name": "Argentina",
    "emoji": "🇦🇷",
    "regions": [
      "Mendoza",
      "Salta"
    ],
    "description": "Argentina is the world's fifth-largest wine producer, renowned for its Malbec from the high-altitude vineyards of Mendoza.",
    "wineHistory": "Spanish missionaries brought vines to Argentina in the 16th century. The modern premium wine industry took off in the 1990s, when producers began harnessing the country's unique terroir.",
    "topWines": [
      "luigi-bosca-luj-n-de-cuyo-2021",
      "bodega-catena-zapata-catena-zapata-malbec-argentino-2020",
      "zuccardi-uco-valley-2021",
      "clos-de-los-siete-uco-valley-2020",
      "trapiche-uco-valley-2022",
      "luigi-bosca-uco-valley-2019",
      "zuccardi-luj-n-de-cuyo-2018",
      "colom-torront-s-2021",
      "trapiche-luj-n-de-cuyo-2019",
      "norton-luj-n-de-cuyo-2022"
    ]
  },
  {
    "slug": "chile",
    "name": "Chile",
    "emoji": "🇨🇱",
    "regions": [
      "Maipo Valley",
      "Colchagua Valley",
      "Casablanca Valley"
    ],
    "description": "Chile's geographic isolation has kept its vineyards free from phylloxera, preserving pre-phylloxera vines and producing wines of exceptional purity.",
    "wineHistory": "Chilean wine production dates to the 16th century, but the quality revolution began in the 1980s with major foreign investment and modern winemaking techniques.",
    "topWines": [
      "clos-apalta-colchagua-valley-2019",
      "concha-y-toro-don-melchor-cabernet-sauvignon-2020",
      "casa-lapostolle-colchagua-valley-2021",
      "vi-a-casablanca-sauvignon-blanc-2018",
      "casas-del-bosque-sauvignon-blanc-2018",
      "montes-alpha-colchagua-valley-2020"
    ]
  },
  {
    "slug": "germany",
    "name": "Germany",
    "emoji": "🇩🇪",
    "regions": [
      "Mosel",
      "Pfalz",
      "Rheingau"
    ],
    "description": "Germany produces some of the world's finest Rieslings, ranging from bone-dry to lusciously sweet, all united by piercing acidity and mineral complexity.",
    "wineHistory": "The Romans planted Germany's first vineyards along the Mosel and Rhine rivers 2,000 years ago. The Prädikat system classifies wines by ripeness at harvest.",
    "topWines": [
      "egon-m-ller-scharzhofberger-riesling-sp-tlese-2021",
      "weingut-dr-b-rklin-wolf-riesling-trocken-gg-kirchenst-ck-2021",
      "georg-breuer-riesling-2022",
      "schloss-johannisberg-riesling-2020",
      "dr-loosen-riesling-2018",
      "robert-weil-riesling-2020",
      "joh-jos-pr-m-riesling-2018",
      "markus-molitor-riesling-2018"
    ]
  },
  {
    "slug": "portugal",
    "name": "Portugal",
    "emoji": "🇵🇹",
    "regions": [
      "Douro",
      "Alentejo",
      "Vinho Verde"
    ],
    "description": "Portugal offers extraordinary wine diversity, from the legendary Port wines of the Douro Valley to the vibrant Vinho Verde of the north and powerful reds of the Alentejo.",
    "wineHistory": "Portugal's Douro Valley, established in 1756, was the world's first officially demarcated wine region. The country has over 250 indigenous grape varieties.",
    "topWines": [
      "casa-ferreirinha-barca-velha-2015",
      "quinta-do-carmo-alentejo-2020",
      "taylor-s-vintage-port-2017",
      "herdade-do-espor-o-alentejo-2022",
      "monte-da-ravasqueira-alentejo-2018",
      "anselmo-mendes-alvarinho-2021",
      "soalheiro-alvarinho-2022"
    ]
  },
  {
    "slug": "new-zealand",
    "name": "New Zealand",
    "emoji": "🇳🇿",
    "regions": [
      "Marlborough",
      "Central Otago",
      "Martinborough"
    ],
    "description": "New Zealand burst onto the world wine scene with its vibrant Marlborough Sauvignon Blancs and now produces exceptional Pinot Noir from Central Otago.",
    "wineHistory": "Commercial winemaking began in New Zealand in the 1970s. The country's cool maritime climate produces wines of extraordinary freshness and aromatic intensity.",
    "topWines": [
      "burn-cottage-central-otago-2021",
      "villa-maria-sauvignon-blanc-2022",
      "greywacke-sauvignon-blanc-2019",
      "craggy-range-sauvignon-blanc-2019",
      "craggy-range-craggy-range-te-muna-road-vineyard-pinot-noir-2021",
      "felton-road-central-otago-2020",
      "cloudy-bay-cloudy-bay-sauvignon-blanc-2023",
      "dog-point-sauvignon-blanc-2018",
      "rippon-central-otago-2019"
    ]
  },
  {
    "slug": "south-africa",
    "name": "South Africa",
    "emoji": "🇿🇦",
    "regions": [
      "Stellenbosch",
      "Swartland",
      "Walker Bay"
    ],
    "description": "South African wine is experiencing a renaissance, with the old vines of the Swartland and the cool-climate vineyards of Walker Bay producing world-class wines.",
    "wineHistory": "The first South African wine was produced in 1659 by the Dutch East India Company. The country's unique Pinotage grape (a Pinot Noir × Cinsault cross) was created in 1925.",
    "topWines": [
      "the-sadie-family-wines-columella-2020",
      "kanonkop-kanonkop-paul-sauer-2019",
      "meerlust-stellenbosch-2019",
      "rust-en-vrede-stellenbosch-2022",
      "warwick-stellenbosch-2018",
      "hamilton-russell-walker-bay-2018",
      "bouchard-finlayson-walker-bay-2019"
    ]
  },
  {
    "slug": "austria",
    "name": "Austria",
    "emoji": "🇦🇹",
    "regions": [
      "Wachau",
      "Kamptal"
    ],
    "description": "Austria's Grüner Veltliner and Riesling are among the world's great white wines, combining power with racy acidity and extraordinary mineral depth.",
    "wineHistory": "Austrian winemaking dates back to Celtic and Roman times. The country's DAC system, established in 2003, emphasizes terroir-driven wines from specific regions.",
    "topWines": [
      "f-x-pichler-gr-ner-veltliner-smaragd-kellerberg-2021",
      "jurtschitsch-gr-ner-veltliner-2018",
      "br-ndlmayer-gr-ner-veltliner-2019",
      "schloss-gobelsburg-gr-ner-veltliner-2022"
    ]
  },
  {
    "slug": "greece",
    "name": "Greece",
    "emoji": "🇬🇷",
    "regions": [
      "Naoussa"
    ],
    "description": "Greece is experiencing a wine renaissance, with ancient indigenous varieties like Xinomavro and Assyrtiko producing world-class wines.",
    "wineHistory": "Greece is one of the oldest wine-producing regions in the world, with evidence of winemaking dating back 6,500 years.",
    "topWines": [
      "domaine-thymiopoulos-naoussa-xinomavro-2020"
    ]
  },
  {
    "slug": "lebanon",
    "name": "Lebanon",
    "emoji": "🇱🇧",
    "regions": [
      "Bekaa Valley"
    ],
    "description": "Lebanon's Bekaa Valley has been producing wine for over 5,000 years. Château Musar is the country's most famous estate.",
    "wineHistory": "The Phoenicians, based in modern-day Lebanon, were among the first peoples to spread winemaking across the Mediterranean.",
    "topWines": [
      "ch-teau-musar-ch-teau-musar-red-2017"
    ]
  }
];

export const regions: Region[] = [
  {
    "slug": "bordeaux",
    "name": "Bordeaux",
    "country": "France",
    "countryCode": "FR",
    "description": "Bordeaux is one of France's most important wine regions, known for producing exceptional Cabernet Sauvignon, Merlot, Cabernet Franc wines.",
    "climate": "Continental to maritime",
    "keyGrapes": [
      "Cabernet Sauvignon",
      "Merlot",
      "Cabernet Franc",
      "Sémillon"
    ],
    "topWines": [
      "ch-teau-haut-brion-ch-teau-haut-brion-2019",
      "ch-teau-cheval-blanc-ch-teau-cheval-blanc-2019",
      "ch-teau-margaux-ch-teau-margaux-2019",
      "ch-teau-mouton-rothschild-ch-teau-mouton-rothschild-2020",
      "ch-teau-p-trus-ch-teau-p-trus-2018",
      "ch-teau-lafite-rothschild-ch-teau-lafite-rothschild-2020",
      "ch-teau-d-yquem-ch-teau-d-yquem-2019",
      "ch-teau-l-oville-las-cases-saint-julien-2021"
    ],
    "notableAppellations": [
      "Pessac-Léognan AOC",
      "Saint-Émilion Grand Cru AOC",
      "Margaux AOC",
      "Pauillac AOC",
      "Pomerol AOC"
    ]
  },
  {
    "slug": "burgundy",
    "name": "Burgundy",
    "country": "France",
    "countryCode": "FR",
    "description": "Burgundy is one of France's most important wine regions, known for producing exceptional Pinot Noir, Chardonnay wines.",
    "climate": "Continental to maritime",
    "keyGrapes": [
      "Pinot Noir",
      "Chardonnay"
    ],
    "topWines": [
      "domaine-coche-dury-meursault-les-perri-res-premier-cru-2020",
      "domaine-de-la-roman-e-conti-la-t-che-grand-cru-2019",
      "domaine-comte-georges-de-vog-musigny-grand-cru-2019",
      "domaine-de-la-roman-e-conti-roman-e-conti-grand-cru-2020",
      "olivier-leflaive-chardonnay-2019",
      "domaine-william-f-vre-chablis-grand-cru-les-clos-2021",
      "domaine-tienne-sauzet-chardonnay-2018",
      "domaine-roulot-chardonnay-2019"
    ],
    "notableAppellations": [
      "Meursault Premier Cru AOC",
      "La Tâche AOC",
      "Musigny AOC",
      "Romanée-Conti AOC",
      "Puligny-Montrachet AOC"
    ]
  },
  {
    "slug": "champagne",
    "name": "Champagne",
    "country": "France",
    "countryCode": "FR",
    "description": "Champagne is one of France's most important wine regions, known for producing exceptional Chardonnay, Pinot Noir wines.",
    "climate": "Continental to maritime",
    "keyGrapes": [
      "Chardonnay",
      "Pinot Noir"
    ],
    "topWines": [
      "mo-t-chandon-dom-p-rignon-2015",
      "louis-roederer-cristal-2015",
      "krug-krug-grande-cuv-e-nv"
    ],
    "notableAppellations": [
      "Champagne AOC"
    ]
  },
  {
    "slug": "rh-ne-valley",
    "name": "Rhône Valley",
    "country": "France",
    "countryCode": "FR",
    "description": "Rhône Valley is one of France's most important wine regions, known for producing exceptional Syrah, Grenache wines.",
    "climate": "Continental to maritime",
    "keyGrapes": [
      "Syrah",
      "Grenache"
    ],
    "topWines": [
      "e-guigal-c-te-r-tie-la-landonne-2018",
      "paul-jaboulet-a-n-hermitage-la-chapelle-2019",
      "ch-teau-de-beaucastel-ch-teauneuf-du-pape-2020"
    ],
    "notableAppellations": [
      "Côte-Rôtie AOC",
      "Hermitage AOC",
      "Châteauneuf-du-Pape AOC"
    ]
  },
  {
    "slug": "loire-valley",
    "name": "Loire Valley",
    "country": "France",
    "countryCode": "FR",
    "description": "Loire Valley is one of France's most important wine regions, known for producing exceptional Sauvignon Blanc wines.",
    "climate": "Continental to maritime",
    "keyGrapes": [
      "Sauvignon Blanc"
    ],
    "topWines": [
      "domaine-vacheron-sancerre-2022"
    ],
    "notableAppellations": [
      "Sancerre AOC"
    ]
  },
  {
    "slug": "alsace",
    "name": "Alsace",
    "country": "France",
    "countryCode": "FR",
    "description": "Alsace is one of France's most important wine regions, known for producing exceptional Riesling wines.",
    "climate": "Continental to maritime",
    "keyGrapes": [
      "Riesling"
    ],
    "topWines": [
      "domaine-zind-humbrecht-riesling-grand-cru-rangen-de-thann-2020"
    ],
    "notableAppellations": [
      "Alsace Grand Cru AOC"
    ]
  },
  {
    "slug": "tuscany",
    "name": "Tuscany",
    "country": "Italy",
    "countryCode": "IT",
    "description": "Tuscany is one of Italy's most important wine regions, known for producing exceptional Cabernet Sauvignon, Sangiovese wines.",
    "climate": "Continental",
    "keyGrapes": [
      "Cabernet Sauvignon",
      "Sangiovese"
    ],
    "topWines": [
      "tenuta-san-guido-sassicaia-2020",
      "tenuta-dell-ornellaia-ornellaia-2020",
      "marchesi-antinori-tignanello-2020",
      "biondi-santi-brunello-di-montalcino-2017",
      "fontodi-chianti-classico-2019",
      "castello-dei-rampolla-chianti-classico-2021",
      "castello-di-ama-chianti-classico-2019",
      "san-felice-chianti-classico-2020"
    ],
    "notableAppellations": [
      "Bolgheri Sassicaia DOC",
      "Bolgheri Superiore DOC",
      "Toscana IGT",
      "Brunello di Montalcino DOCG",
      "Chianti Classico DOCG"
    ]
  },
  {
    "slug": "piedmont",
    "name": "Piedmont",
    "country": "Italy",
    "countryCode": "IT",
    "description": "Piedmont is one of Italy's most important wine regions, known for producing exceptional Nebbiolo wines.",
    "climate": "Continental",
    "keyGrapes": [
      "Nebbiolo"
    ],
    "topWines": [
      "giacomo-conterno-barolo-monfortino-riserva-2015",
      "gaja-barbaresco-2019",
      "ceretto-barolo-2020",
      "marchesi-di-barolo-barolo-2021",
      "elio-grasso-barolo-2019",
      "bruno-giacosa-barolo-2018",
      "vietti-barolo-2021",
      "bartolo-mascarello-barolo-2021"
    ],
    "notableAppellations": [
      "Barolo DOCG",
      "Barbaresco DOCG"
    ]
  },
  {
    "slug": "veneto",
    "name": "Veneto",
    "country": "Italy",
    "countryCode": "IT",
    "description": "Veneto is one of Italy's most important wine regions, known for producing exceptional Corvina, Glera wines.",
    "climate": "Continental",
    "keyGrapes": [
      "Corvina",
      "Glera"
    ],
    "topWines": [
      "giuseppe-quintarelli-amarone-della-valpolicella-classico-2013",
      "nino-franco-glera-2018",
      "la-marca-glera-2018",
      "ruggeri-glera-2021",
      "bisol-glera-2018"
    ],
    "notableAppellations": [
      "Amarone della Valpolicella DOCG",
      "Prosecco DOC"
    ]
  },
  {
    "slug": "ribera-del-duero",
    "name": "Ribera del Duero",
    "country": "Spain",
    "countryCode": "ES",
    "description": "Ribera del Duero is one of Spain's most important wine regions, known for producing exceptional Tempranillo wines.",
    "climate": "Continental",
    "keyGrapes": [
      "Tempranillo"
    ],
    "topWines": [
      "dominio-de-pingus-pingus-2019",
      "bodegas-vega-sicilia-vega-sicilia-nico-2014",
      "protos-ribera-del-duero-2021",
      "ali-n-ribera-del-duero-2020",
      "pesquera-ribera-del-duero-2022",
      "hacienda-monasterio-ribera-del-duero-2020"
    ],
    "notableAppellations": [
      "Ribera del Duero DO"
    ]
  },
  {
    "slug": "priorat",
    "name": "Priorat",
    "country": "Spain",
    "countryCode": "ES",
    "description": "Priorat is one of Spain's most important wine regions, known for producing exceptional Garnacha wines.",
    "climate": "Continental",
    "keyGrapes": [
      "Garnacha"
    ],
    "topWines": [
      "lvaro-palacios-l-ermita-velles-vinyes-2019"
    ],
    "notableAppellations": [
      "Priorat DOCa"
    ]
  },
  {
    "slug": "rioja",
    "name": "Rioja",
    "country": "Spain",
    "countryCode": "ES",
    "description": "Rioja is one of Spain's most important wine regions, known for producing exceptional Tempranillo wines.",
    "climate": "Continental",
    "keyGrapes": [
      "Tempranillo"
    ],
    "topWines": [
      "rem-rez-de-ganuza-rioja-doca-2022",
      "la-rioja-alta-rioja-gran-reserva-904-2015",
      "muga-rioja-doca-2022",
      "bodegas-roda-rioja-doca-2020",
      "marqu-s-de-murrieta-rioja-doca-2019",
      "l-pez-de-heredia-rioja-doca-2021",
      "artadi-rioja-doca-2018",
      "cvne-rioja-doca-2020"
    ],
    "notableAppellations": [
      "Rioja DOCa"
    ]
  },
  {
    "slug": "napa-valley",
    "name": "Napa Valley",
    "country": "United States",
    "countryCode": "US",
    "description": "Napa Valley is one of United States's most important wine regions, known for producing exceptional Cabernet Sauvignon wines.",
    "climate": "Continental",
    "keyGrapes": [
      "Cabernet Sauvignon"
    ],
    "topWines": [
      "screaming-eagle-screaming-eagle-cabernet-sauvignon-2019",
      "opus-one-winery-opus-one-2020",
      "joseph-phelps-vineyards-insignia-2020",
      "far-niente-stags-leap-district-2019",
      "dominus-stags-leap-district-2020",
      "caymus-vineyards-caymus-special-selection-cabernet-sauvignon-2019",
      "duckhorn-stags-leap-district-2019",
      "spottswoode-stags-leap-district-2022"
    ],
    "notableAppellations": [
      "Napa Valley AVA",
      "Stags Leap District AVA"
    ]
  },
  {
    "slug": "willamette-valley",
    "name": "Willamette Valley",
    "country": "United States",
    "countryCode": "US",
    "description": "Willamette Valley is one of United States's most important wine regions, known for producing exceptional Pinot Noir wines.",
    "climate": "Continental",
    "keyGrapes": [
      "Pinot Noir"
    ],
    "topWines": [
      "domaine-drouhin-oregon-dundee-hills-2022",
      "bergstr-m-dundee-hills-2018",
      "ken-wright-dundee-hills-2022",
      "beaux-fr-res-beaux-fr-res-pinot-noir-2021"
    ],
    "notableAppellations": [
      "Dundee Hills AVA",
      "Ribbon Ridge AVA"
    ]
  },
  {
    "slug": "south-australia",
    "name": "South Australia",
    "country": "Australia",
    "countryCode": "AU",
    "description": "South Australia is one of Australia's most important wine regions, known for producing exceptional Shiraz wines.",
    "climate": "Mediterranean to warm continental",
    "keyGrapes": [
      "Shiraz"
    ],
    "topWines": [
      "penfolds-grange-2019"
    ],
    "notableAppellations": [
      "South Australia"
    ]
  },
  {
    "slug": "eden-valley",
    "name": "Eden Valley",
    "country": "Australia",
    "countryCode": "AU",
    "description": "Eden Valley is one of Australia's most important wine regions, known for producing exceptional Shiraz wines.",
    "climate": "Mediterranean to warm continental",
    "keyGrapes": [
      "Shiraz"
    ],
    "topWines": [
      "henschke-hill-of-grace-2018"
    ],
    "notableAppellations": [
      "Eden Valley"
    ]
  },
  {
    "slug": "marlborough",
    "name": "Marlborough",
    "country": "New Zealand",
    "countryCode": "NZ",
    "description": "Marlborough is one of New Zealand's most important wine regions, known for producing exceptional Sauvignon Blanc wines.",
    "climate": "Continental",
    "keyGrapes": [
      "Sauvignon Blanc"
    ],
    "topWines": [
      "villa-maria-sauvignon-blanc-2022",
      "greywacke-sauvignon-blanc-2019",
      "craggy-range-sauvignon-blanc-2019",
      "cloudy-bay-cloudy-bay-sauvignon-blanc-2023",
      "dog-point-sauvignon-blanc-2018"
    ],
    "notableAppellations": [
      "Marlborough"
    ]
  },
  {
    "slug": "mendoza",
    "name": "Mendoza",
    "country": "Argentina",
    "countryCode": "AR",
    "description": "Mendoza is one of Argentina's most important wine regions, known for producing exceptional Malbec wines.",
    "climate": "Continental",
    "keyGrapes": [
      "Malbec"
    ],
    "topWines": [
      "luigi-bosca-luj-n-de-cuyo-2021",
      "bodega-catena-zapata-catena-zapata-malbec-argentino-2020",
      "zuccardi-uco-valley-2021",
      "clos-de-los-siete-uco-valley-2020",
      "trapiche-uco-valley-2022",
      "luigi-bosca-uco-valley-2019",
      "zuccardi-luj-n-de-cuyo-2018",
      "trapiche-luj-n-de-cuyo-2019"
    ],
    "notableAppellations": [
      "Luján de Cuyo",
      "Mendoza",
      "Uco Valley"
    ]
  },
  {
    "slug": "maipo-valley",
    "name": "Maipo Valley",
    "country": "Chile",
    "countryCode": "CL",
    "description": "Maipo Valley is one of Chile's most important wine regions, known for producing exceptional Cabernet Sauvignon wines.",
    "climate": "Continental",
    "keyGrapes": [
      "Cabernet Sauvignon"
    ],
    "topWines": [
      "concha-y-toro-don-melchor-cabernet-sauvignon-2020"
    ],
    "notableAppellations": [
      "Maipo Valley DO"
    ]
  },
  {
    "slug": "mosel",
    "name": "Mosel",
    "country": "Germany",
    "countryCode": "DE",
    "description": "Mosel is one of Germany's most important wine regions, known for producing exceptional Riesling wines.",
    "climate": "Continental to maritime",
    "keyGrapes": [
      "Riesling"
    ],
    "topWines": [
      "egon-m-ller-scharzhofberger-riesling-sp-tlese-2021",
      "dr-loosen-riesling-2018",
      "joh-jos-pr-m-riesling-2018",
      "markus-molitor-riesling-2018"
    ],
    "notableAppellations": [
      "Mosel"
    ]
  },
  {
    "slug": "pfalz",
    "name": "Pfalz",
    "country": "Germany",
    "countryCode": "DE",
    "description": "Pfalz is one of Germany's most important wine regions, known for producing exceptional Riesling wines.",
    "climate": "Continental to maritime",
    "keyGrapes": [
      "Riesling"
    ],
    "topWines": [
      "weingut-dr-b-rklin-wolf-riesling-trocken-gg-kirchenst-ck-2021"
    ],
    "notableAppellations": [
      "Pfalz"
    ]
  },
  {
    "slug": "douro",
    "name": "Douro",
    "country": "Portugal",
    "countryCode": "PT",
    "description": "Douro is one of Portugal's most important wine regions, known for producing exceptional Touriga Nacional wines.",
    "climate": "Continental",
    "keyGrapes": [
      "Touriga Nacional"
    ],
    "topWines": [
      "casa-ferreirinha-barca-velha-2015",
      "taylor-s-vintage-port-2017"
    ],
    "notableAppellations": [
      "Douro DOC",
      "Porto DOC"
    ]
  },
  {
    "slug": "martinborough",
    "name": "Martinborough",
    "country": "New Zealand",
    "countryCode": "NZ",
    "description": "Martinborough is one of New Zealand's most important wine regions, known for producing exceptional Pinot Noir wines.",
    "climate": "Continental",
    "keyGrapes": [
      "Pinot Noir"
    ],
    "topWines": [
      "craggy-range-craggy-range-te-muna-road-vineyard-pinot-noir-2021"
    ],
    "notableAppellations": [
      "Martinborough"
    ]
  },
  {
    "slug": "swartland",
    "name": "Swartland",
    "country": "South Africa",
    "countryCode": "ZA",
    "description": "Swartland is one of South Africa's most important wine regions, known for producing exceptional Syrah wines.",
    "climate": "Mediterranean to warm continental",
    "keyGrapes": [
      "Syrah"
    ],
    "topWines": [
      "the-sadie-family-wines-columella-2020"
    ],
    "notableAppellations": [
      "Swartland WO"
    ]
  },
  {
    "slug": "stellenbosch",
    "name": "Stellenbosch",
    "country": "South Africa",
    "countryCode": "ZA",
    "description": "Stellenbosch is one of South Africa's most important wine regions, known for producing exceptional Cabernet Sauvignon, Pinotage wines.",
    "climate": "Mediterranean to warm continental",
    "keyGrapes": [
      "Cabernet Sauvignon",
      "Pinotage"
    ],
    "topWines": [
      "kanonkop-kanonkop-paul-sauer-2019",
      "meerlust-stellenbosch-2019",
      "rust-en-vrede-stellenbosch-2022",
      "warwick-stellenbosch-2018"
    ],
    "notableAppellations": [
      "Stellenbosch WO"
    ]
  },
  {
    "slug": "wachau",
    "name": "Wachau",
    "country": "Austria",
    "countryCode": "AT",
    "description": "Wachau is one of Austria's most important wine regions, known for producing exceptional Grüner Veltliner wines.",
    "climate": "Continental",
    "keyGrapes": [
      "Grüner Veltliner"
    ],
    "topWines": [
      "f-x-pichler-gr-ner-veltliner-smaragd-kellerberg-2021"
    ],
    "notableAppellations": [
      "Wachau DAC"
    ]
  },
  {
    "slug": "bekaa-valley",
    "name": "Bekaa Valley",
    "country": "Lebanon",
    "countryCode": "LB",
    "description": "Bekaa Valley is one of Lebanon's most important wine regions, known for producing exceptional Cabernet Sauvignon wines.",
    "climate": "Continental",
    "keyGrapes": [
      "Cabernet Sauvignon"
    ],
    "topWines": [
      "ch-teau-musar-ch-teau-musar-red-2017"
    ],
    "notableAppellations": [
      "Bekaa Valley"
    ]
  },
  {
    "slug": "naoussa",
    "name": "Naoussa",
    "country": "Greece",
    "countryCode": "GR",
    "description": "Naoussa is one of Greece's most important wine regions, known for producing exceptional Xinomavro wines.",
    "climate": "Continental",
    "keyGrapes": [
      "Xinomavro"
    ],
    "topWines": [
      "domaine-thymiopoulos-naoussa-xinomavro-2020"
    ],
    "notableAppellations": [
      "Naoussa PDO"
    ]
  },
  {
    "slug": "languedoc-roussillon",
    "name": "Languedoc-Roussillon",
    "country": "France",
    "countryCode": "FR",
    "description": "Languedoc-Roussillon is one of France's most important wine regions, known for producing exceptional Grenache wines.",
    "climate": "Continental to maritime",
    "keyGrapes": [
      "Grenache"
    ],
    "topWines": [
      "mas-de-daumas-gassac-languedoc-2019",
      "g-rard-bertrand-languedoc-2021",
      "domaine-de-la-grange-des-p-res-languedoc-2020",
      "ch-teau-de-la-n-gly-languedoc-2020"
    ],
    "notableAppellations": [
      "Languedoc AOC"
    ]
  },
  {
    "slug": "provence",
    "name": "Provence",
    "country": "France",
    "countryCode": "FR",
    "description": "Provence is one of France's most important wine regions, known for producing exceptional Grenache wines.",
    "climate": "Continental to maritime",
    "keyGrapes": [
      "Grenache"
    ],
    "topWines": [
      "ch-teau-d-esclans-whispering-angel-c-tes-de-provence-2018",
      "domaines-ott-c-tes-de-provence-2020",
      "ch-teau-minuty-c-tes-de-provence-2022",
      "miraval-c-tes-de-provence-2022"
    ],
    "notableAppellations": [
      "Côtes de Provence AOC"
    ]
  },
  {
    "slug": "sicily",
    "name": "Sicily",
    "country": "Italy",
    "countryCode": "IT",
    "description": "Sicily is one of Italy's most important wine regions, known for producing exceptional Nerello Mascalese wines.",
    "climate": "Continental",
    "keyGrapes": [
      "Nerello Mascalese"
    ],
    "topWines": [
      "planeta-etna-2020",
      "benanti-etna-2018",
      "donnafugata-etna-2021",
      "frank-cornelissen-etna-2021"
    ],
    "notableAppellations": [
      "Etna DOC"
    ]
  },
  {
    "slug": "puglia",
    "name": "Puglia",
    "country": "Italy",
    "countryCode": "IT",
    "description": "Puglia is one of Italy's most important wine regions, known for producing exceptional Primitivo wines.",
    "climate": "Continental",
    "keyGrapes": [
      "Primitivo"
    ],
    "topWines": [
      "san-marzano-primitivo-di-manduria-2022",
      "gianfranco-fino-primitivo-di-manduria-2022",
      "tormaresca-primitivo-di-manduria-2020"
    ],
    "notableAppellations": [
      "Primitivo di Manduria DOC"
    ]
  },
  {
    "slug": "cava",
    "name": "Cava",
    "country": "Spain",
    "countryCode": "ES",
    "description": "Cava is one of Spain's most important wine regions, known for producing exceptional Macabeo wines.",
    "climate": "Continental",
    "keyGrapes": [
      "Macabeo"
    ],
    "topWines": [
      "recaredo-macabeo-2019",
      "gramona-macabeo-2021",
      "juv-y-camps-macabeo-2022"
    ],
    "notableAppellations": [
      "Cava DO"
    ]
  },
  {
    "slug": "sherry",
    "name": "Sherry",
    "country": "Spain",
    "countryCode": "ES",
    "description": "Sherry is one of Spain's most important wine regions, known for producing exceptional Palomino Fino wines.",
    "climate": "Continental",
    "keyGrapes": [
      "Palomino Fino"
    ],
    "topWines": [
      "valdespino-jerez-x-r-s-sherry-nv",
      "el-maestro-sierra-jerez-x-r-s-sherry-nv",
      "gonzalez-byass-tio-pepe-jerez-x-r-s-sherry-nv",
      "lustau-jerez-x-r-s-sherry-nv"
    ],
    "notableAppellations": [
      "Jerez-Xérès-Sherry DO"
    ]
  },
  {
    "slug": "sonoma",
    "name": "Sonoma",
    "country": "United States",
    "countryCode": "US",
    "description": "Sonoma is one of United States's most important wine regions, known for producing exceptional Pinot Noir, Chardonnay wines.",
    "climate": "Continental",
    "keyGrapes": [
      "Pinot Noir",
      "Chardonnay"
    ],
    "topWines": [
      "williams-selyem-russian-river-valley-2021",
      "peter-michael-chardonnay-2019",
      "littorai-russian-river-valley-2022",
      "flowers-russian-river-valley-2022",
      "kistler-chardonnay-2020",
      "ramey-chardonnay-2018",
      "kistler-russian-river-valley-2022"
    ],
    "notableAppellations": [
      "Russian River Valley AVA",
      "Sonoma Coast AVA"
    ]
  },
  {
    "slug": "washington-state",
    "name": "Washington State",
    "country": "United States",
    "countryCode": "US",
    "description": "Washington State is one of United States's most important wine regions, known for producing exceptional Syrah wines.",
    "climate": "Continental",
    "keyGrapes": [
      "Syrah"
    ],
    "topWines": [
      "k-vintners-walla-walla-valley-2018",
      "cayuse-walla-walla-valley-2021",
      "gramercy-cellars-walla-walla-valley-2018"
    ],
    "notableAppellations": [
      "Walla Walla Valley AVA"
    ]
  },
  {
    "slug": "barossa-valley",
    "name": "Barossa Valley",
    "country": "Australia",
    "countryCode": "AU",
    "description": "Barossa Valley is one of Australia's most important wine regions, known for producing exceptional Shiraz wines.",
    "climate": "Mediterranean to warm continental",
    "keyGrapes": [
      "Shiraz"
    ],
    "topWines": [
      "grant-burge-barossa-valley-2019",
      "two-hands-barossa-valley-2018",
      "torbreck-barossa-valley-2019",
      "peter-lehmann-barossa-valley-2019",
      "yalumba-barossa-valley-2018"
    ],
    "notableAppellations": [
      "Barossa Valley GI"
    ]
  },
  {
    "slug": "mclaren-vale",
    "name": "McLaren Vale",
    "country": "Australia",
    "countryCode": "AU",
    "description": "McLaren Vale is one of Australia's most important wine regions, known for producing exceptional Shiraz wines.",
    "climate": "Mediterranean to warm continental",
    "keyGrapes": [
      "Shiraz"
    ],
    "topWines": [
      "yangarra-mclaren-vale-2018",
      "wirra-wirra-mclaren-vale-2018",
      "d-arenberg-mclaren-vale-2022"
    ],
    "notableAppellations": [
      "McLaren Vale GI"
    ]
  },
  {
    "slug": "margaret-river",
    "name": "Margaret River",
    "country": "Australia",
    "countryCode": "AU",
    "description": "Margaret River is one of Australia's most important wine regions, known for producing exceptional Cabernet Sauvignon wines.",
    "climate": "Mediterranean to warm continental",
    "keyGrapes": [
      "Cabernet Sauvignon"
    ],
    "topWines": [
      "vasse-felix-margaret-river-2020",
      "moss-wood-margaret-river-2021",
      "leeuwin-estate-margaret-river-2021",
      "cullen-margaret-river-2019"
    ],
    "notableAppellations": [
      "Margaret River GI"
    ]
  },
  {
    "slug": "yarra-valley",
    "name": "Yarra Valley",
    "country": "Australia",
    "countryCode": "AU",
    "description": "Yarra Valley is one of Australia's most important wine regions, known for producing exceptional Pinot Noir wines.",
    "climate": "Mediterranean to warm continental",
    "keyGrapes": [
      "Pinot Noir"
    ],
    "topWines": [
      "de-bortoli-yarra-valley-2019",
      "giant-steps-yarra-valley-2021",
      "yering-station-yarra-valley-2021"
    ],
    "notableAppellations": [
      "Yarra Valley GI"
    ]
  },
  {
    "slug": "hunter-valley",
    "name": "Hunter Valley",
    "country": "Australia",
    "countryCode": "AU",
    "description": "Hunter Valley is one of Australia's most important wine regions, known for producing exceptional Sémillon wines.",
    "climate": "Mediterranean to warm continental",
    "keyGrapes": [
      "Sémillon"
    ],
    "topWines": [
      "tyrrell-s-s-millon-2020",
      "mount-pleasant-s-millon-2018",
      "brokenwood-s-millon-2018"
    ],
    "notableAppellations": [
      "Hunter Valley GI"
    ]
  },
  {
    "slug": "salta",
    "name": "Salta",
    "country": "Argentina",
    "countryCode": "AR",
    "description": "Salta is one of Argentina's most important wine regions, known for producing exceptional Torrontés wines.",
    "climate": "Continental",
    "keyGrapes": [
      "Torrontés"
    ],
    "topWines": [
      "colom-torront-s-2021",
      "el-esteco-torront-s-2018"
    ],
    "notableAppellations": [
      "Cafayate"
    ]
  },
  {
    "slug": "colchagua-valley",
    "name": "Colchagua Valley",
    "country": "Chile",
    "countryCode": "CL",
    "description": "Colchagua Valley is one of Chile's most important wine regions, known for producing exceptional Carmenère wines.",
    "climate": "Continental",
    "keyGrapes": [
      "Carmenère"
    ],
    "topWines": [
      "clos-apalta-colchagua-valley-2019",
      "casa-lapostolle-colchagua-valley-2021",
      "montes-alpha-colchagua-valley-2020"
    ],
    "notableAppellations": [
      "Colchagua Valley DO"
    ]
  },
  {
    "slug": "casablanca-valley",
    "name": "Casablanca Valley",
    "country": "Chile",
    "countryCode": "CL",
    "description": "Casablanca Valley is one of Chile's most important wine regions, known for producing exceptional Sauvignon Blanc wines.",
    "climate": "Continental",
    "keyGrapes": [
      "Sauvignon Blanc"
    ],
    "topWines": [
      "vi-a-casablanca-sauvignon-blanc-2018",
      "casas-del-bosque-sauvignon-blanc-2018"
    ],
    "notableAppellations": [
      "Casablanca Valley DO"
    ]
  },
  {
    "slug": "central-otago",
    "name": "Central Otago",
    "country": "New Zealand",
    "countryCode": "NZ",
    "description": "Central Otago is one of New Zealand's most important wine regions, known for producing exceptional Pinot Noir wines.",
    "climate": "Continental",
    "keyGrapes": [
      "Pinot Noir"
    ],
    "topWines": [
      "burn-cottage-central-otago-2021",
      "felton-road-central-otago-2020",
      "rippon-central-otago-2019"
    ],
    "notableAppellations": [
      "Central Otago"
    ]
  },
  {
    "slug": "walker-bay",
    "name": "Walker Bay",
    "country": "South Africa",
    "countryCode": "ZA",
    "description": "Walker Bay is one of South Africa's most important wine regions, known for producing exceptional Pinot Noir wines.",
    "climate": "Mediterranean to warm continental",
    "keyGrapes": [
      "Pinot Noir"
    ],
    "topWines": [
      "hamilton-russell-walker-bay-2018",
      "bouchard-finlayson-walker-bay-2019"
    ],
    "notableAppellations": [
      "Walker Bay WO"
    ]
  },
  {
    "slug": "rheingau",
    "name": "Rheingau",
    "country": "Germany",
    "countryCode": "DE",
    "description": "Rheingau is one of Germany's most important wine regions, known for producing exceptional Riesling wines.",
    "climate": "Continental to maritime",
    "keyGrapes": [
      "Riesling"
    ],
    "topWines": [
      "georg-breuer-riesling-2022",
      "schloss-johannisberg-riesling-2020",
      "robert-weil-riesling-2020"
    ],
    "notableAppellations": [
      "Rheingau"
    ]
  },
  {
    "slug": "alentejo",
    "name": "Alentejo",
    "country": "Portugal",
    "countryCode": "PT",
    "description": "Alentejo is one of Portugal's most important wine regions, known for producing exceptional Touriga Nacional wines.",
    "climate": "Continental",
    "keyGrapes": [
      "Touriga Nacional"
    ],
    "topWines": [
      "quinta-do-carmo-alentejo-2020",
      "herdade-do-espor-o-alentejo-2022",
      "monte-da-ravasqueira-alentejo-2018"
    ],
    "notableAppellations": [
      "Alentejo DOC"
    ]
  },
  {
    "slug": "vinho-verde",
    "name": "Vinho Verde",
    "country": "Portugal",
    "countryCode": "PT",
    "description": "Vinho Verde is one of Portugal's most important wine regions, known for producing exceptional Alvarinho wines.",
    "climate": "Continental",
    "keyGrapes": [
      "Alvarinho"
    ],
    "topWines": [
      "anselmo-mendes-alvarinho-2021",
      "soalheiro-alvarinho-2022"
    ],
    "notableAppellations": [
      "Vinho Verde DOC"
    ]
  },
  {
    "slug": "kamptal",
    "name": "Kamptal",
    "country": "Austria",
    "countryCode": "AT",
    "description": "Kamptal is one of Austria's most important wine regions, known for producing exceptional Grüner Veltliner wines.",
    "climate": "Continental",
    "keyGrapes": [
      "Grüner Veltliner"
    ],
    "topWines": [
      "jurtschitsch-gr-ner-veltliner-2018",
      "br-ndlmayer-gr-ner-veltliner-2019",
      "schloss-gobelsburg-gr-ner-veltliner-2022"
    ],
    "notableAppellations": [
      "Kamptal DAC"
    ]
  }
];

export const grapeVarieties: Grape[] = [
  {
    "slug": "cabernet-sauvignon",
    "name": "Cabernet Sauvignon",
    "color": "Red",
    "aliases": [],
    "description": "Cabernet Sauvignon is one of the world's most important red grape varieties, producing wines across many regions and styles.",
    "characteristics": "Medium to full-bodied with structured tannins and aging potential.",
    "regions": [
      "Bordeaux",
      "Tuscany",
      "Napa Valley",
      "Maipo Valley",
      "Stellenbosch",
      "Bekaa Valley",
      "Margaret River"
    ],
    "pairings": [
      "Grilled meats",
      "Hard cheeses",
      "Pasta with meat sauce"
    ]
  },
  {
    "slug": "merlot",
    "name": "Merlot",
    "color": "Red",
    "aliases": [],
    "description": "Merlot is one of the world's most important red grape varieties, producing wines across many regions and styles.",
    "characteristics": "Medium to full-bodied with structured tannins and aging potential.",
    "regions": [
      "Bordeaux"
    ],
    "pairings": [
      "Grilled meats",
      "Hard cheeses",
      "Pasta with meat sauce"
    ]
  },
  {
    "slug": "cabernet-franc",
    "name": "Cabernet Franc",
    "color": "Red",
    "aliases": [],
    "description": "Cabernet Franc is one of the world's most important red grape varieties, producing wines across many regions and styles.",
    "characteristics": "Medium to full-bodied with structured tannins and aging potential.",
    "regions": [
      "Bordeaux"
    ],
    "pairings": [
      "Grilled meats",
      "Hard cheeses",
      "Pasta with meat sauce"
    ]
  },
  {
    "slug": "s-millon",
    "name": "Sémillon",
    "color": "White",
    "aliases": [],
    "description": "Sémillon is one of the world's most important white grape varieties, producing wines across many regions and styles.",
    "characteristics": "Typically fresh and aromatic with good acidity.",
    "regions": [
      "Bordeaux",
      "Hunter Valley"
    ],
    "pairings": [
      "Seafood",
      "Salads",
      "Light poultry dishes"
    ]
  },
  {
    "slug": "pinot-noir",
    "name": "Pinot Noir",
    "color": "Red",
    "aliases": [],
    "description": "Pinot Noir is one of the world's most important red grape varieties, producing wines across many regions and styles.",
    "characteristics": "Medium to full-bodied with structured tannins and aging potential.",
    "regions": [
      "Burgundy",
      "Champagne",
      "Willamette Valley",
      "Martinborough",
      "Sonoma",
      "Yarra Valley",
      "Central Otago",
      "Walker Bay"
    ],
    "pairings": [
      "Grilled meats",
      "Hard cheeses",
      "Pasta with meat sauce"
    ]
  },
  {
    "slug": "chardonnay",
    "name": "Chardonnay",
    "color": "White",
    "aliases": [],
    "description": "Chardonnay is one of the world's most important white grape varieties, producing wines across many regions and styles.",
    "characteristics": "Typically fresh and aromatic with good acidity.",
    "regions": [
      "Burgundy",
      "Champagne",
      "Sonoma"
    ],
    "pairings": [
      "Seafood",
      "Salads",
      "Light poultry dishes"
    ]
  },
  {
    "slug": "syrah",
    "name": "Syrah",
    "color": "Red",
    "aliases": [],
    "description": "Syrah is one of the world's most important red grape varieties, producing wines across many regions and styles.",
    "characteristics": "Medium to full-bodied with structured tannins and aging potential.",
    "regions": [
      "Rhône Valley",
      "Swartland",
      "Washington State"
    ],
    "pairings": [
      "Grilled meats",
      "Hard cheeses",
      "Pasta with meat sauce"
    ]
  },
  {
    "slug": "grenache",
    "name": "Grenache",
    "color": "Red",
    "aliases": [],
    "description": "Grenache is one of the world's most important red grape varieties, producing wines across many regions and styles.",
    "characteristics": "Medium to full-bodied with structured tannins and aging potential.",
    "regions": [
      "Rhône Valley",
      "Languedoc-Roussillon",
      "Provence"
    ],
    "pairings": [
      "Grilled meats",
      "Hard cheeses",
      "Pasta with meat sauce"
    ]
  },
  {
    "slug": "sauvignon-blanc",
    "name": "Sauvignon Blanc",
    "color": "White",
    "aliases": [],
    "description": "Sauvignon Blanc is one of the world's most important white grape varieties, producing wines across many regions and styles.",
    "characteristics": "Typically fresh and aromatic with good acidity.",
    "regions": [
      "Loire Valley",
      "Marlborough",
      "Casablanca Valley"
    ],
    "pairings": [
      "Seafood",
      "Salads",
      "Light poultry dishes"
    ]
  },
  {
    "slug": "riesling",
    "name": "Riesling",
    "color": "White",
    "aliases": [],
    "description": "Riesling is one of the world's most important white grape varieties, producing wines across many regions and styles.",
    "characteristics": "Typically fresh and aromatic with good acidity.",
    "regions": [
      "Alsace",
      "Mosel",
      "Pfalz",
      "Rheingau"
    ],
    "pairings": [
      "Seafood",
      "Salads",
      "Light poultry dishes"
    ]
  },
  {
    "slug": "sangiovese",
    "name": "Sangiovese",
    "color": "Red",
    "aliases": [],
    "description": "Sangiovese is one of the world's most important red grape varieties, producing wines across many regions and styles.",
    "characteristics": "Medium to full-bodied with structured tannins and aging potential.",
    "regions": [
      "Tuscany"
    ],
    "pairings": [
      "Grilled meats",
      "Hard cheeses",
      "Pasta with meat sauce"
    ]
  },
  {
    "slug": "nebbiolo",
    "name": "Nebbiolo",
    "color": "Red",
    "aliases": [],
    "description": "Nebbiolo is one of the world's most important red grape varieties, producing wines across many regions and styles.",
    "characteristics": "Medium to full-bodied with structured tannins and aging potential.",
    "regions": [
      "Piedmont"
    ],
    "pairings": [
      "Grilled meats",
      "Hard cheeses",
      "Pasta with meat sauce"
    ]
  },
  {
    "slug": "corvina",
    "name": "Corvina",
    "color": "Red",
    "aliases": [],
    "description": "Corvina is one of the world's most important red grape varieties, producing wines across many regions and styles.",
    "characteristics": "Medium to full-bodied with structured tannins and aging potential.",
    "regions": [
      "Veneto"
    ],
    "pairings": [
      "Grilled meats",
      "Hard cheeses",
      "Pasta with meat sauce"
    ]
  },
  {
    "slug": "tempranillo",
    "name": "Tempranillo",
    "color": "Red",
    "aliases": [],
    "description": "Tempranillo is one of the world's most important red grape varieties, producing wines across many regions and styles.",
    "characteristics": "Medium to full-bodied with structured tannins and aging potential.",
    "regions": [
      "Ribera del Duero",
      "Rioja"
    ],
    "pairings": [
      "Grilled meats",
      "Hard cheeses",
      "Pasta with meat sauce"
    ]
  },
  {
    "slug": "garnacha",
    "name": "Garnacha",
    "color": "Red",
    "aliases": [],
    "description": "Garnacha is one of the world's most important red grape varieties, producing wines across many regions and styles.",
    "characteristics": "Medium to full-bodied with structured tannins and aging potential.",
    "regions": [
      "Priorat"
    ],
    "pairings": [
      "Grilled meats",
      "Hard cheeses",
      "Pasta with meat sauce"
    ]
  },
  {
    "slug": "shiraz",
    "name": "Shiraz",
    "color": "Red",
    "aliases": [],
    "description": "Shiraz is one of the world's most important red grape varieties, producing wines across many regions and styles.",
    "characteristics": "Medium to full-bodied with structured tannins and aging potential.",
    "regions": [
      "South Australia",
      "Eden Valley",
      "Barossa Valley",
      "McLaren Vale"
    ],
    "pairings": [
      "Grilled meats",
      "Hard cheeses",
      "Pasta with meat sauce"
    ]
  },
  {
    "slug": "malbec",
    "name": "Malbec",
    "color": "Red",
    "aliases": [],
    "description": "Malbec is one of the world's most important red grape varieties, producing wines across many regions and styles.",
    "characteristics": "Medium to full-bodied with structured tannins and aging potential.",
    "regions": [
      "Mendoza"
    ],
    "pairings": [
      "Grilled meats",
      "Hard cheeses",
      "Pasta with meat sauce"
    ]
  },
  {
    "slug": "touriga-nacional",
    "name": "Touriga Nacional",
    "color": "Red",
    "aliases": [],
    "description": "Touriga Nacional is one of the world's most important red grape varieties, producing wines across many regions and styles.",
    "characteristics": "Medium to full-bodied with structured tannins and aging potential.",
    "regions": [
      "Douro",
      "Alentejo"
    ],
    "pairings": [
      "Grilled meats",
      "Hard cheeses",
      "Pasta with meat sauce"
    ]
  },
  {
    "slug": "gr-ner-veltliner",
    "name": "Grüner Veltliner",
    "color": "White",
    "aliases": [],
    "description": "Grüner Veltliner is one of the world's most important white grape varieties, producing wines across many regions and styles.",
    "characteristics": "Typically fresh and aromatic with good acidity.",
    "regions": [
      "Wachau",
      "Kamptal"
    ],
    "pairings": [
      "Seafood",
      "Salads",
      "Light poultry dishes"
    ]
  },
  {
    "slug": "xinomavro",
    "name": "Xinomavro",
    "color": "Red",
    "aliases": [],
    "description": "Xinomavro is one of the world's most important red grape varieties, producing wines across many regions and styles.",
    "characteristics": "Medium to full-bodied with structured tannins and aging potential.",
    "regions": [
      "Naoussa"
    ],
    "pairings": [
      "Grilled meats",
      "Hard cheeses",
      "Pasta with meat sauce"
    ]
  },
  {
    "slug": "nerello-mascalese",
    "name": "Nerello Mascalese",
    "color": "Red",
    "aliases": [],
    "description": "Nerello Mascalese is one of the world's most important red grape varieties, producing wines across many regions and styles.",
    "characteristics": "Medium to full-bodied with structured tannins and aging potential.",
    "regions": [
      "Sicily"
    ],
    "pairings": [
      "Grilled meats",
      "Hard cheeses",
      "Pasta with meat sauce"
    ]
  },
  {
    "slug": "glera",
    "name": "Glera",
    "color": "White",
    "aliases": [],
    "description": "Glera is one of the world's most important white grape varieties, producing wines across many regions and styles.",
    "characteristics": "Typically fresh and aromatic with good acidity.",
    "regions": [
      "Veneto"
    ],
    "pairings": [
      "Seafood",
      "Salads",
      "Light poultry dishes"
    ]
  },
  {
    "slug": "primitivo",
    "name": "Primitivo",
    "color": "Red",
    "aliases": [],
    "description": "Primitivo is one of the world's most important red grape varieties, producing wines across many regions and styles.",
    "characteristics": "Medium to full-bodied with structured tannins and aging potential.",
    "regions": [
      "Puglia"
    ],
    "pairings": [
      "Grilled meats",
      "Hard cheeses",
      "Pasta with meat sauce"
    ]
  },
  {
    "slug": "macabeo",
    "name": "Macabeo",
    "color": "White",
    "aliases": [],
    "description": "Macabeo is one of the world's most important white grape varieties, producing wines across many regions and styles.",
    "characteristics": "Typically fresh and aromatic with good acidity.",
    "regions": [
      "Cava"
    ],
    "pairings": [
      "Seafood",
      "Salads",
      "Light poultry dishes"
    ]
  },
  {
    "slug": "palomino-fino",
    "name": "Palomino Fino",
    "color": "White",
    "aliases": [],
    "description": "Palomino Fino is one of the world's most important white grape varieties, producing wines across many regions and styles.",
    "characteristics": "Typically fresh and aromatic with good acidity.",
    "regions": [
      "Sherry"
    ],
    "pairings": [
      "Seafood",
      "Salads",
      "Light poultry dishes"
    ]
  },
  {
    "slug": "torront-s",
    "name": "Torrontés",
    "color": "White",
    "aliases": [],
    "description": "Torrontés is one of the world's most important white grape varieties, producing wines across many regions and styles.",
    "characteristics": "Typically fresh and aromatic with good acidity.",
    "regions": [
      "Salta"
    ],
    "pairings": [
      "Seafood",
      "Salads",
      "Light poultry dishes"
    ]
  },
  {
    "slug": "carmen-re",
    "name": "Carmenère",
    "color": "Red",
    "aliases": [],
    "description": "Carmenère is one of the world's most important red grape varieties, producing wines across many regions and styles.",
    "characteristics": "Medium to full-bodied with structured tannins and aging potential.",
    "regions": [
      "Colchagua Valley"
    ],
    "pairings": [
      "Grilled meats",
      "Hard cheeses",
      "Pasta with meat sauce"
    ]
  },
  {
    "slug": "pinotage",
    "name": "Pinotage",
    "color": "Red",
    "aliases": [],
    "description": "Pinotage is one of the world's most important red grape varieties, producing wines across many regions and styles.",
    "characteristics": "Medium to full-bodied with structured tannins and aging potential.",
    "regions": [
      "Stellenbosch"
    ],
    "pairings": [
      "Grilled meats",
      "Hard cheeses",
      "Pasta with meat sauce"
    ]
  },
  {
    "slug": "alvarinho",
    "name": "Alvarinho",
    "color": "White",
    "aliases": [],
    "description": "Alvarinho is one of the world's most important white grape varieties, producing wines across many regions and styles.",
    "characteristics": "Typically fresh and aromatic with good acidity.",
    "regions": [
      "Vinho Verde"
    ],
    "pairings": [
      "Seafood",
      "Salads",
      "Light poultry dishes"
    ]
  }
];

// Blog posts are imported from blog-posts.ts
import { blogPosts as importedBlogPosts } from './blog-posts';
export const blogPosts: BlogPost[] = importedBlogPosts;
