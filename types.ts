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

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export enum DemoType {
  ANALYTICS = 'analytics',
  AUTH = 'auth',
  TASKS = 'tasks',
  CALCULATOR = 'calculator',
  CONFIGURATOR = 'configurator'
}