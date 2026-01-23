import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const MagicCursor = () => {
  // 1. Mobile State Check
  const [isMobile, setIsMobile] = useState(true); // Default true rakho taaki initial lag na ho

  useEffect(() => {
    const checkDevice = () => {
      // Modern tarika: Check agar touch device hai ya screen choti hai
      const mobile = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
      setIsMobile(mobile);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

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
    // 2. PERFORMANCE KILLER FIX:
    // Agar mobile hai, to Event Listener add hi mat karo!
    // Isse iPhone par CPU usage 0% ho jayega cursor ka.
    if (isMobile) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Smart Hover Detection
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.cursor-pointer'); // Class check bhi add kar diya

      setIsHovering(!!isClickable); // Convert to boolean
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
  }, [isMobile, cursorX, cursorY]);

  // 3. Render Logic: Mobile par kuch mat dikhao
  if (isMobile) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        // Base styling
        border: '2px solid #22d3ee', // Cyan-400
        boxShadow: '0 0 10px rgba(34, 211, 238, 0.5)',
      }}
      animate={{
        scale: isClicking ? 0.8 : isHovering ? 1.8 : 1,
        backgroundColor: isHovering ? 'rgba(34, 211, 238, 0.2)' : 'transparent',
        borderColor: isHovering ? 'transparent' : '#22d3ee',
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
    >
        {/* Optional: Center Dot for precision */}
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-cyan-400 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-60" />
    </motion.div>
  );
};

export default MagicCursor;