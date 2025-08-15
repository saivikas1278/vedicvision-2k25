import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import { seedData } from '../utils/seedData.js';

// Load environment variables
dotenv.config();

const runSeed = async () => {
  try {
    console.log('🌱 Starting comprehensive data seeding...');
    
    // Connect to MongoDB
    await connectDB();
    console.log('✅ Connected to MongoDB');
    
    await seedData();
    console.log('✅ Seeding completed successfully');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    process.exit(0);
  }
};

runSeed();
