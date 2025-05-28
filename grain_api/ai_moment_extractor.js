// AI-powered Moment Extractor for Grain Recordings
require('dotenv').config();
require('dotenv').config({ path: '.env.openrouter' });
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// OpenRouter API configuration
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const DEFAULT_MODEL = process.env.OPENROUTER_DEFAULT_MODEL || 'anthropic/claude-3.5-sonnet';

// Available models
const MODELS = {
  'claude-instant': 'anthropic/claude-instant-1.1',
  'claude-3.5': 'anthropic/claude-3.5-sonnet',
  'gpt-4o': 'openai/chatgpt-4o-latest',
  'o1-preview': 'openai/o1-preview-2024-09-12',
  'o1-mini': 'openai/o1-mini',
  'grok': 'x-ai/grok-beta'
};

// Configuration
const GRAIN_API_TOKEN = process.env.GRAIN_API_TOKEN;
const RECORDING_ID = process.env.RECORDING_ID || '19bcc522-cf00-41b4-9131-7f89f329ce60';

/**
 * Call OpenRouter API to analyze transcript and extract moments
 * @param {string} transcript - Full transcript of the recording
 * @param {string} prompt - User prompt for finding specific moments
 * @param {string} model - AI model to use
 * @returns {Promise<Array>} - Array of extracted moments
 */
async function analyzeTranscriptWithAI(transcript, prompt, model = DEFAULT_MODEL) {
  try {
    console.log(`Analyzing transcript with ${model}...`);
    
    const systemPrompt = `You are an expert at analyzing meeting transcripts and identifying the most important, insightful, or interesting moments based on user requests. 
    
Your task is to:
1. Analyze the provided transcript
2. Identify specific moments that match the user's prompt
3. For each moment, determine the best start and stop timestamps
4. Create a title that captures the essence of the moment
5. Write a brief analysis of why this moment is significant
6. Assign appropriate tags and a category (work, personal, social, or general)
7. Return the results in a structured JSON format

The timestamps in the transcript are in the format [HH:MM:SS]. Your output should include precise start and stop times for each moment, ensuring they capture the complete context.`;

    const userPrompt = `User Prompt: "${prompt}"

Transcript:
${transcript}

Please identify the most relevant moments based on my prompt. For each moment, provide:
1. A descriptive title
2. Start timestamp (in the format "MM:SS")
3. Stop timestamp (in the format "MM:SS")
4. The transcript excerpt
5. A brief analysis of why this moment is significant
6. Relevant tags
7. A category (work, personal, social, or general)

Format your response as a JSON array of moment objects with these fields: title, timestamp, stopAt, transcript, analysis, tags, category.`;

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
    let moments = [];
    
    try {
      // The AI might return the JSON in different formats
      if (content.includes('```json')) {
        // Extract JSON from markdown code block
        const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
        if (jsonMatch && jsonMatch[1]) {
          moments = JSON.parse(jsonMatch[1]).moments || [];
        }
      } else {
        // Try to parse the entire content as JSON
        const parsedContent = JSON.parse(content);
        moments = parsedContent.moments || parsedContent;
      }
    } catch (error) {
      console.error('Error parsing AI response:', error);
      console.log('Raw AI response:', content);
      return [];
    }

    // Ensure each moment has the required fields
    return moments.map((moment, index) => ({
      id: `moment-${Date.now()}-${index}`,
      title: moment.title,
      timestamp: moment.timestamp,
      stopAt: moment.stopAt,
      transcript: moment.transcript,
      analysis: moment.analysis,
      tags: moment.tags || [],
      category: moment.category || 'general',
      recordingId: RECORDING_ID
    }));
  } catch (error) {
    console.error('Error calling OpenRouter API:', error.response?.data || error.message);
    return [];
  }
}

/**
 * Fetch transcript from Grain API
 * @param {string} recordingId - Grain recording ID
 * @returns {Promise<string>} - Full transcript
 */
async function fetchTranscript(recordingId) {
  try {
    console.log(`Fetching transcript for recording ${recordingId}...`);
    
    const response = await axios.get(`https://api.grain.com/v1/recordings/${recordingId}/transcript`, {
      headers: {
        'Authorization': `Bearer ${GRAIN_API_TOKEN}`
      }
    });
    
    // Format the transcript with timestamps
    let formattedTranscript = '';
    if (response.data && response.data.transcript) {
      formattedTranscript = response.data.transcript.map(item => {
        const timestamp = formatTimestamp(item.start_time);
        return `[${timestamp}] ${item.speaker}: ${item.text}`;
      }).join('\n\n');
    }
    
    return formattedTranscript;
  } catch (error) {
    console.error('Error fetching transcript:', error.response?.data || error.message);
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
 * Generate thumbnails for moments using Grain API
 * @param {Array} moments - Array of extracted moments
 * @returns {Promise<Array>} - Moments with thumbnail URLs
 */
async function generateThumbnails(moments) {
  try {
    console.log('Generating thumbnails for moments...');
    
    // In a real implementation, this would call the Grain API to generate thumbnails
    // For now, we'll simulate it with a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Add mock thumbnail URLs
    return moments.map(moment => ({
      ...moment,
      thumbnailUrl: `https://grain.com/thumbnails/${moment.recordingId}/${moment.timestamp.replace(':', '-')}.jpg`
    }));
  } catch (error) {
    console.error('Error generating thumbnails:', error);
    return moments;
  }
}

/**
 * Extract moments from a recording based on a prompt
 * @param {string} recordingId - Grain recording ID
 * @param {string} prompt - User prompt for finding specific moments
 * @param {string} model - AI model to use
 * @returns {Promise<Array>} - Array of extracted moments
 */
async function extractMoments(recordingId, prompt, model = DEFAULT_MODEL) {
  try {
    console.log(`Extracting moments for recording ${recordingId} with prompt: "${prompt}"`);
    
    // Fetch transcript
    const transcript = await fetchTranscript(recordingId);
    if (!transcript) {
      console.error('Failed to fetch transcript');
      return [];
    }
    
    // Analyze transcript with AI
    const moments = await analyzeTranscriptWithAI(transcript, prompt, model);
    if (moments.length === 0) {
      console.log('No moments found');
      return [];
    }
    
    console.log(`Found ${moments.length} moments`);
    
    // Generate thumbnails
    const momentsWithThumbnails = await generateThumbnails(moments);
    
    // Save moments to file
    const outputPath = path.join(__dirname, 'extracted_moments.json');
    fs.writeFileSync(outputPath, JSON.stringify(momentsWithThumbnails, null, 2));
    console.log(`Saved ${momentsWithThumbnails.length} moments to ${outputPath}`);
    
    return momentsWithThumbnails;
  } catch (error) {
    console.error('Error extracting moments:', error);
    return [];
  }
}

/**
 * Main function
 */
async function main() {
  try {
    // Get command line arguments
    const args = process.argv.slice(2);
    const recordingId = args[0] || RECORDING_ID;
    const prompt = args[1] || 'Find the most insightful and important moments';
    const model = MODELS[args[2]] || DEFAULT_MODEL;
    
    console.log(`Using model: ${model}`);
    console.log(`Recording ID: ${recordingId}`);
    console.log(`Prompt: ${prompt}`);
    
    // Extract moments
    const moments = await extractMoments(recordingId, prompt, model);
    
    // Return moments
    return moments;
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
  extractMoments,
  analyzeTranscriptWithAI,
  fetchTranscript,
  generateThumbnails
};
