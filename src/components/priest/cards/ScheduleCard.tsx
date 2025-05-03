
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { PriestBooking } from '@/types/priest';

interface ScheduleCardProps {
  todaysBookings: PriestBooking[];
  onViewFullSchedule: () => void;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({ todaysBookings, onViewFullSchedule }) => {
  return (
    <Card>
      <CardHeader className="bg-amber-50 dark:bg-amber-900/20">
        <CardTitle className="flex items-center">
          <CalendarIcon className="mr-2 h-5 w-5 text-spiritual-gold" />
          Today's Schedule
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {todaysBookings.length > 0 ? (
          <ul className="space-y-4">
            {todaysBookings.map((booking) => (
              <li key={booking.id} className="border-b pb-2 last:border-0">
                <p className="font-medium">{booking.purpose}</p>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Clock className="h-4 w-4 mr-1" />
                  {new Date(booking.booking_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
                <div className="text-sm text-muted-foreground">
                  {booking.address}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No bookings scheduled for today.</p>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full text-spiritual-gold" onClick={onViewFullSchedule}>
          View Full Schedule
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ScheduleCard;
