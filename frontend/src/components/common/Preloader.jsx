import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- API CONFIGURATION ---
const apiKey = ""; // System will inject the key at runtime

// --- UTILS: PCM to WAV Converter for TTS ---
const pcmToWav = (pcmData, sampleRate = 24000) => {
  const buffer = new ArrayBuffer(44 + pcmData.byteLength);
  const view = new DataView(buffer);

  const writeString = (offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  writeString(0, "RIFF");
  view.setUint32(4, 36 + pcmData.byteLength, true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, "data");
  view.setUint32(40, pcmData.byteLength, true);

  const pcmArray = new Uint8Array(pcmData);
  const wavArray = new Uint8Array(buffer, 44);
  wavArray.set(pcmArray);

  return buffer;
};

// --- GEMINI API HELPERS ---
const generateIdentity = async (retries = 3, delay = 1000) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

  const prompt = `
    You are a cyberpunk mainframe. Generate a JSON object for a new user identity.
    Fields required:
    - alias: A cool hacker name (e.g., "Neon_Ghost", "Zero_Cool").
    - class: A sci-fi role (e.g., "Netrunner", "Street Samurai", "Void Architect").
    - origin: A futuristic location (e.g., "Neo-Tokyo Slums", "Orbital Station Alpha").
    - mission: A short, cryptic, 1-sentence mission objective.
    - stat: A random percentage for "Synapse Sync" (e.g., "98%").
    
    Output ONLY the JSON object. No markdown.
  `;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { responseMimeType: "application/json" },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return JSON.parse(text);
  } catch (error) {
    if (retries > 0) {
      await new Promise((r) => setTimeout(r, delay));
      return generateIdentity(retries - 1, delay * 2);
    }
    console.error("Identity Generation Failed:", error);
    // Fallback data
    return {
      alias: "GUEST_USER",
      class: "OBSERVER",
      origin: "UNKNOWN NODE",
      mission: "Establish secure connection to mainframe.",
      stat: "12%",
    };
  }
};

const generateVoice = async (text, retries = 3, delay = 1000) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{ parts: [{ text: `System Alert. ${text}` }] }],
    generationConfig: {
      responseModalities: ["AUDIO"],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: "Fenrir" }, // Deep, serious voice
        },
      },
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error(`TTS Error: ${response.status}`);
    const data = await response.json();
    const base64Audio =
      data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (base64Audio) {
      // Decode Base64 to ArrayBuffer
      const binaryString = window.atob(base64Audio);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      // Convert PCM to WAV
      const wavBuffer = pcmToWav(bytes.buffer);
      const blob = new Blob([wavBuffer], { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      audio.play();
    }
  } catch (error) {
    if (retries > 0) {
      await new Promise((r) => setTimeout(r, delay));
      return generateVoice(text, retries - 1, delay * 2);
    }
    console.error("TTS Failed:", error);
  }
};

// --- MATRIX RAIN COMPONENT ---
const MatrixRain = ({ color }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars =
      "01XYZｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      // Use rgba with low opacity for the fade effect instead of "transparent" logic
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = color; // Dynamic Color
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full opacity-25"
    />
  );
};

// --- SCRAMBLE TEXT ---
const ScrambleText = ({ text, className, speed = 40, trigger }) => {
  const [display, setDisplay] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((l, i) => {
            if (i < iteration) return text[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join(""),
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 2;
    }, speed);
    return () => clearInterval(interval);
  }, [text, trigger]);

  return <span className={className}>{display}</span>;
};

// --- SYSTEM LOGS (Clean & Professional) ---
const bootLogs = [
  "Initializing Core Modules...",
  "Verifying User Identity...",
  "Loading Interface Assets...",
  "Connecting to Secure Server...",
  "Optimizing Performance...",
  "Checking System Integrity...",
  "Decrypting User Preferences...",
  "Access Authorized.",
];

const Preloader = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  // New States for Gemini Features
  const [identityData, setIdentityData] = useState(null);
  const [isGeneratingIdentity, setIsGeneratingIdentity] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";

      // 1. Progress Logic
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setIsSuccess(true);
            return 100;
          }
          const diff = Math.random() * (prev > 80 ? 2 : 5);
          return Math.min(prev + diff, 100);
        });
      }, 100);

      // 2. Logs Logic
      const logTimer = setInterval(() => {
        setLogIndex((prev) => (prev < bootLogs.length - 1 ? prev + 1 : prev));
      }, 350);

      return () => {
        clearInterval(timer);
        clearInterval(logTimer);
      };
    } else {
      // --- FIX: Clears the overflow style to restore default scrolling ---
      document.body.style.overflow = "";
    }
  }, [isLoading]);

  // Trigger Gemini Identity Generation on Success
  useEffect(() => {
    if (isSuccess && !identityData && !isGeneratingIdentity) {
      setIsGeneratingIdentity(true);
      generateIdentity().then((data) => {
        setIdentityData(data);
        setIsGeneratingIdentity(false);
      });
    }
  }, [isSuccess]);

  const handleSpeak = () => {
    if (!identityData || isSpeaking) return;
    setIsSpeaking(true);
    const speechText = `Identity Confirmed. Welcome back, ${identityData.alias}. Class: ${identityData.class}. Current Mission: ${identityData.mission}`;
    generateVoice(speechText).then(() => setIsSpeaking(false));
  };

  // Theme Colors: Cyan (Loading) -> Neon Green (Ready)
  const themeColor = isSuccess ? "#00ff00" : "#00f0ff";
  const themeShadow = isSuccess ? "0 0 50px #00ff00" : "0 0 30px #00f0ff";

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <div className="fixed inset-0 z-[9999] bg-black font-mono overflow-hidden cursor-none selection:bg-white selection:text-black">
          {/* A. DYNAMIC BACKGROUND */}
          <MatrixRain color={themeColor} />

          {/* B. VIGNETTE & SCANLINES */}
          <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,#000_100%)]"></div>
          <div className="absolute inset-0 z-20 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] opacity-20"></div>

          {/* C. EXIT SHREDDER EFFECT (FIXED) */}
          <div className="absolute inset-0 flex w-full h-full z-30 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="relative h-full w-[5%] bg-black"
                initial={{ scaleY: 1 }}
                style={{
                  transformOrigin: i % 2 === 0 ? "top" : "bottom",
                }}
                exit={{
                  scaleY: 0,
                  transition: {
                    duration: 0.6,
                    ease: "easeInOut",
                    delay: i * 0.02,
                  },
                }}
              />
            ))}
          </div>

          {/* D. MAIN TERMINAL CONTAINER */}
          <div className="relative z-40 flex items-center justify-center w-full h-full">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{
                scale: 1.5,
                opacity: 0,
                filter: "blur(20px)",
                transition: { duration: 0.3 },
              }}
              className="relative w-[90%] max-w-2xl"
            >
              {/* HOLO-BOX */}
              <div
                className="relative p-8 md:p-12 border bg-black/80 backdrop-blur-sm transition-all duration-500"
                style={{
                  borderColor: themeColor,
                  boxShadow: themeShadow,
                }}
              >
                {/* 1. Header Bar */}
                <div
                  className="flex justify-between items-center mb-8 border-b pb-2"
                  style={{ borderColor: `${themeColor}40` }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full animate-pulse"
                      style={{ backgroundColor: themeColor }}
                    ></div>
                    <span
                      className="text-xs tracking-[0.3em] font-bold"
                      style={{ color: themeColor }}
                    >
                      {isSuccess ? "SYSTEM READY" : "INITIALIZING SYSTEM"}
                    </span>
                  </div>
                  <span
                    className="text-[10px] opacity-50"
                    style={{ color: themeColor }}
                  >
                    V.2.0.4
                  </span>
                </div>

                {/* 2. Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left: Big Loader */}
                  <div className="relative flex items-center justify-center">
                    {/* Rotating Rings */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute w-40 h-40 border-2 border-dashed rounded-full opacity-30"
                      style={{ borderColor: themeColor }}
                    />
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute w-32 h-32 border border-dotted rounded-full opacity-50"
                      style={{ borderColor: themeColor }}
                    />

                    {/* Percentage */}
                    <div className="z-10 text-center">
                      <span
                        className="text-6xl font-black tracking-tighter"
                        style={{ color: themeColor }}
                      >
                        {Math.floor(progress)}
                      </span>
                      <span
                        className="text-xl ml-1"
                        style={{ color: themeColor }}
                      >
                        %
                      </span>
                    </div>
                  </div>

                  {/* Right: Data Dump */}
                  <div className="flex flex-col justify-center space-y-4">
                    {/* Memory Blocks Visual */}
                    <div className="flex flex-wrap gap-1 w-full opacity-50">
                      {[...Array(20)].map((_, i) => (
                        <div
                          key={i}
                          className="w-2 h-4 transition-colors duration-100"
                          style={{
                            backgroundColor:
                              i < progress / 5 ? themeColor : "#333",
                          }}
                        />
                      ))}
                    </div>

                    {/* Scramble Logs */}
                    <div
                      className="h-20 overflow-hidden text-xs md:text-sm font-light leading-relaxed"
                      style={{ color: themeColor }}
                    >
                      {bootLogs
                        .slice(Math.max(0, logIndex - 4), logIndex + 1)
                        .map((log, i) => (
                          <div key={i} className="opacity-80">
                            <span className="opacity-50 mr-2">
                              [{new Date().toLocaleTimeString()}]
                            </span>
                            <ScrambleText text={log} trigger={log} />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* 3. Footer Bar */}
                <div className="mt-8 relative h-2 bg-gray-900 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full relative"
                    // Use initial to prevent "transparent" to color interpolation warnings
                    initial={{ backgroundColor: themeColor, width: "0%" }}
                    animate={{
                      backgroundColor: themeColor,
                      width: `${progress}%`,
                      boxShadow: `0 0 20px ${themeColor}`,
                    }}
                  >
                    <div className="absolute right-0 top-0 h-full w-4 bg-white opacity-50 animate-pulse"></div>
                  </motion.div>
                </div>

                {/* 4. SUCCESS OVERLAY WITH GEMINI IDENTITY */}
                <AnimatePresence>
                  {isSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 2 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
                    >
                      <div className="text-center max-w-lg w-full p-4">
                        {/* HEADER */}
                        <motion.h1
                          animate={{ opacity: [0, 1, 0, 1] }}
                          transition={{ duration: 0.5, repeat: 3 }}
                          className="text-3xl md:text-5xl font-black tracking-tighter text-green-500 border-b-4 border-green-500 pb-2 mb-6"
                          style={{ textShadow: "0 0 30px #00ff00" }}
                        >
                          ACCESS GRANTED
                        </motion.h1>

                        {/* LOADING IDENTITY STATE */}
                        {isGeneratingIdentity && (
                          <div className="text-green-400 font-mono animate-pulse">
                            <p className="text-sm tracking-widest">
                              ✨ ESTABLISHING NEURAL LINK...
                            </p>
                            <p className="text-xs opacity-50 mt-2">
                              DECRYPTING USER PROFILE VIA GEMINI_CORE...
                            </p>
                          </div>
                        )}

                        {/* DISPLAY GEMINI GENERATED IDENTITY */}
                        {identityData && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-left bg-green-900/10 border border-green-500/30 p-6 rounded relative overflow-hidden"
                          >
                            <div className="absolute top-0 right-0 p-2 opacity-50">
                              <span className="text-[10px] text-green-300 border border-green-300 px-1">
                                ID_VERIFIED
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="text-[10px] text-green-600 uppercase tracking-widest">
                                  ALIAS
                                </p>
                                <p className="text-xl text-green-300 font-bold font-mono">
                                  {identityData.alias}
                                </p>
                              </div>
                              <div>
                                <p className="text-[10px] text-green-600 uppercase tracking-widest">
                                  CLASS
                                </p>
                                <p className="text-xl text-green-300 font-bold font-mono">
                                  {identityData.class}
                                </p>
                              </div>
                              <div>
                                <p className="text-[10px] text-green-600 uppercase tracking-widest">
                                  ORIGIN
                                </p>
                                <p className="text-sm text-green-300 font-mono">
                                  {identityData.origin}
                                </p>
                              </div>
                              <div>
                                <p className="text-[10px] text-green-600 uppercase tracking-widest">
                                  SYNAPSE SYNC
                                </p>
                                <div className="w-full bg-green-900 h-2 mt-1 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-green-400"
                                    style={{ width: identityData.stat }}
                                  ></div>
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-green-500/20 pt-4">
                              <p className="text-[10px] text-green-600 uppercase tracking-widest mb-1">
                                CURRENT MISSION
                              </p>
                              <ScrambleText
                                text={identityData.mission}
                                className="text-sm text-green-200 font-mono leading-relaxed"
                              />
                            </div>

                            {/* GEMINI TTS BUTTON */}
                            <motion.button
                              whileHover={{
                                scale: 1.02,
                                backgroundColor: "rgba(34, 197, 94, 0.2)",
                              }}
                              whileTap={{ scale: 0.98 }}
                              onClick={handleSpeak}
                              disabled={isSpeaking}
                              className="mt-6 w-full py-2 border border-green-500 text-green-400 text-xs tracking-[0.2em] hover:text-white transition-colors flex items-center justify-center gap-2 group"
                            >
                              {isSpeaking ? (
                                <>
                                  <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                                  TRANSMITTING AUDIO...
                                </>
                              ) : (
                                <>
                                  <span>✨ VOCALIZE BRIEFING</span>
                                </>
                              )}
                            </motion.button>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Corner Decors */}
                <div
                  className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2"
                  style={{ borderColor: themeColor }}
                ></div>
                <div
                  className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2"
                  style={{ borderColor: themeColor }}
                ></div>
                <div
                  className="absolute -bottom-1 -left-1 w-4 h-4 border-l-2 border-b-2"
                  style={{ borderColor: themeColor }}
                ></div>
                <div
                  className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2"
                  style={{ borderColor: themeColor }}
                ></div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
