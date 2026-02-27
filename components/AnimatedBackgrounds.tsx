import React, { useEffect, useRef } from 'react';

/**
 * Animated floating particles drawn on canvas.
 * Particles connect with lines when near each other.
 */
export const ParticleNetwork: React.FC<{ particleCount?: number; color?: string }> = ({
    particleCount = 50,
    color = '0, 212, 255'
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId: number;
        let particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Init particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                r: Math.random() * 2 + 1,
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${color}, 0.5)`;
                ctx.fill();

                // Draw connections
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(${color}, ${0.15 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            animId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, [particleCount, color]);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

/**
 * Floating code snippets that drift upward — for About/Projects sections
 */
export const FloatingCode: React.FC = () => {
    const snippets = [
        'const app = express();',
        'npm run build',
        'git push origin main',
        'docker compose up -d',
        'SELECT * FROM users',
        'import React from "react"',
        'interface Props {}',
        'async function deploy()',
        'firebase deploy',
        'pytest -v --cov',
        'kubectl apply -f',
        'export default App',
        'npx tailwindcss init',
        'yarn add typescript',
        'ssh deploy@server',
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {snippets.map((snippet, i) => (
                <div
                    key={i}
                    className="absolute font-mono text-xs whitespace-nowrap"
                    style={{
                        left: `${(i * 7.3) % 100}%`,
                        top: `${100 + (i * 5)}%`,
                        color: `rgba(0, 212, 255, ${0.04 + (i % 3) * 0.02})`,
                        animation: `floatUp ${18 + (i % 7) * 4}s linear infinite`,
                        animationDelay: `${i * 1.2}s`,
                    }}
                >
                    {snippet}
                </div>
            ))}
        </div>
    );
};

/**
 * Animated grid with pulsing intersection dots — for Services
 */
export const PulsingGrid: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Grid lines */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `
          linear-gradient(rgba(0, 212, 255, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 212, 255, 0.3) 1px, transparent 1px)
        `,
                backgroundSize: '80px 80px',
            }} />
            {/* Pulsing dots at intersections */}
            {Array.from({ length: 20 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-accent"
                    style={{
                        left: `${(i % 5) * 25 + 10}%`,
                        top: `${Math.floor(i / 5) * 28 + 10}%`,
                        opacity: 0,
                        animation: `gridPulse 4s ease-in-out infinite`,
                        animationDelay: `${i * 0.3}s`,
                    }}
                />
            ))}
        </div>
    );
};

/**
 * Orbiting rings — for Skills section
 */
export const OrbitRings: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
            {[300, 450, 600].map((size, i) => (
                <div
                    key={i}
                    className="absolute rounded-full border"
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        borderColor: `rgba(124, 58, 237, ${0.06 - i * 0.015})`,
                        animation: `spin ${30 + i * 15}s linear infinite${i % 2 === 1 ? ' reverse' : ''}`,
                    }}
                >
                    <div
                        className="absolute w-2 h-2 rounded-full bg-violet"
                        style={{
                            top: '-4px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            opacity: 0.4,
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

/**
 * Radar sweep effect — for Security/Skills
 */
export const RadarSweep: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center opacity-20">
            <div className="relative w-96 h-96">
                {/* Concentric circles */}
                {[1, 0.75, 0.5, 0.25].map((scale, i) => (
                    <div
                        key={i}
                        className="absolute inset-0 rounded-full border border-accent/20"
                        style={{ transform: `scale(${scale})` }}
                    />
                ))}
                {/* Sweep line */}
                <div
                    className="absolute top-0 left-1/2 h-1/2 w-px origin-bottom"
                    style={{
                        background: 'linear-gradient(to top, rgba(0,212,255,0.3), transparent)',
                        animation: 'spin 4s linear infinite',
                    }}
                />
                {/* Sweep cone */}
                <div
                    className="absolute top-0 left-1/2 h-1/2 w-24 -ml-12 origin-bottom"
                    style={{
                        background: 'conic-gradient(from -10deg, transparent, rgba(0,212,255,0.05) 20deg, transparent 20deg)',
                        animation: 'spin 4s linear infinite',
                    }}
                />
            </div>
        </div>
    );
};

/**
 * Signal/wave lines — for Contact section
 */
export const SignalWaves: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[0, 1, 2, 3, 4].map((i) => (
                <div
                    key={i}
                    className="absolute left-0 right-0"
                    style={{
                        top: `${20 + i * 15}%`,
                        height: '1px',
                        background: `linear-gradient(90deg, transparent, rgba(0, 212, 255, ${0.08 - i * 0.01}), transparent)`,
                        animation: `waveSlide ${6 + i * 2}s ease-in-out infinite alternate`,
                        animationDelay: `${i * 0.5}s`,
                    }}
                />
            ))}
            {/* Pulsing signal dots */}
            {[0, 1, 2].map((i) => (
                <div
                    key={`dot-${i}`}
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                        left: `${20 + i * 30}%`,
                        top: `${30 + i * 20}%`,
                        background: 'radial-gradient(circle, rgba(0,212,255,0.3), transparent 70%)',
                        animation: `signalPulse 3s ease-in-out infinite`,
                        animationDelay: `${i * 1}s`,
                    }}
                />
            ))}
        </div>
    );
};
