import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 2000,
  className = '',
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const hasAnimatedRef = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px', amount: 0.1 });

  useEffect(() => {
    if (hasAnimatedRef.current) return;

    const startAnimation = () => {
      if (hasAnimatedRef.current) return;
      
      hasAnimatedRef.current = true;
      let startTime: number | null = null;
      const startValue = 0;
      const endValue = value;

      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);

        // Easing function for smooth animation (easeOutQuart)
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);

        setCount(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(endValue);
        }
      };

      // Small delay to ensure the element is fully rendered
      setTimeout(() => {
        requestAnimationFrame(animate);
      }, 150);
    };

    // Check via useInView
    if (isInView) {
      startAnimation();
      return;
    }

    // Fallback: check if element is already visible (for Hero section)
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0 && rect.width > 0;
      
      if (isVisible) {
        // Delay to ensure useInView has a chance to trigger first
        const timeoutId = setTimeout(() => {
          if (!hasAnimatedRef.current) {
            startAnimation();
          }
        }, 300);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [isInView, value, duration]);

  return (
    <div ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </div>
  );
}
