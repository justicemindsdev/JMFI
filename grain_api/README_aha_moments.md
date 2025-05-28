# Grain Aha Moments Extractor

This tool extracts "aha moments" from a Grain recording using the Grain API. It analyzes the transcript to find learning moments, creates highlights, and generates a report with dark mode thumbnails, catchy titles, small bios, transcriptions, and analyses.

## Features

- Automatically identifies "aha moments" in Grain recordings
- Creates permanent highlights for each moment
- Generates a dark mode HTML report with:
  - Catchy titles for each moment
  - Small bio/description
  - Full transcript
  - Analysis of the content
  - Embedded video highlights
- Outputs JSON data for further processing
- Detailed logging for troubleshooting

## Prerequisites

- Node.js (v14 or higher)
- npm
- Grain API token

## Installation

1. Clone or download this repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with your Grain API token:

```
GRAIN_API_TOKEN=your_grain_api_token_here
```

## Usage

1. Update the `RECORDING_ID` and `EMBED_PARAM` in the `extract_aha_moments.js` file with your Grain recording details.

2. Run the script:

```bash
npm start
```

Or directly:

```bash
node extract_aha_moments.js
```

3. The script will:
   - Fetch the recording details and transcript
   - Analyze the transcript to find "aha moments"
   - Create highlights for each moment
   - Generate an HTML report (`aha_moments_report.html`)
   - Output JSON data (`aha_moments.json`)
   - Create detailed logs in the `logs` directory

4. Open the HTML report in a browser to view the results:

```bash
open aha_moments_report.html
```

## How It Works

### Aha Moment Detection

The script uses a combination of techniques to identify potential "aha moments":

1. **Keyword Analysis**: Searches for words and phrases that often indicate insights or learning moments
2. **Explanation Detection**: Identifies segments where explanations or clarifications are provided
3. **Segment Scoring**: Assigns scores based on multiple factors:
   - Presence of insight-related keywords
   - Presence of explanation markers
   - Segment length and complexity
   - Question-answer patterns
   - Presence of facts and figures

### Highlight Creation

For each identified "aha moment", the script:

1. Calculates the precise start time and duration
2. Generates a catchy title based on the content
3. Creates a permanent highlight using the Grain API
4. Stores the highlight ID and embed URL for the report

### Report Generation

The HTML report features:

- Dark mode design for better readability
- Responsive layout that works on all devices
- Recording information at the top
- Cards for each "aha moment" with:
  - Title and timestamp
  - Description
  - Transcript
  - Analysis
  - Embedded video highlight

## Customization

You can customize the script by modifying:

- The number of "aha moments" to extract (change the `slice` parameter in `findAhaMoments`)
- The keywords and phrases used for detection (modify the `ahaKeywords` and `explanationStarters` arrays)
- The scoring algorithm (adjust the weights in the scoring function)
- The HTML report styling (modify the CSS in the `generateHtmlReport` function)

## Time Parameter Format

The script outputs timestamps in the format requested:

```json
{
  "id": "aha-moment-1",
  "timestamp": "25:00",
  "stopAt": "25:30",
  ...
}
```

## Troubleshooting

If you encounter issues:

1. Check the log files in the `logs` directory for detailed error messages
2. Verify your Grain API token is correct
3. Ensure the recording ID and embed parameter are valid
4. Make sure the recording has a transcript available

## License

MIT
