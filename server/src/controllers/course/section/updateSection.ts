import { Request, Response } from "express";
import db from "../../../config/prisma";



export const updateSection = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try{
        console.log("Hello")
        const { data } = req.body;
        console.log(data)
        const { id, courseId, title, description } = data;
        console.log(courseId)
        console.log(title)

        if(!data)
        {
            res.status(500).json({ message: "No Data Found" });
            return;
        }

        const section = await db.section.update({
            where: {id},
            data: {
                title,
                description,
                courseId: parseInt(courseId),
              },
            }
        )

        console.log(section)

        res.status(200).json({ message: "section updated successfully", data: section, success: true });
    }
    catch (error) {
        res.status(500).json({ message: "Error uploading course: ", error });
      }
  }

export const updateOrder = async (
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

        

        const transaction = data.map((section: { id: string; newIndex: number; courseId: number }) =>
            db.section.update({
              where: { id: section.id, courseId: section.courseId },
              data: { order: section.newIndex },
            })
          );
      
        const updatedSections =   await db.$transaction(transaction);

        res.status(200).json({ message: "Sections reordered successfully", data: updatedSections, success: true });
    }
    catch (error) {
        res.status(500).json({ message: "Error uploading course: ", error });
        }
}