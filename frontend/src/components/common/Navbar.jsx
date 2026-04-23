import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Team", path: "/team" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  /* Mobile menu animations */
  const menuVariants = {
    hidden: { opacity: 0, height: 0 },
    show: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.4, ease: "anticipate", staggerChildren: 0.1, delayChildren: 0.1 },
    },
    exit: { opacity: 0, height: 0, transition: { duration: 0.3, ease: "easeInOut" } }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#020617]/85 backdrop-blur-xl border-b border-white/10 shadow-lg pb-3 pt-5 lg:py-4"
          : "bg-transparent pb-5 pt-8 lg:py-6"
      }`}
    >
      <div className="container mx-auto px-5 md:px-8 max-w-7xl flex justify-between items-center">
        {/* LOGO */}
        <Link to="/" className="flex items-center group z-50 relative">
          <motion.img
            whileHover={{ scale: 1.05, filter: "drop-shadow(0 0 12px rgba(14,165,233,0.6))" }}
            src={logo}
            alt="LogixWaveAI"
            className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-all"
          />
        </Link>

        {/* DESKTOP MENU (Pill Style) */}
        <div className="hidden lg:flex items-center p-1.5 bg-[#0f172a]/60 backdrop-blur-md rounded-full border border-white/10 shadow-inner">
          <div className="flex space-x-1 relative">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 overflow-hidden"
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill-bg"
                      className="absolute inset-0 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full z-0"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 font-display tracking-wide ${isActive ? "text-white" : "text-slate-300 hover:text-white"}`}>
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </div>
          
          <div className="ml-4 pl-4 border-l border-white/10">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 rounded-full bg-white text-slate-950 font-semibold text-sm hover:bg-slate-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]"
              >
                Let's Talk
              </motion.button>
            </Link>
          </div>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="lg:hidden text-slate-200 focus:outline-none z-50 p-2 relative bg-white/5 rounded-full border border-white/10"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="show"
            exit="exit"
            variants={menuVariants}
            className="lg:hidden absolute top-full left-0 w-full bg-[#020617]/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
            style={{ originY: 0 }}
          >
            <div className="px-5 py-6 flex flex-col space-y-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div key={link.name} variants={itemVariants}>
                    <Link
                      to={link.path}
                      className={`block px-4 py-3 rounded-xl font-display text-base font-medium tracking-wide transition-colors ${
                        isActive 
                          ? "bg-gradient-to-r from-sky-500/20 to-indigo-500/20 text-sky-400 border border-sky-500/30" 
                          : "text-slate-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div variants={itemVariants} className="pt-4 mt-2 border-t border-white/10">
                <Link to="/contact" className="block w-full">
                  <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-sky-500/25 transition-all outline-none">
                    Let's Talk
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
