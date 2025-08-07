import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import moviesData from '@/data/movies.json';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredMovies = moviesData.slice(0, 3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredMovies.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length);
  };

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden rounded-2xl">
      {featuredMovies.map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : 
            index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          {/* Background Image */}
          <div className="relative w-full h-full">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-lg text-white">
                <div className="flex items-center space-x-4 mb-4">
                  <Badge className="bg-primary text-white border-none">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    {movie.rating}
                  </Badge>
                  <div className="flex space-x-2">
                    {movie.genre.slice(0, 2).map((genre) => (
                      <Badge key={genre} variant="outline" className="border-white/30 text-white">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  {movie.title}
                </h1>
                
                <p className="text-lg text-white/90 mb-6 line-clamp-3">
                  {movie.description}
                </p>

                <div className="flex space-x-4">
                  <Button className="gradient-hero shadow-cinema px-8 py-3 text-lg font-semibold">
                    Book Tickets
                  </Button>
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-6 py-3">
                    <Play className="h-5 w-5 mr-2" />
                    Watch Trailer
                  </Button>
                </div>

                <div className="mt-6 text-sm text-white/70">
                  {movie.duration} • {movie.language}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="lg"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 p-3"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="lg"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 p-3"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {featuredMovies.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-primary w-8' : 'bg-white/40'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;