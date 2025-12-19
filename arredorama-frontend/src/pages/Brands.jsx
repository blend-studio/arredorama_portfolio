import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// IMPORT LOGHI PARTNER (nomi reali trovati in src/assets/images/PARTNERS)
import boffiLogo from '../assets/images/PARTNERS/BOFFI-arredorama.png';
import flosLogo from '../assets/images/PARTNERS/flos-arredorama.png';
import foscariniLogo from '../assets/images/PARTNERS/foscarini-arredorama.png';
import kartellLogo from '../assets/images/PARTNERS/logo-kartell-arredorama.png';
import occhioLogo from '../assets/images/PARTNERS/occhio-arredorama.png';
import rimadesioLogo from '../assets/images/PARTNERS/rimadesio-arredorama.png';
import vitraLogo from '../assets/images/PARTNERS/vitra-arredorama.png';

// Array dei loghi per lo slider (usa i file reali)
const PARTNER_LOGOS = [
  boffiLogo,
  flosLogo,
  foscariniLogo,
  kartellLogo,
  occhioLogo,
  rimadesioLogo,
  vitraLogo
];

const BRAND_CATEGORIES = [
  {
    title: "Kitchen & Living",
    brands: ["Boffi", "Poliform", "Varenna", "Molteni&C", "Dada", "Rimadesio"]
  },
  {
    title: "Sofas & Armchairs",
    brands: ["Minotti", "B&B Italia", "Flexform", "Cassina", "Edra", "Baxter"]
  },
  {
    title: "Lighting",
    brands: ["Flos", "Artemide", "Foscarini", "Occhio", "Davide Groppi", "Vibia"]
  },
  {
    title: "Accessories & Outdoor",
    brands: ["Kartell", "Vitra", "Knoll", "Gervasoni", "Roda", "Paola Lenti"]
  }
];

const Brands = () => {
  return (
    <div className="w-full bg-white text-[#1a1a1a] font-jost pt-24 md:pt-32">
      
      {/* Header Sezione */}
      <section className="container mx-auto px-6 md:px-12 lg:px-20 mb-16 md:mb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#00b7cd] uppercase tracking-[0.3em] text-xs font-bold mb-6 block">
            Partnership d'Eccellenza
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            I Migliori Brand <br/> del Design Italiano
          </h1>
          <p className="text-gray-500 text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed">
            Selezioniamo accuratamente i nostri partner per garantire qualità, innovazione e stile senza tempo. 
            Ogni pezzo d'arredo è scelto per valorizzare i tuoi spazi.
          </p>
        </motion.div>
      </section>

      {/* Slider Loghi Partner (Marquee) - sfondo scuro e loghi più grandi */}
      <section className="w-full overflow-hidden bg-black py-16 mb-24 border-y border-gray-900">
          <div className="container mx-auto px-6 mb-8 text-center">
            <p className="text-base md:text-lg lg:text-xl font-extrabold uppercase tracking-wide text-gray-300">I nostri partner ufficiali</p>
          </div>
        <div className="relative flex w-full">
          <motion.div
            className="flex items-center gap-20 md:gap-32 min-w-full pr-24 md:pr-32"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ 
              ease: "linear", 
              duration: 30, 
              repeat: Infinity 
            }}
          >
            {/* Ripetiamo i loghi 4 volte per garantire un loop fluido su schermi larghi */}
            {[...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, index) => (
              <div key={index} className="flex-shrink-0 h-16 md:h-24 w-auto opacity-80 hover:opacity-100 transition-all duration-500 cursor-pointer">
                <img 
                  src={logo} 
                  alt={`Partner logo ${index}`} 
                  className="h-full w-auto object-contain"
                  onError={(e) => {e.target.style.display = 'none'}} // Nasconde l'immagine se non viene trovata
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Made in Italy Section */}
      <section className="w-full py-20 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div className="h-[400px] md:h-[500px] bg-gray-100 overflow-hidden relative rounded-sm">
             <img src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1000" alt="Made in Italy Detail" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
           </div>
           <motion.div
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
           >
             <span className="text-[#00b7cd] uppercase tracking-[0.2em] text-xs font-bold mb-4 block">Quality First</span>
             <h3 className="text-3xl md:text-5xl font-bold mb-6">L'Eccellenza del Made in Italy</h3>
             <p className="text-gray-500 text-lg font-light leading-relaxed mb-8">
               Il design italiano è sinonimo di eleganza, artigianalità e innovazione in tutto il mondo. 
               Collaboriamo storicamente con le aziende che hanno fatto la storia del design, 
               garantendo ai nostri clienti prodotti che non sono solo oggetti, ma investimenti destinati a durare nel tempo.
             </p>
             <ul className="space-y-4">
               <li className="flex items-center gap-4">
                 <span className="w-8 h-[1px] bg-[#00b7cd]"></span>
                 <span className="text-lg font-medium">Materiali pregiati e sostenibili</span>
               </li>
               <li className="flex items-center gap-4">
                 <span className="w-8 h-[1px] bg-[#00b7cd]"></span>
                 <span className="text-lg font-medium">Lavorazioni artigianali certificate</span>
               </li>
               <li className="flex items-center gap-4">
                 <span className="w-8 h-[1px] bg-[#00b7cd]"></span>
                 <span className="text-lg font-medium">Design iconico e senza tempo</span>
               </li>
             </ul>
           </motion.div>
        </div>
      </section>

      {/* Filosofia Aziendale (Testo da Arredorama.it) */}
      <section className="container mx-auto px-6 md:px-12 lg:px-20 pb-24 pt-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gray-50 p-8 md:p-16 rounded-sm text-center"
        >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Cinquant'anni di Esperienza</h2>
            <div className="max-w-4xl mx-auto space-y-6 text-gray-600 text-lg leading-relaxed font-light">
              <p>
                Fondata da Giordano Bersani, l'azienda prosegue il suo cammino di successo con le idee e le intuizioni dei figli Lucia, Graziella, Mauro e Stefano. 
                Al loro fianco uno staff di architetti, arredatori e designer di assoluto livello.
              </p>
              <p>
                In uno spazio abitativo i particolari vanno scelti con stile ed eleganza e sono in grado di rivoluzionare il risultato finale: 
                questa la filosofia dell'azienda, capace di donare ad ogni progetto un'impronta unica, anche grazie alla possibilità di personalizzare fino in fondo arredamenti, tessuti e tendaggi.
              </p>
              <p>
                Arredare per noi non significa solo vendere prodotti, ma fornire servizi per progettare spazi funzionali che rispondono a precise esigenze tecniche ed estetiche.
              </p>
            </div>
        </motion.div>
      </section>

      {/* Brand Categories List */}
      <section className="bg-[#1a1a1a] text-white py-24">
         <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-4xl font-bold mb-4">I Nostri Settori</h2>
               <p className="text-gray-400">Una selezione completa per ogni ambiente della casa</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
               {BRAND_CATEGORIES.map((cat, idx) => (
                 <motion.div 
                   key={idx}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.1, duration: 0.6 }}
                   className="border-t border-gray-700 pt-8"
                 >
                   <h4 className="text-xl font-bold mb-6 text-[#00b7cd]">{cat.title}</h4>
                   <ul className="space-y-3">
                     {cat.brands.map((brand, bIdx) => (
                       <li key={bIdx} className="text-gray-300 font-light hover:text-white transition-colors cursor-default">
                         {brand}
                       </li>
                     ))}
                   </ul>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-[#f9f9f9] py-20 text-center border-t border-gray-200">
        <h2 className="text-3xl font-semibold mb-6">Cerchi un brand specifico?</h2>
        <Link to="/contact" className="inline-block border border-black px-10 py-4 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300">Contattaci per info</Link>
      </section>
    </div>
  );
};

export default Brands;
