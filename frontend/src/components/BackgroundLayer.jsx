import React, { useState, useEffect } from 'react';

export default function BackgroundLayer() {
  const [timeOfDay, setTimeOfDay] = useState(() => {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 11) return 'morning';
    if (hours >= 11 && hours < 16) return 'noon';
    if (hours >= 16 && hours < 19) return 'evening';
    return 'night';
  });

  // Automatically update on refresh or mount
  useEffect(() => {
    const hours = new Date().getHours();
    let detected = 'night';
    if (hours >= 5 && hours < 11) detected = 'morning';
    else if (hours >= 11 && hours < 16) detected = 'noon';
    else if (hours >= 16 && hours < 19) detected = 'evening';
    setTimeOfDay(detected);
  }, []);

  return (
    <div className={`smart-city-background sc-${timeOfDay}`} id="smart-city-bg">
      {/* Background radial glow */}
      <div className="sc-glow" />

      {/* Grid overlay for noon and night (clean digital twin effect) */}
      <div className="sc-grid-overlay" />

      {/* Clouds drift */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <svg className="sc-clouds sc-clouds-layer-1" viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path d="M100,80 Q120,60 140,80 Q160,60 180,80 Q200,80 200,100 L100,100 Z" fill="rgba(255,255,255,0.25)" />
          <path d="M500,50 Q525,25 550,50 Q575,30 600,50 Q620,55 620,70 L500,70 Z" fill="rgba(255,255,255,0.2)" />
          <path d="M900,90 Q920,70 940,90 Q960,70 980,90 Q1000,90 1000,110 L900,110 Z" fill="rgba(255,255,255,0.22)" />
        </svg>
        <svg className="sc-clouds sc-clouds-layer-2" viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path d="M300,70 Q320,50 340,70 Q360,50 380,70 Q400,70 400,90 L300,90 Z" fill="rgba(255,255,255,0.15)" />
          <path d="M750,60 Q770,40 790,60 Q810,45 830,60 L750,60 Z" fill="rgba(255,255,255,0.18)" />
        </svg>
      </div>

      {/* Skyline Layers (Back and Front) */}
      <svg className="sc-skyline" viewBox="0 0 1200 400" preserveAspectRatio="none">
        {/* Back Silhouette */}
        <path 
          className="sc-skyline-back" 
          d="M0,400 L0,300 L50,300 L50,320 L100,320 L100,280 L180,280 L180,330 L220,330 L220,310 L280,310 L280,340 L350,340 L350,290 L400,290 L400,320 L480,320 L480,270 L540,270 L540,310 L600,310 L600,330 L670,330 L670,290 L730,290 L730,320 L800,320 L800,280 L880,280 L880,340 L930,340 L930,300 L1000,300 L1000,330 L1080,330 L1080,290 L1150,290 L1150,340 L1200,340 L1200,400 Z" 
        />
        {/* Front Silhouette */}
        <path 
          className="sc-skyline-front" 
          d="M0,400 L0,330 L30,330 L30,350 L80,350 L80,310 L140,310 L140,295 L160,295 L160,340 L240,340 L240,300 L260,260 L280,300 L300,300 L300,350 L380,350 L380,315 L430,315 L430,280 L450,280 L450,340 L520,340 L520,310 L580,310 L580,350 L640,350 L640,290 L680,290 L680,330 L760,330 L760,300 L820,300 L820,340 L900,340 L900,310 L950,310 L950,270 L970,270 L970,350 L1040,350 L1040,320 L1100,320 L1100,350 L1160,350 L1160,310 L1200,310 L1200,400 Z" 
        />
        
        {/* Glowing window lights for evening/night */}
        <g className="sc-window-lights" fill="#FFEBA0">
          {/* Building at 80-140 */}
          <rect x="95" y="320" width="4" height="4" />
          <rect x="110" y="320" width="4" height="4" />
          <rect x="125" y="320" width="4" height="4" />
          <rect x="95" y="335" width="4" height="4" />
          <rect x="110" y="335" width="4" height="4" />
          <rect x="125" y="335" width="4" height="4" />

          {/* Building at 240-300 */}
          <rect x="250" y="315" width="5" height="3" />
          <rect x="260" y="315" width="5" height="3" />
          <rect x="270" y="315" width="5" height="3" />
          <rect x="280" y="315" width="5" height="3" />
          <rect x="250" y="325" width="5" height="3" />
          <rect x="260" y="325" width="5" height="3" />
          <rect x="270" y="325" width="5" height="3" />
          <rect x="280" y="325" width="5" height="3" />
          <rect x="250" y="335" width="5" height="3" />
          <rect x="260" y="335" width="5" height="3" />
          <rect x="270" y="335" width="5" height="3" />
          <rect x="280" y="335" width="5" height="3" />

          {/* Tall spire/tower at 430-450 */}
          <rect x="438" y="295" width="4" height="4" fill="#00D4FF" />
          <rect x="438" y="310" width="4" height="4" fill="#00D4FF" />
          <rect x="438" y="325" width="4" height="4" fill="#00D4FF" />
          
          {/* Building at 640-680 */}
          <rect x="650" y="305" width="6" height="6" />
          <rect x="665" y="305" width="6" height="6" />
          <rect x="650" y="320" width="6" height="6" />
          <rect x="665" y="320" width="6" height="6" />

          {/* Building at 950-970 */}
          <rect x="958" y="285" width="4" height="8" />
          <rect x="958" y="300" width="4" height="8" />
          <rect x="958" y="315" width="4" height="8" />
          <rect x="958" y="330" width="4" height="8" />

          {/* Building at 1040-1100 */}
          <rect x="1055" y="330" width="5" height="5" />
          <rect x="1065" y="330" width="5" height="5" />
          <rect x="1075" y="330" width="5" height="5" />
          <rect x="1085" y="330" width="5" height="5" />
          <rect x="1055" y="340" width="5" height="5" />
          <rect x="1065" y="340" width="5" height="5" />
          <rect x="1075" y="340" width="5" height="5" />
          <rect x="1085" y="340" width="5" height="5" />
        </g>
      </svg>

      {/* Road / Traffic flow Network */}
      <svg className="sc-road-network" viewBox="0 0 1200 400" preserveAspectRatio="none">
        <defs>
          <linearGradient id="roadGradMorning" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(127, 203, 255, 0.4)" />
            <stop offset="50%" stopColor="rgba(255, 255, 255, 0.7)" />
            <stop offset="100%" stopColor="rgba(127, 203, 255, 0.4)" />
          </linearGradient>
          <linearGradient id="roadGradNoon" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(77, 166, 255, 0.3)" />
            <stop offset="50%" stopColor="rgba(214, 240, 255, 0.6)" />
            <stop offset="100%" stopColor="rgba(77, 166, 255, 0.3)" />
          </linearGradient>
          <linearGradient id="roadGradEvening" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 179, 71, 0.5)" />
            <stop offset="50%" stopColor="rgba(255, 204, 128, 0.8)" />
            <stop offset="100%" stopColor="rgba(255, 179, 71, 0.5)" />
          </linearGradient>
          <linearGradient id="roadGradNight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0, 212, 255, 0.6)" />
            <stop offset="50%" stopColor="rgba(255, 255, 255, 0.8)" />
            <stop offset="100%" stopColor="rgba(255, 179, 71, 0.6)" />
          </linearGradient>
        </defs>

        {/* Road 1 - Main Highway */}
        <path 
          d="M-50,380 Q300,320 600,390 T1250,360" 
          fill="none" 
          stroke={
            timeOfDay === 'morning' ? 'url(#roadGradMorning)' :
            timeOfDay === 'noon' ? 'url(#roadGradNoon)' :
            timeOfDay === 'evening' ? 'url(#roadGradEvening)' : 'url(#roadGradNight)'
          }
          strokeWidth={timeOfDay === 'night' ? 2.5 : 1.5}
          opacity={timeOfDay === 'night' ? 0.8 : 0.5}
        />
        <path 
          d="M-50,380 Q300,320 600,390 T1250,360" 
          fill="none" 
          stroke={timeOfDay === 'night' ? '#00D4FF' : (timeOfDay === 'evening' ? '#FFCC80' : '#ffffff')}
          strokeWidth={timeOfDay === 'night' ? 3 : 2}
          className="sc-traffic-stream"
        />

        {/* Road 2 - Secondary Highway */}
        <path 
          d="M-50,395 Q400,360 800,395 T1250,385" 
          fill="none" 
          stroke={
            timeOfDay === 'morning' ? 'rgba(168, 216, 255, 0.3)' :
            timeOfDay === 'noon' ? 'rgba(77, 166, 255, 0.25)' :
            timeOfDay === 'evening' ? 'rgba(255, 204, 128, 0.4)' : 'rgba(0, 212, 255, 0.4)'
          }
          strokeWidth={1.5}
        />
        <path 
          d="M-50,395 Q400,360 800,395 T1250,385" 
          fill="none" 
          stroke={timeOfDay === 'night' ? '#FFB347' : '#ffffff'} 
          strokeWidth={2}
          className="sc-traffic-stream sc-traffic-stream-fast"
        />

        {/* Road 3 - High Bridge Skyline route */}
        <path 
          d="M-50,360 Q500,390 900,350 T1250,398" 
          fill="none" 
          stroke={
            timeOfDay === 'morning' ? 'rgba(168, 216, 255, 0.2)' :
            timeOfDay === 'noon' ? 'rgba(77, 166, 255, 0.2)' :
            timeOfDay === 'evening' ? 'rgba(255, 204, 128, 0.3)' : 'rgba(0, 212, 255, 0.3)'
          }
          strokeWidth={1}
        />
        <path 
          d="M-50,360 Q500,390 900,350 T1250,398" 
          fill="none" 
          stroke={timeOfDay === 'night' ? '#00D4FF' : '#ffffff'} 
          strokeWidth={1.5}
          className="sc-traffic-stream"
        />
      </svg>
    </div>
  );
}
