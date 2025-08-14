import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fitnessService from '../../services/fitnessService';

// Async thunks
export const fetchFitnessContent = createAsyncThunk(
  'fitness/fetchFitnessContent',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await fitnessService.getFitnessContent(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch fitness content');
    }
  }
);

export const fetchFitnessById = createAsyncThunk(
  'fitness/fetchFitnessById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fitnessService.getFitnessContent(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch fitness content');
    }
  }
);

export const createFitnessContent = createAsyncThunk(
  'fitness/createFitnessContent',
  async (contentData, { rejectWithValue }) => {
    try {
      const response = await fitnessService.createFitnessContent(contentData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create fitness content');
    }
  }
);

export const updateFitnessContent = createAsyncThunk(
  'fitness/updateFitnessContent',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await fitnessService.updateFitnessContent(id, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update fitness content');
    }
  }
);

export const deleteFitnessContent = createAsyncThunk(
  'fitness/deleteFitnessContent',
  async (id, { rejectWithValue }) => {
    try {
      await fitnessService.deleteFitnessContent(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete fitness content');
    }
  }
);

export const trackProgress = createAsyncThunk(
  'fitness/trackProgress',
  async ({ contentId, progressData }, { rejectWithValue }) => {
    try {
      const response = await fitnessService.trackProgress(contentId, progressData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to track progress');
    }
  }
);

export const fetchMyProgress = createAsyncThunk(
  'fitness/fetchMyProgress',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fitnessService.getMyProgress();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch progress');
    }
  }
);

const initialState = {
  content: [],
  currentContent: null,
  myProgress: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    pages: 1,
    total: 0,
    limit: 12,
  },
  filters: {
    type: '',
    difficulty: '',
    category: '',
    search: '',
    sortBy: 'createdAt',
    order: 'desc',
  },
  stats: {
    totalWorkouts: 0,
    totalDuration: 0,
    streak: 0,
    caloriesBurned: 0,
  },
};

const fitnessSlice = createSlice({
  name: 'fitness',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearCurrentContent: (state) => {
      state.currentContent = null;
    },
    updateProgress: (state, action) => {
      const { contentId, progress } = action.payload;
      
      // Update progress in myProgress array
      const existingProgress = state.myProgress.find(p => p.contentId === contentId);
      if (existingProgress) {
        Object.assign(existingProgress, progress);
      } else {
        state.myProgress.push({ contentId, ...progress });
      }
      
      // Update current content progress if viewing it
      if (state.currentContent && state.currentContent._id === contentId) {
        state.currentContent.userProgress = progress;
      }
    },
    updateStats: (state, action) => {
      state.stats = { ...state.stats, ...action.payload };
    },
    addToMyContent: (state, action) => {
      const content = action.payload;
      const exists = state.myProgress.find(p => p.contentId === content._id);
      if (!exists) {
        state.myProgress.push({
          contentId: content._id,
          content: content,
          startDate: new Date().toISOString(),
          completed: false,
          progress: 0,
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch fitness content
      .addCase(fetchFitnessContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFitnessContent.fulfilled, (state, action) => {
        state.loading = false;
        state.content = action.payload.content;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchFitnessContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch fitness content by ID
      .addCase(fetchFitnessById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFitnessById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentContent = action.payload.content;
      })
      .addCase(fetchFitnessById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create fitness content
      .addCase(createFitnessContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFitnessContent.fulfilled, (state, action) => {
        state.loading = false;
        state.content.unshift(action.payload.content);
      })
      .addCase(createFitnessContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update fitness content
      .addCase(updateFitnessContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFitnessContent.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.content.findIndex(c => c._id === action.payload.content._id);
        if (index !== -1) {
          state.content[index] = action.payload.content;
        }
        if (state.currentContent && state.currentContent._id === action.payload.content._id) {
          state.currentContent = action.payload.content;
        }
      })
      .addCase(updateFitnessContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete fitness content
      .addCase(deleteFitnessContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFitnessContent.fulfilled, (state, action) => {
        state.loading = false;
        state.content = state.content.filter(c => c._id !== action.payload);
        if (state.currentContent && state.currentContent._id === action.payload) {
          state.currentContent = null;
        }
      })
      .addCase(deleteFitnessContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Track progress
      .addCase(trackProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(trackProgress.fulfilled, (state, action) => {
        state.loading = false;
        const { contentId, progress } = action.payload;
        
        // Update progress
        const existingProgress = state.myProgress.find(p => p.contentId === contentId);
        if (existingProgress) {
          Object.assign(existingProgress, progress);
        } else {
          state.myProgress.push({ contentId, ...progress });
        }
        
        // Update stats if provided
        if (action.payload.stats) {
          state.stats = action.payload.stats;
        }
      })
      .addCase(trackProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch my progress
      .addCase(fetchMyProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.myProgress = action.payload.progress;
        state.stats = action.payload.stats;
      })
      .addCase(fetchMyProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  clearError, 
  setFilters, 
  clearCurrentContent,
  updateProgress,
  updateStats,
  addToMyContent
} = fitnessSlice.actions;
export default fitnessSlice.reducer;
