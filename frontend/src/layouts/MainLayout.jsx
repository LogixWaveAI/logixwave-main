import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

// --- COMPONENTS ---
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

// --- WIDGETS & FX ---
import PerformanceOrb from "../components/common/PerformanceOrb";
import HackerTerminal from "../components/common/HackerTerminal";
import MagicCursor from "../components/common/MagicCursor";
import ContextMenu from "../components/common/ContextMenu";
import ParticleBackground from "../components/common/ParticleBackground";

// --- AUDIO SYSTEM ---
import { AudioProvider } from "../context/AudioContext";
import GlobalAudioPlayer from "../components/common/GlobalAudioPlayer";

const MainLayout = () => {
  // ── Mobile Detection: disable heavy FX on phones / tablets
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <AudioProvider>
      <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500 selection:text-white cursor-none relative overflow-x-hidden">
        {/* 1. UTILITIES */}
        <MagicCursor />
        <ContextMenu />

        {/* 2. CORE LAYOUT */}
        <Navbar />

        <main className="relative z-10">
          <Outlet />
        </main>

        <Footer />

        {/* 3. FLOATING WIDGETS — hidden on tiny phones if needed */}
        <PerformanceOrb />
        <HackerTerminal />

        {/* 4. AUDIO */}
        <GlobalAudioPlayer />

        {/* 5. BACKGROUND FX — completely disabled on mobile for performance */}
        {!isMobile && (
          <>
            {/* Particles — heavy canvas, skip on iPhone */}
            <div className="fixed inset-0 z-0 pointer-events-auto">
              <ParticleBackground />
            </div>

            {/* Dot Grid Overlay */}
            <div
              className="fixed inset-0 z-0 pointer-events-none opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at center, #1e293b 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
          </>
        )}
      </div>
    </AudioProvider>
  );
};

export default MainLayout;
