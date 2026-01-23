import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaRocket, FaLaptopCode, FaCodeBranch, FaLayerGroup } from 'react-icons/fa';
import axios from 'axios';
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
        const { data } = await axios.get('https://logixwave-main-1.onrender.com/api/projects');
        // Data formatting for Card component (mapping _id to id, techStack to tags)
        const formattedData = data.map(p => ({
          ...p,
          id: p._id,      // MongoDB _id ko id banaya
          tags: p.techStack // TechStack ko tags banaya
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
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 px-6 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none"></div>

      {/* Header & Stats */}
      <div className="container mx-auto max-w-7xl mb-16">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-white mb-6"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Masterpieces</span>
          </motion.h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Real projects, real code. Explore what we've built for our clients.
          </p>
        </div>

        {/* Dynamic Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
           <StatCard icon={<FaRocket />} number={projects.length + "+"} label="Projects Shipped" />
           <StatCard icon={<FaLaptopCode />} number="100%" label="Code Quality" />
           <StatCard icon={<FaCodeBranch />} number="50k+" label="Lines of Code" />
           <StatCard icon={<FaLayerGroup />} number="10+" label="Happy Clients" />
        </div>
      </div>

      {/* Controls */}
      <div className="container mx-auto max-w-7xl mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Tabs */}
        <div className="bg-slate-900/50 p-1 rounded-full border border-white/10 flex flex-wrap justify-center gap-1 backdrop-blur-md">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-cyan-600 text-white shadow-[0_0_15px_rgba(8,145,178,0.5)]' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80 group">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-cyan-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-full py-3 pl-12 pr-6 text-white focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all placeholder:text-slate-600"
          />
        </div>

      </div>

      {/* Projects Grid */}
      <div className="container mx-auto max-w-7xl">
        {loading ? (
          <div className="text-center py-20 text-cyan-400 animate-pulse text-xl">Loading Awesome Projects...</div>
        ) : (
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-slate-600">No projects found.</h3>
            <p className="text-slate-500">Try adjusting your search or check back later.</p>
          </div>
        )}
      </div>

    </div>
  );
};

const StatCard = ({ icon, number, label }) => (
  <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl text-center hover:border-cyan-500/30 transition-colors group">
    <div className="text-3xl text-cyan-500 mb-2 flex justify-center group-hover:scale-110 transition-transform">{icon}</div>
    <div className="text-2xl font-bold text-white">{number}</div>
    <div className="text-xs text-slate-400 uppercase tracking-wider">{label}</div>
  </div>
);

export default Projects;