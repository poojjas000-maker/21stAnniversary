import React, { useState } from 'react';
import { Heart, Sparkles, Smile, Footprints, Trees, Moon, Wand2 } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { useAnniversary, CharacterCustomization } from '../context/AnniversaryContext';

export type CharacterScene = 'meeting' | 'walking' | 'tree' | 'holdingHands' | 'hug' | 'bench';

interface CoupleCharactersProps {
  initialScene?: CharacterScene;
  allowSceneSwitch?: boolean;
  onOpenCreator?: () => void;
}

export const CoupleCharacters: React.FC<CoupleCharactersProps> = ({
  initialScene = 'holdingHands',
  allowSceneSwitch = true,
  onOpenCreator,
}) => {
  const { characters } = useAnniversary();
  const [currentScene, setCurrentScene] = useState<CharacterScene>(initialScene);
  const [extraHearts, setExtraHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  const triggerHeartBurst = (e: React.MouseEvent) => {
    soundEngine.playTapSound();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newHeart = { id: Date.now(), x, y };
    setExtraHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setExtraHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1200);
  };

  const handleSceneChange = (scene: CharacterScene) => {
    soundEngine.playTapSound();
    setCurrentScene(scene);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Interactive 2D Stage */}
      <div
        onClick={triggerHeartBurst}
        className="relative w-full max-w-xl h-80 sm:h-92 bg-gradient-to-b from-[#FFFDF9] via-[#FAF3EC] to-[#F3E6DA] rounded-3xl border-2 border-[#EADBCE] shadow-md hover:shadow-xl transition-all overflow-hidden cursor-pointer select-none flex flex-col items-center justify-end"
      >
        {/* Night Backdrop for Bench Scene */}
        {currentScene === 'bench' && (
          <div className="absolute inset-0 bg-gradient-to-b from-[#1C1324] via-[#2D1B36] to-[#45284B] transition-colors duration-700">
            {/* Stars */}
            {[...Array(20)].map((_, i) => (
              <span
                key={i}
                className="absolute text-yellow-100 text-xs animate-pulse"
                style={{
                  top: `${10 + (i * 19) % 65}%`,
                  left: `${6 + (i * 21) % 88}%`,
                  animationDuration: `${1.4 + (i % 4) * 0.4}s`,
                }}
              >
                ✦
              </span>
            ))}
            {/* Soft Glowing Moon */}
            <div className="absolute top-6 right-10 w-12 h-12 rounded-full bg-[#FFF2D4] shadow-[0_0_25px_#FFE4A0] flex items-center justify-center opacity-95">
              <span className="text-sm text-[#D63447]">♡</span>
            </div>
          </div>
        )}

        {/* Tree Canopy for Tree Scene */}
        {currentScene === 'tree' && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <svg className="absolute -top-10 inset-x-0 w-full h-full" viewBox="0 0 600 380">
              {/* Trunk */}
              <path
                d="M 285 380 Q 280 240 250 170 Q 235 130 215 100 M 315 380 Q 320 240 350 170 Q 365 130 385 100"
                stroke="#6B442A"
                strokeWidth="20"
                fill="none"
                strokeLinecap="round"
              />
              {/* Heart Tree Canopy */}
              <path
                d="M 300 130 C 300 65 190 40 190 115 C 190 175 300 235 300 235 C 300 235 410 175 410 115 C 410 40 300 65 300 130 Z"
                fill="#E2959E"
                opacity="0.45"
              />
              <path
                d="M 300 120 C 300 75 210 55 210 115 C 210 160 300 210 300 210 C 300 210 390 160 390 115 C 390 55 300 75 300 120 Z"
                fill="#F4C2C2"
                opacity="0.6"
              />
              {/* Little dangling fairy lights */}
              <circle cx="260" cy="180" r="4" fill="#FFEAA7" className="animate-pulse" />
              <circle cx="340" cy="180" r="4" fill="#FFEAA7" className="animate-pulse" />
              <circle cx="300" cy="155" r="5" fill="#FFEAA7" className="animate-pulse" />
            </svg>
          </div>
        )}

        {/* Soft Grassy Floor or Bench */}
        <div
          className={`absolute bottom-0 inset-x-0 h-16 ${
            currentScene === 'bench' ? 'bg-[#26172A]' : 'bg-[#EBDDCF]/80'
          } border-t border-[#DECBBF]`}
        />

        {/* Wooden Park Bench for sitting scenes */}
        {(currentScene === 'bench' || currentScene === 'tree') && (
          <div className="absolute bottom-10 w-72 h-10 bg-[#8C5E47] rounded-sm shadow-md flex items-center justify-between px-6 z-10 border-t-2 border-[#A87A63]">
            <div className="w-3 h-10 bg-[#593928] absolute -bottom-8 left-5 rounded-b" />
            <div className="w-3 h-10 bg-[#593928] absolute -bottom-8 right-5 rounded-b" />
            <div className="w-full h-1 bg-[#6F4936] my-auto rounded" />
          </div>
        )}

        {/* The Couple Artwork Container */}
        <div className="relative z-20 flex items-end justify-center gap-1 sm:gap-4 pb-4">
          {/* Chittapan Storybook Character */}
          <div
            className={`flex flex-col items-center transition-all duration-500 ${
              currentScene === 'walking' ? 'animate-bounce' : ''
            } ${currentScene === 'hug' ? 'translate-x-6 z-20' : ''}`}
            style={{ animationDuration: '0.8s' }}
          >
            <ChittapanFigure
              scene={currentScene}
              config={characters.chittapan}
            />
            <span className="text-[11px] font-sans font-medium text-[#7A615C] mt-1 bg-[#FAF3EC]/95 px-2.5 py-0.5 rounded-full border border-[#E8D9CD] shadow-xs">
              Chittapan
            </span>
          </div>

          {/* Central Heart Reaction */}
          <div className="flex flex-col items-center justify-center -mb-2 pb-14 z-20">
            {currentScene === 'hug' ? (
              <div className="relative animate-bounce">
                <Heart className="w-9 h-9 text-[#D63447] fill-[#D63447]" />
                <span className="absolute -top-3 -right-2 text-xs text-[#D4AF37]">✨</span>
              </div>
            ) : currentScene === 'holdingHands' ? (
              <div className="flex flex-col items-center">
                <Heart className="w-7 h-7 text-[#D63447] fill-[#D63447] animate-pulse" />
                <span className="text-xs text-[#8C6D68] font-handwriting">best friends</span>
              </div>
            ) : currentScene === 'meeting' ? (
              <Sparkles className="w-7 h-7 text-[#D4AF37] animate-spin" style={{ animationDuration: '6s' }} />
            ) : (
              <Heart className="w-6 h-6 text-[#E2959E] fill-[#E2959E] animate-pulse" />
            )}
          </div>

          {/* Kunja Storybook Character */}
          <div
            className={`flex flex-col items-center transition-all duration-500 ${
              currentScene === 'walking' ? 'animate-bounce' : ''
            } ${currentScene === 'hug' ? '-translate-x-6 z-10' : ''}`}
            style={{ animationDuration: '0.8s', animationDelay: '0.2s' }}
          >
            <KunjaFigure
              scene={currentScene}
              config={characters.kunja}
            />
            <span className="text-[11px] font-sans font-medium text-[#7A615C] mt-1 bg-[#FAF3EC]/95 px-2.5 py-0.5 rounded-full border border-[#E8D9CD] shadow-xs">
              Kunja
            </span>
          </div>
        </div>

        {/* Dynamic Heart Tap Bursts */}
        {extraHearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute pointer-events-none animate-ping text-[#D63447] text-lg font-bold"
            style={{ left: heart.x, top: heart.y }}
          >
            ♥
          </div>
        ))}

        {/* Top Hint Bar */}
        <div className="absolute top-3 inset-x-4 flex items-center justify-between text-[11px] text-[#8C6D68]">
          <span className="font-handwriting text-sm flex items-center gap-1 opacity-80">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            Tap anywhere to shower them with love
          </span>

          {onOpenCreator && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                soundEngine.playTapSound();
                onOpenCreator();
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 hover:bg-white text-[#D63447] font-medium border border-[#F4C2C2] shadow-xs transition-colors cursor-pointer"
            >
              <Wand2 className="w-3 h-3" />
              <span>Customize Characters</span>
            </button>
          )}
        </div>
      </div>

      {/* Interactive Scene Switcher */}
      {allowSceneSwitch && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 max-w-xl">
          {[
            { id: 'holdingHands', label: 'Holding Hands', icon: Heart },
            { id: 'hug', label: 'Warm Hug', icon: Smile },
            { id: 'walking', label: 'Walking Together', icon: Footprints },
            { id: 'tree', label: 'Under Heart Tree', icon: Trees },
            { id: 'bench', label: 'Stargazing on Bench', icon: Moon },
            { id: 'meeting', label: 'Waving Hello', icon: Sparkles },
          ].map((scene) => {
            const Icon = scene.icon;
            const isSelected = currentScene === scene.id;
            return (
              <button
                key={scene.id}
                onClick={() => handleSceneChange(scene.id as CharacterScene)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#D63447] text-white shadow-sm scale-105'
                    : 'bg-white text-[#6B534E] hover:bg-[#FAF5EE] border border-[#E6D7CB]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{scene.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

/* --- Chittapan Character Vector Component --- */
export const ChittapanFigure: React.FC<{
  scene: CharacterScene;
  config: CharacterCustomization['chittapan'];
  scale?: number;
}> = ({ scene, config, scale = 1 }) => {
  return (
    <svg
      width={94 * scale}
      height={158 * scale}
      viewBox="0 0 94 158"
      className="overflow-visible drop-shadow-sm"
    >
      {/* Soft Ground Shadow */}
      <ellipse cx="47" cy="154" rx="28" ry="4.5" fill="#3D2C29" opacity="0.15" />

      {/* Chittapan Torso / Clothes */}
      {config.outfit === 'striped' ? (
        // Cozy Striped Navy/Cream Polo
        <g>
          <path
            d="M 22 62 C 22 56 32 54 47 54 C 62 54 72 56 72 62 L 75 110 C 75 113 70 115 47 115 C 24 115 19 113 19 110 Z"
            fill={config.primaryColor}
          />
          {/* Collar */}
          <path d="M 37 54 L 47 68 L 57 54" stroke={config.secondaryColor} strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Stripes */}
          <path d="M 21 72 Q 47 75 73 72" stroke={config.secondaryColor} strokeWidth="3.5" fill="none" />
          <path d="M 20 84 Q 47 87 74 84" stroke={config.secondaryColor} strokeWidth="3.5" fill="none" />
          <path d="M 19 96 Q 47 99 75 96" stroke={config.secondaryColor} strokeWidth="3.5" fill="none" />
        </g>
      ) : config.outfit === 'kurta' ? (
        // Elegant Festive Silk Kurta
        <g>
          <path
            d="M 22 60 C 22 54 32 52 47 52 C 62 52 72 54 72 60 L 76 122 C 76 125 68 127 47 127 C 26 127 18 125 18 122 Z"
            fill={config.primaryColor}
          />
          {/* Kurta Placket & Gold Buttons */}
          <line x1="47" y1="52" x2="47" y2="88" stroke="#D4AF37" strokeWidth="2" strokeDasharray="3,3" />
          <circle cx="47" cy="62" r="1.5" fill="#D4AF37" />
          <circle cx="47" cy="72" r="1.5" fill="#D4AF37" />
          <circle cx="47" cy="82" r="1.5" fill="#D4AF37" />
        </g>
      ) : config.outfit === 'snowsuit' ? (
        // Mountain Snowsuit Jacket
        <g>
          <path
            d="M 18 60 C 18 52 30 50 47 50 C 64 50 76 52 76 60 L 78 114 C 78 116 70 118 47 118 C 24 118 16 116 16 114 Z"
            fill="#EFEAE1"
            stroke="#D6C6B6"
            strokeWidth="1.5"
          />
          <path d="M 20 78 L 74 78" stroke="#D63447" strokeWidth="5" />
          <path d="M 20 84 L 74 84" stroke="#F4A261" strokeWidth="3" />
        </g>
      ) : (
        // Casual Comfortable Tee
        <path
          d="M 22 60 C 22 54 32 52 47 52 C 62 52 72 54 72 60 L 74 112 C 74 114 68 116 47 116 C 26 116 20 114 20 112 Z"
          fill={config.primaryColor}
        />
      )}

      {/* Pants & Shoes */}
      <path d="M 29 110 L 29 146" stroke="#4A5568" strokeWidth="9" strokeLinecap="round" />
      <path d="M 65 110 L 65 146" stroke="#4A5568" strokeWidth="9" strokeLinecap="round" />
      {/* Comfy Shoes */}
      <ellipse cx="27" cy="148" rx="8" ry="4" fill="#2C2321" />
      <ellipse cx="67" cy="148" rx="8" ry="4" fill="#2C2321" />

      {/* Chittapan Head & Neck */}
      <path d="M 41 50 L 41 58 L 53 58 L 53 50 Z" fill="#F0CAA7" />
      {/* Head */}
      <circle cx="47" cy="36" r="19" fill="#F5CFAB" />
      {/* Ears with soft shading */}
      <circle cx="27" cy="38" r="4.5" fill="#E6BA93" />
      <circle cx="67" cy="38" r="4.5" fill="#E6BA93" />

      {/* Soft Rosy Cheeks */}
      <ellipse cx="36" cy="42" rx="4" ry="2.5" fill="#E8927C" opacity="0.45" />
      <ellipse cx="58" cy="42" rx="4" ry="2.5" fill="#E8927C" opacity="0.45" />

      {/* Hair (Neat with soft stylish wave) */}
      <path
        d="M 26 35 C 26 18 47 14 68 24 C 69 16 56 12 44 12 C 30 12 24 20 26 35 Z"
        fill="#261C19"
      />
      <path
        d="M 26 28 C 34 22 58 20 68 28 C 62 23 44 21 26 28 Z"
        fill="#3D2D29"
      />

      {/* Eyebrows */}
      <path d="M 35 30 Q 40 28 44 30" stroke="#261C19" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 50 30 Q 54 28 59 30" stroke="#261C19" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Eyes with warm happy crinkle */}
      {config.expression === 'wink' ? (
        <>
          <path d="M 36 36 Q 40 40 44 36" stroke="#261C19" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <ellipse cx="54" cy="35" rx="2.5" ry="3" fill="#261C19" />
          <circle cx="55" cy="34" r="1" fill="#FFFFFF" />
        </>
      ) : (
        <>
          <ellipse cx="40" cy="35" rx="2.5" ry="3" fill="#261C19" />
          <circle cx="41" cy="34" r="1" fill="#FFFFFF" />
          <ellipse cx="54" cy="35" rx="2.5" ry="3" fill="#261C19" />
          <circle cx="55" cy="34" r="1" fill="#FFFFFF" />
        </>
      )}

      {/* Optional Eyeglasses */}
      {config.hasGlasses && (
        <g stroke="#3D2C29" strokeWidth="1.5" fill="none">
          <rect x="34" y="30" width="12" height="10" rx="3" />
          <rect x="48" y="30" width="12" height="10" rx="3" />
          <line x1="46" y1="35" x2="48" y2="35" />
        </g>
      )}

      {/* Warm Friendly Smile */}
      <path
        d="M 40 44 Q 47 51 54 44"
        stroke="#7A3928"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Arms based on scene */}
      {scene === 'meeting' ? (
        // Waving Hand
        <>
          <path d="M 23 66 Q 12 78 16 98" stroke={config.primaryColor} strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M 71 66 Q 84 50 80 28" stroke={config.primaryColor} strokeWidth="8" fill="none" strokeLinecap="round" />
          <circle cx="80" cy="24" r="5" fill="#F5CFAB" />
        </>
      ) : scene === 'hug' ? (
        // Hugging Kunja
        <path d="M 23 66 Q 50 82 76 82" stroke={config.primaryColor} strokeWidth="8" fill="none" strokeLinecap="round" />
      ) : (
        // Natural resting / reaching to hold hands
        <>
          <path d="M 23 66 Q 14 84 16 100" stroke={config.primaryColor} strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M 71 66 Q 78 84 84 98" stroke={config.primaryColor} strokeWidth="8" fill="none" strokeLinecap="round" />
          <circle cx="84" cy="98" r="5" fill="#F5CFAB" />
        </>
      )}
    </svg>
  );
};

/* --- Kunja Character Vector Component --- */
export const KunjaFigure: React.FC<{
  scene: CharacterScene;
  config: CharacterCustomization['kunja'];
  scale?: number;
}> = ({ scene, config, scale = 1 }) => {
  return (
    <svg
      width={94 * scale}
      height={154 * scale}
      viewBox="0 0 94 154"
      className="overflow-visible drop-shadow-sm"
    >
      {/* Soft Ground Shadow */}
      <ellipse cx="47" cy="150" rx="26" ry="4.5" fill="#3D2C29" opacity="0.15" />

      {/* Kunja Torso / Attire */}
      {config.outfit === 'festive' ? (
        // Festive Berry Embroidered Kurti & Dupatta
        <g>
          <path
            d="M 26 58 C 26 52 35 50 47 50 C 59 50 68 52 68 58 L 74 116 C 74 119 64 122 47 122 C 30 122 20 119 20 116 Z"
            fill={config.primaryColor}
          />
          {/* Gold Neckline & Embroidery */}
          <path d="M 40 50 Q 47 62 54 50" stroke="#D4AF37" strokeWidth="2.5" fill="none" />
          <path d="M 47 58 L 47 98" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3,3" />
          {/* Subtle Kurti Motifs */}
          <circle cx="47" cy="72" r="2" fill={config.secondaryColor} />
          <circle cx="47" cy="86" r="2" fill={config.secondaryColor} />
          {/* Elegant Dupatta Drape */}
          <path d="M 26 58 Q 20 85 24 118" stroke={config.secondaryColor} strokeWidth="5" fill="none" opacity="0.8" />
        </g>
      ) : config.outfit === 'navyfloral' ? (
        // Navy Floral Print Tunic
        <g>
          <path
            d="M 26 58 C 26 52 35 50 47 50 C 59 50 68 52 68 58 L 72 114 C 72 116 64 118 47 118 C 30 118 22 116 22 114 Z"
            fill={config.primaryColor}
          />
          <path d="M 40 50 Q 47 60 54 50" stroke="#F0CAA7" strokeWidth="2" fill="none" />
          {/* Floral leaf stamps */}
          <path d="M 36 74 Q 40 70 44 74" stroke="#FFF" strokeWidth="1.8" fill="none" opacity="0.7" />
          <path d="M 50 86 Q 54 82 58 86" stroke="#FFF" strokeWidth="1.8" fill="none" opacity="0.7" />
          <path d="M 38 98 Q 42 94 46 98" stroke="#FFF" strokeWidth="1.8" fill="none" opacity="0.7" />
        </g>
      ) : config.outfit === 'snowsuit' ? (
        // Cozy Winter Mountain Suit
        <g>
          <path
            d="M 24 58 C 24 50 34 48 47 48 C 60 48 70 50 70 58 L 72 116 C 72 118 64 120 47 120 C 30 120 22 118 22 116 Z"
            fill="#EAD5D7"
          />
          <path d="M 24 74 L 70 74" stroke="#D63447" strokeWidth="4" />
        </g>
      ) : (
        // Casual Chic Top
        <path
          d="M 26 58 C 26 52 35 50 47 50 C 59 50 68 52 68 58 L 72 114 C 72 116 64 118 47 118 C 30 118 22 116 22 114 Z"
          fill={config.primaryColor}
        />
      )}

      {/* Pajama/Leggings & Delicate Sandals */}
      <path d="M 33 114 L 33 144" stroke="#FAF0EB" strokeWidth="8" strokeLinecap="round" />
      <path d="M 61 114 L 61 144" stroke="#FAF0EB" strokeWidth="8" strokeLinecap="round" />
      {/* Sandals */}
      <ellipse cx="31" cy="146" rx="7" ry="3.5" fill="#6B4B3E" />
      <ellipse cx="63" cy="146" rx="7" ry="3.5" fill="#6B4B3E" />

      {/* Kunja Hair Bun at Back */}
      <circle cx="47" cy="26" r="21" fill="#1A1211" />
      {/* Flower in hair */}
      <circle cx="64" cy="22" r="4.5" fill="#F4C2C2" />
      <circle cx="64" cy="22" r="2" fill="#D63447" />

      {/* Neck */}
      <path d="M 42 48 L 42 56 L 52 56 L 52 48 Z" fill="#F7D3BA" />
      {/* Head */}
      <circle cx="47" cy="36" r="18" fill="#F9D7BE" />

      {/* Hair Waves Front & Soft Parting */}
      <path
        d="M 28 32 C 34 18 60 18 66 32 C 60 25 44 24 28 32 Z"
        fill="#1A1211"
      />

      {/* Delicate Gold Earrings */}
      {config.hasGoldJewelry && (
        <>
          <circle cx="28" cy="38" r="2.5" fill="#D4AF37" />
          <circle cx="66" cy="38" r="2.5" fill="#D4AF37" />
        </>
      )}

      {/* Sweet Red Bindi */}
      {config.hasBindi && (
        <circle cx="47" cy="30" r="1.6" fill="#D63447" />
      )}

      {/* Rosy Cheeks */}
      <ellipse cx="36" cy="42" rx="4" ry="2.5" fill="#E8927C" opacity="0.5" />
      <ellipse cx="58" cy="42" rx="4" ry="2.5" fill="#E8927C" opacity="0.5" />

      {/* Gold Necklace */}
      {config.hasGoldJewelry && (
        <path d="M 38 52 Q 47 60 56 52" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
      )}

      {/* Eyebrows */}
      <path d="M 35 29 Q 40 27 44 29" stroke="#1A1211" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M 50 29 Q 54 27 59 29" stroke="#1A1211" strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* Eyes with gentle radiance */}
      {config.expression === 'wink' ? (
        <>
          <ellipse cx="40" cy="35" rx="2.4" ry="3" fill="#1A1211" />
          <circle cx="41" cy="34" r="1" fill="#FFFFFF" />
          <path d="M 50 36 Q 54 40 58 36" stroke="#1A1211" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <ellipse cx="40" cy="35" rx="2.4" ry="3" fill="#1A1211" />
          <circle cx="41" cy="34" r="1" fill="#FFFFFF" />
          <ellipse cx="54" cy="35" rx="2.4" ry="3" fill="#1A1211" />
          <circle cx="55" cy="34" r="1" fill="#FFFFFF" />
        </>
      )}

      {/* Bright Sweet Smile */}
      <path
        d="M 40 44 Q 47 51 54 44"
        stroke="#8C2344"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Arms based on scene */}
      {scene === 'meeting' ? (
        // Waving
        <>
          <path d="M 25 64 Q 14 50 16 30" stroke={config.primaryColor} strokeWidth="7" fill="none" strokeLinecap="round" />
          <circle cx="16" cy="27" r="4.5" fill="#F9D7BE" />
          <path d="M 69 64 Q 76 80 74 98" stroke={config.primaryColor} strokeWidth="7" fill="none" strokeLinecap="round" />
        </>
      ) : scene === 'hug' ? (
        // Hugging Chittapan
        <path d="M 69 64 Q 45 78 20 78" stroke={config.primaryColor} strokeWidth="7" fill="none" strokeLinecap="round" />
      ) : (
        // Reaching to hold hands
        <>
          <path d="M 25 64 Q 18 82 12 96" stroke={config.primaryColor} strokeWidth="7" fill="none" strokeLinecap="round" />
          <circle cx="12" cy="96" r="4.5" fill="#F9D7BE" />
          <path d="M 69 64 Q 76 82 74 98" stroke={config.primaryColor} strokeWidth="7" fill="none" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
};
