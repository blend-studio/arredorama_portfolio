import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

// IMPORT IMMAGINI LOCALI (file effettivi presenti nella cartella)
import heroImg from '../assets/images/SPAZIO-DELLE-IDEE/lo-spazio-delle-idee-arredorama-progettazione-1.jpg';
import conceptImg1 from '../assets/images/SPAZIO-DELLE-IDEE/lo-spazio-delle-idee-arredorama-progettazione-architettura-interior-design2.jpg';
import conceptImg2 from '../assets/images/SPAZIO-DELLE-IDEE/moodboard-arredorama-768x768.jpg';
import mood1 from '../assets/images/SPAZIO-DELLE-IDEE/moodboard-arredorama-2-768x768.jpg';
import mood2 from '../assets/images/SPAZIO-DELLE-IDEE/moodboard-arredorama3-768x768.jpg';
import mood3 from '../assets/images/SPAZIO-DELLE-IDEE/moodboard-arredorama4-768x768.jpg';

const MATERIALS = [
  {
    id: 1,
    title: "Legni & Essenze",
    desc: "Dal rovere naturale al noce canaletto, fino alle essenze più rare ed esotiche. Selezioniamo legni che raccontano una storia attraverso le loro venature.",
    image: mood1
  },
  {
    id: 2,
    title: "Pietre & Marmi",
    desc: "Superfici eterne che donano carattere agli ambienti. Marmi pregiati, graniti e pietre naturali, ma anche gres di ultima generazione per prestazioni tecniche elevate.",
    image: mood2
  },
  {
    id: 3,
    title: "Tessuti & Pelli",
    desc: "Una materioteca tessile completa: velluti, lini, cotoni e pelli lavorate artigianalmente per vestire i tuoi arredi con eleganza e comfort tattile.",
    image: mood3
  },
  {
    id: 4,
    title: "Metalli & Finiture",
    desc: "Dettagli che fanno la differenza. Ottone brunito, acciaio satinato, rame e laccature speciali per impreziosire ogni elemento del progetto.",
    image: conceptImg2
  }
];

const SpazioIdee = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const yHero = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div className="w-full bg-white text-[#1a1a1a] font-jost pt-24 md:pt-32">
      
      {/* Header Intro */}
      <section className="container mx-auto px-6 md:px-12 lg:px-20 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#00b7cd] uppercase tracking-[0.3em] text-xs font-bold mb-6 block">
            Materioteca
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            Spazio delle Idee
          </h1>
          <p className="text-gray-500 text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed">
            Il luogo dove la creatività incontra la materia. Un archivio in continua evoluzione 
            di materiali, finiture e superfici per dare corpo ai tuoi progetti e trasformare 
            l'ispirazione in realtà tangibile.
          </p>
        </motion.div>
      </section>

      {/* Hero Image */}
      <section ref={heroRef} className="w-full h-[50vh] md:h-[70vh] overflow-hidden relative mb-24">
        <motion.img 
          style={{ y: yHero }}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={heroImg} 
          alt="Materioteca Arredorama" 
          className="w-full h-[120%] object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </section>

      {/* Concept Section */}
      <section className="container mx-auto px-6 md:px-12 lg:px-20 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Dal campione alla realtà</h2>
            <div className="space-y-6 text-gray-600 text-lg font-light leading-relaxed">
              <p>
                Crediamo che il design non debba essere solo immaginato, ma toccato. 
                Nel nostro <strong>Spazio delle Idee</strong>, architetti e clienti possono esplorare 
                accostamenti materici, verificare la resa della luce sulle superfici e 
                costruire vere e proprie <em>moodboard</em> fisiche.
              </p>
              <p>
                Ogni progetto è unico e merita una "pelle" su misura. La nostra materioteca 
                è uno strumento di lavoro fondamentale per definire l'identità di ogni ambiente, 
                selezionando con cura ogni dettaglio cromatico e tattile.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
             <img src={conceptImg1} className="w-full h-64 object-cover rounded-sm mt-12" alt="Samples" />
             <img src={conceptImg2} className="w-full h-64 object-cover rounded-sm" alt="Moodboard" />
          </motion.div>
        </div>
      </section>

      {/* Materials Grid */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">La nostra selezione</h3>
            <p className="text-gray-500">Esplora le categorie della nostra materioteca</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {MATERIALS.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -15, transition: { duration: 0.3 } }}
                className="bg-white p-6 shadow-sm hover:shadow-2xl transition-all duration-300 group cursor-pointer"
              >
                <div className="h-48 overflow-hidden mb-6 rounded-sm">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#1a1a1a] text-white text-center">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Vieni a toccare con mano</h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">Prenota un appuntamento con i nostri interior designer per esplorare la materioteca e iniziare a progettare i tuoi spazi.</p>
            <Link to="/contact" className="inline-block bg-[#00b7cd] text-white px-10 py-4 text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all duration-300">
              Prenota Consulenza
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SpazioIdee;