#!/bin/bash

# Run AI Moment Extractor for Grain Recordings
# This script extracts moments from a Grain recording using AI analysis

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== AI Moment Extractor for Grain Recordings ===${NC}"

# Check if required packages are installed
if ! npm list axios > /dev/null 2>&1; then
  echo -e "${YELLOW}Installing required packages...${NC}"
  npm install axios dotenv
fi

# Get arguments
RECORDING_ID=${1:-$(grep RECORDING_ID .env | cut -d '=' -f2)}
PROMPT=${2:-"Find the most insightful and important moments"}
MODEL=${3:-"claude-3.5"}

echo -e "${GREEN}Recording ID:${NC} $RECORDING_ID"
echo -e "${GREEN}Prompt:${NC} $PROMPT"
echo -e "${GREEN}AI Model:${NC} $MODEL"

# Run the extractor
echo -e "${BLUE}Extracting moments...${NC}"
node ai_moment_extractor.js "$RECORDING_ID" "$PROMPT" "$MODEL"

# Check if extraction was successful
if [ -f "extracted_moments.json" ]; then
  MOMENT_COUNT=$(grep -o "id" extracted_moments.json | wc -l)
  echo -e "${GREEN}Successfully extracted $MOMENT_COUNT moments!${NC}"
  
  # Update the chat interface with the extracted moments
  echo -e "${BLUE}Updating chat interface...${NC}"
  node update_chat_interface.js
  
  # Open the chat interface
  echo -e "${BLUE}Opening chat interface...${NC}"
  if [[ "$OSTYPE" == "darwin"* ]]; then
    open grain_chat_interface_connected.html
  elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open grain_chat_interface_connected.html
  elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    start grain_chat_interface_connected.html
  else
    echo -e "${YELLOW}Please open grain_chat_interface_connected.html in your browser${NC}"
  fi
else
  echo -e "${RED}Failed to extract moments. Check the logs for errors.${NC}"
  exit 1
fi
