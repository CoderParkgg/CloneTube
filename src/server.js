import express from "express";
import morgan from "morgan";
import session from "express-session"; //middleware로 사용할 것. npm install express-session 이후 import 해주기
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter"; 
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({extended:true}));

app.use(
    session({ 
        secret : process.env.COOCIE_SECRET, 
        resave : false,            
        saveUninitialized : false,
        store : MongoStore.create({ mongoUrl : process.env.DB_URL }), 

}));

app.use(localsMiddleware);

app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/videos", videoRouter);
app.use("/uploads", express.static("uploads"));

export default app;
