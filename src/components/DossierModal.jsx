import React, { useState } from 'react';
import { X, Send, Check, Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DossierModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ea110b', '#ffffff', '#f5cf68']
      });
    } catch (err) {}
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div 
        className="glass-panel"
        style={{
          background: 'rgba(26, 6, 6, 0.96)',
          borderColor: 'rgba(255, 255, 255, 0.25)',
          maxWidth: '560px',
          width: '100%',
          padding: '36px 40px',
          color: '#ffffff',
          position: 'relative'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: '#ffffff',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div className="glass-pill" style={{ display: 'inline-flex', marginBottom: '14px' }}>
          <span>PRIVATE COMMISSIONS DOSSIER</span>
        </div>

        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: '1.8rem',
          letterSpacing: '-0.02em',
          marginBottom: '10px'
        }}>
          Request Executive Portfolio
        </h2>

        <p style={{
          fontSize: '0.88rem',
          color: 'rgba(255, 255, 255, 0.75)',
          lineHeight: 1.5,
          marginBottom: '24px'
        }}>
          Direct access to full case studies, proprietary high-performance canvas engine benchmarks, and commercial commission availability for Q4 2026.
        </p>

        {submitted ? (
          <div style={{
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            borderRadius: '12px',
            padding: '24px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: '#10b981',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto'
            }}>
              <Check size={24} />
            </div>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.2rem', marginBottom: '6px' }}>
              Dossier Dispatched
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'rgba(255,255,255,0.8)' }}>
              The encrypted portfolio dossier has been sent to <strong>{email}</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <input
              type="email"
              required
              placeholder="Enter corporate or studio email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 18px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              className="btn-luxury"
              style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
            >
              <span>DISPATCH PRIVATE DOSSIER</span>
              <Send size={15} />
            </button>
          </form>
        )}

        {/* Contact direct coordinates */}
        <div style={{
          marginTop: '28px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.74rem',
          color: 'rgba(255,255,255,0.6)'
        }}>
          <div>COMMISSIONS: <span style={{ color: '#fff' }}>prince@avan.luxury</span></div>
          <div>LOCATION: <span style={{ color: '#fff' }}>PARIS · MILAN · TOKYO · NYC</span></div>
          <div>ENCRYPTION: <span style={{ color: '#f5cf68' }}>TLS 1.3 / SHA-256</span></div>
        </div>
      </div>
    </div>
  );
}
