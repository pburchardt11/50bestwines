'use client';

import { useState } from 'react';
import Link from 'next/link';

interface RankingWine {
  slug: string;
  name: string;
  producer: string;
  type: string;
  grape: string;
  region: string;
  country: string;
  vintage: number | null;
  aggregateScore: number;
  price: number;
  badges: string[];
}

const BATCH_SIZE = 50;

const typeEmoji: Record<string, string> = {
  Red: '🍷',
  White: '🥂',
  Rosé: '🌸',
  Sparkling: '🍾',
  Dessert: '🍯',
  Fortified: '🏺',
};

export default function RankingsTable({ wines }: { wines: RankingWine[] }) {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  const visible = wines.slice(0, visibleCount);
  const hasMore = visibleCount < wines.length;

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-card-border">
        <table className="w-full min-w-[750px] text-left text-[15px]">
          <thead>
            <tr className="border-b border-card-border bg-[#111111]/80">
              <th className="px-4 py-3 font-semibold text-text/60 w-12">#</th>
              <th className="px-4 py-3 font-semibold text-text/60">Wine</th>
              <th className="px-4 py-3 font-semibold text-text/60">Region</th>
              <th className="px-4 py-3 font-semibold text-text/60">Grape</th>
              <th className="px-4 py-3 font-semibold text-text/60 text-center">Score</th>
              <th className="px-4 py-3 font-semibold text-text/60 text-center">Type</th>
              <th className="px-4 py-3 font-semibold text-text/60 text-right">Price</th>
              <th className="px-4 py-3 font-semibold text-text/60 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((wine, i) => (
              <tr key={wine.slug} className={`border-b border-[rgba(139,34,82,0.05)] transition-colors hover:bg-white/5 ${i % 2 === 1 ? 'bg-[#0c0c0c]' : ''}`}>
                <td className="px-4 py-3 font-serif font-bold text-wine">{i + 1}</td>
                <td className="px-4 py-3">
                  <Link href={`/wine/${wine.slug}`} className="flex items-center gap-2 font-medium text-text hover:text-wine transition-colors">
                    <span className="text-lg">{typeEmoji[wine.type] || '🍷'}</span>
                    <div>
                      <span className="block">{wine.name}</span>
                      <span className="block text-xs text-text/40">{wine.producer}{wine.vintage ? ` · ${wine.vintage}` : ''}</span>
                    </div>
                    {wine.badges.length > 0 && (
                      <span className="hidden sm:inline rounded-full bg-gold/10 px-1.5 py-0.5 text-[9px] font-semibold text-gold">🏅</span>
                    )}
                  </Link>
                </td>
                <td className="px-4 py-3 text-text/50 text-sm">{wine.region}, {wine.country}</td>
                <td className="px-4 py-3 text-text/50 text-sm">{wine.grape}</td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-wine/10 font-serif text-sm font-bold text-wine">
                    {wine.aggregateScore}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="rounded-full bg-wine/10 px-2 py-0.5 text-xs text-wine/80">
                    {wine.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-text/60">
                  ${wine.price}
                </td>
                <td className="px-4 py-3 text-center">
                  <Link
                    href={`/wine/${wine.slug}`}
                    className="inline-flex items-center gap-1 rounded-md bg-wine px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-wine-light"
                  >
                    Review
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {hasMore && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setVisibleCount((c) => c + BATCH_SIZE)}
            className="inline-flex items-center gap-2 rounded-xl border border-wine/30 px-8 py-3 text-sm font-medium tracking-wide text-wine transition-all hover:border-wine/60 hover:bg-wine/5"
          >
            Show Next 50
            <span className="text-text/30">({wines.length - visibleCount} remaining)</span>
          </button>
        </div>
      )}
    </>
  );
}
