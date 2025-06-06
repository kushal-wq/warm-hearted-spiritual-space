
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Calendar, BookOpen, Settings } from 'lucide-react';

type PriestTab = 'profile' | 'schedule' | 'teachings' | 'rituals';

interface PriestTabNavigationProps {
  activeTab: PriestTab;
  setActiveTab: React.Dispatch<React.SetStateAction<PriestTab>>;
}

const PriestTabNavigation: React.FC<PriestTabNavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as PriestTab)} className="w-full">
      <TabsList className="mb-4 flex justify-center space-x-4">
        <TabsTrigger value="profile" className="data-[state=active]:bg-spiritual-gold/20 data-[state=active]:text-spiritual-brown flex items-center space-x-2">
          <User className="h-4 w-4" />
          <span>Profile</span>
        </TabsTrigger>
        <TabsTrigger value="schedule" className="data-[state=active]:bg-spiritual-gold/20 data-[state=active]:text-spiritual-brown flex items-center space-x-2">
          <Calendar className="h-4 w-4" />
          <span>Schedule</span>
        </TabsTrigger>
        <TabsTrigger value="teachings" className="data-[state=active]:bg-spiritual-gold/20 data-[state=active]:text-spiritual-brown flex items-center space-x-2">
          <BookOpen className="h-4 w-4" />
          <span>Teachings</span>
        </TabsTrigger>
        <TabsTrigger value="rituals" className="data-[state=active]:bg-spiritual-gold/20 data-[state=active]:text-spiritual-brown flex items-center space-x-2">
          <Settings className="h-4 w-4" />
          <span>Rituals</span>
        </TabsTrigger>
      </TabsList>

      {activeTab === 'profile' && <div className="pt-4"><PriestProfile /></div>}
      {activeTab === 'schedule' && <div className="pt-4"><PriestSchedule /></div>}
      {activeTab === 'teachings' && <div className="pt-4"><PriestTeachings /></div>}
      {activeTab === 'rituals' && <div className="pt-4"><PriestRituals /></div>}
    </Tabs>
  );
};

// Import at the top
import PriestProfile from './PriestProfile';
import PriestSchedule from './PriestSchedule';
import PriestTeachings from './PriestTeachings';
import PriestRituals from './PriestRituals';

export default PriestTabNavigation;
