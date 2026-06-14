import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, UserPlus, Code, Award, Radio } from 'lucide-react';

interface ActivityFeedProps {
  isDark: boolean;
}

const MOCK_ACTIVITIES = [
  { id: 1, icon: UserPlus, text: "User0x7 joined the Nexus", time: "Just now", color: "text-brand-cyan" },
  { id: 2, icon: Code, text: "Project 'Neural UI' deployed", time: "2m ago", color: "text-brand-purple" },
  { id: 3, icon: Award, text: "Challenge #44 Won by Pranav", time: "5m ago", color: "text-yellow-500" },
  { id: 4, icon: Radio, text: "Mentor online: Senior AI Eng", time: "12m ago", color: "text-green-500" },
];

export default function ActivityFeed({ isDark }: ActivityFeedProps) {
  const [activeItem, setActiveItem] = useState(MOCK_ACTIVITIES[0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % MOCK_ACTIVITIES.length;
      setActiveItem(MOCK_ACTIVITIES[index]);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-40 pointer-events-none hidden md:block">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeItem.id}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className={`flex items-center gap-3 p-3 rounded-2xl border backdrop-blur-xl shadow-lg ${
            isDark ? 'bg-[#0A0A0A]/80 border-white/10' : 'bg-white/90 border-black/10'
          }`}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-black/10 border border-white/5`}>
            <activeItem.icon className={`w-4 h-4 ${activeItem.color}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-bold tracking-wide ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                {activeItem.text}
              </span>
            </div>
            <span className={`text-[9px] font-mono uppercase tracking-widest ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              {activeItem.time}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
