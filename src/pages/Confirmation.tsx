import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Download, Share, Calendar, MapPin, Clock, Ticket } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface ConfirmationData {
  movieId: string;
  movieTitle: string;
  theatre: string;
  screen: string;
  showTime: string;
  selectedSeats: string[];
  price: number;
  totalAmount: number;
  bookingId: string;
  paymentMethod: string;
  bookingDate: string;
  status: string;
}

const Confirmation = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [confirmationData, setConfirmationData] = useState<ConfirmationData | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('confirmationData');
    if (data) {
      const parsedData = JSON.parse(data);
      if (parsedData.bookingId === bookingId) {
        setConfirmationData(parsedData);
      } else {
        navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [bookingId, navigate]);

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF ticket
    alert('Download functionality would be implemented here');
  };

  const handleShare = () => {
    // In a real app, this would open share options
    if (navigator.share) {
      navigator.share({
        title: 'Movie Ticket Booking',
        text: `I just booked tickets for ${confirmationData?.movieTitle}!`,
        url: window.location.href,
      });
    } else {
      alert('Share functionality would be implemented here');
    }
  };

  if (!confirmationData) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground">Loading...</h1>
        </div>
      </div>
    );
  }

  const bookingDate = new Date(confirmationData.bookingDate);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-muted-foreground">
              Your tickets have been booked successfully
            </p>
          </div>

          {/* Ticket Card */}
          <Card className="gradient-card shadow-cinema mb-6">
            <CardHeader className="text-center border-b border-border/50">
              <CardTitle className="flex items-center justify-center text-primary">
                <Ticket className="h-6 w-6 mr-2" />
                E-Ticket
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {/* Booking ID */}
              <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground mb-1">Booking ID</p>
                <p className="text-2xl font-bold text-primary font-mono">
                  {confirmationData.bookingId}
                </p>
              </div>

              <Separator className="mb-6" />

              {/* Movie Details */}
              <div className="space-y-4 mb-6">
                <div className="text-center">
                  <h2 className="text-xl font-bold text-foreground mb-2">
                    {confirmationData.movieTitle}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <Calendar className="h-5 w-5 text-primary mb-2" />
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-semibold">Today</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Clock className="h-5 w-5 text-primary mb-2" />
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-semibold">{confirmationData.showTime}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <MapPin className="h-5 w-5 text-primary mb-2" />
                    <p className="text-sm text-muted-foreground">Theatre</p>
                    <p className="font-semibold">{confirmationData.theatre}</p>
                  </div>
                </div>
              </div>

              <Separator className="mb-6" />

              {/* Booking Details */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Screen</span>
                  <span className="font-medium">{confirmationData.screen}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Seats</span>
                  <span className="font-medium">{confirmationData.selectedSeats.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Number of Tickets</span>
                  <span className="font-medium">{confirmationData.selectedSeats.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Amount</span>
                  <span className="font-medium text-primary">₹{confirmationData.totalAmount + 20}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Method</span>
                  <span className="font-medium capitalize">{confirmationData.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Booking Date</span>
                  <span className="font-medium">
                    {bookingDate.toLocaleDateString()} {bookingDate.toLocaleTimeString()}
                  </span>
                </div>
              </div>

              {/* QR Code Placeholder */}
              <div className="text-center mb-6">
                <div className="inline-block p-4 bg-white rounded-lg">
                  <div className="w-32 h-32 bg-black flex items-center justify-center text-white text-xs">
                    QR CODE
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Show this QR code at the theatre entrance
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button 
              className="flex-1 gradient-hero shadow-cinema"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Ticket
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={handleShare}
            >
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          {/* Important Note */}
          <Card className="bg-yellow-500/10 border-yellow-500/20">
            <CardContent className="p-4">
              <h3 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">
                Important Information
              </h3>
              <ul className="text-sm text-yellow-600 dark:text-yellow-300 space-y-1">
                <li>• Please arrive 30 minutes before showtime</li>
                <li>• Carry a valid ID proof</li>
                <li>• Show this ticket at the theatre entrance</li>
                <li>• No outside food or beverages allowed</li>
              </ul>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="text-center mt-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-primary hover:text-primary/80"
            >
              Book Another Movie
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;