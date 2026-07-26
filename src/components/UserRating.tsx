'use client';

import { useState, useEffect, useCallback } from 'react';
import { getUserProfile, setRating, removeRating } from '@/lib/user-store';

interface UserRatingProps {
  slug: string;
}

export default function UserRating({ slug }: UserRatingProps) {
  const [userScore, setUserScore] = useState<number | null>(null);
  const [hoverScore, setHoverScore] = useState<number | null>(null);

  const loadRating = useCallback(() => {
    const profile = getUserProfile();
    const entry = profile.ratings[slug];
    setUserScore(entry ? entry.score : null);
  }, [slug]);

  useEffect(() => {
    loadRating();
    window.addEventListener('user-profile-change', loadRating);
    return () => window.removeEventListener('user-profile-change', loadRating);
  }, [loadRating]);

  function handleClick(score: number) {
    if (userScore === score) {
      removeRating(slug);
      setUserScore(null);
    } else {
      setRating(slug, score);
      setUserScore(score);
    }
  }

  const displayScore = hoverScore ?? userScore;

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((n) => {
          const filled = displayScore !== null && n <= displayScore;
          return (
            <button
              key={n}
              onClick={() => handleClick(n)}
              onMouseEnter={() => setHoverScore(n)}
              onMouseLeave={() => setHoverScore(null)}
              className={`text-2xl transition-all duration-150 hover:scale-110 ${
                filled ? 'opacity-100 saturate-100' : 'opacity-30 saturate-0'
              }`}
              aria-label={`Rate ${n} out of 5`}
            >
              <span role="img" aria-hidden="true">&#127863;</span>
            </button>
          );
        })}
      </div>
      <p className="text-xs text-text/40">
        {userScore
          ? `Your rating: ${userScore}/5 (click same glass to remove)`
          : 'Rate this wine'}
      </p>
    </div>
  );
}
