import { Link } from "wouter";
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export function Footer() {

  return (
    <footer  className="bg-gray-950 text-white py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-heading font-bold mb-4">
                <span className="text-primary">Justice </span>Minds Forensic Intelligence
              </h4>
              <p className="text-gray-400 mb-6">
                Illuminating the pathways of justice through data-driven analysis and informed reporting.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/in/itsbenmak/" className="text-gray-400 hover:text-primary transition-colors" aria-label="LinkedIn">
                  <FaLinkedinIn className="h-5 w-5" />
                </a>
                <a href="https://www.instagram.com/benmaklondon/?hl=en" className="text-gray-400 hover:text-primary transition-colors" aria-label="Instagram">
                  <FaInstagram className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-heading font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/press" className="text-gray-400 hover:text-primary transition-colors">
                    Press Releases
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="text-gray-400 hover:text-primary transition-colors">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="/methodology" className="text-gray-400 hover:text-primary transition-colors">
                    Methodology
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-heading font-bold mb-4">Contact</h4>
              <address className="not-italic text-gray-400">
                <p className="mb-2">JUSTICE MINDS FORENSIC INTELLIGENCE Ltd</p>
                <p className="mb-1 text-sm">ICO DATA HANDLER OFFICER CERTIFICATE HOLDER</p>
                <p className="mb-2">161-165 Borough High Street</p>
                <p className="mb-2">London, England, SE1 1HR</p>
                <p className="mb-2">United Kingdom</p>
              </address>
              <p className="text-gray-400 mt-4">
                <a href="mailto:authority@legaldueprocess.com" className="hover:text-primary transition-colors">
                  authority@legaldueprocess.com
                </a>
              </p>
              <div className="mt-4 space-y-2 text-sm">
                <p className="text-gray-400">
                  <a href="https://ico.org.uk/ESDWebPages/Entry/ZB896365" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    ICO Registration: ZB896365
                  </a>
                </p>
                <p className="text-gray-400">
                  <a href="https://find-and-update.company-information.service.gov.uk/company/16331423/filing-history" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    Company No: 16331423
                  </a>
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Justice Minds Forensic Intelligence Ltd. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
