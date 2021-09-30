import express from 'express';
import { getEdit,postEdit, remove, logout, see, startGithubLogin, finishGithubLogin, getChangePassword, postChangePassword } from "../controllers/userControllers";
import { protectorMiddleware, publicOnlyMiddleware } from '../middlewares';

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware,logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit); //모든 method에 관하여 middelware를 사용하고 싶다면 all()함수를 사용하자.
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get("/remove", remove);
userRouter.get(":id", see);

export default userRouter;