import { Request, Response } from "express";



export const testOne = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      res.json({ message: "Courses retrieved successfully"});
    } catch (error) {
      res.status(500).json({ message: "Error retrieving courses", error });
    }
  };