import React, { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      // Determine active section
      const sections = navItems.map(item => item.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? 'bg-primary/90 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/5'
        : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex-shrink-0 flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 rounded-xl blur-lg group-hover:bg-accent/40 transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-accent to-violet p-2.5 rounded-xl">
                <Code2 className="h-6 w-6 text-white" />
              </div>
            </div>
            <span className="font-bold text-xl text-white tracking-tight">
              Dubai <span className="gradient-text">Direct</span>
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg cursor-pointer ${isActive
                      ? 'text-accent'
                      : 'text-gray-400 hover:text-white'
                    }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full"></span>
                  )}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="ml-4 bg-gradient-to-r from-accent to-violet text-white px-6 py-2.5 rounded-full font-medium transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:scale-105 cursor-pointer text-sm"
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
        <div className="glass px-4 py-4 mx-4 mb-4 rounded-2xl space-y-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`block px-4 py-3 rounded-xl text-base font-medium transition-all cursor-pointer ${activeSection === item.href.replace('#', '')
                  ? 'text-accent bg-accent/10'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="block w-full text-center bg-gradient-to-r from-accent to-violet text-white px-5 py-3 rounded-xl font-medium cursor-pointer"
            >
              Let's Talk
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;