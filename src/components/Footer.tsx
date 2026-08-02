import Link from 'next/link';

const footerLinks = {
  'Wine Types': [
    { href: '/rankings?type=red', label: 'Red Wines' },
    { href: '/rankings?type=white', label: 'White Wines' },
    { href: '/rankings?type=sparkling', label: 'Sparkling Wines' },
    { href: '/rankings?type=rosé', label: 'Rosé Wines' },
    { href: '/rankings?type=dessert', label: 'Dessert Wines' },
  ],
  'Top Countries': [
    { href: '/country/france', label: 'France' },
    { href: '/country/italy', label: 'Italy' },
    { href: '/country/spain', label: 'Spain' },
    { href: '/country/usa', label: 'United States' },
    { href: '/country/australia', label: 'Australia' },
  ],
  'Popular Grapes': [
    { href: '/grape/cabernet-sauvignon', label: 'Cabernet Sauvignon' },
    { href: '/grape/pinot-noir', label: 'Pinot Noir' },
    { href: '/grape/chardonnay', label: 'Chardonnay' },
    { href: '/grape/merlot', label: 'Merlot' },
    { href: '/grape/sauvignon-blanc', label: 'Sauvignon Blanc' },
  ],
  Company: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/submit', label: 'Submit a Wine' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Use' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-card-border bg-[#050505]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:gap-12 lg:grid-cols-5 lg:divide-x lg:divide-card-border [&>div]:lg:pl-8 [&>div:first-child]:lg:pl-0">
          {/* Branding */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="font-serif text-2xl font-bold text-wine" style={{ letterSpacing: -1, lineHeight: 1 }}>
                50
              </span>
              <span className="h-5 w-px bg-wine/40" />
              <span className="flex flex-col">
                <span className="text-[8px] font-semibold uppercase tracking-[3px] text-wine/80">
                  Best
                </span>
                <span className="font-serif text-base font-normal italic text-text" style={{ letterSpacing: 1, lineHeight: 1.1 }}>
                  Wines
                </span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-text/50">
              Expert wine rankings aggregated from the world&apos;s top critics
              and publications. Independently curated and regularly updated.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="mb-4 font-serif text-sm font-semibold uppercase tracking-widest text-wine/80">
                {heading}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text/50 transition-colors hover:text-wine"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Book Promotion */}
        <div style={{ borderTop: '1px solid rgba(196,168,124,0.15)', background: 'rgba(10,8,6,0.98)', padding: '28px 0', marginTop: '48px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
            <a
              href="https://www.amazon.com/s?k=Designed+to+Feel+Peter+Burchardt"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '24px', textDecoration: 'none', background: 'linear-gradient(135deg, rgba(30,24,16,0.9), rgba(20,16,10,0.95))', border: '1px solid rgba(196,168,124,0.2)', borderRadius: '12px', padding: '20px 24px', flexWrap: 'wrap' }}
            >
              <img
                src="https://peterburchardt.com/covers/designed-to-feel.jpg"
                alt="Designed to Feel by Peter Burchardt"
                style={{ width: '72px', height: '108px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0, boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
              />
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#c4a87c', marginBottom: '6px' }}>Recommended Read</div>
                <h4 style={{ margin: '0 0 4px', fontSize: '1.1rem', fontWeight: 600, color: '#f5f0e8', fontFamily: 'Georgia, serif', letterSpacing: '-0.01em' }}>Designed to Feel</h4>
                <p style={{ margin: '0 0 6px', fontSize: '0.78rem', color: '#a09888', lineHeight: 1.4 }}>Why Evolution Built Your Emotions, and How to Make Them Work for You</p>
                <p style={{ margin: '0 0 12px', fontSize: '0.75rem', color: '#7a6e62', fontStyle: 'italic', lineHeight: 1.5 }}>&ldquo;You are a hunter-gatherer in a glass tower, running ancient software. This is the manual you were never handed.&rdquo;</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <span style={{ display: 'inline-block', background: 'linear-gradient(135deg, #d4af37, #c4a87c)', color: '#0a0a0a', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '6px 14px', borderRadius: '6px' }}>Get it on Amazon &rarr;</span>
                  <span style={{ fontSize: '0.72rem', color: '#5a5550' }}>By Peter Burchardt &middot; Available now</span>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* 50 Best Network */}
        <div className="mt-12 border-t border-card-border pt-8 text-center">
          <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[1.5px] text-wine">
            50 Best Network
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {[
              { name: '50 Best Bakeries', url: 'https://www.50bestbakeries.com' },
              { name: '50 Best Bar', url: 'https://www.50bestbar.com' },
              { name: '50 Best Charms', url: 'https://www.50bestcharms.com' },
              { name: '50 Best Dating Sites', url: 'https://www.50bestdatingsites.com' },
              { name: '50 Best Games', url: 'https://www.50bestgames.com' },
              { name: '50 Best Health Insurance', url: 'https://www.50besthealthinsurance.com' },
              { name: '50 Best Hotels', url: 'https://www.50besthotels.com' },
              { name: '50 Best Limited', url: 'https://www.50bestlimited.com' },
              { name: '50 Best Matchmakers', url: 'https://www.50bestmatchmaker.com' },
              { name: '50 Best Museums', url: 'https://www.50bestmuseums.com' },
              { name: '50 Best Neighborhoods', url: 'https://www.50bestneighborhoods.com' },
              { name: '50 Best Peptides', url: 'https://www.50bestpeptides.com' },
              { name: '50 Best Spa', url: 'https://www.50bestspa.com' },
              { name: '50 Holy Sites', url: 'https://www.50holysites.com' },
            ].map((site) => (
              <a
                key={site.url}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-text/50 transition-colors hover:text-wine"
              >
                {site.name}
              </a>
            ))}
            <span className="text-sm font-bold text-wine">
              50 Best Wines
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-card-border pt-6 sm:flex-row">
          <p className="text-xs text-text/40">
            &copy; 2026 50 Best Limited. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-2 rounded-full border border-wine/20 bg-wine/5 px-3 py-1 text-xs font-medium text-wine">
            <span className="h-1.5 w-1.5 rounded-full bg-wine animate-pulse" />
            Updated: July 2026
          </p>
          <p className="text-xs text-text/40">
            Rankings aggregated from independent critics. We may earn a commission
            from partner links.
          </p>
        </div>
      </div>
    </footer>
  );
}
