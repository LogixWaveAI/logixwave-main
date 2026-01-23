import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const MagicCursor = () => {
  // Mouse position tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Smooth spring animation configuration
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      // Cursor ko center mein rakhne ke liye (width/2, height/2 minus karo)
      // Assuming cursor width/height is 32px (w-8)
      cursorX.set(e.clientX - 16); 
      cursorY.set(e.clientY - 16);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Smart Hover Detection
    const handleMouseOver = (e) => {
      // Check agar element clickable hai (Link, Button, Input, etc.)
      const target = e.target;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' ||
        target.closest('a') || 
        target.closest('button') ||
        target.style.cursor === 'pointer';

      setIsHovering(isClickable);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Mobile devices par cursor mat dikhao
  if (typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        // Base styling
        border: '2px solid #22d3ee', // Cyan-400
        boxShadow: '0 0 10px rgba(34, 211, 238, 0.5)',
      }}
      animate={{
        scale: isClicking ? 0.8 : isHovering ? 1.8 : 1, // Click pe chhota, Hover pe bada
        backgroundColor: isHovering ? 'rgba(34, 211, 238, 0.2)' : 'transparent', // Hover pe thoda fill hoga
        borderColor: isHovering ? 'transparent' : '#22d3ee', // Hover pe border gayab karke fill dikhayenge
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
    />
  );
};

export default MagicCursor;