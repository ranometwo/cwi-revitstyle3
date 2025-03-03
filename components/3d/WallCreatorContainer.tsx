'use client';

import { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Scene from './Scene';
import Stats from './Stats';
import Celebration from './Celebration';
import PluginPrompt from './PluginPrompt';
import { useWallCreator } from '@/hooks/useWallCreator';

// Main component that sets up the Canvas with reset functionality
export default function WallCreatorContainer() {
  const {
    walls,
    timePerWall,
    showCelebration,
    timeSaved,
    timeSpent,
    handleWallsChange,
    handleWallCreated
  } = useWallCreator();
  
  const controlsRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Handle camera reset
  useEffect(() => {
    const handleResetCamera = () => {
      if (controlsRef.current) {
        controlsRef.current.reset();
      }
    };

    window.addEventListener('resetCamera', handleResetCamera);
    return () => {
      window.removeEventListener('resetCamera', handleResetCamera);
    };
  }, []);
  
  return (
    <div className="relative w-full h-full">
      <Stats wallCount={walls.length} timePerWall={timePerWall} timeSaved={timeSaved} />
      <Celebration show={showCelebration} />
      <PluginPrompt wallCount={walls.length} timeSaved={timeSaved} timeSpent={timeSpent} />
      
      <Canvas 
        shadows 
        style={{ background: '#ffffff', width: '100%', height: '100%' }}
        ref={canvasRef}
      >
        <PerspectiveCamera makeDefault position={[0, 7, 10]} />
        <OrbitControls 
          ref={controlsRef}
          enableDamping 
          dampingFactor={0.05} 
          rotateSpeed={0.5}
          minPolarAngle={0} 
          maxPolarAngle={Math.PI / 2} 
        />
        <Scene onWallsChange={handleWallsChange} onWallCreated={handleWallCreated} />
        <fog attach="fog" args={['#f0f0f0', 15, 30]} />
      </Canvas>
    </div>
  );
}