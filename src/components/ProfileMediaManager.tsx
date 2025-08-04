import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Camera, 
  Video, 
  Upload, 
  X, 
  Crown, 
  Lock,
  Plus,
  Image as ImageIcon
} from 'lucide-react';

interface ProfileMediaManagerProps {
  onUpgradeClick?: () => void;
}

const ProfileMediaManager: React.FC<ProfileMediaManagerProps> = ({ onUpgradeClick }) => {
  const [photos, setPhotos] = useState([
    { id: 1, url: '/placeholder.svg', isMain: true },
    { id: 2, url: '/placeholder.svg', isMain: false },
    { id: 3, url: '/placeholder.svg', isMain: false }
  ]);
  
  const [videos, setVideos] = useState([
    { id: 1, url: '/placeholder.svg', duration: '0:30' },
    { id: 2, url: '/placeholder.svg', duration: '0:45' }
  ]);

  const maxPhotos = 8;
  const maxVideos = 5;
  const photosUsed = photos.length;
  const videosUsed = videos.length;

  const handlePhotoUpload = () => {
    if (photosUsed < maxPhotos) {
      const newPhoto = {
        id: Date.now(),
        url: '/placeholder.svg',
        isMain: false
      };
      setPhotos([...photos, newPhoto]);
    }
  };

  const handleVideoUpload = () => {
    if (videosUsed < maxVideos) {
      const newVideo = {
        id: Date.now(),
        url: '/placeholder.svg',
        duration: '0:30'
      };
      setVideos([...videos, newVideo]);
    }
  };

  const removePhoto = (id: number) => {
    setPhotos(photos.filter(photo => photo.id !== id));
  };

  const removeVideo = (id: number) => {
    setVideos(videos.filter(video => video.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Photos Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-purple-600" />
              Profile Photos
            </CardTitle>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              FREE: {photosUsed}/{maxPhotos}
            </Badge>
          </div>
          <Progress value={(photosUsed / maxPhotos) * 100} className="h-2" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src={photo.url} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                  {photo.isMain && (
                    <Badge className="absolute top-2 left-2 bg-purple-600">
                      Main
                    </Badge>
                  )}
                  <Button
                    onClick={() => removePhoto(photo.id)}
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
            
            {photosUsed < maxPhotos && (
              <Button
                onClick={handlePhotoUpload}
                variant="outline"
                className="aspect-square border-2 border-dashed border-gray-300 hover:border-purple-400 flex flex-col items-center justify-center gap-2"
              >
                <Plus className="h-6 w-6 text-gray-400" />
                <span className="text-xs text-gray-500">Add Photo</span>
              </Button>
            )}
          </div>
          
          {photosUsed >= maxPhotos && (
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 text-yellow-800">
                <Crown className="h-4 w-4" />
                <span className="text-sm font-medium">Photo limit reached!</span>
              </div>
              <p className="text-sm text-yellow-700 mt-1">
                Upgrade to Premium for unlimited photos
              </p>
              <Button 
                onClick={onUpgradeClick}
                size="sm" 
                className="mt-2 bg-yellow-600 hover:bg-yellow-700"
              >
                Upgrade Now
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Videos Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5 text-blue-600" />
              Profile Videos
            </CardTitle>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              FREE: {videosUsed}/{maxVideos}
            </Badge>
          </div>
          <Progress value={(videosUsed / maxVideos) * 100} className="h-2" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {videos.map((video) => (
              <div key={video.id} className="relative group">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src={video.url} 
                    alt="Video thumbnail" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="bg-white/90 rounded-full p-2">
                      <Video className="h-6 w-6 text-gray-700" />
                    </div>
                  </div>
                  <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">
                    {video.duration}
                  </Badge>
                  <Button
                    onClick={() => removeVideo(video.id)}
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
            
            {videosUsed < maxVideos && (
              <Button
                onClick={handleVideoUpload}
                variant="outline"
                className="aspect-video border-2 border-dashed border-gray-300 hover:border-blue-400 flex flex-col items-center justify-center gap-2"
              >
                <Plus className="h-6 w-6 text-gray-400" />
                <span className="text-xs text-gray-500">Add Video</span>
              </Button>
            )}
          </div>
          
          {videosUsed >= maxVideos && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 text-blue-800">
                <Crown className="h-4 w-4" />
                <span className="text-sm font-medium">Video limit reached!</span>
              </div>
              <p className="text-sm text-blue-700 mt-1">
                Upgrade to Premium for unlimited videos
              </p>
              <Button 
                onClick={onUpgradeClick}
                size="sm" 
                className="mt-2 bg-blue-600 hover:bg-blue-700"
              >
                Upgrade Now
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upload Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-gray-600" />
            Upload Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <ImageIcon className="h-4 w-4 mt-0.5 text-purple-600" />
              <div>
                <p className="font-medium">Photos:</p>
                <p>• JPG, PNG formats • Max 10MB • Minimum 400x400px</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Video className="h-4 w-4 mt-0.5 text-blue-600" />
              <div>
                <p className="font-medium">Videos:</p>
                <p>• MP4 format • Max 100MB • Maximum 60 seconds</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Lock className="h-4 w-4 mt-0.5 text-green-600" />
              <div>
                <p className="font-medium">Privacy:</p>
                <p>• All media is securely stored • You control visibility</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileMediaManager;