
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminDashboardStats from '@/components/admin/AdminDashboardStats';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminTabs from '@/components/admin/AdminTabs';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin dashboard.",
        variant: "destructive"
      });
      navigate('/auth');
    }
  }, [user, isAdmin, isLoading, navigate, toast]);

  useEffect(() => {
    if (user && isAdmin) {
      toast({
        title: "Welcome to Admin Dashboard",
        description: "You now have access to manage your spiritual center.",
      });
    }
  }, [user, isAdmin, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-spiritual-cream/30 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="p-8 rounded-xl bg-white/60 dark:bg-gray-800/30 backdrop-blur-md shadow-lg flex flex-col items-center border border-white/40 dark:border-gray-700/30">
          <div className="animate-spin h-12 w-12 border-4 border-spiritual-gold border-t-transparent rounded-full mb-4"></div>
          <p className="text-spiritual-brown dark:text-gray-200 font-sanskrit text-xl">Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null; // Redirect handled in useEffect
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <AdminDashboardStats />
        <AdminTabs />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
