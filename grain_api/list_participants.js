const https = require('https');
require('dotenv').config();

// Grain API token from .env file
const API_TOKEN = process.env.GRAIN_API_TOKEN;

// Base URL for Grain API
const BASE_URL = 'https://api.grain.com/_/public-api';

// Function to make API requests
function makeRequest(method, endpoint) {
    return new Promise((resolve, reject) => {
        const options = {
            method: method,
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        };

        const req = https.request(`${BASE_URL}${endpoint}`, options, (res) => {
            let responseData = '';
            
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            
            res.on('end', () => {
                try {
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        // Success response
                        if (responseData) {
                            resolve(JSON.parse(responseData));
                        } else {
                            resolve({});
                        }
                    } else {
                        // Error response
                        reject(new Error(`API request failed with status code ${res.statusCode}: ${responseData}`));
                    }
                } catch (e) {
                    reject(e);
                }
            });
        });
        
        req.on('error', (err) => {
            reject(err);
        });
        
        req.end();
    });
}

// Function to get all recordings
async function getAllRecordings() {
    try {
        console.log('Fetching all recordings...');
        const endpoint = '/recordings';
        const response = await makeRequest('GET', endpoint);
        
        if (response && Array.isArray(response.recordings)) {
            console.log(`Found ${response.recordings.length} recordings.`);
            return response.recordings;
        } else if (response && Array.isArray(response)) {
            console.log(`Found ${response.length} recordings.`);
            return response;
        } else {
            console.log('No recordings found or endpoint structure is different.');
            console.log('Response structure:', JSON.stringify(response, null, 2).substring(0, 500) + '...');
            return [];
        }
    } catch (error) {
        console.error('Error fetching recordings:', error.message);
        return [];
    }
}

// Function to get meeting participants from a recording ID
async function getMeetingParticipants(recordingId) {
    try {
        console.log(`Fetching participants for recording ID: ${recordingId}...`);
        
        // Assuming the endpoint to get recording details includes participants
        const endpoint = `/recordings/${recordingId}`;
        const response = await makeRequest('GET', endpoint);
        
        if (response && response.participants && Array.isArray(response.participants)) {
            return response.participants.map(p => ({ 
                name: p.name, 
                id: p.id,
                recordingId: recordingId
            }));
        } else {
            console.log(`No participants found for recording ID: ${recordingId} or endpoint structure is different.`);
            return [];
        }
    } catch (error) {
        console.error(`Error fetching meeting participants for recording ${recordingId}:`, error.message);
        return [];
    }
}

// Main function to list all participants
async function listAllParticipants() {
    try {
        const recordings = await getAllRecordings();
        
        if (recordings.length === 0) {
            console.log('No recordings found.');
            return;
        }
        
        let allParticipants = [];
        let participantMap = new Map(); // To track unique participants
        
        console.log('\nFetching participants for each recording...');
        
        for (const recording of recordings) {
            const recordingId = recording.id;
            const participants = await getMeetingParticipants(recordingId);
            
            if (participants.length > 0) {
                console.log(`Recording ${recordingId}: ${participants.length} participants found`);
                
                participants.forEach(participant => {
                    // Use participant ID as key if available, otherwise use name
                    const key = participant.id || participant.name;
                    
                    if (!participantMap.has(key)) {
                        participantMap.set(key, participant);
                    }
                });
                
                allParticipants = allParticipants.concat(participants);
            }
        }

        // Get unique participants
        const uniqueParticipants = Array.from(participantMap.values());

        console.log('\n--- All Unique Participants ---');
        console.log(`Total unique participants: ${uniqueParticipants.length}`);
        
        uniqueParticipants.forEach(participant => {
            console.log(`- ${participant.name}`);
        });
        
        console.log('\n--- Participant Count by Recording ---');
        const recordingCounts = {};
        
        allParticipants.forEach(p => {
            if (!recordingCounts[p.recordingId]) {
                recordingCounts[p.recordingId] = 0;
            }
            recordingCounts[p.recordingId]++;
        });
        
        for (const [recordingId, count] of Object.entries(recordingCounts)) {
            console.log(`Recording ${recordingId}: ${count} participants`);
        }
        
    } catch (error) {
        console.error('Error listing all participants:', error.message);
    }
}

// Run the main function
listAllParticipants();
