import app from "./app.js"; // Import your Express app
import http from "http";
import connectToMongoDB from "./db/db.js";
import { configDotenv } from "dotenv";

configDotenv();

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

connectToMongoDB();

server.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
