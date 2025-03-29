
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Plus, Trash2 } from 'lucide-react';

const TeachingsTab = () => {
  return (
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
  );
};

export default TeachingsTab;
