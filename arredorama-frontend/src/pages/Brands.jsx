import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Dati placeholder per i brand (da sostituire con i tuoi loghi/immagini reali)
const BRANDS_DATA = [
  { id: 1, name: "Poliform", category: "Living & Kitchens", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800" },
  { id: 2, name: "Minotti", category: "Sofas & Armchairs", image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=800" },
  { id: 3, name: "B&B Italia", category: "Contemporary Design", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800" },
  { id: 4, name: "Flos", category: "Lighting", image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=800" },
  { id: 5, name: "Molteni&C", category: "Furniture", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800" },
  { id: 6, name: "Artemide", category: "Lighting Design", image: "https://images.unsplash.com/photo-1507473888900-52e1adad5420?q=80&w=800" },
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

      {/* Griglia Brand */}
      <section className="container mx-auto px-6 md:px-12 lg:px-20 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BRANDS_DATA.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative h-[400px] overflow-hidden cursor-pointer bg-gray-100"
            >
              {/* Immagine */}
              <img 
                src={brand.image} 
                alt={brand.name} 
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
              />
              
              {/* Overlay scuro */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500"></div>

              {/* Testo */}
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="overflow-hidden">
                  <h3 className="text-3xl font-bold text-white mb-1 transform translate-y-0 transition-transform duration-500">
                    {brand.name}
                  </h3>
                </div>
                <p className="text-white/80 text-xs uppercase tracking-widest font-medium border-l-2 border-[#00b7cd] pl-3">
                  {brand.category}
                </p>
              </div>
            </motion.div>
          ))}
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
