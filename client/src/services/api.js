import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookies if using them
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('[API] Request:', { 
      url: config.url, 
      method: config.method, 
      headers: config.headers,
      hasToken: !!token
    });
    return config;
  },
  (error) => {
    console.error('[API] Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    console.log('[API] Response:', { 
      url: response.config.url,
      status: response.status,
      data: response.data 
    });
    return response.data;
  },
  (error) => {
    // Handle token expiration
    if (error.response?.status === 401) {
      console.error('[API] Authentication error:', error.response.data);
      localStorage.removeItem('token');
      window.location.href = '/login';
    } else {
      console.error('[API] Response error:', { 
        url: error.config?.url,
        status: error.response?.status,
        data: error.response?.data
      });
    }
    return Promise.reject(error);
  }
);

export default api;
