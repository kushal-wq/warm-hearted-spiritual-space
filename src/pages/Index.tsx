
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import DailyInspiration from '../components/DailyInspiration';
import ServicesPreview from '../components/ServicesPreview';
import UpcomingEvents from '../components/UpcomingEvents';
import Testimonials from '../components/Testimonials';
import DonatePreview from '../components/DonatePreview';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <DailyInspiration />
        <ServicesPreview />
        <UpcomingEvents />
        <Testimonials />
        <DonatePreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
