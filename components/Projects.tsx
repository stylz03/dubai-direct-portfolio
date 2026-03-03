import React, { useState } from 'react';
import { ExternalLink, Github, Play, X } from 'lucide-react';
import { ProjectItem } from '../types';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { RadarSweep } from './AnimatedBackgrounds';
import EcommerceDemo from './demos/EcommerceDemo';
import InvoiceDemo from './demos/InvoiceDemo';
import ChatDemo from './demos/ChatDemo';
import VPNDemo from './demos/VPNDemo';
import FleetDemo from './demos/FleetDemo';
import SecurityDemo from './demos/SecurityDemo';

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
    const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

    const renderDemo = () => {
        if (!selectedProject) return null;
        switch (selectedProject.title) {
            case 'E-Commerce Dashboard': return <EcommerceDemo />;
            case 'Invoicing Platform': return <InvoiceDemo />;
            case 'Real-Time Chat App': return <ChatDemo />;
            case 'VPN Management App': return <VPNDemo />;
            case 'Fleet Booking Platform': return <FleetDemo />;
            case 'Security Audit Tool': return <SecurityDemo />;
            default: return <div className="text-white p-8">Demo not available.</div>;
        }
    };

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
                        Showcasing real-world applications built with modern tech stacks and best practices. Click on any project to interact with a live demo.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} onSelect={() => setSelectedProject(project)} />
                    ))}
                </div>
            </div>

            {/* Modal Overlay */}
            {selectedProject && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                        onClick={() => setSelectedProject(null)}
                    ></div>

                    {/* Modal Content */}
                    <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col glass rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border border-white/20">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-4 border-b border-white/10 bg-white/5 relative z-10">
                            <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                                {selectedProject.title} <span className="hidden sm:inline text-sm font-normal text-gray-400 ml-2">Interactive Demo</span>
                            </h3>
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Modal Body / Demo Container */}
                        <div className="flex-1 overflow-auto p-4 sm:p-6 md:p-8 bg-black/40 custom-scrollbar flex items-center justify-center min-h-[400px]">
                            <div className="w-full max-w-3xl">
                                {renderDemo()}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

const ProjectCard: React.FC<{ project: ProjectItem; index: number; onSelect: () => void }> = ({ project, index, onSelect }) => {
    const { ref, isVisible } = useScrollReveal(0.1);

    return (
        <div
            ref={ref}
            onClick={onSelect}
            className={`glass rounded-2xl overflow-hidden group transition-all duration-500 hover-glow cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
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
                <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                        className="bg-accent text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 hover:scale-105 transition-transform"
                    >
                        <Play className="h-4 w-4" /> Try Demo
                    </button>

                    <div className="flex gap-4 mt-2">
                        {project.liveUrl && (
                            <a href={project.liveUrl} onClick={(e) => e.stopPropagation()} className="bg-white/10 p-2 rounded-full hover:scale-110 transition-transform border border-white/20" aria-label="Live Demo">
                                <ExternalLink className="h-4 w-4 text-white" />
                            </a>
                        )}
                        {project.githubUrl && (
                            <a href={project.githubUrl} onClick={(e) => e.stopPropagation()} className="bg-white/10 p-2 rounded-full hover:scale-110 transition-transform border border-white/20" aria-label="GitHub">
                                <Github className="h-4 w-4 text-white" />
                            </a>
                        )}
                    </div>
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
