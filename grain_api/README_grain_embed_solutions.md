# Grain Embed Time Frame Parameter Solutions

This repository contains multiple solutions to address the issues with Grain embed time frame parameters not properly constraining video segments as expected.

## Problem Analysis

The standard Grain embed iframe implementation uses URL parameters like `start` and `end` to define time segments:

```html
<iframe src="https://grain.com/_/embed/recording/[RECORDING_ID]/[ACCESS_TOKEN]?start=224&end=260&autoplay=false"></iframe>
```

However, these parameters are not consistently respected by the Grain player, resulting in videos that:
- Start from the beginning instead of the specified start time
- Continue playing past the specified end time
- Ignore time constraints entirely in some browsers

## Solution Approaches

We've implemented three complementary approaches to solve this issue:

### 1. Multiple URL Parameter Approach

**File:** `inspiring_moments.html`

This solution uses multiple time parameters for maximum compatibility:

```html
<iframe src="https://grain.com/_/embed/recording/[RECORDING_ID]/[ACCESS_TOKEN]?start=224&end=260&t=224&time=224&autoplay=false#t=224"></iframe>
```

**Key Features:**
- Uses multiple time parameters (`start`, `end`, `t`, `time`, and URL fragment `#t=`)
- Simple HTML-only solution that works across browsers
- No JavaScript required
- Provides a clean, professional UI for displaying inspirational moments

**Limitations:**
- Still relies on the Grain player's parameter handling
- May not work consistently across all browsers
- Limited control over playback

### 2. Custom Player Wrapper

**Files:** 
- `grain_custom_player.js` - Core wrapper implementation
- `custom_player_demo.html` - Demo implementation

This solution provides a JavaScript wrapper around the Grain player iframe that enforces time constraints and provides additional control:

```javascript
const player = new GrainPlayerController({
    containerId: 'grain-player-container',
    recordingId: 'YOUR_RECORDING_ID',
    accessToken: 'YOUR_ACCESS_TOKEN',
    startTime: 120,
    endTime: 165,
    autoplay: true,
    onReady: () => { console.log('Player is ready'); },
    onTimeUpdate: (time) => { console.log('Current time:', time); },
    onEnd: () => { console.log('Segment ended'); }
});
```

**Key Features:**
- JavaScript class that wraps the Grain player iframe
- Provides programmatic control over video playback
- Enforces start and end times for segments
- Multiple redundant approaches to ensure time constraints are respected:
  - URL parameters in the iframe src
  - postMessage API for communication with the iframe
  - Direct time constraint checking and enforcement
  - Forced seeking to start time after initialization
- Event handling for player state changes
- Clean destruction and cleanup

**Implementation Details:**
- Creates an iframe with multiple time parameters in the URL
- Sets up message listeners for communication with the iframe
- Periodically checks if the current time exceeds the end time
- Provides methods for play, pause, seek, and toggle playback
- Includes callbacks for ready, time update, and end events

### 3. Grain API Highlight Approach

**Files:**
- `create_highlights.js` - Script to create highlights via the Grain API
- `run_create_highlights.sh` - Shell script to run the highlight creation

This solution leverages the Grain API to create dedicated highlights that can be embedded:

```javascript
// Create a highlight via the API
const response = await fetch(`https://grain.com/_/public-api/recordings/${recordingId}/highlights`, {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        timestamp: startTime,
        duration: endTime - startTime,
        text: description
    })
});

// Embed the highlight
<iframe src="https://grain.com/_/embed/highlight/[HIGHLIGHT_ID]/[ACCESS_TOKEN]"></iframe>
```

**Key Features:**
- Uses the dedicated highlight endpoint designed for segment extraction
- Most reliable method when API access is available
- Creates permanent highlight references that can be embedded

**Limitations:**
- Requires API access and authentication
- Creates new resources on the Grain platform
- May not be suitable for dynamic or temporary segments

## Usage Instructions

### Basic Embedding with Time Constraints

For simple embedding with time constraints, use the multiple parameter approach:

```html
<iframe 
    src="https://grain.com/_/embed/recording/YOUR_RECORDING_ID/YOUR_ACCESS_TOKEN?start=120&end=180&t=120&time=120&autoplay=false#t=120"
    width="100%" 
    height="400" 
    frameborder="0" 
    allowfullscreen>
</iframe>
```

### Advanced Control with Custom Player

For advanced control and more reliable time constraints:

1. Include the `grain_custom_player.js` script in your project
2. Create a container element for the player
3. Initialize the player with your configuration

```html
<div id="grain-player-container"></div>

<script src="grain_custom_player.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', () => {
        const player = new GrainPlayerController({
            containerId: 'grain-player-container',
            recordingId: 'YOUR_RECORDING_ID',
            accessToken: 'YOUR_ACCESS_TOKEN',
            startTime: 120,
            endTime: 180,
            autoplay: false
        });
        
        // Add custom controls
        document.getElementById('play-button').addEventListener('click', () => {
            player.play();
        });
        
        document.getElementById('pause-button').addEventListener('click', () => {
            player.pause();
        });
    });
</script>
```

### Creating and Embedding Highlights

For the most reliable segment embedding using the Grain API:

1. Create a highlight using the API:

```javascript
const apiKey = 'YOUR_API_KEY';
const recordingId = 'YOUR_RECORDING_ID';
const startTime = 120; // in seconds
const duration = 60; // in seconds
const description = 'Your segment description';

const response = await fetch(`https://grain.com/_/public-api/recordings/${recordingId}/highlights`, {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        timestamp: startTime,
        duration: duration,
        text: description
    })
});

const highlight = await response.json();
console.log(`Created highlight: ${highlight.id}`);
```

2. Embed the highlight:

```html
<iframe 
    src="https://grain.com/_/embed/highlight/HIGHLIGHT_ID/ACCESS_TOKEN"
    width="100%" 
    height="400" 
    frameborder="0" 
    allowfullscreen>
</iframe>
```

## Demo Files

- `custom_player_demo.html` - Demonstrates the custom player wrapper with segment selection
- `inspiring_moments.html` - Shows a collection of inspirational segments using the multiple parameter approach

## Technical Notes

- The Grain player uses an iframe that loads content from `grain.com`
- Communication with the iframe is limited by cross-origin restrictions
- The postMessage API is partially supported but has limitations
- URL parameters are the primary method for controlling the player
- The Grain API requires proper authentication and permissions

## Browser Compatibility

These solutions have been tested and should work in:
- Chrome
- Firefox
- Safari
- Edge

## Troubleshooting

If segments are not loading at the correct time:

1. Clear browser cache completely
2. Test in multiple browsers
3. Use private/incognito mode to eliminate extension interference
4. Verify network requests using browser DevTools
5. Check for console errors that might indicate issues with the player
6. Ensure you're using the correct recording ID and access token
7. Try increasing the delay in the forceSeekToStart method if needed

## License

This project is licensed under the MIT License - see the LICENSE file for details.
