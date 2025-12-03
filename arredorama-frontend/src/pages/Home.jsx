import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// Immagini per lo slider HERO
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
];

// Componente per l'animazione del testo lettera per lettera
const AnimatedText = ({ text, className }) => {
  const letters = Array.from(text);
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 * i },
    }),
  };
  const child = {
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } },
    hidden: { opacity: 0, y: 20, transition: { type: "spring", damping: 12, stiffness: 100 } },
  };

  return (
    <motion.div style={{ overflow: "hidden", display: "flex" }} variants={container} initial="hidden" animate="visible" className={className}>
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
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotateImg = useTransform(scrollYProgress, [0, 1], [0, 10]);

  // Cambio slide automatico ogni 5 secondi
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-[#1a1a1a] text-white overflow-hidden">
      
      {/* --- 1. HERO SLIDER CINEMATOGRAFICO --- */}
      <header className="relative h-screen w-full overflow-hidden">
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0"
          >
            <img 
              src={HERO_IMAGES[currentSlide]} 
              className="w-full h-full object-cover opacity-50" 
              alt="Hero"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-black/30"></div>
          </motion.div>
        </AnimatePresence>

        {/* Testo Hero */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <div className="overflow-hidden">
             <AnimatedText text="ARREDORAMA" className="text-[12vw] md:text-[10vw] font-thin leading-none tracking-tighter text-white mix-blend-overlay" />
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 1, duration: 1 }}
            className="text-gray-300 text-sm md:text-lg uppercase tracking-[0.3em] mt-6"
          >
            Design · Architecture · Interior
          </motion.p>
        </div>

        {/* Indicatore Scroll */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-gray-500"
        >
          Scroll Down
        </motion.div>
      </header>

      {/* --- 2. MARQUEE SCORREVOLE INFINITO --- */}
      <div className="w-full bg-white text-black py-4 overflow-hidden whitespace-nowrap border-y border-gray-200">
        <motion.div 
          animate={{ x: [0, -1000] }} 
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="inline-block text-4xl md:text-6xl font-thin tracking-tight opacity-20"
        >
          INNOVATION · DESIGN · ELEGANCE · STYLE · ARREDORAMA · INNOVATION · DESIGN · ELEGANCE · STYLE · ARREDORAMA · 
        </motion.div>
      </div>

      {/* --- 3. SEZIONE INTRODUZIONE --- */}
      <section className="py-32 w-full px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <motion.div style={{ y: yParallax }} className="relative z-10">
          <span className="text-[#ff5149] uppercase tracking-[0.2em] text-xs font-bold mb-6 block">Vision</span>
          <h2 className="text-4xl md:text-6xl font-light leading-tight mb-8">
            Non arrediamo spazi. <br/> Creiamo <span className="italic font-serif">atmosfere</span>.
          </h2>
          <p className="text-gray-400 text-lg font-light leading-relaxed mb-8">
            Dal 1980 Arredorama definisce lo standard dell'interior design italiano. 
            Ogni progetto è un dialogo tra luce, materia e funzionalità.
          </p>
          <Link to="/about">
             <span className="border-b border-white pb-1 text-sm uppercase tracking-widest hover:text-[#ff5149] hover:border-[#ff5149] transition-all cursor-pointer">Scopri la nostra storia</span>
          </Link>
        </motion.div>

        {/* Immagine con rotazione ed effetto reveal */}
        <motion.div style={{ rotate: rotateImg }} className="relative h-[60vh] w-full overflow-hidden">
             <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
        </motion.div>
      </section>

      {/* --- 4. PREVIEW PORTFOLIO (MASONRY MINI) --- */}
      <section className="py-20 bg-[#141414]">
         <div className="container mx-auto px-6 mb-16 flex justify-between items-end">
            <h3 className="text-4xl font-thin">Ultimi Progetti</h3>
            <Link to="/projects" className="hidden md:block text-xs uppercase tracking-widest border border-white/20 px-6 py-3 hover:bg-white hover:text-black transition-all">Vedi Tutti</Link>
         </div>

         {/* 3 Card di esempio */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
            {[
              {t: 'Villa Lago', c: 'Residenziale', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80'},
              {t: 'Uffici Zen', c: 'Contract', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80'},
              {t: 'Loft 54', c: 'Living', img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80'}
            ].map((item, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.2 }}
                 className="group relative h-[50vh] overflow-hidden cursor-pointer"
               >
                  <img src={item.img} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-500"></div>
                  <div className="absolute bottom-6 left-6">
                     <h4 className="text-2xl font-light">{item.t}</h4>
                     <span className="text-[#ff5149] text-xs uppercase tracking-widest">{item.c}</span>
                  </div>
               </motion.div>
            ))}
         </div>
      </section>
    </div>
  );
};

export default Home;