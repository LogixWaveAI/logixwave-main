import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCheck, FaLaptopCode, FaCogs, FaRocket } from 'react-icons/fa';
import { servicesData } from '../constants/services';

const ServiceDetail = () => {
  const { id } = useParams();
  const service = servicesData.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">
        <div className="text-center px-6">
          <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
          <Link to="/" className="text-cyan-400 hover:underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden relative">
      
      {/* --- 1. HERO SECTION --- */}
      <div className="relative pt-28 pb-12 md:pt-48 md:pb-24 px-4 sm:px-6 border-b border-white/5">
        
        {/* Ambient Background Glow */}
        <div className={`absolute top-0 right-0 w-full md:w-[60%] h-[500px] bg-gradient-to-b ${service.gradient} opacity-10 blur-[100px] pointer-events-none`} />

        <div className="container mx-auto max-w-7xl relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white mb-8 md:mb-12 transition-colors text-xs md:text-sm font-bold uppercase tracking-widest group">
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Services
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Service Badge */}
            <div className="flex flex-wrap items-center gap-3 md:gap-5 mb-6 md:mb-8">
              <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-3xl text-white bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 shadow-lg`}>
                {service.icon}
              </div>
              <span className={`px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-white/10 bg-white/5 text-${service.color}-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.15em]`}>
                {service.subtitle}
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-4 md:mb-6 leading-tight tracking-tight text-white max-w-5xl">
              {service.title}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl leading-relaxed font-light border-l-2 border-white/10 pl-4 md:pl-6">
              {service.shortDesc}
            </p>
          </motion.div>
        </div>
      </div>

      {/* --- 2. MAIN CONTENT GRID --- */}
      <section className="relative z-10 px-4 sm:px-6 py-12 md:py-24">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            
            {/* === LEFT: BLOG CONTENT (Styled & Responsive) === */}
            <div className="lg:col-span-8 order-2 lg:order-1">
              <div className="space-y-12">
                {service.blogContent && service.blogContent.map((block, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group"
                  >
                    {/* Subtle Side Line for styling */}
                    <div className={`absolute -left-4 md:-left-8 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b ${service.gradient} opacity-20 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    <h2 className={`text-xl md:text-3xl font-bold mb-4 md:mb-6 flex items-center gap-3 text-white group-hover:text-${service.color}-400 transition-colors`}>
                      <span className="text-slate-600 text-sm md:text-lg font-mono">0{index + 1}.</span> 
                      {block.heading}
                    </h2>
                    
                    <div className="bg-slate-900/30 border border-white/5 rounded-2xl p-5 md:p-8 hover:bg-slate-900/50 hover:border-white/10 transition-all">
                      <p className="text-sm md:text-lg text-slate-300 leading-relaxed font-light text-justify md:text-left">
                        {block.text.split('**').map((part, i) => 
                          i % 2 === 1 ? <strong key={i} className={`text-${service.color}-300 font-semibold`}>{part}</strong> : part
                        )}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* === RIGHT: SIDEBAR (Sticky Desktop) === */}
            <div className="lg:col-span-4 order-1 lg:order-2">
              <div className="lg:sticky lg:top-24 space-y-6 md:space-y-8">
                
                {/* Tech Stack Card */}
                <div className="bg-[#0b1121] p-5 md:p-6 rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-20 h-20 bg-${service.color}-500/10 blur-xl rounded-full`}></div>
                  
                  <h3 className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 md:mb-6 flex items-center gap-2 relative z-10">
                    <FaLaptopCode /> Technology Core
                  </h3>
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {service.tech.map((t, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-white/5 text-slate-300 text-[10px] md:text-xs font-bold hover:bg-white/10 hover:text-white transition-colors cursor-default">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Capabilities List */}
                <div className="bg-[#0b1121] p-5 md:p-6 rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl">
                  <h3 className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 md:mb-6 flex items-center gap-2">
                    <FaCogs /> Capabilities
                  </h3>
                  <ul className="space-y-3 md:space-y-4">
                    {service.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-slate-300">
                        <FaCheck className={`mt-0.5 text-${service.color}-500 shrink-0`} size={12} />
                        <span className="leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Card */}
                <div className={`p-6 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-br ${service.gradient} text-white shadow-lg relative overflow-hidden group`}>
                  <div className="absolute -right-4 -top-4 md:-right-6 md:-top-6 text-white opacity-10 transform rotate-12 group-hover:scale-110 transition-transform duration-700">
                    <FaRocket size={100} />
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-black mb-2 relative z-10">Start This Project?</h3>
                  <p className="text-white/80 text-xs md:text-sm mb-6 relative z-10 font-medium leading-relaxed">
                    Let's architect a custom solution for your business.
                  </p>
                  
                  <Link to="/contact" className="block w-full bg-white text-black font-bold text-center text-sm md:text-base py-3 md:py-3.5 rounded-xl hover:bg-slate-100 hover:scale-[1.02] transition-all relative z-10 shadow-xl">
                    Get a Quote
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- 3. FOOTER NAV --- */}
      <section className="py-16 md:py-24 text-center border-t border-white/5 bg-[#020617]">
        <h2 className="text-xl md:text-2xl font-bold text-slate-500 mb-4">Looking for more?</h2>
        <Link to="/" className="text-white hover:text-cyan-400 font-bold border-b-2 border-transparent hover:border-cyan-400 transition-all pb-1 text-sm md:text-base">
          Explore All Services
        </Link>
      </section>

    </div>
  );
};

export default ServiceDetail;