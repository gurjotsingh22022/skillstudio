"use server"

import { v2 as cloudinary } from 'cloudinary';
import { fetchDataFromBackend, postDataToBackend } from '../query/axiosQuery';
import { getSessionData } from '../storedData/methods';

interface DataTypes {
    title: string,
    description: string,
    thumbnail: File,
    language: string,
    price: number,
    isDiscounted: boolean,
    originalPrice?: number,
    timeAccess?: number
}

interface lessonsTypes {
  title:     string,
  duration:  number, // in minutes
  sectionId: string,
  courseId: number,
  isFree:    boolean
  isActive:  boolean
  secure_url:  string,
  public_id:  string,
  MetaData:  any,
}

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
    public_id: string;
    secure_url: string;
    asset_id?: string;
  }

export const UplaodCourse =async (data: DataTypes) =>
{
    try
    {
        const userData = await getSessionData();

        if(!userData)
        {
            throw new Error('User not logged in');
        }

        const response = await fetchDataFromBackend('/api/ultra/user',userData);

        console.log(response)

        if(!response.success || response.data.role.Title!='admin')
        {
            throw new Error('Unauthorized Access');
        }


        if(!data)
        {
            return {
                success: false,
                message: 'Data Not Available',
                data: null
            }
        }

        console.log(data)

        const file = data.thumbnail as File;

        if (!file) {
            throw new Error('No file uploaded');
        }

        // Convert file to buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
            cloudinary.uploader
              .upload_stream(
                {
                  folder: 'thumbnails', // optional
                  resource_type: 'auto',
                },
                (error, result) => {
                  if (error) {
                    reject(error);
                    return;
                  }
                  resolve(result as CloudinaryUploadResult);
                }
              )
              .end(buffer);
          });
      

        if(!result)
        {
            throw new Error('File Uploading Err');
        }

        const sendableData = {
            title: data.title,
            description: data.description,
            userId: response.data.id,
            thumbnailPublicId: result.public_id,
            thumbnailUrl: result.secure_url,
            thumbnailMetadata: result,
            language: data.language,
            price: data.price,
            originalPrice: data.originalPrice || null,
            timeAccess: data.timeAccess || null
        }

        const resp = await postDataToBackend('/api/ultra/course',sendableData);
        console.log(resp)
    
        return {
            success: true,
            message: 'Course Created Successfully'
        }

    }
    catch (error: any) {
        console.error('Server Err:', error);
        return { error: error?.message };
    }
    
}

export const UplaodLesson =async (data: lessonsTypes) =>
{
    try
    {
        const userData = await getSessionData();

        if(!userData)
        {
            throw new Error('User not logged in');
        }

        const response = await fetchDataFromBackend('/api/ultra/user',userData);

        console.log(response)

        if(!response.success || response.data.role.Title!='admin')
        {
            throw new Error('Unauthorized Access');
        }


        if(!data)
        {
            return {
                success: false,
                message: 'Data Not Available',
                data: null
            }
        }

        console.log(data)
      

        const sendableData = {
            title: data.title,
            videoUrl: data.secure_url,
            videoPublicId: data.public_id,
            videoMetadata: data.MetaData,
            duration: data.duration,
            sectionId: data.sectionId,
            courseId: data.courseId,
            isFree: data.isFree,
            isActive: data.isActive
        }

        const resp = await postDataToBackend('/api/ultra/lesson',sendableData);
        console.log(resp)
    
        return {
            success: true,
            data: resp.data,
            message: 'Lesson Created Successfully'
        }

    }
    catch (error: any) {
        console.error('Server Err:', error);
        return { error: error?.message };
    }
    
}