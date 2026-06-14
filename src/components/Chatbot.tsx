import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, ShieldAlert, RotateCcw, CornerDownLeft, HelpCircle } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatbotProps {
  isDark: boolean;
}

// Custom lightweight high-craft text formatter to parse markdown style logs
function FormattedMessage({ text, isUser, isDark }: { text: string; isUser: boolean; isDark: boolean }) {
  if (isUser) {
    return <span className="text-xs font-light">{text}</span>;
  }

  // Parse paragraphs, code lines, bold lists
  const lines = text.split('\n');
  return (
    <div className="space-y-2 text-xs font-light leading-relaxed">
      {lines.map((line, lIdx) => {
        // Bullet list item
        if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
          const content = line.trim().substring(2);
          return (
            <li key={lIdx} className="list-none pl-4 relative before:content-['•'] before:absolute before:left-1 before:text-brand-cyan">
              {parseInlineMarkdown(content)}
            </li>
          );
        }

        // Horizontal Rule
        if (line.trim() === '---') {
          return <hr key={lIdx} className={`my-2 border-dashed ${isDark ? 'border-white/10' : 'border-black/10'}`} />;
        }

        // Standard text lines
        if (line.trim() === '') return <div key={lIdx} className="h-1" />;
        return <p key={lIdx}>{parseInlineMarkdown(line)}</p>;
      })}
    </div>
  );
}

// Format bold text **word** and code `code`
function parseInlineMarkdown(text: string) {
  const parts = [];
  let tempText = text;
  
  // Basic RegExp to slice bold structures and inline code blocks
  const regex = /(\*\*.*?\*\*|`.*?`)/g;
  const splitText = tempText.split(regex);

  return splitText.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-cyan">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="px-1.5 py-0.5 rounded font-mono text-[10px] bg-black/40 text-brand-cyan border border-white/5">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export default function Chatbot({ isDark }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasError, setHasError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const initialGreeting = 'Greetings, digital pioneer. I am the Code9 Cybernetic Assistant. Connect with my neural core and ask me anything about Code9 communities, labs, or available vectors.';

  // Initialize with greeting
  useEffect(() => {
    setMessages([
      { role: 'assistant', content: initialGreeting }
    ]);
  }, []);

  // Pull focus to input of the conversational node when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 350);
    }
  }, [isOpen]);

  // Auto scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (msgText: string) => {
    if (!msgText.trim()) return;

    setHasError(null);
    const userMsg: ChatMessage = { role: 'user', content: msgText };
    const updatedMessages = [...messages, userMsg];
    
    setMessages(updatedMessages);
    setInputMsg('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: updatedMessages.filter(m => m.role !== 'system')
        })
      });

      if (!response.ok) {
        const errJson = await response.json();
        throw new Error(errJson.error || errJson.message || 'API request failed');
      }

      const result = await response.json();
      
      if (result.choices && result.choices[0] && result.choices[0].message) {
        setMessages((prev) => [
          ...prev, 
          { 
            role: 'assistant', 
            content: result.choices[0].message.content || 'Response empty' 
          }
        ]);
      } else {
        throw new Error('Unexpected API response structure');
      }
    } catch (err: any) {
      console.error(err);
      setHasError(err.message || 'Error executing secure handshake');
      setMessages((prev) => [
        ...prev,
        { 
          role: 'assistant', 
          content: 'HANDSHAKE REFUSED. The cryptographic server failed to reply securely. Please ensure that an HF_TOKEN key is actively declared on the host dashboard.' 
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetConversation = () => {
    setHasError(null);
    setMessages([
      { role: 'assistant', content: "Neural session key recycled. Cybernetic connection reinstated. What vector would you like to build with us today?" }
    ]);
    setInputMsg('');
    inputRef.current?.focus();
  };

  const suggestions = [
    "Tell me about the Code9 cooperative",
    "What services or core skills are taught?",
    "What are the benefits of joining?"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-45 flex flex-col items-end">
      {/* Expanded Chat Dialog Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: 'spring', damping: 20, stiffness: 220 }}
            className={`w-[325px] sm:w-[400px] h-[520px] rounded-2xl border flex flex-col justify-between mb-4 shadow-[0_22px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl overflow-hidden leading-normal ${
              isDark 
                ? 'bg-[#0a0a0ce9] border-white/10 text-white shadow-[0_0_35px_rgba(6,182,212,0.12)]' 
                : 'bg-white/95 border-black/10 text-black shadow-[0_12px_45px_rgba(139,92,246,0.14)]'
            }`}
          >
            {/* Header section with glowing indicator */}
            <div className={`p-4 border-b flex items-center justify-between ${
              isDark ? 'border-white/5 bg-black/40' : 'border-black/5 bg-gray-50'
            }`}>
              <div className="flex items-center space-x-2.5">
                <div className="relative flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#06B6D4] animate-ping absolute" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#06B6D4] relative z-10" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wider font-display flex items-center gap-1">
                    Code9 Neural Link
                    <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
                  </span>
                  <span className="text-[8.5px] font-mono opacity-50 uppercase tracking-widest leading-none">
                    Llama-3.1-8B-Instruct via HF
                  </span>
                </div>
              </div>

              {/* Utility Tools */}
              <div className="flex items-center space-x-1">
                {/* Reset dialogue */}
                <button 
                  onClick={handleResetConversation}
                  title="Reset secure connection"
                  className={`p-1.5 rounded-lg border transition-all ${
                    isDark 
                      ? 'border-white/5 bg-white/3 hover:bg-white/10 hover:text-brand-cyan text-gray-400' 
                      : 'border-black/5 bg-black/3 hover:bg-black/5 hover:text-brand-purple text-gray-600'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                {/* Close Button */}
                <button 
                  onClick={() => setIsOpen(false)}
                  className={`p-1.5 rounded-lg border transition-all ${
                    isDark ? 'border-white/5 hover:bg-white/10 text-gray-400' : 'border-black/5 hover:bg-black/5 text-gray-600'
                  }`}
                  aria-label="Close Chat Link"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Chat message content track */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {messages.map((msg, idx) => {
                const isUser = msg.role === 'user';
                return (
                  <div 
                    key={idx} 
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[85%] rounded-2xl px-4 py-3 border transition-all ${
                        isUser 
                          ? 'bg-gradient-to-br from-brand-blue via-[#2563eb] to-brand-purple text-white rounded-br-none border-transparent font-medium shadow-[0_2px_10px_rgba(37,99,235,0.15)]' 
                          : isDark
                          ? 'bg-white/5 text-gray-100 border-white/5 rounded-bl-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]'
                          : 'bg-gray-100/90 text-gray-800 border-black/5 rounded-bl-none'
                      }`}
                    >
                      <FormattedMessage text={msg.content} isUser={isUser} isDark={isDark} />
                    </div>
                  </div>
                );
              })}

              {/* Loader/Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className={`rounded-xl px-4 py-3 border rounded-bl-none flex items-center space-x-1.5 ${
                    isDark ? 'bg-white/5 border-white/5' : 'bg-gray-100 border-black/5'
                  }`}>
                    <div className="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <div className="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                    <div className="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                  </div>
                </div>
              )}

              {/* Error prompt indicator */}
              {hasError && (
                <div className={`p-3.5 rounded-xl border flex items-start gap-2.5 bg-red-950/20 text-red-400 border-red-900/40 text-[10.5px] font-mono leading-normal`}>
                  <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold flex items-center gap-1 uppercase tracking-wider text-red-400">
                      Decryption Refused
                    </div>
                    <div className="opacity-85 mt-1">Please insert the required <code className="bg-red-950/40 px-1 border border-red-900/30 text-[9px]">HF_TOKEN</code> key into the Workspace Environment Secrets dashboard to operate the interactive chatbot dynamically.</div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions & user action panel */}
            <div className={`p-4 border-t ${isDark ? 'border-white/5' : 'border-black/5'}`}>
              
              {/* Context prompt chips list -- visible ALWAYS or when active, collapsible or small */}
              <div className="flex flex-col gap-2 mb-3">
                <div className="flex items-center justify-between px-1">
                  <span className={`text-[9px] font-mono tracking-widest uppercase flex items-center gap-1 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <HelpCircle className="w-3 h-3 text-brand-cyan" />
                    Interactive Guides
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {suggestions.map((sug, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => handleSendMessage(sug)}
                      className={`text-left text-[10.5px] px-2.5 py-1.5 rounded-lg border font-light transition-all cursor-pointer ${
                        isDark 
                          ? 'border-white/5 bg-white/3 text-gray-300 hover:bg-brand-cyan/10 hover:text-brand-cyan hover:border-brand-cyan/30' 
                          : 'border-black/5 bg-black/3 text-gray-700 hover:bg-brand-purple/5 hover:text-brand-purple hover:border-brand-purple/30'
                      }`}
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Form Box */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputMsg);
                }} 
                className="flex items-stretch gap-2.5 relative"
              >
                <input 
                  ref={inputRef}
                  type="text"
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  placeholder="Ask Code9 Node..."
                  className={`flex-1 px-4 py-3 rounded-xl border text-xs font-mono outline-none transition-all ${
                    isDark 
                      ? 'bg-black/80 border-white/10 text-[#F8FAFC] focus:border-brand-cyan focus:shadow-[0_0_12px_rgba(6,182,212,0.15)] placeholder-gray-600' 
                      : 'bg-white border-black/10 text-gray-900 focus:border-brand-purple focus:shadow-[0_4px_12px_rgba(139,92,246,0.08)] placeholder-gray-400'
                  }`}
                />
                
                <motion.button 
                  type="submit"
                  disabled={!inputMsg.trim() || isTyping}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-2.5 rounded-xl flex items-center justify-center text-white transition-all ${
                    inputMsg.trim() && !isTyping 
                      ? 'bg-gradient-to-r from-brand-blue to-brand-purple shadow-md cursor-pointer' 
                      : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  }`}
                  aria-label="Send Dialogue Key"
                >
                  <Send className="w-3.5 h-3.5 mr-1" />
                  <span className="text-[10px] font-mono uppercase tracking-widest hidden sm:inline">Send</span>
                </motion.button>
              </form>
              
              {/* Soft Hint */}
              <p className={`text-[8.5px] font-mono text-center mt-3 tracking-wider uppercase opacity-40`}>
                Shift + Enter for break • Cipher Active Node
              </p>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Spark Launcher Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-white cursor-pointer select-none relative z-50 shadow-[0_10px_35px_rgba(0,0,0,0.45)] bg-gradient-to-tr from-brand-blue via-brand-cyan to-brand-purple ${
          isOpen ? 'shadow-none' : 'animate-pulse hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]'
        }`}
        aria-label="Toggle Neural AI Link"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="dialog-icon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageSquare className="w-6 h-6" />
              {/* Little active signal light */}
              <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-slate-900" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

