import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Clock, MapPin, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SeatMap from '@/components/SeatMap';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import moviesData from '@/data/movies.json';
import theatresData from '@/data/theatres.json';

const SeatBooking = () => {
  const { movieId, showId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  
  const showTime = searchParams.get('time');
  const movie = moviesData.find(m => m.id === movieId);
  
  // Find the specific screen/show
  const theatre = theatresData.find(t => 
    t.screens.some(s => s.screenId === showId)
  );
  const screen = theatre?.screens.find(s => s.screenId === showId);

  if (!movie || !theatre || !screen) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground">Booking not found</h1>
          <Button onClick={() => navigate('/')} className="mt-4">
            Go back to home
          </Button>
        </div>
      </div>
    );
  }

  const handleSeatSelect = (seats: string[]) => {
    setSelectedSeats(seats);
  };

  const handleProceedToPayment = () => {
    const bookingData = {
      movieId,
      movieTitle: movie.title,
      theatre: theatre.name,
      screen: screen.screenName,
      showTime,
      selectedSeats,
      price: screen.price,
      totalAmount: selectedSeats.length * screen.price
    };
    
    // Store booking data in localStorage for the payment page
    localStorage.setItem('bookingData', JSON.stringify(bookingData));
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <div className="border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(`/movie/${movieId}`)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Movie
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {movie.title}
              </h1>
              <div className="flex flex-col md:flex-row md:items-center md:space-x-6 text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {theatre.name}, {theatre.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Today
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {showTime}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Seat Map */}
          <div className="lg:col-span-2">
            <Card className="gradient-card">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6 text-center">
                  Select Your Seats
                </h2>
                <SeatMap
                  rows={screen.seatLayout.rows}
                  seatsPerRow={screen.seatLayout.seatsPerRow}
                  bookedSeats={screen.seatLayout.bookedSeats}
                  onSeatSelect={handleSeatSelect}
                />
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="gradient-card sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Movie</span>
                    <span className="font-medium">{movie.title}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Theatre</span>
                    <span className="font-medium">{theatre.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Screen</span>
                    <span className="font-medium">{screen.screenName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Show Time</span>
                    <span className="font-medium">{showTime}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Selected Seats</span>
                    <span className="font-medium">
                      {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Price per ticket</span>
                    <span className="font-medium">₹{screen.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Number of tickets</span>
                    <span className="font-medium">{selectedSeats.length}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between text-lg font-semibold mb-6">
                  <span>Total Amount</span>
                  <span className="text-primary">
                    ₹{selectedSeats.length * screen.price}
                  </span>
                </div>

                <Button
                  className="w-full gradient-hero shadow-cinema"
                  disabled={selectedSeats.length === 0}
                  onClick={handleProceedToPayment}
                >
                  Proceed to Payment
                </Button>

                {selectedSeats.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center mt-2">
                    Please select at least one seat
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatBooking;