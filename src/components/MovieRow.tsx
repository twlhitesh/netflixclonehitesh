import React, { useRef, useState, useCallback, memo } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Movie } from '../types';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

const MovieRow = memo(({ title, movies, onMovieClick }: MovieRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);
  const [hoveredMovie, setHoveredMovie] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [isScrolling, setIsScrolling] = useState(false);

  const handleImageLoad = (movieId: number) => {
    setLoadedImages(prev => new Set(prev).add(movieId));
  };

  const handleClick = useCallback((direction: 'left' | 'right') => {
    setIsMoved(true);
    setIsScrolling(true);
    
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth;
      
      rowRef.current.scrollTo({ 
        left: scrollTo, 
        behavior: 'smooth' 
      });

      // Reset scrolling state after animation
      setTimeout(() => setIsScrolling(false), 500);
    }
  }, []);

  return (
    <div className="space-y-2 md:space-y-4">
      <h2 className="w-56 cursor-pointer text-lg md:text-2xl font-semibold text-white/90 transition duration-200 hover:text-white pl-4 md:pl-16">
        {title}
      </h2>
      <div className="group relative">
        <ChevronLeft 
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 
            cursor-pointer opacity-0 transition-all duration-300 
            hover:scale-125 group-hover:opacity-100 
            ${!isMoved && 'hidden'} ${isScrolling && 'pointer-events-none'}`}
          onClick={() => handleClick('left')}
        />
        
        <div 
          ref={rowRef} 
          className="flex items-center space-x-2 overflow-x-scroll scrollbar-hide 
            md:space-x-4 md:p-4 pl-4 md:pl-16"
          style={{ 
            willChange: 'transform',
            perspective: '1000px',
            perspectiveOrigin: 'center'
          }}
        >
          {movies.map((movie) => (
            <div 
              key={movie.id} 
              className={`relative h-28 min-w-[180px] cursor-pointer 
                transition-all duration-300 ease-out md:h-36 md:min-w-[260px] 
                movie-card ${hoveredMovie === movie.id ? 'z-20' : 'z-10'}`}
              onMouseEnter={() => setHoveredMovie(movie.id)}
              onMouseLeave={() => setHoveredMovie(null)}
              onClick={() => onMovieClick(movie)}
            >
              <div className={`w-full h-full rounded-sm overflow-hidden 
                ${!loadedImages.has(movie.id) ? 'image-loading' : ''}`}>
                <img
                  src={movie.thumbnail}
                  alt={movie.title}
                  className={`rounded-sm object-cover md:rounded w-full h-full 
                    transition-all duration-300 ${
                    loadedImages.has(movie.id) ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading="lazy"
                  decoding="async"
                  onLoad={() => handleImageLoad(movie.id)}
                />
              </div>
              
              {/* Hover Details */}
              <div 
                className={`absolute top-0 left-0 w-full h-full bg-black/60 
                  opacity-0 hover:opacity-100 transition-opacity duration-300 
                  rounded ${hoveredMovie === movie.id ? 'opacity-100' : ''}`}
              >
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-sm font-semibold mb-2">
                    {movie.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button className="netflix-button bg-white/90 rounded-full p-1 
                      hover:bg-white transition-colors">
                      <Play className="w-4 h-4 text-black" fill="black" />
                    </button>
                    <div className="flex flex-wrap gap-1">
                      {movie.genre.map((g, i) => (
                        <span key={i} className="text-xs text-white/80">
                          {g}{i < movie.genre.length - 1 ? ' •' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <ChevronRight 
          className={`absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 
            cursor-pointer opacity-0 transition-all duration-300 
            hover:scale-125 group-hover:opacity-100
            ${isScrolling && 'pointer-events-none'}`}
          onClick={() => handleClick('right')}
        />
      </div>
    </div>
  );
});

MovieRow.displayName = 'MovieRow';

export default MovieRow;