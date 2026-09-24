import React from 'react';
import { Cpu, ShieldAlert, GitBranch, Terminal } from 'lucide-react';
import InteractiveWordmark from './InteractiveWordmark';

export default function AboutSection() {
  const pillars = [
    {
      icon: Cpu,
      title: 'HARDWARE LOGIC',
      desc: 'Electronics & Communication Engineering fundamentals, circuit logic, and microcontroller architecture.'
    },
    {
      icon: Terminal,
      title: 'SOFTWARE ARCHITECTURE',
      desc: 'Exploring how low-level firmware and high-level software interact with system execution layers.'
    },
    {
      icon: ShieldAlert,
      title: 'SECURITY & RED TEAMING',
      desc: 'Finding where systems fail, attack-surface thinking, and analyzing defensive weaknesses.'
    },
    {
      icon: GitBranch,
      title: 'ANTICIPATORY THINKING',
      desc: 'Exploring multiple future scenarios and consequences before executing a strategic decision.'
    }
  ];

  return (
    <section
      id="about"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #ea110b 0%, #0d0607 18%, #080506 100%)',
        color: '#ffffff',
        padding: '140px 6vw 100px 6vw',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      {/* Background Subtle Watermark */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20%',
          right: '-5%',
          opacity: 0.03,
          pointerEvents: 'none',
          userSelect: 'none'
        }}
      >
        <InteractiveWordmark size="giant" />
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Section Pill Tag */}
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
            marginBottom: '20px'
          }}
        >
          <span>01 / ABOUT M.A. NARENDAR DASS</span>
        </div>

        {/* Mandatory Headline */}
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(2.4rem, 6vw, 5.2rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            maxWidth: '1100px',
            marginBottom: '48px'
          }}
        >
          THINK. BUILD. BREAK. UNDERSTAND.
        </h2>

        {/* 2-Column Editorial Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '60px',
            alignItems: 'start',
            marginBottom: '72px'
          }}
        >
          {/* Left Column: Authentic Biography */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '1.25rem',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.95)',
                fontWeight: 400
              }}
            >
              I am <strong style={{ color: '#ffffff', fontWeight: 700 }}>M.A. Narendar Dass</strong>, an ECE engineering student with a growing focus on cybersecurity, red teaming, and embedded systems.
            </p>

            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '1.05rem',
                lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.72)',
                fontWeight: 300
              }}
            >
              My interests sit squarely at the intersection of <span style={{ color: '#ffffff' }}>hardware, software, and security</span>. I enjoy understanding how systems work, finding where they can fail, and exploring how those weaknesses can be approached from a security perspective.
            </p>

            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '1.05rem',
                lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.72)',
                fontWeight: 300
              }}
            >
              A core part of my personality is <span style={{ color: '#ffffff', fontWeight: 600 }}>anticipatory thinking</span> — I naturally explore multiple possible outcomes before making a decision. Whether examining an attack path or designing an embedded circuit, I map the branching consequences first.
            </p>

            {/* Student Note Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 20px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                marginTop: '12px'
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#22c55e',
                  boxShadow: '0 0 10px #22c55e'
                }}
              />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.78rem',
                  color: 'rgba(255, 255, 255, 0.8)'
                }}
              >
                Actively building skills, hands-on projects, and security research foundations.
              </span>
            </div>
          </div>

          {/* Right Column: 4 Intersecting Pillars */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px'
            }}
          >
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '16px',
                    padding: '24px 20px',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.28)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: 'rgba(234, 17, 11, 0.15)',
                      border: '1px solid rgba(234, 17, 11, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px'
                    }}
                  >
                    <Icon size={20} color="#ffffff" />
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      letterSpacing: '0.04em',
                      color: '#ffffff',
                      marginBottom: '8px'
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '0.82rem',
                      lineHeight: 1.6,
                      color: 'rgba(255, 255, 255, 0.65)',
                      margin: 0
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
