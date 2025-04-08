
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

const PriestDashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'schedule' | 'rituals' | 'teachings' | 'profile'>('schedule');
  const [showAccessInstructions, setShowAccessInstructions] = useState(false);
  
  // In a real app, you would check if the user is a priest
  const isPriest = true; // This would come from user profile or a separate check
  
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
    if (user) {
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
  }, [user, toast]);
  
  // Loading state with animation
  if (isLoading) {
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
  
  if (!user) {
    return null; // Redirect handled in useEffect
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
