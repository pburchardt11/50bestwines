import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdUnit from '@/components/AdUnit';
import WineCard from '@/components/WineCard';
import {
  getGrapeBySlug,
  getWinesByGrape,
} from '@/lib/wine-db';

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const grape = await getGrapeBySlug(slug);
  if (!grape) return { title: 'Grape Not Found | 50 Best Wines' };

  return {
    title: `Best ${grape.name} Wines | Rankings & Reviews | 50 Best Wines`,
    description: `Discover the top-rated ${grape.name} wines from around the world. Expert scores, tasting notes, and food pairings for the best ${grape.name} bottles.`,
    openGraph: {
      title: `Best ${grape.name} Wines | 50 Best Wines`,
      description: `Top-rated ${grape.name} wines ranked by aggregated critic scores.`,
      type: 'website',
      siteName: '50 Best Wines',
    },
  };
}

export default async function GrapePage({ params }: Props) {
  const { slug } = await params;
  const grape = await getGrapeBySlug(slug);
  if (!grape) notFound();

  const wines = await getWinesByGrape(grape.name);
  const topWines = wines.slice(0, 12);

  // Collect regions
  const regionCount: Record<string, number> = {};
  wines.forEach((w) => {
    if (w.region) regionCount[w.region] = (regionCount[w.region] || 0) + 1;
  });
  const topRegions = Object.entries(regionCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://50bestwines.com' },
      { '@type': 'ListItem', position: 2, name: grape.name, item: `https://50bestwines.com/grape/${grape.slug}` },
    ],
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Best ${grape.name} Wines`,
    numberOfItems: topWines.length,
    itemListElement: topWines.map((wine, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${wine.name} ${wine.vintage || ''}`.trim(),
      url: `https://50bestwines.com/wine/${wine.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />

      {/* Breadcrumb */}
      <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <ol className="flex items-center gap-1.5 text-sm text-text/40">
          <li><Link href="/" className="hover:text-wine transition-colors">Home</Link></li>
          <li>/</li>
          <li className="text-text/60">{grape.name}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="border-b border-card-border bg-gradient-to-b from-[#1a0a10] via-[#080808] to-[#080808]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{grape.color === 'Red' ? '🔴' : '⚪'}</span>
            <div>
              <h1 className="font-serif text-4xl font-bold text-text sm:text-5xl">
                Best {grape.name} Wines
              </h1>
              <p className="mt-2 text-text/50">
                {wines.length} {grape.name} wines ranked &middot; {grape.color} grape variety
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
        {/* Description */}
        {grape.description && (
          <div className="max-w-3xl">
            <h2 className="mb-4 font-serif text-2xl font-bold text-text">About {grape.name}</h2>
            <p className="text-sm leading-relaxed text-text/60">{grape.description}</p>
          </div>
        )}

        {/* Characteristics */}
        {grape.characteristics && (
          <div className="rounded-xl border border-card-border bg-card-bg p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-wine/60 mb-2">Characteristics</p>
            <p className="text-sm text-text/60">{grape.characteristics}</p>
          </div>
        )}

        <AdUnit format="horizontal" />

        {/* Top Wines */}
        {topWines.length > 0 && (
          <section>
            <h2 className="mb-6 font-serif text-2xl font-bold text-text">Top {grape.name} Wines</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {topWines.map((wine, i) => (
                <WineCard key={wine.slug} wine={wine} rank={i + 1} />
              ))}
            </div>
            {wines.length > 12 && (
              <div className="mt-6 text-center">
                <Link href={`/rankings?grape=${encodeURIComponent(grape.name)}`} className="inline-flex items-center gap-2 rounded-full border border-wine/20 px-6 py-3 text-sm font-medium text-wine transition-colors hover:bg-wine/10">
                  View All {wines.length} {grape.name} Wines
                </Link>
              </div>
            )}
          </section>
        )}

        {/* Regions */}
        {topRegions.length > 0 && (
          <section>
            <h2 className="mb-6 font-serif text-2xl font-bold text-text">Where {grape.name} Grows</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {topRegions.map(([region, count]) => (
                <Link
                  key={region}
                  href={`/region/${region.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group flex items-center justify-between rounded-xl border border-card-border bg-card-bg p-4 transition-all hover:border-wine/30"
                >
                  <span className="font-serif text-base font-bold text-text group-hover:text-wine transition-colors">{region}</span>
                  <span className="text-xs text-text/40">{count} wines</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Food Pairings */}
        {grape.pairings && grape.pairings.length > 0 && (
          <section>
            <h2 className="mb-6 font-serif text-2xl font-bold text-text">Food Pairings for {grape.name}</h2>
            <div className="flex flex-wrap gap-3">
              {grape.pairings.map((p: string) => (
                <span key={p} className="rounded-full border border-card-border bg-card-bg px-5 py-2.5 text-sm text-text/60">
                  {p}
                </span>
              ))}
            </div>
          </section>
        )}

        <AdUnit format="horizontal" />
      </div>
    </>
  );
}
