import { Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Movie {
  id: string;
  title: string;
  poster: string;
  rating: number;
  genre: string[];
  language: string;
  duration: string;
  releaseDate: string;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="group cursor-pointer">
      <Link to={`/movie/${movie.id}`}>
        <div className="movie-card-hover rounded-xl overflow-hidden shadow-card">
          {/* Poster */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Rating Badge */}
            <div className="absolute top-3 right-3">
              <Badge className="bg-black/70 text-white border-none">
                <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                {movie.rating}
              </Badge>
            </div>

            {/* Book Now Button - appears on hover */}
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <Button className="w-full gradient-hero text-white font-semibold shadow-glow">
                Book Now
              </Button>
            </div>
          </div>

          {/* Movie Info */}
          <div className="p-4 gradient-card">
            <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-1">
              {movie.title}
            </h3>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                {movie.duration}
              </div>
              
              <div className="flex flex-wrap gap-1">
                {movie.genre.slice(0, 2).map((g) => (
                  <Badge key={g} variant="secondary" className="text-xs">
                    {g}
                  </Badge>
                ))}
              </div>
              
              <div className="text-sm text-muted-foreground">
                {movie.language}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;