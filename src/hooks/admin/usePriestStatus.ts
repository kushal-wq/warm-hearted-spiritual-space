
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

  // Function for priest approval
  const handlePriestApproval = async (userId: string, status: 'approved' | 'rejected') => {
    try {
      setIsProcessing(true);
      console.log(`Approving priest with ID ${userId}, setting status to: ${status}`);
      
      // Define the proper parameters with correct types
      const params = {
        user_id: userId,
        new_status: status,
        is_priest_value: status === 'approved'
      };
      
      // Fix: Properly provide both type arguments for the RPC function
      const { data, error: directUpdateError } = await supabase.rpc<any, any>(
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
