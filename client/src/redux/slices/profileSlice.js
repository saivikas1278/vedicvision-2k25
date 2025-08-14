import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import profileService from '../../services/profileService';

// Async thunks
export const getProfile = createAsyncThunk(
  'profile/getProfile',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await profileService.getProfile(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await profileService.updateProfile(profileData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const uploadAvatar = createAsyncThunk(
  'profile/uploadAvatar',
  async (file, { rejectWithValue }) => {
    try {
      const response = await profileService.uploadAvatar(file);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const followUser = createAsyncThunk(
  'profile/followUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await profileService.followUser(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const unfollowUser = createAsyncThunk(
  'profile/unfollowUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await profileService.unfollowUser(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getProfileStats = createAsyncThunk(
  'profile/getProfileStats',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await profileService.getProfileStats(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getProfileActivity = createAsyncThunk(
  'profile/getProfileActivity',
  async ({ userId, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await profileService.getProfileActivity(userId, page, limit);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getAchievements = createAsyncThunk(
  'profile/getAchievements',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await profileService.getAchievements(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updatePrivacySettings = createAsyncThunk(
  'profile/updatePrivacySettings',
  async (settings, { rejectWithValue }) => {
    try {
      const response = await profileService.updatePrivacySettings(settings);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const searchProfiles = createAsyncThunk(
  'profile/searchProfiles',
  async ({ query, filters }, { rejectWithValue }) => {
    try {
      const response = await profileService.searchProfiles(query, filters);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  currentProfile: null,
  profiles: [],
  stats: null,
  activities: [],
  achievements: [],
  following: [],
  followers: [],
  searchResults: [],
  loading: false,
  uploading: false,
  error: null,
  activityPage: 1,
  hasMoreActivities: true
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearProfile: (state) => {
      state.currentProfile = null;
      state.stats = null;
      state.activities = [];
      state.achievements = [];
      state.activityPage = 1;
      state.hasMoreActivities = true;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    updateProfileField: (state, action) => {
      const { field, value } = action.payload;
      if (state.currentProfile) {
        state.currentProfile[field] = value;
      }
    },
    resetActivityPagination: (state) => {
      state.activities = [];
      state.activityPage = 1;
      state.hasMoreActivities = true;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get Profile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProfile = action.payload.profile;
        state.following = action.payload.following || [];
        state.followers = action.payload.followers || [];
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProfile = { ...state.currentProfile, ...action.payload };
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Upload Avatar
      .addCase(uploadAvatar.pending, (state) => {
        state.uploading = true;
        state.error = null;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.uploading = false;
        if (state.currentProfile) {
          state.currentProfile.avatar = action.payload.avatar;
        }
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload;
      })

      // Follow User
      .addCase(followUser.fulfilled, (state, action) => {
        state.following.push(action.payload.user);
        if (state.stats) {
          state.stats.followingCount += 1;
        }
      })

      // Unfollow User
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.following = state.following.filter(user => user._id !== action.payload.userId);
        if (state.stats) {
          state.stats.followingCount -= 1;
        }
      })

      // Get Profile Stats
      .addCase(getProfileStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      })

      // Get Profile Activity
      .addCase(getProfileActivity.pending, (state) => {
        if (state.activityPage === 1) {
          state.loading = true;
        }
      })
      .addCase(getProfileActivity.fulfilled, (state, action) => {
        state.loading = false;
        const { activities, pagination } = action.payload;
        
        if (state.activityPage === 1) {
          state.activities = activities;
        } else {
          state.activities = [...state.activities, ...activities];
        }
        
        state.activityPage = pagination.page;
        state.hasMoreActivities = pagination.hasNext;
      })
      .addCase(getProfileActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Achievements
      .addCase(getAchievements.fulfilled, (state, action) => {
        state.achievements = action.payload;
      })

      // Update Privacy Settings
      .addCase(updatePrivacySettings.fulfilled, (state, action) => {
        if (state.currentProfile) {
          state.currentProfile.privacy = action.payload.privacy;
        }
      })

      // Search Profiles
      .addCase(searchProfiles.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.profiles;
      })
      .addCase(searchProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  clearError,
  clearProfile,
  clearSearchResults,
  updateProfileField,
  resetActivityPagination
} = profileSlice.actions;

export default profileSlice.reducer;
