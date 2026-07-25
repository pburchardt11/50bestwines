'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'wine-wishlist';

function getWishlist(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setWishlist(slugs: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
}

interface WishlistButtonProps {
  slug: string;
  size?: 'sm' | 'md';
}

export default function WishlistButton({ slug, size = 'md' }: WishlistButtonProps) {
  const [inWishlist, setInWishlist] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setInWishlist(getWishlist().includes(slug));
  }, [slug]);

  const toggle = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const current = getWishlist();
      let next: string[];
      if (current.includes(slug)) {
        next = current.filter((s) => s !== slug);
        setInWishlist(false);
      } else {
        next = [...current, slug];
        setInWishlist(true);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      }
      setWishlist(next);
      window.dispatchEvent(new Event('wishlist-change'));
    },
    [slug]
  );

  const dim = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10';
  const iconSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';

  return (
    <div className="relative">
      <button
        onClick={toggle}
        aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        className={`${dim} inline-flex items-center justify-center rounded-full border transition-all duration-200 ${
          inWishlist
            ? 'border-wine/40 bg-wine/20 text-wine'
            : 'border-card-border bg-card-bg text-text/40 hover:border-wine/30 hover:text-wine/70'
        }`}
      >
        {inWishlist ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={iconSize}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={iconSize}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        )}
      </button>

      {showToast && (
        <div className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-wine/20 bg-[#1a0a10] px-3 py-1.5 text-xs font-medium text-wine shadow-lg">
          Added to your wishlist
        </div>
      )}
    </div>
  );
}
