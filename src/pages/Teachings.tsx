
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, Calendar, User } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Mock data - in a real application, this would come from Supabase
const teachings = [
  {
    id: 1,
    title: "Understanding the Bhagavad Gita",
    author: "Swami Krishnananda",
    date: "2023-06-15",
    description: "An exploration of the timeless wisdom contained in the Bhagavad Gita and its relevance to modern life.",
    category: "Scripture",
    imageUrl: "/placeholder.svg"
  },
  {
    id: 2,
    title: "The Practice of Meditation",
    author: "Guru Ramdev",
    date: "2023-07-22",
    description: "A comprehensive guide to meditation techniques for spiritual growth and inner peace.",
    category: "Practices",
    imageUrl: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Karma Yoga: The Path of Action",
    author: "Swami Vivekananda",
    date: "2023-08-10",
    description: "Exploring the spiritual discipline of selfless action and service to others.",
    category: "Philosophy",
    imageUrl: "/placeholder.svg"
  },
  {
    id: 4,
    title: "The Sacred Meaning of Om",
    author: "Yogi Bhajan",
    date: "2023-09-05",
    description: "Diving deep into the cosmic sound and its spiritual significance across various traditions.",
    category: "Symbolism",
    imageUrl: "/placeholder.svg"
  },
  {
    id: 5,
    title: "Dharma in Daily Life",
    author: "Sadhguru",
    date: "2023-10-18",
    description: "Practical wisdom on how to align with your purpose and live righteously in the modern world.",
    category: "Lifestyle",
    imageUrl: "/placeholder.svg"
  },
  {
    id: 6,
    title: "The Power of Mantras",
    author: "Sri Sri Ravi Shankar",
    date: "2023-11-30",
    description: "Understanding the science behind sacred sounds and how they can transform consciousness.",
    category: "Practices",
    imageUrl: "/placeholder.svg"
  }
];

// In a real app, this would fetch from Supabase
const fetchTeachings = async () => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(teachings), 500);
  });
};

const Teachings = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['teachings'],
    queryFn: () => fetchTeachings()
  });

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
            ) : (
              data?.map((teaching: any) => (
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
                    <Button className="w-full bg-spiritual-gold hover:bg-spiritual-gold/90 text-white">
                      <Book className="h-4 w-4 mr-2" /> Read Teaching
                    </Button>
                  </div>
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

export default Teachings;
