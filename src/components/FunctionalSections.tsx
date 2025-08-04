import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Heart, MessageCircle, Users, Gamepad2, Calendar, Compass, Globe, Newspaper, Search, Plus, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

// Functional Discover Section
export const FunctionalDiscoverSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filters = ['all', 'nearby', 'online', 'events', 'cultures'];
  const discoveries = [
    { id: 1, name: 'Sakura Festival', type: 'event', culture: 'Japanese', distance: '2.3km' },
    { id: 2, name: 'Maria Santos', type: 'person', culture: 'Spanish', compatibility: '94%' },
    { id: 3, name: 'Bollywood Dance Class', type: 'activity', culture: 'Indian', time: 'Tonight 7PM' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Discover cultures, people, events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <Button className="rounded-2xl px-6">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex gap-2 overflow-x-auto">
        {filters.map(filter => (
          <Button
            key={filter}
            variant={activeFilter === filter ? 'default' : 'outline'}
            onClick={() => setActiveFilter(filter)}
            className="rounded-full capitalize whitespace-nowrap"
          >
            {filter}
          </Button>
        ))}
      </div>
      
      <div className="grid gap-4">
        {discoveries.map(item => (
          <Card key={item.id} className="p-4 hover:shadow-lg transition-all cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.culture} • {item.distance || item.compatibility || item.time}</p>
              </div>
              <Badge>{item.type}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Functional Matches Section
export const FunctionalMatchesSection: React.FC = () => {
  const [matches, setMatches] = useState([
    { id: 1, name: 'Elena Rodriguez', culture: 'Mexican', compatibility: 96, isLiked: false },
    { id: 2, name: 'Yuki Tanaka', culture: 'Japanese', compatibility: 89, isLiked: true },
    { id: 3, name: 'Ahmed Hassan', culture: 'Egyptian', compatibility: 92, isLiked: false }
  ]);

  const handleLike = (id: number) => {
    setMatches(prev => prev.map(match => 
      match.id === id ? { ...match, isLiked: !match.isLiked } : match
    ));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">💕 Your Matches</h2>
        <p className="text-gray-600">People who share your cultural interests</p>
      </div>
      
      <div className="grid gap-6">
        {matches.map(match => (
          <Card key={match.id} className="p-6 hover:shadow-lg transition-all">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <img src="/placeholder.svg" alt={match.name} />
              </Avatar>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{match.name}</h3>
                <p className="text-gray-600">{match.culture} Culture</p>
                <p className="text-sm text-purple-600">{match.compatibility}% compatibility</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleLike(match.id)}
                  className={cn(
                    'rounded-full',
                    match.isLiked && 'bg-red-50 text-red-600 border-red-200'
                  )}
                >
                  <Heart className={cn('h-4 w-4', match.isLiked && 'fill-current')} />
                </Button>
                <Button size="sm" className="rounded-full">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Functional Games Section
export const FunctionalGamesSection: React.FC = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  
  const games = [
    { id: 'trivia', name: 'Culture Trivia', players: 1247, emoji: '🧠' },
    { id: 'match', name: 'Culture Match', players: 892, emoji: '🎯' },
    { id: 'explore', name: 'World Explorer', players: 2156, emoji: '🗺️' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">🎮 Cultural Games</h2>
        <p className="text-gray-600">Learn and play with people worldwide</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {games.map(game => (
          <Card 
            key={game.id} 
            className={cn(
              'p-6 cursor-pointer transition-all hover:shadow-lg',
              activeGame === game.id && 'ring-2 ring-purple-500'
            )}
            onClick={() => setActiveGame(game.id)}
          >
            <div className="text-center">
              <div className="text-4xl mb-3">{game.emoji}</div>
              <h3 className="font-bold text-lg mb-2">{game.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{game.players} players online</p>
              <Button className="w-full rounded-2xl">
                Play Now
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Functional Events Section
export const FunctionalEventsSection: React.FC = () => {
  const [registeredEvents, setRegisteredEvents] = useState<Set<number>>(new Set());
  
  const events = [
    { id: 1, name: 'Diwali Celebration', date: 'Nov 15', location: 'Central Park', attendees: 234 },
    { id: 2, name: 'Salsa Night', date: 'Nov 18', location: 'Dance Studio', attendees: 67 },
    { id: 3, name: 'Sushi Making Class', date: 'Nov 20', location: 'Cooking School', attendees: 45 }
  ];

  const handleRegister = (eventId: number) => {
    setRegisteredEvents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">📅 Cultural Events</h2>
        <Button className="rounded-2xl">
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>
      
      <div className="grid gap-4">
        {events.map(event => (
          <Card key={event.id} className="p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">{event.name}</h3>
                <p className="text-gray-600">{event.date} • {event.location}</p>
                <p className="text-sm text-purple-600">{event.attendees} attending</p>
              </div>
              <Button
                onClick={() => handleRegister(event.id)}
                variant={registeredEvents.has(event.id) ? 'default' : 'outline'}
                className="rounded-2xl"
              >
                {registeredEvents.has(event.id) ? 'Registered' : 'Join Event'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};