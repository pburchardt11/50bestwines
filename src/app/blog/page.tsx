import type { Metadata } from 'next';
import Link from 'next/link';
import AdUnit from '@/components/AdUnit';
import { getAllBlogPosts } from '@/lib/wine-db';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Wine Blog | Expert Guides & Analysis | 50 Best Wines',
  description: 'Expert wine guides, tasting notes, regional deep-dives, and industry analysis from the 50 Best Wines editorial team.',
  openGraph: {
    title: 'Wine Blog | 50 Best Wines',
    description: 'Expert wine guides, tasting notes, and industry analysis.',
    type: 'website',
    siteName: '50 Best Wines',
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  // Group by category
  const grouped: Record<string, typeof posts> = {};
  posts.forEach((post) => {
    const cat = post.category || 'General';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(post);
  });

  return (
    <>
      {/* Hero */}
      <section className="border-b border-card-border bg-gradient-to-b from-[#1a0a10] via-[#080808] to-[#080808]">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold text-text sm:text-5xl">Wine Blog</h1>
          <p className="mt-3 text-text/50">Expert guides, tasting notes, and industry analysis.</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
        {Object.entries(grouped).map(([category, categoryPosts], catIndex) => (
          <section key={category}>
            <div className="mb-6 flex items-center gap-3">
              <h2 className="font-serif text-2xl font-bold text-text">{category}</h2>
              <span className="rounded-full bg-wine/10 px-2.5 py-0.5 text-xs font-medium text-wine/70">{categoryPosts.length}</span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categoryPosts.map((post) => (
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
                        <span className="inline-flex items-center gap-1 rounded-full bg-wine/10 px-3 py-1 text-xs font-semibold text-wine group-hover:bg-wine group-hover:text-white transition-colors">
                          Read &rarr;
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {catIndex % 2 === 0 && <AdUnit format="horizontal" className="mt-8" />}
          </section>
        ))}
      </div>
    </>
  );
}
