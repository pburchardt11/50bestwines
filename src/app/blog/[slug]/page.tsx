import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdUnit from '@/components/AdUnit';
import FAQSection from '@/components/FAQSection';
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/wine-db';

export const revalidate = 604800;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: 'Post Not Found | 50 Best Wines' };

  return {
    title: `${post.title} | 50 Best Wines Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author || '50 Best Wines'],
      siteName: '50 Best Wines',
    },
  };
}

function renderMarkdown(content: string): string {
  if (!content) return '';

  let html = content
    // Headings
    .replace(/^### (.+)$/gm, '<h3 class="font-serif text-xl font-bold text-text mt-8 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="font-serif text-2xl font-bold text-text mt-10 mb-4">$1</h2>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-text/80">$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Unordered list items
    .replace(/^- (.+)$/gm, '<li class="ml-4 text-sm leading-relaxed text-text/60 list-disc">$1</li>')
    // Ordered list items
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 text-sm leading-relaxed text-text/60 list-decimal">$1</li>')
    // Links
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-wine underline hover:text-wine-light">$1</a>')
    // Paragraphs (lines not already HTML-tagged)
    .replace(/^(?!<[hulo])((?!<li).+)$/gm, '<p class="text-sm leading-relaxed text-text/60 mb-4">$1</p>');

  // Wrap consecutive <li> items in <ul>
  html = html.replace(
    /(<li class="ml-4 text-sm leading-relaxed text-text\/60 list-disc">[\s\S]*?<\/li>\n?)+/g,
    '<ul class="space-y-1 mb-4">$&</ul>'
  );

  return html;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug && (p.category === post.category || p.tags?.some((t: string) => post.tags?.includes(t))))
    .slice(0, 3);

  const shareUrl = `https://50bestwines.com/blog/${post.slug}`;
  const shareText = encodeURIComponent(post.title);

  // Generate contextual FAQs
  const faqItems = [
    {
      question: `What is this article about?`,
      answer: post.excerpt || `This article covers ${post.title}, providing expert insights and analysis.`,
    },
    {
      question: `Who wrote this article?`,
      answer: `This article was written by ${post.author || 'the 50 Best Wines editorial team'}, and published on ${post.date}.`,
    },
    {
      question: `How does 50 Best Wines choose its rankings?`,
      answer: 'We aggregate scores from 8 major wine publications including Wine Spectator, Robert Parker, James Suckling, Decanter, Wine Enthusiast, Vivino, Jancis Robinson, and Tim Atkin MW. Each score is normalized and weighted to produce a single reliable ranking.',
    },
  ];

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author || '50 Best Wines',
    },
    publisher: {
      '@type': 'Organization',
      name: '50 Best Wines',
      url: 'https://50bestwines.com',
    },
    mainEntityOfPage: shareUrl,
  };

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Breadcrumb */}
      <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <ol className="flex items-center gap-1.5 text-sm text-text/40">
          <li><Link href="/" className="hover:text-wine transition-colors">Home</Link></li>
          <li>/</li>
          <li><Link href="/blog" className="hover:text-wine transition-colors">Blog</Link></li>
          <li>/</li>
          <li className="text-text/60 truncate max-w-[200px]">{post.title}</li>
        </ol>
      </nav>

      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-10">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-wine/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-wine">{post.category}</span>
            <span className="text-xs text-text/30">{post.readTime}</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-text sm:text-4xl lg:text-5xl leading-tight">{post.title}</h1>
          {post.excerpt && (
            <p className="mt-4 text-lg text-text/50">{post.excerpt}</p>
          )}
          <div className="mt-6 flex items-center gap-4 border-t border-b border-card-border py-4">
            <div>
              <p className="text-sm font-medium text-text">{post.author || '50 Best Wines'}</p>
              <p className="text-xs text-text/40">{post.date}</p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div
          className="prose-wine max-w-none"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content || '') }}
        />

        <AdUnit format="horizontal" className="my-10" />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-text/40">Tags:</span>
            {post.tags.map((tag: string) => (
              <span key={tag} className="rounded-full border border-card-border bg-card-bg px-3 py-1 text-xs text-text/50">{tag}</span>
            ))}
          </div>
        )}

        {/* Share */}
        <div className="mb-12 flex items-center gap-3">
          <span className="text-xs font-medium text-text/40">Share:</span>
          <a
            href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-card-border bg-card-bg px-4 py-2 text-xs font-medium text-text/60 transition-colors hover:border-wine/30 hover:text-wine"
          >
            Twitter
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-card-border bg-card-bg px-4 py-2 text-xs font-medium text-text/60 transition-colors hover:border-wine/30 hover:text-wine"
          >
            Facebook
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-card-border bg-card-bg px-4 py-2 text-xs font-medium text-text/60 transition-colors hover:border-wine/30 hover:text-wine"
          >
            LinkedIn
          </a>
        </div>

        {/* FAQ */}
        <div className="mb-12">
          <h2 className="mb-4 font-serif text-xl font-bold text-text">Frequently Asked Questions</h2>
          <FAQSection items={faqItems} />
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section>
            <h2 className="mb-6 font-serif text-2xl font-bold text-text">Related Articles</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((rp) => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group block">
                  <article className="rounded-xl border border-card-border bg-card-bg p-5 transition-all duration-200 hover:border-wine/30">
                    <span className="rounded-full bg-wine/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-wine">{rp.category}</span>
                    <h3 className="mt-2 font-serif text-lg font-bold text-text group-hover:text-wine transition-colors">{rp.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-text/50">{rp.excerpt}</p>
                    <p className="mt-2 text-xs text-text/30">{rp.date}</p>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      <AdUnit format="horizontal" className="mx-auto max-w-4xl px-4 pb-12" />
    </>
  );
}
