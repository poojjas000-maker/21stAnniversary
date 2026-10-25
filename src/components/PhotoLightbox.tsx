import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, Paintbrush, Image as ImageIcon, RotateCw } from 'lucide-react';
import { sanitizeImageUrl } from '../context/AnniversaryContext';

interface PhotoLightboxProps {
  isOpen: boolean;
  photo: {
    src: string;
    title: string;
    caption: string;
    year?: string;
    rotation?: string;
  } | null;
  onClose: () => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({ isOpen, photo, onClose }) => {
  const [zoom, setZoom] = useState(1);
  const [rotationDeg, setRotationDeg] = useState(0);
  const [watercolorMode, setWatercolorMode] = useState(true);

  if (!isOpen || !photo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      {/* Lightbox Card */}
      <div className="relative max-w-3xl w-full bg-[#FFFDF9] rounded-2xl shadow-2xl border border-[#E8DCD4] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#EFE5DB] bg-[#FAF3EC]/80">
          <div>
            <h4 className="font-serif font-bold text-base text-[#3D2C29]">{photo.title}</h4>
            {photo.year && <span className="text-xs text-[#8C6D68] font-sans">Memory from {photo.year}</span>}
          </div>

          <div className="flex items-center gap-2">
            {/* Watercolor Effect Toggle */}
            <button
              onClick={() => setWatercolorMode(!watercolorMode)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors border ${
                watercolorMode
                  ? 'bg-[#FEEFEF] text-[#D63447] border-[#F4C2C2]'
                  : 'bg-white text-[#6B534E] border-[#DFD1C4]'
              }`}
              title="Toggle artistic watercolor effect"
            >
              {watercolorMode ? (
                <>
                  <Paintbrush className="w-3.5 h-3.5" />
                  <span>Watercolor Mode</span>
                </>
              ) : (
                <>
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Original Photo</span>
                </>
              )}
            </button>

            {/* Rotate Button */}
            <button
              onClick={() => setRotationDeg((prev) => (prev + 90) % 360)}
              className="p-1.5 rounded-full hover:bg-black/5 text-[#6B534E]"
              title="Rotate 90 degrees"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            {/* Zoom Controls */}
            <button
              onClick={() => setZoom((prev) => Math.min(prev + 0.25, 2))}
              className="p-1.5 rounded-full hover:bg-black/5 text-[#6B534E]"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom((prev) => Math.max(prev - 0.25, 0.75))}
              className="p-1.5 rounded-full hover:bg-black/5 text-[#6B534E]"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                setRotationDeg(0);
                onClose();
              }}
              className="p-1.5 rounded-full hover:bg-black/5 text-[#6B534E] transition-colors ml-1"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image Display Area */}
        <div className="relative flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-[#FAF5EE]/50 min-h-[300px]">
          <div
            className={`relative transition-all duration-300 rounded-lg overflow-hidden shadow-lg border-4 border-white ${
              watercolorMode ? 'watercolor-effect' : ''
            }`}
            style={{ transform: `scale(${zoom}) rotate(${rotationDeg}deg)`, transformOrigin: 'center center' }}
          >
            <img
              src={sanitizeImageUrl(photo.src)}
              alt={photo.title}
              referrerPolicy="no-referrer"
              className="max-h-[60vh] max-w-full object-contain rounded"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src.includes('/public/')) {
                  target.src = target.src.replace('/public/', '/');
                } else if (target.src.includes('/src/assets/images/')) {
                  target.src = target.src.replace('/src/assets/images/', '/assets/images/');
                }
              }}
            />
            {watercolorMode && (
              <div
                className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-25 bg-[#FAF0E6]"
                style={{
                  backgroundImage: 'radial-gradient(#b8977e 1px, transparent 1px)',
                  backgroundSize: '12px 12px',
                }}
              />
            )}
          </div>
        </div>

        {/* Caption Area */}
        <div className="px-6 py-4 bg-white border-t border-[#EFE5DB] text-center">
          <p className="font-handwriting text-xl text-[#503E3B]">{photo.caption}</p>
        </div>
      </div>
    </div>
  );
};
