import api from './api';

// Google OAuth configuration
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'your-google-client-id';
const GOOGLE_REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI || 'http://localhost:3000/auth/google/callback';

// Initialize Google OAuth
export const initializeGoogleAuth = () => {
  return new Promise((resolve, reject) => {
    // Load Google OAuth script
    if (window.google) {
      resolve(window.google);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google) {
        resolve(window.google);
      } else {
        reject(new Error('Google OAuth failed to load'));
      }
    };
    script.onerror = () => {
      reject(new Error('Failed to load Google OAuth script'));
    };
    document.head.appendChild(script);
  });
};

// Google Sign-In with One Tap
export const googleSignIn = async () => {
  try {
    const google = await initializeGoogleAuth();
    
    return new Promise((resolve, reject) => {
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (response) => {
          try {
            // Send the ID token to our backend
            const result = await api.post('/auth/google', {
              accessToken: response.credential
            });
            
            // Store the token
            if (result.token) {
              localStorage.setItem('token', result.token);
            }
            
            resolve(result);
          } catch (error) {
            reject(error);
          }
        },
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          reject(new Error('Google Sign-In prompt was not displayed'));
        }
      });
    });
  } catch (error) {
    throw error;
  }
};

// Google Sign-In with button
export const googleSignInWithButton = async () => {
  try {
    const google = await initializeGoogleAuth();
    
    return new Promise((resolve, reject) => {
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (response) => {
          try {
            // Send the ID token to our backend
            const result = await api.post('/auth/google', {
              accessToken: response.credential
            });
            
            // Store the token
            if (result.token) {
              localStorage.setItem('token', result.token);
            }
            
            resolve(result);
          } catch (error) {
            reject(error);
          }
        },
      });

      google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        { 
          theme: 'outline', 
          size: 'large',
          width: '100%',
          text: 'signin_with'
        }
      );
    });
  } catch (error) {
    throw error;
  }
};

// Handle Google OAuth callback (for server-side flow)
export const handleGoogleCallback = async (code) => {
  try {
    const response = await api.get(`/auth/google/callback?code=${code}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Sign out from Google
export const googleSignOut = () => {
  if (window.google && window.google.accounts) {
    window.google.accounts.id.disableAutoSelect();
  }
  localStorage.removeItem('token');
};

export default {
  initializeGoogleAuth,
  googleSignIn,
  googleSignInWithButton,
  handleGoogleCallback,
  googleSignOut
};
