import React, { useState } from 'react';
import { Play, Heart, MessageCircle, Share2, User, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface VideoSharingBoxProps {
  id: string;
  title: string;
  creator: {
    name: string;
    avatar?: string;
    culturalBackground: string;
  };
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  comments: number;
  tags: string[];
  description: string;
  timestamp: string;
}

const VideoSharingBox: React.FC<VideoSharingBoxProps> = ({
  title,
  creator,
  thumbnail,
  duration,
  views,
  likes,
  comments,
  tags,
  description,
  timestamp
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Video Thumbnail */}
      <div className="relative aspect-video bg-gradient-to-br from-teal-100 to-purple-100 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-6xl">
          {thumbnail}
        </div>
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="lg"
            className="rounded-full bg-white/90 text-black hover:bg-white"
            onClick={handlePlay}
          >
            <Play className="h-6 w-6 ml-1" />
          </Button>
        </div>

        {/* Duration Badge */}
        <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">
          {duration}
        </Badge>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Creator Info */}
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={creator.avatar} />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{creator.name}</p>
            <p className="text-xs text-gray-500">{creator.culturalBackground}</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            {timestamp}
          </div>
        </div>

        {/* Video Title */}
        <h3 className="font-semibold text-sm line-clamp-2 leading-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-600 line-clamp-2">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Stats and Actions */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>{views.toLocaleString()} views</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 px-2 ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
              onClick={handleLike}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              <span className="ml-1 text-xs">{likes}</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-500">
              <MessageCircle className="h-4 w-4" />
              <span className="ml-1 text-xs">{comments}</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-500">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoSharingBox;