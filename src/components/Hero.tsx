import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const backgroundImages = [
  'https://images.unsplash.com/photo-1528181304800-259b08848526', // Indian temple
  'https://images.unsplash.com/photo-1504198322253-cfa87a0ff25f', // Indian meditation
  'https://images.unsplash.com/photo-1511379938547-c1f69419868d', // Yoga
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773'  // Indian spirituality
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[90vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${backgroundImages[currentImage]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-spiritual-brown/20 to-black/60"></div>
        </motion.div>
      </AnimatePresence>
      
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg p-8 md:p-12 max-w-xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.h4
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-spiritual-gold mb-2 font-sanskrit text-lg"
          >
            नमस्ते - Welcome to Divine Guidance
          </motion.h4>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4 font-sanskrit leading-tight"
          >
            Discover Inner Peace Through Ancient Indian Wisdom
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-white/90 mb-8 text-lg"
          >
            Experience authentic Vedic teachings, traditional yoga, meditation, and spiritual guidance in the heart of Mumbai.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/services"
              className="spiritual-button transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Book a Service
            </Link>
            <Link
              to="/about"
              className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-6 py-3 rounded-md shadow-md hover:bg-white/30 transition-all duration-300 text-center transform hover:scale-105 hover:shadow-lg"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-spiritual-cream to-transparent"></div>
      
      {/* Background Image Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentImage === index ? 'bg-spiritual-gold scale-125' : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
