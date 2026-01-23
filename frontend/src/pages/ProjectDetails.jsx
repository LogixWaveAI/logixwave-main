import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import axios from 'axios';
import { 
  FaGithub, FaExternalLinkAlt, FaArrowLeft, FaArrowRight, FaClock, 
  FaUserTie, FaLayerGroup, FaListUl, FaCheckCircle, FaLightbulb, 
  FaExclamationTriangle, FaCode, FaShareAlt, FaWhatsapp, FaVideo, FaImage 
} from 'react-icons/fa';

// --- 1. CODE BLOCK COMPONENT ---
const CodeBlock = ({ code }) => (
  <div className="bg-[#0f172a] rounded-xl overflow-hidden border border-slate-800 shadow-2xl my-6 font-mono text-sm relative group">
    <div className="flex items-center justify-between px-4 py-2 bg-slate-900/50 border-b border-slate-800">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
      </div>
      <span className="text-xs text-slate-500 uppercase">Snippet.js</span>
    </div>
    <div className="p-4 overflow-x-auto custom-scrollbar">
      <pre className="text-slate-300">
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
        <span className="text-slate-600 text-sm font-bold uppercase tracking-wider">Image Not Found</span>
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
  const y = useTransform(scrollY, [0, 500], [0, 200]); 
  const scaleX = useSpring(scrollY, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data } = await axios.get(`https://logixwave-main-1.onrender.com/api/projects/${id}`);
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
    ? `Hey KPCODETECH, I'm interested in: ${project.title}.\nLink: ${window.location.href}` 
    : "Hello!";

  const handleShare = async () => {
    if (!project) return;
    const shareData = { title: project.title, text: `Check this out: ${project.title}`, url: window.location.href };
    
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (err) { console.log(err); }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-cyan-400 text-xl animate-pulse">Loading Project Data...</div>;
  if (!project) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-xl">Project Not Found</div>;

  const displayHero = project.thumbnail || project.heroImage || project.image;
  const nextProjectId = project.nextId || null;

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500 selection:text-black overflow-x-hidden font-sans pt-24">
      
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 origin-left z-50" style={{ scaleX }} />

      {/* 1. HERO SECTION - Main Image Restore ki hai (Blur ke sath taaki text dikhe) */}
      <div className="relative min-h-[60vh] md:h-[70vh] w-full overflow-hidden border-b border-white/5 rounded-b-[2rem] md:rounded-b-[3rem] shadow-2xl flex flex-col justify-end">
        
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-950"></div>
          {/* Main Image wapas laga di, bas thoda blur aur opacity kam ki taaki text dikhe */}
          <ProjectImage 
            src={displayHero} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-40 blur-[4px] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 container mx-auto max-w-6xl p-6 pb-20 md:pb-24 flex flex-col justify-end h-full">
            <Link to="/projects" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors w-fit px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-cyan-500/50">
              <FaArrowLeft className="text-sm" /> Back to Projects
            </Link>
            
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                {/* Mobile Text ko thoda chhota kiya taaki kate nahi */}
                <h1 className="text-4xl md:text-8xl font-black mb-4 md:mb-6 leading-tight tracking-tight drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 break-words">
                    {project.title}
                </h1>
                
                <div className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-base font-bold tracking-widest uppercase">
                    <span className="px-3 py-1 md:px-4 md:py-1.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.2)]">{project.category}</span>
                    {project.role && <span className="px-3 py-1 md:px-4 md:py-1.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.2)]">{project.role}</span>}
                </div>
            </motion.div>
        </div>
      </div>

      {/* 2. META BAR */}
      <div className="container mx-auto max-w-6xl relative z-20 -mt-8 md:-mt-12 px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 bg-slate-900/90 border border-white/10 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl divide-x divide-y md:divide-y-0 divide-white/5">
          <InfoItem label="Client" value={project.client} icon={<FaUserTie />} />
          <InfoItem label="Timeline" value={project.duration} icon={<FaClock />} />
          <InfoItem label="Core Tech" value={project.techStack?.[0] || "Web"} icon={<FaLayerGroup />} />
          <InfoItem label="My Role" value={project.role} icon={<FaCode />} />
        </div>
      </div>

      {/* 3. MAIN CONTENT */}
      <div className="container mx-auto max-w-6xl px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-8 space-y-16">
          
          <Section title="The Vision" color="text-yellow-400" icon={<FaLightbulb />}>
            <p className="text-lg md:text-2xl text-slate-300 leading-relaxed font-light border-l-4 border-yellow-500/30 pl-6">
              {project.description}
            </p>
          </Section>

          {project.features && project.features.length > 0 && (
            <Section title="Key Features" color="text-cyan-400" icon={<FaListUl />}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="bg-slate-900/50 p-5 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all hover:-translate-y-1 flex items-start gap-3">
                    <FaCheckCircle className="text-cyan-500 text-lg mt-1 shrink-0" />
                    <p className="text-slate-300 leading-relaxed text-sm">{feature}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          <Section title="Engineering" color="text-purple-400" icon={<FaCode />}>
            <div className="space-y-8">
              {project.challenge && (
                <div className="bg-red-500/5 p-6 md:p-8 rounded-3xl border border-red-500/10">
                  <div className="flex items-center gap-3 mb-4 text-red-400 font-bold uppercase tracking-wider text-sm">
                    <FaExclamationTriangle /> The Challenge
                  </div>
                  <p className="text-lg text-slate-300 leading-relaxed">"{project.challenge}"</p>
                </div>
              )}
              
              {project.solution && (
                <div className="bg-green-500/5 p-6 md:p-8 rounded-3xl border border-green-500/10">
                  <div className="flex items-center gap-3 mb-4 text-green-400 font-bold uppercase tracking-wider text-sm">
                    <FaLightbulb /> Our Solution
                  </div>
                  <p className="text-lg text-slate-300 leading-relaxed mb-6">{project.solution}</p>
                  {project.codeSnippet && <CodeBlock code={project.codeSnippet} />}
                </div>
              )}
            </div>
          </Section>

          {/* --- GALLERY SECTION (PROPER GRID for 5 Items) --- */}
          <div className="space-y-8">
             <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="p-2 rounded-lg bg-slate-900 border border-white/10 text-pink-400"><FaImage /></span> 
                Project Gallery
             </h3>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.media && project.media.length > 0 ? (
                    project.media.map((item, idx) => {
                        let gridClass = "rounded-3xl border border-white/10 overflow-hidden shadow-2xl bg-slate-900 relative group";
                        
                        if (project.media.length === 5 && idx === 0) {
                            gridClass += " md:col-span-2 aspect-video";
                        } else if (project.media.length % 2 !== 0 && idx === 0) {
                             gridClass += " md:col-span-2 aspect-video";
                        } else {
                             gridClass += " aspect-video"; 
                        }

                        return (
                            <div key={idx} className={gridClass}>
                                {item.type === 'video' ? (
                                    <>
                                        <video 
                                            src={item.url} 
                                            controls 
                                            className="w-full h-full object-cover" 
                                        />
                                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 pointer-events-none">
                                            <FaVideo className="text-red-500" /> Video
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <img 
                                            src={item.url} 
                                            alt={`Gallery ${idx}`} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                        />
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-sm text-sm font-bold">View Full</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div className="md:col-span-2">
                        <ProjectImage src={displayHero} alt="Main Interface" className="rounded-3xl border border-white/10 w-full object-cover shadow-2xl aspect-video" />
                    </div>
                )}
             </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-4 space-y-10">
          <div className="sticky top-32 space-y-8">
            
            <div className="p-6 md:p-8 bg-slate-900/80 backdrop-blur-md rounded-3xl border border-white/10 shadow-xl">
              <h3 className="text-sm font-bold text-slate-500 mb-6 uppercase tracking-wider">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack?.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-white/5 border border-white/10 text-slate-300 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.stats && project.stats.length > 0 && (
                <div className="p-6 md:p-8 bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl border border-white/10 shadow-lg">
                <h3 className="text-sm font-bold text-slate-500 mb-6 uppercase tracking-wider">Performance</h3>
                <div className="space-y-4">
                    {project.stats.map((stat, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0">
                        <span className="text-slate-400 text-sm">{stat.label}</span>
                        <span className="text-white font-bold">{stat.value}</span>
                    </div>
                    ))}
                </div>
                </div>
            )}

            <div className="space-y-4">
              {project.live ? (
                <a href={project.live} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 w-full py-4 bg-white text-black font-bold rounded-2xl transition-all hover:bg-cyan-400 hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  <FaExternalLinkAlt /> Live Demo
                </a>
              ) : (
                <div className="flex items-center justify-center gap-3 w-full py-4 bg-slate-800/50 text-slate-500 font-bold rounded-2xl border border-dashed border-slate-700 cursor-not-allowed opacity-80">
                   <FaExternalLinkAlt /> Live Preview Not Available
                </div>
              )}
              
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 w-full py-4 bg-slate-800 text-white font-bold rounded-2xl transition-all border border-slate-700 hover:border-slate-500 hover:bg-slate-700">
                  <FaGithub /> Source Code
                </a>
              )}

              <a 
                href={`https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(whatsAppMessage)}`}
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center justify-center gap-3 w-full py-4 bg-green-500 text-white font-bold rounded-2xl transition-all hover:bg-green-600 hover:scale-[1.02] shadow-[0_0_20px_rgba(16,185,129,0.4)]"
              >
                <FaWhatsapp size={22} /> WhatsApp Us!
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* 4. SHARE FAB (FIXED POSITION) */}
      <div className="fixed bottom-24 right-4 md:bottom-10 md:right-10 z-50">
        <motion.button
          onClick={handleShare}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center justify-center gap-3 h-14 w-14 md:w-auto md:px-8 md:py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)] border border-white/20 backdrop-blur-md"
        >
          <div className="text-xl">
            {copied ? <FaCheckCircle /> : <FaShareAlt />}
          </div>
          <span className="hidden md:block font-bold tracking-wider uppercase text-sm">
            {copied ? 'Copied!' : 'Share'}
          </span>
        </motion.button>
      </div>

      {/* 5. NEXT NAV */}
      <div className="border-t border-white/5 bg-slate-900/50 py-16 md:py-24 text-center mt-12 pb-32 md:pb-24">
         <button onClick={() => nextProjectId ? navigate(`/projects/${nextProjectId}`) : navigate('/projects')} className="group">
            <span className="text-slate-500 text-xs font-bold uppercase tracking-widest block mb-4">Continue Exploring</span>
            <h2 className="text-3xl md:text-6xl font-black text-white group-hover:text-cyan-400 transition-colors flex items-center justify-center gap-4">
               {nextProjectId ? 'Next Case Study' : 'Back to Portfolio'} <FaArrowRight className="text-4xl group-hover:translate-x-3 transition-transform" />
            </h2>
         </button>
      </div>

    </div>
  );
};

// --- HELPER COMPONENT ---
const InfoItem = ({ label, value, icon }) => (
  <div className="p-4 md:p-8 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors group">
    <div className="text-cyan-500 text-lg md:text-2xl mb-2 md:mb-3 group-hover:scale-110 transition-transform">{icon}</div>
    <div className="text-base md:text-2xl font-bold text-white mb-1 truncate w-full">{value || 'N/A'}</div>
    <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest font-bold">{label}</div>
  </div>
);

const Section = ({ title, children, color, icon }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    <h3 className={`text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 flex items-center gap-4`}>
      <span className={`p-2 md:p-3 rounded-xl bg-slate-900 border border-white/10 ${color} text-xl md:text-2xl`}>{icon}</span>
      {title}
    </h3>
    {children}
  </motion.div>
);

export default ProjectDetails;