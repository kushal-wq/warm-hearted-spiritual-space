import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Bell, Share2 } from 'lucide-react';

const events = [
  {
    id: 1,
    title: "Full Moon Ceremony",
    date: "July 21, 2023",
    time: "7:00 PM - 9:00 PM",
    location: "Temple Garden",
    description: "Join us for a special ceremony to harness the powerful energy of the full moon.",
    capacity: 50,
    registered: 35,
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
    tags: ["Ceremony", "Moon", "Energy"],
    countdown: new Date("2023-07-21T19:00:00").getTime()
  },
  {
    id: 2,
    title: "Meditation Retreat",
    date: "August 5-7, 2023",
    time: "All Day",
    location: "Mountain Sanctuary",
    description: "A weekend of deep meditation, spiritual teachings, and inner reflection.",
    capacity: 30,
    registered: 28,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    tags: ["Retreat", "Meditation", "Teaching"],
    countdown: new Date("2023-08-05T00:00:00").getTime()
  },
  {
    id: 3,
    title: "Spiritual Discourse",
    date: "August 15, 2023",
    time: "6:30 PM - 8:00 PM",
    location: "Community Hall",
    description: "An enlightening talk on finding purpose and meaning in everyday life.",
    capacity: 100,
    registered: 65,
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
    tags: ["Discourse", "Teaching", "Community"],
    countdown: new Date("2023-08-15T18:30:00").getTime()
  },
];

const UpcomingEvents = () => {
  const [timeLeft, setTimeLeft] = useState<{ [key: number]: { days: number; hours: number; minutes: number; seconds: number } }>({});
  const [showShareOptions, setShowShareOptions] = useState<number | null>(null);
  const [isRsvpModalOpen, setIsRsvpModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const newTimeLeft: typeof timeLeft = {};
      events.forEach(event => {
        const difference = event.countdown - new Date().getTime();
        if (difference > 0) {
          newTimeLeft[event.id] = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
          };
        }
      });
      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRsvp = (event: typeof events[0]) => {
    setSelectedEvent(event);
    setIsRsvpModalOpen(true);
  };

  const handleShare = (event: typeof events[0]) => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `${event.title} - ${event.date} at ${event.location}`,
      });
    } else {
      setShowShareOptions(event.id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-spiritual-brown font-sanskrit mb-4">Upcoming Events</h2>
        <p className="text-spiritual-brown/80 max-w-2xl mx-auto">
          Join our community for these special gatherings designed to nurture your spiritual growth
          and foster connections with like-minded seekers.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="spiritual-card group hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <div 
              className="h-48 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${event.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-sanskrit text-white">{event.title}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {event.tags.map((tag, idx) => (
                    <span key={idx} className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-start mb-4">
                <div className="bg-spiritual-gold/10 p-3 rounded-lg mr-4">
                  <Calendar className="h-6 w-6 text-spiritual-gold" />
                </div>
                <div>
                  <p className="text-spiritual-brown/70">{event.date}</p>
                  <div className="flex items-center text-sm text-spiritual-brown/70 mt-1">
                    <Clock className="w-4 h-4 mr-1" />
                    {event.time}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center text-sm text-spiritual-brown/70 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {event.location}
                </div>
                <div className="flex items-center text-sm text-spiritual-brown/70 mb-3">
                  <Users className="w-4 h-4 mr-1" />
                  {event.registered}/{event.capacity} registered
                </div>
                <p className="text-spiritual-brown/80">{event.description}</p>
              </div>

              {timeLeft[event.id] && (
                <div className="grid grid-cols-4 gap-2 mb-4">
                  <div className="text-center bg-spiritual-gold/10 rounded-lg p-2">
                    <div className="text-lg font-bold text-spiritual-brown">{timeLeft[event.id].days}</div>
                    <div className="text-xs text-spiritual-brown/70">Days</div>
                  </div>
                  <div className="text-center bg-spiritual-gold/10 rounded-lg p-2">
                    <div className="text-lg font-bold text-spiritual-brown">{timeLeft[event.id].hours}</div>
                    <div className="text-xs text-spiritual-brown/70">Hours</div>
                  </div>
                  <div className="text-center bg-spiritual-gold/10 rounded-lg p-2">
                    <div className="text-lg font-bold text-spiritual-brown">{timeLeft[event.id].minutes}</div>
                    <div className="text-xs text-spiritual-brown/70">Mins</div>
                  </div>
                  <div className="text-center bg-spiritual-gold/10 rounded-lg p-2">
                    <div className="text-lg font-bold text-spiritual-brown">{timeLeft[event.id].seconds}</div>
                    <div className="text-xs text-spiritual-brown/70">Secs</div>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center">
                <Link to={`/events/${event.id}`} className="spiritual-link">
                  Read more
                </Link>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleShare(event)}
                    className="p-2 rounded-full text-spiritual-brown/70 hover:text-spiritual-brown hover:bg-spiritual-gold/10 transition-colors duration-300"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleRsvp(event)}
                    className="bg-spiritual-gold/10 text-spiritual-brown hover:bg-spiritual-gold/20 px-4 py-2 rounded-md transition-colors duration-300 flex items-center"
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    RSVP
                  </button>
                </div>
              </div>
            </div>
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
        <Link to="/events" className="spiritual-button inline-block">
          View All Events
        </Link>
      </motion.div>

      {/* Share Options Modal */}
      <AnimatePresence>
        {showShareOptions && (
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
              <h3 className="text-xl font-sanskrit text-spiritual-brown mb-4">Share Event</h3>
              <div className="space-y-4">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`${events.find(e => e.id === showShareOptions)?.title} - ${events.find(e => e.id === showShareOptions)?.date}`);
                    setShowShareOptions(null);
                  }}
                  className="w-full px-4 py-2 bg-spiritual-brown/10 text-spiritual-brown rounded-md hover:bg-spiritual-brown/20 transition-colors duration-300"
                >
                  Copy Link
                </button>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    `${events.find(e => e.id === showShareOptions)?.title} - ${events.find(e => e.id === showShareOptions)?.date}`
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

      {/* RSVP Modal */}
      <AnimatePresence>
        {isRsvpModalOpen && selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setIsRsvpModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
            >
              <h3 className="text-xl font-sanskrit text-spiritual-brown mb-4">RSVP for {selectedEvent.title}</h3>
              <p className="text-spiritual-brown/70 mb-4">
                Please confirm your attendance for this event. We'll send you a confirmation email with all the details.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setIsRsvpModalOpen(false)}
                  className="px-4 py-2 text-spiritual-brown/70 hover:text-spiritual-brown transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle RSVP logic here
                    setIsRsvpModalOpen(false);
                  }}
                  className="spiritual-button"
                >
                  Confirm RSVP
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UpcomingEvents;
