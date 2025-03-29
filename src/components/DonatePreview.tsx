
import React from 'react';
import { Link } from 'react-router-dom';

const DonatePreview = () => {
  return (
    <div className="relative py-16">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')] bg-cover bg-center">
        <div className="absolute inset-0 bg-spiritual-gold/40 backdrop-blur-sm"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white font-sanskrit mb-4">Support Our Mission</h2>
          <p className="text-white/90 max-w-2xl mx-auto text-lg">
            Your generous contribution helps us continue providing spiritual guidance, community support, 
            and maintain our sacred spaces for all seekers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg text-center">
            <div className="text-spiritual-gold text-4xl mb-4">🕯️</div>
            <h3 className="font-sanskrit text-xl text-spiritual-brown mb-2">Light a Candle</h3>
            <p className="text-spiritual-brown/70 mb-4">
              Offer a virtual candle as a symbol of your prayer or intention.
            </p>
            <p className="font-medium text-spiritual-brown mb-6">$9</p>
            <Link to="/donate" className="spiritual-button text-sm inline-block">
              Light Now
            </Link>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg text-center transform scale-105 border-2 border-spiritual-gold">
            <div className="text-spiritual-gold text-4xl mb-4">🌟</div>
            <h3 className="font-sanskrit text-xl text-spiritual-brown mb-2">Monthly Blessing</h3>
            <p className="text-spiritual-brown/70 mb-4">
              Become a monthly supporter and receive special prayers in your name.
            </p>
            <p className="font-medium text-spiritual-brown mb-6">$21/month</p>
            <Link to="/donate" className="spiritual-button text-sm inline-block">
              Subscribe
            </Link>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg text-center">
            <div className="text-spiritual-gold text-4xl mb-4">🙏</div>
            <h3 className="font-sanskrit text-xl text-spiritual-brown mb-2">Temple Offering</h3>
            <p className="text-spiritual-brown/70 mb-4">
              Contribute to the maintenance and beautification of our sacred space.
            </p>
            <p className="font-medium text-spiritual-brown mb-6">$51</p>
            <Link to="/donate" className="spiritual-button text-sm inline-block">
              Donate
            </Link>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Link to="/donate" className="bg-white text-spiritual-brown px-8 py-3 rounded-md shadow-md hover:bg-white/90 transition-colors duration-300 inline-block font-sanskrit">
            Custom Donation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonatePreview;
