#!/bin/bash

# Script to extract inspirational segments from a Grain recording
# This script installs required dependencies and runs the Python script

# Text formatting
BOLD='\033[1m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BOLD}=== Inspirational Segments Extractor ===${NC}"
echo "This script will extract inspirational segments from the Grain recording."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}Error: Python 3 is not installed.${NC}"
    echo "Please install Python 3 and try again."
    exit 1
fi

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo -e "${RED}Error: pip3 is not installed.${NC}"
    echo "Please install pip3 and try again."
    exit 1
fi

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo -e "${YELLOW}ffmpeg is not installed. Attempting to install...${NC}"
    
    # Check the operating system
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if command -v brew &> /dev/null; then
            echo "Installing ffmpeg using Homebrew..."
            brew install ffmpeg
        else
            echo -e "${RED}Error: Homebrew is not installed.${NC}"
            echo "Please install Homebrew first: https://brew.sh/"
            echo "Then run: brew install ffmpeg"
            exit 1
        fi
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        if command -v apt-get &> /dev/null; then
            echo "Installing ffmpeg using apt..."
            sudo apt-get update
            sudo apt-get install -y ffmpeg
        elif command -v yum &> /dev/null; then
            echo "Installing ffmpeg using yum..."
            sudo yum install -y ffmpeg
        else
            echo -e "${RED}Error: Could not determine package manager.${NC}"
            echo "Please install ffmpeg manually and try again."
            exit 1
        fi
    else
        echo -e "${RED}Error: Unsupported operating system.${NC}"
        echo "Please install ffmpeg manually and try again."
        exit 1
    fi
fi

# Check if yt-dlp is installed
if ! command -v yt-dlp &> /dev/null; then
    echo -e "${YELLOW}yt-dlp is not installed. Installing...${NC}"
    pip3 install yt-dlp
fi

# Install required Python packages
echo -e "${YELLOW}Installing required Python packages...${NC}"
pip3 install requests python-dotenv

# Check if .env file exists and contains the Grain API token
if [ ! -f .env ] || ! grep -q "GRAIN_API_TOKEN" .env; then
    echo -e "${YELLOW}Grain API token not found in .env file.${NC}"
    echo "Please enter your Grain API token:"
    read -r token
    echo "GRAIN_API_TOKEN=$token" > .env
    echo -e "${GREEN}Token saved to .env file.${NC}"
fi

# Run the Python script
echo -e "${BOLD}Running the extraction script...${NC}"
python3 extract_inspirational_segments.py

# Check if the script ran successfully
if [ $? -eq 0 ]; then
    echo -e "${GREEN}${BOLD}Extraction completed successfully!${NC}"
    
    # Check if the compilation file exists
    if [ -f "inspirational_compilation.mp4" ]; then
        echo -e "${GREEN}Compilation file created: inspirational_compilation.mp4${NC}"
        
        # Offer to play the video
        echo "Would you like to play the compilation now? (y/n)"
        read -r play_video
        
        if [[ $play_video == "y" || $play_video == "Y" ]]; then
            # Determine the appropriate command to open the video
            if [[ "$OSTYPE" == "darwin"* ]]; then
                # macOS
                open "inspirational_compilation.mp4"
            elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
                # Linux
                if command -v xdg-open &> /dev/null; then
                    xdg-open "inspirational_compilation.mp4"
                else
                    echo -e "${YELLOW}Could not determine how to open the video.${NC}"
                    echo "Please open it manually: inspirational_compilation.mp4"
                fi
            else
                echo -e "${YELLOW}Could not determine how to open the video.${NC}"
                echo "Please open it manually: inspirational_compilation.mp4"
            fi
        fi
    else
        echo -e "${RED}Compilation file was not created.${NC}"
        echo "Check the script output for errors."
    fi
else
    echo -e "${RED}Extraction failed.${NC}"
    echo "Check the script output for errors."
fi

echo -e "${BOLD}=== Process completed ===${NC}"
