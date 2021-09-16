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
    session({ //middleware 만들기. session() 함수를 부르고(session은 위에서 import한 이름) 객체 인자 넣어주기. 
        //익명의 사용자 또는 방문자들에게 모두 세션id를 부여하고 서버에서 관리하게 되면 이는 엄청난 낭비가 된다. 로그인한 사람만 서버에서 관리하도록 하자. 
        //resave, savunitialized 설정을 false로 두면 사용자가 로그인했을 때만 세션id를 쿠키로 부여한다. 단순히 방문만 한 경우 부여하지 않는다.
        //saveUnitialized는 따로 값을 설정하지 않은 전달 받은 날 것의 세션을 즉시 store에 저장 후 세션 주인에게 쿠키를 넘겨준다. 
        //false로 두게 되면 이전에 우리가 로그인할 때 세션값을 부여해주었는데 그 떄가  세션을 초기화 한 시점이고(값을 부여한 시점) 그 이후에 데이터베이스에 저장하게 된다. 
        //resave는 "https://github.com/expressjs/session#resave check this out if you have any more questions." 페이지 보기

        secret : process.env.COOCIE_SECRET, //secret은 우리가 쿠키에 sign할 때 사용하는 string이다. sign하는 이유는 백엔드가 쿠키를 줬다는 것을 보여주기 위함. 이것을 잘 보호해야 한다. 쿠키를 훔쳐서 마치 그 사람인 것 처럼 할 수 있기 때문. 길고 랜덤한 문자열로 만들어야 한다. 
        resave : false,            
        saveUninitialized : false,
        store : MongoStore.create({ mongoUrl : process.env.DB_URL }), //.env 파일은 값들을 변수로 저장해놓을 수 있다. 전역변수로 되는듯. 이에 접근할 때는 이처럼 process.env.[변수이름]으로 하면 된다. 당연히 .env는 깃에 올리면 안되니 gitignore파일에 추가하자
        /*
        cookie : {
            maxAge : 20000 //단위는 밀리세컨드(1000 : 1)
        },
        */
}));
// 이 middleware가 사이트로 들어오는 모두를 기억하게 됨.
//세션이라고 해서 브라우저가 웹을 접속하면 서버가 브라우저로 특정 값(세션_id)을 보내줌. 이를 클라이언트(브라우저)에서 쿠키로 저장. 이 값은 브라우저별로 다르다(같은 브라우저끼리는 동일)
//즉 세션은 쿠키를 사용하는 클라이언트(=브라우저 => 유저)를 구분하는 수단으로, 이를 가지고 있으면 이것에 다양한 정보들을 추가해줄 수 있다. 
//세션은 서버 메모리에 저장된다. 그러므로 만약 서버 닫고 다시 열면 이 값이 사라진다.=> 데이터베이스에 저장해야 이런 일 없다. 

//쿠키에는 정말 다양한 것들이 존재하는데 그 중 Domain은 쿠키가 어지에서 왔는지, 어디로 가야하는지 알려준다. 우리가 만든 페이지에서 다른 타 사이트의 도메인이 나오지 않는 이유이기도 하다. 쿠키의 도메인의 주소로 가고 도메인의 주소로 받는다. 즉 우리가 a사이트에서 받은 쿠키가 b사이트로 가거나 b에서 받아오지 못하는 것이 이 이유. 
//path은 그냥 주소
//Expires / max-age 는 세션 만료 날짜를 나타낸다. session으로 나와있는 경우 브라우저를 닫거나 컴퓨텨를 끄는 시점으로 설정된 것이고 일정한 날짜가 나온 경우는 그 시각이 만료 시각이라는 것을 나타낸다. 
//이는 코드로 설정해 줄 수 있다. 위 참고. expire또한 세션의 프로퍼티로 저장되어있다. 데이터베이스에 저장하였다면 확인할 수 있다. 

app.use(localsMiddleware);

app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/videos", videoRouter);

export default app;
