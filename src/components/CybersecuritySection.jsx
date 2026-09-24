import React, { useRef, useEffect, useState } from 'react';
import { ShieldCheck, Search, Terminal, Cpu, AlertTriangle, ArrowRight, Activity, Network } from 'lucide-react';

export default function CybersecuritySection() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(2); // VULNERABILITY active by default
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  // Conceptual Attack Path stages
  const attackPath = [
    {
      id: 0,
      step: '01',
      title: 'RECONNAISSANCE',
      desc: 'Mapping perimeter assets, open service ports, and system boundary configurations.',
      status: 'Passive Scan'
    },
    {
      id: 1,
      step: '02',
      title: 'DISCOVERY',
      desc: 'Identifying exposed attack surfaces, unpatched protocol endpoints, and input surfaces.',
      status: 'Surface Mapped'
    },
    {
      id: 2,
      step: '03',
      title: 'VULNERABILITY',
      desc: 'Isolating specific design flaws, logic inconsistencies, and missing boundary validations.',
      status: 'Weakness Isolated'
    },
    {
      id: 3,
      step: '04',
      title: 'AI ANALYSIS',
      desc: 'Simulating multi-scenario branching pathways to evaluate how failure propagates.',
      status: 'Outcome Modeling'
    },
    {
      id: 4,
      step: '05',
      title: 'POSSIBLE OUTCOME',
      desc: 'Formulating defensive hardening strategies and preemptive patch prioritization.',
      status: 'Risk Mitigation'
    }
  ];

  // Interactive 2D Canvas Network Environment (Zero CSS 3D transforms)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const observer = new IntersectionObserver(
      ([entry]) => setIsSectionVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    const handleResize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Node graph data
    const nodes = [];
    const numNodes = 26;
    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * (canvas.width || 800),
        y: Math.random() * (canvas.height || 450),
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2.5 + 2.5,
        isVulnerable: i % 5 === 0,
        pulse: Math.random() * Math.PI
      });
    }

    let mouse = { x: -1000, y: -1000 };
    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', handlePointerMove);

    const render = () => {
      animId = requestAnimationFrame(render);
      if (!isSectionVisible) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle connecting lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.22;
            ctx.strokeStyle = nodes[i].isVulnerable || nodes[j].isVulnerable
              ? `rgba(234, 17, 11, ${alpha * 1.5})`
              : `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.04;

        if (node.x < 10 || node.x > canvas.width - 10) node.vx *= -1;
        if (node.y < 10 || node.y > canvas.height - 10) node.vy *= -1;

        // Mouse reaction (subtle push)
        const mdx = node.x - mouse.x;
        const mdy = node.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 90 && mDist > 0) {
          node.x += (mdx / mDist) * 1.5;
          node.y += (mdy / mDist) * 1.5;
        }

        // Render node
        ctx.beginPath();
        const r = node.radius + Math.sin(node.pulse) * 0.8;
        ctx.arc(node.x, node.y, Math.max(1, r), 0, Math.PI * 2);
        if (node.isVulnerable) {
          ctx.fillStyle = '#ea110b';
          ctx.shadowColor = '#ea110b';
          ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
          ctx.shadowBlur = 4;
        }
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handlePointerMove);
      observer.disconnect();
    };
  }, [isSectionVisible]);

  return (
    <section
      id="cyber"
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: '#070405',
        color: '#ffffff',
        padding: '120px 6vw',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Section Pill Tag */}
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
            marginBottom: '18px'
          }}
        >
          <ShieldCheck size={14} />
          <span>03 / CYBERSECURITY & RED TEAMING</span>
        </div>

        {/* Mandatory Headline */}
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(2.3rem, 5.5vw, 4.8rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            maxWidth: '1200px',
            marginBottom: '24px'
          }}
        >
          BREAK THE SYSTEM. UNDERSTAND THE SYSTEM.
        </h2>

        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '1.1rem',
            lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.72)',
            maxWidth: '780px',
            marginBottom: '54px'
          }}
        >
          Exploring vulnerability assessment, attack-surface thinking, red teaming principles, and AI-assisted outcome exploration from an educational engineering perspective.
        </p>

        {/* 2-Column Layout: Interactive Terminal Visualization + Attack Path */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '32px',
            marginBottom: '64px'
          }}
        >
          {/* Left Panel: 2D Interactive Digital Network Environment */}
          <div
            style={{
              position: 'relative',
              background: 'rgba(14, 8, 10, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              overflow: 'hidden',
              minHeight: '440px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
            }}
          >
            {/* Terminal Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 20px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(255, 255, 255, 0.03)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} />
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.72rem',
                    color: 'rgba(255, 255, 255, 0.5)',
                    marginLeft: '8px'
                  }}
                >
                  SEC_SURFACE_MONITOR // REACTIVE_CANVAS
                </span>
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.7rem',
                  color: '#22c55e',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Activity size={12} />
                <span>ACTIVE NODES: 26</span>
              </div>
            </div>

            {/* Interactive Canvas Viewport */}
            <div style={{ position: 'relative', flex: 1, minHeight: '340px' }}>
              <canvas
                ref={canvasRef}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  cursor: 'crosshair'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '20px',
                  right: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.7rem',
                  color: 'rgba(255, 255, 255, 0.5)',
                  pointerEvents: 'none'
                }}
              >
                <span>[HOVER TO DISPLACE NODES]</span>
                <span style={{ color: '#ef4444' }}>● RED: VULNERABILITY MARKERS</span>
              </div>
            </div>
          </div>

          {/* Right Panel: Conceptual Attack Path Progression */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.75rem',
                  letterSpacing: '0.14em',
                  color: 'rgba(255, 255, 255, 0.5)',
                  textTransform: 'uppercase',
                  marginBottom: '16px'
                }}
              >
                CONCEPTUAL ATTACK-PATH ARCHITECTURE
              </div>
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: '1.5rem',
                  color: '#ffffff',
                  marginBottom: '24px'
                }}
              >
                Security Through Anticipation
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {attackPath.map((item) => {
                  const isCur = activeStep === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveStep(item.id)}
                      style={{
                        padding: '14px 18px',
                        borderRadius: '12px',
                        background: isCur ? 'rgba(234, 17, 11, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                        border: isCur ? '1px solid #ea110b' : '1px solid rgba(255, 255, 255, 0.08)',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            color: isCur ? '#ffffff' : 'rgba(255, 255, 255, 0.7)'
                          }}
                        >
                          {item.step} · {item.title}
                        </span>
                        <span
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '0.68rem',
                            color: isCur ? '#ef4444' : 'rgba(255, 255, 255, 0.4)'
                          }}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: '0.82rem',
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
        </div>

        {/* 10. AI + Vulnerability Analysis Interactive Visualization */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(20, 10, 12, 0.8) 0%, rgba(10, 5, 7, 0.95) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            padding: '40px',
            backdropFilter: 'blur(20px)'
          }}
        >
          <div style={{ marginBottom: '28px' }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.72rem',
                letterSpacing: '0.14em',
                color: '#ea110b',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '8px'
              }}
            >
              PREDICTIVE ANALYSIS PIPELINE
            </span>
            <h3
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                color: '#ffffff',
                margin: 0
              }}
            >
              AI-Assisted Possible Outcome Exploration
            </h3>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '0.92rem',
                color: 'rgba(255, 255, 255, 0.65)',
                marginTop: '8px'
              }}
            >
              Modeling how isolated software weaknesses branch into systemic risks using AI outcome prediction.
            </p>
          </div>

          {/* Linear Flow Diagram */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px',
              alignItems: 'center'
            }}
          >
            {[
              { label: 'INPUT', detail: 'Firmware binary / protocol telemetry' },
              { label: 'VULNERABILITY', detail: 'Identified buffer / auth bypass' },
              { label: 'AI ANALYSIS', detail: 'Branching tree consequence model' },
              { label: 'POSSIBLE OUTCOMES', detail: 'Privilege escalation / Denial' },
              { label: 'RISK / IMPACT', detail: 'Hardening & remediation priority' }
            ].map((stage, idx) => (
              <div
                key={idx}
                style={{
                  position: 'relative',
                  padding: '20px 16px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.65rem',
                    color: '#ea110b',
                    marginBottom: '4px'
                  }}
                >
                  STAGE 0{idx + 1}
                </div>
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    color: '#ffffff',
                    marginBottom: '6px'
                  }}
                >
                  {stage.label}
                </div>
                <div
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '0.74rem',
                    color: 'rgba(255, 255, 255, 0.55)',
                    lineHeight: 1.4
                  }}
                >
                  {stage.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
