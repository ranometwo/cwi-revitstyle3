'use client';

import { motion } from 'framer-motion';
import { formatNumber } from '@/lib/utils';

interface StatsProps {
  wallCount: number;
  timePerWall: number;
  timeSaved: number;
}

export default function Stats({ wallCount, timePerWall, timeSaved }: StatsProps) {
  return (
    <motion.div 
      className="absolute mt-20 top-4 right-4 z-10 bg-white/90 backdrop-blur-sm p-4 rounded-lg text-neutral-800 border border-neutral-200 shadow-card"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-4">
        <div>
          <div className="text-xs text-neutral-500 mb-1">Walls Created</div>
          <div className="text-xl font-bold text-accent-700">{wallCount}</div>
        </div>
        <div className="h-8 w-px bg-neutral-200"></div>
        <div>
          <div className="text-xs text-neutral-500 mb-1">Time Saved</div>
          <div className="text-xl font-bold text-primary-700">{timeSaved.toFixed(1)}m</div>
        </div>
      </div>
    </motion.div>
  );
}