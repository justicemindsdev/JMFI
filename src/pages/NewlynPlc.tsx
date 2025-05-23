import { useState, useEffect, useRef } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function NewlynPlc() {
  const [logoState, setLogoState] = useState<"full" | "dissolving" | "small">("full");
  const [text, setText] = useState("");
  const [showTypewriter, setShowTypewriter] = useState(false);
  const fullText = `DEAR NEWLYN PLC...

WE WANT YOU TO UNDERSTAND THE ORDERS BEING MADE AND THE REASONS WHY.

WE WISH TO CO-OPERATE SO YOU CAN CARRY OUT THE HIGH SUPPORTING SERVICES YOU PROMISE... AND WE ARE HERE TO HELP`;
  
  const typingSpeed = 50; // milliseconds per character
  let typingTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Logo animation effect
  useEffect(() => {
    // Wait 2 seconds then start dissolve
    const dissolveTimeout = setTimeout(() => {
      setLogoState("dissolving");
      
      // After 5 seconds of dissolving, switch to small
      const smallTimeout = setTimeout(() => {
        setLogoState("small");
        setShowTypewriter(true);
      }, 5000);
      
      return () => clearTimeout(smallTimeout);
    }, 2000);
    
    return () => clearTimeout(dissolveTimeout);
  }, []);
  
  // Typewriter effect
  useEffect(() => {
    if (showTypewriter) {
      let currentIndex = 0;
      
      const startTyping = () => {
        if (currentIndex <= fullText.length) {
          setText(fullText.slice(0, currentIndex));
          currentIndex++;
          typingTimeout.current = setTimeout(startTyping, typingSpeed);
        }
      };
      
      startTyping();
    }
    
    return () => {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
    };
  }, [showTypewriter, fullText]);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-200">
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center relative overflow-hidden py-16">
        {/* Logo with animation states */}
        <div className={`transition-all duration-5000 ease-in-out ${
          logoState === "full" 
            ? "w-[80%] max-w-2xl opacity-100" 
            : logoState === "dissolving" 
              ? "w-[60%] max-w-xl opacity-70 blur-sm"
              : "w-[30%] max-w-xs opacity-100 mb-12"
        }`}>
          <img 
            src="/attached_assets/LOGO TRANS_1744373361051.png" 
            alt="Justice Minds Logo" 
            className="w-full h-auto" 
          />
        </div>
        
        {/* Typewriter effect */}
        {showTypewriter && (
          <div className="text-center max-w-3xl px-6 space-y-6">
            <div className="font-mono text-xl md:text-2xl leading-relaxed text-blue-100 whitespace-pre-line">
              {text}
              <span className="inline-block w-3 h-6 bg-blue-400 animate-blink"></span>
            </div>
          </div>
        )}
        
        {/* Background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-blue-900/5 mix-blend-overlay"></div>
          <div className="absolute -inset-1/2 bg-gradient-to-r from-transparent via-blue-600/5 to-transparent opacity-30 blur-3xl transform rotate-12"></div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}