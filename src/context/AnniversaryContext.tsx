import React, { createContext, useContext, useState, useEffect } from 'react';
import { ANNIVERSARY_CONFIG, Milestone, GalleryPhoto } from '../data/anniversaryData';

export interface CharacterCustomization {
  chittapan: {
    outfit: 'striped' | 'kurta' | 'snowsuit' | 'tshirt';
    primaryColor: string;
    secondaryColor: string;
    hairStyle: 'neat' | 'sidepart' | 'short';
    hasGlasses: boolean;
    expression: 'smile' | 'laugh' | 'wink';
  };
  kunja: {
    outfit: 'festive' | 'navyfloral' | 'snowsuit' | 'casual';
    primaryColor: string;
    secondaryColor: string;
    hairStyle: 'bun' | 'swept' | 'open';
    hasBindi: boolean;
    hasGoldJewelry: boolean;
    expression: 'smile' | 'laugh' | 'wink';
  };
  referencePhotoSrc?: string;
}

export function sanitizeImageUrl(url?: string): string {
  if (!url) return '';
  // Data URLs or external links remain as-is
  if (url.startsWith('data:') || url.startsWith('blob:') || url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  // Strip leading /public/ or public/
  let clean = url;
  if (clean.startsWith('/public/')) {
    clean = clean.replace(/^\/public/, '');
  } else if (clean.startsWith('public/')) {
    clean = '/' + clean.replace(/^public\//, '');
  }
  // Convert /src/assets/images/ to /assets/images/
  if (clean.startsWith('/src/assets/images/')) {
    clean = clean.replace('/src/assets/images/', '/assets/images/');
  } else if (clean.startsWith('src/assets/images/')) {
    clean = '/' + clean.replace(/^src\//, '');
  }
  return clean;
}

export const DEFAULT_CHARACTER_CONFIG: CharacterCustomization = {
  chittapan: {
    outfit: 'striped',
    primaryColor: '#273C58',
    secondaryColor: '#F0F4F8',
    hairStyle: 'neat',
    hasGlasses: false,
    expression: 'smile',
  },
  kunja: {
    outfit: 'festive',
    primaryColor: '#8C2344',
    secondaryColor: '#F4C2C2',
    hairStyle: 'bun',
    hasBindi: true,
    hasGoldJewelry: true,
    expression: 'smile',
  },
  referencePhotoSrc: '/assets/images/regenerated_image_1792869904203.jpg',
};

interface AnniversaryContextType {
  milestones: Milestone[];
  gallery: GalleryPhoto[];
  cardPhoto: string;
  cardFestivePhoto: string;
  characters: CharacterCustomization;
  updateMilestone: (id: string, updates: Partial<Milestone>) => void;
  addMilestone: (milestone: Omit<Milestone, 'id'>) => void;
  deleteMilestone: (id: string) => void;
  updateGalleryPhoto: (id: string, updates: Partial<GalleryPhoto>) => void;
  addGalleryPhoto: (photo: Omit<GalleryPhoto, 'id'>) => void;
  deleteGalleryPhoto: (id: string) => void;
  setCardPhoto: (src: string) => void;
  setCardFestivePhoto: (src: string) => void;
  updateCharacters: (updates: Partial<CharacterCustomization>) => void;
  resetAllToDefaults: () => void;
}

const AnniversaryContext = createContext<AnniversaryContextType | undefined>(undefined);

const STORAGE_KEY_CONTENT = 'chinnu_anniversary_content_v3';
const STORAGE_KEY_CHARACTERS = 'chinnu_anniversary_characters_v3';

export const AnniversaryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const defaultMilestones = ANNIVERSARY_CONFIG.milestones.map((m) => ({
    ...m,
    image: sanitizeImageUrl(m.image),
  }));

  const defaultGallery: GalleryPhoto[] = [
    {
      id: 'g-gateway',
      src: '/assets/images/regenerated_image_1792869904203.jpg',
      title: 'Gateway of India Smiles',
      caption: 'Standing together in front of historic arches, making every destination special.',
      year: '2023',
      rotation: 'rotate-0',
    },
    ...ANNIVERSARY_CONFIG.gallery.map((g) => ({
      ...g,
      src: sanitizeImageUrl(g.src),
    })),
  ];

  const [milestones, setMilestones] = useState<Milestone[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONTENT + '_milestones');
      if (saved) {
        const parsed: Milestone[] = JSON.parse(saved);
        return parsed.map((m) => ({ ...m, image: sanitizeImageUrl(m.image) }));
      }
    } catch {
      // ignore
    }
    return defaultMilestones;
  });

  const [gallery, setGallery] = useState<GalleryPhoto[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONTENT + '_gallery');
      if (saved) {
        const parsed: GalleryPhoto[] = JSON.parse(saved);
        return parsed.map((g) => ({ ...g, src: sanitizeImageUrl(g.src) }));
      }
    } catch {
      // ignore
    }
    return defaultGallery;
  });

  const [cardPhoto, setCardPhoto] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONTENT + '_cardPhoto');
      if (saved) return sanitizeImageUrl(saved);
    } catch {
      // ignore
    }
    return sanitizeImageUrl(ANNIVERSARY_CONFIG.featuredPhoto);
  });

  const [cardFestivePhoto, setCardFestivePhoto] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONTENT + '_cardFestivePhoto');
      if (saved) return sanitizeImageUrl(saved);
    } catch {
      // ignore
    }
    return '/assets/images/regenerated_image_1792869904203.jpg';
  });

  const [characters, setCharacters] = useState<CharacterCustomization>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CHARACTERS);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          referencePhotoSrc: sanitizeImageUrl(parsed.referencePhotoSrc),
        };
      }
    } catch {
      // ignore
    }
    return DEFAULT_CHARACTER_CONFIG;
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CONTENT + '_milestones', JSON.stringify(milestones));
    } catch (e) {
      console.warn('localStorage save failed', e);
    }
  }, [milestones]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CONTENT + '_gallery', JSON.stringify(gallery));
    } catch (e) {
      console.warn('localStorage save failed', e);
    }
  }, [gallery]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CONTENT + '_cardPhoto', cardPhoto);
      localStorage.setItem(STORAGE_KEY_CONTENT + '_cardFestivePhoto', cardFestivePhoto);
    } catch (e) {
      console.warn('localStorage save failed', e);
    }
  }, [cardPhoto, cardFestivePhoto]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CHARACTERS, JSON.stringify(characters));
    } catch (e) {
      console.warn('localStorage save failed', e);
    }
  }, [characters]);

  const updateMilestone = (id: string, updates: Partial<Milestone>) => {
    setMilestones((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              ...updates,
              image: updates.image ? sanitizeImageUrl(updates.image) : m.image,
            }
          : m
      )
    );
  };

  const addMilestone = (milestone: Omit<Milestone, 'id'>) => {
    const newId = `m-custom-${Date.now()}`;
    setMilestones((prev) => [
      ...prev,
      {
        ...milestone,
        id: newId,
        image: sanitizeImageUrl(milestone.image),
      },
    ]);
  };

  const deleteMilestone = (id: string) => {
    setMilestones((prev) => prev.filter((m) => m.id !== id));
  };

  const updateGalleryPhoto = (id: string, updates: Partial<GalleryPhoto>) => {
    setGallery((prev) =>
      prev.map((g) =>
        g.id === id
          ? {
              ...g,
              ...updates,
              src: updates.src ? sanitizeImageUrl(updates.src) : g.src,
            }
          : g
      )
    );
  };

  const addGalleryPhoto = (photo: Omit<GalleryPhoto, 'id'>) => {
    const newId = `g-custom-${Date.now()}`;
    setGallery((prev) => [
      {
        ...photo,
        id: newId,
        src: sanitizeImageUrl(photo.src),
      },
      ...prev,
    ]);
  };

  const deleteGalleryPhoto = (id: string) => {
    setGallery((prev) => prev.filter((g) => g.id !== id));
  };

  const updateCharacters = (updates: Partial<CharacterCustomization>) => {
    setCharacters((prev) => ({
      ...prev,
      ...updates,
      referencePhotoSrc: updates.referencePhotoSrc
        ? sanitizeImageUrl(updates.referencePhotoSrc)
        : prev.referencePhotoSrc,
      chittapan: { ...prev.chittapan, ...(updates.chittapan || {}) },
      kunja: { ...prev.kunja, ...(updates.kunja || {}) },
    }));
  };

  const resetAllToDefaults = () => {
    setMilestones(defaultMilestones);
    setGallery(defaultGallery);
    setCardPhoto(sanitizeImageUrl(ANNIVERSARY_CONFIG.featuredPhoto));
    setCardFestivePhoto('/assets/images/regenerated_image_1792869904203.jpg');
    setCharacters(DEFAULT_CHARACTER_CONFIG);
    try {
      localStorage.removeItem(STORAGE_KEY_CONTENT + '_milestones');
      localStorage.removeItem(STORAGE_KEY_CONTENT + '_gallery');
      localStorage.removeItem(STORAGE_KEY_CONTENT + '_cardPhoto');
      localStorage.removeItem(STORAGE_KEY_CONTENT + '_cardFestivePhoto');
      localStorage.removeItem(STORAGE_KEY_CHARACTERS);
    } catch {
      // ignore
    }
  };

  return (
    <AnniversaryContext.Provider
      value={{
        milestones,
        gallery,
        cardPhoto,
        cardFestivePhoto,
        characters,
        updateMilestone,
        addMilestone,
        deleteMilestone,
        updateGalleryPhoto,
        addGalleryPhoto,
        deleteGalleryPhoto,
        setCardPhoto,
        setCardFestivePhoto,
        updateCharacters,
        resetAllToDefaults,
      }}
    >
      {children}
    </AnniversaryContext.Provider>
  );
};

export const useAnniversary = () => {
  const context = useContext(AnniversaryContext);
  if (!context) {
    throw new Error('useAnniversary must be used within an AnniversaryProvider');
  }
  return context;
};
