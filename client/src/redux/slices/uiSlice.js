import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: false,
  modalOpen: false,
  modalType: null,
  modalProps: {},
  notifications: [],
  theme: 'light',
  loading: {
    global: false,
    page: false,
  },
  toast: {
    show: false,
    message: '',
    type: 'info', // success, error, warning, info
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    openModal: (state, action) => {
      state.modalOpen = true;
      state.modalType = action.payload.type;
      state.modalProps = action.payload.props || {};
    },
    closeModal: (state) => {
      state.modalOpen = false;
      state.modalType = null;
      state.modalProps = {};
    },
    addNotification: (state, action) => {
      const notification = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        read: false,
        ...action.payload,
      };
      state.notifications.unshift(notification);
    },
    markNotificationAsRead: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    markAllNotificationsAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.read = true;
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    setGlobalLoading: (state, action) => {
      state.loading.global = action.payload;
    },
    setPageLoading: (state, action) => {
      state.loading.page = action.payload;
    },
    showToast: (state, action) => {
      state.toast = {
        show: true,
        message: action.payload.message,
        type: action.payload.type || 'info',
      };
    },
    hideToast: (state) => {
      state.toast.show = false;
    },
    setOnlineStatus: (state, action) => {
      state.isOnline = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  openModal,
  closeModal,
  addNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  removeNotification,
  clearNotifications,
  setTheme,
  setGlobalLoading,
  setPageLoading,
  showToast,
  hideToast,
  setOnlineStatus,
} = uiSlice.actions;

export default uiSlice.reducer;
