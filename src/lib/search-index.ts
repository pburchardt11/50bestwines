import { wines, countries, regions, blogPosts } from './data';

export interface SearchWineEntry {
  slug: string;
  name: string;
  producer: string;
  type: string;
  grape: string;
  region: string;
  country: string;
  score: number;
}

export interface SearchCountryEntry {
  slug: string;
  name: string;
  emoji: string;
}

export interface SearchRegionEntry {
  slug: string;
  name: string;
  country: string;
}

export interface SearchBlogEntry {
  slug: string;
  title: string;
  category: string;
  tags: string[];
}

export function getSearchIndex() {
  const wineEntries: SearchWineEntry[] = wines.map(w => ({
    slug: w.slug,
    name: w.name,
    producer: w.producer,
    type: w.type,
    grape: w.grape,
    region: w.region,
    country: w.country,
    score: w.aggregateScore,
  }));

  const countryEntries: SearchCountryEntry[] = countries.map(c => ({
    slug: c.slug,
    name: c.name,
    emoji: c.emoji,
  }));

  const regionEntries: SearchRegionEntry[] = regions.map(r => ({
    slug: r.slug,
    name: r.name,
    country: r.country,
  }));

  const blogEntries: SearchBlogEntry[] = blogPosts.map(b => ({
    slug: b.slug,
    title: b.title,
    category: b.category,
    tags: b.tags,
  }));

  return {
    wines: wineEntries,
    countries: countryEntries,
    regions: regionEntries,
    blogs: blogEntries,
  };
}
