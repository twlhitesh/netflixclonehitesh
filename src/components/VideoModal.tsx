import React, { useEffect, memo, useState } from 'react';
import { X, Volume2, VolumeX, Maximize2, Subtitles, Play, Pause } from 'lucide-react';

interface VideoModalProps {
  movie: {
    title: string;
    thumbnail: string;
  };
  onClose: () => void;
}

const VideoModal = memo(({ movie, onClose }: VideoModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);

    // Simulate video progress
    const interval = setInterval(() => {
      if (isPlaying) {
        setProgress(prev => (prev >= 100 ? 0 : prev + 0.5));
      }
    }, 100);

    return () => {
      window.removeEventListener('keydown', handleEsc);
      clearInterval(interval);
    };
  }, [onClose, isPlaying]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden z-10 shadow-2xl modal-content">
        <img
          src={movie.thumbnail}
          alt={movie.title}
          className="w-full h-full object-cover"
          style={{ filter: isPlaying ? 'brightness(0.7)' : 'none' }}
        />
        
        {/* Progress Bar */}
        <div className="absolute bottom-[72px] left-0 right-0 h-1 bg-gray-600">
          <div 
            className="h-full bg-red-600 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="netflix-button bg-white rounded-full p-3 text-black hover:bg-white/90 transition-all duration-300 transform hover:scale-105"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" fill="black" />
                )}
              </button>
              
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-6 h-6" />
                ) : (
                  <Volume2 className="w-6 h-6" />
                )}
              </button>
              
              <div className="text-sm font-medium">
                {Math.floor(progress / 100 * 120)}:00 / 2:00:00
              </div>
              
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <Subtitles className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <Maximize2 className="w-6 h-6" />
              </button>
              <button 
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                onClick={onClose}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Title Overlay */}
        <div className="absolute top-4 left-4">
          <h2 className="text-2xl font-bold shadow-lg">
            {movie.title}
          </h2>
        </div>
      </div>
    </div>
  );
});

VideoModal.displayName = 'VideoModal';

export default VideoModal;