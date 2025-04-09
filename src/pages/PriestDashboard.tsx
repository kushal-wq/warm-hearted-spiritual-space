
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2, HelpCircle } from 'lucide-react';
import PriestLayout from '@/components/priest/PriestLayout';
import PriestSchedule from '@/components/priest/PriestSchedule';
import PriestRituals from '@/components/priest/PriestRituals';
import PriestTeachings from '@/components/priest/PriestTeachings';
import PriestProfile from '@/components/priest/PriestProfile';
import PriestDashboardCards from '@/components/priest/PriestDashboardCards';
import PriestAccessInstructions from '@/components/priest/PriestAccessInstructions';
import PriestTabNavigation from '@/components/priest/PriestTabNavigation';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';

const PriestDashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'schedule' | 'rituals' | 'teachings' | 'profile'>('schedule');
  const [showAccessInstructions, setShowAccessInstructions] = useState(false);
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  
  // Fetch the user's priest status
  const { data: priestStatus, isLoading: isLoadingPriestStatus } = useQuery({
    queryKey: ['priest-status', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('is_priest, priest_status')
          .eq('id', user.id)
          .single();
        
        if (error) {
          console.error("Error fetching priest status:", error);
          return { is_priest: false, priest_status: null };
        }
        
        return data;
      } catch (err) {
        console.error("Error in priest status query:", err);
        return { is_priest: false, priest_status: null };
      }
    },
    enabled: !!user,
  });
  
  useEffect(() => {
    if (!isLoading && !user) {
      toast({
        title: "Access Denied",
        description: "You need to log in to access the priest dashboard.",
        variant: "destructive"
      });
      navigate('/auth');
    }
  }, [user, isLoading, navigate, toast]);
  
  useEffect(() => {
    // Check priest approval status when data is loaded
    if (!isLoadingPriestStatus && priestStatus) {
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
  }, [priestStatus, isLoadingPriestStatus, navigate, toast]);
  
  useEffect(() => {
    if (user && priestStatus?.is_priest && priestStatus?.priest_status === 'approved') {
      toast({
        title: "Welcome to Priest Dashboard",
        description: "Manage your rituals, teachings, and schedule.",
      });
      
      // Show access instructions on first visit
      const firstVisit = localStorage.getItem('priest_dashboard_visited') === null;
      if (firstVisit) {
        setShowAccessInstructions(true);
        localStorage.setItem('priest_dashboard_visited', 'true');
      }
    }
  }, [user, priestStatus, toast]);
  
  // Loading state with animation
  if (isLoading || isLoadingPriestStatus) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-spiritual-cream/30 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="p-8 rounded-xl bg-white/60 dark:bg-gray-800/30 backdrop-blur-md shadow-lg flex flex-col items-center border border-white/40 dark:border-gray-700/30">
          <div className="text-spiritual-gold">
            <Loader2 className="h-12 w-12 animate-spin mb-4" />
          </div>
          <p className="text-spiritual-brown dark:text-gray-200 font-sanskrit text-xl">Loading Priest Dashboard...</p>
          <p className="text-spiritual-brown/70 dark:text-gray-400 text-sm mt-2">Please wait</p>
        </div>
      </div>
    );
  }
  
  // Access denied if not an approved priest
  if (!user || !priestStatus?.is_priest || priestStatus?.priest_status !== 'approved') {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-secondary/30">
          <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-spiritual-brown mb-4">Access Restricted</h2>
            <p className="mb-6 text-gray-600">
              {!user ? "You need to sign in to access this page." :
              priestStatus?.priest_status === 'pending' ? "Your priest account is pending approval." :
              priestStatus?.priest_status === 'rejected' ? "Your priest application was not approved." :
              "You don't have priest privileges on this account."}
            </p>
            <div className="space-y-4">
              <Button 
                onClick={() => navigate('/auth')}
                className="w-full bg-spiritual-gold hover:bg-spiritual-gold/90"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate('/profile')}
                variant="outline"
                className="w-full"
              >
                Go to Profile
              </Button>
              <div className="text-sm text-gray-500 mt-4">
                <p>To access the priest dashboard:</p>
                <ol className="list-decimal list-inside text-left mt-2">
                  <li>Sign in to your account</li>
                  <li>Go to your profile page</li>
                  <li>Apply to become a priest</li>
                  <li>Wait for admin approval</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  return (
    <PriestLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-spiritual-brown dark:text-spiritual-cream">Priest Dashboard</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowHelpDialog(true)}
            className="flex items-center gap-1"
          >
            <HelpCircle className="h-4 w-4" />
            <span>Help</span>
          </Button>
        </div>

        {showAccessInstructions && (
          <PriestAccessInstructions onDismiss={() => setShowAccessInstructions(false)} />
        )}
      
        {/* Priest dashboard overview */}
        <PriestDashboardCards setActiveTab={setActiveTab} />
        
        {/* Selected tab content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <PriestTabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {activeTab === 'schedule' && <PriestSchedule />}
          {activeTab === 'rituals' && <PriestRituals />}
          {activeTab === 'teachings' && <PriestTeachings />}
          {activeTab === 'profile' && <PriestProfile />}
        </div>
      </div>

      {/* Help Dialog */}
      <Dialog open={showHelpDialog} onOpenChange={setShowHelpDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Priest Dashboard Help</DialogTitle>
            <DialogDescription>
              Here's how to use the priest dashboard
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-medium text-spiritual-brown dark:text-spiritual-cream">How to access the Priest Dashboard:</h3>
              <ol className="list-decimal pl-5 mt-2 space-y-1">
                <li>Sign in to your account</li>
                <li>Submit a priest application from your profile page</li>
                <li>Wait for an admin to approve your application</li>
                <li>Once approved, visit /priest or click "Priest Dashboard" from your profile</li>
              </ol>
            </div>
            
            <div>
              <h3 className="font-medium text-spiritual-brown dark:text-spiritual-cream">Managing Your Schedule:</h3>
              <p>Use the Schedule tab to view and manage booking requests from devotees.</p>
            </div>
            
            <div>
              <h3 className="font-medium text-spiritual-brown dark:text-spiritual-cream">Managing Rituals:</h3>
              <p>Use the Rituals tab to add, edit, and manage the ceremonies you can perform.</p>
            </div>
            
            <div>
              <h3 className="font-medium text-spiritual-brown dark:text-spiritual-cream">Teaching Content:</h3>
              <p>Use the Teachings tab to create and publish spiritual content for devotees.</p>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setShowHelpDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PriestLayout>
  );
};

export default PriestDashboard;
