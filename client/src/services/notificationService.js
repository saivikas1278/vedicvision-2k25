import api from './api.js';

const notificationService = {
  // Get user notifications
  getNotifications: async (params = {}) => {
    const response = await api.get('/notifications', { params });
    return response;
  },

  // Get unread count
  getUnreadCount: async () => {
    const response = await api.get('/notifications/unread-count');
    return response;
  },

  // Mark notification as read
  markAsRead: async (notificationId) => {
    const response = await api.put(`/notifications/${notificationId}/read`);
    return response;
  },

  // Mark all notifications as read
  markAllAsRead: async () => {
    const response = await api.put('/notifications/read-all');
    return response;
  },

  // Delete notification
  deleteNotification: async (notificationId) => {
    const response = await api.delete(`/notifications/${notificationId}`);
    return response;
  },

  // Create notification (admin only)
  createNotification: async (notificationData) => {
    const response = await api.post('/notifications', notificationData);
    return response;
  },

  // Get notifications by type
  getNotificationsByType: async (type, params = {}) => {
    const response = await api.get('/notifications', { 
      params: { type, ...params } 
    });
    return response;
  },

  // Get unread notifications only
  getUnreadNotifications: async (params = {}) => {
    const response = await api.get('/notifications', { 
      params: { unread: true, ...params } 
    });
    return response;
  }
};

export default notificationService;
