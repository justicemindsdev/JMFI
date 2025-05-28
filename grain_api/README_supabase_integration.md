# Grain Aha Moments Supabase Integration

This integration allows you to store and retrieve "aha moments" from Grain recordings using Supabase as a database and storage solution.

## Features

- **Database Storage**: Store aha moments in a structured Supabase database
- **User Collections**: Create collections of aha moments for organization
- **Thumbnails**: Generate and store thumbnails for each aha moment
- **Dark Mode Player**: View aha moments with a clean, dark mode interface
- **Time-Specific Playback**: Play videos at specific timestamps
- **Sentiment Analysis**: Store and display sentiment for each moment
- **Tagging System**: Organize moments with customizable tags

## Setup

1. **Create a Supabase Project**:
   - Sign up at [supabase.com](https://supabase.com)
   - Create a new project
   - Get your project URL and API keys

2. **Configure Environment**:
   - Create a `.env.supabase` file with your Supabase credentials:
     ```
     SUPABASE_URL=your_project_url
     SUPABASE_KEY=your_api_key
     SUPABASE_TOKEN=your_service_role_key
     SUPABASE_STORAGE_URL=your_storage_url
     ```

3. **Initialize Database**:
   - Run the SQL schema in `supabase_schema.sql` in your Supabase SQL editor
   - This will create all necessary tables and security policies

4. **Install Dependencies**:
   ```bash
   npm install @supabase/supabase-js dotenv
   ```

## Files

- `supabase_schema.sql`: SQL schema for creating the database tables
- `save_to_supabase.js`: Script to save aha moments to Supabase
- `load_from_supabase.js`: Script to load aha moments from Supabase and display them
- `run_supabase_integration.sh`: Shell script to run the integration
- `.env.supabase`: Configuration file for Supabase credentials

## Database Schema

The database consists of the following tables:

1. **recordings**: Stores information about Grain recordings
2. **aha_moments**: Stores the aha moments with timestamps and metadata
3. **collections**: Allows users to create collections of aha moments
4. **collection_moments**: Junction table for collections and aha moments
5. **user_interactions**: Tracks user interactions with aha moments

## How to Use

1. **Extract Aha Moments**:
   ```bash
   ./run_aha_moments_extractor.sh
   ```
   This will extract aha moments from a Grain recording and save them to `aha_moments.json`.

2. **Save to Supabase**:
   ```bash
   ./run_supabase_integration.sh
   ```
   This will:
   - Install dependencies
   - Save the aha moments to Supabase
   - Create thumbnails for each moment
   - Load the aha moments from Supabase and display them in a browser

3. **View Aha Moments**:
   - Open `aha_moments_from_supabase.html` in your browser
   - Click on thumbnails to play the video segments

## API Functions

The integration provides the following API functions:

- `createOrGetRecording`: Create or get a recording
- `saveAhaMoments`: Save aha moments to Supabase
- `getAhaMoments`: Get all aha moments for a recording
- `createCollection`: Create a new collection
- `addMomentsToCollection`: Add moments to a collection
- `getUserCollections`: Get all collections for a user
- `getCollectionMoments`: Get all moments in a collection
- `recordInteraction`: Record a user interaction with an aha moment

## Security

The database uses Row Level Security (RLS) policies to ensure that:

- Public recordings and collections are viewable by everyone
- Users can only insert, update, and delete their own data
- User interactions are properly secured

## Customization

To use a different recording:

1. Open `save_to_supabase.js` and `load_from_supabase.js`
2. Change the `RECORDING_ID` value to your desired recording ID
3. Run the scripts again

## Troubleshooting

- If you encounter database errors, check that your Supabase credentials are correct
- If thumbnails don't appear, ensure your Supabase storage bucket is properly configured
- For other issues, check the console output for detailed error messages
