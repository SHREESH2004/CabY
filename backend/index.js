import app from "./app.js";
import http from "http";
import connectToMongoDB from "./db/db.js";
import { configDotenv } from "dotenv";
configDotenv();
const server=http.createServer(app);
const PORT=process.env.PORT;
connectToMongoDB();
server.listen(PORT,()=>{
    console.log("App running on port",PORT)
})