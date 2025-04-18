import { Request, Response } from "express";
import { v2 as cloudinary } from 'cloudinary';
import db from "../../config/prisma";

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


export const updateThumbnail = async (
    req: MulterRequest,
    res: Response
  ): Promise<void> =>
{
    try{
        const { id } = req.body;

        console.log(id)
        const file = req.file;

        if (!file) {
            throw new Error('No file uploaded');
        }

        const course = await db.course.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if(!course)
        {
            return;
        }

        cloudinary.api.delete_resources([course?.thumbnailPublicId], function(result) { console.log(result) });



        // Convert file to buffer
        // const arrayBuffer = await file.arrayBuffer();
        // const buffer = Buffer.from(arrayBuffer);

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
              .end(file.buffer);
          });

          const jsonSafeResult = JSON.parse(JSON.stringify(result));

        const updateThumb = await db.course.update({
            where: {id: parseInt(id)},
            data: {
                thumbnailPublicId: jsonSafeResult.public_id,
                thumbnailUrl: jsonSafeResult.secure_url,
                thumbnailMetadata: jsonSafeResult
            }
        })
        
        res.status(200).json({ message: "got video", success: true, data:updateThumb });
    }
    catch (error) {
        res.status(500).json({ message: "Error uploading video: ", error });
      }
}