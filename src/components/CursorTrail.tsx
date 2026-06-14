import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CursorTrailProps {
  mousePos: { x: number; y: number };
  isDark: boolean;
}

interface Burst {
  id: number;
  x: number;
  y: number;
}

export default function CursorTrail({ mousePos, isDark }: CursorTrailProps) {
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const [hoverTarget, setHoverTarget] = useState<{x: number, y: number, width: number, height: number} | null>(null);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      setClicked(true);
      setBursts(prev => [...prev, { id: Date.now(), x: e.clientX, y: e.clientY }]);
    };
    const handleMouseUp = () => setClicked(false);
    
    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // If hovering over interactive elements, enable magnetic effect
      if (target && (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a'))) {
        const rect = target.getBoundingClientRect();
        setHoverTarget({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, width: rect.width, height: rect.height });
      } else {
        setHoverTarget(null);
      }
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousemove', handleMouseMove);

    if (window.innerWidth > 768) {
      setVisible(true);
    }

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Remove bursts after animation
  useEffect(() => {
    if (bursts.length > 0) {
      const timeout = setTimeout(() => {
        setBursts(prev => prev.slice(1));
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [bursts]);

  // Magnetic position calculation
  const targetX = hoverTarget ? hoverTarget.x : mousePos.x;
  const targetY = hoverTarget ? hoverTarget.y : mousePos.y;
  const targetScale = hoverTarget ? 1.5 : (clicked ? 0.6 : 1);

  return (
    <>
      <motion.div
        className={`fixed pointer-events-none rounded-full z-50 transition-opacity duration-300 hidden md:block ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        animate={{
          left: targetX,
          top: targetY,
          width: 38 * targetScale,
          height: 38 * targetScale,
          boxShadow: isDark
            ? '0 0 18px rgba(6, 182, 212, 0.45), inset 0 0 10px rgba(6, 182, 212, 0.25)'
            : '0 0 18px rgba(139, 92, 246, 0.45), inset 0 0 10px rgba(139, 92, 246, 0.25)',
          border: isDark ? '1px solid rgba(6, 182, 212, 0.5)' : '1px solid rgba(139, 92, 246, 0.5)',
          borderRadius: hoverTarget ? '8px' : '50%', // Square up slightly on hover
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

      {/* Click Bursts */}
      <AnimatePresence>
        {bursts.map(burst => (
          <motion.div
            key={burst.id}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed rounded-full pointer-events-none z-40 transform -translate-x-1/2 -translate-y-1/2 ${
              isDark ? 'border-brand-cyan bg-brand-cyan/10' : 'border-brand-purple bg-brand-purple/10'
            }`}
            style={{
              left: burst.x,
              top: burst.y,
              width: 40,
              height: 40,
              borderWidth: 2,
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
}
