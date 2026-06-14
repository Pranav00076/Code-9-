import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { SERVICES_DATA } from '../data';
import LucideIcon from './LucideIcon';

interface ServicesProps {
  isDark: boolean;
}

export default function Services({ isDark }: ServicesProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);

  // Slow continuous rotation
  useEffect(() => {
    let animationFrameId: number;
    let currentRotation = 0;
    
    const animate = () => {
      currentRotation += 0.05;
      setRotation(currentRotation);
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

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

        <div className="relative w-full h-[600px] flex items-center justify-center mt-10">
          
          {/* Central Core */}
          <motion.div 
            className={`absolute z-20 w-32 h-32 rounded-full border-2 flex items-center justify-center backdrop-blur-md shadow-[0_0_50px_rgba(6,182,212,0.3)] ${
              isDark ? 'border-white/10 bg-black/50' : 'border-black/10 bg-white/50'
            }`}
            animate={{ scale: [1, 1.05, 1], boxShadow: ['0 0 30px rgba(6,182,212,0.3)', '0 0 60px rgba(139,92,246,0.5)', '0 0 30px rgba(6,182,212,0.3)'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="font-display text-2xl font-black flex items-center tracking-widest">
              <span className="text-brand-cyan mr-1 animate-pulse">{"{"}</span>
              <span className={isDark ? 'text-white' : 'text-black'}>C9</span>
              <span className="text-brand-purple ml-1 animate-pulse">{"}"}</span>
            </div>
          </motion.div>

          {/* Orbiting Nodes */}
          {SERVICES_DATA.map((service, index) => {
            const angle = (index * (360 / SERVICES_DATA.length));
            const isHovered = hoveredIndex === index;
            
            // Orbit Math
            const radius = 280; // Distance from center
            // Apply rotation, but freeze if a node is hovered
            const currentAngle = hoveredIndex !== null ? angle : angle + rotation;
            const radian = (currentAngle * Math.PI) / 180;
            const x = Math.cos(radian) * radius;
            const y = Math.sin(radian) * radius;

            return (
              <motion.div
                key={service.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                animate={{ x, y, scale: isHovered ? 1.05 : 1, zIndex: isHovered ? 30 : 10 }}
                transition={{ type: "tween", ease: "linear", duration: 0.1 }}
                className="absolute"
              >
                {/* Connecting Line from Center to Node (Approximated with a scaled div rotated towards center) */}
                <div 
                  className="absolute top-1/2 left-1/2 origin-left"
                  style={{
                    width: radius - 64, // Subtract node radius
                    height: 1,
                    background: `linear-gradient(90deg, transparent, ${service.color}40)`,
                    transform: `translateY(-50%) rotate(${180}deg)`,
                    opacity: isHovered ? 0.8 : 0.2,
                    zIndex: -1
                  }}
                />

                <div 
                  className={`w-64 p-5 rounded-2xl backdrop-blur-xl border cursor-pointer transition-all duration-300 relative group overflow-hidden ${
                    isDark ? 'bg-[#0b0b0def] border-white/10' : 'bg-white/90 border-black/10'
                  }`}
                  style={{
                    boxShadow: isHovered ? `0 0 30px ${service.color}40` : 'none',
                    borderColor: isHovered ? service.color : undefined
                  }}
                >
                  <div className="flex items-center gap-3 mb-3 relative z-10">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300"
                      style={{ background: `${service.color}20`, color: service.color, transform: isHovered ? 'rotate(10deg)' : 'none' }}
                    >
                      <LucideIcon name={service.iconName} className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className={`text-sm font-bold font-display uppercase tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {service.title}
                      </h3>
                      <span 
                        className="text-[8px] font-mono font-bold uppercase tracking-widest px-1.5 py-0.5 rounded"
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
                    <p className={`text-xs font-light leading-relaxed mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {service.description}
                    </p>

                    {(service.id === 'web-dev' || service.id === 'app-dev' || service.id === 'learning') && (
                      <div className="flex flex-col gap-1.5 mt-2">
                        <div className={`flex items-center justify-between font-mono text-[9px] uppercase tracking-widest leading-none ${isDark ? 'text-[#a1a1aa]' : 'text-gray-600'}`}>
                          <span>Skill Cap</span>
                          <span style={{ color: service.color }} className="font-bold">
                            {service.id === 'web-dev' ? '95%' : service.id === 'app-dev' ? '92%' : '88%'}
                          </span>
                        </div>
                        <div className={`w-full h-1 rounded-full overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
                          <div 
                            className="h-full rounded-full"
                            style={{ 
                              width: service.id === 'web-dev' ? '95%' : service.id === 'app-dev' ? '92%' : '88%',
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
