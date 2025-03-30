import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, Users, Star } from 'lucide-react';

const services = [
  {
    title: "Vedic Consultation",
    description: "Personalized spiritual guidance based on ancient Vedic wisdom and astrology.",
    icon: "ॐ",
    link: "/services",
    duration: "60 min",
    groupSize: "1 person",
    schedule: "Flexible",
    features: ["Vedic astrology", "Life path guidance", "Karma analysis", "Birth chart reading"],
    color: "from-orange-500/20 to-orange-600/20"
  },
  {
    title: "Puja & Rituals",
    description: "Traditional Hindu ceremonies for various occasions and spiritual purposes.",
    icon: "🪔",
    link: "/services",
    duration: "90 min",
    groupSize: "1-10 people",
    schedule: "By appointment",
    features: ["Ganesh puja", "Lakshmi puja", "Navagraha puja", "Havan ceremony"],
    color: "from-red-500/20 to-red-600/20"
  },
  {
    title: "Vastu Shastra",
    description: "Ancient Indian science of architecture and space harmonization.",
    icon: "🏠",
    link: "/services",
    duration: "120 min",
    groupSize: "Family",
    schedule: "By appointment",
    features: ["Home analysis", "Energy balancing", "Remedial solutions", "Space optimization"],
    color: "from-green-500/20 to-green-600/20"
  },
  {
    title: "Yoga & Meditation",
    description: "Traditional yoga asanas and meditation techniques from ancient texts.",
    icon: "🧘",
    link: "/services",
    duration: "45 min",
    groupSize: "1-5 people",
    schedule: "Weekly",
    features: ["Ashtanga yoga", "Pranayama", "Dhyana meditation", "Kundalini awakening"],
    color: "from-blue-500/20 to-blue-600/20"
  },
  {
    title: "Ayurvedic Wellness",
    description: "Traditional Indian healing system for holistic health and well-being.",
    icon: "🌿",
    link: "/services",
    duration: "75 min",
    groupSize: "1 person",
    schedule: "Weekly",
    features: ["Dosha analysis", "Herbal remedies", "Diet consultation", "Lifestyle guidance"],
    color: "from-purple-500/20 to-purple-600/20"
  },
  {
    title: "Mantra & Chanting",
    description: "Sacred sound vibrations and chanting practices for spiritual growth.",
    icon: "🎵",
    link: "/services",
    duration: "60 min",
    groupSize: "1-8 people",
    schedule: "Weekly",
    features: ["Vedic chanting", "Mantra meditation", "Kirtan sessions", "Sound healing"],
    color: "from-yellow-500/20 to-yellow-600/20"
  }
];

const ServicesPreview = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="bg-spiritual-gradient py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-spiritual-brown font-sanskrit mb-4">Our Services</h2>
          <p className="text-spiritual-brown/80 max-w-2xl mx-auto">
            Experience authentic Indian spiritual practices and ancient wisdom traditions 
            designed to bring harmony, peace, and spiritual growth to your life.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className={`spiritual-card relative overflow-hidden group bg-gradient-to-br ${service.color} hover:shadow-xl transition-all duration-300`}
            >
              <div className="relative z-10 p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl transform group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <div className="flex gap-1">
                    <Star className="w-4 h-4 text-spiritual-gold fill-current" />
                    <Star className="w-4 h-4 text-spiritual-gold fill-current" />
                    <Star className="w-4 h-4 text-spiritual-gold fill-current" />
                    <Star className="w-4 h-4 text-spiritual-gold fill-current" />
                    <Star className="w-4 h-4 text-spiritual-gold fill-current" />
                  </div>
                </div>
                
                <h3 className="text-xl font-sanskrit text-spiritual-brown mb-2">{service.title}</h3>
                <p className="text-spiritual-brown/70 mb-4 flex-grow">{service.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-spiritual-brown/70 text-sm">
                    <Clock className="w-4 h-4 mr-2" />
                    {service.duration}
                  </div>
                  <div className="flex items-center text-spiritual-brown/70 text-sm">
                    <Users className="w-4 h-4 mr-2" />
                    {service.groupSize}
                  </div>
                  <div className="flex items-center text-spiritual-brown/70 text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    {service.schedule}
                  </div>
                </div>

                <Link 
                  to={service.link} 
                  className="spiritual-link inline-flex items-center group-hover:translate-x-2 transition-transform duration-300 mt-auto"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              {hoveredIndex === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white/95 backdrop-blur-sm p-6 flex flex-col"
                >
                  <h4 className="text-lg font-sanskrit text-spiritual-brown mb-4">Key Features</h4>
                  <ul className="space-y-3 flex-grow">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-spiritual-brown/80 text-sm flex items-center">
                        <span className="w-1.5 h-1.5 bg-spiritual-gold rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link 
                    to={service.link} 
                    className="spiritual-button mt-4 inline-flex items-center justify-center group-hover:translate-x-2 transition-transform duration-300"
                  >
                    Book Now
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link 
            to="/services" 
            className="spiritual-button inline-flex items-center group hover:shadow-lg transition-all duration-300"
          >
            View All Services
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesPreview;
