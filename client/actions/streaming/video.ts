'use server'

// pages/api/getSignedUrl.ts
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export default async function getPrivateURL(publicId: string) {

  console.log(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET)
  // Validate publicId
  if (typeof publicId !== 'string') {
    return { error: 'publicId is required and must be a string' };
  }
  try {
    // Generate a signed URL for the private video
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { public_id: publicId, timestamp },
      process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET!
    );

    console.log(signature)
    const url = cloudinary.url(`${publicId}.mp4`, {
      resource_type: 'video',
      sign_url: true,
      timestamp,
      signature,
      api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    });

    console.log(url)

   return { url };
  } catch (error) {
    console.error('Error generating signed URL:', error);
    return { error: 'Failed to generate signed URL' };
  }
}