import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserHome = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [fromCoordinates, setFromCoordinates] = useState(null);
  const [toCoordinates, setToCoordinates] = useState(null);
  const [userName, setUserName] = useState("John Doe");
  const [initials, setInitials] = useState("JD");
  const [vehicleType, setVehicleType] = useState("car");
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchPanelVisible, setSearchPanelVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
        reverseGeocode(latitude, longitude);
        toast.success('Location found!');
      });
    } else {
      toast.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const reverseGeocode = async (lat, lng) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    const data = await response.json();
    setFromAddress(data.display_name);
  };

  const geocodeAddress = async (address, type) => {
    if (!address) return;

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${address}&format=json&addressdetails=1`
    );
    const data = await response.json();
    setSearchResults(data);

    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      if (type === 'from') {
        setFromCoordinates({ lat: parseFloat(lat), lng: parseFloat(lon) });
        setFromAddress(data[0].display_name);
        toast.success(`From: ${address}`);
      } else {
        setToCoordinates({ lat: parseFloat(lat), lng: parseFloat(lon) });
        setToAddress(data[0].display_name);
        toast.success(`To: ${address}`);
      }
    } else {
      toast.error(`No results found for ${address}`);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    geocodeAddress(query, 'to');  // Search for destination when user types
  };

  const handleFindCabs = async () => {
    toast.info("Finding nearby cabs...");

    try {
      const response = await axios.post('http://localhost:3000/rides/ride', {
        user: "1234567890",  
        pickup: "Amravati",  
        destination: "Delhi",  
        vehicleType: "Taxi",  
      });

      if (response.data) {
        toast.success('Ride request sent successfully!');
        navigate('/ride-search');  
      }
    } catch (error) {
      toast.error('Error finding nearby cabs.');
    }
  };

  const handleMapClick = async (event) => {
    const { lat, lng } = event.latlng;

    setToCoordinates({ lat, lng });

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    const data = await response.json();
    setToAddress(data.display_name);

    toast.success(`Destination set to: ${data.display_name}`);
  };

  const MapCenter = ({ coordinates }) => {
    const map = useMap();

    useEffect(() => {
      if (coordinates) {
        map.setView([coordinates.lat, coordinates.lng], 13);
      }
    }, [coordinates, map]);

    return null;
  };

  return (
    <div style={{ height: '100vh', backgroundColor: '#1c1c1c', margin: 0 }}>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          backgroundColor: '#1a1a1a',
          padding: '10px 30px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.7)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            color: '#fff',
            fontSize: '24px',
            fontWeight: 'bold',
            letterSpacing: '1px',
            cursor: 'pointer',
            padding: '10px 20px',
            borderRadius: '12px',
            backgroundColor: '#444',
            textAlign: 'center',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
            userSelect: 'none',
          }}
          onClick={() => toast.info('CabY logo clicked')}
        >
          CabY
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div
            style={{
              backgroundColor: '#444',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
            onClick={() => toast.info('Profile clicked')}
          >
            {initials}
          </div>

          <button
            style={{
              backgroundColor: '#444',
              border: 'none',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              padding: '8px 20px',
              borderRadius: '10px',
              transition: '0.3s',
            }}
            onClick={() => toast.info('User clicked')}
          >
            {userName}
          </button>

          <button
            style={{
              backgroundColor: '#444',
              border: 'none',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              padding: '8px 20px',
              borderRadius: '10px',
              transition: '0.3s',
            }}
            onClick={() => toast.info('Settings clicked')}
          >
            Settings
          </button>

          <button
            style={{
              backgroundColor: '#444',
              border: 'none',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              padding: '8px 20px',
              borderRadius: '10px',
              transition: '0.3s',
            }}
            onClick={() => toast.info('Logged out')}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Map Container */}
      <MapContainer
        center={currentLocation || [37.7749, -122.4194]}
        zoom={13}
        style={{
          width: '100%',
          height: '100%',
        }}
        whenCreated={(map) => {
          if (currentLocation) {
            map.setView([currentLocation.lat, currentLocation.lng], 13);
          }
          map.on('click', handleMapClick);
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {currentLocation && (
          <Marker position={currentLocation}>
            <Popup>Your Current Location</Popup>
          </Marker>
        )}

        {fromCoordinates && (
          <Marker position={fromCoordinates}>
            <Popup>Pickup: {fromAddress}</Popup>
          </Marker>
        )}

        {toCoordinates && (
          <Marker position={toCoordinates}>
            <Popup>Destination: {toAddress}</Popup>
          </Marker>
        )}

        {fromCoordinates && toCoordinates && (
          <Polyline
            positions={[fromCoordinates, toCoordinates]}
            color="black"
            weight={4}
            opacity={0.7}
          />
        )}

        <MapCenter coordinates={currentLocation || fromCoordinates || toCoordinates} />
      </MapContainer>

      {/* Search and Find Cabs Box */}
      <div
        style={{
          position: 'absolute',
          bottom: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#333',
          padding: '10px 20px',
          borderRadius: '10px',
          width: '90%',
          maxWidth: '500px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
          zIndex: 1001,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
            color: '#fff',
          }}
        >
          <div style={{ fontWeight: 'bold' }}>From: {fromAddress || 'Set Pickup'}</div>
          <div style={{ fontWeight: 'bold' }}>To: {toAddress || 'Set Destination'}</div>
        </div>

        {/* Destination Input with Suggestions */}
        <input
          type="text"
          placeholder="Enter destination"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            width: '100%',
            padding: '8px',
            marginBottom: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
        <div
          style={{
            maxHeight: '150px',
            overflowY: 'auto',
            backgroundColor: '#fff',
            color: '#333',
            borderRadius: '5px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
          }}
        >
          {searchResults.map((result, index) => (
            <div
              key={index}
              onClick={() => {
                setToAddress(result.display_name);
                setToCoordinates({
                  lat: parseFloat(result.lat),
                  lng: parseFloat(result.lon),
                });
                setSearchQuery('');
                toast.success(`Destination set to: ${result.display_name}`);
              }}
              style={{
                padding: '10px',
                cursor: 'pointer',
                borderBottom: '1px solid #ddd',
              }}
            >
              {result.display_name}
            </div>
          ))}
        </div>

        <button
          style={{
            backgroundColor: '#f39c12',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: 'bold',
            width: '100%',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
          }}
          onClick={handleFindCabs}
        >
          Find Cabs
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default UserHome;
