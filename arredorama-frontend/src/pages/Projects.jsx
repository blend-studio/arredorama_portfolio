import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

// Fallback se il backend non è acceso
const FALLBACK_PROJECTS = [
    { id: 1, title: 'Cucina Monolite', category: 'Cucine', image_url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070' },
    { id: 2, title: 'Living Sospeso', category: 'Living', image_url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974' },
    { id: 3, title: 'Suite Hotel', category: 'Notte', image_url: 'https://images.unsplash.com/photo-1616594039964-40891a909d72?q=80&w=2066' },
    { id: 4, title: 'Bagno Marmo', category: 'Bagni', image_url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfe1?q=80&w=2070' },
    { id: 5, title: 'Lobby Minimal', category: 'Contract', image_url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069' },
    { id: 6, title: 'Isola White', category: 'Cucine', image_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053' },
];

const Projects = () => {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [filtered, setFiltered] = useState(FALLBACK_PROJECTS);
  const [activeCat, setActiveCat] = useState('All');

  // Recupera i dati veri se disponibili
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/projects')
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
    <div className="w-full min-h-screen bg-[#1a1a1a] text-white pt-32 pb-20 px-6 md:px-12">
      
      {/* Header */}
      <motion.div 
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-white/10 pb-8"
      >
        <div>
           <span className="text-[#ff5149] uppercase tracking-[0.2em] text-xs font-bold">Lavori Selezionati</span>
           <h1 className="text-5xl md:text-7xl font-thin mt-2">Portfolio.</h1>
        </div>
        
        {/* Filtri */}
        <div className="flex flex-wrap gap-6 mt-8 md:mt-0 justify-end">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => filter(cat)}
              className={`text-xs font-bold uppercase tracking-widest transition-all duration-300 relative
                ${activeCat === cat ? 'text-white' : 'text-gray-600 hover:text-gray-300'}
              `}
            >
              {cat}
              {activeCat === cat && (
                  <motion.div layoutId="underline" className="absolute -bottom-2 left-0 w-full h-[1px] bg-[#ff5149]" />
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Griglia Masonry Animata */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnimatePresence>
          {filtered.map((p, i) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              key={p.id}
              className={`group cursor-pointer relative ${i % 2 !== 0 ? 'md:mt-16' : ''}`} // Effetto sfalsato
            >
              <div className="overflow-hidden relative w-full aspect-[3/4] bg-gray-900">
                <img 
                   src={p.image_url} 
                   alt={p.title}
                   className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-1000 ease-out" 
                />
                
                {/* Overlay all'hover */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500"></div>
              </div>
              
              <div className="mt-6">
                 <h3 className="text-xl font-light group-hover:translate-x-2 transition-transform duration-300">{p.title}</h3>
                 <span className="text-xs text-gray-500 uppercase tracking-widest">{p.category}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Projects;