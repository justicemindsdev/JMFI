#!/bin/bash

# Run the Aha Moments Player
echo "Running Aha Moments Player..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js to run this script."
    exit 1
fi

# Check if the .env file exists
if [ ! -f .env ]; then
    echo "Warning: .env file not found. Creating a template .env file..."
    echo "GRAIN_API_TOKEN=your_token_here" > .env
    echo "Please edit the .env file and add your Grain API token."
fi

# Check if the aha_moments.json file exists
if [ ! -f aha_moments.json ]; then
    echo "Error: aha_moments.json file not found. Please run the extract_aha_moments.js script first."
    exit 1
fi

# Run the player
node quick_grain_player.js

echo "Done!"
