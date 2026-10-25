import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, MapPin, Calendar, Eye, Paintbrush, Image as ImageIcon, Camera } from 'lucide-react';
import { Milestone } from '../data/anniversaryData';
import { soundEngine } from '../utils/soundEngine';
import { useAnniversary } from '../context/AnniversaryContext';

interface InteractiveTimelineProps {
  onPhotoClick: (photo: { src: string; title: string; caption: string; year?: string; rotation?: string }) => void;
  onSecretClick: () => void;
  onOpenPhotoManager?: (targetMilestoneId?: string) => void;
}

export const InteractiveTimeline: React.FC<InteractiveTimelineProps> = ({
  onPhotoClick,
  onSecretClick,
  onOpenPhotoManager,
}) => {
  const { milestones } = useAnniversary();
  const [animatedYear, setAnimatedYear] = useState(2005);
  const [isWatercolorActive, setIsWatercolorActive] = useState(true);

  // Animated year ticker on mount / scroll
  useEffect(() => {
    let current = 2005;
    const interval = setInterval(() => {
      current += 1;
      if (current > 2026) {
        clearInterval(interval);
      } else {
        setAnimatedYear(current);
      }
    }, 85);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="story" className="py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FAF0E6] text-[#8C6D68] text-xs font-medium border border-[#EADBCE] mb-4">
          <Calendar className="w-3.5 h-3.5 text-[#D63447]" />
          <span>21 Years of Cherished Memories · 2005 to 2026</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#3D2C29] tracking-tight mb-4">
          One Beautiful Step at a Time
        </h2>

        <p className="text-base sm:text-lg text-[#6B534E] leading-relaxed">
          Through winding mountain trails, festive evenings, bustling city landmarks, and all the quiet mornings in between — here are some of the sweetest chapters.
        </p>

        {/* Action Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <div className="px-5 py-2.5 rounded-2xl bg-white border border-[#EADBCE] shadow-sm flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-[#8C6D68] font-sans font-medium">Journey:</span>
            <span className="font-mono text-2xl sm:text-3xl font-bold text-[#D63447] tabular-nums">
              {animatedYear}
            </span>
            <Heart className="w-5 h-5 text-[#D63447] fill-[#D63447] animate-pulse" />
          </div>

          {/* Watercolor Filter Toggle */}
          <button
            onClick={() => setIsWatercolorActive(!isWatercolorActive)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-medium border transition-colors cursor-pointer ${
              isWatercolorActive
                ? 'bg-[#FEEFEF] text-[#D63447] border-[#F4C2C2]'
                : 'bg-white text-[#6B534E] border-[#EADBCE]'
            }`}
            title="Toggle watercolor painting texture on photos"
          >
            {isWatercolorActive ? (
              <>
                <Paintbrush className="w-3.5 h-3.5" />
                <span>Watercolor Style</span>
              </>
            ) : (
              <>
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Photo Style</span>
              </>
            )}
          </button>

          {/* Photo Manager Shortcut */}
          {onOpenPhotoManager && (
            <button
              onClick={() => onOpenPhotoManager()}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-medium bg-white text-[#6B534E] hover:text-[#D63447] border border-[#EADBCE] hover:border-[#F4C2C2] shadow-xs transition-colors cursor-pointer"
              title="Upload and manage timeline photographs"
            >
              <Camera className="w-3.5 h-3.5 text-[#D63447]" />
              <span>Manage Photos</span>
            </button>
          )}
        </div>
      </div>

      {/* Vertical Animated Timeline Vine */}
      <div className="relative">
        <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#E2959E] via-[#D63447] to-[#E2959E] -translate-x-1/2 opacity-40">
          <div className="sticky top-24 -ml-2 text-xs text-[#D63447] animate-bounce">
            ♥
          </div>
        </div>

        {/* Milestone Cards */}
        <div className="space-y-12 sm:space-y-16">
          {milestones.map((milestone: Milestone, index: number) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={milestone.id}
                className={`relative flex flex-col sm:flex-row items-center ${
                  isEven ? 'sm:flex-row-reverse' : ''
                } gap-6 sm:gap-12 pl-10 sm:pl-0`}
              >
                {/* Center Node Badge */}
                <div className="absolute left-4 sm:left-1/2 top-6 -translate-x-1/2 w-9 h-9 rounded-full bg-[#FFFDF9] border-2 border-[#D63447] shadow-sm flex items-center justify-center z-10">
                  <span className="text-xs font-bold text-[#D63447] font-mono">
                    {typeof milestone.year === 'string' ? milestone.year.slice(-2) : milestone.year}
                  </span>
                </div>

                {/* Milestone Content Card */}
                <div className="w-full sm:w-1/2">
                  <div
                    className={`bg-white rounded-3xl p-6 border border-[#EADBCE] shadow-sm hover:shadow-md transition-all duration-300 relative ${
                      isEven ? 'sm:mr-6' : 'sm:ml-6'
                    }`}
                  >
                    {/* Washi Tape Decor */}
                    <div className="absolute -top-3 left-8 w-20 h-4 bg-[#F4C2C2]/70 rotate-[-2deg] rounded-sm shadow-xs pointer-events-none" />

                    {/* Milestone Header */}
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <span className="text-xs font-mono font-bold text-[#D63447] tracking-wider uppercase">
                          Year {milestone.year}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#3D2C29] mt-0.5">
                          {milestone.title}
                        </h3>
                      </div>
                      {milestone.location && (
                        <div className="flex items-center gap-1 text-[11px] text-[#8C6D68] shrink-0 font-sans">
                          <MapPin className="w-3 h-3 text-[#D63447]" />
                          <span>{milestone.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Description Prose */}
                    <p className="text-sm sm:text-base text-[#6B534E] leading-relaxed mb-4">
                      {milestone.description}
                    </p>

                    {/* Polaroid-style Photograph */}
                    {milestone.image && (
                      <div
                        onClick={() =>
                          onPhotoClick({
                            src: milestone.image!,
                            title: milestone.title,
                            caption: milestone.note || milestone.description,
                            year: String(milestone.year),
                          })
                        }
                        className={`group cursor-pointer bg-[#FAF5EE] p-3 pb-5 rounded-xl border border-[#DFCEBD] shadow-md transition-transform duration-300 hover:scale-[1.02] ${
                          index % 2 === 0 ? '-rotate-1 hover:rotate-0' : 'rotate-1 hover:rotate-0'
                        }`}
                      >
                        <div
                          className={`relative overflow-hidden rounded-lg aspect-4/3 bg-[#EADBCE] ${
                            isWatercolorActive ? 'watercolor-effect' : ''
                          }`}
                        >
                          <img
                            src={milestone.image}
                            alt={milestone.imageAlt || milestone.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                          <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/50 text-white text-[10px] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Eye className="w-3 h-3" />
                            <span>View Memory</span>
                          </div>
                        </div>

                        {/* Handwritten Polaroid Caption */}
                        {milestone.note && (
                          <div className="mt-2.5 text-center px-2">
                            <p className="font-handwriting text-lg text-[#503E3B] leading-tight">
                              “{milestone.note}”
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Footer Tags & Edit Action */}
                    <div className="mt-4 pt-3 border-t border-[#F2E7DC] flex items-center justify-between text-xs text-[#8C6D68]">
                      <div className="flex items-center gap-2">
                        {milestone.tags && milestone.tags.length > 0 && (
                          milestone.tags.map((tag, tIdx) => (
                            <React.Fragment key={tag}>
                              <span>#{tag}</span>
                              {tIdx < milestone.tags!.length - 1 && <span aria-hidden="true">·</span>}
                            </React.Fragment>
                          ))
                        )}
                      </div>

                      {onOpenPhotoManager && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            soundEngine.playTapSound();
                            onOpenPhotoManager(milestone.id);
                          }}
                          className="text-[11px] text-[#D63447] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Camera className="w-3 h-3" />
                          <span>Change Photo</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Empty opposite column for balanced zigzag layout */}
                <div className="hidden sm:block sm:w-1/2" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Story Conclusion Callout */}
      <div className="mt-20 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#FFF5F5] via-[#FFFDF9] to-[#FFF5F5] border-2 border-[#F4C2C2]/60 text-center relative overflow-hidden shadow-sm">
        {/* Decorative Stamps */}
        <div className="absolute top-3 left-4 text-xs font-mono text-[#D63447]/40">EST. 2005</div>
        <div className="absolute bottom-3 right-4 text-xs font-mono text-[#D63447]/40">FOREVER 2026+</div>

        <Heart className="w-8 h-8 text-[#D63447] fill-[#D63447]/20 mx-auto mb-3 animate-pulse" />
        <p className="font-serif text-xl sm:text-2xl font-bold text-[#3D2C29] max-w-xl mx-auto">
          21 years of shared laughter, quiet comfort, and building a world together. And the best part? The story keeps growing sweeter. ♡
        </p>

        {/* Secret Interactive Golden Heart in Corner */}
        <button
          onClick={() => {
            soundEngine.playSecretFoundSound();
            onSecretClick();
          }}
          className="absolute bottom-3 right-4 p-2 text-[#D4AF37] hover:scale-125 transition-transform cursor-pointer group"
          title="Psst... a secret is hidden here!"
          aria-label="Secret message from Chinnu"
        >
          <span className="text-base sm:text-lg animate-bounce inline-block">✨💛</span>
          <span className="sr-only">Secret Message</span>
        </button>
      </div>
    </section>
  );
};
