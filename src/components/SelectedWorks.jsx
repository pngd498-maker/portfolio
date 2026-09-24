import React, { useState } from 'react';
import { ArrowUpRight, Award, ExternalLink } from 'lucide-react';

const PROJECTS = [
  {
    id: '01',
    title: 'VALENTINO HAUTE KINETICS',
    category: 'Spatial Interactive Editorial',
    year: '2026',
    awards: 'Awwwards Site of the Year Nominee',
    description: 'Bespoke web canvas interface utilizing OpenCV circular frame tracking for Paris Fashion Week digital showcase.',
    metric: '4.8M Impressions / 0.00% Frame Drop'
  },
  {
    id: '02',
    title: 'HOROLOGY MONOLITH N°7',
    category: 'Haute Horlogerie & Telemetry',
    year: '2025',
    awards: 'FWA of the Month / Webby Honoree',
    description: 'Precision luxury timepiece catalog with micro-angular cursor tracking and seamless RGB luminance blending.',
    metric: '99.98% 60 FPS Stability'
  },
  {
    id: '03',
    title: 'HYPERCAR NEURAL COCKPIT',
    category: 'Autonomous Vehicle Experience',
    year: '2025',
    awards: 'Cannes Lions Digital Craft Bronze',
    description: 'Zero-latency vector telemetry cockpit visualizing real-time aerodynamic flow lines and sensor gaze.',
    metric: '35ms Real-time Latency'
  }
];

export default function SelectedWorks() {
  const [activeProject, setActiveProject] = useState(0);

  return (
    <section 
      id="selected-works"
      style={{
        position: 'relative',
        zIndex: 10,
        background: '#c40e09',
        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
        padding: '100px 40px',
        color: '#ffffff'
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '60px',
          gap: '24px'
        }}>
          <div>
            <div className="glass-pill" style={{ display: 'inline-flex', marginBottom: '16px' }}>
              <span>CURATED ARCHIVE</span>
            </div>
            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(2.2rem, 4vw, 3.6rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1
            }}>
              Selected High-Craft Works
            </h2>
          </div>

          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '1rem',
            color: 'rgba(255, 255, 255, 0.75)',
            maxWidth: '440px',
            lineHeight: 1.6
          }}>
            Every artifact is engineered with strict performance budgets: zero runtime video decoding overhead, instantaneous vector lerping, and tactile visual feedback.
          </p>
        </div>

        {/* Project List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {PROJECTS.map((proj, idx) => {
            const isHovered = activeProject === idx;
            return (
              <div
                key={proj.id}
                onMouseEnter={() => setActiveProject(idx)}
                className="glass-panel"
                style={{
                  padding: '32px 40px',
                  display: 'grid',
                  gridTemplateColumns: '80px 1.5fr 2fr 180px',
                  alignItems: 'center',
                  gap: '24px',
                  cursor: 'pointer',
                  background: isHovered ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.05)',
                  borderColor: isHovered ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)',
                  transform: isHovered ? 'translateX(6px)' : 'translateX(0)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* ID */}
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: isHovered ? '#f5cf68' : 'rgba(255,255,255,0.5)'
                }}>
                  /{proj.id}
                </div>

                {/* Title & Category */}
                <div>
                  <h3 style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: '1.35rem',
                    letterSpacing: '0.02em',
                    marginBottom: '6px',
                    color: '#ffffff'
                  }}>
                    {proj.title}
                  </h3>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.7)',
                    textTransform: 'uppercase'
                  }}>
                    {proj.category} — {proj.year}
                  </div>
                </div>

                {/* Description & Metric */}
                <div>
                  <p style={{
                    fontSize: '0.88rem',
                    color: 'rgba(255,255,255,0.85)',
                    lineHeight: 1.5,
                    marginBottom: '8px'
                  }}>
                    {proj.description}
                  </p>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.72rem',
                    color: '#f5cf68'
                  }}>
                    <Award size={13} />
                    <span>{proj.awards}</span>
                  </div>
                </div>

                {/* Action Indicator */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: isHovered ? '#ffffff' : 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isHovered ? '#ea110b' : '#ffffff',
                    transition: 'all 0.25s ease'
                  }}>
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Marquee / Colophon */}
        <div style={{
          marginTop: '80px',
          paddingTop: '40px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.76rem',
          color: 'rgba(255,255,255,0.6)',
          gap: '20px'
        }}>
          <div>© 2026 AVAN PRINCE STUDIOS. ALL RIGHTS RESERVED.</div>
          <div>BUILT WITH REACT, OPENCV & ULTRA-CRISP WEBP CANVAS</div>
          <div>ZERO RUNTIME MP4 PLAYBACK · 60 FPS RIGID PIPELINE</div>
        </div>
      </div>
    </section>
  );
}
