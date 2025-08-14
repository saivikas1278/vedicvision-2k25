import express from 'express';
import multer from 'multer';
import { body } from 'express-validator';
import {
  getVideos,
  getVideo,
  uploadVideo,
  updateVideo,
  deleteVideo,
  likeVideo,
  dislikeVideo,
  commentOnVideo,
  replyToComment,
  deleteComment,
  bookmarkVideo,
  getTrendingVideos,
  getUserVideos,
  searchVideos
} from '../controllers/videos.js';
import { protect, optional } from '../middleware/auth.js';

const router = express.Router();

// Configure multer for video uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed'), false);
    }
  }
});

// Video validation rules
const videoValidation = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('Title must be between 3 and 200 characters'),
  body('description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
  body('category')
    .isIn(['highlights', 'skills', 'training', 'match-replay', 'tutorial', 'motivation', 'behind-scenes', 'other'])
    .withMessage('Invalid category'),
  body('sport')
    .isIn(['football', 'basketball', 'cricket', 'tennis', 'badminton', 'volleyball', 'table-tennis', 'chess', 'fitness', 'yoga', 'other'])
    .withMessage('Invalid sport'),
  body('visibility')
    .optional()
    .isIn(['public', 'private', 'unlisted'])
    .withMessage('Invalid visibility setting')
];

const commentValidation = [
  body('content')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Comment must be between 1 and 500 characters')
];

// Public routes
router.get('/', optional, getVideos);
router.get('/trending', getTrendingVideos);
router.get('/search', searchVideos);
router.get('/:id', optional, getVideo);

// Protected routes
router.post('/upload', protect, upload.single('video'), videoValidation, uploadVideo);
router.put('/:id', protect, updateVideo);
router.delete('/:id', protect, deleteVideo);

// Interaction routes
router.post('/:id/like', protect, likeVideo);
router.post('/:id/dislike', protect, dislikeVideo);
router.post('/:id/comments', protect, commentValidation, commentOnVideo);
router.post('/:id/comments/:commentId/reply', protect, commentValidation, replyToComment);
router.delete('/:id/comments/:commentId', protect, deleteComment);
router.post('/:id/bookmark', protect, bookmarkVideo);

// User videos
router.get('/user/:userId', getUserVideos);

export default router;
