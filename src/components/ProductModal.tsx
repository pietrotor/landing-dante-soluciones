import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  image: string;
  link: string;
}

export default function ProductModal({
  isOpen,
  onClose,
  title,
  description,
  image,
  link,
}: ProductModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Asegurar que el modal esté por encima de todo
      const existingModals = document.querySelectorAll('[data-modal-overlay]');
      existingModals.forEach((modal) => {
        (modal as HTMLElement).style.zIndex = '99998';
      });
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Full Screen */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            style={{ 
              zIndex: 99999,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              position: 'fixed',
            }}
            data-modal-overlay
          >
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ 
                type: 'spring',
                stiffness: 300,
                damping: 30,
                duration: 0.3,
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl h-auto max-h-[90vh] overflow-hidden rounded-3xl backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl flex flex-col"
              style={{ 
                zIndex: 100000,
                position: 'relative',
              }}
            >
              {/* Gradient Overlay */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-[#2563eb]/20 via-[#10b981]/20 to-[#06b6d4]/20 opacity-50 pointer-events-none" 
                style={{ zIndex: 0 }}
              ></div>
              
              {/* Close Button */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg hover:shadow-neon group"
                style={{ zIndex: 1000, position: 'absolute' }}
                aria-label="Cerrar"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-red-400 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>

              {/* Image Section - Fixed Height */}
              <div 
                className="relative h-56 sm:h-64 md:h-72 flex-shrink-0 overflow-hidden" 
                style={{ zIndex: 10, position: 'relative' }}
              >
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" 
                  style={{ zIndex: 1, position: 'absolute' }}
                ></div>
                
                {/* Badge */}
                <div 
                  className="absolute top-4 left-4" 
                  style={{ zIndex: 20, position: 'absolute' }}
                >
                  <div className="px-3 py-1.5 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full">
                    <span className="text-white text-xs sm:text-sm font-semibold">💼 Oportunidad de Inversión</span>
                  </div>
                </div>

                {/* Title Overlay */}
                <div 
                  className="absolute bottom-0 left-0 right-0 p-4 sm:p-6" 
                  style={{ zIndex: 20, position: 'absolute' }}
                >
                  <h2 
                    className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight drop-shadow-2xl" 
                    style={{ textShadow: '0 4px 12px rgba(0,0,0,0.8)' }}
                  >
                    {title}
                  </h2>
                </div>
              </div>

              {/* Content Section - Scrollable */}
              <div 
                className="flex-1 min-h-0 overflow-y-auto relative" 
                style={{ zIndex: 10, position: 'relative' }}
              >
                <div className="p-6 sm:p-8 md:p-10">
                  {/* Description */}
                  <div 
                    className="mb-6 sm:mb-8 relative" 
                    style={{ zIndex: 10, position: 'relative' }}
                  >
                    <p 
                      className="text-white/90 text-base sm:text-lg leading-relaxed whitespace-pre-line relative" 
                      style={{ zIndex: 10, position: 'relative' }}
                    >
                      {description}
                    </p>
                  </div>

                  {/* Divider */}
                  <div 
                    className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6 sm:mb-8 relative" 
                    style={{ zIndex: 10, position: 'relative' }}
                  ></div>

                  {/* Features/Highlights */}
                  <div 
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 sm:mb-8 relative" 
                    style={{ zIndex: 10, position: 'relative' }}
                  >
                    <div 
                      className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl relative" 
                      style={{ zIndex: 11, position: 'relative' }}
                    >
                      <div 
                        className="w-10 h-10 bg-gradient-to-br from-[#06b6d4] to-[#10b981] rounded-lg flex items-center justify-center flex-shrink-0 relative" 
                        style={{ zIndex: 12, position: 'relative' }}
                      >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div 
                        className="min-w-0 relative" 
                        style={{ zIndex: 12, position: 'relative' }}
                      >
                        <p className="text-white/60 text-xs">Riesgo</p>
                        <p className="text-white font-semibold text-sm">Evaluado</p>
                      </div>
                    </div>
                    <div 
                      className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl relative" 
                      style={{ zIndex: 11, position: 'relative' }}
                    >
                      <div 
                        className="w-10 h-10 bg-gradient-to-br from-[#2563eb] to-[#4f46e5] rounded-lg flex items-center justify-center flex-shrink-0 relative" 
                        style={{ zIndex: 12, position: 'relative' }}
                      >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div 
                        className="min-w-0 relative" 
                        style={{ zIndex: 12, position: 'relative' }}
                      >
                        <p className="text-white/60 text-xs">Retorno</p>
                        <p className="text-white font-semibold text-sm">Potencial</p>
                      </div>
                    </div>
                    <div 
                      className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl relative" 
                      style={{ zIndex: 11, position: 'relative' }}
                    >
                      <div 
                        className="w-10 h-10 bg-gradient-to-br from-[#f59e0b] to-[#f97316] rounded-lg flex items-center justify-center flex-shrink-0 relative" 
                        style={{ zIndex: 12, position: 'relative' }}
                      >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div 
                        className="min-w-0 relative" 
                        style={{ zIndex: 12, position: 'relative' }}
                      >
                        <p className="text-white/60 text-xs">Asesoría</p>
                        <p className="text-white font-semibold text-sm">Incluida</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Fixed at bottom */}
              <div 
                className="flex-shrink-0 p-4 sm:p-6 md:p-8 lg:p-10 pt-4 sm:pt-6 border-t border-white/10 bg-gradient-to-b from-white/10 via-white/5 to-transparent backdrop-blur-sm relative" 
                style={{ zIndex: 10, position: 'relative' }}
              >
                <div 
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 relative" 
                  style={{ zIndex: 11, position: 'relative' }}
                >
                  {/* Primary Button - Más información */}
                  <motion.a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full sm:flex-1 group relative px-6 py-4 sm:py-4 md:py-5 bg-gradient-to-r from-[#2563eb] via-[#4f46e5] to-[#10b981] hover:from-[#1d4ed8] hover:via-[#4338ca] hover:to-[#059669] text-white rounded-2xl sm:rounded-xl transition-all duration-300 text-center font-black text-base sm:text-lg md:text-xl shadow-xl hover:shadow-neon-lg overflow-hidden active:scale-[0.98]"
                    style={{ zIndex: 12, position: 'relative', minHeight: '56px' }}
                  >
                    <span 
                      className="relative z-10 flex items-center justify-center gap-3" 
                      style={{ zIndex: 13, position: 'relative' }}
                    >
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-black tracking-tight">Más información</span>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-[#10b981] to-[#06b6d4] opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                      style={{ zIndex: 1, position: 'absolute' }}
                    ></div>
                    {/* Shine effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{ zIndex: 2 }}></div>
                  </motion.a>
                  
                  {/* Secondary Button - Cerrar */}
                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full sm:w-auto px-6 py-3.5 sm:py-4 bg-white/5 hover:bg-white/10 active:bg-white/15 backdrop-blur-xl border border-white/20 hover:border-white/30 text-white rounded-2xl sm:rounded-xl transition-all duration-300 font-bold text-sm sm:text-base md:text-lg active:scale-[0.98] sm:whitespace-nowrap"
                    style={{ zIndex: 12, position: 'relative', minHeight: '48px' }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Cerrar
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  // Render using portal to body to avoid stacking context issues
  if (typeof window !== 'undefined') {
    return createPortal(modalContent, document.body);
  }
  
  return null;
}
