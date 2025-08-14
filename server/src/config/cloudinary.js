import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload video to Cloudinary
export const uploadVideoToCloudinary = async (fileBuffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      resource_type: 'video',
      folder: 'sportsphere/videos',
      use_filename: true,
      unique_filename: false,
      ...options
    };

    cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    ).end(fileBuffer);
  });
};

// Upload image to Cloudinary
export const uploadImageToCloudinary = async (fileBuffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      resource_type: 'image',
      folder: 'sportsphere/images',
      use_filename: true,
      unique_filename: false,
      ...options
    };

    cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    ).end(fileBuffer);
  });
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
