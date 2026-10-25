import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface EnvelopeIntroProps {
  onOpen: () => void;
  reducedMotion: boolean;
}

export const EnvelopeIntro: React.FC<EnvelopeIntroProps> = ({ onOpen, reducedMotion }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpening) return;
    setIsOpening(true);
    soundEngine.playEnvelopeOpenSound();

    // Trigger sweet celebration confetti burst
    if (!reducedMotion) {
      confetti({
        particleCount: 55,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#D63447', '#E2959E', '#F4C2C2', '#FFD8CC', '#D4AF37'],
        shapes: ['circle'],
        scalar: 1.1,
      });

      // Secondary soft heart shower
      setTimeout(() => {
        confetti({
          particleCount: 35,
          angle: 60,
          spread: 55,
          origin: { x: 0.2, y: 0.6 },
          colors: ['#E2959E', '#D63447'],
        });
        confetti({
          particleCount: 35,
          angle: 120,
          spread: 55,
          origin: { x: 0.8, y: 0.6 },
          colors: ['#E2959E', '#D63447'],
        });
      }, 250);
    }

    setTimeout(() => {
      onOpen();
    }, 1100);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF3EC] to-[#F7ECE4]">
      {/* Whimsical Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Hearts */}
        <div className="absolute top-[12%] left-[10%] text-[#E2959E]/40 animate-pulse text-2xl">♡</div>
        <div className="absolute top-[20%] right-[15%] text-[#F4C2C2]/60 animate-bounce text-xl" style={{ animationDuration: '3s' }}>♥</div>
        <div className="absolute bottom-[22%] left-[14%] text-[#D63447]/30 text-3xl">♡</div>
        <div className="absolute bottom-[18%] right-[12%] text-[#E2959E]/50 text-2xl animate-pulse">♥</div>

        {/* Twinkling Stars */}
        <div className="absolute top-[28%] left-[22%] text-[#D4AF37]/50 text-lg">✦</div>
        <div className="absolute top-[16%] right-[28%] text-[#D4AF37]/60 text-base">✧</div>
        <div className="absolute bottom-[26%] right-[24%] text-[#D4AF37]/45 text-xl">✦</div>

        {/* Tiny Flowers */}
        <div className="absolute top-[35%] left-[8%] text-[#E2959E]/35 text-xl">❀</div>
        <div className="absolute top-[48%] right-[8%] text-[#F4C2C2]/45 text-2xl">✿</div>
      </div>

      {/* Main Intro Card & Envelope Container */}
      <div className="relative z-10 max-w-xl w-full text-center flex flex-col items-center">
        {/* Intro Greetings */}
        <div className="mb-6 space-y-2">
          <p className="text-sm sm:text-base font-handwriting text-[#8C6D68] tracking-wide text-lg sm:text-xl">
            A little something for two of my favourite people…
          </p>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#3D2C29] tracking-tight">
            Made with lots of love, just for Kunja & Chittapan ♡
          </h1>
        </div>

        {/* Sealed Envelope Graphic */}
        <div
          onClick={handleOpenEnvelope}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative w-72 sm:w-88 h-48 sm:h-56 my-6 cursor-pointer select-none transition-transform duration-300 ${
            isHovered && !isOpening ? 'scale-105 -rotate-1' : ''
          } ${isOpening ? 'scale-110' : ''}`}
          title="Click to open your surprise!"
        >
          {/* Envelope Body */}
          <div className="absolute inset-0 bg-[#F5ECE1] rounded-2xl border-2 border-[#E3D1C3] shadow-xl overflow-hidden">
            {/* Vintage Postal Edge Stamp Pattern */}
            <div className="absolute top-2 right-2 w-12 h-14 border border-[#C5A89E] border-dashed rounded p-1 flex flex-col items-center justify-center bg-[#FAF3EC]/80">
              <span className="text-[9px] font-mono text-[#8C6D68] uppercase tracking-tighter">21 Yrs</span>
              <Heart className="w-4 h-4 text-[#D63447] fill-[#D63447]/30 my-0.5" />
              <span className="text-[8px] font-mono text-[#8C6D68]">2005-26</span>
            </div>

            {/* Inner Letter Sneak Peek (slides up when opening) */}
            <div
              className={`absolute inset-x-4 top-4 bottom-4 bg-[#FFFDF9] rounded-lg border border-[#E8DCD4] shadow-inner p-4 flex flex-col items-center justify-center transition-all duration-700 ${
                isOpening ? '-translate-y-16 opacity-100' : 'opacity-30'
              }`}
            >
              <Heart className="w-8 h-8 text-[#D63447] fill-[#D63447] animate-pulse mb-1" />
              <span className="font-handwriting text-xl text-[#3D2C29]">Happy 21st Anniversary!</span>
              <span className="text-xs text-[#8C6D68]">Kunja & Chittapan</span>
            </div>

            {/* Lower Envelope Flap Creases (SVG) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="none"
              viewBox="0 0 350 220"
            >
              <polygon points="0,220 175,110 350,220" fill="#EBDDCF" opacity="0.95" />
              <polygon points="0,0 175,115 0,220" fill="#E4D3C4" opacity="0.65" />
              <polygon points="350,0 175,115 350,220" fill="#DECBBF" opacity="0.65" />
            </svg>

            {/* Top Envelope Flap (animates open) */}
            <div
              className={`absolute top-0 inset-x-0 origin-top transition-all duration-500 ease-out z-20 ${
                isOpening ? '-scale-y-100 opacity-20' : 'scale-y-100'
              }`}
            >
              <svg
                className="w-full h-28 sm:h-32 drop-shadow-md"
                preserveAspectRatio="none"
                viewBox="0 0 350 130"
              >
                <polygon points="0,0 350,0 175,130" fill="#F1E4D6" stroke="#DECBBF" strokeWidth="1" />
              </svg>
            </div>

            {/* Wax Seal in Center */}
            <div
              className={`absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-transform duration-300 ${
                isHovered && !isOpening ? 'scale-115 rotate-6' : ''
              } ${isOpening ? 'scale-0 opacity-0' : 'scale-100'}`}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E63946] to-[#A6192E] shadow-md border-2 border-[#FFE5E5]/60 flex items-center justify-center relative">
                <Heart className="w-6 h-6 text-white fill-white" />
                <div className="absolute inset-0 rounded-full border border-white/30" />
              </div>
            </div>
          </div>
        </div>

        {/* Primary Call to Action Button */}
        <div className="mt-4 flex flex-col items-center gap-3">
          <button
            onClick={handleOpenEnvelope}
            disabled={isOpening}
            className="group px-7 py-3 rounded-full text-base sm:text-lg font-medium text-white bg-[#D63447] hover:bg-[#B82436] active:scale-95 shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#FFD8CC] group-hover:rotate-12 transition-transform" />
            <span>Open Your Surprise 💌</span>
          </button>

          <span className="font-handwriting text-xl sm:text-2xl text-[#8C6D68] mt-1">
            With love, Chinnu ♡
          </span>
        </div>
      </div>
    </div>
  );
};
