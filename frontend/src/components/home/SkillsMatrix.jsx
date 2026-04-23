import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import API_BASE from '../../utils/api';

// --- SAFE IMPORTS (No Risky New Icons) ---
import { 
  FaReact, FaNodeJs, FaPython, FaDatabase, FaMobileAlt, FaBrain, FaCode, FaServer, 
  FaCodeBranch, FaLayerGroup, FaNetworkWired, FaChartPie, FaSearch, FaRobot, 
  FaShieldAlt, FaLock, FaTerminal, FaArrowRight, FaLinux
} from 'react-icons/fa';

import { 
  SiMongodb, SiExpress, SiNextdotjs, SiTailwindcss, SiTensorflow, SiFirebase, SiDocker, 
  SiPostman, SiGraphql, SiPytorch, SiTypescript, SiJavascript, SiFigma, SiAmazonwebservices, 
  SiGooglecloud, SiPandas, SiNumpy, SiScikitlearn, SiKeras, SiOpencv, SiJupyter, 
  SiSwift, SiKotlin, SiDart, SiExpo, SiAndroid, SiApple, 
  SiMysql, SiPostgresql, SiMariadb, SiSqlite, SiSupabase, SiPrisma, 
  SiRedis, SiKalilinux, SiWireshark, SiGnubash, SiLinux, SiPhp, SiRuby, 
  SiGo, SiRust, SiRedux, SiWebpack, SiVite, SiHtml5, SiCss3, SiSass, SiBootstrap, 
  SiAngular, SiVuedotjs, SiSvelte, SiArduino, SiRaspberrypi
} from 'react-icons/si';

// --- ICON MAP ---
const iconMap = {
    // --- SPECIAL CONCEPTS ---
    FaLayerGroup: <FaLayerGroup />, 
    FaNetworkWired: <FaNetworkWired />, 
    FaChartPie: <FaChartPie />, 
    FaRobot: <FaRobot />, 
    FaSearch: <FaSearch />, 
    FaBrain: <FaBrain />, 

    // --- AI & DATA SCIENCE (Safe Map) ---
    SiTensorflow: <SiTensorflow />, SiPytorch: <SiPytorch />, SiPandas: <SiPandas />,
    SiNumpy: <SiNumpy />, SiScikitlearn: <SiScikitlearn />, SiKeras: <SiKeras />,
    SiOpencv: <SiOpencv />, SiJupyter: <SiJupyter />,
    // Replaced risky imports with generic icons to prevent crashes
    SiHuggingface: <FaBrain />, 
    SiOpenai: <FaBrain />, 
    SiLangchain: <FaNetworkWired />, 

    // --- WEB ---
    FaReact: <FaReact />, SiNextdotjs: <SiNextdotjs />, SiJavascript: <SiJavascript />,
    SiTypescript: <SiTypescript />, SiHtml5: <SiHtml5 />, SiCss3: <SiCss3 />,
    SiTailwindcss: <SiTailwindcss />, SiSass: <SiSass />, SiBootstrap: <SiBootstrap />,
    SiAngular: <SiAngular />, SiVuedotjs: <SiVuedotjs />, SiSvelte: <SiSvelte />,
    SiRedux: <SiRedux />, SiVite: <SiVite />, SiWebpack: <SiWebpack />,
    FaNodeJs: <FaNodeJs />, SiExpress: <SiExpress />, SiPhp: <SiPhp />,
    SiRuby: <SiRuby />, SiGo: <SiGo />, SiRust: <SiRust />, FaPython: <FaPython />,
    SiGraphql: <SiGraphql />,

    // --- MOBILE ---
    FaMobileAlt: <FaMobileAlt />, SiSwift: <SiSwift />, SiKotlin: <SiKotlin />,
    SiDart: <SiDart />, SiExpo: <SiExpo />, SiAndroid: <SiAndroid />, SiApple: <SiApple />,

    // --- SECURITY ---
    FaShieldAlt: <FaShieldAlt />, FaLock: <FaLock />, SiKalilinux: <SiKalilinux />,
    SiWireshark: <SiWireshark />, SiBurpsuite: <FaShieldAlt />, SiGnubash: <SiGnubash />,
    FaTerminal: <FaTerminal />, SiLinux: <SiLinux />,

    // --- DB & CLOUD ---
    FaDatabase: <FaDatabase />, SiMongodb: <SiMongodb />, SiMysql: <SiMysql />,
    SiPostgresql: <SiPostgresql />, SiMariadb: <SiMariadb />, SiSqlite: <SiSqlite />,
    SiRedis: <SiRedis />, SiSupabase: <SiSupabase />, SiPrisma: <SiPrisma />,
    SiFirebase: <SiFirebase />, SiDocker: <SiDocker />, SiAmazonwebservices: <SiAmazonwebservices />,
    SiGooglecloud: <SiGooglecloud />, SiPostman: <SiPostman />,

    // --- OTHERS ---
    SiArduino: <SiArduino />, SiRaspberrypi: <SiRaspberrypi />, SiFigma: <SiFigma />,
    FaCode: <FaCode />, FaServer: <FaServer />, FaCodeBranch: <FaCodeBranch />
};

const SkillsMatrix = () => {
  const [skillsData, setSkillsData] = useState({}); 
  const [activeTab, setActiveTab] = useState(""); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/skills`);
        
        const groupedSkills = data.reduce((acc, skill) => {
          const ownerName = skill.owner ? skill.owner.trim() : "Unknown";
          if (!acc[ownerName]) {
            acc[ownerName] = [];
          }
          acc[ownerName].push(skill);
          return acc;
        }, {});

        setSkillsData(groupedSkills);

        const availableOwners = Object.keys(groupedSkills);
        if (availableOwners.length > 0) {
            setActiveTab(availableOwners[0]); 
        }

      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const owners = Object.keys(skillsData);
  const activeSkills = skillsData[activeTab] || [];
  const getIconComponent = (iconName) => iconMap[iconName] || <FaCode />;

  if (loading) {
    return (
        <section className="py-24 bg-slate-950 min-h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        </section>
    );
  }

  return (
    <section className="pt-8 pb-20 md:py-24 bg-[#020617] relative min-h-screen">
      
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-0 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-900/10 rounded-full blur-[80px] md:blur-[120px]"></div>
         <div className="absolute bottom-0 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-cyan-900/10 rounded-full blur-[80px] md:blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-cyan-400 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4 shadow-2xl backdrop-blur-md">
            <FaCode /> LogixWaveAI Stack
          </div>

          <h2 className="text-3xl md:text-6xl font-black text-white mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Arsenal</span>
          </h2>
        </div>

        {/* Tab Selection (Scrollable on Mobile) */}
        {owners.length > 0 ? (
            <div className="flex justify-center mb-10 md:mb-16">
              <div className="bg-slate-900/50 p-1.5 md:p-1.5 rounded-2xl md:rounded-full border border-white/5 flex flex-wrap justify-center gap-2 md:gap-2 backdrop-blur-md">
                {owners.map((name) => (
                  <button
                    key={name}
                    onClick={() => setActiveTab(name)}
                    className={`relative px-4 md:px-8 py-2 md:py-3 rounded-full text-[10px] md:text-sm font-bold tracking-widest uppercase transition-all duration-300 ${
                      activeTab === name ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {activeTab === name && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full shadow-lg"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                    <span className="relative z-10">{name}</span>
                  </button>
                ))}
              </div>
            </div>
        ) : (
            <div className="text-center text-slate-500 mb-10">No team members added yet.</div>
        )}

        {/* Skills Grid - RESPONSIVE FIX (grid-cols-2) */}
        <div className="min-h-[400px]">
        {activeSkills.length > 0 ? (
            <motion.div 
              layout 
              // HERE IS THE FIX: grid-cols-2 on mobile (default), md:grid-cols-3, lg:grid-cols-4
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 max-w-7xl mx-auto"
            >
              <AnimatePresence mode='popLayout'>
                {activeSkills.map((skill, index) => (
                  <motion.div
                    key={skill._id}
                    layout
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.04 }}
                    className="group relative h-full"
                  >
                    {/* Glow Effect */}
                    <div className={`absolute -inset-[1px] bg-gradient-to-br ${skill.from || 'from-slate-700'} ${skill.to || 'to-slate-900'} rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500`}></div>
                    
                    {/* Card Body - Smaller Padding on Mobile (p-4) */}
                    <div className="relative h-full bg-slate-900/60 backdrop-blur-xl p-4 md:p-6 rounded-2xl flex flex-col items-center justify-center gap-3 md:gap-4 border border-white/5 group-hover:border-white/10 transition-all hover:-translate-y-1">
                      
                      {/* Icon - Smaller on Mobile */}
                      <div className={`text-3xl md:text-5xl ${skill.color} filter drop-shadow-lg transform transition-transform duration-300 group-hover:scale-110`}>
                        {getIconComponent(skill.icon)}
                      </div>

                      {/* Text */}
                      <div className="text-center w-full">
                        <h3 className="text-xs md:text-base font-bold text-white mb-1.5 md:mb-2 truncate px-1">{skill.name}</h3>
                        
                        {/* Status Badge */}
                        <div className={`inline-flex items-center justify-center px-1.5 md:px-2 py-0.5 rounded text-[8px] md:text-[10px] font-bold uppercase tracking-wider bg-slate-950/50 border border-white/5 ${skill.color}`}>
                           {skill.status}
                        </div>
                      </div>

                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
        ) : (
             <div className="text-center text-slate-500 py-10">No skills found.</div>
        )}
        </div>

      </div>
    </section>
  );
};

export default SkillsMatrix;