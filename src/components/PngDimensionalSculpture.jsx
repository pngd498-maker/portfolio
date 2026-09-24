import React, { useRef, useEffect, useState } from 'react';

/**
 * PngDimensionalSculpture
 * Premium physical typographic sculpture rendering "PNG" via 2D Canvas.
 * Simulates depth through stacked extrusion layers, bevel shading,
 * and cursor-reactive specular lighting sweeps without CSS 3D transforms.
 */
export default function PngDimensionalSculpture({
  width = 540,
  height = 140,
  style = {}
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const mouseRef = useRef({ x: window.innerWidth * 0.4, y: window.innerHeight * 0.4 });
  const smoothedLight = useRef({ x: 0.5, y: 0.5 });
  const offsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Subtle initial reveal under 0.8s
    const timer = setTimeout(() => setRevealed(true), 100);

    const handlePointerMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    let animId;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    const render = () => {
      animId = requestAnimationFrame(render);

      const rect = canvas.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Cursor position normalized to wordmark center
      const targetNormX = (mouseRef.current.x - centerX) / (window.innerWidth * 0.5);
      const targetNormY = (mouseRef.current.y - centerY) / (window.innerHeight * 0.5);

      // Smooth light movement
      smoothedLight.current.x += (targetNormX - smoothedLight.current.x) * 0.08;
      smoothedLight.current.y += (targetNormY - smoothedLight.current.y) * 0.08;

      const lx = smoothedLight.current.x;
      const ly = smoothedLight.current.y;

      // Subtle 2D offset (clamped max 5px) - NO 3D rotation
      offsetRef.current.x = Math.max(-5, Math.min(5, lx * 5));
      offsetRef.current.y = Math.max(-4, Math.min(4, ly * 4));

      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      const text = 'PNG';
      const fontSize = Math.min(width * 0.28, 118);
      ctx.font = `900 ${fontSize}px "Syne", sans-serif`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';

      const posX = 10 + offsetRef.current.x;
      const posY = height * 0.52 + offsetRef.current.y;

      // 1. Ambient Deep Drop Shadow (shifts opposite to light)
      ctx.save();
      ctx.fillStyle = 'rgba(10, 2, 4, 0.55)';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
      ctx.shadowBlur = 18;
      ctx.shadowOffsetX = -lx * 8;
      ctx.shadowOffsetY = -ly * 6 + 6;
      ctx.fillText(text, posX, posY);
      ctx.restore();

      // 2. Multi-layer subtle extrusion (6 micro-layers for tactile bevel depth)
      const numExtrusions = 6;
      for (let i = numExtrusions; i >= 1; i--) {
        const layerX = posX - (lx * i * 0.8);
        const layerY = posY - (ly * i * 0.6) + (i * 0.8);

        // Gradient for extrusion side walls (burnished steel to deep bronze)
        const sideGrad = ctx.createLinearGradient(0, posY - fontSize * 0.5, 0, posY + fontSize * 0.5);
        const shade = Math.round(30 + (i / numExtrusions) * 45);
        sideGrad.addColorStop(0, `rgb(${shade + 25}, ${shade + 10}, ${shade + 12})`);
        sideGrad.addColorStop(1, `rgb(${shade - 10}, ${shade - 15}, ${shade - 12})`);

        ctx.fillStyle = sideGrad;
        ctx.fillText(text, layerX, layerY);
      }

      // 3. Main Specular Face: Platinum/Titanium finish with dynamic cursor-guided specular hotspot
      const lightSweepX = width * (0.5 + lx * 0.45);
      const faceGrad = ctx.createRadialGradient(
        lightSweepX, posY - 20, 10,
        lightSweepX, posY, width * 0.6
      );
      faceGrad.addColorStop(0, '#ffffff'); // Intense specular shine
      faceGrad.addColorStop(0.35, '#f5e8e8'); // Warm metallic glow
      faceGrad.addColorStop(0.7, '#d6d2d2'); // Brushed platinum
      faceGrad.addColorStop(1, '#9e9696'); // Beveled shadow edge

      ctx.fillStyle = faceGrad;
      ctx.fillText(text, posX, posY);

      // 4. Fine Metallic Rim Highlight (crisp 1px bevel line)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 1.2;
      ctx.strokeText(text, posX, posY);

      ctx.restore();
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [width, height]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: `${width}px`,
        maxWidth: '100%',
        height: `${height}px`,
        opacity: revealed ? 1 : 0,
        transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        userSelect: 'none',
        pointerEvents: 'none',
        transform: 'none',
        perspective: 'none',
        ...style
      }}
      aria-label="PNG Dimensional Typographic Sculpture"
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />
    </div>
  );
}
