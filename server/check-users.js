import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './src/models/User.js';

// Load environment variables
dotenv.config();

const checkUsers = async () => {
  try {
    console.log('🔍 Checking users in database...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Get all users
    const users = await User.find({}, 'firstName lastName email role');
    console.log(`📊 Found ${users.length} users:`);
    
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.firstName} ${user.lastName} (${user.email}) - ${user.role}`);
    });
    
    // Try to create a test user if none exist
    if (users.length === 0) {
      console.log('🔨 No users found, creating test user...');
      const testUser = await User.create({
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@example.com',
        password: 'Test@123',
        role: 'player'
      });
      console.log('✅ Test user created:', testUser.email);
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
};

checkUsers();
