import React, { useState, useEffect } from 'react';
import { Button } from './Button';

export const StickyCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 600px (roughly after hero)
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95 pointer-events-none'
        }`}
    >
      <div className="bg-white/90 backdrop-blur-md rounded-full pl-5 md:pl-6 pr-2 py-1.5 md:py-2 shadow-[0_8px_32px_rgba(0,0,0,0.12)] flex items-center gap-4 md:gap-6 border border-black/5 mx-4 max-w-[calc(100vw-32px)]">
        <a
          href="#work"
          className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 hover:text-primary transition-colors whitespace-nowrap"
        >
          View Work
        </a>

        <Button
          className="px-4 md:px-6 py-2 md:py-2.5 text-[10px] md:text-sm font-bold uppercase tracking-widest whitespace-nowrap"
          href="https://cal.com/anishsarkar"
        >
          Book a call
        </Button>
      </div>
    </div>
  );
};
