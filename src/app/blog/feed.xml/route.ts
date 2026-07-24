import { getAllBlogPosts } from '@/lib/wine-db';

export async function GET() {
  const posts = getAllBlogPosts();
  const baseUrl = 'https://50bestwines.com';

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt || ''}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${post.category || 'General'}</category>
      ${post.author ? `<author>${post.author}</author>` : ''}
    </item>`
    )
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>50 Best Wines Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Expert wine guides, tasting notes, and industry analysis from 50 Best Wines.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/blog/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400',
    },
  });
}
