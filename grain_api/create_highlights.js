// Script to create highlights in a Grain recording
// Using dynamic import for node-fetch (ESM module)

// Configuration
const GRAIN_API_TOKEN = 'grain_pat_GtgEzhgt_WKcxmcdZQfKVmbwvBTkiGe1UmeK51cs0p6ODMIyn';
const RECORDING_ID = '7458efd4-a56f-455d-b189-43073da8b118';

// Example inspiring moments to create as highlights
const inspiringMoments = [
    {
        text: "On Setting Clear Goals",
        timestamp: 120,
        duration: 45000, // 45 seconds in milliseconds
        transcript: "The key to success is setting clear, measurable goals that align with your values and vision for the future."
    },
    {
        text: "On Overcoming Challenges",
        timestamp: 360,
        duration: 60000, // 60 seconds
        transcript: "Challenges are not obstacles, they are opportunities to grow and demonstrate your resilience."
    },
    {
        text: "On Building Strong Teams",
        timestamp: 720,
        duration: 50000, // 50 seconds
        transcript: "The strength of your team is not determined by individual talent, but by how well you work together toward a common purpose."
    },
    {
        text: "On Effective Leadership",
        timestamp: 1080,
        duration: 65000, // 65 seconds
        transcript: "Leadership is not about being in charge. It's about taking care of those in your charge and empowering them to succeed."
    },
    {
        text: "On Innovation and Creativity",
        timestamp: 1440,
        duration: 55000, // 55 seconds
        transcript: "Innovation happens at the intersection of preparation and opportunity. Create space for creativity in your daily routine."
    },
    {
        text: "On Personal Growth",
        timestamp: 1800,
        duration: 70000, // 70 seconds
        transcript: "The most important investment you can make is in yourself. Continuous learning and self-improvement are the foundations of success."
    }
];

// Function to create a highlight
async function createHighlight(moment) {
    try {
        // Dynamically import node-fetch
        const { default: fetch } = await import('node-fetch');
        
        const response = await fetch(`https://api.grain.com/_/public-api/recordings/${RECORDING_ID}/highlights`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GRAIN_API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                timestamp: moment.timestamp,
                duration: moment.duration,
                text: moment.text
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log(`Created highlight: ${moment.text}`, data);
        return data;
    } catch (error) {
        console.error(`Error creating highlight "${moment.text}":`, error);
        return null;
    }
}

// Function to create all highlights
async function createAllHighlights() {
    console.log(`Creating highlights for recording ${RECORDING_ID}...`);
    
    const results = [];
    
    for (const moment of inspiringMoments) {
        console.log(`Creating highlight: ${moment.text}`);
        const result = await createHighlight(moment);
        if (result) {
            results.push({
                ...moment,
                highlightId: result.id,
                url: result.url
            });
        }
    }
    
    console.log('Highlight creation complete.');
    console.log('Results:', JSON.stringify(results, null, 2));
    
    return results;
}

// Execute the function
createAllHighlights()
    .then(highlights => {
        console.log(`Created ${highlights.length} highlights successfully.`);
    })
    .catch(error => {
        console.error('Error in highlight creation process:', error);
    });
