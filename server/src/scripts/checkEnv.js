import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('🔍 Environment Variables Check');
console.log('================================');

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY);
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? '***' + process.env.CLOUDINARY_API_SECRET.slice(-4) : 'MISSING');

console.log('\n🔧 Validation:');
console.log('- Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME ? '✅ Set' : '❌ Missing');
console.log('- API Key:', process.env.CLOUDINARY_API_KEY ? '✅ Set' : '❌ Missing');
console.log('- API Secret:', process.env.CLOUDINARY_API_SECRET ? '✅ Set' : '❌ Missing');

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.log('\n❌ Missing Cloudinary credentials!');
  console.log('Please update your .env file with valid Cloudinary credentials.');
} else {
  console.log('\n✅ All Cloudinary credentials are present.');
  console.log('If you\'re still getting authentication errors, the credentials may be incorrect.');
  console.log('Please verify them in your Cloudinary dashboard.');
}

console.log('\n📝 Next Steps:');
console.log('1. Go to https://cloudinary.com/console');
console.log('2. Sign in to your account');
console.log('3. Copy the correct credentials from the dashboard');
console.log('4. Update your .env file');
console.log('5. Restart the server');
