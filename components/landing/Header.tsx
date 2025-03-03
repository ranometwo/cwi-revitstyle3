'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

interface HeaderProps {
  onDetailsClick: () => void;
  onROIClick: () => void;
  onEnterpriseClick: () => void;
  onPricingClick: () => void;
}

export default function Header({ 
  onDetailsClick, 
  onROIClick, 
  onEnterpriseClick, 
  onPricingClick 
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll event with useEffect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Features', onClick: onDetailsClick },
    { label: 'ROI Calculator', onClick: onROIClick },
    { label: 'Enterprise', onClick: onEnterpriseClick },
    { label: 'Pricing', onClick: onPricingClick },
  ];

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm py-2' : 'bg-transparent py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <motion.div 
              className="text-primary-600 font-bold text-xl mr-2"
              whileHover={{ scale: 1.05 }}
            >
              Easebit
            </motion.div>
            <span className="bg-accent-100 text-accent-800 text-xs px-2 py-1 rounded-full">Enterprise</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <button 
                key={index}
                onClick={item.onClick}
                className="text-neutral-700 hover:text-primary-600 transition-colors"
              >
                {item.label}
              </button>
            ))}
            <Button>Free Trial</Button>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-neutral-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </Container>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          className="md:hidden bg-white shadow-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Container className="py-4 flex flex-col space-y-4">
            {navItems.map((item, index) => (
              <button 
                key={index}
                onClick={() => {
                  item.onClick();
                  setMobileMenuOpen(false);
                }}
                className="text-neutral-700 hover:text-primary-600 transition-colors py-2 border-b border-neutral-100"
              >
                {item.label}
              </button>
            ))}
            <Button>Free Trial</Button>
          </Container>
        </motion.div>
      )}
    </motion.header>
  );
}