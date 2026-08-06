import type { Metadata } from 'next';
import Script from 'next/script';
import { Cormorant_Garamond, Outfit } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import LanguageToggle from '@/components/LanguageToggle';
import './globals.css';

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://50bestwines.com'),
  title: 'Which Wines Are Actually Worth It in 2026? 241,000+ Ranked',
  description:
    'Not sure what to drink? 241,457 wines scored by critics and real drinkers. Filter by grape, region or price — with honest tasting notes and buy links.',
  keywords: [
    'best wines',
    'wine rankings',
    'wine reviews',
    'wine scores',
    'best red wines',
    'best white wines',
    'wine ratings 2026',
  ],
  openGraph: {
    title: 'Which Wines Are Actually Worth It in 2026? 241,000+ Ranked',
    description:
      'Not sure what to drink? 241,457 wines scored by critics and real drinkers. Filter by grape, region or price — with honest tasting notes and buy links.',
    type: 'website',
    locale: 'en_US',
    siteName: '50 Best Wines',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Which Wines Are Actually Worth It in 2026? 241,000+ Ranked',
    description:
      'Not sure what to drink? 241,457 wines scored by critics and real drinkers. Filter by grape, region or price — with honest tasting notes and buy links.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://50bestwines.com',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '50 Best Wines',
  url: 'https://50bestwines.com',
  description:
    'Expert wine rankings aggregated from the world\'s top critics and publications.',
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${outfit.variable} h-full antialiased notranslate`}
      translate="no"
    >
      <head>
        <meta name="google" content="notranslate" />
        <meta name="google-adsense-account" content="ca-pub-2057309335537732" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        {/* AdSense - must be a regular script tag in head for Google verification */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2057309335537732"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <Nav />
        <main className="flex-1 pt-16">
          {/* Book Promotion - All Pages */}
          <div style={{ background: 'linear-gradient(135deg, #1a1408, #0f0c06)', padding: '24px 0', borderBottom: '2px solid rgba(196,168,124,0.2)' }}>
            <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px' }}>
              <a
                href="https://www.amazon.com/s?k=Designed+to+Feel+Peter+Burchardt"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '24px', textDecoration: 'none', background: 'linear-gradient(135deg, rgba(30,24,16,0.95), rgba(20,16,10,0.98))', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '14px', padding: '20px 28px', flexWrap: 'wrap' }}
              >
                <img src="https://peterburchardt.com/covers/designed-to-feel.jpg" alt="Designed to Feel" style={{ width: '64px', height: '96px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0, boxShadow: '0 4px 20px rgba(0,0,0,0.6)' }} />
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#d4af37', marginBottom: '6px' }}>Bestseller by Peter Burchardt</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f5f0e8', fontFamily: 'Georgia, serif', marginBottom: '6px', lineHeight: 1.3 }}>Designed to Feel</div>
                  <div style={{ fontSize: '0.82rem', color: '#a09888', marginBottom: '8px', lineHeight: 1.5 }}>Your anxiety, jealousy, and anger aren&apos;t broken — they&apos;re ancient software running in a world they weren&apos;t built for. This book is the missing manual.</div>
                  <div style={{ fontSize: '0.72rem', color: '#7a6e62', fontStyle: 'italic' }}>&ldquo;The most eye-opening book on emotions I&apos;ve ever read.&rdquo;</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                  <span style={{ display: 'inline-block', background: 'linear-gradient(135deg, #d4af37, #c4a87c)', color: '#0a0a0a', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '10px 20px', borderRadius: '8px', whiteSpace: 'nowrap' }}>Get It on Amazon &rarr;</span>
                  <span style={{ fontSize: '0.62rem', color: '#5a5550' }}>Available in paperback &amp; Kindle</span>
                </div>
              </a>
            </div>
          </div>
          {children}
        </main>
        {/* The Tribe Manager - Mid-Page Ad */}
        <div style={{ background: 'linear-gradient(135deg, #0c1a0c, #0a0f0a)', padding: '32px 0', borderTop: '2px solid rgba(34,197,94,0.2)', borderBottom: '2px solid rgba(34,197,94,0.2)' }}>
          <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px' }}>
            <a
              href="https://www.amazon.com/s?k=The+Tribe+Manager+Peter+Burchardt"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '28px', textDecoration: 'none', background: 'linear-gradient(135deg, rgba(16,32,16,0.95), rgba(10,20,10,0.98))', border: '1px solid rgba(34,197,94,0.25)', borderRadius: '14px', padding: '24px 32px', flexWrap: 'wrap' }}
            >
              <img src="https://peterburchardt.com/covers/tribe-manager.jpg" alt="The Tribe Manager by Peter Burchardt" style={{ width: '80px', height: '120px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0, boxShadow: '0 6px 24px rgba(0,0,0,0.6)' }} />
              <div style={{ flex: 1, minWidth: '220px' }}>
                <div style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: '#22c55e', marginBottom: '8px' }}>The Leadership Companion</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f0fdf4', fontFamily: 'Georgia, serif', marginBottom: '8px', lineHeight: 1.3 }}>The Tribe Manager</div>
                <div style={{ fontSize: '0.85rem', color: '#86efac', marginBottom: '10px', lineHeight: 1.5 }}>Your employees are running stone-age software. Manage <em>with</em> it, you get loyalty and performance. Manage <em>against</em> it, you get quiet quitting and turnover.</div>
                <div style={{ fontSize: '0.75rem', color: '#4ade80', opacity: 0.7 }}>Leading People the Way Evolution Intended — by Peter Burchardt</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                <span style={{ display: 'inline-block', background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#052e16', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '12px 24px', borderRadius: '8px', whiteSpace: 'nowrap' }}>Get It on Amazon &rarr;</span>
                <span style={{ fontSize: '0.62rem', color: '#4ade80', opacity: 0.5 }}>Paperback &amp; Kindle</span>
              </div>
            </a>
          </div>
        </div>
        <Footer />
        <LanguageToggle />

        {/* Happiness Blueprint - Sticky Side Ad */}
        <style dangerouslySetInnerHTML={{ __html: '@media(min-width:1400px){.hb-side-ad{display:flex!important}}' }} />
        <a
          className="hb-side-ad"
          href="https://www.amazon.com/s?k=The+Happiness+Blueprint+Peter+Burchardt"
          target="_blank"
          rel="noopener noreferrer"
          style={{ position: 'fixed', right: '20px', top: '50%', transform: 'translateY(-50%)', zIndex: 40, display: 'none', flexDirection: 'column', alignItems: 'center', gap: '12px', textDecoration: 'none', background: 'linear-gradient(180deg, #1a1408, #0f0c06)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '14px', padding: '20px 16px', width: '160px', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}
        >
            <div style={{ fontSize: '8px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: '#d4af37', textAlign: 'center' }}>New Release</div>
            <img
              src="https://peterburchardt.com/covers/happiness-blueprint.jpg"
              alt="The Happiness Blueprint by Peter Burchardt"
              style={{ width: '120px', height: '180px', objectFit: 'cover', borderRadius: '6px', boxShadow: '0 6px 24px rgba(0,0,0,0.6)' }}
            />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f5f0e8', fontFamily: 'Georgia, serif', lineHeight: 1.3, marginBottom: '6px' }}>The Happiness Blueprint</div>
              <div style={{ fontSize: '0.65rem', color: '#a09888', lineHeight: 1.5, marginBottom: '4px' }}>Stop chasing happiness. Start understanding it.</div>
              <div style={{ fontSize: '0.58rem', color: '#7a6e62', fontStyle: 'italic', lineHeight: 1.4 }}>The practical sequel to Designed to Feel</div>
            </div>
            <span style={{ display: 'inline-block', background: 'linear-gradient(135deg, #d4af37, #c4a87c)', color: '#0a0a0a', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '8px 16px', borderRadius: '6px', whiteSpace: 'nowrap' }}>Get Book &rarr;</span>
            <div style={{ fontSize: '0.55rem', color: '#5a5550' }}>By Peter Burchardt</div>
        </a>

        {/* Google Translate */}
        <div id="google_translate_element" className="hidden" />
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateInit"
          strategy="afterInteractive"
        />
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                autoDisplay: false,
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE
              }, 'google_translate_element');
            }
          `}
        </Script>
      </body>
    </html>
  );
}
// Last content review: 2026-08-01
