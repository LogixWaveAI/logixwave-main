import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE from '../../utils/api';
import { FaTrash, FaArrowLeft, FaEdit, FaTimes } from 'react-icons/fa'; // FaEdit aur FaTimes add kiya
import { Link } from 'react-router-dom';

const ManageTeam = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Edit Mode State
  const [editId, setEditId] = useState(null); // Agar null nahi hai, matlab edit mode ON hai

  // Form Data State
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [desc, setDesc] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [colorTheme, setColorTheme] = useState('cyan');
  
  // File States
  const [imageFile, setImageFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/api/members`);
      setMembers(data);
    } catch (error) { console.error(error); }
  };

  // --- EDIT BUTTON CLICK HANDLER ---
  const handleEditClick = (member) => {
    setEditId(member._id);
    setName(member.name);
    setRole(member.role);
    setDesc(member.desc);
    setGithub(member.github || '');
    setLinkedin(member.linkedin || '');
    setColorTheme(member.colorTheme || 'cyan');
    
    // Files ko reset karte hain (Security reason se file inputs pre-fill nahi ho sakte)
    setImageFile(null);
    setResumeFile(null);
    
    // Scroll to top functionality
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMessage('Editing Mode: Update details below ðŸ‘‡');
  };

  // --- CANCEL EDIT ---
  const handleCancelEdit = () => {
    setEditId(null);
    resetForm();
    setMessage('');
  };

  const resetForm = () => {
    setName(''); setRole(''); setDesc(''); setGithub(''); setLinkedin('');
    setColorTheme('cyan');
    setImageFile(null); setResumeFile(null);
    if(document.getElementById('imageInput')) document.getElementById('imageInput').value = "";
    if(document.getElementById('resumeInput')) document.getElementById('resumeInput').value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('role', role);
    formData.append('desc', desc);
    formData.append('github', github);
    formData.append('linkedin', linkedin);
    formData.append('colorTheme', colorTheme);
    
    if (imageFile) formData.append('image', imageFile);
    if (resumeFile) formData.append('resume', resumeFile);

    try {
      if (editId) {
        // --- UPDATE LOGIC (PUT) ---
        await axios.put(`${API_BASE}/api/members/${editId}`, formData, {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        setMessage('Member Updated Successfully! ðŸŽ‰');
        setEditId(null); // Exit edit mode
      } else {
        // --- CREATE LOGIC (POST) ---
        await axios.post(`${API_BASE}/api/members`, formData, {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        setMessage('Member Added Successfully! âœ…');
      }
      
      resetForm();
      fetchMembers();
    } catch (error) {
      console.error(error);
      setMessage(editId ? 'Error updating member.' : 'Error adding member.');
    } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this member?')) return;
    try {
      await axios.delete(`${API_BASE}/api/members/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMembers();
    } catch (error) { console.error(error); }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-12 text-white">
      <div className="max-w-6xl mx-auto">
        <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8"><FaArrowLeft /> Back to Dashboard</Link>
        <h1 className="text-3xl font-bold mb-8">Manage Team Members</h1>

        {/* ADD / EDIT MEMBER FORM */}
        <div className={`p-8 rounded-3xl border mb-12 transition-colors ${editId ? 'bg-cyan-900/20 border-cyan-500/50' : 'bg-slate-900 border-white/10'}`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-xl font-bold ${editId ? 'text-cyan-400' : 'text-white'}`}>
                {editId ? `Editing: ${name}` : 'Add New Member'}
            </h2>
            {editId && (
                <button onClick={handleCancelEdit} className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300">
                    <FaTimes /> Cancel Edit
                </button>
            )}
          </div>
          
          {message && <div className="mb-4 p-3 bg-slate-800 rounded text-cyan-400 text-sm font-bold">{message}</div>}
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" className="bg-slate-950 border border-slate-700 p-3 rounded-xl text-white outline-none focus:border-cyan-500" required />
            <input value={role} onChange={e => setRole(e.target.value)} placeholder="Role (e.g. AI Lead)" className="bg-slate-950 border border-slate-700 p-3 rounded-xl text-white outline-none focus:border-cyan-500" required />
            
            <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Bio / Introduction" className="md:col-span-2 bg-slate-950 border border-slate-700 p-3 rounded-xl text-white outline-none focus:border-cyan-500" required />
            
            {/* FILE INPUTS */}
            <div className="space-y-2">
                <label className="text-slate-400 text-sm">
                    {editId ? 'Change Profile Photo (Optional)' : 'Profile Photo *'}
                </label>
                <input 
                    id="imageInput"
                    type="file" 
                    accept="image/*"
                    onChange={e => setImageFile(e.target.files[0])} 
                    className="w-full bg-slate-950 border border-slate-700 p-2 rounded-xl text-white" 
                    required={!editId} // Edit mode me optional hai
                />
            </div>

            <div className="space-y-2">
                <label className="text-slate-400 text-sm">
                    {editId ? 'Change Resume PDF (Optional)' : 'Resume (PDF) *'}
                </label>
                <input 
                    id="resumeInput"
                    type="file" 
                    accept=".pdf"
                    onChange={e => setResumeFile(e.target.files[0])} 
                    className="w-full bg-slate-950 border border-slate-700 p-2 rounded-xl text-white" 
                    required={!editId} // Edit mode me optional hai
                />
            </div>

            <input value={github} onChange={e => setGithub(e.target.value)} placeholder="GitHub URL" className="bg-slate-950 border border-slate-700 p-3 rounded-xl text-white outline-none focus:border-cyan-500" />
            <input value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder="LinkedIn URL" className="bg-slate-950 border border-slate-700 p-3 rounded-xl text-white outline-none focus:border-cyan-500" />
            
            <select value={colorTheme} onChange={e => setColorTheme(e.target.value)} className="bg-slate-950 border border-slate-700 p-3 rounded-xl text-white outline-none focus:border-cyan-500">
                <option value="cyan">Cyan Theme</option>
                <option value="purple">Purple Theme</option>
                <option value="emerald">Emerald Theme</option>
                <option value="red">Red Theme</option>
                <option value="yellow">Yellow Theme</option>
            </select>
            
            <button type="submit" disabled={loading} className={`md:col-span-2 w-full py-3 rounded-xl font-bold transition-all ${editId ? 'bg-green-600 hover:bg-green-500' : 'bg-cyan-600 hover:bg-cyan-500'}`}>
                {loading ? 'Processing...' : (editId ? 'Update Member' : 'Add Member')}
            </button>
          </form>
        </div>

        {/* MEMBER LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map(member => (
                <div key={member._id} className={`p-6 rounded-2xl border flex items-center gap-4 transition-all ${editId === member._id ? 'bg-cyan-900/20 border-cyan-500' : 'bg-slate-900 border-white/10'}`}>
                    <img src={member.image} alt={member.name} className="w-16 h-16 rounded-full object-cover border-2 border-slate-700" />
                    <div className="flex-1 overflow-hidden">
                        <h3 className="font-bold text-lg truncate">{member.name}</h3>
                        <p className="text-xs text-slate-400 truncate">{member.role}</p>
                        <a href={member.resume} target="_blank" rel="noreferrer" className="text-xs text-cyan-400 hover:underline mt-1 block">View Resume</a>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        {/* EDIT BUTTON */}
                        <button 
                            onClick={() => handleEditClick(member)} 
                            className="text-blue-400 hover:text-white p-2 bg-slate-800 rounded-lg hover:bg-blue-600 transition-colors"
                            title="Edit Member"
                        >
                            <FaEdit />
                        </button>
                        
                        {/* DELETE BUTTON */}
                        <button 
                            onClick={() => handleDelete(member._id)} 
                            className="text-red-500 hover:text-white p-2 bg-slate-800 rounded-lg hover:bg-red-600 transition-colors"
                            title="Delete Member"
                        >
                            <FaTrash />
                        </button>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ManageTeam;
