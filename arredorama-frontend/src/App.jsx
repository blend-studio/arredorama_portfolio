import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
// import About from './pages/About'; // Decommenta quando crei il file About

function App() {
  return (
    // AGGIUNGI basename="/nome-repo"
    <Router basename="/arredorama-portfolio">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
}
export default App;