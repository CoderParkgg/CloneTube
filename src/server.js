import express from "express";
import morgan from "morgan";


const PORT = 3001;
const app = express();
const logger = morgan("dev");


const handleHome = (req, res) => {
    return res.send("Hello :)");
};
const handleLogin = (req, res) => {
    return res.send({ login: "hi" });
};
const handleProtected = (req, res) => {
    return res.send("<h1>Welcome to the private lounge</h1>");
};


app.use(logger);
app.get("/", handleHome);
app.get("/login", handleLogin);
app.get("/protected", handleProtected);



const handleListening = () => console.log(`server listening on port http://localhost:${PORT}`)
app.listen(PORT, handleListening); //request를 듣늗다. callback함수를 사용하여 일정 port에 요청이 오면 callback함수 실행
