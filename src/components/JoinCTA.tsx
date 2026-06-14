import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Send, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

interface JoinCTAProps {
  isDark: boolean;
}

type FormStatus = 'idle' | 'submitting' | 'success';

export default function JoinCTA({ isDark }: JoinCTAProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <section id="join" className="relative py-28 px-6 md:px-12 overflow-hidden z-25">
      {/* Dynamic diagonal neon gradient slice background */}
      <div className="absolute inset-0 bg-[#07070a]/40 backdrop-blur-3xl pointer-events-none" />
      
      {/* Background large neon blobs */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-gradient-to-r from-brand-blue/15 via-brand-cyan/20 to-brand-purple/15 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Main Banner Case */}
        <div className={`rounded-3xl border p-8 md:p-16 relative overflow-hidden flex flex-col items-center text-center ${
          isDark 
            ? 'bg-gradient-to-br from-[#0c0c11] to-[#050507] border-white/5' 
            : 'bg-gradient-to-br from-white to-gray-50 border-black/5 shadow-2xl'
        }`}>
          {/* Edge line laser light */}
          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple" />

          {/* Mini active node ticker */}
          <div className="flex items-center space-x-2 text-[10px] font-mono mb-6 text-brand-cyan uppercase tracking-widest font-bold">
            <Zap className="w-3 h-3 animate-bounce" />
            <span>NEXUS GATEWAY : CODE-9 PROMPTENTRY</span>
          </div>

          {/* Large Title */}
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase leading-none mb-6 max-w-3xl">
            BECOME PART OF <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple">
              THE FUTURE OF TECH
            </span>
          </h2>

          {/* Supporting paragraph */}
          <p className={`text-sm sm:text-base font-light max-w-xl leading-relaxed mb-10 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Submit your node parameters below to file an active entry petition. Our digital guilds review dossiers weekly. Secure terminal invitation.
          </p>

          {/* Interactive Form Engine */}
          <AnimatePresence mode="wait">
            {status !== 'success' ? (
              <motion.form 
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full max-w-md flex flex-col sm:flex-row items-stretch gap-3 relative z-10"
              >
                {/* Input node */}
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="protocols_agent@domain.com"
                  required
                  disabled={status === 'submitting'}
                  className={`flex-1 px-5 py-4 rounded-xl border font-mono text-sm leading-none transition-all outline-none ${
                    isDark 
                      ? 'bg-black/60 border-white/15 text-[#F8FAFC] focus:border-brand-cyan focus:shadow-[0_0_15px_rgba(6,182,212,0.15)] placeholder-gray-600' 
                      : 'bg-white border-black/15 text-[#0A0A0A] focus:border-brand-purple focus:shadow-[0_4px_12px_rgba(139,92,246,0.1)] placeholder-gray-400'
                  }`}
                />

                {/* Submit button with loading text */}
                <motion.button
                  type="submit"
                  disabled={status === 'submitting'}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-widest bg-gradient-to-r from-brand-blue to-brand-purple text-white shadow-lg flex items-center justify-center gap-2"
                >
                  {status === 'submitting' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Syncing...</span>
                    </>
                  ) : (
                    <>
                      <Terminal className="w-4 h-4" />
                      <span>Inquire Entry</span>
                    </>
                  )}
                </motion.button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`w-full max-w-md p-6 rounded-2xl border text-center flex flex-col items-center gap-3 ${
                  isDark ? 'bg-gray-900/40 border-brand-cyan/20' : 'bg-[#e0f7fa]/40 border-brand-purple/20'
                }`}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-brand-cyan/20 text-brand-cyan mb-2">
                  <CheckCircle2 className="w-6 h-6 animate-pulse" />
                </div>
                <h4 className="text-base font-bold font-display uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                  Node Inquiry Commited
                </h4>
                <p className={`text-xs font-light leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Check your mail terminal shortly. Your cryptographic connection token has been securely queued.
                </p>
                <div className="flex items-center gap-1.5 mt-2 text-[10px] font-mono text-brand-purple">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>SECURE CHANNEL OPENED</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Minimal security disclaimer */}
          <div className="mt-8 text-[9px] font-mono text-gray-500 max-w-xs uppercase leading-normal tracking-wider">
            Zero telemetry leaked • Encrypted handshakes enabled • Decentralized verification queue
          </div>

        </div>

      </div>
    </section>
  );
}
