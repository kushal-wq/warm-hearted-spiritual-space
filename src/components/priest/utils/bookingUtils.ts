
import { PriestBooking } from '@/types/priest';

export const getTodaysBookings = (bookings: PriestBooking[], limit: number = 2): PriestBooking[] => {
  const today = new Date().toISOString().split('T')[0];
  return bookings
    .filter(booking => booking.booking_date.startsWith(today))
    .slice(0, limit);
};
