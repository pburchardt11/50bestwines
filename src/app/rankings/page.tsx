import type { Metadata } from 'next';
import Link from 'next/link';
import AdUnit from '@/components/AdUnit';
import WineCard from '@/components/WineCard';
import {
  getTopWines,
  getAllCountries,
  getAllGrapes,
  getAllRegions,
  getAllTypes,
} from '@/lib/wine-db';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Wine Rankings | 50 Best Wines',
  description: 'All wines ranked by aggregated critic scores. Filter by type, country, region, and grape variety.',
};

const PAGE_SIZE = 50;

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function RankingsPage({ searchParams }: Props) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);
  const type = (typeof sp.type === 'string' ? sp.type : '') || '';
  const country = (typeof sp.country === 'string' ? sp.country : '') || '';
  const region = (typeof sp.region === 'string' ? sp.region : '') || '';
  const grape = (typeof sp.grape === 'string' ? sp.grape : '') || '';
  const priceRange = (typeof sp.priceRange === 'string' ? sp.priceRange : '') || '';
  const sortBy = (typeof sp.sortBy === 'string' ? sp.sortBy : '') || '';

  const offset = (page - 1) * PAGE_SIZE;

  const [{ wines, total }, countries, grapes, regions, types] = await Promise.all([
    getTopWines(PAGE_SIZE, offset, {
      type: type || undefined,
      country: country || undefined,
      region: region || undefined,
      grape: grape || undefined,
      priceRange: priceRange || undefined,
      sortBy: sortBy || undefined,
    }),
    getAllCountries(),
    getAllGrapes(),
    getAllRegions(),
    getAllTypes(),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  // Build URL with current filters
  function buildUrl(overrides: Record<string, string | number | undefined>) {
    const params = new URLSearchParams();
    const merged: Record<string, string | number | undefined> = {
      type, country, region, grape, priceRange, sortBy,
      page: page.toString(),
      ...overrides,
    };
    for (const [k, v] of Object.entries(merged)) {
      if (v && v !== '' && !(k === 'page' && v === '1')) {
        params.set(k, String(v));
      }
    }
    const qs = params.toString();
    return `/rankings${qs ? `?${qs}` : ''}`;
  }

  return (
    <>
      <section className="border-b border-card-border bg-gradient-to-b from-[#1a0a10] via-[#080808] to-[#080808]">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold text-text sm:text-5xl">Wine Rankings</h1>
          <p className="mt-3 text-text/50">
            All {total.toLocaleString()} wines ranked by aggregated critic scores. Filter, sort, and find your perfect bottle.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 rounded-2xl border border-card-border bg-card-bg p-4">
          {/* Type filter */}
          <div className="flex flex-wrap gap-2">
            <Link
              href={buildUrl({ type: undefined, page: 1 })}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${!type ? 'bg-wine text-white' : 'bg-card-bg border border-card-border text-text/60 hover:text-wine'}`}
            >
              All Types
            </Link>
            {types.map(t => (
              <Link
                key={t}
                href={buildUrl({ type: t.toLowerCase(), page: 1 })}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${type.toLowerCase() === t.toLowerCase() ? 'bg-wine text-white' : 'bg-card-bg border border-card-border text-text/60 hover:text-wine'}`}
              >
                {t}
              </Link>
            ))}
          </div>

          {/* Country filter */}
          <div className="relative">
            <select
              defaultValue={country}
              onChange={undefined}
              className="appearance-none rounded-full border border-card-border bg-[#111] px-4 py-1.5 pr-8 text-xs text-text/60 outline-none focus:border-wine/40"
            >
              <option value="">All Countries</option>
              {countries.map(c => (
                <option key={c.slug} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Region filter */}
          <div className="relative">
            <select
              defaultValue={region}
              className="appearance-none rounded-full border border-card-border bg-[#111] px-4 py-1.5 pr-8 text-xs text-text/60 outline-none focus:border-wine/40"
            >
              <option value="">All Regions</option>
              {regions.map(r => (
                <option key={r.slug} value={r.name}>{r.name}</option>
              ))}
            </select>
          </div>

          {/* Grape filter */}
          <div className="relative">
            <select
              defaultValue={grape}
              className="appearance-none rounded-full border border-card-border bg-[#111] px-4 py-1.5 pr-8 text-xs text-text/60 outline-none focus:border-wine/40"
            >
              <option value="">All Grapes</option>
              {grapes.map(g => (
                <option key={g.slug} value={g.name}>{g.name}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="ml-auto flex gap-2">
            {[
              { value: '', label: 'Score' },
              { value: 'price-low', label: 'Price (Low)' },
              { value: 'price-high', label: 'Price (High)' },
              { value: 'name', label: 'Name' },
            ].map(s => (
              <Link
                key={s.value}
                href={buildUrl({ sortBy: s.value || undefined, page: 1 })}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${sortBy === s.value ? 'bg-wine text-white' : 'text-text/40 hover:text-wine'}`}
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Active filter links for countries/regions/grapes */}
        {(country || region || grape) && (
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {country && (
              <Link href={buildUrl({ country: undefined, page: 1 })} className="inline-flex items-center gap-1 rounded-full bg-wine/10 px-3 py-1 text-wine/80 hover:bg-wine/20">
                {country} <span className="text-wine/50">x</span>
              </Link>
            )}
            {region && (
              <Link href={buildUrl({ region: undefined, page: 1 })} className="inline-flex items-center gap-1 rounded-full bg-wine/10 px-3 py-1 text-wine/80 hover:bg-wine/20">
                {region} <span className="text-wine/50">x</span>
              </Link>
            )}
            {grape && (
              <Link href={buildUrl({ grape: undefined, page: 1 })} className="inline-flex items-center gap-1 rounded-full bg-wine/10 px-3 py-1 text-wine/80 hover:bg-wine/20">
                {grape} <span className="text-wine/50">x</span>
              </Link>
            )}
          </div>
        )}

        <div className="mt-4 mb-6 flex items-center justify-between text-sm text-text/40">
          <span>{total.toLocaleString()} wines found</span>
          <span>Page {page} of {totalPages}</span>
        </div>

        {/* Wine Cards */}
        {wines.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {wines.map((wine, i) => (
              <WineCard key={wine.slug} wine={wine} rank={offset + i + 1} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="font-serif text-2xl text-text/40">No wines found</p>
            <p className="mt-2 text-sm text-text/30">Try adjusting your filters.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            {page > 1 && (
              <Link
                href={buildUrl({ page: page - 1 })}
                className="rounded-full border border-card-border px-4 py-2 text-sm text-text/60 transition-colors hover:border-wine/30 hover:text-wine"
              >
                Previous
              </Link>
            )}

            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              let pageNum: number;
              if (totalPages <= 7) {
                pageNum = i + 1;
              } else if (page <= 4) {
                pageNum = i + 1;
              } else if (page >= totalPages - 3) {
                pageNum = totalPages - 6 + i;
              } else {
                pageNum = page - 3 + i;
              }
              return (
                <Link
                  key={pageNum}
                  href={buildUrl({ page: pageNum })}
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                    pageNum === page
                      ? 'bg-wine text-white'
                      : 'border border-card-border text-text/60 hover:border-wine/30 hover:text-wine'
                  }`}
                >
                  {pageNum}
                </Link>
              );
            })}

            {page < totalPages && (
              <Link
                href={buildUrl({ page: page + 1 })}
                className="rounded-full border border-card-border px-4 py-2 text-sm text-text/60 transition-colors hover:border-wine/30 hover:text-wine"
              >
                Next
              </Link>
            )}
          </div>
        )}

        <AdUnit format="horizontal" className="mt-12" />
      </div>
    </>
  );
}
