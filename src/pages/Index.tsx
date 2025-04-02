
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import DailyInspiration from '../components/DailyInspiration';
import ServicesPreview from '../components/ServicesPreview';
import UpcomingEvents from '../components/UpcomingEvents';
import Testimonials from '../components/Testimonials';
import DonatePreview from '../components/DonatePreview';

const Index = () => {
  // Add smooth scrolling effect
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Simple parallax effect for scroll sections
  useEffect(() => {
    const handleScroll = () => {
      const scrollSections = document.querySelectorAll('.scroll-section');
      const scrollY = window.scrollY;
      
      scrollSections.forEach((section, index) => {
        const sectionElement = section as HTMLElement;
        // Different scroll speeds for different sections creates parallax effect
        const speed = index % 2 === 0 ? 0.1 : -0.1;
        sectionElement.style.transform = `translateY(${scrollY * speed}px)`;
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <section className="scroll-section relative z-10">
          <DailyInspiration />
        </section>
        <section className="scroll-section relative z-10">
          <ServicesPreview />
        </section>
        <section className="scroll-section relative z-10">
          <UpcomingEvents />
        </section>
        <section className="scroll-section relative z-10">
          <Testimonials />
        </section>
        <section className="scroll-section relative z-10">
          <DonatePreview />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
