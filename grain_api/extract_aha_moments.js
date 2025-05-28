/**
 * Grain Aha Moments Extractor
 * 
 * This script extracts "aha moments" from a Grain recording using the Grain API.
 * It analyzes the transcript to find learning moments, creates highlights,
 * and generates a report with dark mode thumbnails, catchy titles, small bios,
 * transcriptions, and analyses.
 * 
 * Usage:
 * 1. Set your Grain API token in the .env file or directly in this script
 * 2. Run: node extract_aha_moments.js
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Grain API configuration
const GRAIN_API_TOKEN = process.env.GRAIN_API_TOKEN || 'grain_pat_wSmo4CRv_Hc0B4ICFUnOabZLhRJoOzjoLZQG8ODzRWqWtoG2R';
const RECORDING_ID = '19bcc522-cf00-41b4-9131-7f89f329ce60';
const EMBED_PARAM = 'IyQ1igZOqfAI9ngBciC2E2Ruu7djaRHmjY7JvMnZ';

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Create a log file with timestamp
const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
const logFile = path.join(logsDir, `aha_moments_extraction_${timestamp}.log`);
const logStream = fs.createWriteStream(logFile, { flags: 'a' });

// Function to log messages to console and file
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  console.log(logMessage);
  logStream.write(logMessage + '\n');
}

// Function to make API requests
async function makeApiRequest(endpoint, method = 'get', data = null) {
  try {
    const url = `https://api.grain.com/_/public-api${endpoint}`;
    log(`Making ${method.toUpperCase()} request to: ${url}`);
    
    const config = {
      method,
      url,
      headers: {
        'Authorization': `Bearer ${GRAIN_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    };
    
    if (data) {
      config.data = data;
    }
    
    const response = await axios(config);
    return response.data;
  } catch (error) {
    log(`❌ API Error: ${error.message}`);
    if (error.response) {
      log(`Status: ${error.response.status}`);
      log(`Data: ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
}

// Function to get recording details
async function getRecordingDetails() {
  log(`Fetching details for recording: ${RECORDING_ID}`);
  return makeApiRequest(`/recordings/${RECORDING_ID}`);
}

// Function to get recording transcript
async function getRecordingTranscript() {
  log(`Fetching transcript for recording: ${RECORDING_ID}`);
  const response = await axios({
    method: 'get',
    url: `https://api.grain.com/_/public-api/recordings/${RECORDING_ID}/transcript.vtt`,
    headers: {
      'Authorization': `Bearer ${GRAIN_API_TOKEN}`
    },
    responseType: 'text'
  });
  
  return response.data;
}

// Function to parse VTT format
function parseVTT(vttContent) {
  log('Parsing VTT transcript...');
  const lines = vttContent.split('\n');
  const cues = [];
  let currentCue = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines and WEBVTT header
    if (!line || line === 'WEBVTT') continue;
    
    // Check if line contains timestamp
    if (line.includes('-->')) {
      const timeParts = line.split(' --> ');
      currentCue = {
        startTime: timeParts[0],
        endTime: timeParts[1],
        text: ''
      };
      continue;
    }
    
    // If we have a current cue, add text to it
    if (currentCue && line) {
      if (currentCue.text) {
        currentCue.text += ' ' + line;
      } else {
        currentCue.text = line;
      }
      
      // Check if next line is empty or a new timestamp, which means end of current cue
      if (i + 1 >= lines.length || !lines[i+1].trim() || lines[i+1].includes('-->')) {
        cues.push(currentCue);
        currentCue = null;
      }
    }
  }
  
  log(`Parsed ${cues.length} transcript cues`);
  return cues;
}

// Function to convert timestamp to seconds
function timestampToSeconds(timestamp) {
  const parts = timestamp.split(':');
  let seconds = 0;
  
  if (parts.length === 3) {
    // Hours:Minutes:Seconds format
    seconds = parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseFloat(parts[2].replace(',', '.'));
  } else if (parts.length === 2) {
    // Minutes:Seconds format
    seconds = parseInt(parts[0]) * 60 + parseFloat(parts[1].replace(',', '.'));
  }
  
  return seconds;
}

// Function to convert seconds to timestamp format (MM:SS)
function secondsToTimestamp(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// Function to find aha moments in transcript
function findAhaMoments(cues) {
  log('Analyzing transcript for aha moments...');
  
  // Keywords that might indicate an "aha moment"
  const ahaKeywords = [
    'realize', 'realized', 'realization',
    'understand', 'understood', 'understanding',
    'discover', 'discovered', 'discovery',
    'insight', 'insights', 'insightful',
    'learn', 'learned', 'learning',
    'aha', 'eureka', 'wow',
    'surprising', 'surprised', 'surprise',
    'interesting', 'fascinated', 'fascinating',
    'important', 'critical', 'crucial',
    'key', 'essential', 'fundamental',
    'breakthrough', 'epiphany', 'revelation',
    'never thought', 'didn\'t realize', 'didn\'t know',
    'changed my mind', 'changed my perspective',
    'eye-opening', 'mind-blowing', 'game-changer',
    'actually', 'in fact', 'truth is',
    'contrary to', 'opposite of', 'different from',
    'misconception', 'myth', 'common belief',
    'research shows', 'studies indicate', 'evidence suggests',
    'turns out', 'in reality', 'fact is'
  ];
  
  // Phrases that might indicate the start of an explanation
  const explanationStarters = [
    'because', 'since', 'as', 'due to', 'thanks to',
    'the reason is', 'this is why', 'that\'s why',
    'what this means', 'to explain', 'let me explain',
    'in other words', 'to put it differently', 'to clarify',
    'for example', 'for instance', 'to illustrate',
    'specifically', 'particularly', 'especially',
    'notably', 'significantly', 'importantly',
    'fundamentally', 'essentially', 'basically',
    'in essence', 'at its core', 'the key is',
    'the point is', 'what matters is', 'what\'s important is'
  ];
  
  // Combine adjacent cues to form segments
  const segments = [];
  let currentSegment = null;
  
  for (let i = 0; i < cues.length; i++) {
    const cue = cues[i];
    
    if (!currentSegment) {
      currentSegment = {
        startTime: cue.startTime,
        endTime: cue.endTime,
        text: cue.text,
        cues: [cue]
      };
    } else {
      // If the gap between cues is less than 2 seconds, combine them
      const currentEndSeconds = timestampToSeconds(currentSegment.endTime);
      const nextStartSeconds = timestampToSeconds(cue.startTime);
      
      if (nextStartSeconds - currentEndSeconds < 2) {
        currentSegment.endTime = cue.endTime;
        currentSegment.text += ' ' + cue.text;
        currentSegment.cues.push(cue);
      } else {
        segments.push(currentSegment);
        currentSegment = {
          startTime: cue.startTime,
          endTime: cue.endTime,
          text: cue.text,
          cues: [cue]
        };
      }
    }
  }
  
  if (currentSegment) {
    segments.push(currentSegment);
  }
  
  log(`Created ${segments.length} combined segments from transcript`);
  
  // Score each segment based on keywords and other factors
  const scoredSegments = segments.map(segment => {
    let score = 0;
    
    // Check for aha keywords
    for (const keyword of ahaKeywords) {
      const regex = new RegExp(`\\b${keyword}\\b`, 'i');
      if (regex.test(segment.text)) {
        score += 5;
      }
    }
    
    // Check for explanation starters
    for (const starter of explanationStarters) {
      const regex = new RegExp(`\\b${starter}\\b`, 'i');
      if (regex.test(segment.text)) {
        score += 3;
      }
    }
    
    // Longer segments might contain more valuable information
    const wordCount = segment.text.split(' ').length;
    if (wordCount > 50) score += 2;
    if (wordCount > 100) score += 3;
    
    // Segments with questions and answers might be insightful
    if (segment.text.includes('?')) score += 2;
    
    // Segments with numbers might contain facts
    if (/\d+/.test(segment.text)) score += 1;
    
    return {
      ...segment,
      score
    };
  });
  
  // Sort segments by score in descending order
  scoredSegments.sort((a, b) => b.score - a.score);
  
  // Take the top segments (adjust the number as needed)
  const topSegments = scoredSegments.slice(0, 10);
  
  log(`Selected ${topSegments.length} top aha moments`);
  
  // Format the aha moments
  const ahaMoments = topSegments.map((segment, index) => {
    // Generate a catchy title based on the content
    let title = generateTitle(segment.text);
    
    // Calculate duration in seconds
    const startSeconds = timestampToSeconds(segment.startTime);
    const endSeconds = timestampToSeconds(segment.endTime);
    const duration = endSeconds - startSeconds;
    
    // Generate a small bio/description
    const description = generateDescription(segment.text);
    
    // Generate an analysis
    const analysis = generateAnalysis(segment.text);
    
    return {
      id: `aha-moment-${index + 1}`,
      timestamp: secondsToTimestamp(startSeconds),
      stopAt: secondsToTimestamp(endSeconds),
      title,
      description,
      transcript: segment.text,
      analysis,
      startTimeSeconds: startSeconds,
      durationSeconds: duration,
      score: segment.score
    };
  });
  
  return ahaMoments;
}

// Function to generate a catchy title based on content
function generateTitle(text) {
  // Extract key phrases that might make good titles
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  if (sentences.length === 0) return "Insightful Moment";
  
  // Look for short, impactful sentences
  const shortSentences = sentences.filter(s => {
    const words = s.trim().split(/\s+/);
    return words.length >= 3 && words.length <= 10;
  });
  
  if (shortSentences.length > 0) {
    // Pick a random short sentence
    const sentence = shortSentences[Math.floor(Math.random() * shortSentences.length)].trim();
    
    // If it's too long, truncate it
    if (sentence.length > 50) {
      return sentence.substring(0, 47) + "...";
    }
    
    return sentence;
  }
  
  // If no good short sentences, extract key phrases
  const words = text.split(/\s+/);
  const keyPhrases = [
    "The Key Insight",
    "A Powerful Realization",
    "The Unexpected Truth",
    "A Critical Lesson",
    "The Hidden Pattern",
    "The Real Challenge",
    "The Fundamental Principle",
    "The Essential Question",
    "The Transformative Idea",
    "The Crucial Distinction"
  ];
  
  // Pick a random key phrase
  return keyPhrases[Math.floor(Math.random() * keyPhrases.length)];
}

// Function to generate a small bio/description
function generateDescription(text) {
  // Extract the first 1-2 sentences for the description
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  if (sentences.length === 0) return "An insightful moment from the conversation.";
  
  if (sentences.length === 1) return sentences[0].trim();
  
  const description = (sentences[0] + '. ' + sentences[1]).trim();
  
  // If it's too long, truncate it
  if (description.length > 200) {
    return description.substring(0, 197) + "...";
  }
  
  return description;
}

// Function to generate an analysis
function generateAnalysis(text) {
  // This is a simplified analysis generator
  // In a real implementation, you might use NLP or AI to generate a more sophisticated analysis
  
  const wordCount = text.split(/\s+/).length;
  const sentenceCount = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const avgWordsPerSentence = wordCount / sentenceCount;
  
  let complexity = "moderate";
  if (avgWordsPerSentence < 10) complexity = "simple";
  if (avgWordsPerSentence > 20) complexity = "complex";
  
  let tone = "neutral";
  if (/excit|amaz|incredibl|fantastic|awesome|great|excellent/i.test(text)) tone = "positive";
  if (/problem|challeng|difficult|hard|issue|concern|worr|anxi/i.test(text)) tone = "concerned";
  
  let focus = "general";
  if (/learn|understand|know|realiz|discover/i.test(text)) focus = "learning";
  if (/strateg|plan|approach|method|technique|process/i.test(text)) focus = "strategic";
  if (/feel|emotion|think|believe|opinion/i.test(text)) focus = "reflective";
  
  return `This ${complexity} segment focuses on ${focus} topics with a ${tone} tone. The speaker uses ${wordCount} words across ${sentenceCount} sentences, averaging ${avgWordsPerSentence.toFixed(1)} words per sentence. This moment represents a significant insight that could be valuable for viewers interested in deep learning and understanding.`;
}

// Function to create a highlight
async function createHighlight(moment) {
  try {
    log(`Creating highlight for "${moment.title}"...`);
    
    const response = await makeApiRequest(`/recordings/${RECORDING_ID}/highlights`, 'post', {
      timestamp: moment.startTimeSeconds,
      duration: moment.durationSeconds,
      text: moment.title
    });
    
    log(`✅ Created highlight for "${moment.title}"`);
    log(`   ID: ${response.id}`);
    log(`   Embed URL: https://grain.com/_/embed/highlight/${response.id}/${response.accessToken}`);
    
    return {
      ...moment,
      highlightId: response.id,
      accessToken: response.accessToken,
      embedUrl: `https://grain.com/_/embed/highlight/${response.id}/${response.accessToken}`
    };
  } catch (error) {
    log(`❌ Error creating highlight for "${moment.title}": ${error.message}`);
    return moment;
  }
}

// Function to generate HTML report
function generateHtmlReport(recordingDetails, ahaMoments) {
  log('Generating HTML report...');
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aha Moments from Grain Recording</title>
    <style>
        :root {
            --bg-color: #121212;
            --text-color: #e0e0e0;
            --card-bg: #1e1e1e;
            --accent-color: #bb86fc;
            --secondary-color: #03dac6;
            --error-color: #cf6679;
            --border-color: #333333;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            line-height: 1.6;
            margin: 0;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 1px solid var(--border-color);
        }
        
        h1, h2, h3 {
            color: var(--accent-color);
        }
        
        .recording-info {
            background-color: var(--card-bg);
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            border: 1px solid var(--border-color);
        }
        
        .moments-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 20px;
        }
        
        .moment-card {
            background-color: var(--card-bg);
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid var(--border-color);
            transition: transform 0.3s ease;
        }
        
        .moment-card:hover {
            transform: translateY(-5px);
        }
        
        .card-header {
            padding: 15px;
            border-bottom: 1px solid var(--border-color);
        }
        
        .card-title {
            margin: 0;
            font-size: 1.2rem;
        }
        
        .timestamp {
            display: inline-block;
            background-color: var(--accent-color);
            color: black;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 0.8rem;
            margin-top: 8px;
        }
        
        .card-body {
            padding: 15px;
        }
        
        .description {
            font-style: italic;
            margin-bottom: 15px;
            color: #bbbbbb;
        }
        
        .transcript {
            background-color: rgba(0, 0, 0, 0.2);
            padding: 10px;
            border-radius: 4px;
            margin-bottom: 15px;
            max-height: 150px;
            overflow-y: auto;
            font-size: 0.9rem;
        }
        
        .analysis {
            font-size: 0.9rem;
            color: var(--secondary-color);
        }
        
        .embed-container {
            position: relative;
            padding-bottom: 56.25%; /* 16:9 aspect ratio */
            height: 0;
            overflow: hidden;
            max-width: 100%;
        }
        
        .embed-container iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
        }
        
        .section-title {
            margin-top: 40px;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid var(--border-color);
        }
        
        footer {
            margin-top: 50px;
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid var(--border-color);
            font-size: 0.9rem;
            color: #888888;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
        }
        
        ::-webkit-scrollbar-track {
            background: var(--bg-color);
        }
        
        ::-webkit-scrollbar-thumb {
            background: var(--accent-color);
            border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: var(--secondary-color);
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
            .moments-container {
                grid-template-columns: 1fr;
            }
            
            body {
                padding: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Aha Moments from Grain Recording</h1>
            <p>The most insightful learning moments extracted from the conversation</p>
        </header>
        
        <div class="recording-info">
            <h2>${recordingDetails.title || 'Grain Recording'}</h2>
            <p>${recordingDetails.description || 'A recorded conversation with valuable insights.'}</p>
            <p><strong>Date:</strong> ${new Date(recordingDetails.createdAt).toLocaleDateString()}</p>
            <p><strong>Duration:</strong> ${Math.floor(recordingDetails.duration / 60)} minutes</p>
            
            <div class="embed-container">
                <iframe 
                    src="https://grain.com/_/embed/recording/${RECORDING_ID}/${EMBED_PARAM}?autoplay=false&origin=user_iframe" 
                    allow="fullscreen" 
                    allowfullscreen="true" 
                    frameborder="0">
                </iframe>
            </div>
        </div>
        
        <h2 class="section-title">Top Aha Moments</h2>
        
        <div class="moments-container">
            ${ahaMoments.map(moment => `
            <div class="moment-card">
                <div class="card-header">
                    <h3 class="card-title">${moment.title}</h3>
                    <span class="timestamp">${moment.timestamp} - ${moment.stopAt}</span>
                </div>
                <div class="card-body">
                    <p class="description">${moment.description}</p>
                    
                    <h4>Transcript</h4>
                    <div class="transcript">${moment.transcript}</div>
                    
                    <h4>Analysis</h4>
                    <p class="analysis">${moment.analysis}</p>
                    
                    ${moment.embedUrl ? `
                    <h4>Video Highlight</h4>
                    <div class="embed-container">
                        <iframe 
                            src="${moment.embedUrl}?autoplay=false&origin=user_iframe" 
                            allow="fullscreen" 
                            allowfullscreen="true" 
                            frameborder="0">
                        </iframe>
                    </div>
                    ` : ''}
                </div>
            </div>
            `).join('')}
        </div>
        
        <footer>
            <p>Generated on ${new Date().toLocaleDateString()} using the Grain API</p>
        </footer>
    </div>
</body>
</html>`;

  // Write HTML to file
  fs.writeFileSync('aha_moments_report.html', html);
  log('HTML report generated: aha_moments_report.html');
  
  return html;
}

// Function to generate JSON output
function generateJsonOutput(ahaMoments) {
  log('Generating JSON output...');
  
  const json = JSON.stringify(ahaMoments, null, 2);
  fs.writeFileSync('aha_moments.json', json);
  log('JSON output generated: aha_moments.json');
  
  return json;
}

// Main function
async function extractAhaMoments() {
  try {
    log('Starting Aha Moments extraction process...');
    
    // Get recording details
    const recordingDetails = await getRecordingDetails();
    log(`Recording title: ${recordingDetails.title || 'Untitled'}`);
    
    // Get transcript
    const transcript = await getRecordingTranscript();
    
    // Parse transcript
    const cues = parseVTT(transcript);
    
    // Find aha moments
    const ahaMoments = findAhaMoments(cues);
    
    // Create highlights for each aha moment
    const highlightPromises = ahaMoments.map(moment => createHighlight(moment));
    const momentsWithHighlights = await Promise.all(highlightPromises);
    
    // Generate HTML report
    generateHtmlReport(recordingDetails, momentsWithHighlights);
    
    // Generate JSON output
    generateJsonOutput(momentsWithHighlights);
    
    log('Aha Moments extraction completed successfully!');
    log(`Found ${ahaMoments.length} aha moments`);
    log(`Results saved to aha_moments_report.html and aha_moments.json`);
    
    return {
      recordingDetails,
      ahaMoments: momentsWithHighlights
    };
  } catch (error) {
    log(`❌ Error in extraction process: ${error.message}`);
    if (error.stack) {
      log(error.stack);
    }
    throw error;
  } finally {
    // Close log stream
    logStream.end();
  }
}

// Run the extraction process
extractAhaMoments()
  .then(() => {
    console.log('Process completed successfully.');
  })
  .catch(error => {
    console.error('Process failed:', error);
    process.exit(1);
  });
