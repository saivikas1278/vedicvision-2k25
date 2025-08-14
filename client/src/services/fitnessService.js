import api from './api';

const fitnessService = {
  // Get all fitness content
  getFitnessContent: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await api.get(`/fitness?${queryString}`);
    return response;
  },

  // Get fitness content by ID
  getFitnessContentById: async (id) => {
    const response = await api.get(`/fitness/${id}`);
    return response;
  },

  // Create fitness content
  createFitnessContent: async (contentData) => {
    const formData = new FormData();
    
    // Append content data
    Object.keys(contentData).forEach(key => {
      if (key === 'exercises' || key === 'equipment') {
        formData.append(key, JSON.stringify(contentData[key]));
      } else if (contentData[key] instanceof File) {
        formData.append(key, contentData[key]);
      } else {
        formData.append(key, contentData[key]);
      }
    });

    const response = await api.post('/fitness', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  },

  // Update fitness content
  updateFitnessContent: async (id, data) => {
    const response = await api.put(`/fitness/${id}`, data);
    return response;
  },

  // Delete fitness content
  deleteFitnessContent: async (id) => {
    const response = await api.delete(`/fitness/${id}`);
    return response;
  },

  // Track progress
  trackProgress: async (contentId, progressData) => {
    const response = await api.post(`/fitness/${contentId}/progress`, progressData);
    return response;
  },

  // Get my progress
  getMyProgress: async () => {
    const response = await api.get('/fitness/my-progress');
    return response;
  },

  // Get progress by content ID
  getProgressByContent: async (contentId) => {
    const response = await api.get(`/fitness/${contentId}/my-progress`);
    return response;
  },

  // Update progress
  updateProgress: async (contentId, progressId, progressData) => {
    const response = await api.put(`/fitness/${contentId}/progress/${progressId}`, progressData);
    return response;
  },

  // Delete progress entry
  deleteProgress: async (contentId, progressId) => {
    const response = await api.delete(`/fitness/${contentId}/progress/${progressId}`);
    return response;
  },

  // Get workout plans
  getWorkoutPlans: async () => {
    const response = await api.get('/fitness/workout-plans');
    return response;
  },

  // Get nutrition guides
  getNutritionGuides: async () => {
    const response = await api.get('/fitness/nutrition');
    return response;
  },

  // Get exercise videos
  getExerciseVideos: async () => {
    const response = await api.get('/fitness/exercise-videos');
    return response;
  },

  // Get fitness content by type
  getContentByType: async (type) => {
    const response = await api.get(`/fitness/type/${type}`);
    return response;
  },

  // Get fitness content by difficulty
  getContentByDifficulty: async (difficulty) => {
    const response = await api.get(`/fitness/difficulty/${difficulty}`);
    return response;
  },

  // Get fitness content by category
  getContentByCategory: async (category) => {
    const response = await api.get(`/fitness/category/${category}`);
    return response;
  },

  // Search fitness content
  searchContent: async (query) => {
    const response = await api.get(`/fitness/search?q=${encodeURIComponent(query)}`);
    return response;
  },

  // Get featured content
  getFeaturedContent: async () => {
    const response = await api.get('/fitness/featured');
    return response;
  },

  // Get trending content
  getTrendingContent: async () => {
    const response = await api.get('/fitness/trending');
    return response;
  },

  // Get my content (created by user)
  getMyContent: async () => {
    const response = await api.get('/fitness/my-content');
    return response;
  },

  // Get saved content
  getSavedContent: async () => {
    const response = await api.get('/fitness/saved');
    return response;
  },

  // Save content
  saveContent: async (contentId) => {
    const response = await api.post(`/fitness/${contentId}/save`);
    return response;
  },

  // Unsave content
  unsaveContent: async (contentId) => {
    const response = await api.delete(`/fitness/${contentId}/save`);
    return response;
  },

  // Rate content
  rateContent: async (contentId, rating) => {
    const response = await api.post(`/fitness/${contentId}/rate`, { rating });
    return response;
  },

  // Get user statistics
  getUserStats: async () => {
    const response = await api.get('/fitness/stats');
    return response;
  },

  // Get leaderboard
  getLeaderboard: async (timeframe = 'week') => {
    const response = await api.get(`/fitness/leaderboard?timeframe=${timeframe}`);
    return response;
  },

  // Create custom workout
  createCustomWorkout: async (workoutData) => {
    const response = await api.post('/fitness/custom-workout', workoutData);
    return response;
  },

  // Update custom workout
  updateCustomWorkout: async (workoutId, workoutData) => {
    const response = await api.put(`/fitness/custom-workout/${workoutId}`, workoutData);
    return response;
  },

  // Delete custom workout
  deleteCustomWorkout: async (workoutId) => {
    const response = await api.delete(`/fitness/custom-workout/${workoutId}`);
    return response;
  },

  // Get custom workouts
  getCustomWorkouts: async () => {
    const response = await api.get('/fitness/custom-workouts');
    return response;
  },

  // Start workout session
  startWorkoutSession: async (contentId) => {
    const response = await api.post(`/fitness/${contentId}/start-session`);
    return response;
  },

  // End workout session
  endWorkoutSession: async (sessionId, sessionData) => {
    const response = await api.put(`/fitness/sessions/${sessionId}/end`, sessionData);
    return response;
  },

  // Get workout sessions
  getWorkoutSessions: async () => {
    const response = await api.get('/fitness/sessions');
    return response;
  },
};

export default fitnessService;
