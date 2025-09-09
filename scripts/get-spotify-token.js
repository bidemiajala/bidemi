#!/usr/bin/env node

// Simple script to get Spotify refresh token
// Run with: node scripts/get-spotify-token.js

const https = require('https');
const { URLSearchParams } = require('url');

console.log('\n🎵 Spotify Token Generator\n');
console.log('Follow these steps:\n');

console.log('1. Go to your Spotify App settings');
  console.log('2. Set redirect URI to: http://127.0.0.1:3000/callback');
console.log('3. Note your Client ID and Client Secret\n');

const CLIENT_ID = process.argv[2];
const CLIENT_SECRET = process.argv[3];
const AUTHORIZATION_CODE = process.argv[4];

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.log('Usage: node get-spotify-token.js CLIENT_ID CLIENT_SECRET [AUTHORIZATION_CODE]\n');
  
  if (!CLIENT_ID) {
    console.log('If you only have CLIENT_ID, run:');
    console.log('node scripts/get-spotify-token.js YOUR_CLIENT_ID\n');
    console.log('This will give you the authorization URL to visit.');
  }
  
  process.exit(1);
}

if (!AUTHORIZATION_CODE) {
  // Step 1: Generate authorization URL
  const scope = 'user-read-currently-playing user-read-recently-played';
  const authUrl = `https://accounts.spotify.com/authorize?` + 
    `client_id=${CLIENT_ID}&` +
    `response_type=code&` +
    `redirect_uri=http://127.0.0.1:3000/callback&` +
    `scope=${encodeURIComponent(scope)}`;
  
  console.log('🔗 Visit this URL to authorize your app:');
  console.log(`\n${authUrl}\n`);
  console.log('After authorizing, you\'ll be redirected to a page that won\'t load.');
  console.log('Copy the "code" parameter from the URL and run:');
  console.log(`node scripts/get-spotify-token.js ${CLIENT_ID} ${CLIENT_SECRET} YOUR_CODE_HERE\n`);
  
  process.exit(0);
}

// Step 2: Exchange code for refresh token
const data = new URLSearchParams({
  grant_type: 'authorization_code',
  code: AUTHORIZATION_CODE,
  redirect_uri: 'http://127.0.0.1:3000/callback',
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
        process.exit(1);
      }
      
      console.log('✅ Success! Here are your tokens:\n');
      console.log('Add these to your .env.local file:');
      console.log('=====================================');
      console.log(`SPOTIFY_CLIENT_ID=${CLIENT_ID}`);
      console.log(`SPOTIFY_CLIENT_SECRET=${CLIENT_SECRET}`);
      console.log(`SPOTIFY_REFRESH_TOKEN=${response.refresh_token}`);
      console.log('=====================================\n');
      console.log('🎉 Your Spotify streamer should now work!');
      
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
