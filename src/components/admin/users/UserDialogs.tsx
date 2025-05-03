
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { DialogState, UserTabProps } from '../types';

const UserDialogs = ({ 
  dialogState, 
  setDialogState, 
  profiles,
  isProcessing,
  toggleAdminStatus,
  handlePriestApproval,
  revokePriestStatus
}) => {
  const userId = dialogState.userId;
  const user = profiles?.find(u => u.id === userId);
  
  const closeDialog = () => {
    console.log("Closing dialog");
    setDialogState({ type: null, userId: null });
  };
  
  if (!dialogState.type) return null;

  // Render different dialog content based on the dialog type
  return (
    <Dialog open={!!dialogState.type} onOpenChange={(open) => !open && closeDialog()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {dialogState.type === 'admin' 
              ? (user?.is_admin ? 'Revoke Admin Status' : 'Grant Admin Status') 
              : dialogState.type === 'priest' || dialogState.type === 'approve' || dialogState.type === 'reject'
                ? 'Priest Application' 
                : 'Revoke Priest Status'}
          </DialogTitle>
          <DialogDescription>
            {dialogState.type === 'admin' 
              ? (user?.is_admin 
                  ? `Revoke admin privileges from ${user?.first_name} ${user?.last_name}`
                  : `Grant admin privileges to ${user?.first_name} ${user?.last_name}`)
              : dialogState.type === 'priest' || dialogState.type === 'approve' || dialogState.type === 'reject'
                ? `Review priest application for ${user?.first_name} ${user?.last_name}`
                : `Revoke priest status from ${user?.first_name} ${user?.last_name}`}
          </DialogDescription>
        </DialogHeader>
        
        {/* Admin Status Dialog */}
        {dialogState.type === 'admin' && (
          <>
            <div className="space-y-4">
              <p>
                {user?.is_admin 
                  ? `Are you sure you want to revoke admin privileges from ${user?.first_name} ${user?.last_name} (${user?.email})?`
                  : `Are you sure you want to grant admin privileges to ${user?.first_name} ${user?.last_name} (${user?.email})?`
                }
              </p>
            </div>
            <DialogFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={closeDialog}
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button 
                variant={user?.is_admin ? "destructive" : "default"} 
                onClick={async () => {
                  if (userId) {
                    const success = await toggleAdminStatus(userId, !!user?.is_admin);
                    if (success) {
                      closeDialog();
                    }
                  }
                }}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : (user?.is_admin ? 'Revoke Admin' : 'Grant Admin')}
              </Button>
            </DialogFooter>
          </>
        )}
        
        {/* Priest Application Dialog */}
        {(dialogState.type === 'priest' || dialogState.type === 'approve' || dialogState.type === 'reject') && (
          <>
            <div className="space-y-4">
              <p>
                {user?.first_name} {user?.last_name} ({user?.email}) has applied to be a priest.
              </p>
              <p>Would you like to approve or reject this application?</p>
            </div>
            <DialogFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button 
                  variant="destructive" 
                  onClick={async () => {
                    if (userId) {
                      console.log("Rejecting priest with ID:", userId);
                      // Force a brief delay to ensure UI focus
                      await new Promise(resolve => setTimeout(resolve, 100));
                      const success = await handlePriestApproval(userId, 'rejected');
                      console.log("Rejection result:", success);
                      if (success) {
                        // Force a brief delay to allow the UI to update before closing the dialog
                        await new Promise(resolve => setTimeout(resolve, 500));
                        closeDialog();
                      }
                    }
                  }}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Reject'}
                </Button>
                <Button 
                  onClick={async () => {
                    if (userId) {
                      console.log("Approving priest with ID:", userId);
                      // Force a brief delay to ensure UI focus
                      await new Promise(resolve => setTimeout(resolve, 100));
                      const success = await handlePriestApproval(userId, 'approved');
                      console.log("Approval result:", success);
                      if (success) {
                        // Force a longer delay to allow database updates to complete
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        closeDialog();
                      }
                    }
                  }}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Approve'}
                </Button>
              </div>
              <Button variant="outline" onClick={closeDialog} disabled={isProcessing}>
                Cancel
              </Button>
            </DialogFooter>
          </>
        )}
        
        {/* Revoke Priest Status Dialog */}
        {dialogState.type === 'revoke-priest' && (
          <>
            <div className="space-y-4">
              <p>
                Are you sure you want to revoke the priest status from {user?.first_name} {user?.last_name} ({user?.email})?
              </p>
              <p>
                This action will remove all priest privileges from this user.
              </p>
            </div>
            <DialogFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={closeDialog}
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={async () => {
                  if (userId) {
                    const success = await revokePriestStatus(userId);
                    if (success) {
                      closeDialog();
                    }
                  }
                }}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Revoke Priest Status'}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserDialogs;
