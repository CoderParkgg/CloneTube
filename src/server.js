import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter"; //router 모듈을 export한 것을 import 해서 가져옴.
import userRouter from "./routers/userRouter"; //가져올 이름에 대해서는 자유. 하지만 같게 해주는 것이 햇깔리지 않고 오류를 범할 확률 줄임.
import videoRouter from "./routers/videoRouter";

const PORT = 3002;
const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/videos", videoRouter);

const handleListening = () => console.log(`server listening on port http://localhost:${PORT}`)
app.listen(PORT, handleListening); //request를 듣늗다. callback함수를 사용하여 일정 port에 요청이 오면 callback함수 실행
