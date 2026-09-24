import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let animId;

    const onMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive element
      const target = e.target;
      if (target) {
        const isInteractive = target.closest('button, a, input, [role="button"], .interactive, .glass-pill');
        setIsHovered(Boolean(isInteractive));
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth trailing aura ring loop
    const loop = () => {
      animId = requestAnimationFrame(loop);

      // Lerp aura position towards cursor
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.2;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.2;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Sharp glowing center cursor dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovered ? '4px' : '6px',
          height: isHovered ? '4px' : '6px',
          backgroundColor: '#ffffff',
          borderRadius: '50%',
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.9), 0 0 20px rgba(255, 255, 255, 0.5)',
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
          transition: 'width 0.2s ease, height 0.2s ease'
        }}
      />

      {/* Smooth trailing magnetic aura ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovered ? '56px' : '36px',
          height: isHovered ? '56px' : '36px',
          border: isHovered ? '1.5px solid rgba(255, 255, 255, 0.9)' : '1.5px solid rgba(255, 255, 255, 0.55)',
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
          borderRadius: '50%',
          boxShadow: isHovered ? '0 0 24px rgba(255, 255, 255, 0.35)' : 'none',
          backdropFilter: isHovered ? 'blur(2px)' : 'none',
          WebkitBackdropFilter: isHovered ? 'blur(2px)' : 'none',
          pointerEvents: 'none',
          zIndex: 9998,
          willChange: 'transform',
          transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease'
        }}
      />
    </>
  );
}
