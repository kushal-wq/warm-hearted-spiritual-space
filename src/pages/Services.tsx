
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const services = [
  {
    id: 1,
    title: "Spiritual Consultation",
    description: "A one-on-one session with the priest to discuss personal spiritual concerns, receive guidance, and find clarity on life challenges.",
    duration: "60 minutes",
    price: "$75",
    icon: "🙏",
  },
  {
    id: 2,
    title: "Home Blessing Ceremony",
    description: "A sacred ritual to purify your living space, remove negative energies, and invite prosperity and harmony into your home.",
    duration: "90 minutes",
    price: "$120",
    icon: "🏠",
  },
  {
    id: 3,
    title: "Marriage Ceremony",
    description: "A beautiful, traditional ceremony to unite two souls in the sacred bond of marriage, with personalized vows and rituals.",
    duration: "2-3 hours",
    price: "$350",
    icon: "💍",
  },
  {
    id: 4,
    title: "Baby Naming & Blessing",
    description: "A joyous ceremony to welcome a new soul into the world, with name selection based on astrological considerations and blessings for a prosperous life.",
    duration: "60 minutes",
    price: "$95",
    icon: "👶",
  },
  {
    id: 5,
    title: "Healing Ritual",
    description: "A powerful ceremony that combines ancient practices to promote physical, emotional, and spiritual healing.",
    duration: "75 minutes",
    price: "$90",
    icon: "✨",
  },
  {
    id: 6,
    title: "Meditation Guidance",
    description: "Learn personalized meditation techniques suited to your spiritual needs and temperament.",
    duration: "60 minutes",
    price: "$65",
    icon: "🧘",
  },
  {
    id: 7,
    title: "Prayer for Ancestors",
    description: "Honor your ancestors and seek their blessings through traditional prayers and rituals.",
    duration: "45 minutes",
    price: "$60",
    icon: "🕯️",
  },
  {
    id: 8,
    title: "Annual Festival Celebration",
    description: "Join the community in celebrating major religious festivals with traditional rituals, singing, and feasting.",
    duration: "3-4 hours",
    price: "Donation based",
    icon: "🎉",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="relative py-10 bg-spiritual-cream">
          {/* Hero Section */}
          <div className="relative mb-16">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb')] bg-cover bg-center h-64 md:h-80">
              <div className="absolute inset-0 bg-gradient-to-b from-spiritual-brown/30 to-spiritual-brown/60"></div>
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pb-24 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white font-sanskrit mb-4">Sacred Services</h1>
              <p className="text-white/90 max-w-3xl mx-auto text-lg">
                Discover our range of spiritual services designed to support your journey toward inner peace, 
                balance, and connection with the divine.
              </p>
            </div>
          </div>
          
          {/* Services List */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service.id} className="spiritual-card hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="text-4xl mr-4">{service.icon}</div>
                    <h3 className="text-xl font-sanskrit text-spiritual-brown">{service.title}</h3>
                  </div>
                  <p className="text-spiritual-brown/80 mb-4">{service.description}</p>
                  <div className="flex justify-between text-sm text-spiritual-brown/70 mb-5">
                    <span><strong>Duration:</strong> {service.duration}</span>
                    <span><strong>Offering:</strong> {service.price}</span>
                  </div>
                  <button className="spiritual-button w-full">Book Now</button>
                </div>
              ))}
            </div>
            
            {/* Custom Service Request */}
            <div className="mt-16 spiritual-card text-center">
              <h2 className="text-2xl font-sanskrit text-spiritual-brown mb-4">Need a Custom Service?</h2>
              <p className="text-spiritual-brown/80 mb-6 max-w-2xl mx-auto">
                If you don't see the specific service you're looking for, or if you need a customized ceremony 
                for a special occasion, please don't hesitate to reach out. We're happy to create a personalized 
                experience that meets your spiritual needs.
              </p>
              <Link to="/contact" className="spiritual-button inline-block">
                Request Custom Service
              </Link>
            </div>
            
            {/* Service Process */}
            <div className="mt-16">
              <h2 className="text-2xl font-sanskrit text-spiritual-brown text-center mb-8">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="spiritual-card text-center">
                  <div className="bg-spiritual-gold/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-sanskrit text-spiritual-gold text-xl">1</span>
                  </div>
                  <h3 className="font-sanskrit text-spiritual-brown mb-2">Book Your Service</h3>
                  <p className="text-spiritual-brown/70 text-sm">
                    Choose your desired service and select a convenient date and time.
                  </p>
                </div>
                
                <div className="spiritual-card text-center">
                  <div className="bg-spiritual-gold/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-sanskrit text-spiritual-gold text-xl">2</span>
                  </div>
                  <h3 className="font-sanskrit text-spiritual-brown mb-2">Confirmation</h3>
                  <p className="text-spiritual-brown/70 text-sm">
                    Receive a confirmation email with all the details and preparation instructions.
                  </p>
                </div>
                
                <div className="spiritual-card text-center">
                  <div className="bg-spiritual-gold/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-sanskrit text-spiritual-gold text-xl">3</span>
                  </div>
                  <h3 className="font-sanskrit text-spiritual-brown mb-2">Experience</h3>
                  <p className="text-spiritual-brown/70 text-sm">
                    Participate in your chosen service, either in-person or virtually.
                  </p>
                </div>
                
                <div className="spiritual-card text-center">
                  <div className="bg-spiritual-gold/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-sanskrit text-spiritual-gold text-xl">4</span>
                  </div>
                  <h3 className="font-sanskrit text-spiritual-brown mb-2">Follow-up</h3>
                  <p className="text-spiritual-brown/70 text-sm">
                    Receive post-service guidance and resources to continue your spiritual journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
