// Type declarations to fix TS errors
declare global {
  interface Window {
    createTskTab?: (code: string) => boolean;
    processTskCode?: (code: string) => void;
  }
}

/**
 * Process code that contains the special //tskddd marker
 * This will create a new tab with the code contents
 */
export function processTskCode(code: string): void {
  console.log('Processing TSK code:', code.substring(0, 50) + '...');
  if (typeof window !== 'undefined') {
    if (window.processTskCode) {
      console.log('Using window.processTskCode');
      window.processTskCode(code);
    } else if (window.createTskTab) {
      console.log('Using window.createTskTab directly');
      window.createTskTab(code);
    } else {
      console.error('Neither processTskCode nor createTskTab functions are available on window');
    }
  }
}

/**
 * Helper function to parse text as TSK directly from any component
 */
export function parseTsk(code: string): void {
  // Check if the code has the special prefix
  if (!code.startsWith('//tskddd')) {
    // Add the prefix if it's missing
    code = `//tskddd\n${code}`;
  }
  
  processTskCode(code);
}