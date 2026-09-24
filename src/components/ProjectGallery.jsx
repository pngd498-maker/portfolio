import React, { useState } from 'react';
import { ExternalLink, Cpu, ShieldCheck, Terminal, ArrowUpRight } from 'lucide-react';

export default function ProjectGallery() {
  const [selectedProject, setSelectedProject] = useState(0);

  const projects = [
    {
      id: 0,
      title: 'Smart Attendance System',
      category: 'Embedded Systems & Automation',
      tag: 'HARDWARE / ECE',
      desc: 'An automated attendance logging system built using an embedded microcontroller board, sensor verification modules, real-time status display, and diagnostic LEDs.',
      explored: [
        'Hardware wiring and sensor signal conditioning',
        'State-machine validation and debounce logic',
        'Peripheral bus communication for display module',
        'Physical system reliability and error indicator states'
      ],
      icon: Cpu,
      accentColor: '#3b82f6',
      githubPlaceholder: 'https://github.com/#placeholder-smart-attendance'
    },
    {
      id: 1,
      title: 'Laser Lock Door',
      category: 'Optical Hardware Security & Embedded Control',
      tag: 'SECURITY / EMBEDDED',
      desc: 'A physical security access-control project utilizing a focused laser beam, optical detection receiver, microcontroller logic controller, and electronic lock actuation.',
      explored: [
        'Optical beam alignment and threshold detection',
        'Microcontroller interrupt handling and lock decisions',
        'Electronic lock triggering and power isolation',
        'Fail-safe behavioral states and perimeter monitoring'
      ],
      icon: ShieldCheck,
      accentColor: '#ea110b',
      githubPlaceholder: 'https://github.com/#placeholder-laser-lock-door'
    },
    {
      id: 2,
      title: 'Vulnerability Checking / AI Outcome Analysis',
      category: 'Cybersecurity & Predictive Analysis',
      tag: 'CYBERSECURITY / AI',
      desc: 'Exploration of system vulnerability assessment methodologies paired with AI-assisted outcome modeling to evaluate branching risk paths and mitigation priorities.',
      explored: [
        'Attack-surface mapping and weakness identification',
        'Simulating multi-stage escalation consequences via AI',
        'Evaluating defensive hardening versus risk exposure',
        'Anticipatory analysis of software and system failure modes'
      ],
      icon: Terminal,
      accentColor: '#10b981',
      githubPlaceholder: 'https://github.com/#placeholder-vulnerability-ai-analysis'
    }
  ];

  return (
    <section
      id="projects"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
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
          <span>05 / PROJECT SHOWCASE</span>
        </div>

        {/* Section Headline */}
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            maxWidth: '1100px',
            marginBottom: '20px'
          }}
        >
          CURATED TECHNICAL EXPLORATIONS
        </h2>

        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '1.05rem',
            lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.65)',
            maxWidth: '680px',
            marginBottom: '54px'
          }}
        >
          Hands-on implementations demonstrating practical electronics engineering, hardware logic, and predictive cybersecurity modeling.
        </p>

        {/* 3 Project Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '32px'
          }}
        >
          {projects.map((proj, idx) => {
            const Icon = proj.icon;
            const isHovered = selectedProject === idx;

            return (
              <div
                key={proj.id}
                onMouseEnter={() => setSelectedProject(idx)}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: isHovered
                    ? `1px solid ${proj.accentColor}`
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '24px',
                  padding: '36px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isHovered
                    ? `0 16px 40px rgba(0, 0, 0, 0.6), 0 0 20px ${proj.accentColor}22`
                    : 'none'
                }}
              >
                <div>
                  {/* Category & Tag */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '20px'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.72rem',
                        letterSpacing: '0.12em',
                        color: proj.accentColor,
                        fontWeight: 700
                      }}
                    >
                      {proj.tag}
                    </span>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.72rem',
                        color: 'rgba(255, 255, 255, 0.4)'
                      }}
                    >
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 800,
                      fontSize: '1.75rem',
                      lineHeight: 1.2,
                      letterSpacing: '-0.02em',
                      color: '#ffffff',
                      marginBottom: '14px'
                    }}
                  >
                    {proj.title}
                  </h3>

                  {/* Subtitle */}
                  <div
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '0.86rem',
                      fontWeight: 500,
                      color: 'rgba(255, 255, 255, 0.85)',
                      marginBottom: '16px'
                    }}
                  >
                    {proj.category}
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '0.92rem',
                      lineHeight: 1.6,
                      color: 'rgba(255, 255, 255, 0.65)',
                      marginBottom: '28px'
                    }}
                  >
                    {proj.desc}
                  </p>

                  {/* What I Explored List */}
                  <div style={{ marginBottom: '32px' }}>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.68rem',
                        letterSpacing: '0.12em',
                        color: 'rgba(255, 255, 255, 0.5)',
                        textTransform: 'uppercase',
                        marginBottom: '12px'
                      }}
                    >
                      WHAT I EXPLORED:
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {proj.explored.map((item, eIdx) => (
                        <li
                          key={eIdx}
                          style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: '0.82rem',
                            color: 'rgba(255, 255, 255, 0.75)',
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: '8px'
                          }}
                        >
                          <span style={{ color: proj.accentColor, fontSize: '0.9rem' }}>›</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Link / Placeholder */}
                <div
                  style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingTop: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.72rem',
                      color: 'rgba(255, 255, 255, 0.45)'
                    }}
                  >
                    PROJECT REPOSITORY
                  </span>

                  <a
                    href="#contact"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#ffffff',
                      textDecoration: 'none',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#ffffff';
                      e.currentTarget.style.color = '#000000';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                  >
                    <span>EXPLORE ARCHITECTURE</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
