
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, Calendar, User, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TeachingsAPI, Teaching } from '@/api/supabaseUtils';

const Teachings = () => {
  const [selectedTeaching, setSelectedTeaching] = useState<Teaching | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: teachings = [], isLoading, error } = useQuery({
    queryKey: ['teachings'],
    queryFn: TeachingsAPI.getAll
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error loading teachings",
        description: "There was an error loading the teachings. Please try again later.",
        variant: "destructive"
      });
      console.error("Error fetching teachings:", error);
    }
  }, [error, toast]);

  const handleReadTeaching = async (teachingId: string) => {
    try {
      // First try to find the teaching in the already fetched data
      let teaching = teachings.find(t => t.id === teachingId);
      
      // If not found or we want to ensure we have the most up-to-date data,
      // fetch it from the backend
      if (!teaching) {
        teaching = await TeachingsAPI.getById(teachingId);
        if (!teaching) {
          throw new Error('Teaching not found');
        }
      }
      
      setSelectedTeaching(teaching);
      setIsDialogOpen(true);
    } catch (err) {
      console.error("Failed to load teaching details:", err);
      toast({
        title: "Error",
        description: "Failed to load teaching details. Please try again later.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-spiritual-cream/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-sanskrit text-spiritual-brown mb-4">Sacred Teachings</h1>
            <p className="text-xl text-spiritual-brown/80 max-w-3xl mx-auto">
              Explore our collection of spiritual wisdom, ancient texts, and modern interpretations to guide your spiritual journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array(6).fill(0).map((_, index) => (
                <Card key={index} className="h-96 bg-white/50 animate-pulse">
                  <div className="h-full"></div>
                </Card>
              ))
            ) : teachings.length === 0 ? (
              <Card className="col-span-full p-8 text-center">
                <p className="text-spiritual-brown/70">No teachings available at the moment. Please check back later.</p>
              </Card>
            ) : (
              teachings.map((teaching) => (
                <Card key={teaching.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                  <div className="aspect-video bg-spiritual-sand/30 relative">
                    <img 
                      src={teaching.imageUrl} 
                      alt={teaching.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-spiritual-gold/90 text-white text-xs px-2 py-1 rounded">
                      {teaching.category}
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl font-sanskrit text-spiritual-brown">{teaching.title}</CardTitle>
                    <CardDescription className="flex items-center text-spiritual-brown/70">
                      <User className="h-4 w-4 mr-1" /> {teaching.author}
                    </CardDescription>
                    <CardDescription className="flex items-center text-spiritual-brown/70">
                      <Calendar className="h-4 w-4 mr-1" /> {new Date(teaching.date).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-grow">
                    <p className="text-spiritual-brown/80">{teaching.description}</p>
                  </CardContent>
                  
                  <div className="p-4 pt-0 mt-auto">
                    <Button 
                      className="w-full bg-spiritual-gold hover:bg-spiritual-gold/90 text-white"
                      onClick={() => handleReadTeaching(teaching.id)}
                    >
                      <Book className="h-4 w-4 mr-2" /> Read Teaching
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
      
      <Footer className="w-full mt-auto" />

      {/* Teaching Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-sanskrit text-spiritual-brown">
              {selectedTeaching?.title}
            </DialogTitle>
            <DialogDescription className="flex flex-col sm:flex-row sm:justify-between text-spiritual-brown/70">
              <span className="flex items-center"><User className="h-4 w-4 mr-1" /> {selectedTeaching?.author}</span>
              <span className="flex items-center mt-1 sm:mt-0"><Calendar className="h-4 w-4 mr-1" /> {selectedTeaching && new Date(selectedTeaching.date).toLocaleDateString()}</span>
            </DialogDescription>
          </DialogHeader>
          
          <div className="my-4">
            <div className="bg-spiritual-sand/30 p-4 rounded-md">
              <div 
                className="prose prose-sm sm:prose max-w-none text-spiritual-brown/80"
                dangerouslySetInnerHTML={{ 
                  __html: selectedTeaching?.content
                    .split('\n').map(para => `<p>${para}</p>`).join('') || '' 
                }}
              />
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <DialogClose asChild>
              <Button variant="outline" className="mr-2">
                Close
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Teachings;
