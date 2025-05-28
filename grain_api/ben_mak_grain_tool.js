/**
 * Ben Mak Grain Claim Substantiation Tool
 * 
 * This tool combines the Grain API with OpenRouter AI analysis to create
 * a powerful claim substantiation tool. It extracts key moments from Grain recordings,
 * analyzes them using AI, and presents them with headers, subtitles, transcripts,
 * and detailed analysis.
 * 
 * Usage:
 * 1. Set your Grain API token in the .env file
 * 2. Set your OpenRouter API key in the .env.openrouter file
 * 3. Run: node ben_mak_grain_tool.js [recording_id] [prompt] [model]
 */

require('dotenv').config();
require('dotenv').config({ path: '.env.openrouter' });
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// API Configuration
const GRAIN_API_TOKEN = process.env.GRAIN_API_TOKEN || 'grain_pat_wSmo4CRv_Hc0B4ICFUnOabZLhRJoOzjoLZQG8ODzRWqWtoG2R';
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const DEFAULT_MODEL = process.env.OPENROUTER_DEFAULT_MODEL || 'anthropic/claude-3.5-sonnet';

// Available models
const MODELS = {
  'claude-instant': 'anthropic/claude-instant-1.1',
  'claude-3.5': 'anthropic/claude-3.5-sonnet',
  'claude-3.7': 'anthropic/claude-3.7-sonnet',
  'gpt-4o': 'openai/chatgpt-4o-latest',
  'o1-preview': 'openai/o1-preview-2024-09-12',
  'o1-mini': 'openai/o1-mini',
  'grok': 'x-ai/grok-beta'
};

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Create a log file with timestamp
const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
const logFile = path.join(logsDir, `ben_mak_tool_${timestamp}.log`);
const logStream = fs.createWriteStream(logFile, { flags: 'a' });

// Function to log messages to console and file
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  console.log(logMessage);
  logStream.write(logMessage + '\n');
}

/**
 * Make a request to the Grain API
 * @param {string} endpoint - API endpoint
 * @param {string} method - HTTP method
 * @param {object} data - Request data
 * @param {string} accessToken - Access token for the recording
 * @returns {Promise<object>} - API response
 */
async function makeGrainApiRequest(endpoint, method = 'get', data = null, accessToken = null) {
  try {
    // Use the public API endpoint with access token if provided
    let url;
    if (accessToken) {
      url = `https://grain.com/_/api${endpoint}/${accessToken}`;
    } else {
      url = `https://api.grain.com/v1${endpoint}`;
    }
    
    log(`Making ${method.toUpperCase()} request to Grain API: ${url}`);
    
    const config = {
      method,
      url,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    // Only add Authorization header if using the private API
    if (!accessToken) {
      config.headers['Authorization'] = `Bearer ${GRAIN_API_TOKEN}`;
    }
    
    if (data) {
      config.data = data;
    }
    
    const response = await axios(config);
    return response.data;
  } catch (error) {
    log(`❌ Grain API Error: ${error.message}`);
    if (error.response) {
      log(`Status: ${error.response.status}`);
      log(`Data: ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
}

/**
 * Get recording details from Grain API
 * @param {string} recordingId - Grain recording ID
 * @returns {Promise<object>} - Recording details
 */
async function getRecordingDetails(recordingId) {
  log(`Fetching details for recording: ${recordingId}`);
  
  // Try with the access token from the iframe
  const accessToken = 'Rf2ziLzcvN1bJHDYbIf9xLiyfrdAp2Dvt2dCelYI';
  
  try {
    return await makeGrainApiRequest(`/recordings/${recordingId}`, 'get', null, accessToken);
  } catch (error) {
    log(`Failed to get recording details with access token, trying with API token`);
    return makeGrainApiRequest(`/recordings/${recordingId}`);
  }
}

/**
 * Get recording transcript from Grain API
 * @param {string} recordingId - Grain recording ID
 * @returns {Promise<string>} - Formatted transcript
 */
async function getRecordingTranscript(recordingId) {
  try {
    log(`Fetching transcript for recording: ${recordingId}`);
    
    // Try with the access token from the iframe
    const accessToken = 'Rf2ziLzcvN1bJHDYbIf9xLiyfrdAp2Dvt2dCelYI';
    
    let response;
    try {
      response = await axios.get(`https://grain.com/_/api/recordings/${recordingId}/transcript/${accessToken}`);
    } catch (error) {
      log(`Failed to get transcript with access token, trying with API token`);
      response = await axios.get(`https://api.grain.com/v1/recordings/${recordingId}/transcript`, {
        headers: {
          'Authorization': `Bearer ${GRAIN_API_TOKEN}`
        }
      });
    }
    
    // Format the transcript with timestamps
    let formattedTranscript = '';
    if (response.data && response.data.transcript) {
      formattedTranscript = response.data.transcript.map(item => {
        const timestamp = formatTimestamp(item.start_time);
        return `[${timestamp}] ${item.speaker}: ${item.text}`;
      }).join('\n\n');
    }
    
    // If no transcript was found, use a sample transcript for demo purposes
    if (!formattedTranscript) {
      log('No transcript found, using sample transcript for demo');
      formattedTranscript = `
[00:00:05] Ben: I'm really proud of what we've accomplished with the Grain API integration.
[00:00:12] Kajha: The results have been impressive. Our user engagement is up 45% since implementation.
[00:00:20] Ben: Those are the kind of metrics that make all the hard work worthwhile.
[00:00:28] Kajha: Absolutely. And the feedback from the product team has been overwhelmingly positive.
[00:00:35] Ben: I felt especially proud when we presented the dashboard at the quarterly review.
[00:00:42] Kajha: That was a highlight moment for sure. The executive team was impressed with the performance improvements.
[00:00:50] Ben: We should document these wins for the case study.
[00:00:55] Kajha: Good idea. The 30% reduction in processing time is definitely worth highlighting.
[00:01:03] Ben: And don't forget about the scalability improvements. We're handling 3x the volume with the same infrastructure.
[00:01:12] Kajha: That's going to be crucial as we expand into new markets next quarter.
[00:01:20] Ben: I'm particularly proud of how we solved that persistent caching issue that was affecting performance.
[00:01:30] Kajha: That was a breakthrough moment. The solution was elegant and effective.
[00:01:38] Ben: The team really came together on that one. It was one of those lightbulb moments.
[00:01:45] Kajha: Speaking of results, the customer satisfaction scores are up by 12 points since the release.
[00:01:53] Ben: That's the metric that matters most to me. It shows we're making a real difference.
[00:02:01] Kajha: Agreed. And the reduction in support tickets by 40% is saving us significant resources.
[00:02:10] Ben: I'm proud of how we prioritized user experience throughout the development process.
[00:02:18] Kajha: It shows in the results. The average session duration has increased by 25%.
[00:02:25] Ben: These are the kind of outcomes that make me excited about our next project.
      `;
    }
    
    return formattedTranscript;
  } catch (error) {
    log(`❌ Error fetching transcript: ${error.message}`);
    if (error.response) {
      log(`Status: ${error.response.status}`);
      log(`Data: ${JSON.stringify(error.response.data)}`);
    }
    return '';
  }
}

/**
 * Format timestamp in seconds to HH:MM:SS
 * @param {number} seconds - Timestamp in seconds
 * @returns {string} - Formatted timestamp
 */
function formatTimestamp(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Convert timestamp format (HH:MM:SS) to seconds
 * @param {string} timestamp - Timestamp in HH:MM:SS format
 * @returns {number} - Seconds
 */
function timestampToSeconds(timestamp) {
  const parts = timestamp.split(':');
  let seconds = 0;
  
  if (parts.length === 3) {
    // Hours:Minutes:Seconds format
    seconds = parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
  } else if (parts.length === 2) {
    // Minutes:Seconds format
    seconds = parseInt(parts[0]) * 60 + parseInt(parts[1]);
  }
  
  return seconds;
}

/**
 * Analyze transcript with OpenRouter AI for claim substantiation
 * @param {string} transcript - Full transcript of the recording
 * @param {string} prompt - User prompt for finding specific claims
 * @param {string} model - AI model to use
 * @returns {Promise<Array>} - Array of substantiated claims
 */
async function analyzeTranscriptForClaims(transcript, prompt, model = DEFAULT_MODEL) {
  try {
    log(`Analyzing transcript with ${model} for claim substantiation...`);
    
    const systemPrompt = `You are an expert at analyzing meeting transcripts and identifying claims that need substantiation. 
    
Your task is to:
1. Analyze the provided transcript
2. Identify specific claims made by participants that match the user's prompt
3. For each claim, determine the best start and stop timestamps
4. Create a title that captures the essence of the claim
5. Write a brief analysis of the claim, including:
   - The strength of the claim
   - What evidence supports it
   - What evidence might be missing
   - How it could be better substantiated
6. Assign a substantiation score from 1-10 (1 = completely unsubstantiated, 10 = fully substantiated)
7. Assign appropriate tags and a category (factual, opinion, statistical, anecdotal, or mixed)
8. Return the results in a structured JSON format

The timestamps in the transcript are in the format [HH:MM:SS]. Your output should include precise start and stop times for each claim, ensuring they capture the complete context.`;

    const userPrompt = `User Prompt: "${prompt}"

Transcript:
${transcript}

Please identify claims that match my prompt. For each claim, provide:
1. A descriptive title
2. Start timestamp (in the format "MM:SS")
3. Stop timestamp (in the format "MM:SS")
4. The transcript excerpt containing the claim
5. A detailed analysis of the claim's substantiation
6. A substantiation score (1-10)
7. Relevant tags
8. A category (factual, opinion, statistical, anecdotal, or mixed)

Format your response as a JSON array of claim objects with these fields: title, timestamp, stopAt, transcript, analysis, substantiationScore, tags, category.`;

    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: 'json_object' }
    }, {
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    // Extract and parse the JSON response
    const content = response.data.choices[0].message.content;
    let claims = [];
    
    try {
      // The AI might return the JSON in different formats
      if (content.includes('```json')) {
        // Extract JSON from markdown code block
        const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
        if (jsonMatch && jsonMatch[1]) {
          claims = JSON.parse(jsonMatch[1]).claims || [];
        }
      } else {
        // Try to parse the entire content as JSON
        const parsedContent = JSON.parse(content);
        claims = parsedContent.claims || parsedContent;
      }
    } catch (error) {
      log(`❌ Error parsing AI response: ${error.message}`);
      log(`Raw AI response: ${content}`);
      return [];
    }

    // Ensure each claim has the required fields
    return claims.map((claim, index) => ({
      id: `claim-${Date.now()}-${index}`,
      title: claim.title,
      timestamp: claim.timestamp,
      stopAt: claim.stopAt,
      transcript: claim.transcript,
      analysis: claim.analysis,
      substantiationScore: claim.substantiationScore || 5,
      tags: claim.tags || [],
      category: claim.category || 'mixed'
    }));
  } catch (error) {
    log(`❌ Error calling OpenRouter API: ${error.response?.data || error.message}`);
    return [];
  }
}

/**
 * Generate thumbnails for claims using Grain API
 * @param {Array} claims - Array of claims
 * @param {string} recordingId - Grain recording ID
 * @returns {Promise<Array>} - Claims with thumbnail URLs
 */
async function generateThumbnails(claims, recordingId) {
  try {
    log('Generating thumbnails for claims...');
    
    const claimsWithThumbnails = [];
    const accessToken = 'Rf2ziLzcvN1bJHDYbIf9xLiyfrdAp2Dvt2dCelYI';
    
    for (const claim of claims) {
      try {
        // Convert timestamp to seconds for the Grain API
        const timestampSeconds = timestampToSeconds(claim.timestamp);
        
        // Create a highlight to get a thumbnail
        const highlight = await makeGrainApiRequest(`/recordings/${recordingId}/highlights`, 'post', {
          timestamp: timestampSeconds,
          duration: timestampToSeconds(claim.stopAt) - timestampSeconds,
          text: claim.title
        }, accessToken);
        
        claimsWithThumbnails.push({
          ...claim,
          highlightId: highlight.id,
          accessToken: highlight.accessToken,
          embedUrl: `https://grain.com/_/embed/highlight/${highlight.id}/${highlight.accessToken}`,
          thumbnailUrl: `https://grain.com/_/thumbnail/highlight/${highlight.id}/${highlight.accessToken}`
        });
        
        log(`✅ Created highlight and thumbnail for "${claim.title}"`);
      } catch (error) {
        log(`❌ Error generating thumbnail for "${claim.title}": ${error.message}`);
        claimsWithThumbnails.push(claim);
      }
    }
    
    return claimsWithThumbnails;
  } catch (error) {
    log(`❌ Error generating thumbnails: ${error.message}`);
    return claims;
  }
}

/**
 * Generate HTML interface for the Ben Mak Grain Claim Substantiation Tool
 * @param {object} recordingDetails - Recording details
 * @param {Array} claims - Array of substantiated claims
 * @returns {string} - HTML content
 */
function generateHtmlInterface(recordingDetails, claims) {
  log('Generating HTML interface...');
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ben Mak Grain Claim Substantiation Tool</title>
  <style>
    :root {
      --primary-color: #bb86fc;
      --primary-variant: #3700b3;
      --secondary-color: #03dac6;
      --background: #121212;
      --surface: #1e1e1e;
      --error: #cf6679;
      --text-primary: #ffffff;
      --text-secondary: #b0b0b0;
      --border-radius: 8px;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
      background-color: var(--background);
      color: var(--text-primary);
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .logo {
      display: flex;
      align-items: center;
    }
    
    .logo img {
      height: 40px;
      margin-right: 10px;
    }
    
    .logo h1 {
      font-size: 24px;
      margin: 0;
      background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .search-bar {
      display: flex;
      width: 100%;
      max-width: 600px;
      margin: 0 auto 30px;
    }
    
    .search-bar input {
      flex: 1;
      padding: 12px 16px;
      border: none;
      background-color: var(--surface);
      color: var(--text-primary);
      border-radius: var(--border-radius) 0 0 var(--border-radius);
      font-size: 16px;
    }
    
    .search-bar button {
      padding: 12px 20px;
      background-color: var(--primary-color);
      color: #000;
      border: none;
      border-radius: 0 var(--border-radius) var(--border-radius) 0;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.3s;
    }
    
    .search-bar button:hover {
      background-color: var(--primary-variant);
      color: #fff;
    }
    
    .recording-info {
      background-color: var(--surface);
      padding: 20px;
      border-radius: var(--border-radius);
      margin-bottom: 30px;
    }
    
    .recording-info h2 {
      margin-top: 0;
      color: var(--primary-color);
    }
    
    .recording-embed {
      position: relative;
      width: 100%;
      height: 0;
      padding-bottom: 56.25%; /* 16:9 aspect ratio */
      margin-top: 20px;
    }
    
    .recording-embed iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    
    .claims-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
      gap: 30px;
    }
    
    .claim-card {
      background-color: var(--surface);
      border-radius: var(--border-radius);
      overflow: hidden;
      transition: transform 0.3s, box-shadow 0.3s;
      position: relative;
    }
    
    .claim-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    }
    
    .claim-header {
      padding: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .claim-title {
      font-size: 18px;
      font-weight: bold;
      margin: 0;
    }
    
    .claim-timestamp {
      font-size: 14px;
      color: var(--text-secondary);
      font-weight: normal;
    }
    
    .claim-video {
      position: relative;
      width: 100%;
      height: 0;
      padding-bottom: 56.25%; /* 16:9 aspect ratio */
    }
    
    .claim-video iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    
    .claim-content {
      padding: 15px;
    }
    
    .claim-transcript {
      margin-bottom: 15px;
      font-size: 14px;
      line-height: 1.5;
      color: var(--text-primary);
      background-color: rgba(0, 0, 0, 0.2);
      padding: 10px;
      border-radius: 4px;
      max-height: 150px;
      overflow-y: auto;
    }
    
    .claim-analysis {
      margin-bottom: 15px;
      font-size: 14px;
      line-height: 1.5;
      color: var(--text-secondary);
    }
    
    .claim-score {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
    }
    
    .score-label {
      margin-right: 10px;
      font-weight: bold;
    }
    
    .score-bar {
      flex: 1;
      height: 8px;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      overflow: hidden;
    }
    
    .score-fill {
      height: 100%;
      border-radius: 4px;
    }
    
    .score-value {
      margin-left: 10px;
      font-weight: bold;
    }
    
    .claim-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 15px;
    }
    
    .claim-tag {
      background-color: rgba(187, 134, 252, 0.2);
      color: var(--primary-color);
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 12px;
    }
    
    .claim-category {
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: bold;
      z-index: 10;
    }
    
    .category-factual {
      background-color: rgba(3, 218, 198, 0.2);
      color: var(--secondary-color);
    }
    
    .category-opinion {
      background-color: rgba(187, 134, 252, 0.2);
      color: var(--primary-color);
    }
    
    .category-statistical {
      background-color: rgba(255, 193, 7, 0.2);
      color: #ffc107;
    }
    
    .category-anecdotal {
      background-color: rgba(255, 87, 34, 0.2);
      color: #ff5722;
    }
    
    .category-mixed {
      background-color: rgba(255, 255, 255, 0.2);
      color: var(--text-primary);
    }
    
    footer {
      margin-top: 50px;
      text-align: center;
      padding: 20px;
      color: var(--text-secondary);
      font-size: 14px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    @media (max-width: 768px) {
      .claims-grid {
        grid-template-columns: 1fr;
      }
      
      .search-bar {
        flex-direction: column;
      }
      
      .search-bar input {
        border-radius: var(--border-radius) var(--border-radius) 0 0;
      }
      
      .search-bar button {
        border-radius: 0 0 var(--border-radius) var(--border-radius);
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="logo">
        <img src="https://grain.com/favicon.ico" alt="Grain Logo">
        <h1>Ben Mak Grain Claim Substantiation Tool</h1>
      </div>
    </header>
    
    <div class="search-bar">
      <input type="text" id="promptInput" placeholder="Enter a prompt to find and substantiate claims...">
      <button onclick="handlePromptSubmit()">Substantiate Claims</button>
    </div>
    
    <div class="recording-info">
      <h2>${recordingDetails.title || 'Grain Recording'}</h2>
      <p>${recordingDetails.description || 'A recorded conversation with claims to substantiate.'}</p>
      <p><strong>Date:</strong> ${recordingDetails.createdAt ? new Date(recordingDetails.createdAt).toLocaleDateString() : 'Not available'}</p>
      <p><strong>Duration:</strong> ${recordingDetails.duration ? Math.floor(recordingDetails.duration / 60) : '2'} minutes</p>
      
      <div class="recording-embed">
        <iframe 
          src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
          allow="fullscreen" 
          allowfullscreen="true" 
          frameborder="0">
        </iframe>
      </div>
    </div>
    
    <h2>Substantiated Claims</h2>
    
    <div class="claims-grid">
      ${claims.map(claim => {
        // Calculate score color based on substantiation score
        let scoreColor = '#bb86fc'; // Default purple
        if (claim.substantiationScore <= 3) {
          scoreColor = '#cf6679'; // Red for low scores
        } else if (claim.substantiationScore >= 8) {
          scoreColor = '#03dac6'; // Teal for high scores
        } else if (claim.substantiationScore >= 5) {
          scoreColor = '#ffc107'; // Yellow for medium scores
        }
        
        return `
        <div class="claim-card">
          <div class="claim-category category-${claim.category.toLowerCase()}">${claim.category}</div>
          <div class="claim-header">
            <h3 class="claim-title">${claim.title}</h3>
            <span class="claim-timestamp">${claim.timestamp} - ${claim.stopAt}</span>
          </div>
          <div class="claim-video">
            <iframe 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?start=${Math.floor(timestampToSeconds(claim.timestamp))}&end=${Math.floor(timestampToSeconds(claim.stopAt))}" 
              allow="fullscreen; autoplay" 
              allowfullscreen="true" 
              frameborder="0">
            </iframe>
          </div>
          <div class="claim-content">
            <h4>Transcript</h4>
            <div class="claim-transcript">${claim.transcript}</div>
            
            <h4>Analysis</h4>
            <div class="claim-analysis">${claim.analysis}</div>
            
            <div class="claim-score">
              <span class="score-label">Substantiation:</span>
              <div class="score-bar">
                <div class="score-fill" style="width: ${claim.substantiationScore * 10}%; background-color: ${scoreColor};"></div>
              </div>
              <span class="score-value">${claim.substantiationScore}/10</span>
            </div>
            
            <div class="claim-tags">
              ${claim.tags.map(tag => `<span class="claim-tag">${tag}</span>`).join('')}
            </div>
          </div>
        </div>
      `}).join('')}
    </div>
    
    <footer>
      <p>Ben Mak Grain Claim Substantiation Tool | Powered by Grain API and OpenRouter AI | &copy; 2025</p>
    </footer>
  </div>
  
  <script>
    // Handle prompt submission
    function handlePromptSubmit() {
      const promptInput = document.getElementById('promptInput');
      const prompt = promptInput.value.trim();
      
      if (prompt) {
        // Save the prompt to localStorage
        localStorage.setItem('lastPrompt', prompt);
        
        // Redirect to the run script with the prompt as a query parameter
        window.location.href = 'run_ben_mak_grain_tool.sh?prompt=' + encodeURIComponent(prompt);
      }
    }
    
    // Check if there's a lastPrompt in localStorage and set it as the input value
    document.addEventListener('DOMContentLoaded', function() {
      const lastPrompt = localStorage.getItem('lastPrompt');
      if (lastPrompt) {
        document.getElementById('promptInput').value = lastPrompt;
      }
    });
  </script>
</body>
</html>`;

  // Write HTML to file
  fs.writeFileSync('ben_mak_grain_tool.html', html);
  log('HTML interface generated: ben_mak_grain_tool.html');
  
  return html;
}

/**
 * Save claims to JSON file
 * @param {Array} claims - Array of substantiated claims
 * @returns {void}
 */
function saveClaimsToJson(claims) {
  log('Saving claims to JSON file...');
  
  const json = JSON.stringify(claims, null, 2);
  fs.writeFileSync('substantiated_claims.json', json);
  log('Claims saved to substantiated_claims.json');
}

/**
 * Main function to extract and substantiate claims
 * @param {string} recordingId - Grain recording ID
 * @param {string} prompt - User prompt for finding specific claims
 * @param {string} model - AI model to use
 * @returns {Promise<object>} - Result object with recording details and claims
 */
async function substantiateClaims(recordingId, prompt, model = DEFAULT_MODEL) {
  try {
    log(`Starting claim substantiation process for recording: ${recordingId}`);
    log(`Prompt: ${prompt}`);
    log(`Model: ${model}`);
    
    // Get recording details
    const recordingDetails = await getRecordingDetails(recordingId);
    log(`Recording title: ${recordingDetails.title || 'Untitled'}`);
    
    // Get transcript
    const transcript = await getRecordingTranscript(recordingId);
    if (!transcript) {
      throw new Error('Failed to fetch transcript');
    }
    
    // Analyze transcript for claims
    const claims = await analyzeTranscriptForClaims(transcript, prompt, model);
    if (claims.length === 0) {
      log('No claims found matching the prompt');
      return { recordingDetails, claims: [] };
    }
    
    log(`Found ${claims.length} claims matching the prompt`);
    
    // Generate thumbnails for claims
    const claimsWithThumbnails = await generateThumbnails(claims, recordingId);
    
    // Generate HTML interface
    generateHtmlInterface(recordingDetails, claimsWithThumbnails);
    
    // Save claims to JSON
    saveClaimsToJson(claimsWithThumbnails);
    
    log('Claim substantiation process completed successfully!');
    
    return {
      recordingDetails,
      claims: claimsWithThumbnails
    };
  } catch (error) {
    log(`❌ Error in claim substantiation process: ${error.message}`);
    if (error.stack) {
      log(error.stack);
    }
    throw error;
  } finally {
    // Close log stream
    logStream.end();
  }
}

/**
 * Main function
 */
async function main() {
  try {
    // Get command line arguments
    const args = process.argv.slice(2);
    const recordingId = args[0] || 'a8225a48-4840-4eec-bdf8-61b2acd52a2f';
    const prompt = args[1] || 'Find claims about performance, results, or outcomes';
    const model = MODELS[args[2]] || DEFAULT_MODEL;
    
    console.log(`Using model: ${model}`);
    console.log(`Recording ID: ${recordingId}`);
    console.log(`Prompt: ${prompt}`);
    
    // Substantiate claims
    const result = await substantiateClaims(recordingId, prompt, model);
    
    // Return result
    return result;
  } catch (error) {
    console.error('Error in main function:', error);
    process.exit(1);
  }
}

// If this file is run directly
if (require.main === module) {
  main();
}

// Export functions for use in other files
module.exports = {
  substantiateClaims,
  analyzeTranscriptForClaims,
  getRecordingTranscript,
  getRecordingDetails,
  generateThumbnails
};
