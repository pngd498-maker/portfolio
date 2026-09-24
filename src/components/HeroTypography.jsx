import React from 'react';
import { ArrowUpRight, MessageCircle, FileText } from 'lucide-react';

export default function HeroTypography({
  onResumeClick = () => {},
  onContactClick = () => {}
}) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '44px',
        left: '48px',
        zIndex: 25,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        color: '#ffffff',
        pointerEvents: 'auto'
      }}
    >
      {/* "Hi, I'm" in clean, spaced modern sans-serif */}
      <span
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 600,
          fontSize: '1.05rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(255, 255, 255, 0.9)',
          marginBottom: '4px'
        }}
      >
        Hi, I'm
      </span>

      {/* Name in large, elegant cursive script with soft drop shadow */}
      <h1
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontWeight: 700,
          fontSize: 'clamp(4.2rem, 6.5vw, 6.4rem)',
          lineHeight: 1.0,
          margin: 0,
          padding: 0,
          color: '#ffffff',
          filter: 'drop-shadow(0 8px 24px rgba(0, 0, 0, 0.35))',
          letterSpacing: '0.02em',
          marginBottom: '14px'
        }}
      >
        Lohitha
      </h1>

      {/* Compact 3-line bio about Full Stack Development (max-width ~340px) */}
      <p
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 400,
          fontSize: '0.94rem',
          lineHeight: 1.55,
          color: 'rgba(255, 255, 255, 0.88)',
          maxWidth: '340px',
          marginBottom: '26px'
        }}
      >
        Full Stack Engineer orchestrating high-performance distributed architectures and ultra-fluid interactive web applications with sub-millisecond precision.
      </p>

      {/* Two stylish white pill buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Solid white Resume pill button with arrow icon */}
        <button
          onClick={onResumeClick}
          className="interactive"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#ffffff',
            color: '#ea110b',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: '0.88rem',
            letterSpacing: '0.04em',
            padding: '13px 26px',
            borderRadius: '9999px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.22)',
            transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease, background-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.22)';
          }}
        >
          <span>Resume</span>
          <ArrowUpRight size={16} strokeWidth={2.4} />
        </button>

        {/* Frosted glass / white border "Let's Talk" button */}
        <button
          onClick={onContactClick}
          className="interactive"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: '#ffffff',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: '0.88rem',
            letterSpacing: '0.04em',
            padding: '12px 24px',
            borderRadius: '9999px',
            border: '1.5px solid rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.24)';
            e.currentTarget.style.borderColor = '#ffffff';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.85)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <span>Let's Talk</span>
          <MessageCircle size={15} />
        </button>
      </div>
    </div>
  );
}
