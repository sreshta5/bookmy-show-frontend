import Navbar from '@/components/Navbar';
import HeroCarousel from '@/components/HeroCarousel';
import MovieCard from '@/components/MovieCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, Film, Calendar, Zap, Users } from 'lucide-react';
import moviesData from '@/data/movies.json';

const Index = () => {
  const nowShowingMovies = moviesData.slice(0, 4);
  const comingSoonMovies = moviesData.slice(2, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8">
        <HeroCarousel />
      </section>

      {/* Quick Access Cards */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="gradient-card rounded-xl p-6 text-center group cursor-pointer transition-smooth hover:scale-105">
            <Film className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-foreground">Movies</h3>
            <p className="text-sm text-muted-foreground">Book tickets</p>
          </div>
          <div className="gradient-card rounded-xl p-6 text-center group cursor-pointer transition-smooth hover:scale-105">
            <Calendar className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-foreground">Events</h3>
            <p className="text-sm text-muted-foreground">Live shows</p>
          </div>
          <div className="gradient-card rounded-xl p-6 text-center group cursor-pointer transition-smooth hover:scale-105">
            <Zap className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-foreground">Sports</h3>
            <p className="text-sm text-muted-foreground">Live matches</p>
          </div>
          <div className="gradient-card rounded-xl p-6 text-center group cursor-pointer transition-smooth hover:scale-105">
            <Users className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-foreground">Activities</h3>
            <p className="text-sm text-muted-foreground">Fun experiences</p>
          </div>
        </div>
      </section>

      {/* Now Showing Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-foreground">Now Showing</h2>
          <Button variant="ghost" className="text-primary hover:text-primary/80">
            View All
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {nowShowingMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-foreground">Coming Soon</h2>
          <Button variant="ghost" className="text-primary hover:text-primary/80">
            View All
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {comingSoonMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 BookMyShow Clone. Built with React & Tailwind CSS.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
