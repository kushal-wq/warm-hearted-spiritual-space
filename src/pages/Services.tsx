import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { ServicesAPI, BookingsAPI, Service } from '@/api/supabaseUtils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';

const formSchema = z.object({
  date: z.date({
    required_error: "Please select a date for your booking.",
  }),
  notes: z.string().optional(),
});

const Services = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: "",
    },
  });

  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: async () => {
      const data = await ServicesAPI.getAll();
      
      // If no data from Supabase, use local mock data
      if (data.length === 0) {
        return [
          {
            id: "1",
            title: "Spiritual Consultation",
            description: "A one-on-one session with the priest to discuss personal spiritual concerns, receive guidance, and find clarity on life challenges.",
            duration: "60 minutes",
            price: "$75",
            icon: "🙏",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: "2",
            title: "Home Blessing Ceremony",
            description: "A sacred ritual to purify your living space, remove negative energies, and invite prosperity and harmony into your home.",
            duration: "90 minutes",
            price: "$120",
            icon: "🏠",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: "3",
            title: "Marriage Ceremony",
            description: "A beautiful, traditional ceremony to unite two souls in the sacred bond of marriage, with personalized vows and rituals.",
            duration: "2-3 hours",
            price: "$350",
            icon: "💍",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: "4",
            title: "Baby Naming & Blessing",
            description: "A joyous ceremony to welcome a new soul into the world, with name selection based on astrological considerations and blessings for a prosperous life.",
            duration: "60 minutes",
            price: "$95",
            icon: "👶",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: "5",
            title: "Healing Ritual",
            description: "A powerful ceremony that combines ancient practices to promote physical, emotional, and spiritual healing.",
            duration: "75 minutes",
            price: "$90",
            icon: "✨",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: "6",
            title: "Meditation Guidance",
            description: "Learn personalized meditation techniques suited to your spiritual needs and temperament.",
            duration: "60 minutes",
            price: "$65",
            icon: "🧘",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: "7",
            title: "Prayer for Ancestors",
            description: "Honor your ancestors and seek their blessings through traditional prayers and rituals.",
            duration: "45 minutes",
            price: "$60",
            icon: "🕯️",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: "8",
            title: "Annual Festival Celebration",
            description: "Join the community in celebrating major religious festivals with traditional rituals, singing, and feasting.",
            duration: "3-4 hours",
            price: "Donation based",
            icon: "🎉",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
        ];
      }
      
      return data;
    }
  });

  const handleBookNow = (service: Service) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to book a service.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    setSelectedService(service);
    setOpenDialog(true);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!selectedService || !user) return;

    try {
      const bookingDate = values.date.toISOString();
      const success = await BookingsAPI.book(
        user.id,
        selectedService.id,
        bookingDate,
        values.notes
      );

      if (!success) {
        throw new Error("Failed to book the service");
      }

      toast({
        title: "Booking Successful",
        description: `Your ${selectedService.title} service has been booked for ${format(values.date, 'PPPP')}. We'll contact you soon to confirm the details.`,
      });

      setOpenDialog(false);
      form.reset();
    } catch (error: any) {
      console.error('Error booking service:', error);
      toast({
        variant: "destructive",
        title: "Booking Failed",
        description: error.message || "Failed to book the service. Please try again.",
      });
    }
  };

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
                  <button 
                    className="spiritual-button w-full"
                    onClick={() => handleBookNow(service)}
                  >
                    Book Now
                  </button>
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

      {/* Booking Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-sanskrit text-spiritual-brown">Book {selectedService?.title}</DialogTitle>
            <DialogDescription>
              Select a date for your booking and provide any additional information.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Select a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any specific requirements or information we should know?"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setOpenDialog(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-spiritual-gold hover:bg-spiritual-gold/90"
                >
                  Book Service
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Services;
