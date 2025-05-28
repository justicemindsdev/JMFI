#!/bin/bash

# Run Supabase Integration for Grain Aha Moments
echo "Running Supabase Integration for Grain Aha Moments..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js to run this script."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed. Please install npm to run this script."
    exit 1
fi

# Check if the .env.supabase file exists
if [ ! -f .env.supabase ]; then
    echo "Error: .env.supabase file not found. Please create this file with your Supabase credentials."
    exit 1
fi

# Check if the aha_moments.json file exists
if [ ! -f aha_moments.json ]; then
    echo "Error: aha_moments.json file not found. Please run the extract_aha_moments.js script first."
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install @supabase/supabase-js dotenv

# Run the save script
echo "Saving aha moments to Supabase..."
node save_to_supabase.js

# Run the load script
echo "Loading aha moments from Supabase..."
node load_from_supabase.js

echo "Done!"
