
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { PriestLocation, TrackingData, LocationUpdate } from '@/types/tracking';

export const usePriestTracking = (bookingId?: string) => {
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [priestLocation, setPriestLocation] = useState<PriestLocation | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Update priest location
  const updatePriestLocation = useCallback(async (
    priestId: string,
    bookingId: string,
    locationUpdate: LocationUpdate
  ) => {
    try {
      // Use raw SQL to insert into priest_locations table since it's not in types yet
      const { error } = await supabase.rpc('insert_priest_location', {
        p_priest_id: priestId,
        p_booking_id: bookingId,
        p_latitude: locationUpdate.latitude,
        p_longitude: locationUpdate.longitude,
        p_heading: locationUpdate.heading || null,
        p_speed: locationUpdate.speed || null,
        p_accuracy: locationUpdate.accuracy || null
      });

      if (error) {
        console.error('Error updating priest location:', error);
        // Fallback: try direct table access
        const { error: directError } = await supabase
          .from('priest_locations' as any)
          .insert({
            priest_id: priestId,
            booking_id: bookingId,
            latitude: locationUpdate.latitude,
            longitude: locationUpdate.longitude,
            heading: locationUpdate.heading,
            speed: locationUpdate.speed,
            accuracy: locationUpdate.accuracy
          });

        if (directError) throw directError;
      }

      console.log('Priest location updated successfully');
    } catch (error: any) {
      console.error('Error updating priest location:', error);
      toast({
        variant: "destructive",
        title: "Location Update Failed",
        description: "Failed to update priest location"
      });
    }
  }, [toast]);

  // Start journey
  const startJourney = useCallback(async (bookingId: string, estimatedArrival?: Date) => {
    try {
      const updates: any = {
        priest_started_journey: true
      };

      if (estimatedArrival) {
        updates.estimated_arrival = estimatedArrival.toISOString();
      }

      const { error } = await supabase
        .from('priest_bookings')
        .update(updates)
        .eq('id', bookingId);

      if (error) throw error;

      toast({
        title: "Journey Started",
        description: "Tracking has been enabled for this booking"
      });
    } catch (error: any) {
      console.error('Error starting journey:', error);
      toast({
        variant: "destructive",
        title: "Failed to Start Journey",
        description: error.message
      });
    }
  }, [toast]);

  // Fetch current tracking data
  const fetchTrackingData = useCallback(async (bookingId: string) => {
    if (!bookingId) return;

    setLoading(true);
    try {
      // Fetch booking data with priest info
      const { data: booking, error: bookingError } = await supabase
        .from('priest_bookings')
        .select(`
          *,
          priest_profiles:priest_id (
            id,
            name,
            avatar_url
          )
        `)
        .eq('id', bookingId)
        .single();

      if (bookingError) throw bookingError;

      // Try to fetch latest location - this might fail if table doesn't exist in types
      let location = null;
      try {
        const { data: locationData, error: locationError } = await supabase
          .from('priest_locations' as any)
          .select('*')
          .eq('booking_id', bookingId)
          .order('updated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (!locationError) {
          location = locationData;
        }
      } catch (err) {
        console.log('priest_locations table not accessible through types yet');
      }

      setTrackingData({
        booking_id: booking.id,
        priest_id: booking.priest_id,
        current_location: (booking as any).priest_current_location || undefined,
        estimated_arrival: (booking as any).estimated_arrival || undefined,
        priest_started_journey: (booking as any).priest_started_journey || false,
        status: booking.status
      });

      if (location) {
        setPriestLocation(location);
      }
    } catch (error: any) {
      console.error('Error fetching tracking data:', error);
      toast({
        variant: "destructive",
        title: "Failed to Load Tracking Data",
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Set up real-time subscriptions
  useEffect(() => {
    if (!bookingId) return;

    fetchTrackingData(bookingId);

    // Subscribe to booking updates
    const bookingChannel = supabase
      .channel('booking-updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'priest_bookings',
          filter: `id=eq.${bookingId}`
        },
        (payload) => {
          console.log('Booking updated:', payload);
          setTrackingData(prev => prev ? {
            ...prev,
            estimated_arrival: payload.new.estimated_arrival,
            priest_started_journey: payload.new.priest_started_journey,
            status: payload.new.status,
            current_location: payload.new.priest_current_location
          } : null);
        }
      )
      .subscribe();

    // Subscribe to location updates - this might not work until types are updated
    const locationChannel = supabase
      .channel('location-updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'priest_locations',
          filter: `booking_id=eq.${bookingId}`
        },
        (payload) => {
          console.log('Location updated:', payload);
          if (payload.new) {
            setPriestLocation(payload.new as PriestLocation);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(bookingChannel);
      supabase.removeChannel(locationChannel);
    };
  }, [bookingId, fetchTrackingData]);

  return {
    trackingData,
    priestLocation,
    isTracking,
    loading,
    updatePriestLocation,
    startJourney,
    fetchTrackingData
  };
};
