import { Request, Response } from "express";
import db from "../../config/prisma";



export const getAllCourses = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {

        const { data } = req.body;

        console.log(data)

        if(!data)
        {
            res.status(400).json({ message: "data not received"});
            return;
        }

        const user = await db.user.findUnique({
            where: { id: data.id },
            include: { role: true }
        })


        if(!user || user.role.Title!='admin')
        {
            res.status(403).json({ message: "Unauthorized Access"});
            return;
        }

        console.log('till here')

        const courses = await db.course.findMany({
          include: {
            Section: true
          }
        })

        console.log(courses)

        res.json({ message: "Courses retrieved successfully", success: true, data:courses});
    } catch (error) {
      res.status(500).json({ message: "Error retrieving courses", error });
    }
  };


export const getFeedCourses = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {

        const courses = await db.course.findMany({
          where: {isActive:true, status: 'public'},
          select: {
            id: true,
            title: true,
            publicId: true,
            thumbnailPublicId: true,
            price: true,
            originalPrice: true,
            User: { select: {  // Add explicit select for the User relation
              name: true,
              image: true
            } }
          },
        })

        console.log(courses)

        res.json({ message: "Courses retrieved successfully", success: true, data:courses});
    } catch (error) {
      res.status(500).json({ message: "Error retrieving courses", error });
    }
  };


export const getCourseById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {

        const { data } = req.body;
        const { id, userData} = data;

        console.log(data)

        if(!data)
        {
            res.status(400).json({ message: "data not received"});
            return;
        }

        // const user = await db.user.findUnique({
        //     where: { id: userData.id },
        //     include: { role: true }
        // })


        // if(!user || user.role.Title!='admin')
        // {
        //     res.status(403).json({ message: "Unauthorized Access"});
        //     return;
        // }

        console.log('till here')

        const courses = await db.course.findUnique({
          where: { id: parseInt(id) },
          include: {
            Section: {
              include: {
                lessons: true
              }
            }
          }
        });

        console.log(courses)

        res.json({ message: "Courses retrieved successfully", success: true, data:courses});
    } catch (error) {
      res.status(500).json({ message: "Error retrieving courses", error });
    }
  };

export const checkPublicIdAvailable = async (
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

        console.log(data)

        const courses = await db.course.findUnique({
          where: { publicId:data },
          select: {
            id: true
          }
        })

        
        if(!courses)
        {
          res.json({ message: "Available", success: true, available: true})
          return;
        }

        res.json({ message: "Not available", success: true, available:false});
    } catch (error) {
      console.log("ERR = ", error)
      res.status(500).json({ message: "Error retrieving courses", error });
    }
  };