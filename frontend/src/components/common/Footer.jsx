import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5,
      }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      variants={footerVariants}
      viewport={{ once: true, amount: 0.3 }}
      className="bg-slate-950 border-t border-slate-800 pt-16 pb-8 text-slate-400 relative overflow-hidden"
    >
        {/* Decorative Blur */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-cyan-900/10 blur-3xl pointer-events-none"></div>
        
      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- MAIN GRID & CTA --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info & Socials (Column 1) */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-bold text-white mb-4">LogixWave<span className="text-cyan-400">AI</span></h2>
            <p className="text-sm leading-relaxed mb-6">
              Architecting Intelligence. We bridge the gap between complex AI, secure MERN architectures, and scalable mobile solutions. Innovation meets Security here.
            </p>
            {/* Animated Social Icons */}
            <div className="flex space-x-3">
              <SocialIcon icon={<FaGithub />} link="https://github.com/LogixWaveAI" />
              <SocialIcon icon={<FaLinkedin />} link="https://linkedin.com/company/logixwaveai" />
              <SocialIcon icon={<FaInstagram />} link="https://www.instagram.com/logixwaveai/" />
            </div>
          </motion.div>

          {/* Links 1 (Column 2) - SERVICES */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Our Expertise</h3>
            <ul className="space-y-2 text-sm">
              <FooterLink text="Generative AI & RAG" path="/services" />
              <FooterLink text="Full Stack Web (MERN)" path="/services" />
              <FooterLink text="Mobile Apps (Native)" path="/services" />
              <FooterLink text="Cyber Security & Audits" path="/services" />
            </ul>
          </motion.div>

          {/* Links 2 (Column 3) - COMPANY */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Company</h3>
            <ul className="space-y-2 text-sm">
              <FooterLink text="About Us" path="/about" />
              <FooterLink text="Corporate Profile" path="/brochure" />
              <FooterLink text="Careers" path="/contact" />
              <FooterLink text="Contact Support" path="/contact" />
            </ul>
          </motion.div>

          {/* Newsletter / CTA (Column 4 - Pro Block) */}
          <motion.div variants={itemVariants} className="md:col-span-1">
             <div className="p-6 bg-slate-900 border border-cyan-500/20 rounded-2xl shadow-xl transition-all hover:shadow-cyan-500/20">
                <h3 className="text-cyan-400 font-bold mb-3 uppercase tracking-wider text-sm">Ready to Scale?</h3>
                <p className="text-sm mb-4 text-slate-300">
                    Get a personalized quote for your next AI or Web project.
                </p>
                <Link to="/contact">
                    <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] shadow-md">
                        Let's Talk Now <FaArrowRight />
                    </button>
                </Link>
             </div>
          </motion.div>
        </div>

        {/* --- COPYRIGHT --- */}
        <motion.div variants={itemVariants} className="border-t border-slate-800 pt-8 text-center text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} <span className="text-white font-semibold">LogixWaveAI LLP</span>. All rights reserved.</p>
          <p className="text-slate-500">Architecting Intelligence.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

// Reusable Components
const SocialIcon = ({ icon, link }) => (
  <motion.a 
    href={link || "#"} 
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -5, scale: 1.1 }}
    className="w-10 h-10 flex items-center justify-center bg-slate-800 border border-white/10 rounded-full text-slate-400 transition-all duration-300 hover:bg-cyan-500 hover:text-black shadow-lg"
  >
    {icon}
  </motion.a>
);

const FooterLink = ({ text, path }) => (
  <li>
    <Link to={path} className="hover:text-cyan-400 transition-colors text-slate-300 hover:ml-1 block duration-200">{text}</Link>
  </li>
);

export default Footer;