'use client';

import { useState, useEffect, useCallback } from 'react';
import { getUserProfile, toggleFavorite, toggleWantToTry } from '@/lib/user-store';
import UserRating from './UserRating';

interface WineActionsProps {
  slug: string;
}

export default function WineActions({ slug }: WineActionsProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWantToTry, setIsWantToTry] = useState(false);
  const [showRating, setShowRating] = useState(false);

  const loadState = useCallback(() => {
    const profile = getUserProfile();
    setIsFavorite(profile.favorites.includes(slug));
    setIsWantToTry(profile.wantToTry.includes(slug));
    // If user already rated, show the rating panel
    if (profile.ratings[slug]) {
      setShowRating(true);
    }
  }, [slug]);

  useEffect(() => {
    loadState();
    window.addEventListener('user-profile-change', loadState);
    return () => window.removeEventListener('user-profile-change', loadState);
  }, [loadState]);

  function handleFavorite(e: React.MouseEvent) {
    e.preventDefault();
    const nowFav = toggleFavorite(slug);
    setIsFavorite(nowFav);
  }

  function handleWantToTry(e: React.MouseEvent) {
    e.preventDefault();
    const nowWant = toggleWantToTry(slug);
    setIsWantToTry(nowWant);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        {/* Favorite */}
        <button
          onClick={handleFavorite}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
            isFavorite
              ? 'border-wine/40 bg-wine/15 text-wine'
              : 'border-card-border bg-card-bg text-text/50 hover:border-wine/30 hover:text-wine/70'
          }`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <span className="text-base">{isFavorite ? '\u2764\uFE0F' : '\u2661'}</span>
          {isFavorite ? 'Favorited' : 'Favorite'}
        </button>

        {/* Rate */}
        <button
          onClick={() => setShowRating(!showRating)}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
            showRating
              ? 'border-wine/40 bg-wine/15 text-wine'
              : 'border-card-border bg-card-bg text-text/50 hover:border-wine/30 hover:text-wine/70'
          }`}
          aria-label="Rate this wine"
        >
          <span className="text-base" role="img" aria-hidden="true">&#127863;</span>
          Rate
        </button>

        {/* Want to Try */}
        <button
          onClick={handleWantToTry}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
            isWantToTry
              ? 'border-amber-500/40 bg-amber-500/15 text-amber-400'
              : 'border-card-border bg-card-bg text-text/50 hover:border-amber-500/30 hover:text-amber-400/70'
          }`}
          aria-label={isWantToTry ? 'Remove from want to try' : 'Add to want to try'}
        >
          <span className="text-base">{isWantToTry ? '\u2713' : '+'}</span>
          {isWantToTry ? 'Want to Try' : 'Want to Try'}
        </button>
      </div>

      {/* Rating panel */}
      {showRating && (
        <div className="rounded-xl border border-card-border bg-card-bg p-4">
          <UserRating slug={slug} />
        </div>
      )}
    </div>
  );
}
