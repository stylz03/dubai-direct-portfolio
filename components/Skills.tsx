import React from 'react';
import { Monitor, Server, Database, Shield } from 'lucide-react';
import { SkillCategory } from '../types';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { OrbitRings } from './AnimatedBackgrounds';

const skillCategories: SkillCategory[] = [
    {
        name: 'Frontend',
        icon: Monitor,
        skills: [
            { name: 'React / Next.js', level: 95 },
            { name: 'TypeScript', level: 90 },
            { name: 'Tailwind CSS', level: 92 },
            { name: 'React Native', level: 80 },
        ],
    },
    {
        name: 'Backend',
        icon: Server,
        skills: [
            { name: 'Node.js / Express', level: 90 },
            { name: 'Python / Django', level: 78 },
            { name: 'REST & GraphQL', level: 88 },
            { name: 'Firebase', level: 92 },
        ],
    },
    {
        name: 'Database & DevOps',
        icon: Database,
        skills: [
            { name: 'PostgreSQL / MongoDB', level: 85 },
            { name: 'Docker & CI/CD', level: 82 },
            { name: 'AWS / GCP', level: 75 },
            { name: 'Git & GitHub Actions', level: 90 },
        ],
    },
    {
        name: 'Security',
        icon: Shield,
        skills: [
            { name: 'Penetration Testing', level: 85 },
            { name: 'OWASP Top 10', level: 90 },
            { name: 'Secure SDLC', level: 80 },
            { name: 'Network Security', level: 75 },
        ],
    },
];

const Skills: React.FC = () => {
    const { ref: titleRef, isVisible } = useScrollReveal(0.1);

    return (
        <section id="skills" className="py-24 scroll-mt-24 relative overflow-hidden">
            <OrbitRings />
            <div className="absolute top-0 left-1/3 w-80 h-80 bg-violet/5 rounded-full filter blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div ref={titleRef} className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="text-accent font-mono text-sm tracking-widest uppercase">Expertise</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
                        Technical <span className="gradient-text">Skills</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        A comprehensive toolkit spanning the full development stack and beyond.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {skillCategories.map((category, index) => (
                        <SkillCategoryCard key={index} category={category} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const SkillCategoryCard: React.FC<{ category: SkillCategory; index: number }> = ({ category, index }) => {
    const { ref, isVisible } = useScrollReveal(0.15);

    return (
        <div
            ref={ref}
            className={`glass rounded-2xl p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            style={{ transitionDelay: `${index * 150}ms` }}
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-accent/20 to-violet/20 p-2.5 rounded-lg">
                    <category.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-white">{category.name}</h3>
            </div>

            <div className="space-y-4">
                {category.skills.map((skill, i) => (
                    <div key={i}>
                        <div className="flex justify-between mb-1.5">
                            <span className="text-sm text-gray-300 font-medium">{skill.name}</span>
                            <span className="text-xs text-accent font-mono">{skill.level}%</span>
                        </div>
                        <div className="w-full h-2 bg-surface-light rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-accent to-violet skill-fill"
                                style={{ width: isVisible ? `${skill.level}%` : '0%' }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Skills;
