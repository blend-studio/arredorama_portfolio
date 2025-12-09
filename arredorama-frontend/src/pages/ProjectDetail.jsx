import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

// URL base del backend (personalizzabile da .env)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
const LOCAL_FALLBACK_URL = '/projects.json';

// Fallback se il backend non è acceso (stessi dati di Projects.jsx per coerenza)
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

const normalizeImageUrl = (imageValue) => {
  if (!imageValue) return '';
  if (imageValue.startsWith('http://') || imageValue.startsWith('https://')) return imageValue;

  // Prova a cercare l'immagine in src/assets
  const localKey = `/src/assets${imageValue.startsWith('/') ? imageValue : '/' + imageValue}`;
  
  if (localImages[localKey]) {
    return localImages[localKey].default;
  }

  // Fallback al backend
  const cleanPath = imageValue.startsWith('/') ? imageValue : `/${imageValue}`;
  return `${API_BASE_URL}${cleanPath}`;
};

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Scroll to top quando cambia l'id del progetto
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const loadDetail = async () => {
      setLoading(true);
      setError(null);

      // 1. Prima prova il backend
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/projects/${id}`);
        if (data && data.id) {
          setProject(data);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.log('Dettaglio backend non raggiungibile:', err?.message);
      }

      // 2. Se backend fallisce, prova i dati statici
      try {
        const { data } = await axios.get(LOCAL_FALLBACK_URL);
        const found = Array.isArray(data) ? data.find(p => `${p.id}` === `${id}`) : null;
        if (found) {
          setProject(found);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.log('Fallback statico non disponibile:', err?.message);
      }

      // 3. Solo come ultima risorsa usa i fallback hardcoded
      const found = FALLBACK_PROJECTS.find(p => p.id === parseInt(id));
      if (found) {
        setProject(found);
        setError('Dati di esempio. Il server non è raggiungibile.');
      } else {
        setProject(null);
      }
      setLoading(false);
    };

    loadDetail();
  }, [id]);

  // Loading state con spinner
  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00b7cd] mx-auto mb-4"></div>
          <p className="text-gray-500">Caricamento progetto...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-light mb-4">Progetto non trovato</h2>
          <Link to="/projects" className="text-[#00b7cd] hover:underline">← Torna ai Progetti</Link>
        </div>
      </div>
    );
  }

  // Varianti per le animazioni
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const imageContainerVariants = {
    hidden: { clipPath: 'inset(10% 5% 10% 5%)', opacity: 0 },
    visible: {
      clipPath: 'inset(0% 0% 0% 0%)',
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.6, 0.01, 0.05, 0.95],
        delay: 0.2
      }
    }
  };

  const imageScaleVariants = {
    hidden: { scale: 1.2 },
    visible: {
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
      className="w-full bg-white text-black pt-28 md:pt-32 pb-20 relative"
    >
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Messaggio di errore se usa fallback */}
        {error && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Header Progetto */}
        <div className="mb-12">
           <motion.div variants={itemVariants}>
             <Link to="/projects" className="text-xs uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-4 inline-block">← Torna ai Progetti</Link>
           </motion.div>
           <motion.span variants={itemVariants} className="text-[#00b7cd] uppercase tracking-[0.2em] text-xs font-bold block mb-2">{project.category}</motion.span>
           <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tighter">{project.title}</motion.h1>
        </div>

        {/* Immagine Principale con effetto Reveal */}
        <motion.div 
           variants={imageContainerVariants}
           className="w-full h-[50vh] md:h-[60vh] lg:h-[80vh] overflow-hidden mb-12 md:mb-20 bg-gray-100 relative"
        >
           <motion.img 
             variants={imageScaleVariants}
             src={normalizeImageUrl(project.image_url || project.image)} 
             alt={project.title} 
             onError={(e) => { e.target.style.display = 'none'; }}
             className="w-full h-full object-cover" 
           />
        </motion.div>

        {/* Contenuto Dettagliato */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 lg:gap-24">
           <div className="md:col-span-1">
              <motion.div variants={itemVariants} className="border-t border-black pt-6 mb-8">
                 <span className="block text-xs uppercase text-gray-400 tracking-widest mb-1">Cliente</span>
                 <span className="font-medium text-lg">{project.client || 'Privato'}</span>
              </motion.div>
              <motion.div variants={itemVariants} className="border-t border-gray-200 pt-6 mb-8">
                 <span className="block text-xs uppercase text-gray-400 tracking-widest mb-1">Anno</span>
                 <span className="font-medium text-lg">{project.year || '2024'}</span>
              </motion.div>
              <motion.div variants={itemVariants} className="border-t border-gray-200 pt-6 mb-8">
                 <span className="block text-xs uppercase text-gray-400 tracking-widest mb-1">Servizi</span>
                 <span className="font-medium text-lg">{project.services || 'Interior Design, Lighting'}</span>
              </motion.div>
           </div>

           <div className="md:col-span-2">
              <motion.h2 variants={itemVariants} className="text-3xl font-light mb-8 leading-tight">Il concept del progetto</motion.h2>
              <motion.div variants={itemVariants} className="text-gray-600 font-light text-lg leading-relaxed space-y-6">
                 <p>{project.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}</p>
              </motion.div>
           </div>
        </div>

        {/* Gallery Section */}
        {project.gallery && project.gallery.length > 0 && (
          <motion.div variants={containerVariants} className="mt-24 md:mt-32">
            <motion.h3 variants={itemVariants} className="text-2xl font-light mb-12">Galleria Immagini</motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.gallery.map((img, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  className="w-full h-[40vh] md:h-[50vh] bg-gray-100 overflow-hidden"
                >
                  <img 
                    src={normalizeImageUrl(img)} 
                    alt={`${project.title} - Gallery ${index + 1}`} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </motion.div>
  );
};

export default ProjectDetail;