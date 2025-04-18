import { Request, Response } from "express";
import db from "../../../../config/prisma";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

interface CloudinaryUploadResult {
    public_id: string;
    secure_url: string;
    asset_id?: string;
  }


export const uploadLessonVideo = async (
    req: MulterRequest,
    res: Response
  ): Promise<void> =>
{
    try{
        const { data } = req.body;

        const file = req.file;

        if (!file) {
            throw new Error('No file uploaded');
        }

        // Convert file to buffer
        // const arrayBuffer = await file.arrayBuffer();
        // const buffer = Buffer.from(arrayBuffer);

        const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
            cloudinary.uploader
              .upload_stream(
                {
                  folder: 'lessons', // optional
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
              .end(file.buffer);
          });
        
        res.status(200).json({ message: "got video", success: true, data:result });
    }
    catch (error) {
        res.status(500).json({ message: "Error uploading video: ", error });
      }
}

export const createLesson = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try{
        console.log("Hello")
        const { data } = req.body;
        console.log(data)

        if(!data)
        {
            res.status(500).json({ message: "No Data Found" });
            return;
        }

        const lastSection = await db.lesson.findFirst({
            where: { sectionId:data.sectionId },
            orderBy: { order: 'desc' },
          });
      
        
        const newOrder = lastSection ? lastSection.order + 1 : 0;
        

        console.log(newOrder)

        const section = await db.lesson.create({
            data: {
                title: data.title,
                videoUrl: data.videoUrl,
                videoPublicId: data.videoMetadata.public_id,
                videoMetadata: data.videoMetadata,
                duration: data.duration,
                sectionId: data.sectionId,
                isFree: data.isFree,
                isActive: data.isActive,
                order: newOrder,
              },
            }
        )

        if(!section)
        {
            res.status(404).json({ message: "section creation unsuccessful", success: false });
        }

        console.log(section)
        const courseIncre = await db.course.update({
            where: { id: parseInt(data.courseId) },
            data: {
              duration: {
                increment: parseFloat(data.duration), // adds the new lesson's duration
              },
            },
          });

        console.log(section)

        res.status(200).json({ message: "section created successfully", data: section, success: true });
    }
    catch (error) {
        res.status(500).json({ message: "Error uploading course: ", error });
      }
  }