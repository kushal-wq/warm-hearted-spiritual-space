
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ProcessingState, ProfilesState } from './types';
import { usePriestProfile } from './usePriestProfile';

export const usePriestStatus = (
  processingState: ProcessingState,
  profilesState: ProfilesState
) => {
  const { toast } = useToast();
  const { setIsProcessing } = processingState;
  const { refetchProfiles } = profilesState;
  const { createPriestProfile } = usePriestProfile();

  // Function for priest approval with improved refresh mechanism
  const handlePriestApproval = async (userId: string, status: 'approved' | 'rejected') => {
    try {
      setIsProcessing(true);
      console.log(`Approving priest with ID ${userId}, setting status to: ${status}`);
      
      // Update profile status directly in the database
      const { error } = await supabase
        .from('profiles')
        .update({
          priest_status: status,
          is_priest: status === 'approved'
        })
        .eq('id', userId);

      if (error) {
        console.error("Error updating priest status:", error);
        throw error;
      }

      console.log("Profile updated successfully with status:", status);
      
      // If approving, create priest profile record
      if (status === 'approved') {
        try {
          console.log("Creating priest profile for user:", userId);
          await createPriestProfile(userId);
          console.log("Priest profile created successfully");
        } catch (profileError) {
          console.error("Error creating priest profile:", profileError);
          toast({
            variant: "destructive",
            title: "Warning",
            description: "Priest status updated but profile creation had an issue",
          });
        }
      }

      // Force immediate data refresh with retry mechanism
      try {
        console.log("Starting profile data refresh...");
        await refetchProfiles();
        console.log("Profile data refreshed successfully");
      } catch (refreshError) {
        console.error("First profile refresh attempt failed:", refreshError);
        // Try once more after a short delay
        setTimeout(async () => {
          try {
            await refetchProfiles();
            console.log("Profile refresh retry succeeded");
          } catch (error) {
            console.error("Profile refresh retry also failed:", error);
          }
        }, 1000);
      }
      
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

  return {
    handlePriestApproval
  };
};
