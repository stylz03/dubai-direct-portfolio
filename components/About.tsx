import React from 'react';
import { User, Server, Code, Terminal } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold tracking-wide uppercase text-sm mb-2">About Dubai Direct</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-dark mb-4">Engineering Digital Excellence</h3>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
             <div className="absolute inset-0 bg-secondary rounded-2xl transform translate-x-3 translate-y-3"></div>
             <div className="relative bg-gray-100 rounded-2xl p-1 overflow-hidden">
               <img 
                 src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1000" 
                 alt="Developer Workspace Coding" 
                 className="rounded-xl w-full h-auto object-cover"
               />
             </div>
          </div>

          <div>
            <h4 className="text-2xl font-bold text-primary mb-6">Founder & Lead Engineer</h4>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Hello! I'm the founder of Dubai Direct. With a relentless focus on quality and security, I specialize in crafting web applications that not only look great but are built to scale. My background bridges the gap between creative frontend development and rigorous cybersecurity practices.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              I don't just write code; I build systems. From modular component libraries that ensure consistent branding to automated CI/CD pipelines that make deployment a breeze, I handle the technical complexities so you can focus on your business.
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 p-2 rounded-lg">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="ml-4">
                  <h5 className="text-lg font-semibold text-dark">Modular Workflows</h5>
                  <p className="text-gray-500 text-sm">Reusable components and clean architecture for long-term maintainability.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 p-2 rounded-lg">
                  <Server className="h-6 w-6 text-primary" />
                </div>
                <div className="ml-4">
                  <h5 className="text-lg font-semibold text-dark">CI/CD Pipelines</h5>
                  <p className="text-gray-500 text-sm">Automated testing and deployment ensuring reliability and speed.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 p-2 rounded-lg">
                  <Terminal className="h-6 w-6 text-primary" />
                </div>
                <div className="ml-4">
                  <h5 className="text-lg font-semibold text-dark">Penetration Testing</h5>
                  <p className="text-gray-500 text-sm">Proactive security audits to identify and fix vulnerabilities before launch.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;