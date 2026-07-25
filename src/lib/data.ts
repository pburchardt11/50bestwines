// 50 Best Wines - Data layer
// Type definitions for wine data (data now lives in Postgres)

export interface Wine {
  slug: string;
  name: string;
  producer: string;
  vintage: number | null;
  type: 'Red' | 'White' | 'Rose' | 'Sparkling' | 'Dessert' | 'Fortified';
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

export interface WineVintage {
  id: number;
  wineId: number;
  year: number;
  scores: { source: string; score: number; maxScore: number; vintage?: number }[];
  ratingCount: number;
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

// Blog posts remain file-based (not in Postgres)
import { blogPosts as importedBlogPosts } from './blog-posts';
export const blogPosts: BlogPost[] = importedBlogPosts;
