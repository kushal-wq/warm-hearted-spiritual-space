
import { useQueryClient } from '@tanstack/react-query';
import { ProcessingState, ProfilesState } from './types';
import { usePriestStatus } from './usePriestStatus';
import { usePriestRevocation } from './usePriestRevocation';

export const usePriestManagement = (
  processingState: ProcessingState,
  profilesState: ProfilesState
) => {
  const queryClient = useQueryClient();
  
  // Priest status management (approve/reject)
  const { handlePriestApproval } = usePriestStatus(processingState, profilesState);
  
  // Priest revocation
  const { revokePriestStatus } = usePriestRevocation(processingState, profilesState);

  // Function to invalidate queries after status changes
  const invalidatePriestQueries = async () => {
    console.log("Invalidating queries to refresh UI data");
    
    try {
      // Invalidate all relevant queries
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['profiles'] }),
        queryClient.invalidateQueries({ queryKey: ['priest-status'] }),
        queryClient.invalidateQueries({ queryKey: ['priest-profile'] }),
        queryClient.invalidateQueries({ queryKey: ['priest-bookings'] })
      ]);
      
      // Wait for database consistency
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Force immediate refetch of profiles
      console.log("Forcing profiles refetch");
      await profilesState.refetchProfiles();
      
      console.log("Data refresh completed successfully");
    } catch (error) {
      console.error("Error during data refresh:", error);
    }
  };

  // Wrap the handlePriestApproval to include query invalidation
  const handlePriestApprovalWithRefresh = async (userId: string, status: 'approved' | 'rejected') => {
    console.log(`Starting priest approval process for user ${userId} with status ${status}`);
    const success = await handlePriestApproval(userId, status);
    
    if (success) {
      console.log("Approval successful, refreshing data...");
      await invalidatePriestQueries();
      
      // Double-check the status was updated
      const updatedProfile = profilesState.profiles?.find(p => p.id === userId);
      console.log("Updated profile after refresh:", updatedProfile);
    } else {
      console.log("Approval failed, not refreshing data");
    }
    
    return success;
  };

  // Wrap revokePriestStatus to include query invalidation
  const revokePriestStatusWithRefresh = async (userId: string) => {
    console.log(`Starting priest revocation process for user ${userId}`);
    const success = await revokePriestStatus(userId);
    
    if (success) {
      console.log("Revocation successful, refreshing data...");
      await invalidatePriestQueries();
    } else {
      console.log("Revocation failed, not refreshing data");
    }
    
    return success;
  };

  return {
    handlePriestApproval: handlePriestApprovalWithRefresh,
    revokePriestStatus: revokePriestStatusWithRefresh
  };
};
