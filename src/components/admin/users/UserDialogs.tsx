
import React, { useState, useEffect } from 'react';
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
import { Loader2 } from 'lucide-react';

const UserDialogs = ({ 
  dialogState, 
  setDialogState, 
  profiles,
  isProcessing,
  toggleAdminStatus,
  handlePriestApproval,
  revokePriestStatus
}) => {
  const [localProcessing, setLocalProcessing] = useState(false);
  const [operationCompleted, setOperationCompleted] = useState(false);
  const userId = dialogState.userId;
  const user = profiles?.find(u => u.id === userId);
  
  // Reset state when dialog opens or closes
  useEffect(() => {
    if (dialogState.type) {
      setOperationCompleted(false);
    }
  }, [dialogState.type]);
  
  const closeDialog = () => {
    console.log("Closing dialog");
    setDialogState({ type: null, userId: null });
    setOperationCompleted(false);
  };
  
  if (!dialogState.type) return null;

  // Custom approval handler with better state management
  const handleApprovalAction = async (status: 'approved' | 'rejected') => {
    if (userId) {
      setLocalProcessing(true);
      console.log(`Initiating ${status} action for user: ${userId}`);
      
      try {
        const success = await handlePriestApproval(userId, status);
        
        if (success) {
          console.log(`${status} operation completed successfully`);
          setOperationCompleted(true);
          // Show success state briefly before closing
          setTimeout(() => {
            closeDialog();
          }, 1500);
        } else {
          console.log(`${status} operation failed`);
        }
      } catch (error) {
        console.error(`Error during ${status} operation:`, error);
      } finally {
        setLocalProcessing(false);
      }
    }
  };

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
              {operationCompleted ? (
                <div className="py-4 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                    <svg className="h-6 w-6 text-green-600 dark:text-green-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="mt-3 text-lg font-medium text-gray-900 dark:text-gray-100">Action Completed</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    The priest status has been updated successfully
                  </p>
                </div>
              ) : (
                <>
                  <p>
                    {user?.first_name} {user?.last_name} ({user?.email || 'No email available'}) has applied to be a priest.
                  </p>
                  <p>Would you like to approve or reject this application?</p>
                </>
              )}
              
              {(isProcessing || localProcessing) && !operationCompleted && (
                <div className="py-3 px-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md">
                  <div className="flex items-center space-x-3">
                    <Loader2 className="h-4 w-4 animate-spin text-amber-700 dark:text-amber-300" />
                    <p className="text-amber-700 dark:text-amber-300 text-sm">
                      Processing request... This may take a moment.
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            {!operationCompleted && (
              <DialogFooter className="flex justify-between">
                <div className="flex gap-2">
                  <Button 
                    variant="destructive" 
                    onClick={() => handleApprovalAction('rejected')}
                    disabled={isProcessing || localProcessing}
                  >
                    {(isProcessing || localProcessing) ? (
                      <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Rejecting...</>
                    ) : 'Reject'}
                  </Button>
                  <Button 
                    onClick={() => handleApprovalAction('approved')}
                    disabled={isProcessing || localProcessing}
                  >
                    {(isProcessing || localProcessing) ? (
                      <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Approving...</>
                    ) : 'Approve'}
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  onClick={closeDialog} 
                  disabled={isProcessing || localProcessing}
                >
                  Cancel
                </Button>
              </DialogFooter>
            )}
          </>
        )}
        
        {/* Revoke Priest Status Dialog */}
        {dialogState.type === 'revoke-priest' && (
          <>
            <div className="space-y-4">
              <p>
                Are you sure you want to revoke the priest status from {user?.first_name} {user?.last_name} ({user?.email || 'No email available'})?
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
