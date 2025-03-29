
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Calendar, BookOpen, Heart, Settings, AlertTriangle } from 'lucide-react';

const AdminDashboard = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();

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
                  <p className="text-2xl font-bold text-spiritual-brown">1,245</p>
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
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Monitor the latest activities on your platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex justify-between items-center border-b pb-3 border-spiritual-gold/10">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-spiritual-sand flex items-center justify-center mr-3">
                        <Users className="h-4 w-4 text-spiritual-brown" />
                      </div>
                      <div>
                        <p className="text-spiritual-brown font-medium">User John Doe registered</p>
                        <p className="text-xs text-spiritual-brown/60">2 hours ago</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
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
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-spiritual-gold/10">
                          <th className="text-left p-2">Name</th>
                          <th className="text-left p-2">Email</th>
                          <th className="text-left p-2">Role</th>
                          <th className="text-left p-2">Joined</th>
                          <th className="text-left p-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <tr key={i} className="border-b border-spiritual-gold/10">
                            <td className="p-2">John Doe</td>
                            <td className="p-2">john.doe@example.com</td>
                            <td className="p-2">User</td>
                            <td className="p-2">May 15, 2023</td>
                            <td className="p-2">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">Edit</Button>
                                <Button variant="outline" size="sm" className="text-destructive">Delete</Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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
                      <Calendar className="h-4 w-4 mr-2" /> Add New Event
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
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm" className="text-destructive">Cancel</Button>
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
                      <BookOpen className="h-4 w-4 mr-2" /> Add New Teaching
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
                              <Button variant="ghost" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
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
