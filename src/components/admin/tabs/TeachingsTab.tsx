
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { TeachingsAPI, Teaching } from '@/api/supabaseUtils';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

const TeachingsTab = () => {
  const { toast } = useToast();
  
  const { data: teachings = [], isLoading, refetch } = useQuery({
    queryKey: ['admin-teachings'],
    queryFn: TeachingsAPI.getAll
  });

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
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <Card key={i} className="bg-white/50 animate-pulse h-32">
                <CardContent className="p-4"></CardContent>
              </Card>
            ))
          ) : teachings.length === 0 ? (
            <p className="text-spiritual-brown/70 col-span-2 text-center py-8">No teachings found. Add your first teaching using the button above.</p>
          ) : (
            teachings.map((teaching) => (
              <Card key={teaching.id} className="bg-white/50">
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-spiritual-brown">{teaching.title}</h3>
                    <div className="text-xs bg-spiritual-gold/20 text-spiritual-brown px-2 py-1 rounded">
                      {teaching.category}
                    </div>
                  </div>
                  <p className="text-sm text-spiritual-brown/70 mt-2">
                    {teaching.description.length > 100 ? 
                      `${teaching.description.substring(0, 100)}...` : 
                      teaching.description}
                  </p>
                  <div className="flex justify-between mt-4">
                    <div className="text-xs text-spiritual-brown/60">
                      Published: {new Date(teaching.date).toLocaleDateString()}
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
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeachingsTab;
