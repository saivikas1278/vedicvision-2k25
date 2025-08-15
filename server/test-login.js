import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './src/models/User.js';

// Load environment variables
dotenv.config();

const testLogin = async () => {
  try {
    console.log('🔍 Testing login functionality...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Test credentials
    const email = 'john.smith@example.com';
    const password = 'Test@123';
    
    console.log(`🔍 Looking for user with email: ${email}`);
    
    // Find user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      console.log('❌ User not found');
      process.exit(1);
    }
    
    console.log('✅ User found:', {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      hasPassword: !!user.password
    });
    
    // Test password comparison
    console.log(`🔍 Testing password: "${password}"`);
    const isMatch = await user.comparePassword(password);
    console.log('🔍 Password match result:', isMatch);
    
    if (isMatch) {
      console.log('✅ Login test SUCCESSFUL');
    } else {
      console.log('❌ Login test FAILED - password does not match');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
};

testLogin();
