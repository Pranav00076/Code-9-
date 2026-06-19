import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ChartsSection from './components/ChartsSection';
import GamingSection from './components/GamingSection';
import Projects from './components/Projects';
import Benefits from './components/Benefits';
import ActivityFeed from './components/ActivityFeed';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import CursorTrail from './components/CursorTrail';
import EnquiryForm from './components/EnquiryForm';
import { SECTION_METADATA } from './data';


export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });
  const [bootMetric, setBootMetric] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (isLoading) return;

    const sectionIds = ['home', 'manifesto', 'services', 'nexus', 'projects', 'benefits'];
    const elements = sectionIds.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setBootMetric((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 4;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = totalHeight > 0 ? scrolledY / totalHeight : 0;
      setScrollProgress(ratio);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [easterEggUnlocked, setEasterEggUnlocked] = useState(false);

  useEffect(() => {
    const updateMousePos = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePos);
    return () => window.removeEventListener('mousemove', updateMousePos);
  }, []);

  useEffect(() => {
    let keySequence = '';
    const secretCode = 'nexus';

    const handleKeyDown = (e: KeyboardEvent) => {
      keySequence += e.key.toLowerCase();
      if (keySequence.length > secretCode.length) {
        keySequence = keySequence.slice(-secretCode.length);
      }
      if (keySequence === secretCode) {
        setEasterEggUnlocked(true);
        setTimeout(() => setEasterEggUnlocked(false), 5000); // Hide after 5 seconds
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleTheme = () => {
    setIsDark(!isDark);
  };

  const metadata = SECTION_METADATA[activeSection] || SECTION_METADATA.home;

  return (
    <HelmetProvider>
      <div 
        className={`relative min-h-screen font-sans transition-colors duration-500 overflow-hidden ${
          isDark ? 'bg-[#0A0A0A] text-[#F8FAFC]' : 'bg-[#FAFAFA] text-[#0A0A09]'
        }`}
      >
        <Helmet>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.dsc} />
          <meta property="og:title" content={metadata.title} />
          <meta property="og:description" content={metadata.dsc} />
          <meta name="twitter:title" content={metadata.title} />
          <meta name="twitter:description" content={metadata.dsc} />
        </Helmet>

        {/* Global Background Upgrade */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div 
            animate={{ 
              x: [0, 100, 0, -100, 0], 
              y: [0, 50, 100, 50, 0],
              rotate: [0, 45, 90, 45, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full opacity-[0.03]"
            style={{ background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)' }}
          />
          <motion.div 
            animate={{ 
              x: [0, -100, 0, 100, 0], 
              y: [0, -50, -100, -50, 0],
              rotate: [0, -45, -90, -45, 0]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-[60%] left-[60%] w-[60%] h-[60%] rounded-full opacity-[0.03]"
            style={{ background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)' }}
          />
        </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeOut' } }}
            className="fixed inset-0 bg-[#0A0A0A] z-999 flex flex-col items-center justify-center p-6"
          >
            <div className="absolute inset-0 grid-bg opacity-20" />

            <div className="max-w-md w-full relative z-10 flex flex-col items-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 rounded-full border-2 border-dashed border-brand-cyan flex items-center justify-center mb-8"
              >
                <div className="w-10 h-10 rounded-full border border-brand-purple flex items-center justify-center">
                  <div className="w-4 h-4 bg-brand-blue rounded-full" />
                </div>
              </motion.div>

              <div className="font-display text-2xl font-black mb-1 select-none flex items-center tracking-widest text-[#F8FAFC]">
                <span className="text-brand-cyan select-none">{"{"}</span>
                <span>CODE9</span>
                <span className="text-brand-purple select-none">{"}"}</span>
              </div>

              <div className="text-[10px] font-mono tracking-widest text-gray-500 uppercase mb-8">
                COMMUNITY DECRYPT INTEGRITY
              </div>

              <div className="w-full bg-gray-900 h-[2px] rounded-full overflow-hidden mb-3.5 relative">
                <motion.div 
                  className="h-full bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple rounded-full"
                  style={{ width: `${Math.min(bootMetric, 100)}%` }}
                />
              </div>

              <div className="flex justify-between w-full font-mono text-[9px] text-gray-400 tracking-wider">
                <span>BUFFERING ARTIFACTS: {Math.min(bootMetric, 100)}%</span>
                <span className="text-brand-cyan">PORT: 3000 // SECURE</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="app-main"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            <div 
              className="pointer-events-none fixed w-[350px] h-[350px] rounded-full blur-[130px] opacity-[0.14] transition-transform duration-100 ease-out z-30 transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
              style={{
                left: mousePos.x,
                top: mousePos.y,
                background: isDark
                  ? 'radial-gradient(circle, #06B6D4 10%, #8B5CF6 60%, transparent 100%)'
                  : 'radial-gradient(circle, #3B82F6 10%, #8B5CF6 60%, transparent 100%)'
              }}
            />

            <CursorTrail mousePos={mousePos} isDark={isDark} />

            <Navbar 
              isDark={isDark} 
              onToggleTheme={handleToggleTheme} 
              scrollProgress={scrollProgress} 
            />

            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home isDark={isDark} />} />
                <Route path="/charts" element={<ChartsSection isDark={isDark} />} />
                <Route path="/gaming" element={<GamingSection isDark={isDark} />} />
                <Route path="/projects" element={<Projects isDark={isDark} />} />
                <Route path="/benefits" element={<Benefits isDark={isDark} />} />
                <Route path="/enquiry" element={<EnquiryForm isDark={isDark} />} />
              </Routes>
            </main>

            <Footer isDark={isDark} />

            <ActivityFeed isDark={isDark} />
            <Chatbot isDark={isDark} />

            <AnimatePresence>
              {easterEggUnlocked && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: -50 }}
                  className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[100] pointer-events-none"
                >
                  <div className="bg-brand-purple/20 border-2 border-brand-purple backdrop-blur-xl px-8 py-4 rounded-2xl flex items-center gap-4 shadow-[0_0_50px_rgba(139,92,246,0.6)]">
                    <span className="text-4xl animate-bounce">🏆</span>
                    <div>
                      <h3 className="font-display font-black text-white uppercase tracking-widest">Nexus Unlocked</h3>
                      <p className="text-brand-cyan font-mono text-xs uppercase tracking-wider">Secret Sequence Accepted</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </HelmetProvider>
  );
}
