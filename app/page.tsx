'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/landing/HeroSection';
import PluginDetails from '@/components/3d/PluginDetails';
import EnterpriseSection from '@/components/landing/EnterpriseSection';
import PricingSection from '@/components/landing/PricingSection';
import ROICalculator from '@/components/landing/ROICalculator';
import CTASection from '@/components/landing/CTASection';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';


export default function Home() {
  // Refs for scrolling to sections
  const detailsRef = useRef<HTMLDivElement>(null);
  const roiRef = useRef<HTMLDivElement>(null);
  const enterpriseRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  // Scroll to section helper function
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="flex flex-col items-center justify-center p-0 bg-white overflow-y-auto">
      <Header 
        onDetailsClick={() => scrollToSection(detailsRef)}
        onROIClick={() => scrollToSection(roiRef)}
        onEnterpriseClick={() => scrollToSection(enterpriseRef)}
        onPricingClick={() => scrollToSection(pricingRef)}
      />
      
      <HeroSection />
      
      <motion.div 
        ref={detailsRef} 
        className="min-h-screen w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <PluginDetails visible={true} />
      </motion.div>
      
      <motion.div 
        ref={roiRef} 
        className="w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <ROICalculator />
      </motion.div>
      
      <motion.div 
        ref={enterpriseRef} 
        className="w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <EnterpriseSection />
      </motion.div>
      
      
      <motion.div 
        ref={pricingRef} 
        className="w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <PricingSection />
      </motion.div>
      
      <CTASection />
      
      <Footer />
    </main>
  );
}