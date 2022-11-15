import { Router } from "express";
import ResponseController from "../controllers/responseController.js";

const router = Router();
const responseController = new ResponseController();


export default router;
