// AI-powered Code Enhancer for Grain API Integration
require('dotenv').config();
require('dotenv').config({ path: '.env.openrouter' });
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// OpenRouter API configuration
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const DEFAULT_MODEL = process.env.OPENROUTER_DEFAULT_MODEL || 'anthropic/claude-3.5-sonnet';

// Available models
const MODELS = {
  'claude-instant': 'anthropic/claude-instant-1.1',
  'claude-3.5': 'anthropic/claude-3.5-sonnet',
  'gpt-4o': 'openai/chatgpt-4o-latest',
  'o1-preview': 'openai/o1-preview-2024-09-12',
  'o1-mini': 'openai/o1-mini',
  'grok': 'x-ai/grok-beta'
};

/**
 * Generate improved code for Grain API integration
 * @param {string} codeFile - Path to the code file to enhance
 * @param {string} enhancementPrompt - Specific enhancement request
 * @param {string} model - AI model to use
 * @returns {Promise<string>} - Enhanced code
 */
async function enhanceCode(codeFile, enhancementPrompt, model = DEFAULT_MODEL) {
  try {
    console.log(`Enhancing code in ${codeFile} with ${model}...`);
    
    // Read the code file
    const code = fs.readFileSync(codeFile, 'utf8');
    
    const systemPrompt = `You are an expert software engineer specializing in JavaScript, Node.js, and API integrations, particularly with the Grain API for video recording analysis.

Your task is to enhance the provided code based on the user's enhancement request. You should:

1. Analyze the existing code thoroughly
2. Implement the requested enhancements with clean, efficient, and well-documented code
3. Maintain the existing code structure and naming conventions
4. Add detailed comments explaining complex logic
5. Implement proper error handling and edge cases
6. Optimize for performance and readability
7. Return the complete enhanced code file

Focus on making the code more robust, maintainable, and effective at working with the Grain API.`;

    const userPrompt = `Enhancement Request: "${enhancementPrompt}"

Existing Code:
\`\`\`javascript
${code}
\`\`\`

Please enhance this code according to the request. Return the complete enhanced code file with all improvements implemented.`;

    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    // Extract the enhanced code from the response
    const content = response.data.choices[0].message.content;
    let enhancedCode = '';
    
    // Extract code from markdown code blocks if present
    if (content.includes('```javascript')) {
      const codeMatch = content.match(/```javascript\n([\s\S]*?)\n```/);
      if (codeMatch && codeMatch[1]) {
        enhancedCode = codeMatch[1];
      } else {
        // Try without language specifier
        const genericMatch = content.match(/```\n([\s\S]*?)\n```/);
        if (genericMatch && genericMatch[1]) {
          enhancedCode = genericMatch[1];
        } else {
          enhancedCode = content;
        }
      }
    } else {
      enhancedCode = content;
    }
    
    return enhancedCode;
  } catch (error) {
    console.error('Error enhancing code:', error.response?.data || error.message);
    return null;
  }
}

/**
 * Generate new code based on a feature description
 * @param {string} featureDescription - Description of the feature to implement
 * @param {string} model - AI model to use
 * @returns {Promise<string>} - Generated code
 */
async function generateCode(featureDescription, model = DEFAULT_MODEL) {
  try {
    console.log(`Generating code for "${featureDescription}" with ${model}...`);
    
    const systemPrompt = `You are an expert software engineer specializing in JavaScript, Node.js, and API integrations, particularly with the Grain API for video recording analysis.

Your task is to generate high-quality code based on the user's feature description. You should:

1. Create clean, efficient, and well-documented code that implements the requested feature
2. Follow best practices for JavaScript and Node.js development
3. Implement proper error handling and edge cases
4. Optimize for performance and readability
5. Add detailed comments explaining the implementation
6. Return only the complete code file without any additional explanation

The code should be ready to use with the Grain API for video recording analysis and moment extraction.`;

    const userPrompt = `Feature Description: "${featureDescription}"

Please generate complete, production-ready code for this feature. The code should work with the Grain API and follow all best practices.`;

    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    // Extract the generated code from the response
    const content = response.data.choices[0].message.content;
    let generatedCode = '';
    
    // Extract code from markdown code blocks if present
    if (content.includes('```javascript')) {
      const codeMatch = content.match(/```javascript\n([\s\S]*?)\n```/);
      if (codeMatch && codeMatch[1]) {
        generatedCode = codeMatch[1];
      } else {
        // Try without language specifier
        const genericMatch = content.match(/```\n([\s\S]*?)\n```/);
        if (genericMatch && genericMatch[1]) {
          generatedCode = genericMatch[1];
        } else {
          generatedCode = content;
        }
      }
    } else {
      generatedCode = content;
    }
    
    return generatedCode;
  } catch (error) {
    console.error('Error generating code:', error.response?.data || error.message);
    return null;
  }
}

/**
 * Analyze code for improvements
 * @param {string} codeFile - Path to the code file to analyze
 * @param {string} model - AI model to use
 * @returns {Promise<Object>} - Analysis results
 */
async function analyzeCode(codeFile, model = DEFAULT_MODEL) {
  try {
    console.log(`Analyzing code in ${codeFile} with ${model}...`);
    
    // Read the code file
    const code = fs.readFileSync(codeFile, 'utf8');
    
    const systemPrompt = `You are an expert software engineer specializing in JavaScript, Node.js, and API integrations, particularly with the Grain API for video recording analysis.

Your task is to analyze the provided code and identify potential improvements. You should:

1. Identify any bugs or issues in the code
2. Suggest performance optimizations
3. Recommend better error handling approaches
4. Point out any security concerns
5. Suggest code structure improvements
6. Identify any missing edge cases
7. Return your analysis in a structured JSON format

Focus on providing actionable, specific improvements that would make the code more robust, maintainable, and effective.`;

    const userPrompt = `Code to Analyze:
\`\`\`javascript
${code}
\`\`\`

Please analyze this code and provide a detailed assessment of potential improvements. Return your analysis in JSON format with these categories: bugs, performance, errorHandling, security, structure, edgeCases, and recommendations.`;

    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: 'json_object' }
    }, {
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    // Extract and parse the JSON response
    const content = response.data.choices[0].message.content;
    let analysis = {};
    
    try {
      if (content.includes('```json')) {
        // Extract JSON from markdown code block
        const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
        if (jsonMatch && jsonMatch[1]) {
          analysis = JSON.parse(jsonMatch[1]);
        }
      } else {
        // Try to parse the entire content as JSON
        analysis = JSON.parse(content);
      }
    } catch (error) {
      console.error('Error parsing analysis response:', error);
      console.log('Raw analysis response:', content);
      return { error: 'Failed to parse analysis' };
    }
    
    return analysis;
  } catch (error) {
    console.error('Error analyzing code:', error.response?.data || error.message);
    return { error: error.message };
  }
}

/**
 * Generate test cases for a code file
 * @param {string} codeFile - Path to the code file to test
 * @param {string} model - AI model to use
 * @returns {Promise<string>} - Generated test code
 */
async function generateTests(codeFile, model = DEFAULT_MODEL) {
  try {
    console.log(`Generating tests for ${codeFile} with ${model}...`);
    
    // Read the code file
    const code = fs.readFileSync(codeFile, 'utf8');
    
    const systemPrompt = `You are an expert software engineer specializing in JavaScript testing, particularly for Node.js applications that integrate with APIs like the Grain API.

Your task is to generate comprehensive test cases for the provided code. You should:

1. Create unit tests for all functions and methods
2. Include tests for edge cases and error handling
3. Mock external dependencies like API calls
4. Follow best practices for JavaScript testing
5. Use Jest as the testing framework
6. Return only the complete test file without any additional explanation

The tests should thoroughly verify the functionality of the code and ensure it works correctly with the Grain API.`;

    const userPrompt = `Code to Test:
\`\`\`javascript
${code}
\`\`\`

Please generate comprehensive test cases for this code using Jest. The tests should cover all functionality, edge cases, and error handling.`;

    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    // Extract the generated tests from the response
    const content = response.data.choices[0].message.content;
    let testCode = '';
    
    // Extract code from markdown code blocks if present
    if (content.includes('```javascript')) {
      const codeMatch = content.match(/```javascript\n([\s\S]*?)\n```/);
      if (codeMatch && codeMatch[1]) {
        testCode = codeMatch[1];
      } else {
        // Try without language specifier
        const genericMatch = content.match(/```\n([\s\S]*?)\n```/);
        if (genericMatch && genericMatch[1]) {
          testCode = genericMatch[1];
        } else {
          testCode = content;
        }
      }
    } else {
      testCode = content;
    }
    
    return testCode;
  } catch (error) {
    console.error('Error generating tests:', error.response?.data || error.message);
    return null;
  }
}

/**
 * Save generated or enhanced code to a file
 * @param {string} code - Code to save
 * @param {string} filePath - Path to save the code to
 * @param {boolean} backup - Whether to create a backup of the existing file
 * @returns {boolean} - Success status
 */
function saveCode(code, filePath, backup = true) {
  try {
    // Create a backup if requested and the file exists
    if (backup && fs.existsSync(filePath)) {
      const backupPath = `${filePath}.backup.${Date.now()}`;
      fs.copyFileSync(filePath, backupPath);
      console.log(`Created backup at ${backupPath}`);
    }
    
    // Save the new code
    fs.writeFileSync(filePath, code);
    console.log(`Saved code to ${filePath}`);
    
    return true;
  } catch (error) {
    console.error('Error saving code:', error);
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  try {
    // Get command line arguments
    const args = process.argv.slice(2);
    const command = args[0];
    
    if (!command) {
      console.error('Please specify a command: enhance, generate, analyze, or test');
      process.exit(1);
    }
    
    let result;
    
    switch (command) {
      case 'enhance':
        if (args.length < 3) {
          console.error('Usage: node ai_code_enhancer.js enhance <file_path> <enhancement_prompt> [model]');
          process.exit(1);
        }
        
        const fileToEnhance = args[1];
        const enhancementPrompt = args[2];
        const enhanceModel = MODELS[args[3]] || DEFAULT_MODEL;
        
        result = await enhanceCode(fileToEnhance, enhancementPrompt, enhanceModel);
        
        if (result) {
          const outputPath = `${fileToEnhance}.enhanced.js`;
          saveCode(result, outputPath, false);
          console.log(`Enhanced code saved to ${outputPath}`);
        }
        break;
        
      case 'generate':
        if (args.length < 3) {
          console.error('Usage: node ai_code_enhancer.js generate <output_file> <feature_description> [model]');
          process.exit(1);
        }
        
        const outputFile = args[1];
        const featureDescription = args[2];
        const generateModel = MODELS[args[3]] || DEFAULT_MODEL;
        
        result = await generateCode(featureDescription, generateModel);
        
        if (result) {
          saveCode(result, outputFile, false);
          console.log(`Generated code saved to ${outputFile}`);
        }
        break;
        
      case 'analyze':
        if (args.length < 2) {
          console.error('Usage: node ai_code_enhancer.js analyze <file_path> [model]');
          process.exit(1);
        }
        
        const fileToAnalyze = args[1];
        const analyzeModel = MODELS[args[2]] || DEFAULT_MODEL;
        
        result = await analyzeCode(fileToAnalyze, analyzeModel);
        
        if (result) {
          const analysisPath = `${fileToAnalyze}.analysis.json`;
          fs.writeFileSync(analysisPath, JSON.stringify(result, null, 2));
          console.log(`Analysis saved to ${analysisPath}`);
          
          // Print a summary of the analysis
          console.log('\nAnalysis Summary:');
          if (result.bugs && result.bugs.length) {
            console.log(`- Found ${result.bugs.length} potential bugs`);
          }
          if (result.performance && result.performance.length) {
            console.log(`- Found ${result.performance.length} performance improvements`);
          }
          if (result.recommendations && result.recommendations.length) {
            console.log(`- ${result.recommendations.length} recommendations for improvement`);
          }
        }
        break;
        
      case 'test':
        if (args.length < 2) {
          console.error('Usage: node ai_code_enhancer.js test <file_path> [model]');
          process.exit(1);
        }
        
        const fileToTest = args[1];
        const testModel = MODELS[args[2]] || DEFAULT_MODEL;
        
        result = await generateTests(fileToTest, testModel);
        
        if (result) {
          // Get the file name without extension
          const baseName = path.basename(fileToTest, path.extname(fileToTest));
          const testPath = path.join(path.dirname(fileToTest), `${baseName}.test.js`);
          
          saveCode(result, testPath, false);
          console.log(`Test code saved to ${testPath}`);
        }
        break;
        
      default:
        console.error(`Unknown command: ${command}`);
        console.error('Available commands: enhance, generate, analyze, test');
        process.exit(1);
    }
  } catch (error) {
    console.error('Error in main function:', error);
    process.exit(1);
  }
}

// If this file is run directly
if (require.main === module) {
  main();
}

// Export functions for use in other files
module.exports = {
  enhanceCode,
  generateCode,
  analyzeCode,
  generateTests,
  saveCode
};
