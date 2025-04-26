import express from "express"; // Correct import for express
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import captainRoutes from "./routes/captain.routes.js";
import cookieParser from "cookie-parser";
import mapsRoutes from "./routes/maps.routes.js"
import ridesRoutes from "./routes/rides.routes.js";
// Create an express app
const app = express();

// Use cookie-parser middleware
app.use(cookieParser());

// Use JSON and URL encoded parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // Allow requests only from your frontend
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // Allow credentials (cookies, etc.)
};

// Apply CORS middleware with the specified options
app.use(cors(corsOptions));

// Routes
app.use("/users", userRoutes);
app.use("/captain", captainRoutes);
app.use("/maps",mapsRoutes)
// Default route to check if server is running
app.use("/rides",ridesRoutes)

export default app;
