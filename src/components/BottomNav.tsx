import React from 'react';
import { Button } from './Button';

export const BottomNav: React.FC = () => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white rounded-full px-4 py-2 shadow-pill flex items-center gap-6 border border-secondary/5">
        <span className="font-serif font-semibold text-2xl text-primary pl-2">V</span>
        <Button className="px-5 py-2 text-sm" href="https://cal.com/anishsarkar">
          Book a 15min call
        </Button>
      </div>
    </div>
  );
};
