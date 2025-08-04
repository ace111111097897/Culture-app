import React, { useState } from 'react';
import { Camera, Video, Upload, Play, Heart, MessageCircle, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const CubbleMediaSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');

  const samplePhotos = [
    { id: 1, url: '📸', caption: 'Cultural festival in Tokyo', likes: 45, comments: 12 },
    { id: 2, url: '🎭', caption: 'Traditional mask making', likes: 32, comments: 8 },
    { id: 3, url: '🍜', caption: 'Homemade ramen adventure', likes: 67, comments: 15 },
    { id: 4, url: '🏮', caption: 'Lantern festival vibes', likes: 89, comments: 23 }
  ];

  const sampleVideos = [
    { id: 1, thumbnail: '🎬', title: 'Learning Calligraphy', duration: '2:34', likes: 156, comments: 34 },
    { id: 2, thumbnail: '💃', title: 'Traditional Dance Tutorial', duration: '4:12', likes: 203, comments: 45 },
    { id: 3, thumbnail: '🥢', title: 'Chopstick Challenge', duration: '1:47', likes: 98, comments: 28 },
    { id: 4, thumbnail: '🎨', title: 'Origami Masterclass', duration: '6:23', likes: 267, comments: 67 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-black">Cubbles Media</h2>
        <Button className="bg-gradient-to-r from-teal-500 to-blue-500">
          <Upload className="h-4 w-4 mr-2" />
          Upload
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <Button
          variant={activeTab === 'photos' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('photos')}
          className={`flex-1 ${activeTab === 'photos' ? 'bg-white shadow-sm' : ''}`}
        >
          <Camera className="h-4 w-4 mr-2" />
          Photos
        </Button>
        <Button
          variant={activeTab === 'videos' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('videos')}
          className={`flex-1 ${activeTab === 'videos' ? 'bg-white shadow-sm' : ''}`}
        >
          <Video className="h-4 w-4 mr-2" />
          Videos
        </Button>
      </div>

      {/* Photos Tab */}
      {activeTab === 'photos' && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {samplePhotos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-6xl">
                  {photo.url}
                </div>
                <div className="p-3">
                  <p className="text-sm text-black font-medium mb-2">{photo.caption}</p>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <Heart className="h-3 w-3 mr-1" />
                        {photo.likes}
                      </span>
                      <span className="flex items-center">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        {photo.comments}
                      </span>
                    </div>
                    <Share className="h-3 w-3 cursor-pointer hover:text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Videos Tab */}
      {activeTab === 'videos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sampleVideos.map((video) => (
            <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-6xl relative">
                  {video.thumbnail}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-12 w-12 text-white bg-black bg-opacity-50 rounded-full p-3 cursor-pointer hover:bg-opacity-70" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-black mb-2">{video.title}</h3>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <Heart className="h-3 w-3 mr-1" />
                        {video.likes}
                      </span>
                      <span className="flex items-center">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        {video.comments}
                      </span>
                    </div>
                    <Share className="h-3 w-3 cursor-pointer hover:text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CubbleMediaSection;