import React from 'react';
import { X, CheckCircle2, ShieldAlert, Cpu, Terminal, Eye, Palette } from 'lucide-react';

export default function TechnicalSpecsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div 
        className="glass-panel"
        style={{
          background: 'rgba(26, 6, 6, 0.95)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          maxWidth: '840px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '36px 40px',
          color: '#ffffff',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: '#ffffff',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background 0.2s ease'
          }}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Modal Title */}
        <div style={{ marginBottom: '28px' }}>
          <div className="glass-pill" style={{ display: 'inline-flex', marginBottom: '12px' }}>
            <span>TECHNICAL ARCHITECTURE COMPLIANCE</span>
          </div>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: '1.8rem',
            letterSpacing: '-0.02em',
            marginBottom: '8px'
          }}>
            Zero-Lag Cursor-Tracking Engine
          </h2>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.9rem',
            color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.5
          }}>
            Rigorous adherence to technical constraints eliminating browser video lag, ghosting artifacts, and 3D transforms.
          </p>
        </div>

        {/* Constraint Audit Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Constraint 1 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '18px 20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <CheckCircle2 size={18} color="#10b981" />
              <strong style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.95rem' }}>
                1. No CSS 3D Transforms — 100% Rock-Solid Motionless Body
              </strong>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>
              Strictly zero <code style={{ color: '#f5cf68' }}>perspective</code>, <code style={{ color: '#f5cf68' }}>rotateX</code>, or <code style={{ color: '#f5cf68' }}>rotateY</code> on canvas or parent elements. The character's body, shoulders, and legs remain motionless. Only the head tracks.
            </p>
          </div>

          {/* Constraint 2 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '18px 20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <CheckCircle2 size={18} color="#10b981" />
              <strong style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.95rem' }}>
                2. Zero In-Browser MP4 Seeking / Zero video.play()
              </strong>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>
              Single-keyframe AI videos freeze when seeking via <code style={{ color: '#f5cf68' }}>currentTime</code>. Browser video playback is completely bypassed in favor of RAM-cached WebP image frames.
            </p>
          </div>

          {/* Constraint 3 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '18px 20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <CheckCircle2 size={18} color="#10b981" />
              <strong style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.95rem' }}>
                3. OpenCV Pre-Extraction: 64 WebP Frames (~5.625° Spacing)
              </strong>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>
              Generated via Python script <code style={{ color: '#f5cf68' }}>scripts/extract_frames.py</code> with 8 verified compass anchors: RIGHT (F138), DOWN-RIGHT (F176), DOWN (F181), DOWN-LEFT (F98), LEFT (F62), UP-LEFT (F3), UP (F116), UP-RIGHT (F124), and neutral CENTER (F22).
            </p>
          </div>

          {/* Constraint 4 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '18px 20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <CheckCircle2 size={18} color="#10b981" />
              <strong style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.95rem' }}>
                4. Zero-Ghosting 60 FPS Canvas: Exactly 1 Frame at 100% Opacity
              </strong>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>
              Employs shortest-path circular angular lerp (<code style={{ color: '#f5cf68' }}>lerpAngle</code>) with response factor <code style={{ color: '#f5cf68' }}>0.26</code> (~35ms response). Draws exactly one crisp frame per render tick with zero alpha-crossfading to prevent double-face ghosting.
            </p>
          </div>

          {/* Constraint 5 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '18px 20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <CheckCircle2 size={18} color="#10b981" />
              <strong style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.95rem' }}>
                5. Center Eye Contact (12% Screen Radius Deadzone)
              </strong>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>
              When the cursor approaches the character's face coordinates (normalized: X=0.517, Y=0.125) within a 12% screen radius, the engine seamlessly switches to <code style={{ color: '#f5cf68' }}>center.webp</code> for direct eye contact.
            </p>
          </div>

          {/* Constraint 6 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '18px 20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <CheckCircle2 size={18} color="#10b981" />
              <strong style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.95rem' }}>
                6. Seamless Background Match (Exact Hex: #ea110b)
              </strong>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>
              Detected RGB: <code style={{ color: '#f5cf68' }}>[234, 17, 11]</code> / Hex: <code style={{ color: '#f5cf68' }}>#ea110b</code>. Both canvas background clear color and HTML page background match flawlessly with zero visible borders.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '28px',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={onClose}
            className="btn-luxury"
            style={{ padding: '10px 24px', fontSize: '0.8rem' }}
          >
            DISMISS SPECIFICATION
          </button>
        </div>
      </div>
    </div>
  );
}
