
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Calendar, Heart, Book, Home, User, Gift, MessageCircle, LogIn, LogOut } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'About', path: '/about', icon: <User className="w-5 h-5" /> },
    { name: 'Services', path: '/services', icon: <Heart className="w-5 h-5" /> },
    { name: 'Events', path: '/events', icon: <Calendar className="w-5 h-5" /> },
    { name: 'Teachings', path: '/teachings', icon: <Book className="w-5 h-5" /> },
    { name: 'Donate', path: '/donate', icon: <Gift className="w-5 h-5" /> },
    { name: 'Contact', path: '/contact', icon: <MessageCircle className="w-5 h-5" /> },
  ];

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-spiritual-gold/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 bg-spiritual-gold rounded-full flex items-center justify-center">
                <span className="text-white font-sanskrit text-xl">ॐ</span>
              </div>
              <span className="ml-3 text-xl font-sanskrit text-spiritual-brown dark:text-white">Divine Guidance</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="flex items-center space-x-1 text-spiritual-brown dark:text-gray-200 hover:text-spiritual-gold transition-colors duration-300"
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
            
            <div className="ml-4 flex items-center space-x-2">
              <ThemeToggle />
              
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-9 w-9 border border-spiritual-gold/30">
                        <AvatarImage src="" alt={user.email || ''} />
                        <AvatarFallback className="bg-spiritual-sand text-spiritual-brown">
                          {user.email?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem onClick={() => navigate('/admin')}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Admin Dashboard</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/auth')}
                  className="text-spiritual-brown hover:text-spiritual-gold"
                >
                  <LogIn className="h-4 w-4 mr-2" /> Sign In
                </Button>
              )}
            </div>
          </div>
          
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button 
              onClick={toggleMenu}
              className="text-spiritual-brown dark:text-white hover:text-spiritual-gold"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-spiritual-gold/20">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="flex items-center space-x-3 px-3 py-3 rounded-md text-spiritual-brown dark:text-gray-200 hover:bg-spiritual-sand/30 dark:hover:bg-gray-700 hover:text-spiritual-gold"
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
            
            {user ? (
              <div className="px-3 py-3">
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar className="h-9 w-9 border border-spiritual-gold/30">
                    <AvatarImage src="" alt={user.email || ''} />
                    <AvatarFallback className="bg-spiritual-sand text-spiritual-brown">
                      {user.email?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-spiritual-brown dark:text-gray-200">{user.email}</p>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/profile')}
                  className="w-full justify-start mb-2"
                >
                  <User className="h-4 w-4 mr-2" /> Profile
                </Button>
                
                {isAdmin && (
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/admin')}
                    className="w-full justify-start mb-2"
                  >
                    <User className="h-4 w-4 mr-2" /> Admin Dashboard
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  onClick={handleSignOut}
                  className="w-full justify-start text-destructive"
                >
                  <LogOut className="h-4 w-4 mr-2" /> Log Out
                </Button>
              </div>
            ) : (
              <div className="px-3 py-3">
                <Button 
                  onClick={() => navigate('/auth')}
                  className="w-full bg-spiritual-gold hover:bg-spiritual-gold/90"
                >
                  <LogIn className="h-4 w-4 mr-2" /> Sign In
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
