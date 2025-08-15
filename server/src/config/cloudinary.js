import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// Test configuration
const testConfig = () => {
  console.log('Cloudinary Config:', {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY ? '***' + process.env.CLOUDINARY_API_KEY.slice(-4) : 'missing',
    api_secret: process.env.CLOUDINARY_API_SECRET ? '***' + process.env.CLOUDINARY_API_SECRET.slice(-4) : 'missing'
  });
};

testConfig();

// Upload image to Cloudinary
export const uploadImageToCloudinary = async (filePath, options = {}) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'sportsphere/posts/images',
      resource_type: 'image',
      quality: 'auto:good',
      fetch_format: 'auto',
      ...options
    });
    return result;
  } catch (error) {
    console.error('Cloudinary image upload error:', error);
    throw error;
  }
};

// Upload video to Cloudinary
export const uploadVideoToCloudinary = async (filePath, options = {}) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'sportsphere/posts/videos',
      resource_type: 'video',
      quality: 'auto:good',
      ...options
    });
    return result;
  } catch (error) {
    console.error('Cloudinary video upload error:', error);
    throw error;
  }
};

// Delete file from Cloudinary
export const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType
    });
    return result;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
};

// Generate video thumbnail
export const generateVideoThumbnail = async (videoUrl) => {
  try {
    // Extract public ID from video URL
    const urlParts = videoUrl.split('/');
    const fileWithExtension = urlParts[urlParts.length - 1];
    const publicId = fileWithExtension.split('.')[0];
    
    // Generate thumbnail URL
    const thumbnailUrl = cloudinary.url(publicId, {
      resource_type: 'video',
      format: 'jpg',
      transformation: [
        { width: 640, height: 360, crop: 'fill' }
      ]
    });
    
    return thumbnailUrl;
  } catch (error) {
    console.error('Error generating thumbnail:', error);
    throw error;
  }
};

export default cloudinary;
