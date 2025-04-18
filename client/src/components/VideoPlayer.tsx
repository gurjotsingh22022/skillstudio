'use client'

import React, { useState, useEffect, useRef } from 'react';


interface CustomPlayerProps {
    videoURL: string;
  }

const VideoPlayer: React.FC<CustomPlayerProps> = ({ videoURL }) => {
  const [videoBlobUrl, setVideoBlobUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const fetchVideoData = async () => {
      

      try {
        const response = await fetch(videoURL);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setVideoBlobUrl(url);
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };

    fetchVideoData();

    return () => {
      if (videoBlobUrl) {
        URL.revokeObjectURL(videoBlobUrl);
      }
    };
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const volume = parseFloat(e.target.value);
      videoRef.current.volume = volume;
    }
  };

  return (
    <div className="custom-player">
      {videoBlobUrl ? (
        <video
          ref={videoRef}
          className="w-full h-full"
          src={videoBlobUrl}
          controls={false}
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <p className="text-white text-center py-10">Loading Video...</p>
      )}
      
      <div className="controls">
        <button onClick={handlePlayPause} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full">
          Play/Pause
        </button>
        <input
          type="range"
          className="volume-slider"
          min="0"
          max="1"
          step="0.01"
          defaultValue="1"
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
