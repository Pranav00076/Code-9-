import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data';

interface TestimonialsProps {
  isDark: boolean;
}

export default function Testimonials({ isDark }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const currentTestimonial = TESTIMONIALS_DATA[activeIndex];

  return (
    <section id="nexus" className="relative py-24 px-6 md:px-12 overflow-hidden z-25">
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[140px] opacity-10 pointer-events-none bg-brand-purple/40`} />

      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-[1px] bg-brand-cyan" />
            <span className="text-[10px] font-mono tracking-widest text-[#06B6D4] font-bold uppercase">The Peer Nexus</span>
            <span className="w-8 h-[1px] bg-brand-cyan" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight leading-none mb-4 uppercase">
            MEMBER STATEMENTS
          </h2>
          <p className={`text-sm font-light ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Real testimonials from engineers inside our production lab matrix.
          </p>
        </div>

        <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative px-4 sm:px-12"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`rounded-3xl p-8 md:p-12 border backdrop-blur-xl relative flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.3)] ${
                isDark 
                  ? 'bg-[#0b0b0eef] border-brand-cyan/20 shadow-[0_0_40px_rgba(6,182,212,0.03)]' 
                  : 'bg-white/90 border-brand-purple/20 shadow-[0_12px_40px_rgba(139,92,246,0.06)]'
              }`}
            >
              <span className="absolute top-0 left-0 h-[3px] w-1/3 bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple rounded-full" />

              <div className="absolute top-8 right-8 pointer-events-none opacity-10">
                <Quote className={`w-20 h-20 ${isDark ? 'text-brand-cyan' : 'text-brand-purple'}`} />
              </div>

              <blockquote className={`text-lg md:text-xl font-light italic leading-relaxed mb-8 relative z-10 ${
                isDark ? 'text-gray-200' : 'text-gray-800'
              }`}>
                &ldquo;{currentTestimonial.quote}&rdquo;
              </blockquote>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-solid-[1px] border-gray-800/10">
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-brand-blue via-brand-cyan to-brand-purple">
                    <img 
                      src={currentTestimonial.avatar} 
                      alt={currentTestimonial.name} 
                      className="w-full h-full object-cover rounded-full bg-black"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold uppercase tracking-wide font-display ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {currentTestimonial.name}
                    </h4>
                    <p className={`text-xs font-mono ${isDark ? 'text-[#8B5CF6]' : 'text-brand-blue'}`}>
                      {currentTestimonial.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-brand-cyan fill-brand-cyan" />
                  ))}
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          <div className="static sm:absolute inset-y-0 left-0 right-0 flex justify-center sm:justify-between items-center sm:pointer-events-none mt-6 sm:mt-0 gap-4">
            <button
              onClick={handlePrev}
              className={`p-3 rounded-xl border sm:pointer-events-auto transition-all ${
                isDark 
                  ? 'border-gray-800 bg-[#0F0F12] text-white hover:border-brand-cyan' 
                  : 'border-gray-200 bg-white text-gray-800 hover:border-brand-purple'
              }`}
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className={`p-3 rounded-xl border sm:pointer-events-auto transition-all ${
                isDark 
                  ? 'border-gray-800 bg-[#0F0F12] text-white hover:border-brand-cyan' 
                  : 'border-gray-200 bg-white text-gray-800 hover:border-brand-purple'
              }`}
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex justify-center space-x-2.5 mt-8">
          {TESTIMONIALS_DATA.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === i 
                  ? 'w-6 bg-brand-cyan shadow-[0_0_8px_rgba(6,182,212,0.6)]' 
                  : 'w-2 bg-gray-700/50 hover:bg-gray-700'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
