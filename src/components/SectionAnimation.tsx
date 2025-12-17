import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export default function SectionAnimation({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: SectionAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px', amount: 0.2 });

  const getInitialY = () => {
    switch (direction) {
      case 'up':
        return 50;
      case 'down':
        return -50;
      case 'left':
        return 0;
      case 'right':
        return 0;
      default:
        return 50;
    }
  };

  const getInitialX = () => {
    switch (direction) {
      case 'left':
        return -50;
      case 'right':
        return 50;
      default:
        return 0;
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        y: getInitialY(),
        x: getInitialX(),
        scale: 0.95
      }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0,
        x: 0,
        scale: 1
      } : { 
        opacity: 0, 
        y: getInitialY(),
        x: getInitialX(),
        scale: 0.95
      }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ 
        delay, 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

