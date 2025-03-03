import { motion } from 'framer-motion';

interface CelebrationProps {
  show: boolean;
}

const Celebration = ({ show }: CelebrationProps) => {
  return (
    <motion.div 
      className={`fixed z-20 pointer-events-none ${show ? 'block' : 'hidden'}`}
      style={{
        top: '40%',
        right: '15%',
        transformOrigin: 'center center',
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={show ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}>
      {/* Main celebration container - everything is positioned relative to this center point */}
      <div className="relative flex items-center justify-center" style={{ width: '44px', height: '44px' }}>
        {/* Animated rings - perfectly centered */}
        <motion.div 
          className="absolute rounded-full bg-green-500 opacity-20"
          style={{ width: '120px', height: '120px', top: '-38px', left: '-38px' }}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={show ? { 
            scale: [0.6, 1.4, 1.8], 
            opacity: [0, 0.5, 0] 
          } : { scale: 0.6, opacity: 0 }}
          transition={{ 
            duration: 1.5, 
            ease: "easeOut",
            times: [0, 0.4, 1]
          }}
        />
        
        <motion.div 
          className="absolute rounded-full bg-green-400 opacity-30"
          style={{ width: '90px', height: '90px', top: '-23px', left: '-23px' }}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={show ? { 
            scale: [0.6, 1.2, 1.5], 
            opacity: [0, 0.6, 0] 
          } : { scale: 0.6, opacity: 0 }}
          transition={{ 
            duration: 1.3, 
            ease: "easeOut",
            delay: 0.1,
            times: [0, 0.4, 1]
          }}
        />
        
        {/* Central badge with number - positioned at the exact center */}
        <motion.div 
          className="absolute bg-white rounded-full shadow-lg border-2 border-green-500 flex items-center justify-center"
          style={{ width: '44px', height: '44px', top: '0px', left: '0px' }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={show ? { 
            scale: [0.5, 1.2, 1], 
            opacity: 1,
            y: [0, -10, 0]
          } : { scale: 0.5, opacity: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 15,
            duration: 0.8
          }}
        >
          <motion.span 
            className="text-green-600 text-xl font-bold"
            initial={{ scale: 0.8 }}
            animate={show ? { scale: [0.8, 1.3, 1] } : { scale: 0.8 }}
            transition={{ duration: 0.5, times: [0, 0.6, 1] }}
          >
            +1
          </motion.span>
        </motion.div>
        
        {/* Small particles - all emanating from the center */}
        {[...Array(8)].map((_, i) => {
          // Calculate angle for even distribution around the circle
          const angle = (i * 45) * Math.PI / 180;
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-green-400"
              style={{ 
                top: '22px', // Center point
                left: '22px', // Center point
                originX: "50%",
                originY: "50%"
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={show ? {
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
                x: [0, 30 * Math.cos(angle)],
                y: [0, 30 * Math.sin(angle)]
              } : { scale: 0, opacity: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.1 + (i * 0.03),
                ease: "easeOut"
              }}
            />
          );
        })}
      </div>
    </motion.div>
  );
};

export default Celebration;