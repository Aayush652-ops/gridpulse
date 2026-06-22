import React, { useState, useEffect, useRef } from 'react';

export default function BackgroundLayer() {
  const [timeOfDay, setTimeOfDay] = useState(() => {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 11) return 'morning';
    if (hours >= 11 && hours < 16) return 'noon';
    if (hours >= 16 && hours < 19) return 'evening';
    return 'night';
  });

  const [activeVideo, setActiveVideo] = useState('A');
  const videoARef = useRef(null);
  const videoBRef = useRef(null);
  
  const FADE_DURATION = 3; // seconds
  const PLAYBACK_RATE = 0.08;

  // Time of Day updater
  useEffect(() => {
    const updateTime = () => {
      const hours = new Date().getHours();
      let detected = 'night';
      if (hours >= 5 && hours < 11) detected = 'morning';
      else if (hours >= 11 && hours < 16) detected = 'noon';
      else if (hours >= 16 && hours < 19) detected = 'evening';
      setTimeOfDay(detected);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  // Video initialization
  useEffect(() => {
    if (videoARef.current) {
      videoARef.current.playbackRate = PLAYBACK_RATE;
      videoARef.current.play().catch(e => console.error("Video play failed:", e));
    }
    if (videoBRef.current) {
      videoBRef.current.playbackRate = PLAYBACK_RATE;
      videoBRef.current.pause();
    }
  }, []);

  // Crossfade logic
  const handleTimeUpdate = (e, videoId) => {
    const video = e.target;
    // Calculate how much real time is left in the video based on playback rate
    const timeLeft = (video.duration - video.currentTime) / PLAYBACK_RATE;
    
    // If we're getting close to the end, start fading in the other video
    if (timeLeft <= FADE_DURATION && video.duration > 0) {
      if (videoId === 'A' && activeVideo === 'A') {
        setActiveVideo('B');
        if (videoBRef.current) {
          videoBRef.current.currentTime = 0;
          videoBRef.current.playbackRate = PLAYBACK_RATE;
          videoBRef.current.play().catch(console.error);
        }
      } else if (videoId === 'B' && activeVideo === 'B') {
        setActiveVideo('A');
        if (videoARef.current) {
          videoARef.current.currentTime = 0;
          videoARef.current.playbackRate = PLAYBACK_RATE;
          videoARef.current.play().catch(console.error);
        }
      }
    }
  };

  const getFilterStyle = () => {
    switch (timeOfDay) {
      case 'morning': return 'brightness(1.1) saturate(1.1)';
      case 'noon': return 'brightness(1.2)';
      case 'evening': return 'brightness(0.9) sepia(0.15)';
      case 'night': return 'brightness(0.5) contrast(1.2) saturate(0.8)';
      default: return 'none';
    }
  };

  const getOverlayStyle = () => {
    const baseStyle = {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      transition: 'background 5s ease-in-out',
      zIndex: 1,
    };
    
    switch (timeOfDay) {
      case 'morning':
        return { ...baseStyle, background: 'linear-gradient(to top, rgba(255, 200, 150, 0.15), transparent)' };
      case 'noon':
        return { ...baseStyle, background: 'transparent' };
      case 'evening':
        return { ...baseStyle, background: 'linear-gradient(to top, rgba(255, 120, 50, 0.2), transparent)' };
      case 'night':
        return { ...baseStyle, background: 'rgba(0, 15, 60, 0.45)' }; // Dark blue overlay
      default:
        return baseStyle;
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: -20, // Negative inset to ensure scaling doesn't show edges
        zIndex: -1, // Keep behind dashboard
        pointerEvents: 'none',
        overflow: 'hidden',
        backgroundColor: '#050b18'
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          animation: 'parallax-drift 90s alternate infinite ease-in-out',
        }}
      >
        <video
          ref={videoARef}
          src="/city_skyline.mp4"
          muted
          playsInline
          onTimeUpdate={(e) => handleTimeUpdate(e, 'A')}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: getFilterStyle(),
            transition: 'opacity 3s ease-in-out, filter 5s ease-in-out',
            opacity: activeVideo === 'A' ? 1 : 0,
            zIndex: activeVideo === 'A' ? 0 : -1,
          }}
        />
        <video
          ref={videoBRef}
          src="/city_skyline.mp4"
          muted
          playsInline
          onTimeUpdate={(e) => handleTimeUpdate(e, 'B')}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: getFilterStyle(),
            transition: 'opacity 3s ease-in-out, filter 5s ease-in-out',
            opacity: activeVideo === 'B' ? 1 : 0,
            zIndex: activeVideo === 'B' ? 0 : -1,
          }}
        />
        
        {/* Time of Day Overlay */}
        <div style={getOverlayStyle()} />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes parallax-drift {
          0% { transform: translateY(0px) scale(1.05); }
          100% { transform: translateY(5px) scale(1.05); }
        }
      `}} />
    </div>
  );
}
