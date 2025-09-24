import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import SteganographyTool from './components/SteganographyTool';

function HomePage() {
  return (
    <>
      <Hero />
      <Features />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tool" element={<SteganographyTool />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;