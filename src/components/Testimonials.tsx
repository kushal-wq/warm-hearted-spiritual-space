
import React, { useState } from 'react';

const testimonials = [
  {
    quote: "My spiritual consultation with the priest was truly life-changing. His wisdom and compassionate guidance helped me navigate a difficult period in my life.",
    name: "Sarah Johnson",
    title: "Community Member"
  },
  {
    quote: "The family blessing ceremony brought such peace and harmony to our home. We are deeply grateful for the priest's genuine care and spiritual support.",
    name: "Michael & Lisa Chen",
    title: "Devotees"
  },
  {
    quote: "I've attended many spiritual retreats, but none have been as transformative as the meditation sessions led by this wonderful priest. His teachings resonate at a profound level.",
    name: "David Williams",
    title: "Spiritual Seeker"
  },
  {
    quote: "The priest's ability to explain complex spiritual concepts in simple, practical terms has helped me integrate spiritual practices into my daily life with remarkable results.",
    name: "Priya Sharma",
    title: "Regular Attendee"
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <div className="bg-spiritual-sand/30 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-spiritual-brown font-sanskrit mb-4">Voices of Our Community</h2>
          <p className="text-spiritual-brown/80 max-w-2xl mx-auto">
            Hear from those whose lives have been touched by spiritual guidance and divine connection.
          </p>
        </div>
        
        <div className="spiritual-card max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
            <svg className="h-12 w-12 text-spiritual-gold/50 mb-6" fill="currentColor" viewBox="0 0 32 32">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
            
            <div className="relative h-40 w-full">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className={`absolute top-0 left-0 right-0 transition-opacity duration-500 ${
                    index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <p className="text-center text-spiritual-brown text-lg italic mb-6">"{testimonial.quote}"</p>
                  <div className="text-center">
                    <p className="font-semibold text-spiritual-brown">{testimonial.name}</p>
                    <p className="text-spiritual-brown/70 text-sm">{testimonial.title}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                    index === activeIndex ? 'bg-spiritual-gold' : 'bg-spiritual-gold/30'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="flex space-x-4 mt-6">
              <button 
                onClick={prevTestimonial}
                className="p-2 rounded-full border border-spiritual-gold/30 text-spiritual-brown hover:bg-spiritual-gold/10"
                aria-label="Previous testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button 
                onClick={nextTestimonial}
                className="p-2 rounded-full border border-spiritual-gold/30 text-spiritual-brown hover:bg-spiritual-gold/10"
                aria-label="Next testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
