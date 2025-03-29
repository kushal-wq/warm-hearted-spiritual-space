
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>View and manage your platform users</CardDescription>
      </CardHeader>
      <CardContent>
        {profilesLoading ? (
          <div className="py-10 text-center">
            <div className="inline-block animate-spin h-8 w-8 border-4 border-spiritual-gold border-t-transparent rounded-full"></div>
            <p className="mt-2 text-spiritual-brown/70">Loading users...</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Admin Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles?.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell>{profile.first_name} {profile.last_name}</TableCell>
                  <TableCell>{profile.email}</TableCell>
                  <TableCell>
                    {profile.is_admin ? (
                      <span className="px-2 py-1 bg-spiritual-gold/20 text-spiritual-brown rounded-full text-xs inline-flex items-center">
                        <Shield className="h-3 w-3 mr-1" />
                        Admin
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        User
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => toggleAdminStatus(profile.id, profile.is_admin)}
                      >
                        {profile.is_admin ? 'Revoke Admin' : 'Make Admin'}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default UsersTab;
