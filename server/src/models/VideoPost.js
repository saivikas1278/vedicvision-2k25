import mongoose from 'mongoose';

const videoPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Video title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  videoUrl: {
    type: String,
    required: [true, 'Video URL is required']
  },
  thumbnailUrl: {
    type: String,
    required: [true, 'Thumbnail URL is required']
  },
  duration: {
    type: Number, // in seconds
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['highlights', 'skills', 'training', 'match-replay', 'tutorial', 'motivation', 'behind-scenes', 'other']
  },
  sport: {
    type: String,
    required: true,
    enum: ['football', 'basketball', 'cricket', 'tennis', 'badminton', 'volleyball', 'table-tennis', 'chess', 'fitness', 'yoga', 'other']
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [30, 'Tag cannot exceed 30 characters']
  }],
  tournament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tournament',
    default: null
  },
  match: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match',
    default: null
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    default: null
  },
  visibility: {
    type: String,
    enum: ['public', 'private', 'unlisted'],
    default: 'public'
  },
  status: {
    type: String,
    enum: ['processing', 'published', 'failed', 'removed'],
    default: 'processing'
  },
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likedAt: { type: Date, default: Date.now }
  }],
  dislikes: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dislikedAt: { type: Date, default: Date.now }
  }],
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: {
      type: String,
      required: true,
      maxlength: [500, 'Comment cannot exceed 500 characters']
    },
    replies: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      content: {
        type: String,
        required: true,
        maxlength: [500, 'Reply cannot exceed 500 characters']
      },
      createdAt: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now }
  }],
  shares: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    platform: String,
    sharedAt: { type: Date, default: Date.now }
  }],
  bookmarks: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bookmarkedAt: { type: Date, default: Date.now }
  }],
  quality: {
    resolution: String, // '720p', '1080p', '4K'
    bitrate: Number,
    format: String // 'mp4', 'webm'
  },
  fileSize: {
    type: Number // in bytes
  },
  uploadProgress: {
    type: Number,
    min: 0,
    max: 100,
    default: 100
  },
  processingProgress: {
    type: Number,
    min: 0,
    max: 100,
    default: 100
  },
  cloudinaryPublicId: {
    type: String
  },
  isLive: {
    type: Boolean,
    default: false
  },
  liveStreamUrl: {
    type: String
  },
  scheduledPublishAt: {
    type: Date
  },
  analytics: {
    watchTime: { type: Number, default: 0 }, // total watch time in seconds
    averageWatchTime: { type: Number, default: 0 },
    completionRate: { type: Number, default: 0 },
    clickThroughRate: { type: Number, default: 0 },
    engagement: { type: Number, default: 0 } // likes + comments + shares
  }
}, {
  timestamps: true
});

// Virtual for like count
videoPostSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Virtual for dislike count
videoPostSchema.virtual('dislikeCount').get(function() {
  return this.dislikes.length;
});

// Virtual for comment count
videoPostSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

// Virtual for engagement score
videoPostSchema.virtual('engagementScore').get(function() {
  const totalInteractions = this.likes.length + this.comments.length + this.shares.length;
  return this.views > 0 ? (totalInteractions / this.views * 100).toFixed(2) : 0;
});

// Method to add like
videoPostSchema.methods.addLike = function(userId) {
  // Remove from dislikes if exists
  this.dislikes = this.dislikes.filter(dislike => dislike.user.toString() !== userId.toString());
  
  // Check if already liked
  const existingLike = this.likes.find(like => like.user.toString() === userId.toString());
  if (existingLike) {
    // Remove like
    this.likes = this.likes.filter(like => like.user.toString() !== userId.toString());
  } else {
    // Add like
    this.likes.push({ user: userId });
  }
  
  return this.save();
};

// Method to add dislike
videoPostSchema.methods.addDislike = function(userId) {
  // Remove from likes if exists
  this.likes = this.likes.filter(like => like.user.toString() !== userId.toString());
  
  // Check if already disliked
  const existingDislike = this.dislikes.find(dislike => dislike.user.toString() === userId.toString());
  if (existingDislike) {
    // Remove dislike
    this.dislikes = this.dislikes.filter(dislike => dislike.user.toString() !== userId.toString());
  } else {
    // Add dislike
    this.dislikes.push({ user: userId });
  }
  
  return this.save();
};

// Method to add comment
videoPostSchema.methods.addComment = function(userId, content) {
  this.comments.push({
    user: userId,
    content
  });
  return this.save();
};

// Method to increment views
videoPostSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save({ validateBeforeSave: false });
};

// Indexes
videoPostSchema.index({ author: 1 });
videoPostSchema.index({ sport: 1, category: 1 });
videoPostSchema.index({ tags: 1 });
videoPostSchema.index({ tournament: 1 });
videoPostSchema.index({ visibility: 1, status: 1 });
videoPostSchema.index({ createdAt: -1 });
videoPostSchema.index({ views: -1 });

export default mongoose.model('VideoPost', videoPostSchema);
