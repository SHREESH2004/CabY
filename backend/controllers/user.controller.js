import { validationResult } from "express-validator";
import { createUser } from "../service/user.service.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser"; // Ensure this is used in your app for cookie parsing

export const registerUser = async (req, res, next) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  try {
    // Check if the user already exists
    const isUserAlready = await User.findOne({ email });
    if (isUserAlready) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await User.hashPassword(password);

    // Create the user in the database
    const user = await createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });

    // Generate the JWT token
    const token = user.generateAuthToken();

    // Send response with token and user info
    res.status(201).json({ token, user });
  } catch (error) {
    next(error); // Pass errors to the error handler middleware
  }
};

export const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Find the user by email and include password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if the password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate the JWT token
    const token = user.generateAuthToken();

    // Set token in cookies
    res.cookie('token', token, { httpOnly: true });

    // Send response with token and user info
    res.status(200).json({ token, user });
  } catch (error) {
    next(error); // Handle any unexpected errors
  }
};

export const getUserProfile = async (req, res) => {
  res.status(200).json(req.user);
};

export const logoutUser = async (req, res) => {
  try {

    res.clearCookie('token');

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error logging out' });
  }
};

export default { registerUser, loginUser, getUserProfile, logoutUser };
