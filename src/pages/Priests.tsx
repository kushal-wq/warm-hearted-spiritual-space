
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Loader2, Calendar, DollarSign, Star, MapPin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface PriestProfile {
  id: string;
  user_id: string;
  name: string;
  description: string;
  specialties: string[];
  experience_years: number;
  avatar_url: string;
  base_price: number;
  availability: string;
  location: string;
  rating: number;
  created_at: string;
  updated_at: string;
}

const Priests = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const { data: priests, isLoading, error } = useQuery({
    queryKey: ['priests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('priest_profiles')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as PriestProfile[];
    }
  });

  const handleSelectPriest = (priest: PriestProfile) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to book a priest for services.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }
    
    navigate(`/book-priest/${priest.id}`);
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-secondary/30 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-spiritual-gold" />
            <p className="mt-4 text-lg text-spiritual-brown">Loading priest profiles...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-secondary/30 flex items-center justify-center">
          <div className="text-center max-w-lg p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Priests</h2>
            <p className="text-gray-700">We encountered an issue while loading the priest profiles. Please try again later.</p>
            <Button onClick={() => window.location.reload()} className="mt-6 bg-spiritual-gold hover:bg-spiritual-gold/90">
              Retry
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-12 min-h-screen bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-spiritual-brown">Our Dedicated Priests</h1>
          <p className="text-lg text-spiritual-brown/80 max-w-3xl mx-auto">
            Connect with our experienced priests for various religious ceremonies, consultations, and spiritual guidance.
            Each priest brings unique expertise and traditions to serve your spiritual needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {priests && priests.map((priest) => (
            <Card key={priest.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white border-spiritual-gold/20">
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24 border-2 border-spiritual-gold">
                    <img 
                      src={priest.avatar_url || '/placeholder.svg'} 
                      alt={priest.name} 
                      className="object-cover"
                    />
                  </Avatar>
                </div>
                <CardTitle className="text-center text-spiritual-brown">{priest.name}</CardTitle>
                <div className="flex items-center justify-center mt-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.round(priest.rating) ? 'fill-current' : 'fill-none'}`} 
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">({priest.rating.toFixed(1)})</span>
                </div>
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                  {priest.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline" className="bg-amber-50 text-spiritual-brown border-spiritual-gold/30">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 line-clamp-3">{priest.description}</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center justify-center text-gray-700 gap-1">
                    <Calendar className="h-4 w-4 text-spiritual-gold" />
                    <span>{priest.experience_years} Years</span>
                  </div>
                  <div className="flex items-center justify-center text-gray-700 gap-1">
                    <DollarSign className="h-4 w-4 text-spiritual-gold" />
                    <span>From ${priest.base_price}</span>
                  </div>
                  <div className="flex items-center justify-center text-gray-700 gap-1 col-span-2">
                    <MapPin className="h-4 w-4 text-spiritual-gold" />
                    <span>{priest.location}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handleSelectPriest(priest)} 
                  className="w-full bg-spiritual-gold hover:bg-spiritual-gold/90"
                >
                  Book Services
                </Button>
              </CardFooter>
            </Card>
          ))}
          
          {priests && priests.length === 0 && (
            <div className="col-span-full text-center py-12 bg-white rounded-lg shadow">
              <h3 className="text-xl font-medium text-spiritual-brown">No priests available at the moment</h3>
              <p className="mt-2 text-gray-600">Please check back later for updated listings.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Priests;
