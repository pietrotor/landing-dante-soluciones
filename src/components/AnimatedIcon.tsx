import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedIconProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function AnimatedIcon({ children, delay = 0, className = '' }: AnimatedIconProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px', amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
      animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.8, rotate: -90 }}
      transition={{
        delay,
        duration: 0.5,
        type: 'spring',
        stiffness: 200,
        damping: 20,
      }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

