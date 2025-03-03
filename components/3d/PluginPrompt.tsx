'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface PluginPromptProps {
  wallCount: number;
  timeSaved: number;
  timeSpent: number;
}

export default function PluginPrompt({ wallCount, timeSaved, timeSpent }: PluginPromptProps) {
  const [showPrompt, setShowPrompt] = useState(false);
  
  // Show the prompt after user has created some walls or spent some time
  useEffect(() => {
    // Show prompt if user has created at least 3 walls or spent 4+ seconds
    if ((wallCount >= 4 || timeSpent >= 3) && !showPrompt) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [wallCount, timeSpent, showPrompt]);
  
  const handleClose = () => {
    setShowPrompt(false);
  };
  
  const handleDownload = () => {
    // In a real app, this would trigger the download
    alert('Download started! In a real application, this would download the Revit plugin.');
    setShowPrompt(false);
  };
  
  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div 
          className="fixed inset-0 z-30 flex items-center justify-center bg-neutral-900/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="bg-white border border-primary-200 rounded-lg shadow-soft p-6 max-w-md mx-4"
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-primary-700">Experience in Revit</h2>
              <button 
                onClick={handleClose}
                className="text-neutral-500 hover:text-neutral-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-neutral-800 mb-3">
                You&apos;ve created <span className="font-bold text-accent-700">{wallCount} walls</span> and saved <span className="font-bold text-primary-700">{timeSaved.toFixed(2)} minutes</span>!
              </p>
              <p className="text-neutral-600 mb-3">
                Imagine using this same efficient workflow directly in Revit with our plugin.
              </p>
              <div className="bg-primary-50 p-3 rounded-md border border-primary-200 mb-3">
                <h3 className="font-bold text-primary-700 mb-1">Plugin Benefits:</h3>
                <ul className="list-disc pl-5 text-sm text-neutral-700 space-y-1">
                  <li>Create walls 10x faster than traditional methods</li>
                  <li>Seamless integration with your Revit workflow</li>
                  <li>Automatic wall joining and cleanup</li>
                  <li>Save hours on every project</li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button
                onClick={handleDownload}
                className="flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
                Download Revit Plugin
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}