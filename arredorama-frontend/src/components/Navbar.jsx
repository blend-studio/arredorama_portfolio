import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 py-6 px-10 flex justify-between items-center transition-all duration-300 ${isHome ? 'bg-transparent' : 'bg-[#1a1a1a]/90 backdrop-blur-md'}`}>
      <Link to="/" className="text-2xl font-thin tracking-tighter text-white uppercase mix-blend-difference">
        Arredorama
      </Link>
      
      <div className="space-x-8 hidden md:flex">
        {['About', 'Projects', 'Contact'].map((item) => (
          <Link 
            key={item} 
            to={`/${item.toLowerCase()}`}
            className="text-white text-xs font-bold uppercase tracking-[0.2em] hover:text-[#ff5149] transition-colors"
          >
            {item}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;