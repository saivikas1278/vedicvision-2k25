import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const fixPostsCollection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Drop the posts collection to remove problematic indexes
    const db = mongoose.connection.db;
    try {
      await db.collection('posts').drop();
      console.log('Dropped posts collection successfully');
    } catch (error) {
      if (error.codeName === 'NamespaceNotFound') {
        console.log('Posts collection does not exist, nothing to drop');
      } else {
        throw error;
      }
    }

    console.log('Posts collection fixed. You can now restart the server.');
    process.exit(0);
  } catch (error) {
    console.error('Error fixing posts collection:', error);
    process.exit(1);
  }
};

fixPostsCollection();
