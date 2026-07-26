'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { getUserProfile, type UserProfile } from '@/lib/user-store';

interface ProfileWine {
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
  Red: '\uD83C\uDF77',
  White: '\uD83E\uDD42',
  Rose: '\uD83C\uDF38',
  Sparkling: '\uD83C\uDF7E',
  Dessert: '\uD83C\uDF6F',
  Fortified: '\uD83C\uDFFA',
};

type Tab = 'ratings' | 'favorites' | 'wantToTry';

export default function ProfilePage() {
  const [tab, setTab] = useState<Tab>('ratings');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [wines, setWines] = useState<ProfileWine[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(() => {
    const p = getUserProfile();
    setProfile(p);
    return p;
  }, []);

  const fetchWines = useCallback(async (slugs: string[]) => {
    if (slugs.length === 0) {
      setWines([]);
      setLoading(false);
      return;
    }
    try {
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
    const p = loadProfile();
    let slugs: string[] = [];
    if (tab === 'ratings') {
      slugs = Object.keys(p.ratings);
    } else if (tab === 'favorites') {
      slugs = p.favorites;
    } else {
      slugs = p.wantToTry;
    }
    setLoading(true);
    fetchWines(slugs);
  }, [tab, loadProfile, fetchWines]);

  // Listen for profile changes
  useEffect(() => {
    function onChange() {
      const p = loadProfile();
      let slugs: string[] = [];
      if (tab === 'ratings') {
        slugs = Object.keys(p.ratings);
      } else if (tab === 'favorites') {
        slugs = p.favorites;
      } else {
        slugs = p.wantToTry;
      }
      setLoading(true);
      fetchWines(slugs);
    }
    window.addEventListener('user-profile-change', onChange);
    window.addEventListener('wishlist-change', onChange);
    return () => {
      window.removeEventListener('user-profile-change', onChange);
      window.removeEventListener('wishlist-change', onChange);
    };
  }, [tab, loadProfile, fetchWines]);

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'ratings', label: 'My Ratings', count: profile ? Object.keys(profile.ratings).length : 0 },
    { key: 'favorites', label: 'Favorites', count: profile ? profile.favorites.length : 0 },
    { key: 'wantToTry', label: 'Want to Try', count: profile ? profile.wantToTry.length : 0 },
  ];

  const emptyMessages: Record<Tab, { icon: string; title: string; subtitle: string }> = {
    ratings: {
      icon: '\uD83C\uDF77',
      title: 'No ratings yet',
      subtitle: 'Visit a wine page and rate it using the wine glass icons.',
    },
    favorites: {
      icon: '\u2764\uFE0F',
      title: 'No favorites yet',
      subtitle: 'Tap the heart icon on any wine page to add it here.',
    },
    wantToTry: {
      icon: '\uD83D\uDCDD',
      title: 'Nothing on your list yet',
      subtitle: 'Mark wines you want to try from any wine page.',
    },
  };

  return (
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
            <li className="text-text/60">My Profile</li>
          </ol>
        </nav>
        <h1 className="font-serif text-3xl font-bold text-text sm:text-4xl lg:text-5xl">
          My Profile
        </h1>
        <p className="mt-2 text-text/50">
          Your ratings, favorites, and wines to try &mdash; stored locally in your browser.
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-8 flex gap-1 rounded-xl border border-card-border bg-card-bg p-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
              tab === t.key
                ? 'bg-wine/20 text-wine shadow-sm'
                : 'text-text/50 hover:text-text/70'
            }`}
          >
            {t.label}
            {t.count > 0 && (
              <span className={`ml-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                tab === t.key ? 'bg-wine/30 text-wine' : 'bg-card-border text-text/40'
              }`}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="py-20 text-center">
          <p className="text-text/40">Loading...</p>
        </div>
      ) : wines.length === 0 ? (
        <div className="rounded-2xl border border-card-border bg-card-bg py-20 text-center">
          <p className="mb-2 text-4xl">{emptyMessages[tab].icon}</p>
          <h2 className="font-serif text-xl font-bold text-text">
            {emptyMessages[tab].title}
          </h2>
          <p className="mt-2 text-sm text-text/40">
            {emptyMessages[tab].subtitle}
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
          {wines.map((wine) => {
            const userRating = profile?.ratings[wine.slug];
            return (
              <div
                key={wine.slug}
                className="relative overflow-hidden rounded-xl border border-card-border bg-card-bg p-5 transition-all duration-200 hover:border-wine/30 hover:shadow-lg hover:shadow-wine/5 sm:p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-wine/5 text-3xl">
                    {typeEmoji[wine.type] || '\uD83C\uDF77'}
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
                    {tab === 'ratings' && userRating && (
                      <div className="text-center">
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <span
                              key={n}
                              className={`text-sm ${n <= userRating.score ? 'opacity-100' : 'opacity-20 saturate-0'}`}
                            >
                              &#127863;
                            </span>
                          ))}
                        </div>
                        <p className="text-[10px] text-text/30 mt-0.5">Your rating</p>
                      </div>
                    )}
                    {wine.price > 0 && (
                      <span className="text-sm font-medium text-gold">
                        ${wine.price}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
