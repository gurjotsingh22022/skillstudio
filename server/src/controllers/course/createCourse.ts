import { Request, Response } from "express";
import db from "../../config/prisma";



export const createCourse = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try{
        const { data } = req.body;
        console.log(data)

        if(!data)
        {
            res.status(500).json({ message: "No Data Found" });
            return;
        }

        const course = await db.course.create({
                data: data
            }
        )

        res.status(200).json({ message: "course created successfully", data: course });
    }
    catch (error) {
        res.status(500).json({ message: "Error uploading course: ", error });
      }
  }