import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import User from '../models/User.js';
import Tournament from '../models/Tournament.js';

// Load environment variables
dotenv.config();

const seedTournamentsWithProperDates = async () => {
  try {
    console.log('🌱 Starting tournament seeding...');
    
    // Connect to MongoDB
    await connectDB();
    
    // Find an organizer user
    let organizer = await User.findOne({ email: 'john.smith@example.com' });
    if (!organizer) {
      // Create an organizer if none exists
      organizer = await User.create({
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@example.com',
        password: 'Test@123',
        role: 'organizer',
        sports: [{ name: 'cricket', position: 'Organizer', experience: 'advanced' }],
        location: { city: 'Mumbai', state: 'Maharashtra', country: 'India' }
      });
      console.log('✅ Created organizer user');
    }
    
    // Clear existing tournaments
    await Tournament.deleteMany({});
    console.log('🗑️ Cleared existing tournaments');
    
    // Create tournaments with proper dates
    const now = new Date();
    const tournaments = [
      {
        name: 'Mumbai Premier League 2025',
        description: 'The biggest cricket tournament in Mumbai featuring teams from across the city.',
        sport: 'cricket',
        organizer: organizer._id,
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
          coordinates: { lat: 18.938831, lng: 72.825556 }
        },
        dates: {
          registrationStart: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
          registrationEnd: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          tournamentStart: new Date(now.getTime() + 35 * 24 * 60 * 60 * 1000), // 35 days from now
          tournamentEnd: new Date(now.getTime() + 40 * 24 * 60 * 60 * 1000) // 40 days from now
        },
        status: 'open',
        visibility: 'public',
        rules: 'Standard T20 cricket rules apply. Each team must have 11 players.',
        requirements: 'Teams must register with full squad details.',
        registeredTeams: [],
        settings: {
          allowLateRegistration: true,
          autoGenerateBracket: true,
          emailNotifications: true
        }
      },
      {
        name: 'Delhi Basketball Championship',
        description: 'Premier basketball tournament featuring the best teams from Delhi NCR.',
        sport: 'basketball',
        organizer: organizer._id,
        format: 'round-robin',
        maxTeams: 12,
        registrationFee: 3000,
        prizePool: {
          total: 75000,
          distribution: [
            { position: 1, amount: 40000, percentage: 53.33 },
            { position: 2, amount: 25000, percentage: 33.33 },
            { position: 3, amount: 10000, percentage: 13.33 }
          ]
        },
        venue: {
          name: 'Thyagaraj Sports Complex',
          address: 'INA Colony',
          city: 'New Delhi',
          state: 'Delhi',
          coordinates: { lat: 28.569, lng: 77.218 }
        },
        dates: {
          registrationStart: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
          registrationEnd: new Date(now.getTime() + 25 * 24 * 60 * 60 * 1000), // 25 days from now
          tournamentStart: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          tournamentEnd: new Date(now.getTime() + 35 * 24 * 60 * 60 * 1000) // 35 days from now
        },
        status: 'open',
        visibility: 'public',
        rules: 'FIBA basketball rules. Games will be 4 quarters of 10 minutes each.',
        requirements: 'Teams must have 5-12 players registered.',
        registeredTeams: [],
        settings: {
          allowLateRegistration: false,
          autoGenerateBracket: true,
          emailNotifications: true
        }
      },
      {
        name: 'Bangalore Football League',
        description: 'Annual football tournament bringing together teams from Bangalore.',
        sport: 'football',
        organizer: organizer._id,
        format: 'double-elimination',
        maxTeams: 20,
        registrationFee: 7500,
        prizePool: {
          total: 150000,
          distribution: [
            { position: 1, amount: 75000, percentage: 50 },
            { position: 2, amount: 45000, percentage: 30 },
            { position: 3, amount: 30000, percentage: 20 }
          ]
        },
        venue: {
          name: 'Bangalore Football Stadium',
          address: 'Kanteerava Stadium',
          city: 'Bangalore',
          state: 'Karnataka',
          coordinates: { lat: 12.9716, lng: 77.5946 }
        },
        dates: {
          registrationStart: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
          registrationEnd: new Date(now.getTime() + 20 * 24 * 60 * 60 * 1000), // 20 days from now
          tournamentStart: new Date(now.getTime() + 25 * 24 * 60 * 60 * 1000), // 25 days from now
          tournamentEnd: new Date(now.getTime() + 35 * 24 * 60 * 60 * 1000) // 35 days from now
        },
        status: 'open',
        visibility: 'public',
        rules: 'FIFA football rules. Each match will be 90 minutes (45+45).',
        requirements: 'Teams must have 11-22 players registered.',
        registeredTeams: [],
        settings: {
          allowLateRegistration: true,
          autoGenerateBracket: true,
          emailNotifications: true
        }
      }
    ];
    
    console.log('🏆 Creating tournaments...');
    
    for (const tournamentData of tournaments) {
      const tournament = await Tournament.create(tournamentData);
      console.log(`✅ Created tournament: ${tournament.name}`);
      console.log(`   📅 Registration: ${tournament.dates.registrationStart.toDateString()} - ${tournament.dates.registrationEnd.toDateString()}`);
      console.log(`   🏟️ Tournament: ${tournament.dates.tournamentStart.toDateString()} - ${tournament.dates.tournamentEnd.toDateString()}`);
      console.log(`   📊 Registration Status: ${tournament.registrationStatus}`);
      console.log(`   🆔 ID: ${tournament._id.toString()}`);
    }
    
    console.log('✅ All tournaments created successfully with open registration!');
    
  } catch (error) {
    console.error('❌ Tournament seeding failed:', error);
  } finally {
    process.exit(0);
  }
};

seedTournamentsWithProperDates();
