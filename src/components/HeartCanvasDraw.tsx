import React, { useRef, useState, useEffect } from 'react';
import { Heart, Sparkles, RotateCcw, Download, Wand2 } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface HeartCanvasDrawProps {
  reducedMotion: boolean;
}

export const HeartCanvasDraw: React.FC<HeartCanvasDrawProps> = ({ reducedMotion }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#D63447');
  const [isAutoDrawing, setIsAutoDrawing] = useState(false);
  const [revealedMessage, setRevealedMessage] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; symbol: string }[]>([]);

  // Brush colors
  const colors = [
    { name: 'Cherry Red', hex: '#D63447' },
    { name: 'Dusty Rose', hex: '#E2959E' },
    { name: 'Muted Gold', hex: '#D4AF37' },
    { name: 'Warm Chocolate', hex: '#5E3E34' },
  ];

  // Set up canvas with high DPI scaling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Initial soft background wash
    ctx.fillStyle = '#FFFDF9';
    ctx.fillRect(0, 0, rect.width, rect.height);
  }, []);

  // Handle pointer particles trail
  const handlePointerMove = (e: React.PointerEvent) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (Math.random() < 0.25) {
      const symbols = ['♡', '♥', '✧', '✦', '❀'];
      const sym = symbols[Math.floor(Math.random() * symbols.length)];
      const newParticle = { id: Date.now() + Math.random(), x, y, symbol: sym };
      setParticles((prev) => [...prev.slice(-15), newParticle]);
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 1000);
    }

    if (isDrawing) {
      draw(x, y);
    }
  };

  const startDrawing = (e: React.PointerEvent) => {
    setIsDrawing(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = brushColor;
    ctx.shadowBlur = 4;
    ctx.shadowColor = brushColor + '40';

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    soundEngine.playTapSound();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = '#FFFDF9';
    ctx.fillRect(0, 0, rect.width, rect.height);
    setRevealedMessage(false);
  };

  // "Make a Heart for Them" procedural heart animation
  const handleMakeHeart = () => {
    if (isAutoDrawing) return;
    setIsAutoDrawing(true);
    soundEngine.playEnvelopeOpenSound();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();

    // Center coordinates
    const cx = rect.width / 2;
    const cy = rect.height / 2 - 10;
    const scale = Math.min(rect.width, rect.height) / 38;

    let t = 0;
    const step = 0.05;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#D63447';
    ctx.shadowBlur = 8;
    ctx.shadowColor = 'rgba(214, 52, 71, 0.4)';

    // Parametric heart formula:
    // x = 16 * sin^3(t)
    // y = -(13*cos(t) - 5*cos(2t) - 2*cos(3t) - cos(4t))
    const getHeartPoint = (theta: number) => {
      const x = 16 * Math.pow(Math.sin(theta), 3);
      const y = -(13 * Math.cos(theta) - 5 * Math.cos(2 * theta) - 2 * Math.cos(3 * theta) - Math.cos(4 * theta));
      return { x: cx + x * scale, y: cy + y * scale };
    };

    const firstPt = getHeartPoint(0);
    ctx.beginPath();
    ctx.moveTo(firstPt.x, firstPt.y);

    const animInterval = setInterval(() => {
      t += step;
      if (t >= Math.PI * 2) {
        clearInterval(animInterval);
        setIsAutoDrawing(false);
        setRevealedMessage(true);
        soundEngine.playSecretFoundSound();

        // Write inscription in center of canvas
        ctx.font = '28px "Caveat", cursive';
        ctx.fillStyle = '#503E3B';
        ctx.textAlign = 'center';
        ctx.fillText('Made with love, by Chinnu', cx, cy + 8);
      } else {
        const pt = getHeartPoint(t);
        ctx.lineTo(pt.x, pt.y);
        ctx.stroke();
      }
    }, 18);
  };

  const downloadDrawing = () => {
    soundEngine.playTapSound();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'kunja-chittapan-anniversary-doodle.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <section id="canvas" className="py-16 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0E6] text-[#8C6D68] text-xs font-medium border border-[#EADBCE] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Interactive Love Notes</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3D2C29] tracking-tight">
          Leave a little love wherever you go ♡
        </h2>
        <p className="text-sm sm:text-base text-[#6B534E] mt-2">
          Move your cursor and spread some love. Draw a heart, doodle a wish, or let Chinnu's pen draw one for you!
        </p>
      </div>

      {/* Canvas Container */}
      <div className="relative bg-[#FFFDF9] rounded-3xl border-2 border-[#EADBCE] shadow-lg overflow-hidden p-4 sm:p-6">
        {/* Floating cursor trails */}
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute pointer-events-none text-xs text-[#D63447] animate-ping z-20"
            style={{ left: p.x, top: p.y }}
          >
            {p.symbol}
          </span>
        ))}

        {/* Canvas Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#F2E7DC]">
          {/* Color Palette */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#8C6D68] font-medium mr-1">Ink:</span>
            {colors.map((c) => (
              <button
                key={c.hex}
                onClick={() => {
                  soundEngine.playTapSound();
                  setBrushColor(c.hex);
                }}
                className={`w-6 h-6 rounded-full transition-transform cursor-pointer ${
                  brushColor === c.hex ? 'scale-125 ring-2 ring-offset-2 ring-[#D63447]' : 'hover:scale-110'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleMakeHeart}
              disabled={isAutoDrawing}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#D63447] text-white hover:bg-[#B82436] transition-colors cursor-pointer shadow-xs disabled:opacity-50"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Make a Heart for Them</span>
            </button>

            <button
              onClick={clearCanvas}
              className="p-1.5 rounded-full hover:bg-[#FAF5EE] text-[#6B534E] border border-[#EADBCE] transition-colors cursor-pointer"
              title="Clear Canvas"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={downloadDrawing}
              className="p-1.5 rounded-full hover:bg-[#FAF5EE] text-[#6B534E] border border-[#EADBCE] transition-colors cursor-pointer"
              title="Save Doodle"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* HTML5 Interactive Canvas */}
        <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-[#F2E7DC] bg-[#FFFDF9] cursor-crosshair">
          <canvas
            ref={canvasRef}
            onPointerDown={startDrawing}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDrawing}
            onPointerLeave={stopDrawing}
            className="w-full h-full touch-none"
          />

          {/* Watermark instruction when canvas is clear */}
          {!revealedMessage && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40">
              <span className="font-handwriting text-2xl text-[#8C6D68]">
                Draw a heart with your finger or mouse... ♡
              </span>
            </div>
          )}
        </div>

        {/* Revealed emotional note after drawing */}
        {revealedMessage && (
          <div className="mt-4 p-4 rounded-2xl bg-[#FFF5F5] border border-[#F4C2C2] text-center animate-fadeIn">
            <p className="font-serif italic text-base sm:text-lg text-[#3D2C29]">
              “Every love story deserves to be celebrated. Especially yours.”
            </p>
            <span className="font-handwriting text-lg text-[#D63447] block mt-1">
              Made with love, by Chinnu ♡
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
