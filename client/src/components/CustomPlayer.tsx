'use client'

import { useEffect, useState } from 'react';

interface CustomPlayerProps {
    videoId: string;
  }

const YouTubeVideo = ({ videoId }: CustomPlayerProps) => {
  const [videoURL, setVideoURL] = useState('');


  return (
    <div>
      <iframe className='rounded-lg w-full aspect-[16/9] object-cover' src="https://www.youtube.com/embed/ppTqao5b7pA" title="YouTube video player" frameBorder="0" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      {/* <video src="https://youtu.be/ppTqao5b7pA"></video> */}
    </div>
  );
};

export default YouTubeVideo;