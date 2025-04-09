import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Loader2, UserCircle, LogOut, Shield } from 'lucide-react';
import PriestApplicationSection from '@/components/profile/PriestApplicationSection';
import { UserProfile } from '@/types/priest';

const Profile = () => {
  const { user, isLoading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  // Fetch profile data
  const { data: profile, isLoading: isProfileLoading, refetch: refetchProfile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      
      return data as unknown as UserProfile;
    },
    enabled: !!user,
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to view your profile',
        variant: 'destructive',
      });
      navigate('/auth');
    }
  }, [user, authLoading, navigate, toast]);

  // Set form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.first_name || '',
        lastName: profile.last_name || '',
      });
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: formData.firstName,
          last_name: formData.lastName,
        })
        .eq('id', user!.id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Your profile has been updated successfully',
      });

      refetchProfile();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Update failed',
        description: error.message || 'Failed to update profile. Please try again.',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Sign out failed',
        description: error.message || 'Failed to sign out. Please try again.',
      });
    }
  };

  if (authLoading || isProfileLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-secondary/30 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-spiritual-gold" />
            <p className="mt-4 text-lg text-spiritual-brown">Loading profile...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!user || !profile) {
    return null; // Redirect happens in useEffect
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-12 min-h-screen bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Sidebar */}
            <div className="w-full md:w-1/3">
              <Card>
                <CardHeader className="text-center">
                  <Avatar className="w-24 h-24 mx-auto">
                    <AvatarImage 
                      src={profile.avatar_url || undefined} 
                      alt={`${profile.first_name || ''} ${profile.last_name || ''}`} 
                    />
                    <AvatarFallback className="bg-spiritual-gold/20 text-spiritual-brown text-xl">
                      {profile.first_name?.[0] || ''}{profile.last_name?.[0] || ''}
                    </AvatarFallback>
                  </Avatar>
                  
                  <CardTitle className="mt-4">
                    {profile.first_name || profile.last_name 
                      ? `${profile.first_name || ''} ${profile.last_name || ''}`
                      : 'User'
                    }
                  </CardTitle>
                  
                  <div className="flex justify-center gap-1 mt-2">
                    {profile.is_admin && (
                      <div className="px-2 py-1 text-xs bg-spiritual-gold/20 text-spiritual-brown rounded-full flex items-center">
                        <Shield className="h-3 w-3 mr-1" />
                        Admin
                      </div>
                    )}
                    
                    {profile.is_priest && profile.priest_status === 'approved' && (
                      <div className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                        Priest
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex flex-col gap-1 text-sm">
                    <span className="text-gray-500">Email</span>
                    <span>{user.email}</span>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2 text-spiritual-brown"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </CardFooter>
              </Card>

              {/* Admin Dashboard Link */}
              {profile.is_admin && (
                <div className="mt-4">
                  <Button
                    onClick={() => navigate('/admin')}
                    className="w-full bg-spiritual-gold hover:bg-spiritual-gold/90"
                  >
                    <Shield className="mr-2 h-4 w-4" /> 
                    Admin Dashboard
                  </Button>
                </div>
              )}
              
              {/* Priest Dashboard Link */}
              {profile.is_priest && profile.priest_status === 'approved' && (
                <div className="mt-4">
                  <Button
                    onClick={() => navigate('/priest')}
                    className="w-full bg-spiritual-gold hover:bg-spiritual-gold/90"
                  >
                    <UserCircle className="mr-2 h-4 w-4" />
                    Priest Dashboard
                  </Button>
                </div>
              )}
            </div>
            
            {/* Main Content */}
            <div className="w-full md:w-2/3">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="profile" className="flex-1">Profile Settings</TabsTrigger>
                  <TabsTrigger value="priest" className="flex-1">Priest Application</TabsTrigger>
                  <TabsTrigger value="bookings" className="flex-1">My Bookings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>
                        Update your personal information.
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input 
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              placeholder="Enter your first name"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input 
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              placeholder="Enter your last name"
                            />
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <Button 
                            type="submit" 
                            className="bg-spiritual-gold hover:bg-spiritual-gold/90"
                            disabled={isUpdating}
                          >
                            {isUpdating ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                                Updating...
                              </>
                            ) : (
                              'Save Changes'
                            )}
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="priest">
                  <PriestApplicationSection 
                    userId={user.id} 
                    priestStatus={profile.priest_status}
                    refetchProfile={refetchProfile}
                  />
                </TabsContent>
                
                <TabsContent value="bookings">
                  <Card>
                    <CardHeader>
                      <CardTitle>My Bookings</CardTitle>
                      <CardDescription>
                        View and manage your service bookings.
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-center py-6 text-gray-500">
                        You don't have any bookings yet.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
