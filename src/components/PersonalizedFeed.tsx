import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal } from 'lucide-react';

interface FeedItem {
  id: string;
  user: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  content: {
    type: 'image' | 'video' | 'text' | 'event';
    media?: string;
    text: string;
    tags: string[];
  };
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
  timestamp: string;
}

const PersonalizedFeed: React.FC = () => {
  const [feedItems] = useState<FeedItem[]>([
    {
      id: '1',
      user: {
        name: 'Maya Chen',
        avatar: '/placeholder.svg',
        verified: true
      },
      content: {
        type: 'image',
        media: '/placeholder.svg',
        text: 'Exploring the vibrant street art scene in Tokyo! The fusion of traditional and modern culture here is absolutely breathtaking. 🎨✨',
        tags: ['Tokyo', 'StreetArt', 'Culture', 'Japan']
      },
      engagement: {
        likes: 234,
        comments: 45,
        shares: 12
      },
      timestamp: '2h ago'
    },
    {
      id: '2',
      user: {
        name: 'Alex Rodriguez',
        avatar: '/placeholder.svg',
        verified: false
      },
      content: {
        type: 'event',
        text: 'Join me at the International Food Festival this weekend! Celebrating flavors from around the world 🌍🍜',
        tags: ['FoodFestival', 'Community', 'International']
      },
      engagement: {
        likes: 89,
        comments: 23,
        shares: 8
      },
      timestamp: '4h ago'
    }
  ]);

  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());

  const handleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleSave = (postId: string) => {
    setSavedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-6">
      {/* AI Recommendation Banner */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-200/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <div>
              <p className="text-sm font-medium">Kandi's Recommendation</p>
              <p className="text-xs text-gray-600">Based on your interests in Japanese culture and art</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feed Items */}
      {feedItems.map((item) => (
        <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardContent className="p-0">
            {/* Header */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={item.user.avatar} />
                  <AvatarFallback>{item.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{item.user.name}</span>
                    {item.user.verified && (
                      <Badge variant="secondary" className="h-4 px-1 text-xs">✓</Badge>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{item.timestamp}</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="px-4 pb-3">
              <p className="text-sm mb-3">{item.content.text}</p>
              <div className="flex flex-wrap gap-1">
                {item.content.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Media */}
            {item.content.media && (
              <div className="aspect-video bg-gray-100">
                <img 
                  src={item.content.media} 
                  alt="Post content" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Actions */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleLike(item.id)}
                  className={`gap-2 ${likedPosts.has(item.id) ? 'text-red-500' : ''}`}
                >
                  <Heart className={`h-4 w-4 ${likedPosts.has(item.id) ? 'fill-current' : ''}`} />
                  {item.engagement.likes + (likedPosts.has(item.id) ? 1 : 0)}
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <MessageCircle className="h-4 w-4" />
                  {item.engagement.comments}
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Share className="h-4 w-4" />
                  {item.engagement.shares}
                </Button>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleSave(item.id)}
                className={savedPosts.has(item.id) ? 'text-blue-500' : ''}
              >
                <Bookmark className={`h-4 w-4 ${savedPosts.has(item.id) ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PersonalizedFeed;