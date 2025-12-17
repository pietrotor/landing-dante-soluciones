import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState } from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  links?: Array<{ text: string; href: string }>;
  gradient: string;
  image?: string;
  delay?: number;
}

export default function ServiceCard({
  title,
  description,
  links = [],
  gradient,
  image,
  delay = 0,
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ 
        duration: 0.8, 
        delay,
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="group relative overflow-hidden rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 p-6 sm:p-8 hover:bg-white/15 transition-all duration-500 hover:scale-[1.02] hover:shadow-neon-lg flex flex-col h-full"
    >
      {/* Gradient Overlay */}
      <div className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
      
      {image && (
        <img
          src={image}
          alt={title}
          className="absolute top-0 right-0 w-40 h-40 object-cover opacity-10 transform rotate-12 translate-x-8 -translate-y-8 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500"
        />
      )}
      
      <div className="relative z-10 flex-1 flex flex-col">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-3 sm:mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#06b6d4] group-hover:to-[#10b981] transition-all duration-300">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-white/80 mb-4 sm:mb-6 flex-1 leading-relaxed">
          {description}
        </p>
        
        {links.length > 0 && (
          <div className="space-y-2 sm:space-y-3 pt-2">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link block px-4 sm:px-6 py-3 sm:py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300 hover:scale-105 text-center font-bold text-sm sm:text-base backdrop-blur-sm border border-white/20 hover:border-white/40 hover:shadow-neon"
              >
                <span className="flex items-center justify-center gap-2">
                  {link.text}
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
