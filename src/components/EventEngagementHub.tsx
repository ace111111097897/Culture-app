import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Users, Clock, Share, Bookmark, Eye } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  category: string;
  isVirtual: boolean;
  hasAR: boolean;
  price: number;
}

const EventEngagementHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [rsvpEvents, setRsvpEvents] = useState<Set<string>>(new Set());
  const [savedEvents, setSavedEvents] = useState<Set<string>>(new Set());

  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'Japanese Tea Ceremony Workshop',
      description: 'Learn the ancient art of Japanese tea ceremony with master Tanaka-san',
      image: '/placeholder.svg',
      date: '2024-01-15',
      time: '14:00',
      location: 'Cultural Center, Tokyo',
      attendees: 45,
      maxAttendees: 60,
      category: 'Workshop',
      isVirtual: false,
      hasAR: true,
      price: 0
    },
    {
      id: '2',
      title: 'Global Music Fusion Concert',
      description: 'Experience the blend of traditional and modern music from around the world',
      image: '/placeholder.svg',
      date: '2024-01-20',
      time: '19:30',
      location: 'Virtual Reality Space',
      attendees: 1250,
      maxAttendees: 2000,
      category: 'Concert',
      isVirtual: true,
      hasAR: true,
      price: 25
    },
    {
      id: '3',
      title: 'Street Art Walking Tour',
      description: 'Discover hidden murals and meet local artists in the vibrant arts district',
      image: '/placeholder.svg',
      date: '2024-01-18',
      time: '10:00',
      location: 'Arts District, LA',
      attendees: 28,
      maxAttendees: 30,
      category: 'Tour',
      isVirtual: false,
      hasAR: false,
      price: 15
    }
  ]);

  const handleRSVP = (eventId: string) => {
    setRsvpEvents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  const handleSave = (eventId: string) => {
    setSavedEvents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Event Hub
        </h2>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
          Create Event
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="virtual">Virtual</TabsTrigger>
          <TabsTrigger value="local">Local</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="flex">
                <div className="relative w-48 h-32">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  {event.hasAR && (
                    <Badge className="absolute top-2 left-2 bg-gradient-to-r from-pink-500 to-violet-500">
                      AR Preview
                    </Badge>
                  )}
                </div>
                
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleSave(event.id)}
                        className={savedEvents.has(event.id) ? 'text-blue-500' : ''}
                      >
                        <Bookmark className={`h-4 w-4 ${savedEvents.has(event.id) ? 'fill-current' : ''}`} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {event.attendees}/{event.maxAttendees}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{event.category}</Badge>
                      {event.isVirtual && <Badge variant="secondary">Virtual</Badge>}
                      {event.price === 0 ? (
                        <Badge className="bg-green-100 text-green-800">Free</Badge>
                      ) : (
                        <Badge variant="outline">${event.price}</Badge>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      {event.hasAR && (
                        <Button variant="outline" size="sm" className="gap-1">
                          <Eye className="h-4 w-4" />
                          AR Preview
                        </Button>
                      )}
                      <Button 
                        onClick={() => handleRSVP(event.id)}
                        className={rsvpEvents.has(event.id) 
                          ? 'bg-green-500 hover:bg-green-600' 
                          : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                        }
                      >
                        {rsvpEvents.has(event.id) ? 'Going ✓' : 'RSVP'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="virtual">
          <div className="text-center py-8">
            <p className="text-gray-500">Virtual events coming soon...</p>
          </div>
        </TabsContent>

        <TabsContent value="local">
          <div className="text-center py-8">
            <p className="text-gray-500">Local events based on your location...</p>
          </div>
        </TabsContent>

        <TabsContent value="saved">
          <div className="text-center py-8">
            <p className="text-gray-500">Your saved events will appear here...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventEngagementHub;