#!/bin/bash

# Grain Aha Moments Extractor Runner
# This script installs dependencies and runs the Grain Aha Moments Extractor

# Set colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Grain Aha Moments Extractor ===${NC}"
echo "This script will extract aha moments from a Grain recording."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed.${NC}"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm is not installed.${NC}"
    echo "Please install npm (it usually comes with Node.js)"
    exit 1
fi

# Check for .env file and create if it doesn't exist
if [ ! -f .env ]; then
    echo -e "${YELLOW}No .env file found. Creating one...${NC}"
    
    # Check if GRAIN_API_TOKEN is provided as an argument
    if [ -n "$1" ]; then
        echo "GRAIN_API_TOKEN=$1" > .env
        echo -e "${GREEN}Created .env file with provided API token.${NC}"
    else
        # Prompt for Grain API token
        echo -n "Enter your Grain API token: "
        read -r API_TOKEN
        
        if [ -z "$API_TOKEN" ]; then
            echo -e "${RED}Error: No API token provided.${NC}"
            echo "You can run this script again with your token as an argument:"
            echo "./run_aha_moments_extractor.sh YOUR_API_TOKEN"
            exit 1
        fi
        
        echo "GRAIN_API_TOKEN=$API_TOKEN" > .env
        echo -e "${GREEN}Created .env file with your API token.${NC}"
    fi
else
    echo -e "${GREEN}.env file found.${NC}"
fi

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
npm install

# Check if installation was successful
if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Failed to install dependencies.${NC}"
    exit 1
fi

echo -e "${GREEN}Dependencies installed successfully.${NC}"

# Run the extractor
echo -e "${YELLOW}Running Aha Moments Extractor...${NC}"
node extract_aha_moments.js

# Check if extraction was successful
if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Extraction failed.${NC}"
    echo "Check the logs directory for more information."
    exit 1
fi

echo -e "${GREEN}Extraction completed successfully!${NC}"

# Check if the HTML report was generated
if [ -f aha_moments_report.html ]; then
    echo -e "${YELLOW}Opening HTML report...${NC}"
    
    # Try to open the HTML report with the appropriate command based on OS
    case "$(uname -s)" in
        Darwin*)    open aha_moments_report.html ;;
        Linux*)     xdg-open aha_moments_report.html ;;
        CYGWIN*|MINGW*|MSYS*)    start aha_moments_report.html ;;
        *)          echo -e "${YELLOW}Please open aha_moments_report.html in your browser.${NC}" ;;
    esac
else
    echo -e "${RED}Warning: HTML report was not generated.${NC}"
    echo "Check the logs directory for more information."
fi

echo -e "${GREEN}Done!${NC}"
