import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaRobot, FaCheckCircle, FaNetworkWired, FaCodeBranch, FaDatabase } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AgenticAIDetailed = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#020617] min-h-screen text-slate-100 pt-24 pb-20 px-5 sm:px-6 font-sans overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="container mx-auto max-w-6xl text-center pb-12 pt-8 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] max-w-[800px] aspect-square bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 mx-auto max-w-4xl">
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-950/50 border border-indigo-500/30 text-indigo-400 font-bold tracking-widest uppercase text-[10px] sm:text-xs mb-8 backdrop-blur-md">
            Autonomous Business Logic
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 md:mb-8 tracking-tight font-display leading-[1.1]">
            Deploy <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">Autonomous Agents</span><br className="hidden sm:block" />
            To Run Your Operations.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed px-2 font-light">
            Standard AI models just talk. Our Agentic AI Systems integrate with your databases, APIs, and enterprise software to execute real-world workflows without human intervention.
          </p>
        </motion.div>
      </section>

      {/* The Architecture */}
      <section className="container mx-auto max-w-6xl py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-display">How Our Agents Work</h2>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8">
              Using frameworks like <strong>LangGraph</strong> and <strong>CrewAI</strong>, we orchestrate multiple specialized agents. One agent may handle web research, another analyzes the SQL database, and a final agent compiles the report and emails it to the stakeholders. 
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 p-5 rounded-2xl bg-slate-900/50 border border-white/5 backdrop-blur-sm">
                <FaRobot className="text-2xl text-indigo-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-white text-base md:text-lg font-display">Goal-Oriented Planning</h4>
                  <p className="text-sm text-slate-400 mt-1 leading-relaxed">The agent breaks down massive tasks into logical sub-tasks dynamically.</p>
                </div>
              </li>
              <li className="flex items-start gap-4 p-5 rounded-2xl bg-slate-900/50 border border-white/5 backdrop-blur-sm">
                <FaCodeBranch className="text-2xl text-sky-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-white text-base md:text-lg font-display">Tool Invocation</h4>
                  <p className="text-sm text-slate-400 mt-1 leading-relaxed">We give our agents access to Google Search, Python interpreters, and your internal APIs.</p>
                </div>
              </li>
              <li className="flex items-start gap-4 p-5 rounded-2xl bg-slate-900/50 border border-white/5 backdrop-blur-sm">
                <FaDatabase className="text-2xl text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-white text-base md:text-lg font-display">RAG Memory Access</h4>
                  <p className="text-sm text-slate-400 mt-1 leading-relaxed">Agents retain memory across sessions and query your proprietary documents via Vector Databases.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-slate-900/40 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-xl relative overflow-hidden shadow-[0_0_50px_rgba(99,102,241,0.1)] flex flex-col justify-center items-center h-[350px] md:h-[500px] w-full">
             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-900/10"></div>
             {/* Visual abstraction of nodes */}
             <div className="w-full flex justify-between items-center z-10 px-2 sm:px-4">
               <div className="text-center">
                 <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-slate-950 flex items-center justify-center border border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)] mx-auto"><FaBrain className="text-xl sm:text-2xl text-indigo-400" /></div>
                 <p className="text-[10px] sm:text-xs uppercase mt-3 text-slate-400 font-bold tracking-widest">Manager</p>
               </div>
               <div className="flex-1 h-px bg-slate-700 relative mx-2 sm:mx-4">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-indigo-500 absolute top-1/2 -translate-y-1/2 left-1/4 animate-ping"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-sky-500 absolute top-1/2 -translate-y-1/2 right-1/4 animate-pulse"></div>
               </div>
               <div className="text-center">
                 <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-slate-950 flex items-center justify-center border border-sky-500 shadow-[0_0_20px_rgba(14,165,233,0.3)] mx-auto"><FaRobot className="text-xl sm:text-2xl text-sky-400" /></div>
                 <p className="text-[10px] sm:text-xs uppercase mt-3 text-slate-400 font-bold tracking-widest">Worker</p>
               </div>
             </div>
             <p className="text-center font-mono text-[10px] sm:text-xs text-indigo-300 mt-10 bg-[#020617] px-3 py-2 rounded-xl border border-indigo-500/20 z-10 w-full sm:w-auto break-words">
               &gt; Pipeline.Execute(Data)
             </p>
          </div>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="container mx-auto max-w-6xl py-16 md:py-24 relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center font-display">Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Deployments</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 sm:p-8 bg-slate-900/40 border border-white/5 rounded-3xl hover:border-indigo-500/30 transition-all backdrop-blur-md group hover:-translate-y-1">
             <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-2xl text-indigo-400 mb-6 group-hover:scale-110 transition-transform"><FaNetworkWired /></div>
             <h3 className="text-lg sm:text-xl font-bold mb-3 font-display">L1/L2 Technical Support</h3>
             <p className="text-slate-400 text-sm leading-relaxed">Agents that read historical ticketing data, access user machine logs via API, and dynamically resolve 60%+ of tier-1 support requests instantly.</p>
          </div>
          <div className="p-6 sm:p-8 bg-slate-900/40 border border-white/5 rounded-3xl hover:border-sky-500/30 transition-all backdrop-blur-md group hover:-translate-y-1">
             <div className="w-14 h-14 rounded-2xl bg-sky-500/10 flex items-center justify-center text-2xl text-sky-400 mb-6 group-hover:scale-110 transition-transform"><FaCheckCircle /></div>
             <h3 className="text-lg sm:text-xl font-bold mb-3 font-display">Legal & Contract Check</h3>
             <p className="text-slate-400 text-sm leading-relaxed">Upload standard NDAs or vendor agreements. The agent checks terms against enterprise policy, flags anomalies, and formats a report.</p>
          </div>
          <div className="p-6 sm:p-8 bg-slate-900/40 border border-white/5 rounded-3xl hover:border-emerald-500/30 transition-all backdrop-blur-md group hover:-translate-y-1">
             <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-2xl text-emerald-400 mb-6 group-hover:scale-110 transition-transform"><FaDatabase /></div>
             <h3 className="text-lg sm:text-xl font-bold mb-3 font-display">Automated BI Analytics</h3>
             <p className="text-slate-400 text-sm leading-relaxed">An agent connected to an AWS RDS instance that writes SQL, executes it securely, and generates charts every morning based on natural language.</p>
          </div>
        </div>
      </section>

      {/* FIXED MOBILE CTA */}
      <section className="container mx-auto max-w-4xl py-16 md:py-24 text-center px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 font-display leading-tight">Ready to Automate <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">Intelligence?</span></h2>
        <p className="text-base sm:text-lg text-slate-400 mb-10 max-w-2xl mx-auto px-2 leading-relaxed">Stop writing static bots. Let’s deploy autonomous agents that actually execute tasks and learn on the job.</p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full px-2">
            <Link to="/contact" className="w-full sm:w-auto inline-block text-center px-8 sm:px-10 py-4 bg-white text-slate-950 font-bold text-sm sm:text-base rounded-xl hover:bg-slate-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.15)] flex-none">
              Schedule Architecture Call
            </Link>
        </div>
      </section>

    </div>
  );
};

export default AgenticAIDetailed;
