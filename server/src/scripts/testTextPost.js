import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Test creating a text post
async function testTextPost() {
  try {
    console.log('🧪 Testing text post creation...');
    
    // You need to get a valid JWT token for this to work
    // For now, let's test the endpoint without auth to see if it's working
    const testData = {
      title: 'Test Text Post',
      content: 'This is a test post to check if basic post creation works',
      type: 'text',
      sport: 'general',
      tags: 'test,api',
      privacy: 'public'
    };

    console.log('📝 POST data:', testData);
    
    // Test without auth first to see the error message
    try {
      const response = await axios.post(`${API_URL}/posts`, testData, {
        timeout: 5000
      });
      console.log('✅ Response:', response.data);
    } catch (error) {
      console.log('❌ Error details:');
      console.log('  Message:', error.message);
      console.log('  Code:', error.code);
      console.log('  Status:', error.response?.status);
      console.log('  Data:', error.response?.data);
      
      if (error.code === 'ECONNREFUSED') {
        console.log('🔌 Server is not running or not accessible');
      } else if (error.response?.status === 401) {
        console.log('🔐 Authentication required - this is expected');
        console.log('💡 Test with valid token in the frontend');
      }
    }
    
  } catch (error) {
    console.error('💥 Test failed:', error.message);
  }
}

testTextPost();
