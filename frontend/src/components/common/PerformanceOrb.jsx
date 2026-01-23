import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTachometerAlt, FaShieldAlt, FaRocket, FaTimes } from 'react-icons/fa';

const PerformanceOrb = () => {
  const [fps, setFps] = useState(60);
  const [latency, setLatency] = useState(50);
  const [score, setScore] = useState(95);
  const [isOpen, setIsOpen] = useState(false); 
  
  // --- CLIENT-SIDE FPS SIMULATION/CHECK ---
  useEffect(() => {
    let lastTime = performance.now();
    let frame = 0;

    function refreshLoop() {
      const now = performance.now();
      const deltaTime = now - lastTime;
      const currentFps = Math.round(1000 / deltaTime);
      
      if (frame % 5 === 0) {
        setFps(Math.min(60, currentFps)); 
      }
      
      if (currentFps > 55) {
          setLatency(Math.max(30, Math.floor(Math.random() * 20 + 30)));
          setScore(Math.min(99, Math.floor(Math.random() * 5 + 95)));
      } else if (currentFps < 40) {
          setLatency(Math.floor(Math.random() * 100 + 150));
          setScore(Math.floor(Math.random() * 10 + 70));
      }

      lastTime = now;
      frame++;
      const animationId = requestAnimationFrame(refreshLoop);
      return () => cancelAnimationFrame(animationId);
    }

    const animationId = requestAnimationFrame(refreshLoop);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const getStatusColor = (val) => {
    return val > 90 ? 'text-green-400' : val > 75 ? 'text-yellow-400' : 'text-red-400';
  };

  return (
    <motion.div
      layout
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={isOpen ? { scale: 0.98 } : { scale: 0.95 }}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      
      onClick={!isOpen ? () => setIsOpen(true) : undefined} 
      
      className={`fixed bottom-6 left-6 z-40 p-4 shadow-2xl transition-all duration-300 cursor-grab active:cursor-grabbing 
        ${isOpen 
            ? 'w-60 h-auto rounded-2xl bg-slate-900/70 backdrop-blur-xl border border-cyan-500/30' 
            // UPDATED SIZE CLASSES HERE:
            : 'h-12 w-12 md:h-14 md:w-14 rounded-full bg-cyan-600 shadow-[0_0_20px_rgba(6,182,212,0.8)] flex items-center justify-center cursor-pointer'
        }`}
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          // --- EXPANDED VIEW (Details) ---
          <motion.div 
            key="expanded" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="flex flex-col h-full"
          >
            <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <FaRocket className="text-cyan-400" /> Monitor
              </h3>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }} 
                className="p-1 text-slate-400 hover:text-white rounded-full transition-colors cursor-pointer"
              >
                <FaTimes size={14} />
              </button>
            </div>

            <div className="text-center mb-3">
                 <span className={`text-4xl font-black ${getStatusColor(score)}`}>{score}<span className="text-sm">%</span></span>
                 <p className="text-xs text-slate-500 uppercase tracking-widest">Score</p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 flex items-center gap-1">
                  <FaTachometerAlt className="text-sm" /> FPS
                </span>
                <span className={`font-bold ${getStatusColor(fps)}`}>
                  {Math.round(fps)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-400 flex items-center gap-1">
                  <FaShieldAlt className="text-sm" /> Latency
                </span>
                <span className={`font-bold ${getStatusColor(100 - (latency / 2))}`}>
                  {latency}ms
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          // --- COLLAPSED VIEW (Round Icon) ---
          <motion.div key="collapsed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Icon size ko bhi thoda adjust kiya hai taaki fit lage (20px) */}
            <FaTachometerAlt size={20} className="text-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PerformanceOrb;