import React, { useState } from 'react';
import { Shield, ShieldAlert, Wifi, Globe, Server, Activity } from 'lucide-react';

const VPNDemo: React.FC = () => {
    const [status, setStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');

    const toggleConnection = () => {
        if (status === 'connected') {
            setStatus('disconnected');
        } else {
            setStatus('connecting');
            setTimeout(() => setStatus('connected'), 2500);
        }
    };

    return (
        <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden flex flex-col items-center max-w-sm mx-auto">
            {/* Background elements */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${status === 'connected' ? 'opacity-20' : 'opacity-0'}`}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500 rounded-full filter blur-[80px]"></div>
            </div>

            {/* Header */}
            <div className="w-full flex justify-between items-center mb-10 z-10">
                <h3 className="text-white font-bold flex items-center gap-2">
                    <Shield className={status === 'connected' ? 'text-emerald-400' : 'text-slate-400'} />
                    SecureVPN
                </h3>
                <div className={`text-xs px-2 py-1 rounded-md font-mono flex items-center gap-1.5 transition-colors ${status === 'connected' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        status === 'connecting' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                            'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                    {status === 'connected' && <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>}
                    {status === 'connecting' && <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></span>}
                    {status === 'disconnected' && <span className="w-1.5 h-1.5 bg-slate-500 rounded-full"></span>}
                    {status.toUpperCase()}
                </div>
            </div>

            {/* Main Toggle Button */}
            <div className="relative group mb-10 z-10">
                {/* Ripple rings when connected */}
                {status === 'connected' && (
                    <>
                        <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                        <div className="absolute inset-0 bg-emerald-500/10 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '1.5s' }}></div>
                    </>
                )}

                {/* Connecting spinning border */}
                {status === 'connecting' && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-400 rounded-full animate-spin opacity-50 blur-sm"></div>
                )}

                <button
                    onClick={toggleConnection}
                    disabled={status === 'connecting'}
                    className={`relative w-40 h-40 rounded-full flex flex-col items-center justify-center transition-all duration-500 shadow-xl border-4 ${status === 'connected'
                            ? 'bg-gradient-to-b from-emerald-500 to-emerald-700 border-emerald-400/50 shadow-emerald-500/30'
                            : status === 'connecting'
                                ? 'bg-slate-800 border-amber-500/50 text-amber-400'
                                : 'bg-gradient-to-b from-slate-700 to-slate-800 border-slate-600 hover:border-slate-500 shadow-black'
                        }`}
                >
                    <Activity className={`h-12 w-12 mb-2 transition-transform duration-700 ${status === 'connected' ? 'text-white scale-110' :
                            status === 'connecting' ? 'text-amber-400 animate-pulse' :
                                'text-slate-400'
                        }`} />
                    <span className={`font-bold transition-colors ${status === 'connected' ? 'text-white' :
                            status === 'connecting' ? 'text-amber-400' :
                                'text-slate-300'
                        }`}>
                        {status === 'connected' ? 'PROTECTED' : status === 'connecting' ? 'CONNECTING...' : 'TAP TO CONNECT'}
                    </span>
                </button>
            </div>

            {/* Connection Info */}
            <div className={`w-full bg-slate-800/80 backdrop-blur-md rounded-xl p-4 border transition-all duration-500 z-10 ${status === 'connected' ? 'border-emerald-500/30 shadow-lg shadow-emerald-500/10' : 'border-slate-700'
                }`}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                            <Globe className="h-3 w-3" /> Location
                        </span>
                        <span className={`text-sm font-semibold transition-colors ${status === 'connected' ? 'text-emerald-400' : 'text-slate-300'}`}>
                            {status === 'connected' ? 'Zurich, CH' : 'Unprotected'}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                            <Server className="h-3 w-3" /> IP Address
                        </span>
                        <span className={`text-sm font-mono font-semibold transition-colors ${status === 'connected' ? 'text-emerald-400' : 'text-slate-300'}`}>
                            {status === 'connected' ? '185.159.xxx.xx' : '10.10.x.x (Exposed)'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Security Warning if disconnected */}
            <div className={`mt-4 flex items-start gap-2 text-xs text-amber-400/80 transition-opacity duration-500 z-10 ${status === 'disconnected' ? 'opacity-100' : 'opacity-0'}`}>
                <ShieldAlert className="h-4 w-4 flex-shrink-0" />
                <p>Your network traffic is currently unprotected and visible to your ISP.</p>
            </div>
        </div>
    );
};

export default VPNDemo;
