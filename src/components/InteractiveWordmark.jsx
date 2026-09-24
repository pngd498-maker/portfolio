import React, { useRef, useState, useEffect } from 'react';

/**
 * InteractiveWordmark
 * Clean, premium dimensional SVG wordmark for PNG identity.
 * Zero CSS blur filter artifacts, zero white boxes.
 */
export default function InteractiveWordmark({
  size = 'large', // 'small', 'medium', 'large', 'giant'
  className = '',
  style = {}
}) {
  const containerRef = useRef(null);
  const [lightOffset, setLightOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = (e.clientX - cx) / (window.innerWidth * 0.5);
      const dy = (e.clientY - cy) / (window.innerHeight * 0.5);

      setLightOffset({
        x: Math.max(-4, Math.min(4, dx * 4)),
        y: Math.max(-3, Math.min(3, dy * 3))
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  const config = {
    small: { w: 110, h: 36, fontSize: 32, letterSpacing: '4px' },
    medium: { w: 180, h: 56, fontSize: 50, letterSpacing: '6px' },
    large: { w: 320, h: 96, fontSize: 88, letterSpacing: '10px' },
    giant: { w: 580, h: 170, fontSize: 160, letterSpacing: '18px' }
  }[size] || { w: 320, h: 96, fontSize: 88, letterSpacing: '10px' };

  return (
    <div
      ref={containerRef}
      className={`interactive-png-wordmark ${className}`}
      style={{
        position: 'relative',
        display: 'inline-block',
        userSelect: 'none',
        pointerEvents: 'none',
        ...style
      }}
      aria-label="PNG Wordmark"
    >
      <svg
        width={config.w}
        height={config.h}
        viewBox={`0 0 ${config.w} ${config.h}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', overflow: 'visible' }}
      >
        <defs>
          {/* Dynamic Light Sweep Gradient */}
          <linearGradient id={`pngGrad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#f0e2e2" />
            <stop offset="100%" stopColor="#c5bebe" />
          </linearGradient>

          {/* Extrusion Side Wall Gradient */}
          <linearGradient id={`pngSide-${size}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#541315" />
            <stop offset="100%" stopColor="#1f0507" />
          </linearGradient>
        </defs>

        {/* 1. Deep Shadow Layer */}
        <text
          x={config.w * 0.05 - lightOffset.x * 1.2}
          y={config.h * 0.78 - lightOffset.y * 1.2 + 3}
          fill="rgba(0, 0, 0, 0.45)"
          fontFamily="'Syne', sans-serif"
          fontWeight="900"
          fontSize={config.fontSize}
          letterSpacing={config.letterSpacing}
        >
          PNG
        </text>

        {/* 2. Beveled Extrusion Layer */}
        <text
          x={config.w * 0.05 + lightOffset.x * 0.4}
          y={config.h * 0.78 + lightOffset.y * 0.4 + 1.5}
          fill={`url(#pngSide-${size})`}
          fontFamily="'Syne', sans-serif"
          fontWeight="900"
          fontSize={config.fontSize}
          letterSpacing={config.letterSpacing}
        >
          PNG
        </text>

        {/* 3. Main Specular Face */}
        <text
          x={config.w * 0.05 + lightOffset.x}
          y={config.h * 0.78 + lightOffset.y}
          fill={`url(#pngGrad-${size})`}
          fontFamily="'Syne', sans-serif"
          fontWeight="900"
          fontSize={config.fontSize}
          letterSpacing={config.letterSpacing}
          stroke="rgba(255, 255, 255, 0.35)"
          strokeWidth="0.8"
        >
          PNG
        </text>
      </svg>
    </div>
  );
}
