
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UsersTab from './tabs/UsersTab';
import EventsTab from './tabs/EventsTab';
import TeachingsTab from './tabs/TeachingsTab';
import DonationsTab from './tabs/DonationsTab';
import { Users, Calendar, BookOpen, Gift } from 'lucide-react';

const AdminTabs = () => {
  return (
    <Tabs defaultValue="users" className="w-full animate-fade-in">
      <TabsList className="grid grid-cols-4 mb-8 bg-spiritual-sand/20 p-1 rounded-xl">
        <TabsTrigger value="users" className="data-[state=active]:bg-spiritual-gold data-[state=active]:text-white">
          <Users className="h-4 w-4 mr-2" />
          Users
        </TabsTrigger>
        <TabsTrigger value="events" className="data-[state=active]:bg-spiritual-gold data-[state=active]:text-white">
          <Calendar className="h-4 w-4 mr-2" />
          Events
        </TabsTrigger>
        <TabsTrigger value="teachings" className="data-[state=active]:bg-spiritual-gold data-[state=active]:text-white">
          <BookOpen className="h-4 w-4 mr-2" />
          Teachings
        </TabsTrigger>
        <TabsTrigger value="donations" className="data-[state=active]:bg-spiritual-gold data-[state=active]:text-white">
          <Gift className="h-4 w-4 mr-2" />
          Donations
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="users" className="animate-fade-in">
        <UsersTab />
      </TabsContent>
      
      <TabsContent value="events" className="animate-fade-in">
        <EventsTab />
      </TabsContent>
      
      <TabsContent value="teachings" className="animate-fade-in">
        <TeachingsTab />
      </TabsContent>
      
      <TabsContent value="donations" className="animate-fade-in">
        <DonationsTab />
      </TabsContent>
    </Tabs>
  );
};

export default AdminTabs;
