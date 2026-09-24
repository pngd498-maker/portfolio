import React, { useState } from 'react';
import { Mail, Send, Copy, Check, ArrowUpRight, Code2, Globe } from 'lucide-react';
import InteractiveWordmark from './InteractiveWordmark';

function GithubIcon({ size = 18, color = '#ffffff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 18, color = '#ffffff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const emailPlaceholder = 'narendardass.contact@placeholder.edu';

  const copyEmail = () => {
    navigator.clipboard.writeText(emailPlaceholder);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const placeholders = [
    { name: 'GitHub', label: 'github.com/[placeholder-profile]', icon: GithubIcon, link: 'https://github.com/placeholder' },
    { name: 'LinkedIn', label: 'linkedin.com/in/[placeholder-profile]', icon: LinkedinIcon, link: 'https://linkedin.com/in/placeholder' },
    { name: 'Email', label: emailPlaceholder, icon: Mail, action: copyEmail }
  ];

  return (
    <footer
      id="contact"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '85vh',
        background: 'linear-gradient(180deg, #080506 0%, #15090b 50%, #060304 100%)',
        color: '#ffffff',
        padding: '120px 6vw 60px 6vw',
        boxSizing: 'border-box',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <div style={{ maxWidth: '1400px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Section Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '9999px',
            background: 'rgba(234, 17, 11, 0.1)',
            border: '1px solid rgba(234, 17, 11, 0.3)',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.74rem',
            letterSpacing: '0.14em',
            color: '#f87171',
            textTransform: 'uppercase',
            marginBottom: '20px'
          }}
        >
          <span>10 / GET IN TOUCH</span>
        </div>

        {/* Mandatory Headline */}
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(2.6rem, 6.5vw, 5.8rem)',
            lineHeight: 1.02,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            maxWidth: '1100px',
            marginBottom: '32px'
          }}
        >
          LET'S BUILD SOMETHING.
        </h2>

        {/* Wordmark Signature + Subtitle */}
        <div style={{ marginBottom: '48px' }}>
          <InteractiveWordmark size="large" />
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(1.2rem, 2.4vw, 1.8rem)',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#ffffff',
              marginTop: '16px',
              marginBottom: '8px'
            }}
          >
            M.A. NARENDAR DASS
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 500,
              fontSize: '0.88rem',
              letterSpacing: '0.18em',
              color: '#ea110b',
              textTransform: 'uppercase'
            }}
          >
            ECE · CYBERSECURITY · EMBEDDED SYSTEMS
          </div>
        </div>

        {/* Social / Contact Placeholders Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '72px'
          }}
        >
          {placeholders.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                onClick={item.action ? item.action : undefined}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.09)',
                  borderRadius: '16px',
                  padding: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(234, 17, 11, 0.5)';
                  e.currentTarget.style.background = 'rgba(234, 17, 11, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.09)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Icon size={18} color="#ffffff" />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: '#fff' }}>
                      {item.name}
                    </div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.5)' }}>
                      {item.label}
                    </div>
                  </div>
                </div>

                {item.action ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: copied ? '#22c55e' : '#fff' }}>
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem' }}>
                      {copied ? 'COPIED' : 'COPY'}
                    </span>
                  </div>
                ) : (
                  <ArrowUpRight size={16} color="rgba(255, 255, 255, 0.5)" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Bottomline */}
      <div
        style={{
          maxWidth: '1400px',
          width: '100%',
          margin: '0 auto',
          paddingTop: '32px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px'
        }}
      >
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.5)' }}>
          © {new Date().getFullYear()} M.A. NARENDAR DASS · ALL RIGHTS RESERVED
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.4)' }}>
          CONTINUOUS 128-FRAME CANVAS ENGINE · ZERO 3D CSS TRANSFORMS
        </div>
      </div>
    </footer>
  );
}
