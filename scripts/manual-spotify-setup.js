#!/usr/bin/env node

// Manual Spotify setup - no callback server needed
console.log('\n🎵 Manual Spotify Token Setup (Works with ANY redirect URI!)\n');

const CLIENT_ID = process.argv[2];
const CLIENT_SECRET = process.argv[3];
const AUTHORIZATION_CODE = process.argv[4];

if (!CLIENT_ID) {
  console.log('📝 STEP 1: Set up your Spotify App');
  console.log('==================================');
  console.log('1. Go to: https://developer.spotify.com/dashboard');
  console.log('2. Create/edit your app');
  console.log('3. Set redirect URI to ANY URL you want (even fake ones work):');
  console.log('   • https://example.com/callback');
  console.log('   • https://mywebsite.com/spotify'); 
  console.log('   • https://anything.example/whatever');
  console.log('4. Note your Client ID and Client Secret\n');
  
  console.log('📝 STEP 2: Run this script with your Client ID');
  console.log('===============================================');
  console.log('node scripts/manual-spotify-setup.js YOUR_CLIENT_ID\n');
  process.exit(0);
}

if (!CLIENT_SECRET) {
  console.log('📝 STEP 3: Get Authorization URL');
  console.log('================================');
  
  const scope = 'user-read-currently-playing user-read-recently-played';
  // Use a generic redirect - we'll extract the code manually
  const redirectUri = 'https://example.com/callback';
  
  const authUrl = `https://accounts.spotify.com/authorize?` + 
    `client_id=${CLIENT_ID}&` +
    `response_type=code&` +
    `redirect_uri=${redirectUri}&` +
    `scope=${encodeURIComponent(scope)}`;
  
  console.log('🔗 1. Visit this URL to authorize:');
  console.log(`\n${authUrl}\n`);
  console.log('🔍 2. After clicking "Agree", you\'ll be redirected to a page that might not exist.');
  console.log('   That\'s OK! Just look at the URL in your browser address bar.');
  console.log('   It will look like: https://example.com/callback?code=ABC123XYZ...');
  console.log('\n📋 3. Copy the CODE part (after "code=") from the URL');
  console.log('    Example: if URL is https://example.com/callback?code=ABC123XYZ');
  console.log('    Copy: ABC123XYZ\n');
  console.log('🏃 4. Run this script again with your credentials:');
  console.log(`   node scripts/manual-spotify-setup.js ${CLIENT_ID} YOUR_CLIENT_SECRET YOUR_CODE\n`);
  process.exit(0);
}

if (!AUTHORIZATION_CODE) {
  console.log('❌ Missing authorization code!');
  console.log('Usage: node scripts/manual-spotify-setup.js CLIENT_ID CLIENT_SECRET AUTHORIZATION_CODE\n');
  process.exit(1);
}

// Exchange the code for tokens
const https = require('https');
const { URLSearchParams } = require('url');

const data = new URLSearchParams({
  grant_type: 'authorization_code',
  code: AUTHORIZATION_CODE,
  redirect_uri: 'https://example.com/callback', // Must match what we used above
});

const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

const options = {
  hostname: 'accounts.spotify.com',
  path: '/api/token',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${auth}`,
    'Content-Length': data.toString().length,
  }
};

console.log('🔄 Exchanging authorization code for tokens...\n');

const req = https.request(options, (res) => {
  let body = '';
  
  res.on('data', (chunk) => {
    body += chunk;
  });
  
  res.on('end', () => {
    try {
      const response = JSON.parse(body);
      
      if (response.error) {
        console.error('❌ Error:', response.error_description || response.error);
        console.log('\n🔍 Troubleshooting:');
        console.log('• Make sure your Client ID and Secret are correct');
        console.log('• Check that the authorization code is complete (no missing characters)');
        console.log('• Make sure you didn\'t wait too long (codes expire in ~10 minutes)');
        process.exit(1);
      }
      
      console.log('🎉 SUCCESS! Your Spotify API is ready!\n');
      console.log('📝 Add these to your .env.local file:');
      console.log('=======================================');
      console.log(`SPOTIFY_CLIENT_ID=${CLIENT_ID}`);
      console.log(`SPOTIFY_CLIENT_SECRET=${CLIENT_SECRET}`);
      console.log(`SPOTIFY_REFRESH_TOKEN=${response.refresh_token}`);
      console.log('=======================================\n');
      console.log('🎵 Your music streamer should now work perfectly!');
      console.log('🚀 Start your dev server and check the Music section.');
      
    } catch (error) {
      console.error('❌ Failed to parse response:', body);
      process.exit(1);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request failed:', error.message);
  process.exit(1);
});

req.write(data.toString());
req.end();
