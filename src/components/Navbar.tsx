
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Calendar, Heart, Book, Home, User, Gift, MessageCircle } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'About', path: '/about', icon: <User className="w-5 h-5" /> },
    { name: 'Services', path: '/services', icon: <Heart className="w-5 h-5" /> },
    { name: 'Events', path: '/events', icon: <Calendar className="w-5 h-5" /> },
    { name: 'Teachings', path: '/teachings', icon: <Book className="w-5 h-5" /> },
    { name: 'Donate', path: '/donate', icon: <Gift className="w-5 h-5" /> },
    { name: 'Contact', path: '/contact', icon: <MessageCircle className="w-5 h-5" /> },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-spiritual-gold/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 bg-spiritual-gold rounded-full flex items-center justify-center">
                <span className="text-white font-sanskrit text-xl">ॐ</span>
              </div>
              <span className="ml-3 text-xl font-sanskrit text-spiritual-brown">Divine Guidance</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="flex items-center space-x-1 text-spiritual-brown hover:text-spiritual-gold transition-colors duration-300"
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
          
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="text-spiritual-brown hover:text-spiritual-gold"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 bg-white/90 backdrop-blur-sm border-b border-spiritual-gold/20">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="flex items-center space-x-3 px-3 py-3 rounded-md text-spiritual-brown hover:bg-spiritual-sand/30 hover:text-spiritual-gold"
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
