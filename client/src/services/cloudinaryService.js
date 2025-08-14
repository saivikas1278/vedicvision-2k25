// Cloudinary client-side upload service
class CloudinaryService {
  constructor() {
    this.cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    this.apiKey = process.env.REACT_APP_CLOUDINARY_API_KEY;
    this.uploadUrl = `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`;
  }

  // Generate upload signature (this should ideally come from backend for security)
  generateSignature(publicId, timestamp) {
    // For demo purposes - in production, signatures should be generated server-side
    return 'demo_signature';
  }

  // Upload image to Cloudinary
  async uploadImage(file, options = {}) {
    try {
      const formData = new FormData();
      const timestamp = Math.round(new Date().getTime() / 1000);
      
      // Basic upload parameters
      formData.append('file', file);
      formData.append('api_key', this.apiKey);
      formData.append('timestamp', timestamp);
      formData.append('folder', options.folder || 'sportsphere/images');
      
      // Optional parameters
      if (options.publicId) {
        formData.append('public_id', options.publicId);
      }
      if (options.transformation) {
        formData.append('transformation', options.transformation);
      }
      
      // Upload preset for unsigned uploads (configure this in Cloudinary dashboard)
      formData.append('upload_preset', options.uploadPreset || 'sportsphere_preset');

      const response = await fetch(this.uploadUrl, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      return {
        success: true,
        data: {
          url: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
          format: result.format,
          resourceType: result.resource_type
        }
      };
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Upload video to Cloudinary
  async uploadVideo(file, options = {}) {
    try {
      const formData = new FormData();
      const timestamp = Math.round(new Date().getTime() / 1000);
      
      // Basic upload parameters
      formData.append('file', file);
      formData.append('api_key', this.apiKey);
      formData.append('timestamp', timestamp);
      formData.append('resource_type', 'video');
      formData.append('folder', options.folder || 'sportsphere/videos');
      
      // Optional parameters
      if (options.publicId) {
        formData.append('public_id', options.publicId);
      }
      
      // Upload preset for unsigned uploads
      formData.append('upload_preset', options.uploadPreset || 'sportsphere_video_preset');

      const response = await fetch(this.uploadUrl.replace('/upload', '/video/upload'), {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Video upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      return {
        success: true,
        data: {
          url: result.secure_url,
          publicId: result.public_id,
          duration: result.duration,
          width: result.width,
          height: result.height,
          format: result.format,
          resourceType: result.resource_type
        }
      };
    } catch (error) {
      console.error('Cloudinary video upload error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Upload multiple files
  async uploadMultiple(files, options = {}) {
    try {
      const uploadPromises = files.map(file => {
        if (file.type.startsWith('image/')) {
          return this.uploadImage(file, options);
        } else if (file.type.startsWith('video/')) {
          return this.uploadVideo(file, options);
        } else {
          return Promise.resolve({
            success: false,
            error: 'Unsupported file type'
          });
        }
      });

      const results = await Promise.all(uploadPromises);
      
      const successful = results.filter(result => result.success);
      const failed = results.filter(result => !result.success);

      return {
        success: failed.length === 0,
        data: {
          successful: successful.map(result => result.data),
          failed: failed.map(result => result.error),
          total: files.length,
          successCount: successful.length,
          failCount: failed.length
        }
      };
    } catch (error) {
      console.error('Multiple upload error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Generate optimized image URL
  generateOptimizedUrl(publicId, options = {}) {
    const baseUrl = `https://res.cloudinary.com/${this.cloudName}/image/upload`;
    const transformations = [];

    if (options.width) transformations.push(`w_${options.width}`);
    if (options.height) transformations.push(`h_${options.height}`);
    if (options.crop) transformations.push(`c_${options.crop}`);
    if (options.quality) transformations.push(`q_${options.quality}`);
    if (options.format) transformations.push(`f_${options.format}`);

    const transformationString = transformations.length > 0 ? `/${transformations.join(',')}` : '';
    return `${baseUrl}${transformationString}/${publicId}`;
  }

  // Generate video thumbnail URL
  generateVideoThumbnail(publicId, options = {}) {
    const baseUrl = `https://res.cloudinary.com/${this.cloudName}/video/upload`;
    const transformations = ['f_jpg']; // Convert to JPG thumbnail

    if (options.width) transformations.push(`w_${options.width}`);
    if (options.height) transformations.push(`h_${options.height}`);
    if (options.crop) transformations.push(`c_${options.crop || 'fill'}`);
    if (options.quality) transformations.push(`q_${options.quality || 'auto'}`);

    const transformationString = transformations.join(',');
    return `${baseUrl}/${transformationString}/${publicId}`;
  }

  // Validate file before upload
  validateFile(file, type = 'image') {
    const maxSizes = {
      image: 10 * 1024 * 1024, // 10MB
      video: 100 * 1024 * 1024  // 100MB
    };

    const allowedTypes = {
      image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
      video: ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/webm']
    };

    if (file.size > maxSizes[type]) {
      return {
        valid: false,
        error: `File size exceeds ${maxSizes[type] / (1024 * 1024)}MB limit`
      };
    }

    if (!allowedTypes[type].includes(file.type)) {
      return {
        valid: false,
        error: `File type ${file.type} is not supported`
      };
    }

    return { valid: true };
  }
}

// Create singleton instance
const cloudinaryService = new CloudinaryService();

export default cloudinaryService;
