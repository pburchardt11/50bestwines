'use client';

const STORAGE_KEY = 'wine-user-profile';

export interface UserRatingEntry {
  score: number;
  date: string;
}

export interface UserProfile {
  name: string;
  ratings: Record<string, UserRatingEntry>;
  favorites: string[];
  wantToTry: string[];
}

function getProfile(): UserProfile {
  if (typeof window === 'undefined') {
    return { name: '', ratings: {}, favorites: [], wantToTry: [] };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { name: '', ratings: {}, favorites: [], wantToTry: [] };
    const parsed = JSON.parse(raw);
    return {
      name: parsed.name || '',
      ratings: parsed.ratings || {},
      favorites: Array.isArray(parsed.favorites) ? parsed.favorites : [],
      wantToTry: Array.isArray(parsed.wantToTry) ? parsed.wantToTry : [],
    };
  } catch {
    return { name: '', ratings: {}, favorites: [], wantToTry: [] };
  }
}

function saveProfile(profile: UserProfile) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  window.dispatchEvent(new Event('user-profile-change'));
}

export function getUserProfile(): UserProfile {
  return getProfile();
}

export function setRating(slug: string, score: number): void {
  const profile = getProfile();
  profile.ratings[slug] = { score, date: new Date().toISOString() };
  saveProfile(profile);
}

export function removeRating(slug: string): void {
  const profile = getProfile();
  delete profile.ratings[slug];
  saveProfile(profile);
}

export function toggleFavorite(slug: string): boolean {
  const profile = getProfile();
  const idx = profile.favorites.indexOf(slug);
  if (idx >= 0) {
    profile.favorites.splice(idx, 1);
    saveProfile(profile);
    return false;
  } else {
    profile.favorites.push(slug);
    saveProfile(profile);
    return true;
  }
}

export function toggleWantToTry(slug: string): boolean {
  const profile = getProfile();
  const idx = profile.wantToTry.indexOf(slug);
  if (idx >= 0) {
    profile.wantToTry.splice(idx, 1);
    saveProfile(profile);
    return false;
  } else {
    profile.wantToTry.push(slug);
    saveProfile(profile);
    return true;
  }
}

export function getUserRatings(): Record<string, UserRatingEntry> {
  return getProfile().ratings;
}

export function getUserFavorites(): string[] {
  return getProfile().favorites;
}

export function getUserWantToTry(): string[] {
  return getProfile().wantToTry;
}
