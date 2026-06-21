// frontend/src/api.js

// Ensure VITE_API_URL doesn't end with a slash to prevent double slashes.
let baseUrl = (import.meta.env.VITE_API_URL || "http://localhost:8000").trim();
if (baseUrl.endsWith('/')) {
  baseUrl = baseUrl.slice(0, -1);
}

export const API_BASE = baseUrl;

/**
 * Normalizes an API path and returns the full URL.
 * Ensures that the path starts with a single slash.
 * Examples:
 *   getApiUrl('api/events') -> 'https://domain.com/api/events'
 *   getApiUrl('/api/events') -> 'https://domain.com/api/events'
 */
export const getApiUrl = (path) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${API_BASE}${normalizedPath}`;
  console.log(`[API REQUEST] => ${url}`);
  return url;
};
