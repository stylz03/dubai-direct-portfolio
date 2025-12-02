import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Mon', Visits: 4000, Sales: 2400 },
  { name: 'Tue', Visits: 3000, Sales: 1398 },
  { name: 'Wed', Visits: 2000, Sales: 9800 },
  { name: 'Thu', Visits: 2780, Sales: 3908 },
  { name: 'Fri', Visits: 1890, Sales: 4800 },
  { name: 'Sat', Visits: 2390, Sales: 3800 },
  { name: 'Sun', Visits: 3490, Sales: 4300 },
];

const Analytics: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Metric Cards */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h4 className="text-sm font-medium text-gray-500 uppercase">Total Revenue</h4>
          <p className="text-3xl font-bold text-primary mt-2">$24,500</p>
          <span className="text-green-500 text-sm font-medium">↑ 12% from last week</span>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h4 className="text-sm font-medium text-gray-500 uppercase">Active Users</h4>
          <p className="text-3xl font-bold text-primary mt-2">1,240</p>
          <span className="text-green-500 text-sm font-medium">↑ 5% from yesterday</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-80">
          <h3 className="text-lg font-semibold text-dark mb-4">Weekly Sales</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
              <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              <Bar dataKey="Sales" fill="#F39C12" radius={[4, 4, 0, 0]} barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-80">
          <h3 className="text-lg font-semibold text-dark mb-4">Traffic Trends</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
              <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              <Line type="monotone" dataKey="Visits" stroke="#0A3D62" strokeWidth={3} dot={{fill: '#0A3D62', strokeWidth: 2}} activeDot={{r: 6}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;