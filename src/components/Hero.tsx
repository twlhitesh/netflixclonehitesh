import React, { useState, useEffect } from 'react';
import { Play, Info, Volume2, VolumeX } from 'lucide-react';

interface HeroProps {
  onPlay: () => void;
}

const Hero = ({ onPlay }: HeroProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    // Auto-play video after a delay
    const timer = setTimeout(() => {
      setIsVideoPlaying(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-[95vh] w-full">
      <div className="absolute w-full h-full">
        {isVideoPlaying ? (
          <video
            autoPlay
            loop
            muted={isMuted}
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0"
          >
            <source src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v" type="video/mp4" />
          </video>
        ) : (
          <img
            src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0"
            alt="Hero"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
      </div>
      
      <div className="absolute bottom-[35%] left-16 max-w-xl">
        <img
          src="https://occ-0-1432-1433.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABUZdeG1DrMstq-YKHZ-dA-cx2uQN_YbCYx7RABDk0y7F8ZK6nzgCz4bp5qJVgMizPbVpIvXrd4xMBQAuNe0xmuW2WjoeGMDn1cFO.webp?r=df1"
          alt="Stranger Things"
          className="w-96 mb-6"
        />
        <p className="text-lg text-gray-200 mb-8 line-clamp-3">
          When a young boy vanishes, a small town uncovers a mystery involving secret experiments, 
          terrifying supernatural forces and one strange little girl.
        </p>
        <div className="flex items-center space-x-4">
          <button 
            onClick={onPlay}
            className="netflix-button flex items-center px-8 py-3 bg-white text-black rounded hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105"
          >
            <Play className="w-6 h-6 mr-2" fill="black" />
            Play
          </button>
          <button 
            onClick={onPlay}
            className="netflix-button flex items-center px-8 py-3 bg-gray-500/70 text-white rounded hover:bg-gray-500/50 transition-all duration-300 transform hover:scale-105"
          >
            <Info className="w-6 h-6 mr-2" />
            More Info
          </button>
          {isVideoPlaying && (
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="ml-4 p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              {isMuted ? <VolumeX className="w-8 h-8" /> : <Volume2 className="w-8 h-8" />}
            </button>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#141414] to-transparent" />
    </div>
  );
};

export default Hero;