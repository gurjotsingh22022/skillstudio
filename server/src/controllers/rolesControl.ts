
import { Request, Response } from "express";
import db from "../config/prisma";



export const roleCreateMethod = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
        const { Title } = req.body.data;
        const resp = await db.role.create({
            data:{
                Title 
            }
        })
      res.json({ message: "Role Created Successful",
        success: true
    });
    } catch (error) {
      res.status(500).json({ message: "Error creating roles", error });
    }
  };