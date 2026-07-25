import { wines, countries, regions, grapeVarieties, blogPosts, type Wine, type Country, type Region, type Grape, type BlogPost } from './data';

export type { Wine, Country, Region, Grape, BlogPost };

export function toSlug(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Wine queries
export function getAllWines(): Wine[] {
  return wines;
}

export function getWineBySlug(slug: string): Wine | undefined {
  return wines.find(w => w.slug === slug);
}

export function getTopWinesGlobal(limit: number = 50): Wine[] {
  return [...wines].sort((a, b) => b.aggregateScore - a.aggregateScore).slice(0, limit);
}

export function getWinesByType(type: string): Wine[] {
  return wines.filter(w => w.type.toLowerCase() === type.toLowerCase());
}

export function getWinesByCountry(country: string): Wine[] {
  const slug = toSlug(country);
  return wines.filter(w => toSlug(w.country) === slug);
}

export function getWinesByRegion(region: string): Wine[] {
  const slug = toSlug(region);
  return wines.filter(w => toSlug(w.region) === slug || toSlug(w.subRegion) === slug);
}

export function getWinesByGrape(grape: string): Wine[] {
  const slug = toSlug(grape);
  return wines.filter(w => toSlug(w.grape) === slug || w.grapes.some(g => toSlug(g) === slug));
}

export function getWinesByPriceRange(range: string): Wine[] {
  return wines.filter(w => w.priceRange.toLowerCase() === range.toLowerCase());
}

export function getAllTypes(): string[] {
  return [...new Set(wines.map(w => w.type))];
}

export function searchWines(query: string): Wine[] {
  const q = query.toLowerCase();
  return wines.filter(w =>
    w.name.toLowerCase().includes(q) ||
    w.producer.toLowerCase().includes(q) ||
    w.grape.toLowerCase().includes(q) ||
    w.region.toLowerCase().includes(q) ||
    w.country.toLowerCase().includes(q) ||
    w.appellation.toLowerCase().includes(q) ||
    w.grapes.some(g => g.toLowerCase().includes(q))
  );
}

export function getWinesWithBadge(badge: string): Wine[] {
  const b = badge.toLowerCase();
  return wines.filter(w => w.badges.some(wb => wb.toLowerCase().includes(b)));
}

export function getSimilarWines(wine: Wine, limit: number = 6): Wine[] {
  return wines
    .filter(w => w.slug !== wine.slug)
    .map(w => {
      let score = 0;
      if (w.type === wine.type) score += 3;
      if (w.grape === wine.grape) score += 3;
      if (w.region === wine.region) score += 2;
      if (w.country === wine.country) score += 1;
      if (w.priceRange === wine.priceRange) score += 1;
      if (Math.abs(w.aggregateScore - wine.aggregateScore) < 5) score += 1;
      return { wine: w, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(x => x.wine);
}

// Country queries
export function getAllCountries(): Country[] {
  return countries;
}

export function getCountryBySlug(slug: string): Country | undefined {
  return countries.find(c => c.slug === slug);
}

// Region queries
export function getAllRegions(): Region[] {
  return regions;
}

export function getRegionBySlug(slug: string): Region | undefined {
  return regions.find(r => r.slug === slug);
}

export function getRegionsForCountry(countrySlug: string): Region[] {
  return regions.filter(r => toSlug(r.country) === countrySlug);
}

// Grape queries
export function getAllGrapes(): Grape[] {
  return grapeVarieties;
}

export function getGrapeBySlug(slug: string): Grape | undefined {
  return grapeVarieties.find(g => g.slug === slug);
}

// Blog queries
export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug);
}

// Score sources
const scoreSourceData: Record<string, { name: string; maxScore: number; description: string; website: string }> = {
  'Wine Spectator': { name: 'Wine Spectator', maxScore: 100, description: 'One of the most influential wine publications in the world, known for its comprehensive 100-point rating system.', website: 'https://www.winespectator.com' },
  'Robert Parker': { name: 'Robert Parker / Wine Advocate', maxScore: 100, description: 'Founded by Robert M. Parker Jr., the Wine Advocate is renowned for its independent, consumer-oriented 100-point wine reviews.', website: 'https://www.robertparker.com' },
  'James Suckling': { name: 'James Suckling', maxScore: 100, description: 'Former Wine Spectator senior editor, James Suckling rates wines on a 100-point scale with a focus on European and South American wines.', website: 'https://www.jamessuckling.com' },
  'Decanter': { name: 'Decanter', maxScore: 100, description: 'The UK-based Decanter magazine is one of the world\'s leading wine media brands, hosting the prestigious Decanter World Wine Awards.', website: 'https://www.decanter.com' },
  'Wine Enthusiast': { name: 'Wine Enthusiast', maxScore: 100, description: 'A major American wine publication offering ratings, reviews, and buying guides across all price points.', website: 'https://www.wineenthusiast.com' },
  'Vivino': { name: 'Vivino', maxScore: 5, description: 'The world\'s largest online wine marketplace and community, with crowd-sourced ratings from millions of users.', website: 'https://www.vivino.com' },
  'Jancis Robinson': { name: 'Jancis Robinson MW', maxScore: 20, description: 'One of the world\'s most respected wine critics, Master of Wine Jancis Robinson uses a 20-point scale.', website: 'https://www.jancisrobinson.com' },
  'Tim Atkin': { name: 'Tim Atkin MW', maxScore: 100, description: 'Master of Wine and award-winning journalist Tim Atkin is known for his expertise in Spanish, South African, and Argentine wines.', website: 'https://www.timatkin.com' },
};

export function getAllScoreSources(): string[] {
  return Object.keys(scoreSourceData);
}

export function getScoreSourceInfo(source: string): { name: string; maxScore: number; description: string; website: string } {
  return scoreSourceData[source] || { name: source, maxScore: 100, description: '', website: '' };
}
