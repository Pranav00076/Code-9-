import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SERVICES_DATA } from '../data';
import LucideIcon from './LucideIcon';

interface ServicesProps {
  isDark: boolean;
}

export default function Services({ isDark }: ServicesProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section id="services" className="relative py-24 px-6 md:px-12 overflow-hidden z-25">
      {/* Glow highlight orb */}
      <div className={`absolute top-1/2 right-0 w-[450px] h-[450px] rounded-full blur-[130px] opacity-10 pointer-events-none bg-brand-cyan/40`} />

      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-6 h-[2px] bg-brand-cyan" />
            <span className="text-[10px] font-mono tracking-widest text-brand-cyan uppercase font-bold">Offerings & Labs</span>
            <div className="w-6 h-[2px] bg-brand-cyan" />
          </div>
          
          <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight leading-none mb-4 uppercase">
            SYSTEM CAPABILITIES
          </h2>
          <p className={`text-sm font-light ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Exquisite codebases, deterministic optimization, firmware integration protocols, and direct career vector projection. Select a node to observe its matrix parameters.
          </p>
        </div>

        {/* 4x2 Grid of services */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {SERVICES_DATA.map((service, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className={`card rounded-2xl p-6 backdrop-blur-xl border flex flex-col justify-between relative overflow-hidden transition-all duration-300 min-h-[260px] ${
                  isDark 
                    ? 'border-white/5 bg-[#0b0b0def] hover:border-white/20' 
                    : 'border-black/5 bg-white/80 hover:border-black/20 hover:shadow-lg'
                }`}
                style={{
                  boxShadow: isHovered && isDark
                    ? `0 10px 30px -10px ${service.color}40, 0 1px 3px ${service.color}20`
                    : isHovered && !isDark
                    ? `0 10px 30px -10px ${service.color}30, 0 1px 3px ${service.color}15`
                    : 'none'
                }}
              >
                {/* Glowing neon edge based on hover state */}
                <span 
                  className="absolute top-0 left-0 w-full h-[2px] transition-all duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${service.color}, transparent)`,
                    opacity: isHovered ? 1 : 0
                  }}
                />

                <div>
                  {/* Top card elements: Icon and tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 relative overflow-hidden"
                      style={{ 
                        background: `${service.color}15`,
                        color: service.color,
                        transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1)'
                      }}
                    >
                      <LucideIcon name={service.iconName} className="w-5 h-5 relative z-10" />
                      {/* Deep internal pulsing dot in the icon frame */}
                      <span 
                        className="absolute inset-0 rounded-xl animate-pulse opacity-20"
                        style={{ backgroundColor: service.color }}
                      />
                    </div>

                    <span 
                      className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                      style={{ 
                        backgroundColor: `${service.color}10`,
                        color: service.color
                      }}
                    >
                      {service.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`text-base font-bold font-display uppercase tracking-tight mb-3 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-xs font-light leading-relaxed mb-4 ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {service.description}
                  </p>

                  {/* Skill level progression for Web Dev, App Dev, and Learning Resources */}
                  {(service.id === 'web-dev' || service.id === 'app-dev' || service.id === 'learning') && (
                    <div className="mt-4 flex flex-col gap-1.5 z-10 relative">
                      <div className={`flex items-center justify-between font-mono text-[9px] uppercase tracking-widest leading-none ${
                        isDark ? 'text-[#a1a1aa]' : 'text-gray-600 font-semibold'
                      }`}>
                        <span className="flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                          Skill Cap
                        </span>
                        <span style={{ color: service.color }} className="font-bold">
                          {service.id === 'web-dev' ? '95%' : service.id === 'app-dev' ? '92%' : '88%'}
                        </span>
                      </div>
                      <div className={`w-full h-[5px] rounded-full overflow-hidden relative ${isDark ? 'bg-gray-950/80' : 'bg-gray-100'}`}>
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ 
                            width: service.id === 'web-dev' ? '95%' : service.id === 'app-dev' ? '92%' : '88%' 
                          }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
                          className="h-full rounded-full relative"
                          style={{ 
                            backgroundColor: service.color,
                            boxShadow: `0 0 8px ${service.color}`
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Interactive slide icon */}
                <div className="mt-6 flex items-center justify-end text-[10px] font-mono tracking-widest font-semibold uppercase relative group cursor-pointer">
                  <span 
                    className="mr-2 transition-all duration-300 opacity-0 transform translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                    style={{ color: service.color }}
                  >
                    Details
                  </span>
                  <div 
                    className="w-5 h-5 rounded-full flex items-center justify-center border transition-all duration-300"
                    style={{ 
                      borderColor: isHovered ? service.color : 'rgba(128,128,128,0.2)',
                      color: isHovered ? service.color : 'gray'
                    }}
                  >
                    →
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
