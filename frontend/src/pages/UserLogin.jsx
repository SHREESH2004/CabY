// UserLogin.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Correct import for react-router-dom v6
import axios from 'axios'; // Import axios
import useUserProfile from './userProfile'; // Import the custom hook for user profile

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);  // To show loading state
  const [error, setError] = useState('');         // To display error messages
  const navigate = useNavigate();  // Use navigate instead of history

  // Handle changes in input fields
  const handleChange = (e) => {
    const { id, value } = e.target;
    
    if (id === 'email') {
      setEmail(value);
    } else if (id === 'password') {
      setPassword(value);
    }

    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }

    try {
      setLoading(true); // Set loading to true when making the request

      // Send the data to the backend for login
      const loginResponse = await axios.post('http://localhost:3000/users/login', {
        email,
        password,
      });

      if (loginResponse.status === 200) {
        console.log('Login successful!');
        
        // Store the token in localStorage
        localStorage.setItem('token', loginResponse.data.token);  // Save the JWT token in localStorage

        // Now fetch the user profile
        const profileResponse = await axios.get('http://localhost:3000/users/profile', {
          headers: {
            Authorization: `Bearer ${loginResponse.data.token}`,  // Send JWT token in header
          },
        });

        // Store profile data in localStorage
        const userProfile = profileResponse.data;
        localStorage.setItem('userProfile', JSON.stringify(userProfile));

        // Navigate to user home after successful login
        navigate('/user-home');  // Redirect to user-home page
      }
    } catch (err) {
      setLoading(false); // Set loading to false after request finishes
      if (err.response) {
        setError(err.response.data.message || 'Error occurred during login. Please try again.');
      } else if (err.request) {
        setError('No response from server. Please try again later.');
      } else {
        setError('Error occurred during login. Please try again.');
      }
    } finally {
      setLoading(false); // Make sure to reset loading state after request
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup'); // Navigate to the signup page when "Create an Account" is clicked
  };

  return (
    <div style={styles.mainContainer}>
      {/* Cab Booking Branding */}
      <div style={styles.brandContainer}>
        <h1 style={styles.brandText}>CabX</h1>
      </div>

      <div style={styles.formContainer}>
        <div style={styles.formCard}>
          <h2 style={styles.formTitle}>User Login</h2>
          <form onSubmit={handleSubmit}>
            {error && <div style={styles.error}>{error}</div>} {/* Show error message */}
            <div style={styles.inputGroup}>
              <label htmlFor="email" style={styles.inputLabel}>Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleChange}
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
                onChange={handleChange}
                required
                placeholder="Enter your password"
                style={styles.inputField}
              />
            </div>
            <button
              type="submit"
              style={styles.loginButton}
              onMouseOver={(e) => e.target.style.backgroundColor = '#3cbb6d'}  // Hover effect
              onMouseOut={(e) => e.target.style.backgroundColor = '#009933'}  // Reset hover effect
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Logging In...' : 'Login'}
            </button>
          </form>
          <div style={styles.signupContainer}>
            <button 
              onClick={handleSignupRedirect} 
              style={styles.signupLink}
            >
              Create an Account
            </button>
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
    backgroundColor: '#f4f4f4', // Light background
    padding: '20px',
    boxSizing: 'border-box', // Ensures padding does not cause overflow
  },
  brandContainer: {
    position: 'absolute',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    textAlign: 'center',
  },
  brandText: {
    fontSize: '3.5rem',
    fontWeight: '800',
    color: '#009933',  // Cab-like green
    letterSpacing: '2px',
    marginBottom: '30px',
    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)', // Slight shadow to pop the text
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
    background: 'rgba(255, 255, 255, 0.95)',  // Slightly transparent white background
    borderRadius: '15px',
    padding: '40px',
    width: '100%',
    maxWidth: '450px',
    textAlign: 'center',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)',  // Light shadow for a modern look
  },
  formTitle: {
    fontSize: '2.2rem',
    fontWeight: '700',
    marginBottom: '25px',
    color: '#333',  // Dark text color
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
  },
  loginButton: {
    backgroundColor: '#009933',  // Cab-like green color
    color: '#fff',
    padding: '16px 0',
    width: '100%',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1.2rem',
    cursor: 'pointer',
  },
  signupContainer: {
    marginTop: '25px',
  },
  signupLink: {
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

export default UserLogin;
