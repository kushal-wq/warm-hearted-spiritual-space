
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

// Define the Event type
type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
  isRegistered?: boolean;
};

const Events = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState<string | null>(null);

  const fetchEvents = async (): Promise<Event[]> => {
    try {
      // Fetch events from Supabase
      const { data: eventsData, error: eventsError } = await supabase
        .from('events')
        .select('*');
      
      if (eventsError) throw eventsError;
      
      let events = eventsData || [];
      
      // If no events in Supabase, use mock data
      if (events.length === 0) {
        events = [
          {
            id: "1",
            title: "New Moon Meditation Circle",
            date: "2023-11-15",
            time: "7:00 PM - 9:00 PM",
            location: "Divine Temple Garden, 123 Peace St",
            description: "Join us for a powerful group meditation during the new moon to set intentions and connect with divine energy.",
            imageUrl: "/placeholder.svg"
          },
          {
            id: "2",
            title: "Sacred Fire Ceremony",
            date: "2023-11-21",
            time: "5:30 AM - 7:00 AM",
            location: "Riverside Sanctuary, 456 Harmony Ave",
            description: "A traditional fire ceremony (havan) to purify the atmosphere and invoke divine blessings.",
            imageUrl: "/placeholder.svg"
          },
          {
            id: "3",
            title: "Bhagavad Gita Study Group",
            date: "2023-11-28",
            time: "6:30 PM - 8:30 PM",
            location: "Wisdom Center, 789 Enlightenment Blvd",
            description: "Weekly gathering to study and discuss the profound teachings of the Bhagavad Gita.",
            imageUrl: "/placeholder.svg"
          },
          {
            id: "4",
            title: "Full Moon Sound Healing",
            date: "2023-11-30",
            time: "8:00 PM - 9:30 PM",
            location: "Crystal Dome, 321 Serenity Way",
            description: "Experience the healing vibrations of crystal bowls, gongs, and mantras during the full moon.",
            imageUrl: "/placeholder.svg"
          },
          {
            id: "5",
            title: "Spiritual Retreat Weekend",
            date: "2023-12-09",
            time: "Friday 4:00 PM - Sunday 2:00 PM",
            location: "Mountain Ashram, 555 Elevation Ridge",
            description: "An immersive weekend of meditation, yoga, silence, and spiritual teachings to deepen your practice.",
            imageUrl: "/placeholder.svg"
          },
          {
            id: "6",
            title: "Winter Solstice Celebration",
            date: "2023-12-21",
            time: "7:00 PM - 10:00 PM",
            location: "Community Temple, 888 Light Path",
            description: "Celebrate the return of the light with sacred rituals, music, and community gathering.",
            imageUrl: "/placeholder.svg"
          }
        ];
      }
      
      // If user is logged in, check for registrations
      if (user) {
        const { data: registrations, error: registrationsError } = await supabase
          .from('event_registrations')
          .select('event_id')
          .eq('user_id', user.id);
          
        if (registrationsError) throw registrationsError;
        
        const registeredEventIds = registrations?.map(reg => reg.event_id) || [];
        
        // Mark events as registered if the user has already registered
        events = events.map(event => ({
          ...event,
          isRegistered: registeredEventIds.includes(event.id)
        }));
      }
      
      return events;
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch events. Please try again later.",
      });
      return [];
    }
  };

  const { data, isLoading, refetch } = useQuery<Event[]>({
    queryKey: ['events', user?.id],
    queryFn: fetchEvents
  });

  const handleRegistration = async (eventId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to register for events.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    setIsRegistering(eventId);

    try {
      // Check if already registered
      const event = data?.find(e => e.id === eventId);
      
      if (event?.isRegistered) {
        // Unregister from event
        const { error } = await supabase
          .from('event_registrations')
          .delete()
          .match({ user_id: user.id, event_id: eventId });
          
        if (error) throw error;
        
        toast({
          title: "Registration Cancelled",
          description: `You have been unregistered from ${event.title}.`,
        });
      } else {
        // Register for event
        const { error } = await supabase
          .from('event_registrations')
          .insert({
            user_id: user.id,
            event_id: eventId
          });
          
        if (error) throw error;
        
        const eventTitle = data?.find(e => e.id === eventId)?.title || 'event';
        toast({
          title: "Registration Successful",
          description: `You have been registered for ${eventTitle}. We look forward to seeing you!`,
        });
      }
      
      // Refresh the events data
      refetch();
    } catch (error: any) {
      console.error('Error handling registration:', error);
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error.message || "Failed to process your registration. Please try again.",
      });
    } finally {
      setIsRegistering(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-spiritual-cream/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-sanskrit text-spiritual-brown mb-4">Upcoming Events</h1>
            <p className="text-xl text-spiritual-brown/80 max-w-3xl mx-auto">
              Join our community for sacred ceremonies, meditations, and spiritual gatherings to nurture your soul.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array(6).fill(0).map((_, index) => (
                <Card key={index} className="h-96 bg-white/50 animate-pulse">
                  <div className="h-full"></div>
                </Card>
              ))
            ) : (
              data?.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                  <div className="aspect-video bg-spiritual-sand/30 relative">
                    <img 
                      src={event.imageUrl} 
                      alt={event.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-spiritual-gold/90 text-white text-xs px-2 py-1 rounded flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl font-sanskrit text-spiritual-brown">{event.title}</CardTitle>
                    <CardDescription className="flex items-center text-spiritual-brown/70">
                      <Clock className="h-4 w-4 mr-1" /> {event.time}
                    </CardDescription>
                    <CardDescription className="flex items-center text-spiritual-brown/70">
                      <MapPin className="h-4 w-4 mr-1" /> {event.location}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-grow">
                    <p className="text-spiritual-brown/80">{event.description}</p>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      className={`w-full ${event.isRegistered 
                        ? 'bg-destructive hover:bg-destructive/90 text-white' 
                        : 'bg-spiritual-gold hover:bg-spiritual-gold/90 text-white'}`}
                      onClick={() => handleRegistration(event.id)}
                      disabled={isRegistering === event.id}
                    >
                      {isRegistering === event.id 
                        ? 'Processing...' 
                        : event.isRegistered 
                          ? 'Cancel Registration' 
                          : 'Register for Event'}
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;
