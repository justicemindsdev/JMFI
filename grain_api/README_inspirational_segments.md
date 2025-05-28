# Grain Inspirational Segments Extractor

This tool extracts inspirational segments from a Grain recording and compiles them into a single video. It was created to extract the best inspirational moments from the conversation between Ben Mak and Kajha Nainamohamed.

## Features

- Extracts specific time segments from a Grain recording
- Adds title overlays to each segment
- Compiles all segments into a single inspirational video
- Uses the Grain API to access recording data

## Prerequisites

The script will attempt to install these automatically, but you may need to install them manually:

- Python 3
- pip3
- ffmpeg
- yt-dlp
- Python packages: requests, python-dotenv

## Inspirational Segments

The following inspirational segments will be extracted:

1. **On Manifesting Abundance** (00:03:44 - 00:04:20)
   - Ben challenges Kajha's mindset about wealth and abundance
   - Key quote: "That's your problem. As soon as you start wearing gold, you're gonna change."

2. **On Taking Initiative** (00:27:54 - 00:29:07)
   - Ben explains why Kajha isn't taking initiative and how it relates to his perception of value
   - Key quote: "If you thought it made you money, you'd do it. But because you don't think it makes you money, you're not doing it."

3. **On Breaking Free from Cultural Conditioning** (00:30:31 - 00:32:41)
   - Ben discusses how young people, especially from Asian families, often lose their autonomy and decision-making abilities due to cultural conditioning
   - Key quote: "You've been lying to yourself... You are so prone to punishment. You're happy when you get shouted at because it's what you're used to."

4. **On Recognizing Your Value** (00:36:16 - 00:37:33)
   - Ben emphasizes that Kajha has unique value that he doesn't recognize
   - Key quote: "You are valuable. I can't tell you enough. You are sitting on a credential that can change policy. You are the person you are looking for."

5. **On Creative Potential** (01:14:08 - 01:15:30)
   - Discussion about Kajha's hidden creative talents and how they've been suppressed
   - Key quote: "Why would you want to fill your time with your nearest and dearest by reciting a to do list?"

6. **On Authentic Self-Expression** (02:19:07 - 02:19:57)
   - Ben encourages Kajha to use his MBA and skills to make a real impact
   - Key quote: "We're packaging up what's in the room not being used and presenting it to where you can get a return for you being you."

## Usage

1. Make sure you have your Grain API token ready (it should be in the `.env` file)
2. Run the extraction script:

```bash
./run_extract_segments.sh
```

3. The script will:
   - Install any missing dependencies
   - Check for your Grain API token (and prompt you to enter it if not found)
   - Download each inspirational segment
   - Add title overlays
   - Compile all segments into a single video file: `inspirational_compilation.mp4`
   - Offer to play the compilation when finished

## Files

- `extract_inspirational_segments.py`: The main Python script that extracts segments from the Grain recording
- `run_extract_segments.sh`: Shell script to install dependencies and run the Python script
- `.env`: Contains your Grain API token

## Customization

If you want to extract different segments, you can modify the `INSPIRATIONAL_SEGMENTS` list in the `extract_inspirational_segments.py` file:

```python
INSPIRATIONAL_SEGMENTS = [
    {'start': '00:03:44', 'end': '00:04:20', 'title': 'On Manifesting Abundance'},
    # Add or modify segments here
]
```

## Troubleshooting

- If you encounter permission issues, make sure the shell script is executable:
  ```bash
  chmod +x run_extract_segments.sh
  ```

- If the script fails to download segments, check your internet connection and verify your Grain API token is correct

- If ffmpeg installation fails, you may need to install it manually following the instructions for your operating system
