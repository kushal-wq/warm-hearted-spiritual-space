
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone } from 'lucide-react';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-white/80 backdrop-blur-sm border-t border-spiritual-gold/20 pt-12 pb-6 ${className || ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-spiritual-gold rounded-full flex items-center justify-center">
                <span className="text-white font-sanskrit text-xl">ॐ</span>
              </div>
              <span className="ml-3 text-xl font-sanskrit text-spiritual-brown">Divine Guidance</span>
            </div>
            <p className="text-spiritual-brown/80 max-w-xs">
              Offering spiritual guidance, religious services, and community support to seekers on their spiritual journey.
            </p>
            <div className="flex space-x-4 items-center text-spiritual-brown">
              <Mail className="h-5 w-5" />
              <span>contact@divineguidance.com</span>
            </div>
            <div className="flex space-x-4 items-center text-spiritual-brown">
              <Phone className="h-5 w-5" />
              <span>+1 (555) 123-4567</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-sanskrit text-lg mb-4 text-spiritual-brown">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="spiritual-link">About the Priest</Link>
              </li>
              <li>
                <Link to="/services" className="spiritual-link">Religious Services</Link>
              </li>
              <li>
                <Link to="/events" className="spiritual-link">Upcoming Events</Link>
              </li>
              <li>
                <Link to="/teachings" className="spiritual-link">Sermons & Teachings</Link>
              </li>
              <li>
                <Link to="/donate" className="spiritual-link">Support Our Mission</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-sanskrit text-lg mb-4 text-spiritual-brown">Newsletter</h3>
            <p className="text-spiritual-brown/80 mb-4">
              Subscribe to receive daily spiritual quotes and updates about upcoming events.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="spiritual-input flex-grow"
              />
              <button className="bg-spiritual-gold text-white px-4 py-2 rounded-r-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-spiritual-gold/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-spiritual-brown/70 text-sm">
            © {currentYear} Divine Guidance. All rights reserved.
          </p>
          <p className="flex items-center text-spiritual-brown/70 text-sm mt-4 md:mt-0">
            Made with <Heart className="h-4 w-4 text-spiritual-gold mx-1" /> for our spiritual community
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
