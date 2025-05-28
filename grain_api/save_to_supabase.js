// Save Aha Moments to Supabase
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
const RECORDING_TITLE = 'Aha Moments Recording';
const RECORDING_DESCRIPTION = 'Recording with extracted aha moments';

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

// Create or get a recording
async function createOrGetRecording(grainRecordingId, title, description = '') {
  console.log(`Creating or getting recording: ${title}`);
  
  // Check if recording exists
  const { data: existingRecording, error: fetchError } = await supabase
    .from('recordings')
    .select('*')
    .eq('grain_recording_id', grainRecordingId)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error('Error fetching recording:', fetchError);
    throw fetchError;
  }

  if (existingRecording) {
    console.log('Recording already exists:', existingRecording.id);
    return existingRecording;
  }

  // Create new recording
  const { data: newRecording, error: insertError } = await supabase
    .from('recordings')
    .insert([
      {
        grain_recording_id: grainRecordingId,
        title,
        description
      }
    ])
    .select()
    .single();

  if (insertError) {
    console.error('Error creating recording:', insertError);
    throw insertError;
  }

  console.log('Created new recording:', newRecording.id);
  return newRecording;
}

// Save aha moments to Supabase
async function saveAhaMoments(recordingId, ahaMoments) {
  console.log(`Saving ${ahaMoments.length} aha moments for recording ${recordingId}`);
  
  const formattedMoments = ahaMoments.map(moment => ({
    recording_id: recordingId,
    moment_id: moment.id,
    title: moment.title || 'Aha Moment',
    timestamp: moment.timestamp,
    stop_at: moment.stopAt,
    transcript: moment.transcript || null,
    analysis: moment.analysis || null,
    sentiment: moment.sentiment || null,
    tags: moment.tags || []
  }));

  const { data, error } = await supabase
    .from('aha_moments')
    .upsert(formattedMoments, { 
      onConflict: 'recording_id,moment_id',
      returning: 'representation'
    });

  if (error) {
    console.error('Error saving aha moments:', error);
    throw error;
  }

  console.log(`Successfully saved ${data.length} aha moments`);
  return data;
}

// Create a thumbnail image for an aha moment (placeholder function)
async function createThumbnail(momentId, timestamp) {
  // In a real implementation, you would capture a frame from the video at the given timestamp
  // For now, we'll just create a placeholder image
  console.log(`Creating thumbnail for moment ${momentId} at ${timestamp}`);
  
  // Return a placeholder image URL
  return `https://via.placeholder.com/640x360.png?text=Aha+Moment+${momentId}`;
}

// Upload a thumbnail to Supabase Storage
async function uploadThumbnail(momentId, thumbnailUrl) {
  console.log(`Uploading thumbnail for moment ${momentId}`);
  
  // In a real implementation, you would download the image from thumbnailUrl and upload it to Supabase Storage
  // For now, we'll just log the URL
  console.log(`Would upload thumbnail from ${thumbnailUrl} to Supabase Storage`);
  
  // Return a placeholder Supabase Storage URL
  return `${process.env.SUPABASE_STORAGE_URL}/thumbnails/${momentId}.png`;
}

// Main function
async function main() {
  try {
    // Read aha moments from JSON file
    const ahaMoments = readAhaMoments();
    
    // Create or get recording
    const recording = await createOrGetRecording(RECORDING_ID, RECORDING_TITLE, RECORDING_DESCRIPTION);
    
    // Save aha moments to Supabase
    const savedMoments = await saveAhaMoments(recording.id, ahaMoments);
    
    // Create and upload thumbnails for each moment
    for (const moment of savedMoments) {
      const thumbnailUrl = await createThumbnail(moment.moment_id, moment.timestamp);
      const storagePath = await uploadThumbnail(moment.moment_id, thumbnailUrl);
      
      // Update the moment with the thumbnail URL
      const { data, error } = await supabase
        .from('aha_moments')
        .update({ thumbnail_url: storagePath })
        .eq('id', moment.id)
        .select()
        .single();
      
      if (error) {
        console.error(`Error updating thumbnail for moment ${moment.moment_id}:`, error);
      } else {
        console.log(`Updated thumbnail for moment ${moment.moment_id}`);
      }
    }
    
    console.log('Done!');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the main function
main();
