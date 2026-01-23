import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCode } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  // --- 3D TILT EFFECT LOGIC (No Changes Here) ---
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) * 32.5;
    const mouseY = (e.clientY - rect.top) * 32.5;
    const rX = (mouseY / height - 32.5 / 2) * -1;
    const rY = (mouseX / width - 32.5 / 2);
    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // --- UPDATED LOGIC: Thumbnail Priority ---
  // Agar 'thumbnail' (file upload) available hai to wo use karega, 
  // varna fallback 'image' (URL wala) use karega.
  const displayImage = project.thumbnail || project.image;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", transform }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group relative bg-slate-900 rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all duration-300"
    >
      
      {/* 1. Project Image Section */}
      <div className="relative h-64 overflow-hidden">
        {/* Gradient Overlay for better visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
        
        <img 
          src={displayImage} 
          alt={project.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700"
        />
        
        {/* Hover Overlay Buttons (Buttons tabhi dikhenge jab link hogi) */}
        <div className="absolute inset-0 z-20 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-950/60 backdrop-blur-sm">
          
          {/* GitHub Button: Sirf tab dikhega jab link exist karegi */}
          {project.github && (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-white text-black rounded-full hover:bg-cyan-400 hover:scale-110 transition-all shadow-[0_0_15px_white]"
              title="View Code"
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub size={22} />
            </a>
          )}
          
          {/* Live Link Button: Sirf tab dikhega jab link exist karegi */}
          {project.live && (
            <a 
              href={project.live} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-slate-900 text-white border border-white/20 rounded-full hover:bg-cyan-500 hover:text-black hover:scale-110 transition-all shadow-lg"
              title="Live Demo"
              onClick={(e) => e.stopPropagation()}
            >
              <FaExternalLinkAlt size={20} />
            </a>
          )}

        </div>
      </div>

      {/* 2. Content Section */}
      <Link to={`/projects/${project.id}`} className="block p-6 relative z-20 bg-slate-900">
        
        <div className="flex justify-between items-start mb-3">
          <div>
             <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 mb-1 block">
               {project.category}
             </span>
             <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
               {project.title}
             </h3>
          </div>
          <FaCode className="text-slate-600 group-hover:text-white transition-colors" />
        </div>

        <p className="text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2">
          {project.tags && project.tags.map((tag, index) => (
            <span 
              key={index} 
              className="text-[10px] font-bold text-slate-300 bg-slate-800 px-3 py-1 rounded-full border border-slate-700 group-hover:border-cyan-500/30 group-hover:bg-cyan-900/10 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;