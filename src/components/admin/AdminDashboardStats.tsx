
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Calendar, BookOpen, Heart } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  is_admin: boolean;
  email?: string;
}

const AdminDashboardStats = () => {
  const { data: profiles } = useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*');
      
      if (error) throw error;
      return data as Profile[];
    },
  });

  return (
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
  );
};

export default AdminDashboardStats;
