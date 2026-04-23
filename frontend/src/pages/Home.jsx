import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaArrowRight, FaCode, FaBrain, FaMobileAlt, FaShieldAlt,
  FaUsers, FaRocket, FaClock, FaStar, FaLinkedin, FaGithub,
  FaServer, FaChartLine, FaSitemap, FaRobot
} from 'react-icons/fa';

import AgenticAIService from "../components/services/AgenticAIService";
import TheBlueprint from "../components/home/TheBlueprint";

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const mainServices = [
  { icon: <FaCode />, title: "Full Stack Web", desc: "Next.js, MERN, MySQL, MongoDB, Redis, Supabase, Firebase — scalable platforms built for millions of users.", color: "from-sky-400 to-blue-600", shadow: "shadow-sky-500/20", link: "/service/web-dev" },
  { icon: <FaMobileAlt />, title: "Mobile Apps", desc: "Cross-platform iOS & Android apps with React Native, Expo, Firebase, and full Node.js backend.", color: "from-emerald-400 to-teal-600", shadow: "shadow-emerald-500/20", link: "/service/mobile-app" },
  { icon: <FaRobot />, title: "Agentic AI Systems", desc: "Autonomous multi-agent workflows using LangGraph, LangChain, CrewAI with tool calling and RAG.", color: "from-violet-400 to-purple-600", shadow: "shadow-violet-500/20", link: "/service/agentic-ai" },
  { icon: <FaSitemap />, title: "n8n Automation", desc: "Self-hosted n8n pipelines, automation bots, and SaaS integrations replacing 100% manual work.", color: "from-orange-400 to-rose-600", shadow: "shadow-orange-500/20", link: "/service/n8n-automation" },
  { icon: <FaBrain />, title: "AI / ML / DL", desc: "Full-spectrum AI — GenAI, LLMs, Deep Learning (TensorFlow/PyTorch), Computer Vision, and NLP.", color: "from-fuchsia-400 to-violet-600", shadow: "shadow-fuchsia-500/20", link: "/service/ai-ml-dl" },
  { icon: <FaShieldAlt />, title: "Cybersecurity", desc: "Penetration testing, VAPT, OWASP audits, API security scanning, and secure code reviews.", color: "from-red-400 to-rose-600", shadow: "shadow-red-500/20", link: "/service/cyber-security" },
  { icon: <FaServer />, title: "Cloud & DevOps", desc: "AWS, Docker, Kubernetes, CI/CD pipelines, Redis workers, Nginx — zero-downtime infrastructure.", color: "from-amber-400 to-orange-600", shadow: "shadow-amber-500/20", link: "/service/cloud-devops" },
  { icon: <FaChartLine />, title: "Data Science", desc: "ETL pipelines, predictive ML models, A/B testing, BI dashboards, and FastAPI model deployment.", color: "from-blue-400 to-sky-600", shadow: "shadow-blue-500/20", link: "/service/data-science" },
];

const whyUs = [
  { icon: <FaUsers />, title: "Elite Engineering Team", desc: "Led by 4 co-founders with deep expertise in full-stack dev and AI systems." },
  { icon: <FaRocket />, title: "Bleeding-Edge Stack", desc: "We deploy using Next.js 15, React 19, LangGraph, and decentralized tech." },
  { icon: <FaClock />, title: "Agile & Rapid", desc: "Continuous CI/CD deployment with rapid weekly sprint deliveries." },
  { icon: <FaStar />, title: "Production Grade", desc: "Zero-downtime architecture with exhaustive test coverage and docs." }
];

const projects = [
  { title: "PLM & ECO Platform", badge: "🏆 Top 8% - Hackathon", desc: "Real-time Product Lifecycle Management system with intelligent workflows.", tech: ["Node.js", "React", "FastAPI", "Socket.io"], gradient: "from-sky-500/20 to-blue-500/5", border: "hover:border-sky-500/50" },
  { title: "Premium Resort PMS", badge: "✅ Enterprise Client", desc: "End-to-end management for a 50-room resort handling real-time inventory.", tech: ["React", "Express", "MongoDB", "Python"], gradient: "from-emerald-500/20 to-teal-500/5", border: "hover:border-emerald-500/50" },
  { title: "Autonomous AI Agent", badge: "🤖 RAG System", desc: "Multi-agent architecture capable of fully autonomous customer resolution.", tech: ["LangChain", "FastAPI", "Pinecone", "Redis"], gradient: "from-indigo-500/20 to-purple-500/5", border: "hover:border-indigo-500/50" }
];

const team = [
  { name: "Parth Kachariya", role: "CEO & AI Architect", image: "/parth.png", linkedin: "https://www.linkedin.com/in/parth-kachariya-12a423383/", github: "https://github.com/KpCodeTech" },
  { name: "Pal Kaswala", role: "COO & Operations", image: "/pal.png", linkedin: "https://www.linkedin.com/in/pal-kaswala-9a0696265/", github: "https://github.com/pal4706" },
  { name: "Yashvi Nakrani", role: "CMO & Branding", image: "/yashvi.png", linkedin: "https://www.linkedin.com/in/yashvi-nakrani-8aa4333a7/", github: "https://github.com/yashvi-24" },
  { name: "Jay Devganiya", role: "CTO & Architecture", image: "/jay.png", linkedin: "http://linkedin.com/in/jay-devganiya-86a293303/", github: "https://github.com/jaydevganiya18" }
];

const Home = () => {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="bg-[#020617] text-slate-100 font-sans overflow-x-hidden min-h-screen">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90svh] md:min-h-[100svh] flex flex-col justify-center pt-24 md:pt-16 pb-16 px-5 sm:px-8">
        <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[800px] bg-sky-600/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] max-w-[900px] bg-indigo-600/10 blur-[150px] rounded-full" />
        </motion.div>

        <div className="container mx-auto z-10 relative max-w-6xl">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-4xl">
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/5 border border-white/10 text-sky-400 text-xs sm:text-sm font-semibold tracking-wider font-display mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
              Pioneering Enterprise AI
            </span>
            
            <h1 className="text-[2.2rem] leading-tight sm:text-5xl md:text-8xl font-bold mb-6 md:mb-8 md:leading-[1.05] tracking-tight font-display">
              Architecting<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500">
                Digital Futures.
              </span>
            </h1>
            
            <p className="text-slate-400 text-base sm:text-lg md:text-2xl max-w-2xl leading-relaxed mb-10 font-light pr-4">
              We engineer intelligent, scalable software systems. From autonomous AI agents to mission-critical web applications for the modern enterprise.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 max-w-[280px] sm:max-w-none">
              <Link to="/contact" className="group relative w-full sm:w-max px-8 py-4 bg-white text-slate-950 font-bold text-sm sm:text-base rounded-xl overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all flex justify-center items-center text-center">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Initiate Project <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link to="/projects" className="w-full sm:w-max px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm sm:text-base rounded-xl transition-all backdrop-blur-sm flex justify-center items-center text-center">
                Explore Logic
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SERVICES MATRIX --- */}
      <section className="py-16 md:py-24 px-5 sm:px-8 relative z-10 border-t border-white/5 bg-[#020617]/50">
        <div className="container mx-auto max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeIn} className="mb-12 md:mb-20">
            <h2 className="text-3xl md:text-6xl font-bold font-display mb-4 md:mb-6 tracking-tight">Core <span className="text-sky-400">Capabilities</span></h2>
            <p className="text-slate-400 max-w-2xl text-base md:text-lg">From enterprise web & mobile to Agentic AI, n8n automation, ML/DL, cybersecurity, cloud DevOps, and data science — we build it all.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {mainServices.map((service, i) => (
              <motion.div key={i} variants={fadeIn} className="group relative">
                <Link to={service.link} className={`block h-full p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl bg-[#0f172a]/80 backdrop-blur-md border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden ${service.shadow}`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-bl-[100px] z-0 blur-2xl"></div>
                  
                  <div className={`relative z-10 w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br ${service.color} p-0.5 mb-4 md:mb-6 shadow-lg`}>
                    <div className="w-full h-full bg-[#020617] rounded-[10px] md:rounded-[14px] flex items-center justify-center text-base md:text-xl text-white group-hover:bg-transparent transition-colors duration-300">
                      {service.icon}
                    </div>
                  </div>
                  
                  <h3 className="relative z-10 text-sm md:text-lg font-bold text-white mb-1.5 md:mb-3 font-display group-hover:text-sky-300 transition-colors leading-snug">{service.title}</h3>
                  <p className="relative z-10 text-[11px] md:text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors hidden sm:block">{service.desc}</p>
                  
                  <div className="relative z-10 mt-4 md:mt-6 flex items-center text-xs md:text-sm font-semibold text-white/40 group-hover:text-white transition-colors">
                    Explore <FaArrowRight className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- WHY US (Split layout with stats) --- */}
      <section className="py-16 md:py-24 px-5 sm:px-8 relative z-10 bg-[#020617]">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="lg:col-span-5">
              <h2 className="text-3xl md:text-5xl font-bold font-display mb-4 md:mb-6 tracking-tight leading-tight">
                Architectural <br className="hidden md:block"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">Excellence</span>
              </h2>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8 md:mb-10">
                We bridge the gap between business logic and high-performance computing. We don't just write code; we engineer scalable systems designed for the next decade.
              </p>
              <div className="space-y-4 md:space-y-6">
                {whyUs.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 md:gap-4 p-4 md:p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="text-sky-400 text-lg md:text-xl mt-0.5 p-2 bg-sky-500/10 rounded-lg">{item.icon}</div>
                    <div>
                      <h4 className="text-white text-sm md:text-base font-semibold mb-1">{item.title}</h4>
                      <p className="text-slate-400 text-xs md:text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="lg:col-span-7 grid grid-cols-2 gap-4 mt-4 lg:mt-0">
              <StatCard value="100%" label="Delivery Rate" delay={0.1} />
              <StatCard value="24/7" label="System Monitoring" delay={0.2} />
              <StatCard value="< 50ms" label="API Latency" delay={0.3} />
              <StatCard value="4" label="Elite Engineers" delay={0.4} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- FEATURED LOGIC --- */}
      <section className="py-16 md:py-24 px-5 sm:px-8 relative z-10 border-t border-white/5 bg-[#020617]/50">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <h2 className="text-3xl md:text-5xl font-bold font-display mb-4 tracking-tight">Engineering <span className="text-indigo-400">Showcase</span></h2>
              <p className="text-slate-400 max-w-xl text-base md:text-lg">Mission-critical systems deployed to production.</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <Link to="/projects" className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-all">
                View All Systems <FaArrowRight />
              </Link>
            </motion.div>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {projects.map((p, i) => (
              <motion.div key={i} variants={fadeIn} className={`group relative p-6 md:p-8 rounded-3xl bg-[#0f172a]/50 backdrop-blur-sm border border-white/10 transition-all duration-500 overflow-hidden ${p.border}`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                
                <div className="relative z-10 flex justify-between items-start mb-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-[10px] md:text-xs font-semibold backdrop-blur-md border border-white/5 shadow-xl">{p.badge}</span>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                    <FaArrowRight className="-rotate-45" />
                  </div>
                </div>
                
                <h3 className="relative z-10 text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 font-display leading-tight">{p.title}</h3>
                <p className="relative z-10 text-sm text-slate-400 mb-6 md:mb-8 leading-relaxed h-auto md:h-16">{p.desc}</p>
                
                <div className="relative z-10 flex flex-wrap gap-2">
                  {p.tech.map((t, j) => (
                    <span key={j} className="text-[10px] md:text-xs px-2.5 py-1 rounded-lg bg-[#020617] text-slate-300 border border-white/5 font-medium">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- THE TEAM --- */}
      <section className="py-16 md:py-24 px-5 sm:px-8 relative z-10 bg-[#020617]">
        <div className="container mx-auto max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-4 md:mb-6 tracking-tight">The <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">Architects</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">System engineers, AI researchers, and UI experts dedicated to building perfect logic.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {team.map((member, i) => (
              <motion.div key={i} variants={fadeIn} className="group relative rounded-3xl overflow-hidden bg-[#0A0F1D] border border-white/5 hover:border-white/20 transition-colors max-w-sm mx-auto sm:max-w-none w-full">
                <div className="aspect-square w-full relative overflow-hidden bg-[#0A0F1D]">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80 z-10"></div>
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" loading="lazy" />
                  
                  {/* Hover Socials */}
                  <div className="absolute inset-x-0 bottom-6 z-20 flex justify-center gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <a href={member.linkedin} className="w-10 h-10 rounded-full bg-white text-slate-950 flex items-center justify-center hover:bg-sky-400 hover:text-white transition-colors shadow-lg"><FaLinkedin /></a>
                    <a href={member.github} className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center border border-white/20 hover:bg-white hover:text-slate-950 transition-colors shadow-lg"><FaGithub /></a>
                  </div>
                </div>
                
                <div className="p-5 md:p-6 text-center relative z-20 -mt-6 bg-gradient-to-t from-[#020617] via-[#020617] to-transparent pt-6 border-t border-white/5">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1 font-display">{member.name}</h3>
                  <p className="text-[10px] md:text-xs tracking-widest uppercase font-semibold text-sky-400">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- EXTENDED COMPONENTS --- */}
      <AgenticAIService />
      <TheBlueprint />

      {/* --- CTA SECTION --- */}
      <section className="py-20 md:py-32 px-5 sm:px-8 text-center relative overflow-hidden border-t border-white/5 bg-[#020617]/50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] md:w-[80vw] h-[120vw] md:h-[80vw] max-w-[600px] aspect-square bg-sky-600/10 rounded-full blur-[120px] md:blur-[150px] pointer-events-none"></div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <span className="inline-block py-1.5 px-3 md:px-4 rounded-full bg-white/5 border border-white/10 text-white text-[10px] md:text-xs font-semibold tracking-wider font-display mb-6 md:mb-8">
            DEPLOYMENT READY
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-8 tracking-tight font-display max-w-[90vw]">
            Initialize <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">Operation.</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg lg:text-xl mb-10 md:mb-12 leading-relaxed px-4 md:px-0">
            Stop deliberating. Start executing. Let LogixWaveAI architect the software solution your business needs to dominate the market.
          </p>
          <div className="w-full px-4 sm:px-0 sm:w-auto">
            <Link to="/contact" className="w-full flex justify-center items-center text-center px-6 md:px-10 py-4 md:py-5 bg-white text-slate-950 font-bold text-sm md:text-lg rounded-xl hover:bg-sky-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] md:hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
              Schedule Architecture Review
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

const StatCard = ({ value, label, delay }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: delay }}
    viewport={{ once: true }}
    className="flex flex-col justify-center p-5 md:p-8 rounded-2xl md:rounded-3xl bg-[#0f172a]/60 backdrop-blur-sm border border-white/5 w-full hover:border-white/20 transition-colors"
  >
    <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-1 md:mb-2 font-display">{value}</div>
    <div className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest">{label}</div>
  </motion.div>
);

export default Home;
