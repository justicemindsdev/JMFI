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
              <strong>Address:</strong>
              <p>123 Legal Lane, London, EC4A 1AB, United Kingdom</p>
            </div>

            <div>
              <strong>Email:</strong>
              <p>info@justice-minds.com</p>
            </div>
          </div>

          <div className="pt-4">
            <h2 className="text-xl font-semibold mb-2">Follow Us</h2>
            <div className="flex space-x-4 text-2xl">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
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
