import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Tournament from '../models/Tournament.js';
import Match from '../models/Match.js';
import FitnessContent from '../models/FitnessContent.js';

// Load environment variables
dotenv.config();

const seedTournamentsAndTeams = async () => {
  try {
    console.log('🌱 Starting tournaments and teams seeding...');
    
    // Connect to MongoDB
    await connectDB();
    
    // Get existing user (find any registered user)
    const existingUser = await User.findOne().sort({ createdAt: -1 });
    if (!existingUser) {
      console.log('❌ No user found. Please register a user first.');
      return;
    }
    
    const userId = existingUser._id;
    console.log('👤 Using user:', existingUser.email || `${existingUser.firstName} ${existingUser.lastName}`);
    
    // Clear existing tournaments and teams
    await Tournament.deleteMany({});
    await Team.deleteMany({});
    await Match.deleteMany({});
    console.log('🗑️ Cleared existing tournaments, teams, and matches');
    
    // Create tournaments
    console.log('🏆 Creating tournaments...');
    
    const tournaments = [
      {
        name: 'Mumbai Cricket Championship 2025',
        description: 'Annual cricket championship for Mumbai teams. Join the most prestigious cricket tournament in the city and compete with the best teams.',
        sport: 'cricket',
        organizer: userId,
        format: 'single-elimination',
        maxTeams: 16,
        registrationFee: 5000,
        prizePool: {
          total: 100000,
          distribution: [
            { position: 1, amount: 50000, percentage: 50 },
            { position: 2, amount: 30000, percentage: 30 },
            { position: 3, amount: 20000, percentage: 20 }
          ]
        },
        venue: {
          name: 'Wankhede Stadium',
          address: 'D Road, Churchgate',
          city: 'Mumbai',
          state: 'Maharashtra',
          country: 'India',
          coordinates: { lat: 18.938, lng: 72.826 }
        },
        dates: {
          registrationStart: new Date('2025-01-01'),
          registrationEnd: new Date('2025-02-15'),
          tournamentStart: new Date('2025-03-01'),
          tournamentEnd: new Date('2025-03-30')
        },
        status: 'open',
        visibility: 'public',
        rules: 'Standard ICC cricket rules apply. Each team must have 11 players with 4 substitutes.',
        eligibility: {
          ageLimit: { min: 18, max: 40 },
          genderRestriction: 'none',
          skillLevel: 'all'
        },
        settings: {
          allowLateRegistration: false,
          requireApproval: true,
          maxPlayersPerTeam: 15,
          minPlayersPerTeam: 11
        }
      },
      {
        name: 'Inter-College Badminton Championship',
        description: 'Premier badminton tournament for college students across Maharashtra. Singles and doubles categories available.',
        sport: 'badminton',
        organizer: userId,
        format: 'round-robin',
        maxTeams: 12,
        registrationFee: 2000,
        prizePool: {
          total: 50000,
          distribution: [
            { position: 1, amount: 25000, percentage: 50 },
            { position: 2, amount: 15000, percentage: 30 },
            { position: 3, amount: 10000, percentage: 20 }
          ]
        },
        venue: {
          name: 'Sports Complex COEP',
          address: 'College of Engineering Pune',
          city: 'Pune',
          state: 'Maharashtra',
          country: 'India',
          coordinates: { lat: 18.528, lng: 73.876 }
        },
        dates: {
          registrationStart: new Date('2025-01-15'),
          registrationEnd: new Date('2025-02-28'),
          tournamentStart: new Date('2025-03-15'),
          tournamentEnd: new Date('2025-03-25')
        },
        status: 'open',
        visibility: 'public',
        rules: 'BWF rules apply. Both singles and doubles categories. Players must be enrolled in college.',
        eligibility: {
          ageLimit: { min: 17, max: 25 },
          genderRestriction: 'none',
          skillLevel: 'all'
        },
        settings: {
          allowLateRegistration: true,
          requireApproval: false,
          maxPlayersPerTeam: 4,
          minPlayersPerTeam: 2
        }
      },
      {
        name: 'Corporate Football League 2025',
        description: 'Professional football league for corporate teams. Weekly matches and season-long competition.',
        sport: 'football',
        organizer: userId,
        format: 'league',
        maxTeams: 10,
        registrationFee: 15000,
        prizePool: {
          total: 200000,
          distribution: [
            { position: 1, amount: 100000, percentage: 50 },
            { position: 2, amount: 60000, percentage: 30 },
            { position: 3, amount: 40000, percentage: 20 }
          ]
        },
        venue: {
          name: 'Cooperage Football Ground',
          address: 'Colaba, Mumbai',
          city: 'Mumbai',
          state: 'Maharashtra',
          country: 'India',
          coordinates: { lat: 18.912, lng: 72.824 }
        },
        dates: {
          registrationStart: new Date('2025-02-01'),
          registrationEnd: new Date('2025-03-15'),
          tournamentStart: new Date('2025-04-01'),
          tournamentEnd: new Date('2025-07-31')
        },
        status: 'open',
        visibility: 'public',
        rules: 'FIFA rules apply. 11-a-side format. Minimum 2 years corporate experience required.',
        eligibility: {
          ageLimit: { min: 22, max: 45 },
          genderRestriction: 'none',
          skillLevel: 'intermediate'
        },
        settings: {
          allowLateRegistration: false,
          requireApproval: true,
          maxPlayersPerTeam: 18,
          minPlayersPerTeam: 15
        }
      },
      {
        name: 'Table Tennis Masters Cup',
        description: 'Elite table tennis tournament featuring the best players from across the region.',
        sport: 'table-tennis',
        organizer: userId,
        format: 'double-elimination',
        maxTeams: 8,
        registrationFee: 1500,
        prizePool: {
          total: 30000,
          distribution: [
            { position: 1, amount: 15000, percentage: 50 },
            { position: 2, amount: 9000, percentage: 30 },
            { position: 3, amount: 6000, percentage: 20 }
          ]
        },
        venue: {
          name: 'National Sports Club',
          address: 'Worli, Mumbai',
          city: 'Mumbai',
          state: 'Maharashtra',
          country: 'India',
          coordinates: { lat: 19.013, lng: 72.818 }
        },
        dates: {
          registrationStart: new Date('2025-02-10'),
          registrationEnd: new Date('2025-03-10'),
          tournamentStart: new Date('2025-03-20'),
          tournamentEnd: new Date('2025-03-22')
        },
        status: 'open',
        visibility: 'public',
        rules: 'ITTF rules apply. Singles format only.',
        eligibility: {
          ageLimit: { min: 16, max: 50 },
          genderRestriction: 'none',
          skillLevel: 'advanced'
        },
        settings: {
          allowLateRegistration: true,
          requireApproval: false,
          maxPlayersPerTeam: 1,
          minPlayersPerTeam: 1
        }
      }
    ];
    
    const createdTournaments = [];
    for (const tournamentData of tournaments) {
      const tournament = await Tournament.create(tournamentData);
      createdTournaments.push(tournament);
      console.log(`✅ Created tournament: ${tournament.name}`);
    }
    
    // Create teams for each tournament
    console.log('👥 Creating teams...');
    
    const teamsData = [
      // Cricket teams
      {
        name: 'Mumbai Mavericks',
        shortName: 'MM',
        captain: userId,
        players: [{
          user: userId,
          role: 'captain',
          jerseyNumber: 1,
          position: 'Batsman',
          joinedAt: new Date()
        }],
        tournament: createdTournaments[0]._id,
        sport: 'cricket',
        description: 'Professional cricket team with experienced players from Mumbai local leagues.',
        colors: { primary: '#FF6B35', secondary: '#004E98' },
        stats: {
          matchesPlayed: 12,
          matchesWon: 8,
          matchesLost: 3,
          matchesDrawn: 1,
          points: 25,
          goalsFor: 0,
          goalsAgainst: 0
        },
        registrationDetails: {
          registrationStatus: 'approved',
          paymentStatus: 'paid'
        }
      },
      {
        name: 'Delhi Dynamos',
        shortName: 'DD',
        captain: userId,
        players: [{
          user: userId,
          role: 'captain',
          jerseyNumber: 7,
          position: 'All-rounder',
          joinedAt: new Date()
        }],
        tournament: createdTournaments[0]._id,
        sport: 'cricket',
        description: 'Dynamic cricket team known for aggressive batting and tight bowling.',
        colors: { primary: '#7B2CBF', secondary: '#F72585' },
        stats: {
          matchesPlayed: 10,
          matchesWon: 6,
          matchesLost: 4,
          matchesDrawn: 0,
          points: 18,
          goalsFor: 0,
          goalsAgainst: 0
        },
        registrationDetails: {
          registrationStatus: 'approved',
          paymentStatus: 'paid'
        }
      },
      // Badminton teams
      {
        name: 'Pune Shuttlers',
        shortName: 'PS',
        captain: userId,
        players: [{
          user: userId,
          role: 'captain',
          jerseyNumber: 1,
          position: 'Singles',
          joinedAt: new Date()
        }],
        tournament: createdTournaments[1]._id,
        sport: 'badminton',
        description: 'College badminton team with state-level players.',
        colors: { primary: '#06FFA5', secondary: '#FFBE0B' },
        stats: {
          matchesPlayed: 6,
          matchesWon: 4,
          matchesLost: 2,
          matchesDrawn: 0,
          points: 12,
          goalsFor: 0,
          goalsAgainst: 0
        },
        registrationDetails: {
          registrationStatus: 'approved',
          paymentStatus: 'paid'
        }
      },
      {
        name: 'Nashik Smashers',
        shortName: 'NS',
        captain: userId,
        players: [{
          user: userId,
          role: 'captain',
          jerseyNumber: 2,
          position: 'Doubles',
          joinedAt: new Date()
        }],
        tournament: createdTournaments[1]._id,
        sport: 'badminton',
        description: 'Aggressive doubles specialists with excellent court coverage.',
        colors: { primary: '#FB8500', secondary: '#219EBC' },
        stats: {
          matchesPlayed: 5,
          matchesWon: 3,
          matchesLost: 2,
          matchesDrawn: 0,
          points: 9,
          goalsFor: 0,
          goalsAgainst: 0
        },
        registrationDetails: {
          registrationStatus: 'approved',
          paymentStatus: 'paid'
        }
      },
      // Football teams
      {
        name: 'TCS Titans',
        shortName: 'TT',
        captain: userId,
        players: [{
          user: userId,
          role: 'captain',
          jerseyNumber: 10,
          position: 'Midfielder',
          joinedAt: new Date()
        }],
        tournament: createdTournaments[2]._id,
        sport: 'football',
        description: 'Corporate football team from TCS with excellent teamwork.',
        colors: { primary: '#003566', secondary: '#FFC300' },
        stats: {
          matchesPlayed: 8,
          matchesWon: 5,
          matchesLost: 2,
          matchesDrawn: 1,
          points: 16,
          goalsFor: 18,
          goalsAgainst: 12
        },
        registrationDetails: {
          registrationStatus: 'approved',
          paymentStatus: 'paid'
        }
      },
      {
        name: 'Infosys Eagles',
        shortName: 'IE',
        captain: userId,
        players: [{
          user: userId,
          role: 'captain',
          jerseyNumber: 9,
          position: 'Forward',
          joinedAt: new Date()
        }],
        tournament: createdTournaments[2]._id,
        sport: 'football',
        description: 'High-scoring football team with fast-paced attacking play.',
        colors: { primary: '#264653', secondary: '#E9C46A' },
        stats: {
          matchesPlayed: 7,
          matchesWon: 4,
          matchesLost: 3,
          matchesDrawn: 0,
          points: 12,
          goalsFor: 22,
          goalsAgainst: 18
        },
        registrationDetails: {
          registrationStatus: 'approved',
          paymentStatus: 'paid'
        }
      }
    ];
    
    const createdTeams = [];
    for (const teamData of teamsData) {
      const team = await Team.create(teamData);
      createdTeams.push(team);
      
      // Add team to tournament's registered teams
      await Tournament.findByIdAndUpdate(
        team.tournament,
        { $push: { registeredTeams: team._id } }
      );
      
      console.log(`✅ Created team: ${team.name} for ${team.sport}`);
    }
    
    // Create some sample matches
    console.log('⚽ Creating sample matches...');
    
    const matches = [
      {
        title: 'Mumbai Mavericks vs Delhi Dynamos',
        sport: 'cricket',
        tournament: createdTournaments[0]._id,
        round: 'quarter-final',
        matchNumber: 1,
        homeTeam: createdTeams[0]._id,
        awayTeam: createdTeams[1]._id,
        scheduledTime: new Date('2025-03-05T10:00:00Z'),
        venue: {
          name: 'Wankhede Stadium',
          address: 'D Road, Churchgate, Mumbai'
        },
        status: 'scheduled',
        format: 'T20'
      },
      {
        title: 'Pune Shuttlers vs Nashik Smashers',
        sport: 'badminton',
        tournament: createdTournaments[1]._id,
        round: 'group-1-round-1',
        matchNumber: 2,
        homeTeam: createdTeams[2]._id,
        awayTeam: createdTeams[3]._id,
        scheduledTime: new Date('2025-03-16T14:00:00Z'),
        venue: {
          name: 'Sports Complex COEP',
          address: 'College of Engineering Pune'
        },
        status: 'scheduled',
        format: 'Best of 3'
      },
      {
        title: 'TCS Titans vs Infosys Eagles',
        sport: 'football',
        tournament: createdTournaments[2]._id,
        round: 'league-round-1',
        matchNumber: 3,
        homeTeam: createdTeams[4]._id,
        awayTeam: createdTeams[5]._id,
        scheduledTime: new Date('2025-04-05T16:00:00Z'),
        venue: {
          name: 'Cooperage Football Ground',
          address: 'Colaba, Mumbai'
        },
        status: 'scheduled',
        format: '90 minutes'
      }
    ];
    
    for (const matchData of matches) {
      const match = await Match.create(matchData);
      console.log(`✅ Created match: ${match.title}`);
    }
    
    // Create some fitness content
    console.log('💪 Creating fitness content...');
    
    const fitnessContent = [
      {
        title: 'Cricket Training: Batting Fundamentals',
        description: 'Master the basics of cricket batting with proper stance, grip, and shot selection techniques.',
        instructor: userId,
        category: 'sports-specific',
        type: 'video',
        difficulty: 'beginner',
        duration: 25,
        equipment: ['none'],
        targetMuscles: ['full-body'],
        goals: ['coordination', 'strength'],
        videoUrl: 'https://example.com/cricket-batting',
        thumbnailUrl: 'https://example.com/cricket-thumb',
        isPublished: true,
        views: 120,
        completions: 85,
        averageRating: 4.5,
        userProgress: [{
          user: userId,
          progress: 100,
          completedAt: new Date(),
          timeSpent: 25
        }]
      },
      {
        title: 'Football Conditioning Workout',
        description: 'High-intensity interval training designed for football players to improve stamina and agility.',
        instructor: userId,
        category: 'cardio',
        type: 'workout-plan',
        difficulty: 'intermediate',
        duration: 45,
        equipment: ['other'],
        targetMuscles: ['legs', 'core', 'cardio'],
        goals: ['endurance', 'coordination'],
        isPublished: true,
        views: 95,
        completions: 67,
        averageRating: 4.3,
        exercises: [
          {
            name: 'Sprint Intervals',
            sets: 5,
            reps: '30 seconds',
            restPeriod: 90,
            instructions: ['Sprint at maximum effort', 'Rest completely between sets']
          },
          {
            name: 'Agility Ladder',
            sets: 3,
            reps: '10 patterns',
            restPeriod: 60,
            instructions: ['Focus on quick feet', 'Maintain proper form']
          }
        ],
        userProgress: [{
          user: userId,
          progress: 100,
          completedAt: new Date(),
          timeSpent: 45
        }]
      },
      {
        title: 'Badminton Agility Training',
        description: 'Improve court movement and reaction time with badminton-specific agility drills.',
        instructor: userId,
        category: 'sports-specific',
        type: 'video',
        difficulty: 'intermediate',
        duration: 30,
        equipment: ['other'],
        targetMuscles: ['legs', 'core'],
        goals: ['coordination', 'balance'],
        videoUrl: 'https://example.com/badminton-agility',
        thumbnailUrl: 'https://example.com/badminton-thumb',
        isPublished: true,
        views: 78,
        completions: 52,
        averageRating: 4.2,
        userProgress: [{
          user: userId,
          progress: 100,
          completedAt: new Date(),
          timeSpent: 30
        }]
      },
      {
        title: 'Full Body Strength for Athletes',
        description: 'Comprehensive strength training routine targeting all major muscle groups for sports performance.',
        instructor: userId,
        category: 'strength',
        type: 'workout-plan',
        difficulty: 'advanced',
        duration: 60,
        equipment: ['dumbbells', 'barbell', 'resistance-bands'],
        targetMuscles: ['full-body'],
        goals: ['strength', 'muscle-gain'],
        isPublished: true,
        views: 156,
        completions: 89,
        averageRating: 4.7,
        exercises: [
          {
            name: 'Deadlifts',
            sets: 4,
            reps: '8-10',
            restPeriod: 120,
            instructions: ['Keep back straight', 'Drive through heels']
          },
          {
            name: 'Pull-ups',
            sets: 3,
            reps: 'To failure',
            restPeriod: 90,
            instructions: ['Full range of motion', 'Control the descent']
          }
        ],
        userProgress: [{
          user: userId,
          progress: 100,
          completedAt: new Date(),
          timeSpent: 60
        }]
      }
    ];
    
    for (const contentData of fitnessContent) {
      const content = await FitnessContent.create(contentData);
      console.log(`✅ Created fitness content: ${content.title}`);
    }
    
    console.log('✅ Tournament and team data seeded successfully!');
    console.log('📈 Summary:');
    console.log(`   - Tournaments: ${createdTournaments.length}`);
    console.log(`   - Teams: ${createdTeams.length}`);
    console.log(`   - Matches: ${matches.length}`);
    console.log(`   - Fitness Content: ${fitnessContent.length}`);
    console.log('');
    console.log('🏆 Created Tournaments:');
    createdTournaments.forEach(t => console.log(`   - ${t.name} (${t.sport})`));
    console.log('');
    console.log('👥 Created Teams:');
    createdTeams.forEach(t => console.log(`   - ${t.name} (${t.sport})`));
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    process.exit(0);
  }
};

seedTournamentsAndTeams();
