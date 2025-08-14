import api from './api';

const authService = {
  // Register user
  register: async (userData) => {
    console.log('[authService] Register payload:', userData);
    try {
      const response = await api.post('/auth/register', userData);
      console.log('[authService] Register response:', response);
      return response;
    } catch (err) {
      console.error('[authService] Register error:', err?.response || err);
      throw err;
    }
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response;
  },

  // Get user profile
  getProfile: async () => {
    console.log('[authService] Getting user profile...');
    try {
      const response = await api.get('/auth/me');
      console.log('[authService] Profile response:', response);
      return response;
    } catch (err) {
      console.error('[authService] Profile error:', err?.response || err);
      throw err;
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await api.put('/auth/profile', profileData);
    return response;
  },

  // Change password
  changePassword: async (passwordData) => {
    const response = await api.put('/auth/change-password', passwordData);
    return response;
  },

  // Upload profile picture
  uploadAvatar: async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    
    const response = await api.post('/auth/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response;
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    const response = await api.post('/auth/reset-password', {
      token,
      newPassword,
    });
    return response;
  },

  // Verify email
  verifyEmail: async (token) => {
    const response = await api.post('/auth/verify-email', { token });
    return response;
  },

  // Resend verification email
  resendVerification: async () => {
    const response = await api.post('/auth/resend-verification');
    return response;
  },

  // Google OAuth login
  googleLogin: async (token) => {
    const response = await api.post('/auth/google', { token });
    return response;
  },

  // Logout (if needed for server-side logout)
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response;
  },

  // Refresh token
  refreshToken: async () => {
    const response = await api.post('/auth/refresh');
    return response;
  },
};

export default authService;
