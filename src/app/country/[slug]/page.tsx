import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdUnit from '@/components/AdUnit';
import WineCard from '@/components/WineCard';
import {
  getCountryBySlug,
  getWinesByCountry,
  getRegionsForCountry,
} from '@/lib/wine-db';

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const country = await getCountryBySlug(slug);
  if (!country) return { title: 'Country Not Found | 50 Best Wines' };

  return {
    title: `Best ${country.name} Wines | Rankings & Reviews | 50 Best Wines`,
    description: `Discover the top-rated wines from ${country.name}. Expert rankings, tasting notes, and reviews of the best ${country.name} wines from ${country.regions?.length || 0} regions.`,
    openGraph: {
      title: `Best ${country.name} Wines | 50 Best Wines`,
      description: `Top-rated wines from ${country.name}, ranked by aggregated critic scores.`,
      type: 'website',
      siteName: '50 Best Wines',
    },
  };
}

export default async function CountryPage({ params }: Props) {
  const { slug } = await params;
  const country = await getCountryBySlug(slug);
  if (!country) notFound();

  const [wines, regions] = await Promise.all([
    getWinesByCountry(country.name),
    getRegionsForCountry(country.name),
  ]);

  const topWines = wines.slice(0, 12);

  // Collect key grapes from top wines
  const grapeCount: Record<string, number> = {};
  wines.forEach((w) => {
    if (w.grape) grapeCount[w.grape] = (grapeCount[w.grape] || 0) + 1;
  });
  const topGrapes = Object.entries(grapeCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://50bestwines.com' },
      { '@type': 'ListItem', position: 2, name: country.name, item: `https://50bestwines.com/country/${country.slug}` },
    ],
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Best Wines from ${country.name}`,
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
          <li className="text-text/60">{country.name}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="border-b border-card-border bg-gradient-to-b from-[#1a0a10] via-[#080808] to-[#080808]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <span className="text-6xl">{country.emoji}</span>
            <div>
              <h1 className="font-serif text-4xl font-bold text-text sm:text-5xl">
                Best Wines from {country.name}
              </h1>
              <p className="mt-2 text-text/50">
                {wines.length} wines ranked &middot; {regions.length} wine regions
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
        {/* Description */}
        {country.description && (
          <div className="max-w-3xl">
            <h2 className="mb-4 font-serif text-2xl font-bold text-text">About {country.name} Wine</h2>
            <p className="text-sm leading-relaxed text-text/60">{country.description}</p>
          </div>
        )}

        {/* Wine History */}
        {country.wineHistory && (
          <div className="max-w-3xl">
            <h2 className="mb-4 font-serif text-2xl font-bold text-text">Wine History</h2>
            <p className="text-sm leading-relaxed text-text/60">{country.wineHistory}</p>
          </div>
        )}

        <AdUnit format="horizontal" />

        {/* Top Wines */}
        {topWines.length > 0 && (
          <section>
            <h2 className="mb-6 font-serif text-2xl font-bold text-text">Top Wines from {country.name}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {topWines.map((wine, i) => (
                <WineCard key={wine.slug} wine={wine} rank={i + 1} />
              ))}
            </div>
            {wines.length > 12 && (
              <div className="mt-6 text-center">
                <Link href={`/rankings?country=${encodeURIComponent(country.name)}`} className="inline-flex items-center gap-2 rounded-full border border-wine/20 px-6 py-3 text-sm font-medium text-wine transition-colors hover:bg-wine/10">
                  View All {wines.length} Wines
                </Link>
              </div>
            )}
          </section>
        )}

        <AdUnit format="horizontal" />

        {/* Regions */}
        {regions.length > 0 && (
          <section>
            <h2 className="mb-6 font-serif text-2xl font-bold text-text">Wine Regions in {country.name}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {regions.map((region) => (
                <Link key={region.slug} href={`/region/${region.slug}`} className="group rounded-xl border border-card-border bg-card-bg p-5 transition-all duration-200 hover:border-wine/30">
                  <h3 className="font-serif text-lg font-bold text-text group-hover:text-wine transition-colors">{region.name}</h3>
                  {region.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-text/50">{region.description}</p>
                  )}
                  {region.keyGrapes && region.keyGrapes.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {region.keyGrapes.slice(0, 3).map((g: string) => (
                        <span key={g} className="rounded-full bg-wine/10 px-2 py-0.5 text-[10px] text-wine/70">{g}</span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Key Grapes */}
        {topGrapes.length > 0 && (
          <section>
            <h2 className="mb-6 font-serif text-2xl font-bold text-text">Key Grapes of {country.name}</h2>
            <div className="flex flex-wrap gap-3">
              {topGrapes.map(([grape, count]) => (
                <Link
                  key={grape}
                  href={`/grape/${grape.toLowerCase().replace(/\s+/g, '-')}`}
                  className="rounded-full border border-card-border bg-card-bg px-5 py-2.5 text-sm font-medium text-text/70 transition-all hover:border-wine/30 hover:bg-wine/5 hover:text-wine"
                >
                  {grape} <span className="text-text/30">({count})</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <AdUnit format="horizontal" />
      </div>
    </>
  );
}
