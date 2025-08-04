import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Play, Heart, MessageCircle, Share } from 'lucide-react';

interface CultureBubble {
  id: string;
  username: string;
  avatar: string;
  culture: string;
  media: {
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
  };
  caption: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

interface CultureBubblesProps {
  bubbles: CultureBubble[];
  onBubbleClick: (bubble: CultureBubble) => void;
}

const CultureBubbles: React.FC<CultureBubblesProps> = ({ bubbles, onBubbleClick }) => {
  const mockBubbles: CultureBubble[] = [
    {
      id: '1',
      username: 'sakura_tokyo',
      avatar: '/placeholder.svg',
      culture: 'Japanese',
      media: { type: 'video', url: '/placeholder.svg', thumbnail: '/placeholder.svg' },
      caption: 'Traditional tea ceremony in Kyoto 🍵',
      timestamp: '2h',
      likes: 124,
      comments: 18,
      isLiked: false
    },
    {
      id: '2',
      username: 'maria_madrid',
      avatar: '/placeholder.svg',
      culture: 'Spanish',
      media: { type: 'image', url: '/placeholder.svg' },
      caption: 'Flamenco practice session! 💃',
      timestamp: '4h',
      likes: 89,
      comments: 12,
      isLiked: true
    },
    {
      id: '3',
      username: 'ahmed_cairo',
      avatar: '/placeholder.svg',
      culture: 'Egyptian',
      media: { type: 'video', url: '/placeholder.svg', thumbnail: '/placeholder.svg' },
      caption: 'Sunset over the pyramids 🌅',
      timestamp: '6h',
      likes: 203,
      comments: 31,
      isLiked: false
    }
  ];

  const displayBubbles = bubbles.length > 0 ? bubbles : mockBubbles;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Culture Bubbles</h2>
        <Badge variant="secondary" className="bg-purple-100 text-purple-700">
          {displayBubbles.length} active
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayBubbles.map((bubble) => (
          <Card 
            key={bubble.id} 
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={() => onBubbleClick(bubble)}
          >
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                {bubble.media.type === 'video' ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={bubble.media.thumbnail || bubble.media.url} 
                      alt="Video thumbnail"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-full p-3">
                        <Play className="h-6 w-6 text-white fill-white" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <img 
                    src={bubble.media.url} 
                    alt="Culture content"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              
              <div className="absolute top-3 left-3 flex items-center space-x-2">
                <Avatar className="h-8 w-8 border-2 border-white">
                  <img src={bubble.avatar} alt={bubble.username} />
                </Avatar>
                <Badge className="bg-white/90 text-gray-700 text-xs">
                  {bubble.culture}
                </Badge>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm text-gray-900">
                  @{bubble.username}
                </span>
                <span className="text-xs text-gray-500">{bubble.timestamp}</span>
              </div>
              
              <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                {bubble.caption}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className={`flex items-center space-x-1 text-sm ${
                    bubble.isLiked ? 'text-red-500' : 'text-gray-500'
                  }`}>
                    <Heart className={`h-4 w-4 ${bubble.isLiked ? 'fill-current' : ''}`} />
                    <span>{bubble.likes}</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 text-sm text-gray-500">
                    <MessageCircle className="h-4 w-4" />
                    <span>{bubble.comments}</span>
                  </button>
                </div>
                
                <button className="text-gray-500 hover:text-purple-600">
                  <Share className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CultureBubbles;