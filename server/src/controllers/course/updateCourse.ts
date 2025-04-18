import { Request, Response } from "express";
import db from "../../config/prisma";



export const updateCourse = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try{
        console.log("Hello")
        const { data, id } = req.body.data;

        // console.log(data)

        if(!data)
        {
            res.status(500).json({ message: "No Data Found" });
            return;
        }

        const course = await db.course.update({
            where: { id: parseInt(id)},
            data
        })

        console.log(course)

        res.status(200).json({ message: "course updated successfully", success: true, data: course });
    }
    catch (error) {
        console.log("err ", error)
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