import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// QR Code Image Placeholder (you can replace this with a real dynamic QR code generator) // Put your QR code image path here

const rideData = [
  {
    id: 1,
    carType: 'UberX',
    price: '$15',
    eta: '5 mins',
    driverName: 'John Doe',
    driverRating: 4.7,
    carImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Uber_logo_2018.png/800px-Uber_logo_2018.png',
  },
  {
    id: 2,
    carType: 'UberXL',
    price: '$25',
    eta: '7 mins',
    driverName: 'Jane Smith',
    driverRating: 4.9,
    carImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Uber_logo_2018.png/800px-Uber_logo_2018.png',
  },
  {
    id: 3,
    carType: 'Uber Black',
    price: '$40',
    eta: '10 mins',
    driverName: 'Carlos Martin',
    driverRating: 4.8,
    carImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Uber_logo_2018.png/800px-Uber_logo_2018.png',
  },
];

const RideSearchPanel = () => {
  const [rides, setRides] = useState(rideData);
  const [selectedRide, setSelectedRide] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleSelectRide = (ride) => {
    setSelectedRide(ride);
    toast.info(`You selected ${ride.carType}`);
  };

  const handleGoToPayment = () => {
    if (!selectedRide) {
      toast.error('Please select a ride first!');
    } else {
      setShowPaymentModal(true);
    }
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
  };

  return (
    <div
      style={{
        backgroundColor: '#f5f5f5',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: '#fff',
          padding: '15px 30px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid #ccc',
        }}
      >
        {/* Profile Section */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
          }}
        >
          {/* Profile Image */}
          <div
            style={{
              backgroundColor: '#444',
              borderRadius: '50%',
              width: '45px',
              height: '45px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
              fontSize: '20px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            }}
            onClick={() => toast.info('Profile clicked')}
          >
            JD
          </div>
          <div
            style={{
              color: '#333',
              fontSize: '18px',
              fontWeight: 'bold',
            }}
          >
            John Doe
          </div>
        </div>

        {/* Icons for Settings and Notifications */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <button
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              color: '#444',
              cursor: 'pointer',
              transition: 'color 0.3s',
            }}
            onClick={() => toast.info('Settings clicked')}
          >
            ⚙️
          </button>
          <button
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              color: '#444',
              cursor: 'pointer',
              transition: 'color 0.3s',
            }}
            onClick={() => toast.info('Notifications clicked')}
          >
            🔔
          </button>
        </div>
      </div>

      {/* Ride Search Section */}
      <div
        style={{
          marginTop: '90px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          alignItems: 'center',
        }}
      >
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#333',
          }}
        >
          Nearby Rides
        </h2>

        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            maxWidth: '600px',
          }}
        >
          {rides.map((ride) => (
            <div
              key={ride.id}
              onClick={() => handleSelectRide(ride)}
              style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                border: '2px solid #000',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                }}
              >
                {/* Car Image */}
                <img
                  src={ride.carImage}
                  alt={`${ride.carType} image`}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
                {/* Ride Details */}
                <div>
                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      margin: 0,
                    }}
                  >
                    {ride.carType}
                  </h3>
                  <p
                    style={{
                      fontSize: '14px',
                      color: '#888',
                      margin: '5px 0',
                    }}
                  >
                    {ride.driverName} | {ride.driverRating} ⭐
                  </p>
                  <p
                    style={{
                      fontSize: '14px',
                      color: '#888',
                      margin: '5px 0',
                    }}
                  >
                    ETA: {ride.eta}
                  </p>
                </div>
              </div>

              {/* Ride Price */}
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#333',
                }}
              >
                {ride.price}
              </div>
            </div>
          ))}
        </div>

        {/* Select Ride Button */}
        {selectedRide && (
          <button
            onClick={handleGoToPayment}
            style={{
              marginTop: '20px',
              padding: '12px 20px',
              backgroundColor: '#0a74da',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#005b99'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#0a74da'}
          >
            Go to Payment
          </button>
        )}
      </div>

      {/* Payment Modal with QR Code */}
      {showPaymentModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1001,
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '30px',
              borderRadius: '12px',
              textAlign: 'center',
              maxWidth: '400px',
              width: '100%',
            }}
          >
            <h2 style={{ fontSize: '22px', fontWeight: 'bold' }}>
              Scan to Pay
            </h2>
            <img
              src={QRCodeImage}
              alt="QR Code"
              style={{
                width: '200px',
                height: '200px',
                objectFit: 'contain',
                margin: '20px 0',
              }}
            />
            <button
              onClick={closePaymentModal}
              style={{
                padding: '10px 20px',
                backgroundColor: '#e74c3c',
                color: '#fff',
                fontSize: '16px',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#c0392b'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#e74c3c'}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default RideSearchPanel;
