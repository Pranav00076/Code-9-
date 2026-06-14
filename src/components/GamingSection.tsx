import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Terminal, Trophy, Play, RotateCcw } from 'lucide-react';

interface GamingSectionProps {
  isDark: boolean;
}

export default function GamingSection({ isDark }: GamingSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Simple Pong Game Logic
  useEffect(() => {
    if (!isPlaying || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let ball = { x: canvas.width / 2, y: canvas.height / 2, dx: 4, dy: 4, radius: 6 };
    let paddle = { x: canvas.width / 2 - 40, y: canvas.height - 20, width: 80, height: 10 };
    let currentScore = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      let mouseX = (e.clientX - rect.left) * scaleX;
      paddle.x = mouseX - paddle.width / 2;
      
      // Keep paddle inside canvas
      if (paddle.x < 0) paddle.x = 0;
      if (paddle.x + paddle.width > canvas.width) paddle.x = canvas.width - paddle.width;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      // Clear canvas
      ctx.fillStyle = isDark ? 'rgba(10, 10, 10, 0.3)' : 'rgba(250, 250, 250, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw ball
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#06b6d4';
      ctx.fill();
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#06b6d4';
      ctx.closePath();

      // Draw paddle
      ctx.beginPath();
      ctx.roundRect(paddle.x, paddle.y, paddle.width, paddle.height, 5);
      ctx.fillStyle = '#8b5cf6';
      ctx.fill();
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#8b5cf6';
      ctx.closePath();
      
      // Reset shadow for next frame
      ctx.shadowBlur = 0;

      // Ball movement
      ball.x += ball.dx;
      ball.y += ball.dy;

      // Wall collision (left/right)
      if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
      }

      // Wall collision (top)
      if (ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
      }

      // Paddle collision
      if (
        ball.y + ball.radius > paddle.y &&
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.width
      ) {
        ball.dy = -Math.abs(ball.dy);
        ball.y = paddle.y - ball.radius; // Push ball out of paddle to prevent getting stuck
        // Add a bit of speed increase and angle change based on where it hit
        let hitPoint = ball.x - (paddle.x + paddle.width / 2);
        ball.dx = hitPoint * 0.15;
        currentScore += 10;
        setScore(currentScore);
        setHighScore(prev => currentScore > prev ? currentScore : prev);
      }

      // Game Over (bottom wall)
      if (ball.y + ball.radius > canvas.height) {
        setIsPlaying(false);
        return; // Stop animation
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isPlaying, isDark]);

  const startGame = () => {
    setScore(0);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-[85vh] pt-32 pb-20 px-6 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full flex flex-col items-center"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-purple/30 bg-brand-purple/10 text-brand-purple text-xs font-mono mb-4">
            <Terminal className="w-3.5 h-3.5" />
            <span>NEXUS ARENA</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
            Test Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-cyan">Reflexes</span>
          </h1>
          <p className={`text-sm max-w-md mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Initialize training sequence. Prevent the signal from dropping. Move your mouse to control the paddle.
          </p>
        </div>

        <div className="flex gap-8 mb-8 w-full max-w-2xl justify-center font-mono">
          <div className={`flex items-center gap-2 px-6 py-3 rounded-xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
            <span className="text-gray-500 text-xs uppercase tracking-widest">Score</span>
            <span className="text-2xl font-bold text-brand-cyan">{score}</span>
          </div>
          <div className={`flex items-center gap-2 px-6 py-3 rounded-xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-gray-500 text-xs uppercase tracking-widest">High</span>
            <span className="text-2xl font-bold text-brand-purple">{highScore}</span>
          </div>
        </div>

        <div className={`relative p-2 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'} shadow-[0_0_30px_rgba(139,92,246,0.15)]`}>
          <canvas 
            ref={canvasRef}
            width={600}
            height={400}
            className={`rounded-xl block max-w-full bg-black/40 cursor-none ${!isPlaying ? 'opacity-50 blur-[2px]' : ''}`}
            style={{ width: '100%', height: 'auto', aspectRatio: '3/2' }}
          />

          {!isPlaying && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <button 
                onClick={startGame}
                className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-purple to-brand-cyan text-white font-bold tracking-wider uppercase hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              >
                {score > 0 ? <RotateCcw className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {score > 0 ? 'Retry Sequence' : 'Initialize Game'}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
