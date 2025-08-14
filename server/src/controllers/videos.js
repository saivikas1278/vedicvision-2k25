import { validationResult } from 'express-validator';
import VideoPost from '../models/VideoPost.js';
import User from '../models/User.js';
import { uploadVideoToCloudinary, generateVideoThumbnail, deleteFromCloudinary } from '../config/cloudinary.js';

// @desc    Get all videos
// @route   GET /api/videos
// @access  Public
export const getVideos = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12;
    const startIndex = (page - 1) * limit;

    let query = { status: 'published', visibility: 'public' };

    // Filters
    if (req.query.category) {
      query.category = req.query.category;
    }

    if (req.query.sport) {
      query.sport = req.query.sport;
    }

    if (req.query.author) {
      query.author = req.query.author;
    }

    if (req.query.tournament) {
      query.tournament = req.query.tournament;
    }

    // Sort options
    let sortOption = { createdAt: -1 }; // Default: newest first
    
    if (req.query.sort === 'views') {
      sortOption = { views: -1 };
    } else if (req.query.sort === 'likes') {
      sortOption = { 'likes': { $size: -1 } };
    } else if (req.query.sort === 'oldest') {
      sortOption = { createdAt: 1 };
    }

    const videos = await VideoPost.find(query)
      .populate('author', 'firstName lastName avatar')
      .populate('tournament', 'name sport')
      .populate('team', 'name logo')
      .sort(sortOption)
      .limit(limit * 1)
      .skip(startIndex);

    const total = await VideoPost.countDocuments(query);

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
      count: videos.length,
      total,
      pagination,
      data: videos
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single video
// @route   GET /api/videos/:id
// @access  Public
export const getVideo = async (req, res, next) => {
  try {
    const video = await VideoPost.findById(req.params.id)
      .populate('author', 'firstName lastName avatar')
      .populate('tournament', 'name sport')
      .populate('team', 'name logo')
      .populate('comments.user', 'firstName lastName avatar')
      .populate('comments.replies.user', 'firstName lastName avatar');

    if (!video) {
      return res.status(404).json({
        success: false,
        error: 'Video not found'
      });
    }

    // Check if user can view private video
    if (video.visibility === 'private' && (!req.user || req.user.id !== video.author._id.toString())) {
      return res.status(403).json({
        success: false,
        error: 'Access denied to private video'
      });
    }

    // Increment view count (only once per user session)
    if (!req.session || !req.session.viewedVideos || !req.session.viewedVideos.includes(video._id.toString())) {
      await video.incrementViews();
      
      // Track viewed videos in session
      if (!req.session) req.session = {};
      if (!req.session.viewedVideos) req.session.viewedVideos = [];
      req.session.viewedVideos.push(video._id.toString());
    }

    res.status(200).json({
      success: true,
      data: video
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload video
// @route   POST /api/videos/upload
// @access  Private
export const uploadVideo = async (req, res, next) => {
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

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No video file provided'
      });
    }

    // Upload video to Cloudinary
    const uploadResult = await uploadVideoToCloudinary(req.file.buffer, {
      folder: `sportsphere/videos/${req.user.id}`,
      public_id: `video_${Date.now()}`
    });

    // Generate thumbnail
    const thumbnailUrl = await generateVideoThumbnail(uploadResult.secure_url);

    // Create video post
    const videoData = {
      ...req.body,
      author: req.user.id,
      videoUrl: uploadResult.secure_url,
      thumbnailUrl,
      duration: uploadResult.duration || 0,
      fileSize: uploadResult.bytes,
      cloudinaryPublicId: uploadResult.public_id,
      quality: {
        resolution: uploadResult.width && uploadResult.height ? `${uploadResult.height}p` : 'unknown',
        format: uploadResult.format
      }
    };

    const video = await VideoPost.create(videoData);

    // Populate video data
    await video.populate('author', 'firstName lastName avatar');

    res.status(201).json({
      success: true,
      data: video
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update video
// @route   PUT /api/videos/:id
// @access  Private
export const updateVideo = async (req, res, next) => {
  try {
    let video = await VideoPost.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        error: 'Video not found'
      });
    }

    // Make sure user owns the video
    if (video.author.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this video'
      });
    }

    const fieldsToUpdate = {};
    const allowedFields = [
      'title', 'description', 'category', 'sport', 'tags', 
      'visibility', 'tournament', 'match', 'team'
    ];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        fieldsToUpdate[field] = req.body[field];
      }
    });

    video = await VideoPost.findByIdAndUpdate(req.params.id, fieldsToUpdate, {
      new: true,
      runValidators: true
    }).populate('author', 'firstName lastName avatar');

    res.status(200).json({
      success: true,
      data: video
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete video
// @route   DELETE /api/videos/:id
// @access  Private
export const deleteVideo = async (req, res, next) => {
  try {
    const video = await VideoPost.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        error: 'Video not found'
      });
    }

    // Make sure user owns the video
    if (video.author.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to delete this video'
      });
    }

    // Delete from Cloudinary
    if (video.cloudinaryPublicId) {
      await deleteFromCloudinary(video.cloudinaryPublicId, 'video');
    }

    await video.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Video deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Like/Unlike video
// @route   POST /api/videos/:id/like
// @access  Private
export const likeVideo = async (req, res, next) => {
  try {
    const video = await VideoPost.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        error: 'Video not found'
      });
    }

    await video.addLike(req.user.id);

    res.status(200).json({
      success: true,
      message: 'Video like status updated',
      likeCount: video.likeCount,
      dislikeCount: video.dislikeCount
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Dislike/Remove dislike video
// @route   POST /api/videos/:id/dislike
// @access  Private
export const dislikeVideo = async (req, res, next) => {
  try {
    const video = await VideoPost.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        error: 'Video not found'
      });
    }

    await video.addDislike(req.user.id);

    res.status(200).json({
      success: true,
      message: 'Video dislike status updated',
      likeCount: video.likeCount,
      dislikeCount: video.dislikeCount
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Comment on video
// @route   POST /api/videos/:id/comments
// @access  Private
export const commentOnVideo = async (req, res, next) => {
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

    const video = await VideoPost.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        error: 'Video not found'
      });
    }

    await video.addComment(req.user.id, req.body.content);

    // Populate the new comment
    await video.populate('comments.user', 'firstName lastName avatar');

    const newComment = video.comments[video.comments.length - 1];

    res.status(201).json({
      success: true,
      data: newComment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reply to comment
// @route   POST /api/videos/:id/comments/:commentId/reply
// @access  Private
export const replyToComment = async (req, res, next) => {
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

    const video = await VideoPost.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        error: 'Video not found'
      });
    }

    const comment = video.comments.id(req.params.commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        error: 'Comment not found'
      });
    }

    comment.replies.push({
      user: req.user.id,
      content: req.body.content
    });

    await video.save();

    // Populate the new reply
    await video.populate('comments.replies.user', 'firstName lastName avatar');

    const updatedComment = video.comments.id(req.params.commentId);

    res.status(201).json({
      success: true,
      data: updatedComment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete comment
// @route   DELETE /api/videos/:id/comments/:commentId
// @access  Private
export const deleteComment = async (req, res, next) => {
  try {
    const video = await VideoPost.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        error: 'Video not found'
      });
    }

    const comment = video.comments.id(req.params.commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        error: 'Comment not found'
      });
    }

    // Only comment author or video author can delete
    if (comment.user.toString() !== req.user.id && video.author.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to delete this comment'
      });
    }

    comment.deleteOne();
    await video.save();

    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Bookmark/Unbookmark video
// @route   POST /api/videos/:id/bookmark
// @access  Private
export const bookmarkVideo = async (req, res, next) => {
  try {
    const video = await VideoPost.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        error: 'Video not found'
      });
    }

    const existingBookmark = video.bookmarks.find(
      bookmark => bookmark.user.toString() === req.user.id
    );

    if (existingBookmark) {
      // Remove bookmark
      video.bookmarks = video.bookmarks.filter(
        bookmark => bookmark.user.toString() !== req.user.id
      );
    } else {
      // Add bookmark
      video.bookmarks.push({ user: req.user.id });
    }

    await video.save();

    res.status(200).json({
      success: true,
      message: existingBookmark ? 'Video unbookmarked' : 'Video bookmarked',
      bookmarked: !existingBookmark
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get trending videos
// @route   GET /api/videos/trending
// @access  Public
export const getTrendingVideos = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 12;
    
    // Calculate trending score based on views, likes, and recency
    const videos = await VideoPost.aggregate([
      {
        $match: {
          status: 'published',
          visibility: 'public',
          createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } // Last 7 days
        }
      },
      {
        $addFields: {
          likeCount: { $size: '$likes' },
          commentCount: { $size: '$comments' },
          trendingScore: {
            $add: [
              { $multiply: ['$views', 1] },
              { $multiply: [{ $size: '$likes' }, 5] },
              { $multiply: [{ $size: '$comments' }, 3] }
            ]
          }
        }
      },
      {
        $sort: { trendingScore: -1 }
      },
      {
        $limit: limit
      }
    ]);

    // Populate author and other fields
    await VideoPost.populate(videos, [
      { path: 'author', select: 'firstName lastName avatar' },
      { path: 'tournament', select: 'name sport' },
      { path: 'team', select: 'name logo' }
    ]);

    res.status(200).json({
      success: true,
      count: videos.length,
      data: videos
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user videos
// @route   GET /api/videos/user/:userId
// @access  Public
export const getUserVideos = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12;
    const startIndex = (page - 1) * limit;

    let query = {
      author: req.params.userId,
      status: 'published'
    };

    // If not the video owner, only show public videos
    if (!req.user || req.user.id !== req.params.userId) {
      query.visibility = 'public';
    }

    const videos = await VideoPost.find(query)
      .populate('author', 'firstName lastName avatar')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip(startIndex);

    const total = await VideoPost.countDocuments(query);

    res.status(200).json({
      success: true,
      count: videos.length,
      total,
      data: videos
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Search videos
// @route   GET /api/videos/search
// @access  Public
export const searchVideos = async (req, res, next) => {
  try {
    const { q, category, sport, author } = req.query;
    const limit = parseInt(req.query.limit, 10) || 12;

    let query = {
      status: 'published',
      visibility: 'public'
    };

    // Text search
    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } }
      ];
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    // Sport filter
    if (sport) {
      query.sport = sport;
    }

    // Author filter
    if (author) {
      query.author = author;
    }

    const videos = await VideoPost.find(query)
      .populate('author', 'firstName lastName avatar')
      .populate('tournament', 'name sport')
      .sort({ views: -1, createdAt: -1 })
      .limit(limit);

    res.status(200).json({
      success: true,
      count: videos.length,
      data: videos
    });
  } catch (error) {
    next(error);
  }
};
