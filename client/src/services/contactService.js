import api from './api';

const contactService = {
  // Send contact form
  sendContactForm: async (contactData) => {
    try {
      console.log('Sending contact form data:', contactData);
      const response = await api.post('/contact', contactData);
      console.log('Contact service response:', response);
      // api.js interceptor already returns response.data, so response is the actual data
      return response;
    } catch (error) {
      console.error('Contact service error:', error);
      // Extract validation errors if they exist
      if (error.response?.data?.errors) {
        throw {
          message: error.response.data.message || 'Validation failed',
          errors: error.response.data.errors
        };
      }
      throw error.response?.data || error || { message: 'Failed to send message' };
    }
  },

  // Get contact information
  getContactInfo: async () => {
    try {
      const response = await api.get('/contact/info');
      // api.js interceptor already returns response.data, so response is the actual data
      return response;
    } catch (error) {
      console.error('Contact info service error:', error);
      throw error.response?.data || error || { message: 'Failed to get contact info' };
    }
  }
};

export default contactService;
