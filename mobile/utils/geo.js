// GridPulse Mobile Commander — Geo Utilities
// Haversine distance, bearing, and formatting

/**
 * Calculate distance between two lat/lng points in kilometers
 */
export function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Calculate bearing from point A to point B
 */
export function bearing(lat1, lon1, lat2, lon2) {
  const dLon = toRad(lon2 - lon1);
  const y = Math.sin(dLon) * Math.cos(toRad(lat2));
  const x = Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
    Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLon);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

/**
 * Estimate travel time in minutes (average city speed ~25 km/h)
 */
export function estimateETA(distanceKm, speedKmh = 25) {
  return Math.round((distanceKm / speedKmh) * 60);
}

/**
 * Format distance for display
 */
export function formatDistance(km) {
  if (km < 1) return `${Math.round(km * 1000)}m`;
  return `${km.toFixed(1)} km`;
}

/**
 * Sort locations by distance from a reference point
 */
export function sortByDistance(locations, refLat, refLng) {
  return locations.map(loc => ({
    ...loc,
    distance: haversineDistance(refLat, refLng, loc.latitude, loc.longitude),
    eta: estimateETA(haversineDistance(refLat, refLng, loc.latitude, loc.longitude)),
  })).sort((a, b) => a.distance - b.distance);
}

function toRad(deg) { return (deg * Math.PI) / 180; }
function toDeg(rad) { return (rad * 180) / Math.PI; }
