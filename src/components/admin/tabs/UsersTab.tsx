
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Search, RefreshCw, Mail, User } from 'lucide-react';
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

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  is_admin: boolean;
  email?: string;
}

// Define an interface for the auth user structure
interface AuthUser {
  id: string;
  email?: string;
}

const UsersTab = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch user profiles with admin status
  const { data: profiles, isLoading: profilesLoading, refetch: refetchProfiles } = useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      // First get profiles
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*');
      
      if (error) throw error;
      
      // Then get user emails
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      if (authError) {
        console.error("Could not fetch auth users:", authError);
        return profiles as Profile[];
      }
      
      // Combine the data
      // Use a type assertion to help TypeScript understand the shape of authUsers.users
      const combinedData = profiles.map(profile => {
        const authUser = (authUsers.users as AuthUser[]).find(u => u.id === profile.id);
        return {
          ...profile,
          email: authUser?.email || 'Unknown'
        };
      });
      
      return combinedData as Profile[];
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

  // Filter users based on search term
  const filteredProfiles = searchTerm 
    ? profiles?.filter(profile => 
        (profile.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        profile.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.email?.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : profiles;

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
                  <TableHead>Admin Status</TableHead>
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
                      className="hover:bg-spiritual-cream/10 dark:hover:bg-gray-800/50 transition-colors duration-150"
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
                        {profile.is_admin ? (
                          <span className="px-2 py-1 bg-spiritual-gold/20 text-spiritual-brown dark:text-spiritual-cream rounded-full text-xs inline-flex items-center">
                            <Shield className="h-3 w-3 mr-1" />
                            Admin
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-xs">
                            User
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => toggleAdminStatus(profile.id, profile.is_admin)}
                          className={profile.is_admin 
                            ? "text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30" 
                            : "text-spiritual-gold hover:bg-spiritual-gold/10 hover:text-spiritual-gold"}
                        >
                          {profile.is_admin ? 'Revoke Admin' : 'Make Admin'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UsersTab;
