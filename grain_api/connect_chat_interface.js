// Connect Chat Interface with Supabase
require('dotenv').config();
require('dotenv').config({ path: '.env.supabase' });
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Configuration
const RECORDING_ID = '19bcc522-cf00-41b4-9131-7f89f329ce60'; // From the iframe URL

// Mock data for contacts (in a real app, this would come from Supabase)
const contacts = [
  { id: 1, name: "John Doe", role: "Product Manager", lastChat: "May 25, 2025", active: true },
  { id: 2, name: "Jane Smith", role: "UX Designer", lastChat: "May 24, 2025", active: false },
  { id: 3, name: "Robert Johnson", role: "Developer", lastChat: "May 23, 2025", active: true },
  { id: 4, name: "Emily Davis", role: "Marketing", lastChat: "May 22, 2025", active: false },
  { id: 5, name: "Michael Wilson", role: "CEO", lastChat: "May 21, 2025", active: true }
];

// Get all moments for a recording
async function getMoments(grainRecordingId) {
  console.log(`Getting moments for recording: ${grainRecordingId}`);
  
  try {
    // First get the recording
    const { data: recording, error: recordingError } = await supabase
      .from('recordings')
      .select('id')
      .eq('grain_recording_id', grainRecordingId)
      .single();

    if (recordingError) {
      console.error('Error fetching recording:', recordingError);
      // If the recording doesn't exist in Supabase, use mock data
      return getMockMoments();
    }

    if (!recording) {
      console.log('Recording not found, using mock data');
      return getMockMoments();
    }

    // Then get the moments
    const { data: moments, error: momentsError } = await supabase
      .from('moments')
      .select('*')
      .eq('recording_id', recording.id)
      .order('timestamp', { ascending: true });

    if (momentsError) {
      console.error('Error fetching moments:', momentsError);
      return getMockMoments();
    }

    console.log(`Found ${moments.length} moments`);

    if (moments.length === 0) {
      console.log('No moments found, using mock data');
      return getMockMoments();
    }

    // Format the moments to match our expected format
    return moments.map(moment => ({
      id: moment.moment_id,
      title: moment.title,
      timestamp: moment.timestamp,
      stopAt: moment.stop_at,
      recordingId: grainRecordingId,
      transcript: moment.transcript,
      tags: moment.tags || [],
      category: moment.category || 'general',
      thumbnailUrl: moment.thumbnail_url
    }));
  } catch (error) {
    console.error('Error in getMoments:', error);
    return getMockMoments();
  }
}

// Get mock moments for testing
function getMockMoments() {
  return [
    {
      id: "video1",
      title: "Product Roadmap Discussion",
      timestamp: "25:00",
      stopAt: "25:30",
      recordingId: RECORDING_ID,
      transcript: "I think this is a really important feature that we need to prioritize for the next quarter.",
      tags: ["roadmap", "feature", "priority"],
      category: "work"
    },
    {
      id: "video2",
      title: "User Research Findings",
      timestamp: "35:15",
      stopAt: "36:00",
      recordingId: RECORDING_ID,
      transcript: "The user testing revealed that 80% of participants struggled with the current navigation.",
      tags: ["research", "usability", "navigation"],
      category: "work"
    },
    {
      id: "video3",
      title: "Budget Approval",
      timestamp: "45:30",
      stopAt: "46:15",
      recordingId: RECORDING_ID,
      transcript: "We've secured the additional budget for the Q3 marketing campaign.",
      tags: ["budget", "marketing", "approval"],
      category: "work"
    },
    {
      id: "video4",
      title: "Personal Development Plan",
      timestamp: "55:10",
      stopAt: "56:00",
      recordingId: RECORDING_ID,
      transcript: "I'd like to focus on improving my public speaking skills this quarter.",
      tags: ["personal", "development", "skills"],
      category: "personal"
    },
    {
      id: "video5",
      title: "Team Building Activity",
      timestamp: "65:20",
      stopAt: "66:10",
      recordingId: RECORDING_ID,
      transcript: "Let's plan a team outing next month to improve morale and collaboration.",
      tags: ["team", "morale", "collaboration"],
      category: "social"
    }
  ];
}

// Update the HTML file with dynamic data
async function updateHtmlWithData() {
  try {
    // Get moments from Supabase or mock data
    const moments = await getMoments(RECORDING_ID);
    
    // Read the HTML file
    const htmlPath = path.join(__dirname, 'grain_chat_interface.html');
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Replace the sample data in the JavaScript section
    const contactsDataString = `const contacts = ${JSON.stringify(contacts, null, 2)};`;
    const videosDataString = `const videos = ${JSON.stringify(moments, null, 2)};`;
    
    // Use regex to replace the data
    htmlContent = htmlContent.replace(
      /const contacts = \[[\s\S]*?\];/,
      contactsDataString
    );
    
    htmlContent = htmlContent.replace(
      /const videos = \[[\s\S]*?\];/,
      videosDataString
    );
    
    // Write the updated HTML file
    const connectedHtmlPath = path.join(__dirname, 'grain_chat_interface_connected.html');
    fs.writeFileSync(connectedHtmlPath, htmlContent);
    
    console.log(`Connected HTML file created: ${connectedHtmlPath}`);
    
    // Try to open the HTML file based on the OS
    const { platform } = process;
    if (platform === 'darwin') { // macOS
      require('child_process').exec(`open ${connectedHtmlPath}`);
    } else if (platform === 'win32') { // Windows
      require('child_process').exec(`start ${connectedHtmlPath}`);
    } else if (platform === 'linux') { // Linux
      require('child_process').exec(`xdg-open ${connectedHtmlPath}`);
    } else {
      console.log(`Please open ${connectedHtmlPath} in your browser.`);
    }
  } catch (error) {
    console.error('Error updating HTML with data:', error);
  }
}

// Main function
async function main() {
  try {
    console.log('Connecting chat interface with Supabase...');
    await updateHtmlWithData();
    console.log('Done!');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the main function
main();
