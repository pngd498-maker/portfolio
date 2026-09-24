import React, { useState, useEffect } from 'react';

export default function Navbar({ onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'HERO' },
    { id: 'about', label: 'ABOUT' },
    { id: 'education', label: 'EDUCATION' },
    { id: 'cyber', label: 'CYBER' },
    { id: 'embedded', label: 'EMBEDDED' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'chess', label: 'CHESS' },
    { id: 'personality', label: 'POSSIBILITIES' },
    { id: 'contact', label: 'CONTACT' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Section tracking
      const scrollPos = window.scrollY + 220;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          zIndex: 900,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: scrolled ? '12px 36px' : '20px 42px',
          // When at top, transparent with ZERO backdrop-filter so character's head is NEVER clipped or blurred
          background: scrolled
            ? 'rgba(10, 6, 8, 0.88)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(255, 255, 255, 0.08)'
            : '1px solid transparent',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          boxSizing: 'border-box',
          pointerEvents: 'auto'
        }}
      >
        {/* Left Signature: Crisp PNG Monogram & Name */}
        <div
          onClick={() => scrollToSection('hero')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <div
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              border: '1px solid rgba(255, 255, 255, 0.28)',
              background: 'rgba(255, 255, 255, 0.08)',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 900,
              fontSize: '0.92rem',
              letterSpacing: '0.16em',
              color: '#ffffff',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
            }}
          >
            PNG
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: '0.78rem',
                letterSpacing: '0.14em',
                color: '#ffffff',
                textTransform: 'uppercase'
              }}
            >
              M.A. Narendar Dass
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 500,
                fontSize: '0.62rem',
                letterSpacing: '0.12em',
                color: 'rgba(255, 255, 255, 0.6)',
                textTransform: 'uppercase'
              }}
            >
              ECE · CYBERSECURITY
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav
          className="desktop-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '22px'
          }}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                style={{
                  position: 'relative',
                  background: 'none',
                  border: 'none',
                  padding: '6px 4px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.74rem',
                  fontWeight: isActive ? 700 : 400,
                  letterSpacing: '0.14em',
                  color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.72)',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                  textTransform: 'uppercase',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'rgba(255, 255, 255, 0.72)';
                }}
              >
                {item.label}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: -2,
                      left: 0,
                      width: '100%',
                      height: '2px',
                      background: '#ffffff',
                      boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)'
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          className="mobile-nav-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            padding: '8px'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 890,
            background: 'rgba(10, 6, 8, 0.96)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '24px'
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: "'Syne', sans-serif",
                fontSize: '1.6rem',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '0.12em',
                cursor: 'pointer'
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-nav-toggle {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
