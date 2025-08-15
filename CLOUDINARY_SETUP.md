# Cloudinary Setup Instructions

## Option 1: Create New Cloudinary Account (Recommended)

1. Go to https://cloudinary.com/
2. Sign up for a free account
3. After signup, go to Dashboard
4. Copy the credentials from the "Product Environment Credentials" section:
   - Cloud Name
   - API Key 
   - API Secret

## Option 2: Use Test/Mock Upload (Temporary)

For testing purposes, we can disable Cloudinary temporarily and use local file storage or mock uploads.

## Option 3: Alternative Cloud Storage

We can integrate with other services like:
- AWS S3
- Firebase Storage
- Azure Blob Storage

## Current Issue

The current Cloudinary credentials are returning "Invalid Signature" error, which means:
- API Secret is incorrect
- API Key is incorrect  
- Cloud Name is incorrect
- Account may be suspended/expired

## Quick Fix

Update your .env file with new credentials:

```
CLOUDINARY_CLOUD_NAME=your_new_cloud_name
CLOUDINARY_API_KEY=your_new_api_key  
CLOUDINARY_API_SECRET=your_new_api_secret
```
