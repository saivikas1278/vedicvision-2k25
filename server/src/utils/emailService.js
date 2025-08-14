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
  testEmailConnection
};

export default emailService;
