import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 3000;
const GOOGLE_MAPS_API_KEY = 'AIzaSyAmcIoP55pJFvDlGsG_thtjtjmLrDOdcyg'; 

app.use(cors());
app.use(express.json());

const AddressCoordinates = async (address) => {
    const apiKey = GOOGLE_MAPS_API_KEY;
    
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
        return null;
    }
};

app.post('/api/nearby-hospitals', async (req, res) => {
    try {
        const { place, radius = 1500 } = req.body;
        
        if (!place) {
            return res.status(400).json({ error: 'Place name is required' });
        }
        
        const location = await AddressCoordinates(place);
        
        if (!location) {
            return res.status(400).json({ error: 'Invalid place name or no coordinates found' });
        }
        
        const googleMapsUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=${radius}&type=hospital&key=${GOOGLE_MAPS_API_KEY}`;
        
        const response = await axios.get(googleMapsUrl);
        
        const hospitals = response.data.results.map(hospital => ({
            name: hospital.name,
            address: hospital.vicinity,
            rating: hospital.rating || 'No rating available',
            location: hospital.geometry.location
        }));
        
        res.json({
            status: response.data.status,
            total_results: hospitals.length,
            hospitals
        });
    } catch (error) {
        console.error('Error fetching nearby hospitals:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
