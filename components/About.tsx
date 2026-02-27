import React from 'react';
import { Code, Server, Terminal, Briefcase } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { FloatingCode } from './AnimatedBackgrounds';

const About: React.FC = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.1);
  const { ref: imageRef, isVisible: imageVisible } = useScrollReveal(0.2);
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal(0.2);

  const highlights = [
    { icon: Code, title: 'Frontend Mastery', desc: 'React, TypeScript, Next.js, and modern CSS frameworks.' },
    { icon: Server, title: 'Backend Engineering', desc: 'Node.js, Python, Firebase, REST & GraphQL APIs.' },
    { icon: Terminal, title: 'DevOps & CI/CD', desc: 'Docker, GitHub Actions, automated testing pipelines.' },
    { icon: Briefcase, title: 'Security Auditing', desc: 'OWASP Top 10, penetration testing, secure SDLC.' },
  ];

  return (
    <section id="about" className="py-24 scroll-mt-24 relative overflow-hidden">
      <FloatingCode />

      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet/5 rounded-full filter blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-accent font-mono text-sm tracking-widest uppercase">About Me</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Engineering <span className="gradient-text">Digital Excellence</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-violet mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div ref={imageRef} className={`transition-all duration-700 delay-200 ${imageVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-accent to-violet rounded-2xl opacity-20 blur-lg"></div>
              <div className="relative glass rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1000"
                  alt="Developer Workspace"
                  className="w-full h-auto object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className={`transition-all duration-700 delay-300 ${contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <h3 className="text-2xl font-bold text-white mb-4">Founder & Lead Engineer</h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              I'm the founder of Dubai Direct. With a relentless focus on quality and security, I specialize in crafting web applications that not only look great but are built to scale.
            </p>
            <p className="text-gray-400 mb-8 leading-relaxed">
              From modular component libraries to automated CI/CD pipelines, I handle the technical complexities so you can focus on your business.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="glass rounded-xl p-4 hover-glow transition-all duration-300 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-gradient-to-br from-accent/20 to-violet/20 p-2.5 rounded-lg group-hover:from-accent/30 group-hover:to-violet/30 transition-colors">
                      <item.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-1">{item.title}</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;