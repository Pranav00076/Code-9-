import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  scrollProgress: number;
}

export default function Navbar({ isDark, onToggleTheme, scrollProgress }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Charts', href: '/charts' },
    { name: 'Gaming', href: '/gaming' },
    { name: 'Projects', href: '/projects' },
    { name: 'Benefits', href: '/benefits' }
  ];

  const logoVariant = {
    hover: { scale: 1.05 }
  };

  const [clicks, setClicks] = useState(0);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setClicks(c => c + 1);
  };

  return (
    <header 
      style={{
        background: scrolled 
          ? (isDark ? 'rgba(10, 10, 10, 0.85)' : 'rgba(248, 250, 252, 0.85)') 
          : 'transparent',
        borderColor: scrolled 
          ? (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)') 
          : 'transparent'
      }}
      className={`fixed top-0 left-0 right-0 h-20 flex items-center justify-between px-6 md:px-12 z-50 transition-all duration-300 border-b backdrop-blur-md`}
    >
      <div 
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple transition-all duration-100"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <Link 
        to="/"
        onClick={handleLogoClick as any}
        className="logo font-display text-2xl font-black tracking-tight flex items-center select-none cursor-pointer hover:scale-105 transition-transform"
      >
        <motion.div
          animate={clicks > 3 ? { rotate: 360, filter: 'hue-rotate(90deg)' } : {}}
          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          onAnimationComplete={() => { if (clicks > 3) setClicks(0) }}
          className="flex items-center"
        >
          <span className="text-brand-cyan mr-1 font-mono font-bold animate-pulse">{"{"}</span>
          <span className={`${isDark ? 'text-[#F8FAFC]' : 'text-[#0A0A0A]'} font-extrabold mr-1 tracking-wider`}>CODE9</span>
          <span className="text-brand-purple font-mono font-bold animate-pulse">{"}"}</span>
        </motion.div>
      </Link>

      <nav className="hidden md:flex items-center space-x-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className={`relative text-xs uppercase tracking-widest font-semibold ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors duration-200 group py-2`}
          >
            {link.name}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-cyan transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}
      </nav>

      <div className="hidden md:flex items-center space-x-4">
        <motion.button
          onClick={onToggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`p-2.5 rounded-full border ${isDark ? 'border-gray-800 bg-[#0F0F12] text-brand-cyan hover:border-brand-cyan hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'border-gray-200 bg-white text-brand-purple hover:border-brand-purple hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]'} transition-all`}
          aria-label="Toggle Theme Mode"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </motion.button>

        <motion.a
          href="#join"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest rounded-lg border leading-none transition-all ${
            isDark 
              ? 'bg-[#F8FAFC] text-[#0A0A0A] hover:bg-transparent hover:text-white hover:border-white shadow-[0_0_20px_rgba(248,250,252,0.15)] hover:shadow-none' 
              : 'bg-[#0A0A0A] text-[#F8FAFC] hover:bg-transparent hover:text-[#0A0A0A] hover:border-[#0A0A0A] shadow-[0_4px_12px_rgba(10,10,10,0.15)] hover:shadow-none'
          }`}
        >
          Enter Universe
        </motion.a>
      </div>

      <div className="flex items-center space-x-3 md:hidden">
        <button
          onClick={onToggleTheme}
          className={`p-2 rounded-lg border ${isDark ? 'border-gray-800 bg-gray-900/60 text-brand-cyan' : 'border-gray-200 bg-gray-100 text-brand-purple'}`}
        >
          {isDark ? <Sun className="w-4 h-4 animate-spin-slow" /> : <Moon className="w-4 h-4" />}
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2 rounded-lg border ${isDark ? 'border-gray-800 text-white hover:bg-gray-950' : 'border-gray-200 text-gray-800 hover:bg-gray-100'} transition-all`}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`absolute top-20 left-0 right-0 border-b flex flex-col p-6 z-40 md:hidden gap-4 ${isDark ? 'bg-[#0A0A0AC0] border-[#ffffff10] text-[#F8FAFC] backdrop-blur-xl' : 'bg-[#FAFAFAE0] border-[#00000010] text-[#0A0A0A] backdrop-blur-xl'}`}
          >
            {navLinks.map((link, idx) => (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={link.name}
                className="border-b border-gray-900 border-opacity-10 dark:border-opacity-50"
              >
                <Link
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block text-sm font-semibold tracking-wider uppercase py-2 ${isDark ? 'hover:text-brand-cyan' : 'hover:text-brand-purple'} transition-colors`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              href="#join"
              onClick={() => setIsOpen(false)}
              className={`w-full text-center py-3 rounded-lg text-xs font-bold uppercase tracking-widest ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}
            >
              Enter Universe
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
