
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, X, Shield, UserCheck, UserX } from 'lucide-react';
import { UserProfile } from '@/types/priest';
import { DialogState } from '../types';

interface UserActionButtonsProps {
  profile: UserProfile;
  isProcessing: boolean;
  setDialogState: React.Dispatch<React.SetStateAction<DialogState>>;
}

const UserActionButtons: React.FC<UserActionButtonsProps> = ({ 
  profile, 
  isProcessing, 
  setDialogState 
}) => {
  return (
    <div className="flex flex-wrap justify-end gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => {
          setDialogState({
            type: 'admin',
            userId: profile.id
          });
        }}
        className={profile.is_admin 
          ? "text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30" 
          : "text-spiritual-gold hover:bg-spiritual-gold/10 hover:text-spiritual-gold"}
        disabled={isProcessing}
      >
        {profile.is_admin ? 'Revoke Admin' : 'Make Admin'}
      </Button>
      
      {profile.priest_status === 'pending' && (
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setDialogState({
                type: 'approve',
                userId: profile.id
              });
            }}
            className="text-green-600 hover:bg-green-50 hover:text-green-700"
            disabled={isProcessing}
          >
            <Check className="h-4 w-4 mr-1" /> Approve
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setDialogState({
                type: 'reject',
                userId: profile.id
              });
            }}
            className="text-red-500 hover:bg-red-50 hover:text-red-600"
            disabled={isProcessing}
          >
            <X className="h-4 w-4 mr-1" /> Reject
          </Button>
        </>
      )}

      {profile.is_priest && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setDialogState({
              type: 'revoke-priest',
              userId: profile.id
            });
          }}
          className="text-red-500 hover:bg-red-50 hover:text-red-600"
          disabled={isProcessing}
        >
          <UserX className="h-4 w-4 mr-1" /> Revoke Priest
        </Button>
      )}
    </div>
  );
};

export default UserActionButtons;
