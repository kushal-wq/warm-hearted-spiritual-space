import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Candle, Star, Prayer, Heart, ArrowRight, Gift } from 'lucide-react';

const DonatePreview = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [donationProgress, setDonationProgress] = useState({
    goal: 50000,
    current: 32750,
    donors: 156
  });

  const donationOptions = [
    {
      id: 1,
      title: "Light a Candle",
      description: "Offer a virtual candle as a symbol of your prayer or intention.",
      price: 9,
      icon: "🕯️",
      color: "from-amber-100 to-amber-50",
      benefits: ["Virtual candle lighting", "Personal prayer intention", "Digital certificate"],
      progress: 75
    },
    {
      id: 2,
      title: "Monthly Blessing",
      description: "Become a monthly supporter and receive special prayers in your name.",
      price: 21,
      icon: "🌟",
      color: "from-blue-100 to-blue-50",
      benefits: ["Monthly prayers", "Special blessings", "Community updates"],
      progress: 85
    },
    {
      id: 3,
      title: "Temple Offering",
      description: "Contribute to the maintenance and beautification of our sacred space.",
      price: 51,
      icon: "🙏",
      color: "from-purple-100 to-purple-50",
      benefits: ["Temple maintenance", "Sacred space upkeep", "Recognition plaque"],
      progress: 65
    }
  ];

  return (
    <div className="relative py-16">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')] bg-cover bg-center">
        <div className="absolute inset-0 bg-spiritual-gold/40 backdrop-blur-sm"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-white font-sanskrit mb-4">Support Our Mission</h2>
          <p className="text-white/90 max-w-2xl mx-auto text-lg">
            Your generous contribution helps us continue providing spiritual guidance, community support, 
            and maintain our sacred spaces for all seekers.
          </p>
        </motion.div>

        {/* Donation Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg mb-12 max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-spiritual-gold" />
              <h3 className="font-sanskrit text-xl text-spiritual-brown">Monthly Temple Fund</h3>
            </div>
            <div className="text-spiritual-brown/70">
              {donationProgress.donors} donors
            </div>
          </div>
          
          <div className="relative h-4 bg-spiritual-gold/20 rounded-full overflow-hidden mb-2">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(donationProgress.current / donationProgress.goal) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute inset-y-0 left-0 bg-spiritual-gold"
            />
            <div className="absolute inset-0 flex items-center justify-center text-spiritual-brown/70 text-sm">
              ${donationProgress.current.toLocaleString()} / ${donationProgress.goal.toLocaleString()}
            </div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {donationOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              onHoverStart={() => setHoveredCard(option.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className={`bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg text-center relative overflow-hidden group ${
                option.id === 2 ? 'transform scale-105 border-2 border-spiritual-gold' : ''
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className="text-spiritual-gold text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {option.icon}
                </div>
                <h3 className="font-sanskrit text-xl text-spiritual-brown mb-2">{option.title}</h3>
                <p className="text-spiritual-brown/70 mb-4">{option.description}</p>
                <p className="font-medium text-spiritual-brown mb-6">${option.price}</p>
                
                <div className="space-y-2 mb-6">
                  {option.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center justify-center text-sm text-spiritual-brown/70">
                      <Heart className="w-4 h-4 mr-2 text-spiritual-gold" />
                      {benefit}
                    </div>
                  ))}
                </div>

                <Link 
                  to="/donate" 
                  className="spiritual-button text-sm inline-flex items-center group-hover:translate-x-2 transition-transform duration-300"
                >
                  Donate Now
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              {hoveredCard === option.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-spiritual-gold/5 backdrop-blur-sm flex items-center justify-center"
                >
                  <div className="text-center p-4">
                    <div className="text-spiritual-brown/70 text-sm mb-2">Progress</div>
                    <div className="w-24 h-2 bg-spiritual-gold/20 rounded-full overflow-hidden mx-auto">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${option.progress}%` }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-spiritual-gold"
                      />
                    </div>
                    <div className="text-spiritual-brown/70 text-sm mt-1">{option.progress}%</div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link 
            to="/donate" 
            className="bg-white text-spiritual-brown px-8 py-3 rounded-md shadow-md hover:bg-white/90 transition-all duration-300 inline-flex items-center group font-sanskrit"
          >
            Custom Donation
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default DonatePreview;
