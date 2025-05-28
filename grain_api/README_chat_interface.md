# Grain Chat Interface

A sleek, modern chat interface for interacting with Grain recordings and extracting any type of moment via prompts, with Supabase integration for data storage.

## Features

- **Dark Mode Design**: Clean, modern interface with dark mode for comfortable viewing
- **Contact Sidebar**: Shows all people you've chatted with, with toggle functionality
- **Prompt Chat Bar**: Type prompts to search for any type of moment (work-related, personal, etc.)
- **Video Grid**: Displays videos for each moment with timestamps and transcripts
- **Category System**: Organize moments by categories (work, personal, social, etc.)
- **Tagging System**: Organize moments with customizable tags
- **Supabase Integration**: Connect to Supabase for data storage and retrieval

## Files

- `grain_chat_interface.html`: The main HTML interface with all UI components
- `connect_chat_interface.js`: Script to connect the interface with Supabase
- `run_chat_interface.sh`: Shell script to run the interface with Supabase connection
- `grain_chat_interface_connected.html`: Generated HTML file with data from Supabase

## Setup

1. **Configure Supabase**:
   - Ensure you have a `.env.supabase` file with your Supabase credentials
   - Make sure the Supabase database is set up with the schema from `supabase_schema.sql`

2. **Install Dependencies**:
   ```bash
   npm install @supabase/supabase-js dotenv path
   ```

3. **Run the Interface**:
   ```bash
   ./run_chat_interface.sh
   ```
   This will:
   - Install dependencies
   - Connect to Supabase
   - Generate the connected HTML file
   - Open the interface in your browser

## How It Works

### Contact Sidebar

The sidebar shows all people you've chatted with. Each contact has:
- Name and role
- Last chat date
- Toggle switch to enable/disable

Clicking on a contact loads their moments in the main area.

### Video Grid

The main area displays a grid of videos for the selected contact. Each video card includes:
- Title and timestamp
- Embedded Grain video player
- Transcript of the moment
- Tags for categorization
- Category indicator (work, personal, social, etc.)

### Prompt Chat Bar

The chat bar at the bottom allows you to:
- Type prompts to search for any type of moment
- Request specific types of content (e.g., "show me work discussions" or "find personal development moments")
- Filter results based on content, category, or sentiment
- Find relevant moments across all contacts

## Customization

To use different recordings or contacts:

1. **Edit the Mock Data**:
   - Open `connect_chat_interface.js`
   - Modify the `contacts` array or `getMockMoments()` function

2. **Connect to Different Supabase Tables**:
   - Modify the Supabase queries in `connect_chat_interface.js`

3. **Customize the UI**:
   - Edit the CSS in `grain_chat_interface.html`
   - Modify the HTML structure for different layouts

## Supabase Integration

The interface connects to Supabase to:
- Retrieve contacts and their information
- Load moments for each contact based on prompts
- Store user preferences (like toggle states)
- Save and retrieve video metadata
- Track prompt history and relevance scores

If Supabase is not available, the interface falls back to mock data.

## Troubleshooting

- If videos don't load, check that your Grain API token is valid
- If Supabase connection fails, verify your credentials in `.env.supabase`
- If the interface doesn't open automatically, open `grain_chat_interface_connected.html` in your browser
