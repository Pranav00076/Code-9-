import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Network, ArrowRight } from 'lucide-react';

interface CareerPathProps {
  isDark: boolean;
}

const PATHS = {
  'web-dev': {
    title: 'Web Developer',
    nodes: [
      { id: 'skills', title: 'React & Vite', desc: 'Master component architecture' },
      { id: 'projects', title: 'E-commerce UI', desc: 'Build highly interactive storefronts' },
      { id: 'mentors', title: 'Senior Guidance', desc: 'Code reviews by elite devs' },
      { id: 'challenges', title: 'Speed Run', desc: 'Optimize lighthouse scores' }
    ],
    color: '#06B6D4'
  },
  'ai-engineer': {
    title: 'AI Engineer',
    nodes: [
      { id: 'skills', title: 'Python & PyTorch', desc: 'Neural network fundamentals' },
      { id: 'projects', title: 'LLM Fine-Tuning', desc: 'Custom instruct models' },
      { id: 'mentors', title: 'Research Scientist', desc: 'Algorithm architecture reviews' },
      { id: 'challenges', title: 'Optimization', desc: 'Reduce inference latency' }
    ],
    color: '#8B5CF6'
  },
  'app-dev': {
    title: 'App Developer',
    nodes: [
      { id: 'skills', title: 'Swift & Kotlin', desc: 'Native mobile ecosystems' },
      { id: 'projects', title: 'Fintech Wallet', desc: 'Secure local storage & biometrics' },
      { id: 'mentors', title: 'Mobile Lead', desc: 'App Store deployment strategy' },
      { id: 'challenges', title: '60FPS UI', desc: 'Build complex gesture animations' }
    ],
    color: '#EC4899'
  }
};

type PathKey = keyof typeof PATHS;

export default function CareerPath({ isDark }: CareerPathProps) {
  const [activePath, setActivePath] = useState<PathKey>('web-dev');

  return (
    <section id="career-path" className="relative py-24 px-6 md:px-12 overflow-hidden z-25">
      <div className="max-w-7xl mx-auto relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative z-10"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.04, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="absolute -top-12 md:-top-20 left-1/2 transform -translate-x-1/2 text-[50px] sm:text-[80px] md:text-[140px] font-black font-display pointer-events-none select-none tracking-widest uppercase -z-10"
          >
            GROW
          </motion.div>
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-6 h-[2px] bg-brand-blue" />
            <span className="text-[10px] font-mono tracking-widest text-brand-blue uppercase font-bold flex items-center gap-2">
              <Network className="w-3 h-3" /> Career Vector
            </span>
            <div className="w-6 h-[2px] bg-brand-blue" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight uppercase">
            Dynamic Path Builder
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {(Object.keys(PATHS) as PathKey[]).map(key => (
            <button
              key={key}
              onClick={() => setActivePath(key)}
              className={`px-6 py-3 rounded-full text-xs font-bold font-mono uppercase tracking-widest transition-all ${
                activePath === key
                  ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                  : isDark
                  ? 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  : 'bg-black/5 text-gray-600 hover:bg-black/10 hover:text-black'
              }`}
            >
              {PATHS[key].title}
            </button>
          ))}
        </div>

        <div className="relative max-w-4xl mx-auto h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activePath}
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 grid grid-cols-1 md:grid-cols-4 gap-6 items-center"
            >
              {PATHS[activePath].nodes.map((node, i) => (
                <div key={node.id} className="relative group">
                  {i < PATHS[activePath].nodes.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 left-[calc(50%+40px)] w-full h-[2px] bg-gray-800 -z-10">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.8, delay: 0.2 + (i * 0.3) }}
                        className="h-full relative"
                        style={{ backgroundColor: PATHS[activePath].color, boxShadow: `0 0 10px ${PATHS[activePath].color}` }}
                      />
                    </div>
                  )}

                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.5, delay: i * 0.3 }}
                    className={`flex flex-col items-center p-6 rounded-2xl border backdrop-blur-md transition-transform hover:-translate-y-2 ${
                      isDark ? 'bg-black/60 border-white/10' : 'bg-white/80 border-black/10'
                    }`}
                  >
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-4 relative"
                      style={{ backgroundColor: `${PATHS[activePath].color}20` }}
                    >
                      <span className="font-mono text-xl font-bold" style={{ color: PATHS[activePath].color }}>
                        0{i + 1}
                      </span>
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-2 border-dashed opacity-30"
                        style={{ borderColor: PATHS[activePath].color }}
                      />
                    </div>
                    <h3 className="text-sm font-bold font-display uppercase tracking-wider mb-2 text-center">{node.title}</h3>
                    <p className={`text-[10px] text-center font-mono leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {node.desc}
                    </p>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
