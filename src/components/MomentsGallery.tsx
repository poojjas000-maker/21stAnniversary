import React, { useState } from 'react';
import { Camera, Plus, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { useAnniversary, sanitizeImageUrl } from '../context/AnniversaryContext';
import { GalleryPhoto } from '../data/anniversaryData';

interface MomentsGalleryProps {
  onPhotoClick: (photo: { src: string; title: string; caption: string; year?: string; rotation?: string }) => void;
  onOpenPhotoManager?: () => void;
  onSecretClick?: () => void;
}

export const MomentsGallery: React.FC<MomentsGalleryProps> = ({
  onPhotoClick,
  onOpenPhotoManager,
  onSecretClick,
}) => {
  const { gallery } = useAnniversary();
  const [activeFilter, setActiveFilter] = useState<'all' | 'recent' | 'adventures'>('all');

  const filteredPhotos = gallery.filter((photo) => {
    if (activeFilter === 'recent') return photo.year === '2024' || photo.year === '2025' || photo.year === '2026';
    if (activeFilter === 'adventures')
      return (
        photo.id === 'g1' ||
        photo.id === 'g4' ||
        photo.id === 'g6' ||
        photo.id === 'g-gateway' ||
        photo.title.toLowerCase().includes('gateway')
      );
    return true;
  });

  return (
    <section id="gallery" className="py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0E6] text-[#8C6D68] text-xs font-medium border border-[#EADBCE] mb-3">
          <Camera className="w-3.5 h-3.5 text-[#D63447]" />
          <span>Scrapbook Memories</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3D2C29] tracking-tight">
          Snapshots of Laughs, Travels & Warmth
        </h2>
        <p className="text-sm sm:text-base text-[#6B534E] mt-2">
          From mountain breezes to festive lights and grand landmarks, every photograph captures the genuine happiness they bring into each other's lives.
        </p>

        {/* Filter Tabs & Add Photo button */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <div className="inline-flex items-center gap-1 p-1 bg-[#FAF5EE] rounded-xl border border-[#EADBCE]">
            <button
              onClick={() => {
                soundEngine.playTapSound();
                setActiveFilter('all');
              }}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-white text-[#D63447] shadow-sm font-semibold'
                  : 'text-[#6B534E] hover:text-[#3D2C29]'
              }`}
            >
              All Photos ({gallery.length})
            </button>
            <button
              onClick={() => {
                soundEngine.playTapSound();
                setActiveFilter('adventures');
              }}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeFilter === 'adventures'
                  ? 'bg-white text-[#D63447] shadow-sm font-semibold'
                  : 'text-[#6B534E] hover:text-[#3D2C29]'
              }`}
            >
              Travels & Adventures
            </button>
            <button
              onClick={() => {
                soundEngine.playTapSound();
                setActiveFilter('recent');
              }}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeFilter === 'recent'
                  ? 'bg-white text-[#D63447] shadow-sm font-semibold'
                  : 'text-[#6B534E] hover:text-[#3D2C29]'
              }`}
            >
              Recent Smiles
            </button>
          </div>

          {onOpenPhotoManager && (
            <button
              onClick={() => {
                soundEngine.playTapSound();
                onOpenPhotoManager();
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium bg-[#FFF5F5] text-[#D63447] border border-[#F4C2C2] hover:bg-[#FEEFEF] transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add / Manage Photos</span>
            </button>
          )}
        </div>
      </div>

      {/* Polaroid Scrapbook Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {filteredPhotos.map((photo: GalleryPhoto, idx: number) => {
          return (
            <div
              key={photo.id}
              onClick={() => {
                soundEngine.playTapSound();
                onPhotoClick({
                  src: photo.src,
                  title: photo.title,
                  caption: photo.caption,
                  year: photo.year,
                  rotation: photo.rotation,
                });
              }}
              className={`group cursor-pointer bg-white p-3.5 pb-6 rounded-2xl border border-[#EADBCE] shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:rotate-0 relative ${
                photo.rotation || (idx % 2 === 0 ? '-rotate-1' : 'rotate-1')
              }`}
            >
              {/* Washi Tape Corner */}
              <div
                className={`absolute -top-3 ${
                  idx % 2 === 0 ? 'left-6' : 'right-6'
                } w-16 h-4 bg-[#F4C2C2]/70 rounded-xs shadow-xs pointer-events-none ${
                  idx % 2 === 0 ? 'rotate-[-3deg]' : 'rotate-[3deg]'
                }`}
              />

              {/* Photo Image Frame */}
              <div className="relative overflow-hidden rounded-xl aspect-4/3 bg-[#F2E7DC] watercolor-effect">
                <img
                  src={sanitizeImageUrl(photo.src)}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.includes('/public/')) {
                      target.src = target.src.replace('/public/', '/');
                    } else if (target.src.includes('/src/assets/images/')) {
                      target.src = target.src.replace('/src/assets/images/', '/assets/images/');
                    }
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-[#3D2C29] px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-[#D63447]" />
                    <span>View Memory</span>
                  </span>
                </div>
              </div>

              {/* Handwritten Note underneath */}
              <div className="mt-3 text-center px-1">
                <p className="font-serif font-bold text-base text-[#3D2C29]">{photo.title}</p>
                <p className="font-handwriting text-lg text-[#6B534E] mt-0.5 line-clamp-2">
                  “{photo.caption}”
                </p>
                {photo.year && (
                  <span className="text-[11px] font-mono text-[#A18882] block mt-1">
                    Year {photo.year}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Secret Golden Heart tucked in corner */}
      {onSecretClick && (
        <div className="mt-12 text-center relative">
          <button
            onClick={() => {
              soundEngine.playSecretFoundSound();
              onSecretClick();
            }}
            className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] hover:text-[#B39226] font-medium transition-all hover:scale-105 cursor-pointer py-1 px-3 rounded-full bg-[#FFFDF9] border border-[#F0D59D]/60 shadow-xs"
            title="Psst... a secret is hidden here!"
          >
            <span className="animate-bounce">✨💛</span>
            <span>A quiet little secret from Chinnu...</span>
          </button>
        </div>
      )}
    </section>
  );
};
