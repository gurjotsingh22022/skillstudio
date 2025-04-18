// components/Loader.tsx
'use client';

import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function LoaderSpinner() {
  const isLoading = useSelector((state: any) => state.loader.isLoading);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset to start
    }
  };

  if (!isLoading) return null;
  // useEffect(() => {
  //   if (audioRef.current) {
  //     audioRef.current.muted = true; // Start muted to bypass autoplay policies
  //     audioRef.current.play()
  //       .then(() => {
  //         // Unmute after play starts (may still require user interaction on some browsers)
  //         audioRef.current!.muted = false;
  //       })
  //       .catch(error => console.log('Play error:', error));
  //   }
  // }, []);

  return (
    <>
    {/* <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999999]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
    </div> */}

<AnimatePresence>
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          {/* Blurred backdrop */}
          <div className="absolute inset-0 bg-opacity-20 backdrop-blur-sm" />
          <audio ref={audioRef} src="/minglemusic.wav" loop autoPlay />
          <div className="relative">
            <SquidGamesLoader/>
          </div>
          


        </div>
      )}
    </AnimatePresence>

    
    </>
    
  );
}

const SquidGamesLoader = () =>{
  return(
    <>
    <div className="loader">
  <svg viewBox="0 0 80 80">
    <circle r="32" cy="40" cx="40" id="test"></circle>
  </svg>
</div>

<div className="loader triangle">
  <svg viewBox="0 0 86 80">
    <polygon points="43 8 79 72 7 72"></polygon>
  </svg>
</div>

<div className="loader">
  <svg viewBox="0 0 80 80">
    <rect height="64" width="64" y="8" x="8"></rect>
  </svg>
</div>
    </>
  )
}

const LoadingLightIcon: React.FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="200" width="200">
      <g style={{ order: -1 }}>
        <polygon
          transform="rotate(45 100 100)"
          strokeWidth="1"
          stroke="#d3a410"
          fill="none"
          points="70,70 148,50 130,130 50,150"
          id="bounce"
        />
        <polygon
          transform="rotate(45 100 100)"
          strokeWidth="1"
          stroke="#d3a410"
          fill="none"
          points="70,70 148,50 130,130 50,150"
          id="bounce2"
        />
        <polygon
          transform="rotate(45 100 100)"
          strokeWidth="2"
          stroke=""
          fill="#414750"
          points="70,70 150,50 130,130 50,150"
        />
        <polygon
          strokeWidth="2"
          stroke=""
          fill="url(#gradiente)"
          points="100,70 150,100 100,130 50,100"
        />
        <defs>
          <linearGradient y2="100%" x2="10%" y1="0%" x1="0%" id="gradiente">
            <stop style={{ stopColor: '#1e2026', stopOpacity: 1 }} offset="20%" />
            <stop style={{ stopColor: '#414750', stopOpacity: 1 }} offset="60%" />
          </linearGradient>
        </defs>
        <polygon
          transform="translate(20, 31)"
          strokeWidth="2"
          stroke=""
          fill="#b7870f"
          points="80,50 80,75 80,99 40,75"
        />
        <polygon
          transform="translate(20, 31)"
          strokeWidth="2"
          stroke=""
          fill="url(#gradiente2)"
          points="40,-40 80,-40 80,99 40,75"
        />
        <defs>
          <linearGradient y2="100%" x2="0%" y1="-17%" x1="10%" id="gradiente2">
            <stop style={{ stopColor: '#d3a51000', stopOpacity: 1 }} offset="20%" />
            <stop
              style={{ stopColor: '#d3a51054', stopOpacity: 1 }}
              offset="100%"
              id="animatedStop"
            />
          </linearGradient>
        </defs>
        <polygon
          transform="rotate(180 100 100) translate(20, 20)"
          strokeWidth="2"
          stroke=""
          fill="#d3a410"
          points="80,50 80,75 80,99 40,75"
        />
        <polygon
          transform="rotate(0 100 100) translate(60, 20)"
          strokeWidth="2"
          stroke=""
          fill="url(#gradiente3)"
          points="40,-40 80,-40 80,85 40,110.2"
        />
        <defs>
          <linearGradient y2="100%" x2="10%" y1="0%" x1="0%" id="gradiente3">
            <stop style={{ stopColor: '#d3a51000', stopOpacity: 1 }} offset="20%" />
            <stop
              style={{ stopColor: '#d3a51054', stopOpacity: 1 }}
              offset="100%"
              id="animatedStop"
            />
          </linearGradient>
        </defs>
        <polygon
          transform="rotate(45 100 100) translate(80, 95)"
          strokeWidth="2"
          stroke=""
          fill="#ffe4a1"
          points="5,0 5,5 0,5 0,0"
          id="particles"
        />
        <polygon
          transform="rotate(45 100 100) translate(80, 55)"
          strokeWidth="2"
          stroke=""
          fill="#ccb069"
          points="6,0 6,6 0,6 0,0"
          id="particles"
        />
        <polygon
          transform="rotate(45 100 100) translate(70, 80)"
          strokeWidth="2"
          stroke=""
          fill="#fff"
          points="2,0 2,2 0,2 0,0"
          id="particles"
        />
        <polygon
          strokeWidth="2"
          stroke=""
          fill="#292d34"
          points="29.5,99.8 100,142 100,172 29.5,130"
        />
        <polygon
          transform="translate(50, 92)"
          strokeWidth="2"
          stroke=""
          fill="#1f2127"
          points="50,50 120.5,8 120.5,35 50,80"
        />
      </g>
    </svg>
  );
};
