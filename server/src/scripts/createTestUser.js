import mongoose from 'mongoose';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const createTestUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if test user already exists
    const existingUser = await User.findOne({ email: 'test@sportsphere.com' });
    if (existingUser) {
      console.log('Test user already exists');
      process.exit(0);
    }

    // Create test user
    const testUser = await User.create({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@sportsphere.com',
      password: 'Test123!',
      role: 'player',
      dateOfBirth: new Date('1995-01-01'),
      phoneNumber: '+1234567890',
      isVerified: true
    });

    console.log('Test user created successfully:', {
      id: testUser._id,
      email: testUser.email,
      name: testUser.fullName
    });

    process.exit(0);
  } catch (error) {
    console.error('Error creating test user:', error);
    process.exit(1);
  }
};

createTestUser();
