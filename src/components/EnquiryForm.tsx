import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  role: z.string().min(1, 'Please select a role.'),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface EnquiryFormProps {
  isDark: boolean;
}

export default function EnquiryForm({ isDark }: EnquiryFormProps) {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setSubmitStatus('submitting');
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Submission failed');
      }

      setSubmitStatus('success');
      reset();
    } catch (error: any) {
      setSubmitStatus('error');
      setErrorMessage(error.message || 'An unexpected error occurred.');
    }
  };

  return (
    <section className="relative min-h-screen pt-32 pb-24 px-6 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#07070a]/20 backdrop-blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-gradient-to-r from-brand-blue/15 via-brand-purple/15 to-brand-cyan/20 blur-[130px] pointer-events-none" />

      <div className={`relative z-10 w-full max-w-xl rounded-3xl border p-8 md:p-12 overflow-hidden shadow-2xl ${
        isDark 
          ? 'bg-gradient-to-br from-[#0c0c11]/80 to-[#050507]/80 border-white/5 backdrop-blur-lg' 
          : 'bg-white/80 border-black/5 backdrop-blur-lg'
      }`}>
        <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple" />

        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 text-[10px] font-mono mb-4 text-brand-cyan uppercase tracking-widest font-bold bg-brand-cyan/10 px-3 py-1 rounded-full border border-brand-cyan/20">
            <ShieldCheck className="w-3 h-3" />
            <span>SECURE ENQUIRY PROTOCOL</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-black tracking-tight uppercase mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            Join the Nexus
          </h2>
          <p className={`text-sm md:text-base font-light ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Register your node parameters. Our digital guilds review dossiers constantly.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {submitStatus === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-brand-cyan/20 text-brand-cyan mb-6">
                <CheckCircle2 className="w-8 h-8 animate-pulse" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-2 uppercase tracking-wide">
                Protocol Accepted
              </h3>
              <p className={`text-sm font-light ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-8 max-w-sm`}>
                Your enquiry has been securely logged in our systems. Expect a transmission shortly.
              </p>
              <button
                onClick={() => setSubmitStatus('idle')}
                className="text-xs uppercase tracking-widest font-bold text-brand-cyan hover:text-white transition-colors border border-brand-cyan/30 hover:border-brand-cyan hover:bg-brand-cyan/10 px-6 py-3 rounded-xl"
              >
                Submit Another
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit(onSubmit)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div>
                <label className={`block text-[11px] font-mono uppercase tracking-wider mb-2 ${isDark ? 'text-brand-cyan' : 'text-brand-purple'}`}>
                  Full Name / Handle
                </label>
                <input
                  {...register('name')}
                  disabled={submitStatus === 'submitting'}
                  className={`w-full px-5 py-4 rounded-xl border text-sm transition-all outline-none ${
                    isDark
                      ? 'bg-black/40 border-white/10 text-white focus:border-brand-cyan focus:bg-black/60'
                      : 'bg-gray-50 border-gray-200 text-black focus:border-brand-purple focus:bg-white'
                  }`}
                  placeholder="Agent Smith"
                />
                {errors.name && (
                  <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className={`block text-[11px] font-mono uppercase tracking-wider mb-2 ${isDark ? 'text-brand-cyan' : 'text-brand-purple'}`}>
                  Secure Email
                </label>
                <input
                  {...register('email')}
                  type="email"
                  disabled={submitStatus === 'submitting'}
                  className={`w-full px-5 py-4 rounded-xl border text-sm transition-all outline-none ${
                    isDark
                      ? 'bg-black/40 border-white/10 text-white focus:border-brand-cyan focus:bg-black/60'
                      : 'bg-gray-50 border-gray-200 text-black focus:border-brand-purple focus:bg-white'
                  }`}
                  placeholder="smith@nexus.io"
                />
                {errors.email && (
                  <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className={`block text-[11px] font-mono uppercase tracking-wider mb-2 ${isDark ? 'text-brand-cyan' : 'text-brand-purple'}`}>
                  Primary Directive (Role)
                </label>
                <select
                  {...register('role')}
                  disabled={submitStatus === 'submitting'}
                  className={`w-full px-5 py-4 rounded-xl border text-sm transition-all outline-none appearance-none ${
                    isDark
                      ? 'bg-black/40 border-white/10 text-white focus:border-brand-cyan focus:bg-black/60'
                      : 'bg-gray-50 border-gray-200 text-black focus:border-brand-purple focus:bg-white'
                  }`}
                >
                  <option value="" disabled hidden>Select your designation</option>
                  <option value="developer">Developer</option>
                  <option value="designer">Designer / Creator</option>
                  <option value="engineer">Systems Engineer</option>
                  <option value="other">Other</option>
                </select>
                {errors.role && (
                  <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.role.message}
                  </p>
                )}
              </div>

              <div>
                <label className={`block text-[11px] font-mono uppercase tracking-wider mb-2 ${isDark ? 'text-brand-cyan' : 'text-brand-purple'}`}>
                  Encrypted Message (Optional)
                </label>
                <textarea
                  {...register('message')}
                  disabled={submitStatus === 'submitting'}
                  rows={3}
                  className={`w-full px-5 py-4 rounded-xl border text-sm transition-all outline-none resize-none ${
                    isDark
                      ? 'bg-black/40 border-white/10 text-white focus:border-brand-cyan focus:bg-black/60'
                      : 'bg-gray-50 border-gray-200 text-black focus:border-brand-purple focus:bg-white'
                  }`}
                  placeholder="State your intentions..."
                />
              </div>

              {submitStatus === 'error' && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <motion.button
                type="submit"
                disabled={submitStatus === 'submitting'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-4 rounded-xl font-bold text-sm uppercase tracking-widest bg-gradient-to-r from-brand-blue via-brand-purple to-brand-cyan text-white shadow-lg flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {submitStatus === 'submitting' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <Terminal className="w-5 h-5" />
                    <span>Initialize Protocol</span>
                  </>
                )}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
