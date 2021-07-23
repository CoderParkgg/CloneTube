import express from "express";
import {join} from "../controllers/userControllers";
import {tranding} from "../controllers/videoControllers";


const globalRouter = express.Router();

globalRouter.get("/", tranding);
globalRouter.get("/join", join);


export default globalRouter;
