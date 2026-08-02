import type { MetadataRoute } from 'next';
import { sql } from '@/lib/db';
import {
  getAllCountries,
  getAllRegions,
  getAllGrapes,
  getAllBlogPosts,
} from '@/lib/wine-db';

const BASE_URL = 'https://50bestwines.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const LAST_UPDATED = new Date("2026-08-02");

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/rankings`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/quiz`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/submit`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ];

  // Fetch quality wine slugs (matching noindex threshold) and taxonomy data in parallel
  const [qualityWineRows, countries, regions, grapes] = await Promise.all([
    sql`SELECT slug FROM wines WHERE aggregate_score > 80 AND producer != '' AND region != '' AND country != ''`,
    getAllCountries(),
    getAllRegions(),
    getAllGrapes(),
  ]);
  const wineSlugs = qualityWineRows.map(r => r.slug as string);

  // Blog posts remain file-based
  const posts = getAllBlogPosts();

  const winePages: MetadataRoute.Sitemap = wineSlugs.map((slug) => ({
    url: `${BASE_URL}/wine/${slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const countryPages: MetadataRoute.Sitemap = countries.map((country) => ({
    url: `${BASE_URL}/country/${country.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const regionPages: MetadataRoute.Sitemap = regions.map((region) => ({
    url: `${BASE_URL}/region/${region.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const grapePages: MetadataRoute.Sitemap = grapes.map((grape) => ({
    url: `${BASE_URL}/grape/${grape.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...winePages,
    ...countryPages,
    ...regionPages,
    ...grapePages,
    ...blogPages,
  ];
}
