import React from 'react';
import { Outlet } from 'react-router-dom';

// --- COMPONENTS ---
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

// --- WIDGETS & FX ---
import PerformanceOrb from '../components/common/PerformanceOrb';
import HackerTerminal from '../components/common/HackerTerminal';
import MagicCursor from '../components/common/MagicCursor';
import ContextMenu from '../components/common/ContextMenu';
import ParticleBackground from '../components/common/ParticleBackground';

// --- AUDIO SYSTEM ---
import { AudioProvider } from '../context/AudioContext';
import GlobalAudioPlayer from '../components/common/GlobalAudioPlayer';

const MainLayout = () => {
  return (
    <AudioProvider>
      {/* Global Container:
        - min-h-screen: Full height ensure karne ke liye
        - bg-slate-950: Base dark theme
        - cursor-none: Default cursor chhupa diya (MagicCursor use hoga)
        - selection: Text select karne par cyan color aayega
      */}
      <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500 selection:text-white cursor-none relative overflow-x-hidden">
        
        {/* 1. UTILITIES (Top Level) */}
        <MagicCursor />
        <ContextMenu />

        {/* 2. CORE LAYOUT */}
        <Navbar />
        
        {/* Main Content Area (Z-index 10 taaki background ke upar rahe) */}
        <main className="relative z-10">
          <Outlet />
        </main>

        <Footer />
        
        {/* 3. FLOATING WIDGETS (UI Elements) */}
        <PerformanceOrb />
        <HackerTerminal />
        
        
        {/* 4. AUDIO SYSTEM */}
        <GlobalAudioPlayer /> 

        {/* 5. BACKGROUND FX (Lowest Layer) */}
        
        {/* Interactive Particles */}
        <div className="fixed inset-0 z-0 pointer-events-auto"> 
            <ParticleBackground />
        </div>

        {/* Static Grid Overlay for Depth */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-20"
             style={{
               backgroundImage: 'radial-gradient(circle at center, #1e293b 1px, transparent 1px)',
               backgroundSize: '24px 24px'
             }}
        ></div>

      </div>
    </AudioProvider>
  );
};

export default MainLayout;