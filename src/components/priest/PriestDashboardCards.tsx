
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Book, Clock, Settings, Users, BookOpen } from 'lucide-react';

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

interface PriestDashboardCardsProps {
  setActiveTab: (tab: 'schedule' | 'rituals' | 'teachings' | 'profile') => void;
}

const PriestDashboardCards = ({ setActiveTab }: PriestDashboardCardsProps) => {
  return (
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

      <Card>
        <CardHeader className="bg-purple-50 dark:bg-purple-900/20">
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5 text-spiritual-gold" />
            Your Public Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-muted-foreground mb-3">Manage how you appear to users seeking your services.</p>
          <div className="text-sm">
            <p className="font-medium">Profile Visibility:</p>
            <p className="text-muted-foreground">Users can see your profile on the temple website</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full text-spiritual-gold" onClick={() => setActiveTab('profile')}>
            Edit Profile
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PriestDashboardCards;
