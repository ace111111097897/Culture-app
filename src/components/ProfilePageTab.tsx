import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, Star, Trophy, Users, Link, Play, Image as ImageIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ProfilePageTabProps {
  username: string;
}

const ProfilePageTab: React.FC<ProfilePageTabProps> = ({ username }) => {
  const [profileImage, setProfileImage] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [friendCount] = useState(1247);
  const [zodiacSign] = useState('Leo');
  const [location] = useState('Los Angeles, CA');

  const achievements = [
    { name: 'Culture Explorer', icon: '🌍', description: 'Visited 15+ cultural events' },
    { name: 'Social Butterfly', icon: '🦋', description: '500+ connections made' },
    { name: 'Game Master', icon: '🎮', description: 'Won 10 tournaments' },
    { name: 'Content Creator', icon: '📸', description: '100+ posts shared' }
  ];

  const gameTrophies = [
    { game: 'Cultural Trivia', rank: 'Champion', icon: '🏆' },
    { game: 'Language Challenge', rank: 'Expert', icon: '🥇' },
    { game: 'Food Quest', rank: 'Master', icon: '🥈' },
    { game: 'Music Match', rank: 'Pro', icon: '🥉' }
  ];

  const handleImageUpload = (type: 'profile' | 'photo' | 'video') => {
    // Simulate file upload
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = type === 'video' ? 'video/*' : 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        if (type === 'profile') {
          setProfileImage(url);
        } else if (type === 'photo' && photos.length < 5) {
          setPhotos([...photos, url]);
        } else if (type === 'video' && videos.length < 3) {
          setVideos([...videos, url]);
        }
      }
    };
    input.click();
  };

  const getZodiacEmoji = (sign: string) => {
    const zodiacEmojis: { [key: string]: string } = {
      'Leo': '♌', 'Aries': '♈', 'Taurus': '♉', 'Gemini': '♊',
      'Cancer': '♋', 'Virgo': '♍', 'Libra': '♎', 'Scorpio': '♏',
      'Sagittarius': '♐', 'Capricorn': '♑', 'Aquarius': '♒', 'Pisces': '♓'
    };
    return zodiacEmojis[sign] || '⭐';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-white/30">
                  <AvatarImage src={profileImage} />
                  <AvatarFallback className="text-2xl bg-white/20">
                    {username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 rounded-full bg-white text-purple-600 hover:bg-gray-100"
                  onClick={() => handleImageUpload('profile')}
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="text-center md:text-left flex-1">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <h1 className="text-3xl font-bold">{username}</h1>
                  <span className="text-2xl">{getZodiacEmoji(zodiacSign)}</span>
                </div>
                <p className="text-white/80 mb-4">{location}</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span className="font-semibold">{friendCount.toLocaleString()}</span>
                    <span className="text-white/80">friends</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                  >
                    <Link className="w-4 h-4 mr-2" />
                    View Cubbles
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Media Upload Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Photos */}
          <Card className="bg-white/60 backdrop-blur-sm border-purple-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-purple-600" />
                Photos ({photos.length}/5 Free)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {photos.map((photo, index) => (
                  <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
                {photos.length < 5 && (
                  <Button
                    variant="outline"
                    className="aspect-square border-dashed border-2 border-purple-300 hover:border-purple-500"
                    onClick={() => handleImageUpload('photo')}
                  >
                    <Upload className="w-6 h-6 text-purple-500" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Videos */}
          <Card className="bg-white/60 backdrop-blur-sm border-purple-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5 text-blue-600" />
                Videos ({videos.length}/3 Free)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {videos.map((video, index) => (
                  <div key={index} className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative">
                    <video src={video} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>
                ))}
                {videos.length < 3 && (
                  <Button
                    variant="outline"
                    className="aspect-video border-dashed border-2 border-blue-300 hover:border-blue-500"
                    onClick={() => handleImageUpload('video')}
                  >
                    <Upload className="w-6 h-6 text-blue-500" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Awards & Achievements */}
        <Card className="bg-white/60 backdrop-blur-sm border-purple-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-600" />
              Awards & Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <h3 className="font-semibold text-sm mb-1">{achievement.name}</h3>
                  <p className="text-xs text-gray-600">{achievement.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Game Trophies */}
        <Card className="bg-white/60 backdrop-blur-sm border-purple-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-orange-600" />
              Game Trophies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gameTrophies.map((trophy, index) => (
                <div key={index} className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-200">
                  <div className="text-3xl mb-2">{trophy.icon}</div>
                  <h3 className="font-semibold text-sm mb-1">{trophy.game}</h3>
                  <Badge variant="outline" className="text-xs">{trophy.rank}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePageTab;