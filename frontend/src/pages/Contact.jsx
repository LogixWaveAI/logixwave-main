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

  // --- ORIGINAL SOCIAL LINKS ADDED HERE ---
  const socialLinks = {
    github: "https://github.com/LogixWaveAI",
    linkedin: "https://www.linkedin.com/company/logixwaveai",
    instagram: "https://www.instagram.com/logixwaveai" 
  };

  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Handle input changes
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Final Validation
    if (!EMAIL_REGEX.test(formData.email)) {
        setEmailError('Invalid email format.');
        return; 
    }

    setFormStatus('sending');

    try {
      // Backend URL
      const response = await axios.post('http://localhost:5000/api/contact', formData);

      if (response.status === 200) {
        setFormStatus('sent');
        // Reset Form
        setFormData({ 
            name: '', 
            email: '', 
            subject: '', 
            message: '' 
        }); 
      } else {
        setFormStatus('failed');
      }

    } catch (error) {
      console.error("Submission Failed:", error);
      setFormStatus('failed');
    }

    // Reset status after 3 seconds
    setTimeout(() => setFormStatus('idle'), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 md:pt-32 pb-16 md:pb-20 px-4 md:px-6 relative overflow-x-hidden font-sans">
      
      {/* 1. Animated Cyber Grid Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e52e_1px,transparent_1px),linear-gradient(to_bottom,#4f46e52e_1px,transparent_1px)] bg-[size:3rem_3rem] md:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {/* Glowing Orbs */}
        <div className="absolute top-20 left-0 md:left-10 w-48 md:w-72 h-48 md:h-72 bg-purple-500/20 rounded-full blur-[60px] md:blur-[100px]" />
        <div className="absolute bottom-20 right-0 md:right-10 w-64 md:w-96 h-64 md:h-96 bg-cyan-500/20 rounded-full blur-[60px] md:blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black text-white mb-4 md:mb-6 tracking-tight leading-tight"
          >
            Let's Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Revolution</span>
          </motion.h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg px-2">
            Have a crazy idea? We have the tech to build it. Reach out and let's architect your digital future.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-start">
          
          {/* Left Column: Contact Info & Socials */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 md:space-y-10 order-2 lg:order-1"
          >
            {/* Contact Cards List */}
            <div className="space-y-4 md:space-y-6">
              <ContactCard 
                icon={<FaPhoneAlt />} 
                title="Talk to Us" 
                value="+91 93273 52530" 
                color="text-green-400"
                delay={0}
              />
              <ContactCard 
                icon={<FaEnvelope />} 
                title="Mail Us" 
                value="contact@logixwaveai.com" 
                color="text-blue-400"
                delay={0.1}
              />
              <ContactCard 
                icon={<FaMapMarkerAlt />} 
                title="Visit HQ" 
                value="Surat, Gujarat, India" 
                color="text-red-400"
                delay={0.2}
              />
            </div>
            
            {/* WHATSAPP BUTTON */}
            <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                href={`https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(whatsAppMessage)}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full inline-flex items-center justify-center gap-3 py-3 md:py-4 bg-green-500 text-white font-bold rounded-2xl transition-all hover:bg-green-600 hover:scale-[1.02] shadow-[0_0_20px_rgba(16,185,129,0.4)] text-base md:text-lg"
            >
                <FaWhatsapp size={22} /> Chat with Us on WhatsApp
            </motion.a>

            {/* Social Connect Hub (Twitter Removed, Links Added) */}
            <div className="p-6 md:p-8 rounded-3xl bg-slate-900/50 border border-white/10 backdrop-blur-md text-center md:text-left">
              <h3 className="text-white font-bold mb-6 text-lg md:text-xl">Connect on Socials</h3>
              <div className="flex justify-center md:justify-start gap-4">
                <SocialBtn 
                    icon={<FaGithub />} 
                    href={socialLinks.github} 
                    color="hover:bg-gray-800" 
                />
                <SocialBtn 
                    icon={<FaLinkedin />} 
                    href={socialLinks.linkedin} 
                    color="hover:bg-blue-700" 
                />
                <SocialBtn 
                    icon={<FaInstagram />} 
                    href={socialLinks.instagram} 
                    color="hover:bg-pink-600" 
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Holographic Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            {/* Form Glow Border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-[2rem] blur opacity-20"></div>
            
            <form 
              onSubmit={handleSubmit}
              className="relative bg-slate-900/80 backdrop-blur-xl p-6 md:p-10 rounded-[1.8rem] border border-white/10 shadow-2xl"
            >
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8">Send a Message</h3>
              
              <div className="space-y-5 md:space-y-6">
                
                {/* Inputs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  <InputGroup 
                    label="Name" 
                    placeholder="Your Full Name" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <InputGroup 
                    label="Email" 
                    placeholder="you@company.com" 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={emailError} 
                  />
                </div>
                
                {/* Subject Input */}
                <InputGroup 
                  label="Subject" 
                  placeholder="I want to build an AI App..." 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
                
                {/* Message Textarea */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">Message</label>
                  <textarea 
                    rows="4" 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 md:px-5 py-3 md:py-4 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none placeholder:text-slate-600 text-sm md:text-base"
                    placeholder="Tell us about your project timeline and budget..."
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={formStatus === 'sending' || !!emailError} 
                  className={`w-full py-3 md:py-4 rounded-xl font-bold text-base md:text-lg transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden relative group ${
                    formStatus === 'sent' 
                      ? 'bg-green-500 text-white' 
                      : formStatus === 'failed'
                      ? 'bg-red-600 text-white'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                  }`}
                >
                  <div className="relative z-10 flex items-center gap-2">
                    {formStatus === 'idle' && (
                      <>
                        <span>Launch Message</span>
                        <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                    
                    {formStatus === 'sending' && (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Transmitting...</span>
                      </>
                    )}

                    {formStatus === 'sent' && (
                      <>
                        <FaCheckCircle className="text-xl" />
                        <span>Message Received!</span>
                      </>
                    )}
                    
                    {formStatus === 'failed' && (
                      <>
                        <FaTimes className="text-xl" /> 
                        <span>Failed to Send!</span>
                      </>
                    )}
                  </div>

                  {/* Shine Effect */}
                  {formStatus === 'idle' && (
                    <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                  )}
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

// Fixed ContactCard with Text Wrapping logic
const ContactCard = ({ icon, title, value, color, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="flex items-center gap-4 md:gap-5 p-4 md:p-6 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-white/10 hover:bg-slate-800/50 transition-all group cursor-default w-full"
  >
    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full bg-slate-950 flex items-center justify-center text-xl md:text-2xl ${color} shadow-lg border border-white/5 group-hover:scale-110 transition-transform shrink-0`}>
      {icon}
    </div>
    
    {/* Added flex-1 and min-w-0 to fix text truncation issue on mobile */}
    <div className="flex-1 min-w-0">
      <h4 className="text-slate-400 text-xs md:text-sm font-medium uppercase tracking-wider mb-1">{title}</h4>
      {/* Added break-words to handle long emails properly */}
      <p className="text-white text-sm md:text-lg font-semibold group-hover:text-cyan-400 transition-colors break-words leading-tight">
        {value}
      </p>
    </div>
  </motion.div>
);

const InputGroup = ({ label, placeholder, type = "text", name, value, onChange, error }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-slate-400 ml-1">{label}</label>
    <input 
      type={type} 
      name={name}
      value={value}
      onChange={onChange}
      required
      className={`w-full bg-slate-950/50 rounded-xl px-4 md:px-5 py-3 md:py-4 text-white focus:outline-none focus:ring-1 transition-all placeholder:text-slate-600 text-sm md:text-base ${
        error ? 'border border-red-500 focus:border-red-500 focus:ring-red-500' : 'border border-slate-700 focus:border-cyan-500 focus:ring-cyan-500'
      }`}
      placeholder={placeholder}
    />
    {error && <p className="text-red-400 text-xs mt-1 ml-1">{error}</p>}
  </div>
);

const SocialBtn = ({ icon, href, color }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-950 border border-white/10 flex items-center justify-center text-slate-400 text-lg md:text-xl transition-all hover:text-white hover:-translate-y-1 ${color}`}
  >
    {icon}
  </a>
);

export default Contact;