#!/bin/bash

# Run AI Code Enhancer for Grain API Integration
# This script uses AI to enhance, generate, analyze, or test code

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== AI Code Enhancer for Grain API Integration ===${NC}"

# Check if required packages are installed
if ! npm list axios > /dev/null 2>&1; then
  echo -e "${YELLOW}Installing required packages...${NC}"
  npm install axios dotenv
fi

# Get command
COMMAND=${1:-"help"}

case $COMMAND in
  enhance)
    if [ -z "$2" ] || [ -z "$3" ]; then
      echo -e "${RED}Usage: $0 enhance <file_path> <enhancement_prompt> [model]${NC}"
      exit 1
    fi
    
    FILE_PATH=$2
    PROMPT=$3
    MODEL=${4:-"claude-3.5"}
    
    echo -e "${GREEN}Enhancing code in:${NC} $FILE_PATH"
    echo -e "${GREEN}Enhancement:${NC} $PROMPT"
    echo -e "${GREEN}AI Model:${NC} $MODEL"
    
    node ai_code_enhancer.js enhance "$FILE_PATH" "$PROMPT" "$MODEL"
    
    # Check if enhancement was successful
    ENHANCED_FILE="${FILE_PATH}.enhanced.js"
    if [ -f "$ENHANCED_FILE" ]; then
      echo -e "${GREEN}Successfully enhanced code!${NC}"
      echo -e "${YELLOW}Review the enhanced code at:${NC} $ENHANCED_FILE"
      
      # Ask if user wants to replace the original file
      read -p "Do you want to replace the original file with the enhanced version? (y/n) " -n 1 -r
      echo
      if [[ $REPLY =~ ^[Yy]$ ]]; then
        cp "$ENHANCED_FILE" "$FILE_PATH"
        echo -e "${GREEN}Original file replaced with enhanced version.${NC}"
      fi
    else
      echo -e "${RED}Failed to enhance code. Check the logs for errors.${NC}"
      exit 1
    fi
    ;;
    
  generate)
    if [ -z "$2" ] || [ -z "$3" ]; then
      echo -e "${RED}Usage: $0 generate <output_file> <feature_description> [model]${NC}"
      exit 1
    fi
    
    OUTPUT_FILE=$2
    FEATURE=$3
    MODEL=${4:-"claude-3.5"}
    
    echo -e "${GREEN}Generating code to:${NC} $OUTPUT_FILE"
    echo -e "${GREEN}Feature:${NC} $FEATURE"
    echo -e "${GREEN}AI Model:${NC} $MODEL"
    
    node ai_code_enhancer.js generate "$OUTPUT_FILE" "$FEATURE" "$MODEL"
    
    # Check if generation was successful
    if [ -f "$OUTPUT_FILE" ]; then
      echo -e "${GREEN}Successfully generated code!${NC}"
      echo -e "${YELLOW}Review the generated code at:${NC} $OUTPUT_FILE"
    else
      echo -e "${RED}Failed to generate code. Check the logs for errors.${NC}"
      exit 1
    fi
    ;;
    
  analyze)
    if [ -z "$2" ]; then
      echo -e "${RED}Usage: $0 analyze <file_path> [model]${NC}"
      exit 1
    fi
    
    FILE_PATH=$2
    MODEL=${3:-"claude-3.5"}
    
    echo -e "${GREEN}Analyzing code in:${NC} $FILE_PATH"
    echo -e "${GREEN}AI Model:${NC} $MODEL"
    
    node ai_code_enhancer.js analyze "$FILE_PATH" "$MODEL"
    
    # Check if analysis was successful
    ANALYSIS_FILE="${FILE_PATH}.analysis.json"
    if [ -f "$ANALYSIS_FILE" ]; then
      echo -e "${GREEN}Successfully analyzed code!${NC}"
      echo -e "${YELLOW}Review the analysis at:${NC} $ANALYSIS_FILE"
    else
      echo -e "${RED}Failed to analyze code. Check the logs for errors.${NC}"
      exit 1
    fi
    ;;
    
  test)
    if [ -z "$2" ]; then
      echo -e "${RED}Usage: $0 test <file_path> [model]${NC}"
      exit 1
    fi
    
    FILE_PATH=$2
    MODEL=${3:-"claude-3.5"}
    
    echo -e "${GREEN}Generating tests for:${NC} $FILE_PATH"
    echo -e "${GREEN}AI Model:${NC} $MODEL"
    
    node ai_code_enhancer.js test "$FILE_PATH" "$MODEL"
    
    # Get the file name without extension
    FILENAME=$(basename -- "$FILE_PATH")
    BASE_NAME="${FILENAME%.*}"
    DIR_NAME=$(dirname "$FILE_PATH")
    TEST_FILE="${DIR_NAME}/${BASE_NAME}.test.js"
    
    # Check if test generation was successful
    if [ -f "$TEST_FILE" ]; then
      echo -e "${GREEN}Successfully generated tests!${NC}"
      echo -e "${YELLOW}Review the tests at:${NC} $TEST_FILE"
      
      # Ask if user wants to run the tests
      read -p "Do you want to run the tests now? (y/n) " -n 1 -r
      echo
      if [[ $REPLY =~ ^[Yy]$ ]]; then
        # Check if Jest is installed
        if ! npm list jest > /dev/null 2>&1; then
          echo -e "${YELLOW}Installing Jest...${NC}"
          npm install --save-dev jest
        fi
        
        echo -e "${BLUE}Running tests...${NC}"
        npx jest "$TEST_FILE"
      fi
    else
      echo -e "${RED}Failed to generate tests. Check the logs for errors.${NC}"
      exit 1
    fi
    ;;
    
  help|*)
    echo -e "${BLUE}AI Code Enhancer for Grain API Integration${NC}"
    echo -e "${YELLOW}Usage:${NC}"
    echo -e "  $0 ${GREEN}enhance${NC} <file_path> <enhancement_prompt> [model]"
    echo -e "  $0 ${GREEN}generate${NC} <output_file> <feature_description> [model]"
    echo -e "  $0 ${GREEN}analyze${NC} <file_path> [model]"
    echo -e "  $0 ${GREEN}test${NC} <file_path> [model]"
    echo -e "  $0 ${GREEN}help${NC}"
    echo
    echo -e "${YELLOW}Available Models:${NC}"
    echo -e "  claude-instant  : Anthropic Claude Instant 1.1"
    echo -e "  claude-3.5      : Anthropic Claude 3.5 Sonnet (default)"
    echo -e "  gpt-4o          : OpenAI GPT-4o"
    echo -e "  o1-preview      : OpenAI o1-preview"
    echo -e "  o1-mini         : OpenAI o1-mini"
    echo -e "  grok            : xAI Grok"
    echo
    echo -e "${YELLOW}Examples:${NC}"
    echo -e "  $0 enhance ai_moment_extractor.js \"Add better error handling and retry logic\""
    echo -e "  $0 generate grain_sentiment_analyzer.js \"Create a module that analyzes sentiment in Grain recordings\""
    echo -e "  $0 analyze connect_chat_interface.js"
    echo -e "  $0 test ai_moment_extractor.js gpt-4o"
    ;;
esac
