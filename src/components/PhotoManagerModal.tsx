import React, { useState } from 'react';
import { X, Upload, Camera, Trash2, RotateCw, Check, Plus, Calendar, Image as ImageIcon } from 'lucide-react';
import { useAnniversary, sanitizeImageUrl } from '../context/AnniversaryContext';
import { soundEngine } from '../utils/soundEngine';
import { Milestone, GalleryPhoto } from '../data/anniversaryData';

interface PhotoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'milestones' | 'gallery' | 'card';
  targetMilestoneId?: string;
}

export const PhotoManagerModal: React.FC<PhotoManagerModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'milestones',
  targetMilestoneId,
}) => {
  const {
    milestones,
    gallery,
    cardPhoto,
    cardFestivePhoto,
    updateMilestone,
    addMilestone,
    deleteMilestone,
    updateGalleryPhoto,
    addGalleryPhoto,
    deleteGalleryPhoto,
    setCardPhoto,
    setCardFestivePhoto,
    resetAllToDefaults,
  } = useAnniversary();

  const [activeTab, setActiveTab] = useState<'milestones' | 'gallery' | 'card'>(initialTab);
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>(
    targetMilestoneId || milestones[0]?.id || 'm-2005'
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New photo state for gallery
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [newGalleryCaption, setNewGalleryCaption] = useState('');
  const [newGalleryYear, setNewGalleryYear] = useState('2024');

  // New milestone state
  const [showAddMilestone, setShowAddMilestone] = useState(false);
  const [newMYear, setNewMYear] = useState('2018');
  const [newMTitle, setNewMTitle] = useState('');
  const [newMDesc, setNewMDesc] = useState('');
  const [newMLoc, setNewMLoc] = useState('');

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Helper to read uploaded files as Data URLs
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onComplete: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    soundEngine.playTapSound();
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        onComplete(event.target.result);
        showToast('Photo uploaded successfully! ♡');
      }
    };
    reader.readAsDataURL(file);
  };

  const currentMilestone = milestones.find((m) => m.id === selectedMilestoneId) || milestones[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm animate-fadeIn">
      <div className="relative max-w-4xl w-full bg-[#FFFDF9] rounded-3xl border-2 border-[#EADBCE] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EFE5DB] bg-[#FAF5EE]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#FEEFEF] flex items-center justify-center border border-[#F4C2C2]">
              <Camera className="w-4 h-4 text-[#D63447]" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#3D2C29]">
                Chinnu's Scrapbook Photo Studio
              </h3>
              <p className="text-xs text-[#8C6D68]">
                Upload, replace, add captions, and organize photos across all sections
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playTapSound();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-black/5 text-[#8C6D68] transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-[#EFE5DB] bg-[#FFFDF9]">
          <button
            onClick={() => setActiveTab('milestones')}
            className={`pb-3 text-xs sm:text-sm font-medium border-b-2 transition-colors cursor-pointer ${
              activeTab === 'milestones'
                ? 'border-[#D63447] text-[#D63447] font-semibold'
                : 'border-transparent text-[#6B534E] hover:text-[#3D2C29]'
            }`}
          >
            Timeline Milestones ({milestones.length})
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`pb-3 text-xs sm:text-sm font-medium border-b-2 transition-colors cursor-pointer ${
              activeTab === 'gallery'
                ? 'border-[#D63447] text-[#D63447] font-semibold'
                : 'border-transparent text-[#6B534E] hover:text-[#3D2C29]'
            }`}
          >
            Gallery Scrapbook ({gallery.length})
          </button>
          <button
            onClick={() => setActiveTab('card')}
            className={`pb-3 text-xs sm:text-sm font-medium border-b-2 transition-colors cursor-pointer ${
              activeTab === 'card'
                ? 'border-[#D63447] text-[#D63447] font-semibold'
                : 'border-transparent text-[#6B534E] hover:text-[#3D2C29]'
            }`}
          >
            Anniversary Card Portraits
          </button>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="absolute top-16 right-6 z-30 bg-[#2D2422] text-white text-xs px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-fadeIn">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#FAF5EE]/40">
          {/* TAB 1: TIMELINE MILESTONES */}
          {activeTab === 'milestones' && currentMilestone && (
            <div className="space-y-6">
              {/* Milestone Selector Ribbon */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                  {milestones.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMilestoneId(m.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                        selectedMilestoneId === m.id
                          ? 'bg-[#D63447] text-white shadow-xs'
                          : 'bg-white text-[#6B534E] border border-[#EADBCE] hover:bg-[#FAF5EE]'
                      }`}
                    >
                      <span>Year {m.year}</span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setShowAddMilestone(!showAddMilestone)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium bg-white text-[#D63447] border border-[#F4C2C2] hover:bg-[#FFF5F5] transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Milestone</span>
                </button>
              </div>

              {/* Add New Milestone Form (Collapsible) */}
              {showAddMilestone && (
                <div className="p-4 rounded-2xl bg-white border border-[#EADBCE] shadow-sm space-y-3 animate-fadeIn">
                  <h4 className="font-serif font-bold text-sm text-[#3D2C29]">Add A New Milestone</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] text-[#8C6D68] block mb-1">Year</label>
                      <input
                        type="text"
                        value={newMYear}
                        onChange={(e) => setNewMYear(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-lg border border-[#EADBCE] bg-[#FAF5EE]"
                        placeholder="e.g. 2018"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-[11px] text-[#8C6D68] block mb-1">Title</label>
                      <input
                        type="text"
                        value={newMTitle}
                        onChange={(e) => setNewMTitle(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-lg border border-[#EADBCE] bg-[#FAF5EE]"
                        placeholder="e.g. Mountain Roadtrips & Quiet Sunset Walks"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] text-[#8C6D68] block mb-1">Description</label>
                    <textarea
                      value={newMDesc}
                      onChange={(e) => setNewMDesc(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-[#EADBCE] bg-[#FAF5EE]"
                      rows={2}
                      placeholder="Write a sweet memory or note..."
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowAddMilestone(false)}
                      className="px-3 py-1.5 rounded-lg text-xs text-[#6B534E] hover:bg-[#FAF5EE]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (!newMTitle) return;
                        addMilestone({
                          year: newMYear,
                          title: newMTitle,
                          description: newMDesc || 'A lovely chapter in their 21-year journey.',
                          image: '/assets/images/regenerated_image_1792869904203.jpg',
                          note: newMTitle,
                          location: newMLoc || 'Together',
                          tags: ['Memory', 'Together'],
                        });
                        setShowAddMilestone(false);
                        setNewMTitle('');
                        setNewMDesc('');
                        showToast('New milestone added! ♡');
                      }}
                      className="px-4 py-1.5 rounded-lg text-xs font-medium text-white bg-[#D63447] hover:bg-[#B82436]"
                    >
                      Save Milestone
                    </button>
                  </div>
                </div>
              )}

              {/* Active Milestone Edit Panel */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-5 rounded-2xl border border-[#EADBCE] shadow-sm">
                {/* Photo Preview & Upload */}
                <div className="flex flex-col items-center">
                  <span className="text-xs font-mono uppercase text-[#8C6D68] mb-2 font-medium">
                    Milestone Photo
                  </span>

                  <div className="relative w-full max-w-sm aspect-4/3 rounded-xl overflow-hidden bg-[#FAF5EE] border-2 border-[#EADBCE] shadow-inner mb-3">
                    {currentMilestone.image ? (
                      <img
                        src={sanitizeImageUrl(currentMilestone.image)}
                        alt={currentMilestone.title}
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
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#8C6D68] text-xs">
                        No photo selected
                      </div>
                    )}
                  </div>

                  {/* Upload Controls */}
                  <div className="flex items-center gap-2 w-full max-w-sm">
                    <label className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-[#FFF5F5] text-[#D63447] border border-[#F4C2C2] hover:bg-[#FEEFEF] cursor-pointer transition-colors shadow-xs">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload New Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e, (dataUrl) => {
                            updateMilestone(currentMilestone.id, { image: dataUrl });
                          })
                        }
                      />
                    </label>

                    {/* Quick Pick from Existing Gallery */}
                    <select
                      className="text-xs px-2.5 py-2 rounded-xl border border-[#EADBCE] bg-[#FAF5EE] text-[#6B534E]"
                      onChange={(e) => {
                        if (e.target.value) {
                          updateMilestone(currentMilestone.id, { image: e.target.value });
                          showToast('Photo assigned to milestone!');
                        }
                      }}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Pick from Gallery
                      </option>
                      {gallery.map((g, idx) => (
                        <option key={g.id} value={g.src}>
                          {g.title || `Gallery Photo ${idx + 1}`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Text Details Edit */}
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-[#6B534E] block mb-1">
                      Milestone Year & Location
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={currentMilestone.year}
                        onChange={(e) =>
                          updateMilestone(currentMilestone.id, { year: e.target.value })
                        }
                        className="text-xs px-3 py-2 rounded-xl border border-[#EADBCE] bg-[#FAF5EE]"
                        placeholder="Year (e.g. 2005)"
                      />
                      <input
                        type="text"
                        value={currentMilestone.location || ''}
                        onChange={(e) =>
                          updateMilestone(currentMilestone.id, { location: e.target.value })
                        }
                        className="text-xs px-3 py-2 rounded-xl border border-[#EADBCE] bg-[#FAF5EE]"
                        placeholder="Location"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#6B534E] block mb-1">
                      Milestone Headline
                    </label>
                    <input
                      type="text"
                      value={currentMilestone.title}
                      onChange={(e) =>
                        updateMilestone(currentMilestone.id, { title: e.target.value })
                      }
                      className="w-full text-xs px-3 py-2 rounded-xl border border-[#EADBCE] bg-[#FAF5EE]"
                      placeholder="Title"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#6B534E] block mb-1">
                      Handwritten Polaroid Note
                    </label>
                    <input
                      type="text"
                      value={currentMilestone.note || ''}
                      onChange={(e) =>
                        updateMilestone(currentMilestone.id, { note: e.target.value })
                      }
                      className="w-full text-xs px-3 py-2 rounded-xl border border-[#EADBCE] bg-[#FAF5EE]"
                      placeholder="Short romantic caption on photo"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#6B534E] block mb-1">
                      Story Paragraph
                    </label>
                    <textarea
                      rows={3}
                      value={currentMilestone.description}
                      onChange={(e) =>
                        updateMilestone(currentMilestone.id, { description: e.target.value })
                      }
                      className="w-full text-xs px-3 py-2 rounded-xl border border-[#EADBCE] bg-[#FAF5EE]"
                      placeholder="Description"
                    />
                  </div>

                  {milestones.length > 1 && (
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this milestone?')) {
                            deleteMilestone(currentMilestone.id);
                            showToast('Milestone removed');
                          }
                        }}
                        className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Milestone</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GALLERY SCRAPBOOK */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              {/* Add New Photo Card */}
              <div className="bg-white p-5 rounded-2xl border border-[#EADBCE] shadow-sm">
                <h4 className="font-serif font-bold text-base text-[#3D2C29] mb-3 flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-[#D63447]" />
                  <span>Add a New Scrapbook Photo</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                  <div>
                    <label className="text-[11px] text-[#8C6D68] block mb-1">Photo Title</label>
                    <input
                      type="text"
                      value={newGalleryTitle}
                      onChange={(e) => setNewGalleryTitle(e.target.value)}
                      placeholder="e.g. Scenic Tea Gardens"
                      className="w-full text-xs px-3 py-2 rounded-xl border border-[#EADBCE] bg-[#FAF5EE]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#8C6D68] block mb-1">Year</label>
                    <input
                      type="text"
                      value={newGalleryYear}
                      onChange={(e) => setNewGalleryYear(e.target.value)}
                      placeholder="e.g. 2024"
                      className="w-full text-xs px-3 py-2 rounded-xl border border-[#EADBCE] bg-[#FAF5EE]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#8C6D68] block mb-1">Upload File</label>
                    <label className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-[#D63447] text-white hover:bg-[#B82436] cursor-pointer transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Select Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e, (dataUrl) => {
                            addGalleryPhoto({
                              src: dataUrl,
                              title: newGalleryTitle || 'Cherished Memory',
                              caption: newGalleryCaption || 'A quiet, happy moment together.',
                              year: newGalleryYear || '2024',
                              rotation: 'rotate-1',
                            });
                            setNewGalleryTitle('');
                            setNewGalleryCaption('');
                          })
                        }
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-[#8C6D68] block mb-1">Handwritten Caption</label>
                  <input
                    type="text"
                    value={newGalleryCaption}
                    onChange={(e) => setNewGalleryCaption(e.target.value)}
                    placeholder="e.g. Smiling together through every season..."
                    className="w-full text-xs px-3 py-2 rounded-xl border border-[#EADBCE] bg-[#FAF5EE]"
                  />
                </div>
              </div>

              {/* Existing Gallery Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {gallery.map((photo) => (
                  <div
                    key={photo.id}
                    className="bg-white p-3 rounded-2xl border border-[#EADBCE] shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-[#FAF5EE] border border-[#EADBCE] mb-2">
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
                      </div>
                      <input
                        type="text"
                        value={photo.title}
                        onChange={(e) => updateGalleryPhoto(photo.id, { title: e.target.value })}
                        className="w-full text-xs font-bold font-serif text-[#3D2C29] border-b border-transparent focus:border-[#D63447] px-1 py-0.5 outline-hidden"
                      />
                      <input
                        type="text"
                        value={photo.caption}
                        onChange={(e) => updateGalleryPhoto(photo.id, { caption: e.target.value })}
                        className="w-full text-[11px] text-[#6B534E] border-b border-transparent focus:border-[#D63447] px-1 py-0.5 outline-hidden mt-0.5"
                      />
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#F2E7DC] flex items-center justify-between">
                      {/* Replace Photo File */}
                      <label className="text-[11px] text-[#D63447] hover:underline cursor-pointer flex items-center gap-1">
                        <Upload className="w-3 h-3" />
                        <span>Replace</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFileUpload(e, (dataUrl) => {
                              updateGalleryPhoto(photo.id, { src: dataUrl });
                            })
                          }
                        />
                      </label>

                      {gallery.length > 1 && (
                        <button
                          onClick={() => {
                            if (confirm('Delete this photo from gallery?')) {
                              deleteGalleryPhoto(photo.id);
                              showToast('Photo deleted');
                            }
                          }}
                          className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                          title="Delete photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ANNIVERSARY CARD PORTRAITS */}
          {activeTab === 'card' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-[#EADBCE] shadow-sm">
              {/* Main Portrait */}
              <div className="flex flex-col items-center text-center">
                <span className="font-serif font-bold text-base text-[#3D2C29] mb-1">
                  Card Primary Portrait
                </span>
                <p className="text-xs text-[#8C6D68] mb-3">
                  Featured prominently on the unfolded anniversary keepsake card
                </p>

                <div className="relative w-full max-w-xs aspect-4/3 rounded-2xl overflow-hidden border-2 border-[#EADBCE] shadow-md mb-3">
                  <img
                    src={sanitizeImageUrl(cardPhoto)}
                    alt="Card Main Portrait"
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
                </div>

                <div className="flex items-center gap-2 w-full max-w-xs">
                  <label className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-[#FFF5F5] text-[#D63447] border border-[#F4C2C2] hover:bg-[#FEEFEF] cursor-pointer transition-colors shadow-xs">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload New Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, (dataUrl) => {
                          setCardPhoto(dataUrl);
                        })
                      }
                    />
                  </label>

                  <select
                    className="text-xs px-2.5 py-2 rounded-xl border border-[#EADBCE] bg-[#FAF5EE] text-[#6B534E]"
                    onChange={(e) => {
                      if (e.target.value) {
                        setCardPhoto(e.target.value);
                        showToast('Card portrait updated!');
                      }
                    }}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      From Gallery
                    </option>
                    {gallery.map((g) => (
                      <option key={g.id} value={g.src}>
                        {g.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Festive Portrait Option */}
              <div className="flex flex-col items-center text-center">
                <span className="font-serif font-bold text-base text-[#3D2C29] mb-1">
                  Card Alternate / Festive Portrait
                </span>
                <p className="text-xs text-[#8C6D68] mb-3">
                  Option for the couple to switch to celebratory/ethnic attire on the card
                </p>

                <div className="relative w-full max-w-xs aspect-4/3 rounded-2xl overflow-hidden border-2 border-[#EADBCE] shadow-md mb-3">
                  <img
                    src={sanitizeImageUrl(cardFestivePhoto)}
                    alt="Card Festive Portrait"
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
                </div>

                <div className="flex items-center gap-2 w-full max-w-xs">
                  <label className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-[#FFF5F5] text-[#D63447] border border-[#F4C2C2] hover:bg-[#FEEFEF] cursor-pointer transition-colors shadow-xs">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload New Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, (dataUrl) => {
                          setCardFestivePhoto(dataUrl);
                        })
                      }
                    />
                  </label>

                  <select
                    className="text-xs px-2.5 py-2 rounded-xl border border-[#EADBCE] bg-[#FAF5EE] text-[#6B534E]"
                    onChange={(e) => {
                      if (e.target.value) {
                        setCardFestivePhoto(e.target.value);
                        showToast('Festive portrait updated!');
                      }
                    }}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      From Gallery
                    </option>
                    {gallery.map((g) => (
                      <option key={g.id} value={g.src}>
                        {g.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-[#EFE5DB] bg-[#FAF5EE]">
          <button
            onClick={() => {
              if (confirm('Reset all photos and milestones back to the initial set?')) {
                resetAllToDefaults();
                showToast('Reset to default photos!');
              }
            }}
            className="text-xs text-[#8C6D68] hover:text-[#D63447] transition-colors cursor-pointer"
          >
            Reset to Original Photos
          </button>

          <button
            onClick={() => {
              soundEngine.playTapSound();
              onClose();
            }}
            className="px-6 py-2 rounded-full text-xs font-semibold text-white bg-[#D63447] hover:bg-[#B82436] transition-colors shadow-sm cursor-pointer"
          >
            Done Editing ♡
          </button>
        </div>
      </div>
    </div>
  );
};
