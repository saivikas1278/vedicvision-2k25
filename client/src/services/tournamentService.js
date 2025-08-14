import api from './api';

const tournamentService = {
  // Get all tournaments
  getTournaments: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await api.get(`/tournaments?${queryString}`);
    return response;
  },

  // Get tournament by ID
  getTournament: async (id) => {
    const response = await api.get(`/tournaments/${id}`);
    return response;
  },

  // Create tournament
  createTournament: async (tournamentData) => {
    const response = await api.post('/tournaments', tournamentData);
    return response;
  },

  // Update tournament
  updateTournament: async (id, data) => {
    const response = await api.put(`/tournaments/${id}`, data);
    return response;
  },

  // Delete tournament
  deleteTournament: async (id) => {
    const response = await api.delete(`/tournaments/${id}`);
    return response;
  },

  // Register team for tournament
  registerTeam: async (tournamentId, teamId) => {
    const response = await api.post(`/tournaments/${tournamentId}/register`, { teamId });
    return response;
  },

  // Unregister team from tournament
  unregisterTeam: async (tournamentId, teamId) => {
    const response = await api.delete(`/tournaments/${tournamentId}/register/${teamId}`);
    return response;
  },

  // Generate tournament bracket
  generateBracket: async (tournamentId) => {
    const response = await api.post(`/tournaments/${tournamentId}/generate-bracket`);
    return response;
  },

  // Start tournament
  startTournament: async (tournamentId) => {
    const response = await api.post(`/tournaments/${tournamentId}/start`);
    return response;
  },

  // End tournament
  endTournament: async (tournamentId) => {
    const response = await api.post(`/tournaments/${tournamentId}/end`);
    return response;
  },

  // Get tournament bracket
  getBracket: async (tournamentId) => {
    const response = await api.get(`/tournaments/${tournamentId}/bracket`);
    return response;
  },

  // Update bracket match
  updateBracketMatch: async (tournamentId, matchId, data) => {
    const response = await api.put(`/tournaments/${tournamentId}/bracket/matches/${matchId}`, data);
    return response;
  },

  // Get tournament statistics
  getStatistics: async (tournamentId) => {
    const response = await api.get(`/tournaments/${tournamentId}/statistics`);
    return response;
  },

  // Get tournament participants
  getParticipants: async (tournamentId) => {
    const response = await api.get(`/tournaments/${tournamentId}/participants`);
    return response;
  },

  // Get tournament matches
  getMatches: async (tournamentId) => {
    const response = await api.get(`/tournaments/${tournamentId}/matches`);
    return response;
  },

  // Upload tournament banner
  uploadBanner: async (tournamentId, file) => {
    const formData = new FormData();
    formData.append('banner', file);
    
    const response = await api.post(`/tournaments/${tournamentId}/upload-banner`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  },

  // Get my tournaments (as organizer)
  getMyTournaments: async () => {
    const response = await api.get('/tournaments/my');
    return response;
  },

  // Get joined tournaments (as participant)
  getJoinedTournaments: async () => {
    const response = await api.get('/tournaments/joined');
    return response;
  },

  // Search tournaments
  searchTournaments: async (query) => {
    const response = await api.get(`/tournaments/search?q=${encodeURIComponent(query)}`);
    return response;
  },

  // Get featured tournaments
  getFeaturedTournaments: async () => {
    const response = await api.get('/tournaments/featured');
    return response;
  },

  // Get upcoming tournaments
  getUpcomingTournaments: async () => {
    const response = await api.get('/tournaments/upcoming');
    return response;
  },

  // Get live tournaments
  getLiveTournaments: async () => {
    const response = await api.get('/tournaments/live');
    return response;
  },
};

export default tournamentService;
