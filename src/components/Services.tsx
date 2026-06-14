import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { SERVICES_DATA } from '../data';
import LucideIcon from './LucideIcon';

interface ServicesProps {
  isDark: boolean;
}

export default function Services({ isDark }: ServicesProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const hoveredRef = React.useRef<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    hoveredRef.current = hoveredIndex;
  }, [hoveredIndex]);

  // Slow continuous rotation
  useEffect(() => {
    let animationFrameId: number;
    let currentRotation = 0;
    
    const animate = () => {
      // Only increment rotation if no node is hovered
      if (hoveredRef.current === null) {
        currentRotation += 0.05;
        setRotation(currentRotation);
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const isMobile = windowWidth < 768;

  return (
    <section id="services" className="relative py-32 px-6 md:px-12 overflow-hidden z-25 min-h-[900px] flex flex-col items-center">
      <div className={`absolute top-1/2 right-0 w-[450px] h-[450px] rounded-full blur-[130px] opacity-10 pointer-events-none bg-brand-cyan/40`} />

      <div className="max-w-7xl mx-auto w-full z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-6 h-[2px] bg-brand-cyan" />
            <span className="text-[10px] font-mono tracking-widest text-brand-cyan uppercase font-bold">Interactive Skill Galaxy</span>
            <div className="w-6 h-[2px] bg-brand-cyan" />
          </div>
          
          <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight leading-none mb-4 uppercase">
            SYSTEM CAPABILITIES
          </h2>
          <p className={`text-sm font-light ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Exquisite codebases, deterministic optimization, firmware integration protocols, and direct career vector projection.
          </p>
        </motion.div>

        <div className="relative w-full h-[800px] md:h-[900px] flex items-center justify-center mt-10">
          
          {/* Central Core */}
          <motion.div 
            className={`absolute z-20 w-24 h-24 md:w-32 md:h-32 rounded-full border-2 flex items-center justify-center backdrop-blur-md shadow-[0_0_50px_rgba(6,182,212,0.3)] ${
              isDark ? 'border-white/10 bg-black/50' : 'border-black/10 bg-white/50'
            }`}
            animate={{ scale: [1, 1.05, 1], boxShadow: ['0 0 30px rgba(6,182,212,0.3)', '0 0 60px rgba(139,92,246,0.5)', '0 0 30px rgba(6,182,212,0.3)'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="font-display text-xl md:text-2xl font-black flex items-center tracking-widest">
              <span className="text-brand-cyan mr-1 animate-pulse">{"{"}</span>
              <span className={isDark ? 'text-white' : 'text-black'}>C9</span>
              <span className="text-brand-purple ml-1 animate-pulse">{"}"}</span>
            </div>
          </motion.div>

          {/* Orbiting Nodes */}
          {SERVICES_DATA.map((service, index) => {
            const angle = (index * (360 / SERVICES_DATA.length));
            const isHovered = hoveredIndex === index;
            
            // Stagger radius: even index nodes are closer, odd index nodes are further away
            const isEven = index % 2 === 0;
            const radius = isMobile 
              ? (isEven ? 150 : 220) 
              : (isEven ? 260 : 420);
              
            const currentAngle = angle + rotation;
            const radian = (currentAngle * Math.PI) / 180;
            const x = Math.cos(radian) * radius;
            const y = Math.sin(radian) * radius;

            // Offset the connection line length so it touches the boundary of the node box
            const lineLength = isMobile ? radius - 40 : radius - 70;

            return (
              <motion.div
                key={service.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                animate={{ 
                  x, 
                  y, 
                  scale: isHovered ? (isMobile ? 1.05 : 1.1) : 1, 
                  zIndex: isHovered ? 50 : (isEven ? 30 : 20) 
                }}
                transition={{ type: "tween", ease: "linear", duration: 0.1 }}
                className="absolute flex items-center justify-center"
              >
                {/* Connecting Line from Center to Node */}
                <div 
                  className="absolute top-1/2 left-1/2 origin-left"
                  style={{
                    width: lineLength,
                    height: isHovered ? 2 : 1,
                    background: `linear-gradient(90deg, transparent, ${service.color}${isHovered ? '80' : '40'})`,
                    transform: `translateY(-50%) rotate(${180}deg)`,
                    opacity: isHovered ? 1 : 0.2,
                    zIndex: -1,
                    transition: 'all 0.3s ease'
                  }}
                />

                <div 
                  className={`w-52 md:w-64 p-4 md:p-5 rounded-2xl backdrop-blur-xl border cursor-pointer transition-all duration-300 relative group overflow-hidden ${
                    isDark ? 'bg-[#0b0b0def] border-white/10' : 'bg-white/90 border-black/10'
                  }`}
                  style={{
                    boxShadow: isHovered ? `0 0 40px ${service.color}60` : 'none',
                    borderColor: isHovered ? service.color : undefined
                  }}
                >
                  <div className="flex items-center gap-3 mb-2 md:mb-3 relative z-10">
                    <div 
                      className="w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-transform duration-300 shrink-0"
                      style={{ background: `${service.color}20`, color: service.color, transform: isHovered ? 'rotate(10deg)' : 'none' }}
                    >
                      <LucideIcon name={service.iconName} className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <div>
                      <h3 className={`text-[11px] md:text-sm font-bold font-display uppercase tracking-tight leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {service.title}
                      </h3>
                      <span 
                        className="text-[7px] md:text-[8px] font-mono font-bold uppercase tracking-widest px-1.5 py-0.5 rounded mt-1 inline-block"
                        style={{ backgroundColor: `${service.color}15`, color: service.color }}
                      >
                        {service.tag}
                      </span>
                    </div>
                  </div>

                  {/* Expanded Content on Hover */}
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
                    className="overflow-hidden"
                  >
                    <p className={`text-[10px] md:text-xs font-light leading-relaxed mb-3 mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {service.description}
                    </p>

                    {(service.id === 'web-dev' || service.id === 'app-dev' || service.id === 'learning') && (
                      <div className="flex flex-col gap-1.5 mt-2">
                        <div className={`flex items-center justify-between font-mono text-[8px] md:text-[9px] uppercase tracking-widest leading-none ${isDark ? 'text-[#a1a1aa]' : 'text-gray-600'}`}>
                          <span>Skill Cap</span>
                          <span style={{ color: service.color }} className="font-bold">
                            {service.id === 'web-dev' ? '95%' : service.id === 'app-dev' ? '92%' : '88%'}
                          </span>
                        </div>
                        <div className={`w-full h-1 rounded-full overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
                          <div 
                            className="h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ 
                              width: isHovered ? (service.id === 'web-dev' ? '95%' : service.id === 'app-dev' ? '92%' : '88%') : '0%',
                              backgroundColor: service.color,
                              boxShadow: `0 0 8px ${service.color}`
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
