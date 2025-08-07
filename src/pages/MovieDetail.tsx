import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Star, Clock, Calendar, MapPin, Play, Share, Heart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import moviesData from '@/data/movies.json';
import theatresData from '@/data/theatres.json';

const MovieDetail = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState('2024-08-07');
  
  const movie = moviesData.find(m => m.id === id);
  const movieTheatres = theatresData.filter(theatre => 
    theatre.screens.some(screen => screen.movieId === id)
  );

  if (!movie) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground">Movie not found</h1>
          <Link to="/" className="text-primary hover:underline">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  const dates = [
    { date: '2024-08-07', day: 'Today' },
    { date: '2024-08-08', day: 'Tomorrow' },
    { date: '2024-08-09', day: 'Fri' },
    { date: '2024-08-10', day: 'Sat' },
    { date: '2024-08-11', day: 'Sun' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px]">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-8">
              {/* Movie Poster */}
              <div className="w-48 h-72 rounded-xl overflow-hidden shadow-cinema flex-shrink-0">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Movie Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                    {movie.title}
                  </h1>
                  <div className="flex items-center space-x-4 mb-4">
                    <Badge className="bg-primary text-white border-none text-lg px-3 py-1">
                      <Star className="h-4 w-4 mr-1 fill-current" />
                      {movie.rating}
                    </Badge>
                    <div className="flex space-x-2">
                      {movie.genre.map((genre) => (
                        <Badge key={genre} variant="outline" className="border-foreground/30">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {movie.duration}
                    </div>
                    <div>{movie.language}</div>
                    <div>{movie.releaseDate}</div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button className="gradient-hero shadow-cinema px-8 py-3 text-lg font-semibold">
                    Book Tickets
                  </Button>
                  <Button variant="outline" className="px-6 py-3">
                    <Play className="h-5 w-5 mr-2" />
                    Trailer
                  </Button>
                  <Button variant="ghost" size="lg">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="lg">
                    <Share className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="showtimes" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3 mb-8">
            <TabsTrigger value="showtimes">Book Tickets</TabsTrigger>
            <TabsTrigger value="about">About Movie</TabsTrigger>
            <TabsTrigger value="cast">Cast & Crew</TabsTrigger>
          </TabsList>

          <TabsContent value="showtimes" className="space-y-6">
            {/* Date Selection */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {dates.map((date) => (
                <Button
                  key={date.date}
                  variant={selectedDate === date.date ? "default" : "outline"}
                  className={`min-w-24 flex-col py-3 ${
                    selectedDate === date.date ? 'gradient-hero' : ''
                  }`}
                  onClick={() => setSelectedDate(date.date)}
                >
                  <span className="text-sm">{date.day}</span>
                  <span className="text-xs opacity-70">
                    {new Date(date.date).getDate()}
                  </span>
                </Button>
              ))}
            </div>

            {/* Theatres and Showtimes */}
            <div className="space-y-6">
              {movieTheatres.map((theatre) => (
                <Card key={theatre.id} className="gradient-card">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">
                          {theatre.name}
                        </h3>
                        <p className="text-muted-foreground flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {theatre.location}
                        </p>
                      </div>
                    </div>

                    {theatre.screens
                      .filter(screen => screen.movieId === id)
                      .map((screen) => (
                        <div key={screen.screenId} className="mb-4 last:mb-0">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-foreground">
                              {screen.screenName}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              ₹{screen.price}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {screen.showtimes.map((time) => (
                              <Link
                                key={time}
                                to={`/book/${movie.id}/${screen.screenId}?time=${time}`}
                              >
                                <Button
                                  variant="outline"
                                  className="hover:bg-primary hover:text-white transition-smooth"
                                >
                                  {time}
                                </Button>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="about" className="space-y-6">
            <Card className="gradient-card">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">About the movie</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {movie.description}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cast" className="space-y-6">
            <Card className="gradient-card">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Cast</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {movie.cast.map((actor) => (
                    <div key={actor} className="text-center">
                      <div className="w-20 h-20 bg-secondary rounded-full mx-auto mb-2" />
                      <p className="text-sm font-medium">{actor}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Director</h4>
                  <p className="text-muted-foreground">{movie.director}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MovieDetail;