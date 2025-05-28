# Grain Aha Moments Player

This tool extracts "aha moments" from Grain recordings and creates an interactive player that shows video clips for each moment.

## Features

- **Dark Mode Design**: Clean, modern interface with dark mode for comfortable viewing
- **Direct Video Embedding**: Videos load directly in the page for immediate playback
- **Time-Specific Playback**: Each video plays only the specific aha moment segment
- **Time Parameters**: Uses the exact format requested for timestamp and stopAt values
- **Responsive Layout**: Works on desktop and mobile devices
- **Fast Loading**: Uses lazy loading for better performance

## Files

- `extract_aha_moments.js`: Main script that analyzes the transcript and identifies aha moments
- `quick_grain_player.js`: Creates an HTML player with embedded videos
- `aha_moments_report.html`: Detailed report with transcripts and analysis
- `aha_moments_player.html`: Interactive player with video clips
- `aha_moments.json`: JSON data with time parameters for each moment
- `run_aha_moments_player.sh`: Shell script to easily run the player

## How to Use

1. **Setup**:
   - Ensure you have Node.js installed
   - Create a `.env` file with your Grain API token: `GRAIN_API_TOKEN=your_token_here`

2. **Run the Extractor**:
   ```bash
   ./run_aha_moments_extractor.sh
   ```
   This will:
   - Install dependencies
   - Extract aha moments from the recording
   - Generate the HTML report and JSON data
   - Open the HTML report in your browser

3. **View Video Clips**:
   ```bash
   ./run_aha_moments_player.sh
   ```
   or
   ```bash
   node quick_grain_player.js
   ```
   This will:
   - Create an HTML player with embedded video segments
   - Open the player in your browser
   - Videos are ready to play directly from the page

## How It Works

The player uses direct embedding to show video segments:

1. Each aha moment is displayed as a card with the video embedded
2. Videos are configured to start and end at the specific timestamps
3. The iframe parameters control the exact segment to play
4. Lazy loading ensures fast page performance

## Time Parameter Format

Each aha moment includes time parameters in the following format:

```javascript
{
  id: "aha-moment-1",
  timestamp: "44:02", 
  stopAt: "46:30"
}
```

These parameters are used to control video playback and can be used in your own custom implementations.

## Customization

To use a different recording:

1. Open `extract_aha_moments.js`
2. Change the `RECORDING_ID` value to your desired recording ID
3. Run the script again

## Troubleshooting

- If you encounter API errors, check that your Grain API token is valid
- If videos don't load, ensure the recording ID is correct and publicly accessible
- For other issues, check the logs directory for detailed error messages
