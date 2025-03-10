import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

export const createUser = async ({ firstname, lastname, email, password }) => {

  if (!firstname || !lastname || !email || !password) {
    throw new Error("All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    fullname: `${firstname} ${lastname}`, 
    lastname,
    email,
    password: hashedPassword,
  });

  await user.save();

  const token = user.generateAuthtoken();

  return { token, user };
};
