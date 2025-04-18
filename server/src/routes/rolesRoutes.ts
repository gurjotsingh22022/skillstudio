import express from "express";
import { roleCreateMethod } from "../controllers/rolesControl";

const routerRoles = express.Router();

routerRoles.post('/', roleCreateMethod)

export default routerRoles;