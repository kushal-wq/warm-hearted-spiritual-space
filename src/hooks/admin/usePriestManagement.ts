
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ProcessingState, ProfilesState } from './types';

export const usePriestManagement = (
  processingState: ProcessingState,
  profilesState: ProfilesState
) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { setIsProcessing } = processingState;
  const { refetchProfiles } = profilesState;

  // Fixed function for priest approval
  const handlePriestApproval = async (userId: string, status: 'approved' | 'rejected') => {
    try {
      setIsProcessing(true);
      console.log(`Approving priest with ID ${userId}, setting status to: ${status}`);
      
      // Define the proper type for the RPC parameters
      type UpdatePriestStatusParams = {
        user_id: string;
        new_status: 'approved' | 'rejected';
        is_priest_value: boolean;
      };
      
      // Create properly typed parameters
      const params: UpdatePriestStatusParams = {
        user_id: userId,
        new_status: status,
        is_priest_value: status === 'approved'
      };
      
      // Fix the typing for the RPC call - using correct generic parameter order
      const { data, error: directUpdateError } = await supabase.rpc(
        'update_priest_status',
        params
      );

      if (directUpdateError) {
        console.error("Error using RPC for priest status update:", directUpdateError);
        
        // Fallback to regular update if RPC fails
        console.log("Falling back to regular update...");
        const { error: profileUpdateError } = await supabase
          .from('profiles')
          .update({
            priest_status: status,
            is_priest: status === 'approved'
          })
          .eq('id', userId);
  
        if (profileUpdateError) {
          console.error("Error updating priest status:", profileUpdateError);
          throw profileUpdateError;
        }
      }

      console.log("Profile updated successfully with status:", status);
      console.log("RPC update result:", data);

      // If approving, create priest profile record
      if (status === 'approved') {
        await createPriestProfile(userId);
      }

      // Force invalidate all queries and wait a moment for database consistency
      console.log("Invalidating queries to refresh UI data");
      queryClient.invalidateQueries({ queryKey: ['profiles'], exact: false });
      queryClient.invalidateQueries({ queryKey: ['priest-status'], exact: false });
      queryClient.invalidateQueries({ queryKey: ['priest-profile'], exact: false });
      queryClient.invalidateQueries({ queryKey: ['priest-bookings'], exact: false });
      
      // Wait for database consistency
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Force immediate refetch
      console.log("Forcing profiles refetch");
      const refreshResult = await refetchProfiles();
      console.log("Profiles refetch result:", refreshResult);
      
      // Double-check the status was updated
      const updatedProfile = refreshResult?.data?.find(p => p.id === userId);
      console.log("Updated profile after refresh:", updatedProfile);
      
      toast({
        title: "Success",
        description: `Priest application ${status === 'approved' ? 'approved' : 'rejected'} successfully`,
      });
      
      setIsProcessing(false);
      return true;
    } catch (error: any) {
      console.error("Error in handlePriestApproval:", error);
      setIsProcessing(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update priest status",
      });
      return false;
    }
  };

  // Helper function to create priest profile
  const createPriestProfile = async (userId: string) => {
    console.log("Creating priest profile for approved user");
    
    try {
      // Get user's name for the priest profile
      const { data: userProfile, error: profileError } = await supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', userId)
        .single();
      
      if (profileError) {
        console.error("Error fetching user profile:", profileError);
        throw profileError;
      }
      
      console.log("User profile fetched:", userProfile);
      
      // Check if priest profile already exists
      const { data: existingProfile, error: existingError } = await supabase
        .from('priest_profiles')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();
          
      if (existingError) {
        console.error("Error checking existing priest profile:", existingError);
        throw existingError;
      }
      
      console.log("Existing profile check result:", existingProfile);
          
      if (!existingProfile) {
        console.log("No existing profile found, creating new priest profile");
        
        // Create a new priest profile
        const priestProfileData = {
          user_id: userId,
          name: `${userProfile?.first_name || ''} ${userProfile?.last_name || ''}`.trim() || 'New Priest',
          description: 'Experienced priest specializing in traditional ceremonies.',
          specialties: ['Traditional Rituals', 'Meditation'],
          experience_years: 1,
          base_price: 100,
          avatar_url: '/placeholder.svg',
          availability: 'Weekends and evenings',
          location: 'Delhi'
        };
        
        console.log("Creating priest profile with data:", priestProfileData);
        
        const { data: newProfile, error: insertError } = await supabase
          .from('priest_profiles')
          .insert(priestProfileData)
          .select('*')
          .single();
        
        if (insertError) {
          console.error("Failed to create priest profile:", insertError);
          throw insertError;
        }
        
        console.log("New priest profile created successfully:", newProfile);
      } else {
        console.log("Priest profile already exists, skipping creation");
      }
    } catch (error) {
      console.error("Error in profile creation step:", error);
      throw error;
    }
  };

  const revokePriestStatus = async (userId: string) => {
    try {
      setIsProcessing(true);
      const { error } = await supabase
        .from('profiles')
        .update({ priest_status: null, is_priest: false })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Priest status revoked successfully",
      });
      
      await refetchProfiles();
      setIsProcessing(false);
      return true;
    } catch (error: any) {
      setIsProcessing(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to revoke priest status",
      });
      return false;
    }
  };

  return {
    handlePriestApproval,
    revokePriestStatus
  };
};
