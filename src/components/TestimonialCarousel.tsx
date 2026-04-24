import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: "Sarthak Goel",
    role: "Founder, Zeggss Organics",
    quote: "With very little guidance the team delivered designs and launch videos that were consistently spot on. Highly recommend.",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
  },
  {
    name: "Aryan Kapoor",
    role: "Founder, Muta Social",
    quote: "MomentWorks led the creation of our best marketing assets to date! The cinematic quality is exactly what we needed for our launch.",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150"
  },
  {
    name: "Rohan Sharma",
    role: "Founder, DM Store",
    quote: "The speed and quality of delivery is unmatched. They understood our requirements and translated them into a beautiful brand experience seamlessly.",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150"
  }
];

// Triple for infinite effect
const tripledTestimonials = [...testimonials, ...testimonials, ...testimonials];

const QuoteIcon = () => (
  <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.4286 0C5.11667 0 0 5.11667 0 11.4286C0 17.7405 5.11667 22.8571 11.4286 22.8571H14.2857C14.2857 27.9143 10.1143 32 5.05714 32H2.85714V28.5714H5.05714C8.2 28.5714 10.8571 26.0286 10.8571 22.8571H11.4286C5.11667 22.8571 0 17.7405 0 11.4286V5.71429C0 2.57143 2.57143 0 5.71429 0H11.4286ZM37.1429 0C30.8309 0 25.7143 5.11667 25.7143 11.4286C25.7143 17.7405 30.8309 22.8571 37.1429 22.8571H40V22.8571H37.1429C34 22.8571 31.4286 25.4286 31.4286 28.5714H33.6286C38.6857 28.5714 42.8571 24.4 42.8571 19.3429V5.71429C42.8571 2.57143 40.2857 0 37.1429 0Z" fill="#0D212C" fillOpacity="0.1"/>
  </svg>
);

export const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(testimonials.length);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef(true);

  const slideWidth = 427.5 + 24; // width + gap

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, currentIndex]);

  const handleNext = () => {
    transitionRef.current = true;
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    transitionRef.current = true;
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    if (currentIndex >= testimonials.length * 2) {
      transitionRef.current = false;
      setCurrentIndex(testimonials.length);
    } else if (currentIndex < testimonials.length) {
      transitionRef.current = false;
      setCurrentIndex(testimonials.length * 2 - 1);
    }
  };

  return (
    <section className="w-full py-20 overflow-hidden bg-white">
      <div className="md:max-w-4xl md:ml-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
        <h2 className="text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] text-secondary tracking-tight">
          What <span className="font-serif italic">builders</span> say
        </h2>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-black text-black" />
            ))}
          </div>
          <span className="font-medium text-secondary">Clutch 5/5</span>
        </div>
      </div>

      <div 
        className="relative px-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          ref={containerRef}
          className="flex gap-6 transition-transform duration-800"
          style={{ 
            transform: `translateX(-${currentIndex * slideWidth}px)`,
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDuration: transitionRef.current ? '0.8s' : '0s'
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {tripledTestimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="flex-shrink-0 w-[calc(100vw-48px)] md:w-[427.5px] bg-white rounded-[32px] md:rounded-[40px] shadow-card px-6 md:pl-10 md:pr-12 py-8 flex flex-col justify-between h-[280px]"
            >
              <div className="mb-4">
                <QuoteIcon />
                <p className="text-base text-secondary leading-relaxed mt-4">
                  {testimonial.quote}
                </p>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-textMuted flex items-center">
                    <span className="mr-2 text-primary">→</span> {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8 md:absolute md:top-1/2 md:-translate-y-1/2 md:right-24 md:mt-0 z-10">
          <button 
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-secondary/20 flex items-center justify-center hover:bg-light transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-secondary/20 flex items-center justify-center hover:bg-light transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};
