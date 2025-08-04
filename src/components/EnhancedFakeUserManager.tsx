import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Heart, MessageCircle, Users, Sparkles, Coffee, Music, Camera } from 'lucide-react';

interface FakeUser {
  id: string;
  username: string;
  displayName: string;
  interests: string[];
  location: string;
  bio: string;
  avatar: string;
  isOnline: boolean;
  personality: 'outgoing' | 'creative' | 'intellectual' | 'adventurous' | 'romantic';
  age: number;
  culture: string;
}

const ENHANCED_FAKE_USERS: FakeUser[] = [
  {
    id: '1', username: 'alex_artist', displayName: 'Alex Johnson',
    interests: ['Art', 'Travel', 'Photography'], location: 'New York, USA',
    bio: 'Digital artist exploring the world one canvas at a time',
    avatar: 'AJ', isOnline: true, personality: 'creative', age: 28, culture: 'American'
  },
  {
    id: '2', username: 'maria_music', displayName: 'Maria Gonzalez',
    interests: ['Music', 'Photography', 'Culture'], location: 'Madrid, Spain',
    bio: 'Music lover and photographer capturing life\'s moments',
    avatar: 'MG', isOnline: false, personality: 'romantic', age: 25, culture: 'Spanish'
  },
  {
    id: '3', username: 'sam_tech', displayName: 'Sam Lee',
    interests: ['Gaming', 'Technology', 'AI'], location: 'Seoul, South Korea',
    bio: 'Tech enthusiast and gaming aficionado',
    avatar: 'SL', isOnline: true, personality: 'intellectual', age: 30, culture: 'Korean'
  },
  {
    id: '4', username: 'emma_explorer', displayName: 'Emma Thompson',
    interests: ['Hiking', 'Cooking', 'Books'], location: 'London, UK',
    bio: 'Adventure seeker with a passion for culinary arts',
    avatar: 'ET', isOnline: true, personality: 'adventurous', age: 27, culture: 'British'
  },
  {
    id: '5', username: 'carlos_chef', displayName: 'Carlos Rodriguez',
    interests: ['Cooking', 'Dancing', 'Movies'], location: 'Mexico City, Mexico',
    bio: 'Chef by day, salsa dancer by night',
    avatar: 'CR', isOnline: false, personality: 'outgoing', age: 32, culture: 'Mexican'
  }
];

const getPersonalityResponses = (personality: string) => {
  const responses = {
    outgoing: [
      "Hey! Love your energy! Want to grab coffee sometime? ☕",
      "Your profile caught my eye! I'm always up for new adventures 🌟",
      "Hi there! I'm hosting a game night this weekend, interested? 🎮"
    ],
    creative: [
      "Your artistic vision is incredible! I'd love to collaborate 🎨",
      "I'm working on a photography project, want to be my muse? 📸",
      "That gallery opening sounds amazing! Mind if I join you? 🖼️"
    ],
    intellectual: [
      "Fascinating perspective on AI! Have you read the latest research? 🤖",
      "Your thoughts on technology intrigue me. Coffee and deep conversation? ☕",
      "I'm attending a tech conference next week, care to join? 💻"
    ],
    adventurous: [
      "Planning a hiking trip this weekend! Want to explore together? 🏔️",
      "I know this amazing hidden restaurant, fancy an adventure? 🗺️",
      "Your travel photos are stunning! Where to next? ✈️"
    ],
    romantic: [
      "Your smile in that photo made my day brighter ☀️",
      "I'd love to serenade you under the stars sometime 🌙",
      "That sunset photo reminds me of a perfect evening together 🌅"
    ]
  };
  return responses[personality] || responses.outgoing;
};

interface Props {
  onUserInteraction?: (user: FakeUser, message: string) => void;
  showInFeed?: boolean;
}

const EnhancedFakeUserManager: React.FC<Props> = ({ onUserInteraction, showInFeed = false }) => {
  const [activeUsers, setActiveUsers] = useState<FakeUser[]>([]);
  const [interactions, setInteractions] = useState<number>(0);
  const [recentMessages, setRecentMessages] = useState<Array<{user: FakeUser, message: string, timestamp: Date}>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomUser = ENHANCED_FAKE_USERS[Math.floor(Math.random() * ENHANCED_FAKE_USERS.length)];
      const personalityResponses = getPersonalityResponses(randomUser.personality);
      const randomResponse = personalityResponses[Math.floor(Math.random() * personalityResponses.length)];
      
      setActiveUsers(prev => {
        if (!prev.find(u => u.id === randomUser.id)) {
          return [...prev, randomUser];
        }
        return prev;
      });

      if (onUserInteraction && Math.random() > 0.6) {
        onUserInteraction(randomUser, randomResponse);
        setInteractions(prev => prev + 1);
        setRecentMessages(prev => [...prev.slice(-4), {user: randomUser, message: randomResponse, timestamp: new Date()}]);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [onUserInteraction]);

  const simulatePersonalizedMatch = (user: FakeUser) => {
    const personalityResponses = getPersonalityResponses(user.personality);
    const response = personalityResponses[Math.floor(Math.random() * personalityResponses.length)];
    
    if (onUserInteraction) {
      onUserInteraction(user, response);
      setInteractions(prev => prev + 1);
      setRecentMessages(prev => [...prev.slice(-4), {user, message: response, timestamp: new Date()}]);
    }
  };

  if (showInFeed) {
    return (
      <div className="space-y-4">
        {activeUsers.slice(0, 2).map(user => (
          <Card key={user.id} className="border-l-4 border-l-purple-500">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{user.displayName}</h4>
                    <Badge variant="outline" className="text-xs">{user.age}</Badge>
                    {user.isOnline && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{user.bio}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-gray-500">{user.location}</span>
                    <Badge variant="secondary" className="text-xs">{user.culture}</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => simulatePersonalizedMatch(user)} className="bg-gradient-to-r from-purple-500 to-pink-500">
                      <Heart className="h-3 w-3 mr-1" />
                      Connect
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => simulatePersonalizedMatch(user)}>
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Message
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          Enhanced User Simulation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{activeUsers.length}</div>
            <div className="text-xs text-gray-500">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-600">{interactions}</div>
            <div className="text-xs text-gray-500">Interactions</div>
          </div>
        </div>

        <div className="space-y-2">
          {activeUsers.slice(0, 3).map(user => (
            <div key={user.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user.displayName}</p>
                  <p className="text-xs text-gray-500">{user.culture} • {user.personality}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => simulatePersonalizedMatch(user)}>
                  <Heart className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => simulatePersonalizedMatch(user)}>
                  <MessageCircle className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {recentMessages.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Recent Messages:</h4>
            {recentMessages.slice(-2).map((msg, idx) => (
              <div key={idx} className="text-xs p-2 bg-gray-50 rounded">
                <span className="font-medium">{msg.user.displayName}:</span> {msg.message}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedFakeUserManager;