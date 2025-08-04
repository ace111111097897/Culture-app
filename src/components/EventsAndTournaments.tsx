import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Calendar, Users, Trophy, Video, Clock, 
  MapPin, Plus, Star, Play, Share
} from 'lucide-react';

interface Event {
  id: number;
  title: string;
  type: 'tournament' | 'meetup' | 'stream';
  date: string;
  time: string;
  participants: number;
  maxParticipants: number;
  prizePool?: string;
  game: string;
  host: {
    name: string;
    avatar: string;
  };
  isLive?: boolean;
  location?: string;
  description: string;
}

interface EventsAndTournamentsProps {
  onJoinEvent: (eventId: number) => void;
  onCreateEvent: () => void;
}

const EventsAndTournaments: React.FC<EventsAndTournamentsProps> = ({ 
  onJoinEvent, 
  onCreateEvent 
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'tournament' | 'meetup' | 'stream'>('all');
  
  const [events] = useState<Event[]>([
    {
      id: 1,
      title: 'Weekly UNO Championship',
      type: 'tournament',
      date: '2024-01-15',
      time: '7:00 PM EST',
      participants: 24,
      maxParticipants: 32,
      prizePool: '$500',
      game: 'UNO',
      host: {
        name: 'GameMaster Pro',
        avatar: '/placeholder.svg'
      },
      description: 'Join our weekly UNO tournament with cash prizes!'
    },
    {
      id: 2,
      title: 'Chess Masters League',
      type: 'tournament',
      date: '2024-01-18',
      time: '6:00 PM EST',
      participants: 16,
      maxParticipants: 64,
      prizePool: '$1000',
      game: 'Chess',
      host: {
        name: 'ChessKing',
        avatar: '/placeholder.svg'
      },
      description: 'Elite chess tournament for advanced players'
    },
    {
      id: 3,
      title: 'Casual Game Night',
      type: 'meetup',
      date: '2024-01-16',
      time: '8:00 PM EST',
      participants: 12,
      maxParticipants: 20,
      game: 'Mixed Games',
      location: 'Virtual Lounge',
      host: {
        name: 'Sarah M.',
        avatar: '/placeholder.svg'
      },
      description: 'Relaxed gaming session with multiple games'
    },
    {
      id: 4,
      title: 'Pro Poker Stream',
      type: 'stream',
      date: '2024-01-14',
      time: 'Live Now',
      participants: 156,
      maxParticipants: 500,
      game: 'Poker',
      isLive: true,
      host: {
        name: 'PokerAce',
        avatar: '/placeholder.svg'
      },
      description: 'Watch and learn from professional poker gameplay'
    }
  ]);

  const filteredEvents = events.filter(event => 
    activeFilter === 'all' || event.type === activeFilter
  );

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'tournament': return <Trophy className="h-4 w-4" />;
      case 'meetup': return <Users className="h-4 w-4" />;
      case 'stream': return <Video className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'tournament': return 'destructive';
      case 'meetup': return 'secondary';
      case 'stream': return 'default';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Events & Tournaments</h2>
          <p className="text-gray-600">Join competitions and community events</p>
        </div>
        <Button onClick={onCreateEvent}>
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'tournament', 'meetup', 'stream'].map(filter => (
          <Button
            key={filter}
            variant={activeFilter === filter ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter(filter as any)}
            className="capitalize"
          >
            {filter === 'all' ? 'All Events' : filter + 's'}
          </Button>
        ))}
      </div>

      {/* Live Events Banner */}
      {events.some(e => e.isLive) && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="font-semibold text-red-700">LIVE NOW</span>
            </div>
            <p className="text-sm text-red-600">
              {events.filter(e => e.isLive).length} live event(s) happening now!
            </p>
          </CardContent>
        </Card>
      )}

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEvents.map(event => (
          <Card key={event.id} className={`hover:shadow-lg transition-shadow ${
            event.isLive ? 'ring-2 ring-red-200' : ''
          }`}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={getEventTypeColor(event.type) as any} className="text-xs">
                      {getEventTypeIcon(event.type)}
                      <span className="ml-1 capitalize">{event.type}</span>
                    </Badge>
                    {event.isLive && (
                      <Badge variant="destructive" className="text-xs animate-pulse">
                        LIVE
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <p className="text-sm text-gray-600">{event.game}</p>
                </div>
                {event.prizePool && (
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-yellow-600">
                      <Trophy className="h-4 w-4" />
                      <span className="font-semibold">{event.prizePool}</span>
                    </div>
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-700">{event.description}</p>
              
              {/* Event Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{event.date}</span>
                  <Clock className="h-4 w-4 ml-2" />
                  <span>{event.time}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{event.participants}/{event.maxParticipants} participants</span>
                </div>
                
                {event.location && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                )}
              </div>

              {/* Host Info */}
              <div className="flex items-center gap-2 pt-2 border-t">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={event.host.avatar} />
                  <AvatarFallback className="text-xs">
                    {event.host.name[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-600">Hosted by {event.host.name}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button 
                  className="flex-1" 
                  size="sm"
                  onClick={() => onJoinEvent(event.id)}
                  disabled={event.participants >= event.maxParticipants}
                >
                  {event.type === 'stream' ? (
                    <><Play className="h-4 w-4 mr-1" />Watch</>
                  ) : (
                    <><Users className="h-4 w-4 mr-1" />Join</>
                  )}
                </Button>
                <Button size="sm" variant="outline">
                  <Share className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Star className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No events found</h3>
            <p className="text-gray-600 mb-4">Be the first to create an event!</p>
            <Button onClick={onCreateEvent}>
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EventsAndTournaments;