
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mandalaBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current || !contentRef.current || !mandalaBgRef.current) return;
      
      const scrollY = window.scrollY;
      // Parallax effect - background moves slower than foreground
      parallaxRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
      // Content moves up slightly for depth effect
      contentRef.current.style.transform = `translateY(${-scrollY * 0.1}px)`;
      // Rotate mandala background
      mandalaBgRef.current.style.transform = `rotate(${scrollY * 0.02}deg)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-[90vh] overflow-hidden parallax-container">
      {/* Mandala background element */}
      <div 
        ref={mandalaBgRef}
        className="absolute top-10 right-10 w-[600px] h-[600px] opacity-10 dark:opacity-5 pointer-events-none"
      >
        <img 
          src="https://cdn.pixabay.com/photo/2017/03/16/21/29/mandala-2150144_960_720.png" 
          alt="Mandala decoration" 
          className="w-full h-full"
        />
      </div>
      
      <div 
        ref={parallaxRef}
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618257121238-8fd16d802a99')] bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-spiritual-peacock/30 to-black/50"></div>
      </div>
      
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start">
        <div 
          ref={contentRef}
          className="indian-glass p-8 md:p-12 max-w-xl card-3d"
        >
          <h4 className="text-spiritual-saffron mb-2 font-sanskrit text-lg">आत्मिक मार्गदर्शन (Spiritual Guidance)</h4>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-sanskrit leading-tight indian-gradient-text">
            Find Inner Peace & Divine Connection
          </h1>
          <p className="text-white/90 mb-8 text-lg">
            Discover authentic spiritual teachings, sacred rituals, and compassionate guidance for your journey toward enlightenment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/services" className="indian-button hover:-translate-y-1 transition-all">
              Book a Consultation
            </Link>
            <div className="relative">
              <Link to="/about" className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-6 py-2.5 rounded-md shadow-sm hover:shadow-md hover:bg-white/30 hover:-translate-y-1 transition-all duration-300 text-center">
                Learn More
              </Link>
              <span className="absolute -top-1 -right-1 bg-spiritual-turmeric text-white text-[10px] px-2 py-0.5 rounded-full font-medium">Popular</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
};

export default Hero;
