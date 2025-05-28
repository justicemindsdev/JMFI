/**
 * Grain Highlight Creator
 * 
 * This script creates highlights for specific segments of a Grain recording
 * using the Grain API. It then outputs the embed URLs for each highlight.
 * 
 * Usage:
 * 1. Set your Grain API token in the .env file
 * 2. Run: node create_grain_highlights.js
 */

const axios = require('axios');
require('dotenv').config();

// Grain API configuration
const GRAIN_API_TOKEN = process.env.GRAIN_API_TOKEN;
const RECORDING_ID = '026973da-9ff2-493a-ab85-44a54170f43a';

// Define segments (start time in seconds, duration in seconds, title)
const segments = [
  { start: 224, duration: 36, title: "On Manifesting Abundance" },
  { start: 1674, duration: 73, title: "On Taking Initiative" },
  { start: 1831, duration: 130, title: "On Breaking Free from Cultural Conditioning" },
  { start: 2176, duration: 77, title: "On Recognizing Your Value" },
  { start: 4448, duration: 82, title: "On Creative Potential" },
  { start: 8347, duration: 50, title: "On Authentic Self-Expression" }
];

// Function to create a highlight
async function createHighlight(segment) {
  try {
    console.log(`Creating highlight for "${segment.title}"...`);
    
    const response = await axios({
      method: 'post',
      url: `https://api.grain.com/_/public-api/recordings/${RECORDING_ID}/highlights`,
      headers: {
        'Authorization': `Bearer ${GRAIN_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      data: {
        timestamp: segment.start,
        duration: segment.duration,
        text: segment.title
      }
    });
    
    console.log(`✅ Created highlight for "${segment.title}"`);
    console.log(`   ID: ${response.data.id}`);
    console.log(`   Embed URL: https://grain.com/_/embed/highlight/${response.data.id}/${response.data.accessToken}`);
    console.log('');
    
    return {
      title: segment.title,
      highlightId: response.data.id,
      accessToken: response.data.accessToken,
      embedUrl: `https://grain.com/_/embed/highlight/${response.data.id}/${response.data.accessToken}`
    };
  } catch (error) {
    console.error(`❌ Error creating highlight for "${segment.title}":`);
    if (error.response && error.response.data) {
      console.error('   API Error:', error.response.data);
    } else {
      console.error('   Error:', error.message);
    }
    console.log('');
    return null;
  }
}

// Create all highlights
async function createAllHighlights() {
  console.log('🎬 Creating Grain highlights for all segments...\n');
  
  // Check if API token is set
  if (!GRAIN_API_TOKEN) {
    console.error('❌ Error: GRAIN_API_TOKEN is not set in .env file');
    console.log('Please create a .env file with your Grain API token:');
    console.log('GRAIN_API_TOKEN=your_api_token_here');
    return;
  }
  
  const results = [];
  
  for (const segment of segments) {
    const result = await createHighlight(segment);
    if (result) results.push(result);
  }
  
  if (results.length === 0) {
    console.error('❌ No highlights were created successfully.');
    return;
  }
  
  console.log('📋 Summary of created highlights:');
  console.table(results.map(r => ({
    Title: r.title,
    HighlightID: r.highlightId,
    Duration: segments.find(s => s.title === r.title).duration + 's'
  })));
  
  console.log('\n📝 HTML embed code for all highlights:');
  results.forEach(highlight => {
    console.log(`\n<!-- ${highlight.title} -->`);
    console.log(`<iframe 
    src="${highlight.embedUrl}" 
    allow="fullscreen" 
    allowfullscreen="true" 
    frameborder="0">
</iframe>`);
  });
  
  console.log('\n✨ Done! You can now use these embed URLs in your HTML.');
}

// Run the script
createAllHighlights().catch(error => {
  console.error('Unhandled error:', error);
});
