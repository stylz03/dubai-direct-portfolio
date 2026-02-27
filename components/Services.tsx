import React from 'react';
import { LayoutDashboard, GitMerge, ShieldAlert, Smartphone, Database, Cloud } from 'lucide-react';
import { ServiceItem } from '../types';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { PulsingGrid } from './AnimatedBackgrounds';

const services: (ServiceItem & { gradient: string })[] = [
  {
    title: 'Web App Development',
    description: 'Custom-built MVPs, dashboards, and client portals using React, Next.js, and TypeScript with pixel-perfect UI.',
    icon: LayoutDashboard,
    gradient: 'from-accent/20 to-blue-500/20',
  },
  {
    title: 'Mobile Development',
    description: 'Cross-platform mobile apps with React Native and Flutter, delivering native performance with shared codebases.',
    icon: Smartphone,
    gradient: 'from-violet/20 to-pink-500/20',
  },
  {
    title: 'Backend & APIs',
    description: 'Scalable backend systems with Node.js, Python, Firebase, and PostgreSQL. REST and GraphQL API design.',
    icon: Database,
    gradient: 'from-neon/20 to-emerald-500/20',
  },
  {
    title: 'CI/CD & DevOps',
    description: 'Automated pipelines with GitHub Actions, Docker, and cloud deployment for reliable, zero-downtime releases.',
    icon: GitMerge,
    gradient: 'from-orange-500/20 to-amber-500/20',
  },
  {
    title: 'Cloud Infrastructure',
    description: 'Architecture and deployment on AWS, GCP, and Firebase. Serverless functions, CDN setup, and auto-scaling.',
    icon: Cloud,
    gradient: 'from-sky-500/20 to-cyan-500/20',
  },
  {
    title: 'Security & Pentesting',
    description: 'OWASP Top 10 vulnerability assessments, penetration testing, and secure SDLC consulting.',
    icon: ShieldAlert,
    gradient: 'from-red-500/20 to-rose-500/20',
  },
];

const Services: React.FC = () => {
  const { ref: titleRef, isVisible } = useScrollReveal(0.1);

  return (
    <section id="services" className="py-24 scroll-mt-24 relative overflow-hidden">
      <PulsingGrid />
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full filter blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-accent font-mono text-sm tracking-widest uppercase">What I Do</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Professional <span className="gradient-text">Services</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            End-to-end solutions from concept to deployment, built with modern technologies and best practices.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard: React.FC<{ service: (ServiceItem & { gradient: string }); index: number }> = ({ service, index }) => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <div
      ref={ref}
      className={`glass rounded-2xl p-6 hover-glow transition-all duration-500 group cursor-default ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={`w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
        <service.icon className="h-7 w-7 text-white" />
      </div>
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">{service.title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
    </div>
  );
};

export default Services;