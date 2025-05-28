#!/bin/bash

# Run Create Grain Highlights Script
# This script runs the create_grain_highlights.js Node.js script
# and saves the output to a log file

echo "Running Grain Highlight Creator..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js to run this script."
    exit 1
fi

# Check if the required packages are installed
if [ ! -d "node_modules/axios" ] || [ ! -d "node_modules/dotenv" ]; then
    echo "Installing required packages..."
    npm install axios dotenv
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "Warning: .env file not found. Creating a template .env file..."
    echo "GRAIN_API_TOKEN=your_api_token_here" > .env
    echo "Please edit the .env file and add your Grain API token."
fi

# Create logs directory if it doesn't exist
mkdir -p logs

# Run the script and save output to log file
LOG_FILE="logs/highlight_creation_$(date +%Y%m%d_%H%M%S).log"
echo "Starting highlight creation at $(date)" > "$LOG_FILE"
node create_grain_highlights.js | tee -a "$LOG_FILE"
echo "Finished at $(date)" >> "$LOG_FILE"

echo ""
echo "Process complete! Log saved to $LOG_FILE"
echo ""
echo "If highlights were created successfully, you can now update your HTML files"
echo "with the embed URLs provided above."
