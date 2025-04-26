import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';  // Import Leaflet CSS
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Topbar Component with Dashboard Button
const Topbar = () => {
  return (
    <div style={styles.topbar}>
      <div style={styles.leftItems}>
        <div style={styles.profile}>Profile</div>
        <div style={styles.settings}>Settings</div>
      </div>
      <div style={styles.dashboardButton}>Dashboard</div>
      <div style={styles.notifications}>Notifications</div>
    </div>
  );
};

const CaptainHome = () => {
  const [captainLocation, setCaptainLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [inviteDetails, setInviteDetails] = useState(null); // For storing the user invite details
  const [locationMessage, setLocationMessage] = useState(''); // For the location message
  const navigate = useNavigate();

  // Function to get the captain's current location using Geolocation API
  const getCaptainLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCaptainLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationMessage('Captain\'s Location Found');
        toast.success('Captain\'s Location Found');
      }, (error) => {
        toast.error('Unable to fetch location');
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Function to get the user's current location using Geolocation API
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Handle the "Accept Invite" action
  const handleAccept = () => {
    toast.success('Ride Accepted!');
    // Navigate to a different route after accepting the ride
    navigate('/ride-accepted');
  };

  // Handle the "Reject Invite" action
  const handleReject = () => {
    toast.error('Ride Rejected.');
  };

  useEffect(() => {
    // Get the captain's and user's locations when the component mounts
    getCaptainLocation();
    getUserLocation();

    // Example: Simulate receiving a user invite with some dummy data
    setTimeout(() => {
      setInviteDetails({
        userName: "John Doe",
        pickupLocation: "5th Avenue, NY",
        timeNeeded: "12 mins",
      });
    }, 2000); // Simulate after 2 seconds the user request comes
  }, []);

  // Ensure map center dynamically updates based on captain's location
  const mapCenter = captainLocation ? captainLocation : { lat: 51.505, lng: -0.09 };
  const zoomLevel = captainLocation ? 15 : 13;

  return (
    <div style={styles.container}>
      <Topbar />

      {/* Message indicating the captain's location */}
      {locationMessage && <div style={styles.locationMessage}>{locationMessage}</div>}

      {/* Map Container */}
      <MapContainer 
        center={mapCenter} 
        zoom={zoomLevel} 
        style={styles.map} 
        zoomControl={false}
        whenCreated={(map) => map.flyTo(mapCenter, zoomLevel)} // Ensures map flys to the correct location
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {captainLocation && (
          <Marker position={captainLocation}>
            <Popup>You're here (Captain)</Popup>
          </Marker>
        )}
        {userLocation && (
          <Marker position={userLocation}>
            <Popup>User's location</Popup>
          </Marker>
        )}
        <ZoomControl position="topright" /> {/* Added zoom control */}
      </MapContainer>

      {/* Cab Invite Box */}
      {inviteDetails && (
        <div style={styles.inviteBox}>
          <h3 style={styles.inviteTitle}>Cab Invite from {inviteDetails.userName}</h3>
          <div style={styles.details}>
            <p style={styles.detailText}><strong>Pickup Location:</strong> {inviteDetails.pickupLocation}</p>
            <p style={styles.detailText}><strong>Time Needed:</strong> {inviteDetails.timeNeeded}</p>
          </div>
          <div style={styles.buttonContainer}>
            <button style={styles.acceptButton} onClick={handleAccept}>Accept</button>
            <button style={styles.rejectButton} onClick={handleReject}>Reject</button>
          </div>
        </div>
      )}

      {/* ToastContainer to display notifications */}
      <ToastContainer />
    </div>
  );
};

// Styles for the components
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  topbar: {
    backgroundColor: '#fff',
    padding: '20px 40px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    zIndex: 1000,
  },
  leftItems: {
    display: 'flex',
  },
  profile: {
    marginRight: '30px',
    cursor: 'pointer',
    padding: '8px 20px',
    backgroundColor: '#1c1c1c',
    color: '#fff',
    borderRadius: '8px',
    transition: 'background-color 0.3s ease',
  },
  settings: {
    marginRight: '30px',
    cursor: 'pointer',
    padding: '8px 20px',
    backgroundColor: '#1c1c1c',
    color: '#fff',
    borderRadius: '8px',
    transition: 'background-color 0.3s ease',
  },
  dashboardButton: {
    cursor: 'pointer',
    padding: '8px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    borderRadius: '8px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
  notifications: {
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '8px 20px',
    backgroundColor: '#1c1c1c',
    color: '#fff',
    borderRadius: '8px',
    transition: 'background-color 0.3s ease',
  },
  map: {
    height: '100%',
    width: '100%',
  },
  locationMessage: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inviteBox: {
    position: 'absolute',
    bottom: '30px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '40px',
    backgroundColor: '#ffffff',
    borderRadius: '15px',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    width: '90%',
    fontFamily: 'Arial, sans-serif',
    zIndex: '999',
    fontSize: '20px',
  },
  inviteTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '15px',
  },
  details: {
    marginBottom: '30px',
  },
  detailText: {
    fontSize: '18px',
    color: '#555',
    marginBottom: '12px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  acceptButton: {
    padding: '15px 40px',
    backgroundColor: '#1c1c1c',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'background-color 0.3s ease',
  },
  rejectButton: {
    padding: '15px 40px',
    backgroundColor: '#f44336',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'background-color 0.3s ease',
  },
};

export default CaptainHome;
