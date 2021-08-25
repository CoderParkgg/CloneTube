import express from "express";
import morgan from "morgan";
import session from "express-session"; //middleware로 사용할 것. npm install express-session 이후 import 해주기
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
    session({ //middleware 만들기. session() 함수를 부르고(session은 위에서 import한 이름) 객체 인자 넣어주기. 
        secret : "Hello!",
        resave : true,
        saveUninitialized : true,
}));
// 이 middleware가 사이트로 들어오는 모두를 기억하게 됨.
//세션이라고 해서 브라우저가 웹을 접속하면 서버가 브라우저로 특정 값(세션_id)을 보내줌. 이를 클라이언트(브라우저)에서 쿠키로 저장. 이 값은 브라우저별로 다르다(같은 브라우저끼리는 동일)
//즉 세션은 쿠키를 사용하는 클라이언트(=브라우저 => 유저)를 구분하는 수단으로, 이를 가지고 있으면 이것에 다양한 정보들을 추가해줄 수 있다. 
//세션은 서버 메모리에 저장된다. 그러므로 만약 서버 닫고 다시 열면 이 값이 사라진다.=> 데이터베이스에 저장해야 이런 일 없다. 

app.use(localsMiddleware);

app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/videos", videoRouter);

export default app;
