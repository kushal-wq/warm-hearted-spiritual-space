
import React from 'react';
import { Calendar, Book, BookOpen, Users, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PriestTabNavigationProps {
  activeTab: 'schedule' | 'rituals' | 'teachings' | 'profile';
  setActiveTab: (tab: 'schedule' | 'rituals' | 'teachings' | 'profile') => void;
}

const PriestTabNavigation = ({ activeTab, setActiveTab }: PriestTabNavigationProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={activeTab === 'schedule' ? 'default' : 'outline'} 
          onClick={() => setActiveTab('schedule')}
          className={activeTab === 'schedule' ? 'bg-spiritual-gold hover:bg-spiritual-gold/90' : ''}
          size="sm"
        >
          <Calendar className="h-4 w-4 mr-2" />
          Schedule
        </Button>
        <Button 
          variant={activeTab === 'rituals' ? 'default' : 'outline'} 
          onClick={() => setActiveTab('rituals')}
          className={activeTab === 'rituals' ? 'bg-spiritual-gold hover:bg-spiritual-gold/90' : ''}
          size="sm"
        >
          <Book className="h-4 w-4 mr-2" />
          Rituals
        </Button>
        <Button 
          variant={activeTab === 'teachings' ? 'default' : 'outline'} 
          onClick={() => setActiveTab('teachings')}
          className={activeTab === 'teachings' ? 'bg-spiritual-gold hover:bg-spiritual-gold/90' : ''}
          size="sm"
        >
          <BookOpen className="h-4 w-4 mr-2" />
          Teachings
        </Button>
        <Button 
          variant={activeTab === 'profile' ? 'default' : 'outline'} 
          onClick={() => setActiveTab('profile')}
          className={activeTab === 'profile' ? 'bg-spiritual-gold hover:bg-spiritual-gold/90' : ''}
          size="sm"
        >
          <Users className="h-4 w-4 mr-2" />
          Profile
        </Button>
      </div>
      
      <Button variant="outline" size="icon">
        <Settings className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default PriestTabNavigation;
