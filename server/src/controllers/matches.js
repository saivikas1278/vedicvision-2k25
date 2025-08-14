import { validationResult } from 'express-validator';
import Match from '../models/Match.js';
import Tournament from '../models/Tournament.js';
import Team from '../models/Team.js';
import { emitScoreUpdate, emitMatchEvent } from '../utils/socketHandlers.js';

// @desc    Get all matches
// @route   GET /api/matches
// @access  Public
export const getMatches = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    let query = {};

    // Filters
    if (req.query.tournament) {
      query.tournament = req.query.tournament;
    }

    if (req.query.team) {
      query.$or = [
        { homeTeam: req.query.team },
        { awayTeam: req.query.team }
      ];
    }

    if (req.query.status) {
      query.status = req.query.status;
    }

    if (req.query.date) {
      const startDate = new Date(req.query.date);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      
      query.scheduledTime = {
        $gte: startDate,
        $lt: endDate
      };
    }

    const matches = await Match.find(query)
      .populate('tournament', 'name sport logo')
      .populate('homeTeam', 'name logo shortName')
      .populate('awayTeam', 'name logo shortName')
      .populate('referee.main', 'firstName lastName')
      .sort({ scheduledTime: 1 })
      .limit(limit * 1)
      .skip(startIndex);

    const total = await Match.countDocuments(query);

    // Pagination result
    const pagination = {};

    if (startIndex + limit < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: matches.length,
      total,
      pagination,
      data: matches
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single match
// @route   GET /api/matches/:id
// @access  Public
export const getMatch = async (req, res, next) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate('tournament', 'name sport logo')
      .populate('homeTeam')
      .populate('awayTeam')
      .populate('referee.main', 'firstName lastName avatar')
      .populate('referee.assistants', 'firstName lastName avatar')
      .populate('events.player', 'firstName lastName avatar')
      .populate('playerStats.player', 'firstName lastName avatar');

    if (!match) {
      return res.status(404).json({
        success: false,
        error: 'Match not found'
      });
    }

    res.status(200).json({
      success: true,
      data: match
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new match
// @route   POST /api/matches
// @access  Private (Organizer only)
export const createMatch = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    // Verify tournament exists and user is organizer
    const tournament = await Tournament.findById(req.body.tournament);
    if (!tournament) {
      return res.status(404).json({
        success: false,
        error: 'Tournament not found'
      });
    }

    if (tournament.organizer.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to create matches for this tournament'
      });
    }

    // Verify teams exist and are registered for tournament
    const homeTeam = await Team.findById(req.body.homeTeam);
    const awayTeam = await Team.findById(req.body.awayTeam);

    if (!homeTeam || !awayTeam) {
      return res.status(404).json({
        success: false,
        error: 'One or both teams not found'
      });
    }

    if (!tournament.registeredTeams.includes(homeTeam._id) || 
        !tournament.registeredTeams.includes(awayTeam._id)) {
      return res.status(400).json({
        success: false,
        error: 'Teams must be registered for the tournament'
      });
    }

    const match = await Match.create(req.body);

    // Add match to tournament
    tournament.matches.push(match._id);
    await tournament.save();

    res.status(201).json({
      success: true,
      data: match
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update match
// @route   PUT /api/matches/:id
// @access  Private (Organizer only)
export const updateMatch = async (req, res, next) => {
  try {
    let match = await Match.findById(req.params.id).populate('tournament');

    if (!match) {
      return res.status(404).json({
        success: false,
        error: 'Match not found'
      });
    }

    // Make sure user is tournament organizer
    if (match.tournament.organizer.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this match'
      });
    }

    // Don't allow certain updates after match starts
    if (match.status === 'live' || match.status === 'completed') {
      const restrictedFields = ['homeTeam', 'awayTeam', 'scheduledTime'];
      const hasRestrictedField = restrictedFields.some(field => req.body[field]);
      
      if (hasRestrictedField) {
        return res.status(400).json({
          success: false,
          error: 'Cannot modify match details after it starts'
        });
      }
    }

    match = await Match.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: match
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete match
// @route   DELETE /api/matches/:id
// @access  Private (Organizer only)
export const deleteMatch = async (req, res, next) => {
  try {
    const match = await Match.findById(req.params.id).populate('tournament');

    if (!match) {
      return res.status(404).json({
        success: false,
        error: 'Match not found'
      });
    }

    // Make sure user is tournament organizer
    if (match.tournament.organizer.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to delete this match'
      });
    }

    // Don't allow deletion of completed matches
    if (match.status === 'completed') {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete completed matches'
      });
    }

    await match.deleteOne();

    // Remove match from tournament
    const tournament = await Tournament.findById(match.tournament._id);
    tournament.matches = tournament.matches.filter(
      matchId => matchId.toString() !== match._id.toString()
    );
    await tournament.save();

    res.status(200).json({
      success: true,
      message: 'Match deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update match score
// @route   PUT /api/matches/:id/score
// @access  Private (Organizer only)
export const updateMatchScore = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const match = await Match.findById(req.params.id).populate('tournament');

    if (!match) {
      return res.status(404).json({
        success: false,
        error: 'Match not found'
      });
    }

    // Make sure user is tournament organizer
    if (match.tournament.organizer.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this match'
      });
    }

    const { homeScore, awayScore } = req.body;
    
    // Update score
    await match.updateScore(homeScore, awayScore);

    // Emit score update via socket
    const io = req.app.get('io');
    emitScoreUpdate(io, match._id, match.tournament._id, homeScore, awayScore, {
      type: 'score_update',
      homeScore,
      awayScore
    });

    res.status(200).json({
      success: true,
      data: match
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add match event
// @route   POST /api/matches/:id/events
// @access  Private (Organizer only)
export const addMatchEvent = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const match = await Match.findById(req.params.id).populate('tournament');

    if (!match) {
      return res.status(404).json({
        success: false,
        error: 'Match not found'
      });
    }

    // Make sure user is tournament organizer
    if (match.tournament.organizer.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this match'
      });
    }

    // Add event
    await match.addEvent(req.body);

    // Emit match event via socket
    const io = req.app.get('io');
    emitMatchEvent(io, match._id, match.tournament._id, req.body);

    res.status(200).json({
      success: true,
      data: match
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Start match
// @route   PUT /api/matches/:id/start
// @access  Private (Organizer only)
export const startMatch = async (req, res, next) => {
  try {
    const match = await Match.findById(req.params.id).populate('tournament');

    if (!match) {
      return res.status(404).json({
        success: false,
        error: 'Match not found'
      });
    }

    // Make sure user is tournament organizer
    if (match.tournament.organizer.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to start this match'
      });
    }

    if (match.status !== 'scheduled') {
      return res.status(400).json({
        success: false,
        error: 'Match cannot be started'
      });
    }

    await match.startMatch();

    // Emit match status change via socket
    const io = req.app.get('io');
    io.to(`match-${match._id}`).emit('match-status-changed', {
      matchId: match._id,
      status: 'live',
      timestamp: new Date()
    });

    res.status(200).json({
      success: true,
      data: match
    });
  } catch (error) {
    next(error);
  }
};

// @desc    End match
// @route   PUT /api/matches/:id/end
// @access  Private (Organizer only)
export const endMatch = async (req, res, next) => {
  try {
    const match = await Match.findById(req.params.id).populate('tournament homeTeam awayTeam');

    if (!match) {
      return res.status(404).json({
        success: false,
        error: 'Match not found'
      });
    }

    // Make sure user is tournament organizer
    if (match.tournament.organizer.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to end this match'
      });
    }

    if (match.status !== 'live') {
      return res.status(400).json({
        success: false,
        error: 'Match is not live'
      });
    }

    await match.endMatch();

    // Update team stats
    const homeResult = {
      result: match.result.isDraw ? 'draw' : (match.result.winner?.toString() === match.homeTeam._id.toString() ? 'win' : 'loss'),
      goalsFor: match.score.home,
      goalsAgainst: match.score.away
    };

    const awayResult = {
      result: match.result.isDraw ? 'draw' : (match.result.winner?.toString() === match.awayTeam._id.toString() ? 'win' : 'loss'),
      goalsFor: match.score.away,
      goalsAgainst: match.score.home
    };

    await match.homeTeam.updateStats(homeResult);
    await match.awayTeam.updateStats(awayResult);

    // Emit match status change via socket
    const io = req.app.get('io');
    io.to(`match-${match._id}`).emit('match-status-changed', {
      matchId: match._id,
      status: 'completed',
      timestamp: new Date()
    });

    res.status(200).json({
      success: true,
      data: match
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get live matches
// @route   GET /api/matches/live
// @access  Public
export const getLiveMatches = async (req, res, next) => {
  try {
    const matches = await Match.find({ status: 'live' })
      .populate('tournament', 'name sport logo')
      .populate('homeTeam', 'name logo shortName')
      .populate('awayTeam', 'name logo shortName')
      .sort({ actualStartTime: -1 });

    res.status(200).json({
      success: true,
      count: matches.length,
      data: matches
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get upcoming matches
// @route   GET /api/matches/upcoming
// @access  Public
export const getUpcomingMatches = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    
    const matches = await Match.find({ 
      status: 'scheduled',
      scheduledTime: { $gte: new Date() }
    })
      .populate('tournament', 'name sport logo')
      .populate('homeTeam', 'name logo shortName')
      .populate('awayTeam', 'name logo shortName')
      .sort({ scheduledTime: 1 })
      .limit(limit);

    res.status(200).json({
      success: true,
      count: matches.length,
      data: matches
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get match statistics
// @route   GET /api/matches/:id/stats
// @access  Public
export const getMatchStats = async (req, res, next) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate('homeTeam', 'name logo')
      .populate('awayTeam', 'name logo')
      .populate('playerStats.player', 'firstName lastName avatar');

    if (!match) {
      return res.status(404).json({
        success: false,
        error: 'Match not found'
      });
    }

    const stats = {
      matchInfo: {
        id: match._id,
        status: match.status,
        score: match.score,
        duration: match.duration,
        events: match.events.length
      },
      teamStats: {
        home: {
          team: match.homeTeam,
          stats: match.statistics.home
        },
        away: {
          team: match.awayTeam,
          stats: match.statistics.away
        }
      },
      playerStats: match.playerStats,
      events: match.events
    };

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
};
