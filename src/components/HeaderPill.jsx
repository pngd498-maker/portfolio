import React, { useState } from 'react';

export default function HeaderPill({
  onSelectWork = () => {},
  onSelectAbout = () => {},
  onSelectContact = () => {}
}) {
  const [activeTab, setActiveTab] = useState('WORK');

  const navItems = [
    { label: 'WORK', action: () => { setActiveTab('WORK'); onSelectWork(); } },
    { label: 'ABOUT', action: () => { setActiveTab('ABOUT'); onSelectAbout(); } },
    { label: 'CONTACT', action: () => { setActiveTab('CONTACT'); onSelectContact(); } }
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: '28px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        pointerEvents: 'auto'
      }}
    >
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 8px',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.22)',
          borderRadius: '9999px',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.18)'
        }}
      >
        {navItems.map((item) => {
          const isActive = activeTab === item.label;
          return (
            <button
              key={item.label}
              onClick={item.action}
              className="interactive"
              style={{
                background: isActive ? '#ffffff' : 'transparent',
                color: isActive ? '#ea110b' : '#ffffff',
                border: 'none',
                borderRadius: '9999px',
                padding: '9px 22px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: '0.82rem',
                letterSpacing: '0.12em',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: isActive ? '0 4px 14px rgba(0, 0, 0, 0.15)' : 'none'
              }}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
