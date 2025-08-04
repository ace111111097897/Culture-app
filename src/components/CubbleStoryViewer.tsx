import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  X, Heart, MessageCircle, Share2, Clock, 
  Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight 
} from 'lucide-react';

interface CubbleStory {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: {
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
  };
  caption?: string;
  timestamp: Date;
  expiresAt: Date;
  likes: number;
  comments: number;
  culturalTags: string[];
}

interface CubbleStoryViewerProps {
  stories: CubbleStory[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const CubbleStoryViewer: React.FC<CubbleStoryViewerProps> = ({
  stories,
  currentIndex,
  onClose,
  onNext,
  onPrevious
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('');

  const currentStory = stories[currentIndex];

  useEffect(() => {
    if (!currentStory) return;

    const updateTimeRemaining = () => {
      const now = new Date();
      const expires = new Date(currentStory.expiresAt);
      const diff = expires.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeRemaining('Expired');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeRemaining(`${hours}h ${minutes}m left`);
    };

    updateTimeRemaining();
    const interval = setInterval(updateTimeRemaining, 60000);

    return () => clearInterval(interval);
  }, [currentStory]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentStory?.content.type === 'image') {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            onNext();
            return 0;
          }
          return prev + 2;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentStory, onNext]);

  if (!currentStory) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Progress Bar */}
      <div className="absolute top-4 left-4 right-4 flex gap-1 z-10">
        {stories.map((_, index) => (
          <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-100"
              style={{ 
                width: index < currentIndex ? '100%' : 
                       index === currentIndex ? `${progress}%` : '0%' 
              }}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-8 left-4 right-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
            <img 
              src={currentStory.avatar} 
              alt={currentStory.username}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-white font-semibold">{currentStory.username}</p>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <Clock className="w-3 h-3" />
              <span>{timeRemaining}</span>
            </div>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose}
          className="text-white hover:bg-white/20"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Navigation */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
        disabled={currentIndex === 0}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
        disabled={currentIndex === stories.length - 1}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Content */}
      <div className="w-full h-full flex items-center justify-center">
        {currentStory.content.type === 'image' ? (
          <img 
            src={currentStory.content.url}
            alt="Cubble story"
            className="max-w-full max-h-full object-contain"
            onClick={() => setIsPlaying(!isPlaying)}
          />
        ) : (
          <div className="relative">
            <video 
              src={currentStory.content.url}
              className="max-w-full max-h-full object-contain"
              autoPlay={isPlaying}
              muted={isMuted}
              loop
              onClick={() => setIsPlaying(!isPlaying)}
            />
            <div className="absolute bottom-4 right-4 flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white hover:bg-white/20"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMuted(!isMuted)}
                className="text-white hover:bg-white/20"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        {/* Caption */}
        {currentStory.caption && (
          <p className="text-white mb-3 text-center">{currentStory.caption}</p>
        )}

        {/* Cultural Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {currentStory.culturalTags.map((tag) => (
            <Badge key={tag} className="bg-white/20 text-white border-white/30">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-6">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            <Heart className="w-5 h-5 mr-1" />
            {currentStory.likes}
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            <MessageCircle className="w-5 h-5 mr-1" />
            {currentStory.comments}
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CubbleStoryViewer;