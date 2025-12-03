import React, { useEffect, useState } from 'react';
import { AreaChart, Area, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, Server, Shield, Globe, Database } from 'lucide-react';

// Initial Mock Data
const initialChartData = [
  { value: 30 }, { value: 45 }, { value: 35 }, { value: 60 }, { value: 45 }, 
  { value: 75 }, { value: 50 }, { value: 80 }, { value: 65 }, { value: 90 },
  { value: 70 }, { value: 85 }, { value: 60 }, { value: 75 }, { value: 50 }
];

const pieData = [
  { name: 'Mobile', value: 400 },
  { name: 'Desktop', value: 300 },
  { name: 'Tablet', value: 300 },
];
const COLORS = ['#F39C12', '#FFFFFF', '#BDC3C7'];

const logs = [
  "GET /api/v1/users 200 OK",
  "POST /auth/login 200 OK",
  "[System] Database backup complete",
  "WARN: High memory usage detected",
  "New connection: 192.168.1.42",
  "Payment gateway webhook received",
  "Deploying build #4092...",
  "[Security] WAF blocked suspicious request"
];

const HeroBackground: React.FC = () => {
  const [logIndex, setLogIndex] = useState(0);
  const [randomMetric, setRandomMetric] = useState(98.4);
  const [chartData, setChartData] = useState(initialChartData);

  // Live updates
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Rotate logs
      setLogIndex((prev) => (prev + 1) % logs.length);
      
      // 2. Jiggle server load slightly
      setRandomMetric((prev) => {
        const change = Math.random() * 4 - 2;
        return Math.min(100, Math.max(0, +(prev + change).toFixed(1)));
      });

      // 3. Update chart data (shift left, add new random point)
      setChartData(prevData => {
        const newData = [...prevData.slice(1), { value: Math.floor(Math.random() * 60) + 30 }];
        return newData;
      });

    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none bg-primary">
      {/* Container for the dashboard grid - tilted for 3D effect */}
      <div 
        className="w-full h-full opacity-40 absolute scale-110"
        style={{ transform: 'perspective(1000px) rotateX(10deg) translateY(-50px)' }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-3 gap-4 p-8 h-full">
          
          {/* Widget 1: Traffic Graph */}
          <div className="col-span-2 row-span-2 border border-white/20 rounded-xl bg-white/5 p-4 backdrop-blur-sm transition-all duration-500 hover:bg-white/10">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-secondary" />
                <span className="text-xs text-white font-mono uppercase">Live Traffic</span>
              </div>
              <span className="text-xs text-secondary animate-pulse">● LIVE</span>
            </div>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <Area 
                    isAnimationActive={true}
                    type="monotone" 
                    dataKey="value" 
                    stroke="#F39C12" 
                    fill="#F39C12" 
                    fillOpacity={0.2} 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Widget 2: Server Status */}
          <div className="col-span-1 border border-white/20 rounded-xl bg-white/5 p-4 flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-2">
              <Server className="w-4 h-4 text-white" />
              <span className="text-xs text-white font-mono uppercase">Server Load</span>
            </div>
            <div className="text-2xl font-bold text-white font-mono">{randomMetric}%</div>
            <div className="w-full bg-white/10 rounded-full h-1.5 mt-2">
              <div className="bg-green-400 h-1.5 rounded-full transition-all duration-1000" style={{ width: `${randomMetric}%` }}></div>
            </div>
          </div>

          {/* Widget 3: Security */}
          <div className="col-span-1 border border-white/20 rounded-xl bg-white/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-white" />
              <span className="text-xs text-white font-mono uppercase">Security</span>
            </div>
            <div className="space-y-2 mt-2">
              <div className="flex justify-between text-[10px] text-gray-300 font-mono">
                <span>Firewall</span>
                <span className="text-green-400">Active</span>
              </div>
              <div className="flex justify-between text-[10px] text-gray-300 font-mono">
                <span>Encryption</span>
                <span className="text-green-400">TLS 1.3</span>
              </div>
              <div className="flex justify-between text-[10px] text-gray-300 font-mono">
                <span>Threats</span>
                <span className="text-white">0 Detected</span>
              </div>
            </div>
          </div>

          {/* Widget 4: Terminal / Logs */}
          <div className="col-span-2 border border-white/20 rounded-xl bg-black/20 p-4 font-mono text-[10px] text-green-400/80 overflow-hidden flex flex-col justify-end">
             <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-1">
              <Database className="w-3 h-3" />
              <span className="text-xs text-white uppercase">System Log</span>
            </div>
            {logs.slice(logIndex, logIndex + 3).map((log, i) => (
              <div key={i} className="truncate py-1 border-l-2 border-transparent hover:border-green-500 pl-2 transition-all">
                <span className="text-gray-500 mr-2">
                  {new Date().toLocaleTimeString()}
                </span>
                {log}
              </div>
            ))}
            <div className="animate-pulse">_</div>
          </div>

           {/* Widget 5: Pie Chart */}
           <div className="col-span-1 row-span-1 border border-white/20 rounded-xl bg-white/5 p-4 flex flex-col items-center justify-center">
             <div className="w-full h-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius={25}
                      outerRadius={40}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                   <Globe className="w-4 h-4 text-white/50" />
                </div>
             </div>
           </div>
           
           {/* Widget 6: Placeholder Stat */}
           <div className="col-span-1 border border-white/20 rounded-xl bg-white/5 p-4 flex flex-col justify-center items-center">
             <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Uptime</div>
             <div className="text-xl font-bold text-white">99.99%</div>
           </div>

        </div>
      </div>
      
      {/* Gradient Overlay to fade the busy background out at the bottom and ensure text readability */}
      {/* Changed to be lighter on the right to reveal the dashboard */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/70 to-primary/10"></div>
      
      {/* Bottom fade for smooth transition to next section */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent"></div>
    </div>
  );
};

export default HeroBackground;