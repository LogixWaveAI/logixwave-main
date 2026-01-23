import React from "react";
import { motion } from "framer-motion";

const techs = [
  "React", "Node.js", "MongoDB", "AWS", "Docker", "Next.js", "TypeScript", 
  "Python", "TensorFlow", "Figma", "GraphQL", "Redis", "PostgreSQL", "Firebase"
];

const TechMarquee = () => {
  return (
    <div className="py-10 bg-slate-950 border-y border-white/5 overflow-hidden flex relative z-20">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10"></div>
      
      <motion.div
        className="flex whitespace-nowrap gap-16"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {[...techs, ...techs, ...techs].map((tech, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-2xl font-black text-slate-700 uppercase tracking-widest hover:text-cyan-400 transition-colors duration-300 cursor-default">
              {tech}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechMarquee;