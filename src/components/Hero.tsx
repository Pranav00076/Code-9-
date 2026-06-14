import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Terminal, Compass, ArrowRight } from 'lucide-react';
import Antigravity from './Antigravity';

interface HeroProps {
  isDark: boolean;
}

export default function Hero({ isDark }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const orbVariants = {
    float: {
      y: [0, -18, 0],
      x: [0, 10, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: "easeInOut"
      }
    },
    floatReverse: {
      y: [0, 15, 0],
      x: [0, -12, 0],
      transition: {
        duration: 9,
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="home" className="relative min-h-[95vh] flex items-center justify-center px-6 md:px-12 pt-32 overflow-hidden z-20">
      <Antigravity 
        count={280}
        color={isDark ? '#06b6d4' : '#8b5cf6'}
        magnetRadius={12}
        ringRadius={10}
        particleShape="capsule"
        autoAnimate={true}
        particleSize={1.2} // 30% reduction from previous size
        waveSpeed={0.5}
        rotationSpeed={0.05}
        opacity={0.6}
      />

      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      
      <motion.div 
        variants={orbVariants}
        animate="float"
        className="absolute w-[350px] md:w-[500px] h-[350px] md:h-[500px] rounded-full blur-[110px] -top-32 -left-20 bg-brand-blue/20 pointer-events-none"
      />
      
      <motion.div 
        variants={orbVariants}
        animate="floatReverse"
        className="absolute w-[350px] md:w-[500px] h-[350px] md:h-[500px] rounded-full blur-[115px] -bottom-32 -right-12 bg-brand-purple/20 pointer-events-none"
      />

      <motion.div 
        variants={orbVariants}
        animate="float"
        className="absolute w-[280px] md:w-[450px] h-[280px] md:h-[450px] rounded-full blur-[120px] top-[30%] left-[30%] bg-brand-cyan/15 pointer-events-none"
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto text-center z-10 flex flex-col items-center"
      >
        <motion.div 
          variants={itemVariants}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold font-mono tracking-widest ${
            isDark 
              ? 'bg-[#3b82f615] border-brand-blue text-brand-blue shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
              : 'bg-white border-brand-purple text-brand-purple shadow-[0_4px_12px_rgba(139,92,246,0.1)]'
          } mb-8 select-none`}
        >
          <Sparkles className="w-3 h-3 animate-pulse text-brand-cyan" />
          <span>V 2.0.4 ACTIVE PROTOCOL</span>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter mb-6 uppercase"
        >
          <span className={`block text-transparent bg-clip-text bg-gradient-to-r ${
            isDark 
              ? 'from-white via-[#F8FAFC] to-gray-400' 
              : 'from-[#0A0A0A] via-[#222225] to-gray-600'
          }`}>
            Build. Learn.
          </span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple animate-gradient">
            Grow Together.
          </span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className={`text-base sm:text-lg md:text-xl max-w-2xl px-2 font-sans font-light leading-relaxed mb-10 ${
            isDark ? 'text-[#a1a1aa]' : 'text-gray-600'
          }`}
        >
          Join <span className="font-semibold text-brand-cyan">Code9</span> — an exclusive multi-disciplinary ecosystem for vanguard developers, systems engineers, and digital architects preparing the autonomous future.
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full sm:w-auto"
        >
          <motion.a
            href="#join"
            whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(6, 182, 212, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto text-center px-8 py-4 rounded-xl font-bold text-sm tracking-wider uppercase bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple text-white shadow-[0_0_20px_rgba(6,182,212,0.25)] flex items-center justify-center gap-2"
          >
            <Terminal className="w-4 h-4" />
            Join Community
            <ArrowRight className="w-4 h-4 ml-1" />
          </motion.a>

          <motion.a
            href="#services"
            whileHover={{ scale: 1.04, backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)" }}
            whileTap={{ scale: 0.98 }}
            className={`w-full sm:w-auto text-center px-8 py-4 rounded-xl font-bold text-sm tracking-wider uppercase border border-solid-[1px] ${
              isDark 
                ? 'bg-white/3 border-white/10 text-[#F8FAFC] hover:border-brand-cyan' 
                : 'bg-black/3 border-black/10 text-[#0A0A09] hover:border-brand-purple'
            } transition-all duration-200 flex items-center justify-center gap-2`}
          >
            <Compass className="w-4 h-4" />
            Explore Services
          </motion.a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-16 mb-24 text-[10px] font-mono tracking-widest uppercase flex items-center gap-8 text-[#a1a1aa]"
        >
          <span>PING: 14ms</span>
          <span>•</span>
          <span>UPTIME: 99.98%</span>
          <span>•</span>
          <span>NODES: decentralized</span>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center select-none cursor-pointer text-[#a1a1aa]/50 hover:text-[#a1a1aa] transition-colors">
        <span className="text-[10px] font-mono tracking-widest uppercase mb-1">Scroll Nexus</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-1.5 h-6 rounded-full bg-brand-cyan/70"
        />
      </div>
    </section>
  );
}
