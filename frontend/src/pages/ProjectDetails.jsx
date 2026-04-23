import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import axios from 'axios';
import API_BASE from '../utils/api';
import { 
  FaGithub, FaExternalLinkAlt, FaArrowLeft, FaArrowRight, FaClock, 
  FaUserTie, FaLayerGroup, FaListUl, FaCheckCircle, FaLightbulb, 
  FaExclamationTriangle, FaCode, FaShareAlt, FaWhatsapp, FaVideo, FaImage 
} from 'react-icons/fa';

// --- 1. CODE BLOCK COMPONENT ---
const CodeBlock = ({ code }) => (
  <div className="bg-[#0f172a] rounded-xl overflow-hidden border border-white/5 shadow-2xl my-6 font-mono text-xs sm:text-sm relative group">
    <div className="flex items-center justify-between px-4 py-3 bg-[#020617]/80 border-b border-white/5 backdrop-blur-md">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-rose-500/80" />
        <div className="w-3 h-3 rounded-full bg-amber-500/80" />
        <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
      </div>
      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Snippet_Protocol.js</span>
    </div>
    <div className="p-5 overflow-x-auto custom-scrollbar text-slate-300">
      <pre className="leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  </div>
);

// --- 2. SMART IMAGE COMPONENT ---
const ProjectImage = ({ src, alt, className }) => {
  const [error, setError] = useState(false);
  return error ? (
    <div className={`flex items-center justify-center bg-slate-900 border border-white/5 ${className}`}>
      <div className="text-center p-4">
        <FaLayerGroup className="text-4xl text-slate-700 mx-auto mb-2" />
        <span className="text-slate-600 text-sm font-bold uppercase tracking-wider font-display">Image Error</span>
      </div>
    </div>
  ) : (
    <img src={src} alt={alt} className={className} onError={() => setError(true)} />
  );
};

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]); 
  const scaleX = useSpring(scrollY, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/projects/${id}`);
        setProject(data);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Error fetching project:", error);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const whatsAppNumber = "919327352530"; 
  const whatsAppMessage = project 
    ? `Hey LogixWaveAI, I'm interested in the architecture behind: ${project.title}.\nLink: ${window.location.href}` 
    : "Hello!";

  const handleShare = async () => {
    if (!project) return;
    const shareData = { title: project.title, text: `Check out this architecture: ${project.title}`, url: window.location.href };
    
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (err) { console.log(err); }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) return <div className="min-h-[100svh] bg-[#020617] flex items-center justify-center text-sky-400 font-display text-lg sm:text-xl uppercase tracking-widest animate-pulse font-semibold">Initializing Architecture...</div>;
  if (!project) return <div className="min-h-[100svh] bg-[#020617] flex items-center justify-center text-rose-500 font-display text-xl uppercase tracking-widest font-semibold">Project Data Not Found</div>;

  const displayHero = project.thumbnail || project.heroImage || project.image || '/fallback.jpg';
  const nextProjectId = project.nextId || null;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-sky-500/30 selection:text-white overflow-x-hidden font-sans pt-16 md:pt-24">
      
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 origin-left z-50" style={{ scaleX }} />

      {/* 1. HERO SECTION */}
      <div className="relative min-h-[40vh] sm:min-h-[50vh] md:h-[60vh] w-full overflow-hidden border-b border-white/5 rounded-b-[2rem] md:rounded-b-[3rem] shadow-2xl flex flex-col justify-end">
        
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#020617]"></div>
          <ProjectImage 
            src={displayHero} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-30 blur-[6px] sm:blur-[8px] scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/70 to-transparent"></div>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 container mx-auto max-w-7xl px-5 sm:px-6 pb-16 md:pb-24 flex flex-col justify-end h-full">
            <Link to="/projects" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors w-fit px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-sky-500/50 hover:bg-white/10 font-semibold text-sm">
              <FaArrowLeft /> System Architectures
            </Link>
            
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-4 md:mb-6 leading-tight tracking-tight drop-shadow-2xl font-display text-white break-words">
                    {project.title}
                </h1>
                
                <div className="flex flex-wrap gap-3 md:gap-4 text-[10px] sm:text-xs md:text-sm font-bold tracking-wider uppercase">
                    <span className="px-3 py-1.5 md:px-4 md:py-2 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.2)]">{project.category}</span>
                    {project.role && <span className="px-3 py-1.5 md:px-4 md:py-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.2)]">{project.role}</span>}
                </div>
            </motion.div>
        </div>
      </div>

      {/* 2. META BAR */}
      <div className="container mx-auto max-w-7xl relative z-20 -mt-6 md:-mt-10 px-5 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 bg-slate-900/95 border border-white/10 rounded-2xl md:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-2xl divide-x divide-y md:divide-y-0 divide-white/5">
          <InfoItem label="Entity" value={project.client} icon={<FaUserTie />} />
          <InfoItem label="Timeframe" value={project.duration} icon={<FaClock />} />
          <InfoItem label="Core Tech" value={project.techStack?.[0] || "Web"} icon={<FaLayerGroup />} />
          <InfoItem label="Designation" value={project.role} icon={<FaCode />} />
        </div>
      </div>

      {/* 3. MAIN CONTENT */}
      <div className="container mx-auto max-w-7xl px-5 sm:px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 relative z-10">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-8 space-y-16 sm:space-y-20">
          
          <Section title="System Vision" color="text-amber-400" icon={<FaLightbulb />}>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-light border-l-4 border-amber-500/30 pl-5 sm:pl-6 text-justify">
              {project.description}
            </p>
          </Section>

          {project.features && project.features.length > 0 && (
            <Section title="Key Protocols" color="text-sky-400" icon={<FaListUl />}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="bg-slate-900/40 p-5 rounded-2xl border border-white/5 hover:border-sky-500/30 transition-all hover:-translate-y-1 flex items-start gap-3 backdrop-blur-sm">
                    <FaCheckCircle className="text-sky-500 text-lg mt-0.5 shrink-0" />
                    <p className="text-slate-300 leading-relaxed text-sm">{feature}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          <Section title="Engineering Logic" color="text-indigo-400" icon={<FaCode />}>
            <div className="space-y-6 sm:space-y-8">
              {project.challenge && (
                <div className="bg-rose-500/5 p-6 sm:p-8 rounded-3xl border border-rose-500/10 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4 text-rose-400 font-bold uppercase tracking-wider text-xs sm:text-sm">
                    <FaExclamationTriangle /> Operational Obstacle
                  </div>
                  <p className="text-base sm:text-lg text-slate-300 leading-relaxed">"{project.challenge}"</p>
                </div>
              )}
              
              {project.solution && (
                <div className="bg-emerald-500/5 p-6 sm:p-8 rounded-3xl border border-emerald-500/10 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4 text-emerald-400 font-bold uppercase tracking-wider text-xs sm:text-sm">
                    <FaLightbulb /> Strategic Solution
                  </div>
                  <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">{project.solution}</p>
                  {project.codeSnippet && <CodeBlock code={project.codeSnippet} />}
                </div>
              )}
            </div>
          </Section>

          {/* --- GALLERY SECTION --- */}
          <div className="space-y-6 sm:space-y-8">
             <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mb-6 sm:mb-8 flex items-center gap-4">
                <span className="p-2 sm:p-3 rounded-xl bg-slate-900 border border-white/10 text-purple-400 text-xl"><FaImage /></span> 
                Visual Proof
             </h3>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {project.media && project.media.length > 0 ? (
                    project.media.map((item, idx) => {
                        let gridClass = "rounded-2xl sm:rounded-3xl border border-white/5 overflow-hidden shadow-2xl bg-slate-900 relative group";
                        
                        if (project.media.length === 5 && idx === 0) {
                            gridClass += " sm:col-span-2 aspect-video";
                        } else if (project.media.length % 2 !== 0 && idx === 0) {
                             gridClass += " sm:col-span-2 aspect-video";
                        } else {
                             gridClass += " aspect-video"; 
                        }

                        return (
                            <div key={idx} className={gridClass}>
                                {item.type === 'video' ? (
                                    <>
                                        <video src={item.url} controls className="w-full h-full object-cover" />
                                        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-[#020617]/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold flex items-center gap-2 pointer-events-none border border-white/10 uppercase tracking-wider">
                                            <FaVideo className="text-rose-500" /> Video Payload
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <img src={item.url} alt={`Gallery ${idx}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-[#020617]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <span className="bg-white/10 text-white px-5 py-2.5 rounded-full backdrop-blur-md text-xs sm:text-sm font-bold border border-white/10 uppercase tracking-widest">Examine</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div className="sm:col-span-2">
                        <ProjectImage src={displayHero} alt="Main Interface" className="rounded-2xl sm:rounded-3xl border border-white/5 w-full object-cover shadow-2xl aspect-video" />
                    </div>
                )}
             </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-4 space-y-8 sm:space-y-10">
          <div className="sticky top-28 space-y-6 sm:space-y-8">
            
            <div className="p-6 sm:p-8 bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-white/5 shadow-2xl">
              <h3 className="text-[10px] sm:text-xs font-bold text-slate-500 mb-6 uppercase tracking-widest">Architecture Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack?.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/5 border border-white/10 text-sky-100 rounded-xl text-xs sm:text-sm font-medium hover:bg-white/10 hover:border-sky-500/30 transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.stats && project.stats.length > 0 && (
                <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-900 to-[#0f172a] rounded-3xl border border-white/5 shadow-2xl backdrop-blur-xl">
                <h3 className="text-[10px] sm:text-xs font-bold text-slate-500 mb-6 uppercase tracking-widest">Metrics</h3>
                <div className="space-y-4">
                    {project.stats.map((stat, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b border-white/5 pb-3 sm:pb-4 last:border-0 last:pb-0">
                        <span className="text-slate-400 text-xs sm:text-sm font-medium">{stat.label}</span>
                        <span className="text-white font-bold font-display tracking-wide">{stat.value}</span>
                    </div>
                    ))}
                </div>
                </div>
            )}

            <div className="space-y-3 sm:space-y-4">
              {project.live ? (
                <a href={project.live} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 w-full py-4 bg-white text-slate-950 font-bold rounded-2xl transition-all hover:bg-slate-200 hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.1)] text-sm sm:text-base">
                  <FaExternalLinkAlt /> Access System
                </a>
              ) : (
                <div className="flex items-center justify-center gap-3 w-full py-4 bg-slate-900/50 text-slate-600 font-bold rounded-2xl border border-dashed border-slate-700/50 cursor-not-allowed opacity-80 backdrop-blur-md text-sm sm:text-base">
                   <FaExternalLinkAlt /> System Offline
                </div>
              )}
              
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 w-full py-4 bg-[#0a0f1e] text-white font-bold rounded-2xl transition-all border border-white/10 hover:border-slate-500 hover:bg-white/5 text-sm sm:text-base">
                  <FaGithub className="text-lg" /> Source Code
                </a>
              )}

              <a 
                href={`https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(whatsAppMessage)}`}
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center justify-center gap-3 w-full py-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold rounded-2xl transition-all hover:bg-emerald-500 hover:text-white hover:scale-[1.02] shadow-[0_0_15px_rgba(16,185,129,0.1)] text-sm sm:text-base"
              >
                <FaWhatsapp size={22} /> Inquire About System
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* 4. SHARE FAB */}
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50">
        <motion.button
          onClick={handleShare}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center justify-center gap-3 h-14 w-14 md:w-auto md:px-8 md:py-4 bg-slate-900 md:bg-gradient-to-r md:from-sky-600 md:to-indigo-600 text-white rounded-full shadow-[0_0_20px_rgba(6,182,212,0.3)] border border-white/10 md:border-transparent backdrop-blur-md"
        >
          <div className="text-lg sm:text-xl">
            {copied ? <FaCheckCircle className="text-emerald-400 md:text-white" /> : <FaShareAlt className="text-sky-400 md:text-white" />}
          </div>
          <span className="hidden md:block font-bold tracking-widest uppercase text-[10px] sm:text-xs">
            {copied ? 'Copied to Clipboard!' : 'Share Payload'}
          </span>
        </motion.button>
      </div>

      {/* 5. NEXT NAV */}
      <div className="border-t border-white/5 bg-[#0a0f1e]/50 py-16 md:py-32 text-center mt-12 mb-20 md:mb-0 relative overflow-hidden backdrop-blur-sm">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sky-600/5 rounded-full blur-[100px] pointer-events-none"></div>
         <button onClick={() => nextProjectId ? navigate(`/projects/${nextProjectId}`) : navigate('/projects')} className="group relative z-10 px-4">
            <span className="text-sky-500 text-[10px] sm:text-xs font-bold uppercase tracking-widest block mb-4 border border-sky-500/20 bg-sky-500/10 px-3 py-1 rounded-full w-max mx-auto">Explore More</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black font-display text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-sky-400 group-hover:to-indigo-400 transition-all duration-300 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
               {nextProjectId ? 'Initialize Next System' : 'Return to Core'} <FaArrowRight className="text-2xl sm:text-4xl group-hover:translate-x-3 transition-transform text-white" />
            </h2>
         </button>
      </div>

    </div>
  );
};

// --- HELPER COMPONENT ---
const InfoItem = ({ label, value, icon }) => (
  <div className="p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors group">
    <div className="text-sky-500 text-xl sm:text-2xl mb-3 sm:mb-4 group-hover:scale-110 group-hover:text-sky-400 transition-all">{icon}</div>
    <div className="text-base sm:text-lg md:text-2xl font-bold font-display text-white mb-1.5 truncate w-full px-2">{value || 'N/A'}</div>
    <div className="text-[9px] sm:text-[10px] md:text-xs text-slate-500 uppercase tracking-widest font-bold">{label}</div>
  </div>
);

const Section = ({ title, children, color, icon }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
  >
    <h3 className={`text-2xl sm:text-3xl font-bold font-display text-white mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4`}>
      <span className={`p-2.5 sm:p-3 rounded-2xl bg-slate-900 border border-white/5 ${color} text-xl sm:text-2xl shadow-inner`}>{icon}</span>
      {title}
    </h3>
    {children}
  </motion.div>
);

export default ProjectDetails;