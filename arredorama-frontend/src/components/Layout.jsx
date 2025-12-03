import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer'; // Crealo se vuoi, o usa un div semplice per ora

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      {/* Footer Globale */}
      <footer className="py-10 text-center border-t border-white/10 text-xs text-gray-500 uppercase tracking-widest">
        &copy; 2025 Arredorama Design
      </footer>
    </div>
  );
};

export default Layout;