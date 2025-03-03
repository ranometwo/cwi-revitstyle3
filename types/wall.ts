import * as THREE from 'three';

export interface ParallelLines {
  id: number;
  startX: number;
  endX: number;
  y: number;
  spacing: number;
  segments: { start: number; end: number }[];
}

export interface Wall {
  id: number;
  lineId: number;
  position: THREE.Vector3;
  width: number;
  height: number;
  depth: number;
  createdAt: number;
}