import api from './api';

const matchService = {
  // Get all matches
  getMatches: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await api.get(`/matches?${queryString}`);
    return response;
  },

  // Get match by ID
  getMatch: async (id) => {
    const response = await api.get(`/matches/${id}`);
    return response;
  },

  // Create match
  createMatch: async (matchData) => {
    const response = await api.post('/matches', matchData);
    return response;
  },

  // Update match
  updateMatch: async (id, data) => {
    const response = await api.put(`/matches/${id}`, data);
    return response;
  },

  // Delete match
  deleteMatch: async (id) => {
    const response = await api.delete(`/matches/${id}`);
    return response;
  },

  // Update match score
  updateScore: async (matchId, scoreData) => {
    const response = await api.patch(`/matches/${matchId}/score`, scoreData);
    return response;
  },

  // Update match result (final result)
  updateMatchResult: async (matchId, resultData) => {
    const response = await api.patch(`/matches/${matchId}/result`, resultData);
    return response;
  },

  // Update match status
  updateMatchStatus: async (matchId, status) => {
    const response = await api.put(`/matches/${matchId}/status`, { status });
    return response;
  },

  // Start match
  startMatch: async (matchId) => {
    const response = await api.post(`/matches/${matchId}/start`);
    return response;
  },

  // End match
  endMatch: async (matchId) => {
    const response = await api.post(`/matches/${matchId}/end`);
    return response;
  },

  // Pause match
  pauseMatch: async (matchId) => {
    const response = await api.post(`/matches/${matchId}/pause`);
    return response;
  },

  // Resume match
  resumeMatch: async (matchId) => {
    const response = await api.post(`/matches/${matchId}/resume`);
    return response;
  },

  // Add match event
  addEvent: async (matchId, eventData) => {
    const response = await api.post(`/matches/${matchId}/events`, eventData);
    return response;
  },

  // Update match event
  updateEvent: async (matchId, eventId, eventData) => {
    const response = await api.put(`/matches/${matchId}/events/${eventId}`, eventData);
    return response;
  },

  // Delete match event
  deleteEvent: async (matchId, eventId) => {
    const response = await api.delete(`/matches/${matchId}/events/${eventId}`);
    return response;
  },

  // Get match events
  getEvents: async (matchId) => {
    const response = await api.get(`/matches/${matchId}/events`);
    return response;
  },

  // Get match statistics
  getStatistics: async (matchId) => {
    const response = await api.get(`/matches/${matchId}/statistics`);
    return response;
  },

  // Get live matches
  getLiveMatches: async () => {
    const response = await api.get('/matches/live');
    return response;
  },

  // Get upcoming matches
  getUpcomingMatches: async () => {
    const response = await api.get('/matches/upcoming');
    return response;
  },

  // Get completed matches
  getCompletedMatches: async () => {
    const response = await api.get('/matches/completed');
    return response;
  },

  // Get my matches
  getMyMatches: async () => {
    const response = await api.get('/matches/my');
    return response;
  },

  // Search matches
  searchMatches: async (query) => {
    const response = await api.get(`/matches/search?q=${encodeURIComponent(query)}`);
    return response;
  },

  // Get matches by tournament
  getMatchesByTournament: async (tournamentId) => {
    const response = await api.get(`/matches/tournament/${tournamentId}`);
    return response;
  },

  // Get matches by team
  getMatchesByTeam: async (teamId) => {
    const response = await api.get(`/matches/team/${teamId}`);
    return response;
  },

  // Get matches by sport
  getMatchesBySport: async (sport) => {
    const response = await api.get(`/matches/sport/${sport}`);
    return response;
  },

  // Subscribe to match updates (for real-time)
  subscribeToMatch: async (matchId) => {
    const response = await api.post(`/matches/${matchId}/subscribe`);
    return response;
  },

  // Unsubscribe from match updates
  unsubscribeFromMatch: async (matchId) => {
    const response = await api.post(`/matches/${matchId}/unsubscribe`);
    return response;
  },

  // Get match commentary
  getCommentary: async (matchId) => {
    const response = await api.get(`/matches/${matchId}/commentary`);
    return response;
  },

  // Add match commentary
  addCommentary: async (matchId, commentary) => {
    const response = await api.post(`/matches/${matchId}/commentary`, { text: commentary });
    return response;
  },

  // Update match commentary
  updateCommentary: async (matchId, commentaryId, commentary) => {
    const response = await api.put(`/matches/${matchId}/commentary/${commentaryId}`, { text: commentary });
    return response;
  },

  // Delete match commentary
  deleteCommentary: async (matchId, commentaryId) => {
    const response = await api.delete(`/matches/${matchId}/commentary/${commentaryId}`);
    return response;
  },
};

export default matchService;
