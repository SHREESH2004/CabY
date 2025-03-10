import e from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
const app =e();
app.use(cookieParser());
app.use(e.json()); 
app.use(e.urlencoded({extended:true}))
app.use("/users", userRoutes);
app.use(cors());
export default app;