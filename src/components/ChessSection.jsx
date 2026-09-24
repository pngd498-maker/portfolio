import React, { useState } from 'react';
import { Award, Compass, ShieldCheck } from 'lucide-react';
import Chess3DEnvironment from './Chess3DEnvironment';

export default function ChessSection() {
  const [hoveredPiece, setHoveredPiece] = useState(null);
  const [moveStatus, setMoveStatus] = useState(null);

  // Visual connection pipeline: Chess to Strategic Thinking
  const connectionChain = [
    { title: 'CHESS', desc: 'Positional awareness & piece harmony' },
    { title: 'PATTERN RECOGNITION', desc: 'Detecting subtle structural tactical flaws' },
    { title: 'ANTICIPATION', desc: 'Calculating branching opponent response trees' },
    { title: 'DECISION MAKING', desc: 'Committing resources with quantified risk' },
    { title: 'SECURITY THINKING', desc: 'Defensive hardening & red teaming mindset' }
  ];

  return (
    <section
      id="chess"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: '#070405',
        color: '#ffffff',
        padding: '120px 6vw',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Section Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '9999px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.74rem',
            letterSpacing: '0.14em',
            color: 'rgba(255, 255, 255, 0.7)',
            textTransform: 'uppercase',
            marginBottom: '18px'
          }}
        >
          <Award size={14} color="#f59e0b" />
          <span>06 / STRATEGIC MASTERY</span>
        </div>

        {/* Mandatory Headline */}
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            maxWidth: '1200px',
            marginBottom: '16px'
          }}
        >
          THINK THREE MOVES AHEAD.
        </h2>

        {/* Exact Confirmed Achievement Banner */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 20px',
            borderRadius: '12px',
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            marginBottom: '28px'
          }}
        >
          <Award size={18} color="#f59e0b" />
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: '1rem',
              letterSpacing: '0.04em',
              color: '#f59e0b',
              textTransform: 'uppercase'
            }}
          >
            Two-Time College Chess Runner-Up
          </span>
        </div>

        {/* Mandatory Quote */}
        <p
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '1.25rem',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.9)',
            fontStyle: 'italic',
            maxWidth: '780px',
            marginBottom: '44px'
          }}
        >
          "CHESS TAUGHT ME TO THINK BEYOND THE OBVIOUS."
        </p>

        {/* 20-27. Complete 32-Piece Interactive 3D Chessboard */}
        <div style={{ marginBottom: '56px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '14px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.74rem'
            }}
          >
            <div style={{ color: 'rgba(255, 255, 255, 0.6)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Compass size={14} color="#ea110b" />
              <span>32-PIECE 3D TACTICAL ENGINE (CHESS.JS VALIDATED)</span>
            </div>
            <div style={{ color: '#ffffff' }}>
              {hoveredPiece ? (
                <span>INSPECTING: <strong style={{ color: '#f59e0b' }}>{hoveredPiece}</strong></span>
              ) : (
                <span style={{ color: 'rgba(255, 255, 255, 0.45)' }}>HOVER ANY PIECE FOR TACTICAL READOUT</span>
              )}
            </div>
          </div>

          <Chess3DEnvironment
            onHoverPiece={setHoveredPiece}
            onStatusUpdate={setMoveStatus}
          />
        </div>

        {/* 29. Chess to Strategic Thinking Connection */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '24px',
            padding: '36px'
          }}
        >
          <div style={{ marginBottom: '24px' }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.72rem',
                letterSpacing: '0.14em',
                color: '#ea110b',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '8px'
              }}
            >
              COGNITIVE INTERSECTION
            </span>
            <h3
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)',
                color: '#ffffff',
                margin: 0
              }}
            >
              Visual Connection: Chess to Decision Architecture
            </h3>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '0.88rem',
                color: 'rgba(255, 255, 255, 0.65)',
                marginTop: '6px'
              }}
            >
              How board calculation, deep positional evaluation, and anticipating opponent counter-play translate to engineering and security thinking.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '14px',
              alignItems: 'stretch'
            }}
          >
            {connectionChain.map((step, idx) => (
              <div
                key={step.title}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '20px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.65rem',
                      color: '#ea110b',
                      marginBottom: '6px'
                    }}
                  >
                    PHASE 0{idx + 1}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      color: '#ffffff',
                      marginBottom: '6px'
                    }}
                  >
                    {step.title}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '0.74rem',
                    color: 'rgba(255, 255, 255, 0.6)',
                    lineHeight: 1.4
                  }}
                >
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
