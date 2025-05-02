
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { UserProfile } from '@/types/priest';

export const useUserManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isProcessing, setIsProcessing] = useState(false);

  const { data: profiles, isLoading: profilesLoading, refetch: refetchProfiles } = useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      try {
        console.log("Fetching profiles data...");
        const { data: profiles, error } = await supabase
          .from('profiles')
          .select('*');
        
        if (error) throw error;
        
        console.log("Profiles data fetched:", profiles);
        
        const profilesWithEmails = await Promise.all(profiles.map(async (profile) => {
          try {
            const { data: { user }, error: userError } = await supabase.auth.admin.getUserById(profile.id);
            
            if (userError || !user) {
              console.log(`Couldn't fetch email for user ${profile.id}`, userError);
              return {
                ...profile,
                email: 'Unknown',
                is_priest: profile.is_priest || false,
                priest_status: profile.priest_status || null
              };
            }
            
            return {
              ...profile,
              email: user.email || 'Unknown',
              is_priest: profile.is_priest || false,
              priest_status: profile.priest_status || null
            };
          } catch (error) {
            console.error("Error fetching user email:", error);
            return {
              ...profile,
              email: 'Unknown',
              is_priest: profile.is_priest || false,
              priest_status: profile.priest_status || null
            };
          }
        }));
        
        console.log("Profiles with emails:", profilesWithEmails);
        return profilesWithEmails as UserProfile[];
      } catch (error) {
        console.error("Error fetching profiles:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load user profiles",
        });
        return [] as UserProfile[];
      }
    }
  });

  const toggleAdminStatus = async (userId: string, currentStatus: boolean) => {
    try {
      setIsProcessing(true);
      const { error } = await supabase
        .from('profiles')
        .update({ is_admin: !currentStatus })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Admin status ${!currentStatus ? 'granted' : 'revoked'} successfully`,
      });
      
      await refetchProfiles();
      setIsProcessing(false);
      return true;
    } catch (error: any) {
      setIsProcessing(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update admin status",
      });
      return false;
    }
  };

  const handlePriestApproval = async (userId: string, status: 'approved' | 'rejected') => {
    try {
      setIsProcessing(true);
      console.log(`Approving priest with ID ${userId}, setting status to: ${status}`);
      
      // Update user profile with priest status
      const updateData = {
        priest_status: status === 'approved' ? 'approved' : 'rejected',
        is_priest: status === 'approved' ? true : false  // Explicitly set to true if approved, false otherwise
      };

      console.log("Updating profile with data:", updateData);
      
      const { error: profileUpdateError } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', userId);

      if (profileUpdateError) {
        console.error("Error updating priest status:", profileUpdateError);
        throw profileUpdateError;
      }

      console.log("Profile updated successfully with status:", status);

      // If approving, create priest profile record
      if (status === 'approved') {
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
            
            try {
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
            } catch (insertError) {
              console.error("Error creating priest profile:", insertError);
              throw insertError;
            }
          } else {
            console.log("Priest profile already exists, skipping creation");
          }
        } catch (profileStepError: any) {
          console.error("Error in profile creation step:", profileStepError);
          // Rollback the profile update if priest profile creation fails
          await supabase
            .from('profiles')
            .update({ 
              priest_status: 'pending',
              is_priest: false
            })
            .eq('id', userId);
            
          throw profileStepError;
        }
      }

      // Force invalidate queries and fetch fresh data
      console.log("Invalidating queries to refresh UI data");
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
      queryClient.invalidateQueries({ queryKey: ['priest-status'] });
      queryClient.invalidateQueries({ queryKey: ['priest-profile'] });
      queryClient.invalidateQueries({ queryKey: ['priest-bookings'] });
      
      // Re-fetch immediately to ensure UI is updated
      console.log("Forcing data refresh");
      
      // Wait a brief moment for the database to settle - important for Supabase
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const refreshResult = await refetchProfiles();
      console.log("Data refresh result:", refreshResult);
      
      // Verify that the user status was updated correctly
      const updatedProfile = refreshResult?.data?.find((profile) => profile.id === userId);
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

  const handleRefresh = async () => {
    setIsProcessing(true);
    queryClient.invalidateQueries({ queryKey: ['profiles'] });
    await refetchProfiles();
    setIsProcessing(false);
    toast({
      title: "Refreshed",
      description: "User data has been updated"
    });
  };

  return {
    profiles,
    profilesLoading,
    isProcessing,
    setIsProcessing,
    toggleAdminStatus,
    handlePriestApproval,
    revokePriestStatus,
    handleRefresh,
    refetchProfiles
  };
};
