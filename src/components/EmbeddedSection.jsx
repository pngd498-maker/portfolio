import React, { useRef, useEffect, useState } from 'react';
import { Cpu, Zap, Lock, Unlock, Eye, Layers, Radio, Sparkles } from 'lucide-react';

export default function EmbeddedSection() {
  const canvasRef = useRef(null);
  const [explodedRatio, setExplodedRatio] = useState(0); // 0 (assembled) to 1 (fully separated)
  const [hoveredComponent, setHoveredComponent] = useState(null);
  const [laserActive, setLaserActive] = useState(true);
  const [doorUnlocked, setDoorUnlocked] = useState(false);
  const [laserStep, setLaserStep] = useState(0);

  // Laser lock door sequential cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setLaserStep((prev) => (prev + 1) % 5);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  // PCB Canvas with interactive exploded view & cursor lighting
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const handleResize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', handlePointerMove);

    // Interactive PCB Components definition
    const pcbItems = [
      { name: 'MICROCONTROLLER', role: 'Main Processing Unit', x: 0, y: 0, w: 120, h: 120, color: '#18181b', stroke: '#3f3f46' },
      { name: 'POWER REGULATOR', role: 'Voltage Step-down & Filter', x: -160, y: -90, w: 60, h: 50, color: '#27272a', stroke: '#52525b' },
      { name: 'OPTICAL SENSOR IC', role: 'Signal Comparator', x: 150, y: -70, w: 50, h: 70, color: '#27272a', stroke: '#52525b' },
      { name: 'GPIO CONNECTOR', role: 'Peripheral Bus Interface', x: -170, y: 80, w: 90, h: 40, color: '#27272a', stroke: '#52525b' },
      { name: 'STATUS DISPLAY BUS', role: 'I2C / SPI Communication', x: 140, y: 70, w: 80, h: 50, color: '#27272a', stroke: '#52525b' }
    ];

    const render = () => {
      animId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw subtle circuit substrate
      ctx.fillStyle = '#0a0d0c';
      ctx.fillRect(cx - 240, cy - 160, 480, 320);
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.25)';
      ctx.lineWidth = 1;
      ctx.strokeRect(cx - 240, cy - 160, 480, 320);

      // Draw copper trace patterns
      ctx.strokeStyle = 'rgba(234, 17, 11, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      // Horizontal & vertical traces
      for (let i = -200; i <= 200; i += 40) {
        ctx.moveTo(cx + i, cy - 140);
        ctx.lineTo(cx + i + 20, cy - 100);
        ctx.lineTo(cx + i + 20, cy + 120);
      }
      ctx.stroke();

      // Draw dynamic cursor light sweep
      const grad = ctx.createRadialGradient(mouse.x, mouse.y, 10, mouse.x, mouse.y, 220);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.12)');
      grad.addColorStop(0.5, 'rgba(234, 17, 11, 0.08)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw PCB components with exploded separation offsets
      const sep = explodedRatio * 60;

      pcbItems.forEach((item) => {
        // Offset outwards in exploded view
        const dirX = item.x === 0 ? 0 : item.x > 0 ? 1 : -1;
        const dirY = item.y === 0 ? 0 : item.y > 0 ? 1 : -1;

        const posX = cx + item.x + dirX * sep - item.w / 2;
        const posY = cy + item.y + dirY * sep - item.h / 2;

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fillRect(posX + 4, posY + 4, item.w, item.h);

        // Component body
        ctx.fillStyle = item.color;
        ctx.fillRect(posX, posY, item.w, item.h);
        ctx.strokeStyle = item.stroke;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(posX, posY, item.w, item.h);

        // IC pins
        ctx.fillStyle = '#71717a';
        for (let p = 6; p < item.w - 6; p += 12) {
          ctx.fillRect(posX + p, posY - 3, 6, 3);
          ctx.fillRect(posX + p, posY + item.h, 6, 3);
        }

        // Label inside or above
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(item.name, posX + item.w / 2, posY + item.h / 2 + 4);
      });
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handlePointerMove);
    };
  }, [explodedRatio]);

  return (
    <section
      id="embedded"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: '#060405',
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
          <Cpu size={14} />
          <span>04 / EMBEDDED SYSTEMS & HARDWARE</span>
        </div>

        {/* Mandatory Headline */}
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            maxWidth: '1200px',
            marginBottom: '20px'
          }}
        >
          HARDWARE HAS A LANGUAGE.
        </h2>

        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '1.1rem',
            lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '740px',
            marginBottom: '48px'
          }}
        >
          Bridging electronics logic, microcontroller firmware, and sensor integration through real hands-on systems.
        </p>

        {/* 13. Interactive PCB Canvas with Exploded View Controls */}
        <div
          style={{
            position: 'relative',
            background: 'rgba(12, 8, 10, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            overflow: 'hidden',
            marginBottom: '64px',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.65)'
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              padding: '16px 24px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '16px',
              background: 'rgba(255, 255, 255, 0.02)'
            }}
          >
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#fff' }}>
                Interactive 3D-Inspired PCB Substrate
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.5)' }}>
                Move cursor across board to modulate copper trace specular lighting.
              </div>
            </div>

            {/* Exploded View Slider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Layers size={16} color="rgba(255, 255, 255, 0.6)" />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                EXPLODED VIEW: {Math.round(explodedRatio * 100)}%
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={explodedRatio}
                onChange={(e) => setExplodedRatio(parseFloat(e.target.value))}
                style={{ cursor: 'pointer', accentColor: '#ea110b', width: '120px' }}
              />
            </div>
          </div>

          {/* Canvas */}
          <div style={{ height: '360px', position: 'relative' }}>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
          </div>
        </div>

        {/* 11 & 12. Two Featured Embedded Hardware Projects */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '32px'
          }}
        >
          {/* Project 1: Smart Attendance System */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px',
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.72rem',
                  letterSpacing: '0.14em',
                  color: '#ea110b',
                  textTransform: 'uppercase',
                  marginBottom: '10px'
                }}
              >
                EMBEDDED SYSTEM PROJECT 01
              </div>
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: '1.75rem',
                  color: '#ffffff',
                  marginBottom: '16px'
                }}
              >
                SMART ATTENDANCE SYSTEM
              </h3>
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: '24px'
                }}
              >
                An embedded attendance automation project integrating microcontroller control, peripheral input sensors, real-time status display module, indicator LEDs, and interconnect wiring.
              </p>

              {/* Hardware Subcomponents */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
                {['Microcontroller Board', 'Verification Sensors', 'Status Display Module', 'Indicator LEDs & Wiring'].map((item) => (
                  <div
                    key={item}
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.72rem',
                      color: 'rgba(255, 255, 255, 0.85)'
                    }}
                  >
                    • {item}
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.72rem',
                color: 'rgba(255, 255, 255, 0.45)',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: '14px'
              }}
            >
              FOCUS: EMBEDDED AUTOMATION · SENSOR INTEGRATION
            </div>
          </div>

          {/* Project 2: Laser Lock Door */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px',
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.72rem',
                  letterSpacing: '0.14em',
                  color: '#ea110b',
                  textTransform: 'uppercase',
                  marginBottom: '10px'
                }}
              >
                EMBEDDED HARDWARE PROJECT 02
              </div>
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: '1.75rem',
                  color: '#ffffff',
                  marginBottom: '16px'
                }}
              >
                LASER LOCK DOOR
              </h3>
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: '20px'
                }}
              >
                An optical security mechanism using an active laser beam emitter, optical detection sensor, microcontroller evaluation logic, and electronic door actuator.
              </p>

              {/* 12. Animated Flow: LASER BEAM → DETECTION → MICROCONTROLLER → DECISION → LOCK / UNLOCK */}
              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '24px'
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.68rem',
                    color: '#ea110b',
                    marginBottom: '8px'
                  }}
                >
                  SYSTEM EXECUTION PIPELINE
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
                  {[
                    'LASER BEAM',
                    'DETECTION',
                    'MICROCONTROLLER',
                    'DECISION',
                    laserStep % 2 === 0 ? 'LOCKED' : 'UNLOCKED'
                  ].map((stepName, sIdx) => {
                    const isStepActive = laserStep === sIdx;
                    return (
                      <React.Fragment key={stepName}>
                        <span
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '0.7rem',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            background: isStepActive ? '#ea110b' : 'rgba(255, 255, 255, 0.08)',
                            color: isStepActive ? '#ffffff' : 'rgba(255, 255, 255, 0.75)',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          {stepName}
                        </span>
                        {sIdx < 4 && <span style={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: '0.7rem' }}>→</span>}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>

            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.72rem',
                color: 'rgba(255, 255, 255, 0.45)',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: '14px'
              }}
            >
              FOCUS: OPTICAL SECURITY · LOGIC CONTROLLERS
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
