
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminDashboardStats from '@/components/admin/AdminDashboardStats';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminTabs from '@/components/admin/AdminTabs';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Temporary mapbox token - in production this should be loaded from environment variables
mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZXRlc3QiLCJhIjoiY2xwMndtNnExMHVncDJpbXVpc2U1MXlsdSJ9.zXoDA7rQQgr5WgsoXuJWAg';

const AdminDashboard = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mapInitialized, setMapInitialized] = useState(false);

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin dashboard.",
        variant: "destructive"
      });
      navigate('/auth');
    }
  }, [user, isAdmin, isLoading, navigate, toast]);

  useEffect(() => {
    if (user && isAdmin) {
      toast({
        title: "Welcome to Admin Dashboard",
        description: "You now have access to manage your spiritual center.",
      });
    }
  }, [user, isAdmin, toast]);

  useEffect(() => {
    if (user && isAdmin && !mapInitialized && !isLoading) {
      // Initialize India-focused map
      const mapContainer = document.getElementById('admin-map-container');
      if (!mapContainer) return;
      
      try {
        const map = new mapboxgl.Map({
          container: 'admin-map-container',
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [78.9629, 20.5937], // India center coordinates
          zoom: 4
        });
        
        // Add navigation controls
        map.addControl(new mapboxgl.NavigationControl());
        
        // Add marker for example locations in India
        const locations = [
          { name: "Delhi Center", coordinates: [77.2090, 28.6139], color: "#E27D60" },
          { name: "Mumbai Center", coordinates: [72.8777, 19.0760], color: "#85CDCA" },
          { name: "Bangalore Center", coordinates: [77.5946, 12.9716], color: "#E8A87C" },
          { name: "Varanasi Center", coordinates: [83.0059, 25.3176], color: "#C38D9E" },
          { name: "Rishikesh Center", coordinates: [78.2676, 30.0869], color: "#41B3A3" }
        ];
        
        locations.forEach(location => {
          // Create a DOM element for the marker
          const el = document.createElement('div');
          el.className = 'location-marker';
          el.style.backgroundColor = location.color;
          el.style.width = '20px';
          el.style.height = '20px';
          el.style.borderRadius = '50%';
          el.style.boxShadow = '0 0 0 3px white';
          el.style.cursor = 'pointer';
          
          // Add marker to the map - Fix TypeScript error by using a tuple for coordinates
          new mapboxgl.Marker(el)
            .setLngLat(location.coordinates as [number, number])
            .setPopup(new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<p class="font-medium">${location.name}</p>`))
            .addTo(map);
        });
        
        setMapInitialized(true);
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    }
    
    return () => {
      // Cleanup map instance if needed
    };
  }, [user, isAdmin, isLoading, mapInitialized]);

  // Improved loading state with animation
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-spiritual-cream/30 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="p-8 rounded-xl bg-white/60 dark:bg-gray-800/30 backdrop-blur-md shadow-lg flex flex-col items-center border border-white/40 dark:border-gray-700/30">
          <div className="text-spiritual-gold">
            <Loader2 className="h-12 w-12 animate-spin mb-4" />
          </div>
          <p className="text-spiritual-brown dark:text-gray-200 font-sanskrit text-xl">Loading Admin Dashboard...</p>
          <p className="text-spiritual-brown/70 dark:text-gray-400 text-sm mt-2">Please wait while we prepare your dashboard</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null; // Redirect handled in useEffect
  }

  return (
    <AdminLayout>
      <div className="space-y-8 animate-fade-in">
        <AdminDashboardStats />
        
        {/* India Map */}
        <Card>
          <CardHeader>
            <CardTitle>Program Locations in India</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              id="admin-map-container" 
              className="w-full h-[400px] rounded-md overflow-hidden border border-gray-200"
            />
          </CardContent>
        </Card>
        
        <AdminTabs />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
