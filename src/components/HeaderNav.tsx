import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Heart, Camera, Wand2 } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface HeaderNavProps {
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenPhotoManager: () => void;
  onOpenCharacterCreator: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  reducedMotion,
  onToggleReducedMotion,
  activeSection,
  onNavigate,
  onOpenPhotoManager,
  onOpenCharacterCreator,
}) => {
  const [isMuted, setIsMuted] = useState(true);

  const handleToggleSound = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  const navItems = [
    { id: 'moments', label: 'Characters' },
    { id: 'gallery', label: 'Scrapbook' },
    { id: 'canvas', label: 'Heart Pen' },
    { id: 'letter', label: "Chinnu's Letter" },
    { id: 'game', label: '21 Hearts' },
    { id: 'card', label: 'Card' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#F4C2C2]/40 transition-all no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3 md:gap-6">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => onNavigate('top')}
          className="text-base sm:text-lg font-serif font-bold text-[#3D2C29] hover:text-[#D63447] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 text-left cursor-pointer"
          title="Back to Top"
        >
          <span>Kunja & Chittapan</span>
          <Heart className="w-4 h-4 text-[#D63447] fill-[#D63447] inline-block" />
          <span className="text-xs text-[#8C6D68] font-sans font-normal hidden lg:inline">2005 — 2026</span>
        </button>

        {/* Zone 2: Navigation Links (Clean single-line prose) */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-5 text-sm font-medium text-[#6B534E]">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundEngine.playTapSound();
                  onNavigate(item.id);
                }}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 relative cursor-pointer ${
                  isActive
                    ? 'text-[#D63447] font-semibold'
                    : 'hover:text-[#3D2C29]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D63447] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Interactive Controls (Photo Studio, Character Studio, Sound & Motion) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Photo Studio Button */}
          <button
            onClick={() => {
              soundEngine.playTapSound();
              onOpenPhotoManager();
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium bg-[#FFF5F5] text-[#D63447] border border-[#F4C2C2] hover:bg-[#FEEFEF] transition-all cursor-pointer shadow-xs"
            title="Upload and manage photos & captions"
          >
            <Camera className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Photos</span>
          </button>

          {/* Character Studio Button */}
          <button
            onClick={() => {
              soundEngine.playTapSound();
              onOpenCharacterCreator();
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium bg-white text-[#6B534E] hover:text-[#D63447] border border-[#EADBCE] hover:border-[#F4C2C2] transition-all cursor-pointer shadow-xs"
            title="Customize 2D cartoon characters & outfits"
          >
            <Wand2 className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="hidden sm:inline">Characters</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            aria-label={isMuted ? 'Play romantic music' : 'Mute music'}
            className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-full transition-all border cursor-pointer ${
              !isMuted
                ? 'bg-[#FEEFEF] text-[#D63447] border-[#F4C2C2] shadow-xs'
                : 'bg-white text-[#6B534E] border-[#EADBCE] hover:bg-[#FAF5EE]'
            }`}
            title={isMuted ? 'Turn on music' : 'Mute music'}
          >
            {!isMuted ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#D63447]" />
                <span className="hidden lg:inline">Music</span>
                <span className="flex items-center gap-0.5 ml-0.5">
                  <span className="w-1 h-2 bg-[#D63447] rounded-full animate-bounce" style={{ animationDuration: '0.6s' }} />
                  <span className="w-1 h-3 bg-[#D63447] rounded-full animate-bounce" style={{ animationDuration: '0.8s', animationDelay: '0.2s' }} />
                  <span className="w-1 h-1.5 bg-[#D63447] rounded-full animate-bounce" style={{ animationDuration: '0.7s', animationDelay: '0.4s' }} />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
              </>
            )}
          </button>

          {/* Reduced Motion Toggle */}
          <button
            onClick={onToggleReducedMotion}
            aria-pressed={reducedMotion}
            aria-label="Toggle motion effects"
            className={`p-1.5 text-xs rounded-full border transition-colors cursor-pointer ${
              reducedMotion
                ? 'bg-[#EFEAE2] text-[#3D2C29] border-[#D4C8BC]'
                : 'bg-white text-[#6B534E] border-[#EADBCE] hover:bg-[#FAF5EE]'
            }`}
            title={reducedMotion ? 'Enable smooth animations' : 'Reduce animations'}
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
