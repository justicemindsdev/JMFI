import { Link } from "wouter";
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import justiceMindLogo from "../assets/justice_minds_logo.jpeg";

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Gradient top border */}
      <div className="h-1 bg-gradient-to-r from-primary via-secondary to-primary"></div>
      
      {/* Main footer content */}
      <div className="bg-gradient-to-b from-primary to-primary/95 text-white py-16 relative">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute w-96 h-96 rounded-full bg-white -top-20 -left-20 blur-3xl"></div>
          <div className="absolute w-96 h-96 rounded-full bg-white bottom-0 right-1/4 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <img 
                    src={justiceMindLogo} 
                    alt="Justice Minds Logo" 
                    className="h-10 w-auto rounded bg-white/10 p-1"
                  />
                  <h4 className="text-xl font-heading font-bold">Justice Minds</h4>
                </div>
                <p className="text-white/80 mb-6">
                  Illuminating the pathways of justice through data-driven analysis and informed reporting.
                </p>
                <div className="flex space-x-4">
                  <a 
                    href="https://twitter.com" 
                    className="bg-white/10 hover:bg-secondary transition-colors p-2 rounded-full" 
                    aria-label="Twitter"
                  >
                    <FaTwitter className="h-5 w-5" />
                  </a>
                  <a 
                    href="https://facebook.com" 
                    className="bg-white/10 hover:bg-secondary transition-colors p-2 rounded-full" 
                    aria-label="Facebook"
                  >
                    <FaFacebookF className="h-5 w-5" />
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    className="bg-white/10 hover:bg-secondary transition-colors p-2 rounded-full" 
                    aria-label="LinkedIn"
                  >
                    <FaLinkedinIn className="h-5 w-5" />
                  </a>
                  <a 
                    href="https://instagram.com" 
                    className="bg-white/10 hover:bg-secondary transition-colors p-2 rounded-full" 
                    aria-label="Instagram"
                  >
                    <FaInstagram className="h-5 w-5" />
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-heading font-bold mb-5 border-b border-white/20 pb-2">Quick Links</h4>
                <ul className="space-y-3">
                  <li>
                    <Link href="/about" className="text-white/80 hover:text-white transition-colors flex items-center">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full mr-2 inline-block"></span>
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/press" className="text-white/80 hover:text-white transition-colors flex items-center">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full mr-2 inline-block"></span>
                      Press Releases
                    </Link>
                  </li>
                  <li>
                    <Link href="/resources" className="text-white/80 hover:text-white transition-colors flex items-center">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full mr-2 inline-block"></span>
                      Resources
                    </Link>
                  </li>
                  <li>
                    <Link href="/methodology" className="text-white/80 hover:text-white transition-colors flex items-center">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full mr-2 inline-block"></span>
                      Methodology
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="text-white/80 hover:text-white transition-colors flex items-center">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full mr-2 inline-block"></span>
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div className="relative">
                <h4 className="text-lg font-heading font-bold mb-5 border-b border-white/20 pb-2">Contact</h4>
                <address className="not-italic text-white/80 space-y-2">
                  <p>Justice Minds Ltd.</p>
                  <p>123 Legal Lane</p>
                  <p>London, EC4A 1AB</p>
                  <p>United Kingdom</p>
                </address>
                <p className="text-white/80 mt-4">
                  <a href="mailto:info@justice-minds.com" className="hover:text-secondary transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-secondary rounded-full mr-2 inline-block"></span>
                    info@justice-minds.com
                  </a>
                </p>
              </div>
            </div>
            
            <div className="mt-16 pt-6 border-t border-white/20 text-center text-white/60 text-sm">
              <p>© {new Date().getFullYear()} Justice Minds Ltd. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
