import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios'; 
import { 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaPaperPlane, 
  FaCheckCircle, 
  FaLinkedin, 
  FaGithub, 
  FaInstagram, 
  FaTimes, 
  FaWhatsapp 
} from 'react-icons/fa'; 

// --- ROBUST EMAIL REGEX ---
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 

const Contact = () => {
  const [formStatus, setFormStatus] = useState('idle'); // idle | sending | sent | failed
  const [emailError, setEmailError] = useState(''); 
  
  // Contact Info
  const whatsAppNumber = "919327352530";
  const whatsAppMessage = "Hello, I'd like to discuss a new project with LogixWaveAI. Could you please share more details?";

  const socialLinks = {
    github: "https://github.com/LogixWaveAI",
    linkedin: "https://www.linkedin.com/company/logixwaveai",
    instagram: "https://www.instagram.com/logixwaveai" 
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'email') {
      if (value && !EMAIL_REGEX.test(value)) {
        setEmailError('Please enter a valid email address.');
      } else {
        setEmailError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!EMAIL_REGEX.test(formData.email)) {
        setEmailError('Invalid email format.');
        return; 
    }

    setFormStatus('sending');

    try {
      const response = await axios.post('https://logixwave-main-1.onrender.com/api/contact', formData);

      if (response.status === 200) {
        setFormStatus('sent');
        setFormData({ name: '', email: '', subject: '', message: '' }); 
      } else {
        setFormStatus('failed');
      }

    } catch (error) {
      console.error("Submission Failed:", error);
      setFormStatus('failed');
    }

    setTimeout(() => setFormStatus('idle'), 3000);
  };

  return (
    <div className="min-h-screen bg-[#020617] pt-24 md:pt-32 pb-16 md:pb-24 px-5 md:px-6 relative overflow-x-hidden font-sans">
      
      {/* 1. Animated Cyber Grid Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem] md:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {/* Glowing Orbs */}
        <div className="absolute top-20 left-[-10%] w-64 md:w-96 h-64 md:h-96 bg-sky-600/10 rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute bottom-20 right-[-10%] w-72 md:w-[500px] h-72 md:h-[500px] bg-indigo-600/10 rounded-full blur-[80px] md:blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight font-display"
          >
            Let's Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500">Dialogue</span>
          </motion.h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-xl font-light px-4">
            Have a crazy idea? We have the architecture to build it. Reach out and let's engineer your digital future.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
            className="space-y-8 md:space-y-10 order-2 lg:order-1"
          >
            <div className="space-y-4 sm:space-y-6">
              <ContactCard icon={<FaPhoneAlt />} title="Direct Line" value="+91 93273 52530" color="text-sky-400" bgColor="bg-sky-500/10" delay={0} />
              <ContactCard icon={<FaEnvelope />} title="Email Transmission" value="contact@logixwaveai.com" color="text-indigo-400" bgColor="bg-indigo-500/10" delay={0.1} />
              <ContactCard icon={<FaMapMarkerAlt />} title="Headquarters" value="Surat, Gujarat, India" color="text-purple-400" bgColor="bg-purple-500/10" delay={0.2} />
            </div>
            
            <motion.a
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                href={`https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(whatsAppMessage)}`}
                target="_blank" rel="noopener noreferrer" 
                className="w-full inline-flex items-center justify-center gap-3 py-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold rounded-2xl transition-all hover:bg-emerald-500 hover:text-white hover:scale-[1.02] shadow-[0_0_20px_rgba(16,185,129,0.1)] text-base"
            >
                <FaWhatsapp size={22} /> Initiate WhatsApp Channel
            </motion.a>

            <div className="p-6 md:p-8 rounded-3xl bg-slate-900/50 border border-white/5 backdrop-blur-xl text-center sm:text-left">
              <h3 className="text-white font-display font-semibold mb-6 text-lg sm:text-xl">Network Architectures</h3>
              <div className="flex justify-center sm:justify-start gap-4">
                <SocialBtn icon={<FaGithub />} href={socialLinks.github} />
                <SocialBtn icon={<FaLinkedin />} href={socialLinks.linkedin} />
                <SocialBtn icon={<FaInstagram />} href={socialLinks.instagram} />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Holographic Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="relative order-1 lg:order-2"
          >
            <div className="absolute -inset-1 bg-gradient-to-br from-sky-500/20 to-purple-600/20 rounded-[2.5rem] blur-xl opacity-50"></div>
            
            <form 
              onSubmit={handleSubmit}
              className="relative bg-slate-900/80 backdrop-blur-2xl p-6 sm:p-8 md:p-10 rounded-[2rem] border border-white/10 shadow-2xl"
            >
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-8">Establish Connection</h3>
              
              <div className="space-y-5 sm:space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <InputGroup label="Entity Name" placeholder="Your Full Name" name="name" value={formData.name} onChange={handleChange} />
                  <InputGroup label="Comms Channel" placeholder="you@company.com" type="email" name="email" value={formData.email} onChange={handleChange} error={emailError} />
                </div>
                
                <InputGroup label="Subject Header" placeholder="Project details or scope..." name="subject" value={formData.subject} onChange={handleChange} />
                
                <div className="space-y-2 flex flex-col">
                  <label className="text-xs font-semibold text-slate-400 ml-1 uppercase tracking-wider">Payload</label>
                  <textarea 
                    rows="4" name="message" value={formData.message} onChange={handleChange} 
                    className="w-full bg-[#020617]/50 border border-slate-800 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all resize-none placeholder:text-slate-600 text-sm"
                    placeholder="Describe your architecture requirements..." required
                  ></textarea>
                </div>

                <button 
                  type="submit" disabled={formStatus === 'sending' || !!emailError} 
                  className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden relative group mt-4 ${
                    formStatus === 'sent' ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
                    : formStatus === 'failed' ? 'bg-rose-500 text-white'
                    : 'bg-white text-slate-950 hover:bg-slate-200 shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                  }`}
                >
                  <div className="relative z-10 flex items-center gap-2">
                    {formStatus === 'idle' && (<><span>Transmit Request</span><FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>)}
                    {formStatus === 'sending' && (<><div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin"></div><span>Transmitting...</span></>)}
                    {formStatus === 'sent' && (<><FaCheckCircle className="text-lg" /><span>Transmission Received</span></>)}
                    {formStatus === 'failed' && (<><FaTimes className="text-lg" /><span>Transmission Failed</span></>)}
                  </div>
                </button>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const ContactCard = ({ icon, title, value, color, bgColor, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.5 }}
    className="flex items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-white/10 transition-all group w-full"
  >
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${color} ${bgColor} border border-white/5 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="text-slate-500 text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-1">{title}</h4>
      <p className="text-white text-sm sm:text-base font-semibold group-hover:text-sky-400 transition-colors break-words leading-tight">{value}</p>
    </div>
  </motion.div>
);

const InputGroup = ({ label, placeholder, type = "text", name, value, onChange, error }) => (
  <div className="space-y-2 flex flex-col">
    <label className="text-xs font-semibold text-slate-400 ml-1 uppercase tracking-wider">{label}</label>
    <input 
      type={type} name={name} value={value} onChange={onChange} required
      className={`w-full bg-[#020617]/50 rounded-xl px-4 py-3 sm:py-4 text-white focus:outline-none focus:ring-1 transition-all placeholder:text-slate-600 text-sm ${
        error ? 'border border-rose-500 focus:border-rose-500 focus:ring-rose-500' : 'border border-slate-800 focus:border-sky-500 focus:ring-sky-500'
      }`}
      placeholder={placeholder}
    />
    {error && <p className="text-rose-400 text-xs mt-1 ml-1 font-medium">{error}</p>}
  </div>
);

const SocialBtn = ({ icon, href }) => (
  <a 
    href={href} target="_blank" rel="noopener noreferrer"
    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#020617] border border-white/10 flex items-center justify-center text-slate-400 text-lg sm:text-xl transition-all hover:text-white hover:border-sky-500 hover:shadow-[0_0_15px_rgba(14,165,233,0.3)] hover:-translate-y-1`}
  >
    {icon}
  </a>
);

export default Contact;