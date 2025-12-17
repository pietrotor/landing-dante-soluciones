import { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import ProductModal from './ProductModal';

interface ProductCardProps {
  title: string;
  image: string;
  description: string;
  link: string;
  delay?: number;
}

export default function ProductCard({
  title,
  image,
  description,
  link,
  delay = 0,
}: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95, rotateX: -15 }}
        whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
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
        className="group relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl overflow-hidden shadow-lg hover:shadow-neon-lg transition-all duration-500 hover:scale-[1.02] flex flex-col h-full cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb]/20 via-[#10b981]/20 to-[#10b981]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
        
        <div className="relative overflow-hidden h-48 sm:h-56 md:h-64">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
          
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-20">
            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white mb-1 sm:mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#06b6d4] group-hover:to-[#10b981] transition-all duration-300">
              {title}
            </h3>
          </div>
        </div>
        
        <div className="p-4 sm:p-6 flex flex-col flex-grow relative z-10 bg-white/5 backdrop-blur-sm">
          <div className="mt-auto pt-3 sm:pt-4">
            <button className="w-full py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-[#2563eb] to-[#10b981] hover:from-[#1d4ed8] hover:to-[#10b981]/80 text-white rounded-xl transition-all duration-300 text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-lg hover:shadow-neon hover:scale-105">
              <span>Ver detalles</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
      
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        description={description}
        image={image}
        link={link}
      />
    </>
  );
}
