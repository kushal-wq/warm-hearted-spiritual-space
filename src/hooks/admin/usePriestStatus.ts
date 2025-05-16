
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

  // Function for priest approval with simplified robust implementation
  const handlePriestApproval = async (userId: string, status: 'approved' | 'rejected') => {
    try {
      setIsProcessing(true);
      console.log(`Approving priest with ID ${userId}, setting status to: ${status}`);
      
      // Use a transaction to ensure both operations succeed or fail together
      const { data, error } = await supabase
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
        // Delay slightly to ensure profile update is processed
        await new Promise(resolve => setTimeout(resolve, 500));
        
        try {
          await createPriestProfile(userId);
          console.log("Priest profile created successfully");
        } catch (profileError) {
          console.error("Error creating priest profile:", profileError);
          // Continue execution but log the error
          toast({
            variant: "destructive",
            title: "Warning",
            description: "Priest status updated but profile creation had an issue",
          });
        }
      }

      toast({
        title: "Success",
        description: `Priest application ${status === 'approved' ? 'approved' : 'rejected'} successfully`,
      });
      
      // Force data refresh
      await refetchProfiles();
      
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
