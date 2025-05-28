// Load Aha Moments from Supabase
require('dotenv').config();
require('dotenv').config({ path: '.env.supabase' });
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Configuration
const RECORDING_ID = '19bcc522-cf00-41b4-9131-7f89f329ce60'; // From the iframe URL

// Get all aha moments for a recording
async function getAhaMoments(grainRecordingId) {
  console.log(`Getting aha moments for recording: ${grainRecordingId}`);
  
  // First get the recording
  const { data: recording, error: recordingError } = await supabase
    .from('recordings')
    .select('id')
    .eq('grain_recording_id', grainRecordingId)
    .single();

  if (recordingError) {
    console.error('Error fetching recording:', recordingError);
    throw recordingError;
  }

  if (!recording) {
    console.log('Recording not found');
    return [];
  }

  // Then get the aha moments
  const { data: moments, error: momentsError } = await supabase
    .from('aha_moments')
    .select('*')
    .eq('recording_id', recording.id)
    .order('timestamp', { ascending: true });

  if (momentsError) {
    console.error('Error fetching aha moments:', momentsError);
    throw momentsError;
  }

  console.log(`Found ${moments.length} aha moments`);

  // Format the moments to match our expected format
  return moments.map(moment => ({
    id: moment.moment_id,
    title: moment.title,
    timestamp: moment.timestamp,
    stopAt: moment.stop_at,
    transcript: moment.transcript,
    analysis: moment.analysis,
    sentiment: moment.sentiment,
    tags: moment.tags,
    thumbnailUrl: moment.thumbnail_url
  }));
}

// Create a simple HTML player
function createHtmlPlayer(ahaMoments) {
  console.log('Creating HTML player...');
  
  // Create HTML content
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aha Moments from Supabase</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #121212;
      color: #e0e0e0;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    h1 {
      color: #ffffff;
      border-bottom: 1px solid #333;
      padding-bottom: 10px;
    }
    .clips-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 30px;
      margin-top: 30px;
    }
    .clip {
      background-color: #1e1e1e;
      border-radius: 8px;
      overflow: hidden;
      transition: transform 0.3s ease;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }
    .clip:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
    }
    .clip-title {
      padding: 15px;
      font-weight: bold;
      font-size: 18px;
      background-color: #2a2a2a;
      color: #bb86fc;
    }
    .iframe-container {
      position: relative;
      padding-bottom: 56.25%; /* 16:9 aspect ratio */
      height: 0;
      overflow: hidden;
    }
    .iframe-container iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: none;
    }
    .thumbnail {
      width: 100%;
      height: auto;
      cursor: pointer;
      transition: opacity 0.3s;
    }
    .thumbnail:hover {
      opacity: 0.8;
    }
    .timestamp {
      color: #bb86fc;
      font-size: 0.9em;
      padding: 10px 15px;
      background-color: #222;
      display: inline-block;
      margin: 10px;
      border-radius: 4px;
    }
    .transcript {
      padding: 15px;
      font-style: italic;
      border-top: 1px solid #333;
      color: #aaa;
      max-height: 100px;
      overflow-y: auto;
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      padding: 0 15px 15px 15px;
    }
    .tag {
      background-color: #333;
      color: #bb86fc;
      padding: 3px 8px;
      border-radius: 12px;
      font-size: 0.8em;
    }
    .sentiment {
      margin: 0 15px 15px 15px;
      font-size: 0.9em;
    }
    .sentiment.positive {
      color: #4caf50;
    }
    .sentiment.neutral {
      color: #9e9e9e;
    }
    .sentiment.negative {
      color: #f44336;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Aha Moments from Supabase</h1>
    
    <div class="clips-container">
      ${ahaMoments.map((moment, index) => `
        <div class="clip">
          <div class="clip-title">${moment.title || 'Aha Moment'}</div>
          <div class="iframe-container">
            ${moment.thumbnailUrl ? 
              `<img 
                src="${moment.thumbnailUrl}" 
                alt="${moment.title || 'Aha Moment'}" 
                class="thumbnail"
                onclick="playVideo('${RECORDING_ID}', '${moment.timestamp}', '${moment.stopAt}', ${index})"
              />` : 
              `<iframe 
                src="https://grain.com/_/embed/recording/${RECORDING_ID}/IyQ1igZOqfAI9ngBciC2E2Ruu7djaRHmjY7JvMnZ?autoplay=false&origin=user_iframe&start=${moment.timestamp}&end=${moment.stopAt}" 
                height="324" 
                width="576" 
                allow="fullscreen; autoplay" 
                allowfullscreen="true" 
                frameborder="0"
                loading="lazy">
              </iframe>`
            }
          </div>
          <div class="timestamp">${moment.timestamp} - ${moment.stopAt}</div>
          ${moment.transcript ? `<div class="transcript">${moment.transcript}</div>` : ''}
          ${moment.sentiment ? `
            <div class="sentiment ${moment.sentiment.toLowerCase()}">
              Sentiment: ${moment.sentiment}
            </div>
          ` : ''}
          ${moment.tags && moment.tags.length > 0 ? `
            <div class="tags">
              ${moment.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
          ` : ''}
        </div>
      `).join('')}
    </div>
  </div>

  <script>
    // Function to play video when thumbnail is clicked
    function playVideo(recordingId, startTime, stopTime, index) {
      const container = document.querySelectorAll('.iframe-container')[index];
      const thumbnail = container.querySelector('.thumbnail');
      
      if (thumbnail) {
        // Create iframe
        const iframe = document.createElement('iframe');
        iframe.src = \`https://grain.com/_/embed/recording/\${recordingId}/IyQ1igZOqfAI9ngBciC2E2Ruu7djaRHmjY7JvMnZ?autoplay=true&origin=user_iframe&start=\${startTime}&end=\${stopTime}\`;
        iframe.height = "324";
        iframe.width = "576";
        iframe.allow = "fullscreen; autoplay";
        iframe.allowFullscreen = true;
        iframe.frameBorder = "0";
        
        // Replace thumbnail with iframe
        container.innerHTML = '';
        container.appendChild(iframe);
      }
    }
  </script>
</body>
</html>
  `;
  
  // Write HTML to file
  fs.writeFileSync('aha_moments_from_supabase.html', html);
  console.log('HTML player created: aha_moments_from_supabase.html');
}

// Main function
async function main() {
  try {
    // Get aha moments from Supabase
    const ahaMoments = await getAhaMoments(RECORDING_ID);
    
    if (ahaMoments.length === 0) {
      console.log('No aha moments found. Please run save_to_supabase.js first.');
      process.exit(0);
    }
    
    // Create HTML player
    createHtmlPlayer(ahaMoments);
    
    console.log('Done! Opening HTML player...');
    
    // Try to open the HTML file based on the OS
    const { platform } = process;
    if (platform === 'darwin') { // macOS
      require('child_process').exec('open aha_moments_from_supabase.html');
    } else if (platform === 'win32') { // Windows
      require('child_process').exec('start aha_moments_from_supabase.html');
    } else if (platform === 'linux') { // Linux
      require('child_process').exec('xdg-open aha_moments_from_supabase.html');
    } else {
      console.log('Please open aha_moments_from_supabase.html in your browser.');
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the main function
main();
