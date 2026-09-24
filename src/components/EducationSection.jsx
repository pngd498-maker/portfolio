import React, { useState } from 'react';
import { BookOpen, Award, Cpu, GraduationCap, CheckCircle2 } from 'lucide-react';

export default function EducationSection() {
  const [activeStep, setActiveStep] = useState(2); // default to present

  const educationMilestones = [
    {
      id: 0,
      period: 'SECONDARY SCHOOL',
      year: '10th Standard',
      institution: 'ZPHS Boys School',
      score: '9.5 / 10',
      status: 'Completed',
      desc: 'Foundation in mathematics, sciences, and analytical problem-solving.',
      badge: 'Academic Distinction',
      visualType: 'school',
      icon: BookOpen
    },
    {
      id: 1,
      period: 'HIGHER SECONDARY',
      year: 'Intermediate',
      institution: 'Sri Vivekanandha Junior College',
      score: '91%',
      status: 'Completed',
      desc: 'Advanced mathematics, physics, and core scientific methodology.',
      badge: 'Academic Excellence',
      visualType: 'academic',
      icon: Award
    },
    {
      id: 2,
      period: 'UNDERGRADUATE',
      year: 'Present',
      institution: 'B.Tech — Electronics & Communication Engineering',
      score: 'Currently Pursuing B.Tech',
      status: 'Active Degree',
      desc: 'Specializing in hardware systems, signal processing, embedded architectures, and security analysis.',
      badge: 'In Progress',
      visualType: 'circuit',
      icon: Cpu
    }
  ];

  return (
    <section
      id="education"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: '#080506',
        color: '#ffffff',
        padding: '120px 6vw',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      {/* Background Subtle Grid */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          opacity: 0.4,
          pointerEvents: 'none'
        }}
      />

      <div style={{ maxWidth: '1300px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ marginBottom: '60px' }}>
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
              marginBottom: '16px'
            }}
          >
            <span>02 / ACADEMIC FOUNDATION</span>
          </div>

          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              margin: '0 0 16px 0'
            }}
          >
            CHRONOLOGICAL MILESTONES
          </h2>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '1.05rem',
              color: 'rgba(255, 255, 255, 0.65)',
              maxWidth: '640px',
              margin: 0
            }}
          >
            Real academic trajectory grounding theoretical precision and electronics engineering fundamentals.
          </p>
        </div>

        {/* Floating Vertical Timeline */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px'
          }}
        >
          {/* Vertical Connecting Track */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              bottom: '40px',
              left: '32px',
              width: '2px',
              background: 'linear-gradient(180deg, rgba(234, 17, 11, 0.5) 0%, rgba(255, 255, 255, 0.3) 50%, #22c55e 100%)',
              zIndex: 1
            }}
          />

          {educationMilestones.map((item) => {
            const isSelected = activeStep === item.id;
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                onClick={() => setActiveStep(item.id)}
                style={{
                  position: 'relative',
                  zIndex: 2,
                  display: 'grid',
                  gridTemplateColumns: '64px 1fr',
                  gap: '24px',
                  alignItems: 'start',
                  cursor: 'pointer'
                }}
              >
                {/* Milestone Node Icon */}
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: isSelected ? '#ea110b' : 'rgba(20, 10, 12, 0.95)',
                    border: isSelected
                      ? '2px solid #ffffff'
                      : '2px solid rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: isSelected
                      ? '0 0 24px rgba(234, 17, 11, 0.7)'
                      : 'none',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  <Icon size={24} color="#ffffff" />
                </div>

                {/* Milestone Content Card */}
                <div
                  style={{
                    background: isSelected
                      ? 'rgba(255, 255, 255, 0.06)'
                      : 'rgba(255, 255, 255, 0.02)',
                    border: isSelected
                      ? '1px solid rgba(255, 255, 255, 0.28)'
                      : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '20px',
                    padding: '28px 32px',
                    backdropFilter: 'blur(16px)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '24px',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  <div style={{ maxWidth: '640px' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '8px'
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '0.74rem',
                          letterSpacing: '0.14em',
                          color: '#ea110b',
                          fontWeight: 700,
                          textTransform: 'uppercase'
                        }}
                      >
                        {item.period} · {item.year}
                      </span>
                      <span
                        style={{
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '0.68rem',
                          fontFamily: "'JetBrains Mono', monospace",
                          background: item.id === 2 ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255, 255, 255, 0.1)',
                          color: item.id === 2 ? '#22c55e' : 'rgba(255, 255, 255, 0.8)',
                          border: item.id === 2 ? '1px solid rgba(34, 197, 94, 0.35)' : '1px solid rgba(255, 255, 255, 0.15)'
                        }}
                      >
                        {item.status}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 800,
                        fontSize: 'clamp(1.4rem, 2.4vw, 1.9rem)',
                        letterSpacing: '-0.02em',
                        color: '#ffffff',
                        margin: '0 0 8px 0'
                      }}
                    >
                      {item.institution}
                    </h3>

                    <p
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: '0.94rem',
                        lineHeight: 1.6,
                        color: 'rgba(255, 255, 255, 0.65)',
                        margin: 0
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>

                  {/* Score Display Callout */}
                  <div
                    style={{
                      background: 'rgba(0, 0, 0, 0.45)',
                      border: '1px solid rgba(255, 255, 255, 0.14)',
                      borderRadius: '16px',
                      padding: '16px 24px',
                      textAlign: 'right',
                      minWidth: '180px'
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.7rem',
                        letterSpacing: '0.12em',
                        color: 'rgba(255, 255, 255, 0.5)',
                        textTransform: 'uppercase',
                        marginBottom: '4px'
                      }}
                    >
                      ACADEMIC SCORE
                    </div>
                    <div
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 900,
                        fontSize: '1.75rem',
                        color: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.9)',
                        letterSpacing: '-0.02em'
                      }}
                    >
                      {item.score}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
