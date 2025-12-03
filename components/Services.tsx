import React from 'react';
import { LayoutDashboard, GitMerge, ShieldAlert } from 'lucide-react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    title: 'Web App Development',
    description: 'Custom-built MVPs, interactive dashboards, and client portals using React and TypeScript. Focus on responsiveness and user experience.',
    icon: LayoutDashboard,
  },
  {
    title: 'CI/CD & Infrastructure',
    description: 'Setup of robust automation pipelines (GitHub Actions, GitLab CI) ensuring code quality, testing, and seamless deployment to cloud providers.',
    icon: GitMerge,
  },
  {
    title: 'Cybersecurity & Pentesting',
    description: 'Secure SDLC consulting and penetration testing. I analyze your applications for OWASP Top 10 vulnerabilities and ensure compliance.',
    icon: ShieldAlert,
  },
];

const Services: React.FC = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 bg-gray-50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold tracking-wide uppercase text-sm mb-2">My Expertise</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-dark mb-4">Professional Services</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive technical solutions tailored to modern business needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-secondary/20 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300 text-primary">
                <service.icon className="h-7 w-7" />
              </div>
              <h4 className="text-xl font-bold text-dark mb-3 group-hover:text-primary transition-colors">{service.title}</h4>
              <p className="text-gray-600 leading-relaxed mb-6">
                {service.description}
              </p>
              <a 
                href="#contact" 
                onClick={handleScroll}
                className="inline-flex items-center text-secondary font-semibold hover:text-orange-600 transition-colors cursor-pointer"
              >
                Learn More <span className="ml-2">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;