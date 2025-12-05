import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Chiudi il menu se cambi pagina
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Blocca lo scroll quando il menu è aperto
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  const menuItems = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Projects', path: '/projects' },
    { title: 'Contact', path: '/contact' },
    { title: 'Area Riservata', path: '/admin' }
  ];

  return (
    <>
      {/* NAVBAR FISSA - mix-blend-difference assicura che si veda SEMPRE */}
      <nav className="fixed top-0 left-0 w-full z-[100] py-8 px-6 md:px-12 flex justify-between items-center mix-blend-difference text-white">
        
        {/* LOGO */}
        <Link to="/" className="relative z-[100]">
          <img 
            src="https://www.arredorama.it/wp-content/uploads/2019/02/logo-arredorama.png" 
            alt="Arredorama" 
            className="h-8 md:h-10 w-auto object-contain brightness-0 invert" 
          />
        </Link>
        
        {/* HAMBURGER BUTTON (Con testo MENU opzionale se vuoi) */}
        <div className="flex items-center gap-4 z-[100]">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="group flex flex-col items-end gap-1.5 cursor-pointer p-2"
          >
            <span className={`block h-[2px] bg-white transition-all duration-300 ${isOpen ? 'w-8 rotate-45 translate-y-2.5' : 'w-8'}`}></span>
            <span className={`block h-[2px] bg-white transition-all duration-300 ${isOpen ? 'w-8 opacity-0' : 'w-6 group-hover:w-8'}`}></span>
            <span className={`block h-[2px] bg-white transition-all duration-300 ${isOpen ? 'w-8 -rotate-45 -translate-y-2.5' : 'w-4 group-hover:w-8'}`}></span>
          </button>
        </div>
      </nav>

      {/* FULLSCREEN MENU OVERLAY (NERO) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 bg-[#0a0a0a] text-white z-[90] flex flex-col justify-center px-12 md:px-32"
          >
            <div className="flex flex-col gap-2">
              {menuItems.map((item, index) => (
                <div key={index} className="overflow-hidden">
                  <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ delay: 0.2 + (index * 0.1), duration: 0.5, ease: "easeOut" }}
                  >
                    <Link 
                      to={item.path} 
                      className={`tracking-tight hover:text-gray-400 transition-colors block ${
                        item.title === 'Area Riservata' 
                          ? 'text-2xl md:text-4xl font-normal text-red-500 hover:text-red-400 mt-8' 
                          : 'text-5xl md:text-8xl font-thin'
                      }`}
                    >
                      {item.title}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Footer del menu */}
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
               className="absolute bottom-10 left-12 md:left-32 text-gray-500 text-xs uppercase tracking-widest"
            >
               Arredorama Design &copy; 2025
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;