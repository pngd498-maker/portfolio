import React, { useState } from 'react';
import { RotateCw, Activity, ChevronDown, ChevronUp } from 'lucide-react';

export default function TelemetryHUD({
  telemetry = {},
  autoOrbit = false,
  setAutoOrbit = () => {}
}) {
  const [expanded, setExpanded] = useState(false);

  const angle = parseFloat(telemetry.angleDeg || 0);
  const compassDir = telemetry.compassDir || 'INITIALIZING';
  const frameIndex = telemetry.frameIndex !== undefined ? telemetry.frameIndex : 0;
  const totalFrames = telemetry.totalFrames || 128;
  const fps = telemetry.fps || 60;
  const latency = telemetry.latencyMs || 14;

  return (
    <div 
      className="glass-panel"
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        left: 'auto',
        zIndex: 30,
        padding: '12px 16px',
        maxWidth: '340px',
        width: 'auto',
        color: '#ffffff',
        pointerEvents: 'auto'
      }}
    >
      {/* Header bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: expanded ? '1px solid rgba(255,255,255,0.12)' : 'none',
        paddingBottom: expanded ? '10px' : '0',
        marginBottom: expanded ? '12px' : '0',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={15} color="#ffffff" />
          <span style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: '0.78rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            Vector Telemetry
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.7rem',
            padding: '2px 6px',
            borderRadius: '4px',
            background: 'rgba(255,255,255,0.15)',
            color: '#10b981'
          }}>
            {fps} FPS
          </span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.7rem',
            padding: '2px 6px',
            borderRadius: '4px',
            background: 'rgba(255,255,255,0.15)',
            color: '#f5cf68'
          }}>
            {latency}ms
          </span>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '2px'
            }}
            aria-label="Toggle HUD details"
          >
            {expanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
        </div>
      </div>

      {/* Main HUD Row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Visual Mini Compass Radar */}
        <div style={{
          position: 'relative',
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          background: 'rgba(0,0,0,0.25)'
        }}>
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '1px',
            background: 'rgba(255,255,255,0.15)'
          }} />
          <div style={{
            position: 'absolute',
            width: '1px',
            height: '100%',
            background: 'rgba(255,255,255,0.15)'
          }} />

          {/* Compass needle pointing along vector */}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              transform: `rotate(${angle}deg)`,
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingRight: '2px'
            }}
          >
            <div style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#ffffff',
              boxShadow: '0 0 8px rgba(255,255,255,0.95)'
            }} />
          </div>
        </div>

        {/* Direction & Status Details */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '3px'
          }}>
            <span style={{
              display: 'inline-block',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#10b981',
              boxShadow: '0 0 8px #10b981'
            }} />
            <span style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: '0.8rem',
              letterSpacing: '0.04em',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {compassDir}
            </span>
          </div>

          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.7rem',
            color: 'rgba(255,255,255,0.7)',
            display: 'flex',
            gap: '10px'
          }}>
            <span>FRAME: <strong style={{ color: '#fff' }}>#{frameIndex}/{totalFrames}</strong></span>
            <span>DEG: <strong style={{ color: '#fff' }}>{angle}°</strong></span>
          </div>
        </div>

        {/* 360° Orbit Mode Toggle */}
        <button
          onClick={() => setAutoOrbit(!autoOrbit)}
          className="interactive"
          style={{
            background: autoOrbit ? '#ffffff' : 'rgba(255,255,255,0.1)',
            color: autoOrbit ? '#ea110b' : '#ffffff',
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: '9999px',
            padding: '7px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: '0.7rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap'
          }}
          title={autoOrbit ? 'Stop 360° Orbit Demo' : 'Play 360° Orbit Demo'}
        >
          <RotateCw size={12} className={autoOrbit ? 'spin-slow' : ''} />
          {autoOrbit ? 'ORBITING' : 'ORBIT'}
        </button>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div style={{
          marginTop: '12px',
          paddingTop: '10px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.68rem',
          color: 'rgba(255,255,255,0.75)',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          <div>ENGINE: <span style={{ color: '#fff' }}>128-Frame Continuous WebP Canvas</span></div>
          <div>SAMPLING: <span style={{ color: '#fff' }}>2.8125° Micro-Step Spacing</span></div>
          <div>INTERACTION: <span style={{ color: '#10b981' }}>Pure Continuous Flow (No Instant Snap)</span></div>
          <div>CSS 3D: <span style={{ color: '#10b981' }}>None (Body 100% Motionless)</span></div>
        </div>
      )}
    </div>
  );
}
