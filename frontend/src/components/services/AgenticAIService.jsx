import React from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaBrain, FaSitemap, FaCodeBranch, FaCheckCircle, FaArrowRight, FaGlobe, FaDatabase } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AgenticAIService = () => {
  return (
    <section className="py-16 md:py-24 bg-[#020617] relative overflow-hidden w-full">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full max-w-[800px] aspect-square bg-purple-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="mb-16 md:mb-24 text-center max-w-4xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-slate-900 border border-purple-500/30 text-purple-400 text-xs font-bold tracking-[0.2em] uppercase mb-6">
            Core Competency
          </span>
          <h2 className="text-3xl md:text-6xl font-black mb-6">
            Agentic AI & <span className="inline-block text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-cyan-500">n8n Automation</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
            We don't just build chatbots. We build autonomous agentic systems that think, plan, and execute complex workflows across your enterprise stack without human intervention.
          </p>
        </div>

        {/* Feature 1: Agentic AI */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-24 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-linear-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-purple-500/30">
                <FaBrain />
              </div>
              <h3 className="text-3xl font-bold text-white">Agentic AI Systems</h3>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Move beyond simple Q&A. Our Agentic AI architectures utilize advanced LLMs combined with dynamic planning algorithms. These agents can break down complex business objectives into actionable steps, query databases, invoke APIs, and finalize decisions autonomously.
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 text-white font-medium">
                <FaCheckCircle className="text-purple-500" /> Multi-Agent Workflows (LangGraph/CrewAI)
              </li>
              <li className="flex items-center gap-3 text-white font-medium">
                <FaCheckCircle className="text-purple-500" /> Autonomous Web Research & Reporting
              </li>
              <li className="flex items-center gap-3 text-white font-medium">
                <FaCheckCircle className="text-purple-500" /> RAG Pipelines with Action Execution
              </li>
            </ul>
            <Link to="/services/agentic-ai" className="inline-flex items-center gap-2 text-purple-400 font-bold hover:text-purple-300 transition-colors group">
              Discuss Agent Integration <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          <div className="order-1 lg:order-2 relative min-h-[350px] h-auto py-8 md:h-[400px] rounded-3xl bg-slate-900 border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center">
            {/* Abstract Diagram Representation */}
            <div className="absolute inset-0 opacity-[0.05]"></div>
            <div className="relative z-10 w-11/12 md:w-3/4 flex flex-col gap-4 md:gap-6">
              <div className="py-3 md:h-16 bg-slate-800 rounded-xl border border-white/5 flex items-center px-4 md:px-6 shadow-inner">
                 <FaRobot className="text-purple-400 mr-3 md:mr-4 text-base md:text-xl shrink-0" />
                 <span className="text-slate-300 font-mono text-[10px] md:text-sm leading-tight break-words pr-2">Observe: Parsing incoming email ticket...</span>
              </div>
              <div className="ml-4 md:ml-8 py-3 md:h-16 bg-slate-800 rounded-xl border border-white/5 flex items-center px-4 md:px-6 shadow-inner border-l-4 border-l-purple-500">
                 <FaBrain className="text-cyan-400 mr-3 md:mr-4 text-base md:text-xl shrink-0" />
                 <span className="text-slate-300 font-mono text-[10px] md:text-sm leading-tight break-words pr-2">Plan: Identifying missing client context via CRM.</span>
              </div>
              <div className="ml-8 md:ml-16 py-3 md:h-16 bg-slate-800 rounded-xl border border-white/5 flex items-center px-4 md:px-6 shadow-inner border-l-4 border-l-emerald-500">
                 <FaCodeBranch className="text-emerald-400 mr-3 md:mr-4 text-base md:text-xl shrink-0" />
                 <span className="text-slate-300 font-mono text-[10px] md:text-sm leading-tight break-words pr-2">Execute: Calling Salesforce API & Drafting response.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2: n8n Workflow Automation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="relative min-h-[300px] h-auto py-8 md:h-[400px] rounded-3xl bg-slate-900 border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center p-4 md:p-8">
            <div className="absolute inset-0 bg-linear-to-tr from-orange-600/10 to-transparent"></div>
            {/* Flow representation */}
            <div className="relative z-10 w-full h-4/5 md:h-full border border-dashed border-white/10 rounded-2xl flex items-center justify-between px-2 md:px-4">
               <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-full bg-slate-800 border border-white/20 flex items-center justify-center text-rose-500 text-lg md:text-2xl shadow-lg z-10"><FaGlobe /></div>
               <div className="flex-1 h-[2px] bg-linear-to-r from-rose-500/50 to-orange-500/50 relative min-w-[10px] md:min-w-[20px]">
                  <motion.div animate={{x: ['0%', '100%', '0%']}} transition={{duration: 3, repeat: Infinity, ease: 'linear'}} className="absolute top-1/2 -translate-y-1/2 w-2 h-2 md:w-4 md:h-4 bg-white rounded-full shadow-[0_0_10px_white]"></motion.div>
               </div>
               <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-2xl bg-orange-600 border border-orange-400 flex items-center justify-center text-white text-xl md:text-3xl shadow-[0_0_30px_rgba(234,88,12,0.4)] z-10"><strong>n8n</strong></div>
               <div className="flex-1 h-[2px] bg-linear-to-r from-orange-500/50 to-cyan-500/50 relative min-w-[10px] md:min-w-[20px]">
                  <motion.div animate={{x: ['100%', '0%', '100%']}} transition={{duration: 3, repeat: Infinity, ease: 'linear'}} className="absolute top-1/2 -translate-y-1/2 w-2 h-2 md:w-4 md:h-4 bg-white rounded-full shadow-[0_0_10px_white]"></motion.div>
               </div>
               <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-full bg-slate-800 border border-white/20 flex items-center justify-center text-cyan-500 text-lg md:text-2xl shadow-lg z-10"><FaDatabase /></div>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-linear-to-br from-orange-500 to-rose-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-orange-500/30">
                <FaSitemap />
              </div>
              <h3 className="text-3xl font-bold text-white">n8n Workflow Automation</h3>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              We replace thousands of manual hours with resilient, node-based automation logic. Using **n8n**, we wire your SaaS tools, external APIs, and internal databases together. When a lead is captured, n8n orchestrates the CRM updates, triggers a slack alert, and dispatches an AI-generated introductory email—within 2 seconds.
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 text-white font-medium">
                <FaCheckCircle className="text-orange-500" /> Self-Hosted n8n for Data Privacy
              </li>
              <li className="flex items-center gap-3 text-white font-medium">
                <FaCheckCircle className="text-orange-500" /> Complex Branching & Error Handling
              </li>
              <li className="flex items-center gap-3 text-white font-medium">
                <FaCheckCircle className="text-orange-500" /> Webhooks & Event-Driven Architecture
              </li>
            </ul>
            <Link to="/services/n8n-automation" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors group">
              Automate Your Operations <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default AgenticAIService;
