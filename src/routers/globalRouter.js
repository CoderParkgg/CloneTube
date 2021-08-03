import express from "express";
import { join, login } from "../controllers/userControllers";
import { home, search, getUpload, postUpload } from "../controllers/videoControllers";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/search", search);


export default globalRouter;
