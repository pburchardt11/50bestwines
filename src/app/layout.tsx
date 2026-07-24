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
  title: '50 Best Wines | Expert Rankings & Reviews 2026',
  description:
    'Discover the world\'s finest wines with expert rankings aggregated from Wine Spectator, Robert Parker, James Suckling, Decanter, and more. Independent reviews, scores, and where to buy.',
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
    title: '50 Best Wines | Expert Rankings & Reviews 2026',
    description:
      'The world\'s finest wines ranked by aggregated scores from top critics. Wine Spectator, Robert Parker, Decanter, and more.',
    type: 'website',
    locale: 'en_US',
    siteName: '50 Best Wines',
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
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2057309335537732"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <Nav />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
        <LanguageToggle />

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
