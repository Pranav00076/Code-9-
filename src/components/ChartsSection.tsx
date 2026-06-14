import React from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

const uptimeData = [
  { time: '00:00', uptime: 99.98 },
  { time: '04:00', uptime: 99.99 },
  { time: '08:00', uptime: 99.98 },
  { time: '12:00', uptime: 99.97 },
  { time: '16:00', uptime: 99.98 },
  { time: '20:00', uptime: 99.99 },
  { time: '24:00', uptime: 100 },
];

const nodesData = [
  { name: 'US-East', nodes: 400 },
  { name: 'EU-West', nodes: 300 },
  { name: 'AP-South', nodes: 300 },
  { name: 'US-West', nodes: 200 },
];

const activeUsers = [
  { day: 'Mon', users: 1200 },
  { day: 'Tue', users: 1400 },
  { day: 'Wed', users: 1600 },
  { day: 'Thu', users: 1300 },
  { day: 'Fri', users: 1800 },
  { day: 'Sat', users: 2000 },
  { day: 'Sun', users: 2100 },
];

interface ChartsSectionProps {
  isDark: boolean;
}

export default function ChartsSection({ isDark }: ChartsSectionProps) {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl w-full"
      >
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
            System <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-cyan">Metrics</span>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Real-time analytics and performance metrics of the Code9 decentralized network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Uptime Chart */}
          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'} backdrop-blur-md lg:col-span-2`}>
            <h3 className="font-mono text-sm tracking-widest uppercase mb-6 text-brand-cyan">Global Uptime (24h)</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={uptimeData}>
                  <defs>
                    <linearGradient id="colorUptime" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#333' : '#ddd'} vertical={false} />
                  <XAxis dataKey="time" stroke={isDark ? '#888' : '#666'} fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke={isDark ? '#888' : '#666'} fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 0.02', 'dataMax + 0.02']} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: isDark ? '#1a1a1a' : '#fff', border: 'none', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#06b6d4' }}
                  />
                  <Area type="monotone" dataKey="uptime" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorUptime)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Nodes Distribution */}
          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'} backdrop-blur-md`}>
            <h3 className="font-mono text-sm tracking-widest uppercase mb-6 text-brand-purple">Active Nodes</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={nodesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#333' : '#ddd'} vertical={false} />
                  <XAxis dataKey="name" stroke={isDark ? '#888' : '#666'} fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{ fill: isDark ? '#ffffff10' : '#00000010' }}
                    contentStyle={{ backgroundColor: isDark ? '#1a1a1a' : '#fff', border: 'none', borderRadius: '8px' }}
                    itemStyle={{ color: '#8b5cf6' }}
                  />
                  <Bar dataKey="nodes" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Active Users */}
          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'} backdrop-blur-md lg:col-span-3`}>
            <h3 className="font-mono text-sm tracking-widest uppercase mb-6 text-brand-blue">Community Activity (Weekly)</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activeUsers}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#333' : '#ddd'} vertical={false} />
                  <XAxis dataKey="day" stroke={isDark ? '#888' : '#666'} fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke={isDark ? '#888' : '#666'} fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: isDark ? '#1a1a1a' : '#fff', border: 'none', borderRadius: '8px' }}
                    itemStyle={{ color: '#3b82f6' }}
                  />
                  <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
