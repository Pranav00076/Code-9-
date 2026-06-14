import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Trophy, Clock, Medal, Zap, Star } from 'lucide-react';

interface ChallengeArenaProps {
  isDark: boolean;
}

const MOCK_LEADERBOARD = [
  { id: 1, name: "Pranav_007", score: 9800, rank: "Grandmaster", progress: 98 },
  { id: 2, name: "CyberNinja", score: 8400, rank: "Master", progress: 84 },
  { id: 3, name: "NeuralWeb", score: 7200, rank: "Diamond", progress: 72 },
  { id: 4, name: "CodeX", score: 6100, rank: "Platinum", progress: 61 },
];

export default function ChallengeArena({ isDark }: ChallengeArenaProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 12, minutes: 45, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="arena" className="relative py-24 px-6 md:px-12 overflow-hidden z-25">
      <div className="max-w-7xl mx-auto relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative z-10"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.04, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="absolute -top-12 md:-top-20 left-1/2 transform -translate-x-1/2 text-[50px] sm:text-[80px] md:text-[140px] font-black font-display pointer-events-none select-none tracking-widest uppercase -z-10"
          >
            COMPETE
          </motion.div>
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-6 h-[2px] bg-brand-purple" />
            <span className="text-[10px] font-mono tracking-widest text-brand-purple uppercase font-bold flex items-center gap-2">
              <Trophy className="w-3 h-3" /> Challenge Arena
            </span>
            <div className="w-6 h-[2px] bg-brand-purple" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight uppercase">
            Global Leaderboard
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Challenge Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`rounded-3xl p-8 border backdrop-blur-xl relative overflow-hidden group ${
              isDark ? 'bg-[#0A0A0A]/80 border-white/10' : 'bg-white/80 border-black/10'
            }`}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/10 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-brand-purple uppercase tracking-widest font-bold">Active Bounty</span>
                <h3 className="text-xl font-bold font-display uppercase tracking-tight">Build a Neural UI</h3>
              </div>
            </div>

            <p className={`text-sm mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Design and implement a responsive, highly-animated glassmorphic dashboard that interfaces with a mock AI endpoint. High-craft aesthetics required.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className={`p-4 rounded-xl border ${isDark ? 'bg-black/50 border-white/5' : 'bg-gray-50 border-black/5'}`}>
                <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Prize Pool</span>
                <span className="text-2xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple">
                  5,000 CT
                </span>
              </div>
              <div className={`p-4 rounded-xl border ${isDark ? 'bg-black/50 border-white/5' : 'bg-gray-50 border-black/5'}`}>
                <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Ends In
                </span>
                <div className="flex items-center gap-1 text-lg font-bold font-mono">
                  <span>{timeLeft.days}d</span>:
                  <span>{timeLeft.hours.toString().padStart(2, '0')}h</span>:
                  <span>{timeLeft.minutes.toString().padStart(2, '0')}m</span>:
                  <span className="text-brand-purple animate-pulse">{timeLeft.seconds.toString().padStart(2, '0')}s</span>
                </div>
              </div>
            </div>

            <button className="w-full py-4 rounded-xl bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-transparent hover:text-white hover:border hover:border-white transition-all">
              Enter Challenge
            </button>
          </motion.div>

          {/* Leaderboard */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`rounded-3xl p-8 border backdrop-blur-xl ${
              isDark ? 'bg-[#0A0A0A]/80 border-white/10' : 'bg-white/80 border-black/10'
            }`}
          >
            <h3 className="text-lg font-bold font-display uppercase tracking-tight mb-6 flex items-center gap-2">
              <Star className="w-4 h-4 text-brand-cyan" /> Top Operatives
            </h3>

            <div className="space-y-4">
              {MOCK_LEADERBOARD.map((user, index) => (
                <div 
                  key={user.id}
                  className={`p-4 rounded-xl border flex flex-col gap-3 transition-all hover:scale-[1.02] cursor-pointer ${
                    isDark ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-black/5 border-black/5 hover:bg-black/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold font-mono text-xs ${
                        index === 0 ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' : 
                        index === 1 ? 'bg-gray-300/20 text-gray-300 border border-gray-300/30' :
                        index === 2 ? 'bg-orange-500/20 text-orange-500 border border-orange-500/30' :
                        'bg-brand-blue/10 text-brand-blue border border-brand-blue/20'
                      }`}>
                        #{index + 1}
                      </div>
                      <div>
                        <div className="font-bold text-sm">{user.name}</div>
                        <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">{user.rank}</div>
                      </div>
                    </div>
                    <div className="font-mono text-brand-cyan font-bold text-sm">
                      {user.score.toLocaleString()} XP
                    </div>
                  </div>

                  <div className="w-full h-1.5 rounded-full overflow-hidden bg-gray-800">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${user.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full bg-gradient-to-r from-brand-blue to-brand-cyan"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
