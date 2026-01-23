import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMusic, FaVolumeMute } from 'react-icons/fa';
import { useAudio } from '../../context/AudioContext';

const WelcomeMusicModal = () => {
  const { hasInteracted, playAudio, skipAudio } = useAudio();

  // Agar user ne pehle hi haan/naa kar diya hai, toh modal mat dikhao
  if (hasInteracted) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-slate-950/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative bg-slate-900/90 border border-cyan-500/30 p-8 rounded-3xl shadow-[0_0_40px_rgba(6,182,212,0.2)] max-w-md text-center overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-5xl text-cyan-400 mb-4 flex justify-center"
          >
            <FaMusic />
          </motion.div>

          <h2 className="text-2xl font-black text-white mb-3 tracking-wide uppercase">
            Enter the Experience
          </h2>
          <p className="text-slate-300 mb-8 leading-relaxed">
            For the most immersive journey through our portfolio, we recommend turning on the theme music.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row justify-center">
            <button
              onClick={playAudio}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-full shadow-lg hover:shadow-cyan-500/40 hover:scale-105 transition-all group"
            >
              <FaMusic className="group-hover:animate-bounce" /> Play Theme Song
            </button>
            
            <button
              onClick={skipAudio}
              className="flex items-center justify-center gap-2 px-8 py-3 border border-slate-700 text-slate-400 font-semibold rounded-full hover:bg-slate-800 hover:text-white transition-all"
            >
              <FaVolumeMute /> No Thanks
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WelcomeMusicModal;