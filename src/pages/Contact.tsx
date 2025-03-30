import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { supabase } from '@/lib/supabase';

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    try {
      setIsSubmitting(true);
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: values.name,
            email: values.email,
            subject: values.subject,
            message: values.message,
            created_at: new Date().toISOString(),
          }
        ]);

      if (error) throw error;

      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We will respond to your message shortly.",
      });
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-spiritual-cream/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-sanskrit text-spiritual-brown mb-4">Contact Us</h1>
            <p className="text-xl text-spiritual-brown/80 max-w-3xl mx-auto">
              We're here to answer your questions and provide spiritual guidance. Reach out to us through any of the methods below.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <Card className="bg-white/70 text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-spiritual-gold/20 rounded-full flex items-center justify-center mx-auto">
                  <Phone className="h-6 w-6 text-spiritual-gold" />
                </div>
                <CardTitle className="text-spiritual-brown">Call Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-spiritual-brown/80 mb-2">Our spiritual advisors are available</p>
                <p className="text-spiritual-brown font-medium">+91 98765 43210</p>
                <p className="text-sm text-spiritual-brown/70 mt-2">Monday-Saturday: 9am-8pm IST</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/70 text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-spiritual-gold/20 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="h-6 w-6 text-spiritual-gold" />
                </div>
                <CardTitle className="text-spiritual-brown">Email Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-spiritual-brown/80 mb-2">For inquiries and bookings</p>
                <p className="text-spiritual-brown font-medium">contact@divineguidance.in</p>
                <p className="text-sm text-spiritual-brown/70 mt-2">We aim to respond within 24 hours</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/70 text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-spiritual-gold/20 rounded-full flex items-center justify-center mx-auto">
                  <MapPin className="h-6 w-6 text-spiritual-gold" />
                </div>
                <CardTitle className="text-spiritual-brown">Visit Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-spiritual-brown/80 mb-2">Our spiritual center is located at</p>
                <p className="text-spiritual-brown font-medium">123 Peace Street, Bandra West, Mumbai - 400050</p>
                <p className="text-sm text-spiritual-brown/70 mt-2">Open daily for visitors: 6am-9pm IST</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-white/70">
              <CardHeader>
                <CardTitle className="text-spiritual-brown">Send us a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you shortly.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="How can we help?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Your message..." className="min-h-[120px]" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full spiritual-button"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <Send className="w-4 h-4 mr-2 animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card className="bg-white/70">
              <CardHeader>
                <CardTitle className="text-spiritual-brown">Find Us</CardTitle>
                <CardDescription>Visit our spiritual center in Bandra West, Mumbai.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video w-full rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.80593552708!2d72.82787531580175!3d19.05575198778938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9c6f6a4b0b1%3A0x3be7c9c6f6a4b0b1!2sBandra%20West%2C%20Mumbai%2C%20Maharashtra%20400050!5e0!3m2!1sen!2sin!4v1647680000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-spiritual-brown/80">
                    <strong>Address:</strong> 123 Peace Street, Bandra West, Mumbai - 400050
                  </p>
                  <p className="text-spiritual-brown/80">
                    <strong>Landmark:</strong> Near Mount Mary Church
                  </p>
                  <p className="text-spiritual-brown/80">
                    <strong>Directions:</strong> Take the Bandra West exit from the Western Express Highway, 
                    turn right at Mount Mary Church, and we're located 200 meters ahead on the right side.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
