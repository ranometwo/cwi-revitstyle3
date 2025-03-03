'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Wall, ParallelLines } from '@/types/wall';

interface SceneProps {
  onWallsChange: (walls: Wall[]) => void;
  onWallCreated: (position?: THREE.Vector3) => void;
}

interface ExtendedEvent {
  clientX: number;
  clientY: number;
  target: HTMLCanvasElement;
}

const Scene = ({ onWallsChange, onWallCreated }: SceneProps) => {
  const [parallelLines, setParallelLines] = useState<ParallelLines[]>([]);
  const [walls, setWalls] = useState<Wall[]>([]);
  const [clickedLineIds, setClickedLineIds] = useState<Set<number>>(new Set());
  
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const gridRef = useRef<THREE.GridHelper>(null);
  const sceneRef = useRef<THREE.Group>(null);
  const wallRefs = useRef<Map<number, THREE.Mesh>>(new Map());
  const { camera, size } = useThree();

  // Update parent component when walls change
  useEffect(() => {
    onWallsChange(walls);
  }, [walls, onWallsChange]);

  // Generate parallel lines with segments
  useEffect(() => {
    const lines: ParallelLines[] = [];
    const gridSize = 10;
    const spacing = 0.29; // Reduced by 1px (from 0.3)
    const segmentLength = 3; // Length of each line segment
    const gapLength = 1; // Length of gap between segments
    
    for (let i = -gridSize; i <= gridSize; i += 2) {
      // Create segments for this line
      const segments = [];
      for (let x = -gridSize; x < gridSize; x += segmentLength + gapLength) {
        segments.push({
          start: x,
          end: Math.min(x + segmentLength, gridSize)
        });
      }
      
      lines.push({
        id: i + gridSize,
        startX: -gridSize,
        endX: gridSize,
        y: i,
        spacing: spacing,
        segments: segments
      });
    }
    
    setParallelLines(lines);
  }, []);

  // Add pre-loaded walls
  useEffect(() => {
    // Create some initial walls at strategic positions
    const preloadedWalls: Wall[] = [
      // Wall 1 - near center
      {
        id: 1,
        lineId: 10, // Adjust based on your line IDs
        position: new THREE.Vector3(-2, 1, 0.17),
        width: 2,
        height: 2,
        depth: 0.29, // Reduced by 1px (from 0.3)
        createdAt: Date.now() - 5000
      },
      // Wall 2 - to the right
      {
        id: 2,
        lineId: 12,
        position: new THREE.Vector3(3, 1, 2.17),
        width: 2,
        height: 2,
        depth: 0.29, // Reduced by 1px (from 0.3)
        createdAt: Date.now() - 4000
      },
      // Wall 3 - to the left
      {
        id: 3,
        lineId: 8,
        position: new THREE.Vector3(-4, 1, -1.83),
        width: 2,
        height: 2,
        depth: 0.29, // Reduced by 1px (from 0.3)
        createdAt: Date.now() - 3000
      }
    ];
    
    setWalls(preloadedWalls);
    
    // Mark these lines as already having walls
    const initialClickedLines = new Set<number>([10, 12, 8]);
    setClickedLineIds(initialClickedLines);
  }, []);

  // Add slow rotation to the scene
  useFrame(({ clock }) => {
    if (sceneRef.current) {
      sceneRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  // Handle click to create or remove walls
  const handleClick = useCallback((event: ExtendedEvent) => {
    // Calculate mouse position in normalized device coordinates
    // We need to account for the canvas size and position within the page
    const canvasRect = event.target.getBoundingClientRect();
    
    // Check if the click is within the canvas bounds
    if (
      event.clientX < canvasRect.left ||
      event.clientX > canvasRect.right ||
      event.clientY < canvasRect.top ||
      event.clientY > canvasRect.bottom
    ) {
      return; // Click is outside the canvas, ignore it
    }
    
    // Calculate normalized device coordinates (-1 to +1) for the raycaster
    mouse.current.x = ((event.clientX - canvasRect.left) / canvasRect.width) * 2 - 1;
    mouse.current.y = -((event.clientY - canvasRect.top) / canvasRect.height) * 2 + 1;
    
    // Update the raycaster with the mouse position and camera
    raycaster.current.setFromCamera(mouse.current, camera);
    
    // Check if we clicked on an existing wall
    const wallMeshes = Array.from(wallRefs.current.entries()).map(([id, mesh]) => {
      return { id, mesh };
    });
    
    const intersects = raycaster.current.intersectObjects(
      wallMeshes.map(w => w.mesh),
      false
    );
    
    if (intersects.length > 0) {
      // Find the wall ID from the intersected mesh
      const intersectedMesh = intersects[0].object as THREE.Mesh;
      const wallEntry = wallMeshes.find(w => w.mesh === intersectedMesh);
      
      if (wallEntry) {
        // Find the wall to get its lineId
        const wall = walls.find(w => w.id === wallEntry.id);
        if (wall) {
          // Remove the wall
          setWalls(prevWalls => prevWalls.filter(w => w.id !== wallEntry.id));
          
          // Check if there are any other walls on this line
          const otherWallsOnLine = walls.filter(w => w.id !== wallEntry.id && w.lineId === wall.lineId);
          
          // If no other walls on this line, remove the line from clicked lines
          if (otherWallsOnLine.length === 0) {
            setClickedLineIds(prev => {
              const newSet = new Set(prev);
              newSet.delete(wall.lineId);
              return newSet;
            });
          }
        }
        return;
      }
    }
    
    // If we didn't click on a wall, try to create a new one
    // Create a plane for intersection (XZ plane)
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const intersectionPoint = new THREE.Vector3();
    
    // Find the intersection point with the plane
    raycaster.current.ray.intersectPlane(plane, intersectionPoint);
    
    // Find the closest parallel lines to the click point
    let closestLine: ParallelLines = {} as ParallelLines;
    let minDistance = Infinity;
    
    parallelLines.forEach((line: ParallelLines) => {
      // Calculate distance from click to the center of the parallel lines
      const lineY = line.y;
      const lineYWithSpacing = line.y + line.spacing;
      const centerY = (lineY + lineYWithSpacing) / 2;
      
      const distance = Math.abs(intersectionPoint.z - centerY);
      
      // Check if the click is within the X bounds of the line and near a segment
      if (
        distance < minDistance &&
        intersectionPoint.x >= line.startX &&
        intersectionPoint.x <= line.endX &&
        Math.abs(distance) <= line.spacing * 1.5 // Allow some tolerance
      ) {
        // Check if the click is near any segment
        for (const segment of line.segments) {
          if (intersectionPoint.x >= segment.start && intersectionPoint.x <= segment.end) {
            minDistance = distance;
            closestLine = line;
            break;
          }
        }
      }
    });
    
    // If we found a close enough line, create a wall
    if (closestLine?.segments?.length > 0) {
      // Find the segment that was clicked
      const clickedSegment = closestLine.segments.find(
        segment => intersectionPoint.x >= segment.start && intersectionPoint.x <= segment.end
      );
      
      if (clickedSegment) {
        const wallWidth = 2; // Fixed width
        const wallHeight = 2; // Height of the wall
        const wallDepth = closestLine.spacing; // Depth is the spacing between lines
        
        // Position the wall at the center of the parallel lines and at the click point
        const wallPosition = new THREE.Vector3(
          intersectionPoint.x,
          wallHeight / 2, // Position at half height
          closestLine.y + wallDepth / 2 // Position at the center of the parallel lines
        );
        
        // Add the new wall
        setWalls(prevWalls => [
          ...prevWalls,
          {
            id: Date.now(),
            lineId: closestLine!.id,
            position: wallPosition,
            width: wallWidth,
            height: wallHeight,
            depth: wallDepth,
            createdAt: Date.now()
          }
        ]);
        
        // Add this line to clicked lines
        setClickedLineIds(prev => {
          const newSet = new Set(prev);
          newSet.add(closestLine!.id);
          return newSet;
        });
        
        // Notify parent about wall creation with position
        onWallCreated(wallPosition);
      }
    }
  }, [parallelLines, camera, onWallCreated, walls]);

  // Set up event listener for clicks
  useEffect(() => {
    // We need to get the canvas element to properly handle clicks
    const canvas = document.querySelector('canvas');
    
    if (!canvas) return;
    
    const handleMouseClick = (event: MouseEvent) => {
      // Only process clicks that are within the canvas
      const rect = canvas.getBoundingClientRect();
      if (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
      ) {
        handleClick({
          clientX: event.clientX,
          clientY: event.clientY,
          target: canvas as HTMLCanvasElement,
        } as ExtendedEvent);
      }
    };

    canvas.addEventListener('click', handleMouseClick);
    return () => {
      canvas.removeEventListener('click', handleMouseClick);
    };
  }, [handleClick]);

  // Store references to wall meshes for raycasting
  const setWallRef = useCallback((id: number, mesh: THREE.Mesh | null) => {
    if (mesh) {
      wallRefs.current.set(id, mesh);
    } else {
      wallRefs.current.delete(id);
    }
  }, []);


  return (
    <group ref={sceneRef}>
      {/* Grid helper for reference - light gray color for Revit-like appearance */}
      <gridHelper ref={gridRef} args={[20, 20, 0xcccccc, 0xdddddd]} />
      
      {/* Render parallel lines with segments - light green color for Revit-like appearance */}
      {parallelLines.map(line => (
        <group key={line.id}>
          {line.segments.map((segment, idx) => (
            <group key={`${line.id}-segment-${idx}`}>
              {/* First line of the segment */}
              <line>
                <bufferGeometry attach="geometry">
                  <float32BufferAttribute
                    attach="attributes-position"
                    args={[new Float32Array([segment.start, 0, line.y, segment.end, 0, line.y]), 3]}
                  />
                </bufferGeometry>
                <lineBasicMaterial attach="material" color="#0db000" linewidth={2} />
              </line>
              
              {/* Second line of the segment (parallel) */}
              <line>
                <bufferGeometry attach="geometry">
                  <float32BufferAttribute
                    attach="attributes-position"
                    args={[new Float32Array([segment.start, 0, line.y + line.spacing, segment.end, 0, line.y + line.spacing]), 3]}
                  />
                </bufferGeometry>
                <lineBasicMaterial attach="material" color="#0db000" linewidth={2} />
              </line>
            </group>
          ))}
        </group>
      ))}
      
      
      {/* Render walls with subtle animation on creation */}
      {walls.map(wall => (
        <mesh 
          key={wall.id} 
          position={wall.position}
          ref={(mesh) => setWallRef(wall.id, mesh as THREE.Mesh)}
        >
          <boxGeometry args={[wall.width, wall.height, wall.depth]} />
          <meshStandardMaterial 
            color="#ececec" 
            metalness={0.1}
            roughness={0.8}
          />
        </mesh>
      ))}
      
      {/* Ambient light */}
      <ambientLight intensity={0.7} />
      
      {/* Directional light */}
      <directionalLight position={[10, 10, 5]} intensity={0.8} castShadow />
      
      {/* Additional lights for better aesthetics */}
      <pointLight position={[-5, 5, -5]} intensity={0.3} color="#96c896" />
      <pointLight position={[5, 3, 5]} intensity={0.2} color="#a0c8e0" />
    </group>
  );
};

export default Scene;