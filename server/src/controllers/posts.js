import Post from '../models/Post.js';
import User from '../models/User.js';
import Notification from '../models/Notification.js';
import cloudinary from '../config/cloudinary.js';
import notificationUtils from '../utils/notificationUtils.js';

// @desc    Get all posts with filters
// @route   GET /api/posts
// @access  Public
export const getPosts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = '-createdAt',
      type,
      sport,
      author,
      search,
      tags,
      featured,
      privacy = 'public'
    } = req.query;

    // Build query
    const query = { privacy, isArchived: false };

    if (type) query.type = type;
    if (sport) query.sport = sport;
    if (author) query.author = author;
    if (featured) query.isFeatured = featured === 'true';
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      query.tags = { $in: tagArray };
    }

    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }

    const posts = await Post.find(query)
      .populate('author', 'firstName lastName avatar isVerified')
      .populate('comments.user', 'firstName lastName avatar')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    // Add isLikedByUser for authenticated users
    const userId = req.user?.id;
    const postsWithLikes = posts.map(post => ({
      ...post,
      isLikedByUser: userId ? post.likes.some(like => like.user.toString() === userId) : false,
      likesCount: post.likes.length,
      commentsCount: post.comments.length
    }));

    const total = await Post.countDocuments(query);

    res.json({
      success: true,
      data: {
        posts: postsWithLikes,
        pagination: {
          page: parseInt(page),
          pages: Math.ceil(total / limit),
          total,
          limit: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch posts'
    });
  }
};

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'firstName lastName avatar isVerified')
      .populate('comments.user', 'firstName lastName avatar')
      .populate('comments.replies.user', 'firstName lastName avatar');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Increment views
    await post.incrementViews();

    const userId = req.user?.id;
    const postData = {
      ...post.toObject(),
      isLikedByUser: userId ? post.likes.some(like => like.user.toString() === userId) : false,
      likesCount: post.likes.length,
      commentsCount: post.comments.length
    };

    res.json({
      success: true,
      data: postData
    });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch post'
    });
  }
};

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
  try {
    const { title, content, type, sport, tags, privacy = 'public' } = req.body;

    const postData = {
      title,
      content,
      type,
      sport,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      privacy,
      author: req.user.id
    };

    // Handle file uploads
    if (req.files?.images) {
      const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
      postData.images = [];

      for (const image of images) {
        const result = await cloudinary.uploader.upload(image.tempFilePath, {
          folder: 'posts/images',
          resource_type: 'image',
          transformation: [
            { width: 1200, height: 1200, crop: 'limit' },
            { quality: 'auto:good' }
          ]
        });

        postData.images.push({
          url: result.secure_url,
          publicId: result.public_id,
          alt: title
        });
      }
    }

    if (req.files?.videos) {
      const videos = Array.isArray(req.files.videos) ? req.files.videos : [req.files.videos];
      postData.videos = [];

      for (const video of videos) {
        const result = await cloudinary.uploader.upload(video.tempFilePath, {
          folder: 'posts/videos',
          resource_type: 'video',
          transformation: [
            { width: 1280, height: 720, crop: 'limit' },
            { quality: 'auto:good' }
          ]
        });

        postData.videos.push({
          url: result.secure_url,
          publicId: result.public_id,
          thumbnail: result.secure_url.replace('.mp4', '.jpg'),
          duration: result.duration
        });
      }
    }

    const post = new Post(postData);
    await post.save();

    await post.populate('author', 'firstName lastName avatar isVerified');

    // Update user's post count
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { 'statistics.totalPosts': 1 }
    });

    res.status(201).json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create post'
    });
  }
};

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Check ownership
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this post'
      });
    }

    const { title, content, type, sport, tags, privacy } = req.body;
    const updates = {};

    if (title) updates.title = title;
    if (content) updates.content = content;
    if (type) updates.type = type;
    if (sport) updates.sport = sport;
    if (tags) updates.tags = tags.split(',').map(tag => tag.trim());
    if (privacy) updates.privacy = privacy;

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).populate('author', 'firstName lastName avatar isVerified');

    res.json({
      success: true,
      data: updatedPost
    });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update post'
    });
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Check ownership
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this post'
      });
    }

    // Delete images from cloudinary
    if (post.images?.length) {
      for (const image of post.images) {
        await cloudinary.uploader.destroy(image.publicId);
      }
    }

    // Delete videos from cloudinary
    if (post.videos?.length) {
      for (const video of post.videos) {
        await cloudinary.uploader.destroy(video.publicId, { resource_type: 'video' });
      }
    }

    await Post.findByIdAndDelete(req.params.id);

    // Update user's post count
    await User.findByIdAndUpdate(post.author, {
      $inc: { 'statistics.totalPosts': -1 }
    });

    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete post'
    });
  }
};

// @desc    Like/unlike post
// @route   POST /api/posts/:id/like
// @access  Private
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    const isLiked = post.like(req.user.id);
    await post.save();

    // Create notification for post author (if not self)
    if (isLiked && post.author.toString() !== req.user.id) {
      const io = req.app.get('io');
      try {
        await notificationUtils.createLikeNotification(
          post.author,
          req.user.id,
          post._id,
          io
        );
      } catch (notificationError) {
        console.error('Failed to create like notification:', notificationError);
        // Don't fail the like operation if notification fails
      }
    }

    res.json({
      success: true,
      data: {
        isLiked,
        likesCount: post.likes.length
      }
    });
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to like post'
    });
  }
};

// @desc    Add comment to post
// @route   POST /api/posts/:id/comments
// @access  Private
export const addComment = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Comment content is required'
      });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    const comment = post.addComment(req.user.id, content.trim());
    await post.save();

    await post.populate('comments.user', 'firstName lastName avatar');

    // Create notification for post author (if not self)
    if (post.author.toString() !== req.user.id) {
      const io = req.app.get('io');
      try {
        await notificationUtils.createCommentNotification(
          post.author,
          req.user.id,
          post._id,
          io
        );
      } catch (notificationError) {
        console.error('Failed to create comment notification:', notificationError);
        // Don't fail the comment operation if notification fails
      }
    }

    res.status(201).json({
      success: true,
      data: comment
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add comment'
    });
  }
};

// @desc    Get user's posts
// @route   GET /api/posts/user/:userId
// @access  Public
export const getUserPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const userId = req.params.userId;

    const posts = await Post.find({ 
      author: userId, 
      privacy: { $in: ['public', 'friends'] },
      isArchived: false 
    })
      .populate('author', 'firstName lastName avatar isVerified')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Post.countDocuments({ 
      author: userId, 
      privacy: { $in: ['public', 'friends'] },
      isArchived: false 
    });

    res.json({
      success: true,
      data: {
        posts,
        pagination: {
          page: parseInt(page),
          pages: Math.ceil(total / limit),
          total,
          limit: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get user posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user posts'
    });
  }
};

// @desc    Share post
// @route   POST /api/posts/:id/share
// @access  Private
export const sharePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { shares: 1 } },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.json({
      success: true,
      data: {
        shares: post.shares
      }
    });
  } catch (error) {
    console.error('Share post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to share post'
    });
  }
};
