import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface ProjectItem {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface SkillCategory {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  skills: { name: string; level: number }[];
}