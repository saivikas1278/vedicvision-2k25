import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// Load environment variables
dotenv.config();

const createTestUsers = async () => {
  try {
    console.log('🌱 Starting data seeding...');
    
    // Connect to MongoDB
    await connectDB();
    
    // Clear existing users
    await User.deleteMany({});
    console.log('🗑️ Cleared existing users');
    
    // Create test users with pre-hashed passwords
    const testUsers = [
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
      }
    ];
    
    console.log('👤 Creating test users...');
    
    // Create users (password will be hashed automatically by the User model)
    for (const userData of testUsers) {
      const user = await User.create(userData);
      console.log(`✅ Created user: ${user.email}`);
    }
    
    console.log('✅ All test users created successfully');
    console.log('🔑 Test credentials:');
    testUsers.forEach(user => {
      console.log(`   Email: ${user.email} | Password: ${user.password}`);
    });
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    process.exit(0);
  }
};

createTestUsers();
