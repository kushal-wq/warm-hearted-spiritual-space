
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

const events = [
  {
    id: 1,
    title: "Full Moon Ceremony",
    date: "July 21, 2023",
    time: "7:00 PM - 9:00 PM",
    location: "Temple Garden",
    description: "Join us for a special ceremony to harness the powerful energy of the full moon.",
  },
  {
    id: 2,
    title: "Meditation Retreat",
    date: "August 5-7, 2023",
    time: "All Day",
    location: "Mountain Sanctuary",
    description: "A weekend of deep meditation, spiritual teachings, and inner reflection.",
  },
  {
    id: 3,
    title: "Spiritual Discourse",
    date: "August 15, 2023",
    time: "6:30 PM - 8:00 PM",
    location: "Community Hall",
    description: "An enlightening talk on finding purpose and meaning in everyday life.",
  },
];

const UpcomingEvents = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-spiritual-brown font-sanskrit mb-4">Upcoming Events</h2>
        <p className="text-spiritual-brown/80 max-w-2xl mx-auto">
          Join our community for these special gatherings designed to nurture your spiritual growth
          and foster connections with like-minded seekers.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div key={event.id} className="spiritual-card hover:shadow-lg transition-all duration-300">
            <div className="flex items-start mb-4">
              <div className="bg-spiritual-gold/10 p-3 rounded-lg mr-4">
                <Calendar className="h-6 w-6 text-spiritual-gold" />
              </div>
              <div>
                <h3 className="text-xl font-sanskrit text-spiritual-brown">{event.title}</h3>
                <p className="text-spiritual-brown/70">{event.date}</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm text-spiritual-brown/70 mb-1"><strong>Time:</strong> {event.time}</p>
              <p className="text-sm text-spiritual-brown/70 mb-3"><strong>Location:</strong> {event.location}</p>
              <p className="text-spiritual-brown/80">{event.description}</p>
            </div>
            <div className="flex justify-between items-center">
              <Link to={`/events/${event.id}`} className="spiritual-link">
                Read more
              </Link>
              <button className="bg-spiritual-gold/10 text-spiritual-brown hover:bg-spiritual-gold/20 px-4 py-2 rounded-md transition-colors duration-300">
                RSVP
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <Link to="/events" className="spiritual-button inline-block">
          View All Events
        </Link>
      </div>
    </div>
  );
};

export default UpcomingEvents;
