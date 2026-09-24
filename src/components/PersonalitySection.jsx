import React, { useRef, useEffect, useState } from 'react';
import { GitFork, GitMerge, CheckCircle2, ArrowRight } from 'lucide-react';

export default function PersonalitySection() {
  const canvasRef = useRef(null);
  const [activeBranch, setActiveBranch] = useState(1); // 0, 1, 2

  const branches = [
    {
      id: 0,
      option: 'OPTION A: DIRECT PERIMETER PROBE',
      outcome: 'Immediate feedback on boundary defenses',
      consequence: 'Higher detection surface, rapid mitigation required'
    },
    {
      id: 1,
      option: 'OPTION B: PASSIVE LATERAL MAPPING',
      outcome: 'Comprehensive topology and dependency discovery',
      consequence: 'Low noise footprint, optimal defensive hardening'
    },
    {
      id: 2,
      option: 'OPTION C: SIMULATED FAULT INJECTION',
      outcome: 'Reveals cascading failure modes in embedded bus',
      consequence: 'Identifies hardware reset recovery flaws'
    }
  ];

  // Interactive Branching Paths Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const handleResize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    let progress = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      progress += 0.015;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      const startX = 80;
      const startY = h / 2;
      const endX = w - 80;
      const endY = h / 2;

      // Draw Root Node
      ctx.beginPath();
      ctx.arc(startX, startY, 7, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw 3 Branching Paths
      const branchTops = [h * 0.25, h * 0.5, h * 0.75];

      branches.forEach((b, idx) => {
        const midY = branchTops[idx];
        const isCur = activeBranch === idx;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        // Bezier to mid stage
        ctx.bezierCurveTo(w * 0.3, startY, w * 0.35, midY, w * 0.5, midY);
        // Bezier back to convergence point
        ctx.bezierCurveTo(w * 0.65, midY, w * 0.7, endY, endX, endY);

        ctx.strokeStyle = isCur ? '#ea110b' : 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = isCur ? 3 : 1.5;
        ctx.stroke();

        // Intermediate outcome waypoint node
        ctx.beginPath();
        ctx.arc(w * 0.5, midY, isCur ? 6 : 4, 0, Math.PI * 2);
        ctx.fillStyle = isCur ? '#ea110b' : 'rgba(255, 255, 255, 0.4)';
        ctx.fill();

        // Traveling particle along branch
        const t = (progress + idx * 0.33) % 1;
        let px, py;
        if (t < 0.5) {
          const subT = t * 2;
          px = (1 - subT) * (1 - subT) * startX + 2 * (1 - subT) * subT * (w * 0.3) + subT * subT * (w * 0.5);
          py = (1 - subT) * (1 - subT) * startY + 2 * (1 - subT) * subT * midY + subT * subT * midY;
        } else {
          const subT = (t - 0.5) * 2;
          px = (1 - subT) * (1 - subT) * (w * 0.5) + 2 * (1 - subT) * subT * (w * 0.7) + subT * subT * endX;
          py = (1 - subT) * (1 - subT) * midY + 2 * (1 - subT) * subT * endY + subT * subT * endY;
        }

        ctx.beginPath();
        ctx.arc(px, py, isCur ? 4 : 2.5, 0, Math.PI * 2);
        ctx.fillStyle = isCur ? '#ffffff' : 'rgba(255, 255, 255, 0.6)';
        ctx.fill();
      });

      // Draw Convergence Node
      ctx.beginPath();
      ctx.arc(endX, endY, 7, 0, Math.PI * 2);
      ctx.fillStyle = '#22c55e';
      ctx.shadowColor = '#22c55e';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeBranch]);

  return (
    <section
      id="personality"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '90vh',
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
          <GitFork size={14} />
          <span>08 / CORE COGNITIVE STRENGTH</span>
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
          THINKING IN POSSIBILITIES
        </h2>

        {/* Mandatory Supporting Quote */}
        <p
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '1.25rem',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.9)',
            fontStyle: 'italic',
            maxWidth: '780px',
            marginBottom: '48px'
          }}
        >
          "I naturally think through different possible outcomes before acting."
        </p>

        {/* Branching Tree Canvas Container */}
        <div
          style={{
            position: 'relative',
            background: 'rgba(12, 8, 10, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            overflow: 'hidden',
            marginBottom: '40px',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.65)'
          }}
        >
          <div
            style={{
              padding: '16px 24px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.02)'
            }}
          >
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.74rem', color: '#ffffff' }}>
              POSSIBILITY GRAPH // OPTION → OUTCOME → CONSEQUENCE → CONVERGENCE
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.74rem', color: '#22c55e' }}>
              ● RESOLUTION: OPTIMIZED ACTION
            </div>
          </div>

          <div style={{ height: '320px', position: 'relative' }}>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
          </div>
        </div>

        {/* 3 Interactive Branch Selectors */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px'
          }}
        >
          {branches.map((b, idx) => {
            const isCur = activeBranch === idx;
            return (
              <div
                key={b.id}
                onClick={() => setActiveBranch(idx)}
                style={{
                  background: isCur ? 'rgba(234, 17, 11, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                  border: isCur ? '1px solid #ea110b' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '24px',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: isCur ? '#ffffff' : 'rgba(255, 255, 255, 0.8)',
                    marginBottom: '10px'
                  }}
                >
                  {b.option}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                    <strong style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Outcome:</strong> {b.outcome}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                    <strong style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Consequence:</strong> {b.consequence}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
