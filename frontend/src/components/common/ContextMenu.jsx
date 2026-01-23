import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaBriefcase, FaEnvelope, FaMusic, FaVolumeMute, FaRedo, FaLink, FaTimes } from 'react-icons/fa';
import { useAudio } from '../../context/AudioContext'; // Music control ke liye

const ContextMenu = () => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);
  const navigate = useNavigate();
  
  // Music Context se functions lo
  const { isPlaying, playAudio, pauseAudio } = useAudio();

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault(); // Browser ka default menu roko
      
      // Menu position adjust karo taaki screen se bahar na jaye
      let x = e.pageX;
      let y = e.pageY;
      
      // Window width/height check (basic adjustment)
      if (x + 200 > window.innerWidth) x = window.innerWidth - 220;
      if (y + 300 > window.innerHeight) y = window.innerHeight - 320;

      setPosition({ x, y });
      setVisible(true);
    };

    const handleClick = () => setVisible(false); // Kahin aur click karne par band ho jaye

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClick);
    document.addEventListener('scroll', handleClick); // Scroll karne par bhi band ho

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('scroll', handleClick);
    };
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setVisible(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link Copied to Clipboard!"); // Simple feedback
    setVisible(false);
  };

  const toggleMusic = () => {
      if(isPlaying) pauseAudio();
      else playAudio();
      setVisible(false);
  }

  const refreshPage = () => {
      window.location.reload();
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.1 }}
          className="fixed z-[9999] w-56 bg-slate-900/95 backdrop-blur-xl border border-cyan-500/30 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] overflow-hidden py-2"
          style={{ top: position.y, left: position.x }}
        >
          {/* Header */}
          <div className="px-4 py-2 border-b border-white/10 mb-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">System Controls</span>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col">
            
            {/* Navigation Group */}
            <MenuItem icon={<FaHome />} text="Home" onClick={() => handleNavigation('/')} />
            <MenuItem icon={<FaBriefcase />} text="Projects" onClick={() => handleNavigation('/projects')} />
            <MenuItem icon={<FaEnvelope />} text="Contact Us" onClick={() => handleNavigation('/contact')} />
            
            <div className="h-[1px] bg-white/10 my-1 mx-3"></div>

            {/* Actions Group */}
            <MenuItem 
                icon={isPlaying ? <FaVolumeMute className="text-red-400"/> : <FaMusic className="text-green-400"/>} 
                text={isPlaying ? "Mute Music" : "Play Music"} 
                onClick={toggleMusic} 
            />
            <MenuItem icon={<FaLink />} text="Copy Page Link" onClick={handleCopyLink} />
            <MenuItem icon={<FaRedo />} text="Refresh System" onClick={refreshPage} />
            
            <div className="h-[1px] bg-white/10 my-1 mx-3"></div>
            
            <MenuItem icon={<FaTimes className="text-red-500"/>} text="Close Menu" onClick={() => setVisible(false)} />

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Sub-component for clean code
const MenuItem = ({ icon, text, onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors w-full text-left group"
  >
    <span className="text-lg group-hover:scale-110 transition-transform">{icon}</span>
    <span className="font-medium">{text}</span>
  </button>
);

export default ContextMenu;