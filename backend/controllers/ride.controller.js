import { createRide, startRide, endRide, confirmRide } from '../service/ride.service.js'; // Import the ride service functions
import { validationResult } from 'express-validator';

// Controller to create a new ride
export const createRideC = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;

    try {
        // Use the logged-in user's ID (req.user._id) to create the ride
        const ride = await createRide({ user: req.user._id, pickup, destination, vehicleType });
        res.status(201).json(ride);
    } catch (error) {
        console.error('Error creating ride:', error);
        res.status(500).json({ message: 'An error occurred while creating the ride' });
    }
};

export const confirmRideC = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, captainId } = req.body; // Expecting the captain's _id to be passed

    try {
        console.log('Confirming ride with rideId:', rideId, 'and captainId:', captainId); // Add this line to log the inputs

        // Pass the captainId along with rideId to confirm the ride
        const ride = await confirmRide({ rideId, captainId });
        res.status(200).json(ride);
    } catch (err) {
        console.error('Error confirming ride:', err);
        res.status(500).json({ message: err.message });
    }
};


// Controller to start the ride
export const startRideC = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.body;

    try {
        // Pass the rideId and otp to start the ride
        const ride = await startRide({ rideId, otp, captain: req.user },"Ride Started");
        res.status(200).json(ride);
    } catch (err) {
        console.error('Error starting ride:', err);
        res.status(500).json({ message: err.message });
    }
};

// Controller to end the ride
export const endRideC = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        // Pass the rideId to end the ride
        const ride = await endRide({ rideId, captain: req.user });
        res.status(200).json(ride);
    } catch (err) {
        console.error('Error ending ride:', err);
        res.status(500).json({ message: err.message });
    }
};
