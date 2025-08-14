import { io } from 'socket.io-client';
import { store } from '../redux/store';
import { 
  updateLiveScore, 
  addLiveEvent, 
  setLiveMatches,
  updateMatchStatusLive 
} from '../redux/slices/matchSlice';
import { 
  updateTournamentStatus,
  addTournamentMatch 
} from '../redux/slices/tournamentSlice';
import { addNotification } from '../redux/slices/uiSlice';
import { addRealTimeNotification } from '../redux/slices/notificationSlice';

let socket = null;

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

export const initializeSocket = () => {
  const token = localStorage.getItem('token');
  
  console.log(`[Socket] Initializing socket connection to ${SOCKET_URL}`, { hasToken: !!token });

  try {
    socket = io(SOCKET_URL, {
      auth: {
        token: token
      },
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000,
      forceNew: true
    });

    // Connection events
    socket.on('connect', () => {
      console.log('[Socket] Connected to server successfully');
    });

    socket.on('disconnect', (reason) => {
      console.log('[Socket] Disconnected from server:', reason);
    });

    socket.on('connect_error', (error) => {
      console.error('[Socket] Connection error:', error.message);
      // In development, we can continue without socket
      if (process.env.NODE_ENV === 'development') {
        console.log('[Socket] Development mode: continuing without socket connection');
      }
    });

    // Authentication events
    socket.on('auth_status', (data) => {
      console.log('[Socket] Authentication status:', data);
    });

    socket.on('authenticated', (data) => {
      console.log('[Socket] Successfully authenticated:', data);
    });

    socket.on('auth_error', (error) => {
      console.error('[Socket] Authentication error:', error);
      // Don't disconnect socket in development mode
      if (process.env.NODE_ENV !== 'development') {
        disconnectSocket();
      }
    });

    // Match events
    socket.on('match:score_updated', (data) => {
      store.dispatch(updateLiveScore({
        matchId: data.matchId,
        score: data.score
      }));
    });

    socket.on('match:event_added', (data) => {
      store.dispatch(addLiveEvent({
        matchId: data.matchId,
        event: data.event
      }));
    });

    socket.on('match:status_changed', (data) => {
      store.dispatch(updateMatchStatusLive({
        matchId: data.matchId,
        status: data.status
      }));
    });

    socket.on('match:started', (data) => {
      store.dispatch(updateMatchStatusLive({
        matchId: data.matchId,
        status: 'live'
      }));
      
      store.dispatch(addNotification({
        type: 'info',
        title: 'Match Started',
        message: `${data.team1} vs ${data.team2} has started!`,
        matchId: data.matchId
      }));
    });

    socket.on('match:ended', (data) => {
      store.dispatch(updateMatchStatusLive({
        matchId: data.matchId,
        status: 'completed'
      }));
      
      store.dispatch(addNotification({
        type: 'success',
        title: 'Match Completed',
        message: `${data.team1} vs ${data.team2} has ended. Final score: ${data.finalScore}`,
        matchId: data.matchId
      }));
    });

    // Tournament events
    socket.on('tournament:status_changed', (data) => {
      store.dispatch(updateTournamentStatus({
        tournamentId: data.tournamentId,
        status: data.status
      }));
    });

    socket.on('tournament:match_created', (data) => {
      store.dispatch(addTournamentMatch({
        tournamentId: data.tournamentId,
        match: data.match
      }));
    });

    socket.on('tournament:bracket_updated', (data) => {
      store.dispatch(addNotification({
        type: 'info',
        title: 'Tournament Updated',
        message: `Tournament bracket has been updated`,
        tournamentId: data.tournamentId
      }));
    });

    socket.on('tournament:started', (data) => {
      store.dispatch(addNotification({
        type: 'success',
        title: 'Tournament Started',
        message: `${data.tournamentName} has started!`,
        tournamentId: data.tournamentId
      }));
    });

    // Live matches updates
    socket.on('live_matches:updated', (data) => {
      store.dispatch(setLiveMatches(data.matches));
    });

    // General notifications
    socket.on('notification', (data) => {
      // Add to UI notifications
      store.dispatch(addNotification({
        type: data.type || 'info',
        title: data.title,
        message: data.message,
        ...data
      }));
      
      // Add to notification history
      store.dispatch(addRealTimeNotification(data));
    });

    // User events
    socket.on('user:team_invitation', (data) => {
      store.dispatch(addNotification({
        type: 'info',
        title: 'Team Invitation',
        message: `You've been invited to join ${data.teamName}`,
        teamId: data.teamId,
        invitationId: data.invitationId
      }));
    });

    socket.on('user:tournament_registration', (data) => {
      store.dispatch(addNotification({
        type: 'success',
        title: 'Tournament Registration',
        message: `Successfully registered for ${data.tournamentName}`,
        tournamentId: data.tournamentId
      }));
    });

    // Video events
    socket.on('video:new_comment', (data) => {
      store.dispatch(addNotification({
        type: 'info',
        title: 'New Comment',
        message: `Someone commented on your video: ${data.videoTitle}`,
        videoId: data.videoId
      }));
    });

    socket.on('video:liked', (data) => {
      store.dispatch(addNotification({
        type: 'info',
        title: 'Video Liked',
        message: `Someone liked your video: ${data.videoTitle}`,
        videoId: data.videoId
      }));
    });

    return socket;
  } catch (error) {
    console.error('Error initializing socket:', error);
    return null;
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;

// Match-specific socket functions
export const joinMatchRoom = (matchId) => {
  if (socket) {
    socket.emit('join_match', { matchId });
  }
};

export const leaveMatchRoom = (matchId) => {
  if (socket) {
    socket.emit('leave_match', { matchId });
  }
};

export const joinTournamentRoom = (tournamentId) => {
  if (socket) {
    socket.emit('join_tournament', { tournamentId });
  }
};

export const leaveTournamentRoom = (tournamentId) => {
  if (socket) {
    socket.emit('leave_tournament', { tournamentId });
  }
};

// Live updates functions
export const subscribeToLiveMatches = () => {
  if (socket) {
    socket.emit('subscribe_live_matches');
  }
};

export const unsubscribeFromLiveMatches = () => {
  if (socket) {
    socket.emit('unsubscribe_live_matches');
  }
};

// Match scoring functions (for organizers/scorekeepers)
export const updateMatchScore = (matchId, scoreData) => {
  if (socket) {
    socket.emit('match:update_score', {
      matchId,
      ...scoreData
    });
  }
};

export const addMatchEvent = (matchId, eventData) => {
  if (socket) {
    socket.emit('match:add_event', {
      matchId,
      ...eventData
    });
  }
};

export const updateMatchStatus = (matchId, status) => {
  if (socket) {
    socket.emit('match:update_status', {
      matchId,
      status
    });
  }
};

// Chat functions (for live match/tournament chat)
export const joinChatRoom = (roomType, roomId) => {
  if (socket) {
    socket.emit('join_chat', { roomType, roomId });
  }
};

export const leaveChatRoom = (roomType, roomId) => {
  if (socket) {
    socket.emit('leave_chat', { roomType, roomId });
  }
};

export const sendChatMessage = (roomType, roomId, message) => {
  if (socket) {
    socket.emit('chat_message', {
      roomType,
      roomId,
      message
    });
  }
};

const socketService = {
  initializeSocket,
  disconnectSocket,
  getSocket,
  joinMatchRoom,
  leaveMatchRoom,
  joinTournamentRoom,
  leaveTournamentRoom,
  subscribeToLiveMatches,
  unsubscribeFromLiveMatches,
  updateMatchScore,
  addMatchEvent,
  updateMatchStatus,
  joinChatRoom,
  leaveChatRoom,
  sendChatMessage
};

export default socketService;
