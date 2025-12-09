import React, { useState, useEffect } from 'react';
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

// Debug: stampa le chiavi disponibili
console.log('Projects: Immagini locali disponibili:', Object.keys(localImages));

// Uniforma il path dell'immagine (supporta image_url del backend e image del JSON statico)
const normalizeImageUrl = (imageValue) => {
  if (!imageValue) return '';
  if (imageValue.startsWith('http://') || imageValue.startsWith('https://')) return imageValue;

  // Prova a cercare l'immagine in src/assets
  // Il path dal DB è tipo: /images/ARREDORAMA-SMALL/foto.jpg
  // Il path nel glob è: /src/assets/images/ARREDORAMA-SMALL/foto.jpg
  const localKey = `/src/assets${imageValue.startsWith('/') ? imageValue : '/' + imageValue}`;
  
  // Debug per immagini specifiche che non vanno
  if (imageValue.includes('RENZI')) {
     console.log(`Projects: Cerco immagine Renzi: ${localKey}`, { trovato: !!localImages[localKey] });
  }

  if (localImages[localKey]) {
    return localImages[localKey].default;
  }

  // Fallback al backend se non trovata localmente
  const cleanPath = imageValue.startsWith('/') ? imageValue : `/${imageValue}`;
  return `${API_BASE_URL}${cleanPath}`;
};

const Projects = () => {
  // Inizia con array vuoti, non con fallback
  const [projects, setProjects] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCat, setActiveCat] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Recupera i dati veri se disponibili
  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      setError(null);
      console.log('Projects: Inizio caricamento progetti...');
      console.log('Projects: API_BASE_URL:', API_BASE_URL);

      // 1. Prima prova il backend
      try {
        console.log('Projects: Tentativo caricamento da backend...');
        const { data } = await axios.get(`${API_BASE_URL}/api/projects`);
        console.log('Projects: Risposta backend:', data);
        if (Array.isArray(data) && data.length > 0) {
          console.log('Projects: Progetti caricati dal backend');
          setProjects(data);
          setFiltered(data);
          setLoading(false);
          return; // Successo, esci
        } else {
          console.log('Projects: Backend ha risposto ma senza dati validi');
        }
      } catch (err) {
        console.log('Projects: Backend non raggiungibile o errore:', err?.message);
      }

      // 2. Se backend fallisce, prova i dati statici
      try {
        console.log('Projects: Tentativo caricamento da locale:', LOCAL_FALLBACK_URL);
        const { data } = await axios.get(LOCAL_FALLBACK_URL);
        console.log('Projects: Risposta locale:', data);
        if (Array.isArray(data) && data.length > 0) {
          console.log('Projects: Progetti caricati da locale');
          setProjects(data);
          setFiltered(data);
          setLoading(false);
          return; // Successo, esci
        } else {
          console.log('Projects: Locale ha risposto ma senza dati validi');
        }
      } catch (err) {
        console.log('Projects: Fallback statico non disponibile o errore:', err?.message);
      }

      // 3. Solo come ultima risorsa usa i fallback hardcoded
      console.log('Projects: Uso dati di emergenza (hardcoded)');
      setProjects(FALLBACK_PROJECTS);
      setFiltered(FALLBACK_PROJECTS);
      setError('Impossibile caricare i progetti dal server. Visualizzazione dati di esempio.');
      setLoading(false);
    };

    loadProjects();
  }, []);

  const filter = (cat) => {
    setActiveCat(cat);
    setFiltered(cat === 'All' ? projects : projects.filter(p => p.category === cat));
  };

  const categories = ['All', 'Cucine', 'Living', 'Notte', 'Bagni', 'Contract'];

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
    // LIGHT MODE: Sfondo bianco e testo nero
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
            <Link to={`/projects/${p.id}`} key={p.id} className={`block ${i % 2 !== 0 ? 'md:mt-20' : ''}`}>
                <motion.div 
                layoutId={`card-${p.id}`} // ID univoco per l'animazione condivisa
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                // Effetto Masonry: sfalsa le colonne pari
                className="group cursor-pointer relative"
                >
                <div className="overflow-hidden relative w-full aspect-[3/4] bg-gray-100">
                    <motion.img 
                    layoutId={`image-${p.id}`} // ID univoco per l'immagine
                    src={normalizeImageUrl(p.image_url || p.image)} 
                    alt={p.title}
                    onError={(e) => { e.target.style.display = 'none'; }}
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
            </Link>
          ))}
        </AnimatePresence>
      </motion.div>

    </div>
  );
};

export default Projects;