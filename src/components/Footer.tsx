import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from './Button';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 px-6 max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
      <div className="flex flex-col gap-6">
        <Button href="https://cal.com/anishsarkar">Discovery Call</Button>
      </div>

      <div className="flex gap-16 md:gap-24">
        <div className="flex flex-col gap-4">
          <a href="#services" className="text-base text-primary hover:opacity-70 transition-opacity">Services</a>
          <a href="#work" className="text-base text-primary hover:opacity-70 transition-opacity">Work</a>
          <a href="#about" className="text-base text-primary hover:opacity-70 transition-opacity">About</a>
        </div>

        <div className="flex flex-col gap-4">
          <a href="https://x.com/MomentworksHQ" target="_blank" rel="noopener noreferrer" className="text-base text-primary hover:opacity-70 transition-opacity flex items-center gap-1">
            x.com <ArrowUpRight className="w-4 h-4" />
          </a>
          <a href="https://www.linkedin.com/company/momentworks" target="_blank" rel="noopener noreferrer" className="text-base text-primary hover:opacity-70 transition-opacity flex items-center gap-1">
            LinkedIn <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};
