import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Heart, MessageCircle, Bell, Star, Zap } from 'lucide-react';

interface Photo {
  id: string;
  url: string;
  isMain?: boolean;
}

interface DetailedProfileScreenProps {
  onBack: () => void;
}

const DetailedProfileScreen: React.FC<DetailedProfileScreenProps> = ({ onBack }) => {
  const [photos, setPhotos] = useState<Photo[]>([
    { id: '1', url: '/placeholder.svg', isMain: true },
    { id: '2', url: '/placeholder.svg' },
    { id: '3', url: '/placeholder.svg' }
  ]);
  const [likes, setLikes] = useState(127);
  const [superLikes, setSuperLikes] = useState(23);
  const [dailyLikes, setDailyLikes] = useState(5);
  const [dailySuperLikes, setDailySuperLikes] = useState(7);
  const [bio, setBio] = useState('Love exploring different cultures and trying new foods! Always up for an adventure.');
  const [zodiacSign, setZodiacSign] = useState('Leo ♌');
  
  const interests = ['🎨 Art', '🍜 Asian Food', '🎵 Music', '📚 Literature', '🌍 Travel'];
  const tones = ['Friendly', 'Professional', 'Casual', 'Adventurous', 'Creative'];
  const [selectedTones, setSelectedTones] = useState<string[]>(['Friendly', 'Adventurous']);

  const zodiacSigns = [
    'Aries ♈', 'Taurus ♉', 'Gemini ♊', 'Cancer ♋', 'Leo ♌', 'Virgo ♍',
    'Libra ♎', 'Scorpio ♏', 'Sagittarius ♐', 'Capricorn ♑', 'Aquarius ♒', 'Pisces ♓'
  ];

  const handlePhotoUpload = () => {
    if (photos.length < 5) {
      const newPhoto = {
        id: Date.now().toString(),
        url: '/placeholder.svg'
      };
      setPhotos([...photos, newPhoto]);
    }
  };

  const removePhoto = (photoId: string) => {
    setPhotos(photos.filter(p => p.id !== photoId));
  };

  const toggleTone = (tone: string) => {
    setSelectedTones(prev => 
      prev.includes(tone)
        ? prev.filter(t => t !== tone)
        : [...prev, tone]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={onBack}>← Back</Button>
          <h1 className="text-2xl font-bold text-purple-600">My Profile</h1>
          <Button variant="outline">
            <Bell className="h-4 w-4" />
          </Button>
        </div>

        {/* Daily Limits Status */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{dailyLikes}</div>
                <div className="text-sm text-gray-600">Likes Left Today</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{dailySuperLikes}</div>
                <div className="text-sm text-gray-600">Super Likes Left</div>
                <div className="text-xs text-gray-500">Max 10/day</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{likes + superLikes}</div>
                <div className="text-sm text-gray-600">Total Received</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Photos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Photos ({photos.length}/5 Free)</span>
              <Badge variant="secondary">Free Tier</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {photos.map((photo, index) => (
                <div key={photo.id} className="relative aspect-square group">
                  <img 
                    src={photo.url} 
                    alt={`Profile ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg border-2 border-gray-200"
                  />
                  {photo.isMain && (
                    <Badge className="absolute top-2 left-2 bg-purple-600">
                      <Star className="h-3 w-3 mr-1" />
                      Main
                    </Badge>
                  )}
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                    onClick={() => removePhoto(photo.id)}
                  >
                    ×
                  </Button>
                </div>
              ))}
              {photos.length < 5 && (
                <button
                  onClick={handlePhotoUpload}
                  className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-purple-400 transition-colors"
                >
                  <Camera className="h-6 w-6 text-gray-400 mb-1" />
                  <span className="text-xs text-gray-500">Add Photo</span>
                </button>
              )}
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">{5 - photos.length} free slots remaining</span>
              <Button variant="outline" size="sm">
                <Zap className="h-3 w-3 mr-1" />
                Upgrade for More
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Profile Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-red-500">{likes}</div>
                <div className="text-sm text-gray-600">Regular Likes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-500">{superLikes}</div>
                <div className="text-sm text-gray-600">Super Likes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-500">234</div>
                <div className="text-sm text-gray-600">Profile Views</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Info */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Bio</label>
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell others about yourself..."
                rows={3}
                maxLength={500}
              />
              <div className="text-xs text-gray-500 mt-1">{bio.length}/500 characters</div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Zodiac Sign</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {zodiacSigns.map((sign) => (
                  <Badge
                    key={sign}
                    variant={zodiacSign === sign ? "default" : "outline"}
                    className={`cursor-pointer ${
                      zodiacSign === sign
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setZodiacSign(sign)}
                  >
                    {sign}
                  </Badge>
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setZodiacSign('')}
                className="text-xs text-gray-500"
              >
                Clear zodiac sign
              </Button>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Cultural Interests</label>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <Badge key={interest} variant="secondary">
                    {interest}
                  </Badge>
                ))}
              </div>
              <Button variant="outline" size="sm" className="mt-2">
                Edit Interests
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Communication Tones */}
        <Card>
          <CardHeader>
            <CardTitle>Communication Style</CardTitle>
            <p className="text-sm text-gray-600">Select tones that describe how you communicate</p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {tones.map((tone) => (
                <Badge
                  key={tone}
                  variant={selectedTones.includes(tone) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleTone(tone)}
                >
                  {tone}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ad Space */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="pt-6 text-center">
            <div className="text-lg font-semibold text-gray-700 mb-2">Upgrade to Premium</div>
            <div className="text-sm text-gray-600 mb-3">
              • Unlimited photos • Unlimited likes • See who liked you • Ad-free experience
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
              <Zap className="h-4 w-4 mr-2" />
              Upgrade Now
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span>New likes and super likes</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span>New messages</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span>Profile views</span>
              <input type="checkbox" className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span>Kandi AI suggestions</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DetailedProfileScreen;