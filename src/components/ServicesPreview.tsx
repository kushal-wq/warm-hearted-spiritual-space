
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Sparkles, Home, Yoga, Flower } from 'lucide-react';

const services = [
  {
    title: "Spiritual Consultation",
    description: "One-on-one guidance for your spiritual journey and personal challenges.",
    icon: Sparkles,
    price: "₹999",
    link: "/services",
  },
  {
    title: "Sacred Rituals",
    description: "Traditional ceremonies for healing, spiritual cleansing and life events.",
    icon: Flower,
    price: "₹2,499",
    link: "/services",
  },
  {
    title: "Family Blessings",
    description: "Special prayers and rituals to bring harmony and prosperity to your home.",
    icon: Home,
    price: "₹1,499",
    link: "/services",
  },
  {
    title: "Yoga & Meditation",
    description: "Learn ancient meditation techniques for inner peace and spiritual growth.",
    icon: Yoga,
    price: "₹799",
    link: "/services",
  },
];

const ServicesPreview = () => {
  return (
    <div className="py-16 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-16 -left-16 w-48 h-48 opacity-10 dark:opacity-5 rotate-12">
        <img 
          src="https://cdn.pixabay.com/photo/2014/03/24/17/15/ornament-295293_960_720.png" 
          alt="Decorative paisley" 
          className="w-full h-full"
        />
      </div>
      <div className="absolute -bottom-16 -right-16 w-48 h-48 opacity-10 dark:opacity-5 -rotate-12">
        <img 
          src="https://cdn.pixabay.com/photo/2014/03/24/17/15/ornament-295293_960_720.png" 
          alt="Decorative paisley" 
          className="w-full h-full"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground font-sanskrit mb-2">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our range of spiritual services designed to support your journey toward inner peace, 
            balance, and connection with the divine.
          </p>
          <div className="mehndi-divider mx-auto max-w-xs"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="indian-card p-6 flex flex-col h-full card-3d"
            >
              <div className="bg-spiritual-saffron/10 dark:bg-spiritual-saffron/20 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <service.icon className="h-6 w-6 text-spiritual-saffron" />
              </div>
              <h3 className="text-xl font-sanskrit text-foreground mb-2">{service.title}</h3>
              <p className="text-muted-foreground mb-4 flex-grow">{service.description}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold text-foreground">{service.price}</span>
                <Link to={service.link} className="indian-link">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/services" className="indian-button inline-block">
            View All Services
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            * All services available online and in-person in Delhi, Mumbai, Bangalore, and other major cities
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServicesPreview;
