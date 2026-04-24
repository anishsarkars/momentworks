import React, { useEffect, useRef, useState } from 'react';
import { Quote } from 'lucide-react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

export const TestimonialSection: React.FC = () => {
  const { ref, isInView } = useInViewAnimation();
  const [scrollY, setScrollY] = useState(0);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const rect = parallaxRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        // Calculate relative position (0 to 1) when element is in viewport
        const distance = (rect.top + rect.height / 2) / viewportHeight;
        setScrollY(distance);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = (scrollY - 0.5) * 200; // max offset 200px

  return (
    <section ref={ref} className="py-24 px-6 flex flex-col items-center max-w-7xl mx-auto text-center">
      <div className="max-w-4xl w-full flex flex-col items-center">
        <div className={`${isInView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
          <Quote className="w-6 h-6 text-primary mx-auto mb-6" />
        </div>

        <h2 className={`text-[28px] md:text-[40px] lg:text-[44px] leading-[1.1] text-secondary tracking-tight mb-8 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          Worked with 20+<br className="hidden md:block" />
          <span className="font-serif italic text-secondary"> founders and startups</span>
        </h2>

        <div className={`flex flex-col md:flex-row items-center justify-center gap-x-8 gap-y-4 text-[12px] md:text-[13px] font-bold uppercase tracking-widest text-textMuted/60 mb-12 md:mb-16 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-accent" />
            <span>Delivered in days</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-accent" />
            <span>Start small, scale anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-accent" />
            <span>Built for real product launches</span>
          </div>
        </div>

        <div
          ref={parallaxRef}
          className={`w-full rounded-[32px] shadow-2xl overflow-hidden relative ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.5s', height: '500px' }}
        >
          <img
            src="/videos/hero-stellar-ai-v2-preview-DjvxjG3C.gif"
            alt="Showcase"
            className="w-full h-[120%] object-cover absolute top-0 left-0 transition-transform duration-100 ease-out"
            style={{ transform: `translateY(${parallaxOffset}px)` }}
          />
        </div>
      </div>
    </section>
  );
};
