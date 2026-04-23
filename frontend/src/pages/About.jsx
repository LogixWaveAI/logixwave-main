import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  FaRocket, FaUsers, FaCode, FaLaptopCode, FaBolt, FaFingerprint, 
  FaLink, FaQuoteLeft, FaHistory, 
  FaMicrochip, FaDatabase, FaBrain, FaMugHot, FaFire, FaChessKnight, FaGlobeAmericas, FaMobileAlt, FaBuilding, 
  FaQuoteRight
} from 'react-icons/fa';

const About = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 relative overflow-hidden font-sans">
      
      {/* 0. PROGRESS BAR */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* BACKGROUND FX */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
         <div className="absolute top-[-20%] left-[-10%] w-[100vw] h-[100vw] max-w-[800px] max-h-[800px] bg-sky-600/10 rounded-full blur-[120px]" />
         <div className="absolute bottom-[-20%] right-[-10%] w-[100vw] h-[100vw] max-w-[800px] max-h-[800px] bg-indigo-600/10 rounded-full blur-[120px]" />
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* 1. HERO SECTION */}
      <div className="relative z-10 pt-32 md:pt-40 pb-16 md:pb-24 text-center px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-white/5 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-sky-400 mb-8 backdrop-blur-md">
            <FaHistory className="text-sky-500" /> The Origin Story
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight font-display drop-shadow-2xl px-2">
            FOUR MINDS. <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500">
              ONE LOGIC.
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light px-4">
            <FaQuoteLeft className="inline text-slate-700 text-sm mb-2 mr-2" />
            This isn't just a story about developers. This is a chronicle of four visionaries who rejected the ordinary. 
            <strong> From the backbenches of a classroom to the forefront of AI Engineeering.</strong> <FaQuoteRight className="inline text-slate-700 text-sm mb-2 mr-2" />
          </p>
        </motion.div>
      </div>

      {/* 2. THE SAGA (Cinematic Timeline) */}
      <div className="container mx-auto px-5 sm:px-6 max-w-5xl py-10 relative z-10">
        
        <div className="relative">
          {/* THE TIMELINE SPINE */}
          <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 h-full w-px bg-gradient-to-b from-sky-500/50 via-indigo-500/50 to-purple-600/50 rounded-full hidden sm:block"></div>

          {/* Chapters */}
          <StoryNode 
            side="left"
            date="Chapter 1 | The Collision"
            title="The First Frequency"
            subtitle="Parth • Pal • Yashvi"
            icon={<FaFingerprint />}
            color="text-sky-400"
            glow="shadow-sky-500/10"
            delay={0.1}
          >
            <p className="text-sm md:text-base">
              It was the first day of college. Amidst countless new faces and casual chatter,<strong> Parth, Pal, and Yashvi</strong> found themselves talking about computing, not routines. It wasn’t a coincidence—it was the quiet beginning of an architecture.
            </p>
          </StoryNode>

          <StoryNode 
            side="right"
            date="Chapter 2 | The Filter"
            title="The Syntax Barrier"
            subtitle="Coding: The Great Filter"
            icon={<FaCode />}
            color="text-indigo-400"
            glow="shadow-indigo-500/10"
            delay={0.1}
          >
            <p className="text-sm md:text-base">
              Then came programming. For 90% of the class, it was a nightmare. But for us? It was an invitation. 
              We spent countless hours debugging, not for grades, but for the thrill of building. 
              This struggle separated us from the crowd. We stopped being students and started being <strong>Engineers</strong>.
            </p>
          </StoryNode>

          <StoryNode 
            side="left"
            date="Chapter 3 | The Completion"
            title="The Protocol Link"
            subtitle="Jay Enters the Matrix"
            icon={<FaLink />}
            color="text-purple-400"
            glow="shadow-purple-500/10"
            delay={0.2}
          >
            <p className="text-sm md:text-base">
              A triangle is strong, but a square is the foundation of a structure. 
              <strong> Jay</strong> joined the circle. 
              With his entry, the system was complete. We had the AI core, and we had the UI layer. 
              The energy shifted from curious to <strong>relentless.</strong>
            </p>
          </StoryNode>

          <StoryNode 
            side="right"
            date="Chapter 4 | Synergy"
            title="The Shadow Stack"
            subtitle="Learning Beyond Curriculum"
            icon={<FaUsers />}
            color="text-emerald-400"
            glow="shadow-emerald-500/10"
            delay={0.2}
          >
            <p className="text-sm md:text-base">
              While the university taught basics, we taught each other the future. We built a shadow curriculum—mastering LangChain, Next.js, and Cloud Infrastructure. What began as an alliance evolved into an elite engineering unit.
            </p>
          </StoryNode>

          {/* Individuals */}
          <StoryNode side="left" date="Founder | Parth" title="The Architect" subtitle="AI • Mobile • Web Node" icon={<FaMobileAlt />} color="text-sky-400" glow="shadow-sky-500/10" delay={0.3}>
            <p className="text-sm md:text-base"><strong>Parth</strong> became the definition of versatile. He masters the <strong>MERN Stack & Next.js</strong> for web, and <strong>React Native</strong> for mobile. He didn't stop there. He orchestrates the entire <strong>Data Science & GenAI</strong> spectrum, architecting the brain of LogixWaveAI.</p>
          </StoryNode>

          <StoryNode side="right" date="Co-Founder | Pal" title="The Intel Node" subtitle="AI Logic • Data Pipelines" icon={<FaMicrochip />} color="text-indigo-400" glow="shadow-indigo-500/10" delay={0.3}>
            <p className="text-sm md:text-base"><strong>Pal</strong> blends the power of cloud architecture with the intelligence of data models. A <strong>Full Stack</strong> expert whose true domain is <strong>AI</strong>. Using Agentic frameworks to orchestrate workflows, Pal turns raw data into deployable intelligence.</p>
          </StoryNode>

          <StoryNode side="left" date="Co-Founder | Yashvi" title="The Automation Core" subtitle="Integrations • Automation • MERN" icon={<FaBrain />} color="text-purple-400" glow="shadow-purple-500/10" delay={0.4}>
            <p className="text-sm md:text-base"><strong>Yashvi</strong> proved that logic transforms code into autonomous solutions. Mastering the <strong>MERN Stack</strong> and fusing it with <strong>Automation Ecosystems</strong> (n8n). She designs the autonomous workflows that make our clients' businesses unshakeable.</p>
          </StoryNode>

          <StoryNode side="right" date="Co-Founder | Jay" title="The Interface Node" subtitle="React Core • UI/UX Physics" icon={<FaLaptopCode />} color="text-teal-400" glow="shadow-teal-500/10" delay={0.4}>
            <p className="text-sm md:text-base">In a team driven by invisible AI backends, <strong>Jay</strong> anchors the visual reality. He focused his energy on the <strong>Frontend Ecosystem</strong>. He ensures that complex AI processes connect seamlessly to intuitive, flawless user interfaces.</p>
          </StoryNode>

          {/* The Launch */}
          <StoryNode side="left" date="The Launch | Dec 2025" title="Stealth to Production" subtitle="The Empire Deploys" icon={<FaRocket />} color="text-white" glow="shadow-white/10" delay={0.5}>
            <p className="text-sm md:text-base">Instead of interviewing for jobs, we created the company. <strong>LogixWaveAI LLP</strong> was deployed. A digital agency powered by unbreakable logic and unrelenting skill. This is the prologue of our legacy.</p>
          </StoryNode>

        </div>
      </div>

      {/* 3. THE EXECUTIVES */}
      <div className="container mx-auto px-5 sm:px-6 max-w-7xl py-16 md:py-24 text-center border-t border-white/5 bg-slate-950/30">
        <h2 className="text-3xl md:text-5xl font-black mb-10 md:mb-16 tracking-tight font-display">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">Board</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <SquadMember name="Parth" role="Founder & CEO" skills="AI Architect • Full Stack" color="from-sky-400 to-blue-600" textGlow="text-sky-400" delay={0.1} />
          <SquadMember name="Pal" role="Co-Founder & COO" skills="Operations • AI Logic" color="from-indigo-400 to-purple-600" textGlow="text-indigo-400" delay={0.2} />
          <SquadMember name="Yashvi" role="Co-Founder & CMO" skills="Automation • Brand Integration" color="from-purple-400 to-pink-600" textGlow="text-purple-400" delay={0.3} />
          <SquadMember name="Jay" role="Co-Founder & CTO" skills="UI Physics • Web Core" color="from-teal-400 to-emerald-600" textGlow="text-teal-400" delay={0.4} />
        </div>
      </div>

      {/* 4. FINAL CALL */}
      <div className="py-16 md:py-24 text-center relative overflow-hidden bg-slate-950 border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[600px] aspect-square bg-sky-900/20 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="container mx-auto px-5 sm:px-6 relative z-10">
            <div className="inline-flex flex-col items-center justify-center p-5 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-md mb-8 shadow-xl">
                <FaBuilding className="text-3xl text-sky-400 mb-3" />
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-slate-300 uppercase">LogixWaveAI Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-display tracking-tight px-2">
              The Architecture Continues.
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-base sm:text-lg leading-relaxed mb-10 px-4">
                We proved that when logic meets vision, robust systems are born. 
                Now, let us build that system for you.
            </p>
        </div>
      </div>

    </div>
  );
};

// --- SUB-COMPONENTS ---

const StoryNode = ({ side, date, title, subtitle, children, icon, color, glow, delay }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between w-full mb-12 sm:mb-20 ${side === 'right' ? 'sm:flex-row-reverse' : ''} px-4 sm:px-0`}
    >
      {/* Content Card */}
      <div className={`w-full sm:w-5/12 relative group`}>
        <div className={`bg-slate-900/60 p-6 sm:p-8 rounded-2xl border border-white/5 backdrop-blur-xl relative z-10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 ${glow}`}>
          
          <div className="flex justify-between items-start mb-6 gap-2">
              <div className={`p-3 sm:p-4 rounded-xl bg-slate-950 border border-white/5 ${color} text-xl sm:text-2xl shadow-lg`}>{icon}</div>
              <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase tracking-wider border border-white/5 px-2.5 py-1 rounded-full bg-slate-950 text-right">{date}</span>
          </div>
          
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 tracking-tight font-display">{title}</h3>
          <h4 className={`text-[10px] sm:text-xs font-semibold mb-4 ${color} tracking-widest uppercase`}>{subtitle}</h4>
          <div className="text-slate-400 leading-relaxed font-normal text-sm sm:text-base tracking-wide">
              {children}
          </div>
        </div>
      </div>

      {/* Timeline Node (Hidden on extremely small mobile, visible on sm+) */}
      <div className="hidden sm:flex w-2/12 justify-center relative">
        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-950 border-2 border-white/20 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(255,255,255,0.1)] relative`}>
           <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${color.replace('text-', 'bg-')}`}></div>
        </div>
      </div>

      {/* Spacer */}
      <div className="hidden sm:block w-5/12"></div>
    </motion.div>
  );
};

const SquadMember = ({ name, role, skills, color, textGlow, delay }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.4 }}
    className="relative group h-full w-full max-w-sm mx-auto"
  >
    <div className="bg-slate-900/80 border border-white/5 p-5 md:p-6 rounded-3xl relative z-10 hover:border-white/20 transition-all hover:shadow-2xl backdrop-blur-md h-full flex flex-col justify-between">
      <div>
        <div className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white text-xl sm:text-2xl font-display font-bold shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
          {name.charAt(0)}
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-0.5 font-display">{name}</h3>
        <p className={`text-[10px] sm:text-xs uppercase tracking-widest font-bold mb-4 ${textGlow}`}>{role}</p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-2 mt-2">
         {skills.split('•').map((skill, i) => (
             <span key={i} className="text-[10px] sm:text-xs bg-white/5 px-2.5 py-1.5 rounded-lg text-slate-300 font-medium border border-white/5">{skill.trim()}</span>
         ))}
      </div>
    </div>
  </motion.div>
);

export default About;