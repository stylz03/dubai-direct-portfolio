import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, DollarSign, Activity, CheckCircle2 } from 'lucide-react';

const EcommerceDemo: React.FC = () => {
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setAnimated(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const metrics = [
        { label: 'Total Revenue', value: '$84,500', icon: DollarSign, trend: '+12.5%' },
        { label: 'Active Users', value: '12,400', icon: Users, trend: '+5.2%' },
        { label: 'Conversion', value: '3.8%', icon: Activity, trend: '+1.1%' },
    ];

    return (
        <div className="bg-surface/50 border border-white/10 rounded-xl p-6 shadow-2xl overflow-hidden relative">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
                <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <TrendingUp className="text-accent h-5 w-5" /> Analytics Dashboard
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">Real-time store performance</p>
                </div>
                <div className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full flex items-center gap-1 border border-green-500/30">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div> Live
                </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                {metrics.map((metric, i) => (
                    <div
                        key={i}
                        className={`bg-white/5 p-4 rounded-lg border border-white/5 transition-all duration-500 transform ${animated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                        style={{ transitionDelay: `${i * 100}ms` }}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <metric.icon className="h-4 w-4 text-gray-400" />
                            <span className="text-xs text-accent font-medium">{metric.trend}</span>
                        </div>
                        <p className="text-2xl font-bold text-white mb-1">{metric.value}</p>
                        <p className="text-xs text-gray-400">{metric.label}</p>
                    </div>
                ))}
            </div>

            {/* Pseudo Chart */}
            <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-300 mb-4">Traffic Overview (7 days)</h4>
                <div className="flex items-end justify-between h-32 gap-2">
                    {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
                        <div key={i} className="w-full bg-white/5 rounded-t-sm relative group cursor-pointer hover:bg-white/10 transition-colors">
                            <div
                                className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-violet to-accent rounded-t-sm transition-all duration-1000 ease-out"
                                style={{ height: animated ? `${height}%` : '0%' }}
                            ></div>
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 pointer-events-none">
                                {height}0
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Interactive Elements to show it's "alive" */}
            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                <span className="text-xs text-gray-400">System Status: Optimal</span>
                <button className="text-xs bg-accent/20 text-accent hover:bg-accent hover:text-white px-3 py-1.5 rounded transition-colors flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Sync Data
                </button>
            </div>
        </div>
    );
};

export default EcommerceDemo;
