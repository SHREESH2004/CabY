import express from 'express';
import { createRideC, confirmRideC, startRideC, endRideC } from '../controllers/ride.controller.js';
import { body } from 'express-validator'; // You can add additional validations here
import { authUser } from '../middleware/auth.middleware.js'; // Assuming authUser middleware is defined

const router = express.Router();

// Route to create a new ride
router.post('/create', authUser, [
  // Optional validation
  body('pickup').notEmpty().withMessage('Pickup location is required'),
  body('destination').notEmpty().withMessage('Destination location is required'),
  body('vehicleType').notEmpty().withMessage('Vehicle type is required')
], createRideC);

// Route to confirm the ride
router.post('/confirm', authUser, [
  body('rideId').notEmpty().withMessage('Ride ID is required'),
  body('captainId').notEmpty().withMessage('Captain ID is required')
], confirmRideC);

// Route to start the ride
router.post('/start', authUser, [
  body('rideId').notEmpty().withMessage('Ride ID is required'),
  body('otp').notEmpty().withMessage('OTP is required')
], startRideC);

// Route to end the ride
router.post('/end', authUser, [
  body('rideId').notEmpty().withMessage('Ride ID is required')
], endRideC);

export default router;
