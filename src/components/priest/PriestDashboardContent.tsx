
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { usePriestDashboard } from '@/contexts/PriestDashboardContext';
import PriestDashboardHeader from './PriestDashboardHeader';
import PriestAccessInstructions from './PriestAccessInstructions';
import PriestDashboardCards from './PriestDashboardCards';
import PriestTabNavigation from './PriestTabNavigation';
import PriestHelpDialog from './PriestHelpDialog';

const PriestDashboardContent = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    activeTab,
    setActiveTab,
    showAccessInstructions,
    setShowAccessInstructions,
    priestStatus,
    priestBookings
  } = usePriestDashboard();

  useEffect(() => {
    if (!user) {
      toast({
        title: "Access Denied",
        description: "You need to log in to access the priest dashboard.",
        variant: "destructive"
      });
      navigate('/auth');
    }
  }, [user, navigate, toast]);

  useEffect(() => {
    // Allow admins to access priest dashboard regardless of priest status
    if (!isAdmin && priestStatus) {
      if (priestStatus.priest_status === 'pending') {
        toast({
          title: "Approval Pending",
          description: "Your priest account is pending approval by an administrator.",
          variant: "default"
        });
        navigate('/profile');
      } else if (priestStatus.priest_status === 'rejected') {
        toast({
          title: "Access Denied",
          description: "Your priest application was not approved.",
          variant: "destructive"
        });
        navigate('/profile');
      } else if (!priestStatus.is_priest) {
        toast({
          title: "Not a Priest",
          description: "You don't have priest privileges on this account.",
          variant: "destructive"
        });
        navigate('/profile');
      }
    }
  }, [priestStatus, navigate, toast, isAdmin]);

  return (
    <div className="space-y-8 animate-fade-in">
      <PriestDashboardHeader />

      {showAccessInstructions && (
        <PriestAccessInstructions onDismiss={() => setShowAccessInstructions(false)} />
      )}
    
      <PriestDashboardCards 
        setActiveTab={setActiveTab} 
        bookings={priestBookings} 
      />
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <PriestTabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <PriestHelpDialog />
    </div>
  );
};

export default PriestDashboardContent;
