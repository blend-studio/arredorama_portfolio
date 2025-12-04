import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import About from './pages/About'; // <--- 1. IMPORTA LA PAGINA

function App() {
  return (
    // Usa basename automatico per gestire sia locale che GitHub Pages
    <Router basename={import.meta.env.BASE_URL}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} /> {/* <--- 2. AGGIUNGI LA ROTTA */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;