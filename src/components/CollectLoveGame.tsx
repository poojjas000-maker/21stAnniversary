import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Play, Pause, RotateCcw, ArrowRight, Sparkles, Key } from 'lucide-react';
import { ANNIVERSARY_CONFIG } from '../data/anniversaryData';
import { soundEngine } from '../utils/soundEngine';

interface CollectLoveGameProps {
  onUnlockSurprise: () => void;
  onSecretClick: () => void;
  reducedMotion: boolean;
}

interface FloatingHeart {
  id: number;
  year: number;
  x: number; // percentage
  y: number; // percentage
  vx: number;
  vy: number;
  size: number;
  color: string;
  isCollected: boolean;
}

export const CollectLoveGame: React.FC<CollectLoveGameProps> = ({
  onUnlockSurprise,
  onSecretClick,
  reducedMotion,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [collectedCount, setCollectedCount] = useState(0);
  const [currentMessage, setCurrentMessage] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const colors = ['#D63447', '#E2959E', '#F4C2C2', '#D4AF37', '#E07A5F'];

  // Initialize 21 hearts
  const initializeHearts = () => {
    const newHearts: FloatingHeart[] = [];
    for (let i = 1; i <= 21; i++) {
      newHearts.push({
        id: i,
        year: 2005 + i - 1,
        x: 10 + Math.random() * 80,
        y: 15 + Math.random() * 70,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: 26 + Math.random() * 12,
        color: colors[i % colors.length],
        isCollected: false,
      });
    }
    setHearts(newHearts);
    setCollectedCount(0);
    setCurrentMessage(null);
    setIsComplete(false);
  };

  const startGame = () => {
    soundEngine.playTapSound();
    initializeHearts();
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handleCollectHeart = (id: number) => {
    soundEngine.playHeartCollectSound(collectedCount);
    setHearts((prev) =>
      prev.map((h) => (h.id === id ? { ...h, isCollected: true } : h))
    );

    const nextCount = collectedCount + 1;
    setCollectedCount(nextCount);

    // Pick milestone note
    const msg = ANNIVERSARY_CONFIG.hearts21Messages[nextCount - 1];
    setCurrentMessage(msg);

    // Check completion
    if (nextCount >= 21) {
      setIsComplete(true);
      soundEngine.playCelebrationSound();

      if (!reducedMotion) {
        confetti({
          particleCount: 100,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#D63447', '#E2959E', '#F4C2C2', '#D4AF37'],
        });
      }
    }
  };

  // Subtle floating motion physics
  useEffect(() => {
    if (!isPlaying || isPaused || isComplete) return;

    const interval = setInterval(() => {
      setHearts((prev) =>
        prev.map((h) => {
          if (h.isCollected) return h;
          let nx = h.x + h.vx;
          let ny = h.y + h.vy;
          let nvx = h.vx;
          let nvy = h.vy;

          if (nx <= 5 || nx >= 92) nvx = -nvx;
          if (ny <= 8 || ny >= 88) nvy = -nvy;

          return { ...h, x: nx, y: ny, vx: nvx, vy: nvy };
        })
      );
    }, 45);

    return () => clearInterval(interval);
  }, [isPlaying, isPaused, isComplete]);

  return (
    <section id="game" className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0E6] text-[#8C6D68] text-xs font-medium border border-[#EADBCE] mb-3">
          <Heart className="w-3.5 h-3.5 text-[#D63447] fill-[#D63447]" />
          <span>Mini Game</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3D2C29] tracking-tight">
          Collect the Love — 21 Hearts
        </h2>
        <p className="text-sm sm:text-base text-[#6B534E] mt-2">
          Collect 21 floating hearts, one for each beautiful year of friendship, devotion, and shared joy from 2005 to 2026.
        </p>
      </div>

      {/* Main Game Stage */}
      <div
        ref={containerRef}
        className="relative w-full h-96 sm:h-[450px] bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EE] to-[#F5ECE1] rounded-3xl border-2 border-[#EADBCE] shadow-lg overflow-hidden select-none flex flex-col justify-between p-4"
      >
        {/* Game Top HUD */}
        <div className="flex items-center justify-between z-20">
          <div className="bg-white/90 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-[#EADBCE] text-xs font-medium text-[#3D2C29] shadow-xs flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-[#D63447] fill-[#D63447]" />
            <span className="font-mono font-bold text-sm text-[#D63447]">{collectedCount}</span>
            <span>of 21 little pieces of love collected</span>
          </div>

          {isPlaying && !isComplete && (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="p-1.5 rounded-full bg-white/90 border border-[#EADBCE] hover:bg-[#FAF5EE] text-[#6B534E] transition-colors cursor-pointer"
                title={isPaused ? 'Resume' : 'Pause'}
              >
                {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={startGame}
                className="p-1.5 rounded-full bg-white/90 border border-[#EADBCE] hover:bg-[#FAF5EE] text-[#6B534E] transition-colors cursor-pointer"
                title="Restart"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Start Game Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 bg-[#FFFDF9]/85 backdrop-blur-xs text-center">
            <div className="w-16 h-16 rounded-full bg-[#FEEFEF] border border-[#F4C2C2] flex items-center justify-center mb-4 shadow-sm">
              <Heart className="w-8 h-8 text-[#D63447] fill-[#D63447] animate-pulse" />
            </div>
            <h3 className="font-serif font-bold text-2xl text-[#3D2C29] mb-2">Ready to collect their love?</h3>
            <p className="text-sm text-[#6B534E] max-w-sm mb-6">
              21 hearts are drifting in the warm breeze. Simply tap or click each floating heart as it glides by to reveal 21 special reasons to celebrate Kunja & Chittapan.
            </p>
            <button
              onClick={startGame}
              className="px-6 py-3 rounded-full text-base font-medium text-white bg-[#D63447] hover:bg-[#B82436] shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start Collecting 💌</span>
            </button>
          </div>
        )}

        {/* Floating Hearts in the Field */}
        {isPlaying &&
          !isComplete &&
          hearts.map((h) => {
            if (h.isCollected) return null;
            return (
              <button
                key={h.id}
                onClick={() => handleCollectHeart(h.id)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-130 active:scale-95 z-10 focus:outline-hidden"
                style={{
                  left: `${h.x}%`,
                  top: `${h.y}%`,
                  width: `${h.size}px`,
                  height: `${h.size}px`,
                }}
                title={`Year ${h.year} Heart - Tap to collect!`}
              >
                <Heart
                  className="w-full h-full drop-shadow-sm transition-colors"
                  style={{ color: h.color, fill: h.color }}
                />
                <span className="sr-only">Collect Heart {h.id}</span>
              </button>
            );
          })}

        {/* Milestone Message Popup Bar */}
        {currentMessage && !isComplete && (
          <div className="z-20 self-center max-w-md w-full bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#F4C2C2] shadow-md text-center animate-fadeIn">
            <p className="font-handwriting text-lg text-[#3D2C29] leading-tight">
              “{currentMessage}”
            </p>
          </div>
        )}

        {/* Completion Celebration Overlay */}
        {isComplete && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 bg-[#FFFDF9]/90 backdrop-blur-sm text-center animate-fadeIn">
            <div className="text-4xl mb-2">🎉 ❤️ ✨</div>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#3D2C29] mb-2">
              All 21 Hearts Collected!
            </h3>
            <p className="text-base sm:text-lg text-[#6B534E] max-w-md font-serif italic mb-6">
              21 hearts for 21 beautiful years. And an infinite number of reasons to celebrate you. ❤️
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={onUnlockSurprise}
                className="px-7 py-3 rounded-full text-base font-medium text-white bg-[#D63447] hover:bg-[#B82436] shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Unlock your anniversary surprise</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={startGame}
                className="px-4 py-2.5 rounded-full text-xs font-medium text-[#6B534E] hover:bg-[#FAF5EE] border border-[#EADBCE] transition-colors cursor-pointer"
              >
                Replay Game
              </button>
            </div>

            {/* Hidden Secret Clue Button revealed only upon completion */}
            <div className="mt-6 pt-4 border-t border-[#F2E7DC]">
              <button
                onClick={onSecretClick}
                className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] hover:text-[#B39226] font-medium transition-colors cursor-pointer"
              >
                <Key className="w-3.5 h-3.5" />
                <span>Psst… there's one more secret</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
