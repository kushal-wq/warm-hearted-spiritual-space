import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Share2, Heart } from 'lucide-react';

const testimonials = [
  {
    quote: "My spiritual consultation with the priest was truly life-changing. His wisdom and compassionate guidance helped me navigate a difficult period in my life.",
    name: "Sarah Johnson",
    title: "Community Member",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    date: "March 15, 2024",
    likes: 128,
    tags: ["Guidance", "Healing", "Support"]
  },
  {
    quote: "The family blessing ceremony brought such peace and harmony to our home. We are deeply grateful for the priest's genuine care and spiritual support.",
    name: "Michael & Lisa Chen",
    title: "Devotees",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    date: "March 10, 2024",
    likes: 95,
    tags: ["Family", "Blessing", "Harmony"]
  },
  {
    quote: "I've attended many spiritual retreats, but none have been as transformative as the meditation sessions led by this wonderful priest. His teachings resonate at a profound level.",
    name: "David Williams",
    title: "Spiritual Seeker",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    date: "March 5, 2024",
    likes: 156,
    tags: ["Meditation", "Retreat", "Transformation"]
  },
  {
    quote: "The priest's ability to explain complex spiritual concepts in simple, practical terms has helped me integrate spiritual practices into my daily life with remarkable results.",
    name: "Priya Sharma",
    title: "Regular Attendee",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    date: "March 1, 2024",
    likes: 142,
    tags: ["Teaching", "Practice", "Growth"]
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLiked, setIsLiked] = useState<{ [key: number]: boolean }>({});
  const [showShareOptions, setShowShareOptions] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  
  const nextTestimonial = () => {
    setDirection(1);
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setDirection(-1);
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const handleLike = (index: number) => {
    setIsLiked(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleShare = (index: number) => {
    if (navigator.share) {
      navigator.share({
        title: 'Spiritual Testimonial',
        text: `"${testimonials[index].quote}" - ${testimonials[index].name}`,
      });
    } else {
      setShowShareOptions(index);
    }
  };
  
  return (
    <div className="bg-spiritual-sand/30 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-spiritual-brown font-sanskrit mb-4">Voices of Our Community</h2>
          <p className="text-spiritual-brown/80 max-w-2xl mx-auto">
            Hear from those whose lives have been touched by spiritual guidance and divine connection.
          </p>
        </motion.div>
        
        <div className="spiritual-card max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="h-12 w-12 text-spiritual-gold/50 mb-6"
            >
              <svg className="h-full w-full" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
            </motion.div>
            
            <div className="relative h-[400px] w-full overflow-hidden">
              <AnimatePresence initial={false} custom={direction}>
                {testimonials.map((testimonial, index) => (
                  index === activeIndex && (
                    <motion.div
                      key={index}
                      custom={direction}
                      initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                      transition={{ duration: 0.5 }}
                      className="absolute top-0 left-0 right-0"
                    >
                      <div className="flex flex-col items-center">
                        <div className="relative mb-6">
                          <div 
                            className="w-20 h-20 rounded-full bg-cover bg-center mb-4"
                            style={{ backgroundImage: `url(${testimonial.image})` }}
                          />
                          <div className="absolute -bottom-2 -right-2 bg-spiritual-gold text-white rounded-full p-1">
                            <Star className="w-4 h-4" fill="currentColor" />
                          </div>
                        </div>
                        
                        <div className="flex items-center mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-5 h-5 text-spiritual-gold"
                              fill="currentColor"
                            />
                          ))}
                        </div>
                        
                        <p className="text-center text-spiritual-brown text-lg italic mb-6 max-w-2xl">
                          "{testimonial.quote}"
                        </p>
                        
                        <div className="text-center mb-4">
                          <p className="font-semibold text-spiritual-brown">{testimonial.name}</p>
                          <p className="text-spiritual-brown/70 text-sm">{testimonial.title}</p>
                          <p className="text-spiritual-brown/50 text-xs mt-1">{testimonial.date}</p>
                        </div>
                        
                        <div className="flex flex-wrap justify-center gap-2 mb-6">
                          {testimonial.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-spiritual-gold/10 text-spiritual-brown rounded-full text-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleLike(index)}
                            className={`flex items-center gap-1 p-2 rounded-full transition-colors duration-300 ${
                              isLiked[index] ? 'text-red-500' : 'text-spiritual-brown/70 hover:text-spiritual-brown'
                            }`}
                          >
                            <Heart className="w-5 h-5" fill={isLiked[index] ? 'currentColor' : 'none'} />
                            <span className="text-sm">{testimonial.likes + (isLiked[index] ? 1 : 0)}</span>
                          </button>
                          <button
                            onClick={() => handleShare(index)}
                            className="p-2 rounded-full text-spiritual-brown/70 hover:text-spiritual-brown hover:bg-spiritual-gold/10 transition-colors duration-300"
                          >
                            <Share2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'bg-spiritual-gold scale-125' : 'bg-spiritual-gold/30 hover:bg-spiritual-gold/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="flex space-x-4 mt-6">
              <button 
                onClick={prevTestimonial}
                className="p-2 rounded-full border border-spiritual-gold/30 text-spiritual-brown hover:bg-spiritual-gold/10 transition-colors duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextTestimonial}
                className="p-2 rounded-full border border-spiritual-gold/30 text-spiritual-brown hover:bg-spiritual-gold/10 transition-colors duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Share Options Modal */}
      <AnimatePresence>
        {showShareOptions !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowShareOptions(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
            >
              <h3 className="text-xl font-sanskrit text-spiritual-brown mb-4">Share Testimonial</h3>
              <div className="space-y-4">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`"${testimonials[showShareOptions].quote}" - ${testimonials[showShareOptions].name}`);
                    setShowShareOptions(null);
                  }}
                  className="w-full px-4 py-2 bg-spiritual-brown/10 text-spiritual-brown rounded-md hover:bg-spiritual-brown/20 transition-colors duration-300"
                >
                  Copy Text
                </button>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    `"${testimonials[showShareOptions].quote}" - ${testimonials[showShareOptions].name}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-4 py-2 bg-spiritual-brown/10 text-spiritual-brown rounded-md hover:bg-spiritual-brown/20 transition-colors duration-300 text-center"
                >
                  Share on Twitter
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Testimonials;
