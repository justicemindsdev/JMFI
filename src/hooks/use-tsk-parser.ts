import { useEffect } from 'react';
import '../lib/tsk'; // Import for TS declarations

export function useTskParser() {
  useEffect(() => {
    // Set up event listener for keydown events
    const handleKeydown = (event: KeyboardEvent) => {
      // Check if we're in a text input or textarea
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'TEXTAREA' || 
        target.tagName === 'INPUT' || 
        target.getAttribute('contenteditable') === 'true'
      ) {
        // Get the current text
        let text: string;
        
        if (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT') {
          text = (target as HTMLInputElement | HTMLTextAreaElement).value;
        } else {
          text = target.innerText;
        }
        
        // Check if the text contains //tskddd
        if (text.includes('//tskddd')) {
          // Extract the code block with //tskddd
          const lines = text.split('\n');
          let startIndex = -1;
          
          for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes('//tskddd')) {
              startIndex = i;
              break;
            }
          }
          
          if (startIndex >= 0) {
            // Extract the entire block of code starting with //tskddd
            const codeBlock = lines.slice(startIndex).join('\n');
            
            // Create a new tab with this code
            // @ts-ignore - This function is defined in TskParser and exposed globally
            if (window.createTskTab && typeof window.createTskTab === 'function') {
              window.createTskTab(codeBlock);
              
              // Remove the //tskddd code from the input
              const newLines = [...lines];
              newLines.splice(startIndex, 1); // Remove just the //tskddd line
              
              // Update the input
              if (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT') {
                (target as HTMLInputElement | HTMLTextAreaElement).value = newLines.join('\n');
              } else {
                target.innerText = newLines.join('\n');
              }
              
              // Prevent default to handle manually
              event.preventDefault();
            }
          }
        }
      }
    };
    
    // Listen for paste events to detect //tskddd in pasted content
    const handlePaste = (event: ClipboardEvent) => {
      const pastedText = event.clipboardData?.getData('text');
      
      if (pastedText && pastedText.includes('//tskddd')) {
        // Extract code blocks with //tskddd
        const lines = pastedText.split('\n');
        let startIndex = -1;
        
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes('//tskddd')) {
            startIndex = i;
            break;
          }
        }
        
        if (startIndex >= 0) {
          // Extract the entire block of code starting with //tskddd
          const codeBlock = lines.slice(startIndex).join('\n');
          
          // Create a new tab with this code
          // @ts-ignore - This function is defined in TskParser and exposed globally
          if (window.createTskTab && typeof window.createTskTab === 'function') {
            window.createTskTab(codeBlock);
            
            // Let the paste happen normally, but without the //tskddd code
            // This is handled by the application that receives the paste
          }
        }
      }
    };
    
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('paste', handlePaste);
    
    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('paste', handlePaste);
    };
  }, []);
}

export default useTskParser;