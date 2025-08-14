import { validationResult } from 'express-validator';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Match from '../models/Match.js';
import Tournament from '../models/Tournament.js';

// @desc    Get all users
// @route   GET /api/users
// @access  Public
export const getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    let query = {};

    // Filters
    if (req.query.role) {
      query.role = req.query.role;
    }

    if (req.query.sport) {
      query['sports.name'] = req.query.sport;
    }

    if (req.query.location) {
      query.$or = [
        { 'location.city': { $regex: req.query.location, $options: 'i' } },
        { 'location.state': { $regex: req.query.location, $options: 'i' } }
      ];
    }

    const users = await User.find(query)
      .select('-password -googleId')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip(startIndex);

    const total = await User.countDocuments(query);

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
      count: users.length,
      total,
      pagination,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Public
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password -googleId')
      .populate('following', 'firstName lastName avatar')
      .populate('followers', 'firstName lastName avatar');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Check privacy settings
    if (user.preferences.privacy.profileVisibility === 'private' && 
        (!req.user || req.user.id !== user._id.toString())) {
      return res.status(403).json({
        success: false,
        error: 'Profile is private'
      });
    }

    // Hide stats if user preference is set and viewer is not the user
    if (!user.preferences.privacy.showStats && 
        (!req.user || req.user.id !== user._id.toString())) {
      user.stats = undefined;
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
export const updateUser = async (req, res, next) => {
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

    // Make sure user can only update their own profile
    if (req.params.id !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this profile'
      });
    }

    const fieldsToUpdate = {};
    const allowedFields = [
      'firstName', 'lastName', 'bio', 'sports', 'location', 
      'dateOfBirth', 'phoneNumber', 'preferences', 'avatar'
    ];

    // Only update allowed fields that are provided
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        fieldsToUpdate[field] = req.body[field];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.params.id,
      fieldsToUpdate,
      {
        new: true,
        runValidators: true
      }
    ).select('-password -googleId');

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
export const deleteUser = async (req, res, next) => {
  try {
    // Make sure user can only delete their own profile
    if (req.params.id !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to delete this profile'
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Follow user
// @route   POST /api/users/:id/follow
// @access  Private
export const followUser = async (req, res, next) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);

    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Can't follow yourself
    if (req.params.id === req.user.id) {
      return res.status(400).json({
        success: false,
        error: 'Cannot follow yourself'
      });
    }

    // Check if already following
    if (currentUser.following.includes(userToFollow._id)) {
      return res.status(400).json({
        success: false,
        error: 'Already following this user'
      });
    }

    // Add to following/followers
    currentUser.following.push(userToFollow._id);
    userToFollow.followers.push(currentUser._id);

    await currentUser.save();
    await userToFollow.save();

    res.status(200).json({
      success: true,
      message: 'User followed successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Unfollow user
// @route   DELETE /api/users/:id/unfollow
// @access  Private
export const unfollowUser = async (req, res, next) => {
  try {
    const userToUnfollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);

    if (!userToUnfollow) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Check if not following
    if (!currentUser.following.includes(userToUnfollow._id)) {
      return res.status(400).json({
        success: false,
        error: 'Not following this user'
      });
    }

    // Remove from following/followers
    currentUser.following = currentUser.following.filter(
      id => id.toString() !== userToUnfollow._id.toString()
    );
    userToUnfollow.followers = userToUnfollow.followers.filter(
      id => id.toString() !== currentUser._id.toString()
    );

    await currentUser.save();
    await userToUnfollow.save();

    res.status(200).json({
      success: true,
      message: 'User unfollowed successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user statistics
// @route   GET /api/users/:id/stats
// @access  Public
export const getUserStats = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('stats preferences');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Check if stats are public
    if (!user.preferences.privacy.showStats && 
        (!req.user || req.user.id !== user._id.toString())) {
      return res.status(403).json({
        success: false,
        error: 'User statistics are private'
      });
    }

    // Get additional stats
    const teams = await Team.find({ 'players.user': user._id });
    const captainTeams = await Team.find({ captain: user._id });

    const stats = {
      ...user.stats.toObject(),
      teamsPlayed: teams.length,
      teamsCaptained: captainTeams.length,
      winRate: user.stats.matchesPlayed > 0 ? 
        ((user.stats.matchesWon / user.stats.matchesPlayed) * 100).toFixed(2) : 0
    };

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user matches
// @route   GET /api/users/:id/matches
// @access  Public
export const getUserMatches = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Find teams where user is a player
    const teams = await Team.find({ 'players.user': user._id });
    const teamIds = teams.map(team => team._id);

    // Find matches for these teams
    const matches = await Match.find({
      $or: [
        { homeTeam: { $in: teamIds } },
        { awayTeam: { $in: teamIds } }
      ]
    })
      .populate('tournament', 'name sport')
      .populate('homeTeam', 'name logo')
      .populate('awayTeam', 'name logo')
      .sort({ scheduledTime: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      count: matches.length,
      data: matches
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user tournaments
// @route   GET /api/users/:id/tournaments
// @access  Public
export const getUserTournaments = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Find tournaments organized by user
    const organizedTournaments = await Tournament.find({ organizer: user._id })
      .populate('registeredTeams', 'name logo')
      .sort({ createdAt: -1 });

    // Find tournaments user participated in
    const teams = await Team.find({ 'players.user': user._id }).populate('tournament');
    const participatedTournaments = teams.map(team => team.tournament).filter(Boolean);

    res.status(200).json({
      success: true,
      data: {
        organized: organizedTournaments,
        participated: participatedTournaments
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Search users
// @route   GET /api/users/search
// @access  Public
export const searchUsers = async (req, res, next) => {
  try {
    const { q, role, sport, location } = req.query;

    let query = {};

    // Text search
    if (q) {
      query.$or = [
        { firstName: { $regex: q, $options: 'i' } },
        { lastName: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } }
      ];
    }

    // Role filter
    if (role) {
      query.role = role;
    }

    // Sport filter
    if (sport) {
      query['sports.name'] = sport;
    }

    // Location filter
    if (location) {
      query.$or = [
        { 'location.city': { $regex: location, $options: 'i' } },
        { 'location.state': { $regex: location, $options: 'i' } }
      ];
    }

    const users = await User.find(query)
      .select('firstName lastName avatar role sports location')
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
};
