import { Request, Response } from "express";
import db from "../../../../config/prisma";



export const updateLessonsOrder = async (
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

        const transaction = data.map((lesson: { id: string; newIndex: number; sectionId: string }) =>
            db.lesson.update({
              where: { id: lesson.id, sectionId: lesson.sectionId },
              data: { order: lesson.newIndex },
            })
          );
      
        const updatedSections =   await db.$transaction(transaction);

        res.status(200).json({ message: "Lessons reordered successfully", data: updatedSections, success: true });
    }
    catch (error) {
        res.status(500).json({ message: "Error uploading course: ", error });
        }
}