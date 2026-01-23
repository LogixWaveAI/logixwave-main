import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaProjectDiagram, FaCode, FaSignOutAlt, FaPlus , FaUserTie} from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    navigate("/admin/radha/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Welcome,{" "}
              <span className="text-cyan-400">{user?.name || "Admin"}</span>
            </h1>
            <p className="text-slate-400">
              Manage your portfolio content from here.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2 bg-red-500/10 text-red-400 border border-red-500/50 rounded-lg hover:bg-red-500 hover:text-white transition-all"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Projects Card */}
          <Link
            to="/admin/projects"
            className="group relative p-8 bg-slate-900 rounded-3xl border border-white/5 hover:border-cyan-500/50 transition-all hover:-translate-y-1"
          >
            <div className="absolute top-4 right-4 p-3 bg-cyan-500/10 text-cyan-400 rounded-xl text-2xl">
              <FaProjectDiagram />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Manage Projects
            </h2>
            <p className="text-slate-400 mb-6">
              Add new case studies, edit details, or remove old projects.
            </p>
            <span className="inline-flex items-center gap-2 text-cyan-400 font-bold group-hover:gap-4 transition-all">
              Go to Projects <FaPlus />
            </span>
          </Link>

          {/* Skills Card */}
          <Link
            to="/admin/skills"
            className="group relative p-8 bg-slate-900 rounded-3xl border border-white/5 hover:border-purple-500/50 transition-all hover:-translate-y-1"
          >
            <div className="absolute top-4 right-4 p-3 bg-purple-500/10 text-purple-400 rounded-xl text-2xl">
              <FaCode />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Manage Skills
            </h2>
            <p className="text-slate-400 mb-6">
              Update your tech stack and proficiency levels.
            </p>
            <span className="inline-flex items-center gap-2 text-purple-400 font-bold group-hover:gap-4 transition-all">
              Update Skills <FaPlus />
            </span>
          </Link>

          {/* Team Management Card */}
          <Link
            to="/admin/team"
            className="group relative p-8 bg-slate-900 rounded-3xl border border-white/5 hover:border-green-500/50 transition-all hover:-translate-y-1"
          >
            <div className="absolute top-4 right-4 p-3 bg-green-500/10 text-green-400 rounded-xl text-2xl">
              <FaUserTie />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Manage Team</h2>
            <p className="text-slate-400 mb-6">
              Add new members, update profiles and resumes.
            </p>
            <span className="inline-flex items-center gap-2 text-green-400 font-bold group-hover:gap-4 transition-all">
              Update Team <FaPlus />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
