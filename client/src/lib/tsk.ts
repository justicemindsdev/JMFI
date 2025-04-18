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
  if (typeof window !== 'undefined' && window.processTskCode) {
    window.processTskCode(code);
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