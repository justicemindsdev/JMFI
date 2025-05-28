# Ben Mak Grain Claim Substantiation Tool

This tool combines the power of Grain API with OpenRouter AI to create a sophisticated claim substantiation system. It extracts key moments from Grain recordings, analyzes them using AI, and presents them with headers, subtitles, transcripts, and detailed analysis.

## Features

- **AI-Powered Claim Detection**: Automatically identifies claims made in Grain recordings based on user prompts
- **Substantiation Analysis**: Evaluates the strength of each claim with a detailed analysis
- **Substantiation Score**: Assigns a score from 1-10 to indicate how well each claim is substantiated
- **Categorization**: Classifies claims as factual, opinion, statistical, anecdotal, or mixed
- **Interactive Interface**: Presents claims in a modern, user-friendly dark mode interface
- **Video Integration**: Embeds relevant video segments directly in the interface
- **Tagging System**: Organizes claims with relevant tags for easy filtering

## Getting Started

### Prerequisites

- Node.js installed
- Grain API token (set in `.env` file)
- OpenRouter API key (set in `.env.openrouter` file)

### Installation

1. Ensure your API tokens are set in the environment files:
   - `.env` for Grain API token
   - `.env.openrouter` for OpenRouter API key

2. Install required dependencies:
   ```
   npm install axios dotenv
   ```

### Usage

Run the tool with the following command:

```
./run_ben_mak_grain_tool.sh [recording_id] [prompt] [model]
```

Parameters:
- `recording_id`: Grain recording ID (default: a8225a48-4840-4eec-bdf8-61b2acd52a2f)
- `prompt`: What types of claims to look for (default: "Find claims about performance, results, or outcomes")
- `model`: AI model to use (default: "claude-3.5")

Example:
```
./run_ben_mak_grain_tool.sh a8225a48-4840-4eec-bdf8-61b2acd52a2f "Find claims about product features" gpt-4o
```

## How It Works

1. **Fetch Recording**: The tool retrieves the specified Grain recording details and transcript
2. **AI Analysis**: The transcript is analyzed by the selected AI model to identify claims matching the prompt
3. **Claim Substantiation**: Each claim is evaluated for its substantiation level and assigned a score
4. **Thumbnail Generation**: The tool creates highlights and thumbnails for each claim
5. **Interface Generation**: An HTML interface is generated to display the claims with their analysis
6. **JSON Output**: All claims and their details are saved to a JSON file for further use

## Output Files

- `ben_mak_grain_tool.html`: Interactive interface for viewing substantiated claims
- `substantiated_claims.json`: JSON file containing all claim data
- `logs/ben_mak_tool_[timestamp].log`: Log file with details of the process

## Customization

You can customize the tool by:

1. Modifying the AI prompts in `ben_mak_grain_tool.js` to focus on different aspects of claims
2. Adjusting the HTML template in the `generateHtmlInterface` function to change the interface design
3. Adding additional analysis metrics by extending the `analyzeTranscriptForClaims` function

## Integration with Other Tools

This tool is designed to work alongside other Grain API tools in this project:

- **AI Moment Extractor**: For general moment extraction
- **Aha Moments Extractor**: For finding learning moments
- **Chat Interface**: For interactive exploration of recordings

## Troubleshooting

If you encounter issues:

1. Check the log files in the `logs` directory
2. Ensure your API tokens are correctly set in the environment files
3. Verify that the recording ID exists and is accessible with your Grain API token
4. Make sure you have an active internet connection for API calls

## License

This project is licensed under the MIT License - see the LICENSE file for details.
