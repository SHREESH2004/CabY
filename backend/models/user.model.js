import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const UserSchema = new mongoose.Schema({
  fullname: {
      firstname: {
          type: String,
          required: true,
          minlength: [ 3, 'First name must be at least 3 characters long' ],
      },
      lastname: {
          type: String,
          minlength: [ 3, 'Last name must be at least 3 characters long' ],
      }
  },
  email: {
      type: String,
      required: true,
      unique: true,
      minlength: [ 5, 'Email must be at least 5 characters long' ],
  },
  password: {
      type: String,
      required: true,
      select: false,
  },
  socketId: {
      type: String,
  },
})
// Instance method to generate JWT token
UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
  return token;
};

// Instance method to compare passwords
UserSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};

// Static method to hash password
UserSchema.statics.hashPassword = async function (password) {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

const User = mongoose.model("User", UserSchema);

export default User;
