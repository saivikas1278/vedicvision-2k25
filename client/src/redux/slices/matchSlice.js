import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import matchService from '../../services/matchService';

// Async thunks
export const fetchMatches = createAsyncThunk(
  'matches/fetchMatches',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await matchService.getMatches(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch matches');
    }
  }
);

export const fetchMatchById = createAsyncThunk(
  'matches/fetchMatchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await matchService.getMatch(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch match');
    }
  }
);

export const createMatch = createAsyncThunk(
  'matches/createMatch',
  async (matchData, { rejectWithValue }) => {
    try {
      const response = await matchService.createMatch(matchData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create match');
    }
  }
);

export const updateScore = createAsyncThunk(
  'matches/updateScore',
  async ({ matchId, scoreData }, { rejectWithValue }) => {
    try {
      const response = await matchService.updateScore(matchId, scoreData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update score');
    }
  }
);

export const updateMatchStatus = createAsyncThunk(
  'matches/updateMatchStatus',
  async ({ matchId, status }, { rejectWithValue }) => {
    try {
      const response = await matchService.updateMatchStatus(matchId, status);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update match status');
    }
  }
);

export const addMatchEvent = createAsyncThunk(
  'matches/addMatchEvent',
  async ({ matchId, eventData }, { rejectWithValue }) => {
    try {
      const response = await matchService.addEvent(matchId, eventData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add match event');
    }
  }
);

const initialState = {
  matches: [],
  currentMatch: null,
  liveMatches: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    pages: 1,
    total: 0,
    limit: 10,
  },
  filters: {
    status: '',
    sport: '',
    tournament: '',
  },
};

const matchSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearCurrentMatch: (state) => {
      state.currentMatch = null;
    },
    updateLiveScore: (state, action) => {
      const { matchId, score } = action.payload;
      
      // Update in matches array
      const match = state.matches.find(m => m._id === matchId);
      if (match) {
        match.score = score;
      }
      
      // Update in live matches
      const liveMatch = state.liveMatches.find(m => m._id === matchId);
      if (liveMatch) {
        liveMatch.score = score;
      }
      
      // Update current match
      if (state.currentMatch && state.currentMatch._id === matchId) {
        state.currentMatch.score = score;
      }
    },
    addLiveEvent: (state, action) => {
      const { matchId, event } = action.payload;
      
      // Update current match events
      if (state.currentMatch && state.currentMatch._id === matchId) {
        if (!state.currentMatch.events) {
          state.currentMatch.events = [];
        }
        state.currentMatch.events.push(event);
      }
      
      // Update live match events
      const liveMatch = state.liveMatches.find(m => m._id === matchId);
      if (liveMatch) {
        if (!liveMatch.events) {
          liveMatch.events = [];
        }
        liveMatch.events.push(event);
      }
    },
    setLiveMatches: (state, action) => {
      state.liveMatches = action.payload;
    },
    updateMatchStatusLive: (state, action) => {
      const { matchId, status } = action.payload;
      
      // Update in all relevant arrays
      [state.matches, state.liveMatches].forEach(matchArray => {
        const match = matchArray.find(m => m._id === matchId);
        if (match) {
          match.status = status;
        }
      });
      
      // Update current match
      if (state.currentMatch && state.currentMatch._id === matchId) {
        state.currentMatch.status = status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch matches
      .addCase(fetchMatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.matches = action.payload.matches;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch match by ID
      .addCase(fetchMatchById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMatchById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMatch = action.payload.match;
      })
      .addCase(fetchMatchById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create match
      .addCase(createMatch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMatch.fulfilled, (state, action) => {
        state.loading = false;
        state.matches.unshift(action.payload.match);
      })
      .addCase(createMatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update score
      .addCase(updateScore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateScore.fulfilled, (state, action) => {
        state.loading = false;
        const match = state.matches.find(m => m._id === action.payload.match._id);
        if (match) {
          match.score = action.payload.match.score;
        }
        if (state.currentMatch && state.currentMatch._id === action.payload.match._id) {
          state.currentMatch.score = action.payload.match.score;
        }
      })
      .addCase(updateScore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update match status
      .addCase(updateMatchStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMatchStatus.fulfilled, (state, action) => {
        state.loading = false;
        const match = state.matches.find(m => m._id === action.payload.match._id);
        if (match) {
          match.status = action.payload.match.status;
        }
        if (state.currentMatch && state.currentMatch._id === action.payload.match._id) {
          state.currentMatch.status = action.payload.match.status;
        }
      })
      .addCase(updateMatchStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add match event
      .addCase(addMatchEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMatchEvent.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentMatch && state.currentMatch._id === action.payload.match._id) {
          state.currentMatch.events = action.payload.match.events;
        }
      })
      .addCase(addMatchEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectAllMatches = (state) => state.matches.matches;
export const selectCurrentMatch = (state) => state.matches.currentMatch;
export const selectLiveMatches = (state) => state.matches.liveMatches;
export const selectMatchLoading = (state) => state.matches.loading;
export const selectMatchError = (state) => state.matches.error;
export const selectMatchPagination = (state) => state.matches.pagination;
export const selectMatchFilters = (state) => state.matches.filters;

export const { 
  clearError, 
  setFilters, 
  clearCurrentMatch,
  updateLiveScore,
  addLiveEvent,
  setLiveMatches,
  updateMatchStatusLive
} = matchSlice.actions;
export default matchSlice.reducer;
