
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Calendar, Clock, Book, Settings, Calendar as CalendarIcon, Users, BookOpen, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PriestLayout from '@/components/priest/PriestLayout';
import PriestSchedule from '@/components/priest/PriestSchedule';
import PriestRituals from '@/components/priest/PriestRituals';
import PriestTeachings from '@/components/priest/PriestTeachings';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Steps } from '@/components/ui/steps';

// Sample schedule data
const upcomingEvents = [
  {
    id: "1",
    title: "Morning Puja",
    date: "2025-04-07",
    time: "6:00 AM - 7:30 AM", 
    location: "Main Temple Hall"
  },
  {
    id: "2",
    title: "Vedic Chanting Session",
    date: "2025-04-07", 
    time: "10:00 AM - 11:30 AM",
    location: "Meditation Room"
  },
  {
    id: "3", 
    title: "Private Ceremony",
    date: "2025-04-08",
    time: "4:00 PM - 6:00 PM",
    location: "Family Residence, Sector 23"
  }
];

const PriestDashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'schedule' | 'rituals' | 'teachings'>('schedule');
  const [showAccessInstructions, setShowAccessInstructions] = useState(false);
  
  // In a real app, you would check if the user is a priest
  const isPriest = true; // This would come from user profile or a separate check
  
  useEffect(() => {
    if (!isLoading && !user) {
      toast({
        title: "Access Denied",
        description: "You need to log in to access the priest dashboard.",
        variant: "destructive"
      });
      navigate('/auth');
    }
  }, [user, isLoading, navigate, toast]);
  
  useEffect(() => {
    if (user) {
      toast({
        title: "Welcome to Priest Dashboard",
        description: "Manage your rituals, teachings, and schedule.",
      });
      
      // Show access instructions on first visit (you could use localStorage to track this)
      const firstVisit = localStorage.getItem('priest_dashboard_visited') === null;
      if (firstVisit) {
        setShowAccessInstructions(true);
        localStorage.setItem('priest_dashboard_visited', 'true');
      }
    }
  }, [user, toast]);
  
  // Loading state with animation
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-spiritual-cream/30 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="p-8 rounded-xl bg-white/60 dark:bg-gray-800/30 backdrop-blur-md shadow-lg flex flex-col items-center border border-white/40 dark:border-gray-700/30">
          <div className="text-spiritual-gold">
            <Loader2 className="h-12 w-12 animate-spin mb-4" />
          </div>
          <p className="text-spiritual-brown dark:text-gray-200 font-sanskrit text-xl">Loading Priest Dashboard...</p>
          <p className="text-spiritual-brown/70 dark:text-gray-400 text-sm mt-2">Please wait</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return null; // Redirect handled in useEffect
  }
  
  return (
    <PriestLayout>
      <div className="space-y-8 animate-fade-in">
        {showAccessInstructions && (
          <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800/30">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500" />
            <AlertTitle className="text-amber-800 dark:text-amber-400">Accessing the Priest Dashboard</AlertTitle>
            <AlertDescription className="text-amber-700 dark:text-amber-300 mt-2">
              <p className="mb-4">To access the Priest Dashboard, follow these steps:</p>
              
              <ol className="list-decimal pl-5 space-y-2">
                <li>Sign in with your priest account credentials or Google authentication</li>
                <li>Navigate to the Priest Dashboard from the user dropdown in the top right</li>
                <li>Request admin approval if this is your first time accessing priestly functions</li>
                <li>Explore the schedule, rituals, and teachings sections using the tabs below</li>
              </ol>
              
              <div className="mt-5 flex justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => setShowAccessInstructions(false)}
                  className="text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700"
                >
                  Got it
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}
      
        {/* Priest dashboard overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="bg-amber-50 dark:bg-amber-900/20">
              <CardTitle className="flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5 text-spiritual-gold" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                {upcomingEvents.slice(0, 2).map((event) => (
                  <li key={event.id} className="border-b pb-2 last:border-0">
                    <p className="font-medium">{event.title}</p>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Clock className="h-4 w-4 mr-1" />
                      {event.time}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {event.location}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full text-spiritual-gold" onClick={() => setActiveTab('schedule')}>
                View Full Schedule
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="bg-orange-50 dark:bg-orange-900/20">
              <CardTitle className="flex items-center">
                <Book className="mr-2 h-5 w-5 text-spiritual-gold" />
                Ritual Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-3">Access ritual manuals, prayers, and procedures for various ceremonies.</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center p-2 bg-orange-50/50 rounded-md">
                  <p className="text-sm font-medium">Vedic</p>
                  <p className="text-xs text-muted-foreground">22 rituals</p>
                </div>
                <div className="text-center p-2 bg-orange-50/50 rounded-md">
                  <p className="text-sm font-medium">Tantric</p>
                  <p className="text-xs text-muted-foreground">14 rituals</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full text-spiritual-gold" onClick={() => setActiveTab('rituals')}>
                Browse Rituals
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="bg-sky-50 dark:bg-sky-900/20">
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-spiritual-gold" />
                Teaching Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-3">Access teaching materials and prepare your spiritual lessons.</p>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Recent uploads:</span>
                <span className="text-xs bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full">3 new</span>
              </div>
              <p className="text-sm">Bhagavad Gita Chapter 12 Commentary</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full text-spiritual-gold" onClick={() => setActiveTab('teachings')}>
                View Resources
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Selected tab content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="space-x-2">
              <Button 
                variant={activeTab === 'schedule' ? 'default' : 'outline'} 
                onClick={() => setActiveTab('schedule')}
                className={activeTab === 'schedule' ? 'bg-spiritual-gold hover:bg-spiritual-gold/90' : ''}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </Button>
              <Button 
                variant={activeTab === 'rituals' ? 'default' : 'outline'} 
                onClick={() => setActiveTab('rituals')}
                className={activeTab === 'rituals' ? 'bg-spiritual-gold hover:bg-spiritual-gold/90' : ''}
              >
                <Book className="h-4 w-4 mr-2" />
                Rituals
              </Button>
              <Button 
                variant={activeTab === 'teachings' ? 'default' : 'outline'} 
                onClick={() => setActiveTab('teachings')}
                className={activeTab === 'teachings' ? 'bg-spiritual-gold hover:bg-spiritual-gold/90' : ''}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Teachings
              </Button>
            </div>
            
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
          
          {activeTab === 'schedule' && <PriestSchedule />}
          {activeTab === 'rituals' && <PriestRituals />}
          {activeTab === 'teachings' && <PriestTeachings />}
        </div>
      </div>
    </PriestLayout>
  );
};

export default PriestDashboard;
