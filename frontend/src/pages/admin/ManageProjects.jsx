import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE from '../../utils/api';
import { FaTrash, FaPlus, FaArrowLeft, FaVideo, FaImage, FaTimes, FaEdit } from 'react-icons/fa'; // FaEdit add kiya
import { Link } from 'react-router-dom';

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  // Edit Mode State
  const [editId, setEditId] = useState(null);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Web Dev');
  const [description, setDescription] = useState('');
  const [github, setGithub] = useState('');
  const [live, setLive] = useState(''); 
  const [client, setClient] = useState('');
  const [duration, setDuration] = useState('');
  const [role, setRole] = useState('');
  const [techStack, setTechStack] = useState('');
  const [features, setFeatures] = useState('');
  const [stats, setStats] = useState('');
  const [challenge, setChallenge] = useState('');
  const [solution, setSolution] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');

  // File States
  const [thumbnail, setThumbnail] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]); 

  const token = localStorage.getItem('token');

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/api/projects`);
      setProjects(data);
    } catch (error) { console.error(error); }
  };

  // --- EDIT CLICK HANDLER ---
  const handleEditClick = (project) => {
    setEditId(project._id);
    setTitle(project.title);
    setCategory(project.category);
    setDescription(project.description);
    setGithub(project.github || '');
    setLive(project.live || '');
    setClient(project.client || '');
    setDuration(project.duration || '');
    setRole(project.role || '');
    setChallenge(project.challenge || '');
    setSolution(project.solution || '');
    setCodeSnippet(project.codeSnippet || '');

    // Arrays ko wapas String format me convert karna padega form ke liye
    if (project.techStack) setTechStack(project.techStack.join(', '));
    if (project.features) setFeatures(project.features.join('\n'));
    
    // Stats Array of Objects -> String ("Label: Value")
    if (project.stats) {
        const statsString = project.stats.map(s => `${s.label}: ${s.value}`).join('\n');
        setStats(statsString);
    }

    // Files reset (Edit me purani files backend handle karega, yahan naye select honge)
    setThumbnail(null);
    setGalleryFiles([]);

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMessage(`Editing: ${project.title}`);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    resetForm();
    setMessage('');
  };

  const resetForm = () => {
    setTitle(''); setCategory('Web Dev'); setDescription('');
    setGithub(''); setLive(''); setClient(''); setDuration(''); setRole('');
    setTechStack(''); setFeatures(''); setStats(''); setChallenge(''); setSolution(''); setCodeSnippet('');
    setThumbnail(null); setGalleryFiles([]);
  };

  const handleGalleryChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (galleryFiles.length + selectedFiles.length > 5) {
        alert(`Limit exceeded! You can only add ${5 - galleryFiles.length} more files.`);
        return;
    }
    setGalleryFiles(prev => [...prev, ...selectedFiles]);
    e.target.value = "";
  };

  const removeFile = (index) => {
    setGalleryFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('github', github);
    formData.append('live', live);
    formData.append('client', client);
    formData.append('duration', duration);
    formData.append('role', role);
    formData.append('techStack', techStack);
    formData.append('features', features);
    formData.append('stats', stats);
    formData.append('challenge', challenge);
    formData.append('solution', solution);
    formData.append('codeSnippet', codeSnippet);

    if (thumbnail) formData.append('thumbnail', thumbnail);
    galleryFiles.forEach((file) => formData.append('gallery', file));

    try {
      if (editId) {
         // --- UPDATE LOGIC ---
         await axios.put(`${API_BASE}/api/projects/${editId}`, formData, {
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
         });
         setMessage('Project Updated Successfully! ðŸŽ‰');
         setEditId(null);
      } else {
         // --- CREATE LOGIC ---
         await axios.post(`${API_BASE}/api/projects`, formData, {
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
         });
         setMessage('Project Added Successfully! ðŸš€');
      }
      
      resetForm();
      fetchProjects();
    } catch (error) {
      setMessage('Error saving project.');
      console.error(error);
    } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
      if (!window.confirm('Delete project?')) return;
      try {
          await axios.delete(`${API_BASE}/api/projects/${id}`, { headers: { Authorization: `Bearer ${token}` } });
          fetchProjects();
      } catch (err) { console.error(err); }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-12 text-white">
      <div className="max-w-6xl mx-auto">
        <Link to="/admin/dashboard" className="text-slate-400 mb-8 block"><FaArrowLeft className="inline mr-2"/> Back</Link>
        <h1 className="text-3xl font-bold mb-8">Manage Projects</h1>

        {/* FORM CONTAINER */}
        <div className={`p-8 rounded-3xl border mb-12 shadow-2xl transition-colors ${editId ? 'bg-cyan-900/20 border-cyan-500/50' : 'bg-slate-900 border-white/10'}`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-xl font-bold ${editId ? 'text-cyan-400' : 'text-white'}`}>
                {editId ? `Editing: ${title}` : 'Add New Project'}
            </h2>
            {editId && (
                <button onClick={handleCancelEdit} className="text-red-400 hover:text-red-300 flex items-center gap-2 text-sm">
                    <FaTimes /> Cancel Edit
                </button>
            )}
          </div>
          
          {message && <p className="mb-4 text-green-400 bg-green-900/30 p-3 rounded">{message}</p>}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* --- UPLOAD SECTION --- */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-950 rounded-2xl border border-slate-800">
                
                {/* 1. Main Thumbnail */}
                <div>
                    <label className="block text-sm text-cyan-400 mb-2 font-bold uppercase">
                        {editId ? 'Change Thumbnail (Optional)' : 'Main Thumbnail *'}
                    </label>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={e => setThumbnail(e.target.files[0])} 
                        className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20 cursor-pointer bg-slate-900 rounded-lg border border-slate-700" 
                        required={!editId} 
                    />
                    {thumbnail && <p className="text-xs text-green-400 mt-2">Selected: {thumbnail.name}</p>}
                </div>

                {/* 2. Gallery */}
                <div>
                    <label className="block text-sm text-purple-400 mb-2 font-bold uppercase">
                        {editId ? 'Add More Gallery Items' : 'Gallery (Max 5)'}
                    </label>
                    
                    <div className="flex gap-2 mb-3">
                        <input 
                            type="file" 
                            accept="image/*,video/*"
                            multiple 
                            onChange={handleGalleryChange} 
                            disabled={galleryFiles.length >= 5}
                            className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-500/10 file:text-purple-400 hover:file:bg-purple-500/20 cursor-pointer bg-slate-900 rounded-lg border border-slate-700 disabled:opacity-50" 
                        />
                    </div>

                    <div className="space-y-2">
                        {galleryFiles.map((file, idx) => (
                            <div key={idx} className="flex justify-between items-center bg-slate-800 px-3 py-2 rounded text-xs border border-white/5">
                                <span className="truncate w-4/5 text-slate-300 flex items-center">
                                    {file.type.startsWith('video') ? <FaVideo className="mr-2 text-pink-400"/> : <FaImage className="mr-2 text-blue-400"/>}
                                    {file.name}
                                </span>
                                <button type="button" onClick={() => removeFile(idx)} className="text-red-400 hover:text-red-200"><FaTimes/></button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Inputs */}
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Project Title *" className="input-style" required />
            <select value={category} onChange={e => setCategory(e.target.value)} className="input-style">
                <option>Web Dev</option><option>Mobile App</option><option>AI & Data</option>
            </select>

            <input value={github} onChange={e => setGithub(e.target.value)} placeholder="GitHub Link" className="input-style" />
            <input value={live} onChange={e => setLive(e.target.value)} placeholder="Live Demo Link" className="input-style" />

            {/* Text Areas */}
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Short Description *" rows="2" className="md:col-span-2 input-style" required />
            <input value={client} onChange={e => setClient(e.target.value)} placeholder="Client" className="input-style" />
            <input value={duration} onChange={e => setDuration(e.target.value)} placeholder="Duration" className="input-style" />
            <input value={role} onChange={e => setRole(e.target.value)} placeholder="My Role" className="input-style" />
            <input value={techStack} onChange={e => setTechStack(e.target.value)} placeholder="Tech Stack (Comma separated)" className="md:col-span-2 input-style" />
            
            <textarea value={stats} onChange={e => setStats(e.target.value)} placeholder="Stats (Label: Value per line)" rows="3" className="md:col-span-2 input-style font-mono text-sm" />
            <textarea value={features} onChange={e => setFeatures(e.target.value)} placeholder="Features (New line separated)" rows="3" className="md:col-span-2 input-style" />
            <textarea value={challenge} onChange={e => setChallenge(e.target.value)} placeholder="Challenge" rows="2" className="md:col-span-2 input-style" />
            <textarea value={solution} onChange={e => setSolution(e.target.value)} placeholder="Solution" rows="2" className="md:col-span-2 input-style" />
            <textarea value={codeSnippet} onChange={e => setCodeSnippet(e.target.value)} placeholder="Code Snippet (Optional)" rows="4" className="md:col-span-2 input-style font-mono text-xs" />

            <button type="submit" disabled={loading} className={`md:col-span-2 w-full py-4 rounded-xl font-bold text-lg transition-all ${editId ? 'bg-green-600 hover:bg-green-500' : 'bg-cyan-600 hover:bg-cyan-500'}`}>
                {loading ? 'Processing...' : (editId ? 'Update Project' : 'ðŸš€ Launch Project')}
            </button>
          </form>
        </div>

        {/* LIST */}
        <div className="space-y-4">
            {projects.map(p => (
                <div key={p._id} className={`flex justify-between p-4 rounded-xl items-center border transition-all ${editId === p._id ? 'bg-cyan-900/20 border-cyan-500' : 'bg-slate-900 border-white/5'}`}>
                    <div className="flex gap-4 items-center">
                        <img src={p.thumbnail || p.image} alt={p.title} className="w-16 h-16 rounded-lg object-cover" />
                        <div>
                            <h3 className="font-bold">{p.title}</h3>
                            <span className="text-xs text-slate-500">{p.category}</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => handleEditClick(p)} 
                            className="p-3 bg-slate-800 text-blue-400 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                            title="Edit Project"
                        >
                            <FaEdit />
                        </button>
                        <button 
                            onClick={() => handleDelete(p._id)} 
                            className="p-3 bg-slate-800 text-red-500 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                            title="Delete Project"
                        >
                            <FaTrash />
                        </button>
                    </div>
                </div>
            ))}
        </div>
      </div>
      <style>{`.input-style { width: 100%; background: #020617; border: 1px solid #334155; padding: 12px; border-radius: 12px; color: white; outline: none; }`}</style>
    </div>
  );
};

export default ManageProjects;
