# Google OAuth Setup Guide

This guide will help you set up Google OAuth for the SportSphere application.

## Prerequisites

1. A Google Cloud Console account
2. Access to create OAuth 2.0 credentials

## Step 1: Create Google OAuth Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API and Google OAuth2 API
4. Go to "Credentials" in the left sidebar
5. Click "Create Credentials" → "OAuth 2.0 Client IDs"
6. Choose "Web application" as the application type
7. Add the following authorized redirect URIs:
   - `http://localhost:3000/auth/google/callback`
   - `http://localhost:5000/api/auth/google/callback`
8. Copy the Client ID and Client Secret

## Step 2: Update Environment Variables

### Backend (.env file in server directory)
```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Frontend (.env file in client directory)
```
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
REACT_APP_GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
```

## Step 3: Test the Implementation

1. Start the backend server: `cd server && npm start`
2. Start the frontend server: `cd client && npm start`
3. Navigate to `http://localhost:3000/login`
4. Click the "Sign in with Google" button
5. Complete the Google OAuth flow

## Features Implemented

✅ **Google OAuth Integration**
- Frontend Google Sign-In button
- Backend OAuth token verification
- User creation/update with Google profile data
- Automatic token storage and authentication

✅ **User Management**
- Automatic user creation for new Google users
- Profile data sync (name, email, avatar)
- Account verification for Google users

✅ **Security**
- Token-based authentication
- Secure token storage
- CORS configuration for OAuth

## Troubleshooting

### Common Issues

1. **"Invalid Google access token" error**
   - Check that your Google Client ID is correct
   - Ensure the Google+ API is enabled

2. **CORS errors**
   - Verify that `http://localhost:3000` is in the allowed origins
   - Check that the redirect URI matches exactly

3. **"Google OAuth failed to load" error**
   - Check your internet connection
   - Verify that the Google OAuth script is loading

### Testing with Test Users

You can also test with the seeded test users:
- Email: `john.smith@example.com`
- Password: `Test@123`

## Production Deployment

For production deployment:

1. Update the redirect URIs in Google Cloud Console to your production domain
2. Update environment variables with production values
3. Ensure HTTPS is enabled for security
4. Consider implementing additional security measures like CSRF protection

## API Endpoints

- `POST /api/auth/google` - Handle Google OAuth token
- `GET /api/auth/google/callback` - Handle OAuth callback (server-side flow)

## Frontend Components

- `LoginPage.js` - Google Sign-In button
- `GoogleCallback.js` - OAuth callback handler
- `googleAuthService.js` - Google OAuth service functions
