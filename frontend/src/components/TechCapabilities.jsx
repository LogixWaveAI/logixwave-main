import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { 
  Globe, Smartphone, BrainCircuit, 
  Terminal, Activity, Cpu, Zap, Layers, Scan 
} from 'lucide-react';

// --- DATA CONFIG (CONTENT RESTORED TO GOD LEVEL) ---
const services = [
  {
    id: 'mern',
    title: 'Complete MERN Stack',
    subtitle: 'Full Stack with Adv. Auth',
    description: 'We dominate the web with the complete MERN stack. Implementing secure Google Authentication, JWT sessions, and role-based access control. We handle everything from complex MongoDB aggregations to high-performance SQL relations.',
    icon: <Globe className="w-8 h-8" />,
    color: 'from-cyan-400 to-blue-600', // Gradient for Glass Effect
    glow: '#06B6D4',
    stats: [
      { label: 'Security', value: 100, suffix: '%' },
      { label: 'Scalability', value: 99.9, suffix: '%' }
    ],
    // RESTORED CATEGORIZED STACK
    stack: {
      Frontend: ['React.js', 'Next.js 14', 'Redux Toolkit', 'Tailwind CSS'],
      Backend: ['Node.js', 'Express.js', 'NestJS', 'WebSockets'],
      Auth_Security: ['Google OAuth', 'Passport.js', 'JWT', 'Firebase Auth'],
      Database: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis']
    },
    cmd: 'initiating_secure_handshake --auth=google'
  },
  {
    id: 'mobile',
    title: 'Mobile Application',
    subtitle: 'React Native + Node Backend',
    description: 'We build native-grade mobile apps using React Native, powered by a robust Node.js backend. We ensure seamless data synchronization, offline capabilities, and buttery smooth 60FPS performance on both iOS and Android.',
    icon: <Smartphone className="w-8 h-8" />,
    color: 'from-fuchsia-500 to-purple-600',
    glow: '#D946EF',
    stats: [
      { label: 'Performance', value: 60, suffix: 'fps' },
      { label: 'Native Feel', value: 100, suffix: '%' }
    ],
    stack: {
      App_Dev: ['React Native', 'Expo', 'NativeWind', 'Reanimated'],
      Backend_Sys: ['Node.js', 'Express', 'Microservices', 'REST APIs'],
      Real_Time: ['Socket.io', 'Push Notifications', 'TanStack Query'],
      Deployment: ['Play Store', 'App Store', 'TestFlight', 'CI/CD']
    },
    cmd: 'compiling_android_ios_bundle...'
  },
  {
    id: 'ai',
    title: 'AI & Data Science',
    subtitle: 'Complete AI/ML & Analytics Suite',
    description: 'We possess absolute mastery over the entire AI landscape. From classical Machine Learning to cutting-edge Generative AI, Large Language Models (LLMs), Computer Vision, and Predictive Analytics.',
    icon: <BrainCircuit className="w-8 h-8" />,
    color: 'from-emerald-400 to-green-600',
    glow: '#10B981',
    stats: [
      { label: 'Intelligence', value: 100, suffix: '%' },
      { label: 'Capabilities', value: 100, suffix: '%' }
    ],
    stack: {
      GenAI_LLM: ['RAG', 'LangChain', 'Llama 3', 'OpenAI', 'Gemini'],
      Deep_Learning: ['TensorFlow', 'Keras', 'PyTorch', 'Transformers'],
      Data_Science: ['Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib'],
      Deployment: ['FastAPI', 'Flask', 'Celery', 'Docker', 'MLFlow']
    },
    cmd: 'executing_master_algorithm --all-systems-go'
  }
];

// --- COUNTER COMPONENT ---
const Counter = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); } 
      else { setCount(start); }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{count.toFixed(value % 1 === 0 ? 0 : 1)}{suffix}</span>;
};

// --- GLASS CARD COMPONENT ---
const TechCard = ({ service, index }) => {
  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div 
      onMouseMove={onMouseMove}
      className="group relative w-full h-[800px] perspective-1000"
    >
      {/* GLOWING BORDER GRADIENT */}
      <div className={`absolute -inset-0.5 bg-gradient-to-br ${service.color} opacity-30 group-hover:opacity-100 blur transition duration-500 rounded-2xl`}></div>
      
      {/* MAIN CARD BODY */}
      <div className="relative h-full bg-slate-950/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col overflow-hidden">
        
        {/* HOVER SPOTLIGHT */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-20 transition duration-300 rounded-2xl z-0"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                500px circle at ${mouseX}px ${mouseY}px,
                ${service.glow},
                transparent 80%
              )
            `
          }}
        />

        {/* --- HEADER --- */}
        <div className="relative z-10 flex justify-between items-start mb-8">
            <div className={`p-4 rounded-xl bg-gradient-to-br ${service.color} text-white shadow-lg shadow-${service.glow}/20`}>
                {service.icon}
            </div>
            <div className="text-right">
                <div className="flex items-center justify-end gap-2 text-xs font-mono text-cyan-400 mb-1">
                    <Activity size={14} className="animate-pulse" />
                    <span>SYSTEM_ONLINE</span>
                </div>
                <div className="h-1.5 w-24 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className={`h-full bg-gradient-to-r ${service.color}`} 
                    />
                </div>
            </div>
        </div>

        {/* --- TITLE & INFO --- */}
        <div className="relative z-10 mb-8">
            <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">
                {service.title}
            </h3>
            <p className={`text-sm font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent mb-4 inline-block`}>
                {service.subtitle}
            </p>
            <p className="text-slate-300 text-sm leading-relaxed font-medium">
                {service.description}
            </p>
        </div>

        {/* --- STATS --- */}
        <div className="relative z-10 grid grid-cols-2 gap-4 mb-8">
            {service.stats.map((stat, i) => (
                <div key={i} className="bg-slate-900/50 border border-white/5 rounded-lg p-3 text-center group-hover:border-white/20 transition-colors">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">{stat.label}</p>
                    <p className={`text-2xl font-black bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                        <Counter value={stat.value} suffix={stat.suffix} />
                    </p>
                </div>
            ))}
        </div>

        {/* --- TECH STACK (Categorized & Styled) --- */}
        <div className="relative z-10 flex-grow space-y-4 overflow-y-auto pr-1 custom-scrollbar">
            {Object.entries(service.stack).map(([category, techs], idx) => (
                <div key={idx}>
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Layers size={10} /> {category.replace('_', ' ')}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {techs.map((tech, tIdx) => (
                            <span 
                                key={tIdx} 
                                className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-800/50 text-slate-300 border border-white/5 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all cursor-default"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>

        {/* --- FOOTER TERMINAL --- */}
        <div className="relative z-10 mt-auto pt-4 border-t border-white/5">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                <Terminal size={12} />
                <span className="text-emerald-500">root@sys:</span>
                <span className="typing-effect">{service.cmd}</span>
                <span className="w-1.5 h-3 bg-emerald-500 animate-pulse"></span>
            </div>
        </div>

      </div>
    </div>
  );
};

// --- MAIN SECTION ---
const TechCapabilities = () => {
  return (
    <section className="relative py-32 bg-slate-950 overflow-hidden">
      
      {/* VIBRANT BACKGROUND FX */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <div className="mb-24 text-center max-w-4xl mx-auto">
             <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs font-bold text-cyan-400 mb-8 shadow-lg shadow-cyan-500/10"
             >
                <Cpu size={14} />
                <span>ELITE SYSTEM ARCHITECTURE</span>
             </motion.div>

             <motion.h2 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6"
             >
                WE BUILD <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                    DIGITAL EMPIRES
                </span>
             </motion.h2>

             <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                We don’t just code — we engineer superiority. From complex MERN infrastructures to autonomous AI agents, we build the systems that power the future.
             </p>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
                <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                >
                    <TechCard service={service} index={index} />
                </motion.div>
            ))}
        </div>

      </div>
    </section>
  );
};

export default TechCapabilities;