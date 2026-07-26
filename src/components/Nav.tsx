'use client';

import Link from 'next/link';
import { useState, useRef, useEffect, useCallback } from 'react';

interface SearchResult {
  slug: string;
  name: string;
  producer: string;
  country: string;
  type: string;
  score: number;
}

const typeEmoji: Record<string, string> = {
  Red: '🍷', White: '🥂', Rose: '🌸', Sparkling: '🍾', Dessert: '🍯', Fortified: '🏺',
};

function stripDiacritics(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const wineTypes = ['Red', 'White', 'Rose', 'Sparkling', 'Dessert', 'Fortified'];

  const mainLinks = [
    { href: '/', label: 'Home' },
    { href: '/rankings', label: 'Rankings' },
    { href: '/blog', label: 'Blog' },
    { href: '/profile', label: 'My Profile' },
  ];

  const secondaryLinks = [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim() || q.trim().length < 2) {
      setResults([]);
      setIsSearchOpen(false);
      return;
    }

    try {
      const normalized = stripDiacritics(q);
      const res = await fetch(`/api/search?q=${encodeURIComponent(normalized)}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data);
        setIsSearchOpen(data.length > 0);
        setActiveIndex(-1);
      }
    } catch {
      // Search failed silently
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(val), 200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isSearchOpen || results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      window.location.href = `/wine/${results[activeIndex].slug}`;
    } else if (e.key === 'Escape') {
      setIsSearchOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b border-card-border bg-[#080808]/90 backdrop-blur-md transition-shadow duration-300 ${scrolled ? 'shadow-lg shadow-black/30' : ''}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
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

          {/* Search Bar - always visible */}
          <div ref={searchRef} className="relative flex-1 max-w-md mx-auto">
            <div className="flex items-center overflow-hidden rounded-full border border-card-border bg-[#111] transition-colors focus-within:border-wine/40">
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-3 h-4 w-4 shrink-0 text-text/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={() => { if (results.length > 0) setIsSearchOpen(true); }}
                placeholder="Search wines..."
                className="flex-1 bg-transparent px-2.5 py-2 text-sm text-text placeholder-text/40 outline-none"
              />
            </div>

            {/* Search dropdown */}
            {isSearchOpen && results.length > 0 && (
              <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[70vh] overflow-y-auto rounded-xl border border-card-border bg-[#111] shadow-2xl">
                <div className="px-4 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-widest text-text/30">Wines</div>
                {results.map((r, idx) => (
                  <Link
                    key={r.slug}
                    href={`/wine/${r.slug}`}
                    onClick={() => { setIsSearchOpen(false); setQuery(''); }}
                    className={`flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-wine/10 ${idx === activeIndex ? 'bg-wine/10' : ''}`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-wine/5 text-xl">
                      {typeEmoji[r.type] || '🍷'}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium text-text">{r.name}</span>
                        <span className="shrink-0 rounded-full bg-wine/10 px-2 py-0.5 text-[10px] font-medium text-wine/70">{r.type}</span>
                      </div>
                      <span className="text-xs text-text/40">{r.producer} &middot; {r.country}</span>
                    </div>
                    <span className="shrink-0 font-serif text-sm font-bold text-wine">{r.score}</span>
                  </Link>
                ))}
                <div className="h-1" />
              </div>
            )}
          </div>

          {/* Desktop links */}
          <div className="hidden items-center gap-5 md:flex">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-wide text-text/70 transition-colors hover:text-wine"
              >
                {link.label}
              </Link>
            ))}
            {secondaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-wide text-text/70 transition-colors hover:text-wine"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/quiz"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-wine to-wine-light px-3.5 py-1.5 text-xs font-bold text-white transition-opacity hover:opacity-90"
            >
              Wine Finder
              <span className="text-xs">🍷</span>
            </Link>
          </div>

          {/* Hamburger menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="shrink-0 text-text/70 transition-colors hover:text-wine md:hidden"
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
