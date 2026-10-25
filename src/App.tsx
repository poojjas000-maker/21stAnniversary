/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnniversaryProvider } from './context/AnniversaryContext';
import { EnvelopeIntro } from './components/EnvelopeIntro';
import { HeaderNav } from './components/HeaderNav';
import { CoupleCharacters } from './components/CoupleCharacters';
import { MomentsGallery } from './components/MomentsGallery';
import { HeartCanvasDraw } from './components/HeartCanvasDraw';
import { LetterFromChinnu } from './components/LetterFromChinnu';
import { CollectLoveGame } from './components/CollectLoveGame';
import { AnniversaryCard } from './components/AnniversaryCard';
import { PhotoLightbox } from './components/PhotoLightbox';
import { SecretModal } from './components/SecretModal';
import { PhotoManagerModal } from './components/PhotoManagerModal';
import { CharacterCreatorModal } from './components/CharacterCreatorModal';
import { Heart, Sparkles, Gift } from 'lucide-react';
import { soundEngine } from './utils/soundEngine';

function MainApp() {
  const [hasOpenedIntro, setHasOpenedIntro] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeSection, setActiveSection] = useState('top');
  const [lightboxPhoto, setLightboxPhoto] = useState<{
    src: string;
    title: string;
    caption: string;
    year?: string;
    rotation?: string;
  } | null>(null);
  const [isSecretOpen, setIsSecretOpen] = useState(false);
  const [isPhotoManagerOpen, setIsPhotoManagerOpen] = useState(false);
  const [isCharacterCreatorOpen, setIsCharacterCreatorOpen] = useState(false);
  const [targetMilestoneId, setTargetMilestoneId] = useState<string | undefined>(undefined);

  const handleOpenIntro = () => {
    setHasOpenedIntro(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  const handleReplay = () => {
    soundEngine.playTapSound();
    setHasOpenedIntro(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPhotoManagerWithMilestone = (milestoneId?: string) => {
    setTargetMilestoneId(milestoneId);
    setIsPhotoManagerOpen(true);
  };

  // If user hasn't opened envelope yet, show opening screen
  if (!hasOpenedIntro) {
    return (
      <EnvelopeIntro
        onOpen={handleOpenIntro}
        reducedMotion={reducedMotion}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#3D2C29] selection:bg-[#F4C2C2] selection:text-[#501D24] relative paper-texture">
      {/* Top Navigation */}
      <HeaderNav
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion(!reducedMotion)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenPhotoManager={() => handleOpenPhotoManagerWithMilestone()}
        onOpenCharacterCreator={() => setIsCharacterCreatorOpen(true)}
      />

      <main className="relative">
        {/* Hero Welcome Banner */}
        <section className="pt-12 pb-8 sm:pt-16 sm:pb-12 px-4 sm:px-6 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FAF0E6] text-[#8C6D68] text-xs font-medium border border-[#EADBCE] mb-4">
            <Gift className="w-3.5 h-3.5 text-[#D63447]" />
            <span>A Surprise Gift for Kunja & Chittapan · 21st Anniversary</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#3D2C29] tracking-tight">
            Happy 21st Wedding Anniversary!
          </h1>

          <p className="font-handwriting text-2xl sm:text-3xl text-[#D63447] mt-3">
            Celebrating 21 beautiful years of shared smiles, tea, travel, and quiet warmth ♡
          </p>

          <p className="text-sm sm:text-base text-[#6B534E] max-w-xl mx-auto mt-3">
            Welcome to your anniversary scrapbook. Flip through memories, draw a little love note, read your letter, and celebrate two of my absolute favourite people.
          </p>
        </section>


        {/* Chapter 2: Interactive 2D Couple Characters */}
        <section id="moments" className="py-16 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0E6] text-[#8C6D68] text-xs font-medium border border-[#EADBCE] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Storybook Characters</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3D2C29] tracking-tight">
              Little Kunja & Little Chittapan
            </h2>
            <p className="text-sm sm:text-base text-[#6B534E] mt-2">
              Cute 2D storybook avatars inspired by your photographs! Switch between their animated scenes, tap to shower them with love, or open the Wardrobe Studio to customize outfits.
            </p>
          </div>

          <CoupleCharacters onOpenCreator={() => setIsCharacterCreatorOpen(true)} />
        </section>

        {/* Chapter 3: Scrapbook Moments Gallery */}
        <MomentsGallery
          onPhotoClick={(photo) => setLightboxPhoto(photo)}
          onOpenPhotoManager={() => setIsPhotoManagerOpen(true)}
          onSecretClick={() => setIsSecretOpen(true)}
        />

        {/* Chapter 4: Interactive Heart Pen Canvas */}
        <HeartCanvasDraw reducedMotion={reducedMotion} />

        {/* Chapter 5: Heartfelt Letter from Chinnu */}
        <LetterFromChinnu />

        {/* Chapter 6: Collect the Love Mini-Game (21 Hearts) */}
        <CollectLoveGame
          onUnlockSurprise={() => handleNavigate('card')}
          onSecretClick={() => setIsSecretOpen(true)}
          reducedMotion={reducedMotion}
        />

        {/* Chapter 7: The Grand Finale Anniversary Card */}
        <AnniversaryCard
          onReplay={handleReplay}
          reducedMotion={reducedMotion}
          onOpenPhotoManager={() => setIsPhotoManagerOpen(true)}
        />
      </main>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 text-center border-t border-[#F2E7DC] bg-[#FAF5EE]/60 no-print">
        <div className="max-w-md mx-auto space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-[#D63447]">
            <Heart className="w-4 h-4 fill-[#D63447]" />
            <span className="font-serif font-bold text-base text-[#3D2C29]">Kunja & Chittapan</span>
            <Heart className="w-4 h-4 fill-[#D63447]" />
          </div>
          <p className="font-handwriting text-xl text-[#8C6D68]">
            Lovingly crafted with endless love by Chinnu ♡
          </p>
          <p className="text-xs text-[#A18882] font-mono">
            October 25, 2005 — October 25, 2026 · 21 Years of Joy
          </p>
        </div>
      </footer>

      {/* Photo Lightbox Modal */}
      <PhotoLightbox
        isOpen={Boolean(lightboxPhoto)}
        photo={lightboxPhoto}
        onClose={() => setLightboxPhoto(null)}
      />

      {/* Secret Message Modal */}
      <SecretModal
        isOpen={isSecretOpen}
        onClose={() => setIsSecretOpen(false)}
      />

      {/* Chinnu's Photo Management Studio Modal */}
      <PhotoManagerModal
        isOpen={isPhotoManagerOpen}
        onClose={() => {
          setIsPhotoManagerOpen(false);
          setTargetMilestoneId(undefined);
        }}
        targetMilestoneId={targetMilestoneId}
      />

      {/* 2D Character Creator & Wardrobe Studio Modal */}
      <CharacterCreatorModal
        isOpen={isCharacterCreatorOpen}
        onClose={() => setIsCharacterCreatorOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AnniversaryProvider>
      <MainApp />
    </AnniversaryProvider>
  );
}
