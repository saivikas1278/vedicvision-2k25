import express from 'express';
import { body } from 'express-validator';
import {
  getMatches,
  getMatch,
  createMatch,
  updateMatch,
  deleteMatch,
  updateMatchScore,
  addMatchEvent,
  startMatch,
  endMatch,
  getLiveMatches,
  getUpcomingMatches,
  getMatchStats
} from '../controllers/matches.js';
import { protect, authorize, optional } from '../middleware/auth.js';

const router = express.Router();

// Match validation rules
const matchValidation = [
  body('homeTeam').isMongoId().withMessage('Invalid home team ID'),
  body('awayTeam').isMongoId().withMessage('Invalid away team ID'),
  body('tournament').isMongoId().withMessage('Invalid tournament ID'),
  body('scheduledTime').isISO8601().withMessage('Invalid scheduled time'),
  body('round').notEmpty().withMessage('Round is required')
];

const scoreUpdateValidation = [
  body('homeScore').isInt({ min: 0 }).withMessage('Home score must be a non-negative integer'),
  body('awayScore').isInt({ min: 0 }).withMessage('Away score must be a non-negative integer')
];

const eventValidation = [
  body('type').isIn(['goal', 'card', 'substitution', 'timeout', 'injury', 'other']).withMessage('Invalid event type'),
  body('team').isIn(['home', 'away']).withMessage('Team must be home or away'),
  body('minute').isInt({ min: 0, max: 200 }).withMessage('Minute must be between 0 and 200'),
  body('description').notEmpty().withMessage('Event description is required')
];

// Public routes
router.get('/', optional, getMatches);
router.get('/live', getLiveMatches);
router.get('/upcoming', getUpcomingMatches);
router.get('/:id', optional, getMatch);
router.get('/:id/stats', getMatchStats);

// Protected routes (Organizer only)
router.post('/', protect, authorize('organizer'), matchValidation, createMatch);
router.put('/:id', protect, authorize('organizer'), updateMatch);
router.delete('/:id', protect, authorize('organizer'), deleteMatch);

// Match management routes
router.put('/:id/score', protect, authorize('organizer'), scoreUpdateValidation, updateMatchScore);
router.post('/:id/events', protect, authorize('organizer'), eventValidation, addMatchEvent);
router.put('/:id/start', protect, authorize('organizer'), startMatch);
router.put('/:id/end', protect, authorize('organizer'), endMatch);

export default router;
