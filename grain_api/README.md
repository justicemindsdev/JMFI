# Grain Inspirational Segments

A collection of inspirational segments from Grain recordings with solutions for time frame parameter issues.

## Overview

This repository contains HTML pages that embed inspirational segments from Grain recordings, along with solutions to fix issues with time frame parameters not constraining video segments as expected.

## Features

- Inspirational segments from a conversation between Ben Mak and Kajha Nainamohamed
- JavaScript solution to enforce time boundaries for Grain embeds
- Node.js script to create permanent highlights using the Grain API
- Shell scripts for running the Node.js script and pushing to GitHub

## Files

- `preview_inspirational_segments.html`: Preview page for inspirational segments
- `inspirational_segments_compilation.html`: Compilation of all inspirational segments
- `create_grain_highlights.js`: Node.js script to create highlights using the Grain API
- `run_create_highlights.sh`: Shell script to run the Node.js script
- `push_to_github.sh`: Shell script to push the code to GitHub
- `grain_analysis.js`: JavaScript for analyzing Grain recordings
- `extract_inspirational_segments.py`: Python script to extract segments from Grain recordings
- `run_extract_segments.sh`: Shell script to run the Python script

## Solutions for Time Frame Parameter Issues

### JavaScript Time Control

A JavaScript solution has been added to both HTML files to enforce time boundaries using the Grain player's postMessage API. The code:

- Extracts the `start` and `end` parameters from the iframe URL
- Uses the postMessage API to communicate with the Grain player
- Enforces the time boundaries by resetting the player when it reaches the end time

```javascript
frame.contentWindow.postMessage({
    event: 'initialize',
    timeRangeControl: {
        start: start,
        end: end,
        enforce: true
    }
}, 'https://grain.com');
```

### Grain Highlights API

A more robust solution using the Grain Highlights API:

- Creates permanent highlight clips through the Grain API
- Embeds these highlights instead of using time parameters on the recording
- Provides more reliable playback boundaries

To create highlights using the Grain API:

1. Make sure your Grain API token is set in the `.env` file:
   ```
   GRAIN_API_TOKEN=your_api_token_here
   ```

2. Run the shell script:
   ```bash
   ./run_create_highlights.sh
   ```

## Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/justicemindsdev/grain-inspirational-segments.git
   cd grain-inspirational-segments
   ```

2. Open the HTML files in a web browser:
   ```bash
   open preview_inspirational_segments.html
   ```

3. To create highlights using the Grain API:
   ```bash
   ./run_create_highlights.sh
   ```

## Requirements

- Node.js (for running the create_grain_highlights.js script)
- Python 3 (for running the extract_inspirational_segments.py script)
- Git (for pushing to GitHub)
- Grain API token (for creating highlights)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
