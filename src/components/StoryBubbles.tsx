import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Plus, Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Story {
  id: number;
  user: string;
  avatar: string;
  hasStory: boolean;
  isViewed: boolean;
  timestamp: string;
}

const StoryBubbles: React.FC = () => {
  const [stories] = useState<Story[]>([
    {
      id: 0,
      user: 'Your Story',
      avatar: '/placeholder.svg',
      hasStory: false,
      isViewed: false,
      timestamp: ''
    },
    {
      id: 1,
      user: 'Sarah',
      avatar: '/placeholder.svg',
      hasStory: true,
      isViewed: false,
      timestamp: '2h ago'
    },
    {
      id: 2,
      user: 'Marcus',
      avatar: '/placeholder.svg',
      hasStory: true,
      isViewed: true,
      timestamp: '4h ago'
    },
    {
      id: 3,
      user: 'Elena',
      avatar: '/placeholder.svg',
      hasStory: true,
      isViewed: false,
      timestamp: '6h ago'
    },
    {
      id: 4,
      user: 'Alex',
      avatar: '/placeholder.svg',
      hasStory: true,
      isViewed: true,
      timestamp: '8h ago'
    },
    {
      id: 5,
      user: 'Maya',
      avatar: '/placeholder.svg',
      hasStory: true,
      isViewed: false,
      timestamp: '12h ago'
    }
  ]);

  const getStoryRing = (story: Story) => {
    if (story.id === 0) {
      return 'ring-2 ring-white/50';
    }
    if (story.hasStory && !story.isViewed) {
      return 'ring-4 ring-gradient-to-r from-purple-400 to-pink-400';
    }
    if (story.hasStory && story.isViewed) {
      return 'ring-2 ring-gray-400';
    }
    return 'ring-2 ring-white/30';
  };

  return (
    <Card className="bg-white/10 backdrop-blur border-white/20 mb-4">
      <CardContent className="p-4">
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
          {stories.map((story) => (
            <div key={story.id} className="flex-shrink-0 text-center">
              <div className="relative">
                <div className={`relative ${getStoryRing(story)} rounded-full p-1`}>
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={story.avatar} />
                    <AvatarFallback className="bg-white/20 text-white">
                      {story.user[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                {story.id === 0 ? (
                  <Button 
                    size="sm" 
                    className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-blue-500 hover:bg-blue-600 p-0"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                ) : story.hasStory && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                    <Play className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              
              <p className="text-white text-xs mt-2 max-w-[70px] truncate">
                {story.user}
              </p>
              
              {story.timestamp && (
                <p className="text-white/50 text-xs">
                  {story.timestamp}
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StoryBubbles;