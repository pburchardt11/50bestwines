import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(request: NextRequest) {
  const slugsParam = request.nextUrl.searchParams.get('slugs');

  if (!slugsParam) {
    return NextResponse.json([]);
  }

  const slugs = slugsParam.split(',').filter(Boolean).slice(0, 50);

  if (slugs.length === 0) {
    return NextResponse.json([]);
  }

  try {
    const rows = await sql`
      SELECT slug, name, producer, country, region, type, grape, vintage,
             aggregate_score, price, price_range, badges, tasting_notes
      FROM wines
      WHERE slug = ANY(${slugs})
      ORDER BY aggregate_score DESC
    `;

    const wines = rows.map((r) => ({
      slug: r.slug,
      name: r.name,
      producer: r.producer,
      country: r.country,
      region: r.region,
      type: r.type,
      grape: r.grape,
      vintage: r.vintage,
      aggregateScore: Number(r.aggregate_score),
      price: Number(r.price),
      priceRange: r.price_range,
      badges: r.badges || [],
      tastingNotes: r.tasting_notes || '',
    }));

    return NextResponse.json(wines);
  } catch {
    return NextResponse.json([]);
  }
}
