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
    <div className="min-h-screen bg-[#020617] text-white relative overflow-hidden font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* 0. PROGRESS BAR */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* BACKGROUND FX */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
         <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse" />
         <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: "2s" }} />
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e51a_1px,transparent_1px),linear-gradient(to_bottom,#4f46e51a_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* 1. HERO SECTION */}
      <div className="relative z-10 pt-32 pb-20 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-700 text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-6 shadow-2xl backdrop-blur-md">
            <FaHistory /> The Origin Story
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 leading-tight tracking-tighter text-white drop-shadow-2xl">
            FOUR MINDS. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500">
              ONE VISION.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
            <FaQuoteLeft className="inline text-slate-600 text-xs mb-2 mr-2" />
            This isn't just a story about college students. This is a chronicle of four visionaries who rejected the ordinary. 
            <strong>From the backbenches of a classroom to the forefront of AI & Innovation.</strong> <FaQuoteRight className="inline text-slate-600 text-xs mb-2 mr-2" />
          </p>
        </motion.div>
      </div>

      {/* 2. THE SAGA (Cinematic Timeline) */}
      <div className="container mx-auto px-6 max-w-5xl py-10 relative z-10">
        
        <div className="relative">
          {/* THE TIMELINE SPINE */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-600 via-purple-600 to-orange-600 opacity-30 rounded-full"></div>

          {/* CARD 1: The Beginning */}
          <StoryNode 
            side="left"
            date="Chapter 1 | The Collision"
            title="The First Frequency"
            subtitle="Parth • Pal • Yashvi"
            icon={<FaFingerprint />}
            color="text-blue-400"
            glow="shadow-blue-500/20"
            delay={0.1}
          >
            <p>
              It was the first day of college. Amidst countless new faces and casual chatter,<strong> Parth, Pal, and Yashvi</strong> found themselves talking about ideas, not routines. It wasn’t a coincidence—it was the quiet beginning of something much bigger.
            </p>
          </StoryNode>

          {/* CARD 2: The Struggle */}
          <StoryNode 
            side="right"
            date="Chapter 2 | The Filter"
            title="The Syntax Barrier"
            subtitle="Coding: The Great Filter"
            icon={<FaCode />}
            color="text-yellow-400"
            glow="shadow-yellow-500/20"
            delay={0.1}
          >
            <p>
              Then came <strong>Java</strong>. For 90% of the class, it was a nightmare. But for us? It was an invitation. 
              We spent countless hours debugging, not for grades, but for the thrill of seeing "Process Finished with Exit Code 0." 
              This struggle separated us from the crowd. We stopped being students and started being <strong>Developers</strong>.
            </p>
          </StoryNode>

          {/* CARD 3: Jay Joins */}
          <StoryNode 
            side="left"
            date="Chapter 3 | The Completion"
            title="The Fourth Pillar"
            subtitle="Jay Enters the Protocol"
            icon={<FaLink />}
            color="text-purple-400"
            glow="shadow-purple-500/20"
            delay={0.2}
          >
            <p>
              A triangle is strong, but a square is the foundation of a structure. 
              <strong> Jay</strong>, a childhood friend of Parth, joined the circle. 
              With his entry, the team was complete. We had the AI wizards, and we had the Web Specialist. 
              The energy shifted from <strong>curious</strong> to <strong>ambitious.</strong>
            </p>
          </StoryNode>

          {/* CARD 4: The Brotherhood */}
          <StoryNode 
            side="right"
            date="Chapter 4 | Synergy"
            title="The Shadow Curriculum"
            subtitle="Learning Beyond Books"
            icon={<FaUsers />}
            color="text-cyan-400"
            glow="shadow-cyan-500/20"
            delay={0.2}
          >
            <p>
              While the university taught us history, we taught each other the future. We built a shadow curriculum—sharing every new AI tool, React trick, and insight. What began as friendship evolved into a team, leveling up together.
              </p>
          </StoryNode>

          {/* CARD 5: Parth's Evolution */}
          <StoryNode 
            side="left"
            date="The One-Man Army | Parth"
            title="The Tech God"
            subtitle="Web • Mobile • Data Science • AI"
            icon={<FaMobileAlt />}
            color="text-red-400"
            glow="shadow-red-500/20"
            delay={0.3}
          >
            <p>
              <strong>Parth</strong> became the definition of Limitless. 
              <strong> He</strong> mastered the <strong>MERN Stack & Next.js</strong> for web, and <strong>React Native</strong> for mobile apps. 
              But <strong>he</strong> didn't stop there. He deep-dived into the entire <strong>Data Science & AI</strong> spectrum—mastering <strong>LangChain</strong>, LLMs, RAG, and GenAI. 
              He creates the Brain (AI), the Body (Web), and the Hand (Mobile) of our projects.
            </p>
          </StoryNode>

          {/* CARD 6: Pal's Evolution (GIRL FIXED) */}
          <StoryNode 
            side="right"
            date="The Intelligence | Pal"
            title="The AI & Web Wizard"
            subtitle="MERN • Data Science • LangChain"
            icon={<FaMicrochip />}
            color="text-green-400"
            glow="shadow-green-500/20"
            delay={0.3}
          >
            <p>
              <strong>Pal</strong> blends the power of the web with the intelligence of data. A <strong>MERN Stack</strong> expert at heart, her true arena is <strong>Data Science & AI</strong>.
              Using <strong>LangChain</strong> to orchestrate complex AI workflows and Deep Learning models, Pal turns raw data into pure gold.
            </p>
          </StoryNode>

          {/* CARD 7: Yashvi's Evolution (GIRL FIXED) */}
          <StoryNode 
            side="left"
            date="The Strategist | Yashvi"
            title="The Logic Core"
            subtitle="MERN • Data Science • Automation"
            icon={<FaBrain />}
            color="text-pink-400"
            glow="shadow-pink-500/20"
            delay={0.4}
          >
            <p>
              <strong>Yashvi</strong> proved that logic is the soul that transforms code into real solutions.
              <strong>She</strong> mastered the <strong>MERN Stack</strong> and fused it with the <strong>Complete AI & Data Science Ecosystem</strong>. 
              Whether it's Python libraries, <strong>LangChain agents</strong>, or complex Automation scripts, <strong>she</strong> designs the systems that make our agency smarter and faster.
            </p>
          </StoryNode>

          {/* CARD 8: Jay's Evolution */}
          <StoryNode 
            side="right"
            date="The Specialist | Jay"
            title="The Web Specialist"
            subtitle="MERN Stack • Next.js • UI/UX"
            icon={<FaLaptopCode />}
            color="text-orange-400"
            glow="shadow-orange-500/20"
            delay={0.4}
          >
            <p>
              In a team driven by AI, <strong>Jay</strong> anchors Web Excellence. 
              <strong> He</strong> focused his energy entirely on the <strong>MERN Stack</strong>. 
              <strong> He</strong> ensures that the complex AI backends built by the others connect seamlessly to a beautiful, bug-free user interface. 
              He is the reason our code looks as good as it works.
            </p>
          </StoryNode>

          {/* CARD 9: The Conflict */}
          <StoryNode 
            side="left"
            date="Chapter 5 | The Crossroads"
            title="The Placement Pressure"
            subtitle="Sem 5: Society vs. Ambition"
            icon={<FaMugHot />}
            color="text-gray-400"
            glow="shadow-gray-500/20"
            delay={0.5}
          >
            <p>
              By our second year, we were already in the real world—<strong>Parth</strong> led with an internship, followed by <strong>Jay</strong>, <strong>Yashvi</strong>, and <strong>Pal</strong>, each gaining their own experience. When Semester 5 arrived, the noise of placements and packages grew louder. Families wanted security. Professors wanted safe paths. But when we looked at each other, we knew our journey might be different—we wanted to create something of our own.
            </p>



          </StoryNode>

          {/* CARD 10: The Oath */}
          <StoryNode 
            side="right"
            date="Chapter 6 | The Awakening"
            title="The Rebellion"
            subtitle="Rejecting the Matrix"
            icon={<FaFire />}
            color="text-red-500"
            glow="shadow-red-500/20"
            delay={0.5}
          >
            <p>
              We—Full-Stack AI Experts, a Web Specialist, and a Mobile App Developer (React Native)—sat at our usual spot.  
              At that table, we weren’t job seekers—we were a full IT company.  
              Why wait for opportunities when we could create them?  
              And just like that, LogixWaveAI was born: <strong>No Resumes. No Interviews. Only Innovation.</strong>
            </p>

          </StoryNode>

          {/* CARD 11: The Build */}
          <StoryNode 
            side="left"
            date="Chapter 7 | Stealth Mode"
            title="Building in Silence"
            subtitle="The Dorm Room Hustle"
            icon={<FaBolt />}
            color="text-teal-400"
            glow="shadow-teal-500/20"
            delay={0.6}
          >
            <p>
              While the world slept, we coded. 
              We took on freelance projects, built internal tools, and refined our workflow. 
              There were bugs that made us cry and deadlines that broke us, but we never folded. 
              We transformed from a group of friends into a battle-hardened <strong>Development Agency</strong>.
            </p>
          </StoryNode>

          {/* CARD 12: The Vision */}
          <StoryNode 
            side="right"
            date="Chapter 8 | The Philosophy"
            title="More Than Code"
            subtitle="Solving Real Problems"
            icon={<FaGlobeAmericas />}
            color="text-indigo-400"
            glow="shadow-indigo-500/20"
            delay={0.6}
          >
            <p>
              We realized our mission wasn't just to write code, but to solve problems. 
              Whether it's an AI that teaches students or a website that scales a business, our goal became <strong>Impact</strong>. 
              We stopped looking at lines of code and started looking at lines of business logic.
            </p>
          </StoryNode>

          {/* CARD 13: The Launch */}
          <StoryNode 
            side="left"
            date="Dec 2025 | PRESENT"
            title="LogixWaveAI IS LIVE"
            subtitle="The Empire Begins"
            icon={<FaRocket />}
            color="text-green-500"
            glow="shadow-green-500/20"
            delay={0.7}
          >
            <p>
              January 2026. Semester 6. 
              While our peers are joining companies, we are launching one. 
              <strong> LogixWaveAI LLP</strong> is now a reality. 
              A digital agency powered by Friendship, Vision, and unrelenting Skill.
              This is not the end of our college story. This is the prologue of our legacy.
            </p>
          </StoryNode>

          {/* CARD 14: The Future */}
          <StoryNode 
            side="right"
            date="The Future | 2026 & Beyond"
            title="Unwritten Chapters"
            subtitle="Global Domination"
            icon={<FaChessKnight />}
            color="text-white"
            glow="shadow-white/20"
            delay={0.7}
          >
           <p>
            We are just getting started. With plans for SaaS products, AI automation tools, and a vision to scale our agency globally, the road ahead is challenging—but exciting.  
            Together, the four of us can overcome any obstacle and solve any problem.  
            This is just the beginning.<strong> Watch this space.</strong>
          </p>

              
            
          </StoryNode>

        </div>
      </div>

      {/* 3. THE EXECUTIVES (Updated Squad Section) */}
      <div className="container mx-auto px-6 max-w-7xl py-24 text-center">
        <h2 className="text-3xl md:text-5xl font-black mb-16 uppercase tracking-tight">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Executive Board</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <SquadMember 
            name="Parth" 
            role="Founder & CEO" 
            skills="Vision • AI Architect • Full Stack"
            color="bg-blue-600" 
            delay={0.1} 
          />
          
          <SquadMember 
            name="Pal" 
            role="Co-Founder & COO" 
            skills="Operations • AI Strategy • Data"
            color="bg-purple-600" 
            delay={0.2} 
          />
          
          <SquadMember 
            name="Yashvi" 
            role="Co-Founder & CMO" 
            skills="Branding • Logic • AI Integration"
            color="bg-pink-600" 
            delay={0.3} 
          />

          <SquadMember 
            name="Jay" 
            role="Co-Founder & CTO" 
            skills="Technology • Web Core • UI/UX"
            color="bg-orange-600" 
            delay={0.4} 
          />

        </div>
      </div>

      {/* 4. FINAL CALL (Official Badge) */}
      <div className="py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/10 pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
            <div className="inline-block p-4 border border-cyan-500/30 rounded-2xl bg-slate-900/50 backdrop-blur-md mb-8">
                <FaBuilding className="text-4xl text-cyan-400 mx-auto mb-2" />
                <span className="text-xs font-bold tracking-[0.3em] text-slate-400 uppercase">LogixWaveAI LLP</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              The Story Continues.
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-lg leading-relaxed mb-10">
                We proved that when four friends share a single vision, magic happens. 
                Now, let us build that magic for you.
            </p>
        </div>
      </div>

    </div>
  );
};

// --- SUB-COMPONENTS (With Props for Dynamic content) ---

const StoryNode = ({ side, date, title, subtitle, children, icon, color, glow, delay }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay }}
      className={`flex flex-col md:flex-row items-center justify-between w-full mb-24 ${side === 'right' ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Content Card */}
      <div className={`w-full md:w-5/12 relative group perspective`}>
        <div className={`absolute inset-0 ${color.replace('text-', 'bg-')} opacity-20 blur-[60px] group-hover:opacity-30 transition-all duration-700`}></div>
        
        <div className={`bg-slate-900/90 p-8 rounded-2xl border border-white/10 backdrop-blur-xl relative z-10 hover:border-white/30 transition-all duration-500 hover:-translate-y-2 ${glow} hover:shadow-2xl`}>
          
          <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-xl bg-slate-950 border border-white/10 ${color} text-3xl shadow-lg`}>{icon}</div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full bg-slate-950">{date}</span>
          </div>
          
          <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">{title}</h3>
          <h4 className={`text-xs font-bold mb-5 ${color} tracking-widest uppercase`}>{subtitle}</h4>
          <div className="text-slate-300 leading-relaxed font-normal text-[15px] tracking-wide">
              {children}
          </div>
        </div>
      </div>

      {/* Timeline Node */}
      <div className="hidden md:flex w-2/12 justify-center relative">
        <div className="h-full w-[2px] bg-slate-800 absolute top-0 bottom-0 -z-10"></div>
        <div className={`w-6 h-6 rounded-full bg-slate-950 border-4 border-slate-800 flex items-center justify-center z-10 shadow-[0_0_20px_currentColor] ${color.replace('text-', 'text-')} relative`}>
           <div className={`absolute inset-0 rounded-full ${color.replace('text-', 'bg-')} animate-ping opacity-75 duration-1000`}></div>
           <div className={`w-2 h-2 rounded-full ${color.replace('text-', 'bg-')}`}></div>
        </div>
      </div>

      {/* Spacer */}
      <div className="hidden md:block w-5/12"></div>
    </motion.div>
  );
};

const SquadMember = ({ name, role, skills, color, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -10 }}
    className="relative group h-full"
  >
    <div className={`absolute inset-0 ${color} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`}></div>
    <div className="bg-slate-900/50 border border-white/5 p-8 rounded-2xl relative z-10 hover:border-white/20 transition-colors backdrop-blur-sm h-full flex flex-col justify-between">
      <div>
        <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl ${color} flex items-center justify-center text-white text-3xl font-black shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
          {name.charAt(0)}
        </div>
        <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
        <p className="text-[11px] text-slate-500 uppercase tracking-[0.2em] font-bold mb-6">{role}</p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-2 mt-4">
         {skills.split('•').map((skill, i) => (
             <span key={i} className="text-[10px] bg-white/5 px-2 py-1 rounded text-cyan-400 font-mono border border-white/5">{skill.trim()}</span>
         ))}
      </div>
    </div>
  </motion.div>
);

export default About;