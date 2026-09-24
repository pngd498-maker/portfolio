import React from 'react';
import { ArrowDown, Sparkles, ShieldCheck, Eye, Compass, Layers } from 'lucide-react';
import CharacterCanvas from './CharacterCanvas';

export default function HeroContent({
  telemetry,
  setTelemetry,
  autoOrbit,
  setAutoOrbit,
  deadzoneRatio,
  lerpFactor,
  onOpenSpecs,
  onScrollToWorks
}) {
  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 40px 60px 40px',
      overflow: 'hidden',
      background: '#ea110b'
    }}>
      {/* Giant Editorial Backdrop Typography (Behind Character) */}
      <div 
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0.12,
          textAlign: 'center'
        }}
      >
        <span style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(5rem, 16vw, 22rem)',
          lineHeight: 0.85,
          letterSpacing: '-0.04em',
          color: '#ffffff',
          whiteSpace: 'nowrap'
        }}>
          CREATIVE
        </span>
        <span style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(5rem, 16vw, 22rem)',
          lineHeight: 0.85,
          letterSpacing: '-0.04em',
          color: '#ffffff',
          whiteSpace: 'nowrap'
        }}>
          DIRECTOR
        </span>
      </div>

      {/* Hero 3-Column Layout */}
      <div style={{
        position: 'relative',
        zIndex: 5,
        width: '100%',
        maxWidth: '1600px',
        display: 'grid',
        gridTemplateColumns: '1fr minmax(320px, 540px) 1fr',
        alignItems: 'center',
        gap: '40px'
      }}>
        {/* Left Column: Manifesto & Architecture Metrics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div>
            <div className="glass-pill" style={{ display: 'inline-flex', marginBottom: '16px' }}>
              <span>HAUTE INTERACTIVE SYSTEMS</span>
            </div>
            <h1 style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(2.4rem, 3.8vw, 4.2rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              marginBottom: '18px'
            }}>
              Emotion Meets Pure Code.
            </h1>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 400,
              fontSize: '1.05rem',
              lineHeight: 1.6,
              color: 'rgba(255, 255, 255, 0.84)',
              maxWidth: '420px'
            }}>
              Pioneering zero-latency, zero-ghosting interactive digital artifacts. Every micro-motion calculated via 360° OpenCV vectors in 60fps canvas space.
            </p>
          </div>

          {/* Key Pipeline Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '14px',
            maxWidth: '440px'
          }}>
            <div className="glass-panel" style={{ padding: '16px 18px' }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '1.6rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '4px'
              }}>
                64<span style={{ fontSize: '1rem', color: '#f5cf68' }}>FPS/F</span>
              </div>
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '0.78rem',
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.3
              }}>
                Pre-extracted 5.6° Circular WebP Frames
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '16px 18px' }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '1.6rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '4px'
              }}>
                ~35<span style={{ fontSize: '1rem', color: '#10b981' }}>MS</span>
              </div>
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '0.78rem',
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.3
              }}>
                Shortest-Path Angular Lerp Response
              </div>
            </div>
          </div>

          {/* Eye Contact Notice */}
          <div 
            className="glass-panel"
            style={{
              padding: '12px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              maxWidth: '440px',
              background: telemetry.inDeadzone ? 'rgba(255, 255, 255, 0.16)' : 'rgba(255, 255, 255, 0.06)',
              borderColor: telemetry.inDeadzone ? '#f5cf68' : 'rgba(255,255,255,0.15)'
            }}
          >
            <Eye size={18} color={telemetry.inDeadzone ? '#f5cf68' : '#ffffff'} />
            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.85)' }}>
              {telemetry.inDeadzone ? (
                <strong style={{ color: '#f5cf68' }}>EYE CONTACT LOCKED — He is looking into your eyes</strong>
              ) : (
                <span>Hover near his face (12% radius) to trigger direct eye contact.</span>
              )}
            </div>
          </div>
        </div>

        {/* Center Stage: The Zero-Ghosting Motionless Character Canvas */}
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'clamp(580px, 78vh, 880px)',
          width: '100%'
        }}>
          {/* Subtle Ambient Radial Glow */}
          <div style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '120%',
            height: '100%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, rgba(234, 17, 11, 0) 70%)',
            pointerEvents: 'none',
            zIndex: 1
          }} />

          {/* CRITICAL: The canvas container has ZERO CSS 3D transforms */}
          <CharacterCanvas
            deadzoneRatio={deadzoneRatio}
            lerpFactor={lerpFactor}
            autoOrbit={autoOrbit}
            onTelemetryUpdate={setTelemetry}
            className="pulse-still"
          />
        </div>

        {/* Right Column: Accolades, Controls & CTAs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', alignItems: 'flex-start' }}>
          <div>
            <div className="glass-pill" style={{ display: 'inline-flex', marginBottom: '16px' }}>
              <span>ACCOLADES & RECOGNITION</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '10px',
                borderBottom: '1px solid rgba(255,255,255,0.12)',
                paddingBottom: '10px'
              }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#f5cf68', fontSize: '0.85rem' }}>01</span>
                <div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#fff' }}>
                    AWWWARDS — Site of the Day (x8)
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.65)' }}>
                    Excellence in Creative Tech & Performance
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '10px',
                borderBottom: '1px solid rgba(255,255,255,0.12)',
                paddingBottom: '10px'
              }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#f5cf68', fontSize: '0.85rem' }}>02</span>
                <div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#fff' }}>
                    FWA OF THE DAY & MONTH (x5)
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.65)' }}>
                    Pioneering Zero-Ghosting Canvas Engines
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '10px',
                borderBottom: '1px solid rgba(255,255,255,0.12)',
                paddingBottom: '10px'
              }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#f5cf68', fontSize: '0.85rem' }}>03</span>
                <div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#fff' }}>
                    CANNES LIONS BRONZE (2025)
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.65)' }}>
                    Interactive Digital Fashion Craft
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '320px' }}>
            <button
              onClick={onScrollToWorks}
              className="btn-luxury"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>EXPLORE SELECTED WORKS</span>
              <ArrowDown size={16} />
            </button>

            <button
              onClick={() => setAutoOrbit(!autoOrbit)}
              className="btn-luxury-ghost"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Compass size={16} />
              <span>{autoOrbit ? 'STOP 360° ORBIT' : 'RUN 360° ORBIT DEMO'}</span>
            </button>

            <button
              onClick={onOpenSpecs}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.7)',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.75rem',
                textDecoration: 'underline',
                cursor: 'pointer',
                textAlign: 'center',
                padding: '8px'
              }}
            >
              Inspect OpenCV Vector Pipeline Architecture
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
