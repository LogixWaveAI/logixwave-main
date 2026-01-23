import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCode, FaLaptopCode, FaCheckCircle } from 'react-icons/fa'; 

// Components
import TechMarquee from "../components/home/TechMarquee";
import TheBlueprint from "../components/home/TheBlueprint";
import TechCapabilities from "../components/TechCapabilities"; 

// Data
import { servicesData } from "../constants/services";

// Variants for Animation
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const Home = () => {
  return (
    <div className="bg-[#020617] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* 1. NEW STATIC HERO SECTION (Replaces Slider) */}
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto text-center relative z-10 max-w-5xl">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <span className="inline-block py-1 px-3 rounded-full bg-slate-900/50 border border-white/10 text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-md">
              LogixWaveAI LLP
            </span>
            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-tight tracking-tighter">
              WE ENGINEER <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                DIGITAL DOMINANCE
              </span>
            </h1>
            <p className="text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-light mb-10">
              We go beyond building software. As a <strong>Strategic Technology Partner</strong>, we unify <strong> Generative AI</strong>, <strong>Cybersecurity</strong>, <strong>and Scalable Web Architecture</strong> to drive future-ready solutions.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-6">
              <Link to="/contact" className="px-8 py-4 bg-white text-black font-bold text-lg rounded-full hover:bg-cyan-50 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                Start Your Project
              </Link>
              <Link to="/projects" className="px-8 py-4 bg-slate-900 border border-white/10 text-white font-bold text-lg rounded-full hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group">
                View Case Studies <FaArrowRight className="group-hover:translate-x-1 transition-transform"/>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. TECH MARQUEE (Seamless Connector) */}
      <div className="border-t border-white/5 bg-[#020617]">
        <TechMarquee />
      </div>

      {/* 3. ABOUT THE COMPANY (New Big Section) */}
      <section className="py-32 bg-[#020617] relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                More Than Code <br/>
                <span className="text-cyan-400">We Build Assets</span>
              </h2>
              <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
                <p>
                  At <strong>LogixWaveAI</strong>, we believe that software should be an asset, not a liability. 
                  Founded by 4 visionaries, we bring together the raw power of <strong>Full Stack Engineering</strong> with the futuristic capabilities of <strong>AI & Data Science</strong>.
                </p>
                <p>
                  Whether it's securing your infrastructure with <strong>Ethical Hacking</strong> protocols or building a  
                  <strong> React Native</strong> app that scales to millions, we execute with military precision.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-10">
                <div className="p-4 bg-slate-900 rounded-xl border border-white/5">
                  <div className="text-3xl font-black text-white mb-1">100%</div>
                  <div className="text-xs text-slate-500 uppercase font-bold">Project Delivery</div>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-white/5">
                  <div className="text-3xl font-black text-white mb-1">24/7</div>
                  <div className="text-xs text-slate-500 uppercase font-bold">System Support</div>
                </div>
              </div>
            </motion.div>

            {/* Right: Visual */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 blur-[100px] opacity-20"></div>
              <div className="relative bg-slate-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                <div className="space-y-6">
                  <FeatureRow title="Generative AI Integration" desc="Custom LLMs & RAG Pipelines" />
                  <FeatureRow title="MERN Stack Architecture" desc="Scalable, Fast, & Secure" />
                  <FeatureRow title="Cross-Platform Mobile" desc="iOS & Android (React Native)" />
                  <FeatureRow title="Cyber Security Audits" desc="VAPT & Offensive Security" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SERVICES GRID (Clickable & Pro) */}
      <section className="py-32 relative bg-[#020617]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Expertise</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              We specialize in the technologies that drive the modern world. Click on any service to explore our capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service) => (
              <Link to={`/service/${service.id}`} key={service.id} className="group">
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="h-full p-8 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-6xl text-${service.color}-500`}>
                    {service.icon}
                  </div>
                  
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl text-white mb-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">
                    {service.subtitle}
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {service.shortDesc}
                  </p>

                  <span className="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:gap-3 transition-all">
                    Explore Service <FaArrowRight className="text-cyan-500" />
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROCESS BLUEPRINT */}
      <div className="border-t border-white/5 bg-[#020617]">
        <TheBlueprint />
      </div>

      {/* 6. TECH CAPABILITIES (Interactive Cards) */}
      <TechCapabilities />

      {/* 7. FINAL CTA */}
      <section className="py-32 text-center bg-[#020617] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="relative z-10">
          <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tight">
            Ready to <span className="text-cyan-400">Disrupt?</span>
          </h2>
          <Link to="/contact" className="inline-block px-10 py-5 bg-white text-black font-bold text-xl rounded-full hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]">
            Let's Talk Business
          </Link>
        </div>
      </section>

    </div>
  );
};

const FeatureRow = ({ title, desc }) => (
  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
    <div className="mt-1 text-cyan-400"><FaCheckCircle /></div>
    <div>
      <h4 className="text-white font-bold">{title}</h4>
      <p className="text-sm text-slate-400">{desc}</p>
    </div>
  </div>
);

export default Home;