import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Correct import
import home from '../pics/home.jpg';
import home2 from '../pics/home2.jpg';
import home3 from '../pics/home3.jpg';
import CaptainLogin from './Captainlogin.jsx';  // Import the CaptainLogin component
import UserLogin from './UserLogin.jsx';  // Import the UserLogin component

const Home = () => {
  const navigate = useNavigate();

  const [backgroundImage, setBackgroundImage] = useState(home);
  const [showPopup, setShowPopup] = useState(false); // State for controlling the popup

  const handleContinueClick = () => {
    setShowPopup(true); // Show the popup when "Continue" is clicked
    setBackgroundImage(home2); // Change the background image
  };

  const handleCaptainClick = () => {
    navigate('/captain-login'); // Navigate to Captain login
  };

  const handleUserClick = () => {
    navigate('/login'); // Navigate to User login
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setBackgroundImage(home2);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const containerStyle = {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    animation: 'fadeIn 1.5s ease-in-out',
    padding: '20px',
  };

  const headerStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#fff',
    marginTop: '0px',
    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)',
    animation: 'fadeInHeader 1.5s ease-in-out',
    fontFamily: 'Times New Roman, serif',
    textAlign: 'center',
    marginBottom: '20px',
  };

  const textContainerStyle = {
    textAlign: 'center',
    padding: '20px 30px',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: '12px',
    width: '80%',
    maxWidth: '350px',
    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
    marginTop: 'auto',
    marginBottom: '30px',
    animation: 'fadeInText 2s ease-in-out',
  };

  const buttonStyle = {
    backgroundColor: '#1c1c1c',
    color: 'white',
    fontWeight: 'bold',
    padding: '14px 40px',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    transition: 'background-color 0.3s ease',
    letterSpacing: '1px',
    width: '100%',
  };

  const buttonHoverStyle = {
    backgroundColor: '#333',
  };

  const popupStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
    textAlign: 'center',
  };

  const popupButtonStyle = {
    backgroundColor: '#1c1c1c',
    color: 'white',
    fontWeight: 'bold',
    padding: '12px 40px',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
    letterSpacing: '1px',
    margin: '10px',
  };

  const popupButtonHoverStyle = {
    backgroundColor: '#333',
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>CabY</h1>
      <div style={textContainerStyle}>
        <h2
          style={{
            fontSize: '1.2rem',
            fontWeight: '600',
            color: '#333',
            marginBottom: '20px',
          }}
        >
          Faster rides, better life
        </h2>
        <button
          onClick={handleContinueClick}
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
        >
          Continue
        </button>
      </div>

      {/* Popup modal for Captain/User selection */}
      {showPopup && (
        <>
          <div style={overlayStyle} />
          <div style={popupStyle}>
            <h3>Select your role</h3>
            <button
              onClick={handleCaptainClick}
              style={popupButtonStyle}
              onMouseOver={(e) => (e.target.style.backgroundColor = popupButtonHoverStyle.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = popupButtonStyle.backgroundColor)}
            >
              Captain
            </button>
            <button
              onClick={handleUserClick}
              style={popupButtonStyle}
              onMouseOver={(e) => (e.target.style.backgroundColor = popupButtonHoverStyle.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = popupButtonStyle.backgroundColor)}
            >
              User
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
