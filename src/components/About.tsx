import React from 'react';
import { motion } from 'motion/react';
import { STATS_DATA } from '../data';
import LucideIcon from './LucideIcon';

interface AboutProps {
  isDark: boolean;
}

export default function About({ isDark }: AboutProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section id="manifesto" className="relative py-24 px-6 md:px-12 overflow-hidden z-25">
      <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[130px] opacity-15 pointer-events-none ${isDark ? 'bg-brand-purple' : 'bg-brand-purple/40'}`} />

      <div className="max-w-7xl mx-auto">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          <div className="lg:col-span-5 flex flex-col justify-center relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 0.04, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="absolute -top-12 -left-4 md:-top-20 md:-left-12 text-[80px] md:text-[140px] font-black font-display pointer-events-none select-none tracking-widest uppercase -z-10"
            >
              LEARN
            </motion.div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-[1px] bg-brand-cyan" />
              <span className="text-[10px] font-mono tracking-widest text-brand-cyan font-semibold uppercase">The Manifesto</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight mb-6 leading-none">
              SHAPING COOPERATIVE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-cyan">
                DIGITAL FORTRESSES
              </span>
            </h2>

            <p className={`text-sm sm:text-base font-light leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Code9 rejects the traditional isolated paradigm of learning online. We operate as an autonomous guild where high-performance developers, visual technicians, and smart-contract architects connect synchronously to deploy real modules.
            </p>

            <p className={`text-sm sm:text-base font-light leading-relaxed mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              No dry lectures. No hypothetical assignments. We build actual systems, test them against severe production requirements, coordinate paid bounties, and cultivate 1-on-1 apprentice tunnels with industry champions.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className={`p-4 rounded-xl border ${isDark ? 'border-gray-900 bg-black/40' : 'border-gray-200 bg-white/40'} backdrop-blur-md`}>
                <div className="text-brand-purple font-mono font-bold text-xs mb-1">01 / REPUTATION</div>
                <div className="font-semibold text-xs text-brand-cyan uppercase tracking-widest">Active Commits</div>
              </div>
              <div className={`p-4 rounded-xl border ${isDark ? 'border-gray-900 bg-black/40' : 'border-gray-200 bg-white/40'} backdrop-blur-md`}>
                <div className="text-brand-blue font-mono font-bold text-xs mb-1">02 / CAPITAL</div>
                <div className="font-semibold text-xs text-brand-cyan uppercase tracking-widest">Escrowed Rewards</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20 z-0">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="w-72 h-72 rounded-full border-2 border-dashed border-brand-cyan/60 flex items-center justify-center"
              >
                <div className="w-52 h-52 rounded-full border border-double border-brand-purple/60 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border border-brand-blue/60 animate-ping" />
                </div>
              </motion.div>
            </div>

            {STATS_DATA.map((stat, idx) => (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`card rounded-2xl p-6 md:p-8 backdrop-blur-xl relative overflow-hidden flex flex-col group border transition-all z-10 ${
                  isDark 
                    ? 'border-white/5 bg-[#0e0e11bf] hover:shadow-[0_12px_36px_rgba(6,182,212,0.1)] hover:border-brand-cyan/40' 
                    : 'border-black/5 bg-white/70 hover:shadow-[0_12px_36px_rgba(139,92,246,0.1)] hover:border-brand-purple/40'
                }`}
              >
                <span className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${isDark ? 'bg-gray-900/80 text-brand-cyan' : 'bg-gray-100 text-brand-purple'}`}>
                  <LucideIcon name={stat.iconName} className="w-5 h-5" />
                </div>

                <div className="text-3xl md:text-4xl font-black font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple mb-1">
                  {stat.value}
                </div>

                <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {stat.label}
                </div>

                <div className={`text-xs font-light leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {stat.description}
                </div>
              </motion.div>
            ))}

          </div>
        </motion.div>
      </div>
    </section>
  );
}
