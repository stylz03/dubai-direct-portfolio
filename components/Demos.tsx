import React, { useState } from 'react';
import { DemoType } from '../types';
import Analytics from './demos/Analytics';
import Auth from './demos/Auth';
import TaskManager from './demos/TaskManager';
import QuoteCalculator from './demos/QuoteCalculator';
import Configurator from './demos/Configurator';
import { BarChart3, Lock, ListTodo, Calculator, Palette } from 'lucide-react';

const Demos: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<DemoType>(DemoType.CALCULATOR);

  const getButtonClass = (type: DemoType) => {
    const isActive = activeDemo === type;
    return `flex items-center px-5 py-3 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
      isActive
        ? 'bg-primary text-white shadow-lg scale-105 ring-2 ring-primary ring-offset-2'
        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
    }`;
  };

  return (
    <section id="demos" className="py-20 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-primary font-bold tracking-wide uppercase text-sm mb-2">Live Case Studies</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-dark mb-4">Interactive Demos</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Interact with these functional components to see the quality of code, real-time logic, and user experience I deliver.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10 overflow-x-auto pb-4 px-2">
          <button onClick={() => setActiveDemo(DemoType.CALCULATOR)} className={getButtonClass(DemoType.CALCULATOR)}>
            <Calculator className="w-4 h-4 mr-2" />
            Quote Calculator
          </button>
          <button onClick={() => setActiveDemo(DemoType.CONFIGURATOR)} className={getButtonClass(DemoType.CONFIGURATOR)}>
            <Palette className="w-4 h-4 mr-2" />
            Product Configurator
          </button>
          <button onClick={() => setActiveDemo(DemoType.ANALYTICS)} className={getButtonClass(DemoType.ANALYTICS)}>
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics Dashboard
          </button>
          <button onClick={() => setActiveDemo(DemoType.AUTH)} className={getButtonClass(DemoType.AUTH)}>
            <Lock className="w-4 h-4 mr-2" />
            Secure Auth
          </button>
          <button onClick={() => setActiveDemo(DemoType.TASKS)} className={getButtonClass(DemoType.TASKS)}>
            <ListTodo className="w-4 h-4 mr-2" />
            Task Manager
          </button>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-10 min-h-[500px] shadow-inner flex items-center justify-center">
          <div className="animate-slide-up w-full">
            {activeDemo === DemoType.CALCULATOR && <QuoteCalculator />}
            {activeDemo === DemoType.CONFIGURATOR && <Configurator />}
            {activeDemo === DemoType.ANALYTICS && <Analytics />}
            {activeDemo === DemoType.AUTH && <Auth />}
            {activeDemo === DemoType.TASKS && <TaskManager />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demos;