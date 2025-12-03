import React, { useState, useEffect } from 'react';
import { Calculator, Check, DollarSign, HelpCircle } from 'lucide-react';

const QuoteCalculator: React.FC = () => {
  const [pages, setPages] = useState(5);
  const [designLevel, setDesignLevel] = useState<'basic' | 'premium'>('basic');
  const [addons, setAddons] = useState({
    seo: false,
    cms: true,
    copywriting: false
  });
  const [total, setTotal] = useState(0);

  // Calculate total whenever inputs change
  useEffect(() => {
    let basePrice = 500; // Setup fee
    
    // Page cost
    basePrice += pages * (designLevel === 'basic' ? 100 : 250);

    // Add-ons
    if (addons.seo) basePrice += 300;
    if (addons.cms) basePrice += 500;
    if (addons.copywriting) basePrice += pages * 50;

    setTotal(basePrice);
  }, [pages, designLevel, addons]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Controls Section */}
        <div className="space-y-8">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-dark uppercase tracking-wide">Project Scale</label>
              <span className="text-primary font-bold">{pages} Pages</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="20" 
              value={pages} 
              onChange={(e) => setPages(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-secondary"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-dark uppercase tracking-wide block mb-3">Design Complexity</label>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setDesignLevel('basic')}
                className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                  designLevel === 'basic' 
                    ? 'border-secondary bg-orange-50 text-secondary ring-1 ring-secondary' 
                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                Standard UI
              </button>
              <button 
                onClick={() => setDesignLevel('premium')}
                className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                  designLevel === 'premium' 
                    ? 'border-secondary bg-orange-50 text-secondary ring-1 ring-secondary' 
                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                Custom Brand
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-dark uppercase tracking-wide block mb-3">Power-Ups</label>
            <div className="space-y-3">
              {[
                { id: 'seo', label: 'SEO Optimization', price: '+$300' },
                { id: 'cms', label: 'Admin Dashboard (CMS)', price: '+$500' },
                { id: 'copywriting', label: 'Professional Copywriting', price: '+$50/pg' },
              ].map((addon) => (
                <div 
                  key={addon.id}
                  onClick={() => setAddons({ ...addons, [addon.id]: !addons[addon.id as keyof typeof addons] })}
                  className={`flex justify-between items-center p-3 rounded-lg border cursor-pointer transition-all ${
                    addons[addon.id as keyof typeof addons] 
                      ? 'border-primary bg-blue-50/50' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                      addons[addon.id as keyof typeof addons] ? 'bg-primary border-primary' : 'border-gray-300 bg-white'
                    }`}>
                      {addons[addon.id as keyof typeof addons] && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-sm font-medium text-dark">{addon.label}</span>
                  </div>
                  <span className="text-xs text-gray-500 font-medium">{addon.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Result Section */}
        <div className="bg-primary text-white p-8 rounded-2xl flex flex-col justify-between shadow-xl relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
          
          <div>
            <div className="flex items-center gap-2 text-accent mb-6">
              <Calculator className="w-5 h-5" />
              <span className="text-sm uppercase tracking-wider font-semibold">Estimated Quote</span>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm text-gray-300 border-b border-white/10 pb-2">
                <span>Core Development ({pages} pgs)</span>
                <span>${pages * (designLevel === 'basic' ? 100 : 250)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-300 border-b border-white/10 pb-2">
                <span>System Setup</span>
                <span>$500</span>
              </div>
              {Object.entries(addons).map(([key, value]) => {
                 if(!value) return null;
                 let price = 0;
                 if(key === 'seo') price = 300;
                 if(key === 'cms') price = 500;
                 if(key === 'copywriting') price = pages * 50;
                 return (
                   <div key={key} className="flex justify-between text-sm text-gray-300 border-b border-white/10 pb-2">
                     <span className="capitalize">{key}</span>
                     <span>${price}</span>
                   </div>
                 )
              })}
            </div>
          </div>

          <div>
            <div className="flex items-start gap-1 mb-2">
              <span className="text-2xl mt-2 text-secondary">$</span>
              <span className="text-6xl font-bold tracking-tight">{total.toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-400 mb-6">Estimated Timeline: {Math.ceil(pages * 0.5) + (addons.cms ? 5 : 0)} Days</p>
            
            <button className="w-full py-4 bg-secondary hover:bg-orange-500 text-white font-bold rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all transform hover:-translate-y-1">
              Book Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteCalculator;