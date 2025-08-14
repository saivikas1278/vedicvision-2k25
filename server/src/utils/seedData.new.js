import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Tournament from '../models/Tournament.js';
import Team from '../models/Team.js';
import Match from '../models/Match.js';
import Scorecard from '../models/Scorecard.js';
import FitnessContent from '../models/FitnessContent.js';
import VideoPost from '../models/VideoPost.js';

const sampleData = {
  users: [
    // Players for Mumbai Mavericks
    {
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@example.com',
      password: 'Test@123',
      role: 'player',
      sports: [{ name: 'cricket', position: 'Batsman', experience: 'advanced' }],
      location: { city: 'Mumbai', state: 'Maharashtra', country: 'India' }
    },
    {
      firstName: 'Raj',
      lastName: 'Patel',
      email: 'raj.patel@example.com',
      password: 'Test@123',
      role: 'player',
      sports: [{ name: 'cricket', position: 'Bowler', experience: 'advanced' }],
      location: { city: 'Mumbai', state: 'Maharashtra', country: 'India' }
    },
    {
      firstName: 'Suresh',
      lastName: 'Kumar',
      email: 'suresh@example.com',
      password: 'Test@123',
      role: 'player',
      sports: [{ name: 'cricket', position: 'All-rounder', experience: 'advanced' }],
      location: { city: 'Mumbai', state: 'Maharashtra', country: 'India' }
    },
    // Players for Delhi Dragons
    {
      firstName: 'Amit',
      lastName: 'Sharma',
      email: 'amit@example.com',
      password: 'Test@123',
      role: 'player',
      sports: [{ name: 'cricket', position: 'Batsman', experience: 'professional' }],
      location: { city: 'Delhi', state: 'Delhi', country: 'India' }
    },
    {
      firstName: 'Virat',
      lastName: 'Kumar',
      email: 'virat@example.com',
      password: 'Test@123',
      role: 'player',
      sports: [{ name: 'cricket', position: 'Bowler', experience: 'professional' }],
      location: { city: 'Delhi', state: 'Delhi', country: 'India' }
    },
    {
      firstName: 'Rohit',
      lastName: 'Singh',
      email: 'rohit@example.com',
      password: 'Test@123',
      role: 'player',
      sports: [{ name: 'cricket', position: 'All-rounder', experience: 'professional' }],
      location: { city: 'Delhi', state: 'Delhi', country: 'India' }
    },
    // Players for Pune Panthers
    {
      firstName: 'Ajay',
      lastName: 'Deshmukh',
      email: 'ajay@example.com',
      password: 'Test@123',
      role: 'player',
      sports: [{ name: 'cricket', position: 'Batsman', experience: 'advanced' }],
      location: { city: 'Pune', state: 'Maharashtra', country: 'India' }
    },
    {
      firstName: 'Prashant',
      lastName: 'Wagh',
      email: 'prashant@example.com',
      password: 'Test@123',
      role: 'player',
      sports: [{ name: 'cricket', position: 'Bowler', experience: 'advanced' }],
      location: { city: 'Pune', state: 'Maharashtra', country: 'India' }
    },
    {
      firstName: 'Sanjay',
      lastName: 'More',
      email: 'sanjay@example.com',
      password: 'Test@123',
      role: 'player',
      sports: [{ name: 'cricket', position: 'All-rounder', experience: 'advanced' }],
      location: { city: 'Pune', state: 'Maharashtra', country: 'India' }
    },
    // Tournament Organizers
    {
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah@example.com',
      password: 'Test@123',
      role: 'organizer',
      sports: [{ name: 'cricket', position: 'Manager', experience: 'professional' }],
      location: { city: 'Mumbai', state: 'Maharashtra', country: 'India' }
    }
  ],
  tournaments: [
    {
      name: 'Mumbai Premier League 2025',
      description: 'The biggest T20 cricket tournament in Mumbai',
      sport: 'cricket',
      maxTeams: 8,
      venue: {
        name: 'Mumbai Cricket Stadium',
        address: 'MCA Complex, BKC',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India'
      },
      dates: {
        registrationStart: new Date('2025-08-15'),
        registrationEnd: new Date('2025-08-30'),
        tournamentStart: new Date('2025-09-01'),
        tournamentEnd: new Date('2025-09-15')
      },
      format: 'single-elimination',
      registrationFee: 2000,
      prizePool: {
        total: 100000,
        distribution: [
          { position: 1, amount: 50000, percentage: 50 },
          { position: 2, amount: 30000, percentage: 30 },
          { position: 3, amount: 20000, percentage: 20 }
        ]
      },
      rules: '1. T20 Format\n2. Standard ICC rules apply\n3. Each team must have minimum 11 players\n4. Power play in first 6 overs\n5. DLS method for rain-affected matches',
      status: 'open',
      visibility: 'public'
    }
  ],
  teams: [
    {
      name: 'Mumbai Mavericks',
      shortName: 'MM',
      sport: 'cricket',
      homeVenue: {
        name: 'Mumbai Cricket Stadium',
        city: 'Mumbai',
        state: 'Maharashtra'
      },
      description: 'Premier cricket team from Mumbai'
    },
    {
      name: 'Delhi Dragons',
      shortName: 'DD',
      sport: 'cricket',
      homeVenue: {
        name: 'Delhi Stadium',
        city: 'Delhi',
        state: 'Delhi'
      },
      description: 'Leading cricket team from Delhi'
    },
    {
      name: 'Pune Panthers',
      shortName: 'PP',
      sport: 'cricket',
      homeVenue: {
        name: 'Pune Stadium',
        city: 'Pune',
        state: 'Maharashtra'
      },
      description: 'Top cricket team from Pune'
    }
  ]
};

export const seedData = async () => {
  try {
    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Tournament.deleteMany({}),
      Team.deleteMany({}),
      Match.deleteMany({}),
      Scorecard.deleteMany({}),
      FitnessContent.deleteMany({}),
      VideoPost.deleteMany({})
    ]);
    console.log('📝 Old data cleared');

    // Create users with hashed passwords (skip pre-save hook)
    const hashedUsers = await Promise.all(
      sampleData.users.map(async (user) => {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        return { ...user, password: hashedPassword };
      })
    );
    const createdUsers = await User.insertMany(hashedUsers, { validateBeforeSave: false });
    console.log('👤 Users seeded');

    // Create tournament first
    const tournamentsWithRefs = sampleData.tournaments.map(tournament => ({
      ...tournament,
      organizer: createdUsers.find(u => u.role === 'organizer')._id
    }));
    const createdTournaments = await Tournament.create(tournamentsWithRefs);
    console.log('🏆 Tournaments seeded');

    // Create teams with tournament reference
    const teamsWithRefs = sampleData.teams.map((team, index) => {
      const teamPlayers = createdUsers
        .filter(u => u.role === 'player')
        .slice(index * 3, (index * 3) + 3);
      
      return {
        ...team,
        sport: team.sport.toLowerCase(),
        tournament: createdTournaments[0]._id,
        captain: teamPlayers[0]._id,
        players: teamPlayers.map((player, idx) => ({
          user: player._id,
          role: idx === 0 ? 'captain' : 'player',
          jerseyNumber: Math.floor(Math.random() * 99) + 1
        }))
      };
    });
    const createdTeams = await Team.create(teamsWithRefs);
    console.log('🏢 Teams seeded');

    // Create a match between first two teams
    const match = await Match.create({
      tournament: createdTournaments[0]._id,
      sport: 'cricket',
      homeTeam: createdTeams[0]._id,
      awayTeam: createdTeams[1]._id,
      venue: createdTournaments[0].venue,
      scheduledTime: new Date('2025-09-01T14:00:00Z'),
      status: 'scheduled',
      format: 'T20',
      round: 'quarter-final',
      matchNumber: 1,
      officials: {
        umpires: ['John Doe', 'Jane Smith'],
        referee: 'Mike Johnson'
      },
      score: {
        home: 0,
        away: 0
      }
    });
    console.log('🎮 Match created');

    // Create initial scorecard for the match
    const scorecard = await Scorecard.create({
      match: match._id,
      sportsCategory: 'cricket',
      cricket: {
        innings: [
          {
            team: createdTeams[0]._id,
            runs: 0,
            wickets: 0,
            overs: 0,
            balls: 0,
            extras: {
              wides: 0,
              noBalls: 0,
              byes: 0,
              legByes: 0
            },
            batsmen: [
              {
                player: `${createdUsers[0].firstName} ${createdUsers[0].lastName}`,
                runs: 0,
                balls: 0,
                fours: 0,
                sixes: 0,
                isOut: false
              }
            ],
            bowlers: [
              {
                player: `${createdUsers[4].firstName} ${createdUsers[4].lastName}`,
                overs: 0,
                runs: 0,
                wickets: 0,
                maidens: 0
              }
            ]
          }
        ]
      },
      updatedBy: createdUsers.find(u => u.role === 'organizer')._id
    });
    console.log('📊 Scorecard created');

    console.log('✅ All data seeded successfully');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB disconnected');
  }
};
