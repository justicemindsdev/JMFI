import os
import requests
import json
import subprocess
import re
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get Grain API token from environment variable
API_TOKEN = os.getenv('GRAIN_API_TOKEN')

# Recording ID and embed parameter from the iframe URL
RECORDING_ID = '026973da-9ff2-493a-ab85-44a54170f43a'
EMBED_PARAM = 'Z8SRIuntWUonOWywCn5d5rtHyVQ7nlCl0hnMzuSl'

# Base URL for Grain API
BASE_URL = 'https://api.grain.com/_/public-api'

# Inspirational segments to extract (timestamp ranges in format HH:MM:SS-HH:MM:SS)
INSPIRATIONAL_SEGMENTS = [
    {'start': '00:03:44', 'end': '00:04:20', 'title': 'On Manifesting Abundance'},
    {'start': '00:27:54', 'end': '00:29:07', 'title': 'On Taking Initiative'},
    {'start': '00:30:31', 'end': '00:32:41', 'title': 'On Breaking Free from Cultural Conditioning'},
    {'start': '00:36:16', 'end': '00:37:33', 'title': 'On Recognizing Your Value'},
    {'start': '01:14:08', 'end': '01:15:30', 'title': 'On Creative Potential'},
    {'start': '02:19:07', 'end': '02:19:57', 'title': 'On Authentic Self-Expression'}
]

# Function to make API requests
def make_request(endpoint):
    headers = {
        'Authorization': f'Bearer {API_TOKEN}',
        'Content-Type': 'application/json'
    }
    
    response = requests.get(f'{BASE_URL}{endpoint}', headers=headers)
    
    if response.status_code != 200:
        raise Exception(f'API request failed with status code {response.status_code}: {response.text}')
    
    if endpoint.endswith('transcript.vtt'):
        # Return raw VTT data
        return response.text
    else:
        # Parse JSON response
        return response.json()

# Function to parse VTT format
def parse_vtt(vtt_content):
    lines = vtt_content.split('\n')
    cues = []
    current_cue = None
    
    for line in lines:
        line = line.strip()
        
        # Skip empty lines and WEBVTT header
        if not line or line == 'WEBVTT':
            continue
        
        # Check if line contains timestamp
        if '-->' in line:
            time_parts = line.split(' --> ')
            current_cue = {
                'start_time': time_parts[0],
                'end_time': time_parts[1],
                'text': ''
            }
            continue
        
        # If we have a current cue, add text to it
        if current_cue and line:
            if current_cue['text']:
                current_cue['text'] += ' ' + line
            else:
                current_cue['text'] = line
            
            # Check if next line is empty or a new timestamp, which means end of current cue
            next_line_index = lines.index(line) + 1
            if next_line_index >= len(lines) or not lines[next_line_index].strip() or '-->' in lines[next_line_index]:
                cues.append(current_cue)
                current_cue = None
    
    return cues

# Function to convert timestamp to seconds for sorting and comparison
def timestamp_to_seconds(timestamp):
    parts = timestamp.split(':')
    hours = int(parts[0])
    minutes = int(parts[1])
    seconds = float(parts[2].replace(',', '.'))
    return hours * 3600 + minutes * 60 + seconds

# Function to format seconds to timestamp format (HH:MM:SS)
def seconds_to_timestamp(seconds):
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    
    return f'{hours:02d}:{minutes:02d}:{secs:02d}'

# Function to download video segment using yt-dlp
def download_segment(recording_id, embed_param, start_time, end_time, output_filename):
    url = f'https://grain.com/share/recording/{recording_id}/{embed_param}'
    
    # Convert timestamps to seconds for yt-dlp
    start_seconds = timestamp_to_seconds(start_time)
    end_seconds = timestamp_to_seconds(end_time)
    
    # Use yt-dlp to download the segment
    command = [
        'yt-dlp',
        '--no-check-certificate',
        '--downloader', 'ffmpeg',
        '--downloader-args', f'ffmpeg:-ss {start_time} -to {end_time}',
        '-o', output_filename,
        url
    ]
    
    try:
        subprocess.run(command, check=True)
        print(f'Successfully downloaded segment to {output_filename}')
        return True
    except subprocess.CalledProcessError as e:
        print(f'Error downloading segment: {e}')
        return False

# Function to create a compilation of segments
def create_compilation(segments, output_filename):
    # Create a file list for ffmpeg
    with open('segments.txt', 'w') as f:
        for i, segment in enumerate(segments):
            f.write(f"file '{segment['filename']}'\n")
    
    # Use ffmpeg to concatenate the segments
    command = [
        'ffmpeg',
        '-f', 'concat',
        '-safe', '0',
        '-i', 'segments.txt',
        '-c', 'copy',
        output_filename
    ]
    
    try:
        subprocess.run(command, check=True)
        print(f'Successfully created compilation: {output_filename}')
        return True
    except subprocess.CalledProcessError as e:
        print(f'Error creating compilation: {e}')
        return False

# Function to add title overlays to video segments
def add_title_overlay(input_file, output_file, title):
    command = [
        'ffmpeg',
        '-i', input_file,
        '-vf', f"drawtext=text='{title}':fontcolor=white:fontsize=24:box=1:boxcolor=black@0.5:boxborderw=5:x=(w-text_w)/2:y=h-th-10",
        '-codec:a', 'copy',
        output_file
    ]
    
    try:
        subprocess.run(command, check=True)
        print(f'Successfully added title overlay to {output_file}')
        return True
    except subprocess.CalledProcessError as e:
        print(f'Error adding title overlay: {e}')
        return False

# Main function to process recording and extract inspirational segments
def extract_inspirational_segments():
    try:
        print(f'Fetching data for recording {RECORDING_ID}...')
        
        # Get recording details
        recording_details = make_request(f'/recordings/{RECORDING_ID}')
        
        # Get transcript
        transcript = make_request(f'/recordings/{RECORDING_ID}/transcript.vtt')
        
        # Parse transcript
        cues = parse_vtt(transcript)
        
        # Create output directory if it doesn't exist
        os.makedirs('inspirational_segments', exist_ok=True)
        
        # Download each segment
        downloaded_segments = []
        for i, segment in enumerate(INSPIRATIONAL_SEGMENTS):
            segment_filename = f'inspirational_segments/segment_{i+1}.mp4'
            temp_filename = f'inspirational_segments/temp_segment_{i+1}.mp4'
            
            print(f'Downloading segment {i+1}: {segment["title"]} ({segment["start"]} to {segment["end"]})...')
            
            if download_segment(RECORDING_ID, EMBED_PARAM, segment['start'], segment['end'], temp_filename):
                # Add title overlay
                if add_title_overlay(temp_filename, segment_filename, segment['title']):
                    downloaded_segments.append({
                        'filename': segment_filename,
                        'title': segment['title']
                    })
                    # Remove temporary file
                    os.remove(temp_filename)
        
        # Create compilation of all segments
        if downloaded_segments:
            create_compilation(downloaded_segments, 'inspirational_compilation.mp4')
            print('Compilation created successfully!')
        else:
            print('No segments were downloaded successfully.')
        
    except Exception as e:
        print(f'Error processing recording: {e}')

# Run the main function
if __name__ == '__main__':
    extract_inspirational_segments()
