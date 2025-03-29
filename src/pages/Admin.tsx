
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, Calendar, BookOpen, Heart, 
  Settings, Trash2, Edit, Plus, Shield
} from 'lucide-react';
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

const AdminDashboard = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
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
    },
    enabled: !!user && isAdmin
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

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate('/auth');
    }
  }, [user, isAdmin, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-spiritual-gold border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null; // Redirect handled in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-spiritual-cream/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold font-sanskrit text-spiritual-brown">Admin Dashboard</h1>
              <p className="text-spiritual-brown/70">Manage your spiritual center's content and users</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button>
                <Settings className="h-4 w-4 mr-2" /> Settings
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white/70">
              <CardContent className="flex items-center p-6">
                <div className="bg-spiritual-gold/20 p-3 rounded-lg mr-4">
                  <Users className="h-6 w-6 text-spiritual-gold" />
                </div>
                <div>
                  <p className="text-sm text-spiritual-brown/70">Total Users</p>
                  <p className="text-2xl font-bold text-spiritual-brown">{profiles?.length || 0}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/70">
              <CardContent className="flex items-center p-6">
                <div className="bg-spiritual-gold/20 p-3 rounded-lg mr-4">
                  <Calendar className="h-6 w-6 text-spiritual-gold" />
                </div>
                <div>
                  <p className="text-sm text-spiritual-brown/70">Upcoming Events</p>
                  <p className="text-2xl font-bold text-spiritual-brown">12</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/70">
              <CardContent className="flex items-center p-6">
                <div className="bg-spiritual-gold/20 p-3 rounded-lg mr-4">
                  <BookOpen className="h-6 w-6 text-spiritual-gold" />
                </div>
                <div>
                  <p className="text-sm text-spiritual-brown/70">Teachings</p>
                  <p className="text-2xl font-bold text-spiritual-brown">76</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/70">
              <CardContent className="flex items-center p-6">
                <div className="bg-spiritual-gold/20 p-3 rounded-lg mr-4">
                  <Heart className="h-6 w-6 text-spiritual-gold" />
                </div>
                <div>
                  <p className="text-sm text-spiritual-brown/70">Donations</p>
                  <p className="text-2xl font-bold text-spiritual-brown">$15,245</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="teachings">Teachings</TabsTrigger>
              <TabsTrigger value="donations">Donations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="users">
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
            </TabsContent>
            
            <TabsContent value="events">
              <Card>
                <CardHeader>
                  <CardTitle>Event Management</CardTitle>
                  <CardDescription>Manage upcoming and past events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end mb-4">
                    <Button className="bg-spiritual-gold hover:bg-spiritual-gold/90">
                      <Plus className="h-4 w-4 mr-2" /> Add New Event
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <Card key={i} className="bg-white/50">
                        <CardContent className="flex justify-between items-center p-4">
                          <div className="flex items-center">
                            <div className="bg-spiritual-sand/30 p-2 rounded-lg mr-4 w-12 h-12 flex items-center justify-center">
                              <Calendar className="h-6 w-6 text-spiritual-brown" />
                            </div>
                            <div>
                              <p className="font-medium text-spiritual-brown">Sacred Fire Ceremony</p>
                              <p className="text-sm text-spiritual-brown/70">Nov 21, 2023 • 5:30 AM</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-2" /> Edit
                            </Button>
                            <Button variant="outline" size="sm" className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" /> Delete
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="teachings">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Teachings Management</CardTitle>
                      <CardDescription>Manage your spiritual teachings and resources</CardDescription>
                    </div>
                    <Button className="bg-spiritual-gold hover:bg-spiritual-gold/90">
                      <Plus className="h-4 w-4 mr-2" /> Add New Teaching
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <Card key={i} className="bg-white/50">
                        <CardContent className="p-4">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-spiritual-brown">Understanding the Bhagavad Gita</h3>
                            <div className="text-xs bg-spiritual-gold/20 text-spiritual-brown px-2 py-1 rounded">
                              Scripture
                            </div>
                          </div>
                          <p className="text-sm text-spiritual-brown/70 mt-2">
                            An exploration of the timeless wisdom contained in the Bhagavad Gita...
                          </p>
                          <div className="flex justify-between mt-4">
                            <div className="text-xs text-spiritual-brown/60">
                              Published: June 15, 2023
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4 mr-2" /> Edit
                              </Button>
                              <Button variant="ghost" size="sm" className="text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" /> Delete
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="donations">
              <Card>
                <CardHeader>
                  <CardTitle>Donation Overview</CardTitle>
                  <CardDescription>Track and manage donations to your organization</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-white/50">
                        <CardContent className="p-4 text-center">
                          <p className="text-sm text-spiritual-brown/70">Total Donations</p>
                          <p className="text-2xl font-bold text-spiritual-brown">$15,245</p>
                          <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-white/50">
                        <CardContent className="p-4 text-center">
                          <p className="text-sm text-spiritual-brown/70">Average Donation</p>
                          <p className="text-2xl font-bold text-spiritual-brown">$108</p>
                          <p className="text-xs text-green-600 mt-1">↑ 5% from last month</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-white/50">
                        <CardContent className="p-4 text-center">
                          <p className="text-sm text-spiritual-brown/70">Total Donors</p>
                          <p className="text-2xl font-bold text-spiritual-brown">142</p>
                          <p className="text-xs text-green-600 mt-1">↑ 8% from last month</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card className="bg-white/50">
                      <CardHeader>
                        <CardTitle>Recent Donations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-spiritual-gold/10">
                                <th className="text-left p-2">Name</th>
                                <th className="text-left p-2">Amount</th>
                                <th className="text-left p-2">Date</th>
                                <th className="text-left p-2">Status</th>
                                <th className="text-left p-2">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="border-b border-spiritual-gold/10">
                                  <td className="p-2">Jane Smith</td>
                                  <td className="p-2">$108.00</td>
                                  <td className="p-2">Nov 15, 2023</td>
                                  <td className="p-2">
                                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                      Completed
                                    </span>
                                  </td>
                                  <td className="p-2">
                                    <Button variant="ghost" size="sm">View</Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
