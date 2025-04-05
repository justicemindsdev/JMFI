import { Link } from "wouter";
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-heading font-bold mb-4">Justice Minds</h4>
              <p className="text-accent mb-6">
                Illuminating the pathways of justice through data-driven analysis and informed reporting.
              </p>
              <div className="flex space-x-4">
                <a href="https://twitter.com" className="text-accent hover:text-white transition-colors" aria-label="Twitter">
                  <FaTwitter className="h-5 w-5" />
                </a>
                <a href="https://facebook.com" className="text-accent hover:text-white transition-colors" aria-label="Facebook">
                  <FaFacebookF className="h-5 w-5" />
                </a>
                <a href="https://linkedin.com" className="text-accent hover:text-white transition-colors" aria-label="LinkedIn">
                  <FaLinkedinIn className="h-5 w-5" />
                </a>
                <a href="https://instagram.com" className="text-accent hover:text-white transition-colors" aria-label="Instagram">
                  <FaInstagram className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-heading font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-accent hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/press" className="text-accent hover:text-white transition-colors">
                    Press Releases
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="text-accent hover:text-white transition-colors">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="/methodology" className="text-accent hover:text-white transition-colors">
                    Methodology
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-accent hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-heading font-bold mb-4">Contact</h4>
              <address className="not-italic text-accent">
                <p className="mb-2">Justice Minds Ltd.</p>
                <p className="mb-2">123 Legal Lane</p>
                <p className="mb-2">London, EC4A 1AB</p>
                <p className="mb-2">United Kingdom</p>
              </address>
              <p className="text-accent mt-4">
                <a href="mailto:info@justice-minds.com" className="hover:text-white transition-colors">
                  info@justice-minds.com
                </a>
              </p>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-700 text-center text-accent text-sm">
            <p>© {new Date().getFullYear()} Justice Minds Ltd. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
