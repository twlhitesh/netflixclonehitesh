import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Play, Info } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieRow from './components/MovieRow';
import NetflixIntro from './components/NetflixIntro';
import { movies } from './data/movies';

const VideoModal = lazy(() => import('./components/VideoModal'));

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<null | { title: string; thumbnail: string }>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [netflixSound] = useState(() => new Audio('https://assets.mixkit.co/active_storage/sfx/2357/2357-preview.mp3'));
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const [previewTimeout, setPreviewTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    netflixSound.load();
    netflixSound.volume = 0.5;
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (previewTimeout) clearTimeout(previewTimeout);
    };
  }, [netflixSound, previewTimeout]);

  const handleMovieClick = (movie: { title: string; thumbnail: string }) => {
    setSelectedMovie(movie);
    setShowModal(true);
    netflixSound.currentTime = 0;
    netflixSound.play().catch(() => {
      console.log('Audio playback was prevented by the browser');
    });
  };

  const handleMovieHover = (movie: { title: string; thumbnail: string }) => {
    if (previewTimeout) clearTimeout(previewTimeout);
    
    const timeout = setTimeout(() => {
      setIsPreviewPlaying(true);
      setSelectedMovie(movie);
    }, 800);
    
    setPreviewTimeout(timeout);
  };

  const handleMovieLeave = () => {
    if (previewTimeout) clearTimeout(previewTimeout);
    setIsPreviewPlaying(false);
    setSelectedMovie(null);
  };

  if (showIntro) {
    return <NetflixIntro onComplete={() => setShowIntro(false)} />;
  }

  return (
    <div className="bg-[#141414] min-h-screen text-white overflow-x-hidden">
      <Navbar isScrolled={isScrolled} />
      <Hero onPlay={() => handleMovieClick({
        title: "Stranger Things",
        thumbnail: "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?q=80&w=3000"
      })} />
      
      <div className="relative pb-20 -mt-24 z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#141414]/0 via-[#141414] to-[#141414] pointer-events-none h-96" />
        <MovieRow 
          title="Trending Now" 
          movies={movies.trending} 
          onMovieClick={handleMovieClick}
          onMovieHover={handleMovieHover}
          onMovieLeave={handleMovieLeave}
        />
        <MovieRow 
          title="Popular on Netflix" 
          movies={movies.popular} 
          onMovieClick={handleMovieClick}
          onMovieHover={handleMovieHover}
          onMovieLeave={handleMovieLeave}
        />
        <MovieRow 
          title="New Releases" 
          movies={movies.newReleases} 
          onMovieClick={handleMovieClick}
          onMovieHover={handleMovieHover}
          onMovieLeave={handleMovieLeave}
        />
        <MovieRow 
          title="Action Movies" 
          movies={movies.action} 
          onMovieClick={handleMovieClick}
          onMovieHover={handleMovieHover}
          onMovieLeave={handleMovieLeave}
        />
        <MovieRow 
          title="Comedy Movies" 
          movies={movies.comedy} 
          onMovieClick={handleMovieClick}
          onMovieHover={handleMovieHover}
          onMovieLeave={handleMovieLeave}
        />
      </div>

      {/* Preview Modal */}
      {isPreviewPlaying && selectedMovie && !showModal && (
        <div className="fixed bottom-0 right-0 mb-24 mr-8 w-80 aspect-video rounded-lg overflow-hidden shadow-2xl z-50 preview-modal">
          <img
            src={selectedMovie.thumbnail}
            alt={selectedMovie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <div className="absolute bottom-4 left-4">
              <h3 className="text-lg font-bold mb-2">{selectedMovie.title}</h3>
              <button 
                onClick={() => handleMovieClick(selectedMovie)}
                className="netflix-button bg-white text-black px-4 py-1 rounded-md flex items-center space-x-2 hover:bg-white/90"
              >
                <Play className="w-4 h-4" fill="black" />
                <span>Play</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <Suspense fallback={null}>
        {showModal && selectedMovie && (
          <VideoModal
            movie={selectedMovie}
            onClose={() => setShowModal(false)}
          />
        )}
      </Suspense>
    </div>
  );
}

export default App;