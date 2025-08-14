import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import videoService from '../../services/videoService';

// Async thunks
export const fetchVideos = createAsyncThunk(
  'videos/fetchVideos',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await videoService.getVideos(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch videos');
    }
  }
);

export const fetchVideoById = createAsyncThunk(
  'videos/fetchVideoById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await videoService.getVideo(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch video');
    }
  }
);

export const uploadVideo = createAsyncThunk(
  'videos/uploadVideo',
  async (videoData, { rejectWithValue }) => {
    try {
      const response = await videoService.uploadVideo(videoData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to upload video');
    }
  }
);

export const updateVideo = createAsyncThunk(
  'videos/updateVideo',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await videoService.updateVideo(id, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update video');
    }
  }
);

export const deleteVideo = createAsyncThunk(
  'videos/deleteVideo',
  async (id, { rejectWithValue }) => {
    try {
      await videoService.deleteVideo(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete video');
    }
  }
);

export const likeVideo = createAsyncThunk(
  'videos/likeVideo',
  async (id, { rejectWithValue }) => {
    try {
      const response = await videoService.likeVideo(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to like video');
    }
  }
);

export const addComment = createAsyncThunk(
  'videos/addComment',
  async ({ videoId, comment }, { rejectWithValue }) => {
    try {
      const response = await videoService.addComment(videoId, comment);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add comment');
    }
  }
);

export const deleteComment = createAsyncThunk(
  'videos/deleteComment',
  async ({ videoId, commentId }, { rejectWithValue }) => {
    try {
      await videoService.deleteComment(videoId, commentId);
      return { videoId, commentId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete comment');
    }
  }
);

const initialState = {
  videos: [],
  currentVideo: null,
  myVideos: [],
  loading: false,
  uploadProgress: 0,
  error: null,
  pagination: {
    page: 1,
    pages: 1,
    total: 0,
    limit: 12,
  },
  filters: {
    category: '',
    sport: '',
    search: '',
    sortBy: 'createdAt',
    order: 'desc',
  },
};

const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearCurrentVideo: (state) => {
      state.currentVideo = null;
    },
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
    resetUploadProgress: (state) => {
      state.uploadProgress = 0;
    },
    updateVideoLikes: (state, action) => {
      const { videoId, likes, isLiked } = action.payload;
      
      // Update in videos array
      const video = state.videos.find(v => v._id === videoId);
      if (video) {
        video.likes = likes;
        video.isLiked = isLiked;
      }
      
      // Update current video
      if (state.currentVideo && state.currentVideo._id === videoId) {
        state.currentVideo.likes = likes;
        state.currentVideo.isLiked = isLiked;
      }
      
      // Update in my videos
      const myVideo = state.myVideos.find(v => v._id === videoId);
      if (myVideo) {
        myVideo.likes = likes;
        myVideo.isLiked = isLiked;
      }
    },
    addVideoComment: (state, action) => {
      const { videoId, comment } = action.payload;
      
      if (state.currentVideo && state.currentVideo._id === videoId) {
        if (!state.currentVideo.comments) {
          state.currentVideo.comments = [];
        }
        state.currentVideo.comments.unshift(comment);
      }
    },
    removeVideoComment: (state, action) => {
      const { videoId, commentId } = action.payload;
      
      if (state.currentVideo && state.currentVideo._id === videoId) {
        state.currentVideo.comments = state.currentVideo.comments.filter(
          comment => comment._id !== commentId
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch videos
      .addCase(fetchVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload.videos;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch video by ID
      .addCase(fetchVideoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideoById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentVideo = action.payload.video;
      })
      .addCase(fetchVideoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Upload video
      .addCase(uploadVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.videos.unshift(action.payload.video);
        state.myVideos.unshift(action.payload.video);
        state.uploadProgress = 0;
      })
      .addCase(uploadVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.uploadProgress = 0;
      })
      // Update video
      .addCase(updateVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVideo.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.videos.findIndex(v => v._id === action.payload.video._id);
        if (index !== -1) {
          state.videos[index] = action.payload.video;
        }
        if (state.currentVideo && state.currentVideo._id === action.payload.video._id) {
          state.currentVideo = action.payload.video;
        }
      })
      .addCase(updateVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete video
      .addCase(deleteVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = state.videos.filter(v => v._id !== action.payload);
        state.myVideos = state.myVideos.filter(v => v._id !== action.payload);
        if (state.currentVideo && state.currentVideo._id === action.payload) {
          state.currentVideo = null;
        }
      })
      .addCase(deleteVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Like video
      .addCase(likeVideo.fulfilled, (state, action) => {
        const { videoId, likes, isLiked } = action.payload;
        state.updateVideoLikes = { videoId, likes, isLiked };
      })
      // Add comment
      .addCase(addComment.fulfilled, (state, action) => {
        if (state.currentVideo && state.currentVideo._id === action.payload.videoId) {
          state.currentVideo.comments.unshift(action.payload.comment);
        }
      })
      // Delete comment
      .addCase(deleteComment.fulfilled, (state, action) => {
        const { videoId, commentId } = action.payload;
        if (state.currentVideo && state.currentVideo._id === videoId) {
          state.currentVideo.comments = state.currentVideo.comments.filter(
            comment => comment._id !== commentId
          );
        }
      });
  },
});

export const { 
  clearError, 
  setFilters, 
  clearCurrentVideo,
  setUploadProgress,
  resetUploadProgress,
  updateVideoLikes,
  addVideoComment,
  removeVideoComment
} = videoSlice.actions;
export default videoSlice.reducer;
