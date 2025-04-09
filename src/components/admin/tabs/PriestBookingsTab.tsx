
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, RefreshCw, Calendar, UserCheck } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { PriestBooking } from '@/types/priest';

const PriestBookingsTab = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch priest bookings with detailed information
  const { data: bookings, isLoading, refetch } = useQuery({
    queryKey: ['priest-bookings'],
    queryFn: async () => {
      try {
        const { data: bookingsData, error } = await supabase
          .from('priest_bookings')
          .select(`
            *,
            profiles:user_id (first_name, last_name, email),
            priest_profiles:priest_id (name, avatar_url)
          `);
        
        if (error) throw error;
        
        return bookingsData || [];
      } catch (error) {
        console.error("Error fetching priest bookings:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load priest bookings"
        });
        return [];
      }
    }
  });

  // Filter bookings based on search term
  const filteredBookings = searchTerm 
    ? bookings?.filter(booking => {
        // Safely access potentially undefined nested properties
        const firstName = booking.profiles?.first_name || '';
        const lastName = booking.profiles?.last_name || '';
        const priestName = booking.priest_profiles?.name || '';
        
        return firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          priestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.address.toLowerCase().includes(searchTerm.toLowerCase());
      })
    : bookings;

  // Function to get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Pending</Badge>;
      case 'confirmed':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Confirmed</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Function to safely get client name
  const getClientName = (booking: any) => {
    if (booking.profiles && booking.profiles.first_name && booking.profiles.last_name) {
      return `${booking.profiles.first_name} ${booking.profiles.last_name}`;
    }
    return 'Unknown User';
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="bg-spiritual-cream/30 dark:bg-gray-800/50 rounded-t-lg border-b border-gray-100 dark:border-gray-800">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <CardTitle className="text-spiritual-brown dark:text-spiritual-cream font-sanskrit">Priest Bookings</CardTitle>
            <CardDescription className="text-spiritual-brown/70 dark:text-spiritual-cream/70">
              View and manage all priest ceremony bookings
            </CardDescription>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full sm:w-auto min-w-[200px] bg-white dark:bg-gray-800"
              />
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => refetch()}
              className="text-spiritual-brown dark:text-spiritual-cream"
            >
              <RefreshCw className="h-4 w-4 mr-2" /> Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="py-10 text-center">
            <div className="inline-block rangoli-spinner"></div>
            <p className="mt-2 text-spiritual-brown/70 dark:text-spiritual-cream/70">Loading bookings...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-spiritual-cream/10 dark:hover:bg-gray-800/50">
                  <TableHead>Date</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Priest</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-spiritual-brown/70 dark:text-spiritual-cream/70">
                      <Calendar className="h-8 w-8 mx-auto mb-2 opacity-30" />
                      {searchTerm ? 'No bookings match your search' : 'No priest bookings found'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBookings?.map((booking: any) => (
                    <TableRow 
                      key={booking.id} 
                      className="hover:bg-spiritual-cream/10 dark:hover:bg-gray-800/50 transition-colors duration-150"
                    >
                      <TableCell>
                        {booking.booking_date ? format(new Date(booking.booking_date), 'MMM d, yyyy h:mm a') : 'N/A'}
                      </TableCell>
                      <TableCell>
                        {getClientName(booking)}
                      </TableCell>
                      <TableCell>
                        {booking.priest_profiles?.name || 'Unknown Priest'}
                      </TableCell>
                      <TableCell>
                        {booking.purpose}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {booking.address}
                      </TableCell>
                      <TableCell>
                        ₹{booking.price}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(booking.status)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PriestBookingsTab;
