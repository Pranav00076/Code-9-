import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface CursorTrailProps {
  mousePos: { x: number; y: number };
  isDark: boolean;
}

export default function CursorTrail({ mousePos, isDark }: CursorTrailProps) {
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    
    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    if (window.innerWidth > 768) {
      setVisible(true);
    }

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <motion.div
        className={`fixed pointer-events-none rounded-full z-50 transition-opacity duration-300 hidden md:block ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        animate={{
          left: mousePos.x,
          top: mousePos.y,
          width: clicked ? 22 : 38,
          height: clicked ? 22 : 38,
          boxShadow: isDark
            ? '0 0 18px rgba(6, 182, 212, 0.45), inset 0 0 10px rgba(6, 182, 212, 0.25)'
            : '0 0 18px rgba(139, 92, 246, 0.45), inset 0 0 10px rgba(139, 92, 246, 0.25)',
          border: isDark ? '1px solid rgba(6, 182, 212, 0.5)' : '1px solid rgba(139, 92, 246, 0.5)',
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 280,
          mass: 0.45,
        }}
        style={{
          x: '-50%',
          y: '-50%',
        }}
      />
      <div 
        className={`fixed w-2 h-2 rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 hidden md:block ${
          visible ? 'opacity-90' : 'opacity-0'
        } ${isDark ? 'bg-brand-cyan' : 'bg-brand-purple'}`}
        style={{
          left: mousePos.x,
          top: mousePos.y,
        }}
      />
    </>
  );
}
