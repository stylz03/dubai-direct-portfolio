import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Demos from './components/Demos';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col text-dark">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        <Demos />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;