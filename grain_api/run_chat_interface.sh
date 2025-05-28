#!/bin/bash

# Run Grain Chat Interface with Supabase Connection
echo "Running Grain Chat Interface with Supabase Connection..."

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
    echo "Warning: .env.supabase file not found. The interface will use mock data."
fi

# Check if the grain_chat_interface.html file exists
if [ ! -f grain_chat_interface.html ]; then
    echo "Error: grain_chat_interface.html file not found."
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install @supabase/supabase-js dotenv path

# Run the connection script
echo "Connecting to Supabase and launching interface..."
node connect_chat_interface.js

echo "Done!"
