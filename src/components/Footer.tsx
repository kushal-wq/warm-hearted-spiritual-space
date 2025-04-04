
import React from 'react';
import { Github, Mail, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FooterProps {
  className?: string;
}

const Footer = ({ className = "" }: FooterProps) => {
  return (
    <footer className={`bg-spiritual-cream dark:bg-gray-900 py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-spiritual-brown dark:text-gray-200">About Us</h3>
            <p className="text-spiritual-brown/70 dark:text-gray-400">
              We are dedicated to providing enriching spiritual guidance and fostering a community of seekers on their path to inner peace and spiritual growth.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-spiritual-brown hover:text-spiritual-gold dark:text-gray-400 dark:hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-spiritual-brown hover:text-spiritual-gold dark:text-gray-400 dark:hover:text-white transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-spiritual-brown hover:text-spiritual-gold dark:text-gray-400 dark:hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-spiritual-brown dark:text-gray-200 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-spiritual-brown/70 hover:text-spiritual-gold dark:text-gray-400 dark:hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-spiritual-brown/70 hover:text-spiritual-gold dark:text-gray-400 dark:hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-spiritual-brown/70 hover:text-spiritual-gold dark:text-gray-400 dark:hover:text-white transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/teachings" className="text-spiritual-brown/70 hover:text-spiritual-gold dark:text-gray-400 dark:hover:text-white transition-colors">
                  Teachings
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-spiritual-brown/70 hover:text-spiritual-gold dark:text-gray-400 dark:hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-spiritual-brown dark:text-gray-200 mb-4">Contact Us</h3>
            <address className="not-italic space-y-2 text-spiritual-brown/70 dark:text-gray-400">
              <p>1234 Spiritual Lane</p>
              <p>Serenity, CA 90210</p>
              <p>Email: info@spiritualcenter.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-spiritual-gold/10 dark:border-gray-800">
          <p className="text-center text-spiritual-brown/60 dark:text-gray-500">
            &copy; {new Date().getFullYear()} Spiritual Center. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
