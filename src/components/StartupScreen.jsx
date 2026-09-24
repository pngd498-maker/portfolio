import React, { useEffect, useState } from 'react';

export default function StartupScreen({ onComplete }) {
  const [phase, setPhase] = useState('visible'); // visible -> fading -> done

  useEffect(() => {
    // 1.4s display, then fade out over 0.6s
    const timer1 = setTimeout(() => {
      setPhase('fading');
    }, 1400);

    const timer2 = setTimeout(() => {
      setPhase('done');
      if (onComplete) onComplete();
    }, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#0a0505',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: phase === 'fading' ? 0 : 1,
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: phase === 'fading' ? 'none' : 'auto',
        userSelect: 'none'
      }}
    >
      {/* Subtle Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(234, 17, 11, 0.22) 0%, rgba(10, 5, 5, 0) 70%)',
          pointerEvents: 'none'
        }}
      />

      {/* Main Signature Wordmark */}
      <div style={{ position: 'relative', textAlign: 'center', zIndex: 2 }}>
        <div
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(3.5rem, 8vw, 6rem)',
            letterSpacing: '0.22em',
            color: '#ffffff',
            lineHeight: 1,
            marginBottom: '18px',
            textShadow: '0 0 30px rgba(255, 255, 255, 0.3)'
          }}
        >
          PNG
        </div>

        {/* Name */}
        <div
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1rem, 2.2vw, 1.35rem)',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '10px'
          }}
        >
          M.A. NARENDAR DASS
        </div>

        {/* Subtle Discipline Tagline */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 500,
            fontSize: '0.74rem',
            letterSpacing: '0.2em',
            color: 'rgba(255, 255, 255, 0.55)',
            textTransform: 'uppercase'
          }}
        >
          ECE ENGINEER · CYBERSECURITY · BUILDER
        </div>
      </div>

      {/* Minimalist Progress Line */}
      <div
        style={{
          position: 'absolute',
          bottom: '48px',
          width: '120px',
          height: '2px',
          background: 'rgba(255, 255, 255, 0.1)',
          overflow: 'hidden',
          borderRadius: '1px'
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, #ea110b, #ffffff)',
            animation: 'startupProgress 1.6s ease-in-out forwards'
          }}
        />
      </div>

      <style>{`
        @keyframes startupProgress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </div>
  );
}
