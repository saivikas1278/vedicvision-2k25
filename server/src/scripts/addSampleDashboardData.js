import mongoose from 'mongoose';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Tournament from '../models/Tournament.js';
import Match from '../models/Match.js';
import FitnessContent from '../models/FitnessContent.js';
import dotenv from 'dotenv';

dotenv.config();

const addSampleDashboardData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sportsphere');
    console.log('Connected to MongoDB');

    // Find the first user (assuming it's the logged-in user)
    const user = await User.findOne();
    if (!user) {
      console.log('No users found. Please create a user first.');
      return;
    }

    console.log(`Adding sample data for user: ${user.firstName} ${user.lastName}`);

    // Create sample tournaments first
    const tournament1 = new Tournament({
      name: 'Summer Cricket Championship',
      description: 'The biggest cricket tournament of the summer!',
      sport: 'cricket',
      organizer: user._id,
      format: 'single-elimination',
      maxTeams: 16,
      registrationFee: 500,
      prizePool: {
        total: 10000,
        distribution: [
          { position: 1, amount: 5000, percentage: 50 },
          { position: 2, amount: 3000, percentage: 30 },
          { position: 3, amount: 2000, percentage: 20 }
        ]
      },
      venue: {
        name: 'Central Sports Complex',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India'
      },
      dates: {
        registrationStart: new Date(),
        registrationEnd: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        tournamentStart: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        tournamentEnd: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
      },
      status: 'open',
      participants: [user._id]
    });

    const tournament2 = new Tournament({
      name: 'Football Premier League',
      description: 'Professional football league with top prizes!',
      sport: 'football',
      organizer: user._id,
      format: 'league',
      maxTeams: 12,
      registrationFee: 1000,
      prizePool: {
        total: 25000,
        distribution: [
          { position: 1, amount: 12500, percentage: 50 },
          { position: 2, amount: 7500, percentage: 30 },
          { position: 3, amount: 5000, percentage: 20 }
        ]
      },
      venue: {
        name: 'Sports Stadium',
        city: 'Delhi',
        state: 'Delhi',
        country: 'India'
      },
      dates: {
        registrationStart: new Date(),
        registrationEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        tournamentStart: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
        tournamentEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
      },
      status: 'open',
      participants: [user._id]
    });

    await tournament1.save();
    await tournament2.save();
    console.log('Created sample tournaments');

    // Create sample teams
    const team1 = new Team({
      name: 'Thunder Bolts',
      sport: 'cricket',
      captain: user._id,
      tournament: tournament1._id,
      players: [
        { user: user._id, role: 'captain', position: 'Captain' }
      ],
      description: 'A dynamic cricket team ready for any challenge!',
      homeVenue: {
        name: 'Local Cricket Ground',
        city: 'Mumbai',
        state: 'Maharashtra'
      }
    });

    const team2 = new Team({
      name: 'Fire Eagles',
      sport: 'football',
      captain: user._id,
      tournament: tournament2._id,
      players: [
        { user: user._id, role: 'captain', position: 'Striker' }
      ],
      description: 'Fast-paced football team with winning spirit!',
      homeVenue: {
        name: 'Football Stadium',
        city: 'Delhi',
        state: 'Delhi'
      }
    });

    await team1.save();
    await team2.save();
    console.log('Created sample teams');

    // Create sample matches
    const match1 = new Match({
      tournament: tournament1._id,
      round: 'quarter-final',
      matchNumber: 1,
      homeTeam: team1._id,
      awayTeam: team1._id, // Using same team for simplicity
      scheduledTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      venue: {
        name: 'Local Cricket Ground',
        city: 'Mumbai',
        state: 'Maharashtra'
      },
      status: 'completed',
      score: {
        home: 180,
        away: 175
      }
    });

    await match1.save();
    console.log('Created sample matches');

    // Create sample fitness content
    const workout1 = new FitnessContent({
      title: 'Morning Cardio Blast',
      description: 'High-intensity cardio workout to start your day',
      instructor: user._id,
      category: 'cardio',
      subCategory: 'intermediate',
      type: 'workout-plan',
      difficulty: 'intermediate',
      duration: 30,
      equipment: ['none'],
      targetMuscles: ['cardio', 'full-body'],
      exercises: [
        {
          name: 'Jumping Jacks',
          duration: 60,
          sets: 3,
          description: 'Full body warm-up exercise'
        },
        {
          name: 'Burpees',
          duration: 45,
          sets: 3,
          description: 'High-intensity full body exercise'
        }
      ],
      completedBy: [
        {
          user: user._id,
          completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
          duration: 28
        }
      ]
    });

    const video1 = new FitnessContent({
      title: 'Sports Training Video',
      description: 'Learn proper sports techniques and movements',
      instructor: user._id,
      category: 'sports-specific',
      subCategory: 'beginner',
      type: 'video',
      difficulty: 'beginner',
      duration: 15,
      equipment: ['none'],
      targetMuscles: ['full-body'],
      videoUrl: 'https://example.com/sports-training-video.mp4',
      thumbnailUrl: 'https://example.com/sports-training-thumb.jpg',
      completedBy: [
        {
          user: user._id,
          completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
          duration: 15
        }
      ]
    });

    await workout1.save();
    await video1.save();
    console.log('Created sample fitness content');

    // Update user stats
    await User.findByIdAndUpdate(user._id, {
      $set: {
        'stats.matchesPlayed': 3,
        'stats.matchesWon': 2,
        'stats.tournamentsParticipated': 2,
        'stats.tournamentsWon': 1
      }
    });
    console.log('Updated user stats');

    console.log('✅ Sample dashboard data added successfully!');
    console.log(`User: ${user.firstName} ${user.lastName} now has:`);
    console.log('- 2 teams');
    console.log('- 2 tournaments');
    console.log('- 1 completed workout');
    console.log('- 1 watched video');
    console.log('- Updated match and tournament stats');

  } catch (error) {
    console.error('Error adding sample data:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Run the script
addSampleDashboardData();
