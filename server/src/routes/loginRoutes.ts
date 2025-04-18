import express from "express";
import { loginMethod } from "../controllers/loginControl";

const routerLogin = express.Router();

routerLogin.post('/', loginMethod)

export default routerLogin;