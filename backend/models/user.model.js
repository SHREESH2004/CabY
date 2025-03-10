import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";  
import dotenv from "dotenv";

dotenv.config();
const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true, 
    trim: true, 
    minlength: [3, 'Firstname must be at least 3 characters']
  },
  lastname: {
    type: String,
    trim: true, 
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    lowercase: true, 
    match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Please fill a valid email address'], 
  },
  password: {
    type: String,
    required: true,
  }, 
  socketid: {
    type: String,
    default: null, 
  },
});

UserSchema.methods.generateAuthtoken = function() {
  const payload = { userId: this._id, email: this.email };  
  const secretKey = process.env.JWT_SECRET ; 
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });  
  return token;
};

UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = mongoose.model("User", UserSchema);

export default User;
