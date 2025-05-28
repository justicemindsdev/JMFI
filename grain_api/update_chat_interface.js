// Update Chat Interface with AI-extracted Moments
require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Configuration
const RECORDING_ID = process.env.RECORDING_ID || '19bcc522-cf00-41b4-9131-7f89f329ce60';

/**
 * Load extracted moments from JSON file
 * @returns {Array} - Array of extracted moments
 */
function loadExtractedMoments() {
  try {
    const filePath = path.join(__dirname, 'extracted_moments.json');
    if (!fs.existsSync(filePath)) {
      console.error('Extracted moments file not found');
      return [];
    }
    
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading extracted moments:', error);
    return [];
  }
}

/**
 * Update the HTML file with extracted moments
 * @param {Array} moments - Array of extracted moments
 */
function updateHtmlWithMoments(moments) {
  try {
    // Read the HTML file
    const htmlPath = path.join(__dirname, 'grain_chat_interface.html');
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Create the videos data string
    const videosDataString = `const videos = ${JSON.stringify(moments, null, 2)};`;
    
    // Replace the existing videos data
    htmlContent = htmlContent.replace(
      /const videos = \[[\s\S]*?\];/,
      videosDataString
    );
    
    // Update the prompt input placeholder to show the last used prompt
    if (moments.length > 0 && moments[0].lastPrompt) {
      htmlContent = htmlContent.replace(
        /placeholder="Type a prompt to find any type of moment \(work, personal, etc\.\)\.\.\."/,
        `placeholder="Try another prompt like: '${moments[0].lastPrompt}'..."`
      );
    }
    
    // Write the updated HTML file
    const connectedHtmlPath = path.join(__dirname, 'grain_chat_interface_connected.html');
    fs.writeFileSync(connectedHtmlPath, htmlContent);
    
    console.log(`Updated HTML file created: ${connectedHtmlPath}`);
  } catch (error) {
    console.error('Error updating HTML with moments:', error);
  }
}

/**
 * Enhance moments with additional metadata
 * @param {Array} moments - Array of extracted moments
 * @returns {Array} - Enhanced moments
 */
function enhanceMoments(moments) {
  return moments.map(moment => {
    // Add position for sorting
    const timestampParts = moment.timestamp.split(':');
    const minutes = parseInt(timestampParts[0]);
    const seconds = parseInt(timestampParts[1]);
    const position = minutes * 60 + seconds;
    
    // Add last prompt used
    const lastPrompt = process.argv[2] || 'Find the most insightful and important moments';
    
    return {
      ...moment,
      position,
      lastPrompt
    };
  }).sort((a, b) => a.position - b.position);
}

/**
 * Update the video rendering function in the HTML
 * @param {string} htmlContent - HTML content
 * @returns {string} - Updated HTML content
 */
function updateVideoRenderingFunction(htmlContent) {
  // Find the renderVideos function
  const renderVideosRegex = /function renderVideos\(\) \{[\s\S]*?\}/;
  const renderVideosMatch = htmlContent.match(renderVideosRegex);
  
  if (!renderVideosMatch) {
    console.error('Could not find renderVideos function in HTML');
    return htmlContent;
  }
  
  // Create the new renderVideos function with analysis display
  const newRenderVideos = `function renderVideos() {
      const videoGrid = document.getElementById('videoGrid');
      videoGrid.innerHTML = '';
      
      videos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.className = 'video-card';
        // Set default category if not provided
        const category = video.category || 'general';
        
        videoElement.innerHTML = \`
          <div class="video-category category-\${category}">\${category}</div>
          <div class="video-title">
            <span>\${video.title}</span>
            <span class="video-timestamp">\${video.timestamp} - \${video.stopAt}</span>
          </div>
          <div class="video-container">
            <iframe 
              src="https://grain.com/_/embed/recording/\${video.recordingId}/IyQ1igZOqfAI9ngBciC2E2Ruu7djaRHmjY7JvMnZ?autoplay=false&origin=user_iframe&start=\${video.timestamp}&end=\${video.stopAt}" 
              height="324" 
              width="576" 
              allow="fullscreen; autoplay" 
              allowfullscreen="true" 
              frameborder="0"
              loading="lazy">
            </iframe>
          </div>
          <div class="video-info">
            <div class="video-transcript">\${video.transcript}</div>
            <div class="video-analysis">\${video.analysis || ''}</div>
            <div class="video-tags">
              \${video.tags.map(tag => \`<span class="video-tag">\${tag}</span>\`).join('')}
            </div>
          </div>
        \`;
        videoGrid.appendChild(videoElement);
      });
    }`;
  
  // Replace the old function with the new one
  return htmlContent.replace(renderVideosRegex, newRenderVideos);
}

/**
 * Add CSS for the analysis section
 * @param {string} htmlContent - HTML content
 * @returns {string} - Updated HTML content
 */
function addAnalysisStyles(htmlContent) {
  // Find the end of the CSS section
  const cssEndIndex = htmlContent.indexOf('</style>');
  
  if (cssEndIndex === -1) {
    console.error('Could not find style section in HTML');
    return htmlContent;
  }
  
  // CSS for the analysis section
  const analysisCss = `
    .video-analysis {
      margin: 10px 0;
      padding: 10px;
      background-color: rgba(187, 134, 252, 0.1);
      border-left: 3px solid var(--primary-color);
      font-size: 14px;
      color: var(--text-primary);
      border-radius: 0 4px 4px 0;
    }
  `;
  
  // Insert the CSS before the end of the style tag
  return htmlContent.slice(0, cssEndIndex) + analysisCss + htmlContent.slice(cssEndIndex);
}

/**
 * Update the prompt handling function to use AI extraction
 * @param {string} htmlContent - HTML content
 * @returns {string} - Updated HTML content
 */
function updatePromptHandlingFunction(htmlContent) {
  // Find the handlePromptSubmit function
  const handlePromptRegex = /function handlePromptSubmit\(\) \{[\s\S]*?\}/;
  const handlePromptMatch = htmlContent.match(handlePromptRegex);
  
  if (!handlePromptMatch) {
    console.error('Could not find handlePromptSubmit function in HTML');
    return htmlContent;
  }
  
  // Create the new handlePromptSubmit function
  const newHandlePrompt = `function handlePromptSubmit() {
      const promptInput = document.getElementById('promptInput');
      const prompt = promptInput.value.trim();
      
      if (prompt) {
        // Show loading state
        document.getElementById('videoGrid').innerHTML = '<div class="loading-message">Analyzing recording with AI to find moments matching your prompt...</div>';
        
        // In a real app, this would call the AI extraction API
        // For demo purposes, we'll just show an alert and clear the input
        alert(\`Extracting moments matching: "\${prompt}"\nThis would trigger the AI extraction process in a real implementation.\`);
        
        // In a real implementation, this would be an API call:
        // fetch('/api/extract-moments', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ prompt })
        // })
        // .then(response => response.json())
        // .then(data => {
        //   // Update videos with the extracted moments
        //   videos = data;
        //   renderVideos();
        // });
        
        promptInput.value = '';
      }
    }`;
  
  // Replace the old function with the new one
  return htmlContent.replace(handlePromptRegex, newHandlePrompt);
}

/**
 * Add loading message styles
 * @param {string} htmlContent - HTML content
 * @returns {string} - Updated HTML content
 */
function addLoadingStyles(htmlContent) {
  // Find the end of the CSS section
  const cssEndIndex = htmlContent.indexOf('</style>');
  
  if (cssEndIndex === -1) {
    console.error('Could not find style section in HTML');
    return htmlContent;
  }
  
  // CSS for the loading message
  const loadingCss = `
    .loading-message {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 200px;
      width: 100%;
      color: var(--text-secondary);
      font-size: 16px;
      text-align: center;
      padding: 20px;
      grid-column: 1 / -1;
    }
  `;
  
  // Insert the CSS before the end of the style tag
  return htmlContent.slice(0, cssEndIndex) + loadingCss + htmlContent.slice(cssEndIndex);
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('Updating chat interface with AI-extracted moments...');
    
    // Load extracted moments
    const moments = loadExtractedMoments();
    if (moments.length === 0) {
      console.error('No moments found');
      return;
    }
    
    console.log(`Loaded ${moments.length} moments`);
    
    // Enhance moments with additional metadata
    const enhancedMoments = enhanceMoments(moments);
    
    // Read the HTML file
    const htmlPath = path.join(__dirname, 'grain_chat_interface.html');
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Update the HTML with the new functions and styles
    htmlContent = addAnalysisStyles(htmlContent);
    htmlContent = addLoadingStyles(htmlContent);
    htmlContent = updateVideoRenderingFunction(htmlContent);
    htmlContent = updatePromptHandlingFunction(htmlContent);
    
    // Write the updated HTML file
    const connectedHtmlPath = path.join(__dirname, 'grain_chat_interface_connected.html');
    fs.writeFileSync(connectedHtmlPath, htmlContent);
    
    // Update the HTML with the extracted moments
    updateHtmlWithMoments(enhancedMoments);
    
    console.log('Done!');
  } catch (error) {
    console.error('Error in main function:', error);
    process.exit(1);
  }
}

// Run the main function
main();
