import type { Metadata } from 'next';
import Link from 'next/link';
import AdUnit from '@/components/AdUnit';
import { getAllScoreSources, getScoreSourceInfo, getAllWines, getAllCountries } from '@/lib/wine-db';

export const revalidate = 604800;

export const metadata: Metadata = {
  title: 'About Us | Our Methodology | 50 Best Wines',
  description: 'Learn how 50 Best Wines aggregates scores from 8 major wine critics to create the most comprehensive, unbiased wine ranking in the world.',
  openGraph: {
    title: 'About Us | 50 Best Wines',
    description: 'Our meta-search methodology explained. How we aggregate wine scores from the world\'s top critics.',
    type: 'website',
    siteName: '50 Best Wines',
  },
};

export default function AboutPage() {
  const sources = getAllScoreSources();
  const totalWines = getAllWines().length;
  const totalCountries = getAllCountries().length;

  return (
    <>
      {/* Hero */}
      <section className="border-b border-card-border bg-gradient-to-b from-[#1a0a10] via-[#080808] to-[#080808]">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold text-text sm:text-5xl">About 50 Best Wines</h1>
          <p className="mt-3 text-lg text-text/50">The world&apos;s most comprehensive wine meta-ranking.</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
        {/* Mission */}
        <section>
          <h2 className="mb-4 font-serif text-2xl font-bold text-text">Our Mission</h2>
          <div className="space-y-4 text-sm leading-relaxed text-text/60">
            <p>
              In a world where dozens of wine critics each publish their own scores, choosing a great bottle can be overwhelming. 50 Best Wines exists to solve that problem. We aggregate scores from the world&apos;s most respected wine publications into a single, reliable ranking you can trust.
            </p>
            <p>
              Our goal is simple: provide wine lovers, collectors, sommeliers, and curious drinkers with an independent, data-driven resource that reflects the global consensus on wine quality. No single critic can taste every wine, but by combining the expertise of many, we create a ranking that is more comprehensive and less biased than any individual source.
            </p>
          </div>
        </section>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-card-border bg-card-bg p-6 text-center">
            <p className="font-serif text-3xl font-bold text-wine">{totalWines.toLocaleString()}+</p>
            <p className="mt-1 text-sm text-text/50">Wines Ranked</p>
          </div>
          <div className="rounded-xl border border-card-border bg-card-bg p-6 text-center">
            <p className="font-serif text-3xl font-bold text-wine">8</p>
            <p className="mt-1 text-sm text-text/50">Critic Sources</p>
          </div>
          <div className="rounded-xl border border-card-border bg-card-bg p-6 text-center">
            <p className="font-serif text-3xl font-bold text-wine">{totalCountries}+</p>
            <p className="mt-1 text-sm text-text/50">Countries Covered</p>
          </div>
        </div>

        <AdUnit format="horizontal" />

        {/* Methodology */}
        <section>
          <h2 className="mb-4 font-serif text-2xl font-bold text-text">Our Methodology</h2>
          <div className="space-y-4 text-sm leading-relaxed text-text/60">
            <p>
              Our ranking methodology is built on four key principles: <strong className="text-text/80">comprehensiveness</strong>, <strong className="text-text/80">normalization</strong>, <strong className="text-text/80">weighting</strong>, and <strong className="text-text/80">transparency</strong>.
            </p>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-card-border bg-card-bg p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-wine/10 text-xl">1</div>
              <h3 className="mb-2 font-serif text-lg font-bold text-text">Score Collection</h3>
              <p className="text-sm text-text/50">We gather scores from 8 major wine publications. Each source brings a different perspective &mdash; from professional critics to community-driven ratings.</p>
            </div>
            <div className="rounded-xl border border-card-border bg-card-bg p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-wine/10 text-xl">2</div>
              <h3 className="mb-2 font-serif text-lg font-bold text-text">Normalization</h3>
              <p className="text-sm text-text/50">Different critics use different scales. We normalize every score to a standard 100-point scale, ensuring fair comparison across sources.</p>
            </div>
            <div className="rounded-xl border border-card-border bg-card-bg p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-wine/10 text-xl">3</div>
              <h3 className="mb-2 font-serif text-lg font-bold text-text">Weighted Aggregation</h3>
              <p className="text-sm text-text/50">Sources are weighted by their reputation, consistency, and depth of coverage. A wine praised by multiple critics ranks higher than one championed by a single voice.</p>
            </div>
            <div className="rounded-xl border border-card-border bg-card-bg p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-wine/10 text-xl">4</div>
              <h3 className="mb-2 font-serif text-lg font-bold text-text">Monthly Updates</h3>
              <p className="text-sm text-text/50">Rankings are refreshed monthly with new reviews, vintage releases, and competition results to ensure accuracy and timeliness.</p>
            </div>
          </div>
        </section>

        <AdUnit format="horizontal" />

        {/* Score Sources */}
        <section>
          <h2 className="mb-6 font-serif text-2xl font-bold text-text">Our Sources</h2>
          <p className="mb-6 text-sm text-text/60">We track scores from the following major wine publications and critics:</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {sources.map((sourceName) => {
              const info = getScoreSourceInfo(sourceName);
              return (
                <div key={sourceName} className="rounded-xl border border-card-border bg-card-bg p-5">
                  <h3 className="font-serif text-base font-bold text-text">{info.name}</h3>
                  <p className="mt-1 text-xs text-wine/60">{info.maxScore}-point scale</p>
                  {info.description && <p className="mt-2 text-sm text-text/50">{info.description}</p>}
                </div>
              );
            })}
          </div>
        </section>

        {/* Editorial Independence */}
        <section>
          <h2 className="mb-4 font-serif text-2xl font-bold text-text">Editorial Independence</h2>
          <div className="space-y-4 text-sm leading-relaxed text-text/60">
            <p>
              50 Best Wines is editorially independent. Our rankings are determined solely by aggregated critic scores and our published methodology. No winery, distributor, or retailer can pay to influence their position in our rankings.
            </p>
            <p>
              We do include affiliate links to trusted retailers where you can purchase reviewed wines. We may earn a small commission from these referrals, which helps fund our editorial work. These affiliate relationships never influence our scores or rankings.
            </p>
          </div>
        </section>

        {/* Team */}
        <section>
          <h2 className="mb-4 font-serif text-2xl font-bold text-text">Our Team</h2>
          <p className="text-sm leading-relaxed text-text/60">
            50 Best Wines is operated by 50 Best Limited, an independent media company specializing in data-driven, meta-aggregated rankings across multiple lifestyle verticals. Our wine editorial team combines expertise in data science, wine journalism, and sommelier training to deliver the most reliable wine rankings available online.
          </p>
        </section>

        <AdUnit format="horizontal" />

        {/* CTA */}
        <div className="rounded-2xl border border-wine/20 bg-gradient-to-br from-wine/10 to-transparent p-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-text">Have Questions?</h2>
          <p className="mt-2 text-sm text-text/50">Want to know more about our methodology or suggest a wine for review?</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-wine to-wine-light px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90">
              Contact Us
            </Link>
            <Link href="/submit" className="inline-flex items-center gap-2 rounded-xl border border-wine/20 px-6 py-3 text-sm font-medium text-wine transition-colors hover:bg-wine/10">
              Submit a Wine
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
