
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Settings, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gradient-to-b from-spiritual-cream/30 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-spiritual-gold/10 pb-6">
            <div className="flex items-center">
              <Link to="/" className="mr-4">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-spiritual-gold/10">
                  <ChevronLeft className="h-5 w-5 text-spiritual-brown" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold font-sanskrit text-spiritual-brown bg-gradient-to-r from-spiritual-brown to-spiritual-gold bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-spiritual-brown/70">
                  Manage your spiritual center's content and users
                </p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Button className="bg-spiritual-gold hover:bg-spiritual-gold/90 transition-all shadow-md hover:shadow-lg">
                <Settings className="h-4 w-4 mr-2" /> Settings
              </Button>
            </div>
          </div>
          
          <div className="bg-white/60 dark:bg-gray-800/30 backdrop-blur-md rounded-xl shadow-lg p-6 transition-all hover:shadow-xl border border-white/40 dark:border-gray-700/30">
            {children}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminLayout;
