import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// --- LAYOUTS ---
import MainLayout from "./layouts/MainLayout";
// import AdminLayout from './layouts/AdminLayout';

// --- PUBLIC PAGES ---
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";

// --- ADMIN PAGES ---
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import ManageProjects from "./pages/admin/ManageProjects";
import ManageSkills from "./pages/admin/ManageSkills";
import ManageTeam from "./pages/admin/ManageTeam";

// --- COMPONENTS ---
import Preloader from "./components/common/Preloader";
import ServiceDetail from "./pages/ServiceDetail";

// Utils
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/admin/radha/login" replace />;
  }
  return children;
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 2.5 seconds ka fake load time.
    // Agar future mein API call karna ho to yahan promise use kar sakte ho.
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Preloader hamesha render hoga, lekin control 'isLoading' prop se hoga */}
      <Preloader isLoading={loading} />

      {/* Main Content:
          Preloader 'fixed' position pe hai, isliye jab tak loading true hai 
          ye content peeche chupa rahega. Jaise hi loading false hogi, 
          Preloader fade out hoga aur ye content dikhne lagega.
      */}
      <ScrollToTop />

      <Routes>
        {/* === PUBLIC ROUTES === */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetails />} />
          <Route path="team" element={<Services />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="service/:id" element={<ServiceDetail />} />
        </Route>

        {/* === ADMIN ROUTES === */}
        <Route path="/admin/radha/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <ProtectedRoute>
              <ManageProjects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/skills"
          element={
            <ProtectedRoute>
              <ManageSkills />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/team"
          element={
            <ProtectedRoute>
              <ManageTeam />
            </ProtectedRoute>
          }
        />

        {/* 404 Catch All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
