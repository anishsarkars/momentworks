import React from 'react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

const projects = [
  {
    title: "evr",
    description: "From idea to millions raised for a web3 AI product",
    image: "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif"
  },
  {
    title: "Automation Machines",
    description: "Streamlining industrial automation processes",
    image: "https://motionsites.ai/assets/hero-automation-machines-preview-DlTveRIN.gif"
  },
  {
    title: "xPortfolio",
    description: "Modern portfolio management platform",
    image: "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif"
  }
];

const ProjectItem: React.FC<{ project: typeof projects[0], index: number }> = ({ project, index }) => {
  const { ref, isInView } = useInViewAnimation();

  return (
    <div ref={ref} className="flex flex-col gap-8 md:gap-10">
      <div 
        className={`ml-10 md:ml-28 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
        style={{ animationDelay: '0.1s' }}
      >
        <h3 className="text-2xl md:text-3xl font-semibold text-primary font-serif mb-2">
          {project.title}
        </h3>
        <p className="text-sm md:text-base text-primary/70">
          {project.description}
        </p>
      </div>
      <div 
        className={`w-full rounded-2xl shadow-lg overflow-hidden ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
        style={{ animationDelay: '0.3s' }}
      >
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-[300px] md:h-[600px] object-cover hover:scale-105 transition-transform duration-700" 
        />
      </div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-12 flex flex-col gap-16 md:gap-20">
      {projects.map((project, index) => (
        <ProjectItem key={index} project={project} index={index} />
      ))}
    </section>
  );
};
