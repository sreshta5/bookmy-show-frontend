import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';

// Dummy events data (replace with API or JSON file as needed)
const eventsData = [
  {
    id: 'event1',
    title: 'Stand-up Comedy Night',
    date: '2025-08-15',
    time: '7:00 PM',
    location: 'City Hall',
    description: 'Enjoy a night of laughter with top comedians.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    price: 499
  },
  {
    id: 'event2',
    title: 'Live Music Concert',
    date: '2025-08-20',
    time: '8:00 PM',
    location: 'Open Air Theatre',
    description: 'Experience electrifying performances by popular bands.',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    price: 799
  },
  {
    id: 'event3',
    title: 'Art & Craft Workshop',
    date: '2025-08-25',
    time: '11:00 AM',
    location: 'Art Gallery',
    description: 'Unleash your creativity in this hands-on workshop.',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    price: 299
  }
];

const Events = () => {
  const [events, setEvents] = useState(eventsData);

  // If fetching from API or file, use useEffect to load events
  // useEffect(() => { ... }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-foreground">Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map(event => (
            <Card key={event.id} className="gradient-card">
              <CardHeader>
                <img src={event.image} alt={event.title} className="rounded-lg w-full h-40 object-cover mb-4" />
                <CardTitle>{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-2 text-muted-foreground text-sm">{event.date} | {event.time}</div>
                <div className="mb-2 font-medium">{event.location}</div>
                <div className="mb-4 text-sm">{event.description}</div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-primary">₹{event.price}</span>
                  <button className="px-4 py-2 rounded bg-primary text-white font-medium hover:bg-primary/90 transition">Book Now</button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
