'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const typeRef = useRef<HTMLDivElement>(null);

  const wineTypes = ['Red', 'White', 'Rosé', 'Sparkling', 'Dessert', 'Fortified'];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (typeRef.current && !typeRef.current.contains(e.target as Node)) {
        setTypeOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainLinks = [
    { href: '/', label: 'Home' },
    { href: '/rankings', label: 'Rankings' },
    { href: '/blog', label: 'Blog' },
  ];

  const secondaryLinks = [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b border-card-border bg-[#080808]/90 backdrop-blur-md transition-shadow duration-300 ${scrolled ? 'shadow-lg shadow-black/30' : ''}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold text-wine sm:text-3xl" style={{ letterSpacing: -1, lineHeight: 1 }}>
              50
            </span>
            <span className="h-5 w-px bg-wine/40" />
            <span className="flex flex-col">
              <span className="text-[8px] font-semibold uppercase tracking-[3px] text-wine/80" style={{ fontFamily: 'var(--font-sans)' }}>
                Best
              </span>
              <span className="font-serif text-base font-normal italic text-text sm:text-lg" style={{ letterSpacing: 1, lineHeight: 1.1 }}>
                Wines
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-6 md:flex">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-wide text-text/70 transition-colors hover:text-wine"
              >
                {link.label}
              </Link>
            ))}

            {/* Wine Types dropdown */}
            <div ref={typeRef} className="relative">
              <button
                onClick={() => setTypeOpen(!typeOpen)}
                className="flex items-center gap-1 text-sm tracking-wide text-text/70 transition-colors hover:text-wine"
              >
                Wine Types
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-3.5 w-3.5 transition-transform ${typeOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {typeOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-card-border bg-[#111] shadow-2xl">
                  {wineTypes.map((type) => (
                    <Link
                      key={type}
                      href={`/rankings?type=${type.toLowerCase()}`}
                      onClick={() => setTypeOpen(false)}
                      className="block px-4 py-2.5 text-sm text-text/70 transition-colors hover:bg-wine/10 hover:text-wine"
                    >
                      {type === 'Red' ? '🍷' : type === 'White' ? '🥂' : type === 'Rosé' ? '🌸' : type === 'Sparkling' ? '🍾' : type === 'Dessert' ? '🍯' : '🏺'} {type}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {secondaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-wide text-text/70 transition-colors hover:text-wine"
              >
                {link.label}
              </Link>
            ))}

            {/* Quiz CTA */}
            <Link
              href="/quiz"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-wine to-wine-light px-3.5 py-1.5 text-xs font-bold text-white transition-opacity hover:opacity-90"
            >
              Wine Finder
              <span className="text-xs">🍷</span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-text/70 transition-colors hover:text-wine md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-card-border bg-[#080808] md:hidden">
          <div className="space-y-1 px-4 py-4">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-text/70 transition-colors hover:bg-card-bg hover:text-wine"
              >
                {link.label}
              </Link>
            ))}

            <div className="px-3 py-2">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-text/30">Wine Types</p>
              <div className="space-y-1 pl-2">
                {wineTypes.map((type) => (
                  <Link
                    key={type}
                    href={`/rankings?type=${type.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-3 py-1.5 text-sm text-text/50 transition-colors hover:bg-card-bg hover:text-wine"
                  >
                    {type}
                  </Link>
                ))}
              </div>
            </div>

            {secondaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-text/70 transition-colors hover:bg-card-bg hover:text-wine"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/quiz"
              onClick={() => setMenuOpen(false)}
              className="mx-3 mt-2 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-wine to-wine-light px-4 py-2.5 text-sm font-bold text-white"
            >
              🍷 Find Your Perfect Wine
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
