import React from 'react';
import { motion } from 'motion/react';
import { BENEFITS_DATA } from '../data';
import LucideIcon from './LucideIcon';

interface BenefitsProps {
  isDark: boolean;
}

export default function Benefits({ isDark }: BenefitsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const lineVariants = {
    hidden: { height: 0 },
    visible: { 
      height: '100%',
      transition: { duration: 2, ease: "easeInOut" }
    }
  };

  return (
    <section id="benefits" className="relative py-24 px-6 md:px-12 overflow-hidden z-25">
      <div className={`absolute bottom-0 left-10 w-96 h-96 rounded-full blur-[140px] opacity-10 pointer-events-none bg-brand-purple/40`} />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center max-w-2xl mx-auto mb-20 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.04, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="absolute -top-12 md:-top-20 left-1/2 transform -translate-x-1/2 text-[50px] sm:text-[80px] md:text-[140px] font-black font-display pointer-events-none select-none tracking-widest uppercase -z-10"
          >
            COLLABORATE
          </motion.div>
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-[1px] bg-brand-cyan" />
            <span className="text-[10px] font-mono tracking-widest text-[#06B6D4] font-bold uppercase">The Nexus Pipeline</span>
            <span className="w-8 h-[1px] bg-brand-cyan" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight leading-none mb-4 uppercase">
            COMMUNITY BENEFITS
          </h2>
          <p className={`text-sm font-light ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Examine our high-yield interactive system pipeline. Each stage is linked to accelerate user performance from prototype to distributed scale.
          </p>
        </div>

        <div className="absolute left-1/2 top-[240px] bottom-10 w-[2px] bg-gray-800 -translate-x-1/2 hidden lg:block z-0 pointer-events-none">
          <motion.div 
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="w-full bg-gradient-to-b from-brand-blue via-brand-cyan to-brand-purple rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"
          />
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16 lg:space-y-24 relative z-10"
        >
          {BENEFITS_DATA.map((benefit, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={benefit.id}
                className={`flex flex-col lg:flex-row items-stretch ${isEven ? '' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}
              >
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`card rounded-3xl p-8 md:p-10 border backdrop-blur-xl relative transition-all duration-300 ${
                      isDark 
                        ? 'bg-[#0f0f13d8] border-white/5 hover:border-brand-purple/30' 
                        : 'bg-white/90 border-black/5 hover:border-brand-blue/30 hover:shadow-xl'
                    }`}
                  >
                    <div className="absolute -top-4 -right-4 font-mono font-black text-5xl md:text-6xl text-gray-500/10 pointer-events-none select-none">
                      {benefit.number}
                    </div>

                    <span className="inline-flex text-[9px] font-mono uppercase tracking-widest font-extrabold px-3 py-1 rounded bg-brand-cyan/10 text-brand-cyan mb-4">
                      {benefit.badge}
                    </span>

                    <h3 className={`text-xl sm:text-2xl font-bold font-display uppercase tracking-tight mb-4 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {benefit.title}
                    </h3>

                    <p className={`text-sm font-light leading-relaxed ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {benefit.description}
                    </p>
                  </motion.div>
                </div>

                <div className="hidden lg:flex items-center justify-center w-16 relative">
                  <motion.div 
                    initial={{ scale: 0, shadow: 'none' }}
                    whileInView={{ scale: 1 }}
                    whileHover={{ scale: 1.25 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className={`w-12 h-12 rounded-full border-4 flex items-center justify-center z-10 transition-all ${
                      isDark 
                        ? 'bg-[#0A0A0A] border-brand-cyan text-brand-cyan shadow-[0_0_15px_rgba(6,182,212,0.4)]' 
                        : 'bg-[#FAFAFA] border-brand-purple text-brand-purple shadow-[0_4px_12px_rgba(139,92,246,0.3)]'
                    }`}
                  >
                    <LucideIcon name={benefit.iconName} className="w-5 h-5" />
                  </motion.div>
                </div>

                <div className="hidden lg:block lg:w-1/2" />
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
