import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Heart, MessageCircle, GamepadIcon, Users, 
  Sparkles, Filter, RefreshCw, UserPlus
} from 'lucide-react';

interface Match {
  id: number;
  name: string;
  age: number;
  compatibility: number;
  interests: string[];
  gameStyle: string;
  avatar: string;
  isOnline: boolean;
  lastSeen: string;
  favoriteGames: string[];
  winRate: number;
}

interface SmartMatchmakingProps {
  onChatWithMatch: (matchId: number) => void;
  onPlayWithMatch: (matchId: number) => void;
}

const SmartMatchmaking: React.FC<SmartMatchmakingProps> = ({ 
  onChatWithMatch, 
  onPlayWithMatch 
}) => {
  const [matches] = useState<Match[]>([
    {
      id: 1,
      name: 'Alex Rivera',
      age: 25,
      compatibility: 95,
      interests: ['Strategy Games', 'Chess', 'Card Games'],
      gameStyle: 'Competitive',
      avatar: '/placeholder.svg',
      isOnline: true,
      lastSeen: 'Online now',
      favoriteGames: ['Chess', 'UNO', 'Poker'],
      winRate: 78
    },
    {
      id: 2,
      name: 'Sam Chen',
      age: 28,
      compatibility: 87,
      interests: ['Casual Gaming', 'Dominoes', 'Social Games'],
      gameStyle: 'Casual',
      avatar: '/placeholder.svg',
      isOnline: false,
      lastSeen: '2 hours ago',
      favoriteGames: ['Dominoes', 'UNO', 'Checkers'],
      winRate: 65
    },
    {
      id: 3,
      name: 'Jordan Kim',
      age: 23,
      compatibility: 92,
      interests: ['Tournament Play', 'Strategy', 'Competitive'],
      gameStyle: 'Pro',
      avatar: '/placeholder.svg',
      isOnline: true,
      lastSeen: 'Online now',
      favoriteGames: ['Chess', 'Poker', 'Spades'],
      winRate: 85
    }
  ]);

  const [groupMatches] = useState([
    {
      id: 1,
      name: 'UNO Masters',
      members: 4,
      maxMembers: 6,
      gameType: 'UNO',
      skillLevel: 'Intermediate',
      compatibility: 89
    },
    {
      id: 2,
      name: 'Chess Enthusiasts',
      members: 8,
      maxMembers: 12,
      gameType: 'Chess',
      skillLevel: 'Advanced',
      compatibility: 94
    }
  ]);

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const getGameStyleBadge = (style: string) => {
    const colors = {
      'Competitive': 'destructive',
      'Casual': 'secondary',
      'Pro': 'default'
    };
    return colors[style as keyof typeof colors] || 'secondary';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-500" />
            AI-Powered Matches
          </h2>
          <p className="text-gray-600">Personalized recommendations based on your preferences</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Individual Matches */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recommended Players</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matches.map(match => (
            <Card key={match.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={match.avatar} />
                      <AvatarFallback>{match.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    {match.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold">{match.name}, {match.age}</h3>
                      <Badge variant={getGameStyleBadge(match.gameStyle) as any} className="text-xs">
                        {match.gameStyle}
                      </Badge>
                    </div>
                    <p className={`text-sm font-medium ${getCompatibilityColor(match.compatibility)}`}>
                      {match.compatibility}% compatibility
                    </p>
                    <p className="text-xs text-gray-500">{match.lastSeen}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Compatibility Score</span>
                    <span>{match.compatibility}%</span>
                  </div>
                  <Progress value={match.compatibility} className="h-2" />
                </div>

                <div className="mb-3">
                  <p className="text-xs text-gray-600 mb-1">Favorite Games:</p>
                  <div className="flex gap-1 flex-wrap">
                    {match.favoriteGames.map(game => (
                      <Badge key={game} variant="outline" className="text-xs">
                        {game}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex gap-1 flex-wrap">
                    {match.interests.slice(0, 3).map(interest => (
                      <Badge key={interest} variant="secondary" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => onChatWithMatch(match.id)}
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Chat
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onPlayWithMatch(match.id)}
                  >
                    <GamepadIcon className="h-4 w-4 mr-1" />
                    Play
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Group Matches */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recommended Groups</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groupMatches.map(group => (
            <Card key={group.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold">{group.name}</h3>
                    <p className="text-sm text-gray-600">{group.gameType} • {group.skillLevel}</p>
                  </div>
                  <Badge variant="secondary">
                    {group.members}/{group.maxMembers}
                  </Badge>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Group Compatibility</span>
                    <span>{group.compatibility}%</span>
                  </div>
                  <Progress value={group.compatibility} className="h-2" />
                </div>

                <Button className="w-full" size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Join Group
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmartMatchmaking;