import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const Cursor = () => {
  const isClient = typeof window !== 'undefined';
  const isiOS = isClient && (/iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));
  const prefersFinePointer = isClient && window.matchMedia && window.matchMedia('(pointer: fine)').matches;

  // Su iPhone/iPad o su dispositivi senza puntatore "fine" (touch-only) non renderizziamo il cursore.
  // Manteniamo il cursore su desktop anche se il dispositivo supporta touch+mouse (pointer: fine).
  if (isiOS || !prefersFinePointer) return null;

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive =
        target && (target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        (target.closest && target.closest('a')) ||
        (target.closest && target.closest('button')) ||
        (target.closest && target.closest('.cursor-pointer')));

      // Rileva se il puntatore è sopra l'iframe del virtual tour con classe `showroom-map`
      const overShowroomMap = target && ((target.closest && target.closest('.showroom-map-container')) || (target.closest && target.closest('.showroom-map')) || (target.tagName === 'IFRAME' && target.classList && target.classList.contains('showroom-map')));

      if (overShowroomMap) {
        // Disabilita il cursore personalizzato (torna quello di sistema per interagire con la mappa)
        document.documentElement.classList.remove('enable-custom-cursor');
      } else {
        document.documentElement.classList.add('enable-custom-cursor');
      }

      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    const style = document.createElement('style');
    style.innerHTML = `
      .custom-cursor-element { display: none; }
      @media (min-width: 768px) and (hover: hover) and (pointer: fine) {
        .enable-custom-cursor * { cursor: none !important; }
        .enable-custom-cursor .custom-cursor-element { display: block !important; }
      }
      /* Nasconde completamente il cursore e il cursore personalizzato */
      .disable-all-cursor * { cursor: none !important; }
      .disable-all-cursor .custom-cursor-element { display: none !important; }
    `;
    document.head.appendChild(style);
    document.documentElement.classList.add('enable-custom-cursor');

    // Listener diretti su iframe e sul suo contenitore per garantire che entri/escano dalla mappa
    const mapEl = document.querySelector('.showroom-map');
    const mapContainer = document.querySelector('.showroom-map-container');
    const enterMap = () => {
      document.documentElement.classList.add('disable-all-cursor');
      document.documentElement.classList.remove('enable-custom-cursor');
    };
    const leaveMap = () => {
      document.documentElement.classList.remove('disable-all-cursor');
      document.documentElement.classList.add('enable-custom-cursor');
    };

    if (mapEl) {
      mapEl.addEventListener('mouseenter', enterMap);
      mapEl.addEventListener('mouseleave', leaveMap);
    }
    if (mapContainer) {
      mapContainer.addEventListener('mouseenter', enterMap);
      mapContainer.addEventListener('mouseleave', leaveMap);
    }

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      if (mapEl) {
        mapEl.removeEventListener('mouseenter', enterMap);
        mapEl.removeEventListener('mouseleave', leaveMap);
      }
      if (mapContainer) {
        mapContainer.removeEventListener('mouseenter', enterMap);
        mapContainer.removeEventListener('mouseleave', leaveMap);
      }
      document.head.removeChild(style);
      document.documentElement.classList.remove('enable-custom-cursor');
      document.documentElement.classList.remove('disable-all-cursor');
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 bg-[#00b7cd] rounded-full pointer-events-none z-[9999] custom-cursor-element"
      style={{
        translateX: '-50%',
        translateY: '-50%',
        boxShadow: '0 0 20px rgba(0, 183, 205, 0.8), 0 0 10px rgba(0, 183, 205, 0.5)'
      }}
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
        scale: isHovering ? 3 : 1,
        opacity: isHovering ? 0.5 : 1
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25, mass: 0.5 }}
    />
  );
};
