import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Medal, Crown, Star, TrendingUp } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  wins: number;
  losses: number;
  winRate: number;
  badge: string;
  avatar: string;
}

interface LeaderboardProps {
  gameType?: string;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ gameType = 'all' }) => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('global');

  useEffect(() => {
    fetchLeaderboard();
  }, [gameType, activeTab]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      // Mock data for now - would fetch from Supabase in real implementation
      const mockData: LeaderboardEntry[] = [
        {
          rank: 1,
          username: 'ChessGrandmaster',
          score: 2847,
          wins: 156,
          losses: 23,
          winRate: 87.2,
          badge: 'Grandmaster',
          avatar: '👑'
        },
        {
          rank: 2,
          username: 'UNOChampion',
          score: 2634,
          wins: 234,
          losses: 45,
          winRate: 83.9,
          badge: 'Champion',
          avatar: '🏆'
        },
        {
          rank: 3,
          username: 'DominoKing',
          score: 2456,
          wins: 189,
          losses: 67,
          winRate: 73.8,
          badge: 'Master',
          avatar: '👑'
        },
        {
          rank: 4,
          username: 'CheckersQueen',
          score: 2234,
          wins: 145,
          losses: 34,
          winRate: 81.0,
          badge: 'Expert',
          avatar: '♛'
        },
        {
          rank: 5,
          username: 'ConnectFourPro',
          score: 2156,
          wins: 167,
          losses: 56,
          winRate: 74.9,
          badge: 'Pro',
          avatar: '🔴'
        }
      ];

      // Add cultural games leaders
      const culturalLeaders: LeaderboardEntry[] = [
        {
          rank: 1,
          username: 'XiangqiMaster',
          score: 2567,
          wins: 123,
          losses: 18,
          winRate: 87.2,
          badge: 'Cultural Master',
          avatar: '🐉'
        },
        {
          rank: 2,
          username: 'GoSensei',
          score: 2445,
          wins: 98,
          losses: 22,
          winRate: 81.7,
          badge: 'Sensei',
          avatar: '⚫'
        },
        {
          rank: 3,
          username: 'MancalaChief',
          score: 2334,
          wins: 156,
          losses: 34,
          winRate: 82.1,
          badge: 'Chief',
          avatar: '🌍'
        }
      ];

      setLeaderboardData(activeTab === 'cultural' ? culturalLeaders : mockData);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Medal className="w-6 h-6 text-amber-600" />;
      default: return <span className="w-6 h-6 flex items-center justify-center text-white font-bold">{rank}</span>;
    }
  };

  const getBadgeColor = (badge: string) => {
    const colors = {
      'Grandmaster': 'bg-purple-600',
      'Champion': 'bg-yellow-600',
      'Master': 'bg-red-600',
      'Expert': 'bg-blue-600',
      'Pro': 'bg-green-600',
      'Cultural Master': 'bg-orange-600',
      'Sensei': 'bg-indigo-600',
      'Chief': 'bg-emerald-600'
    };
    return colors[badge as keyof typeof colors] || 'bg-gray-600';
  };

  return (
    <Card className="bg-white/10 backdrop-blur border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
          Leaderboards
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur border-white/20">
            <TabsTrigger value="global" className="data-[state=active]:bg-blue-600 text-white">
              <TrendingUp className="w-4 h-4 mr-2" />
              Global
            </TabsTrigger>
            <TabsTrigger value="cultural" className="data-[state=active]:bg-blue-600 text-white">
              <Star className="w-4 h-4 mr-2" />
              Cultural
            </TabsTrigger>
            <TabsTrigger value="weekly" className="data-[state=active]:bg-blue-600 text-white">
              <Trophy className="w-4 h-4 mr-2" />
              Weekly
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-3 mt-4">
            {loading ? (
              <div className="text-center text-white/70 py-8">Loading leaderboard...</div>
            ) : (
              leaderboardData.map((entry) => (
                <div
                  key={entry.rank}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    entry.rank <= 3 ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30' : 'bg-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    {getRankIcon(entry.rank)}
                    <div className="text-2xl">{entry.avatar}</div>
                    <div>
                      <h3 className="text-white font-semibold">{entry.username}</h3>
                      <div className="flex items-center space-x-2">
                        <Badge className={`${getBadgeColor(entry.badge)} text-white text-xs`}>
                          {entry.badge}
                        </Badge>
                        <span className="text-white/60 text-sm">
                          {entry.wins}W - {entry.losses}L
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold text-lg">{entry.score}</div>
                    <div className="text-green-400 text-sm">{entry.winRate}% WR</div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;