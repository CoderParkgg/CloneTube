import express from "express";
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import apiRouter from "./routers/apiRouter";
import { localsMiddleware } from "./middlewares";
const app = express();
const logger = morgan("dev");

app.use((req, res, next) => {
    res.header("Cross-Origin-Embedder-Policy", "require-corp");
    res.header("Cross-Origin-Opener-Policy", "same-origin");
    next();
});

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
//app.use(express.text()); //외부로 부터 받는 모든 text를 이해할 수 있게 만들어 준다.
app.use(express.json()); //외부로 부터 들어오는 String화된 객체를 자동으로 객체로 바꾸어 준다. 다만 이것이 String회된 객체인지를 인지하도록 만들어야 한다.
//express.json()이 모든 text를 받는 역할도 하기 때문에 express.text를 대체할 수 있다.
app.use(
    session({
        secret: process.env.COOCIE_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    })
);
app.use(flash());
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use("/api", apiRouter);
app.use("/convert", express.static("node_modules/@ffmpeg/core/dist"));

export default app;
