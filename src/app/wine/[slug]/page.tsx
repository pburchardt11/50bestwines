import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdUnit from '@/components/AdUnit';
import ScoreBar from '@/components/ScoreBar';
import ScoreComparison from '@/components/ScoreComparison';
import BadgeDisplay from '@/components/BadgeDisplay';
import WineCard from '@/components/WineCard';
import WishlistButton from '@/components/WishlistButton';
import WineActions from '@/components/WineActions';
import FAQSection from '@/components/FAQSection';
import {
  getWineBySlug,
  getSimilarWines,
  getWineVintagesBySlug,
  wineHasSufficientContent,
} from '@/lib/wine-db';

export const revalidate = 0; // No cache until vintage data is fixed

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const wine = await getWineBySlug(slug);
  if (!wine) return { title: 'Wine Not Found | 50 Best Wines' };

  const title = `${wine.name} ${wine.vintage || ''} Review & Score | 50 Best Wines`.trim();
  const description = `${wine.name} ${wine.vintage || ''} by ${wine.producer} scores ${wine.aggregateScore}/100 aggregated from top critics. ${wine.tastingNotes?.slice(0, 120)}...`;

  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      siteName: '50 Best Wines',
    },
  };

  if (!wineHasSufficientContent(wine)) {
    metadata.robots = { index: false, follow: true };
  }

  return metadata;
}

export default async function WineDetailPage({ params }: Props) {
  const { slug } = await params;
  const wine = await getWineBySlug(slug);
  if (!wine) notFound();

  const [similar, vintages] = await Promise.all([
    getSimilarWines(wine, 4),
    getWineVintagesBySlug(slug),
  ]);

  // Detect fake vintage data: if ALL vintages share the same ratingCount AND same scores,
  // it's duplicated aggregate data — don't show per-vintage table.
  const hasUniqueVintageData = (() => {
    if (vintages.length <= 1) return false;
    const first = vintages[0];
    for (let i = 1; i < vintages.length; i++) {
      const v = vintages[i];
      if (v.ratingCount !== first.ratingCount) return true;
      // Compare scores ignoring the embedded vintage field (which always differs)
      const stripVintage = (scores: typeof v.scores) =>
        (scores || []).map(s => ({ source: s.source, score: s.score, maxScore: s.maxScore }));
      const a = JSON.stringify(stripVintage(v.scores));
      const b = JSON.stringify(stripVintage(first.scores));
      if (a !== b) return true;
    }
    return false;
  })();

  // Collect all unique score sources across vintages for the table header
  const allSources = new Set<string>();
  vintages.forEach(v => {
    v.scores?.forEach(s => allSources.add(s.source));
  });
  const sourceList = Array.from(allSources);

  const reviewJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Product',
      name: `${wine.name} ${wine.vintage || ''}`.trim(),
      brand: { '@type': 'Brand', name: wine.producer },
      category: 'Wine',
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: wine.aggregateScore,
      bestRating: 100,
      worstRating: 0,
    },
    author: { '@type': 'Organization', name: '50 Best Wines' },
    publisher: { '@type': 'Organization', name: '50 Best Wines' },
    reviewBody: wine.editorial || wine.tastingNotes,
  };

  const faqItems = [
    {
      question: `What score does ${wine.name} ${wine.vintage || ''} receive?`,
      answer: `${wine.name} ${wine.vintage || ''} by ${wine.producer} receives an aggregate community score of ${wine.aggregateScore}/100, compiled from ${wine.scores?.length || 0} rating source${wine.scores?.length !== 1 ? 's' : ''} using Bayesian averaging.`,
    },
    {
      question: `What does ${wine.name} taste like?`,
      answer: wine.tastingNotes || `${wine.name} is a ${wine.type} wine from ${wine.region}, ${wine.country}, made primarily from ${wine.grape} grapes.`,
    },
    {
      question: `How much does ${wine.name} cost?`,
      answer: wine.price > 0
        ? `${wine.name} ${wine.vintage || ''} is priced at approximately $${wine.price}, placing it in the ${wine.priceRange} category.`
        : `Pricing for ${wine.name} ${wine.vintage || ''} varies by retailer. Check the buy link above for current availability and pricing.`.trim(),
    },
    {
      question: `What food pairs well with ${wine.name}?`,
      answer: wine.pairings?.length
        ? `${wine.name} pairs well with ${wine.pairings.join(', ')}.`
        : `As a ${wine.type} wine from ${wine.region}, ${wine.name} pairs well with classic regional cuisine.`,
    },
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Breadcrumb */}
      <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-text/40">
          <li><Link href="/" className="hover:text-wine transition-colors">Home</Link></li>
          <li>/</li>
          <li><Link href="/rankings" className="hover:text-wine transition-colors">Rankings</Link></li>
          <li>/</li>
          <li><Link href={`/country/${wine.countryCode?.toLowerCase() || wine.country?.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-wine transition-colors">{wine.country}</Link></li>
          <li>/</li>
          <li className="text-text/60">{wine.name}</li>
        </ol>
      </nav>

      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="rounded-full bg-wine/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-wine/80">{wine.type}</span>
                {wine.vintage && <span className="rounded-full bg-card-border px-3 py-1 text-xs font-medium text-text/50">{wine.vintage}</span>}
              </div>
              <div className="flex items-start gap-4">
                <h1 className="font-serif text-3xl font-bold text-text sm:text-4xl lg:text-5xl">
                  {wine.name}
                </h1>
                <div className="mt-2 shrink-0">
                  <WishlistButton slug={wine.slug} />
                </div>
              </div>
              <p className="mt-2 text-lg text-text/50">
                {wine.producer} &middot; {wine.region}, {wine.country}
              </p>
              {wine.editorial && (
                <p className="mt-3 text-base leading-relaxed text-text/60">
                  {wine.editorial}
                </p>
              )}
              <div className="mt-4">
                <WineActions slug={wine.slug} />
              </div>
            </div>

            {/* Aggregate Score */}
            <div className="flex items-center gap-6 rounded-2xl border border-card-border bg-card-bg p-6">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-wine/40 bg-wine/10 shadow-[0_0_30px_rgba(139,34,82,0.2)]">
                <span className="font-serif text-4xl font-bold text-wine">{wine.aggregateScore}</span>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-wine/70">Aggregate Score</p>
                <p className="mt-1 text-sm text-text/50">
                  Based on community ratings across {vintages.length || 1} vintage{vintages.length !== 1 ? 's' : ''}, normalized using Bayesian averaging.
                </p>
              </div>
            </div>

            {/* Score Comparison */}
            <ScoreComparison score={wine.aggregateScore} />

            {/* Badges — only show section if there are real ranking badges */}
            {wine.badges && wine.badges.some(b => !['Exceptional','Outstanding','Highly Rated','Popular Choice','Well Known','Best Value'].includes(b)) && (
              <div>
                <h2 className="mb-3 font-serif text-lg font-bold text-text">Awards & Recognition</h2>
                <BadgeDisplay badges={wine.badges} />
              </div>
            )}

            {/* Individual Scores */}
            {wine.scores && wine.scores.length > 0 && (
              <div className="rounded-2xl border border-card-border bg-card-bg p-6">
                <h2 className="mb-4 font-serif text-xl font-bold text-text">Critic Scores</h2>
                <div className="space-y-4">
                  {wine.scores.map((s) => (
                    <ScoreBar
                      key={`${s.source}-${s.vintage || ''}`}
                      label={`${s.source}${s.vintage ? ` (${s.vintage})` : ''}`}
                      score={s.score}
                      max={s.maxScore}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Vintages & Ratings */}
            {vintages.length > 0 && (
              <div className="rounded-2xl border border-card-border bg-card-bg p-6">
                <h2 className="mb-4 font-serif text-xl font-bold text-text">Vintages & Ratings</h2>
                {hasUniqueVintageData ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-card-border">
                          <th className="pb-3 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-text/40">Year</th>
                          <th className="pb-3 pr-4 text-right text-xs font-semibold uppercase tracking-wider text-text/40"># Ratings</th>
                          {sourceList.map(source => (
                            <th key={source} className="pb-3 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-text/40 whitespace-nowrap">
                              {source}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {vintages.map(v => {
                          const scoreMap = new Map(v.scores?.map(s => [s.source, s]) || []);
                          return (
                            <tr key={v.year} className="border-b border-card-border/50 last:border-0">
                              <td className="py-3 pr-4 font-serif font-bold text-text">{v.year || 'N.V.'}</td>
                              <td className="py-3 pr-4 text-right text-text/50 text-xs">
                                {v.ratingCount > 0 ? v.ratingCount.toLocaleString() : '--'}
                              </td>
                              {sourceList.map(source => {
                                const s = scoreMap.get(source);
                                return (
                                  <td key={source} className="py-3 pr-4">
                                    {s ? (
                                      <span className="inline-flex items-center gap-1">
                                        <span className="font-serif font-bold text-wine">{s.score}</span>
                                        <span className="text-text/30">/{s.maxScore}</span>
                                      </span>
                                    ) : <span className="text-text/20">--</span>}
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-text/50">
                      Vintage-specific ratings coming soon. Current aggregate:{' '}
                      <span className="font-serif font-bold text-wine">{wine.aggregateScore}/100</span>{' '}
                      based on{' '}
                      <span className="font-medium text-text/70">{vintages[0]?.ratingCount?.toLocaleString() || 0}</span>{' '}
                      ratings across all vintages.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {vintages.map(v => (
                        <span
                          key={v.year}
                          className="rounded-full border border-card-border bg-card-bg px-3 py-1 text-xs font-medium text-text/50"
                        >
                          {v.year || 'N.V.'}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <AdUnit format="horizontal" />

            {/* Tasting Notes — only show if note is specific enough (50+ chars) */}
            {wine.tastingNotes && wine.tastingNotes.length >= 50 && (
              <div>
                <h2 className="mb-3 font-serif text-xl font-bold text-text">Tasting Notes</h2>
                <p className="text-sm leading-relaxed text-text/60">{wine.tastingNotes}</p>
              </div>
            )}

            {/* Editorial */}
            {wine.editorial && (
              <div>
                <h2 className="mb-3 font-serif text-xl font-bold text-text">Our Review</h2>
                <div className="rounded-xl border-l-4 border-wine/40 bg-card-bg p-6">
                  <p className="text-sm italic leading-relaxed text-text/60">{wine.editorial}</p>
                </div>
              </div>
            )}

            {/* Food Pairings */}
            {wine.pairings && wine.pairings.length > 0 && (
              <div>
                <h2 className="mb-3 font-serif text-xl font-bold text-text">Food Pairings</h2>
                <div className="flex flex-wrap gap-2">
                  {wine.pairings.map((p) => (
                    <span key={p} className="rounded-full border border-card-border bg-card-bg px-4 py-2 text-sm text-text/60">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Serving & Aging */}
            <div className="grid gap-4 sm:grid-cols-2">
              {wine.servingTemp && (
                <div className="rounded-xl border border-card-border bg-card-bg p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-wine/60">Serving Temperature</p>
                  <p className="mt-1 font-serif text-lg font-bold text-text">{wine.servingTemp}</p>
                </div>
              )}
              {wine.aging && (
                <div className="rounded-xl border border-card-border bg-card-bg p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-wine/60">Aging Potential</p>
                  <p className="mt-1 font-serif text-lg font-bold text-text">{wine.aging}</p>
                </div>
              )}
            </div>

            {/* Pros & Cons */}
            {wine.prosAndCons && (
              <div className="grid gap-4 sm:grid-cols-2">
                {wine.prosAndCons.pros && wine.prosAndCons.pros.length > 0 && (
                  <div className="rounded-xl border border-emerald-900/30 bg-emerald-950/10 p-5">
                    <h3 className="mb-3 font-serif text-lg font-bold text-emerald-400">Pros</h3>
                    <ul className="space-y-2">
                      {wine.prosAndCons.pros.map((pro: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-text/60">
                          <span className="mt-0.5 text-emerald-400">+</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {wine.prosAndCons.cons && wine.prosAndCons.cons.length > 0 && (
                  <div className="rounded-xl border border-red-900/30 bg-red-950/10 p-5">
                    <h3 className="mb-3 font-serif text-lg font-bold text-red-400">Cons</h3>
                    <ul className="space-y-2">
                      {wine.prosAndCons.cons.map((con: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-text/60">
                          <span className="mt-0.5 text-red-400">-</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Why This Score? */}
            <div className="rounded-2xl border border-card-border bg-card-bg p-6">
              <h2 className="mb-3 font-serif text-xl font-bold text-text">Why This Score?</h2>
              <p className="text-sm leading-relaxed text-text/50">
                This wine&apos;s score of <span className="font-bold text-wine">{wine.aggregateScore}</span> is
                based on {wine.scores?.length || 0} community rating{wine.scores?.length !== 1 ? 's' : ''} using
                Bayesian averaging, which prevents wines with very few ratings from ranking artificially high.
                Each score source is normalized to a common 100-point scale and weighted by the credibility and
                consistency of the publication. This gives you a single, reliable number that reflects the
                consensus of the global wine community.
              </p>
            </div>

            {/* Find & Buy This Wine */}
            <div className="rounded-2xl border border-card-border bg-card-bg p-6">
              <h2 className="mb-4 font-serif text-xl font-bold text-text">Find & Buy This Wine</h2>
              <p className="mb-4 text-sm text-text/40">
                Search for {wine.name} {wine.vintage || ''} across trusted online retailers.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {(() => {
                  const q = encodeURIComponent(`${wine.producer} ${wine.name} ${wine.vintage || ''}`.trim());
                  const qShort = encodeURIComponent(`${wine.name} ${wine.vintage || ''}`.trim());
                  // Affiliate-ready URLs — replace AFFILIATE_ID placeholders with your actual IDs
                  // Wine.com: Sign up at CJ Affiliate (cj.com), get your PID and AID
                  // Total Wine: Sign up at Impact (impact.com), get your tracking URL
                  return [
                    {
                      name: 'Wine.com',
                      url: process.env.NEXT_PUBLIC_WINECOM_AFFILIATE_ID
                        ? `https://www.anrdoezrs.net/click-${process.env.NEXT_PUBLIC_WINECOM_AFFILIATE_ID}?url=${encodeURIComponent(`https://www.wine.com/search?q=${qShort}`)}`
                        : `https://www.wine.com/search?q=${qShort}`,
                      color: 'from-[#8b2252] to-[#6b1a3f]',
                    },
                    {
                      name: 'Vivino',
                      url: `https://www.vivino.com/search/wines?q=${q}`,
                      color: 'from-[#9b1d3a] to-[#7a1730]',
                    },
                    {
                      name: 'Total Wine',
                      url: process.env.NEXT_PUBLIC_TOTALWINE_AFFILIATE_ID
                        ? `https://totalwine.sjv.io/${process.env.NEXT_PUBLIC_TOTALWINE_AFFILIATE_ID}?u=${encodeURIComponent(`https://www.totalwine.com/search/all?text=${qShort}`)}`
                        : `https://www.totalwine.com/search/all?text=${qShort}`,
                      color: 'from-[#4a2838] to-[#3a1f2d]',
                    },
                    {
                      name: 'Wine-Searcher',
                      url: `https://www.wine-searcher.com/find/${qShort}`,
                      color: 'from-[#5a3d6b] to-[#3d2a4d]',
                    },
                  ];
                })().map((retailer) => (
                  <a
                    key={retailer.name}
                    href={retailer.url}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    className={`inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${retailer.color} px-5 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90`}
                  >
                    {retailer.name}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ))}
              </div>
              <p className="mt-3 text-[10px] text-text/25">
                Affiliate links. We may earn a commission from purchases.
              </p>
            </div>

            <AdUnit format="horizontal" />

            {/* FAQ */}
            <div>
              <h2 className="mb-4 font-serif text-xl font-bold text-text">Frequently Asked Questions</h2>
              <FAQSection items={faqItems} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Wine Label */}
            <div className="flex justify-center rounded-2xl border border-card-border bg-card-bg p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={wine.labelUrl}
                alt={`${wine.name} wine label`}
                width={200}
                height={267}
                className="rounded-lg"
              />
            </div>

            {/* Key Facts */}
            <div className="rounded-2xl border border-card-border bg-card-bg p-6">
              <h2 className="mb-4 font-serif text-lg font-bold text-text">Key Facts</h2>
              <dl className="space-y-3">
                {[
                  { label: 'Producer', value: wine.producer },
                  { label: 'Region', value: wine.region },
                  { label: 'Sub-Region', value: wine.subRegion },
                  { label: 'Country', value: wine.country },
                  { label: 'Grape', value: wine.grapes?.join(', ') || wine.grape },
                  { label: 'Appellation', value: wine.appellation },
                  { label: 'Type', value: wine.type },
                  { label: 'Alcohol', value: wine.alcoholContent },
                  { label: 'Price', value: wine.price > 0 ? `$${wine.price}` : undefined },
                  { label: 'Price Range', value: wine.price > 0 ? wine.priceRange : undefined },
                ].filter((f) => f.value).map((fact) => (
                  <div key={fact.label} className="flex items-center justify-between border-b border-card-border pb-2 last:border-0 last:pb-0">
                    <dt className="text-xs font-medium uppercase tracking-wider text-text/40">{fact.label}</dt>
                    <dd className="text-sm font-medium text-text/70">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Buy CTA */}
            {wine.buyUrl && (
              <div className="rounded-2xl border border-wine/20 bg-gradient-to-br from-wine/10 to-transparent p-6 text-center">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-wine/60">Buy This Wine</p>
                {wine.price > 0 && <p className="mb-4 font-serif text-2xl font-bold text-text">${wine.price}</p>}
                <a
                  href={wine.buyUrl}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-wine to-wine-light px-6 py-3.5 text-base font-bold text-white transition-opacity hover:opacity-90"
                >
                  Buy Now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <p className="mt-2 text-[10px] text-text/30">Affiliate link. We may earn a commission.</p>
              </div>
            )}

            <AdUnit format="rectangle" />
          </div>
        </div>

        {/* Similar Wines */}
        {similar.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 font-serif text-2xl font-bold text-text">Similar Wines You May Enjoy</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {similar.map((w, i) => (
                <WineCard key={w.slug} wine={w} rank={i + 1} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
