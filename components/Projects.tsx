import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { ProjectItem } from '../types';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { RadarSweep } from './AnimatedBackgrounds';

const projects: ProjectItem[] = [
    {
        title: 'E-Commerce Dashboard',
        description: 'A full-featured admin dashboard with real-time analytics, inventory management, and order tracking built with React and Firebase.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
        tags: ['React', 'Firebase', 'Tailwind', 'Charts'],
        liveUrl: '#',
        githubUrl: '#',
    },
    {
        title: 'Invoicing Platform',
        description: 'Multi-company invoicing system with PDF generation, payment tracking, and customizable document templates.',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800',
        tags: ['Next.js', 'Firestore', 'PDF', 'Stripe'],
        liveUrl: '#',
        githubUrl: '#',
    },
    {
        title: 'Real-Time Chat App',
        description: 'End-to-end encrypted messaging with WebSocket support, file sharing, and presence indicators.',
        image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&q=80&w=800',
        tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
        liveUrl: '#',
        githubUrl: '#',
    },
    {
        title: 'VPN Management App',
        description: 'Android TV application for DNS-based VPN management with animated UI controls and real-time connection status.',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
        tags: ['Kotlin', 'Android', 'DNS', 'Lottie'],
        liveUrl: '#',
        githubUrl: '#',
    },
    {
        title: 'Fleet Booking Platform',
        description: 'Vehicle rental platform with calendar availability, team management, and mobile-optimized booking flows.',
        image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&q=80&w=800',
        tags: ['React Native', 'Firebase', 'Maps', 'Payments'],
        liveUrl: '#',
        githubUrl: '#',
    },
    {
        title: 'Security Audit Tool',
        description: 'Automated penetration testing framework with vulnerability reporting, OWASP compliance checks, and remediation guides.',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
        tags: ['Python', 'Node.js', 'Docker', 'CI/CD'],
        liveUrl: '#',
        githubUrl: '#',
    },
];

const Projects: React.FC = () => {
    const { ref: titleRef, isVisible } = useScrollReveal(0.1);

    return (
        <section id="projects" className="py-24 scroll-mt-24 relative overflow-hidden">
            <RadarSweep />
            {/* Background accents */}
            <div className="absolute top-1/3 right-0 w-72 h-72 bg-accent/5 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-violet/5 rounded-full filter blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div ref={titleRef} className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="text-accent font-mono text-sm tracking-widest uppercase">Portfolio</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
                        Featured <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Showcasing real-world applications built with modern tech stacks and best practices.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const ProjectCard: React.FC<{ project: ProjectItem; index: number }> = ({ project, index }) => {
    const { ref, isVisible } = useScrollReveal(0.1);

    return (
        <div
            ref={ref}
            className={`glass rounded-2xl overflow-hidden group transition-all duration-500 hover-glow ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            {/* Image */}
            <div className="relative overflow-hidden h-48">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent"></div>

                {/* Hover overlay with links */}
                <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {project.liveUrl && (
                        <a href={project.liveUrl} className="bg-accent p-3 rounded-full hover:scale-110 transition-transform" aria-label="Live Demo">
                            <ExternalLink className="h-5 w-5 text-white" />
                        </a>
                    )}
                    {project.githubUrl && (
                        <a href={project.githubUrl} className="bg-white/10 p-3 rounded-full hover:scale-110 transition-transform border border-white/20" aria-label="GitHub">
                            <Github className="h-5 w-5 text-white" />
                        </a>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 text-xs font-mono rounded-full bg-accent/10 text-accent border border-accent/20">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;
