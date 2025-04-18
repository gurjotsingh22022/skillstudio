'use client'

import { AdvancedImage, AdvancedVideo } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';

interface CloudinaryMediaProps {
  publicId: string;
  className?: string
  type: 'image' | 'video';
}

const CloudinaryMediaPlayer = ({ publicId, type, className }: CloudinaryMediaProps) => {

  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string,
      apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string,
      apiSecret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET as string,
    }
  }); 
  


  return (
      <AdvancedImage className={className} cldImg={cld.image(publicId).quality("auto")}/>
    
  );
};

export default CloudinaryMediaPlayer;