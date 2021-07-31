import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/CloneTube", {useNewUrlParser: true, useUnifiedTopology : true});
//mongo 커맨드로 mongo실행시키고 conneec 주소를 복사해 가져온다. 
//여기서 위처럼 사용하여 연결 가능하고 특히나 주소에 "/이름" 을 덧붙쳐 적어준다. 이름은 아무거나 상관없음.

const db = mongoose.connection;

const handleError = (error) => console.log("❌DB Error", error);
const handleOpen = (open) => console.log("✅Connected to  DB");

db.on("error", handleError);
db.once("open", handleOpen)
