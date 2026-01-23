import React from "react";
import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Discovery & Intel",
    desc: "We decode your requirements and analyze market gaps. No assumptions, just data-driven strategy.",
    icon: <Search className="w-6 h-6" />,
    color: "cyan",
  },
  {
    id: 2,
    title: "System Architecture",
    desc: "We engineer the blueprint. Database schemas, API endpoints, and scalable infrastructure planning.",
    icon: <PenTool className="w-6 h-6" />,
    color: "fuchsia",
  },
  {
    id: 3,
    title: "Development Core",
    desc: "Our engineers execute the code. Clean, modular, and tested systems built on the MERN/Native stack.",
    icon: <Code2 className="w-6 h-6" />,
    color: "blue",
  },
  {
    id: 4,
    title: "Launch & Scale",
    desc: "Deployment to cloud clusters (AWS/Vercel). We monitor, optimize, and scale as you grow.",
    icon: <Rocket className="w-6 h-6" />,
    color: "emerald",
  },
];

const TheBlueprint = () => {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            THE <span className="text-cyan-400">BLUEPRINT</span>
          </h2>
          <p className="text-slate-400 text-lg">
            From abstract concept to deployed dominance. Our four-stage execution protocol.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Hidden on Mobile) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2 rounded-full">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500"
            />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                {/* Step Card */}
                <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl hover:border-slate-600 transition-all duration-300 h-full relative z-10">
                  {/* Icon Bubble */}
                  <div
                    className={`w-14 h-14 rounded-full bg-slate-950 border border-${step.color}-500/30 flex items-center justify-center text-${step.color}-400 mb-6 mx-auto md:mx-0 shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-300`}
                  >
                    {step.icon}
                  </div>

                  {/* Step Number */}
                  <div className="absolute top-4 right-4 text-4xl font-black text-slate-800 select-none">
                    0{step.id}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TheBlueprint;