# AI-Powered Moment Extraction and Code Enhancement for Grain Recordings

This system uses advanced AI models through OpenRouter to extract, analyze, and present the most relevant moments from Grain recordings based on user prompts. It also includes AI-powered code enhancement capabilities to improve and extend your Grain API integration code.

## Features

### Moment Extraction
- **AI-Powered Analysis**: Uses state-of-the-art language models to identify the most relevant moments
- **Prompt-Based Extraction**: Find specific types of moments using natural language prompts
- **Detailed Analysis**: Each moment includes AI-generated analysis explaining its significance
- **Multiple AI Models**: Choose from various models including Claude, GPT-4o, and more
- **Thumbnail Generation**: Automatically creates thumbnails for each extracted moment
- **Categorization**: Automatically categorizes moments (work, personal, social, etc.)
- **Tagging**: Adds relevant tags to each moment for better organization
- **Seamless Integration**: Works with the Grain Chat Interface for a complete solution

### Code Enhancement
- **AI-Powered Code Generation**: Create new features with natural language descriptions
- **Code Enhancement**: Improve existing code with specific enhancement requests
- **Code Analysis**: Get detailed analysis of your code with improvement recommendations
- **Test Generation**: Automatically generate comprehensive test cases for your code
- **Multiple AI Models**: Choose the best AI model for your specific coding needs

## Files

### Moment Extraction
- `ai_moment_extractor.js`: Core AI extraction functionality
- `update_chat_interface.js`: Updates the chat interface with AI-extracted moments
- `run_ai_moment_extractor.sh`: Shell script to run the extraction process

### Code Enhancement
- `ai_code_enhancer.js`: Core AI code enhancement functionality
- `run_ai_code_enhancer.sh`: Shell script to run the code enhancement process

### Configuration
- `.env.openrouter`: Configuration for OpenRouter API
- `.env`: Configuration for Grain API

## Setup

1. **Configure API Keys**:
   - Ensure your Grain API token is in `.env`
   - Ensure your OpenRouter API key is in `.env.openrouter`

2. **Install Dependencies**:
   ```bash
   npm install axios dotenv
   ```

3. **Make the Scripts Executable**:
   ```bash
   chmod +x run_ai_moment_extractor.sh
   chmod +x run_ai_code_enhancer.sh
   ```

## Usage

### Moment Extraction

#### Basic Usage

```bash
./run_ai_moment_extractor.sh
```

This will:
1. Extract moments from the default recording using Claude 3.5 Sonnet
2. Generate thumbnails for each moment
3. Update the chat interface with the extracted moments
4. Open the updated interface in your browser

#### Advanced Usage

```bash
./run_ai_moment_extractor.sh [RECORDING_ID] [PROMPT] [MODEL]
```

- `RECORDING_ID`: Grain recording ID (defaults to the one in `.env`)
- `PROMPT`: Natural language prompt to find specific moments (defaults to "Find the most insightful and important moments")
- `MODEL`: AI model to use (defaults to "claude-3.5")

### Code Enhancement

#### Enhance Existing Code

```bash
./run_ai_code_enhancer.sh enhance <file_path> "<enhancement_prompt>" [model]
```

Example:
```bash
./run_ai_code_enhancer.sh enhance ai_moment_extractor.js "Add better error handling and retry logic"
```

#### Generate New Code

```bash
./run_ai_code_enhancer.sh generate <output_file> "<feature_description>" [model]
```

Example:
```bash
./run_ai_code_enhancer.sh generate grain_sentiment_analyzer.js "Create a module that analyzes sentiment in Grain recordings"
```

#### Analyze Code

```bash
./run_ai_code_enhancer.sh analyze <file_path> [model]
```

Example:
```bash
./run_ai_code_enhancer.sh analyze connect_chat_interface.js
```

#### Generate Tests

```bash
./run_ai_code_enhancer.sh test <file_path> [model]
```

Example:
```bash
./run_ai_code_enhancer.sh test ai_moment_extractor.js gpt-4o
```

### Available Models

- `claude-instant`: Anthropic Claude Instant 1.1
- `claude-3.5`: Anthropic Claude 3.5 Sonnet (default)
- `gpt-4o`: OpenAI GPT-4o
- `o1-preview`: OpenAI o1-preview
- `o1-mini`: OpenAI o1-mini
- `grok`: xAI Grok

## Example Prompts

### Moment Extraction Prompts
- "Find moments where the team discusses budget concerns"
- "Extract segments about product roadmap decisions"
- "Show me all moments with customer feedback discussion"
- "Find personal development conversations"
- "Extract moments with technical architecture discussions"
- "Show me the most emotionally impactful moments"

### Code Enhancement Prompts
- "Add better error handling and retry logic for API calls"
- "Optimize performance by implementing caching for transcript fetching"
- "Implement pagination for handling large collections of moments"
- "Add support for multiple recording IDs in a single request"
- "Implement a more robust thumbnail generation system"
- "Add detailed logging and telemetry for debugging"

## How It Works

### Moment Extraction
1. **Transcript Fetching**: Retrieves the full transcript from the Grain API
2. **AI Analysis**: Sends the transcript and user prompt to the selected AI model via OpenRouter
3. **Moment Extraction**: The AI identifies specific moments that match the prompt
4. **Metadata Generation**: For each moment, the AI generates:
   - A descriptive title
   - Precise start and stop timestamps
   - Analysis of why the moment is significant
   - Relevant tags
   - Appropriate category
5. **Thumbnail Generation**: Creates visual thumbnails for each moment
6. **Interface Update**: Updates the chat interface to display the extracted moments with all metadata

### Code Enhancement
1. **Code Analysis**: The AI analyzes the existing code or feature description
2. **Enhancement Generation**: Based on the prompt, the AI generates improvements or new code
3. **Code Quality Checks**: The AI ensures the code follows best practices and includes proper error handling
4. **Documentation**: The AI adds detailed comments explaining the implementation
5. **Test Generation**: For test requests, the AI creates comprehensive test cases using Jest

## Integration with Supabase

The extracted moments can be saved to Supabase for persistent storage:

```bash
node save_to_supabase.js extracted_moments.json
```

This will:
1. Connect to your Supabase instance
2. Save each moment to the `moments` table
3. Create appropriate relationships in the database

You can also enhance the Supabase integration code using the AI code enhancer:

```bash
./run_ai_code_enhancer.sh enhance save_to_supabase.js "Add batch processing for better performance"
```

## Troubleshooting

### Moment Extraction
- If extraction fails, check your API keys in `.env` and `.env.openrouter`
- If the AI returns unexpected results, try refining your prompt to be more specific
- If you need more detailed analysis, try using a more powerful model like `o1-preview`

### Code Enhancement
- If code generation fails, check your OpenRouter API key in `.env.openrouter`
- If the enhanced code has errors, try using a more powerful model like `gpt-4o` or `o1-preview`
- For complex code enhancements, break down your request into smaller, more specific prompts
- If test generation fails, ensure your code is well-structured and follows standard patterns
