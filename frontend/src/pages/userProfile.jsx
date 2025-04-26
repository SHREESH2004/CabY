// userProfile.jsx

import { useState, useEffect } from 'react';

// Custom hook to manage user profile
const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);

  // Function to load the user profile from localStorage
  const loadUserProfile = () => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setUserProfile(JSON.parse(storedProfile));
    }
  };

  // Function to clear user profile from localStorage
  const clearUserProfile = () => {
    localStorage.removeItem('userProfile');
    setUserProfile(null);
  };

  // Load the user profile when component mounts
  useEffect(() => {
    loadUserProfile();
  }, []);

  return {
    userProfile,
    clearUserProfile,
  };
};

export default useUserProfile;
