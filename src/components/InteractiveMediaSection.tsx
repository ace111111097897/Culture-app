import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Upload, Play, Heart, Share2, Camera, Video, Music } from 'lucide-react';

const InteractiveMediaSection: React.FC = () => {
  const [media, setMedia] = useState([
    { id: 1, type: 'video', title: 'Traditional Dance from Peru', author: 'Maria Santos', likes: 45, liked: false, thumbnail: '🎭' },
    { id: 2, type: 'photo', title: 'Street Art in Tokyo', author: 'Yuki Tanaka', likes: 32, liked: false, thumbnail: '🎨' },
    { id: 3, type: 'audio', title: 'Folk Music from Ireland', author: 'Sean O\'Connor', likes: 28, liked: true, thumbnail: '🎵' },
    { id: 4, type: 'video', title: 'Cooking Tutorial: Italian Pasta', author: 'Giuseppe Romano', likes: 67, liked: false, thumbnail: '🍝' }
  ]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [newMediaTitle, setNewMediaTitle] = useState('');
  const [selectedMediaType, setSelectedMediaType] = useState('photo');

  const mediaTypes = [
    { value: 'photo', label: 'Photo', icon: Camera },
    { value: 'video', label: 'Video', icon: Video },
    { value: 'audio', label: 'Audio', icon: Music }
  ];

  const handleLike = (mediaId: number) => {
    setMedia(media.map(item => 
      item.id === mediaId 
        ? { ...item, liked: !item.liked, likes: item.liked ? item.likes - 1 : item.likes + 1 }
        : item
    ));
  };

  const uploadMedia = () => {
    if (newMediaTitle.trim()) {
      const newMedia = {
        id: media.length + 1,
        type: selectedMediaType,
        title: newMediaTitle,
        author: 'You',
        likes: 0,
        liked: false,
        thumbnail: selectedMediaType === 'photo' ? '📸' : selectedMediaType === 'video' ? '🎬' : '🎧'
      };
      setMedia([newMedia, ...media]);
      setNewMediaTitle('');
      setShowUploadForm(false);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-red-100 text-red-800';
      case 'photo': return 'bg-blue-100 text-blue-800';
      case 'audio': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-r from-pink-100 to-purple-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="text-pink-600" />
            Interactive Media
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">Share and discover cultural content from around the world!</p>
          {!showUploadForm ? (
            <Button onClick={() => setShowUploadForm(true)} className="w-full">
              <Upload className="w-4 h-4 mr-2" />
              Upload Media
            </Button>
          ) : (
            <div className="space-y-3">
              <Input
                placeholder="Media title..."
                value={newMediaTitle}
                onChange={(e) => setNewMediaTitle(e.target.value)}
              />
              <div className="flex gap-2">
                {mediaTypes.map(type => {
                  const IconComponent = type.icon;
                  return (
                    <Button
                      key={type.value}
                      variant={selectedMediaType === type.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedMediaType(type.value)}
                    >
                      <IconComponent className="w-4 h-4 mr-1" />
                      {type.label}
                    </Button>
                  );
                })}
              </div>
              <div className="flex gap-2">
                <Button onClick={uploadMedia} size="sm">Upload</Button>
                <Button variant="outline" onClick={() => setShowUploadForm(false)} size="sm">Cancel</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {media.map(item => (
          <Card key={item.id} className="hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-4">
              <div className="flex items-start gap-4">
                <div className="text-4xl">{item.thumbnail}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="text-gray-600 text-sm">by {item.author}</p>
                    </div>
                    <Badge className={getTypeColor(item.type)}>
                      {item.type}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 mb-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(item.id)}
                      className={item.liked ? 'text-red-500' : 'text-gray-500'}
                    >
                      <Heart className={`w-4 h-4 mr-1 ${item.liked ? 'fill-current' : ''}`} />
                      {item.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      <Share2 className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                  </div>

                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                  >
                    <Play className="w-4 h-4 mr-1" />
                    {item.type === 'photo' ? 'View' : item.type === 'video' ? 'Watch' : 'Listen'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-orange-100 to-yellow-100">
        <CardContent className="pt-4">
          <div className="flex items-center gap-2 mb-2">
            <Upload className="text-orange-600" />
            <span className="font-semibold">Your Media Stats</span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-pink-600">{media.filter(m => m.author === 'You').length}</div>
              <div className="text-sm text-gray-600">Uploads</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{media.filter(m => m.liked).length}</div>
              <div className="text-sm text-gray-600">Liked</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{media.filter(m => m.author === 'You').reduce((sum, m) => sum + m.likes, 0)}</div>
              <div className="text-sm text-gray-600">Total Likes</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveMediaSection;