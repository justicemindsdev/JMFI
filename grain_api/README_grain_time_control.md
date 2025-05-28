# Grain Video Time Control Solutions

This repository contains solutions for controlling the start and end times of Grain video embeds. Based on extensive testing and research, we've developed multiple approaches to address the limitations of the Grain embed player.

## The Problem

The Grain embed player doesn't fully support time range constraints through standard URL parameters. While the `t` parameter can be used to set the start time, there's no direct parameter to control the end time of the video.

## Solutions Overview

We've implemented three different solutions with varying levels of complexity:

1. **Direct Time Parameter** - Simple HTML-only solution for setting the start time
2. **Time Range Player** - JavaScript wrapper that enforces both start and end times
3. **Highlight API** - Server-side solution using Grain's API to create dedicated highlights

## 1. Direct Time Parameter

The simplest solution is to use the `t` parameter in the iframe URL to set the start time:

```html
<iframe 
    src="https://grain.com/_/embed/recording/VIDEO_ID/ACCESS_TOKEN?autoplay=true&t=170" 
    allow="fullscreen" 
    allowfullscreen="true" 
    frameborder="0">
</iframe>
```

**Key Features:**
- HTML-only solution, no JavaScript required
- Works across all browsers
- Simple to implement

**Limitations:**
- Only controls the start time, not the end time
- May not work consistently across all Grain player versions

**Demo File:** `direct_time_parameter.html`

## 2. Time Range Player

A JavaScript wrapper that enforces both start and end times:

```javascript
const player = new GrainTimeRangePlayer({
    containerId: 'grain-player-container',
    videoId: 'VIDEO_ID',
    startTime: 170,
    endTime: 185,
    autoplay: true
});
```

**Key Features:**
- Controls both start and end times
- Automatically resets or pauses the video when the end time is reached
- Provides a clean API for controlling the player

**Implementation Details:**
- Uses the `t` parameter to set the initial start time
- Monitors the current playback time via the postMessage API
- Enforces the end time constraint through JavaScript

**Demo File:** `time_range_demo.html`

## 3. Highlight API (Server-Side Solution)

For the most reliable solution, you can use the Grain API to create dedicated highlights:

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
<iframe src="https://grain.com/_/embed/highlight/HIGHLIGHT_ID/ACCESS_TOKEN"></iframe>
```

**Key Features:**
- Most reliable method for precise time segments
- Officially supported by Grain
- Highlights are persistent and can be reused

**Limitations:**
- Requires API access and authentication
- More complex implementation requiring server-side code
- May be subject to API rate limits

**Reference Files:** 
- `grain_timeframe_solutions.txt`
- `create_highlights.js`

## Time String Conversion

To convert time strings (like "00:02:50") to seconds for use with the `t` parameter:

```javascript
function timeStringToSeconds(timeString) {
    const parts = timeString.split(':');
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

// Example usage
const startTimeString = "00:02:50";
const startTimeSeconds = timeStringToSeconds(startTimeString); // 170
```

## Choosing the Right Solution

- **For simple cases:** Use the direct time parameter approach
- **For client-side control of both start and end times:** Use the Time Range Player
- **For the most reliable solution:** Use the Highlight API approach

## Browser Compatibility

These solutions have been tested and should work in:
- Chrome
- Firefox
- Safari
- Edge

## Troubleshooting

If videos are not starting at the correct time:

1. Clear browser cache
2. Try in incognito/private browsing mode
3. Verify the video ID and access token are correct
4. Check browser console for errors
5. Try increasing the delay before seeking to the start time
6. Ensure the time values are in seconds, not milliseconds or timecode format

## License

This project is licensed under the MIT License - see the LICENSE file for details.
