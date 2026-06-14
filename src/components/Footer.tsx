import React from 'react';
import { motion } from 'motion/react';
import { Github, Twitter, Youtube, MessageSquare, Terminal } from 'lucide-react';

interface FooterProps {
  isDark: boolean;
}

export default function Footer({ isDark }: FooterProps) {
  const socialIcons = [
    { icon: <Github className="w-4 h-4" />, name: 'GitHub', href: '#' },
    { icon: <Twitter className="w-4 h-4" />, name: 'Twitter', href: '#' },
    { icon: <MessageSquare className="w-4 h-4" />, name: 'Discord', href: '#' },
    { icon: <Youtube className="w-4 h-4" />, name: 'YouTube', href: '#' }
  ];

  return (
    <footer 
      className={`relative border-t py-12 px-6 md:px-12 z-40 backdrop-blur-md overflow-hidden ${
        isDark 
          ? 'bg-[#060608] border-white/5 text-[#F8FAFC]' 
          : 'bg-gray-50 border-black/5 text-[#0A0A09]'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Logo and Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="logo font-display text-base font-extrabold tracking-tight flex items-center select-none">
            <span className="text-brand-cyan mr-0.5">{"{"}</span>
            <span>CODE9</span>
            <span className="text-brand-purple ml-0.5">{"}"}</span>
          </div>
          <div className="text-[10px] font-mono opacity-50 tracking-widest text-center md:text-left uppercase">
            &copy; 2026 Code9 Autonomous Community. Secure protocols.
          </div>
        </div>

        {/* Middle: Social Icons */}
        <div className="flex items-center space-x-3">
          {socialIcons.map((soc) => (
            <motion.a
              key={soc.name}
              href={soc.href}
              whileHover={{ 
                scale: 1.1, 
                backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
                boxShadow: isDark ? '0 0 15px rgba(6,182,212,0.3)' : '0 4px 12px rgba(139,92,246,0.1)'
              }}
              className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${
                isDark 
                  ? 'border-white/10 bg-[#0e0e11] text-gray-400 hover:text-brand-cyan hover:border-brand-cyan' 
                  : 'border-black/10 bg-white text-gray-600 hover:text-brand-purple hover:border-brand-purple'
              }`}
              aria-label={`Code9 ${soc.name} Channel`}
            >
              {soc.icon}
            </motion.a>
          ))}
        </div>

        {/* Right Side: Network Stats */}
        <div className="flex flex-col items-center md:items-end gap-1.5 text-[10px] font-mono opacity-60 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
            <span>Uptime: 99.98%</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Latency: 14ms</span>
            <span>•</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-cyan">NEXUS-9 NODE</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
