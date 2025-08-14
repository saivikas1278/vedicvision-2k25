import axios from 'axios';

// Set auth token for all requests
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Save token to localStorage
export const saveToken = (token) => {
  localStorage.setItem('token', token);
  setAuthToken(token);
};

// Remove token from localStorage
export const removeToken = () => {
  localStorage.removeItem('token');
  setAuthToken();
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  
  try {
    // Decode JWT token to check expiration
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    
    if (payload.exp < currentTime) {
      removeToken();
      return false;
    }
    
    return true;
  } catch (error) {
    removeToken();
    return false;
  }
};

// Get user data from token
export const getUserFromToken = () => {
  const token = getToken();
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.user || payload;
  } catch (error) {
    return null;
  }
};

// Initialize auth on app load
export const initializeAuth = () => {
  const token = getToken();
  if (token && isAuthenticated()) {
    setAuthToken(token);
    return true;
  } else {
    removeToken();
    return false;
  }
};
