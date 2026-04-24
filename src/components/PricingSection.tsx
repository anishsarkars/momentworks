import React, { useState } from 'react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';
import { Button } from './Button';
import { Check } from 'lucide-react';

type Currency = 'INR' | 'USD';

const plans = [
  {
    title: "Video Plan",
    startingPrice: {
      INR: "₹5,000",
      USD: "$60"
    },
    description: "Launch videos that look amazing and go viral.",
    includes: [
      "30–60 sec promo video",
      "Script + storytelling",
      "AI-powered visuals",
      "Background music",
      "2 revisions"
    ],
    variant: "standard"
  },
  {
    title: "Design Plan",
    startingPrice: {
      INR: "₹8,000",
      USD: "$100"
    },
    description: "High-converting landing pages built in days.",
    includes: [
      "1 Landing page (Figma/Web)",
      "Conversion-focused UI/UX",
      "Mobile responsive design",
      "Clean design system",
      "2 revisions"
    ],
    variant: "popular"
  },
  {
    title: "Own Launch",
    startingPrice: {
      INR: "Custom",
      USD: "Custom"
    },
    description: "Full brand strategy and multi-channel launch assets.",
    includes: [
      "Complete Brand Identity",
      "High-Production Promo Video",
      "Full Launch Platform",
      "Tailored Marketing Assets",
      "Priority Launch Partner"
    ],
    variant: "standard"
  }
];

export const PricingSection: React.FC = () => {
  const { ref, isInView } = useInViewAnimation();
  const [currency, setCurrency] = useState<Currency>('INR');

  return (
    <section ref={ref} className="w-full py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
          <span className="text-primary font-bold text-xs uppercase tracking-widest mb-4 inline-block">Our Services</span>
          <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-4 tracking-tight">Choose the plan that's right for you</h2>
          <p className="text-sm text-textMuted/60 max-w-2xl mx-auto mb-16">
            For launch offer starts as low as $80 (₹6,500) for product video — prices will increase soon
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`group flex flex-col rounded-[32px] overflow-hidden transition-all duration-500 relative ${plan.title === "Own Launch"
                ? 'bg-secondary text-white shadow-2xl scale-[1.02] z-10'
                : plan.title === "Design Plan"
                  ? 'bg-white border-2 border-primary shadow-xl scale-[1.05] z-20'
                  : 'bg-white border border-secondary/5 shadow-lg'
                } ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${(index + 2) * 0.1}s` }}
            >
              {plan.title === "Design Plan" && (
                <div className="absolute top-0 right-0 px-6 py-2 bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-bl-2xl">
                  Popular
                </div>
              )}

              {/* Top Half */}
              <div className={`p-8 md:p-10 border-b ${plan.title === "Own Launch" ? 'border-white/10' : 'border-secondary/5'}`}>
                <h3 className={`text-xl font-bold mb-4 ${plan.title === "Own Launch" ? 'text-white' : 'text-secondary'}`}>{plan.title}</h3>

                <p className={`text-sm mb-8 leading-relaxed ${plan.title === "Own Launch" ? 'text-white/60' : 'text-textMuted/60'}`}>
                  {plan.description}
                </p>

                <div className="mt-4">
                  <Button
                    variant={plan.title === "Own Launch" ? "secondary" : "primary"}
                    className="w-full py-4 text-xs font-bold uppercase tracking-widest border-none"
                    href="https://cal.com/anishsarkar"
                  >
                    Book a 15min call
                  </Button>
                </div>
              </div>

              {/* Bottom Half - Features */}
              <div className={`p-8 md:p-10 flex-grow ${plan.title === "Design Plan" ? 'bg-secondary/[0.02]' : plan.title === "Own Launch" ? 'bg-white/[0.02]' : 'bg-secondary/[0.01]'}`}>
                <p className={`text-[10px] uppercase tracking-[0.2em] font-black mb-6 ${plan.title === "Own Launch" ? 'text-white/40' : 'text-secondary/40'}`}>Features</p>
                <ul className="space-y-4">
                  {plan.includes.map((item, i) => (
                    <li key={i} className={`flex items-start gap-3 text-sm ${plan.title === "Own Launch" ? 'text-white/70' : 'text-secondary/70'}`}>
                      <Check className={`w-4 h-4 mt-0.5 ${plan.title === "Own Launch" ? 'text-white/40' : 'text-primary/40'}`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-primary/60 italic">
            Looking for something else? <a href="https://cal.com/anishsarkar" className="text-primary font-bold underline decoration-accent/30 hover:decoration-accent transition-colors">Custom plans available.</a>
          </p>
        </div>
      </div>
    </section>
  );
};
