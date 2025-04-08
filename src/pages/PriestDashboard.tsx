
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
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

const PriestDashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'schedule' | 'rituals' | 'teachings' | 'profile'>('schedule');
  const [showAccessInstructions, setShowAccessInstructions] = useState(false);
  
  // Fetch the user's priest status
  const { data: priestStatus, isLoading: isLoadingPriestStatus } = useQuery({
    queryKey: ['priest-status', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('is_priest, priest_status')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      return data;
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
          variant: "warning"
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
      
      // Show access instructions on first visit (you could use localStorage to track this)
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
            <Button 
              onClick={() => navigate('/')}
              className="bg-spiritual-gold hover:bg-spiritual-gold/90"
            >
              Return to Home
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  return (
    <PriestLayout>
      <div className="space-y-8 animate-fade-in">
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
    </PriestLayout>
  );
};

export default PriestDashboard;
