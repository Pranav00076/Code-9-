import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Eye, Code, Heart, ThumbsUp } from 'lucide-react';
import { PROJECTS_DATA } from '../data';

interface ProjectsProps {
  isDark: boolean;
}

export default function Projects({ isDark }: ProjectsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.75 
        : scrollLeft + clientWidth * 0.75;
      
      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="projects" className="relative py-24 px-6 md:px-12 overflow-hidden z-25">
      <div className={`absolute top-0 right-1/4 w-96 h-96 rounded-full blur-[140px] opacity-10 pointer-events-none bg-brand-cyan/30`} />

      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-[1px] bg-brand-cyan" />
              <span className="text-[10px] font-mono tracking-widest text-[#06B6D4] font-bold uppercase">Community Lab</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight leading-none uppercase">
              ACTIVE VENTURES
            </h2>
          </div>

          <div className="flex items-center space-x-3 self-start md:self-auto">
            <button
              onClick={() => scroll('left')}
              className={`p-3.5 rounded-xl border transition-all ${
                isDark 
                  ? 'border-gray-800 bg-[#0F0F12] text-white hover:border-brand-cyan hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
                  : 'border-gray-200 bg-white text-gray-800 hover:border-brand-purple hover:shadow-[0_4px_12px_rgba(139,92,246,0.15)]'
              }`}
              aria-label="Scroll projects left"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className={`p-3.5 rounded-xl border transition-all ${
                isDark 
                  ? 'border-gray-800 bg-[#0F0F12] text-white hover:border-brand-cyan hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
                  : 'border-gray-200 bg-white text-gray-800 hover:border-brand-purple hover:shadow-[0_4px_12px_rgba(139,92,246,0.15)]'
              }`}
              aria-label="Scroll projects right"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory no-scrollbar scroll-smooth"
          style={{ scrollbarWidth: 'none' }}
        >
          {PROJECTS_DATA.map((project, idx) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -6 }}
              className={`flex-none w-[290px] sm:w-[380px] snap-start rounded-2xl border backdrop-blur-xl relative overflow-hidden transition-all group flex flex-col justify-between ${
                isDark 
                  ? 'border-white/5 bg-[#0b0b0dc0] hover:border-brand-cyan/30' 
                  : 'border-black/5 bg-white/90 hover:border-brand-purple/30 hover:shadow-xl'
              }`}
            >
              <div>
                <div className="h-48 w-full relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <span className="absolute top-4 left-4 text-[10px] font-mono tracking-wider font-extrabold px-2.5 py-1 rounded bg-[#0A0A0ACC] text-brand-cyan border border-brand-cyan/20 backdrop-blur-md">
                    PROJECT {idx + 1}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.map(tag => (
                      <span 
                        key={tag}
                        className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-purple/10 text-brand-purple"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className={`text-lg font-bold font-display uppercase tracking-tight mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {project.title}
                  </h3>

                  <p className={`text-xs font-light leading-relaxed mb-4 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {project.tagline}
                  </p>
                </div>
              </div>

              <div className={`p-6 pt-0 flex items-center justify-between border-t border-solid-[1px] ${
                isDark ? 'border-white/5' : 'border-black/5'
              }`}>
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan" />
                  <span className={`text-[10px] font-mono tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    by {project.author}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="flex items-center gap-1 text-[10px] font-mono text-brand-cyan">
                    <Heart className="w-3.5 h-3.5 text-brand-purple fill-brand-purple" />
                    <span>{project.likes}</span>
                  </span>

                  <button 
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest border transition-all ${
                      isDark 
                        ? 'border-gray-800 bg-[#0F0F12] text-[#F8FAFC] hover:border-brand-cyan hover:shadow-[0_0_10px_rgba(6,182,212,0.3)]' 
                        : 'border-gray-200 bg-white text-[#0A0A0A] hover:border-brand-purple hover:shadow-[0_4px_10px_rgba(139,92,246,0.15)]'
                    }`}
                  >
                    Inspect
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className={`text-center mt-4 text-[10px] font-mono tracking-widest uppercase ${
          isDark ? 'text-gray-600' : 'text-gray-400'
        }`}>
          Swipe trackpad or hold shift + scroll to inspect live nodes
        </div>

      </div>
    </section>
  );
}
