import React, { useState } from 'react';
import CustomCursor from './components/CustomCursor';
import StartupScreen from './components/StartupScreen';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import EducationSection from './components/EducationSection';
import CybersecuritySection from './components/CybersecuritySection';
import EmbeddedSection from './components/EmbeddedSection';
import ProjectGallery from './components/ProjectGallery';
import ChessSection from './components/ChessSection';
import HobbiesSection from './components/HobbiesSection';
import PersonalitySection from './components/PersonalitySection';
import SkillsConstellation from './components/SkillsConstellation';
import ContactSection from './components/ContactSection';

export default function App() {
  const [startupComplete, setStartupComplete] = useState(false);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#070405',
        color: '#ffffff',
        overflowX: 'hidden'
      }}
    >
      {/* 1. Cinematic 1.5s Startup Screen Reveal */}
      <StartupScreen onComplete={() => setStartupComplete(true)} />

      {/* 2. Custom Magnetic Glowing Cursor with Trailing Aura */}
      <CustomCursor />

      {/* 3. Subtle Ambient Grain Texture Overlay */}
      <div className="bg-ambient-grain" />

      {/* 4. Minimal Luxury Navigation Bar */}
      <Navbar onNavigate={handleScrollTo} />

      {/* 5. Main Hero Section with 128-Frame OpenCV Canvas Pipeline */}
      <HeroSection
        onScrollToAbout={() => handleScrollTo('about')}
        onOpenContact={() => handleScrollTo('contact')}
      />

      {/* 6. Section 01: About Me (THINK. BUILD. BREAK. UNDERSTAND.) */}
      <AboutSection />

      {/* 7. Section 02: Chronological Education Timeline */}
      <EducationSection />

      {/* 8. Section 03: Cybersecurity & 2D Reactive Network Canvas */}
      <CybersecuritySection />

      {/* 9. Section 04: Embedded Systems & Interactive Exploded PCB */}
      <EmbeddedSection />

      {/* 10. Section 05: Project Showcase Gallery */}
      <ProjectGallery />

      {/* 11. Section 06: Chess (THINK THREE MOVES AHEAD / Runner-Up) */}
      <ChessSection />

      {/* 12. Section 07: Hobbies (OUTSIDE THE SCREEN) */}
      <HobbiesSection />

      {/* 13. Section 08: Personality (THINKING IN POSSIBILITIES) */}
      <PersonalitySection />

      {/* 14. Section 09: Skills Constellation Map */}
      <SkillsConstellation />

      {/* 15. Section 10: Contact / Ending (LET'S BUILD SOMETHING.) */}
      <ContactSection />
    </div>
  );
}
