import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSitemap, FaPlay, FaRandom, FaServer, FaCode, FaCheckDouble } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const N8nAutomationDetailed = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#020617] min-h-screen text-slate-100 pt-24 pb-20 px-5 sm:px-6 font-sans overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="container mx-auto max-w-6xl text-center pb-12 pt-8 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] max-w-[800px] aspect-square bg-orange-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 mx-auto max-w-4xl">
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-950/50 border border-orange-500/30 text-orange-400 font-bold tracking-widest uppercase text-[10px] sm:text-xs mb-8 backdrop-blur-md">
            Hyper-Automation Engine
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 md:mb-8 tracking-tight font-display leading-[1.1]">
            We Connect APIs Using <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">n8n Custom Workflows</span>.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed px-2 font-light">
            Eliminate operational drag. We replace human data entry and disjointed systems with robust, self-hosted n8n workflows that run 24/7 without fail.
          </p>
        </motion.div>
      </section>

      {/* Feature Breakdown */}
      <section className="container mx-auto max-w-6xl py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 items-center">
          <div className="order-2 md:order-1 bg-slate-900/40 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-xl relative overflow-hidden shadow-[0_0_50px_rgba(234,88,12,0.1)] flex flex-col justify-center items-center min-h-[350px] md:h-[500px]">
             {/* Flow Visual */}
             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-900/10"></div>
             <div className="flex flex-col gap-3 sm:gap-4 w-full px-2 sm:px-6 z-10">
                <div className="flex items-center gap-3 bg-[#020617] py-3 px-4 rounded-xl border border-rose-500/30">
                  <div className="bg-rose-500/20 p-2 rounded-lg text-rose-400"><FaPlay className="text-sm" /></div>
                  <span className="text-[10px] sm:text-xs font-mono text-slate-300 uppercase tracking-widest font-semibold">Webhook (Lead Captured)</span>
                </div>
                <div className="w-px h-6 bg-orange-500/50 mx-auto"></div>
                <div className="flex flex-col gap-1.5 bg-[#020617] py-3 px-4 rounded-xl border border-orange-500/30 shadow-lg shadow-orange-500/10">
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-500/20 p-2 rounded-lg text-orange-400"><FaCode className="text-sm" /></div>
                    <span className="text-[10px] sm:text-xs font-mono text-white font-bold uppercase tracking-widest">Node logic (Verify)</span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-slate-500 pl-12 uppercase tracking-wider">Transformation via JS</span>
                </div>
                <div className="flex justify-center gap-12 sm:gap-16 w-full -mt-2">
                   <div className="w-px h-6 sm:h-8 bg-orange-500/50 -rotate-45 translate-y-3 translate-x-3 sm:translate-x-4"></div>
                   <div className="w-px h-6 sm:h-8 bg-orange-500/50 rotate-45 translate-y-3 -translate-x-3 sm:-translate-x-4"></div>
                </div>
                <div className="flex justify-between mt-2 gap-2 sm:gap-4">
                  <div className="flex items-center justify-center gap-2 bg-[#020617] py-3 px-2 rounded-xl border border-white/5 w-1/2">
                    <div className="text-blue-400"><FaServer className="text-xs" /></div>
                    <span className="text-[8px] sm:text-[9px] font-mono text-slate-300 uppercase tracking-widest">PostgreSQL</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 bg-[#020617] py-3 px-2 rounded-xl border border-white/5 w-1/2">
                    <div className="text-emerald-400"><FaCheckDouble className="text-xs" /></div>
                    <span className="text-[8px] sm:text-[9px] font-mono text-slate-300 uppercase tracking-widest">Slack Ping</span>
                  </div>
                </div>
             </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-display">Why n8n Over Zapier?</h2>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8">
              Zapier gets expensive fast, lacks complex branching, and exposes data to third-party servers. We deploy <strong>self-hosted n8n instances</strong> directly on your cloud architecture. You own the data perfectly.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 p-5 rounded-2xl bg-slate-900/50 border border-white/5 backdrop-blur-sm">
                <FaServer className="text-2xl text-orange-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-white text-base md:text-lg font-display">Self-Hosted Security</h4>
                  <p className="text-sm text-slate-400 mt-1 leading-relaxed">Deployed within your VPC. Perfect for scaling and stringent data compliance.</p>
                </div>
              </li>
              <li className="flex items-start gap-4 p-5 rounded-2xl bg-slate-900/50 border border-white/5 backdrop-blur-sm">
                <FaRandom className="text-2xl text-rose-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-white text-base md:text-lg font-display">Iterative Branching</h4>
                  <p className="text-sm text-slate-400 mt-1 leading-relaxed">Handle true logic gates (If/Else, Switch, Try/Catch) natively inside the editor.</p>
                </div>
              </li>
              <li className="flex items-start gap-4 p-5 rounded-2xl bg-slate-900/50 border border-white/5 backdrop-blur-sm">
                <FaCode className="text-2xl text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-white text-base md:text-lg font-display">Custom Nodes</h4>
                  <p className="text-sm text-slate-400 mt-1 leading-relaxed">We write custom HTTP requests and raw JavaScript nodes for proprietary internal tools.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FIXED MOBILE CTA */}
      <section className="container mx-auto max-w-4xl py-16 md:py-24 text-center px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 font-display leading-tight">Stop Doing <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400">Manual Work</span></h2>
        <p className="text-base sm:text-lg text-slate-400 mb-10 max-w-2xl mx-auto px-2 leading-relaxed">We audit your business processes, identify repetitive tasks, and design resilient n8n pipelines to automate them with 99.9% uptime.</p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full px-2">
            <Link to="/contact" className="w-full sm:w-auto inline-block text-center px-8 sm:px-10 py-4 bg-white text-slate-950 font-bold text-sm sm:text-base rounded-xl hover:bg-slate-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.15)] flex-none">
              Request Automation Audit
            </Link>
        </div>
      </section>

    </div>
  );
};

export default N8nAutomationDetailed;
