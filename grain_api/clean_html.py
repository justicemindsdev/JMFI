#!/usr/bin/env python3
"""
Script to clean up the forensic_analysis.html file by removing analysis buttons and forms.
"""

import re
import os
import sys
from bs4 import BeautifulSoup

def clean_html_file(input_file, output_file=None):
    """
    Clean the HTML file by removing analysis buttons and forms.
    
    Args:
        input_file (str): Path to the input HTML file
        output_file (str, optional): Path to the output HTML file. If None, will overwrite the input file.
    
    Returns:
        bool: True if successful, False otherwise
    """
    try:
        # Read the input file
        with open(input_file, 'r', encoding='utf-8') as f:
            html_content = f.read()
        
        # Parse HTML with BeautifulSoup
        soup = BeautifulSoup(html_content, 'html.parser')
        
        # Remove all analysis buttons
        for button in soup.select('button.analysis-btn'):
            button.decompose()
        
        # Remove all analysis forms
        for form in soup.select('div.analysis-form'):
            form.decompose()
        
        # Get the cleaned HTML
        cleaned_html = str(soup)
        
        # If no output file is specified, use the input file
        if output_file is None:
            output_file = input_file
        
        # Write the cleaned HTML to the output file
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(cleaned_html)
        
        print(f"Successfully cleaned {input_file} and saved to {output_file}")
        return True
    
    except Exception as e:
        print(f"Error cleaning HTML file: {e}")
        return False

def main():
    """Main function to handle command line arguments."""
    if len(sys.argv) < 2:
        print("Usage: python clean_html.py <input_file> [output_file]")
        return False
    
    input_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else None
    
    return clean_html_file(input_file, output_file)

if __name__ == "__main__":
    main()
