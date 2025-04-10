
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, RefreshCw, Calendar, UserCheck, Eye } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
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
import { format, parseISO } from 'date-fns';
import { PriestBooking } from '@/types/priest';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Define a type that accounts for potential Supabase query errors
interface BookingWithRelations extends Omit<PriestBooking, 'profiles' | 'priest_profiles'> {
  profiles: {
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    avatar_url: string | null;
  } | null;
  priest_profiles: {
    name: string | null;
    avatar_url: string | null;
  } | null;
}

const PriestBookingsTab = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingWithRelations | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  // Fetch priest bookings with detailed information
  const { data: bookings, isLoading, refetch } = useQuery({
    queryKey: ['priest-bookings'],
    queryFn: async () => {
      try {
        console.log("Fetching priest bookings...");
        const { data: bookingsData, error } = await supabase
          .from('priest_bookings')
          .select(`
            *,
            profiles:user_id (first_name, last_name, email, avatar_url),
            priest_profiles:priest_id (name, avatar_url)
          `);
        
        if (error) {
          console.error("Error fetching priest bookings:", error);
          throw error;
        }
        
        console.log("Priest bookings fetched:", bookingsData);
        // Cast safely after ensuring no error
        return (bookingsData || []) as unknown as BookingWithRelations[];
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
        // Safely access potentially undefined or error nested properties
        let firstName = '';
        let lastName = '';
        let priestName = '';
        
        if (booking.profiles) {
          firstName = booking.profiles.first_name || '';
          lastName = booking.profiles.last_name || '';
        }
        
        if (booking.priest_profiles) {
          priestName = booking.priest_profiles.name || '';
        }
        
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
  const getClientName = (booking: BookingWithRelations) => {
    if (booking.profiles && booking.profiles.first_name && booking.profiles.last_name) {
      return `${booking.profiles.first_name} ${booking.profiles.last_name}`;
    }
    return 'Unknown User';
  };

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    queryClient.invalidateQueries({ queryKey: ['priest-bookings'] });
    refetch().finally(() => {
      setIsRefreshing(false);
      toast({
        title: "Refreshed",
        description: "Booking data has been updated"
      });
    });
  };

  // Format date helper
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM d, yyyy h:mm a');
    } catch (error) {
      console.error("Error formatting date:", dateString, error);
      return 'Invalid date';
    }
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
              onClick={handleRefresh}
              disabled={isRefreshing || isLoading}
              className="text-spiritual-brown dark:text-spiritual-cream"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${(isRefreshing || isLoading) ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading || isRefreshing ? (
          <div className="py-10 text-center">
            <div className="inline-block rangoli-spinner"></div>
            <p className="mt-2 text-spiritual-brown/70 dark:text-spiritual-cream/70">
              {isRefreshing ? 'Refreshing bookings...' : 'Loading bookings...'}
            </p>
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
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-spiritual-brown/70 dark:text-spiritual-cream/70">
                      <Calendar className="h-8 w-8 mx-auto mb-2 opacity-30" />
                      {searchTerm ? 'No bookings match your search' : 'No priest bookings found'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBookings?.map((booking: BookingWithRelations) => (
                    <TableRow 
                      key={booking.id} 
                      className={`
                        hover:bg-spiritual-cream/10 dark:hover:bg-gray-800/50 transition-colors duration-150
                        ${booking.status === 'pending' ? 'bg-amber-50/20 dark:bg-amber-900/10' : ''}
                        ${booking.status === 'confirmed' ? 'bg-blue-50/20 dark:bg-blue-900/10' : ''}
                        ${booking.status === 'completed' ? 'bg-green-50/20 dark:bg-green-900/10' : ''}
                        ${booking.status === 'cancelled' ? 'bg-red-50/20 dark:bg-red-900/10' : ''}
                      `}
                    >
                      <TableCell>
                        {booking.booking_date ? formatDate(booking.booking_date) : 'N/A'}
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
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedBooking(booking);
                            setShowDetailsDialog(true);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-1" /> Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

      {/* Booking Details Dialog */}
      {selectedBooking && (
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Booking Details</DialogTitle>
              <DialogDescription>
                Details for booking on {selectedBooking.booking_date ? formatDate(selectedBooking.booking_date) : 'N/A'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="text-sm font-medium">Client</h3>
                  <div className="flex items-center mt-1">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage 
                        src={selectedBooking.profiles?.avatar_url || ''} 
                        alt={getClientName(selectedBooking)} 
                      />
                      <AvatarFallback>
                        {getClientName(selectedBooking).substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{getClientName(selectedBooking)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="text-sm font-medium">Priest</h3>
                  <div className="flex items-center mt-1">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage 
                        src={selectedBooking.priest_profiles?.avatar_url || ''} 
                        alt={selectedBooking.priest_profiles?.name || ''} 
                      />
                      <AvatarFallback>
                        {(selectedBooking.priest_profiles?.name || 'UP').substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{selectedBooking.priest_profiles?.name || 'Unknown Priest'}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">Purpose</h3>
                  <p className="mt-1">{selectedBooking.purpose}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Status</h3>
                  <div className="mt-1">
                    {getStatusBadge(selectedBooking.status)}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Price</h3>
                  <p className="mt-1">₹{selectedBooking.price}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Date & Time</h3>
                  <p className="mt-1">{selectedBooking.booking_date ? formatDate(selectedBooking.booking_date) : 'N/A'}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium">Address</h3>
                <p className="mt-1">{selectedBooking.address}</p>
              </div>
              
              {selectedBooking.notes && (
                <div>
                  <h3 className="text-sm font-medium">Additional Notes</h3>
                  <p className="mt-1 text-sm">{selectedBooking.notes}</p>
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button onClick={() => setShowDetailsDialog(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
};

export default PriestBookingsTab;
