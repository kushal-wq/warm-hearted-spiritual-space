
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Edit, Plus, Trash2 } from 'lucide-react';

const EventsTab = () => {
  return (
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
  );
};

export default EventsTab;
