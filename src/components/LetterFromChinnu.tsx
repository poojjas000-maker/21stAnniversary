import React, { useState, useEffect } from 'react';
import { Mail, Heart, Sparkles, FastForward } from 'lucide-react';
import { ANNIVERSARY_CONFIG } from '../data/anniversaryData';
import { soundEngine } from '../utils/soundEngine';

export const LetterFromChinnu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [revealedIndex, setRevealedIndex] = useState(0);
  const [showAllInstantly, setShowAllInstantly] = useState(false);

  const paragraphs = ANNIVERSARY_CONFIG.letterParagraphs;

  const handleOpenLetter = () => {
    setIsOpen(true);
    soundEngine.playEnvelopeOpenSound();
  };

  // Line-by-line reveal timer
  useEffect(() => {
    if (isOpen && !showAllInstantly && revealedIndex < paragraphs.length) {
      const timer = setTimeout(() => {
        setRevealedIndex((prev) => prev + 1);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isOpen, revealedIndex, showAllInstantly, paragraphs.length]);

  const handleShowAll = () => {
    soundEngine.playTapSound();
    setShowAllInstantly(true);
    setRevealedIndex(paragraphs.length);
  };

  return (
    <section id="letter" className="py-16 sm:py-24 px-4 sm:px-6 max-w-3xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF0E6] text-[#8C6D68] text-xs font-medium border border-[#EADBCE] mb-3">
          <Mail className="w-3.5 h-3.5 text-[#D63447]" />
          <span>A Heartfelt Note</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3D2C29] tracking-tight">
          Psst… Kunja & Chittapan, there's a letter for you.
        </h2>
      </div>

      {/* Envelope Presentation State */}
      {!isOpen ? (
        <div className="flex flex-col items-center">
          <div
            onClick={handleOpenLetter}
            className="group cursor-pointer relative w-full max-w-md h-64 sm:h-72 bg-[#F7EFE5] rounded-3xl border-2 border-[#E3D1C3] shadow-xl p-6 flex flex-col justify-between transition-all duration-300 hover:scale-102 hover:shadow-2xl hover:-rotate-0.5 select-none"
          >
            {/* Top Postmark and Air Mail Edge */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-1.5 border border-[#D5C2B4] px-2.5 py-1 rounded bg-[#FFFDF9]/60">
                <span className="text-[10px] font-mono tracking-wider text-[#8C6D68] uppercase">AIR MAIL</span>
                <Heart className="w-3 h-3 text-[#D63447] fill-[#D63447]" />
              </div>

              {/* Postage Stamp */}
              <div className="w-14 h-16 bg-[#FFFDF9] border border-dashed border-[#C5A89E] rounded p-1 flex flex-col items-center justify-center shadow-xs">
                <span className="text-[9px] font-mono font-bold text-[#8C6D68]">21 YEARS</span>
                <Heart className="w-4 h-4 text-[#D63447] fill-[#D63447]/30 my-0.5" />
                <span className="text-[8px] font-mono text-[#8C6D68]">2005 - 2026</span>
              </div>
            </div>

            {/* Handwritten Address */}
            <div className="my-auto text-center px-4">
              <p className="text-xs uppercase tracking-widest text-[#8C6D68] font-sans font-medium mb-1">
                DELIVER WITH LOVE TO:
              </p>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#3D2C29] tracking-tight">
                Kunja & Chittapan
              </h3>
              <p className="font-handwriting text-xl text-[#8C6D68] mt-1">
                To my favourite couple, in the whole wide world.
              </p>
            </div>

            {/* Wax Seal at bottom */}
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#9B1D28] to-[#D63447] shadow-md border-2 border-white/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
            </div>
          </div>

          <button
            onClick={handleOpenLetter}
            className="mt-6 px-7 py-3 rounded-full text-base font-medium text-white bg-[#D63447] hover:bg-[#B82436] shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#FFD8CC]" />
            <span>Open your letter 💌</span>
          </button>
        </div>
      ) : (
        /* Unfolded Letter View */
        <div className="relative bg-[#FFFDF9] rounded-3xl border-2 border-[#EADBCE] shadow-2xl p-6 sm:p-12 paper-texture overflow-hidden animate-fadeIn">
          {/* Subtle Washi Tape top header */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-5 bg-[#F4C2C2]/60 rounded-b-sm shadow-xs" />

          {/* Floating Subtle Hearts Background */}
          <div className="absolute top-8 right-8 text-[#F4C2C2]/40 text-4xl pointer-events-none select-none">
            ♡
          </div>
          <div className="absolute bottom-16 left-8 text-[#E2959E]/30 text-5xl pointer-events-none select-none">
            ♥
          </div>

          {/* Instant Reveal Controls */}
          <div className="flex justify-end mb-6 no-print">
            {!showAllInstantly && revealedIndex < paragraphs.length && (
              <button
                onClick={handleShowAll}
                className="flex items-center gap-1 text-xs font-medium text-[#8C6D68] hover:text-[#D63447] transition-colors cursor-pointer bg-[#FAF5EE] px-3 py-1.5 rounded-full border border-[#EADBCE]"
              >
                <FastForward className="w-3.5 h-3.5" />
                <span>Show complete letter instantly</span>
              </button>
            )}
          </div>

          {/* Verbatim Letter Content */}
          <div className="space-y-5 text-[#3D2C29] leading-relaxed max-w-2xl mx-auto">
            {paragraphs.map((p, idx) => {
              const isRevealed = showAllInstantly || idx <= revealedIndex;
              if (!isRevealed) return null;

              const isSalutation = idx === 0;
              const isGreeting = idx === 1;
              const isSignoff = idx >= paragraphs.length - 2;

              return (
                <p
                  key={idx}
                  className={`transition-all duration-500 animate-fadeIn ${
                    isSalutation
                      ? 'font-serif font-bold text-2xl sm:text-3xl text-[#3D2C29]'
                      : isGreeting
                      ? 'font-serif font-bold text-xl sm:text-2xl text-[#D63447]'
                      : isSignoff
                      ? 'font-handwriting text-2xl sm:text-3xl text-[#503E3B] pt-2'
                      : 'text-base sm:text-lg text-[#55403B]'
                  }`}
                >
                  {p}
                </p>
              );
            })}
          </div>

          {/* Bottom Handwritten Signature */}
          {(showAllInstantly || revealedIndex >= paragraphs.length - 1) && (
            <div className="mt-10 pt-8 border-t border-[#F2E7DC] text-right max-w-2xl mx-auto">
              <p className="font-handwriting text-3xl sm:text-4xl text-[#D63447]">
                Lots and lots of love, Chinnu ♡
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
