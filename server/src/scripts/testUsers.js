import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// Load environment variables
dotenv.config();

const testUsers = async () => {
  try {
    // Connect to DB
    await connectDB();
    console.log('🔌 Connected to MongoDB');
    
    // Check all users
    const users = await User.find({}).select('+password');
    console.log(`📊 Found ${users.length} users in database:`);
    
    for (const user of users) {
      console.log('\n--- User Details ---');
      console.log('ID:', user._id);
      console.log('Email:', user.email);
      console.log('First Name:', user.firstName);
      console.log('Last Name:', user.lastName);
      console.log('Has Password:', !!user.password);
      console.log('Password Length:', user.password ? user.password.length : 0);
      console.log('Password Starts With:', user.password ? user.password.substring(0, 10) + '...' : 'NONE');
      
      // Test password comparison with 'Test@123'
      if (user.password) {
        try {
          const testPassword = 'Test@123';
          const isMatch = await bcrypt.compare(testPassword, user.password);
          console.log(`Password 'Test@123' matches:`, isMatch);
          
          // Also test using the model method
          const modelMatch = await user.comparePassword(testPassword);
          console.log(`Model comparePassword result:`, modelMatch);
        } catch (error) {
          console.error('Error testing password:', error);
        }
      }
    }
    
    // Test creating a new user with known password
    console.log('\n🧪 Testing new user creation...');
    
    // First delete test user if exists
    await User.deleteOne({ email: 'test@example.com' });
    
    const testUser = new User({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'Test@123',
      role: 'player'
    });
    
    await testUser.save();
    console.log('✅ Test user created successfully');
    
    // Now test login with this user
    const foundUser = await User.findOne({ email: 'test@example.com' }).select('+password');
    if (foundUser) {
      const isMatch = await foundUser.comparePassword('Test@123');
      console.log('🔐 Test user password verification:', isMatch);
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    process.exit(0);
  }
};

testUsers();
