import React, { useState } from 'react';
import { User, Briefcase, RefreshCw, Smartphone, Palette } from 'lucide-react';

const Configurator: React.FC = () => {
  const [details, setDetails] = useState({
    name: 'Sarah Connor',
    role: 'Cybersecurity Analyst',
    email: 'sarah@skynet.com',
    theme: 'blue'
  });
  
  const [isFlipped, setIsFlipped] = useState(false);

  const colors = {
    blue: { bg: 'bg-primary', accent: 'bg-secondary' },
    dark: { bg: 'bg-slate-800', accent: 'bg-emerald-500' },
    purple: { bg: 'bg-indigo-900', accent: 'bg-pink-500' },
  };

  const currentTheme = colors[details.theme as keyof typeof colors];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        
        {/* Editor Side */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-6 text-dark border-b pb-4">
            <Palette className="w-5 h-5 text-secondary" />
            <h3 className="font-bold">Card Configurator</h3>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Select Theme</label>
              <div className="flex gap-3">
                {Object.keys(colors).map((color) => (
                  <button
                    key={color}
                    onClick={() => setDetails({ ...details, theme: color })}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      details.theme === color ? 'border-dark scale-110 shadow-md' : 'border-transparent'
                    } ${
                      color === 'blue' ? 'bg-primary' : color === 'dark' ? 'bg-slate-800' : 'bg-indigo-900'
                    }`}
                    aria-label={`Select ${color} theme`}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute top-3 left-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={details.name}
                  onChange={(e) => setDetails({ ...details, name: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  maxLength={20}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Job Title</label>
              <div className="relative">
                <Briefcase className="absolute top-3 left-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={details.role}
                  onChange={(e) => setDetails({ ...details, role: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  maxLength={30}
                />
              </div>
            </div>
            
            <div className="pt-4 text-xs text-gray-400">
              *Try clicking the card preview to flip it!
            </div>
          </div>
        </div>

        {/* Preview Side */}
        <div className="perspective-1000 flex justify-center">
          <div 
            className={`relative w-80 h-48 cursor-pointer transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* Front of Card */}
            <div className={`absolute inset-0 rounded-2xl shadow-2xl p-6 flex flex-col justify-between backface-hidden ${currentTheme.bg}`}>
               {/* Decorative Circles */}
               <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white opacity-10 rounded-full blur-xl"></div>
               <div className={`absolute bottom-0 left-0 -ml-4 -mb-4 w-24 h-24 ${currentTheme.accent} opacity-20 rounded-full blur-xl`}></div>

               <div className="relative z-10 flex justify-between items-start">
                  <div className={`w-10 h-10 rounded-lg ${currentTheme.accent} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                    {details.name.charAt(0)}
                  </div>
                  <Smartphone className="text-white/30 w-6 h-6" />
               </div>

               <div className="relative z-10 text-white">
                 <h2 className="text-xl font-bold tracking-tight">{details.name || 'Your Name'}</h2>
                 <p className={`text-sm opacity-80 font-light`}>{details.role || 'Your Role'}</p>
               </div>
            </div>

            {/* Back of Card */}
            <div className={`absolute inset-0 rounded-2xl shadow-2xl bg-white p-6 flex flex-col items-center justify-center backface-hidden rotate-y-180 border border-gray-200`}>
              <div className="w-24 h-24 bg-dark rounded-lg flex items-center justify-center mb-3">
                 {/* Fake QR Code */}
                 <div className="grid grid-cols-5 gap-1 p-1">
                    {[...Array(25)].map((_, i) => (
                      <div key={i} className={`w-1.5 h-1.5 ${Math.random() > 0.5 ? 'bg-white' : 'bg-transparent'}`}></div>
                    ))}
                 </div>
              </div>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Scan to Connect</p>
              <div className="mt-4 flex gap-2">
                 <button className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600">Save Contact</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .backface-hidden { backface-visibility: hidden; }
      `}</style>
    </div>
  );
};

export default Configurator;