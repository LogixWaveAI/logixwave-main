import React from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.8,
        ease: "easeOut"
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
  };

  return (
    <footer className="relative bg-[#020617] border-t border-white/5 pt-20 pb-8 overflow-hidden z-10">
      {/* Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={footerVariants}
        viewport={{ once: true, amount: 0.1 }}
        className="container mx-auto px-5 md:px-8 max-w-7xl relative z-10"
      >
        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Info (Left Column) */}
          <motion.div variants={itemVariants} className="lg:col-span-4 flex flex-col items-start">
            <Link to="/" className="mb-6 block">
              <img src={logo} alt="LogixWaveAI" className="h-10 md:h-12 w-auto object-contain" />
            </Link>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 pr-4">
              Architecting Intelligence. We bridge the gap between complex AI systems, secure architectures, and elegant user interfaces to build the future of software.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-3">
              <SocialIcon icon={<FaGithub />} link="https://github.com/LogixWaveAI" />
              <SocialIcon icon={<FaLinkedin />} link="https://linkedin.com/company/logixwaveai" />
              <SocialIcon icon={<FaInstagram />} link="https://www.instagram.com/logixwaveai/" />
              <SocialIcon icon={<FaTwitter />} link="#" />
            </div>
          </motion.div>

          {/* Spacer on Desktop */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Links 1 - Expertise */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h3 className="text-white font-display font-semibold mb-6 tracking-wide">Expertise</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <FooterLink text="AI & Machine Learning" path="/service/ai-gen" />
              <FooterLink text="Enterprise Software" path="/service/web-dev" />
              <FooterLink text="Mobile Platforms" path="/service/mobile-app" />
              <FooterLink text="Cyber Security Security" path="/service/cyber-security" />
            </ul>
          </motion.div>

          {/* Links 2 - Company */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h3 className="text-white font-display font-semibold mb-6 tracking-wide">Company</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <FooterLink text="About Us" path="/about" />
              <FooterLink text="Our Projects" path="/projects" />
              <FooterLink text="Meet the Team" path="/team" />
              <FooterLink text="Contact Us" path="/contact" />
            </ul>
          </motion.div>

          {/* Call to Action Box */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h3 className="text-white font-display font-semibold mb-2 relative z-10">Start Your Project</h3>
              <p className="text-slate-400 text-xs mb-5 relative z-10">
                Ready to transform your business with custom software and AI? Let's talk.
              </p>
              <Link to="/contact" className="relative z-10 w-full group/btn flex items-center justify-center gap-2 py-3 px-4 bg-white text-slate-950 rounded-xl font-semibold text-sm hover:bg-slate-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]">
                Get a Quote
                <motion.span className="inline-block" whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <FaArrowRight className="text-xs" />
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <motion.div
          variants={itemVariants}
          className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-slate-500 font-medium"
        >
          <p>© {new Date().getFullYear()} LogixWaveAI. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

// Reusable Components
const SocialIcon = ({ icon, link }) => (
  <motion.a
    href={link || "#"}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -5, scale: 1.1, backgroundColor: "#0ea5e9", color: "#ffffff", borderColor: "#0ea5e9" }}
    className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-slate-400 transition-all duration-300"
  >
    {icon}
  </motion.a>
);

const FooterLink = ({ text, path }) => (
  <li>
    <Link
      to={path}
      className="inline-flex items-center group/link transition-colors duration-300 hover:text-sky-400"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-sky-500/50 mr-2 opacity-0 group-hover/link:opacity-100 transition-all duration-300 transform scale-50 group-hover/link:scale-100"></span>
      <span className="transform translate-x-0 group-hover/link:translate-x-1 transition-transform duration-300">
        {text}
      </span>
    </Link>
  </li>
);

export default Footer;
