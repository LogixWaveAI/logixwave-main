import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaRocket, FaLaptopCode, FaCodeBranch, FaLayerGroup } from 'react-icons/fa';
import axios from 'axios';
import API_BASE from '../utils/api';
import ProjectCard from '../components/projects/ProjectCard';

const categories = ["All", "Web Dev", "Mobile App", "AI & Data"];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // --- 1. FETCH FROM BACKEND ---
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/projects`);
        const formattedData = data.map(p => ({
          ...p,
          id: p._id,      
          tags: p.techStack 
        }));
        setProjects(formattedData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // --- 2. FILTER LOGIC ---
  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeCategory === "All" || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#020617] pt-24 md:pt-32 pb-20 px-5 sm:px-6 relative overflow-hidden font-sans">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-sky-900/10 via-indigo-900/5 to-transparent pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-sky-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header & Stats */}
      <div className="container mx-auto max-w-7xl mb-16 relative z-10">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold font-display text-white mb-6 tracking-tight"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">Architecture</span>
          </motion.h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            Real production systems. Explore the intelligence we've built for our clients.
          </p>
        </div>

        {/* Dynamic Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
           <StatCard icon={<FaRocket />} number={projects.length > 0 ? `${projects.length}+` : "0"} label="Systems Deployed" />
           <StatCard icon={<FaLaptopCode />} number="100%" label="Code Quality" />
           <StatCard icon={<FaCodeBranch />} number="50k+" label="Lines Compiled" />
           <StatCard icon={<FaLayerGroup />} number="10+" label="Active Nodes" />
        </div>
      </div>

      {/* Controls */}
      <div className="container mx-auto max-w-7xl mb-12 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        
        {/* Tabs */}
        <div className="bg-slate-900/80 p-1.5 rounded-2xl md:rounded-full border border-white/10 flex flex-wrap justify-center gap-1 sm:gap-2 backdrop-blur-md w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl md:rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex-grow md:flex-grow-0 ${
                activeCategory === cat 
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-[0_0_15px_rgba(14,165,233,0.4)]' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-96 group">
          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-sky-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Search deployed systems..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/80 border border-white/10 rounded-2xl md:rounded-full py-3.5 pl-12 pr-6 text-white focus:outline-none focus:border-sky-500 focus:shadow-[0_0_20px_rgba(14,165,233,0.2)] transition-all placeholder:text-slate-500 text-sm backdrop-blur-md"
          />
        </div>

      </div>

      {/* Projects Grid */}
      <div className="container mx-auto max-w-7xl relative z-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-12 h-12 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin"></div>
            <div className="text-sky-400 font-medium tracking-widest text-sm animate-pulse uppercase">Fetching Architectures...</div>
          </div>
        ) : (
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 gap-y-10"
          >
            <AnimatePresence mode='popLayout'>
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filteredProjects.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 bg-slate-900/30 rounded-3xl border border-white/5 backdrop-blur-sm">
            <FaSearch className="text-4xl text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-display">No Architectures Found</h3>
            <p className="text-slate-500 text-sm">Adjust your search parameters or category filter.</p>
          </motion.div>
        )}
      </div>

    </div>
  );
};

const StatCard = ({ icon, number, label }) => (
  <div className="bg-slate-900/50 border border-white/5 p-5 md:p-8 rounded-3xl text-center hover:border-sky-500/30 transition-colors group backdrop-blur-md">
    <div className="text-2xl sm:text-3xl text-sky-400 mb-3 sm:mb-4 flex justify-center group-hover:scale-110 group-hover:text-sky-300 transition-transform">{icon}</div>
    <div className="text-3xl sm:text-4xl font-bold text-white mb-1 font-display">{number}</div>
    <div className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-widest font-semibold">{label}</div>
  </div>
);

export default Projects;