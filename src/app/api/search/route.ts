import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')?.trim();

  if (!q || q.length < 2) {
    return NextResponse.json([]);
  }

  try {
    const pattern = `%${q}%`;

    // Accent-insensitive search with ILIKE + unaccent, ordered by score
    const rows = await sql`
      SELECT slug, name, producer, country, type, aggregate_score as score
      FROM wines
      WHERE unaccent(name) ILIKE unaccent(${pattern})
         OR unaccent(producer) ILIKE unaccent(${pattern})
         OR unaccent(country) ILIKE unaccent(${pattern})
         OR unaccent(region) ILIKE unaccent(${pattern})
         OR unaccent(grape) ILIKE unaccent(${pattern})
         OR unaccent(appellation) ILIKE unaccent(${pattern})
      ORDER BY aggregate_score DESC
      LIMIT 15
    `;

    const results = rows.map(r => ({
      slug: r.slug,
      name: r.name,
      producer: r.producer,
      country: r.country,
      type: r.type,
      score: r.score,
    }));

    return NextResponse.json(results);
  } catch {
    // If Postgres is not connected, return empty
    return NextResponse.json([]);
  }
}
