// GridPulse Mobile Commander — Emergency Vehicle Simulation
// Simulates emergency vehicle fleet positions in Bengaluru

const VEHICLE_STATUSES = ['idle', 'en_route', 'on_scene', 'returning'];
const CALLSIGNS = {
  ambulance: ['AMB-01', 'AMB-02', 'AMB-03', 'AMB-04', 'AMB-05', 'AMB-06'],
  fire_truck: ['FT-01', 'FT-02', 'FT-03', 'FT-04'],
  police: ['PCR-01', 'PCR-02', 'PCR-03', 'PCR-04', 'PCR-05'],
  disaster: ['DRU-01', 'DRU-02'],
  medical: ['MRU-01', 'MRU-02', 'MRU-03'],
};

// Base positions scattered around Bengaluru
const BASE_POSITIONS = [
  { lat: 12.9716, lng: 77.5946 }, // City center
  { lat: 13.0358, lng: 77.5970 }, // Hebbal
  { lat: 12.9352, lng: 77.6245 }, // Koramangala
  { lat: 12.9784, lng: 77.6408 }, // Indiranagar
  { lat: 13.1007, lng: 77.5963 }, // Yelahanka
  { lat: 12.8456, lng: 77.6603 }, // Electronic City
  { lat: 12.9698, lng: 77.7500 }, // Whitefield
  { lat: 12.9100, lng: 77.5474 }, // Kengeri
];

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function generateVehicleFleet() {
  const now = new Date();
  const seed = now.getHours() * 100 + Math.floor(now.getMinutes() / 5);
  const vehicles = [];
  let vehicleIndex = 0;

  Object.entries(CALLSIGNS).forEach(([type, callsigns]) => {
    callsigns.forEach((callsign, i) => {
      const basePosIdx = vehicleIndex % BASE_POSITIONS.length;
      const base = BASE_POSITIONS[basePosIdx];
      const vSeed = seed + vehicleIndex * 17;

      // ~30% chance of being en_route, ~10% on_scene, ~5% returning, rest idle
      const statusRoll = seededRandom(vSeed);
      let status;
      if (statusRoll < 0.3) status = 'en_route';
      else if (statusRoll < 0.4) status = 'on_scene';
      else if (statusRoll < 0.45) status = 'returning';
      else status = 'idle';

      // Jitter position around base
      const latJitter = (seededRandom(vSeed + 1) - 0.5) * 0.05;
      const lngJitter = (seededRandom(vSeed + 2) - 0.5) * 0.05;

      vehicles.push({
        id: `v-${type}-${i}`,
        callsign,
        type,
        status,
        latitude: base.lat + latJitter,
        longitude: base.lng + lngJitter,
        speed: status === 'en_route' ? Math.round(40 + seededRandom(vSeed + 3) * 40) : 0,
        heading: Math.round(seededRandom(vSeed + 4) * 360),
        fuelLevel: Math.round(50 + seededRandom(vSeed + 5) * 50),
        driver: `Officer ${String.fromCharCode(65 + (vehicleIndex % 26))}. ${['Kumar', 'Singh', 'Sharma', 'Reddy', 'Rao', 'Patel'][vehicleIndex % 6]}`,
        lastUpdate: now.toISOString(),
        mission: status !== 'idle' ? `Mission-${String(vSeed).slice(-4)}` : null,
        eta: status === 'en_route' ? Math.round(5 + seededRandom(vSeed + 6) * 20) : null,
      });

      vehicleIndex++;
    });
  });

  return vehicles;
}

export function getVehiclesByType(type) {
  return generateVehicleFleet().filter(v => v.type === type);
}

export function getActiveVehicles() {
  return generateVehicleFleet().filter(v => v.status !== 'idle');
}
