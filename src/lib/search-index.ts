// Search index is no longer needed - search is now handled by the /api/search route
// which queries Postgres directly. This file is kept as a stub for any remaining imports.

export function getSearchIndex() {
  return {
    wines: [],
    countries: [],
    regions: [],
    blogs: [],
  };
}
