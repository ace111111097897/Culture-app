import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Users } from 'lucide-react';

interface Highlight {
  id: string;
  type: 'event' | 'story' | 'trending';
  title: string;
  description: string;
  image: string;
  metadata: {
    date?: string;
    location?: string;
    attendees?: number;
    category: string;
  };
}

const HighlightsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [highlights] = useState<Highlight[]>([
    {
      id: '1',
      type: 'event',
      title: 'Global Unity Festival 2024',
      description: 'Experience cultures from 50+ countries in one spectacular event',
      image: '/placeholder.svg',
      metadata: {
        date: 'Dec 15-17',
        location: 'Central Park, NYC',
        attendees: 2500,
        category: 'Festival'
      }
    },
    {
      id: '2',
      type: 'trending',
      title: 'AI Art Revolution',
      description: 'How AI is transforming traditional art forms worldwide',
      image: '/placeholder.svg',
      metadata: {
        category: 'Technology'
      }
    },
    {
      id: '3',
      type: 'story',
      title: 'Maria\'s Journey',
      description: 'From refugee to renowned chef: A story of cultural fusion',
      image: '/placeholder.svg',
      metadata: {
        category: 'Inspiration'
      }
    },
    {
      id: '4',
      type: 'event',
      title: 'Virtual Reality Culture Tour',
      description: 'Explore ancient civilizations through cutting-edge VR',
      image: '/placeholder.svg',
      metadata: {
        date: 'Ongoing',
        location: 'Online',
        attendees: 10000,
        category: 'Virtual'
      }
    }
  ]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % highlights.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + highlights.length) % highlights.length);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'event': return 'bg-blue-500';
      case 'story': return 'bg-purple-500';
      case 'trending': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Highlights
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={prevSlide} className="h-8 w-8 p-0">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={nextSlide} className="h-8 w-8 p-0">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {highlights.map((highlight) => (
            <div key={highlight.id} className="w-full flex-shrink-0">
              <Card className="relative overflow-hidden h-80 group cursor-pointer">
                <div className="absolute inset-0">
                  <img 
                    src={highlight.image} 
                    alt={highlight.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                
                <CardContent className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={`${getTypeColor(highlight.type)} text-white border-0`}>
                      {highlight.type.charAt(0).toUpperCase() + highlight.type.slice(1)}
                    </Badge>
                    <Badge variant="outline" className="border-white/30 text-white">
                      {highlight.metadata.category}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{highlight.title}</h3>
                  <p className="text-white/90 text-sm mb-4">{highlight.description}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-white/80">
                    {highlight.metadata.date && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {highlight.metadata.date}
                      </div>
                    )}
                    {highlight.metadata.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {highlight.metadata.location}
                      </div>
                    )}
                    {highlight.metadata.attendees && (
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {highlight.metadata.attendees.toLocaleString()}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {highlights.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 w-8' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HighlightsCarousel;