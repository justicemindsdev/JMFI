import React from 'react';
import {
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaFacebook
} from 'react-icons/fa';

import { Header } from '../components/Header';
import Logo from '../assets/image.svg'; // Adjust the path as per your file structure

const Contact: React.FC = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background:
          'linear-gradient(to bottom, black 0%, #0A112A 20%, #1A3499 50%, #0A112A 80%, black 100%)',
      }}
    >
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center md:items-start justify-between rounded-2xl shadow-lg p-8 space-y-6 md:space-y-0 md:space-x-8"
        style={{
          background: 'linear-gradient(135deg, #0F1C4D 0%, #1657E7 100%)'
        }}
      >
        {/* Left Column: Logo */}
        <div className="w-full md:w-1/2 flex items-center justify-center md:justify-center">
  <img
    src={Logo}
    alt="Justice Minds Logo"
    className="w-60 md:w-80 lg:w-96"
  />
</div>

        {/* Right Column: Contact Info */}
        <div className="w-full md:w-1/2 space-y-6 text-white">
          <h1 className="text-3xl font-bold">Contact Us</h1>

          <div className="space-y-3 text-lg">
            <div>
              <strong>Company:</strong>
              <p>JUSTICE MINDS FORENSIC INTELLIGENCE Ltd</p>
              <p className="text-sm">ICO DATA HANDLER OFFICER CERTIFICATE HOLDER</p>
            </div>

            <div>
              <strong>Address:</strong>
              <p>161-165 Borough High Street, London, England, SE1 1HR</p>
            </div>

            <div>
              <strong>Email:</strong>
              <p>authority@legaldueprocess.com</p>
            </div>

            <div>
              <strong>ICO Registration:</strong>
              <p>
                <a 
                  href="https://ico.org.uk/ESDWebPages/Entry/ZB896365" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:text-blue-100 underline"
                >
                  ZB896365 - View ICO Registration
                </a>
              </p>
            </div>

            <div>
              <strong>Company House:</strong>
              <p>
                <a 
                  href="https://find-and-update.company-information.service.gov.uk/company/16331423/filing-history" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:text-blue-100 underline"
                >
                  Company No. 16331423 - View Filing History
                </a>
              </p>
            </div>
          </div>

          <div className="pt-4">
            <h2 className="text-xl font-semibold mb-2">Follow Us</h2>
            <div className="flex space-x-4 text-2xl">
              <a href="https://www.instagram.com/benmaklondon/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white hover:text-pink-400 transition-colors">
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com/in/itsbenmak/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white hover:text-blue-400 transition-colors">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ContactPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow">
        <Contact />
      </div>
    </div>
  );
}
