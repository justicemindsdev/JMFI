#!/bin/bash

# Run Ben Mak Grain Claim Substantiation Tool
# This script extracts and substantiates claims from a Grain recording using AI analysis

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Ben Mak Grain Claim Substantiation Tool ===${NC}"

# Check if required packages are installed
if ! npm list axios > /dev/null 2>&1; then
  echo -e "${YELLOW}Installing required packages...${NC}"
  npm install axios dotenv
fi

# Get recording ID from URL parameter or environment variable
if [[ "$1" == *"a8225a48-4840-4eec-bdf8-61b2acd52a2f"* ]]; then
  # Extract recording ID from URL
  RECORDING_ID="a8225a48-4840-4eec-bdf8-61b2acd52a2f"
else
  # Always use the Ben Mak recording ID as the default
  RECORDING_ID="a8225a48-4840-4eec-bdf8-61b2acd52a2f"
fi

# Get prompt from URL parameter or use default
if [[ "$QUERY_STRING" == *"prompt="* ]]; then
  # Extract prompt from query string
  PROMPT=$(echo "$QUERY_STRING" | sed -n 's/.*prompt=\([^&]*\).*/\1/p' | sed 's/+/ /g' | sed 's/%20/ /g')
else
  # Use provided prompt or default
  PROMPT=${2:-"Find claims about performance, results, or outcomes"}
fi

# Get AI model to use
MODEL=${3:-"claude-3.7"}

echo -e "${GREEN}Recording ID:${NC} $RECORDING_ID"
echo -e "${GREEN}Prompt:${NC} $PROMPT"
echo -e "${GREEN}AI Model:${NC} $MODEL"

# Run the tool
echo -e "${BLUE}Substantiating claims...${NC}"
node ben_mak_grain_tool.js "$RECORDING_ID" "$PROMPT" "$MODEL"

# Check if substantiation was successful
if [ -f "substantiated_claims.json" ]; then
  CLAIM_COUNT=$(grep -o "id" substantiated_claims.json | wc -l)
  echo -e "${GREEN}Successfully substantiated $CLAIM_COUNT claims!${NC}"
  
  # Open the HTML interface
  echo -e "${BLUE}Opening claim substantiation interface...${NC}"
  if [[ "$OSTYPE" == "darwin"* ]]; then
    open ben_mak_grain_tool.html
  elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open ben_mak_grain_tool.html
  elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    start ben_mak_grain_tool.html
  else
    echo -e "${YELLOW}Please open ben_mak_grain_tool.html in your browser${NC}"
  fi
else
  echo -e "${RED}Failed to substantiate claims. Check the logs for errors.${NC}"
  exit 1
fi
