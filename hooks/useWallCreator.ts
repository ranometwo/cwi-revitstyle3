import { useState, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { Wall } from '@/types/wall';
import { calculateTimeSaved } from '@/lib/utils';

export function useWallCreator() {
  const [walls, setWalls] = useState<Wall[]>([]);
  const [timePerWall, setTimePerWall] = useState<number>(0.2); // Default time per wall
  const [showCelebration, setShowCelebration] = useState(false);
  const [timeSaved, setTimeSaved] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  
  // Track time spent on the page
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Time saved calculation (5 seconds per wall)
  useEffect(() => {
    setTimeSaved(calculateTimeSaved(walls.length));
  }, [walls]);
  
  // Handle wall changes from the Scene component
  const handleWallsChange = useCallback((updatedWalls: Wall[]) => {
    setWalls(updatedWalls);
  }, []);
  
  // Handle wall creation celebration
  const handleWallCreated = useCallback((position?: THREE.Vector3) => {
    setShowCelebration(true);
    
    // Hide celebration after 1.5 seconds
    setTimeout(() => {
      setShowCelebration(false);
    }, 1500);
  }, []);

  return {
    walls,
    timePerWall,
    showCelebration,
    timeSaved,
    timeSpent,
    handleWallsChange,
    handleWallCreated
  };
}