'use client';

import { useState } from 'react';

interface WineFiltersProps {
  countries: string[];
  grapes: string[];
  regions: string[];
  types: string[];
  onFilter: (filters: FilterState) => void;
  initialFilters?: FilterState;
}

export interface FilterState {
  type: string;
  country: string;
  grape: string;
  region: string;
  priceRange: string;
  sortBy: string;
  search: string;
}

export const defaultFilters: FilterState = {
  type: '',
  country: '',
  grape: '',
  region: '',
  priceRange: '',
  sortBy: 'score',
  search: '',
};

export default function WineFilters({
  countries,
  grapes,
  regions,
  types,
  onFilter,
  initialFilters,
}: WineFiltersProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters || defaultFilters);
  const [expanded, setExpanded] = useState(false);

  function update(key: keyof FilterState, value: string) {
    const next = { ...filters, [key]: value };
    setFilters(next);
    onFilter(next);
  }

  function reset() {
    setFilters(defaultFilters);
    onFilter(defaultFilters);
  }

  const hasActiveFilters = Object.entries(filters).some(
    ([key, val]) => key !== 'sortBy' && key !== 'search' && val !== ''
  );

  return (
    <div className="rounded-xl border border-card-border bg-card-bg p-4 sm:p-6">
      {/* Search + Sort row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <div className="flex items-center overflow-hidden rounded-lg border border-card-border bg-[#0a0a0a] transition-colors focus-within:border-wine/40">
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-3 h-4 w-4 shrink-0 text-text/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => update('search', e.target.value)}
              placeholder="Search wines, producers, regions..."
              className="flex-1 bg-transparent px-3 py-2.5 text-sm text-text placeholder-text/30 outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filters.sortBy}
            onChange={(e) => update('sortBy', e.target.value)}
            className="rounded-lg border border-card-border bg-[#0a0a0a] px-3 py-2.5 text-sm text-text outline-none transition-colors focus:border-wine/40"
          >
            <option value="score">Sort by Score</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name A-Z</option>
          </select>

          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 rounded-lg border border-card-border bg-[#0a0a0a] px-3 py-2.5 text-sm text-text/70 transition-colors hover:border-wine/30 hover:text-wine"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
            {hasActiveFilters && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-wine text-[10px] font-bold text-white">
                !
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Expanded filter rows */}
      {expanded && (
        <div className="mt-4 grid gap-3 border-t border-card-border pt-4 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <label className="mb-1 block text-xs font-medium text-text/40">Wine Type</label>
            <select
              value={filters.type}
              onChange={(e) => update('type', e.target.value)}
              className="w-full rounded-lg border border-card-border bg-[#0a0a0a] px-3 py-2 text-sm text-text outline-none transition-colors focus:border-wine/40"
            >
              <option value="">All Types</option>
              {types.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-text/40">Country</label>
            <select
              value={filters.country}
              onChange={(e) => update('country', e.target.value)}
              className="w-full rounded-lg border border-card-border bg-[#0a0a0a] px-3 py-2 text-sm text-text outline-none transition-colors focus:border-wine/40"
            >
              <option value="">All Countries</option>
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-text/40">Grape</label>
            <select
              value={filters.grape}
              onChange={(e) => update('grape', e.target.value)}
              className="w-full rounded-lg border border-card-border bg-[#0a0a0a] px-3 py-2 text-sm text-text outline-none transition-colors focus:border-wine/40"
            >
              <option value="">All Grapes</option>
              {grapes.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-text/40">Region</label>
            <select
              value={filters.region}
              onChange={(e) => update('region', e.target.value)}
              className="w-full rounded-lg border border-card-border bg-[#0a0a0a] px-3 py-2 text-sm text-text outline-none transition-colors focus:border-wine/40"
            >
              <option value="">All Regions</option>
              {regions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-text/40">Price Range</label>
            <select
              value={filters.priceRange}
              onChange={(e) => update('priceRange', e.target.value)}
              className="w-full rounded-lg border border-card-border bg-[#0a0a0a] px-3 py-2 text-sm text-text outline-none transition-colors focus:border-wine/40"
            >
              <option value="">All Prices</option>
              <option value="Budget">Budget (Under $15)</option>
              <option value="Mid-Range">Mid-Range ($15-$30)</option>
              <option value="Premium">Premium ($30-$75)</option>
              <option value="Luxury">Luxury ($75-$200)</option>
              <option value="Ultra-Premium">Ultra-Premium ($200+)</option>
            </select>
          </div>
        </div>
      )}

      {/* Active filters + reset */}
      {hasActiveFilters && (
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          {Object.entries(filters).map(([key, val]) => {
            if (!val || key === 'sortBy' || key === 'search') return null;
            return (
              <span
                key={key}
                className="inline-flex items-center gap-1 rounded-full bg-wine/10 px-2.5 py-1 text-xs text-wine"
              >
                {val}
                <button
                  onClick={() => update(key as keyof FilterState, '')}
                  className="ml-0.5 text-wine/50 hover:text-wine"
                >
                  &times;
                </button>
              </span>
            );
          })}
          <button
            onClick={reset}
            className="text-xs text-text/40 hover:text-wine transition-colors"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
