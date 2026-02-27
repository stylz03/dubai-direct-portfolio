import React from 'react';
import { Github, Linkedin, Twitter, Code2, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.getElementById(href.replace('#', ''));
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/5">
      {/* Gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo */}
          <div className="text-center md:text-left">
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="inline-flex items-center gap-2 group">
              <div className="bg-gradient-to-br from-accent to-violet p-2 rounded-lg">
                <Code2 className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg text-white">
                Dubai <span className="gradient-text">Direct</span>
              </span>
            </a>
            <p className="text-gray-500 text-sm mt-2">Building the secure web of tomorrow.</p>
          </div>

          {/* Nav links */}
          <div className="flex justify-center gap-6">
            {['About', 'Services', 'Projects', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, `#${item.toLowerCase()}`)}
                className="text-gray-500 text-sm hover:text-accent transition-colors cursor-pointer"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Social links */}
          <div className="flex justify-center md:justify-end gap-4">
            {socialLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-500 hover:text-accent hover:border-accent/20 transition-all duration-300"
                aria-label={link.label}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-white/5 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
            © {new Date().getFullYear()} Dubai Direct. Made with
            <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" />
            in South Africa.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;