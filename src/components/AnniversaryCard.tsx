import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Printer, RotateCcw, Camera } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { useAnniversary, sanitizeImageUrl } from '../context/AnniversaryContext';
import { ChittapanFigure, KunjaFigure } from './CoupleCharacters';

interface AnniversaryCardProps {
  onReplay: () => void;
  reducedMotion: boolean;
  onOpenPhotoManager?: () => void;
}

export const AnniversaryCard: React.FC<AnniversaryCardProps> = ({
  onReplay,
  reducedMotion,
  onOpenPhotoManager,
}) => {
  const { cardPhoto, cardFestivePhoto, characters } = useAnniversary();
  const [isRevealed, setIsRevealed] = useState(false);
  const [photoVariant, setPhotoVariant] = useState<'primary' | 'festive'>('primary');

  const handleRevealCard = () => {
    setIsRevealed(true);
    soundEngine.playCelebrationSound();

    if (!reducedMotion) {
      // Grand celebratory explosion
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#D63447', '#E2959E', '#F4C2C2', '#D4AF37', '#FFD8CC'],
      });

      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 45,
          spread: 60,
          origin: { x: 0.1, y: 0.7 },
          colors: ['#D63447', '#D4AF37'],
        });
        confetti({
          particleCount: 60,
          angle: 135,
          spread: 60,
          origin: { x: 0.9, y: 0.7 },
          colors: ['#D63447', '#D4AF37'],
        });
      }, 350);
    }
  };

  const handlePrint = () => {
    soundEngine.playTapSound();
    window.print();
  };

  const activePhoto = photoVariant === 'primary' ? cardPhoto : cardFestivePhoto;

  return (
    <section id="card" className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Intro prompt */}
      {!isRevealed ? (
        <div className="text-center py-12 flex flex-col items-center">
          <span className="font-handwriting text-2xl text-[#8C6D68] mb-2">
            And now, a little something to celebrate your forever…
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#3D2C29] mb-8">
            The 21st Anniversary Keepsake Card
          </h2>

          {/* Folded Greeting Card Mockup */}
          <div
            onClick={handleRevealCard}
            className="group cursor-pointer w-72 sm:w-80 h-96 bg-gradient-to-br from-[#FFFDF9] via-[#FAF3EC] to-[#F7ECE4] rounded-3xl border-2 border-[#EADBCE] shadow-2xl p-6 flex flex-col items-center justify-between transition-all duration-300 hover:scale-103 hover:shadow-3xl select-none relative overflow-hidden"
          >
            {/* Elegant Floral & Gold Border */}
            <div className="absolute inset-3 border border-[#D4AF37]/50 rounded-2xl pointer-events-none" />

            <div className="text-center mt-6">
              <span className="text-[11px] font-mono tracking-widest text-[#8C6D68] uppercase">
                A SPECIAL GIFT
              </span>
              <p className="font-serif font-bold text-2xl text-[#3D2C29] mt-1">Kunja & Chittapan</p>
              <div className="w-8 h-0.5 bg-[#D63447] mx-auto mt-2 rounded" />
            </div>

            {/* Center Heart Crest */}
            <div className="w-20 h-20 rounded-full bg-[#FFF5F5] border-2 border-[#F4C2C2] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <Heart className="w-10 h-10 text-[#D63447] fill-[#D63447] animate-pulse" />
            </div>

            <div className="text-center mb-6">
              <p className="font-handwriting text-xl text-[#8C6D68]">21 Years of Devotion & Laughter</p>
              <span className="text-xs text-[#A18882] font-mono">2005 — 2026</span>
            </div>
          </div>

          <button
            onClick={handleRevealCard}
            className="mt-8 px-8 py-3.5 rounded-full text-base sm:text-lg font-medium text-white bg-[#D63447] hover:bg-[#B82436] shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#FFD8CC]" />
            <span>Reveal Your Anniversary Card ❤️</span>
          </button>
        </div>
      ) : (
        /* The Grand Opened Anniversary Card */
        <div className="relative">
          {/* Action Toolbar on Top */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 no-print">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#8C6D68] font-medium">Portrait:</span>
              <button
                onClick={() => setPhotoVariant('primary')}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                  photoVariant === 'primary'
                    ? 'bg-[#D63447] text-white border-[#D63447]'
                    : 'bg-white text-[#6B534E] border-[#EADBCE]'
                }`}
              >
                Mountain View
              </button>
              <button
                onClick={() => setPhotoVariant('festive')}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                  photoVariant === 'festive'
                    ? 'bg-[#D63447] text-white border-[#D63447]'
                    : 'bg-white text-[#6B534E] border-[#EADBCE]'
                }`}
              >
                Festive Attire
              </button>

              {onOpenPhotoManager && (
                <button
                  onClick={() => onOpenPhotoManager()}
                  className="flex items-center gap-1 text-xs text-[#D63447] hover:underline ml-1 cursor-pointer"
                  title="Upload a new portrait for the card"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Change Card Photo</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white text-[#3D2C29] border border-[#EADBCE] hover:bg-[#FAF5EE] shadow-xs transition-colors cursor-pointer"
                title="Print or Save as PDF Keepsake"
              >
                <Printer className="w-3.5 h-3.5 text-[#D63447]" />
                <span>Save / Print Card 🖨️</span>
              </button>

              <button
                onClick={onReplay}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white text-[#3D2C29] border border-[#EADBCE] hover:bg-[#FAF5EE] shadow-xs transition-colors cursor-pointer"
                title="Replay from the start"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#8C6D68]" />
                <span>Replay Our Story ↻</span>
              </button>
            </div>
          </div>

          {/* Full Grand Keepsake Card Body */}
          <div className="anniversary-card-print bg-[#FFFDF9] rounded-3xl border-3 border-[#E2959E] shadow-2xl p-6 sm:p-12 relative overflow-hidden paper-texture">
            {/* Illustrated Floral & Vintage Gold Flourish Frame */}
            <div className="absolute inset-3 sm:inset-4 border-2 border-[#D4AF37]/45 rounded-2xl pointer-events-none" />
            <div className="absolute inset-5 sm:inset-6 border border-[#F4C2C2]/50 rounded-xl pointer-events-none" />

            {/* Corner Decorative Botanicals */}
            <span className="absolute top-7 left-7 text-[#D4AF37]/60 text-xl pointer-events-none">❀</span>
            <span className="absolute top-7 right-7 text-[#D4AF37]/60 text-xl pointer-events-none">❀</span>
            <span className="absolute bottom-7 left-7 text-[#D4AF37]/60 text-xl pointer-events-none">❀</span>
            <span className="absolute bottom-7 right-7 text-[#D4AF37]/60 text-xl pointer-events-none">❀</span>

            {/* Card Content Grid */}
            <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
              {/* Crest / Header */}
              <div className="inline-flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-[#D63447] fill-[#D63447]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#8C6D68] font-bold">
                  21ST WEDDING ANNIVERSARY
                </span>
                <Heart className="w-4 h-4 text-[#D63447] fill-[#D63447]" />
              </div>

              <h3 className="text-3xl sm:text-5xl font-serif font-bold text-[#3D2C29] tracking-tight">
                Happy 21st Wedding Anniversary
              </h3>

              <div className="my-3">
                <h4 className="text-2xl sm:text-4xl font-serif font-bold text-[#D63447]">
                  Kunja & Chittapan
                </h4>
                <div className="flex items-center justify-center gap-3 mt-1.5 text-xs sm:text-sm font-mono text-[#8C6D68]">
                  <span>October 25, 2005</span>
                  <span>—</span>
                  <span>October 25, 2026</span>
                </div>
              </div>

              {/* Central Couple Photograph with Watercolor styling */}
              <div className="my-6 max-w-md w-full bg-white p-3 rounded-2xl border-2 border-[#EADBCE] shadow-lg relative -rotate-0.5">
                <div className="relative overflow-hidden rounded-xl aspect-4/3 bg-[#F5ECE1] watercolor-effect">
                  <img
                    src={sanitizeImageUrl(activePhoto)}
                    alt="Kunja and Chittapan"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src.includes('/public/')) {
                        target.src = target.src.replace('/public/', '/');
                      } else if (target.src.includes('/src/assets/images/')) {
                        target.src = target.src.replace('/src/assets/images/', '/assets/images/');
                      }
                    }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-20 bg-[#FAF0E6]"
                    style={{
                      backgroundImage: 'radial-gradient(#b8977e 1px, transparent 1px)',
                      backgroundSize: '12px 12px',
                    }}
                  />
                </div>
                <div className="mt-2 text-center">
                  <p className="font-handwriting text-xl text-[#503E3B]">
                    Wrapped in each other's warmth, through every season.
                  </p>
                </div>
              </div>

              {/* Little 2D Illustrated Couple holding hands at the bottom of the card */}
              <div className="flex items-end justify-center gap-2 my-2 py-1">
                <ChittapanFigure scene="holdingHands" config={characters.chittapan} scale={0.7} />
                <div className="flex flex-col items-center pb-8">
                  <Heart className="w-5 h-5 text-[#D63447] fill-[#D63447] animate-pulse" />
                </div>
                <KunjaFigure scene="holdingHands" config={characters.kunja} scale={0.7} />
              </div>

              {/* Natural Heartfelt Anniversary Card Prose */}
              <div className="space-y-4 text-base sm:text-lg text-[#4A3B32] leading-relaxed max-w-xl">
                <p className="font-serif italic text-lg sm:text-xl text-[#3D2C29]">
                  “Twenty-one years of shared warmth, quiet understanding, and growing young together, one beautiful sunrise at a time.”
                </p>

                <p>
                  “May you keep laughing at the silliest things, holding hands through every chapter, and making each other smile every single day.”
                </p>

                <p className="font-serif font-bold text-xl sm:text-2xl text-[#D63447] pt-1">
                  Here's to your forever. ❤️
                </p>

                <div className="pt-4 border-t border-[#F2E7DC]">
                  <p className="font-handwriting text-2xl sm:text-3xl text-[#3D2C29]">
                    Love you both endlessly,
                  </p>
                  <p className="font-handwriting text-3xl sm:text-4xl text-[#D63447] font-bold">
                    Your Chinnu ♡
                  </p>
                </div>

                {/* Final Animated Line */}
                <div className="mt-6 pt-4">
                  <p className="font-handwriting text-xl sm:text-2xl text-[#8C6D68] animate-pulse">
                    Your story is my favourite. And the best chapters are still ahead.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
