import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, ExternalLink } from 'lucide-react';

interface MarqueeVideoProps {
  url: string;
  index: number;
}

export const MarqueeVideo: React.FC<MarqueeVideoProps> = ({ url, index }) => {
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
  const isVimeo = url.includes('vimeo.com') || url.includes('player.vimeo.com');

  const getOriginalUrl = () => {
    if (isYouTube) {
      const id = url.split('/embed/')[1]?.split('?')[0];
      return `https://youtube.com/watch?v=${id}`;
    }
    if (isVimeo) {
      const id = url.split('/video/')[1]?.split('?')[0];
      return `https://vimeo.com/${id}`;
    }
    return url;
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isVimeo) {
      const player = (window as any).Vimeo?.Player;
      if (player && iframeRef.current) {
        const vimeoPlayer = new player(iframeRef.current);
        vimeoPlayer.setVolume(isMuted ? 1 : 0);
        setIsMuted(!isMuted);
      }
    } else if (isYouTube) {
      // YouTube unmuting via iframe parameters requires a reload or the YouTube IFrame API
      // Since we want "smooth", we'll just toggle the state for the UI, 
      // but actual YouTube API control is more involved.
      // For now, we'll just open the original URL for sound if it's YouTube, or advise.
      window.open(getOriginalUrl(), '_blank');
    }
  };

  return (
    <div 
      className="w-[300px] md:w-[960px] h-[169px] md:h-[540px] mx-4 md:mx-6 rounded-[24px] md:rounded-[32px] shadow-2xl overflow-hidden flex-shrink-0 bg-secondary relative group"
    >
      <iframe
        ref={iframeRef}
        src={url}
        className="w-full h-full border-none pointer-events-none scale-[1.02] origin-center"
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope"
        loading="eager"
        title={`video-${index}`}
        allowFullScreen
      ></iframe>
      
      {/* Overlay Controls */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-700 flex items-end p-8 opacity-0 group-hover:opacity-100">
        <div className="flex items-center gap-4 w-full">
          {isVimeo && (
            <button 
              onClick={toggleMute}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all pointer-events-auto"
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
            </button>
          )}
          
          <a 
            href={getOriginalUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all pointer-events-auto ml-auto"
            title="Watch Full Video"
          >
            <ExternalLink className="w-5 h-5 text-white" />
          </a>
        </div>
      </div>
    </div>
  );
};
