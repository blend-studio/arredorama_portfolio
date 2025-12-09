import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useAnimation } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// --- COSTANTI ---
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053", 
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070", 
  "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1920"  
];

const SERVICES_DATA = [
  { num: "01", title: "Consulenza Globale", description: "Il nostro lavoro è la nostra passione e ci porta a confrontarci quotidianamente con il cliente: centro e punto di partenza di ogni nostro progetto. Ascoltare, capire i desideri e realizzare i sogni di chi si affida a noi è sempre stato il nostro obiettivo più importante.", longDesc: "Progettare secondo un fine, cercare di sviluppare un'idea che soddisfi pienamente le richieste e creare l'ambiente in cui il cliente si possa sentire \"a casa\" è la prerogativa del nostro team di interior designers.", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200" },
  { num: "02", title: "Sopralluogo e Rilievo", description: "La cura dei dettagli è indispensabile per una corretta progettazione: capire com'è strutturato l'immobile ed averne una visione globale permette di porre particolare attenzione sia all'estetica sia agli aspetti pratici e funzionali.", longDesc: "Per questo motivo il nostro team interno di progettisti sono sempre disponibili ad effettuare rilievi e misure direttamente in cantiere avvalendosi di precise strumentazioni e supportati da una lunga esperienza nel settore.", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200" },
  { num: "03", title: "Interior Design, Progettazione & Pratiche", description: "Oltre a distribuire i miglior brand e prodotti di arredamento e design, offriamo al cliente un servizio di progettazione completo e personalizzato sulle specifiche richieste.", longDesc: "La progettazione è un'attività che si articola in più fasi di lavoro. Dal sopralluogo, dal rilievo degli spazi e dalle esigenze del cliente deriva il progetto preliminare, con una prima distribuzione degli spazi.", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200" },
  { num: "04", title: "Rendering 3D", description: "La nostra progettazione è svolta con l'impiego delle più moderne tecnologie per la modellazione e la rappresentazione grafica delle soluzioni che proponiamo: è così che le nostre idee prendono forma.", longDesc: "Grazie allo sviluppo dei render inseriamo, nel modo più realistico possibile, i materiali scelti per il progetto, le finiture e gli arredi, per dare un effetto il più fedele possibile all'idea originale.", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200" },
  { num: "05", title: "Illuminotecnica: Il Design della Luce", description: "Altro aspetto fondamentale nella fase di progettazione di un ambiente, è sicuramente la Luce. Grazie alla collaborazione dei più importanti brand legati all'illuminazione di design, siamo in grado di fornire un vero e proprio calcolo illuminotecnico.", longDesc: "In questo modo denotiamo le linee guida e gli standard di riferimento per soddisfare le necessità del cliente, creando ambienti perfettamente illuminati.", image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1200" }
];

const INLINE_IMAGES = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=200", 
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=200", 
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=200", 
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=200"
];

// Import dinamico di tutte le immagini da src/assets
const localImages = import.meta.glob('/src/assets/images/**/*.{png,jpg,jpeg,svg}', { eager: true });

const normalizeImageUrl = (imageValue) => {
  if (!imageValue) return '';
  if (imageValue.startsWith('http://') || imageValue.startsWith('https://')) return imageValue;

  const localKey = `/src/assets${imageValue.startsWith('/') ? imageValue : '/' + imageValue}`;
  
  if (localImages[localKey]) {
    return localImages[localKey].default;
  }

  const cleanPath = imageValue.startsWith('/') ? imageValue : `/${imageValue}`;

  // Fix per GitHub Pages: se siamo in produzione e il path inizia con /images/,
  // usiamo gli asset statici del frontend invece del backend
  if (import.meta.env.PROD && cleanPath.startsWith('/images/')) {
    return `${import.meta.env.BASE_URL}${cleanPath.substring(1)}`;
  }

  return `${API_BASE_URL}${cleanPath}`;
};

// --- COMPONENTI UI ---

const AnimatedText = ({ text, className }) => {
  const letters = Array.from(text);
  const container = { hidden: { opacity: 0 }, visible: (i = 1) => ({ opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 * i } }) };
  const child = { visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } }, hidden: { opacity: 0, y: 50, transition: { type: "spring", damping: 12, stiffness: 100 } } };
  return (
    <motion.div
      style={{ display: "flex", flexWrap: "nowrap", justifyContent: "center", whiteSpace: "nowrap" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {letters.map((letter, index) => (<motion.span variants={child} key={index}>{letter === " " ? "\u00A0" : letter}</motion.span>))}
    </motion.div>
  );
};

const ParallaxTextSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);
  return (
    <section ref={ref} className="relative h-[65vh] md:h-[100vh] overflow-hidden flex flex-col justify-center bg-[#f0f0f0]" style={{ position: 'relative' }}>
       <div className="absolute inset-0 z-0"><img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070" className="w-full h-full object-cover" alt="Background" /><div className="absolute inset-0 bg-black/10"></div></div>
       <div className="relative z-10 flex flex-col justify-center h-full pointer-events-none mix-blend-overlay">
          <motion.div style={{ x: x1 }} className="whitespace-nowrap"><span className="text-[18vw] font-black text-white uppercase tracking-tighter leading-[0.85]">Arredorama Architecture</span></motion.div>
          <motion.div style={{ x: x2 }} className="whitespace-nowrap ml-[-20%]"><span className="text-[18vw] font-black text-white uppercase tracking-tighter leading-[0.85]">Interior Design Studio</span></motion.div>
       </div>
    </section>
  );
};

const TextWithImagesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center">
          <span className="text-[#00b7cd] uppercase tracking-[0.3em] text-xs font-bold mb-6 block">ARREDORAMA</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold leading-[1.4] md:leading-[1.5] text-black max-w-5xl mx-auto">
            Stiamo <span className="inline-flex items-center align-middle mx-2"><img src={INLINE_IMAGES[0]} className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover inline-block" alt="" /></span> cambiando il modo in cui <span className="font-semibold underline decoration-2 underline-offset-4">l'interior design</span> è <span className="inline-flex items-center align-middle mx-2"><img src={INLINE_IMAGES[1]} className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover inline-block" alt="" /></span> progettato, offrendo <span className="inline-flex items-center align-middle mx-2"><img src={INLINE_IMAGES[2]} className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover inline-block" alt="" /></span> soluzioni su misura nel nostro <span className="font-semibold underline decoration-2 underline-offset-4">processo creativo</span>.
          </h2>
          <p className="mt-12 text-gray-500 text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed">Il grande spazio delle idee. Arredorama si occupa da oltre trent'anni di fornitura di arredi, progettazione e realizzazione di spazi interni.</p>
          <Link to="/about" className="mt-10 inline-flex items-center gap-3 text-sm uppercase tracking-widest font-medium hover:text-[#00b7cd] transition-colors group">Scopri la nostra storia <span className="group-hover:translate-x-2 transition-transform">→</span></Link>
        </motion.div>
      </div>
    </section>
  );
};

// --- LOGICA SERVIZI SCROLL JACKING 3D (PINNED) ---

const ServiceCardPinned = ({ service, index, total, scrollYProgress }) => {
  const step = 1 / total;
  const start = step * index;
  const end = start + step;

  const y = useTransform(scrollYProgress, [start, end], ['100vh', '0vh']);
  const rotateX = useTransform(scrollYProgress, [start, end], [45, 0]);
  const scale = useTransform(scrollYProgress, [start, end], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [start, start + (step * 0.5)], [0, 1]);

  if (index === 0) {
    return (
      <div className="absolute inset-0 flex items-start justify-center bg-white pt-12 md:pt-32" style={{ zIndex: index }}>
        <div className="container mx-auto px-5 sm:px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start pt-2 md:pt-0">
            <div className="md:pr-6 lg:pr-12 bg-white md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-2.5 rounded-xl md:p-0 z-20">
              <span className="text-[#00b7cd] text-[1.85rem] sm:text-5xl md:text-7xl lg:text-9xl font-bold opacity-20 block mt-3 mb-1 -ml-1">{service.num}</span>
              <h3 className="text-[1.3rem] sm:text-[1.85rem] md:text-4xl lg:text-6xl font-bold text-black mb-2.5 md:mb-7 leading-tight">{service.title}</h3>
              <p className="text-gray-600 font-light text-[0.92rem] sm:text-base md:text-lg lg:text-xl leading-relaxed mb-2.5 md:mb-6">{service.description}</p>
              <div className="w-12 h-[1px] bg-black mb-2.5 md:mb-6"></div>
              <p className="text-gray-400 font-light text-[0.9rem] md:text-sm lg:text-base leading-relaxed">{service.longDesc}</p>
            </div>
            <div className="relative h-[28vh] sm:h-[34vh] md:h-[45vh] lg:h-[60vh] w-full overflow-hidden shadow-none md:shadow-2xl rounded-sm">
               <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
            </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      style={{ y, rotateX, scale, opacity, zIndex: index + 1, transformPerspective: 1000 }}
      className="absolute inset-0 flex items-start justify-center bg-white origin-bottom pt-12 md:pt-32"
    >
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start pt-2 md:pt-0">
          <div className="md:pr-6 lg:pr-12 bg-white md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-2.5 rounded-xl md:p-0 z-20">
            <span className="text-[#00b7cd] text-[1.85rem] sm:text-5xl md:text-7xl lg:text-9xl font-bold opacity-20 block mt-3 mb-1 -ml-2">{service.num}</span>
            <h3 className="text-[1.3rem] sm:text-[1.85rem] md:text-4xl lg:text-6xl font-bold text-black mb-2.5 md:mb-7 leading-tight">{service.title}</h3>
            <p className="text-gray-600 font-light text-[0.92rem] sm:text-base md:text-lg lg:text-xl leading-relaxed mb-2.5 md:mb-6">{service.description}</p>
            <div className="w-12 h-[1px] bg-black mb-2.5 md:mb-6"></div>
            <p className="text-gray-400 font-light text-[0.9rem] md:text-sm lg:text-base leading-relaxed">{service.longDesc}</p>
          </div>
           <div className="relative h-[28vh] sm:h-[34vh] md:h-[45vh] lg:h-[60vh] w-full overflow-hidden shadow-none md:shadow-2xl rounded-sm">
             <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
          </div>
      </div>
    </motion.div>
  );
};

const ServicesScrollSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const segmentHeight = isMobile ? 140 : 100;

  return (
    <section className="bg-white relative border-t border-gray-100">
      <div className="container mx-auto px-5 sm:px-6 md:px-12 py-6 md:py-10 border-b border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-end">
          <div>
            <span className="text-[#00b7cd] uppercase tracking-[0.3em] text-xs font-bold mb-4 block">I NOSTRI SERVIZI</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">Diamo valore ai tuoi spazi.</h2>
          </div>
          <div className="md:text-right">
          </div>
        </div>
      </div>

      <div ref={containerRef} className="relative" style={{ height: `${SERVICES_DATA.length * segmentHeight}vh`, position: 'relative' }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          <div className="relative w-full h-full">
            {SERVICES_DATA.map((service, index) => (
              <ServiceCardPinned key={service.num} service={service} index={index} total={SERVICES_DATA.length} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- COMPONENTE SLIDER PROGETTI ---

const ProjectSlider = ({ projects }) => {
  const navigate = useNavigate();
  const [width, setWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef();
  const innerRef = useRef();

  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current && innerRef.current) {
        // Calcola la larghezza scorrevole corretta
        const scrollWidth = innerRef.current.scrollWidth;
        const offsetWidth = carouselRef.current.offsetWidth;
        // Aggiungiamo un piccolo buffer per sicurezza
        setWidth(scrollWidth - offsetWidth + 20);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    // Eseguiamo il controllo più volte per assicurarci che il layout sia stabile
    const timer1 = setTimeout(updateWidth, 100);
    const timer2 = setTimeout(updateWidth, 500);

    return () => {
      window.removeEventListener('resize', updateWidth);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [projects]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setTimeout(() => setIsDragging(false), 100);
  };

  const handleCardClick = (projectId, e) => {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    navigate(`/projects/${projectId}`);
  };

  if (projects.length === 0) {
    return (
      <div className="min-w-[85vw] md:min-w-[85vw] lg:min-w-[30vw] h-[65vh] relative bg-gray-100 flex items-center justify-center">
        <p className="text-gray-400">Caricamento progetti...</p>
      </div>
    );
  }

  return (
    <motion.div ref={carouselRef} className="cursor-grab active:cursor-grabbing overflow-hidden">
      <motion.div 
        ref={innerRef}
        drag="x" 
        dragConstraints={{ right: 0, left: -width }} 
        dragElastic={0.1}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        whileTap={{ cursor: "grabbing" }}
        className="flex gap-8 select-none"
      >
        {projects.map((project) => (
          <motion.div 
            key={project.id} 
            className="min-w-[85vw] md:min-w-[85vw] lg:min-w-[30vw] h-[65vh] relative group overflow-hidden cursor-pointer"
            onClick={(e) => handleCardClick(project.id, e)}
          >
            <img 
              src={normalizeImageUrl(project.image_url || project.image)} 
              className="w-full h-full object-cover pointer-events-none select-none transform group-hover:scale-105 transition-transform duration-1000 ease-out" 
              alt={project.title}
              draggable={false}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500 pointer-events-none"></div>
            <div className="absolute bottom-8 left-8 pointer-events-none">
              <h4 className="text-3xl font-bold text-white drop-shadow-lg">{project.title}</h4>
              <span className="text-white/90 text-xs uppercase tracking-widest font-bold border-l-2 border-[#00b7cd] pl-3">{project.category}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

// --- HOME PAGE COMPLETA ---

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [latestProjects, setLatestProjects] = useState([]);
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const scaleImage = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const textControls = useAnimation();

  // Carica gli ultimi progetti dal DB
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/projects`);
        if (Array.isArray(data) && data.length > 0) {
          setLatestProjects(data.slice(0, 6));
        }
      } catch (err) {
        console.log('Home: Impossibile caricare progetti dal backend:', err?.message);
        // Fallback per GitHub Pages o quando il backend non è raggiungibile
        try {
          const fallbackUrl = `${import.meta.env.BASE_URL}projects.json`;
          console.log('Tentativo caricamento fallback da:', fallbackUrl);
          const { data: fallbackData } = await axios.get(fallbackUrl);
          if (Array.isArray(fallbackData) && fallbackData.length > 0) {
            setLatestProjects(fallbackData.slice(0, 6));
          }
        } catch (fallbackErr) {
          console.log('Home: Impossibile caricare progetti di fallback:', fallbackErr?.message);
        }
      }
    };
    loadProjects();
  }, []);

  useEffect(() => {
    const sequence = async () => {
      await textControls.start({ color: "#1a1a1a", transition: { duration: 1.5, ease: "easeInOut" } });
      await textControls.start({ color: "#ffffff", transition: { duration: 1.5, ease: "easeInOut" } });
    };
    sequence();
  }, [currentSlide, textControls]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-white text-[#1a1a1a] font-jost">
      
      {/* 1. Hero */}
      <header className="relative min-h-[80vh] h-screen w-full overflow-hidden flex items-center justify-center">
        <AnimatePresence mode='wait'>
          <motion.div key={currentSlide} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} className="absolute inset-0 z-0">
            <img src={HERO_IMAGES[currentSlide]} className="w-full h-full object-cover" alt="Hero" />
            <div className="absolute inset-0 bg-black/40"></div>
          </motion.div>
        </AnimatePresence>
        <motion.div initial={{ color: "#ffffff" }} animate={textControls} className="relative z-10 text-center px-4 w-full">
           <AnimatedText text="RETHINK ARCHITECTURE" className="whitespace-nowrap text-[8.4vw] sm:text-[7.2vw] md:text-[6vw] font-bold leading-[0.9] tracking-tighter drop-shadow-2xl" />
           <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }} className="mt-8">
              <p className="opacity-90 text-sm md:text-base uppercase tracking-[0.3em] font-medium mb-8">Arredorama Design Studio</p>
              <Link to="/projects"><button className="border border-current/50 bg-white/10 backdrop-blur-md px-10 py-4 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">Esplora Progetti</button></Link>
           </motion.div>
        </motion.div>
      </header>

      {/* 2. Marquee */}
      <div className="w-full bg-white py-10 sm:py-12 overflow-hidden whitespace-nowrap border-b border-gray-100 flex items-center">
        <motion.div animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, duration: 30, ease: "linear" }} className="inline-block text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-gray-200 select-none leading-none">
          INTERIOR · DESIGN · LUXURY · ARREDORAMA · ARCHITECTURE · STYLE · INTERIOR · DESIGN · LUXURY · ARREDORAMA · ARCHITECTURE · STYLE ·
        </motion.div>
      </div>

      {/* 3. Filosofia */}
      <section className="py-16 md:py-24 lg:py-32 container mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <motion.div style={{ y: yParallax }}>
          <span className="text-[#00b7cd] uppercase tracking-[0.2em] text-xs font-bold mb-6 block">Philosophy</span>
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-8 text-black">Disporre gli spazi con <span className="font-serif italic">eleganza</span>, gusto e funzionalità.</h2>
          <div className="text-gray-500 text-lg font-light leading-relaxed mb-8 space-y-6">
            <p>Arredorama si occupa da oltre trent'anni della fornitura di arredi, della progettazione e della realizzazione degli spazi interni relativamente ad abitazioni private e spazi commerciali.</p>
            <p>Assistenza e consulenza nello studio delle esigenze di arredamento e nella scelta del prodotto ideale sono alla base del nostro lavoro.</p>
          </div>
          <Link to="/about" className="group inline-flex items-center gap-2 border-b border-black pb-1 uppercase text-xs tracking-widest hover:text-[#00b7cd] hover:border-[#00b7cd] transition-all">Scopri di più su di noi <span className="group-hover:translate-x-1 transition-transform">→</span></Link>
        </motion.div>
        <div className="h-[50vh] md:h-[60vh] lg:h-[80vh] w-full overflow-hidden relative bg-gray-100">
           <motion.img style={{ scale: scaleImage }} src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="Interior Vision" />
        </div>
      </section>

      <ParallaxTextSection />
      <TextWithImagesSection />
      <ServicesScrollSection />

      {/* 4. Stats */}
      <section className="py-8 md:py-12 bg-[#1a1a1a] text-white">
        <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 text-center">
          {[{ num: "30+", label: "Anni di Esperienza" }, { num: "500+", label: "Progetti Realizzati" }, { num: "100%", label: "Made in Italy" }, { num: "15", label: "Brand Partner" }].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="text-5xl md:text-7xl font-bold mb-2 text-[#00b7cd]">{stat.num}</div>
              <div className="text-xs uppercase tracking-widest text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Preview - Draggable Slider con progetti dal DB */}
      <section className="py-10 md:py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-6 mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-end border-b border-gray-200 pb-6">
            <div><span className="text-gray-400 uppercase tracking-[0.2em] text-xs font-bold mb-2 block">Selected Works</span><h3 className="text-4xl font-bold text-black">Ultimi Progetti</h3></div>
            <Link to="/projects" className="hidden md:block text-xs uppercase tracking-widest border border-black px-8 py-4 text-black hover:bg-black hover:text-white transition-all">Vedi Tutti</Link>
         </div>
         
         <div className='pl-6 md:pl-20'>
            <ProjectSlider projects={latestProjects} />
         </div>

         <div className="mt-12 text-center md:hidden"><Link to="/projects" className="text-xs uppercase tracking-widest border border-black px-8 py-4 text-black hover:bg-black hover:text-white transition-all">Vedi Tutti i Progetti</Link></div>
      </section>

      {/* 6. CTA */}
      <section className="py-16 md:py-24 bg-gray-50 border-t border-gray-200 text-center px-4">
        <h2 className="text-3xl md:text-5xl font-semibold mb-8 leading-tight">Pronto a trasformare <br/> il tuo spazio?</h2>
        <Link to="/contact"><button className="bg-black text-white px-12 py-5 uppercase text-xs font-bold tracking-[0.2em] hover:bg-[#00b7cd] transition-colors duration-300">Inizia un Progetto</button></Link>
      </section>
    </div>
  );
};

export default Home;