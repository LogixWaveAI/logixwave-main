import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTerminal, FaTimes, FaMinus, FaExpand, FaCompress } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HackerTerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [input, setInput] = useState('');
  
  // LOGIC: Command History Traversal (Up/Down Arrows)
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyPointer, setHistoryPointer] = useState(-1);

  const [logs, setLogs] = useState([
    { type: 'system', text: 'Initializing LOGIXWAVEAI Kernel v2.0...' },
  ]);

  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const availableCommands = ['help', 'about', 'skills', 'projects', 'contact', 'clear', 'exit', 'gui'];

  // --- EFFECT: Boot Sequence Animation ---
  useEffect(() => {
    if (isOpen && logs.length === 1) {
      const bootSequence = [
        { type: 'system', text: 'Loading modules... [OK]' },
        { type: 'system', text: 'Connecting to server... [CONNECTED]' },
        { type: 'info', text: '------------------------------------------' },
        { type: 'success', text: 'Welcome, Admin. System is ready.' },
        { type: 'info', text: 'Type "help" for a list of commands.' },
        { type: 'info', text: '------------------------------------------' },
      ];

      let delay = 300;
      bootSequence.forEach((line, index) => {
        setTimeout(() => {
          setLogs(prev => [...prev, line]);
        }, delay * (index + 1));
      });
    }
  }, [isOpen]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, isOpen]);

  const handleFocus = () => inputRef.current?.focus();

  // --- LOGIC: Handle Special Keys (Tab, Arrows) ---
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      if (!input) return;
      const match = availableCommands.find(cmd => cmd.startsWith(input.toLowerCase()));
      if (match) setInput(match); // Autocomplete
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyPointer < cmdHistory.length - 1) {
        const newPointer = historyPointer + 1;
        setHistoryPointer(newPointer);
        setInput(cmdHistory[cmdHistory.length - 1 - newPointer]);
      }
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer > 0) {
        const newPointer = historyPointer - 1;
        setHistoryPointer(newPointer);
        setInput(cmdHistory[cmdHistory.length - 1 - newPointer]);
      } else {
        setHistoryPointer(-1);
        setInput('');
      }
    }

    if (e.key === 'Enter') {
      handleCommand();
    }
  };

  const handleCommand = () => {
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    // Add to history for Up/Down arrows
    setCmdHistory(prev => [...prev, cmd]);
    setHistoryPointer(-1);

    const newLogs = [...logs, { type: 'user', text: `visitor@logixwaveai:~$ ${input}` }];

    switch (cmd) {
      case 'help':
        newLogs.push(
          { type: 'info', text: 'AVAILABLE COMMANDS:' },
          { type: 'warning', text: '👉 about     : Agency Info' },
          { type: 'warning', text: '👉 skills    : Tech Stack Analysis' },
          { type: 'warning', text: '👉 projects  : View Case Studies' },
          { type: 'warning', text: '👉 contact   : Connect via WhatsApp' },
          { type: 'warning', text: '👉 clear     : Clear Terminal' },
          { type: 'warning', text: '👉 gui       : Switch to GUI Mode (Home)' },
          { type: 'warning', text: '👉 exit      : Close Terminal' }
        );
        break;
      case 'about':
        newLogs.push({ type: 'info', text: 'LOGIXWAVEAI: Architects of the Digital Future. Specializing in High-Scale Web & AI Solutions.' });
        break;
      case 'skills':
        newLogs.push(
          { type: 'success', text: '[LOADED] MERN Stack' },
          { type: 'success', text: '[LOADED] Python & Gen AI' },
          { type: 'success', text: '[LOADED] React Native / Mobile' },
          { type: 'success', text: '[LOADED] DevOps & Cloud Architecture' }
        );
        break;
      case 'projects':
        newLogs.push({ type: 'info', text: 'Executing routing protocol... Target: /projects' });
        setTimeout(() => navigate('/projects'), 800);
        break;
      case 'contact':
        newLogs.push({ type: 'success', text: 'Opening encrypted channel...' });
        setTimeout(() => navigate('/contact'), 800);
        break;
      case 'gui':
        newLogs.push({ type: 'info', text: 'Switching to Graphical User Interface...' });
        setTimeout(() => navigate('/'), 800);
        break;
      case 'clear':
        setLogs([]);
        setInput('');
        return;
      case 'exit':
        setIsOpen(false);
        break;
      default:
        newLogs.push({ type: 'error', text: `bash: ${cmd}: command not found. Try 'help'.` });
    }

    setLogs(newLogs);
    setInput('');
  };

  return (
    <>
      {/* Floating Toggle Button - FIXED POSITION */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className={`
            fixed z-50 bg-slate-900 border border-green-500/50 text-green-500 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.4)] backdrop-blur-md flex items-center justify-center
            
            /* MOBILE: Bottom-Right, standard FAB position */
            bottom-6 right-4 h-10 w-10 md:h-12 md:w-12
            
            /* DESKTOP: Bottom-Right, aligned with layout */
            md:bottom-6 md:right-6 md:h-14 md:w-14
          `}
          title="Open Developer Terminal"
        >
          <FaTerminal size={20} />
        </motion.button>
      )}

      {/* Terminal Window (Draggable) - FIXED SIZING */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            drag
            dragMomentum={false} 
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`
                fixed z-50 flex flex-col shadow-2xl border border-slate-700 bg-slate-950/95 backdrop-blur-md rounded-lg overflow-hidden
                
                /* MOBILE WINDOW: Centered with margin, auto height */
                left-4 right-4 bottom-24 h-[400px]
                
                /* DESKTOP WINDOW: Floating bottom-right, fixed size */
                md:left-auto md:bottom-24 md:right-6 md:w-[600px] md:h-[400px]
                
                ${isMaximized ? '!inset-0 !w-full !h-full !m-0 !rounded-none' : ''}
            `}
          >
            {/* Terminal Header */}
            <div 
                className="bg-slate-800 flex items-center justify-between px-4 py-2 border-b border-slate-700 cursor-move"
                onDoubleClick={() => setIsMaximized(!isMaximized)} 
            >
              <div className="flex items-center gap-2">
                <FaTerminal className="text-green-500 text-xs" />
                <span className="text-xs text-slate-300 font-mono font-bold">admin@logixwaveai:~</span>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setIsOpen(false)} className="text-yellow-500 hover:text-yellow-400"><FaMinus size={10} /></button>
                <button onClick={() => setIsMaximized(!isMaximized)} className="text-blue-500 hover:text-blue-400">
                    {isMaximized ? <FaCompress size={10} /> : <FaExpand size={10} />}
                </button>
                <button onClick={() => setIsOpen(false)} className="text-red-500 hover:text-red-400"><FaTimes size={10} /></button>
              </div>
            </div>

            {/* Terminal Body */}
            <div 
              ref={scrollRef}
              onClick={handleFocus}
              className="flex-1 p-4 overflow-y-auto font-mono text-sm scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent text-left"
            >
              {logs.map((line, index) => (
                <div key={index} className={`mb-1 break-words ${
                  line.type === 'error' ? 'text-red-400' :
                  line.type === 'success' ? 'text-green-400' :
                  line.type === 'warning' ? 'text-yellow-400' :
                  line.type === 'system' ? 'text-blue-400 italic' :
                  line.type === 'user' ? 'text-slate-300 font-bold' : 'text-cyan-400'
                }`}>
                  {line.text}
                </div>
              ))}
              
              {/* Input Line */}
              <div className="flex items-center gap-2 text-green-500 mt-2">
                <span className="font-bold">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent border-none outline-none flex-1 text-slate-200 caret-green-500 font-mono"
                  autoFocus
                  spellCheck="false"
                  autoComplete="off"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HackerTerminal;