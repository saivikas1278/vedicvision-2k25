import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import { seedData } from '../utils/seedData.js';

// Load environment variables
dotenv.config();

// Connect to DB and seed data
console.log('🌱 Starting data seeding...');
connectDB().then(() => {
  seedData().catch(err => {
    console.error('Seeding failed:', err);
    process.exit(1);
  });
});
