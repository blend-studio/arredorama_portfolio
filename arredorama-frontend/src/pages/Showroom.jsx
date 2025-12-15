import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Immagini placeholder (sostituisci con foto reali del tuo showroom)
const GALLERY_IMAGES = [
  { id: 1, src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200", alt: "Showroom Main View", span: "md:col-span-2 md:row-span-2" },
  { id: 2, src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800", alt: "Kitchen Detail", span: "md:col-span-1 md:row-span-1" },
  { id: 3, src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800", alt: "Living Area", span: "md:col-span-1 md:row-span-1" },
  { id: 4, src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800", alt: "Materials", span: "md:col-span-2 md:row-span-1" },
];

const Showroom = () => {
  return (
    <div className="w-full bg-white text-[#1a1a1a] font-jost pt-24 md:pt-32">
      
      {/* Header Intro */}
      <section className="container mx-auto px-6 md:px-12 lg:px-20 mb-16 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, duration: 0.8 } }
          }}
        >
          <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-[#00b7cd] uppercase tracking-[0.3em] text-xs font-bold mb-6 block">
            Experience Design
          </motion.span>
          <motion.h1 variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            Il Nostro Showroom
          </motion.h1>
          <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-gray-500 text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed">
            Uno spazio espositivo di 500mq dove il design prende vita. 
            Non un semplice negozio, ma un laboratorio creativo dove toccare con mano 
            materiali, finiture e le ultime novità dei migliori brand italiani.
          </motion.p>
        </motion.div>
      </section>

      {/* Gallery Grid */}
      <section className="container mx-auto px-6 md:px-12 lg:px-20 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
          {GALLERY_IMAGES.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`relative group overflow-hidden ${img.span}`}
            >
              <motion.img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.7 }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sezione Materioteca (Dark Mode) */}
      <section className="bg-[#1a1a1a] text-white py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <motion.div 
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, ease: "easeOut" }}
           >
             <span className="text-[#00b7cd] uppercase tracking-[0.2em] text-xs font-bold mb-4 block">Il Cuore del Progetto</span>
             <h2 className="text-3xl md:text-5xl font-bold mb-6">La Materioteca</h2>
             <p className="text-gray-400 text-lg font-light mb-8 leading-relaxed">
               Crediamo che il design si debba toccare. Nella nostra materioteca custodiamo una vasta selezione di campioni: 
               legni pregiati, marmi, tessuti tecnici, pelli e finiture metalliche. 
               Qui, insieme ai nostri architetti, potrai creare moodboard personalizzate per visualizzare in anteprima l'atmosfera della tua casa.
             </p>
             <Link to="/contact" className="inline-block border border-white/30 px-8 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
               Prenota una consulenza
             </Link>
           </motion.div>
           <motion.div 
             initial={{ clipPath: 'inset(0 100% 0 0)' }}
             whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
             viewport={{ once: true }}
             transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
             className="h-[400px] md:h-[500px] bg-gray-800 rounded-sm overflow-hidden relative"
           >
             <img src="https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?q=80&w=1000" className="w-full h-full object-cover opacity-90" alt="Materioteca" />
           </motion.div>
        </div>
      </section>

      {/* Info & Visit */}
      <section className="container mx-auto px-6 md:px-12 lg:px-20 py-24 grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold mb-8">Vieni a trovarci</h3>
          <div className="space-y-6 text-lg font-light text-gray-600">
            <div>
              <p className="font-medium text-black mb-1">Indirizzo</p>
              <p>Via del Design, 42 - 20121 Milano (MI)</p>
            </div>
            <div>
              <p className="font-medium text-black mb-1">Orari Showroom</p>
              <p>Lun - Ven: 09:30 - 13:00 / 14:30 - 19:00</p>
              <p>Sabato: 10:00 - 18:00 (su appuntamento)</p>
            </div>
            <div className="pt-4">
              <a href="mailto:info@arredorama.it" className="text-[#00b7cd] underline underline-offset-4 hover:text-black transition-colors">info@arredorama.it</a>
            </div>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-100 h-[300px] md:h-full min-h-[300px] relative rounded-sm overflow-hidden"
        >
           {/* Placeholder per Google Maps */}
           <iframe 
             title="Map"
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.3!2d9.1!3d45.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDI0JzAwLjAiTiA5wrAwNiowMC4wIkU!5e0!3m2!1sit!2sit!4v1600000000000!5m2!1sit!2sit" 
             width="100%" 
             height="100%" 
             style={{ border: 0, filter: 'grayscale(100%)' }} 
             allowFullScreen="" 
             loading="lazy"
           ></iframe>
        </motion.div>
      </section>
    </div>
  );
};

export default Showroom;