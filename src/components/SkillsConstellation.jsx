import React, { useRef, useEffect, useState } from 'react';
import { Network, Sparkles } from 'lucide-react';

export default function SkillsConstellation() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);

  const skills = [
    { name: 'CYBERSECURITY', angle: 0, distance: 180, color: '#ef4444' },
    { name: 'RED TEAMING', angle: Math.PI * 0.25, distance: 220, color: '#f87171' },
    { name: 'EMBEDDED SYSTEMS', angle: Math.PI * 0.5, distance: 190, color: '#3b82f6' },
    { name: 'ECE', angle: Math.PI * 0.75, distance: 230, color: '#60a5fa' },
    { name: 'VULNERABILITY ANALYSIS', angle: Math.PI, distance: 200, color: '#f59e0b' },
    { name: 'AI', angle: Math.PI * 1.25, distance: 170, color: '#10b981' },
    { name: 'CHESS', angle: Math.PI * 1.5, distance: 210, color: '#a855f7' },
    { name: 'PROBLEM SOLVING', angle: Math.PI * 1.75, distance: 190, color: '#ec4899' }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let rotation = 0;

    const handleResize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    let mouse = { x: -1000, y: -1000 };
    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', handlePointerMove);

    const render = () => {
      animId = requestAnimationFrame(render);
      rotation += 0.003;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Center Node: M.A. NARENDAR DASS
      ctx.beginPath();
      ctx.arc(cx, cy, 32, 0, Math.PI * 2);
      ctx.fillStyle = '#ea110b';
      ctx.shadowColor = '#ea110b';
      ctx.shadowBlur = 24;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('M.A. NARENDAR', cx, cy - 3);
      ctx.fillText('DASS', cx, cy + 9);

      let foundHover = null;

      // Draw Satellite Nodes and Connecting Filaments
      skills.forEach((skill) => {
        const curAngle = skill.angle + rotation;
        const baseDist = Math.min(skill.distance, canvas.width * 0.4);

        let sx = cx + Math.cos(curAngle) * baseDist;
        let sy = cy + Math.sin(curAngle) * baseDist;

        // Mouse gravitational attraction
        const mdx = mouse.x - sx;
        const mdy = mouse.y - sy;
        const mDist = Math.hypot(mdx, mdy);
        if (mDist < 80) {
          sx += (mdx / mDist) * 12;
          sy += (mdy / mDist) * 12;
          foundHover = skill.name;
        }

        // Connecting filament to center
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(sx, sy);
        ctx.strokeStyle = mDist < 80 ? 'rgba(255, 255, 255, 0.45)' : 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = mDist < 80 ? 2 : 1;
        ctx.stroke();

        // Satellite node circle
        ctx.beginPath();
        ctx.arc(sx, sy, mDist < 80 ? 8 : 5, 0, Math.PI * 2);
        ctx.fillStyle = skill.color;
        ctx.shadowColor = skill.color;
        ctx.shadowBlur = mDist < 80 ? 16 : 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label
        ctx.fillStyle = mDist < 80 ? '#ffffff' : 'rgba(255, 255, 255, 0.75)';
        ctx.font = `${mDist < 80 ? 'bold' : 'normal'} 11px "JetBrains Mono", monospace`;
        ctx.textAlign = sx > cx ? 'left' : 'right';
        ctx.fillText(skill.name, sx + (sx > cx ? 12 : -12), sy + 4);
      });

      setHoveredNode(foundHover);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handlePointerMove);
    };
  }, []);

  return (
    <section
      id="constellation"
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '80vh',
        background: '#080506',
        color: '#ffffff',
        padding: '100px 6vw',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
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
              marginBottom: '16px'
            }}
          >
            <Network size={14} />
            <span>09 / INTERACTIVE CONSTELLATION MAP</span>
          </div>

          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
              color: '#ffffff',
              margin: '0 0 12px 0'
            }}
          >
            DISCIPLINARY CONVERGENCE
          </h2>

          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '1rem',
              color: 'rgba(255, 255, 255, 0.65)',
              maxWidth: '620px',
              margin: '0 auto'
            }}
          >
            Interactive node constellation centering M.A. Narendar Dass and connecting hardware, cybersecurity, predictive AI, and tactical strategy.
          </p>
        </div>

        {/* Constellation Canvas Viewport */}
        <div
          style={{
            position: 'relative',
            background: 'rgba(12, 8, 10, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)'
          }}
        >
          <div style={{ height: '480px', position: 'relative' }}>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%', cursor: 'pointer' }} />
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '20px',
                right: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.7rem',
                color: 'rgba(255, 255, 255, 0.45)',
                pointerEvents: 'none'
              }}
            >
              <span>[HOVER SATELLITE NODES FOR GRAVITATIONAL FOCUS]</span>
              <span>ACTIVE FOCUS: {hoveredNode || 'FULL CONSTELLATION'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
