import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  location?: string;
  description?: string;
}

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getEventTypeColor = (title: string) => {
    if (title.toLowerCase().includes('art')) return 'bg-purple-100 text-purple-700';
    if (title.toLowerCase().includes('music')) return 'bg-blue-100 text-blue-700';
    if (title.toLowerCase().includes('food')) return 'bg-orange-100 text-orange-700';
    if (title.toLowerCase().includes('festival')) return 'bg-green-100 text-green-700';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <Card className="mb-4 shadow-lg border-0 bg-white/80 backdrop-blur hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-800 flex-1">{event.title}</h3>
          <Badge className={getEventTypeColor(event.title)}>
            Event
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">{formatDate(event.date)}</span>
          </div>
          
          {event.location && (
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm">{event.location}</span>
            </div>
          )}
        </div>
        
        {event.description && (
          <p className="text-gray-600 text-sm mt-3 leading-relaxed">
            {event.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default EventCard;