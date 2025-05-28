// Quick Grain Player - Shows videos for specific aha moments
require('dotenv').config();
const fs = require('fs');

// Configuration
const RECORDING_ID = '19bcc522-cf00-41b4-9131-7f89f329ce60'; // From the iframe URL

// Read aha moments from JSON file
function readAhaMoments() {
  try {
    console.log('Reading aha moments from JSON file...');
    const data = fs.readFileSync('aha_moments.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading aha moments:', error.message);
    process.exit(1);
  }
}

// Create a simple HTML player
function createHtmlPlayer() {
  console.log('Creating HTML player...');
  
  // Read aha moments from JSON file
  const ahaMoments = readAhaMoments();
  
  // Create HTML content
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aha Moments Video Player</title>
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
  </style>
</head>
<body>
  <div class="container">
    <h1>Aha Moments Video Player</h1>
    
    <div class="clips-container">
      ${ahaMoments.map((moment, index) => `
        <div class="clip">
          <div class="clip-title">${moment.title || 'Aha Moment'}</div>
          <div class="iframe-container">
            <iframe 
              src="https://grain.com/_/embed/recording/${RECORDING_ID}/IyQ1igZOqfAI9ngBciC2E2Ruu7djaRHmjY7JvMnZ?autoplay=false&origin=user_iframe" 
              data-id="${moment.id}"
              data-timestamp="${moment.timestamp}"
              data-stopat="${moment.stopAt}"
              height="324" 
              width="576" 
              allow="fullscreen; autoplay" 
              allowfullscreen="true" 
              frameborder="0"
              loading="lazy">
            </iframe>
          </div>
          <div class="timestamp">${moment.timestamp} - ${moment.stopAt}</div>
          ${moment.transcript ? `<div class="transcript">${moment.transcript}</div>` : ''}
        </div>
      `).join('')}
    </div>
  </div>
</body>
</html>
  `;
  
  // Write HTML to file
  fs.writeFileSync('aha_moments_player.html', html);
  console.log('HTML player created: aha_moments_player.html');
}

// Main function
function main() {
  try {
    createHtmlPlayer();
    console.log('Done! Opening HTML player...');
    
    // Try to open the HTML file based on the OS
    const { platform } = process;
    if (platform === 'darwin') { // macOS
      require('child_process').exec('open aha_moments_player.html');
    } else if (platform === 'win32') { // Windows
      require('child_process').exec('start aha_moments_player.html');
    } else if (platform === 'linux') { // Linux
      require('child_process').exec('xdg-open aha_moments_player.html');
    } else {
      console.log('Please open aha_moments_player.html in your browser.');
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the main function
main();
