'use client';

import { useState, useEffect, useMemo } from 'react';
import WineFilters, { FilterState, defaultFilters } from '@/components/WineFilters';
import RankingsTable from '@/components/RankingsTable';
import AdUnit from '@/components/AdUnit';
import {
  getAllWines,
  getAllCountries,
  getAllGrapes,
  getAllRegions,
  getAllTypes,
} from '@/lib/wine-db';

export default function RankingsPage() {
  const allWines = useMemo(() => getAllWines().sort((a, b) => b.aggregateScore - a.aggregateScore), []);
  const countries = useMemo(() => getAllCountries().map((c) => c.name), []);
  const grapes = useMemo(() => getAllGrapes().map((g) => g.name), []);
  const regions = useMemo(() => getAllRegions().map((r) => r.name), []);
  const types = useMemo(() => getAllTypes(), []);

  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  // Read initial filters from URL search params
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const initial: FilterState = { ...defaultFilters };
    if (sp.get('type')) initial.type = sp.get('type')!;
    if (sp.get('country')) initial.country = sp.get('country')!;
    if (sp.get('grape')) initial.grape = sp.get('grape')!;
    if (sp.get('region')) initial.region = sp.get('region')!;
    if (sp.get('priceRange')) initial.priceRange = sp.get('priceRange')!;
    if (sp.get('q')) initial.search = sp.get('q')!;
    setFilters(initial);
  }, []);

  const filtered = useMemo(() => {
    let result = allWines;

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (w) =>
          w.name.toLowerCase().includes(q) ||
          w.producer.toLowerCase().includes(q) ||
          w.region.toLowerCase().includes(q) ||
          w.grape.toLowerCase().includes(q) ||
          w.country.toLowerCase().includes(q)
      );
    }

    if (filters.type) {
      result = result.filter((w) => w.type.toLowerCase() === filters.type.toLowerCase());
    }
    if (filters.country) {
      result = result.filter((w) => w.country === filters.country);
    }
    if (filters.grape) {
      result = result.filter((w) => w.grape === filters.grape);
    }
    if (filters.region) {
      result = result.filter((w) => w.region === filters.region);
    }
    if (filters.priceRange) {
      result = result.filter((w) => w.priceRange === filters.priceRange);
    }

    switch (filters.sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // already sorted by score
        break;
    }

    return result;
  }, [allWines, filters]);

  return (
    <>
      <section className="border-b border-card-border bg-gradient-to-b from-[#1a0a10] via-[#080808] to-[#080808]">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold text-text sm:text-5xl">Wine Rankings</h1>
          <p className="mt-3 text-text/50">
            All {allWines.length.toLocaleString()} wines ranked by aggregated critic scores. Filter, sort, and find your perfect bottle.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <WineFilters
          countries={countries}
          grapes={grapes}
          regions={regions}
          types={types}
          onFilter={setFilters}
          initialFilters={filters}
        />

        <div className="mt-4 mb-6 flex items-center justify-between text-sm text-text/40">
          <span>{filtered.length.toLocaleString()} wines found</span>
        </div>

        <RankingsTable wines={filtered} />

        <AdUnit format="horizontal" className="mt-12" />
      </div>
    </>
  );
}
