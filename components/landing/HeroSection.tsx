'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import WallCreatorContainer from '@/components/3d/WallCreatorContainer';
import { Button } from '@/components/ui/button';

const features = [
  "Click between any two parallel model lines",
  "Plugin automatically detects wall width",
  "Available for curtain walls | curved wall",
  "Save hours on every drafting project"
];

export default function HeroSection() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };
  
  return (
    <section className="w-[90%] mx-auto mt-20 h-[85vh] relative bg-gradient-to-b from-white to-neutral-50 rounded-xl shadow-soft overflow-hidden">
      <div className={`flex flex-col md:flex-row ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : ''}`}>
        {/* Left side content - only show when not in fullscreen mode */}
        {!isFullscreen && (
          <motion.div 
            className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-primary-700 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Create Walls 80% faster in Revit
            </motion.h1>
            
            <motion.p 
              className="text-xl text-neutral-700 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="font-bold">Enterprise-grade</span> Revit plugin that transforms your BIM workflow
            </motion.p>
            
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h2 className="text-lg font-semibold text-primary-700 mb-3">Try it yourself →</h2>
              <ul className="space-y-2">
                {features.map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 + (index * 0.1) }}
                  >
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-accent-500 flex items-center justify-center mt-1">
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="ml-2 text-neutral-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              <Button size="lg" className="shadow-lg bg-accent-600 hover:bg-accent-700">
                Download Revit Plugin
              </Button>
              <Button variant="secondary" size="lg" className="shadow-sm">
                Watch Demo
              </Button>
            </motion.div>
            
            <motion.div 
              className="mt-8 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.3 }}
            >
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-neutral-300 flex items-center justify-center overflow-hidden shadow-sm">
                    <Image 
                      src={`https://randomuser.me/api/portraits/men/${20 + i}.jpg`} 
                      alt="User avatar" 
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="ml-3">
                <p className="text-sm text-neutral-600">
                  <span className="font-bold text-primary-700">50+ enterprise firms</span> trust CreateWalls
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
        
        {/* Right side 3D animation */}
        <div className={`relative ${isFullscreen ? 'w-full h-screen' : 'w-full md:w-3/5 h-[85vh]'}`}>
          {/* Interactive demo label */}
          <div className="absolute mt-20 top-4 left-4 z-10">
            <div className="flex items-center bg-accent-600/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full shadow-sm">
              <span className="animate-pulse mr-2 h-2 w-2 bg-white rounded-full"></span>
              <p className="text-sm font-medium">Interactive Demo</p>
            </div>
          </div>
          
          {/* Controls for the 3D view */}
          <div className="absolute bottom-4 right-4 z-10 flex space-x-2">
            <button 
              onClick={() => {
                // This will be handled by the WallCreatorContainer component
                const resetEvent = new CustomEvent('resetCamera');
                window.dispatchEvent(resetEvent);
              }}
              className="bg-white/90 backdrop-blur-sm p-2 rounded-md shadow-md hover:bg-neutral-100 transition-colors"
              aria-label="Reset view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            
            <button 
              onClick={toggleFullscreen}
              className="bg-white/90 backdrop-blur-sm p-2 rounded-md shadow-md hover:bg-neutral-100 transition-colors"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                </svg>
              )}
            </button>
          </div>
          
          {/* Clear instruction overlay */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
            <div className="flex items-center bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-primary-100 text-primary-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
              <span className="text-sm">Click between parallel lines to create a wall</span>
            </div>
          </div>
          
          {/* The 3D wall creator component */}
          <WallCreatorContainer />
        </div>
      </div>
      
      {/* Fullscreen exit button for mobile - only shown in fullscreen mode */}
      {isFullscreen && (
        <Button 
          onClick={toggleFullscreen}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 shadow-lg md:hidden"
        >
          Exit Fullscreen
        </Button>
      )}
    </section>
  );
}