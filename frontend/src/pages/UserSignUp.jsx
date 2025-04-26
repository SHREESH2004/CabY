import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Correct import for react-router-dom v6
import axios from 'axios'; // Import axios

const UserSignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);  // To show loading state
  const [error, setError] = useState('');         // To display error messages
  
  const navigate = useNavigate();

  // Handle changes in input fields
  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === 'firstName') {
      setFirstName(value);
    } else if (id === 'lastName') {
      setLastName(value);
    } else if (id === 'email') {
      setEmail(value);
    } else if (id === 'password') {
      setPassword(value);
    }

    // Clear error when the user starts typing
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Check if all fields are filled
    if (!firstName || !lastName || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Basic email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Password length check
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    try {
      setLoading(true); // Set loading to true when making the request

      // Send the data to the backend for registration
      const response = await axios.post('http://localhost:3000/users/register', {
        fullname: { firstname: firstName, lastname: lastName }, // Adjusted payload
        email,
        password,
      });

      if (response.status === 201) {
        console.log('Sign up successful!');
        navigate('/login'); // Redirect to login page after successful signup
      }
    } catch (err) {
      setLoading(false); // Set loading to false after request finishes
      // Check for specific error response from the backend
      if (err.response) {
        setError(err.response.data.message || 'Error occurred during signup. Please try again.');
      } else if (err.request) {
        setError('No response from server. Please try again later.');
      } else {
        setError('Error occurred during signup. Please try again.');
      }
    } finally {
      setLoading(false); // Make sure to reset loading state after request
    }
  };

  return (
    <div style={styles.mainContainer}>
      {/* Cab Booking Branding */}
      <div style={styles.brandContainer}>
        <h1 style={styles.brandText}>CabX</h1>
      </div>

      <div style={styles.formContainer}>
        <div style={styles.formCard}>
          <h2 style={styles.formTitle}>Create Account</h2>
          <form onSubmit={handleSubmit}>
            {error && <div style={styles.error}>{error}</div>} {/* Show error message */}
            <div style={styles.inputGroup}>
              <label htmlFor="firstName" style={styles.inputLabel}>First Name:</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={handleChange}
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
                onChange={handleChange}
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
              style={styles.signupButton}
              onMouseOver={(e) => e.target.style.backgroundColor = '#3cbb6d'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#009933'}
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
          <div style={styles.loginContainer}>
            <button 
              onClick={() => navigate('/login')} 
              style={styles.loginLink}
            >
              Go to Login
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
    backgroundColor: '#f4f4f4',
    padding: '20px',
    boxSizing: 'border-box',
  },
  brandContainer: {
    position: 'absolute',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    animation: 'bounceIn 1.5s ease-out',
    textAlign: 'center',
  },
  brandText: {
    fontSize: '3.5rem',
    fontWeight: '800',
    color: '#009933',
    letterSpacing: '2px',
    marginBottom: '30px',
    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)',
    animation: 'fadeIn 1.2s ease-out',
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
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '15px',
    padding: '40px',
    width: '100%',
    maxWidth: '450px',
    textAlign: 'center',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)',
    animation: 'slideUp 1s ease-out',
    boxSizing: 'border-box',
  },
  formTitle: {
    fontSize: '2.2rem',
    fontWeight: '700',
    marginBottom: '25px',
    color: '#333',
    animation: 'fadeIn 1s ease-out',
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
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box',
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
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box',
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
    transition: 'color 0.3s ease',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
};

export default UserSignUp;
