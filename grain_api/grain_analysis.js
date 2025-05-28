const fs = require('fs');
const https = require('https');
const path = require('path');
require('dotenv').config();

// Grain API token from .env file
const API_TOKEN = process.env.GRAIN_API_TOKEN;

// Path to the CSV file
const CSV_FILE_PATH = '/Users/infiniteintelligence/Downloads/EXPERTISE/RECORDING LIST - Zoom .zoom Files.csv';

// Default thumbnail image
const DEFAULT_THUMBNAIL = 'top-heroforall.png';

// Function to read and parse CSV file
function readCSV(filePath) {
  const csvData = fs.readFileSync(filePath, 'utf-8');
  const lines = csvData.split('\n');
  const headers = lines[0].split(',');
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const row = {};
    for (let j = 0; j < headers.length; j++) {
      row[headers[j]] = values[j];
    }
    data.push(row);
  }
  return data;
}

// Base URL for Grain API
const BASE_URL = 'https://api.grain.com/_/public-api';

// Function to make API requests
function makeRequest(endpoint) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    };

    https.get(`${BASE_URL}${endpoint}`, options, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`API request failed with status code ${res.statusCode}`));
        return;
      }

      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          if (endpoint.includes('transcript.vtt')) {
            // Return raw VTT data
            resolve(data);
          } else {
            // Parse JSON response
            resolve(JSON.parse(data));
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Function to parse VTT format
function parseVTT(vttContent) {
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
      if (!lines[i+1] || !lines[i+1].trim() || lines[i+1].includes('-->')) {
        cues.push(currentCue);
        currentCue = null;
      }
    }
  }
  
  return cues;
}

// Function to convert timestamp to seconds for sorting and comparison
function timestampToSeconds(timestamp) {
  const parts = timestamp.split(':');
  const hours = parseInt(parts[0]);
  const minutes = parseInt(parts[1]);
  const seconds = parseFloat(parts[2].replace(',', '.'));
  return hours * 3600 + minutes * 60 + seconds;
}

// Function to format seconds to timestamp format (HH:MM:SS.mmm)
function secondsToTimestamp(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toFixed(3).padStart(6, '0')}`;
}

// Main function to process recordings and generate HTML
async function processRecordings() {
  try {
    const recordingsData = [];
    
    for (let i = 0; i < RECORDING_IDS.length; i++) {
      const recordingId = RECORDING_IDS[i];
      const embedParam = RECORDINGS[i].embedParam;
      
      console.log(`Fetching data for recording ${recordingId}...`);
      
      // Get recording details
      const recordingDetails = await makeRequest(`/recordings/${recordingId}`);
      
      // Get transcript
      const transcript = await makeRequest(`/recordings/${recordingId}/transcript.vtt`);
      
      // Parse transcript
      const cues = parseVTT(transcript);
      
      recordingsData.push({
        id: recordingId,
        embedParam: embedParam,
        details: recordingDetails,
        cues: cues
      });
    }
    
    // Generate HTML
    generateHTML(recordingsData);
    
    console.log('Analysis complete! Open forensic_analysis.html in your browser.');
  } catch (error) {
    console.error('Error processing recordings:', error);
  }
}

// Function to generate HTML file
function generateHTML(recordingsData) {
  // Create HTML content
  let htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forensic Linguistic Analysis</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
            color: #333;
        }
        h1, h2, h3 {
            color: #2c3e50;
        }
        .intro {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 30px;
        }
        .recording-container {
            margin-bottom: 50px;
        }
        .transcript-container {
            margin-bottom: 30px;
        }
        .cue {
            padding: 10px;
            margin-bottom: 5px;
            border-radius: 5px;
            background-color: #f8f9fa;
            position: relative;
        }
        .cue:hover {
            background-color: #e9ecef;
        }
        .timestamp {
            font-family: monospace;
            color: #6c757d;
            margin-right: 10px;
        }
        .cue-text {
            display: inline;
        }
        .analysis-form {
            display: none;
            background-color: #e9ecef;
            padding: 15px;
            border-radius: 5px;
            margin-top: 10px;
        }
        .analysis-btn {
            background-color: #2c3e50;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 3px;
            cursor: pointer;
            font-size: 12px;
            position: absolute;
            right: 10px;
            top: 10px;
        }
        .analysis-btn:hover {
            background-color: #1a252f;
        }
        .violation-type {
            margin-top: 10px;
        }
        .violation-type label {
            margin-right: 10px;
        }
        textarea {
            width: 100%;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #ced4da;
            margin-top: 10px;
        }
        .save-btn {
            background-color: #28a745;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 3px;
            cursor: pointer;
            margin-top: 10px;
        }
        .save-btn:hover {
            background-color: #218838;
        }
        .analysis-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 30px;
        }
        .analysis-table th, .analysis-table td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }
        .analysis-table th {
            background-color: #2c3e50;
            color: white;
        }
        .analysis-table tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        .violation {
            font-weight: bold;
            color: #c0392b;
        }
        .iframe-container {
            position: relative;
            overflow: hidden;
            width: 100%;
            padding-top: 56.25%; /* 16:9 Aspect Ratio */
            margin-bottom: 20px;
        }
        .iframe-container iframe {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            width: 100%;
            height: 100%;
            border: none;
        }
        .export-btn {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 20px;
            margin-bottom: 30px;
        }
        .export-btn:hover {
            background-color: #0069d9;
        }
        .markers-guide {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            margin-top: 50px;
        }
    </style>
</head>
<body>
    <h1>Forensic Linguistic Analysis and Psychological Evidence</h1>
    
    <div class="intro">
        <h2>Case Overview</h2>
        <p>This document presents forensic linguistic analysis and psychological evidence of gaslighting, manipulation, abuse, and exploitation directed at Ben. Each identified instance includes the exact quote, timestamp, type of violation, and analysis of the linguistic and psychological patterns that constitute evidence.</p>
        <button id="export-btn" class="export-btn">Export Analysis to HTML</button>
    </div>`;

  // Add each recording section
  recordingsData.forEach((recording, index) => {
    const recordingNumber = index + 1;
    
    htmlContent += `
    <div class="recording-container" id="recording-${recording.id}">
        <h2>Recording ${recordingNumber}</h2>
        <div class="iframe-container">
            <iframe src="https://grain.com/_/embed/recording/${recording.id}/${recording.embedParam}?autoplay=false&origin=user_iframe" height="324" width="576" allow="fullscreen" allowfullscreen="true" frameborder="0"></iframe>
        </div>
        
        <h3>Transcript with Analysis Tools</h3>
        <p>Click "Analyze" on any segment to mark it as potential evidence and add your analysis.</p>
        
        <div class="transcript-container">`;
    
    // Add each transcript cue
    recording.cues.forEach((cue, cueIndex) => {
      htmlContent += `
            <div class="cue" id="cue-${recording.id}-${cueIndex}">
                <span class="timestamp" data-start="${cue.startTime}" data-end="${cue.endTime}">${cue.startTime}</span>
                <div class="cue-text">${cue.text}</div>
                <button class="analysis-btn" onclick="toggleAnalysisForm('${recording.id}-${cueIndex}')">Analyze</button>
                
                <div class="analysis-form" id="analysis-form-${recording.id}-${cueIndex}">
                    <div class="violation-type">
                        <strong>Violation Type:</strong><br>
                        <label><input type="radio" name="violation-${recording.id}-${cueIndex}" value="Gaslighting"> Gaslighting</label>
                        <label><input type="radio" name="violation-${recording.id}-${cueIndex}" value="Manipulation"> Manipulation</label>
                        <label><input type="radio" name="violation-${recording.id}-${cueIndex}" value="Psychological Abuse"> Psychological Abuse</label>
                        <label><input type="radio" name="violation-${recording.id}-${cueIndex}" value="Exploitation"> Exploitation</label>
                    </div>
                    
                    <textarea id="analysis-text-${recording.id}-${cueIndex}" placeholder="Enter your linguistic and psychological analysis here..."></textarea>
                    
                    <button class="save-btn" onclick="saveAnalysis('${recording.id}-${cueIndex}')">Save Analysis</button>
                </div>
            </div>`;
    });
    
    htmlContent += `
        </div>
        
        <div id="analysis-results-${recording.id}">
            <h3>Analysis Results</h3>
            <p>No analysis has been saved yet. Analyze transcript segments above to add them to this table.</p>
            <table class="analysis-table" id="analysis-table-${recording.id}" style="display: none;">
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Quote</th>
                        <th>Violation Type</th>
                        <th>Linguistic/Psychological Analysis</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>`;
  });

  // Add markers guide and JavaScript
  htmlContent += `
    <div class="markers-guide">
        <h2>Guide to Forensic Linguistic Markers</h2>
        <p>Below are common linguistic and psychological patterns associated with different types of violations:</p>
        
        <h3>Gaslighting Markers:</h3>
        <ul>
            <li>Denying factual events or statements ("I never said that")</li>
            <li>Countering memories or perceptions ("That's not how it happened")</li>
            <li>Trivializing feelings or concerns ("You're overreacting")</li>
            <li>Forgetting or denying previous abusive behavior</li>
            <li>Diverting attention from the issue ("You always bring this up")</li>
            <li>Questioning credibility ("You're confused/mistaken")</li>
        </ul>
        
        <h3>Manipulation Markers:</h3>
        <ul>
            <li>Guilt-inducing language ("After all I've done for you")</li>
            <li>False equivalencies ("You did the same thing")</li>
            <li>Conditional phrasing ("If you really cared, you would...")</li>
            <li>Veiled threats or intimidation</li>
            <li>Selective use of facts to distort reality</li>
            <li>Appeal to authority or expertise to shut down discussion</li>
        </ul>
        
        <h3>Psychological Abuse Markers:</h3>
        <ul>
            <li>Name-calling or derogatory language</li>
            <li>Isolating language ("No one else would understand/agree with you")</li>
            <li>Humiliation or public embarrassment</li>
            <li>Controlling language ("You need to..." "You should...")</li>
            <li>Withholding (information, affection, approval)</li>
            <li>Unpredictable responses (alternating between praise and criticism)</li>
        </ul>
        
        <h3>Exploitation Markers:</h3>
        <ul>
            <li>Taking credit for others' work or ideas</li>
            <li>Using someone's vulnerabilities against them</li>
            <li>Creating dependency</li>
            <li>Extracting concessions through pressure</li>
            <li>Uneven reciprocity in relationships</li>
            <li>Leveraging power imbalances</li>
        </ul>
    </div>

    <script>
        // Store all analyses
        const analysisData = {
            recordings: {}
        };
        
        // Initialize storage for each recording
        document.querySelectorAll('.recording-container').forEach(container => {
            const recordingId = container.id.replace('recording-', '');
            analysisData.recordings[recordingId] = [];
        });
        
        // Toggle analysis form visibility
        function toggleAnalysisForm(id) {
            const form = document.getElementById('analysis-form-' + id);
            form.style.display = form.style.display === 'block' ? 'none' : 'block';
        }
        
        // Save analysis for a cue
        function saveAnalysis(id) {
            const recordingId = id.split('-')[0];
            const cueIndex = id.split('-')[1];
            const cueElement = document.getElementById('cue-' + id);
            
            // Get timestamp and text
            const timestampElement = cueElement.querySelector('.timestamp');
            const timestamp = timestampElement.textContent;
            const quote = cueElement.querySelector('.cue-text').textContent;
            
            // Get violation type
            const violationTypeInputs = document.getElementsByName('violation-' + id);
            let violationType = '';
            for (const input of violationTypeInputs) {
                if (input.checked) {
                    violationType = input.value;
                    break;
                }
            }
            
            // Get analysis text
            const analysisText = document.getElementById('analysis-text-' + id).value;
            
            // Validate inputs
            if (!violationType) {
                alert('Please select a violation type.');
                return;
            }
            
            if (!analysisText.trim()) {
                alert('Please enter your analysis.');
                return;
            }
            
            // Create analysis object
            const analysis = {
                id: id,
                timestamp: timestamp,
                startTime: timestampElement.dataset.start,
                endTime: timestampElement.dataset.end,
                quote: quote,
                violationType: violationType,
                analysis: analysisText
            };
            
            // Add to storage
            const existingIndex = analysisData.recordings[recordingId].findIndex(a => a.id === id);
            if (existingIndex >= 0) {
                analysisData.recordings[recordingId][existingIndex] = analysis;
            } else {
                analysisData.recordings[recordingId].push(analysis);
            }
            
            // Update the table
            updateAnalysisTable(recordingId);
            
            // Hide the form
            toggleAnalysisForm(id);
            
            // Highlight the analyzed cue
            cueElement.style.backgroundColor = '#ffe6e6';
        }
        
        // Update analysis table for a recording
        function updateAnalysisTable(recordingId) {
            const analyses = analysisData.recordings[recordingId];
            const tableBody = document.querySelector('#analysis-table-' + recordingId + ' tbody');
            const resultsContainer = document.getElementById('analysis-results-' + recordingId);
            const table = document.getElementById('analysis-table-' + recordingId);
            
            // Clear existing rows
            tableBody.innerHTML = '';
            
            if (analyses.length === 0) {
                resultsContainer.querySelector('p').style.display = 'block';
                table.style.display = 'none';
                return;
            }
            
            // Hide the "no analysis" message and show the table
            resultsContainer.querySelector('p').style.display = 'none';
            table.style.display = 'table';
            
            // Sort analyses by timestamp
            analyses.sort((a, b) => {
                const aTime = a.startTime.split(':').reduce((acc, time) => (60 * acc) + parseFloat(time), 0);
                const bTime = b.startTime.split(':').reduce((acc, time) => (60 * acc) + parseFloat(time), 0);
                return aTime - bTime;
            });
            
            // Add rows for each analysis
            analyses.forEach(analysis => {
                const row = document.createElement('tr');
                
                // Create timestamp cell with play button
                const timestampCell = document.createElement('td');
                timestampCell.innerHTML = \`<span class="timestamp">\${analysis.timestamp}</span>
                    <button onclick="seekToTimestamp('\${recordingId}', '\${analysis.startTime}')" style="margin-left: 10px;">▶️ Play</button>\`;
                
                // Create quote cell
                const quoteCell = document.createElement('td');
                quoteCell.innerHTML = \`<span class="violation">\${analysis.quote}</span>\`;
                
                // Create violation type cell
                const violationCell = document.createElement('td');
                violationCell.textContent = analysis.violationType;
                
                // Create analysis cell
                const analysisCell = document.createElement('td');
                analysisCell.textContent = analysis.analysis;
                
                // Add cells to row
                row.appendChild(timestampCell);
                row.appendChild(quoteCell);
                row.appendChild(violationCell);
                row.appendChild(analysisCell);
                
                // Add row to table
                tableBody.appendChild(row);
            });
        }
        
        // Function to seek to timestamp in recording
        function seekToTimestamp(recordingId, timestamp) {
            // This is a placeholder - in a real implementation, this would
            // communicate with the Grain iframe to seek to the timestamp
            alert('In a complete implementation, this would seek to ' + timestamp + ' in recording ' + recordingId);
        }
        
        // Export analysis to HTML
        document.getElementById('export-btn').addEventListener('click', function() {
            // Create a new HTML document with the analysis results
            let exportHtml = \`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forensic Linguistic Analysis Export</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
            color: #333;
        }
        h1, h2, h3 {
            color: #2c3e50;
        }
        .intro {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 30px;
        }
        .recording-section {
            margin-bottom: 50px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }
        th {
            background-color: #2c3e50;
            color: white;
        }
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        .violation {
            font-weight: bold;
            color: #c0392b;
        }
        .timestamp {
            font-family: monospace;
        }
        .iframe-container {
            position: relative;
            overflow: hidden;
            width: 100%;
            padding-top: 56.25%;
            margin-bottom: 20px;
        }
        .iframe-container iframe {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            width: 100%;
            height: 100%;
            border: none;
        }
    </style>
</head>
<body>
    <h1>Forensic Linguistic Analysis and Psychological Evidence</h1>
    
    <div class="intro">
        <h2>Case Overview</h2>
        <p>This document presents forensic linguistic analysis and psychological evidence of gaslighting, manipulation, abuse, and exploitation directed at Ben. Each identified instance includes the exact quote, timestamp, type of violation, and analysis of the linguistic and psychological patterns that constitute evidence.</p>
    </div>\`;
            
            // Add each recording section with its analyses
            Object.keys(analysisData.recordings).forEach((recordingId, index) => {
                const recordingNumber = index + 1;
                const analyses = analysisData.recordings[recordingId];
                
                if (analyses.length === 0) return;
                
                exportHtml += \`
    <div class="recording-section">
        <h2>Recording \${recordingNumber}</h2>
        <div class="iframe-container">
            <iframe src="https://grain.com/_/embed/recording/\${recordingId}/\${analyses[0].embedParam}?autoplay=false&origin=user_iframe" height="324" width="576" allow="fullscreen" allowfullscreen="true" frameborder="0"></iframe>
        </div>
        
        <h3>Evidence of Manipulation, Gaslighting, and Abuse</h3>
        <table>
            <thead>
                <tr>
                    <th>Timestamp</th>
                    <th>Quote</th>
                    <th>Violation Type</th>
                    <th>Linguistic/Psychological Analysis</th>
                </tr>
            </thead>
            <tbody>\`;
                
                // Sort analyses by timestamp
                analyses.sort((a, b) => {
                    const aTime = a.startTime.split(':').reduce((acc, time) => (60 * acc) + parseFloat(time), 0);
                    const bTime = b.startTime.split(':').reduce((acc, time) => (60 * acc) + parseFloat(time), 0);
                    return aTime - bTime;
                });
                
                // Add rows for each analysis
                analyses.forEach(analysis => {
                    exportHtml += \`
                <tr>
                    <td><span class="timestamp">\${analysis.timestamp}</span></td>
                    <td><span class="violation">\${analysis.quote}</span></td>
                    <td>\${analysis.violationType}</td>
                    <td>\${analysis.analysis}</td>
                </tr>\`;
                });
                
                exportHtml += \`
            </tbody>
        </table>
    </div>\`;
            });
            
            exportHtml += \`
</body>
</html>\`;
            
            // Create a blob and download link
            const blob = new Blob([exportHtml], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'forensic_analysis_export.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    </script>
</body>
</html>`;

  // Write HTML to file
  fs.writeFileSync('forensic_analysis.html', htmlContent);
}

// Run the main function
processRecordings();
