
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Mail, Calendar, BookOpen, Gift } from 'lucide-react';
import UsersTab from '@/components/admin/tabs/UsersTab';
import ContactTab from '@/components/admin/tabs/ContactTab';
import EventsTab from '@/components/admin/tabs/EventsTab';
import TeachingsTab from '@/components/admin/tabs/TeachingsTab';
import DonationsTab from '@/components/admin/tabs/DonationsTab';

const AdminTabs = () => {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-6 flex flex-wrap justify-start gap-1 bg-spiritual-cream/10 dark:bg-gray-800/50 p-1 rounded-lg overflow-x-auto">
        <TabsTrigger 
          value="users" 
          className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-spiritual-brown dark:data-[state=active]:text-spiritual-cream"
        >
          <Users className="h-4 w-4" />
          <span className="hidden sm:inline">Users</span>
        </TabsTrigger>
        <TabsTrigger 
          value="contact" 
          className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-spiritual-brown dark:data-[state=active]:text-spiritual-cream"
        >
          <Mail className="h-4 w-4" />
          <span className="hidden sm:inline">Contact Submissions</span>
        </TabsTrigger>
        <TabsTrigger 
          value="events" 
          className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-spiritual-brown dark:data-[state=active]:text-spiritual-cream"
        >
          <Calendar className="h-4 w-4" />
          <span className="hidden sm:inline">Events</span>
        </TabsTrigger>
        <TabsTrigger 
          value="teachings" 
          className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-spiritual-brown dark:data-[state=active]:text-spiritual-cream"
        >
          <BookOpen className="h-4 w-4" />
          <span className="hidden sm:inline">Teachings</span>
        </TabsTrigger>
        <TabsTrigger 
          value="donations" 
          className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-spiritual-brown dark:data-[state=active]:text-spiritual-cream"
        >
          <Gift className="h-4 w-4" />
          <span className="hidden sm:inline">Donations</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="users" className="focus-visible:outline-none">
        <UsersTab />
      </TabsContent>
      
      <TabsContent value="contact" className="focus-visible:outline-none">
        <ContactTab />
      </TabsContent>
      
      <TabsContent value="events" className="focus-visible:outline-none">
        <EventsTab />
      </TabsContent>
      
      <TabsContent value="teachings" className="focus-visible:outline-none">
        <TeachingsTab />
      </TabsContent>
      
      <TabsContent value="donations" className="focus-visible:outline-none">
        <DonationsTab />
      </TabsContent>
    </Tabs>
  );
};

export default AdminTabs;
