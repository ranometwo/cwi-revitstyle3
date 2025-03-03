import { motion } from 'framer-motion';

const BenefitsPanel = () => {
  return (
    <motion.div 
      className="absolute bottom-4 left-4 z-10 bg-white p-4 rounded-lg text-gray-800 border border-gray-300 shadow-lg max-w-xs"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <h2 className="text-lg font-bold mb-2 text-blue-700">BIM Manager Benefits</h2>
      <p className="text-sm mb-2">
        This tool reduces wall creation time by <span className="font-bold text-green-700">93%</span> compared to traditional methods.
      </p>
      <p className="text-sm">
        For a typical project, this can save <span className="font-bold text-blue-700">40+ hours</span> of modeling time.
      </p>
    </motion.div>
  );
};

export default BenefitsPanel;