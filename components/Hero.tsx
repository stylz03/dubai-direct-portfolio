import React, { useState, useEffect, Suspense, lazy } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Spline = lazy(() => import('@splinetool/react-spline'));

const roles = [
  'Founder & Lead Engineer',
  'Full Stack Developer',
  'Security Auditor',
  'DevOps Specialist',
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
    if (id === 'contact') {
      window.dispatchEvent(new Event('open-chat'));
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

      {/* 3D Spline Background */}
      <div className="absolute inset-0 z-10 pointer-events-auto">
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center bg-transparent pointer-events-none">
              <div className="flex h-8 w-8 rounded-full bg-neon animate-pulse"></div>
            </div>
          }
        >
          <Spline
            className="w-full h-full"
            scene="https://prod.spline.design/WCe1pB4pwp4cqr7U/scene.splinecode"
          />
        </Suspense>
      </div>

      {/* Grid pattern overlay to add texture over the 3D model if desired, optional */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-10" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-auto pointer-events-none">
        <div className="text-center flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full glass text-accent text-sm font-medium mb-8 animate-fade-in pointer-events-auto relative z-20">
            <span className="flex h-2 w-2 rounded-full bg-neon mr-2 animate-pulse"></span>
            Available for Projects
          </div>

          {/* Main heading - stays behind the robot */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 animate-fade-in-up drop-shadow-2xl relative z-0" style={{ animationDelay: '0.2s' }}>
            <span className="text-white">Engineering</span>
            <br />
            <span className="gradient-text">Digital Excellence</span>
          </h1>

          {/* Typing effect */}
          <div className="h-12 flex items-center justify-center mb-8 animate-fade-in relative z-20" style={{ animationDelay: '0.4s' }}>
            <span className="text-xl md:text-2xl font-mono text-white/90 font-bold px-4 py-1">
              {'> '}{displayText}
              <span className="animate-typing-cursor text-accent">|</span>
            </span>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up p-2 relative z-20" style={{ animationDelay: '0.6s' }}>
            At Dubai Direct, I specialize in crafting secure, scalable web applications that are built to perform and engineered to perfection.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up pointer-events-auto shadow-2xl relative z-20" style={{ animationDelay: '0.8s' }}>
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
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-2xl text-white glass hover:bg-white/10 transition-all duration-300 cursor-pointer backdrop-blur-md bg-white/5 border border-white/10"
            >
              Get In Touch
            </a>
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-3 gap-8 max-w-lg mx-auto mt-16 transition-all duration-1000 relative z-20 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <StatCounter end={50} suffix="+" label="Projects" />
            <StatCounter end={30} suffix="+" label="Clients" />
            <StatCounter end={5} suffix="+" label="Years Exp" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20 pointer-events-auto">
        <a href="#about" onClick={(e) => handleScroll(e, 'about')} className="text-white hover:text-accent transition-colors cursor-pointer block p-2 filter drop-shadow-md">
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