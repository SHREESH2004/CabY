import express from "express";
import { body } from "express-validator";
import { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain } from "../controllers/captain.controller.js";  // Import controllers
import Captain from "../models/captain.model.js";  // Import the Captain model

const router = express.Router();

// Route for registering a captain
router.post('/register', [
    body('email')
        .isEmail()
        .withMessage('Invalid Email')
        .custom(async (value) => {
            const captain = await Captain.findOne({ email: value });
            if (captain) {
                throw new Error('Captain already exists');
            }
            return true;
        }),

    body('fullname.firstname')
        .isLength({ min: 3 })
        .withMessage('First name must be at least 3 characters long'),

    body('fullname.lastname')
        .isLength({ min: 3 })
        .withMessage('Last name must be at least 3 characters long'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),

    body('vehicle.color')
        .isLength({ min: 3 })
        .withMessage('Color must be at least 3 characters long'),

    body('vehicle.plate')
        .isLength({ min: 3 })
        .withMessage('Plate must be at least 3 characters long'),

    body('vehicle.capacity')
        .isInt({ min: 1 })
        .withMessage('Capacity must be at least 1'),

    body('vehicle.vehicleType')
        .isIn(['car', 'motorcycle', 'auto'])
        .withMessage('Invalid vehicle type')
], registerCaptain); // Register the controller function

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], loginCaptain); // Login controller

// Route for getting captain profile
router.get('/profile', getCaptainProfile); // Get profile controller

// Route for logging out a captain
router.post('/logout', logoutCaptain); // Logout controller

export default router;
