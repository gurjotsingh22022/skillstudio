import { Request, Response } from "express";
import db from "../../config/prisma";



export const user = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {

        const { data } = req.body;

        if(!data)
        {
            res.status(400).json({ message: "data not received"});
            return;
        }

        if(data.user.role!='admin')
        {
            res.status(403).json({ message: "Unauthorized Access"});
            return;
        }

        const user = await db.user.findUnique({
            where: { id: data.user.id },
            include: { role: true }
        })

        if(!user)
        {
            res.status(404).json({ message: "User not found"});
            return;
        }

        res.json({ message: "User Found", data: user, success: true});
    } catch (error) {
      res.status(500).json({ message: "Error retrieving user data", error });
    }
  };