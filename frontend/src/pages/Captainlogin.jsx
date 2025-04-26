import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // To handle loading state
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setLoading(true); // Start loading

      // Send login request to the backend
      const response = await axios.post('http://localhost:3000/captain/login', {
        email,
        password,
      });

      if (response.status === 200) {
        toast.success('Login successful!'); // Display success toast
        navigate('/captain-dashboard'); // Navigate to captain dashboard
      }
    } catch (err) {
      setLoading(false); // Stop loading
      if (err.response) {
        toast.error(err.response.data.message || 'Invalid email or password.'); // Display error toast
      } else if (err.request) {
        toast.error('No response from server. Please try again later.');
      } else {
        toast.error('Error occurred during login. Please try again.');
      }
    } finally {
      setLoading(false); // Ensure loading is stopped in any case
    }
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.formContainer}>
        <div style={styles.formCard}>
          <h2 style={styles.formTitle}>Captain Login</h2>
          <form onSubmit={handleLoginSubmit}>
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

            <button
              type="submit"
              style={loading ? {...styles.loginButton, ...styles.loginButtonDisabled} : styles.loginButton} // Change button style if loading
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div style={styles.signupContainer}>
            <button onClick={() => navigate('/captain-signup')} style={styles.signupLink}>Create an Account</button>
          </div>
        </div>
      </div>

      <Toaster /> {/* Add Toaster component to show toasts */}
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
    borderRadius: '25px',
    padding: '60px',
    width: '100%',
    maxWidth: '600px', // Increased max-width for a bigger form box
    textAlign: 'center',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)',
    height: 'auto', // Allow the form card to expand based on content
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  formTitle: {
    fontSize: '2.5rem', // Larger title font size
    fontWeight: '700',
    marginBottom: '30px',
    color: '#333',
  },
  inputGroup: {
    marginBottom: '30px', // Increased margin between input fields for more space
    textAlign: 'left',
  },
  inputLabel: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '12px',
    display: 'block',
  },
  inputField: {
    width: '100%',
    padding: '18px 24px', // Increased padding for better spacing inside input
    border: '1px solid #ddd',
    borderRadius: '12px',
    backgroundColor: '#fafafa',
    color: '#333',
    fontSize: '1.1rem',
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
  },
  loginButton: {
    backgroundColor: '#009933',
    color: '#fff',
    padding: '18px 0',
    width: '100%',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1.3rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  loginButtonDisabled: {
    backgroundColor: '#cccccc',
    cursor: 'not-allowed',
  },
  signupContainer: {
    marginTop: '30px', // Increased space for the signup section
  },
  signupLink: {
    color: '#009933',
    fontSize: '1.2rem',
    textDecoration: 'none',
    fontWeight: '700',
    display: 'block',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '15px',
    fontSize: '1.1rem',
  },
};

export default CaptainLogin;
