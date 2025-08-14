import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tournamentService from '../../services/tournamentService';

// Async thunks
export const fetchTournaments = createAsyncThunk(
  'tournaments/fetchTournaments',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await tournamentService.getTournaments(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch tournaments');
    }
  }
);

export const fetchTournamentById = createAsyncThunk(
  'tournaments/fetchTournamentById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await tournamentService.getTournament(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch tournament');
    }
  }
);

export const createTournament = createAsyncThunk(
  'tournaments/createTournament',
  async (tournamentData, { rejectWithValue }) => {
    try {
      const response = await tournamentService.createTournament(tournamentData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create tournament');
    }
  }
);

export const updateTournament = createAsyncThunk(
  'tournaments/updateTournament',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await tournamentService.updateTournament(id, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update tournament');
    }
  }
);

export const deleteTournament = createAsyncThunk(
  'tournaments/deleteTournament',
  async (id, { rejectWithValue }) => {
    try {
      await tournamentService.deleteTournament(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete tournament');
    }
  }
);

export const registerForTournament = createAsyncThunk(
  'tournaments/registerForTournament',
  async ({ tournamentId, teamId }, { rejectWithValue }) => {
    try {
      const response = await tournamentService.registerTeam(tournamentId, teamId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to register for tournament');
    }
  }
);

export const generateBracket = createAsyncThunk(
  'tournaments/generateBracket',
  async (tournamentId, { rejectWithValue }) => {
    try {
      const response = await tournamentService.generateBracket(tournamentId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to generate bracket');
    }
  }
);

const initialState = {
  tournaments: [],
  currentTournament: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    pages: 1,
    total: 0,
    limit: 10,
  },
  filters: {
    sport: '',
    status: '',
    search: '',
  },
};

const tournamentSlice = createSlice({
  name: 'tournaments',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearCurrentTournament: (state) => {
      state.currentTournament = null;
    },
    updateTournamentStatus: (state, action) => {
      const { tournamentId, status } = action.payload;
      const tournament = state.tournaments.find(t => t._id === tournamentId);
      if (tournament) {
        tournament.status = status;
      }
      if (state.currentTournament && state.currentTournament._id === tournamentId) {
        state.currentTournament.status = status;
      }
    },
    addTournamentMatch: (state, action) => {
      const { tournamentId, match } = action.payload;
      if (state.currentTournament && state.currentTournament._id === tournamentId) {
        if (!state.currentTournament.matches) {
          state.currentTournament.matches = [];
        }
        state.currentTournament.matches.push(match);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tournaments
      .addCase(fetchTournaments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTournaments.fulfilled, (state, action) => {
        state.loading = false;
        state.tournaments = action.payload.tournaments;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchTournaments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch tournament by ID
      .addCase(fetchTournamentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTournamentById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTournament = action.payload.tournament;
      })
      .addCase(fetchTournamentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create tournament
      .addCase(createTournament.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTournament.fulfilled, (state, action) => {
        state.loading = false;
        state.tournaments.unshift(action.payload.tournament);
      })
      .addCase(createTournament.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update tournament
      .addCase(updateTournament.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTournament.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tournaments.findIndex(t => t._id === action.payload.tournament._id);
        if (index !== -1) {
          state.tournaments[index] = action.payload.tournament;
        }
        if (state.currentTournament && state.currentTournament._id === action.payload.tournament._id) {
          state.currentTournament = action.payload.tournament;
        }
      })
      .addCase(updateTournament.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete tournament
      .addCase(deleteTournament.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTournament.fulfilled, (state, action) => {
        state.loading = false;
        state.tournaments = state.tournaments.filter(t => t._id !== action.payload);
        if (state.currentTournament && state.currentTournament._id === action.payload) {
          state.currentTournament = null;
        }
      })
      .addCase(deleteTournament.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register for tournament
      .addCase(registerForTournament.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerForTournament.fulfilled, (state, action) => {
        state.loading = false;
        const tournament = state.tournaments.find(t => t._id === action.payload.tournament._id);
        if (tournament) {
          tournament.participants = action.payload.tournament.participants;
        }
        if (state.currentTournament && state.currentTournament._id === action.payload.tournament._id) {
          state.currentTournament.participants = action.payload.tournament.participants;
        }
      })
      .addCase(registerForTournament.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Generate bracket
      .addCase(generateBracket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateBracket.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentTournament) {
          state.currentTournament.bracket = action.payload.bracket;
          state.currentTournament.status = 'active';
        }
      })
      .addCase(generateBracket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  clearError, 
  setFilters, 
  clearCurrentTournament, 
  updateTournamentStatus,
  addTournamentMatch 
} = tournamentSlice.actions;
export default tournamentSlice.reducer;
