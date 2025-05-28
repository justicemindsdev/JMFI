#!/bin/bash

# Script to clean up forensic_analysis.html by removing analysis buttons and forms
# This script installs required dependencies and runs the Python script

# Text formatting
BOLD='\033[1m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BOLD}=== Forensic Analysis HTML Cleaner ===${NC}"
echo "This script will clean up the forensic_analysis.html file by removing analysis buttons and forms."

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

# Install required Python packages
echo -e "${YELLOW}Installing required Python packages...${NC}"
pip3 install beautifulsoup4

# Check if the input file exists
INPUT_FILE="forensic_analysis.html"
if [ ! -f "$INPUT_FILE" ]; then
    echo -e "${RED}Error: Input file '$INPUT_FILE' not found.${NC}"
    echo "Please make sure the file exists in the current directory."
    exit 1
fi

# Create a backup of the original file
BACKUP_FILE="forensic_analysis_original.html"
echo -e "${YELLOW}Creating backup of original file as '$BACKUP_FILE'...${NC}"
cp "$INPUT_FILE" "$BACKUP_FILE"

# Set the output file
OUTPUT_FILE="forensic_analysis_clean.html"

# Run the Python script
echo -e "${BOLD}Running the cleaning script...${NC}"
python3 clean_html.py "$INPUT_FILE" "$OUTPUT_FILE"

# Check if the script ran successfully
if [ $? -eq 0 ]; then
    echo -e "${GREEN}${BOLD}Cleaning completed successfully!${NC}"
    echo -e "${GREEN}Cleaned file saved as: $OUTPUT_FILE${NC}"
    
    # Offer to open the cleaned file
    echo "Would you like to open the cleaned file now? (y/n)"
    read -r open_file
    
    if [[ $open_file == "y" || $open_file == "Y" ]]; then
        # Determine the appropriate command to open the file
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            open "$OUTPUT_FILE"
        elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
            # Linux
            if command -v xdg-open &> /dev/null; then
                xdg-open "$OUTPUT_FILE"
            else
                echo -e "${YELLOW}Could not determine how to open the file.${NC}"
                echo "Please open it manually: $OUTPUT_FILE"
            fi
        else
            echo -e "${YELLOW}Could not determine how to open the file.${NC}"
            echo "Please open it manually: $OUTPUT_FILE"
        fi
    fi
else
    echo -e "${RED}Cleaning failed.${NC}"
    echo "Check the script output for errors."
fi

echo -e "${BOLD}=== Process completed ===${NC}"
