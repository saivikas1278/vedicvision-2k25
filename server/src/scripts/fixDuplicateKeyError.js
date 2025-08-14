import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(dirname(fileURLToPath(import.meta.url)), '../../.env') });

const fixIndexes = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📦 Connected to MongoDB');

    // Get the users collection
    const usersCollection = mongoose.connection.collection('users');

    // Drop the problematic username index
    await usersCollection.dropIndex('username_1');
    console.log('✅ Successfully dropped the username index');

    // List remaining indexes for verification
    const indexes = await usersCollection.indexes();
    console.log('\nRemaining indexes:', indexes);

  } catch (error) {
    if (error.code === 27) {
      console.log('✅ Index username_1 does not exist - no action needed');
    } else {
      console.error('❌ Error:', error);
    }
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB disconnected');
  }
};

fixIndexes();
