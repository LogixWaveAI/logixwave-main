import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// --- LAYOUTS ---
import MainLayout from "./layouts/MainLayout";
// import AdminLayout from './layouts/AdminLayout';

// --- PUBLIC PAGES ---
const Home = React.lazy(() => import("./pages/Home"));
const Projects = React.lazy(() => import("./pages/Projects"));
const ProjectDetails = React.lazy(() => import("./pages/ProjectDetails"));
const Services = React.lazy(() => import("./pages/Services"));
const About = React.lazy(() => import("./pages/About"));
const Contact = React.lazy(() => import("./pages/Contact"));
const AgenticAIDetailed = React.lazy(() => import("./pages/services/AgenticAIDetailed"));
const N8nAutomationDetailed = React.lazy(() => import("./pages/services/N8nAutomationDetailed"));

// --- ADMIN PAGES ---
const AdminLogin = React.lazy(() => import("./pages/admin/AdminLogin"));
const Dashboard = React.lazy(() => import("./pages/admin/Dashboard"));
const ManageProjects = React.lazy(() => import("./pages/admin/ManageProjects"));
const ManageSkills = React.lazy(() => import("./pages/admin/ManageSkills"));
const ManageTeam = React.lazy(() => import("./pages/admin/ManageTeam"));

// --- COMPONENTS ---
import Preloader from "./components/common/Preloader";
const ServiceDetail = React.lazy(() => import("./pages/ServiceDetail"));

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
    // Fake loader removed. Wait for fonts/css then reveal immediately.
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

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

      <React.Suspense fallback={<Preloader isLoading={true} />}>
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
            <Route path="services/agentic-ai" element={<AgenticAIDetailed />} />
            <Route path="services/n8n-automation" element={<N8nAutomationDetailed />} />
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
      </React.Suspense>
    </>
  );
}

export default App;
