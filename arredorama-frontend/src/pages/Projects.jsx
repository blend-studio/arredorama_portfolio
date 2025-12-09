import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

// URL base del backend (personalizzabile da .env)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
const LOCAL_FALLBACK_URL = '/projects.json';

// Fallback di emergenza se fallisce sia backend che file statico
const FALLBACK_PROJECTS = [
  { id: 1, title: 'Cucina Monolite', category: 'Cucine', image_url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070' },
  { id: 2, title: 'Living Sospeso', category: 'Living', image_url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974' },
  { id: 3, title: 'Suite Hotel', category: 'Notte', image_url: 'https://images.unsplash.com/photo-1616594039964-40891a909d72?q=80&w=2066' },
  { id: 4, title: 'Bagno Marmo', category: 'Bagni', image_url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfe1?q=80&w=2070' },
  { id: 5, title: 'Lobby Minimal', category: 'Contract', image_url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069' },
  { id: 6, title: 'Isola White', category: 'Cucine', image_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053' },
];

// Import dinamico di tutte le immagini da src/assets
const localImages = import.meta.glob('/src/assets/images/**/*.{png,jpg,jpeg,svg}', { eager: true });

// Uniforma il path dell'immagine (supporta image_url del backend e image del JSON statico)
const normalizeImageUrl = (imageValue) => {
  if (!imageValue) return '';
  if (imageValue.startsWith('http://') || imageValue.startsWith('https://')) return imageValue;

  const localKey = `/src/assets${imageValue.startsWith('/') ? imageValue : '/' + imageValue}`;

  if (localImages[localKey]) {
    return localImages[localKey].default;
  }

  const cleanPath = imageValue.startsWith('/') ? imageValue : `/${imageValue}`;
  return `${API_BASE_URL}${cleanPath}`;
};

const categories = ['All', 'Cucine', 'Living', 'Notte', 'Bagni', 'Contract'];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [activeCat, setActiveCat] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Scroll to top quando si entra nella pagina
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Recupera i dati veri se disponibili
  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      setError(null);

      // 1. Prima prova il backend
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/projects`);
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.log('Projects: Backend non raggiungibile:', err?.message);
      }

      // 2. Se backend fallisce, prova i dati statici
      try {
        const { data } = await axios.get(LOCAL_FALLBACK_URL);
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.log('Projects: Fallback statico non disponibile:', err?.message);
      }

      // 3. Solo come ultima risorsa usa i fallback hardcoded
      setProjects(FALLBACK_PROJECTS);
      setError('Impossibile caricare i progetti dal server. Visualizzazione dati di esempio.');
      setLoading(false);
    };

    loadProjects();
  }, []);

  // Filtraggio con useMemo - molto più veloce
  const filtered = useMemo(() => {
    if (activeCat === 'All') return projects;
    return projects.filter(p => p.category === activeCat);
  }, [projects, activeCat]);

  // Callback memoizzata per il filtro
  const handleFilter = useCallback((cat) => {
    setActiveCat(cat);
  }, []);

  // Mostra loading mentre carica
  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white text-black pt-28 md:pt-32 pb-20 px-6 md:px-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff5149] mx-auto mb-4"></div>
          <p className="text-gray-500">Caricamento progetti...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white text-black pt-28 md:pt-32 pb-20 px-6 md:px-12 relative">
      
      {/* Messaggio di errore se usa fallback */}
      {error && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

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
              onClick={() => handleFilter(cat)}
              className={`text-xs font-bold uppercase tracking-widest transition-all duration-300 relative pb-2
                ${activeCat === cat ? 'text-black' : 'text-gray-400 hover:text-black'}
              `}
            >
              {cat}
              {activeCat === cat && (
                  <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-[2px] bg-black" />
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Griglia Animata - animazioni più leggere */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={`${i % 2 !== 0 ? 'md:mt-20' : ''}`}
            >
              <Link to={`/projects/${p.id}`} className="block group cursor-pointer relative">
                <div className="overflow-hidden relative w-full aspect-[3/4] bg-gray-100">
                    <img 
                      src={normalizeImageUrl(p.image_url || p.image)} 
                      alt={p.title}
                      loading="lazy"
                      onError={(e) => { e.target.style.display = 'none'; }}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                    />
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
                </div>
                
                <div className="mt-6">
                    <h3 className="text-2xl font-light group-hover:text-[#ff5149] transition-colors duration-300">{p.title}</h3>
                    <span className="text-xs text-gray-400 uppercase tracking-widest font-bold mt-1 block">{p.category}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

    </div>
  );
};

export default Projects;