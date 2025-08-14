import api from './api';

const videoService = {
  // Get all videos
  getVideos: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await api.get(`/videos?${queryString}`);
    return response;
  },

  // Get video by ID
  getVideo: async (id) => {
    const response = await api.get(`/videos/${id}`);
    return response;
  },

  // Upload video
  uploadVideo: async (videoData, onUploadProgress) => {
    const formData = new FormData();
    
    // Append video file
    formData.append('video', videoData.file);
    
    // Append metadata
    formData.append('title', videoData.title);
    formData.append('description', videoData.description);
    formData.append('category', videoData.category);
    formData.append('sport', videoData.sport);
    formData.append('tags', JSON.stringify(videoData.tags || []));
    
    if (videoData.thumbnail) {
      formData.append('thumbnail', videoData.thumbnail);
    }

    const response = await api.post('/videos/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onUploadProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onUploadProgress(percentCompleted);
        }
      },
    });
    return response;
  },

  // Update video
  updateVideo: async (id, data) => {
    const response = await api.put(`/videos/${id}`, data);
    return response;
  },

  // Delete video
  deleteVideo: async (id) => {
    const response = await api.delete(`/videos/${id}`);
    return response;
  },

  // Like video
  likeVideo: async (id) => {
    const response = await api.post(`/videos/${id}/like`);
    return response;
  },

  // Unlike video
  unlikeVideo: async (id) => {
    const response = await api.delete(`/videos/${id}/like`);
    return response;
  },

  // Add comment
  addComment: async (videoId, comment) => {
    const response = await api.post(`/videos/${videoId}/comments`, { text: comment });
    return response;
  },

  // Update comment
  updateComment: async (videoId, commentId, comment) => {
    const response = await api.put(`/videos/${videoId}/comments/${commentId}`, { text: comment });
    return response;
  },

  // Delete comment
  deleteComment: async (videoId, commentId) => {
    const response = await api.delete(`/videos/${videoId}/comments/${commentId}`);
    return response;
  },

  // Get video comments
  getComments: async (videoId, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await api.get(`/videos/${videoId}/comments?${queryString}`);
    return response;
  },

  // Share video
  shareVideo: async (id, platform) => {
    const response = await api.post(`/videos/${id}/share`, { platform });
    return response;
  },

  // Report video
  reportVideo: async (id, reason) => {
    const response = await api.post(`/videos/${id}/report`, { reason });
    return response;
  },

  // Get my videos
  getMyVideos: async () => {
    const response = await api.get('/videos/my');
    return response;
  },

  // Get liked videos
  getLikedVideos: async () => {
    const response = await api.get('/videos/liked');
    return response;
  },

  // Get trending videos
  getTrendingVideos: async () => {
    const response = await api.get('/videos/trending');
    return response;
  },

  // Get featured videos
  getFeaturedVideos: async () => {
    const response = await api.get('/videos/featured');
    return response;
  },

  // Search videos
  searchVideos: async (query) => {
    const response = await api.get(`/videos/search?q=${encodeURIComponent(query)}`);
    return response;
  },

  // Get videos by category
  getVideosByCategory: async (category) => {
    const response = await api.get(`/videos/category/${category}`);
    return response;
  },

  // Get videos by sport
  getVideosBySport: async (sport) => {
    const response = await api.get(`/videos/sport/${sport}`);
    return response;
  },

  // Get videos by user
  getVideosByUser: async (userId) => {
    const response = await api.get(`/videos/user/${userId}`);
    return response;
  },

  // Update video thumbnail
  updateThumbnail: async (videoId, thumbnail) => {
    const formData = new FormData();
    formData.append('thumbnail', thumbnail);
    
    const response = await api.post(`/videos/${videoId}/thumbnail`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  },

  // Get video analytics
  getAnalytics: async (videoId) => {
    const response = await api.get(`/videos/${videoId}/analytics`);
    return response;
  },

  // Record video view
  recordView: async (videoId) => {
    const response = await api.post(`/videos/${videoId}/view`);
    return response;
  },

  // Get video recommendations
  getRecommendations: async (videoId) => {
    const response = await api.get(`/videos/${videoId}/recommendations`);
    return response;
  },

  // Get video playlists
  getPlaylists: async () => {
    const response = await api.get('/videos/playlists');
    return response;
  },

  // Create playlist
  createPlaylist: async (playlistData) => {
    const response = await api.post('/videos/playlists', playlistData);
    return response;
  },

  // Add video to playlist
  addToPlaylist: async (playlistId, videoId) => {
    const response = await api.post(`/videos/playlists/${playlistId}/videos`, { videoId });
    return response;
  },

  // Remove video from playlist
  removeFromPlaylist: async (playlistId, videoId) => {
    const response = await api.delete(`/videos/playlists/${playlistId}/videos/${videoId}`);
    return response;
  },
};

export default videoService;
