
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current || !contentRef.current) return;
      
      const scrollY = window.scrollY;
      // Parallax effect - background moves slower than foreground
      parallaxRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
      // Content moves up slightly for depth effect
      contentRef.current.style.transform = `translateY(${-scrollY * 0.1}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-[90vh] overflow-hidden parallax-container">
      <div 
        ref={parallaxRef}
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb')] bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-spiritual-brown/10 to-black/50"></div>
      </div>
      
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start">
        <div 
          ref={contentRef}
          className="glass-card p-8 md:p-12 max-w-xl animate-float card-3d transform-style-3d"
        >
          <h4 className="text-spiritual-gold mb-2 font-sanskrit text-lg">Welcome to Divine Guidance</h4>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-sanskrit leading-tight gradient-text">
            Find Spiritual Peace & Divine Connection
          </h1>
          <p className="text-white/90 mb-8 text-lg">
            Offering guidance on your spiritual journey through authentic teachings, sacred rituals, and compassionate community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/services" className="spiritual-button hover:shadow-spiritual-gold/20 hover:-translate-y-1 transition-all">
              Book a Service
            </Link>
            <Link to="/about" className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-6 py-2.5 rounded-md shadow-sm hover:shadow-md hover:bg-white/30 hover:-translate-y-1 transition-all duration-300 text-center">
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
