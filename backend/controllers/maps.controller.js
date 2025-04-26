import { AddressCoordinates, getDistanceTime, getAutoCompleteSuggestions } from '../service/map.service.js';

// Controller function for getting coordinates from an address
export const getCoordinates = async (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.status(400).json({ error: 'Address query parameter is required' });
  }

  try {
    const coordinates = await AddressCoordinates(address);
    if (coordinates) {
      return res.status(200).json(coordinates);
    } else {
      return res.status(404).json({ error: 'Unable to fetch coordinates for the address' });
    }
  } catch (error) {
    console.error('Error in getCoordinates:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function for getting distance and time between two place names (origin and destination)
export const getRouteDetails = async (req, res) => {
  const { origin, destination } = req.body;

  // Ensure origin and destination are provided
  if (!origin || !destination) {
    return res.status(400).json({ error: 'Origin and destination place names are required' });
  }

  try {
    // Convert place names to coordinates
    const originCoordinates = await AddressCoordinates(origin);
    const destinationCoordinates = await AddressCoordinates(destination);

    // If coordinates are not found for either origin or destination, return an error
    if (!originCoordinates || !destinationCoordinates) {
      return res.status(404).json({ error: 'Unable to fetch coordinates for one or both addresses' });
    }

    // Get the route details using the coordinates
    const routeDetails = await getDistanceTime(
      originCoordinates.lat,
      originCoordinates.lng,
      destinationCoordinates.lat,
      destinationCoordinates.lng
    );

    // Return the route details, but only with place names in the response
    return res.status(200).json({
      origin: origin,
      destination: destination,
      distance: routeDetails.distanceMeters, // in meters
      duration: routeDetails.durationSeconds, // in seconds
    });

  } catch (error) {
    console.error('Error in getRouteDetails:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function for getting autocomplete suggestions for a location input
export const getSuggestions = async (req, res) => {
  const { input } = req.query;

  if (!input) {
    return res.status(400).json({ error: 'Input query parameter is required' });
  }

  try {
    const suggestions = await getAutoCompleteSuggestions(input);
    return res.status(200).json({ suggestions });
  } catch (error) {
    console.error('Error in getSuggestions:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
