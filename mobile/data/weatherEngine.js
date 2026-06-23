// GridPulse Mobile Commander — Weather Simulation Engine
// Generates realistic weather data for Bengaluru based on time of day and season

const WEATHER_CONDITIONS = ['Clear', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Heavy Rain', 'Thunderstorm', 'Foggy', 'Hazy'];
const WIND_DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

function getSeasonalModifier() {
  const month = new Date().getMonth();
  // Bengaluru monsoon: June-September
  if (month >= 5 && month <= 8) return { rain: 0.7, temp: -2, humidity: 20, visibility: -3 };
  // Winter: November-February
  if (month >= 10 || month <= 1) return { rain: 0.1, temp: -5, humidity: -10, visibility: 2 };
  // Summer: March-May
  if (month >= 2 && month <= 4) return { rain: 0.2, temp: 4, humidity: -15, visibility: 1 };
  return { rain: 0.3, temp: 0, humidity: 0, visibility: 0 };
}

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function generateWeatherData() {
  const now = new Date();
  const hour = now.getHours();
  const dateSeed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
  const hourSeed = dateSeed + hour;
  const seasonal = getSeasonalModifier();

  // Base temperature for Bengaluru (22-32°C typical range)
  const baseTemp = 26 + seasonal.temp;
  const hourMod = hour < 6 ? -4 : hour < 10 ? -1 : hour < 14 ? 3 : hour < 18 ? 1 : -2;
  const temperature = Math.round(baseTemp + hourMod + (seededRandom(hourSeed) * 3 - 1.5));

  // Humidity
  const baseHumidity = 65 + seasonal.humidity;
  const humidity = Math.round(Math.min(98, Math.max(30, baseHumidity + (seededRandom(hourSeed + 1) * 20 - 10))));

  // Rain chance
  const rainChance = Math.min(1, Math.max(0, seasonal.rain + (seededRandom(hourSeed + 2) * 0.3 - 0.15)));
  const isRaining = seededRandom(hourSeed + 3) < rainChance;
  const rainfall = isRaining ? Math.round(seededRandom(hourSeed + 4) * 30 * 10) / 10 : 0;

  // Visibility (km)
  const baseVisibility = 10 + seasonal.visibility;
  const visibility = Math.round(Math.max(1, baseVisibility - (isRaining ? 4 : 0) + (seededRandom(hourSeed + 5) * 3 - 1.5)) * 10) / 10;

  // Condition
  let condition;
  if (isRaining && rainfall > 15) condition = 'Thunderstorm';
  else if (isRaining && rainfall > 5) condition = 'Heavy Rain';
  else if (isRaining) condition = 'Light Rain';
  else if (hour < 7 && humidity > 80) condition = 'Foggy';
  else if (humidity > 75) condition = 'Cloudy';
  else if (seededRandom(hourSeed + 6) > 0.6) condition = 'Partly Cloudy';
  else condition = 'Clear';

  // Wind
  const windSpeed = Math.round((5 + seededRandom(hourSeed + 7) * 20) * 10) / 10;
  const windDirection = WIND_DIRECTIONS[Math.floor(seededRandom(hourSeed + 8) * 8)];

  // Flood risk (0-100)
  const floodRisk = Math.round(Math.min(100, rainfall * 3 + (humidity > 85 ? 20 : 0) + seasonal.rain * 30));

  // Storm risk (0-100)
  const stormRisk = Math.round(Math.min(100, (rainfall > 15 ? 60 : rainfall > 5 ? 30 : 0) + windSpeed * 1.5));

  // Weather severity score (0-100)
  const weatherSeverity = Math.round(Math.min(100, floodRisk * 0.4 + stormRisk * 0.3 + (100 - visibility * 10) * 0.3));

  // Traffic impact forecast
  const trafficImpact = weatherSeverity > 70 ? 'Severe Disruptions Expected' :
    weatherSeverity > 40 ? 'Moderate Delays Likely' :
    weatherSeverity > 20 ? 'Minor Impact Possible' : 'No Significant Impact';

  return {
    temperature,
    humidity,
    rainfall,
    visibility,
    condition,
    windSpeed,
    windDirection,
    floodRisk,
    stormRisk,
    weatherSeverity,
    trafficImpact,
    pressure: Math.round(1013 + (seededRandom(hourSeed + 9) * 10 - 5)),
    uvIndex: hour >= 10 && hour <= 16 ? Math.round(seededRandom(hourSeed + 10) * 8 + 3) : 0,
    aqi: Math.round(50 + seededRandom(hourSeed + 11) * 100),
    feelsLike: temperature + (humidity > 75 ? 3 : 0) - (windSpeed > 15 ? 2 : 0),
    updatedAt: now.toISOString(),
  };
}
