import jwt from "jsonwebtoken";
import BlacklistToken from "../models/blacklist.model.js"; // Import the BlacklistToken model
import User from "../models/user.model.js"; // Import the User model

export const authUser = async (req, res, next) => {
  const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {

    const blacklistedToken = await BlacklistToken.findOne({ token });
    if (blacklistedToken) {
      return res.status(401).json({ message: "Token has been invalidated. Please log in again." });
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user associated with the token
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "User not found. Unauthorized" });
    }

    // Attach the user information to the request
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
