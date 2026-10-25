import React from 'react';
import { X, Heart, Sparkles } from 'lucide-react';
import { ANNIVERSARY_CONFIG } from '../data/anniversaryData';
import { soundEngine } from '../utils/soundEngine';

interface SecretModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecretModal: React.FC<SecretModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative max-w-lg w-full bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37]/50 shadow-2xl overflow-hidden paper-texture">
        {/* Golden Sparkles Decor */}
        <div className="absolute top-3 left-4 text-[#D4AF37] text-lg">✦</div>
        <div className="absolute bottom-4 right-6 text-[#D4AF37] text-lg">✧</div>

        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playTapSound();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-black/5 text-[#8C6D68] transition-colors cursor-pointer"
          title="Close secret"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="text-center mt-2">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#FFF8EB] border border-[#F0D59D] flex items-center justify-center mb-4 shadow-xs">
            <Sparkles className="w-7 h-7 text-[#D4AF37]" />
          </div>

          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-semibold">
            A Secret Message
          </span>

          <h3 className="font-serif font-bold text-2xl text-[#3D2C29] mt-1 mb-4">
            Just one last little thing…
          </h3>

          <div className="p-5 rounded-2xl bg-[#FFF9F3] border border-[#F2E5D5] text-left">
            <p className="font-handwriting text-2xl sm:text-3xl text-[#4A3B32] leading-relaxed">
              “{ANNIVERSARY_CONFIG.secretMessage}”
            </p>
          </div>

          <div className="mt-6">
            <button
              onClick={() => {
                soundEngine.playTapSound();
                onClose();
              }}
              className="px-6 py-2.5 rounded-full text-xs font-medium text-white bg-[#D63447] hover:bg-[#B82436] transition-colors cursor-pointer"
            >
              Close with a Smile ♡
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
