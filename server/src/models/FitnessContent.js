import mongoose from 'mongoose';

const fitnessContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['strength', 'cardio', 'flexibility', 'yoga', 'pilates', 'meditation', 'dance', 'martial-arts', 'sports-specific', 'rehabilitation']
  },
  subCategory: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'all-levels']
  },
  type: {
    type: String,
    required: true,
    enum: ['video', 'article', 'workout-plan', 'challenge']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'advanced']
  },
  duration: {
    type: Number, // in minutes
    required: function() {
      return this.type === 'video' || this.type === 'workout-plan';
    }
  },
  equipment: [{
    type: String,
    enum: ['none', 'dumbbells', 'resistance-bands', 'yoga-mat', 'kettlebell', 'barbell', 'medicine-ball', 'stability-ball', 'pull-up-bar', 'treadmill', 'stationary-bike', 'other']
  }],
  targetMuscles: [{
    type: String,
    enum: ['chest', 'back', 'shoulders', 'biceps', 'triceps', 'abs', 'core', 'legs', 'glutes', 'calves', 'full-body', 'cardio']
  }],
  goals: [{
    type: String,
    enum: ['weight-loss', 'muscle-gain', 'strength', 'endurance', 'flexibility', 'balance', 'coordination', 'stress-relief', 'rehabilitation']
  }],
  videoUrl: {
    type: String,
    required: function() {
      return this.type === 'video';
    }
  },
  thumbnailUrl: {
    type: String,
    required: function() {
      return this.type === 'video';
    }
  },
  content: {
    type: String, // Rich text content for articles
    required: function() {
      return this.type === 'article';
    }
  },
  exercises: [{
    name: String,
    description: String,
    sets: Number,
    reps: String, // Can be number or range like "10-12"
    duration: Number, // in seconds for time-based exercises
    restPeriod: Number, // in seconds
    instructions: [String],
    imageUrl: String,
    videoUrl: String,
    targetMuscles: [String],
    difficulty: String
  }],
  workoutStructure: {
    warmUp: {
      duration: Number,
      exercises: [String]
    },
    mainWorkout: {
      duration: Number,
      rounds: Number,
      exercises: [String]
    },
    coolDown: {
      duration: Number,
      exercises: [String]
    }
  },
  caloriesBurned: {
    min: Number,
    max: Number,
    average: Number
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [30, 'Tag cannot exceed 30 characters']
  }],
  isPublished: {
    type: Boolean,
    default: false
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  completions: {
    type: Number,
    default: 0
  },
  ratings: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, min: 1, max: 5 },
    review: String,
    createdAt: { type: Date, default: Date.now }
  }],
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  bookmarks: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bookmarkedAt: { type: Date, default: Date.now }
  }],
  userProgress: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    completedAt: Date,
    progress: { type: Number, min: 0, max: 100 }, // percentage
    timeSpent: Number, // in minutes
    notes: String
  }],
  prerequisites: [String],
  warnings: [String],
  benefits: [String],
  tips: [String],
  variations: [{
    name: String,
    description: String,
    difficulty: String
  }],
  series: {
    seriesId: { type: mongoose.Schema.Types.ObjectId, ref: 'FitnessContent' },
    episode: Number,
    seriesName: String
  }
}, {
  timestamps: true
});

// Virtual for rating count
fitnessContentSchema.virtual('ratingCount').get(function() {
  return this.ratings.length;
});

// Virtual for completion rate
fitnessContentSchema.virtual('completionRate').get(function() {
  return this.views > 0 ? ((this.completions / this.views) * 100).toFixed(2) : 0;
});

// Method to add rating
fitnessContentSchema.methods.addRating = function(userId, rating, review = '') {
  // Remove existing rating from same user
  this.ratings = this.ratings.filter(r => r.user.toString() !== userId.toString());
  
  // Add new rating
  this.ratings.push({
    user: userId,
    rating,
    review
  });
  
  // Recalculate average rating
  const totalRating = this.ratings.reduce((sum, r) => sum + r.rating, 0);
  this.averageRating = totalRating / this.ratings.length;
  
  return this.save();
};

// Method to bookmark
fitnessContentSchema.methods.toggleBookmark = function(userId) {
  const existingBookmark = this.bookmarks.find(b => b.user.toString() === userId.toString());
  
  if (existingBookmark) {
    // Remove bookmark
    this.bookmarks = this.bookmarks.filter(b => b.user.toString() !== userId.toString());
  } else {
    // Add bookmark
    this.bookmarks.push({ user: userId });
  }
  
  return this.save();
};

// Method to track progress
fitnessContentSchema.methods.updateProgress = function(userId, progress, timeSpent, notes = '') {
  let userProgressEntry = this.userProgress.find(up => up.user.toString() === userId.toString());
  
  if (userProgressEntry) {
    userProgressEntry.progress = progress;
    userProgressEntry.timeSpent = timeSpent;
    userProgressEntry.notes = notes;
    if (progress === 100) {
      userProgressEntry.completedAt = new Date();
      this.completions += 1;
    }
  } else {
    this.userProgress.push({
      user: userId,
      progress,
      timeSpent,
      notes,
      completedAt: progress === 100 ? new Date() : null
    });
    if (progress === 100) {
      this.completions += 1;
    }
  }
  
  return this.save();
};

// Method to increment views
fitnessContentSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save({ validateBeforeSave: false });
};

// Indexes
fitnessContentSchema.index({ instructor: 1 });
fitnessContentSchema.index({ category: 1, difficulty: 1 });
fitnessContentSchema.index({ type: 1, isPublished: 1 });
fitnessContentSchema.index({ tags: 1 });
fitnessContentSchema.index({ averageRating: -1 });
fitnessContentSchema.index({ views: -1 });
fitnessContentSchema.index({ createdAt: -1 });

export default mongoose.model('FitnessContent', fitnessContentSchema);
