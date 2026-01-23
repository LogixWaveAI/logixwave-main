import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../assets/logo.png'; 

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Mobile menu ke liye
  const location = useLocation();

  // Scroll hone par Glass effect lane ke liye logic
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Team', path: '/team' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // Framer Motion Variants for Mobile Menu
  const menuVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07, // Links ek-ek karke aayenge
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      // Increased z-50 for priority, refined shadow for depth
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent ${
        scrolled 
          ? 'bg-slate-950/90 backdrop-blur-xl border-slate-800/50 shadow-2xl py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* === BRAND LOGO (BIGGER & TEXT REMOVED) === */}
        <Link to="/" className="flex items-center group">
            {/* Logo size increased and attractive hover effect added */}
            <img 
              src={logo} 
              alt="KPCODETECH" 
              className="h-12 md:h-14 w-auto object-contain transform transition-transform duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" 
            />
            {/* Text branding removed as requested */}
        </Link>

        {/* === DESKTOP MENU (Pill-style Tabs) === */}
        <div className="hidden md:flex items-center space-x-2 p-1 bg-slate-900/50 rounded-full border border-slate-700/50 shadow-inner">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.name} 
                to={link.path}
                className="relative group py-2 px-4 rounded-full transition-all duration-300"
              >
                {/* Active Link Pill Background */}
                {isActive && (
                    <motion.div 
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full shadow-lg shadow-cyan-500/30"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                )}
                
                {/* Link Text */}
                <span className={`relative z-10 text-sm font-semibold tracking-wide transition-colors ${
                  isActive ? 'text-white' : 'text-slate-300 group-hover:text-cyan-300'
                }`}>
                  {link.name}
                </span>
              </Link>
            );
          })}
          
          {/* Hire Us Button with Pulsing Glow */}
          <Link to="/contact" className="ml-6">
            <motion.button 
              animate={{ 
                boxShadow: [
                  '0 0 15px rgba(6,182,212,0.3)', 
                  '0 0 25px rgba(6,182,212,0.6)', 
                  '0 0 15px rgba(6,182,212,0.3)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="px-6 py-2.5 rounded-full border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all duration-300 font-semibold"
            >
              Let's Talk
            </motion.button>
          </Link>
        </div>

        {/* === MOBILE MENU BUTTON === */}
        <button 
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* === MOBILE DROPDOWN (Animation ke sath) === */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={menuVariants}
            className="md:hidden bg-slate-900 border-b border-slate-800 overflow-hidden"
          >
            <motion.div className="flex flex-col items-center py-6 space-y-6">
              {navLinks.map((link) => (
                <motion.div 
                    key={link.name} 
                    variants={itemVariants}
                >
                    <Link 
                        to={link.path} 
                        onClick={() => setIsOpen(false)}
                        className={`text-lg font-medium ${location.pathname === link.path ? 'text-cyan-400' : 'text-slate-300 hover:text-white'}`}
                    >
                        {link.name}
                    </Link>
                </motion.div>
              ))}
              <motion.div variants={itemVariants} className="mt-4">
                 <Link to="/contact">
                    <button className="px-6 py-2.5 rounded-full bg-cyan-600 text-white font-semibold shadow-lg hover:bg-cyan-500 transition-colors">
                        Let's Talk
                    </button>
                  </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;