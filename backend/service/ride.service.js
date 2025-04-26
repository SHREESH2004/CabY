import Ride from "../models/ride.models.js";
import { getDistanceTime, AddressCoordinates } from '../service/map.service.js';
import crypto from 'crypto';
import User from '../models/user.model.js';  // Assuming the User model is used to find the captain by _id
import Captain from "../models/captain.model.js";
// Function to generate OTP
function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}

// Function to create a ride
export const createRide = async ({ user, pickup, destination, vehicleType }) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    try {
        // Get coordinates for pickup and destination
        const pickupCoordinates = await AddressCoordinates(pickup);
        const destinationCoordinates = await AddressCoordinates(destination);

        if (!pickupCoordinates || !destinationCoordinates) {
            throw new Error('Unable to fetch coordinates for pickup or destination');
        }

        // Log coordinates to verify they are correct
        console.log('Pickup Coordinates:', pickupCoordinates);
        console.log('Destination Coordinates:', destinationCoordinates);

        // Get distance and time between pickup and destination
        const { distanceMeters, durationSeconds } = await getDistanceTime(
            pickupCoordinates.lat,
            pickupCoordinates.lng,
            destinationCoordinates.lat,
            destinationCoordinates.lng
        );

        // Log distance and time to check what is returned
        console.log('Distance in meters:', distanceMeters);
        console.log('Duration in seconds:', durationSeconds);

        // Check if distance is a valid number
        if (isNaN(distanceMeters) || distanceMeters <= 0) {
            throw new Error('Invalid distance returned');
        }

        // Convert durationSeconds to a number (if it is a string)
        const durationInSeconds = parseInt(durationSeconds, 10);
        if (isNaN(durationInSeconds) || durationInSeconds <= 0) {
            throw new Error('Invalid duration returned');
        }

        // Declare fare components
        let baseFare = 0;
        let perKmRate = 0;
        let perMinuteRate = 0;

        // Calculate the fare based on vehicle type
        if (vehicleType === 'auto') {
            baseFare = 30;
            perKmRate = 10;
            perMinuteRate = 2;
        } else if (vehicleType === 'car') {
            baseFare = 50;
            perKmRate = 15;
            perMinuteRate = 3;
        } else if (vehicleType === 'moto') {
            baseFare = 20;
            perKmRate = 8;
            perMinuteRate = 1.5;
        } else {
            throw new Error('Invalid vehicle type');
        }

        // Calculate the fare
        const distanceInKm = distanceMeters / 1000; // Convert meters to kilometers
        const durationInMinutes = durationInSeconds / 60; // Convert seconds to minutes

        const fare = baseFare + (perKmRate * distanceInKm) + (perMinuteRate * durationInMinutes);

        // Ensure fare is a valid number
        if (isNaN(fare) || fare <= 0) {
            throw new Error('Fare calculation failed');
        }

        // Create the ride with OTP and calculated fare
        const ride = await Ride.create({
            user,
            pickup,
            destination,
            otp: getOtp(6),
            fare: Math.round(fare) // Round the fare to the nearest integer
        });

        return ride;
    } catch (error) {
        console.error('Error creating ride:', error);
        throw new Error('Error creating the ride');
    }
};

import mongoose from 'mongoose';

export const confirmRide = async ({ rideId, captainId }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    if (!captainId) {
        throw new Error('Captain _id is required');
    }

    // Check if rideId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(rideId)) {
        throw new Error('Invalid rideId format');
    }

    try {
        // Find the captain by _id
        const captain = await Captain.findById(captainId);
        if (!captain) {
            throw new Error('Captain not found');
        }

        // Log to verify if captain is correct
        console.log('Captain Found:', captain);

        // Find the ride by id and ensure it's valid
        const ride = await Ride.findById(rideId)
            .select('+otp');  // Ensure OTP is included

        // Log the ride to verify if it exists
        console.log('Ride Found:', ride);

        if (!ride) {
            throw new Error(`Ride with ID ${rideId} not found`);
        }

        // Update the ride status to 'accepted' and assign the captain
        await Ride.findByIdAndUpdate(rideId, {
            status: 'accepted',
            captain: captain._id
        });

        return ride;
    } catch (error) {
        console.error('Error confirming ride:', error);
        throw new Error('Error confirming the ride');
    }
};


// Function to start the ride
export const startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    const ride = await Ride.findById(rideId)
        .select('+otp'); // Include OTP in the ride document

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    // Update the ride status to 'ongoing'
    await Ride.findByIdAndUpdate(rideId, {
        status: 'ongoing'
    });

    return ride;
};

// Function to end the ride
export const endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await Ride.findById(rideId)
        .select('+otp'); // Include OTP in the ride document

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    // Update the ride status to 'completed'
    await Ride.findByIdAndUpdate(rideId, {
        status: 'completed'
    });
    return { message: "Ride completed", ride };
};

export default createRide;
