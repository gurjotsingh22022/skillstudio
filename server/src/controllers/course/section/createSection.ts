import { Request, Response } from "express";
import db from "../../../config/prisma";



export const createSection = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try{
        console.log("Hello")
        const { data } = req.body;
        console.log(data)
        const { courseId, title, description } = data;
        console.log(courseId)
        console.log(title)

        if(!data)
        {
            res.status(500).json({ message: "No Data Found" });
            return;
        }

        const lastSection = await db.section.findFirst({
            where: { courseId:parseInt(courseId) },
            orderBy: { order: 'desc' },
          });
      
        
        const newOrder = lastSection ? lastSection.order + 1 : 0;
        

        console.log(newOrder)

        const section = await db.section.create({
            data: {
                title,
                description,
                order: newOrder,
                courseId: parseInt(courseId),
              },
            }
        )

        console.log(section)

        res.status(200).json({ message: "section created successfully", data: section, success: true });
    }
    catch (error) {
        res.status(500).json({ message: "Error uploading course: ", error });
      }
  }