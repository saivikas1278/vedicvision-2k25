import api from './api';

const dashboardService = {
  // Get dashboard stats
  getDashboardStats: async () => {
    try {
      const response = await api.get('/users/dashboard/stats');
      return response;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },

  // Get user stats from user service
  getUserStats: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}/stats`);
      return response;
    } catch (error) {
      console.error('Error fetching user stats:', error);
      throw error;
    }
  },

  // Get recent activities
  getRecentActivities: async () => {
    try {
      const response = await api.get('/users/dashboard/activities');
      return response;
    } catch (error) {
      console.error('Error fetching recent activities:', error);
      throw error;
    }
  },

  // Get notifications
  getNotifications: async () => {
    try {
      const response = await api.get('/users/notifications');
      return response;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  }
};

export default dashboardService;
