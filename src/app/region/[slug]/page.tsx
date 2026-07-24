import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdUnit from '@/components/AdUnit';
import WineCard from '@/components/WineCard';
import {
  getAllRegions,
  getRegionBySlug,
  getWinesByRegion,
  toSlug,
} from '@/lib/wine-db';

export const revalidate = 604800;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const regions = getAllRegions();
  return regions.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const region = getRegionBySlug(slug);
  if (!region) return { title: 'Region Not Found | 50 Best Wines' };

  return {
    title: `Best ${region.name} Wines | Rankings & Reviews | 50 Best Wines`,
    description: `Discover the highest-rated wines from ${region.name}, ${region.country || ''}. Expert reviews, scores, and tasting notes.`,
    openGraph: {
      title: `Best ${region.name} Wines | 50 Best Wines`,
      description: `Top wines from ${region.name} ranked by aggregated critic scores.`,
      type: 'website',
      siteName: '50 Best Wines',
    },
  };
}

export default async function RegionPage({ params }: Props) {
  const { slug } = await params;
  const region = getRegionBySlug(slug);
  if (!region) notFound();

  const wines = getWinesByRegion(region.name)
    .sort((a, b) => b.aggregateScore - a.aggregateScore);
  const topWines = wines.slice(0, 12);

  // Collect appellations
  const appellations = new Set<string>();
  wines.forEach((w) => {
    if (w.appellation) appellations.add(w.appellation);
  });

  return (
    <>
      {/* Breadcrumb */}
      <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-text/40">
          <li><Link href="/" className="hover:text-wine transition-colors">Home</Link></li>
          <li>/</li>
          {region.country && (
            <>
              <li><Link href={`/country/${toSlug(region.country).replace(/\s+/g, '-')}`} className="hover:text-wine transition-colors">{region.country}</Link></li>
              <li>/</li>
            </>
          )}
          <li className="text-text/60">{region.name}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="border-b border-card-border bg-gradient-to-b from-[#1a0a10] via-[#080808] to-[#080808]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold text-text sm:text-5xl">
            Best Wines from {region.name}
          </h1>
          <p className="mt-3 text-text/50">
            {wines.length} wines ranked {region.country ? `| ${region.country}` : ''}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
        {/* Description */}
        {region.description && (
          <div className="max-w-3xl">
            <h2 className="mb-4 font-serif text-2xl font-bold text-text">About {region.name}</h2>
            <p className="text-sm leading-relaxed text-text/60">{region.description}</p>
          </div>
        )}

        {/* Climate & Key Grapes */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {region.climate && (
            <div className="rounded-xl border border-card-border bg-card-bg p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-wine/60">Climate</p>
              <p className="mt-2 text-sm leading-relaxed text-text/60">{region.climate}</p>
            </div>
          )}
          {region.keyGrapes && region.keyGrapes.length > 0 && (
            <div className="rounded-xl border border-card-border bg-card-bg p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-wine/60">Key Grapes</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {region.keyGrapes.map((g: string) => (
                  <Link key={g} href={`/grape/${g.toLowerCase().replace(/\s+/g, '-')}`} className="rounded-full bg-wine/10 px-2.5 py-1 text-xs text-wine/80 hover:bg-wine/20 transition-colors">
                    {g}
                  </Link>
                ))}
              </div>
            </div>
          )}
          {region.notableAppellations && region.notableAppellations.length > 0 && (
            <div className="rounded-xl border border-card-border bg-card-bg p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-wine/60">Notable Appellations</p>
              <p className="mt-2 text-sm leading-relaxed text-text/60">{region.notableAppellations.join(', ')}</p>
            </div>
          )}
        </div>

        <AdUnit format="horizontal" />

        {/* Top Wines */}
        {topWines.length > 0 && (
          <section>
            <h2 className="mb-6 font-serif text-2xl font-bold text-text">Top Wines from {region.name}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {topWines.map((wine, i) => (
                <WineCard key={wine.slug} wine={wine} rank={i + 1} />
              ))}
            </div>
            {wines.length > 12 && (
              <div className="mt-6 text-center">
                <Link href={`/rankings?region=${encodeURIComponent(region.name)}`} className="inline-flex items-center gap-2 rounded-full border border-wine/20 px-6 py-3 text-sm font-medium text-wine transition-colors hover:bg-wine/10">
                  View All {wines.length} Wines
                </Link>
              </div>
            )}
          </section>
        )}

        {/* Notable Appellations */}
        {appellations.size > 0 && (
          <section>
            <h2 className="mb-6 font-serif text-2xl font-bold text-text">Notable Appellations</h2>
            <div className="flex flex-wrap gap-3">
              {Array.from(appellations).map((appellation) => (
                <span
                  key={appellation}
                  className="rounded-full border border-card-border bg-card-bg px-4 py-2 text-sm text-text/60"
                >
                  {appellation}
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
