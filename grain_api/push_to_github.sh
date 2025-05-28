#!/bin/bash

# Script to initialize Git repository and push to GitHub
# This script initializes a Git repository and pushes the code to GitHub

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo "Git is not installed. Please install Git to run this script."
    exit 1
fi

# Initialize Git repository if not already initialized
if [ ! -d ".git" ]; then
    echo "Initializing Git repository..."
    git init
else
    echo "Git repository already initialized."
fi

# Add all files to Git
echo "Adding files to Git..."
git add .

# Commit changes
echo "Committing changes..."
git commit -m "Initial commit: Grain inspirational segments with time frame parameter fixes"

# Add remote origin
echo "Adding remote origin..."
git remote add origin https://github.com/justicemindsdev/grain-inspirational-segments.git

# Set main branch
echo "Setting main branch..."
git branch -M main

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin main

# Check if push was successful
if [ $? -eq 0 ]; then
    echo "Successfully pushed to GitHub!"
    echo "Repository URL: https://github.com/justicemindsdev/grain-inspirational-segments"
else
    echo "Error pushing to GitHub. Please check the error messages above."
    echo "You may need to authenticate with GitHub or check your repository permissions."
fi
