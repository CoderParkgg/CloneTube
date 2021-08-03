import "./db.js";
import "./models/Video"
import app from "./server";

const PORT = 3002;


const handleListening = () => console.log(`server listening on port http://localhost:${PORT}`)
app.listen(PORT, handleListening);