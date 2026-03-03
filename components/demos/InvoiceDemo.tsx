import React, { useState } from 'react';
import { FileText, Plus, Calculator, FileOutput, Loader2 } from 'lucide-react';

const InvoiceDemo: React.FC = () => {
    const [items, setItems] = useState([{ desc: 'Web Development', price: '1500' }]);
    const [isGenerating, setIsGenerating] = useState(false);

    const total = items.reduce((acc, item) => acc + (Number(item.price) || 0), 0);

    const handleAddItem = () => {
        if (items.length < 4) { // Limit for demo
            setItems([...items, { desc: 'SEO Setup', price: '300' }]);
        }
    };

    const handleUpdateItem = (index: number, field: 'desc' | 'price', value: string) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => setIsGenerating(false), 2000);
    };

    return (
        <div className="bg-white text-gray-800 rounded-xl p-6 shadow-2xl relative overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-start border-b border-gray-200 pb-4 mb-6">
                <div>
                    <h3 className="text-2xl font-bold flex items-center gap-2 text-indigo-900">
                        <FileText className="text-indigo-600" /> INV-2026-042
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Billed to: Acme Corp</p>
                </div>
                <div className="text-right">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Amount Due</p>
                    <p className="text-3xl font-bold text-indigo-600">${total.toLocaleString()}</p>
                </div>
            </div>

            {/* Line Items */}
            <div className="mb-6 h-[180px] overflow-y-auto pr-2 custom-scrollbar">
                <div className="grid grid-cols-12 gap-2 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider px-2">
                    <div className="col-span-8">Description</div>
                    <div className="col-span-4 text-right">Amount ($)</div>
                </div>

                {items.map((item, i) => (
                    <div key={i} className="grid grid-cols-12 gap-2 mb-2 group">
                        <div className="col-span-8">
                            <input
                                type="text"
                                value={item.desc}
                                onChange={(e) => handleUpdateItem(i, 'desc', e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded px-2 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all group-hover:bg-white"
                            />
                        </div>
                        <div className="col-span-4 relative">
                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                            <input
                                type="number"
                                value={item.price}
                                onChange={(e) => handleUpdateItem(i, 'price', e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded pl-5 pr-2 py-1.5 text-sm font-mono text-right focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all group-hover:bg-white"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <button
                    onClick={handleAddItem}
                    disabled={items.length >= 4}
                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 disabled:opacity-50 transition-colors"
                >
                    <Plus className="h-4 w-4" /> Add Line Item
                </button>

                <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all active:scale-95 disabled:opacity-80 disabled:cursor-wait"
                >
                    {isGenerating ? (
                        <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</>
                    ) : (
                        <><FileOutput className="h-4 w-4" /> Generate PDF</>
                    )}
                </button>
            </div>

            {/* Decorative background element showing it's a demo */}
            <Calculator className="absolute -bottom-10 -right-10 h-40 w-40 text-gray-50 opacity-50 transform -rotate-12 pointer-events-none" />
        </div>
    );
};

export default InvoiceDemo;
