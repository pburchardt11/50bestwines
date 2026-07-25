'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

interface SearchWineEntry {
  slug: string;
  name: string;
  producer: string;
  type: string;
  grape: string;
  region: string;
  country: string;
  score: number;
}

interface SearchCountryEntry {
  slug: string;
  name: string;
  emoji: string;
}

interface SearchRegionEntry {
  slug: string;
  name: string;
  country: string;
}

interface SearchBlogEntry {
  slug: string;
  title: string;
  category: string;
  tags: string[];
}

interface SearchData {
  wines: SearchWineEntry[];
  countries: SearchCountryEntry[];
  regions: SearchRegionEntry[];
  blogs: SearchBlogEntry[];
}

interface SearchResult {
  type: 'wine' | 'country' | 'region' | 'blog';
  wine?: SearchWineEntry;
  country?: SearchCountryEntry;
  region?: SearchRegionEntry;
  blog?: SearchBlogEntry;
}

const typeEmoji: Record<string, string> = {
  Red: '🍷', White: '🥂', Rosé: '🌸', Sparkling: '🍾', Dessert: '🍯', Fortified: '🏺',
};

export default function SearchBar({
  className = '',
  searchData,
}: {
  className?: string;
  searchData?: SearchData;
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const search = useCallback((q: string) => {
    if (!q.trim() || !searchData) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const lower = q.toLowerCase();

    const matchedWines: SearchResult[] = searchData.wines
      .filter(w =>
        w.name.toLowerCase().includes(lower) ||
        w.producer.toLowerCase().includes(lower) ||
        w.grape.toLowerCase().includes(lower) ||
        w.region.toLowerCase().includes(lower) ||
        w.country.toLowerCase().includes(lower)
      )
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map(w => ({ type: 'wine' as const, wine: w }));

    const matchedCountries: SearchResult[] = searchData.countries
      .filter(c => c.name.toLowerCase().includes(lower))
      .slice(0, 5)
      .map(c => ({ type: 'country' as const, country: c }));

    const matchedRegions: SearchResult[] = searchData.regions
      .filter(r => r.name.toLowerCase().includes(lower) || r.country.toLowerCase().includes(lower))
      .slice(0, 5)
      .map(r => ({ type: 'region' as const, region: r }));

    const matchedBlogs: SearchResult[] = searchData.blogs
      .filter(p =>
        p.title.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower) ||
        p.tags.some(t => t.toLowerCase().includes(lower))
      )
      .slice(0, 3)
      .map(p => ({ type: 'blog' as const, blog: p }));

    setResults([...matchedWines, ...matchedCountries, ...matchedRegions, ...matchedBlogs]);
    setIsOpen(true);
    setActiveIndex(-1);
  }, [searchData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(val), 150);
  };

  const getResultHref = (r: SearchResult): string => {
    if (r.type === 'wine') return `/wine/${r.wine!.slug}`;
    if (r.type === 'country') return `/country/${r.country!.slug}`;
    if (r.type === 'region') return `/region/${r.region!.slug}`;
    if (r.type === 'blog') return `/blog/${r.blog!.slug}`;
    return '/';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      window.location.href = getResultHref(results[activeIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const wineResults = results.filter(r => r.type === 'wine');
  const countryResults = results.filter(r => r.type === 'country');
  const regionResults = results.filter(r => r.type === 'region');
  const blogResults = results.filter(r => r.type === 'blog');

  let flatIndex = -1;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="flex items-center overflow-hidden rounded-full border border-card-border bg-card-bg transition-colors focus-within:border-wine/40">
        <svg xmlns="http://www.w3.org/2000/svg" className="ml-4 h-4 w-4 shrink-0 text-text/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => { if (results.length > 0) setIsOpen(true); }}
          placeholder="Search wines, producers, regions, countries..."
          className="flex-1 bg-transparent px-3 py-3 text-sm text-text placeholder-text/40 outline-none"
        />
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[70vh] overflow-y-auto rounded-xl border border-card-border bg-[#111] shadow-2xl">
          {wineResults.length > 0 && (
            <div>
              <div className="px-4 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-widest text-text/30">Wines</div>
              {wineResults.map(r => {
                flatIndex++;
                const idx = flatIndex;
                const w = r.wine!;
                return (
                  <Link
                    key={w.slug}
                    href={`/wine/${w.slug}`}
                    onClick={() => { setIsOpen(false); setQuery(''); }}
                    className={`flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-wine/10 ${idx === activeIndex ? 'bg-wine/10' : ''}`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-wine/5 text-xl">
                      {typeEmoji[w.type] || '🍷'}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium text-text">{w.name}</span>
                        <span className="shrink-0 rounded-full bg-wine/10 px-2 py-0.5 text-[10px] font-medium text-wine/70">{w.type}</span>
                      </div>
                      <span className="text-xs text-text/40">{w.producer} &middot; {w.region}, {w.country}</span>
                    </div>
                    <span className="shrink-0 font-serif text-sm font-bold text-wine">{w.score}</span>
                  </Link>
                );
              })}
            </div>
          )}

          {countryResults.length > 0 && (
            <div>
              <div className="px-4 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-widest text-text/30">Countries</div>
              {countryResults.map(r => {
                flatIndex++;
                const idx = flatIndex;
                const c = r.country!;
                return (
                  <Link
                    key={c.slug}
                    href={`/country/${c.slug}`}
                    onClick={() => { setIsOpen(false); setQuery(''); }}
                    className={`flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-wine/10 ${idx === activeIndex ? 'bg-wine/10' : ''}`}
                  >
                    <span className="text-2xl">{c.emoji}</span>
                    <span className="text-sm font-medium text-text">{c.name}</span>
                  </Link>
                );
              })}
            </div>
          )}

          {regionResults.length > 0 && (
            <div>
              <div className="px-4 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-widest text-text/30">Regions</div>
              {regionResults.map(r => {
                flatIndex++;
                const idx = flatIndex;
                const reg = r.region!;
                return (
                  <Link
                    key={reg.slug}
                    href={`/region/${reg.slug}`}
                    onClick={() => { setIsOpen(false); setQuery(''); }}
                    className={`flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-wine/10 ${idx === activeIndex ? 'bg-wine/10' : ''}`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-wine/5 text-lg">🏔️</span>
                    <div>
                      <span className="block text-sm font-medium text-text">{reg.name}</span>
                      <span className="text-xs text-text/40">{reg.country}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {blogResults.length > 0 && (
            <div>
              <div className="px-4 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-widest text-text/30">Articles</div>
              {blogResults.map(r => {
                flatIndex++;
                const idx = flatIndex;
                const post = r.blog!;
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    onClick={() => { setIsOpen(false); setQuery(''); }}
                    className={`flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-wine/10 ${idx === activeIndex ? 'bg-wine/10' : ''}`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-wine/5 text-lg">📝</span>
                    <div className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-text">{post.title}</span>
                      <span className="text-xs text-text/40">{post.category}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
          <div className="h-1" />
        </div>
      )}
    </div>
  );
}
