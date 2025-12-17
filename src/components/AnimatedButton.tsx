import { motion } from 'framer-motion';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function AnimatedButton({ 
  children, 
  onClick, 
  className = '' 
}: AnimatedButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold transition-colors hover:bg-blue-700 ${className}`}
    >
      {children}
    </motion.button>
  );
}


