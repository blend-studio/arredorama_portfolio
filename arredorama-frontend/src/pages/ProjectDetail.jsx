import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

// URL base del backend
const API_BASE_URL = 'http://127.0.0.1:8000';

// Fallback se il backend non è acceso (stessi dati di Projects.jsx per coerenza)
const FALLBACK_PROJECTS = [
    { id: 1, title: 'Cucina Monolite', category: 'Cucine', image_url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070' },
    { id: 2, title: 'Living Sospeso', category: 'Living', image_url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974' },
    { id: 3, title: 'Suite Hotel', category: 'Notte', image_url: 'https://images.unsplash.com/photo-1616594039964-40891a909d72?q=80&w=2066' },
    { id: 4, title: 'Bagno Marmo', category: 'Bagni', image_url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfe1?q=80&w=2070' },
    { id: 5, title: 'Lobby Minimal', category: 'Contract', image_url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069' },
    { id: 6, title: 'Isola White', category: 'Cucine', image_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053' },
];

const getImageUrl = (imageUrl) => {
  if (!imageUrl) return '';
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  const cleanPath = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
  return `${API_BASE_URL}${cleanPath}`;
};

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cerchiamo prima nel backend
    axios.get(`${API_BASE_URL}/api/projects/${id}`)
      .then(res => {
        setProject(res.data);
        setLoading(false);
      })
      .catch(() => {
        // Se fallisce, cerchiamo nei fallback
        const found = FALLBACK_PROJECTS.find(p => p.id === parseInt(id));
        setProject(found);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="w-full h-screen flex items-center justify-center bg-white">Loading...</div>;
  if (!project) return <div className="w-full h-screen flex items-center justify-center bg-white">Progetto non trovato</div>;

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
        ease: [0.6, -0.05, 0.01, 0.99] // Custom ease (Bezier)
      }
    }
  };

  const imageContainerVariants = {
    hidden: { clipPath: 'inset(10% 5% 10% 5%)', opacity: 0 }, // Parte più piccolo
    visible: {
      clipPath: 'inset(0% 0% 0% 0%)', // Si espande a tutto schermo
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.6, 0.01, 0.05, 0.95], // Corrected bezier curve
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
      className="w-full bg-white text-black pt-32 pb-20 relative"
    >
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header Progetto */}
        <div className="mb-12">
           <motion.div variants={itemVariants}>
             <Link to="/projects" className="text-xs uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-4 inline-block">← Torna ai Progetti</Link>
           </motion.div>
           <motion.span variants={itemVariants} className="text-[#ff5149] uppercase tracking-[0.2em] text-xs font-bold block mb-2">{project.category}</motion.span>
           <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tighter">{project.title}</motion.h1>
        </div>

        {/* Immagine Principale con effetto Reveal */}
        <motion.div 
           variants={imageContainerVariants}
           className="w-full h-[60vh] md:h-[80vh] overflow-hidden mb-20 bg-gray-100 relative"
        >
           <motion.img 
             variants={imageScaleVariants}
             src={getImageUrl(project.image_url)} 
             alt={project.title} 
             onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/1200x800?text=No+Image"; }}
             className="w-full h-full object-cover" 
           />
        </motion.div>

        {/* Contenuto Dettagliato */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
           <div className="md:col-span-1">
              <motion.div variants={itemVariants} className="border-t border-black pt-6 mb-8">
                 <span className="block text-xs uppercase text-gray-400 tracking-widest mb-1">Cliente</span>
                 <span className="font-medium text-lg">Privato</span>
              </motion.div>
              <motion.div variants={itemVariants} className="border-t border-gray-200 pt-6 mb-8">
                 <span className="block text-xs uppercase text-gray-400 tracking-widest mb-1">Anno</span>
                 <span className="font-medium text-lg">2024</span>
              </motion.div>
              <motion.div variants={itemVariants} className="border-t border-gray-200 pt-6 mb-8">
                 <span className="block text-xs uppercase text-gray-400 tracking-widest mb-1">Servizi</span>
                 <span className="font-medium text-lg">Interior Design, Lighting</span>
              </motion.div>
           </div>

           <div className="md:col-span-2">
              <motion.h2 variants={itemVariants} className="text-3xl font-light mb-8 leading-tight">Il concept del progetto</motion.h2>
              <motion.div variants={itemVariants} className="text-gray-600 font-light text-lg leading-relaxed space-y-6">
                 <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                 </p>
                 <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                 </p>
                 <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                 </p>
              </motion.div>
           </div>
        </div>

        {/* Altre Immagini */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
           <motion.div variants={itemVariants} className="h-[50vh] bg-gray-100 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Detail 1" />
           </motion.div>
           <motion.div variants={itemVariants} className="h-[50vh] bg-gray-100 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Detail 2" />
           </motion.div>
        </div>

      </div>
    </motion.div>
  );
};

export default ProjectDetail;
