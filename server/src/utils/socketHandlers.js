export const setupSocketHandlers = (io) => {
  io.on('connection', (socket) => {
    console.log(`🔌 User connected: ${socket.id}`);

    // Join tournament room
    socket.on('join-tournament', (tournamentId) => {
      socket.join(`tournament-${tournamentId}`);
      console.log(`📺 User ${socket.id} joined tournament ${tournamentId}`);
    });

    // Leave tournament room
    socket.on('leave-tournament', (tournamentId) => {
      socket.leave(`tournament-${tournamentId}`);
      console.log(`📺 User ${socket.id} left tournament ${tournamentId}`);
    });

    // Join match room
    socket.on('join-match', (matchId) => {
      socket.join(`match-${matchId}`);
      console.log(`⚽ User ${socket.id} joined match ${matchId}`);
    });

    // Leave match room
    socket.on('leave-match', (matchId) => {
      socket.leave(`match-${matchId}`);
      console.log(`⚽ User ${socket.id} left match ${matchId}`);
    });

    // Handle live score updates
    socket.on('score-update', (data) => {
      const { matchId, homeScore, awayScore, event } = data;
      
      // Broadcast to all users watching this match
      socket.to(`match-${matchId}`).emit('score-updated', {
        matchId,
        homeScore,
        awayScore,
        event,
        timestamp: new Date()
      });

      // Also broadcast to tournament room
      if (data.tournamentId) {
        socket.to(`tournament-${data.tournamentId}`).emit('match-score-updated', {
          matchId,
          homeScore,
          awayScore,
          event,
          timestamp: new Date()
        });
      }
    });

    // Handle match events (goals, cards, etc.)
    socket.on('match-event', (data) => {
      const { matchId, event, tournamentId } = data;
      
      // Broadcast to match room
      socket.to(`match-${matchId}`).emit('match-event-added', {
        matchId,
        event,
        timestamp: new Date()
      });

      // Broadcast to tournament room
      if (tournamentId) {
        socket.to(`tournament-${tournamentId}`).emit('tournament-match-event', {
          matchId,
          event,
          timestamp: new Date()
        });
      }
    });

    // Handle match status changes
    socket.on('match-status-change', (data) => {
      const { matchId, status, tournamentId } = data;
      
      socket.to(`match-${matchId}`).emit('match-status-changed', {
        matchId,
        status,
        timestamp: new Date()
      });

      if (tournamentId) {
        socket.to(`tournament-${tournamentId}`).emit('tournament-match-status-changed', {
          matchId,
          status,
          timestamp: new Date()
        });
      }
    });

    // Handle live video streaming
    socket.on('join-live-stream', (streamId) => {
      socket.join(`stream-${streamId}`);
      console.log(`📹 User ${socket.id} joined live stream ${streamId}`);
    });

    socket.on('leave-live-stream', (streamId) => {
      socket.leave(`stream-${streamId}`);
      console.log(`📹 User ${socket.id} left live stream ${streamId}`);
    });

    // Handle live chat during streams
    socket.on('stream-chat-message', (data) => {
      const { streamId, message, user } = data;
      
      socket.to(`stream-${streamId}`).emit('stream-chat-message-received', {
        message,
        user,
        timestamp: new Date()
      });
    });

    // Handle notifications
    socket.on('join-user-notifications', (userId) => {
      socket.join(`user-${userId}`);
      console.log(`🔔 User ${socket.id} joined notifications for user ${userId}`);
    });

    socket.on('leave-user-notifications', (userId) => {
      socket.leave(`user-${userId}`);
      console.log(`🔔 User ${socket.id} left notifications for user ${userId}`);
    });

    // Handle tournament bracket updates
    socket.on('bracket-update', (data) => {
      const { tournamentId, bracket } = data;
      
      socket.to(`tournament-${tournamentId}`).emit('bracket-updated', {
        tournamentId,
        bracket,
        timestamp: new Date()
      });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`🔌 User disconnected: ${socket.id}`);
    });
  });
};

// Helper functions to emit events from controllers
export const emitScoreUpdate = (io, matchId, tournamentId, homeScore, awayScore, event) => {
  io.to(`match-${matchId}`).emit('score-updated', {
    matchId,
    homeScore,
    awayScore,
    event,
    timestamp: new Date()
  });

  if (tournamentId) {
    io.to(`tournament-${tournamentId}`).emit('match-score-updated', {
      matchId,
      homeScore,
      awayScore,
      event,
      timestamp: new Date()
    });
  }
};

export const emitMatchEvent = (io, matchId, tournamentId, event) => {
  io.to(`match-${matchId}`).emit('match-event-added', {
    matchId,
    event,
    timestamp: new Date()
  });

  if (tournamentId) {
    io.to(`tournament-${tournamentId}`).emit('tournament-match-event', {
      matchId,
      event,
      timestamp: new Date()
    });
  }
};

export const emitNotification = (io, userId, notification) => {
  io.to(`user-${userId}`).emit('notification-received', {
    notification,
    timestamp: new Date()
  });
};

export const emitBracketUpdate = (io, tournamentId, bracket) => {
  io.to(`tournament-${tournamentId}`).emit('bracket-updated', {
    tournamentId,
    bracket,
    timestamp: new Date()
  });
};
