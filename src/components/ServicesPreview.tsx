
import React from 'react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: "Spiritual Consultation",
    description: "One-on-one guidance for your spiritual journey and personal challenges.",
    icon: "🙏",
    link: "/services",
  },
  {
    title: "Sacred Rituals",
    description: "Traditional ceremonies for life events, healing, and spiritual cleansing.",
    icon: "✨",
    link: "/services",
  },
  {
    title: "Family Blessings",
    description: "Special prayers and rituals to bring harmony and prosperity to your home.",
    icon: "🏠",
    link: "/services",
  },
  {
    title: "Meditation Guidance",
    description: "Learn ancient meditation techniques for inner peace and spiritual growth.",
    icon: "🧘",
    link: "/services",
  },
];

const ServicesPreview = () => {
  return (
    <div className="bg-spiritual-gradient py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-spiritual-brown font-sanskrit mb-4">Our Services</h2>
          <p className="text-spiritual-brown/80 max-w-2xl mx-auto">
            Discover our range of spiritual services designed to support your journey toward inner peace, 
            balance, and connection with the divine.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="spiritual-card hover:border-spiritual-gold/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="text-4xl mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-sanskrit text-spiritual-brown mb-2">{service.title}</h3>
              <p className="text-spiritual-brown/70 mb-4">{service.description}</p>
              <Link to={service.link} className="spiritual-link">
                Learn more
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/services" className="spiritual-button inline-block">
            View All Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesPreview;
