import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        
        {/* --- CALL TO ACTION --- */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-thin mb-8">
            Hai un progetto in mente?
          </h2>
          <Link to="/contact">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-10 py-4 uppercase text-xs font-bold tracking-[0.2em] hover:bg-[#ff5149] hover:text-white transition-colors duration-300"
            >
              Parliamone
            </motion.button>
          </Link>
        </div>

        {/* --- LINKS & INFO --- */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-10 text-xs text-gray-500 uppercase tracking-widest">
          
          {/* Logo / Nome */}
          <div className="mb-4 md:mb-0">
            <span className="text-white font-bold">Arredorama</span> &copy; 2025
          </div>

          {/* Link Social (Placeholder) */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
            <a href="#" className="hover:text-white transition-colors">Linkedin</a>
          </div>

          {/* Privacy */}
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Credits</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;