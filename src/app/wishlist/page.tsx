'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import WishlistButton from '@/components/WishlistButton';

interface WishlistWine {
  slug: string;
  name: string;
  producer: string;
  country: string;
  region: string;
  type: string;
  grape: string;
  vintage: number | null;
  aggregateScore: number;
  price: number;
  priceRange: string;
  badges: string[];
  tastingNotes: string;
}

const typeEmoji: Record<string, string> = {
  Red: '🍷',
  White: '🥂',
  Rose: '🌸',
  Sparkling: '🍾',
  Dessert: '🍯',
  Fortified: '🏺',
};

export default function WishlistPage() {
  const [wines, setWines] = useState<WishlistWine[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = useCallback(async () => {
    try {
      const raw = localStorage.getItem('wine-wishlist');
      const slugs: string[] = raw ? JSON.parse(raw) : [];

      if (slugs.length === 0) {
        setWines([]);
        setLoading(false);
        return;
      }

      const res = await fetch(`/api/wishlist?slugs=${slugs.join(',')}`);
      if (res.ok) {
        const data = await res.json();
        setWines(data);
      }
    } catch {
      // Failed silently
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchWishlist();

    function onWishlistChange() {
      fetchWishlist();
    }
    window.addEventListener('wishlist-change', onWishlistChange);
    return () => window.removeEventListener('wishlist-change', onWishlistChange);
  }, [fetchWishlist]);

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <nav className="mb-4">
            <ol className="flex items-center gap-1.5 text-sm text-text/40">
              <li>
                <Link href="/" className="hover:text-wine transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-text/60">My Wishlist</li>
            </ol>
          </nav>
          <h1 className="font-serif text-3xl font-bold text-text sm:text-4xl lg:text-5xl">
            My Wishlist
          </h1>
          <p className="mt-2 text-text/50">
            Your saved wines, stored locally in your browser.
          </p>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <p className="text-text/40">Loading your wishlist...</p>
          </div>
        ) : wines.length === 0 ? (
          <div className="rounded-2xl border border-card-border bg-card-bg py-20 text-center">
            <p className="mb-2 text-4xl">🍷</p>
            <h2 className="font-serif text-xl font-bold text-text">
              No wines saved yet
            </h2>
            <p className="mt-2 text-sm text-text/40">
              Browse our rankings and tap the heart icon to save wines here.
            </p>
            <Link
              href="/rankings"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-wine px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Explore Rankings
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {wines.map((wine) => (
              <div
                key={wine.slug}
                className="relative overflow-hidden rounded-xl border border-card-border bg-card-bg p-5 transition-all duration-200 hover:border-wine/30 hover:shadow-lg hover:shadow-wine/5 sm:p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-wine/5 text-3xl">
                    {typeEmoji[wine.type] || '🍷'}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Link
                        href={`/wine/${wine.slug}`}
                        className="font-serif text-lg font-bold text-text hover:text-wine transition-colors"
                      >
                        {wine.name}
                      </Link>
                      {wine.vintage && (
                        <span className="rounded-full bg-wine/10 px-2 py-0.5 text-[11px] font-medium text-wine/80">
                          {wine.vintage}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-text/50">
                      {wine.producer}
                    </p>
                    <p className="mt-0.5 text-xs text-text/30">
                      {wine.region}, {wine.country} &middot; {wine.grape}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-wine/30 bg-wine/5 font-serif text-xl font-bold text-wine">
                      {wine.aggregateScore}
                    </span>
                    <span className="text-sm font-medium text-gold">
                      ${wine.price}
                    </span>
                    <WishlistButton slug={wine.slug} size="sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
