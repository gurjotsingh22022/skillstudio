import express from "express";
import { createCourse } from "../../controllers/course/createCourse";
import { user } from "../../controllers/user/user";
import { getAllCourses, getCourseById } from "../../controllers/course/sendCourses";
import { createSection } from "../../controllers/course/section/createSection";
import { updateOrder, updateSection } from "../../controllers/course/section/updateSection";
import { createLesson, uploadLessonVideo } from "../../controllers/course/section/lesson/createLesson";
import { updateLessonsOrder } from "../../controllers/course/section/lesson/updateLesson";
import { updateThumbnail } from "../../controllers/course/updateThumbnail";
import { updateCourse } from "../../controllers/course/updateCourse";

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const routerAdmin = express.Router();

routerAdmin.post('/course', createCourse)
routerAdmin.get('/user', user)
routerAdmin.get('/courses', getAllCourses)
routerAdmin.get('/course', getCourseById)
routerAdmin.post('/section', createSection)
routerAdmin.put('/section', updateSection)
routerAdmin.put('/section/reorder', updateOrder)
routerAdmin.post('/lesson', createLesson)
routerAdmin.put('/lesson/reorder', updateLessonsOrder)
routerAdmin.post('/upload-video-lesson', upload.single('video'), uploadLessonVideo)
routerAdmin.put('/course/thumbnail', upload.single('file'), updateThumbnail)
routerAdmin.put('/course', updateCourse)

export default routerAdmin;