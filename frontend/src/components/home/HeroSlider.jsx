import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCreative } from 'swiper/modules';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { FaGithub, FaLinkedin, FaDownload, FaCode, FaDatabase, FaBrain, FaMobileAlt, FaLaptopCode, FaArrowDown } from 'react-icons/fa';
import axios from 'axios';

// Styles
import 'swiper/css';
import 'swiper/css/effect-creative';

// --- THEME CONFIG ---
const getThemeColors = (color) => {
  switch (color) {
    case 'purple': return { 
        glow: '#a855f7', 
        text: 'text-purple-400', 
        gradient: 'from-purple-600 via-fuchsia-500 to-indigo-600', 
        border: 'border-purple-500/30',
        shadow: 'shadow-purple-500/40' 
    };
    case 'emerald': return { 
        glow: '#10b981', 
        text: 'text-emerald-400', 
        gradient: 'from-emerald-600 via-teal-500 to-green-500', 
        border: 'border-emerald-500/30',
        shadow: 'shadow-emerald-500/40'
    };
    case 'red': return { 
        glow: '#f43f5e', 
        text: 'text-rose-400', 
        gradient: 'from-rose-600 via-red-500 to-orange-600', 
        border: 'border-rose-500/30',
        shadow: 'shadow-rose-500/40'
    };
    default: return { 
        glow: '#06b6d4', 
        text: 'text-cyan-400', 
        gradient: 'from-cyan-600 via-blue-500 to-indigo-600', 
        border: 'border-cyan-500/30',
        shadow: 'shadow-cyan-500/40'
    };
  }
};

// --- HACKER TEXT EFFECT ---
const HackerText = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text || "");
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_#@$";

  useEffect(() => {
    if (!text) return;
    setDisplayText(text); 
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text.split("").map((letter, index) => {
          if (index < iteration) return text[index];
          return letters[Math.floor(Math.random() * letters.length)];
        }).join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1/3; 
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{displayText}</span>;
};

// --- MAGNETIC BUTTON ---
const MagneticButton = ({ children, className, onClick, href }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const ySpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        x.set((clientX - centerX) * 0.3);
        y.set((clientY - centerY) * 0.3);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const content = (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: xSpring, y: ySpring }}
            className={className}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );

    if (href) return <a href={href} target="_blank" rel="noreferrer">{content}</a>;
    return content;
};

const HeroSlider = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const bgGradient = useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(20, 20, 30, 0.4), transparent 80%)`;
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.03), transparent 80%)`;

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/members');
        setMembers(data);
      } catch (error) { console.error("API Error:", error); } 
      finally { setLoading(false); }
    };
    fetchTeam();
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  // --- ORIGINAL BADGE LOGIC RESTORED ---
  const getMemberBadges = (member, theme) => {
    const badges = [];
    const searchStr = `${member.role || ""} ${member.desc || ""}`.toLowerCase();

    // 1. WEB / MERN
    if (searchStr.includes('mern') || searchStr.includes('full') || searchStr.includes('web') || searchStr.includes('react') || searchStr.includes('node') || searchStr.includes('javascript')) {
        badges.push({ 
            icon: <FaCode />, 
            text: "Full Stack", 
            position: "top-[10%] left-2 md:top-[20%] md:left-[10%]", 
            delay: 0.5 
        });
    }

    // 2. AI / DATA
    if (searchStr.includes('ai') || searchStr.includes('data') || searchStr.includes('ml') || searchStr.includes('intelligence') || searchStr.includes('python')) {
        badges.push({ 
            icon: <FaBrain />, 
            text: "AI Architect", 
            position: "top-[5%] right-2 md:top-[15%] md:right-[10%]", 
            delay: 0.7 
        });
        badges.push({ 
            icon: <FaDatabase />, 
            text: "Data Science", 
            position: "bottom-[20%] right-2 md:bottom-[30%] md:right-[5%]", 
            delay: 0.9 
        });
    } 
    // Fallback: UI/UX
    else if (badges.length > 0 && (searchStr.includes('ui') || searchStr.includes('ux') || searchStr.includes('frontend') || searchStr.includes('design'))) {
          badges.push({ 
             icon: <FaLaptopCode />, 
             text: "Modern UI", 
             position: "top-[5%] right-2 md:top-[15%] md:right-[10%]", 
             delay: 0.8 
         });
    }

    // 3. MOBILE APPS
    if (
        searchStr.includes('mobile') || 
        searchStr.includes('android') || 
        searchStr.includes('ios') || 
        searchStr.includes('flutter') || 
        searchStr.includes('react native') ||
        searchStr.includes('swift') ||
        searchStr.includes('kotlin')
    ) {
        const isRightCrowded = searchStr.includes('ai') || searchStr.includes('data');
        badges.push({ 
            icon: <FaMobileAlt />, 
            text: "Mobile Apps", 
            position: isRightCrowded 
                ? "bottom-[15%] left-2 md:bottom-[20%] md:left-[10%]" 
                : "bottom-[20%] right-2 md:bottom-[30%] md:right-[5%]", 
            delay: 1.0 
        });
    }

    return badges;
  };

  if (loading) return (
    <div className="h-[100dvh] bg-[#020617] flex items-center justify-center font-mono text-cyan-500 animate-pulse tracking-[0.3em] text-sm">
        SYSTEM_INITIALIZING...
    </div>
  );

  return (
    <section
      className="relative min-h-[100dvh] lg:h-[100dvh] w-full bg-[#020617] overflow-hidden flex items-center justify-center cursor-default"
      onMouseMove={handleMouseMove}
    >
      <motion.div className="pointer-events-none fixed inset-0 z-0" style={{ background: bgGradient }} />
      <motion.div className="pointer-events-none fixed inset-0 z-1" style={{ background: spotlight }} />
      
      <div className="absolute inset-0 z-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <Swiper
        modules={[Autoplay, EffectCreative]}
        effect="creative"
        creativeEffect={{
          prev: { translate: ['-20%', 0, -100], opacity: 0, scale: 0.9 },
          next: { translate: ['100%', 0, 0], opacity: 0, scale: 0.9 }
        }}
        slidesPerView={1}
        speed={1000}
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        className="h-full w-full z-10"
        onSlideChange={(swiper) => {
            if (swiper.activeIndex === 0) {
                swiper.params.autoplay.delay = 10000;
            } else {
                swiper.params.autoplay.delay = 5000;
            }
        }}
      >
        {members.map((member) => {
          const theme = getThemeColors(member.colorTheme);
          const fullName = member.name || "Member";
          const firstName = fullName.split(' ')[0];
          const lastName = fullName.split(' ').slice(1).join(' ');
          const badges = getMemberBadges(member, theme);

          return (
            <SwiperSlide key={member._id}>
              {({ isActive }) => (
                <div className="relative w-full h-full flex items-center lg:overflow-hidden overflow-y-auto overflow-x-hidden"> 
                  
                  {/* --- FIX: Added lg:pb-24 to push content UP on Laptop --- */}
                  <div className="container mx-auto px-4 sm:px-6 h-full flex flex-col-reverse lg:flex-row items-center justify-center relative pb-32 pt-0 lg:pt-0 lg:pb-24">

                    {/* --- LEFT: TYPOGRAPHY --- */}
                    <div className="w-full lg:w-[45%] z-40 flex flex-col justify-end lg:justify-center items-center lg:items-start text-center lg:text-left h-auto lg:h-full mt-[-20px] lg:mt-0 relative">
                      
                      <motion.div
                        initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
                        animate={isActive ? { opacity: 1, x: 0, filter: 'none' } : { opacity: 0, x: -30, filter: 'blur(10px)' }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col items-center lg:items-start justify-center w-full"
                      >
                        {/* ROLE BADGE */}
                        <div className={`inline-flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-4 md:py-2 rounded-full border bg-slate-900/80 backdrop-blur-md ${theme.border} mb-4 md:mb-6 lg:mb-10 group shadow-lg`}>
                          <span className="relative flex h-2 w-2">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75`} style={{ backgroundColor: theme.glow }}></span>
                            <span className={`relative inline-flex rounded-full h-2 w-2`} style={{ backgroundColor: theme.glow }}></span>
                          </span>
                          <span className={`text-[10px] md:text-xs font-mono font-bold tracking-[0.2em] uppercase text-slate-300 group-hover:${theme.text} transition-colors`}>{member.role}</span>
                        </div>

                        {/* NAME */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[7.5rem] font-black leading-tight tracking-tighter mb-0 relative select-none pb-16">
                           <span 
                             className="block text-transparent bg-clip-text opacity-40 md:opacity-20"
                             style={{ WebkitTextStroke: `1px rgba(255,255,255,1)` }}
                           >
                             {isActive ? <HackerText text={firstName} /> : firstName}
                           </span>
                           <span className={`block bg-clip-text text-transparent bg-gradient-to-r ${theme.gradient} drop-shadow-[0_0_30px_rgba(0,0,0,0.4)] transform -translate-y-2 lg:-translate-y-4 relative`}>
                             {lastName}
                           </span>
                        </h1>

                        {/* DESCRIPTION */}
                        <p className="text-slate-300 md:text-slate-400 text-xs sm:text-sm md:text-base lg:text-lg max-w-xs md:max-w-lg leading-relaxed font-normal md:font-light -mt-6 mb-6 md:mb-10 border-l-2 border-white/10 pl-4 text-left mx-auto lg:mx-0 block shadow-black drop-shadow-sm">
                          {member.desc}
                        </p>

                        {/* BUTTONS */}
                        <div className="flex flex-wrap gap-3 md:gap-4 lg:gap-5 justify-center lg:justify-start items-center w-full px-1 pb-10 lg:pb-0">
                          <MagneticButton
                            href={member.resume}
                            className={`group relative px-6 py-3 md:px-7 md:py-3.5 lg:px-8 lg:py-4 rounded-full bg-white text-black font-bold overflow-hidden cursor-pointer ${theme.shadow} shadow-lg shrink-0`}
                          >
                             <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                             <span className="relative z-10 flex items-center gap-2 uppercase tracking-wide text-[10px] md:text-xs lg:text-sm">
                                Brochure <FaDownload />
                             </span>
                          </MagneticButton>
                          
                          <div className="flex gap-3 shrink-0">
                             {member.github && (
                                <MagneticButton href={member.github} className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 flex items-center justify-center rounded-full bg-slate-900 border border-white/10 text-white hover:bg-white hover:text-black transition-colors cursor-pointer">
                                    <FaGithub size={18} className="md:w-5 md:h-5" />
                                </MagneticButton>
                             )}
                             {member.linkedin && (
                                <MagneticButton href={member.linkedin} className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 flex items-center justify-center rounded-full bg-slate-900 border border-white/10 text-white hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white transition-colors cursor-pointer">
                                    <FaLinkedin size={18} className="md:w-5 md:h-5" />
                                </MagneticButton>
                             )}
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* --- RIGHT: IMAGE & BADGES --- */}
                    <div className="w-full lg:w-[55%] h-[50vh] lg:h-full relative flex items-end justify-center perspective-1000 pt-0 lg:pt-0 z-10">
                      
                      <motion.div
                          initial={{ opacity: 0, scale: 0.8, y: 50, filter: 'blur(20px)' }}
                          animate={isActive ? { opacity: 1, scale: 1, y: 0, filter: 'none' } : { opacity: 0, scale: 0.8, y: 50, filter: 'blur(20px)' }}
                          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} 
                          className="relative h-full flex items-end justify-center w-full"
                      >
                          {/* Rotating Circles */}
                          <div className="absolute top-[20%] lg:top-[20%] left-1/2 -translate-x-1/2 w-[250px] h-[250px] md:w-[400px] md:h-[400px] lg:w-[600px] lg:h-[600px] border border-white/5 rounded-full animate-[spin_20s_linear_infinite]">
                             <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full box-shadow-glow`} style={{ backgroundColor: theme.glow, boxShadow: `0 0 20px ${theme.glow}` }}></div>
                          </div>
                          
                          {/* Glow Background */}
                          <div className={`absolute top-[25%] lg:top-[25%] left-1/2 -translate-x-1/2 w-[200px] h-[200px] md:w-[350px] md:h-[350px] lg:w-[500px] lg:h-[500px] bg-gradient-to-tr ${theme.gradient} opacity-20 rounded-full blur-[60px] md:blur-[100px] lg:blur-[120px]`}></div>

                          <img 
                            src={member.image} 
                            alt={member.name} 
                            className="relative z-10 w-auto h-full max-h-[100%] lg:max-h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                            style={{
                              maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                              WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
                            }}
                          />

                          {/* Cards */}
                          {isActive && badges.map((badge, idx) => (
                              <FloatingCard 
                                key={idx}
                                icon={badge.icon} 
                                text={badge.text} 
                                delay={badge.delay} 
                                position={badge.position} 
                                theme={theme} 
                              />
                          ))}

                      </motion.div>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1, y: [0, 10, 0] }} 
                        transition={{ delay: 2, duration: 2, repeat: Infinity }}
                        className="absolute bottom-4 lg:bottom-8 left-1/2 -translate-x-1/2 text-slate-500 text-[10px] md:text-xs tracking-widest uppercase flex flex-col items-center gap-2 hidden lg:flex"
                    >
                        <span>Scroll</span>
                        <FaArrowDown />
                    </motion.div>

                  </div>
                </div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

const FloatingCard = ({ icon, text, delay, position, theme }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, rotateX: 20 }}
    animate={{ 
        opacity: 1, 
        y: [0, -15, 0],
        rotateX: 0
    }}
    transition={{ 
        opacity: { delay, duration: 0.6 },
        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay + 0.5 },
        rotateX: { duration: 0.8 }
    }}
    className={`absolute ${position} z-50 flex items-center gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-2.5 lg:px-5 lg:py-3 rounded-xl md:rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-white/20 shadow-2xl scale-[0.7] md:scale-[0.85] lg:scale-100 origin-center`}
    style={{ boxShadow: `0 10px 30px -10px ${theme.glow}40` }}
  >
    <div className={`p-1.5 md:p-2 lg:p-2.5 rounded-lg md:rounded-xl bg-gradient-to-br ${theme.gradient} text-white shadow-lg`}>
      <span className="text-xs md:text-sm lg:text-base">{icon}</span>
    </div>
    <div>
        <span className="block text-[8px] md:text-[9px] lg:text-[10px] text-slate-400 uppercase tracking-wider font-bold">Expertise</span>
        <span className="block text-xs md:text-xs lg:text-sm font-bold text-white whitespace-nowrap">{text}</span>
    </div>
  </motion.div>
);

export default HeroSlider;