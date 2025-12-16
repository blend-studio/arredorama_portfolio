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

      {/* Filosofia Aziendale (Testo da Arredorama.it) */}
      <section className="container mx-auto px-6 md:px-12 lg:px-20 pb-24">
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

      {/* CTA Footer */}
      <section className="bg-[#f9f9f9] py-20 text-center border-t border-gray-200">
        <h2 className="text-3xl font-semibold mb-6">Cerchi un brand specifico?</h2>
        <Link to="/contact" className="inline-block border border-black px-10 py-4 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300">Contattaci per info</Link>
      </section>
    </div>
  );
};

export default Brands;
