import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Brands from './pages/Brands';
import Showroom from './pages/Showroom';
import SpazioIdee from './pages/SpazioIdee';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        {/* Rotte Admin (senza Layout) */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        
        {/* Rotte pubbliche (con Layout) */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/projects" element={<Layout><Projects /></Layout>} />
        <Route path="/projects/:id" element={<Layout><ProjectDetail /></Layout>} />
        <Route path="/brands" element={<Layout><Brands /></Layout>} />
        <Route path="/spazio-idee" element={<Layout><SpazioIdee /></Layout>} /> 
        <Route path="/showroom" element={<Layout><Showroom /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;