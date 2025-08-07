import { useState } from 'react';
import { Search, MapPin, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location, setLocation] = useState('Mumbai');

  return (
    <nav className="sticky top-0 z-50 gradient-glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary transition-smooth hover:scale-105">
            BookMyShow
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for Movies, Events, Plays, Sports and Activities"
                className="pl-10 bg-secondary/50 border-border/50 focus:bg-secondary"
              />
            </div>
          </div>

          {/* Location & User - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-foreground hover:text-primary">
              <MapPin className="h-4 w-4 mr-2" />
              {location}
            </Button>
            <Button variant="outline" className="border-primary/20 hover:bg-primary/10">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search movies, events..."
                  className="pl-10 bg-secondary/50"
                />
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" className="flex-1">
                  <MapPin className="h-4 w-4 mr-2" />
                  {location}
                </Button>
                <Button variant="outline" className="flex-1">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Category Navigation */}
      <div className="border-t border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-8 h-12 overflow-x-auto">
            <Link to="/movies" className="text-sm font-medium text-primary hover:text-primary/80 whitespace-nowrap">
              Movies
            </Link>
            <Link to="/events" className="text-sm font-medium text-muted-foreground hover:text-foreground whitespace-nowrap">
              Events
            </Link>
            <Link to="/plays" className="text-sm font-medium text-muted-foreground hover:text-foreground whitespace-nowrap">
              Plays
            </Link>
            <Link to="/sports" className="text-sm font-medium text-muted-foreground hover:text-foreground whitespace-nowrap">
              Sports
            </Link>
            <Link to="/activities" className="text-sm font-medium text-muted-foreground hover:text-foreground whitespace-nowrap">
              Activities
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;