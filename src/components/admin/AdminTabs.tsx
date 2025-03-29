
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UsersTab from './tabs/UsersTab';
import EventsTab from './tabs/EventsTab';
import TeachingsTab from './tabs/TeachingsTab';
import DonationsTab from './tabs/DonationsTab';

const AdminTabs = () => {
  return (
    <Tabs defaultValue="users" className="w-full">
      <TabsList className="grid grid-cols-4 mb-6">
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="events">Events</TabsTrigger>
        <TabsTrigger value="teachings">Teachings</TabsTrigger>
        <TabsTrigger value="donations">Donations</TabsTrigger>
      </TabsList>
      
      <TabsContent value="users">
        <UsersTab />
      </TabsContent>
      
      <TabsContent value="events">
        <EventsTab />
      </TabsContent>
      
      <TabsContent value="teachings">
        <TeachingsTab />
      </TabsContent>
      
      <TabsContent value="donations">
        <DonationsTab />
      </TabsContent>
    </Tabs>
  );
};

export default AdminTabs;
