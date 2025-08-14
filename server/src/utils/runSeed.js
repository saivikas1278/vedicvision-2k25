import mongoose from 'mongoose';
import { seedData } from './seedData.new.js';
import dotenv from 'dotenv';

// Load env vars
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('📦 MongoDB Connected');
    // Run seed function
    seedData()
      .then(() => {
        console.log('✅ Seed completed successfully');
        process.exit(0);
      })
      .catch(err => {
        console.error('❌ Seed failed:', err);
        process.exit(1);
      });
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  });
