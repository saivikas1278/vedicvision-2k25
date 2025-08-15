import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter using Gmail SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Send welcome email
export const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"SportSphere" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: 'Welcome to SportSphere!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb; text-align: center;">Welcome to SportSphere!</h1>
          <p>Hi ${userName},</p>
          <p>Welcome to SportSphere, your ultimate sports community platform!</p>
          <p>You can now:</p>
          <ul>
            <li>Join tournaments and compete with other athletes</li>
            <li>Share your sports journey through posts and videos</li>
            <li>Connect with fellow sports enthusiasts</li>
            <li>Track your fitness progress</li>
            <li>Form teams and participate in leagues</li>
          </ul>
          <p style="text-align: center;">
            <a href="${process.env.CLIENT_URL}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Start Your Journey
            </a>
          </p>
          <p>Best regards,<br>The SportSphere Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully to:', userEmail);
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
};

// Send notification email
export const sendNotificationEmail = async (userEmail, userName, notification) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"SportSphere" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: `SportSphere: ${notification.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb; text-align: center;">SportSphere Notification</h1>
          <p>Hi ${userName},</p>
          <h2 style="color: #1f2937;">${notification.title}</h2>
          <p>${notification.message}</p>
          <p style="text-align: center;">
            <a href="${process.env.CLIENT_URL}/notifications" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              View All Notifications
            </a>
          </p>
          <p>Best regards,<br>The SportSphere Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Notification email sent successfully to:', userEmail);
  } catch (error) {
    console.error('Error sending notification email:', error);
    throw error;
  }
};

// Send tournament invitation email
export const sendTournamentInvitationEmail = async (userEmail, userName, tournamentName, tournamentId) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"SportSphere" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: `Tournament Invitation: ${tournamentName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb; text-align: center;">Tournament Invitation</h1>
          <p>Hi ${userName},</p>
          <p>You've been invited to participate in <strong>${tournamentName}</strong>!</p>
          <p>This is an exciting opportunity to showcase your skills and compete with other talented athletes.</p>
          <p style="text-align: center;">
            <a href="${process.env.CLIENT_URL}/tournaments/${tournamentId}" style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              View Tournament Details
            </a>
          </p>
          <p>Best regards,<br>The SportSphere Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Tournament invitation email sent successfully to:', userEmail);
  } catch (error) {
    console.error('Error sending tournament invitation email:', error);
    throw error;
  }
};

// Send team invitation email
export const sendTeamInvitationEmail = async (userEmail, userName, teamName, teamId) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"SportSphere" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: `Team Invitation: ${teamName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb; text-align: center;">Team Invitation</h1>
          <p>Hi ${userName},</p>
          <p>You've been invited to join the team <strong>${teamName}</strong>!</p>
          <p>Join forces with other athletes and compete together in tournaments and matches.</p>
          <p style="text-align: center;">
            <a href="${process.env.CLIENT_URL}/teams/${teamId}" style="background-color: #8b5cf6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              View Team Details
            </a>
          </p>
          <p>Best regards,<br>The SportSphere Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Team invitation email sent successfully to:', userEmail);
  } catch (error) {
    console.error('Error sending team invitation email:', error);
    throw error;
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (userEmail, userName, resetToken) => {
  try {
    const transporter = createTransporter();
    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
    
    const mailOptions = {
      from: `"SportSphere" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb; text-align: center;">Password Reset Request</h1>
          <p>Hi ${userName},</p>
          <p>You requested a password reset for your SportSphere account.</p>
          <p>Click the button below to reset your password:</p>
          <p style="text-align: center;">
            <a href="${resetUrl}" style="background-color: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Reset Password
            </a>
          </p>
          <p><strong>Note:</strong> This link will expire in 1 hour for security reasons.</p>
          <p>If you didn't request this reset, please ignore this email.</p>
          <p>Best regards,<br>The SportSphere Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully to:', userEmail);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

// Send contact form email
export const sendContactFormEmail = async (contactData) => {
  try {
    const transporter = createTransporter();
    const { name, email, subject, category, message, priority } = contactData;
    
    // Email to support team
    const supportMailOptions = {
      from: `"SportSphere Contact Form" <${process.env.EMAIL_USER}>`,
      to: 'leelamadhav.nulakani@gmail.com',
      subject: `[SportSphere Contact] ${subject} - ${category.toUpperCase()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px;">
          <div style="background: linear-gradient(135deg, #2563eb, #7c3aed); color: white; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
            <h1 style="margin: 0; text-align: center;">SportSphere Contact Form</h1>
            <p style="margin: 10px 0 0 0; text-align: center; opacity: 0.9;">New message received</p>
          </div>
          
          <div style="background: #f9fafb; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
            <h2 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px;">Contact Information</h2>
            <div style="display: grid; gap: 10px;">
              <div><strong>Name:</strong> ${name}</div>
              <div><strong>Email:</strong> <a href="mailto:${email}" style="color: #2563eb;">${email}</a></div>
              <div><strong>Subject:</strong> ${subject}</div>
              <div><strong>Category:</strong> <span style="background: #dbeafe; color: #1d4ed8; padding: 2px 8px; border-radius: 4px; font-size: 12px; text-transform: uppercase;">${category}</span></div>
              <div><strong>Priority:</strong> <span style="background: ${priority === 'urgent' ? '#fef2f2; color: #dc2626' : priority === 'high' ? '#fef3c7; color: #d97706' : priority === 'medium' ? '#ecfdf5; color: #059669' : '#f3f4f6; color: #4b5563'}; padding: 2px 8px; border-radius: 4px; font-size: 12px; text-transform: uppercase;">${priority}</span></div>
            </div>
          </div>
          
          <div style="background: white; border: 1px solid #e5e7eb; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
            <h3 style="color: #1f2937; margin: 0 0 10px 0;">Message:</h3>
            <div style="color: #374151; line-height: 1.6; white-space: pre-wrap;">${message}</div>
          </div>
          
          <div style="background: #f0f9ff; border: 1px solid #0ea5e9; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
            <p style="margin: 0; color: #0c4a6e; font-size: 14px;">
              <strong>📅 Received:</strong> ${new Date().toLocaleString()}<br>
              <strong>⚡ Quick Reply:</strong> <a href="mailto:${email}?subject=Re: ${subject}" style="color: #0ea5e9;">Click to reply directly</a>
            </p>
          </div>
          
          <div style="text-align: center; color: #6b7280; font-size: 12px; border-top: 1px solid #e5e7eb; padding-top: 15px;">
            This email was sent from the SportSphere contact form.<br>
            Please respond within 24 hours as per our support commitment.
          </div>
        </div>
      `
    };

    // Confirmation email to user
    const userMailOptions = {
      from: `"SportSphere Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `We received your message: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2563eb, #7c3aed); color: white; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
            <h1 style="margin: 0; text-align: center;">Thank You for Contacting SportSphere!</h1>
          </div>
          
          <p>Hi ${name},</p>
          <p>Thank you for reaching out to us! We've received your message and our support team will get back to you shortly.</p>
          
          <div style="background: #f9fafb; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin: 0 0 10px 0;">Your Message Details:</h3>
            <div><strong>Subject:</strong> ${subject}</div>
            <div><strong>Category:</strong> ${category}</div>
            <div><strong>Priority:</strong> ${priority}</div>
            <div style="margin-top: 10px;"><strong>Message:</strong></div>
            <div style="background: white; padding: 10px; border-left: 3px solid #2563eb; margin-top: 5px; font-style: italic;">${message}</div>
          </div>
          
          <div style="background: #ecfdf5; border: 1px solid #10b981; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <h3 style="color: #047857; margin: 0 0 10px 0;">⏰ Expected Response Time:</h3>
            <ul style="color: #065f46; margin: 0; padding-left: 20px;">
              <li><strong>Urgent:</strong> Within 1 hour</li>
              <li><strong>High:</strong> Within 4 hours</li>
              <li><strong>Medium/Low:</strong> Within 24 hours</li>
            </ul>
          </div>
          
          <p>In the meantime, you might find answers to common questions in our <a href="${process.env.CLIENT_URL}/help" style="color: #2563eb;">Help Center</a>.</p>
          
          <p>If you have any additional questions, feel free to reply to this email or contact us at:</p>
          <ul>
            <li>📧 Email: <a href="mailto:leelamadhav.nulakani@gmail.com" style="color: #2563eb;">leelamadhav.nulakani@gmail.com</a></li>
            <li>🌐 Help Center: <a href="${process.env.CLIENT_URL}/help" style="color: #2563eb;">SportSphere Help</a></li>
          </ul>
          
          <p>Best regards,<br><strong>The SportSphere Support Team</strong></p>
          
          <div style="text-align: center; color: #6b7280; font-size: 12px; border-top: 1px solid #e5e7eb; padding-top: 15px; margin-top: 30px;">
            This is an automated confirmation email. Please do not reply to this email address.
          </div>
        </div>
      `
    };

    // Send both emails
    await transporter.sendMail(supportMailOptions);
    await transporter.sendMail(userMailOptions);
    
    console.log('Contact form emails sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending contact form email:', error);
    throw error;
  }
};

// Test email connection
export const testEmailConnection = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Email service connected successfully');
    return true;
  } catch (error) {
    console.error('❌ Email service connection failed:', error);
    return false;
  }
};

const emailService = {
  sendWelcomeEmail,
  sendNotificationEmail,
  sendTournamentInvitationEmail,
  sendTeamInvitationEmail,
  sendPasswordResetEmail,
  sendContactFormEmail,
  testEmailConnection
};

export default emailService;
