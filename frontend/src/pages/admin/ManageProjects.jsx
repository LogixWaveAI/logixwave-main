import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaArrowLeft, FaImage, FaEdit, FaLink, FaSync } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ManageProjects = () => {
  // 👇 API URL: Agar Localhost pe backend chala rahe ho, to is line ko change karo!
  // const API_URL = 'http://localhost:5000/api/projects'; // Local Testing ke liye
  const API_URL = 'https://logixwave-main.onrender.com/api/projects'; // Live Server ke liye

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(''); // Error dikhane ke liye
  const [message, setMessage] = useState('');
  
  // Edit Mode
  const [editId, setEditId] = useState(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Web Dev');
  const [description, setDescription] = useState('');
  const [github, setGithub] = useState('');
  const [live, setLive] = useState(''); 
  const [client, setClient] = useState('');
  const [duration, setDuration] = useState('');
  const [role, setRole] = useState('');
  
  // URL Inputs
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [galleryUrls, setGalleryUrls] = useState('');

  const [techStack, setTechStack] = useState('');
  const [features, setFeatures] = useState('');
  const [stats, setStats] = useState('');
  const [challenge, setChallenge] = useState('');
  const [solution, setSolution] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');

  // Old File Inputs (Backup)
  const [thumbnail, setThumbnail] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState(null);

  // Fetch Projects Function
  const fetchProjects = async () => {
    setLoading(true);
    setFetchError('');
    try {
      console.log("Fetching projects from:", API_URL);
      const { data } = await axios.get(API_URL);
      console.log("Data received:", data);
      
      if (Array.isArray(data)) {
        setProjects(data);
      } else {
        setFetchError('Data format incorrect. Expected array.');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setFetchError(`Failed to load projects. Is Backend running? (${error.message})`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleEditClick = (p) => {
    setEditId(p._id);
    setTitle(p.title);
    setCategory(p.category);
    setDescription(p.description);
    setGithub(p.github);
    setLive(p.live);
    setClient(p.client || '');
    setDuration(p.duration || '');
    setRole(p.role || '');
    
    // Set URL directly
    setThumbnailUrl(p.thumbnail || '');
    
    setTechStack(p.techStack ? p.techStack.join(', ') : '');
    setFeatures(p.features ? p.features.join(' | ') : '');
    setStats(p.stats ? p.stats.map(s => `${s.label}:${s.value}`).join(', ') : '');
    setChallenge(p.challenge || '');
    setSolution(p.solution || '');
    setCodeSnippet(p.codeSnippet || '');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setEditId(null);
    setTitle('');
    setCategory('Web Dev');
    setDescription('');
    setGithub('');
    setLive('');
    setClient('');
    setDuration('');
    setRole('');
    setThumbnailUrl('');
    setGalleryUrls('');
    setTechStack('');
    setFeatures('');
    setStats('');
    setChallenge('');
    setSolution('');
    setCodeSnippet('');
    setThumbnail(null);
    setGalleryFiles(null);
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
    formData.append('challenge', challenge);
    formData.append('solution', solution);
    formData.append('codeSnippet', codeSnippet);

    formData.append('thumbnailUrl', thumbnailUrl);
    formData.append('galleryUrls', galleryUrls);

    const techArray = techStack.split(',').map(t => t.trim()).filter(t => t);
    formData.append('techStack', JSON.stringify(techArray));

    const featArray = features.split('|').map(f => f.trim()).filter(f => f);
    formData.append('features', JSON.stringify(featArray));

    const statsArray = stats.split(',').map(s => {
      const [label, value] = s.split(':');
      return label && value ? { label: label.trim(), value: value.trim() } : null;
    }).filter(s => s !== null);
    formData.append('stats', JSON.stringify(statsArray));

    if (thumbnail) formData.append('thumbnail', thumbnail);
    if (galleryFiles) {
      for (let i = 0; i < galleryFiles.length; i++) {
        formData.append('gallery', galleryFiles[i]);
      }
    }

    try {
      const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
             Authorization: `Bearer ${localStorage.getItem('adminToken')}` 
        }
      };

      if (editId) {
        await axios.put(`${API_URL}/${editId}`, formData, config);
        setMessage('Project Updated Successfully!');
      } else {
        await axios.post(API_URL, formData, config);
        setMessage('Project Created Successfully!');
      }
      
      handleReset();
      fetchProjects();
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Error saving project');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`${API_URL}/${id}`, {
             headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
        });
        fetchProjects();
      } catch (error) {
        console.error(error);
        alert('Failed to delete');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8 font-mono">
      <div className="max-w-6xl mx-auto">
        <Link to="/admin/dashboard" className="flex items-center gap-2 text-cyan-400 mb-6 hover:text-cyan-300">
          <FaArrowLeft /> Back to Dashboard
        </Link>
        
        <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
          {editId ? 'Edit Project' : 'Manage Projects'}
        </h1>

        {/* Message Alert */}
        {message && (
            <div className={`p-4 mb-6 rounded-lg ${message.includes('Error') ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                {message}
            </div>
        )}

        {/* Error Alert (Fetch Fail) */}
        {fetchError && (
            <div className="p-4 mb-6 rounded-lg bg-red-900/50 border border-red-500 text-red-200">
                <strong>Error:</strong> {fetchError} <br/>
                <small>Check if your backend is running at: {API_URL}</small>
                <button onClick={fetchProjects} className="block mt-2 text-sm underline hover:text-white">Try Refreshing</button>
            </div>
        )}

        <form onSubmit={handleSubmit} className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 space-y-6">
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <h3 className="text-xl text-cyan-400 mb-4 flex items-center gap-2"><FaImage /> Media Links</h3>
                <div className="mb-4">
                    <label className="block text-sm text-slate-400 mb-1">Thumbnail Image Link (Permanent)</label>
                    <div className="flex gap-2">
                        <div className="bg-slate-700 p-3 rounded-l-lg"><FaLink /></div>
                        <input 
                            type="text" 
                            placeholder="e.g. https://logixwaveai.com/projects/my-image.png"
                            className="input-style flex-1"
                            value={thumbnailUrl}
                            onChange={(e) => setThumbnailUrl(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-700">
                    <label className="block text-sm text-red-400 mb-1">Or Upload File (Temporary on Render)</label>
                    <input type="file" onChange={(e) => setThumbnail(e.target.files[0])} className="text-sm text-slate-500" />
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Project Title" className="input-style" value={title} onChange={e => setTitle(e.target.value)} required />
                <select className="input-style" value={category} onChange={e => setCategory(e.target.value)}>
                    <option>Web Dev</option>
                    <option>App Dev</option>
                    <option>AI/ML</option>
                    <option>Cybersecurity</option>
                </select>
                <input type="text" placeholder="Client Name" className="input-style" value={client} onChange={e => setClient(e.target.value)} />
                <input type="text" placeholder="Duration" className="input-style" value={duration} onChange={e => setDuration(e.target.value)} />
            </div>

            <textarea placeholder="Description" className="input-style h-24" value={description} onChange={e => setDescription(e.target.value)} required></textarea>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="GitHub Link" className="input-style" value={github} onChange={e => setGithub(e.target.value)} />
                <input type="text" placeholder="Live Demo Link" className="input-style" value={live} onChange={e => setLive(e.target.value)} />
            </div>

            <input type="text" placeholder="Tech Stack (comma separated)" className="input-style" value={techStack} onChange={e => setTechStack(e.target.value)} />

            <button type="submit" disabled={loading} className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-4 rounded-xl transition-all">
                {loading ? 'Processing...' : (editId ? 'Update Project' : 'Create Project')}
            </button>
            
            {editId && (
                <button type="button" onClick={handleReset} className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl transition-all">
                    Cancel Edit (Create New)
                </button>
            )}
        </form>

        {/* --- LIST SECTION --- */}
        <div className="mt-12 space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-300">Existing Projects ({projects.length})</h2>
                <button onClick={fetchProjects} className="flex items-center gap-2 text-cyan-400 hover:text-white">
                    <FaSync className={loading ? 'animate-spin' : ''} /> Refresh List
                </button>
            </div>

            {loading && <p className="text-center text-slate-500">Loading projects...</p>}
            
            {!loading && projects.length === 0 && !fetchError && (
                <div className="p-8 text-center bg-slate-800/30 rounded-xl border border-dashed border-slate-700">
                    <p className="text-slate-400">No projects found. Add one above!</p>
                </div>
            )}

            {projects.map(p => (
                <div key={p._id} className="bg-slate-800/30 p-4 rounded-xl flex items-center justify-between border border-slate-700 hover:border-cyan-500/30 transition-all">
                    <div className="flex items-center gap-4">
                        {/* Image Fallback Check */}
                        <div className="w-16 h-16 rounded-lg bg-slate-900 overflow-hidden flex-shrink-0">
                             {p.thumbnail || p.image ? (
                                <img src={p.thumbnail || p.image} alt={p.title} className="w-full h-full object-cover" onError={(e) => e.target.style.display='none'} />
                             ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-600"><FaImage /></div>
                             )}
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-lg">{p.title}</h3>
                            <span className="text-xs text-cyan-400 px-2 py-1 bg-cyan-900/20 rounded-full">{p.category}</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => handleEditClick(p)} className="p-3 bg-slate-800 text-blue-400 rounded-lg hover:bg-blue-600 hover:text-white border border-slate-700">
                            <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(p._id)} className="p-3 bg-slate-800 text-red-500 rounded-lg hover:bg-red-600 hover:text-white border border-slate-700">
                            <FaTrash />
                        </button>
                    </div>
                </div>
            ))}
        </div>
      </div>
      <style>{`.input-style { width: 100%; background: #020617; border: 1px solid #334155; padding: 12px; border-radius: 12px; color: white; outline: none; } .input-style:focus { border-color: #06b6d4; }`}</style>
    </div>
  );
};

export default ManageProjects;