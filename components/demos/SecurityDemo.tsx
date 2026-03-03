import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Shield, Play, AlertTriangle } from 'lucide-react';

const logSequence = [
    "Initializing scan engine v4.2.1...",
    "[+] Target acquired: 10.0.0.42",
    "[*] Initiating port enumeration...",
    "    - Port 22/tcp (ssh) - OPEN",
    "    - Port 80/tcp (http) - OPEN",
    "    - Port 443/tcp (https) - OPEN",
    "    - Port 3306/tcp (mysql) - FILTERED",
    "[*] Running OS fingerprinting...",
    "[+] OS Matched: Linux API 5.4.0 (98%)",
    "[*] Checking for common HTTP vulnerabilities...",
    "[!] WARNING: Outdated Apache version detected (2.4.41)",
    "[!] VULNERABILITY FOUND: CVE-2021-41773 (Path Traversal)",
    "[*] Testing SSL/TLS configuration...",
    "[+] Strong cipher suites supported.",
    "[*] Scan complete. Generating automated report."
];

const SecurityDemo: React.FC = () => {
    const [running, setRunning] = useState(false);
    const [scanIndex, setScanIndex] = useState(-1);
    const [progress, setProgress] = useState(0);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [scanIndex]);

    useEffect(() => {
        if (!running) return;

        if (scanIndex < logSequence.length - 1) {
            const timer = setTimeout(() => {
                setScanIndex(prev => prev + 1);
                setProgress(Math.floor(((scanIndex + 2) / logSequence.length) * 100));
            }, 300);
            return () => clearTimeout(timer);
        } else {
            setRunning(false);
        }
    }, [running, scanIndex]);

    const runScan = () => {
        if (running) return;
        setRunning(true);
        setScanIndex(0);
        setProgress(Math.floor((1 / logSequence.length) * 100));
    };

    return (
        <div className="bg-black border border-green-900/50 rounded-xl overflow-hidden shadow-2xl shadow-green-900/20 font-mono text-green-500 text-sm flex flex-col h-[400px]">
            {/* Header */}
            <div className="bg-gray-900 p-2 flex justify-between items-center border-b border-green-900/50">
                <div className="flex items-center gap-2 px-2">
                    <Terminal className="h-4 w-4 text-green-500" />
                    <span className="text-gray-300 text-xs">root@kali:~</span>
                </div>
                <button
                    onClick={runScan}
                    disabled={running}
                    className="bg-green-900/30 hover:bg-green-900/60 text-green-400 border border-green-800 disabled:opacity-50 px-3 py-1 rounded text-xs flex items-center gap-1 transition-colors"
                >
                    <Play className="h-3 w-3" /> {running ? 'Scanning...' : 'RUN AUDIT'}
                </button>
            </div>

            {/* Terminal Window */}
            <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
                {scanIndex === -1 && !running ? (
                    <div className="h-full flex flex-col items-center justify-center text-green-800 opacity-50">
                        <Shield className="h-12 w-12 mb-2" />
                        <p>System ready. Click RUN AUDIT to begin.</p>
                    </div>
                ) : (
                    <div className="space-y-1">
                        <div className="text-gray-400 mb-2">$ nmap -A -T4 10.0.0.42 && enum_vulns.sh</div>
                        {logSequence.slice(0, scanIndex + 1).map((log, i) => {
                            const isWarning = log.includes('WARNING') || log.includes('VULNERABILITY');
                            const isPort = log.startsWith('    - Port');
                            return (
                                <div key={i} className={`${isWarning ? 'text-red-400 font-bold bg-red-900/20 px-1' :
                                    isPort ? 'text-green-300 ml-4' :
                                        ''
                                    }`}>
                                    {log.includes('VULNERABILITY') && <AlertTriangle className="h-3 w-3 inline mr-1 -mt-0.5" />}
                                    {log}
                                </div>
                            );
                        })}
                        {running && (
                            <div className="animate-pulse">_</div>
                        )}
                        <div ref={bottomRef} />
                    </div>
                )}
            </div>

            {/* Status Bar */}
            <div className="bg-gray-900/80 p-2 border-t border-green-900/50 text-xs flex items-center gap-4">
                <div className="flex-1 bg-black h-2 rounded-full overflow-hidden border border-green-900/50">
                    <div
                        className="h-full bg-green-500 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className="w-10 text-right">{progress}%</div>
            </div>
        </div>
    );
};

export default SecurityDemo;
