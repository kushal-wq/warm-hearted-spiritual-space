
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
    queryClient.invalidateQueries({ queryKey: ['profiles'], exact: false });
    queryClient.invalidateQueries({ queryKey: ['priest-status'], exact: false });
    queryClient.invalidateQueries({ queryKey: ['priest-profile'], exact: false });
    queryClient.invalidateQueries({ queryKey: ['priest-bookings'], exact: false });
    
    // Wait for database consistency
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Force immediate refetch
    console.log("Forcing profiles refetch");
    const refreshResult = await profilesState.refetchProfiles();
    console.log("Profiles refetch result:", refreshResult);
  };

  // Wrap the handlePriestApproval to include query invalidation
  const handlePriestApprovalWithRefresh = async (userId: string, status: 'approved' | 'rejected') => {
    const success = await handlePriestApproval(userId, status);
    
    if (success) {
      await invalidatePriestQueries();
      
      // Double-check the status was updated
      const updatedProfile = profilesState.profiles?.find(p => p.id === userId);
      console.log("Updated profile after refresh:", updatedProfile);
    }
    
    return success;
  };

  // Wrap revokePriestStatus to include query invalidation
  const revokePriestStatusWithRefresh = async (userId: string) => {
    const success = await revokePriestStatus(userId);
    
    if (success) {
      await invalidatePriestQueries();
    }
    
    return success;
  };

  return {
    handlePriestApproval: handlePriestApprovalWithRefresh,
    revokePriestStatus: revokePriestStatusWithRefresh
  };
};
