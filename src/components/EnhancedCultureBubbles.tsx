import React, { useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Heart, MessageCircle, Share, Plus, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  isTrending?: boolean;
}

interface EnhancedCultureBubblesProps {
  bubbles?: CultureBubble[];
  onBubbleClick?: (bubble: CultureBubble) => void;
  onCreateStory?: () => void;
}

const EnhancedCultureBubbles: React.FC<EnhancedCultureBubblesProps> = ({ 
  bubbles = [], 
  onBubbleClick = () => {},
  onCreateStory = () => {}
}) => {
  const [likedBubbles, setLikedBubbles] = useState<Set<string>>(new Set());

  const mockBubbles: CultureBubble[] = [
    {
      id: '1',
      username: 'sakura_tokyo',
      avatar: '/placeholder.svg',
      culture: 'Japanese',
      media: { type: 'video', url: '/placeholder.svg', thumbnail: '/placeholder.svg' },
      caption: 'Traditional tea ceremony in Kyoto 🍵 #JapaneseCulture',
      timestamp: '2h',
      likes: 1240,
      comments: 89,
      isLiked: false,
      isTrending: true
    },
    {
      id: '2',
      username: 'maria_madrid',
      avatar: '/placeholder.svg',
      culture: 'Spanish',
      media: { type: 'image', url: '/placeholder.svg' },
      caption: 'Flamenco practice session! 💃 #SpanishTradition',
      timestamp: '4h',
      likes: 892,
      comments: 45,
      isLiked: true,
      isTrending: true
    },
    {
      id: '3',
      username: 'ahmed_cairo',
      avatar: '/placeholder.svg',
      culture: 'Egyptian',
      media: { type: 'video', url: '/placeholder.svg', thumbnail: '/placeholder.svg' },
      caption: 'Sunset over the pyramids 🌅 Ancient beauty never fades',
      timestamp: '6h',
      likes: 2034,
      comments: 156,
      isLiked: false,
      isTrending: true
    },
    {
      id: '4',
      username: 'priya_mumbai',
      avatar: '/placeholder.svg',
      culture: 'Indian',
      media: { type: 'image', url: '/placeholder.svg' },
      caption: 'Holi festival preparations! 🌈 Colors of joy',
      timestamp: '8h',
      likes: 567,
      comments: 23,
      isLiked: false
    }
  ];

  const displayBubbles = bubbles.length > 0 ? bubbles : mockBubbles;

  const handleLike = (bubbleId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedBubbles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(bubbleId)) {
        newSet.delete(bubbleId);
      } else {
        newSet.add(bubbleId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            ✨ Culture Stories
          </h1>
          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white animate-pulse">
            <Flame className="h-3 w-3 mr-1" />
            TRENDING
          </Badge>
        </div>
        <Button 
          onClick={onCreateStory}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full px-6 py-3 shadow-lg transition-all duration-300 hover:scale-105"
        >
          <Plus className="h-4 w-4 mr-2" />
          Share Your Story
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayBubbles.map((bubble) => {
          const isLiked = likedBubbles.has(bubble.id) || bubble.isLiked;
          return (
            <Card 
              key={bubble.id} 
              className={cn(
                'overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl group',
                bubble.isTrending && 'ring-2 ring-orange-400 ring-opacity-50 shadow-lg'
              )}
              onClick={() => onBubbleClick(bubble)}
            >
              <div className="relative">
                <div className="aspect-[4/5] bg-gradient-to-br from-purple-100 to-pink-100 overflow-hidden">
                  {bubble.media.type === 'video' ? (
                    <div className="relative w-full h-full">
                      <img 
                        src={bubble.media.thumbnail || bubble.media.url} 
                        alt="Video thumbnail"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/60 rounded-full p-4 group-hover:bg-black/80 transition-colors">
                          <Play className="h-8 w-8 text-white fill-white" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img 
                      src={bubble.media.url} 
                      alt="Culture content"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                </div>
                
                {bubble.isTrending && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white animate-pulse">
                      <Flame className="h-3 w-3 mr-1" />
                      HOT
                    </Badge>
                  </div>
                )}
                
                <div className="absolute top-3 left-3 flex items-center space-x-2">
                  <Avatar className="h-10 w-10 border-2 border-white shadow-lg">
                    <img src={bubble.avatar} alt={bubble.username} className="object-cover" />
                  </Avatar>
                  <Badge className="bg-white/95 text-gray-700 text-xs font-medium shadow-sm">
                    {bubble.culture}
                  </Badge>
                </div>
              </div>
              
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-gray-900">
                    @{bubble.username}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">{bubble.timestamp}</span>
                </div>
                
                <p className="text-sm text-gray-700 line-clamp-2 leading-relaxed">
                  {bubble.caption}
                </p>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={(e) => handleLike(bubble.id, e)}
                      className={cn(
                        'flex items-center space-x-1 text-sm transition-all duration-200 hover:scale-110',
                        isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-400'
                      )}
                    >
                      <Heart className={cn('h-4 w-4', isLiked && 'fill-current animate-pulse')} />
                      <span className="font-medium">{bubble.likes + (likedBubbles.has(bubble.id) ? 1 : 0)}</span>
                    </button>
                    
                    <button 
                      onClick={(e) => { e.stopPropagation(); /* Handle comment */ }}
                      className="flex items-center space-x-1 text-sm text-gray-500 hover:text-purple-600 transition-colors"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span className="font-medium">{bubble.comments}</span>
                    </button>
                  </div>
                  
                  <button 
                    onClick={(e) => { e.stopPropagation(); /* Handle share */ }}
                    className="text-gray-500 hover:text-purple-600 transition-colors hover:scale-110"
                  >
                    <Share className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default EnhancedCultureBubbles;