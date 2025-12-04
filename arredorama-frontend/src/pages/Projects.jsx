import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

// URL base del backend
const API_BASE_URL = 'http://127.0.0.1:8000';

// Fallback se il backend non è acceso
const FALLBACK_PROJECTS = [
    { id: 1, title: 'Cucina Monolite', category: 'Cucine', image_url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070' },
    { id: 2, title: 'Living Sospeso', category: 'Living', image_url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974' },
    { id: 3, title: 'Suite Hotel', category: 'Notte', image_url: 'https://images.unsplash.com/photo-1616594039964-40891a909d72?q=80&w=2066' },
    { id: 4, title: 'Bagno Marmo', category: 'Bagni', image_url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfe1?q=80&w=2070' },
    { id: 5, title: 'Lobby Minimal', category: 'Contract', image_url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069' },
    { id: 6, title: 'Isola White', category: 'Cucine', image_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053' },
];

// Funzione per ottenere l'URL completo dell'immagine
const getImageUrl = (imageUrl) => {
  if (!imageUrl) return '';
  // Se è già un URL completo (http/https), restituiscilo così com'è
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  // Altrimenti, aggiungi l'URL base del backend
  return `${API_BASE_URL}${imageUrl}`;
};

const Projects = () => {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [filtered, setFiltered] = useState(FALLBACK_PROJECTS);
  const [activeCat, setActiveCat] = useState('All');
  const [selectedId, setSelectedId] = useState(null); // Stato per il progetto selezionato

  // Recupera i dati veri se disponibili
  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/projects`)
      .then(res => {
         if(res.data.length > 0) {
            setProjects(res.data);
            setFiltered(res.data);
         }
      })
      .catch(() => console.log("Backend non raggiungibile, uso dati fallback"));
  }, []);

  const filter = (cat) => {
    setActiveCat(cat);
    setFiltered(cat === 'All' ? projects : projects.filter(p => p.category === cat));
  };

  const categories = ['All', 'Cucine', 'Living', 'Notte', 'Bagni', 'Contract'];

  return (
    // LIGHT MODE: Sfondo bianco e testo nero
    <div className="w-full min-h-screen bg-white text-black pt-32 pb-20 px-6 md:px-12 relative">
      
      {/* Header */}
      <motion.div 
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-gray-200 pb-8"
      >
        <div>
           <span className="text-[#ff5149] uppercase tracking-[0.2em] text-xs font-bold">Lavori Selezionati</span>
           <h1 className="text-5xl md:text-7xl font-thin mt-2 tracking-tighter">Portfolio.</h1>
        </div>
        
        {/* Filtri */}
        <div className="flex flex-wrap gap-8 mt-8 md:mt-0 justify-end">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => filter(cat)}
              className={`text-xs font-bold uppercase tracking-widest transition-all duration-300 relative pb-2
                ${activeCat === cat ? 'text-black' : 'text-gray-400 hover:text-black'}
              `}
            >
              {cat}
              {activeCat === cat && (
                  // Linea nera per il tema chiaro
                  <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-[2px] bg-black" />
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Griglia Masonry Animata */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <AnimatePresence>
          {filtered.map((p, i) => (
            <motion.div 
              layoutId={`card-${p.id}`} // ID univoco per l'animazione condivisa
              onClick={() => setSelectedId(p.id)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              key={p.id}
              // Effetto Masonry: sfalsa le colonne pari
              className={`group cursor-pointer relative ${i % 2 !== 0 ? 'md:mt-20' : ''}`}
            >
              <div className="overflow-hidden relative w-full aspect-[3/4] bg-gray-100">
                <motion.img 
                   layoutId={`image-${p.id}`} // ID univoco per l'immagine
                   src={getImageUrl(p.image_url)} 
                   alt={p.title}
                   className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out" 
                />
                
                {/* Overlay leggero all'hover per dare profondità */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-500"></div>
              </div>
              
              <motion.div layoutId={`info-${p.id}`} className="mt-6">
                 <h3 className="text-2xl font-light group-hover:text-[#ff5149] transition-colors duration-300">{p.title}</h3>
                 <span className="text-xs text-gray-400 uppercase tracking-widest font-bold mt-1 block">{p.category}</span>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* MODAL FULLSCREEN ANIMATO */}
      <AnimatePresence>
        {selectedId && (
          <>
            {/* Backdrop sfocato */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[150]"
            />

            {/* Card Espansa */}
            <div className="fixed inset-0 z-[160] flex items-center justify-center pointer-events-none px-4">
               {projects.filter(p => p.id === selectedId).map(item => (
                 <motion.div
                   layoutId={`card-${item.id}`}
                   key={item.id}
                   className="bg-white w-full max-w-5xl h-[85vh] md:h-[70vh] shadow-2xl overflow-hidden flex flex-col md:flex-row pointer-events-auto"
                 >
                    {/* Immagine (Sinistra o Top) */}
                    <div className="w-full md:w-2/3 h-1/2 md:h-full relative overflow-hidden">
                       <motion.img 
                         layoutId={`image-${item.id}`}
                         src={getImageUrl(item.image_url)} 
                         className="w-full h-full object-cover"
                       />
                       <button 
                         onClick={() => setSelectedId(null)}
                         className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white hover:text-black transition-all md:hidden"
                       >
                         ✕
                       </button>
                    </div>

                    {/* Contenuto (Destra o Bottom) */}
                    <div className="w-full md:w-1/3 p-8 md:p-12 flex flex-col justify-center bg-white relative">
                       <button 
                         onClick={() => setSelectedId(null)}
                         className="absolute top-6 right-6 text-2xl hover:text-[#ff5149] transition-colors hidden md:block"
                       >
                         ✕
                       </button>

                       <motion.div layoutId={`info-${item.id}`}>
                          <span className="text-[#ff5149] uppercase tracking-[0.2em] text-xs font-bold mb-2 block">{item.category}</span>
                          <h2 className="text-4xl md:text-5xl font-thin mb-6 leading-tight">{item.title}</h2>
                       </motion.div>

                       <motion.div
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.2, duration: 0.5 }}
                       >
                          <p className="text-gray-500 font-light leading-relaxed mb-8">
                            {item.description || "Un progetto unico che unisce design contemporaneo e funzionalità, studiato nei minimi dettagli per offrire un'esperienza abitativa senza compromessi."}
                          </p>
                          
                          <div className="grid grid-cols-2 gap-6 border-t border-gray-100 pt-6">
                             <div>
                                <span className="block text-xs uppercase text-gray-400 tracking-widest mb-1">Anno</span>
                                <span className="font-medium">2024</span>
                             </div>
                             <div>
                                <span className="block text-xs uppercase text-gray-400 tracking-widest mb-1">Cliente</span>
                                <span className="font-medium">Privato</span>
                             </div>
                          </div>
                       </motion.div>
                    </div>
                 </motion.div>
               ))}
            </div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Projects;