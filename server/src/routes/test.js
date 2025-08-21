import express from 'express';
import emailService from '../utils/emailService.js';
import { protect } from '../middleware/auth.js';
import { uploadImage, uploadVideo } from '../utils/uploadUtils.js';
import { getCurrentTimestamp, getCloudinaryTimestamp } from '../utils/timeSync.js';

const router = express.Router();

// Test email sending
router.post('/test-email', protect, async (req, res) => {
  try {
    const { type = 'welcome', email, name } = req.body;
    
    if (!email || !name) {
      return res.status(400).json({
        success: false,
        message: 'Email and name are required'
      });
    }

    switch (type) {
      case 'welcome':
        await emailService.sendWelcomeEmail(email, name);
        break;
      case 'notification':
        await emailService.sendNotificationEmail(email, name, {
          title: 'Test Notification',
          message: 'This is a test notification from SportSphere!'
        });
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid email type'
        });
    }

    res.json({
      success: true,
      message: `${type} email sent successfully to ${email}`
    });
  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send test email',
      error: error.message
    });
  }
});

// Test email connection
router.get('/test-connection', protect, async (req, res) => {
  try {
    const isConnected = await emailService.testEmailConnection();
    
    res.json({
      success: true,
      connected: isConnected,
      message: isConnected ? 'Email service is working' : 'Email service connection failed'
    });
  } catch (error) {
    console.error('Test connection error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to test email connection',
      error: error.message
    });
  }
});

// @desc    Test image upload
// @route   POST /api/test/upload-image
// @access  Private
router.post('/upload-image', protect, async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }

    console.log('[TEST] Testing image upload...');
    const result = await uploadImage(req.files.image.tempFilePath);

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        timestamp: Math.round(Date.now() / 1000)
      }
    });
  } catch (error) {
    console.error('[TEST] Image upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Test server timestamp
// @route   GET /api/test/timestamp
// @access  Public
router.get('/timestamp', async (req, res) => {
  try {
    const serverTime = new Date();
    const localTimestamp = Math.round(Date.now() / 1000);
    const syncedTimestamp = await getCurrentTimestamp();
    const cloudinaryTimestamp = await getCloudinaryTimestamp();
    
    res.json({
      success: true,
      data: {
        serverTime: serverTime.toISOString(),
        localTimestamp: localTimestamp,
        syncedTimestamp: syncedTimestamp,
        cloudinaryTimestamp: cloudinaryTimestamp,
        timezoneOffset: serverTime.getTimezoneOffset(),
        syncedTime: new Date(syncedTimestamp * 1000).toISOString(),
        cloudinaryTime: new Date(cloudinaryTimestamp * 1000).toISOString(),
        timeDifference: {
          localVsSync: localTimestamp - syncedTimestamp,
          localVsCloudinary: localTimestamp - cloudinaryTimestamp
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get timestamp information',
      error: error.message
    });
  }
});

export default router;
