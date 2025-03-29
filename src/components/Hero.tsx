
import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative h-[80vh] overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-spiritual-brown/20 to-black/60"></div>
      </div>
      
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start">
        <div className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg p-8 md:p-12 max-w-xl animate-float">
          <h4 className="text-spiritual-gold mb-2 font-sanskrit text-lg">Welcome to Divine Guidance</h4>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-sanskrit leading-tight">
            Find Spiritual Peace & Divine Connection
          </h1>
          <p className="text-white/90 mb-8 text-lg">
            Offering guidance on your spiritual journey through authentic teachings, sacred rituals, and compassionate community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/services" className="spiritual-button">
              Book a Service
            </Link>
            <Link to="/about" className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-6 py-3 rounded-md shadow-md hover:bg-white/30 transition-colors duration-300 text-center">
              Learn More
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-spiritual-cream to-transparent"></div>
    </div>
  );
};

export default Hero;
