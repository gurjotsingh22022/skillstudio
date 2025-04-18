import { Request, Response } from "express";
import db from "../config/prisma";



export const loginMethod = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {

      const { data } = req.body;
      console.log(data)

      const userCheck = await db.user.findUnique({
          where: { email: data.email },
          include: { role: true }
      })

      if(userCheck)
      {
        console.log(userCheck)
        res.json({
          message: "User found for login",
          data: userCheck
        })
      }
      else
      {
        const user = await db.user.create({
        data: {
          name: data.name,
          email: data.email,
          image: data.picture,
          roleID: 1,
          provider: 'google',
          providerID: data.sub,
          providerURL: data.iss,
        }
      });

      const userData = await db.user.findUnique({
        where: {
          id: user.id
        },
        include: {
          role: true
        }
      })

      console.log(userData)

      res.json({
        message: "User account created successfully",
        data: userData
      })
      }
      
    
    } catch (error) {
      res.status(500).json({ message: "Error logging in", error });
    }
  };