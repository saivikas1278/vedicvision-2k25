import { validationResult } from 'express-validator';
import Tournament from '../models/Tournament.js';
import Team from '../models/Team.js';
import Match from '../models/Match.js';
import Notification from '../models/Notification.js';
import Profile from '../models/Profile.js';
import { emitBracketUpdate } from '../utils/socketHandlers.js';
import cloudinary from '../config/cloudinary.js';

// @desc    Get all tournaments
// @route   GET /api/tournaments
// @access  Public
export const getTournaments = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    // Build query
    let query = {};
    
    // Filters
    if (req.query.sport) {
      query.sport = req.query.sport;
    }
    
    if (req.query.status) {
      query.status = req.query.status;
    }
    
    if (req.query.city) {
      query['venue.city'] = { $regex: req.query.city, $options: 'i' };
    }
    
    if (req.query.organizer) {
      query.organizer = req.query.organizer;
    }

    // Date filters
    if (req.query.startDate) {
      query['dates.tournamentStart'] = { $gte: new Date(req.query.startDate) };
    }
    
    if (req.query.endDate) {
      query['dates.tournamentEnd'] = { $lte: new Date(req.query.endDate) };
    }

    // Visibility filter (only show public tournaments for non-authenticated users)
    if (!req.user) {
      query.visibility = 'public';
    }

    const tournaments = await Tournament.find(query)
      .populate('organizer', 'firstName lastName avatar')
      .populate('registeredTeams', 'name logo teamSize')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip(startIndex);

    const total = await Tournament.countDocuments(query);

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
      count: tournaments.length,
      total,
      pagination,
      data: tournaments
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single tournament
// @route   GET /api/tournaments/:id
// @access  Public
export const getTournament = async (req, res, next) => {
  try {
    const tournament = await Tournament.findById(req.params.id)
      .populate('organizer', 'firstName lastName avatar email')
      .populate({
        path: 'registeredTeams',
        populate: {
          path: 'captain players.user',
          select: 'firstName lastName avatar'
        }
      })
      .populate('matches');

    if (!tournament) {
      return res.status(404).json({
        success: false,
        error: 'Tournament not found'
      });
    }

    // Check if user can view private tournament
    if (tournament.visibility === 'private' && (!req.user || req.user.id !== tournament.organizer._id.toString())) {
      return res.status(403).json({
        success: false,
        error: 'Access denied to private tournament'
      });
    }

    res.status(200).json({
      success: true,
      data: tournament
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new tournament
// @route   POST /api/tournaments
// @access  Private (Organizer only)
export const createTournament = async (req, res, next) => {
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

    // Add organizer to req.body
    req.body.organizer = req.user.id;

    const tournament = await Tournament.create(req.body);

    res.status(201).json({
      success: true,
      data: tournament
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update tournament
// @route   PUT /api/tournaments/:id
// @access  Private (Organizer only)
export const updateTournament = async (req, res, next) => {
  try {
    let tournament = await Tournament.findById(req.params.id);

    if (!tournament) {
      return res.status(404).json({
        success: false,
        error: 'Tournament not found'
      });
    }

    // Make sure user is tournament organizer
    if (tournament.organizer.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'User not authorized to update this tournament'
      });
    }

    // Don't allow certain fields to be updated after tournament starts
    if (tournament.status !== 'draft' && tournament.status !== 'open') {
      const restrictedFields = ['sport', 'format', 'maxTeams', 'dates'];
      const hasRestrictedField = restrictedFields.some(field => req.body[field]);
      
      if (hasRestrictedField) {
        return res.status(400).json({
          success: false,
          error: 'Cannot modify tournament structure after registration closes'
        });
      }
    }

    tournament = await Tournament.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: tournament
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete tournament
// @route   DELETE /api/tournaments/:id
// @access  Private (Organizer only)
export const deleteTournament = async (req, res, next) => {
  try {
    const tournament = await Tournament.findById(req.params.id);

    if (!tournament) {
      return res.status(404).json({
        success: false,
        error: 'Tournament not found'
      });
    }

    // Make sure user is tournament organizer
    if (tournament.organizer.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'User not authorized to delete this tournament'
      });
    }

    // Don't allow deletion if tournament has started
    if (tournament.status === 'ongoing' || tournament.status === 'completed') {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete tournament that has started or completed'
      });
    }

    await tournament.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Tournament deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Register team for tournament
// @route   POST /api/tournaments/:id/register
// @access  Private
export const registerTeamForTournament = async (req, res, next) => {
  try {
    const tournament = await Tournament.findById(req.params.id);

    if (!tournament) {
      return res.status(404).json({
        success: false,
        error: 'Tournament not found'
      });
    }

    // Check registration status
    if (tournament.registrationStatus !== 'open') {
      return res.status(400).json({
        success: false,
        error: 'Tournament registration is not open'
      });
    }

    // Check if tournament is full
    if (tournament.registeredTeams.length >= tournament.maxTeams) {
      return res.status(400).json({
        success: false,
        error: 'Tournament is full'
      });
    }

    // Create team
    const teamData = {
      ...req.body,
      captain: req.user.id,
      tournament: tournament._id,
      sport: tournament.sport
    };

    const team = await Team.create(teamData);

    // Add team to tournament
    tournament.registeredTeams.push(team._id);
    await tournament.save();

    res.status(201).json({
      success: true,
      data: team
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Unregister team from tournament
// @route   DELETE /api/tournaments/:id/unregister
// @access  Private
export const unregisterTeamFromTournament = async (req, res, next) => {
  try {
    const tournament = await Tournament.findById(req.params.id);

    if (!tournament) {
      return res.status(404).json({
        success: false,
        error: 'Tournament not found'
      });
    }

    // Find user's team in this tournament
    const team = await Team.findOne({
      tournament: tournament._id,
      captain: req.user.id
    });

    if (!team) {
      return res.status(404).json({
        success: false,
        error: 'Team not found in this tournament'
      });
    }

    // Check if tournament allows late withdrawal
    if (tournament.status !== 'open' && !tournament.settings.allowLateRegistration) {
      return res.status(400).json({
        success: false,
        error: 'Cannot withdraw after registration closes'
      });
    }

    // Remove team from tournament
    tournament.registeredTeams = tournament.registeredTeams.filter(
      teamId => teamId.toString() !== team._id.toString()
    );
    await tournament.save();

    // Delete team
    await team.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Team unregistered successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Approve team registration
// @route   PUT /api/tournaments/:id/registrations/:teamId/approve
// @access  Private (Organizer only)
export const approveTournamentRegistration = async (req, res, next) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    const team = await Team.findById(req.params.teamId);

    if (!tournament || !team) {
      return res.status(404).json({
        success: false,
        error: 'Tournament or team not found'
      });
    }

    // Make sure user is tournament organizer
    if (tournament.organizer.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized'
      });
    }

    team.registrationDetails.registrationStatus = 'approved';
    await team.save();

    res.status(200).json({
      success: true,
      data: team
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reject team registration
// @route   PUT /api/tournaments/:id/registrations/:teamId/reject
// @access  Private (Organizer only)
export const rejectTournamentRegistration = async (req, res, next) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    const team = await Team.findById(req.params.teamId);

    if (!tournament || !team) {
      return res.status(404).json({
        success: false,
        error: 'Tournament or team not found'
      });
    }

    // Make sure user is tournament organizer
    if (tournament.organizer.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized'
      });
    }

    team.registrationDetails.registrationStatus = 'rejected';
    await team.save();

    res.status(200).json({
      success: true,
      data: team
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get tournament bracket
// @route   GET /api/tournaments/:id/bracket
// @access  Public
export const getTournamentBracket = async (req, res, next) => {
  try {
    const tournament = await Tournament.findById(req.params.id)
      .populate('registeredTeams', 'name logo')
      .populate('matches');

    if (!tournament) {
      return res.status(404).json({
        success: false,
        error: 'Tournament not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        bracket: tournament.brackets,
        teams: tournament.registeredTeams,
        matches: tournament.matches
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update tournament bracket
// @route   PUT /api/tournaments/:id/bracket
// @access  Private (Organizer only)
export const updateTournamentBracket = async (req, res, next) => {
  try {
    const tournament = await Tournament.findById(req.params.id);

    if (!tournament) {
      return res.status(404).json({
        success: false,
        error: 'Tournament not found'
      });
    }

    // Make sure user is tournament organizer
    if (tournament.organizer.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized'
      });
    }

    tournament.brackets = req.body.bracket;
    await tournament.save();

    // Emit bracket update via socket
    const io = req.app.get('io');
    emitBracketUpdate(io, tournament._id, tournament.brackets);

    res.status(200).json({
      success: true,
      data: tournament.brackets
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get tournament standings
// @route   GET /api/tournaments/:id/standings
// @access  Public
export const getTournamentStandings = async (req, res, next) => {
  try {
    const tournament = await Tournament.findById(req.params.id)
      .populate('standings.team', 'name logo');

    if (!tournament) {
      return res.status(404).json({
        success: false,
        error: 'Tournament not found'
      });
    }

    res.status(200).json({
      success: true,
      data: tournament.standings
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get tournament matches
// @route   GET /api/tournaments/:id/matches
// @access  Public
export const getTournamentMatches = async (req, res, next) => {
  try {
    const matches = await Match.find({ tournament: req.params.id })
      .populate('homeTeam', 'name logo')
      .populate('awayTeam', 'name logo')
      .sort({ scheduledTime: 1 });

    res.status(200).json({
      success: true,
      count: matches.length,
      data: matches
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Search tournaments
// @route   GET /api/tournaments/search
// @access  Public
export const searchTournaments = async (req, res, next) => {
  try {
    const { q, sport, location, dateFrom, dateTo } = req.query;

    let query = {};

    // Text search
    if (q) {
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ];
    }

    // Sport filter
    if (sport) {
      query.sport = sport;
    }

    // Location filter
    if (location) {
      query.$or = [
        { 'venue.city': { $regex: location, $options: 'i' } },
        { 'venue.state': { $regex: location, $options: 'i' } }
      ];
    }

    // Date range filter
    if (dateFrom || dateTo) {
      query['dates.tournamentStart'] = {};
      if (dateFrom) {
        query['dates.tournamentStart'].$gte = new Date(dateFrom);
      }
      if (dateTo) {
        query['dates.tournamentStart'].$lte = new Date(dateTo);
      }
    }

    // Only show public tournaments for non-authenticated users
    if (!req.user) {
      query.visibility = 'public';
    }

    const tournaments = await Tournament.find(query)
      .populate('organizer', 'firstName lastName avatar')
      .populate('registeredTeams', 'name logo')
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      count: tournaments.length,
      data: tournaments
    });
  } catch (error) {
    next(error);
  }
};
