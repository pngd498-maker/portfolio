import React, { useState } from 'react';
import CharacterCanvas from './CharacterCanvas';
import PngDimensionalSculpture from './PngDimensionalSculpture';
import TelemetryHUD from './TelemetryHUD';
import { ArrowDown, Eye, ChevronRight } from 'lucide-react';

export default function HeroSection({
  onScrollToAbout,
  onOpenContact
}) {
  const [telemetry, setTelemetry] = useState({
    angleDeg: '0.0',
    compassDir: 'CENTER (DIRECT EYE CONTACT)',
    frameIndex: 'CENTER',
    inDeadzone: true,
    fps: 60,
    latencyMs: 14
  });

  const [autoOrbit, setAutoOrbit] = useState(false);

  // Character eye contact status
  const isEyeContact = telemetry.inDeadzone || telemetry.compassDir.includes('CENTER');

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        minHeight: '680px',
        backgroundColor: '#ea110b',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '0 4vw 28px 4vw',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      {/* 1. Character Canvas (100vw, 100vh, absolute inside Hero - rock-solid motionless body, 128 frames) */}
      <CharacterCanvas
        autoOrbit={autoOrbit}
        onTelemetryUpdate={setTelemetry}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1
        }}
      />

      {/* Subtle Ambient Radial Vignette */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.06) 0%, rgba(234,17,11,0) 65%, rgba(10,5,5,0.45) 100%)',
          pointerEvents: 'none',
          zIndex: 2
        }}
      />

      {/* Top Spacer for Fixed Navigation */}
      <div style={{ height: '72px', width: '100%', pointerEvents: 'none' }} />

      {/* 2. Main Identity & Hero Typography (Layered on zIndex 5 above canvas) */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          width: '100%',
          maxWidth: '1600px',
          margin: '0 auto',
          pointerEvents: 'none' // Allow canvas underneath to track cursor freely
        }}
      >
        {/* Left Column: PNG 3D Object, Stacked Name, Disciplines */}
        <div style={{ pointerEvents: 'auto', maxWidth: '640px' }}>
          {/* Eye Contact Indicator Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 12px',
              borderRadius: '9999px',
              background: 'rgba(0, 0, 0, 0.4)',
              border: isEyeContact ? '1px solid rgba(255, 255, 255, 0.45)' : '1px solid rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(12px)',
              marginBottom: '10px',
              transition: 'all 0.3s ease'
            }}
          >
            <Eye size={13} color={isEyeContact ? '#ffffff' : 'rgba(255,255,255,0.6)'} />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.68rem',
                letterSpacing: '0.12em',
                color: isEyeContact ? '#ffffff' : 'rgba(255,255,255,0.7)',
                textTransform: 'uppercase'
              }}
            >
              {isEyeContact ? 'CENTER EYE CONTACT ACQUIRED' : 'CURSOR AWARENESS ACTIVE'}
            </span>
          </div>

          {/* 10. PNG 3D-Style Dimensional Identity Object */}
          <div style={{ marginBottom: '4px' }}>
            <PngDimensionalSculpture width={440} height={115} />
          </div>

          {/* 16 & 17. Stacked Name Treatment Without White Blocks */}
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2.4rem, 5.2vw, 4.2rem)',
              lineHeight: 0.94,
              letterSpacing: '-0.035em',
              margin: '0 0 16px 0',
              display: 'flex',
              flexDirection: 'column',
              userSelect: 'none'
            }}
          >
            {['M.A.', 'NARENDAR', 'DASS'].map((part) => (
              <span
                key={part}
                style={{
                  display: 'inline-block',
                  background: 'linear-gradient(180deg, #ffffff 0%, #f6e8e8 55%, #dfd4d4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 4px 16px rgba(0, 0, 0, 0.55))'
                }}
              >
                {part}
              </span>
            ))}
          </h1>

          {/* Supporting Text: 4 Confirmed Disciplines */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px 14px',
              marginBottom: '24px'
            }}
          >
            {[
              'ECE ENGINEER',
              'CYBERSECURITY ENTHUSIAST',
              'RED TEAMING',
              'EMBEDDED SYSTEMS'
            ].map((tag, idx) => (
              <span
                key={tag}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 600,
                  fontSize: 'clamp(0.72rem, 1vw, 0.84rem)',
                  letterSpacing: '0.12em',
                  color: idx === 0 ? '#ffffff' : 'rgba(255, 255, 255, 0.82)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  textShadow: '0 2px 6px rgba(0, 0, 0, 0.4)'
                }}
              >
                {idx > 0 && <span style={{ opacity: 0.35 }}>·</span>}
                {tag}
              </span>
            ))}
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <button
              onClick={onScrollToAbout}
              className="btn-luxury"
              style={{ pointerEvents: 'auto' }}
            >
              <span>EXPLORE STORY</span>
              <ArrowDown size={15} />
            </button>

            <button
              onClick={onOpenContact}
              className="btn-luxury-ghost"
              style={{ pointerEvents: 'auto' }}
            >
              <span>CONNECT</span>
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        {/* Right Corner: Real Telemetry HUD connected to actual tracking state */}
        <div style={{ pointerEvents: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
          <TelemetryHUD
            telemetry={telemetry}
            autoOrbit={autoOrbit}
            setAutoOrbit={setAutoOrbit}
          />
        </div>
      </div>

      {/* Bottom Subtle Scroll Indicator */}
      <div
        onClick={onScrollToAbout}
        style={{
          position: 'relative',
          zIndex: 5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          cursor: 'pointer',
          color: 'rgba(255, 255, 255, 0.7)',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.72rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginTop: '6px',
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)'
        }}
      >
        <span>SCROLL TO ENTER DIGITAL ENVIRONMENT</span>
        <ArrowDown size={13} style={{ animation: 'bounceSlow 2s infinite ease-in-out' }} />
      </div>

      <style>{`
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }
      `}</style>
    </section>
  );
}
