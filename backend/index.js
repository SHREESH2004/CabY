import app from "./app.js";
import http from "http";
import { configDotenv } from "dotenv";
configDotenv();
const server=http.createServer(app);
const PORT=process.env.PORT;
server.listen(PORT,()=>{
    console.log("App running on port",PORT)
})