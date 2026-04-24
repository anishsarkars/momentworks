import React, { useState, useEffect, useRef } from 'react';
import { Button } from './Button';

const marqueeImages = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-portfolio-cosmic-preview-BpvWJ3Nc.gif",
  "https://motionsites.ai/assets/hero-velorah-preview-CJNTtbpd.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
];

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  image: string;
  opacity: number;
  scale: number;
}

export const PartnerSection: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSpawnTime = useRef(0);
  const particleId = useRef(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const now = Date.now();
    if (now - lastSpawnTime.current < 80) return;

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newParticle: Particle = {
        id: particleId.current++,
        x,
        y,
        rotation: (Math.random() - 0.5) * 20,
        image: marqueeImages[Math.floor(Math.random() * marqueeImages.length)],
        opacity: 1,
        scale: 1,
      };

      setParticles((prev) => [...prev, newParticle]);
      lastSpawnTime.current = now;

      // Remove after 1000ms
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 1000);
    }
  };

  return (
    <section className="w-full py-12 px-6">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="max-w-7xl mx-auto py-48 rounded-[40px] bg-secondary relative overflow-hidden flex flex-col items-center justify-center text-center cursor-none"
      >
        {/* Background Video & Overlay */}
        <div className="absolute inset-0 z-0">
          <video
            src="/videos/partner-bg.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-secondary/60 backdrop-blur-[2px]" />
        </div>
        {/* Background Particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute pointer-events-none transition-all duration-1000 ease-out"
            style={{
              left: p.x,
              top: p.y,
              transform: `translate(-50%, -50%) rotate(${p.rotation}deg) scale(${p.scale})`,
              opacity: p.opacity,
              zIndex: 10
            }}
          >
            <img
              src={p.image}
              alt=""
              className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-xl shadow-xl"
            />
          </div>
        ))}

        <h2 className="text-[48px] md:text-[64px] lg:text-[80px] font-serif text-white mb-12 z-20 pointer-events-none relative">
          Connect with us
        </h2>

        <div className="z-20 flex flex-col md:flex-row items-center gap-4">
          <Button className="flex items-center gap-3 pl-2 pr-7 py-2 h-auto" href="https://cal.com/anishsarkar">
            <img
              src="https://cal.com/api/avatar/aea758f2-7427-4635-9d54-25d14782769f.png"
              alt="Anish"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span>Book a call</span>
          </Button>

          <Button
            variant="secondary"
            className="px-8 py-4 h-auto text-sm font-bold uppercase tracking-widest border-none bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
            href="mailto:anish@tryzelp.app"
          >
            Mail Directly
          </Button>
        </div>
      </div>
    </section>
  );
};
