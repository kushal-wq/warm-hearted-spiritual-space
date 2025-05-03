
import React from 'react';
import { getTodaysBookings } from './utils/bookingUtils';
import { PriestBooking } from '@/types/priest';

// Importing the separated card components
import ScheduleCard from './cards/schedule/ScheduleCard';
import RitualsCard from './cards/rituals/RitualsCard';
import TeachingsCard from './cards/teachings/TeachingsCard';
import ProfileCard from './cards/profile/ProfileCard';

interface PriestDashboardCardsProps {
  setActiveTab: (tab: 'schedule' | 'rituals' | 'teachings' | 'profile') => void;
  bookings: PriestBooking[];
}

/**
 * Dashboard cards grid component that displays key information for priests
 */
const PriestDashboardCards = ({ setActiveTab, bookings }: PriestDashboardCardsProps) => {
  // Get today's bookings using our utility function
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
