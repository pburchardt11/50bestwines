import Link from 'next/link';
import AdUnit from '@/components/AdUnit';
import FAQSection from '@/components/FAQSection';
import RankingsTable from '@/components/RankingsTable';
import {
  getTopWinesGlobal,
  getAllWines,
  getAllCountries,
  getAllGrapes,
  getAllBlogPosts,
  getAllTypes,
  getWinesByType,
} from '@/lib/wine-db';

export const revalidate = 604800;

export default function HomePage() {
  const top5 = getTopWinesGlobal(5);
  const top50 = getTopWinesGlobal(50);
  const allWines = getAllWines().sort((a, b) => b.aggregateScore - a.aggregateScore);
  const countries = getAllCountries();
  const grapes = getAllGrapes();
  const blogPosts = getAllBlogPosts().slice(0, 6);
  const totalWines = getAllWines().length;
  const types = getAllTypes();

  const typeIcons: Record<string, { icon: string; description: string }> = {
    Red: { icon: '🍷', description: 'Full-bodied reds from Cabernet to Pinot Noir' },
    White: { icon: '🥂', description: 'Crisp whites from Chardonnay to Riesling' },
    Rosé: { icon: '🌸', description: 'Elegant rosés from Provence to California' },
    Sparkling: { icon: '🍾', description: 'Champagne, Cava, Prosecco, and more' },
    Dessert: { icon: '🍯', description: 'Sweet wines from Sauternes to Ice Wine' },
    Fortified: { icon: '🏺', description: 'Port, Sherry, Madeira, and Marsala' },
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '50 Best Wines',
    url: 'https://50bestwines.com',
    dateModified: '2026-07-01',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://50bestwines.com/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const faqItems = [
    {
      question: 'How do you aggregate wine scores?',
      answer: 'We collect scores from the world\'s most respected wine critics and publications — including Wine Spectator, Robert Parker\'s Wine Advocate, James Suckling, Decanter, Wine Enthusiast, Jancis Robinson, and Tim Atkin. Each score is normalized to a 100-point scale and weighted by the credibility and consistency of the source. Our aggregate score gives you a single, reliable number that reflects the consensus of the global wine community.',
    },
    {
      question: 'What wine review sources do you track?',
      answer: 'We track scores from eight major wine publications: Wine Spectator (100-point scale), Robert Parker Wine Advocate (100-point scale), James Suckling (100-point scale), Decanter (100-point scale), Wine Enthusiast (100-point scale), Vivino (5-point community scale), Jancis Robinson (20-point scale), and Tim Atkin MW (100-point scale). Each source brings a different perspective, from professional critics to community ratings.',
    },
    {
      question: 'How often are rankings updated?',
      answer: 'Our rankings are updated monthly as new reviews are published by our tracked sources. Major updates coincide with key industry events like Bordeaux En Primeur releases, Wine Spectator\'s annual Top 100, and Robert Parker\'s regional reports.',
    },
    {
      question: 'What do the badges mean?',
      answer: 'Badges indicate special recognition from specific publications. For example, "Wine Spectator Top 100" means the wine was included in Wine Spectator\'s annual Top 100 list. "Parker 95+" indicates a score of 95 or above from Robert Parker\'s Wine Advocate. These badges help you quickly identify wines with exceptional critical acclaim.',
    },
    {
      question: 'How do wine scores work?',
      answer: 'Most professional wine critics use a 100-point scale. Scores of 90-94 indicate an outstanding wine, 95-97 a classic wine of exceptional quality, and 98-100 a perfect or near-perfect wine. Scores below 85 are generally considered average. Our aggregate score normalizes all sources to this 100-point scale.',
    },
    {
      question: 'Can I buy wines through this site?',
      answer: 'Yes! Each wine review includes links to trusted online retailers where you can purchase the wine. We may earn a small commission from these referrals, which helps support our independent editorial work.',
    },
    {
      question: 'How do I choose a wine for my budget?',
      answer: 'Use our price range filters to find highly-rated wines at every price point. Our "Best Value" badge highlights wines that punch well above their weight in quality relative to price. Filter by "Budget" to find exceptional wines under $15.',
    },
    {
      question: 'What is the difference between Old World and New World wine?',
      answer: 'Old World wines come from traditional European wine regions (France, Italy, Spain, Germany, Portugal) and tend to emphasize terroir and subtlety. New World wines come from regions like California, Australia, Argentina, Chile, South Africa, and New Zealand, and often feature bolder fruit flavors.',
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

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Top 50 Best Wines 2026',
    numberOfItems: top50.length,
    itemListElement: top50.map((wine, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${wine.name} ${wine.vintage || ''}`.trim(),
      url: `https://50bestwines.com/wine/${wine.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-card-border bg-gradient-to-b from-[#1a0a10] via-[#080808] to-[#080808]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,34,82,0.15)_0%,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <h1 className="font-serif text-5xl font-bold leading-tight tracking-tighter text-text sm:text-6xl lg:text-7xl">
            The World&apos;s Finest Wines,<br className="hidden sm:block" /> Ranked by the Critics
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text/60">
            Aggregated scores from {totalWines.toLocaleString()}+ wines across Wine Spectator, Robert Parker,
            James Suckling, Decanter, and more. One score to trust.
          </p>
          <p className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-wine/20 bg-wine/5 px-4 py-1.5 text-xs font-medium text-wine/80">
            <span className="h-1.5 w-1.5 rounded-full bg-wine" />
            Last updated: July 2026
          </p>

          <div className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-base text-text/60">
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold text-wine">{totalWines.toLocaleString()}+</span>
              <span>Wines Scored</span>
            </div>
            <span className="hidden text-card-border sm:inline">|</span>
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold text-wine">8</span>
              <span>Critics Tracked</span>
            </div>
            <span className="hidden text-card-border sm:inline">|</span>
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold text-wine">{countries.length}+</span>
              <span>Countries</span>
            </div>
            <span className="hidden text-card-border sm:inline">|</span>
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold text-wine">Meta</span>
              <span>Aggregated</span>
            </div>
          </div>

          <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-text/30">
            <span>Wine Spectator</span><span>&middot;</span>
            <span>Robert Parker</span><span>&middot;</span>
            <span>James Suckling</span><span>&middot;</span>
            <span>Decanter</span><span>&middot;</span>
            <span>Wine Enthusiast</span><span>&middot;</span>
            <span>Vivino</span><span>&middot;</span>
            <span>Jancis Robinson</span><span>&middot;</span>
            <span>Tim Atkin</span>
          </div>
        </div>
      </section>

      {/* Editor's Top Picks */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-wine/70">Editor&apos;s Choice</p>
          <h2 className="font-serif text-3xl font-bold text-text sm:text-4xl">Top 5 Wines of 2026</h2>
          <p className="mt-3 text-text/50">The highest-scoring wines across all major critics.</p>
        </div>

        <div className="space-y-4">
          {top5.map((wine, i) => (
            <div key={wine.slug} className="relative overflow-hidden rounded-2xl border border-card-border bg-card-bg p-6 transition-all duration-300 hover:border-wine/30 hover:shadow-[0_0_40px_rgba(139,34,82,0.08)] sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-wine to-wine-light font-serif text-2xl font-bold text-white">{i + 1}</div>
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-wine/30 bg-wine/5">
                  <span className="font-serif text-2xl font-bold text-wine">{wine.aggregateScore}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-2xl">{wine.type === 'Red' ? '🍷' : wine.type === 'White' ? '🥂' : wine.type === 'Sparkling' ? '🍾' : '🍷'}</span>
                    <h3 className="font-serif text-xl font-bold text-text sm:text-2xl">{wine.name} {wine.vintage || ''}</h3>
                    <span className="rounded-full bg-wine/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-wine/80">{wine.type}</span>
                  </div>
                  <p className="mt-1 text-sm text-text/40">{wine.producer} &middot; {wine.region}, {wine.country}</p>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text/50">{wine.tastingNotes}</p>
                  {wine.badges.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {wine.badges.slice(0, 3).map((b) => (
                        <span key={b} className="rounded-full bg-gold/10 px-2 py-0.5 text-[10px] font-medium text-gold/80">🏅 {b}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex shrink-0 flex-col items-end gap-3">
                  <span className="rounded-full bg-wine/10 px-3 py-1 text-xs font-medium text-wine/80">${wine.price}</span>
                  <a href={wine.buyUrl} target="_blank" rel="nofollow sponsored noopener" className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-wine to-wine-light px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90">
                    Buy Now <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </a>
                  <Link href={`/wine/${wine.slug}`} className="text-sm font-medium text-text/50 transition-colors hover:text-wine">Read Review &rarr;</Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/rankings" className="inline-flex items-center gap-2 rounded-full bg-wine px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-wine-light hover:shadow-xl">
            View All Rankings <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>

      <AdUnit format="horizontal" className="mx-auto max-w-4xl px-4" />

      {/* Top 50 Rankings */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-bold text-text sm:text-4xl">Top 50 Wines</h2>
          <p className="mt-3 text-text/50">Ranked by aggregated critic scores. Show more to explore all {totalWines.toLocaleString()} wines.</p>
        </div>
        <RankingsTable wines={allWines.slice(0, 50)} />
      </section>

      <AdUnit format="horizontal" className="mx-auto max-w-4xl px-4" />

      {/* Browse by Type */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-bold text-text sm:text-4xl">Browse by Wine Type</h2>
          <p className="mt-3 text-text/50">Explore the world&apos;s best wines by category.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {types.map((type) => {
            const meta = typeIcons[type] || { icon: '🍷', description: 'Explore top-rated wines' };
            const count = getWinesByType(type).length;
            return (
              <Link key={type} href={`/rankings?type=${type.toLowerCase()}`} className="group flex items-start gap-4 rounded-xl border border-card-border bg-card-bg p-5 transition-all duration-300 hover:border-wine/30 hover:shadow-[0_0_30px_rgba(139,34,82,0.06)]">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-wine/5 text-2xl">{meta.icon}</span>
                <div>
                  <h3 className="font-serif text-lg font-bold text-text group-hover:text-wine transition-colors">{type} Wines</h3>
                  <p className="mt-0.5 text-xs font-medium text-wine/60">{count} wines ranked</p>
                  <p className="mt-1 text-sm text-text/40">{meta.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Browse by Country */}
      <section className="border-t border-card-border bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-bold text-text sm:text-4xl">Explore by Country</h2>
            <p className="mt-3 text-text/50">Discover wines from the world&apos;s top wine-producing nations.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {countries.slice(0, 12).map((country) => (
              <Link key={country.slug} href={`/country/${country.slug}`} className="group flex items-center gap-3 rounded-xl border border-card-border bg-card-bg p-4 transition-all duration-300 hover:border-wine/30">
                <span className="text-3xl">{country.emoji}</span>
                <div>
                  <h3 className="font-serif text-base font-bold text-text group-hover:text-wine transition-colors">{country.name}</h3>
                  <p className="text-xs text-text/40">{country.regions.length} regions</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How We Score */}
      <section className="border-t border-card-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-bold text-text sm:text-4xl">How We Aggregate Scores</h2>
            <p className="mt-3 text-text/50">Our methodology ensures every ranking reflects global consensus.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: '📊', title: 'Collect Scores', description: 'We gather scores from 8 of the world\'s most respected wine critics and publications, covering tens of thousands of wines.' },
              { icon: '⚖️', title: 'Normalize & Weight', description: 'Each score is normalized to a 100-point scale. Sources are weighted by consistency, expertise, and global reputation.' },
              { icon: '🏅', title: 'Award Badges', description: 'Wines receiving special recognition — Top 100 lists, 95+ scores, competition medals — earn badges highlighting their status.' },
              { icon: '🔄', title: 'Update Monthly', description: 'Rankings are refreshed monthly with new reviews, vintage releases, and competition results.' },
            ].map((card) => (
              <div key={card.title} className="rounded-xl border border-card-border bg-card-bg p-6 transition-all duration-300 hover:border-wine/20">
                <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-wine/5 text-2xl">{card.icon}</span>
                <h3 className="mb-2 font-serif text-lg font-bold text-text">{card.title}</h3>
                <p className="text-sm leading-relaxed text-text/50">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Grapes */}
      <section className="border-t border-card-border bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-bold text-text sm:text-4xl">Browse by Grape Variety</h2>
            <p className="mt-3 text-text/50">Find the best wines by your favourite grape.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {grapes.slice(0, 20).map((grape) => (
              <Link key={grape.slug} href={`/grape/${grape.slug}`} className="rounded-full border border-card-border bg-card-bg px-5 py-2.5 text-sm font-medium text-text/70 transition-all hover:border-wine/30 hover:bg-wine/5 hover:text-wine">
                {grape.color === 'Red' ? '🔴' : '⚪'} {grape.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      {blogPosts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-bold text-text sm:text-4xl">Latest from the Blog</h2>
            <p className="mt-3 text-text/50">Expert guides, tasting notes, and industry analysis.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <article className="overflow-hidden rounded-xl border border-card-border bg-card-bg transition-all duration-200 hover:border-wine/30 hover:-translate-y-1">
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="rounded-full bg-wine/20 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-wine">{post.category}</span>
                      <span className="text-xs text-text/30">{post.readTime}</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold leading-snug text-text group-hover:text-wine transition-colors">{post.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-text/50">{post.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-text/30">{post.date}</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-wine/10 px-3 py-1 text-xs font-semibold text-wine group-hover:bg-wine group-hover:text-white transition-colors">Read &rarr;</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/blog" className="inline-flex items-center gap-2 rounded-full border border-wine/20 px-6 py-3 text-sm font-medium text-wine transition-colors hover:bg-wine/10">
              View All Articles <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </section>
      )}

      <AdUnit format="horizontal" className="mx-auto max-w-4xl px-4" />

      {/* 50 Best Trust Bar */}
      <section className="border-t border-card-border bg-[#0a0a0a]">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-wine/60 mb-4">Part of the 50 Best family</p>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-wine/20 bg-wine/5 px-5 py-2">
            <span className="font-serif text-2xl font-bold text-wine">{totalWines.toLocaleString()}+</span>
            <span className="text-sm text-text/50">wines ranked from</span>
            <span className="font-serif text-2xl font-bold text-wine">8</span>
            <span className="text-sm text-text/50">critic sources</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href="https://www.50besthotels.com" target="_blank" rel="noopener noreferrer" className="text-sm text-text/50 transition-colors hover:text-wine">50 Best Hotels</a>
            <span className="text-card-border">|</span>
            <a href="https://www.50bestdatingsites.com" target="_blank" rel="noopener noreferrer" className="text-sm text-text/50 transition-colors hover:text-wine">50 Best Dating Sites</a>
            <span className="text-card-border">|</span>
            <a href="https://www.50bestmatchmaker.com" target="_blank" rel="noopener noreferrer" className="text-sm text-text/50 transition-colors hover:text-wine">50 Best Matchmakers</a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-card-border bg-[#0a0a0a]">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-bold text-text sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-3 text-text/50">Everything you need to know about our wine rankings.</p>
          </div>
          <FAQSection items={faqItems} />
        </div>
      </section>

      {/* SEO Content */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="mb-6 font-serif text-2xl font-bold text-text">The Definitive Wine Ranking: A Meta-Search Approach</h2>
        <div className="space-y-4 text-sm leading-relaxed text-text/50">
          <p>In a world where dozens of wine critics each publish their own scores, it can be overwhelming to know which wines are truly exceptional. That&apos;s why 50 Best Wines aggregates scores from the most respected publications in the wine world — Wine Spectator, Robert Parker&apos;s Wine Advocate, James Suckling, Decanter, Wine Enthusiast, Vivino, Jancis Robinson, and Tim Atkin MW — into a single, reliable ranking.</p>
          <p>Our methodology normalizes scores across different scales (100-point, 20-point, and 5-point systems) and weights each source by its reputation, consistency, and depth of coverage. This ensures that a wine praised universally by multiple critics ranks higher than one championed by a single reviewer.</p>
          <p>Whether you are a seasoned collector searching for the next great Bordeaux vintage, a curious beginner exploring affordable wines from South America, or a sommelier building a restaurant wine list, our rankings provide actionable insight backed by the world&apos;s most authoritative voices in wine criticism.</p>
        </div>
      </section>

      <AdUnit format="horizontal" className="mx-auto max-w-4xl px-4 py-8" />
    </>
  );
}
