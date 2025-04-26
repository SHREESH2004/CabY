import Captain from "../models/captain.model.js";
import { createCaptain } from "../service/captain.service.js";  // Assuming you have a service layer
import BlacklistToken from "../models/blacklist.model.js";  // Assuming blacklist model exists
import { validationResult } from "express-validator";

// Controller for registering a captain
export const registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    try {
        // Check if captain already exists
        const existingCaptain = await Captain.findOne({ email });
        if (existingCaptain) {
            return res.status(400).json({ message: 'Captain already exists' });
        }

        // Hash password
        const hashedPassword = await Captain.hashPassword(password);

        // Create a new captain record
        const captain = await createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });

        // Generate auth token
        const token = captain.generateAuthToken();

        // Send response with token and captain data
        res.status(201).json({ token, captain });
    } catch (error) {
        next(error);  // Pass errors to error handler
    }
};

// Controller for logging in a captain
export const loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Find captain by email and select password field
        const captain = await Captain.findOne({ email }).select('+password');
        if (!captain) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare passwords
        const isMatch = await captain.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate auth token
        const token = captain.generateAuthToken();

        // Set the token in the cookies
        res.cookie('token', token, { httpOnly: true });

        // Send response with token and captain data
        res.status(200).json({ token, captain });
    } catch (error) {
        next(error);  // Pass errors to error handler
    }
};

// Controller to fetch captain profile
export const getCaptainProfile = async (req, res, next) => {
    try {
        // Respond with the logged-in captain's profile data
        res.status(200).json({ captain: req.captain });
    } catch (error) {
        next(error);  // Pass errors to error handler
    }
};

// Controller for logging out a captain
export const logoutCaptain = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        // Blacklist the token
        await BlacklistToken.create({ token });

        // Clear the cookie
        res.clearCookie('token');

        // Send response
        res.status(200).json({ message: 'Logout successfully' });
    } catch (error) {
        next(error);  // Pass errors to error handler
    }
};
