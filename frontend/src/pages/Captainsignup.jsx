import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainSignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('car');
  const [loading, setLoading] = useState(false); // To handle loading state
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!firstName || !lastName || !email || !password || !vehicleColor || !vehiclePlate || !vehicleCapacity) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      setLoading(true); // Start loading

      // Send data to the backend
      const response = await axios.post('http://localhost:3000/captain/register', {
        fullname: { firstname: firstName, lastname: lastName },
        email,
        password,
        vehicle: {
          color: vehicleColor,
          plate: vehiclePlate,
          capacity: vehicleCapacity,
          vehicleType,
        },
      });

      if (response.status === 201) {
        console.log('Captain SignUp successful!');
        navigate('/captain-login'); // Navigate to login page after successful signup
      }
    } catch (err) {
      setLoading(false); // Stop loading
      if (err.response) {
        setError(err.response.data.message || 'Error occurred during signup. Please try again.');
      } else if (err.request) {
        setError('No response from server. Please try again later.');
      } else {
        setError('Error occurred during signup. Please try again.');
      }
    } finally {
      setLoading(false); // Ensure loading is stopped in any case
    }
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.formContainer}>
        <div style={styles.formCard}>
          <h2 style={styles.formTitle}>Create Captain Account</h2>
          <form onSubmit={handleSignUpSubmit}>
            {error && <div style={styles.error}>{error}</div>} {/* Display error message */}

            <div style={styles.inputGroup}>
              <label htmlFor="firstName" style={styles.inputLabel}>First Name:</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder="Enter your first name"
                style={styles.inputField}
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="lastName" style={styles.inputLabel}>Last Name:</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder="Enter your last name"
                style={styles.inputField}
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="email" style={styles.inputLabel}>Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                style={styles.inputField}
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="password" style={styles.inputLabel}>Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                style={styles.inputField}
              />
            </div>

            {/* Vehicle Details */}
            <div style={styles.inputGroup}>
              <label htmlFor="vehicleColor" style={styles.inputLabel}>Vehicle Color:</label>
              <input
                type="text"
                id="vehicleColor"
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
                required
                placeholder="Enter your vehicle color"
                style={styles.inputField}
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="vehiclePlate" style={styles.inputLabel}>Vehicle Plate:</label>
              <input
                type="text"
                id="vehiclePlate"
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
                required
                placeholder="Enter your vehicle plate"
                style={styles.inputField}
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="vehicleCapacity" style={styles.inputLabel}>Vehicle Capacity:</label>
              <input
                type="number"
                id="vehicleCapacity"
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
                required
                placeholder="Enter your vehicle capacity"
                style={styles.inputField}
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="vehicleType" style={styles.inputLabel}>Vehicle Type:</label>
              <select
                id="vehicleType"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                style={styles.inputField}
              >
                <option value="car">Car</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="auto">Auto</option>
              </select>
            </div>

            <button
              type="submit"
              style={styles.signupButton}
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          <div style={styles.loginContainer}>
            <button onClick={() => navigate('/captain-login')} style={styles.loginLink}>Go to Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
    padding: '20px',
    boxSizing: 'border-box',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: '20px',
    boxSizing: 'border-box',
  },
  formCard: {
    background: '#fff',
    borderRadius: '15px',
    padding: '40px',
    width: '100%',
    maxWidth: '450px',
    textAlign: 'center',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)',
  },
  formTitle: {
    fontSize: '2.2rem',
    fontWeight: '700',
    marginBottom: '25px',
    color: '#333',
  },
  inputGroup: {
    marginBottom: '20px',
    textAlign: 'left',
  },
  inputLabel: {
    fontSize: '1.1rem',
    color: '#666',
    marginBottom: '10px',
    display: 'block',
  },
  inputField: {
    width: '100%',
    padding: '16px 22px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: '#fff',
    color: '#333',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
  },
  signupButton: {
    backgroundColor: '#009933',
    color: '#fff',
    padding: '16px 0',
    width: '100%',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1.2rem',
    cursor: 'pointer',
  },
  loginContainer: {
    marginTop: '25px',
  },
  loginLink: {
    color: '#009933',
    fontSize: '1.1rem',
    textDecoration: 'none',
    fontWeight: '700',
    display: 'block',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
};

export default CaptainSignUp;
