import React, { useRef, useEffect, useState } from 'react';
import { Music, Play, Square, Award, RefreshCw, Volume2, Sparkles } from 'lucide-react';

export default function HobbiesSection() {
  const soundWaveRef = useRef(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioCtxRef = useRef(null);
  const oscRef = useRef(null);

  // Sound-Wave Canvas Visualization
  useEffect(() => {
    const canvas = soundWaveRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let phase = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      phase += isPlayingAudio ? 0.08 : 0.02;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cy = canvas.height / 2;

      // Draw 3 layered sinusoidal soundwaves
      for (let wave = 0; wave < 3; wave++) {
        ctx.beginPath();
        const amp = (isPlayingAudio ? 24 : 12) + wave * 6;
        const freq = 0.03 + wave * 0.015;

        for (let x = 0; x < canvas.width; x++) {
          const y = cy + Math.sin(x * freq + phase + wave) * amp;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.strokeStyle = wave === 0 ? '#ea110b' : wave === 1 ? '#ffffff' : 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = wave === 0 ? 2 : 1;
        ctx.stroke();
      }
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isPlayingAudio]);

  // Safe user-initiated audio preview (Web Audio API synth harmonic - NO autoplay)
  const toggleAudio = () => {
    if (isPlayingAudio) {
      if (oscRef.current) {
        oscRef.current.stop();
        oscRef.current.disconnect();
      }
      setIsPlayingAudio(false);
    } else {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, ctx.currentTime); // Gentle A3 ambient tone
        gain.gain.setValueAtTime(0.04, ctx.currentTime);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        oscRef.current = osc;
        setIsPlayingAudio(true);
      } catch (e) {
        console.error('Audio initialization:', e);
      }
    }
  };

  return (
    <section
      id="hobbies"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '80vh',
        background: '#090506',
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
          <span>07 / PERSONAL PURSUITS</span>
        </div>

        {/* Mandatory Headline */}
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(2.4rem, 5.5vw, 4.6rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            maxWidth: '1100px',
            marginBottom: '54px'
          }}
        >
          OUTSIDE THE SCREEN
        </h2>

        {/* 3 Hobbies Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px'
          }}
        >
          {/* Hobby 1: Music */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '24px',
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'rgba(234, 17, 11, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Music size={20} color="#ea110b" />
                </div>
                <button
                  onClick={toggleAudio}
                  style={{
                    background: isPlayingAudio ? '#ea110b' : 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    borderRadius: '9999px',
                    padding: '6px 14px',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.72rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {isPlayingAudio ? <Square size={12} fill="#fff" /> : <Play size={12} fill="#fff" />}
                  <span>{isPlayingAudio ? 'MUTE HARMONIC' : 'PLAY PREVIEW'}</span>
                </button>
              </div>

              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: '1.6rem',
                  color: '#ffffff',
                  marginBottom: '12px'
                }}
              >
                MUSIC
              </h3>

              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '0.92rem',
                  lineHeight: 1.6,
                  color: 'rgba(255, 255, 255, 0.65)',
                  marginBottom: '24px'
                }}
              >
                Finding rhythm and focus through listening to music. Acoustic harmonies mirror algorithmic structure and mental balance.
              </p>
            </div>

            {/* Sound-Wave Visualizer Canvas */}
            <div
              style={{
                height: '80px',
                background: 'rgba(0, 0, 0, 0.35)',
                borderRadius: '12px',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              <canvas
                ref={soundWaveRef}
                width={300}
                height={80}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>

          {/* Hobby 2: Chess */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '24px',
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: 'rgba(245, 158, 11, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}
              >
                <Award size={20} color="#f59e0b" />
              </div>

              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: '1.6rem',
                  color: '#ffffff',
                  marginBottom: '12px'
                }}
              >
                CHESS
              </h3>

              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '0.92rem',
                  lineHeight: 1.6,
                  color: 'rgba(255, 255, 255, 0.65)',
                  marginBottom: '24px'
                }}
              >
                Tactical depth, positional equilibrium, and anticipation. Two-time college chess runner-up honing mental calculation and strategic patience.
              </p>
            </div>

            <div
              style={{
                padding: '16px',
                background: 'rgba(0, 0, 0, 0.35)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '1.8rem',
                  color: '#f59e0b',
                  lineHeight: 1
                }}
              >
                ♞
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                COGNITIVE DISCIPLINE & BOARD CRAFT
              </div>
            </div>
          </div>

          {/* Hobby 3: Practicing / Continuous Learning */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '24px',
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: 'rgba(34, 197, 94, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}
              >
                <RefreshCw size={20} color="#22c55e" />
              </div>

              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: '1.6rem',
                  color: '#ffffff',
                  marginBottom: '12px'
                }}
              >
                CONTINUOUS PRACTICING
              </h3>

              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '0.92rem',
                  lineHeight: 1.6,
                  color: 'rgba(255, 255, 255, 0.65)',
                  marginBottom: '24px'
                }}
              >
                Relentless skill iteration, dissecting new hardware protocols, analyzing vulnerabilities, and testing conceptual outcomes through regular practice.
              </p>
            </div>

            <div
              style={{
                padding: '16px',
                background: 'rgba(0, 0, 0, 0.35)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  border: '2px dashed #22c55e',
                  animation: 'spinSlow 10s linear infinite'
                }}
              />
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: '#22c55e' }}>
                ITERATIVE MASTERY & LIFELONG PRACTICE
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
