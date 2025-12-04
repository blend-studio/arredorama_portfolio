import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

// Immagini Hero (Alta qualità)
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053", // Cucina
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070", // Living
  "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1920"  // Esterno
];

// Componente Testo Animato
const AnimatedText = ({ text, className }) => {
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
  const scaleImage = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-white text-[#1a1a1a] overflow-hidden font-urbanist">
      
      {/* 1. HERO SECTION */}
      <header className="relative h-screen w-full overflow-hidden flex items-center justify-center">
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
            <div className="absolute inset-0 bg-black/40"></div> {/* Overlay scuro per leggere il testo */}
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 text-center px-4 w-full text-white">
           <AnimatedText 
              text="RETHINK ARCHITECTURE" 
              className="text-[10vw] md:text-[8vw] font-thin leading-[0.9] tracking-tighter drop-shadow-2xl" 
           />
           <motion.div 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }}
              className="mt-8"
           >
              <p className="text-white/90 text-sm md:text-base uppercase tracking-[0.3em] font-medium mb-8">
                 Arredorama Design Studio
              </p>
              <Link to="/projects">
                <button className="border border-white/50 bg-white/10 backdrop-blur-md text-white px-10 py-4 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
                  Esplora Progetti
                </button>
              </Link>
           </motion.div>
        </div>
      </header>

      {/* 2. MARQUEE SCORREVOLE */}
      <div className="w-full bg-white text-black py-8 overflow-hidden whitespace-nowrap border-b border-gray-100">
        <motion.div 
          animate={{ x: [0, -1000] }} 
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="inline-block text-6xl md:text-8xl font-thin tracking-tight opacity-5 select-none"
        >
          INTERIOR · DESIGN · LUXURY · ARREDORAMA · ARCHITECTURE · STYLE · INTERIOR · DESIGN · LUXURY · ARREDORAMA · ARCHITECTURE · STYLE ·
        </motion.div>
      </div>

      {/* 3. FILOSOFIA & INTRO */}
      <section className="py-32 container mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <motion.div style={{ y: yParallax }}>
          <span className="text-[#ff5149] uppercase tracking-[0.2em] text-xs font-bold mb-6 block">Philosophy</span>
          <h2 className="text-4xl md:text-5xl font-light leading-tight mb-8 text-black">
            Disporre gli spazi con <span className="font-serif italic">eleganza</span>, gusto e funzionalità.
          </h2>
          <div className="text-gray-500 text-lg font-light leading-relaxed mb-8 space-y-6">
            <p>
              Arredorama si occupa da oltre trent’anni della fornitura di arredi, della progettazione e della realizzazione degli spazi interni relativamente ad abitazioni private e spazi commerciali offrendo anche un servizio chiavi in mano professionale.
            </p>
            <p>
              Assistenza e consulenza nello studio delle esigenze di arredamento e nella scelta del prodotto ideale di arredo sono alla base del nostro lavoro.
            </p>
          </div>
          <Link to="/about" className="group inline-flex items-center gap-2 border-b border-black pb-1 uppercase text-xs tracking-widest hover:text-[#ff5149] hover:border-[#ff5149] transition-all">
             Scopri di più su di noi <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </motion.div>

        <div className="h-[80vh] w-full overflow-hidden relative bg-gray-100">
           <motion.img 
             style={{ scale: scaleImage }}
             src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000" 
             className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
             alt="Interior Vision" 
           />
        </div>
      </section>

      {/* 4. I NOSTRI NUMERI (STATS) */}
      <section className="py-20 bg-[#1a1a1a] text-white">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { num: "30+", label: "Anni di Esperienza" },
            { num: "500+", label: "Progetti Realizzati" },
            { num: "100%", label: "Made in Italy" },
            { num: "15", label: "Brand Partner" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-5xl md:text-7xl font-thin mb-2 text-[#ff5149]">{stat.num}</div>
              <div className="text-xs uppercase tracking-widest text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. PORTFOLIO PREVIEW */}
      <section className="py-32 bg-white">
         <div className="container mx-auto px-6 mb-16 flex flex-col md:flex-row justify-between items-end border-b border-gray-200 pb-6">
            <div>
              <span className="text-gray-400 uppercase tracking-[0.2em] text-xs font-bold mb-2 block">Selected Works</span>
              <h3 className="text-4xl font-thin text-black">Ultimi Progetti</h3>
            </div>
            <Link to="/projects" className="hidden md:block text-xs uppercase tracking-widest border border-black px-8 py-4 text-black hover:bg-black hover:text-white transition-all">
              Vedi Tutti
            </Link>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            {[
              {t: 'Villa sul Garda', c: 'Residenziale', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80'},
              {t: 'Boutique Milano', c: 'Commerciale', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80'},
              {t: 'Loft Industrial', c: 'Living', img: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80'}
            ].map((item, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.2 }}
                 className="group relative h-[65vh] overflow-hidden cursor-pointer"
               >
                  <img src={item.img} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out" alt={item.t} />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500"></div>
                  
                  <div className="absolute bottom-8 left-8">
                     <h4 className="text-3xl font-light text-white drop-shadow-lg">{item.t}</h4>
                     <span className="text-white/90 text-xs uppercase tracking-widest font-bold border-l-2 border-[#ff5149] pl-3">{item.c}</span>
                  </div>
               </motion.div>
            ))}
         </div>

         <div className="mt-12 text-center md:hidden">
            <Link to="/projects" className="text-xs uppercase tracking-widest border border-black px-8 py-4 text-black hover:bg-black hover:text-white transition-all">
              Vedi Tutti i Progetti
            </Link>
         </div>
      </section>

      {/* 6. CALL TO ACTION FINALE */}
      <section className="py-24 bg-gray-50 border-t border-gray-200 text-center px-4">
        <h2 className="text-3xl md:text-5xl font-thin mb-8 leading-tight">
          Pronto a trasformare <br/> il tuo spazio?
        </h2>
        <Link to="/contact">
           <button className="bg-black text-white px-12 py-5 uppercase text-xs font-bold tracking-[0.2em] hover:bg-[#ff5149] transition-colors duration-300">
             Inizia un Progetto
           </button>
        </Link>
      </section>
    </div>
  );
};

export default Home;