
import React from 'react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { UserProfile } from '@/types/priest';
import { DialogState } from '../types';

interface UserDialogsProps {
  dialogState: DialogState;
  setDialogState: React.Dispatch<React.SetStateAction<DialogState>>;
  profiles: UserProfile[] | undefined;
  isProcessing: boolean;
  toggleAdminStatus: (userId: string, currentStatus: boolean) => Promise<boolean>;
  handlePriestApproval: (userId: string, status: 'approved' | 'rejected') => Promise<boolean>;
  revokePriestStatus: (userId: string) => Promise<boolean>;
}

const UserDialogs: React.FC<UserDialogsProps> = ({
  dialogState,
  setDialogState,
  profiles,
  isProcessing,
  toggleAdminStatus,
  handlePriestApproval,
  revokePriestStatus
}) => {
  const { type, userId } = dialogState;
  const profile = profiles?.find(p => p.id === userId);
  
  const closeDialog = () => {
    if (!isProcessing) {
      setDialogState({ type: null, userId: null });
    }
  };

  return (
    <>
      <AlertDialog open={type === 'admin' && !!userId} onOpenChange={closeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {profile?.is_admin 
                ? 'Revoke Admin Status' 
                : 'Grant Admin Status'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {profile?.is_admin 
                ? 'Are you sure you want to remove admin privileges from this user?' 
                : 'Are you sure you want to grant admin privileges to this user?'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeDialog} disabled={isProcessing}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={async () => {
                if (userId && profile) {
                  const success = await toggleAdminStatus(userId, profile.is_admin || false);
                  if (success) {
                    closeDialog();
                  }
                }
              }}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Confirm'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={type === 'approve' && !!userId} onOpenChange={closeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve Priest Request</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to approve this user as a priest? They will gain access to the priest dashboard and functionality.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeDialog} disabled={isProcessing}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={async () => {
                if (userId) {
                  console.log("Approving priest with ID:", userId);
                  const success = await handlePriestApproval(userId, 'approved');
                  console.log("Approval result:", success);
                  if (success) {
                    closeDialog();
                  }
                }
              }}
              className="bg-green-600 hover:bg-green-700"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Approve'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={type === 'reject' && !!userId} onOpenChange={closeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Priest Request</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reject this user's request to become a priest?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeDialog} disabled={isProcessing}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={async () => {
                if (userId) {
                  const success = await handlePriestApproval(userId, 'rejected');
                  if (success) {
                    closeDialog();
                  }
                }
              }}
              className="bg-red-600 hover:bg-red-700"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Reject'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={type === 'revoke-priest' && !!userId} onOpenChange={closeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Revoke Priest Status</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to revoke priest status from this user? They will lose access to the priest dashboard and functionality.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeDialog} disabled={isProcessing}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={async () => {
                if (userId) {
                  const success = await revokePriestStatus(userId);
                  if (success) {
                    closeDialog();
                  }
                }
              }}
              className="bg-red-600 hover:bg-red-700"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Revoke Status'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UserDialogs;
