import express from 'express';
import { body } from 'express-validator';
import {
  getTournaments,
  getTournament,
  createTournament,
  updateTournament,
  deleteTournament,
  registerTeamForTournament,
  unregisterTeamFromTournament,
  approveTournamentRegistration,
  rejectTournamentRegistration,
  getTournamentBracket,
  updateTournamentBracket,
  getTournamentStandings,
  getTournamentMatches,
  searchTournaments
} from '../controllers/tournaments.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Tournament validation rules
const tournamentValidation = [
  body('name')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Tournament name must be between 3 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('sport')
    .isIn(['football', 'basketball', 'cricket', 'tennis', 'badminton', 'volleyball', 'table-tennis', 'chess', 'other'])
    .withMessage('Invalid sport selection'),
  body('format')
    .isIn(['single-elimination', 'double-elimination', 'round-robin', 'swiss', 'league'])
    .withMessage('Invalid tournament format'),
  body('maxTeams')
    .isInt({ min: 2, max: 64 })
    .withMessage('Maximum teams must be between 2 and 64'),
  body('dates.registrationStart')
    .isISO8601()
    .withMessage('Invalid registration start date'),
  body('dates.registrationEnd')
    .isISO8601()
    .withMessage('Invalid registration end date'),
  body('dates.tournamentStart')
    .isISO8601()
    .withMessage('Invalid tournament start date'),
  body('dates.tournamentEnd')
    .isISO8601()
    .withMessage('Invalid tournament end date')
];

// Public routes
router.get('/', getTournaments);
router.get('/search', searchTournaments);
router.get('/:id', getTournament);
router.get('/:id/bracket', getTournamentBracket);
router.get('/:id/standings', getTournamentStandings);
router.get('/:id/matches', getTournamentMatches);

// Protected routes
router.post('/', protect, authorize('organizer'), tournamentValidation, createTournament);
router.put('/:id', protect, authorize('organizer'), updateTournament);
router.delete('/:id', protect, authorize('organizer'), deleteTournament);

// Team registration routes
router.post('/:id/register', protect, registerTeamForTournament);
router.delete('/:id/unregister', protect, unregisterTeamFromTournament);

// Organizer management routes
router.put('/:id/registrations/:teamId/approve', protect, authorize('organizer'), approveTournamentRegistration);
router.put('/:id/registrations/:teamId/reject', protect, authorize('organizer'), rejectTournamentRegistration);
router.put('/:id/bracket', protect, authorize('organizer'), updateTournamentBracket);

export default router;
