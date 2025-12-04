import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053", // Cucina luminosa
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070", // Living
  "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1920"  // Architettura esterna
];

const AnimatedText = ({ text, className }) => {
  // Funzione per dividere il testo in lettere per l'animazione
  const letters = Array.from(text);
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({ opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 * i } }),
  };
  const child = {
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } },
    hidden: { opacity: 0, y: 50, transition: { type: "spring", damping: 12, stiffness: 100 } },
  };

  return (
    <motion.div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }} variants={container} initial="hidden" animate="visible" className={className}>
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -150]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-white text-[#1a1a1a] overflow-hidden font-urbanist">
      
      {/* --- HERO SECTION --- */}
      <header className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* SLIDER SFONDO */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0"
          >
            <img src={HERO_IMAGES[currentSlide]} className="w-full h-full object-cover" alt="Hero" />
            
            {/* --- FIX LEGGIBILITÀ: OVERLAY SCURO --- */}
            {/* Questo gradiente rende il testo leggibile anche su foto bianche */}
            <div className="absolute inset-0 bg-black/40"></div> 
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
          </motion.div>
        </AnimatePresence>

        {/* CONTENUTO CENTRALE */}
        <div className="relative z-10 text-center px-4 w-full">
           <AnimatedText 
              text="RETHINK ARCHITECTURE" 
              className="text-[10vw] md:text-[7vw] font-thin leading-[0.9] tracking-tighter text-white drop-shadow-lg" 
           />
           
           <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-8"
           >
              <p className="text-white/90 text-sm md:text-base uppercase tracking-[0.3em] font-medium mb-8">
                 Arredorama Design Studio
              </p>
              
              <Link to="/projects">
                <button className="border border-white/40 bg-white/10 backdrop-blur-sm text-white px-8 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
                  Esplora Progetti
                </button>
              </Link>
           </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70 text-[10px] uppercase tracking-[0.2em] animate-bounce">
           Scroll Down
        </div>
      </header>

      {/* --- VISION SECTION (White Mode) --- */}
      <section className="py-32 container mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <motion.div style={{ y: yParallax }}>
          <span className="text-[#ff5149] uppercase tracking-[0.2em] text-xs font-bold mb-4 block">Vision</span>
          <h2 className="text-4xl md:text-6xl font-light leading-tight mb-8 text-black">
            Minimalismo <br/> ed <span className="font-serif italic">emozione</span>.
          </h2>
          <p className="text-gray-500 text-lg font-light leading-relaxed mb-8">
            Non ci limitiamo a riempire spazi vuoti. Progettiamo atmosfere che raccontano chi sei. 
            La luce naturale è il nostro materiale preferito, l'eleganza il nostro linguaggio.
          </p>
          <Link to="/about" className="inline-block border-b border-black pb-1 uppercase text-xs tracking-widest hover:text-[#ff5149] hover:border-[#ff5149] transition-all">
             Conosci il team
          </Link>
        </motion.div>

        <div className="h-[70vh] w-full overflow-hidden relative">
           <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=2070" className="w-full h-full object-cover" alt="Interior" />
        </div>
      </section>

    </div>
  );
};

export default Home;