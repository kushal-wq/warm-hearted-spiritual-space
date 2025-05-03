
import React from 'react';
import ScheduleCard from './cards/ScheduleCard';
import RitualsCard from './cards/RitualsCard';
import TeachingsCard from './cards/TeachingsCard';
import ProfileCard from './cards/ProfileCard';
import { getTodaysBookings } from './utils/bookingUtils';
import { PriestBooking } from '@/types/priest';

interface PriestDashboardCardsProps {
  setActiveTab: (tab: 'schedule' | 'rituals' | 'teachings' | 'profile') => void;
  bookings: PriestBooking[];
}

const PriestDashboardCards = ({ setActiveTab, bookings }: PriestDashboardCardsProps) => {
  // Get today's bookings using our utility
  const todaysBookings = getTodaysBookings(bookings);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ScheduleCard 
        todaysBookings={todaysBookings} 
        onViewFullSchedule={() => setActiveTab('schedule')} 
      />
      
      <RitualsCard 
        onViewRituals={() => setActiveTab('rituals')} 
      />
      
      <TeachingsCard 
        onViewTeachings={() => setActiveTab('teachings')} 
      />

      <ProfileCard 
        onViewProfile={() => setActiveTab('profile')} 
      />
    </div>
  );
};

export default PriestDashboardCards;
