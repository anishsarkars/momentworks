import React from 'react';
import { useInViewAnimation } from './hooks/useInViewAnimation';
import { Button } from './components/Button';
import { TestimonialSection } from './components/TestimonialSection';
import { PricingSection } from './components/PricingSection';
import { TestimonialCarousel } from './components/TestimonialCarousel';
import { ProjectsSection } from './components/ProjectsSection';
import { PartnerSection } from './components/PartnerSection';
import { StickyCTA } from './components/StickyCTA';
import { Footer } from './components/Footer';
import { CopyrightBar } from './components/CopyrightBar';
import { BottomNav } from './components/BottomNav';
import { MarqueeVideo } from './components/MarqueeVideo';

const marqueeVideos = [
  "https://player.vimeo.com/video/1186269952?autoplay=1&loop=1&background=1&muted=1&autopause=0&playsinline=1",
  "https://player.vimeo.com/video/1186443644?autoplay=1&loop=1&background=1&muted=1&autopause=0&playsinline=1",
  "https://player.vimeo.com/video/1186270370?autoplay=1&loop=1&background=1&muted=1&autopause=0&playsinline=1",
  "https://player.vimeo.com/video/1186443672?autoplay=1&loop=1&background=1&muted=1&autopause=0&playsinline=1",
  "https://player.vimeo.com/video/1186269203?autoplay=1&loop=1&background=1&muted=1&autopause=0&playsinline=1",
  "https://www.youtube.com/embed/_X7-gUwS3ew?autoplay=1&mute=1&loop=1&playlist=_X7-gUwS3ew&controls=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1",
  "https://www.youtube.com/embed/a4_O14mzz84?autoplay=1&mute=1&loop=1&playlist=a4_O14mzz84&controls=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1",
];

const App: React.FC = () => {
  const { ref: heroRef, isInView: heroInView } = useInViewAnimation();

  return (
    <div className="min-h-screen bg-white selection:bg-primary selection:text-white overflow-x-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="flex flex-col items-center text-center px-6 pt-8 md:pt-150 max-w-4xl mx-auto"
      >
        <div className={`flex flex-col items-center mb-150 ${heroInView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
          <img
            src="/images/logo.png"
            alt="MomentWorks Logo"
            className="h-24 md:h-32 object-contain"
          />
        </div>

        <h2
          className={`text-[28px] md:text-[48px] lg:text-[64px] font-bold leading-[1.1] text-secondary tracking-tight mb-6 ${heroInView ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.3s' }}
        >
          Launch like a <br />
          <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">premium brand</span>
          <div className="mt-2 text-[14px] md:text-[32px] font-serif italic text-secondary/60 tracking-tight">
            - without stretching your budget
          </div>
        </h2>

        <div
          className={`flex flex-col gap-4 text-sm md:text-base text-primary/60 leading-relaxed mt-1 text-center max-w-xl ${heroInView ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.4s' }}
        >
          <p>
            Product launch videos, landing pages, and UI/UX  <br></br>built to convert and delivered fast.
          </p>
        </div>

        <div
          className={`flex flex-col sm:flex-row gap-3 md:gap-4 mt-5 md:mt-6 w-full justify-center ${heroInView ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.5s' }}
        >
          <Button className="w-full sm:w-auto" href="https://cal.com/anishsarkar">Book a 15min call</Button>
        </div>
      </section>

      {/* Infinite Marquee */}
      <div className="w-full mt-12 md:mt-16 mb-16 md:mb-24 overflow-hidden relative">
        <div className="flex animate-marquee-mobile md:animate-marquee whitespace-nowrap will-change-transform min-w-max">
          {[...marqueeVideos, ...marqueeVideos].map((url, i) => (
            <MarqueeVideo key={i} url={url} index={i} />
          ))}
        </div>
      </div>

      {/* Testimonial Quote */}
      <TestimonialSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* Testimonial Carousel */}
      <TestimonialCarousel />



      {/* Partner Section */}
      <PartnerSection />

      {/* Footer */}
      <Footer />

      {/* Copyright Bar */}
      <CopyrightBar />
      <StickyCTA />
    </div>
  );
};

export default App;
