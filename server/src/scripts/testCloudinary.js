import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const testCloudinary = async () => {
  try {
    console.log('Testing Cloudinary connection...');
    console.log('Config:', {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY ? '***' + process.env.CLOUDINARY_API_KEY.slice(-4) : 'missing',
      api_secret: process.env.CLOUDINARY_API_SECRET ? '***' + process.env.CLOUDINARY_API_SECRET.slice(-4) : 'missing'
    });

    // Test with a simple upload using a public image URL
    const result = await cloudinary.uploader.upload('https://via.placeholder.com/150', {
      folder: 'sportsphere/test',
      public_id: 'test_image_' + Date.now()
    });

    console.log('✅ Cloudinary connection successful!');
    console.log('Upload result:', {
      public_id: result.public_id,
      secure_url: result.secure_url,
      width: result.width,
      height: result.height
    });

    // Clean up - delete the test image
    await cloudinary.uploader.destroy(result.public_id);
    console.log('🧹 Test image cleaned up');

  } catch (error) {
    console.error('❌ Cloudinary connection failed:', error);
    console.error('Error details:', {
      message: error.message,
      http_code: error.http_code,
      name: error.name
    });
  }
};

testCloudinary();
