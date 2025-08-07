import { useState } from 'react';
import { Monitor } from 'lucide-react';

interface SeatMapProps {
  rows: number;
  seatsPerRow: number;
  bookedSeats: string[];
  onSeatSelect: (selectedSeats: string[]) => void;
}

const SeatMap = ({ rows, seatsPerRow, bookedSeats, onSeatSelect }: SeatMapProps) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const getSeatId = (row: number, seat: number) => {
    const rowLabel = String.fromCharCode(65 + row); // A, B, C, etc.
    return `${rowLabel}${seat + 1}`;
  };

  const handleSeatClick = (seatId: string) => {
    if (bookedSeats.includes(seatId)) return;

    let newSelectedSeats;
    if (selectedSeats.includes(seatId)) {
      newSelectedSeats = selectedSeats.filter(id => id !== seatId);
    } else {
      newSelectedSeats = [...selectedSeats, seatId];
    }
    
    setSelectedSeats(newSelectedSeats);
    onSeatSelect(newSelectedSeats);
  };

  const getSeatStatus = (seatId: string) => {
    if (bookedSeats.includes(seatId)) return 'booked';
    if (selectedSeats.includes(seatId)) return 'selected';
    return 'available';
  };

  const getSeatClassName = (status: string) => {
    const baseClasses = 'seat';
    switch (status) {
      case 'available':
        return `${baseClasses} seat-available`;
      case 'selected':
        return `${baseClasses} seat-selected`;
      case 'booked':
        return `${baseClasses} seat-booked`;
      default:
        return baseClasses;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Screen */}
      <div className="mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 rounded-t-full px-8 py-3 text-center">
            <Monitor className="h-6 w-6 mx-auto mb-2 text-primary" />
            <span className="text-sm font-medium text-primary">SCREEN</span>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>

      {/* Seats */}
      <div className="space-y-3">
        {Array.from({ length: rows }, (_, rowIndex) => (
          <div key={rowIndex} className="flex items-center justify-center space-x-2">
            {/* Row Label */}
            <div className="w-6 text-center font-medium text-muted-foreground">
              {String.fromCharCode(65 + rowIndex)}
            </div>

            {/* Seats */}
            <div className="flex space-x-1">
              {Array.from({ length: seatsPerRow }, (_, seatIndex) => {
                const seatId = getSeatId(rowIndex, seatIndex);
                const status = getSeatStatus(seatId);
                
                return (
                  <button
                    key={seatIndex}
                    className={getSeatClassName(status)}
                    onClick={() => handleSeatClick(seatId)}
                    disabled={status === 'booked'}
                    title={`${seatId} - ${status}`}
                  >
                    <span className="sr-only">{seatId}</span>
                  </button>
                );
              })}
            </div>

            {/* Row Label (Right) */}
            <div className="w-6 text-center font-medium text-muted-foreground">
              {String.fromCharCode(65 + rowIndex)}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-8 flex justify-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="seat seat-available" />
          <span className="text-sm text-muted-foreground">Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="seat seat-selected" />
          <span className="text-sm text-muted-foreground">Selected</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="seat seat-booked" />
          <span className="text-sm text-muted-foreground">Booked</span>
        </div>
      </div>
    </div>
  );
};

export default SeatMap;