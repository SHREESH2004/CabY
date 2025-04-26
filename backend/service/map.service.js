import axios from "axios";

// Geocode address to get coordinates (latitude, longitude)
export const AddressCoordinates = async (address) => {
    const apiKey = process.env.GOOGLE_MAP_API;  // Ensure API key is set in environment variables

    if (!apiKey) {
        console.error("API key is missing for Geocoding");
        throw new Error("API key is missing for Geocoding");
    }

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.status === 'OK' && data.results.length > 0) {
            const location = data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng
            };
        } else {
            console.error(`Geocoding failed: ${data.status}`);
            throw new Error(`Geocoding failed: ${data.status}`);
        }
    } catch (error) {
        console.error("Error fetching coordinates:", error);
        return null;  // Return null if there’s an error
    }
};

export const getDistanceTime = async (originLat, originLng, destinationLat, destinationLng) => {
    const apiKey = process.env.GOOGLE_MAP_API;

    if (!apiKey) {
        console.error("Google Maps API key is missing");
        throw new Error('Google Maps API key is missing');
    }

    const url = `https://routes.googleapis.com/directions/v2:computeRoutes?key=${apiKey}`;

    const requestBody = {
        origin: {
            location: {
                latLng: {
                    latitude: originLat,
                    longitude: originLng,
                },
            },
        },
        destination: {
            location: {
                latLng: {
                    latitude: destinationLat,
                    longitude: destinationLng,
                },
            },
        },
        travelMode: 'DRIVE', // You can change this to other modes like WALKING, BICYCLING, TRANSIT
        computeAlternativeRoutes: false,
        routeModifiers: {
            avoidTolls: false,
            avoidHighways: false,
            avoidFerries: false,
        },
        units: 'METRIC', // or IMPERIAL
    };

    // Setting the FieldMask header
    const headers = {
        'Content-Type': 'application/json',
        'X-Goog-FieldMask': 'routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline', // Specify the fields you need in the response
    };

    try {
        const response = await axios.post(url, requestBody, { headers });

        if (response.data.routes && response.data.routes.length > 0) {
            const route = response.data.routes[0];

            const distanceMeters = route.distanceMeters;
            const durationSeconds = route.duration;

            return {
                distanceMeters,
                durationSeconds,
            };
        } else {
            console.error('No routes found');
            throw new Error('No routes found');
        }
    } catch (error) {
        console.error('Routes API error:', error.response ? error.response.data : error.message);
        throw error;
    }
};
export const getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions.map(prediction => prediction.description).filter(value => value);
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}