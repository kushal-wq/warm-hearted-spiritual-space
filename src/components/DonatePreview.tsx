
import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Smartphone, Landmark } from 'lucide-react';

const DonatePreview = () => {
  return (
    <div className="relative py-16">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618202133208-2907bebba9e1')] bg-cover bg-center">
        <div className="absolute inset-0 bg-spiritual-saffron/30 backdrop-blur-sm dark:bg-spiritual-peacock/50"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white font-sanskrit mb-2">Support Our Temple</h2>
          <p className="text-white/90 max-w-2xl mx-auto text-lg">
            Your generous contribution (दान) helps us continue providing spiritual guidance, 
            maintain our sacred spaces, and support community programs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="indian-card bg-white/90 dark:bg-gray-800/60 text-center">
            <div className="text-spiritual-saffron text-4xl mb-4 p-4">🪔</div>
            <h3 className="font-sanskrit text-xl text-foreground mb-2">Light a Diya</h3>
            <p className="text-muted-foreground mb-4">
              Offer a virtual lamp as a symbol of your prayer or intention.
            </p>
            <p className="font-medium text-foreground mb-6">₹251</p>
            <Link to="/donate" className="indian-button text-sm inline-block">
              Offer Now
            </Link>
          </div>
          
          <div className="indian-card bg-white/90 dark:bg-gray-800/60 text-center transform scale-105 border-2 border-spiritual-turmeric/50 dark:border-spiritual-turmeric/30">
            <div className="absolute top-0 right-0 bg-spiritual-turmeric text-white text-xs px-3 py-1 font-medium">Popular</div>
            <div className="text-spiritual-saffron text-4xl mb-4 p-4">🌟</div>
            <h3 className="font-sanskrit text-xl text-foreground mb-2">Monthly Seva</h3>
            <p className="text-muted-foreground mb-4">
              Become a monthly supporter and receive special blessings in your name.
            </p>
            <p className="font-medium text-foreground mb-6">₹1,108/month</p>
            <Link to="/donate" className="indian-button text-sm inline-block">
              Subscribe
            </Link>
          </div>
          
          <div className="indian-card bg-white/90 dark:bg-gray-800/60 text-center">
            <div className="text-spiritual-saffron text-4xl mb-4 p-4">🙏</div>
            <h3 className="font-sanskrit text-xl text-foreground mb-2">Temple Offering</h3>
            <p className="text-muted-foreground mb-4">
              Contribute to the maintenance and beautification of our sacred space.
            </p>
            <p className="font-medium text-foreground mb-6">₹2,100</p>
            <Link to="/donate" className="indian-button text-sm inline-block">
              Donate
            </Link>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <div className="indian-glass p-6 max-w-2xl mx-auto">
            <h3 className="text-white font-sanskrit text-xl mb-4">Payment Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-3 bg-white/30 dark:bg-gray-800/30 rounded-lg">
                <CreditCard className="h-6 w-6 text-white mb-2" />
                <p className="text-white text-sm">Credit/Debit Card</p>
              </div>
              <div className="flex flex-col items-center p-3 bg-white/30 dark:bg-gray-800/30 rounded-lg">
                <Smartphone className="h-6 w-6 text-white mb-2" />
                <p className="text-white text-sm">UPI/PhonePe/GPay</p>
              </div>
              <div className="flex flex-col items-center p-3 bg-white/30 dark:bg-gray-800/30 rounded-lg">
                <Landmark className="h-6 w-6 text-white mb-2" />
                <p className="text-white text-sm">Bank Transfer</p>
              </div>
            </div>
            <p className="text-white/80 text-sm mt-4">All donations eligible for tax benefits under Section 80G</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonatePreview;
