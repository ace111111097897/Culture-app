import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Heart, MessageCircle, Users, Sparkles } from 'lucide-react';

interface FakeUser {
  id: string;
  username: string;
  displayName: string;
  interests: string[];
  location: string;
  bio: string;
  avatar: string;
  isOnline: boolean;
}

const FAKE_USERS: FakeUser[] = [
  {
    id: '1',
    username: 'alex_artist',
    displayName: 'Alex Johnson',
    interests: ['Art', 'Travel', 'Photography'],
    location: 'New York, USA',
    bio: 'Digital artist exploring the world one canvas at a time',
    avatar: 'AJ',
    isOnline: true
  },
  {
    id: '2',
    username: 'maria_music',
    displayName: 'Maria Gonzalez',
    interests: ['Music', 'Photography', 'Culture'],
    location: 'Madrid, Spain',
    bio: 'Music lover and photographer capturing life\'s moments',
    avatar: 'MG',
    isOnline: false
  },
  {
    id: '3',
    username: 'sam_tech',
    displayName: 'Sam Lee',
    interests: ['Gaming', 'Technology', 'AI'],
    location: 'Seoul, South Korea',
    bio: 'Tech enthusiast and gaming aficionado',
    avatar: 'SL',
    isOnline: true
  }
];

const FAKE_RESPONSES = [
  "Hey! I noticed we share similar interests!",
  "Your profile looks amazing! Would love to chat.",
  "I saw you're into art too! What's your favorite medium?",
  "Hi there! Have you tried any new recipes lately?",
  "That exhibition sounds interesting! Want to check it out together?"
];

interface Props {
  onUserInteraction?: (user: FakeUser, message: string) => void;
}

const FakeUserManager: React.FC<Props> = ({ onUserInteraction }) => {
  const [activeUsers, setActiveUsers] = useState<FakeUser[]>([]);
  const [interactions, setInteractions] = useState<number>(0);

  useEffect(() => {
    // Simulate users coming online
    const interval = setInterval(() => {
      const randomUser = FAKE_USERS[Math.floor(Math.random() * FAKE_USERS.length)];
      const randomResponse = FAKE_RESPONSES[Math.floor(Math.random() * FAKE_RESPONSES.length)];
      
      setActiveUsers(prev => {
        if (!prev.find(u => u.id === randomUser.id)) {
          return [...prev, randomUser];
        }
        return prev;
      });

      if (onUserInteraction && Math.random() > 0.7) {
        onUserInteraction(randomUser, randomResponse);
        setInteractions(prev => prev + 1);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [onUserInteraction]);

  const simulateMatch = (user: FakeUser) => {
    const response = FAKE_RESPONSES[Math.floor(Math.random() * FAKE_RESPONSES.length)];
    if (onUserInteraction) {
      onUserInteraction(user, response);
      setInteractions(prev => prev + 1);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          Fake User Simulation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Active Users:</span>
          <Badge variant="secondary">{activeUsers.length}</Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Interactions:</span>
          <Badge variant="outline">{interactions}</Badge>
        </div>

        <div className="space-y-2">
          {activeUsers.slice(0, 3).map(user => (
            <div key={user.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{user.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user.displayName}</p>
                  <p className="text-xs text-gray-500">{user.location}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => simulateMatch(user)}>
                  <Heart className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => simulateMatch(user)}>
                  <MessageCircle className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FakeUserManager;