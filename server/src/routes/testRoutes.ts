import express from "express";
import { testOne } from "../controllers/testControl";

const router = express.Router();

router.get('/', testOne)

export default router;