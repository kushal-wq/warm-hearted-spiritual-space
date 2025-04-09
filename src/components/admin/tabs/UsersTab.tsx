import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Search, RefreshCw, Mail, User, Check, X, Clock, UserCheck } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
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
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  is_admin: boolean;
  is_priest: boolean;
  priest_status: 'pending' | 'approved' | 'rejected' | null;
  email?: string;
  avatar_url?: string | null;
  created_at?: string;
  updated_at?: string;
}

// Define an interface for the auth user structure
interface AuthUser {
  id: string;
  email?: string;
}

const UsersTab = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [dialogType, setDialogType] = useState<'approve' | 'reject' | 'admin' | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'priests' | 'pending'>('all');

  // Fetch user profiles with admin status
  const { data: profiles, isLoading: profilesLoading, refetch: refetchProfiles } = useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      try {
        // First get profiles
        const { data: profiles, error } = await supabase
          .from('profiles')
          .select('*');
        
        if (error) throw error;
        
        // Then get user emails
        const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
        if (authError) {
          console.error("Could not fetch auth users:", authError);
          return profiles as unknown as Profile[];
        }
        
        // Combine the data
        const combinedData = profiles.map(profile => {
          const authUser = (authUsers.users as AuthUser[]).find(u => u.id === profile.id);
          return {
            ...profile,
            email: authUser?.email || 'Unknown',
            is_priest: profile.is_priest || false,
            priest_status: profile.priest_status || null
          };
        });
        
        return combinedData as unknown as Profile[];
      } catch (error) {
        console.error("Error fetching profiles:", error);
        return [] as Profile[];
      }
    }
  });

  // Toggle admin status
  const toggleAdminStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_admin: !currentStatus })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Admin status ${!currentStatus ? 'granted' : 'revoked'} successfully`,
      });
      
      refetchProfiles();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update admin status",
      });
    }
  };

  // Handle priest approval
  const handlePriestApproval = async (userId: string, status: 'approved' | 'rejected') => {
    try {
      const updateData: { 
        priest_status: 'approved' | 'rejected'; 
        is_priest: boolean 
      } = {
        priest_status: status,
        is_priest: status === 'approved'
      };

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Priest application ${status === 'approved' ? 'approved' : 'rejected'} successfully`,
      });
      
      setDialogType(null);
      refetchProfiles();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update priest status",
      });
    }
  };

  // Filter and sort users based on search term and active tab
  const filteredProfiles = profiles?.filter(profile => {
    // First apply search term filter
    const matchesSearch = searchTerm 
      ? (profile.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
         profile.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         profile.email?.toLowerCase().includes(searchTerm.toLowerCase()))
      : true;
    
    // Then apply tab filter
    switch (activeTab) {
      case 'priests':
        return matchesSearch && profile.is_priest;
      case 'pending':
        return matchesSearch && profile.priest_status === 'pending';
      default:
        return matchesSearch;
    }
  });

  // Count pending priest applications
  const pendingCount = profiles?.filter(p => p.priest_status === 'pending').length || 0;

  return (
    <Card className="shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="bg-spiritual-cream/30 dark:bg-gray-800/50 rounded-t-lg border-b border-gray-100 dark:border-gray-800">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <CardTitle className="text-spiritual-brown dark:text-spiritual-cream font-sanskrit">User Management</CardTitle>
            <CardDescription className="text-spiritual-brown/70 dark:text-spiritual-cream/70">
              View and manage your platform users
            </CardDescription>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full sm:w-auto min-w-[200px] bg-white dark:bg-gray-800"
              />
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => refetchProfiles()}
              className="text-spiritual-brown dark:text-spiritual-cream"
            >
              <RefreshCw className="h-4 w-4 mr-2" /> Refresh
            </Button>
          </div>
        </div>
      </CardHeader>

      <div className="p-4 bg-gray-50 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-700">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'all' | 'priests' | 'pending')}>
          <TabsList className="grid grid-cols-3 max-w-md">
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="priests">
              Priests
            </TabsTrigger>
            <TabsTrigger value="pending" className="relative">
              Pending
              {pendingCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {pendingCount}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <CardContent className="p-0">
        {profilesLoading ? (
          <div className="py-10 text-center">
            <div className="inline-block rangoli-spinner"></div>
            <p className="mt-2 text-spiritual-brown/70 dark:text-spiritual-cream/70">Loading users...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-spiritual-cream/10 dark:hover:bg-gray-800/50">
                  <TableHead className="w-[200px]">Name</TableHead>
                  <TableHead className="w-[200px]">Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProfiles?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-spiritual-brown/70 dark:text-spiritual-cream/70">
                      <User className="h-8 w-8 mx-auto mb-2 opacity-30" />
                      {searchTerm ? 'No users match your search' : 'No users found'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProfiles?.map((profile) => (
                    <TableRow 
                      key={profile.id} 
                      className={`
                        hover:bg-spiritual-cream/10 dark:hover:bg-gray-800/50 transition-colors duration-150
                        ${profile.priest_status === 'pending' ? 'bg-amber-50/30 dark:bg-amber-900/10' : ''}
                      `}
                    >
                      <TableCell className="font-medium">
                        {profile.first_name || profile.last_name 
                          ? `${profile.first_name || ''} ${profile.last_name || ''}` 
                          : 'Unnamed User'
                        }
                      </TableCell>
                      <TableCell className="flex items-center">
                        <Mail className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
                        {profile.email}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {profile.is_admin && (
                            <Badge 
                              variant="outline" 
                              className="bg-spiritual-gold/20 text-spiritual-brown dark:text-spiritual-cream border-spiritual-gold/30 flex items-center"
                            >
                              <Shield className="h-3 w-3 mr-1" />
                              Admin
                            </Badge>
                          )}
                          
                          {profile.priest_status === 'pending' && (
                            <Badge 
                              variant="outline" 
                              className="bg-amber-50 text-amber-700 border-amber-200 flex items-center"
                            >
                              <Clock className="h-3 w-3 mr-1" />
                              Priest Request
                            </Badge>
                          )}
                          
                          {profile.priest_status === 'approved' && (
                            <Badge 
                              variant="outline" 
                              className="bg-green-50 text-green-700 border-green-200 flex items-center"
                            >
                              <UserCheck className="h-3 w-3 mr-1" />
                              Priest
                            </Badge>
                          )}
                          
                          {(!profile.is_admin && !profile.priest_status) && (
                            <Badge 
                              variant="outline" 
                              className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                            >
                              User
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-wrap justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => {
                              setSelectedUserId(profile.id);
                              setDialogType('admin');
                            }}
                            className={profile.is_admin 
                              ? "text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30" 
                              : "text-spiritual-gold hover:bg-spiritual-gold/10 hover:text-spiritual-gold"}
                          >
                            {profile.is_admin ? 'Revoke Admin' : 'Make Admin'}
                          </Button>
                          
                          {profile.priest_status === 'pending' && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedUserId(profile.id);
                                  setDialogType('approve');
                                }}
                                className="text-green-600 hover:bg-green-50 hover:text-green-700"
                              >
                                <Check className="h-4 w-4 mr-1" /> Approve
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedUserId(profile.id);
                                  setDialogType('reject');
                                }}
                                className="text-red-500 hover:bg-red-50 hover:text-red-600"
                              >
                                <X className="h-4 w-4 mr-1" /> Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
      
      {/* Confirm Admin Status Change Dialog */}
      <AlertDialog open={dialogType === 'admin' && !!selectedUserId} onOpenChange={() => dialogType === 'admin' && setDialogType(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {profiles?.find(p => p.id === selectedUserId)?.is_admin 
                ? 'Revoke Admin Status' 
                : 'Grant Admin Status'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {profiles?.find(p => p.id === selectedUserId)?.is_admin 
                ? 'Are you sure you want to remove admin privileges from this user?' 
                : 'Are you sure you want to grant admin privileges to this user?'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDialogType(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => {
                if (selectedUserId) {
                  const profile = profiles?.find(p => p.id === selectedUserId);
                  if (profile) {
                    toggleAdminStatus(selectedUserId, profile.is_admin);
                    setDialogType(null);
                  }
                }
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirm Priest Approval Dialog */}
      <AlertDialog open={dialogType === 'approve' && !!selectedUserId} onOpenChange={() => dialogType === 'approve' && setDialogType(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve Priest Request</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to approve this user as a priest? They will gain access to the priest dashboard and functionality.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDialogType(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => selectedUserId && handlePriestApproval(selectedUserId, 'approved')}
              className="bg-green-600 hover:bg-green-700"
            >
              Approve
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirm Priest Rejection Dialog */}
      <AlertDialog open={dialogType === 'reject' && !!selectedUserId} onOpenChange={() => dialogType === 'reject' && setDialogType(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Priest Request</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reject this user's request to become a priest?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDialogType(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => selectedUserId && handlePriestApproval(selectedUserId, 'rejected')}
              className="bg-red-600 hover:bg-red-700"
            >
              Reject
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default UsersTab;
