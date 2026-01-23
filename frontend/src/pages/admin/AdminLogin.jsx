import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaLock, FaUserShield  } from 'react-icons/fa';


const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Backend URL (Make sure ye sahi ho)
      const { data } = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // Token save karo
      localStorage.setItem('token', data.token);
      localStorage.setItem('userInfo', JSON.stringify(data));

      // Dashboard bhej do
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login Failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md bg-slate-900 p-8 rounded-3xl border border-white/10 shadow-2xl relative z-10 backdrop-blur-xl">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-cyan-400 text-3xl border border-white/5">
            <FaUserShield />
          </div>
          <h2 className="text-3xl font-bold text-white">Admin Portal</h2>
          <p className="text-slate-400 mt-2">Enter credentials to access dashboard</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-slate-400 text-sm font-bold mb-2">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              placeholder="admin@kpcodetech.com"
              required
            />
          </div>

          <div>
            <label className="block text-slate-400 text-sm font-bold mb-2">Password</label>
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all pl-10"
                placeholder="••••••••"
                required
              />
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 text-sm" />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all transform hover:scale-[1.02]"
          >
            Access Dashboard
          </button>
        </form>

      </div>
    </div>
  );
};

export default AdminLogin;