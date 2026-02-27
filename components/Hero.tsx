import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const roles = [
  'Full Stack Developer',
  'UI/UX Engineer',
  'DevOps Specialist',
  'Security Consultant',
];

const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  // Typing effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
        if (displayText.length === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentRole.slice(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  // Trigger stats animation
  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-violet/10 rounded-full filter blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-neon/5 rounded-full filter blur-3xl animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }}></div>

      {/* Floating orbs */}
      <div className="absolute top-20 right-1/4 w-2 h-2 bg-accent rounded-full animate-float opacity-60"></div>
      <div className="absolute top-40 left-1/4 w-3 h-3 bg-violet rounded-full animate-float-delayed opacity-40"></div>
      <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-neon rounded-full animate-float-slow opacity-50"></div>
      <div className="absolute top-1/2 left-10 w-1.5 h-1.5 bg-accent rounded-full animate-float opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full glass text-accent text-sm font-medium mb-8 animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-neon mr-2 animate-pulse"></span>
            Available for Projects
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span className="text-white">I Build</span>
            <br />
            <span className="gradient-text">Digital Experiences</span>
          </h1>

          {/* Typing effect */}
          <div className="h-12 flex items-center justify-center mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <span className="text-xl md:text-2xl text-gray-400 font-mono">
              {'> '}{displayText}
              <span className="animate-typing-cursor text-accent">|</span>
            </span>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            Crafting scalable web applications with modern technologies,
            robust security, and pixel-perfect interfaces.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <a
              href="#projects"
              onClick={(e) => handleScroll(e, 'projects')}
              className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-2xl text-white bg-gradient-to-r from-accent to-violet shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              View My Work
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              onClick={(e) => handleScroll(e, 'contact')}
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-2xl text-white glass hover:bg-white/10 transition-all duration-300 cursor-pointer"
            >
              Get In Touch
            </a>
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-3 gap-8 max-w-lg mx-auto mt-16 transition-all duration-1000 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <StatCounter end={50} suffix="+" label="Projects" />
            <StatCounter end={30} suffix="+" label="Clients" />
            <StatCounter end={5} suffix="+" label="Years Exp" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#about" onClick={(e) => handleScroll(e, 'about')} className="text-gray-500 hover:text-accent transition-colors cursor-pointer">
          <ChevronDown className="h-6 w-6" />
        </a>
      </div>
    </section>
  );
};

// Animated counter component
const StatCounter: React.FC<{ end: number; suffix: string; label: string }> = ({ end, suffix, label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold gradient-text">{count}{suffix}</div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
  );
};

export default Hero;