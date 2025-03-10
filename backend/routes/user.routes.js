import express from "express";
import { validationResult } from "express-validator";
import { body } from "express-validator";
import User from "../models/user.model.js";

const router = express.Router();
router.post(
  "/register",
  [
    body("fullname").trim().notEmpty().withMessage("Fullname is required").isLength({ min: 3 }).withMessage("Fullname must be at least 3 characters"),
    body("email").isEmail().withMessage("Please provide a valid email").normalizeEmail(),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],userController.registerUser
  );
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please provide a valid email").normalizeEmail(),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  );

export default router;
