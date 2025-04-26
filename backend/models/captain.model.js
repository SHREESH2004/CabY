import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";  // Make sure to import bcrypt for password hashing and comparison

const CaptainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure unique email
    lowercase: true, // Convert email to lowercase
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address'], // Email validation regex
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive', // Default status is inactive
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, 'Color must be at least 3 characters long'], // Color validation
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, 'Plate must be at least 3 characters long'], // Plate validation
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, 'Capacity must be at least 1'], // Vehicle capacity validation
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ['car', 'motorcycle', 'auto'], // Valid vehicle types
    }
  },
  location: {
    ltd: {
      type: Number,
      min: [-90, 'Latitude must be between -90 and 90'],
      max: [90, 'Latitude must be between -90 and 90'],
    },
    lng: {
      type: Number,
      min: [-180, 'Longitude must be between -180 and 180'],
      max: [180, 'Longitude must be between -180 and 180'],
    }
  }
}, {
  timestamps: true, 
});

CaptainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
  return token;
};

CaptainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

CaptainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const Captain = mongoose.model('Captain', CaptainSchema);
export default Captain;
