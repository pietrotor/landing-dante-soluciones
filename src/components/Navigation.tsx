import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#hero', label: 'Inicio' },
    { href: '#services', label: 'Servicios' },
    { href: '#products', label: 'Productos' },
    { href: '#courses', label: 'Cursos' },
    { href: '#community', label: 'Comunidad' },
    { href: '#about', label: 'Sobre mí' },
    { href: '#contact', label: 'Redes Sociales' },
  ];

  const scrollToSection = (href: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Cerrar el menú móvil primero
    setIsMobileMenuOpen(false);
    
    // Pequeño delay para asegurar que el menú se cierre antes del scroll
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth',
        });
      } else {
        // Si no encuentra el elemento, intentar navegar directamente
        window.location.href = href;
      }
    }, 150);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-lg'
          : 'backdrop-blur-xl bg-white/5 border-b border-white/10'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#hero');
            }}
            className="text-xl sm:text-2xl font-black text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#06b6d4] hover:to-[#10b981] transition-all duration-300"
          >
            DANTESOLUCIONES
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="text-white/80 hover:text-white font-semibold text-sm transition-all duration-300 hover:scale-105 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#06b6d4] to-[#10b981] group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-[#06b6d4] transition-colors p-2"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden mt-4 pb-4 space-y-2 backdrop-blur-xl bg-white/10 rounded-2xl p-4 border border-white/20 overflow-hidden"
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  type="button"
                  onClick={(e) => scrollToSection(item.href, e)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="block w-full text-left text-white hover:text-[#06b6d4] transition-colors font-semibold text-base sm:text-lg py-3 px-4 rounded-xl hover:bg-white/10 active:scale-95 cursor-pointer"
                >
                  {item.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
