import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Layout } from 'lucide-react';
import HeroBackground from './HeroBackground';

const Hero: React.FC = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative bg-primary overflow-hidden scroll-mt-24 min-h-[650px] flex items-center">
      {/* Live Dashboard Background */}
      <HeroBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10">
        <div className="text-center lg:text-left lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-secondary text-sm font-semibold mb-6 border border-white/10 backdrop-blur-sm shadow-lg">
              <span className="flex h-2 w-2 rounded-full bg-secondary mr-2 animate-pulse"></span>
              Available for Freelance Projects
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6 drop-shadow-md">
              Scalable, Secure, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-orange-300">
                Branded Web Apps
              </span>
            </h1>
            
            <p className="text-lg text-gray-200 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed drop-shadow-sm">
              Elevate your digital presence with engineering precision. Specialized in building robust React applications, automated CI/CD pipelines, and ensuring ironclad security.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#contact"
                onClick={(e) => handleScroll(e, 'contact')}
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-secondary hover:bg-orange-500 md:text-lg shadow-lg hover:shadow-orange-500/25 transition-all duration-200 cursor-pointer"
              >
                Get a Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="#demos"
                onClick={(e) => handleScroll(e, 'demos')}
                className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-base font-medium rounded-lg text-white hover:bg-white/10 md:text-lg backdrop-blur-sm transition-all duration-200 cursor-pointer shadow-sm"
              >
                View Demos
              </a>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-center lg:text-left backdrop-blur-[2px] rounded-xl p-2 bg-white/5 lg:bg-transparent lg:backdrop-blur-none lg:p-0">
              <div className="flex flex-col items-center lg:items-start">
                <ShieldCheck className="h-6 w-6 text-accent mb-2" />
                <span className="text-sm text-gray-300 font-medium">Security First</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <Zap className="h-6 w-6 text-accent mb-2" />
                <span className="text-sm text-gray-300 font-medium">High Performance</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <Layout className="h-6 w-6 text-accent mb-2" />
                <span className="text-sm text-gray-300 font-medium">Modular Design</span>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:block lg:w-5/12">
            <div className="relative rounded-2xl bg-white/5 border border-white/20 p-2 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 backdrop-blur-md">
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-transparent rounded-2xl pointer-events-none"></div>
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000" 
                alt="Web App Dashboard Analytics" 
                className="rounded-xl shadow-inner w-full h-auto opacity-95"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;