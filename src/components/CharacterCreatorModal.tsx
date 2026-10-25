import React, { useState } from 'react';
import { X, Sparkles, Check, Wand2, Heart, Footprints, Smile, Trees, Moon } from 'lucide-react';
import { useAnniversary, CharacterCustomization, DEFAULT_CHARACTER_CONFIG, sanitizeImageUrl } from '../context/AnniversaryContext';
import { ChittapanFigure, KunjaFigure, CharacterScene } from './CoupleCharacters';
import { soundEngine } from '../utils/soundEngine';

interface CharacterCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CharacterCreatorModal: React.FC<CharacterCreatorModalProps> = ({ isOpen, onClose }) => {
  const { characters, updateCharacters, gallery } = useAnniversary();
  const [activeTab, setActiveTab] = useState<'both' | 'chittapan' | 'kunja'>('both');
  const [testScene, setTestScene] = useState<CharacterScene>('holdingHands');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Local draft state
  const [draft, setDraft] = useState<CharacterCustomization>(characters);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleApplyPresetFromPhoto = (photoSrc: string, photoTitle: string) => {
    soundEngine.playTapSound();
    if (photoTitle.toLowerCase().includes('festive') || photoTitle.toLowerCase().includes('kurti')) {
      setDraft((prev) => ({
        ...prev,
        chittapan: {
          ...prev.chittapan,
          outfit: 'kurta',
          primaryColor: '#8C2344',
          secondaryColor: '#D4AF37',
        },
        kunja: {
          ...prev.kunja,
          outfit: 'festive',
          primaryColor: '#9B1D4B',
          secondaryColor: '#F4C2C2',
          hasBindi: true,
          hasGoldJewelry: true,
        },
        referencePhotoSrc: photoSrc,
      }));
      showToast('Applied Festive Silk Palette!');
    } else if (photoTitle.toLowerCase().includes('snow')) {
      setDraft((prev) => ({
        ...prev,
        chittapan: {
          ...prev.chittapan,
          outfit: 'snowsuit',
          primaryColor: '#4A5568',
          secondaryColor: '#D63447',
        },
        kunja: {
          ...prev.kunja,
          outfit: 'snowsuit',
          primaryColor: '#EAD5D7',
          secondaryColor: '#D63447',
          hasBindi: false,
        },
        referencePhotoSrc: photoSrc,
      }));
      showToast('Applied Cozy Snowsuit Palette!');
    } else if (photoTitle.toLowerCase().includes('gateway') || photoTitle.toLowerCase().includes('casual')) {
      setDraft((prev) => ({
        ...prev,
        chittapan: {
          ...prev.chittapan,
          outfit: 'striped',
          primaryColor: '#1F2937',
          secondaryColor: '#F3F4F6',
        },
        kunja: {
          ...prev.kunja,
          outfit: 'navyfloral',
          primaryColor: '#1E293B',
          secondaryColor: '#F1F5F9',
          hasBindi: true,
          hasGoldJewelry: true,
        },
        referencePhotoSrc: photoSrc,
      }));
      showToast('Applied Gateway of India Outfit Palette!');
    } else {
      setDraft((prev) => ({
        ...prev,
        chittapan: {
          ...prev.chittapan,
          outfit: 'striped',
          primaryColor: '#273C58',
          secondaryColor: '#F0F4F8',
        },
        kunja: {
          ...prev.kunja,
          outfit: 'festive',
          primaryColor: '#8C2344',
          secondaryColor: '#F4C2C2',
        },
        referencePhotoSrc: photoSrc,
      }));
      showToast('Applied Classic Scenic Palette!');
    }
  };

  const handleSave = () => {
    soundEngine.playCelebrationSound();
    updateCharacters(draft);
    showToast('Characters saved and updated on website! ♡');
    setTimeout(() => onClose(), 600);
  };

  const chittapanColors = ['#273C58', '#1F2937', '#8C2344', '#4A5568', '#2D3748', '#5C4033'];
  const kunjaColors = ['#8C2344', '#9B1D4B', '#1E293B', '#D4AF37', '#7C3AED', '#3D2C29'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm animate-fadeIn">
      <div className="relative max-w-4xl w-full bg-[#FFFDF9] rounded-3xl border-2 border-[#EADBCE] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EFE5DB] bg-[#FAF5EE]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#FFF5F5] flex items-center justify-center border border-[#F4C2C2]">
              <Wand2 className="w-4 h-4 text-[#D63447]" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#3D2C29]">
                Kunja & Chittapan Character Creator
              </h3>
              <p className="text-xs text-[#8C6D68]">
                Customize cute, elegant 2D cartoon storybook characters inspired by their real photos
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playTapSound();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-black/5 text-[#8C6D68] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toast */}
        {toastMessage && (
          <div className="absolute top-16 right-6 z-30 bg-[#2D2422] text-white text-xs px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-fadeIn">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Modal Main Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#FAF5EE]/40 space-y-6">
          {/* Reference Photo Picker Banner */}
          <div className="bg-white p-4 rounded-2xl border border-[#EADBCE] shadow-sm">
            <span className="text-xs font-serif font-bold text-[#3D2C29] flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Inspiration from Kunja & Chittapan's Photos</span>
            </span>
            <p className="text-[11px] text-[#8C6D68] mb-3">
              Click any photo to automatically style their outfits and colors based on that memory:
            </p>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {gallery.slice(0, 6).map((photo) => (
                <button
                  key={photo.id}
                  onClick={() => handleApplyPresetFromPhoto(photo.src, photo.title)}
                  className={`group relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    draft.referencePhotoSrc === photo.src
                      ? 'border-[#D63447] ring-2 ring-[#D63447]/30 scale-105'
                      : 'border-[#EADBCE] hover:border-[#F4C2C2]'
                  }`}
                  title={`Preset: ${photo.title}`}
                >
                  <img
                    src={sanitizeImageUrl(photo.src)}
                    alt={photo.title}
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
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Live Character Stage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Live Stage with Animation Controls */}
            <div className="bg-gradient-to-b from-[#FFFDF9] via-[#FAF3EC] to-[#F3E6DA] p-6 rounded-2xl border border-[#EADBCE] shadow-sm flex flex-col items-center justify-between min-h-[300px]">
              <div className="text-center mb-2">
                <span className="text-xs font-mono font-bold text-[#8C6D68] uppercase tracking-wider">
                  Live Animation Preview
                </span>
              </div>

              {/* Character Pair Preview */}
              <div className="flex items-end justify-center gap-3 my-auto py-2">
                <div
                  className={`flex flex-col items-center transition-transform ${
                    testScene === 'walking' ? 'animate-bounce' : ''
                  } ${testScene === 'hug' ? 'translate-x-5' : ''}`}
                >
                  <ChittapanFigure scene={testScene} config={draft.chittapan} scale={0.95} />
                  <span className="text-[10px] text-[#8C6D68] font-medium mt-1">Chittapan</span>
                </div>

                <div className="flex flex-col items-center pb-12">
                  {testScene === 'hug' ? (
                    <Heart className="w-7 h-7 text-[#D63447] fill-[#D63447] animate-pulse" />
                  ) : testScene === 'holdingHands' ? (
                    <Heart className="w-5 h-5 text-[#D63447] fill-[#D63447]" />
                  ) : (
                    <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                  )}
                </div>

                <div
                  className={`flex flex-col items-center transition-transform ${
                    testScene === 'walking' ? 'animate-bounce' : ''
                  } ${testScene === 'hug' ? '-translate-x-5' : ''}`}
                >
                  <KunjaFigure scene={testScene} config={draft.kunja} scale={0.95} />
                  <span className="text-[10px] text-[#8C6D68] font-medium mt-1">Kunja</span>
                </div>
              </div>

              {/* Animation Switcher Controls */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-3 border-t border-[#EADBCE] w-full">
                {[
                  { id: 'holdingHands', label: 'Hands', icon: Heart },
                  { id: 'hug', label: 'Hug', icon: Smile },
                  { id: 'walking', label: 'Walk', icon: Footprints },
                  { id: 'meeting', label: 'Wave', icon: Sparkles },
                  { id: 'tree', label: 'Tree', icon: Trees },
                  { id: 'bench', label: 'Bench', icon: Moon },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.id}
                      onClick={() => {
                        soundEngine.playTapSound();
                        setTestScene(s.id as CharacterScene);
                      }}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-medium flex items-center gap-1 transition-all cursor-pointer ${
                        testScene === s.id
                          ? 'bg-[#D63447] text-white shadow-xs'
                          : 'bg-white text-[#6B534E] hover:bg-[#FAF5EE] border border-[#EADBCE]'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{s.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Customization Controls */}
            <div className="space-y-4">
              {/* Character Sub-tabs */}
              <div className="flex items-center gap-2 p-1 bg-white rounded-xl border border-[#EADBCE]">
                <button
                  onClick={() => setActiveTab('both')}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'both' ? 'bg-[#D63447] text-white' : 'text-[#6B534E]'
                  }`}
                >
                  Quick Styles
                </button>
                <button
                  onClick={() => setActiveTab('chittapan')}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'chittapan' ? 'bg-[#D63447] text-white' : 'text-[#6B534E]'
                  }`}
                >
                  Chittapan
                </button>
                <button
                  onClick={() => setActiveTab('kunja')}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'kunja' ? 'bg-[#D63447] text-white' : 'text-[#6B534E]'
                  }`}
                >
                  Kunja
                </button>
              </div>

              {/* CHITTAPAN CONTROLS */}
              {(activeTab === 'chittapan' || activeTab === 'both') && (
                <div className="bg-white p-4 rounded-2xl border border-[#EADBCE] shadow-sm space-y-3">
                  <span className="font-serif font-bold text-xs text-[#3D2C29] block">
                    Chittapan's Style
                  </span>

                  <div>
                    <label className="text-[11px] text-[#8C6D68] block mb-1">Outfit</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { id: 'striped', label: 'Striped Polo' },
                        { id: 'kurta', label: 'Festive Kurta' },
                        { id: 'snowsuit', label: 'Winter Suit' },
                        { id: 'tshirt', label: 'Casual Tee' },
                      ].map((o) => (
                        <button
                          key={o.id}
                          onClick={() =>
                            setDraft((prev) => ({
                              ...prev,
                              chittapan: { ...prev.chittapan, outfit: o.id as any },
                            }))
                          }
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                            draft.chittapan.outfit === o.id
                              ? 'bg-[#FEEFEF] text-[#D63447] border-[#F4C2C2]'
                              : 'bg-white text-[#6B534E] border-[#EADBCE]'
                          }`}
                        >
                          {o.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-[#8C6D68] block mb-1">Color</label>
                    <div className="flex items-center gap-2">
                      {chittapanColors.map((color) => (
                        <button
                          key={color}
                          onClick={() =>
                            setDraft((prev) => ({
                              ...prev,
                              chittapan: { ...prev.chittapan, primaryColor: color },
                            }))
                          }
                          className={`w-6 h-6 rounded-full cursor-pointer transition-transform ${
                            draft.chittapan.primaryColor === color
                              ? 'scale-125 ring-2 ring-[#D63447] ring-offset-2'
                              : 'hover:scale-110'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <label className="text-xs text-[#6B534E]">Eyeglasses</label>
                    <button
                      onClick={() =>
                        setDraft((prev) => ({
                          ...prev,
                          chittapan: { ...prev.chittapan, hasGlasses: !prev.chittapan.hasGlasses },
                        }))
                      }
                      className={`px-3 py-1 rounded-full text-xs font-medium border cursor-pointer ${
                        draft.chittapan.hasGlasses
                          ? 'bg-[#D63447] text-white border-[#D63447]'
                          : 'bg-white text-[#6B534E] border-[#EADBCE]'
                      }`}
                    >
                      {draft.chittapan.hasGlasses ? 'Wearing Glasses' : 'No Glasses'}
                    </button>
                  </div>
                </div>
              )}

              {/* KUNJA CONTROLS */}
              {(activeTab === 'kunja' || activeTab === 'both') && (
                <div className="bg-white p-4 rounded-2xl border border-[#EADBCE] shadow-sm space-y-3">
                  <span className="font-serif font-bold text-xs text-[#3D2C29] block">
                    Kunja's Style
                  </span>

                  <div>
                    <label className="text-[11px] text-[#8C6D68] block mb-1">Outfit</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { id: 'festive', label: 'Berry Kurti & Dupatta' },
                        { id: 'navyfloral', label: 'Navy Floral Tunic' },
                        { id: 'snowsuit', label: 'Winter Jacket' },
                        { id: 'casual', label: 'Casual Chic Top' },
                      ].map((o) => (
                        <button
                          key={o.id}
                          onClick={() =>
                            setDraft((prev) => ({
                              ...prev,
                              kunja: { ...prev.kunja, outfit: o.id as any },
                            }))
                          }
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                            draft.kunja.outfit === o.id
                              ? 'bg-[#FEEFEF] text-[#D63447] border-[#F4C2C2]'
                              : 'bg-white text-[#6B534E] border-[#EADBCE]'
                          }`}
                        >
                          {o.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-[#8C6D68] block mb-1">Color</label>
                    <div className="flex items-center gap-2">
                      {kunjaColors.map((color) => (
                        <button
                          key={color}
                          onClick={() =>
                            setDraft((prev) => ({
                              ...prev,
                              kunja: { ...prev.kunja, primaryColor: color },
                            }))
                          }
                          className={`w-6 h-6 rounded-full cursor-pointer transition-transform ${
                            draft.kunja.primaryColor === color
                              ? 'scale-125 ring-2 ring-[#D63447] ring-offset-2'
                              : 'hover:scale-110'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <label className="text-xs text-[#6B534E]">Bindi & Gold Jewelry</label>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() =>
                          setDraft((prev) => ({
                            ...prev,
                            kunja: { ...prev.kunja, hasBindi: !prev.kunja.hasBindi },
                          }))
                        }
                        className={`px-2.5 py-1 rounded-full text-[11px] font-medium border cursor-pointer ${
                          draft.kunja.hasBindi
                            ? 'bg-[#D63447] text-white border-[#D63447]'
                            : 'bg-white text-[#6B534E] border-[#EADBCE]'
                        }`}
                      >
                        Bindi
                      </button>
                      <button
                        onClick={() =>
                          setDraft((prev) => ({
                            ...prev,
                            kunja: { ...prev.kunja, hasGoldJewelry: !prev.kunja.hasGoldJewelry },
                          }))
                        }
                        className={`px-2.5 py-1 rounded-full text-[11px] font-medium border cursor-pointer ${
                          draft.kunja.hasGoldJewelry
                            ? 'bg-[#D63447] text-white border-[#D63447]'
                            : 'bg-white text-[#6B534E] border-[#EADBCE]'
                        }`}
                      >
                        Gold
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-[#EFE5DB] bg-[#FAF5EE]">
          <button
            onClick={() => {
              setDraft(DEFAULT_CHARACTER_CONFIG);
              showToast('Reset to default character styling');
            }}
            className="text-xs text-[#8C6D68] hover:text-[#D63447] transition-colors cursor-pointer"
          >
            Reset Style
          </button>

          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-full text-xs font-semibold text-white bg-[#D63447] hover:bg-[#B82436] transition-colors shadow-sm cursor-pointer flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Save & Apply Characters to Website ♡</span>
          </button>
        </div>
      </div>
    </div>
  );
};
