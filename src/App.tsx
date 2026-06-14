import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Benefits from './components/Benefits';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import JoinCTA from './components/JoinCTA';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

interface CursorTrailProps {
  mousePos: { x: number; y: number };
  isDark: boolean;
}

function CursorTrail({ mousePos, isDark }: CursorTrailProps) {
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

    // Initial check
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
      {/* Outer Glow Halo with physical spring trailing */}
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
      {/* Ultra sharp inner focus dot */}
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

const SECTION_METADATA: Record<string, { title: string; dsc: string }> = {
  home: {
    title: "Code9 Community | Vanguard Developer Cooperative",
    dsc: "Elite cooperative ecosystem for vanguard developers, digital architects, and systems engineers preparing the autonomous future."
  },
  manifesto: {
    title: "The Manifesto | Code9 Community",
    dsc: "Explore the Code9 Manifesto. Unleashing T-shaped technical talent through peer-to-peer co-shipping, rigorous mentorship circles, and paid sandbox challenges."
  },
  services: {
    title: "Services & Tech Labs | Code9 Community",
    dsc: "Discover our high-performing development labs focusing on highly-scalable Web Development (React/WASM), App Development, and curated Learning Resource Vaults."
  },
  nexus: {
    title: "Nexus Collective | Code9 Community",
    dsc: "Connect with Code9's expansive developer directory featuring over 500 vanguard members, interactive expert mentors, and elite shared projects."
  },
  projects: {
    title: "Active Sandboxes & Builds | Code9 Community",
    dsc: "View production prototypes, secure browser defense frameworks, and decentralization kernels shipped live by the Code9 cooperative."
  },
  benefits: {
    title: "Community Benefits & Growth | Code9 Community",
    dsc: "Accelerate your mastery. Master modern frontend capabilities, acquire paid workspace bounties, and access private expert layers."
  }
};

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });
  const [bootMetric, setBootMetric] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  // Track intersection of scroll sections to update headers for elite SEO optimization
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

  // Cinematic simulator loader ticker
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

  // Track window scroll progress and apply body theme colors smoothly
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

  // Cursor pointer tracking
  useEffect(() => {
    const updateMousePos = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePos);
    return () => window.removeEventListener('mousemove', updateMousePos);
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
      <AnimatePresence mode="wait">
        {isLoading ? (
          /* CINEMATIC FUTURISTIC LOADING SCREEN */
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeOut' } }}
            className="fixed inset-0 bg-[#0A0A0A] z-999 flex flex-col items-center justify-center p-6"
          >
            {/* Visual tech matrix grid background */}
            <div className="absolute inset-0 grid-bg opacity-20" />

            <div className="max-w-md w-full relative z-10 flex flex-col items-center">
              {/* Spinning abstract logo loader */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 rounded-full border-2 border-dashed border-brand-cyan flex items-center justify-center mb-8"
              >
                <div className="w-10 h-10 rounded-full border border-brand-purple flex items-center justify-center">
                  <div className="w-4 h-4 bg-brand-blue rounded-full" />
                </div>
              </motion.div>

              {/* Loader logo */}
              <div className="font-display text-2xl font-black mb-1 select-none flex items-center tracking-widest text-[#F8FAFC]">
                <span className="text-brand-cyan select-none">{"{"}</span>
                <span>CODE9</span>
                <span className="text-brand-purple select-none">{"}"}</span>
              </div>

              <div className="text-[10px] font-mono tracking-widest text-gray-500 uppercase mb-8">
                COMMUNITY DECRYPT INTEGRITY
              </div>

              {/* Progress counter segment */}
              <div className="w-full bg-gray-900 h-[2px] rounded-full overflow-hidden mb-3.5 relative">
                <motion.div 
                  className="h-full bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple rounded-full"
                  style={{ width: `${Math.min(bootMetric, 100)}%` }}
                />
              </div>

              {/* Dynamic status line logs */}
              <div className="flex justify-between w-full font-mono text-[9px] text-gray-400 tracking-wider">
                <span>BUFFERING ARTIFACTS: {Math.min(bootMetric, 100)}%</span>
                <span className="text-brand-cyan">PORT: 3000 // SECURE</span>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ACTIVE APPLICATION CONTENT SCREEN */
          <motion.div
            key="app-main"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            {/* Interactive Smooth Floating Pointer Glow - responsive behavior */}
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

            {/* Premium Cursor soft-glow trailing follow effect */}
            <CursorTrail mousePos={mousePos} isDark={isDark} />

            {/* Sticky Navigation Header */}
            <Navbar 
              isDark={isDark} 
              onToggleTheme={handleToggleTheme} 
              scrollProgress={scrollProgress} 
            />

            {/* Segment Layout Panels */}
            <main className="flex-1">
              <Hero isDark={isDark} />
              
              <About isDark={isDark} />
              
              <Services isDark={isDark} />
              
              <Benefits isDark={isDark} />
              
              <Projects isDark={isDark} />
              
              <Testimonials isDark={isDark} />
              
              <JoinCTA isDark={isDark} />
            </main>

            {/* Persistent System Footer */}
            <Footer isDark={isDark} />

            {/* Cybernetic AI Chatbot Companion Panel */}
            <Chatbot isDark={isDark} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </HelmetProvider>
  );
}
