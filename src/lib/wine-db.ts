import { sql } from './db';
import { blogPosts } from './data';
import type { Wine, WineVintage, Country, Region, Grape, BlogPost } from './data';

export type { Wine, WineVintage, Country, Region, Grape, BlogPost };

export function toSlug(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ---------------------------------------------------------------------------
// Row mappers
// ---------------------------------------------------------------------------

function mapWineRow(row: Record<string, unknown>): Wine {
  // Scores come from a joined vintage subquery or are empty
  const rawScores = row.scores;
  let scores: Wine['scores'] = [];
  if (rawScores) {
    if (typeof rawScores === 'string') {
      try { scores = JSON.parse(rawScores); } catch { scores = []; }
    } else if (Array.isArray(rawScores)) {
      scores = rawScores as Wine['scores'];
    }
  }

  return {
    slug: row.slug as string,
    name: row.name as string,
    producer: row.producer as string,
    vintage: row.vintage as number | null,
    type: row.type as Wine['type'],
    grape: row.grape as string,
    grapes: (row.grapes as string[]) || [],
    region: row.region as string,
    subRegion: (row.sub_region as string) || '',
    country: row.country as string,
    countryCode: (row.country_code as string) || '',
    appellation: (row.appellation as string) || '',
    alcoholContent: (row.alcohol_content as string) || '',
    price: Number(row.price) || 0,
    priceRange: (row.price_range as Wine['priceRange']) || 'Mid-Range',
    buyUrl: (row.buy_url as string) || '',
    labelUrl: (row.label_url as string) || '',
    scores,
    aggregateScore: Number(row.aggregate_score) || 0,
    badges: (row.badges as string[]) || [],
    tastingNotes: (row.tasting_notes as string) || '',
    editorial: '',
    pairings: (row.pairings as string[]) || [],
    servingTemp: (row.serving_temp as string) || '',
    aging: (row.aging as string) || '',
    prosAndCons: { pros: (row.pros as string[]) || [], cons: (row.cons as string[]) || [] },
  };
}

function mapCountryRow(row: Record<string, unknown>): Country {
  return {
    slug: row.slug as string,
    name: row.name as string,
    emoji: (row.emoji as string) || '',
    regions: (row.regions as string[]) || [],
    topWines: (row.top_wines as string[]) || [],
    description: (row.description as string) || '',
    wineHistory: (row.wine_history as string) || '',
  };
}

function mapRegionRow(row: Record<string, unknown>): Region {
  return {
    slug: row.slug as string,
    name: row.name as string,
    country: (row.country as string) || '',
    countryCode: (row.country_code as string) || '',
    description: (row.description as string) || '',
    climate: (row.climate as string) || '',
    keyGrapes: (row.key_grapes as string[]) || [],
    topWines: (row.top_wines as string[]) || [],
    notableAppellations: (row.notable_appellations as string[]) || [],
  };
}

function mapGrapeRow(row: Record<string, unknown>): Grape {
  return {
    slug: row.slug as string,
    name: row.name as string,
    color: (row.color as Grape['color']) || 'Red',
    aliases: (row.aliases as string[]) || [],
    description: (row.description as string) || '',
    characteristics: (row.characteristics as string) || '',
    regions: (row.regions as string[]) || [],
    pairings: (row.pairings as string[]) || [],
  };
}

function mapVintageRow(row: Record<string, unknown>): WineVintage {
  const scores = typeof row.scores === 'string' ? JSON.parse(row.scores) : (row.scores || []);
  return {
    id: Number(row.id),
    wineId: Number(row.wine_id),
    year: Number(row.vintage) || 0,
    scores: scores as WineVintage['scores'],
    ratingCount: Number(row.rating_count) || 0,
  };
}

// ---------------------------------------------------------------------------
// Wine queries
// ---------------------------------------------------------------------------

export async function getAllWines(): Promise<Wine[]> {
  // WARNING: Do NOT call this with 241K+ wines - use getTopWines or getTotalWineCount instead
  const rows = await sql`SELECT * FROM wines ORDER BY aggregate_score DESC LIMIT 100`;
  return rows.map(mapWineRow);
}

export async function getTotalWineCount(): Promise<number> {
  const rows = await sql`SELECT COUNT(*) as count FROM wines`;
  return Number(rows[0].count);
}

export async function getWineCountByType(type: string): Promise<number> {
  const rows = await sql`SELECT COUNT(*) as count FROM wines WHERE LOWER(type) = LOWER(${type})`;
  return Number(rows[0].count);
}

export async function getWineBySlug(slug: string): Promise<Wine | undefined> {
  // Join with best vintage to get scores
  const rows = await sql`
    SELECT w.*, (
      SELECT wv.scores FROM wine_vintages wv
      WHERE wv.wine_id = w.id
      ORDER BY wv.rating_count DESC
      LIMIT 1
    ) as scores
    FROM wines w
    WHERE w.slug = ${slug} LIMIT 1
  `;
  return rows.length > 0 ? mapWineRow(rows[0]) : undefined;
}

export async function getAllWineSlugs(): Promise<string[]> {
  const rows = await sql`SELECT slug FROM wines`;
  return rows.map(r => r.slug as string);
}

export async function getTopWinesGlobal(limit: number = 50): Promise<Wine[]> {
  const rows = await sql`SELECT * FROM wines ORDER BY aggregate_score DESC LIMIT ${limit}`;
  return rows.map(mapWineRow);
}

export async function getTopWines(
  limit: number = 50,
  offset: number = 0,
  filters?: {
    type?: string;
    country?: string;
    region?: string;
    grape?: string;
    priceRange?: string;
    sortBy?: string;
  }
): Promise<{ wines: Wine[]; total: number }> {
  // Use conditional expressions in tagged template literals
  // Neon's driver only supports tagged template syntax
  const typeFilter = filters?.type || '';
  const countryFilter = filters?.country || '';
  const regionFilter = filters?.region || '';
  const grapeFilter = filters?.grape || '';
  const priceRangeFilter = filters?.priceRange || '';

  // Count query
  const countRows = await sql`
    SELECT COUNT(*) as total FROM wines
    WHERE (${typeFilter} = '' OR LOWER(type) = LOWER(${typeFilter}))
      AND (${countryFilter} = '' OR LOWER(country) = LOWER(${countryFilter}))
      AND (${regionFilter} = '' OR LOWER(region) = LOWER(${regionFilter}))
      AND (${grapeFilter} = '' OR LOWER(grape) = LOWER(${grapeFilter}))
      AND (${priceRangeFilter} = '' OR LOWER(price_range) = LOWER(${priceRangeFilter}))
  `;
  const total = Number(countRows[0]?.total) || 0;

  // Data query — handle sort order with separate queries since ORDER BY can't be parameterized
  let dataRows;
  if (filters?.sortBy === 'price-low') {
    dataRows = await sql`
      SELECT * FROM wines
      WHERE (${typeFilter} = '' OR LOWER(type) = LOWER(${typeFilter}))
        AND (${countryFilter} = '' OR LOWER(country) = LOWER(${countryFilter}))
        AND (${regionFilter} = '' OR LOWER(region) = LOWER(${regionFilter}))
        AND (${grapeFilter} = '' OR LOWER(grape) = LOWER(${grapeFilter}))
        AND (${priceRangeFilter} = '' OR LOWER(price_range) = LOWER(${priceRangeFilter}))
      ORDER BY price ASC
      LIMIT ${limit} OFFSET ${offset}
    `;
  } else if (filters?.sortBy === 'price-high') {
    dataRows = await sql`
      SELECT * FROM wines
      WHERE (${typeFilter} = '' OR LOWER(type) = LOWER(${typeFilter}))
        AND (${countryFilter} = '' OR LOWER(country) = LOWER(${countryFilter}))
        AND (${regionFilter} = '' OR LOWER(region) = LOWER(${regionFilter}))
        AND (${grapeFilter} = '' OR LOWER(grape) = LOWER(${grapeFilter}))
        AND (${priceRangeFilter} = '' OR LOWER(price_range) = LOWER(${priceRangeFilter}))
      ORDER BY price DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
  } else if (filters?.sortBy === 'name') {
    dataRows = await sql`
      SELECT * FROM wines
      WHERE (${typeFilter} = '' OR LOWER(type) = LOWER(${typeFilter}))
        AND (${countryFilter} = '' OR LOWER(country) = LOWER(${countryFilter}))
        AND (${regionFilter} = '' OR LOWER(region) = LOWER(${regionFilter}))
        AND (${grapeFilter} = '' OR LOWER(grape) = LOWER(${grapeFilter}))
        AND (${priceRangeFilter} = '' OR LOWER(price_range) = LOWER(${priceRangeFilter}))
      ORDER BY name ASC
      LIMIT ${limit} OFFSET ${offset}
    `;
  } else {
    dataRows = await sql`
      SELECT * FROM wines
      WHERE (${typeFilter} = '' OR LOWER(type) = LOWER(${typeFilter}))
        AND (${countryFilter} = '' OR LOWER(country) = LOWER(${countryFilter}))
        AND (${regionFilter} = '' OR LOWER(region) = LOWER(${regionFilter}))
        AND (${grapeFilter} = '' OR LOWER(grape) = LOWER(${grapeFilter}))
        AND (${priceRangeFilter} = '' OR LOWER(price_range) = LOWER(${priceRangeFilter}))
      ORDER BY aggregate_score DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
  }

  return {
    wines: dataRows.map(mapWineRow),
    total,
  };
}

export async function searchWines(query: string, limit: number = 15): Promise<Wine[]> {
  // Use ILIKE for partial matching with unaccent for accent-insensitive search
  const pattern = `%${query}%`;
  const rows = await sql`
    SELECT * FROM wines
    WHERE unaccent(name) ILIKE unaccent(${pattern})
       OR unaccent(producer) ILIKE unaccent(${pattern})
       OR unaccent(grape) ILIKE unaccent(${pattern})
       OR unaccent(region) ILIKE unaccent(${pattern})
       OR unaccent(country) ILIKE unaccent(${pattern})
       OR unaccent(appellation) ILIKE unaccent(${pattern})
    ORDER BY aggregate_score DESC
    LIMIT ${limit}
  `;
  return rows.map(mapWineRow);
}

export async function getWinesByType(type: string): Promise<Wine[]> {
  const rows = await sql`SELECT * FROM wines WHERE LOWER(type) = LOWER(${type}) ORDER BY aggregate_score DESC`;
  return rows.map(mapWineRow);
}

export async function getWinesByCountry(country: string, limit?: number, offset: number = 0): Promise<Wine[]> {
  if (limit) {
    const rows = await sql`
      SELECT * FROM wines WHERE LOWER(country) = LOWER(${country})
      ORDER BY aggregate_score DESC LIMIT ${limit} OFFSET ${offset}
    `;
    return rows.map(mapWineRow);
  }
  const rows = await sql`
    SELECT * FROM wines WHERE LOWER(country) = LOWER(${country})
    ORDER BY aggregate_score DESC
  `;
  return rows.map(mapWineRow);
}

export async function getWinesByRegion(region: string, limit?: number, offset: number = 0): Promise<Wine[]> {
  if (limit) {
    const rows = await sql`
      SELECT * FROM wines WHERE LOWER(region) = LOWER(${region}) OR LOWER(sub_region) = LOWER(${region})
      ORDER BY aggregate_score DESC LIMIT ${limit} OFFSET ${offset}
    `;
    return rows.map(mapWineRow);
  }
  const rows = await sql`
    SELECT * FROM wines WHERE LOWER(region) = LOWER(${region}) OR LOWER(sub_region) = LOWER(${region})
    ORDER BY aggregate_score DESC
  `;
  return rows.map(mapWineRow);
}

export async function getWinesByGrape(grape: string, limit?: number, offset: number = 0): Promise<Wine[]> {
  if (limit) {
    const rows = await sql`
      SELECT * FROM wines WHERE LOWER(grape) = LOWER(${grape}) OR ${grape} = ANY(grapes)
      ORDER BY aggregate_score DESC LIMIT ${limit} OFFSET ${offset}
    `;
    return rows.map(mapWineRow);
  }
  const rows = await sql`
    SELECT * FROM wines WHERE LOWER(grape) = LOWER(${grape}) OR ${grape} = ANY(grapes)
    ORDER BY aggregate_score DESC
  `;
  return rows.map(mapWineRow);
}

export async function getWinesByPriceRange(range: string): Promise<Wine[]> {
  const rows = await sql`SELECT * FROM wines WHERE LOWER(price_range) = LOWER(${range}) ORDER BY aggregate_score DESC`;
  return rows.map(mapWineRow);
}

export async function getAllTypes(): Promise<string[]> {
  const rows = await sql`SELECT DISTINCT type FROM wines ORDER BY type`;
  return rows.map(r => r.type as string);
}

export async function getWinesWithBadge(badge: string): Promise<Wine[]> {
  const pattern = `%${badge}%`;
  const rows = await sql`
    SELECT * FROM wines WHERE EXISTS (
      SELECT 1 FROM unnest(badges) AS b WHERE b ILIKE ${pattern}
    )
    ORDER BY aggregate_score DESC
  `;
  return rows.map(mapWineRow);
}

export async function getSimilarWines(wine: Wine, limit: number = 6): Promise<Wine[]> {
  // Get wines of same type/grape/region, exclude current wine, limit results
  const rows = await sql`
    SELECT *,
      (CASE WHEN type = ${wine.type} THEN 3 ELSE 0 END) +
      (CASE WHEN grape = ${wine.grape} THEN 3 ELSE 0 END) +
      (CASE WHEN region = ${wine.region} THEN 2 ELSE 0 END) +
      (CASE WHEN country = ${wine.country} THEN 1 ELSE 0 END) +
      (CASE WHEN price_range = ${wine.priceRange} THEN 1 ELSE 0 END) +
      (CASE WHEN ABS(aggregate_score - ${wine.aggregateScore}) < 5 THEN 1 ELSE 0 END)
      AS similarity
    FROM wines
    WHERE slug != ${wine.slug}
    ORDER BY similarity DESC, aggregate_score DESC
    LIMIT ${limit}
  `;
  return rows.map(mapWineRow);
}

// ---------------------------------------------------------------------------
// Vintage queries
// ---------------------------------------------------------------------------

export async function getWineVintages(wineId: number): Promise<WineVintage[]> {
  const rows = await sql`
    SELECT * FROM wine_vintages WHERE wine_id = ${wineId} ORDER BY vintage DESC NULLS LAST
  `;
  return rows.map(mapVintageRow);
}

export async function getWineVintagesBySlug(slug: string): Promise<WineVintage[]> {
  const rows = await sql`
    SELECT wv.* FROM wine_vintages wv
    JOIN wines w ON wv.wine_id = w.id
    WHERE w.slug = ${slug}
    ORDER BY wv.vintage DESC NULLS LAST
  `;
  return rows.map(mapVintageRow);
}

// ---------------------------------------------------------------------------
// Country queries
// ---------------------------------------------------------------------------

export async function getAllCountries(): Promise<Country[]> {
  const rows = await sql`SELECT * FROM countries ORDER BY name`;
  return rows.map(mapCountryRow);
}

export async function getCountryBySlug(slug: string): Promise<Country | undefined> {
  const rows = await sql`SELECT * FROM countries WHERE slug = ${slug} LIMIT 1`;
  return rows.length > 0 ? mapCountryRow(rows[0]) : undefined;
}

// ---------------------------------------------------------------------------
// Region queries
// ---------------------------------------------------------------------------

export async function getAllRegions(): Promise<Region[]> {
  const rows = await sql`SELECT * FROM regions ORDER BY name`;
  return rows.map(mapRegionRow);
}

export async function getRegionBySlug(slug: string): Promise<Region | undefined> {
  const rows = await sql`SELECT * FROM regions WHERE slug = ${slug} LIMIT 1`;
  return rows.length > 0 ? mapRegionRow(rows[0]) : undefined;
}

export async function getRegionsForCountry(countryName: string): Promise<Region[]> {
  const slug = toSlug(countryName);
  const rows = await sql`
    SELECT * FROM regions
    WHERE slug = ${slug}
       OR LOWER(country) = LOWER(${countryName})
    ORDER BY name
  `;
  return rows.map(mapRegionRow);
}

// ---------------------------------------------------------------------------
// Grape queries
// ---------------------------------------------------------------------------

export async function getAllGrapes(): Promise<Grape[]> {
  const rows = await sql`SELECT * FROM grapes ORDER BY name`;
  return rows.map(mapGrapeRow);
}

export async function getGrapeBySlug(slug: string): Promise<Grape | undefined> {
  const rows = await sql`SELECT * FROM grapes WHERE slug = ${slug} LIMIT 1`;
  return rows.length > 0 ? mapGrapeRow(rows[0]) : undefined;
}

// ---------------------------------------------------------------------------
// Blog queries (still file-based)
// ---------------------------------------------------------------------------

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug);
}

// ---------------------------------------------------------------------------
// Score sources (static data)
// ---------------------------------------------------------------------------

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
