import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE from '../../utils/api';
import { 
  FaTrash, FaPlus, FaArrowLeft, FaCode, FaPython, FaNodeJs, FaReact, 
  FaBrain, FaDatabase, FaMobileAlt, FaShieldAlt, FaTerminal, FaRobot, FaLock,
  FaLayerGroup, FaNetworkWired, FaChartPie, FaSearch
} from 'react-icons/fa';
import { 
  SiMongodb, SiExpress, SiNextdotjs, SiTailwindcss, SiTensorflow, SiFirebase, SiDocker, 
  SiPostman, SiGraphql, SiPytorch, SiTypescript, SiJavascript, SiFigma, SiAmazonwebservices, 
  SiGooglecloud, SiPandas, SiNumpy, SiScikitlearn, SiKeras, SiOpencv, SiJupyter, 
  SiHuggingface, SiOpenai, SiLangchain, SiSwift, SiKotlin, SiDart, SiExpo, SiAndroid, 
  SiApple, SiMysql, SiPostgresql, SiMariadb, SiSqlite, SiSupabase, SiPrisma, 
  SiRedis, SiKalilinux, SiWireshark, SiGnubash, SiLinux, SiBurpsuite, SiPhp, SiRuby, 
  SiGo, SiRust, SiRedux, SiWebpack, SiVite, SiHtml5, SiCss3, SiSass, SiBootstrap, 
  SiAngular, SiVuedotjs, SiSvelte, SiArduino, SiRaspberrypi 
} from 'react-icons/si';
import { Link } from 'react-router-dom';

// Colors and Gradients
const colorOptions = [
    { value: "cyan-400", name: "Cyan", color: "text-cyan-400", from: "from-cyan-400", to: "to-blue-600" },
    { value: "purple-400", name: "Purple", color: "text-purple-400", from: "from-purple-400", to: "to-pink-600" },
    { value: "blue-400", name: "Blue", color: "text-blue-400", from: "from-blue-400", to: "to-indigo-600" },
    { value: "yellow-400", name: "Yellow", color: "text-yellow-400", from: "from-yellow-400", to: "to-orange-500" },
    { value: "green-500", name: "Green", color: "text-green-500", from: "from-green-500", to: "to-emerald-600" },
    { value: "red-400", name: "Red", color: "text-red-400", from: "from-red-400", to: "to-rose-600" },
    { value: "pink-500", name: "Pink", color: "text-pink-500", from: "from-pink-500", to: "to-purple-600" },
    { value: "orange-500", name: "Orange", color: "text-orange-500", from: "from-orange-500", to: "to-red-600" },
    { value: "gray-400", name: "Gray", color: "text-slate-400", from: "from-slate-400", to: "to-slate-600" },
];

const statuses = ["Expert", "Master", "Advanced", "Pro", "Specialist", "Lead", "Intermediate", "Beginner"];

// --- ICON MAP (Added New Concepts) ---
const iconMap = {
    // --- SPECIAL CONCEPTS (MERN, LLM, RAG) ---
    FaLayerGroup: <FaLayerGroup />, // Use for MERN Stack / Full Stack
    FaNetworkWired: <FaNetworkWired />, // Use for Deep Learning / Neural Networks
    FaChartPie: <FaChartPie />, // Use for Data Science
    FaRobot: <FaRobot />, // Use for LLM / Agentic AI / Generative AI
    FaSearch: <FaSearch />, // Use for RAG (Retrieval)
    FaBrain: <FaBrain />, // Use for Machine Learning / AI

    // --- AI & DATA SCIENCE ---
    SiTensorflow: <SiTensorflow />,
    SiPytorch: <SiPytorch />,
    SiPandas: <SiPandas />,
    SiNumpy: <SiNumpy />,
    SiScikitlearn: <SiScikitlearn />,
    SiKeras: <SiKeras />,
    SiOpencv: <SiOpencv />,
    SiJupyter: <SiJupyter />,
    SiHuggingface: <SiHuggingface />,
    SiOpenai: <SiOpenai />,
    SiLangchain: <SiLangchain />,

    // --- WEB DEVELOPMENT ---
    FaReact: <FaReact />,
    SiNextdotjs: <SiNextdotjs />,
    SiJavascript: <SiJavascript />,
    SiTypescript: <SiTypescript />,
    SiHtml5: <SiHtml5 />,
    SiCss3: <SiCss3 />,
    SiTailwindcss: <SiTailwindcss />,
    SiSass: <SiSass />,
    SiBootstrap: <SiBootstrap />,
    SiAngular: <SiAngular />,
    SiVuedotjs: <SiVuedotjs />,
    SiSvelte: <SiSvelte />,
    SiRedux: <SiRedux />,
    SiVite: <SiVite />,
    SiWebpack: <SiWebpack />,
    FaNodeJs: <FaNodeJs />,
    SiExpress: <SiExpress />,
    SiPhp: <SiPhp />,
    SiRuby: <SiRuby />,
    SiGo: <SiGo />,
    SiRust: <SiRust />,
    FaPython: <FaPython />,
    SiGraphql: <SiGraphql />,

    // --- MOBILE APP ---
    FaMobileAlt: <FaMobileAlt />,
    SiSwift: <SiSwift />,
    SiKotlin: <SiKotlin />,
    SiDart: <SiDart />,
    SiExpo: <SiExpo />,
    SiAndroid: <SiAndroid />,
    SiApple: <SiApple />,

    // --- CYBER SECURITY ---
    FaShieldAlt: <FaShieldAlt />,
    FaLock: <FaLock />,
    SiKalilinux: <SiKalilinux />,
    SiWireshark: <SiWireshark />,
    SiBurpsuite: <SiBurpsuite />,
    SiGnubash: <SiGnubash />,
    FaTerminal: <FaTerminal />,
    SiLinux: <SiLinux />,

    // --- DATABASES ---
    FaDatabase: <FaDatabase />, // Generic Database
    SiMongodb: <SiMongodb />,
    SiMysql: <SiMysql />,
    SiPostgresql: <SiPostgresql />,
    SiMariadb: <SiMariadb />,
    SiSqlite: <SiSqlite />,
    SiRedis: <SiRedis />,
    SiSupabase: <SiSupabase />,
    SiPrisma: <SiPrisma />,
    SiFirebase: <SiFirebase />,

    // --- DEVOPS & CLOUD ---
    SiDocker: <SiDocker />,
    SiAmazonwebservices: <SiAmazonwebservices />,
    SiGooglecloud: <SiGooglecloud />,
    SiPostman: <SiPostman />,
    
    // --- IOT ---
    SiArduino: <SiArduino />,
    SiRaspberrypi: <SiRaspberrypi />,

    // --- DESIGN ---
    SiFigma: <SiFigma />,
    FaCode: <FaCode />, // Fallback
};

const iconOptions = Object.keys(iconMap).sort(); 

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [members, setMembers] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const defaultColor = colorOptions[0];
  
  // Initial State
  const initialFormState = {
    name: '',
    icon: 'FaCode',
    status: statuses[0],
    owner: '', 
    color: defaultColor.color,
    from: defaultColor.from,
    to: defaultColor.to,
  };

  const [formData, setFormData] = useState(initialFormState);
  const token = localStorage.getItem('token');

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchData = async () => {
        try {
            const skillsRes = await axios.get(`${API_BASE}/api/skills`);
            setSkills(skillsRes.data);

            const membersRes = await axios.get(`${API_BASE}/api/members`);
            setMembers(membersRes.data);

            if (membersRes.data.length > 0) {
                setFormData(prev => ({ ...prev, owner: membersRes.data[0].name }));
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'color') {
        const selectedColor = colorOptions.find(opt => opt.color === value);
        if (selectedColor) {
            setFormData(prev => ({ 
                ...prev, 
                color: selectedColor.color, 
                from: selectedColor.from, 
                to: selectedColor.to 
            }));
        }
    } else {
        setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!formData.owner) {
        setMessage('Error: Please select an owner (Add a member first).');
        setLoading(false);
        return;
    }

    try {
      await axios.post(
        '${API_BASE}/api/skills', 
        formData, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage('Skill Added Successfully! ðŸŽ‰'); 
      setFormData({
        ...initialFormState,
        owner: members.length > 0 ? members[0].name : ''
      });
      
      const res = await axios.get(`${API_BASE}/api/skills`);
      setSkills(res.data);

    } catch (error) {
      console.error("Error adding skill:", error);
      if (error.response && error.response.data) {
          setMessage(`Error: ${error.response.data.message || error.response.data.error || 'Check Backend Logs'}`);
      } else {
          setMessage('Error adding skill. Check console.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    try {
      await axios.delete(`${API_BASE}/api/skills/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const res = await axios.get(`${API_BASE}/api/skills`);
      setSkills(res.data);
      setMessage('Skill Deleted!');
    } catch (error) {
      console.error(error);
      setMessage('Error deleting skill.');
    }
  };
  
  const getIconComponent = (iconName) => iconMap[iconName] || <FaCode />;

  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-12 text-white">
      <div className="max-w-6xl mx-auto">
        
        <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8">
          <FaArrowLeft /> Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold mb-8">Manage Skills</h1>

        {/* --- ADD SKILL FORM --- */}
        <div className="bg-slate-900 p-8 rounded-3xl border border-white/10 mb-12">
          <h2 className="text-xl font-bold mb-6 text-cyan-400">Add New Skill</h2>
          
          {message && <div className={`mb-4 p-3 rounded ${message.includes('Error') ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>{message}</div>}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="space-y-2">
                <label className="block text-slate-400 text-sm font-bold ml-1">Skill Name</label>
                <input 
                  name="name" value={formData.name} onChange={handleChange} 
                  placeholder="e.g. MERN Stack" 
                  className="w-full bg-slate-950 border border-slate-700 p-3 rounded-xl text-white focus:border-cyan-500 outline-none" 
                  required 
                />
            </div>
            
            <div className="space-y-2">
                <label className="block text-slate-400 text-sm font-bold ml-1">Owner</label>
                <select 
                    name="owner" 
                    value={formData.owner} 
                    onChange={handleChange} 
                    className="w-full bg-slate-950 border border-slate-700 p-3 rounded-xl text-white focus:border-cyan-500 outline-none" 
                    required
                >
                    {members.length > 0 ? (
                        members.map(member => (
                            <option key={member._id} value={member.name}>
                                {member.name}
                            </option>
                        ))
                    ) : (
                        <option value="" disabled>Loading Members...</option>
                    )}
                </select>
            </div>
            
            <div className="space-y-2">
                <label className="block text-slate-400 text-sm font-bold ml-1">Expertise Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 p-3 rounded-xl text-white focus:border-cyan-500 outline-none" required>
                    {statuses.map(status => <option key={status} value={status}>{status}</option>)}
                </select>
            </div>

            <div className="space-y-2">
                <label className="block text-slate-400 text-sm font-bold ml-1">Icon (Select Icon)</label>
                <div className="relative">
                    <select name="icon" value={formData.icon} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 p-3 rounded-xl text-white focus:border-cyan-500 outline-none appearance-none" required>
                        {iconOptions.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                    </select>
                    <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-cyan-400 pointer-events-none">
                        {getIconComponent(formData.icon)}
                    </div>
                </div>
            </div>
            
            <div className="space-y-2">
                <label className="block text-slate-400 text-sm font-bold ml-1">Gradient Color</label>
                <select name="color" value={formData.color} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 p-3 rounded-xl text-white focus:border-cyan-500 outline-none" required>
                    {colorOptions.map(opt => (
                        <option key={opt.value} value={opt.color} className={opt.color}>
                            {opt.name}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-3 rounded-xl font-bold text-lg hover:shadow-lg transition-all md:col-span-1 lg:col-span-1 h-full mt-auto">
              {loading ? 'Adding Skill...' : <><FaPlus className="inline mr-2" /> Add Skill</>}
            </button>
          </form>
        </div>

        {/* --- EXISTING SKILLS LIST --- */}
        <h2 className="text-2xl font-bold mb-6">Existing Skills ({skills.length})</h2>
        <div className="space-y-4">
          {members.length > 0 ? members.map(member => (
            <div key={member._id} className="bg-slate-900/50 p-6 rounded-3xl border border-white/10">
                <h3 className="text-xl font-bold text-cyan-400 mb-4">{member.name}'s Skills</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {skills.filter(s => s.owner === member.name).map((skill) => (
                        <div key={skill._id} className="flex items-center justify-between bg-slate-800 p-4 rounded-xl border border-white/5 shadow-md">
                            <div className="flex items-center gap-4">
                                <div className={`text-2xl ${skill.color}`}>{getIconComponent(skill.icon)}</div>
                                <div>
                                    <h4 className="font-bold text-white">{skill.name}</h4>
                                    <span className="text-xs text-slate-400 bg-slate-700 px-2 py-0.5 rounded-full">{skill.status}</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => handleDelete(skill._id)} 
                                className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                    {skills.filter(s => s.owner === member.name).length === 0 && (
                        <p className="text-slate-500 col-span-3 italic">No skills added yet.</p>
                    )}
                </div>
            </div>
          )) : (
              <p className="text-slate-500">No team members found. Add members first.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default ManageSkills;
