import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useAnimation } from 'framer-motion';
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

// Componente Sezione Parallax (Salient Style - Text Behind/Blend)
const ParallaxTextSection = () => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Movimento orizzontale del testo (Due righe opposte)
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);
  
  return (
    <section ref={ref} className="relative h-[80vh] md:h-[100vh] overflow-hidden flex flex-col justify-center bg-[#f0f0f0]">
       
       {/* Immagine di Sfondo */}
       <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070" 
            className="w-full h-full object-cover"
            alt="Architecture Background"
          />
          {/* Overlay leggero per far risaltare il testo bianco se l'immagine è chiara, o viceversa */}
          <div className="absolute inset-0 bg-black/10"></div>
       </div>
       
       {/* Contenitore Testo - Mix Blend Mode per effetto "fusione" simile al masking */}
       <div className="relative z-10 flex flex-col justify-center h-full pointer-events-none mix-blend-overlay">
          
          {/* Riga 1 */}
          <motion.div style={{ x: x1 }} className="whitespace-nowrap">
             <span className="text-[18vw] font-black text-white uppercase tracking-tighter leading-[0.85]">
                Arredorama Architecture
             </span>
          </motion.div>

          {/* Riga 2 */}
          <motion.div style={{ x: x2 }} className="whitespace-nowrap ml-[-20%]">
             <span className="text-[18vw] font-black text-white uppercase tracking-tighter leading-[0.85]">
                Interior Design Studio
             </span>
          </motion.div>

       </div>
    </section>
  );
};

// Immagini rotonde per la sezione "Text with Images"
const INLINE_IMAGES = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=200", // Cucina
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=200", // Living
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=200", // Interior
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=200", // Architecture
];

// Componente Sezione Testo con Immagini Inline (Salient Style)
const TextWithImagesSection = () => {
  return (
    <section className="py-32 md:py-40 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Label superiore */}
          <span className="text-[#ff5149] uppercase tracking-[0.3em] text-xs font-bold mb-6 block">
            ARREDORAMA
          </span>
          
          {/* Titolo principale con immagini inline */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light leading-[1.4] md:leading-[1.5] text-black max-w-5xl mx-auto">
            Stiamo{' '}
            <span className="inline-flex items-center align-middle mx-2">
              <img src={INLINE_IMAGES[0]} className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover inline-block" alt="" />
            </span>
            {' '}cambiando il modo in cui{' '}
            <span className="font-semibold underline decoration-2 underline-offset-4">l'interior design</span>
            {' '}è{' '}
            <span className="inline-flex items-center align-middle mx-2">
              <img src={INLINE_IMAGES[1]} className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover inline-block" alt="" />
            </span>
            {' '}progettato per i clienti, utilizzando la nostra esperienza{' '}
            <span className="inline-flex items-center align-middle mx-2">
              <img src={INLINE_IMAGES[2]} className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover inline-block" alt="" />
            </span>
            {' '}per offrire{' '}
            <span className="inline-flex items-center align-middle mx-2">
              <img src={INLINE_IMAGES[3]} className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover inline-block" alt="" />
            </span>
            {' '}soluzioni su misura nel nostro{' '}
            <span className="font-semibold underline decoration-2 underline-offset-4">processo creativo</span>.
          </h2>

          {/* Sottotitolo */}
          <p className="mt-12 text-gray-500 text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed">
            Il grande spazio delle idee. Arredorama si occupa da oltre trent'anni di fornitura di arredi, progettazione e realizzazione di spazi interni, offrendo un servizio chiavi in mano professionale.
          </p>

          {/* CTA */}
          <Link to="/about" className="mt-10 inline-flex items-center gap-3 text-sm uppercase tracking-widest font-medium hover:text-[#ff5149] transition-colors group">
            Scopri la nostra storia
            <span className="group-hover:translate-x-2 transition-transform">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

// Dati per la sezione Servizi con Scroll
const SERVICES_DATA = [
  {
    num: "01",
    title: "Consulenza Globale",
    description: "Il nostro lavoro è la nostra passione e ci porta a confrontarci quotidianamente con il cliente: centro e punto di partenza di ogni nostro progetto. Ascoltare, capire i desideri e realizzare i sogni di chi si affida a noi è sempre stato il nostro obiettivo più importante.",
    longDesc: "Progettare secondo un fine, cercare di sviluppare un'idea che soddisfi pienamente le richieste e creare l'ambiente in cui il cliente si possa sentire \"a casa\" è la prerogativa del nostro team di interior designers.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200"
  },
  {
    num: "02",
    title: "Sopralluogo e Rilievo",
    description: "La cura dei dettagli è indispensabile per una corretta progettazione: capire com'è strutturato l'immobile ed averne una visione globale permette di porre particolare attenzione sia all'estetica sia agli aspetti pratici e funzionali.",
    longDesc: "Per questo motivo il nostro team interno di progettisti sono sempre disponibili ad effettuare rilievi e misure direttamente in cantiere avvalendosi di precise strumentazioni e supportati da una lunga esperienza nel settore.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200"
  },
  {
    num: "03",
    title: "Interior Design, Progettazione & Pratiche",
    description: "Oltre a distribuire i miglior brand e prodotti di arredamento e design, offriamo al cliente un servizio di progettazione completo e personalizzato sulle specifiche richieste.",
    longDesc: "La progettazione è un'attività che si articola in più fasi di lavoro. Dal sopralluogo, dal rilievo degli spazi e dalle esigenze del cliente deriva il progetto preliminare, con una prima distribuzione degli spazi.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200"
  },
  {
    num: "04",
    title: "Rendering 3D",
    description: "La nostra progettazione è svolta con l'impiego delle più moderne tecnologie per la modellazione e la rappresentazione grafica delle soluzioni che proponiamo: è così che le nostre idee prendono forma.",
    longDesc: "Grazie allo sviluppo dei render inseriamo, nel modo più realistico possibile, i materiali scelti per il progetto, le finiture e gli arredi, per dare un effetto il più fedele possibile all'idea originale.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200"
  },
  {
    num: "05",
    title: "Illuminotecnica: Il Design della Luce",
    description: "Altro aspetto fondamentale nella fase di progettazione di un ambiente, è sicuramente la Luce. Grazie alla collaborazione dei più importanti brand legati all'illuminazione di design, siamo in grado di fornire un vero e proprio calcolo illuminotecnico.",
    longDesc: "In questo modo denotiamo le linee guida e gli standard di riferimento per soddisfare le necessità del cliente, creando ambienti perfettamente illuminati.",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1200"
  }
];

const SERVICE_EASING = [0.16, 1, 0.3, 1];

const serviceSlideVariants = {
  initial: { opacity: 0, y: 120 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: SERVICE_EASING }
  }
};

const serviceTextVariants = {
  initial: { opacity: 0, x: -40 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.15, duration: 0.7, ease: SERVICE_EASING }
  }
};

const serviceImageVariants = {
  initial: { opacity: 0, scale: 1.08 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0.1, duration: 1.1, ease: SERVICE_EASING }
  }
};

// Componente Sezione Servizi a slider verticale (Salient Style)
const ServicesScrollSection = () => {
  return (
    <section className="bg-white">
      {/* Header della sezione */}
      <div className="container mx-auto px-6 md:px-12 py-20 border-b border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
          <div>
            <span className="text-[#ff5149] uppercase tracking-[0.3em] text-xs font-bold mb-4 block">I NOSTRI SERVIZI</span>
            <h2 className="text-4xl md:text-6xl font-light text-black leading-tight">
              Diamo valore<br />ai tuoi spazi.
            </h2>
          </div>
          <div className="md:text-right">
            <Link to="/services" className="inline-flex items-center gap-4 border border-black px-8 py-4 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all group">
              <span className="w-8 h-[1px] bg-current"></span>
              Tutti i Servizi
            </Link>
          </div>
        </div>
      </div>

      {/* Slider verticale full screen con snap */}
      <div className="relative h-screen">
        <div
          className="absolute inset-0 overflow-y-scroll snap-y snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {SERVICES_DATA.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={service.num}
                variants={serviceSlideVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ amount: 0.95 }}
                className="snap-start h-screen grid md:grid-cols-2"
              >
                {/* Colonna testo */}
                <motion.div
                  variants={serviceTextVariants}
                  className={`flex items-center bg-white px-8 md:px-16 lg:px-24 ${isEven ? '' : 'md:order-2'}`}
                >
                <div>
                  <span className="text-[#ff5149] text-5xl md:text-7xl font-thin opacity-40">{service.num}</span>
                  <h3 className="text-2xl md:text-3xl font-light text-black mt-6 mb-6">{service.title}</h3>
                  <p className="text-gray-500 font-light leading-relaxed mb-4">{service.description}</p>
                  <p className="text-gray-400 font-light leading-relaxed text-sm md:text-base">{service.longDesc}</p>
                </div>
                </motion.div>

              {/* Colonna immagine */}
                <motion.div
                  variants={serviceImageVariants}
                  className={`relative overflow-hidden ${isEven ? 'md:order-2' : 'md:order-1'}`}
                >
                  <motion.img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1, ease: SERVICE_EASING }}
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-30 transition-opacity duration-500"></div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const scaleImage = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const textControls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      // Fase 1: L'immagine esce (sfondo bianco visibile) -> Testo diventa Nero
      await textControls.start({ color: "#1a1a1a", transition: { duration: 1.5, ease: "easeInOut" } });
      // Fase 2: L'immagine entra (sfondo scuro copre) -> Testo diventa Bianco
      await textControls.start({ color: "#ffffff", transition: { duration: 1.5, ease: "easeInOut" } });
    };
    sequence();
  }, [currentSlide, textControls]);

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

        <motion.div 
           animate={textControls}
           className="relative z-10 text-center px-4 w-full"
        >
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
        </motion.div>
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

      {/* NUOVA SEZIONE PARALLAX (Salient Style) */}
      <ParallaxTextSection />

      {/* NUOVA SEZIONE TESTO CON IMMAGINI INLINE (Salient Style) */}
      <TextWithImagesSection />

      {/* NUOVA SEZIONE SERVIZI CON STICKY SCROLL (Salient Style) */}
      <ServicesScrollSection />

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