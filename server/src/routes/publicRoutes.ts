import express from "express";
import { checkPublicIdAvailable, getFeedCourses } from "../controllers/course/sendCourses";

const routerPublic = express.Router();

routerPublic.get('/courses-feed', getFeedCourses)
routerPublic.get('/check-publicid', checkPublicIdAvailable)

export default routerPublic;