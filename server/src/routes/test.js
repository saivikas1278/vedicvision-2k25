import express from 'express';
import emailService from '../utils/emailService.js';
import { protect } from '../middleware/auth.js';

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

export default router;
